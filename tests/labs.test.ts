import { describe, expect, it } from 'vitest'
import {
  IZH_PRESETS, STP_PRESETS, dendriticNeuron, pointNeuron, rateOf, simulateIzhikevich, simulateLIF,
  spikeTrain, stdpPairing, stdpWindow, threeFactorDw, tsodyksMarkram,
} from '../src/ai/labs/models'

describe('neuron models', () => {
  it('LIF is silent below threshold and fires faster with more input', () => {
    expect(simulateLIF(10).spikes.length).toBe(0)
    const r1 = rateOf(simulateLIF(20).spikes)
    const r2 = rateOf(simulateLIF(35).spikes)
    expect(r1).toBeGreaterThan(0)
    expect(r2).toBeGreaterThan(r1)
  })
  it('Izhikevich presets produce distinct patterns', () => {
    const rs = simulateIzhikevich(IZH_PRESETS.RS, 10).spikes
    const fs = simulateIzhikevich(IZH_PRESETS.FS, 10).spikes
    expect(rs.length).toBeGreaterThan(2)
    expect(fs.length).toBeGreaterThan(rs.length) // fast spiking
    // regular spiking adapts: later intervals are longer than the first
    expect(rs[rs.length - 1] - rs[rs.length - 2]).toBeGreaterThan(rs[1] - rs[0])
  })
})

describe('dendrites', () => {
  const on = (v: number) => v > 0.5
  it('a point neuron cannot compute XOR but the dCaAP dendrite can', () => {
    const xor = [[0, 0, false], [1, 0, true], [0, 1, true], [1, 1, false]] as const
    for (const theta of [0.5, 1, 1.5]) {
      const ok = xor.every(([a, b, y]) => on(pointNeuron(a, b, theta)) === y)
      expect(ok).toBe(false)
    }
    expect(xor.every(([a, b, y]) => on(dendriticNeuron(a, b, 'dcaap')) === y)).toBe(true)
  })
  it('clustered inputs act like AND, distributed like OR', () => {
    expect([on(dendriticNeuron(1, 1, 'clustered')), on(dendriticNeuron(1, 0, 'clustered'))]).toEqual([true, false])
    expect([on(dendriticNeuron(1, 0, 'distributed')), on(dendriticNeuron(0, 0, 'distributed'))]).toEqual([true, false])
  })
})

describe('plasticity', () => {
  const p = { Aplus: 0.05, Aminus: 0.055, tauPlus: 17, tauMinus: 34 }
  it('STDP: causal pairs potentiate, acausal pairs depress', () => {
    expect(stdpWindow(10, p)).toBeGreaterThan(0)
    expect(stdpWindow(-10, p)).toBeLessThan(0)
    const up = stdpPairing(10, p)
    const down = stdpPairing(-10, p)
    expect(up[up.length - 1][1]).toBeGreaterThan(0.9)
    expect(down[down.length - 1][1]).toBeLessThan(0.1)
  })
  it('Tsodyks–Markram: depressing synapses weaken, facilitating ones strengthen, both recover', () => {
    const times = spikeTrain(20)
    const dep = tsodyksMarkram(times, STP_PRESETS.depressing)
    const fac = tsodyksMarkram(times, STP_PRESETS.facilitating)
    expect(dep[7]).toBeLessThan(0.5)
    expect(fac[3]).toBeGreaterThan(1.5)
    expect(dep[8]).toBeGreaterThan(dep[7]) // recovery spike
  })
  it('three-factor: credit decays with reward delay relative to the trace', () => {
    expect(threeFactorDw(200, 1000)).toBeGreaterThan(threeFactorDw(2000, 1000))
    expect(threeFactorDw(2000, 2000)).toBeGreaterThan(threeFactorDw(2000, 500))
  })
})
