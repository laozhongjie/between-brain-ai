import { describe, expect, it } from 'vitest'
import { PATHWAY_DEFS } from '../src/data/pathways'
import { DAY } from '../src/data/scenario'
import { DAY_START, EVENTS, director } from '../src/sim/director'
import { sleepPressure } from '../src/sim/brainState'

const ids = new Set(PATHWAY_DEFS.map((p) => p.id))
const at = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return (((h * 60 + m - DAY_START) % 1440) + 1440) % 1440
}

describe('day scenario', () => {
  it('only fires pathways that exist', () => {
    for (const e of DAY)
      for (const s of e.steps)
        for (const f of s.fire ?? []) expect(ids.has(typeof f === 'string' ? f : f[0]), `${e.id}: ${f}`).toBe(true)
  })

  it('events are in order and do not overlap', () => {
    for (let i = 1; i < EVENTS.length; i++) {
      expect(EVENTS[i].tl).toBeGreaterThan(EVENTS[i - 1].tl + DAY[i - 1].dur - 1e-9)
    }
  })

  it('steps fit inside each event’s playback time', () => {
    for (const e of DAY) for (const s of e.steps) expect(s.at).toBeLessThan(e.play)
  })

  it('brain state follows the day', () => {
    expect(director.stateAt(at('06:40')).stage).toBe('rem')
    expect(director.stateAt(at('08:20')).stage).toBe('wake')
    expect(director.stateAt(at('11:30')).focus).toBeGreaterThan(0.9)
    expect(director.stateAt(at('17:45')).exertion).toBeGreaterThan(0.5)
    expect(director.stateAt(at('19:30')).exertion).toBe(0)
    expect(director.stateAt(at('23:30')).stage).toBe('nrem')
    expect(director.stateAt(at('02:40')).stage).toBe('rem')
  })

  it('sleep pressure builds during the day and clears overnight', () => {
    const m = (hhmm: string) => at(hhmm) + DAY_START
    expect(sleepPressure(m('22:30'))).toBeGreaterThan(sleepPressure(m('09:00')) + 0.5)
    expect(sleepPressure(m('06:30'))).toBeLessThan(0.3)
  })
})
