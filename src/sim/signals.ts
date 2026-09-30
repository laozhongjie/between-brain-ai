import { NODE_BY_ID } from '../data/nodes'
import { PATHWAYS, pathwaysFor, type Pathway } from '../data/pathways'
import type { Hemi } from '../data/types'
import { engine } from './engine'

/** A light pulse travelling along one hop of a pathway. */
export interface Pulse {
  path: number // index into PATHWAYS
  hop: number
  t0: number // engine.simTime at start (ms)
  dur: number
  strength: number
}

export interface FireOptions {
  hemi?: Hemi | 'both'
  /** 0..1.5, scales pulse size and injected current */
  strength?: number
  /** duration of one hop in ms (visual speed) */
  hopMs?: number
  /** delay before the first hop (ms) */
  delay?: number
}

interface Scheduled {
  at: number
  run: () => void
}

// Spontaneous internal activity per stage: closed loops keep running without any outside input
const SPONTANEOUS: Record<'wake' | 'nrem' | 'rem', string[]> = {
  wake: ['dmn', 'cognitiveLoop', 'papez', 'salience', 'motorLoop', 'smaLoop', 'cerebellarLoop', 'topDown', 'valueLoop', 'aras'],
  nrem: ['consolidation', 'papez', 'encoding', 'consolidation'], // hippocampal replay
  rem: ['ventral', 'scene', 'fearHigh', 'emotionalMemory', 'papez', 'dmn'], // dreaming
}

const PATH_INDEX = new Map(PATHWAYS.map((p, i) => [p.uid, i]))
const MAX_PULSES = 1200

/** All hops, for ambient (spontaneous) pulses: source node index → [path, hop] */
const HOPS = PATHWAYS.flatMap((p, pi) =>
  p.nodes.slice(0, -1).map((id, hop) => ({ path: pi, hop, src: NODE_BY_ID[id].index })),
)

class Signals {
  pulses: Pulse[] = []
  /** 0..1 recent traffic per pathway, for highlighting tubes */
  readonly traffic = new Float32Array(PATHWAYS.length)
  /** pulses per second per unit activity for ambient traffic */
  ambientRate = 3
  /** mean interval between spontaneous loop activations (ms); Infinity disables */
  spontaneousInterval = 1300
  /** when set, only these pathway indices get ambient traffic (focus mode) */
  ambientFilter: Set<number> | null = null
  private nextSpont = 0
  private queue: Scheduled[] = []

  private schedule(at: number, run: () => void) {
    this.queue.push({ at, run })
  }

  private emit(path: number, hop: number, dur: number, strength: number, t0 = engine.simTime) {
    if (this.pulses.length >= MAX_PULSES) this.pulses.shift()
    this.pulses.push({ path, hop, t0, dur, strength })
    this.traffic[path] = Math.min(1, this.traffic[path] + 0.35 * strength + 0.15)
  }

  /** Send a signal down a pathway hop by hop, stimulating each node it reaches. */
  fire(baseId: string, opts: FireOptions = {}) {
    const { hemi = 'both', strength = 1, hopMs = 420, delay = 0 } = opts
    for (const p of pathwaysFor(baseId, hemi)) this.fireOne(p, strength, hopMs, delay)
  }

  private fireOne(p: Pathway, strength: number, hopMs: number, delay: number) {
    const pi = PATH_INDEX.get(p.uid)!
    const sign = p.kind === 'inhib' ? -1 : 1
    const now = engine.simTime + delay
    this.schedule(now, () => engine.inject(p.nodes[0], 2 * strength))
    for (let hop = 0; hop < p.nodes.length - 1; hop++) {
      const start = now + hop * hopMs
      const target = p.nodes[hop + 1]
      this.schedule(start, () => this.emit(pi, hop, hopMs, strength))
      this.schedule(start + hopMs, () => engine.inject(target, sign * 2.4 * strength))
    }
  }

  /** Directly stimulate a node (without a visible pathway). */
  stimulate(id: string, amount = 1, delay = 0) {
    this.schedule(engine.simTime + delay, () => engine.inject(id, amount))
  }

  clear() {
    this.queue = []
    this.pulses = []
  }

  private spontaneous(now: number) {
    if (!Number.isFinite(this.spontaneousInterval) || now < this.nextSpont) return
    const stage = engine.state.stage
    // Sleep is quieter: fewer, slower events
    const interval = this.spontaneousInterval * (stage === 'wake' ? 1 : 1.6)
    this.nextSpont = now + interval * (0.5 + Math.random())
    const pool = SPONTANEOUS[stage]
    const id = pool[Math.floor(Math.random() * pool.length)]
    this.fire(id, { hemi: Math.random() < 0.5 ? 'lh' : 'rh', strength: 0.6, hopMs: stage === 'nrem' ? 700 : 520 })
  }

  tick(dtMs: number) {
    const now = engine.simTime
    this.spontaneous(now)
    if (this.queue.length) {
      const due = this.queue.filter((s) => s.at <= now)
      if (due.length) {
        this.queue = this.queue.filter((s) => s.at > now)
        due.sort((a, b) => a.at - b.at).forEach((s) => s.run())
      }
    }

    // Ambient traffic mirrors the network's own activity (internal closed loop)
    const k = (this.ambientRate * (1 - 0.85 * engine.state.sleep) * dtMs) / 1000
    const act = engine.activity
    const filter = this.ambientFilter
    for (const h of HOPS) {
      if (filter && !filter.has(h.path)) continue
      const a = act[h.src]
      if (a > 0.08 && Math.random() < k * a) this.emit(h.path, h.hop, 520, 0.35 + 0.4 * a)
    }

    this.pulses = this.pulses.filter((p) => now - p.t0 < p.dur)
    const decay = Math.exp(-dtMs / 900)
    for (let i = 0; i < this.traffic.length; i++) this.traffic[i] *= decay
  }
}

export const signals = new Signals()
