import { describe, expect, it } from 'vitest'
import { buildConnectivity, CORTICAL_INDICES } from '../src/data/connectivity'
import { NODES } from '../src/data/nodes'
import { STAGE_GLOBALS } from '../src/sim/brainState'
import { WCNetwork, dominantFreq } from '../src/sim/wilsonCowan'

const edges = buildConnectivity()

function record(g: WCNetwork['g'], seconds = 6) {
  const net = new WCNetwork(NODES.length, edges, { seed: 7 })
  net.g = { ...g }
  for (let i = 0; i < 4000; i++) net.step(0.5)
  const eeg: number[] = []
  const node: number[] = []
  const probe = CORTICAL_INDICES[0]
  for (let i = 0; i < seconds * 2000; i++) {
    net.step(0.5)
    if (i % 4 === 0) {
      let s = 0
      for (const c of CORTICAL_INDICES) s += net.E[c]
      eeg.push(s / CORTICAL_INDICES.length)
      node.push(net.E[probe])
    }
  }
  const amp = Math.max(...eeg) - Math.min(...eeg)
  return { net, eegAmp: amp, nodeFreq: dominantFreq(node, 2), eegFreq: dominantFreq(eeg, 2) }
}

describe('Wilson–Cowan single node', () => {
  it('oscillates, and frequency scales with speed', () => {
    const f = (speed: number) => {
      const net = new WCNetwork(1, [])
      net.g = { G: 0, speed, noise: 0, drive: 0 }
      const xs: number[] = []
      for (let i = 0; i < 12000; i++) {
        net.step(0.5)
        if (i > 4000) xs.push(net.E[0])
      }
      return dominantFreq(xs, 0.5)
    }
    const f1 = f(1)
    expect(f1).toBeGreaterThan(8)
    expect(f(0.5) / f1).toBeCloseTo(0.5, 1)
  })

  it('external input raises mean activity', () => {
    const net = new WCNetwork(1, [])
    net.g = { G: 0, speed: 1, noise: 0, drive: 0 }
    for (let i = 0; i < 4000; i++) net.step(0.5)
    const before = net.fast[0]
    for (let i = 0; i < 1000; i++) {
      net.inject(0, 0.05)
      net.step(0.5)
    }
    expect(net.fast[0]).toBeGreaterThan(before + 0.1)
  })
})

describe('network brain states', () => {
  const wake = record(STAGE_GLOBALS.wake)
  const focus = record({ ...STAGE_GLOBALS.wake, speed: STAGE_GLOBALS.focusSpeed, drive: STAGE_GLOBALS.focusDrive })
  const rem = record(STAGE_GLOBALS.rem)
  const nrem = record(STAGE_GLOBALS.nrem)

  it('awake cortex runs in the alpha range', () => {
    expect(wake.nodeFreq).toBeGreaterThan(7)
    expect(wake.nodeFreq).toBeLessThan(14)
  })
  it('focus is faster than relaxed wake (beta)', () => {
    expect(focus.nodeFreq).toBeGreaterThan(wake.nodeFreq * 1.4)
  })
  it('REM is theta-like', () => {
    expect(rem.nodeFreq).toBeGreaterThan(4)
    expect(rem.nodeFreq).toBeLessThan(wake.nodeFreq)
  })
  it('NREM shows large synchronous slow waves', () => {
    expect(nrem.eegFreq).toBeLessThan(4)
    expect(nrem.eegAmp).toBeGreaterThan(wake.eegAmp * 1.8)
  })
  it('no state saturates the network', () => {
    for (const r of [wake, focus, rem, nrem]) {
      const saturated = Array.from(r.net.fast).filter((x) => x > 0.6).length
      expect(saturated).toBeLessThan(5)
    }
  })
})
