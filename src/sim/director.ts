import { create } from 'zustand'
import { DAY, toMin, type BodyPart, type OutputCue } from '../data/scenario'
import type { Bi } from '../data/types'
import type { StateTargets } from './brainState'
import { engine } from './engine'
import { signals } from './signals'

/** The timeline starts at 06:30 and runs 24 h. */
export const DAY_START = toMin(DAY[0].time)
const tlOf = (dayMin: number) => (((dayMin - DAY_START) % 1440) + 1440) % 1440

export interface TimedEvent {
  index: number
  /** minutes on the timeline (0 = 06:30) */
  tl: number
}
export const EVENTS: TimedEvent[] = DAY.map((e, index) => ({ index, tl: tlOf(toMin(e.time)) }))

const DEFAULT_STATE: StateTargets = { stage: 'wake', focus: 0.2, exertion: 0, light: 1 }
/** timeline minutes advanced per real second between events (at 1×) */
const GAP_RATE = 18
const CUE_MS = 3500

export interface LogLine {
  id: number
  tl: number
  text: Bi
  event: boolean
}

interface ScenarioUI {
  tl: number
  playing: boolean
  speed: number
  /** index of the event being played, or -1 between events */
  current: number
  log: LogLine[]
  speech: Bi | null
  action: Bi | null
  /** body parts highlighted by the scenario (in addition to live organ activity) */
  body: BodyPart[]
}

export const useScenario = create<ScenarioUI>(() => ({
  tl: 0,
  playing: true,
  speed: 1,
  current: -1,
  log: [],
  speech: null,
  action: null,
  body: [],
}))

class Director {
  tl = 0
  private current = -1
  private evtT = 0
  private fired = new Set<number>()
  private logId = 0
  private cueUntil = { speech: 0, action: 0 }
  private bodyUntil = new Map<BodyPart, number>()
  private lastUiUpdate = 0

  /** Brain-state targets at a timeline position: persistent state fields merged in event order. */
  stateAt(tl: number): StateTargets {
    const s = { ...DEFAULT_STATE }
    for (const e of EVENTS) if (e.tl <= tl) Object.assign(s, DAY[e.index].state)
    return s
  }

  private log(text: Bi, event = false) {
    const line: LogLine = { id: ++this.logId, tl: this.tl, text, event }
    useScenario.setState((s) => ({ log: [...s.log.slice(-30), line] }))
  }

  private enter(i: number, evtT = 0) {
    this.current = i
    this.evtT = evtT
    this.fired.clear()
    const e = DAY[i]
    e.steps.forEach((st, k) => st.at < evtT && this.fired.add(k))
    this.log(e.title, true)
    useScenario.setState({ current: i })
  }

  private leave() {
    this.current = -1
    useScenario.setState({ current: -1 })
  }

  private cue(out: OutputCue) {
    const now = performance.now()
    const s: Partial<ScenarioUI> = {}
    if (out.speech) {
      s.speech = out.speech
      this.cueUntil.speech = now + CUE_MS + 1500
    }
    if (out.action) {
      s.action = out.action
      this.cueUntil.action = now + CUE_MS + 1500
    }
    for (const p of out.body ?? []) this.bodyUntil.set(p, now + CUE_MS)
    useScenario.setState(s)
  }

  seek(tl: number) {
    this.tl = ((tl % 1440) + 1440) % 1440
    signals.clear()
    this.leave()
    for (const e of EVENTS) {
      const ev = DAY[e.index]
      if (this.tl >= e.tl && this.tl < e.tl + ev.dur) this.enter(e.index, ((this.tl - e.tl) / ev.dur) * ev.play)
    }
    this.syncState()
    useScenario.setState({ tl: this.tl })
  }

  /** Jump to the start of the next (+1) or previous (−1) event. */
  jump(dir: 1 | -1) {
    const pos = this.tl + (dir > 0 ? 0.01 : -0.5)
    const list = dir > 0 ? EVENTS.filter((e) => e.tl > pos) : EVENTS.filter((e) => e.tl < pos).reverse()
    const target = list[0] ?? (dir > 0 ? EVENTS[0] : EVENTS[EVENTS.length - 1])
    this.seek(target.tl)
  }

  private syncState() {
    const target = this.stateAt(this.tl)
    Object.assign(engine.state.targets, target)
    engine.dayMin = (DAY_START + this.tl) % 1440
  }

  tick(dtMs: number) {
    const ui = useScenario.getState()
    const now = performance.now()

    if (ui.playing) {
      const dt = Math.min(dtMs, 100) / 1000 * ui.speed
      if (this.current >= 0) {
        const e = DAY[this.current]
        this.evtT += dt
        e.steps.forEach((st, k) => {
          if (this.fired.has(k) || st.at > this.evtT) return
          this.fired.add(k)
          for (const f of st.fire ?? []) {
            const [id, opts] = typeof f === 'string' ? [f, {}] : f
            signals.fire(id, { ...opts, hopMs: (opts.hopMs ?? 420) / Math.sqrt(ui.speed) })
          }
          if (st.say) this.log(st.say)
          if (st.out) this.cue(st.out)
        })
        this.tl = EVENTS[this.current].tl + e.dur * Math.min(1, this.evtT / e.play)
        if (this.evtT >= e.play) this.leave()
      } else {
        const next = EVENTS.find((e) => e.tl > this.tl + 1e-6) ?? null
        this.tl += GAP_RATE * dt
        if (next && this.tl >= next.tl) {
          this.tl = next.tl
          this.enter(next.index)
        } else if (!next && this.tl >= 1440) {
          this.tl = 0
          this.enter(EVENTS[0].index)
        }
      }
      this.syncState()
    }

    // Expire output cues
    const patch: Partial<ScenarioUI> = {}
    if (ui.speech && now > this.cueUntil.speech) patch.speech = null
    if (ui.action && now > this.cueUntil.action) patch.action = null
    const body = [...this.bodyUntil].filter(([, until]) => until > now).map(([p]) => p)
    if (body.length !== ui.body.length) patch.body = body
    if (now - this.lastUiUpdate > 120) {
      patch.tl = this.tl
      this.lastUiUpdate = now
    }
    if (Object.keys(patch).length) useScenario.setState(patch)
  }
}

export const director = new Director()
director.seek(0)
