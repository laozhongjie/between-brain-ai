/** Pure simulation code for the interactive labs (unit-tested in tests/labs.test.ts). */

export type Pt = [number, number]

// ───────────── Neuron models ─────────────

export interface Trace {
  v: Pt[]
  spikes: number[]
}

/** Leaky integrate-and-fire driven by a constant current step starting at t = 20 ms. */
export function simulateLIF(RI: number, T = 300, dt = 0.1): Trace {
  const tau = 20, vRest = -65, theta = -50, vReset = -70, tRef = 2
  let v = vRest
  let refUntil = -1
  const out: Pt[] = []
  const spikes: number[] = []
  for (let t = 0; t <= T; t += dt) {
    const I = t >= 20 ? RI : 0
    if (t >= refUntil) v += (dt / tau) * (-(v - vRest) + I)
    if (v >= theta) {
      spikes.push(t)
      out.push([t, 20]) // draw the spike
      v = vReset
      refUntil = t + tRef
    }
    out.push([t, v])
  }
  return { v: decimate(out, 0.5), spikes }
}

export interface IzhParams {
  a: number
  b: number
  c: number
  d: number
}

/** Izhikevich (2003) presets. */
export const IZH_PRESETS: Record<string, IzhParams> = {
  RS: { a: 0.02, b: 0.2, c: -65, d: 8 },
  IB: { a: 0.02, b: 0.2, c: -55, d: 4 },
  CH: { a: 0.02, b: 0.2, c: -50, d: 2 },
  FS: { a: 0.1, b: 0.2, c: -65, d: 2 },
  LTS: { a: 0.02, b: 0.25, c: -65, d: 2 },
}

export function simulateIzhikevich(p: IzhParams, I: number, T = 300, dt = 0.1): Trace {
  let v = -65
  let u = p.b * v
  const out: Pt[] = []
  const spikes: number[] = []
  for (let t = 0; t <= T; t += dt) {
    const Iin = t >= 20 ? I : 0
    v += dt * (0.04 * v * v + 5 * v + 140 - u + Iin)
    u += dt * p.a * (p.b * v - u)
    if (v >= 30) {
      spikes.push(t)
      out.push([t, 30])
      v = p.c
      u += p.d
    }
    out.push([t, v])
  }
  return { v: decimate(out, 0.5), spikes }
}

/** Firing rate (Hz) during the stimulus window of a trace. */
export const rateOf = (spikes: number[], T = 300) => (spikes.filter((s) => s >= 20).length / (T - 20)) * 1000

/** Keep at most one point per `step` ms (but always keep spike peaks). */
function decimate(pts: Pt[], step: number): Pt[] {
  const out: Pt[] = []
  let last = -Infinity
  for (const p of pts) {
    if (p[0] - last >= step || p[1] >= 20) {
      out.push(p)
      last = p[0]
    }
  }
  return out
}

// ───────────── Dendrites ─────────────

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x))

/** Point neuron: linear sum + threshold. */
export const pointNeuron = (x1: number, x2: number, theta: number) => sigmoid(12 * (x1 + x2 - theta))

export type DendriteMode = 'clustered' | 'distributed' | 'dcaap'

/**
 * Dendritic neuron variants:
 *  clustered   – both inputs on one branch with a supralinear (NMDA-like) nonlinearity → AND-like binding
 *  distributed – one input per branch, branch outputs summed at the soma → OR-like
 *  dcaap       – non-monotonic dendritic Ca²⁺ action potential (Gidon 2020): strongest for intermediate drive → XOR
 */
export function dendriticNeuron(x1: number, x2: number, mode: DendriteMode): number {
  if (mode === 'clustered') {
    const branch = sigmoid(10 * (x1 + x2 - 1.4))
    return sigmoid(12 * (branch - 0.5))
  }
  if (mode === 'distributed') {
    const b1 = sigmoid(10 * (x1 - 0.5))
    const b2 = sigmoid(10 * (x2 - 0.5))
    return sigmoid(12 * (b1 + b2 - 0.5))
  }
  const z = x1 + x2
  const dcaap = Math.exp(-(((z - 1) / 0.32) ** 2))
  return sigmoid(12 * (dcaap - 0.5))
}

export function grid(f: (x1: number, x2: number) => number, n = 41): number[][] {
  return Array.from({ length: n }, (_, j) => Array.from({ length: n }, (_, i) => f(i / (n - 1), j / (n - 1))))
}

// ───────────── STDP ─────────────

export interface StdpParams {
  Aplus: number
  Aminus: number
  tauPlus: number
  tauMinus: number
}

/** Δw for a single pre/post pair, Δt = t_post − t_pre (ms). */
export function stdpWindow(dt: number, p: StdpParams): number {
  if (dt > 0) return p.Aplus * Math.exp(-dt / p.tauPlus)
  if (dt < 0) return -p.Aminus * Math.exp(dt / p.tauMinus)
  return 0
}

/** Weight after repeated pairings with soft bounds in [0, 1]. */
export function stdpPairing(dt: number, p: StdpParams, n = 60, w0 = 0.5): Pt[] {
  let w = w0
  const out: Pt[] = [[0, w]]
  for (let k = 1; k <= n; k++) {
    const d = stdpWindow(dt, p)
    w += d > 0 ? d * (1 - w) : d * w
    out.push([k, w])
  }
  return out
}

// ───────────── Short-term plasticity (Tsodyks–Markram) ─────────────

export interface StpParams {
  U: number
  tauRec: number
  tauF: number
}

export const STP_PRESETS: Record<'depressing' | 'facilitating', StpParams> = {
  depressing: { U: 0.5, tauRec: 800, tauF: 1e-6 },
  facilitating: { U: 0.1, tauRec: 100, tauF: 1000 },
}

/** Spike times: `n` spikes at `freq` Hz, then one recovery spike `recovery` ms after the last. */
export function spikeTrain(freq: number, n = 8, recovery = 500): number[] {
  const isi = 1000 / freq
  const times = Array.from({ length: n }, (_, k) => k * isi)
  times.push(times[n - 1] + recovery)
  return times
}

/** Relative PSC amplitude (A·u·x, normalised to the first spike) for each spike. */
export function tsodyksMarkram(times: number[], p: StpParams): number[] {
  let u = p.U
  let x = 1
  const amps: number[] = []
  times.forEach((t, k) => {
    if (k > 0) {
      const d = t - times[k - 1]
      const eF = Math.exp(-d / p.tauF)
      const eR = Math.exp(-d / p.tauRec)
      const uPrev = u
      u = u * eF + p.U * (1 - u * eF)
      x = x * (1 - uPrev) * eR + 1 - eR
    }
    amps.push(u * x)
  })
  const a0 = amps[0]
  return amps.map((a) => a / a0)
}

// ───────────── Three-factor learning ─────────────

/** Eligibility trace after a pre/post coincidence at t = 0. */
export const eligibility = (t: number, tauE: number) => (t < 0 ? 0 : Math.exp(-t / tauE))

/** Weight change when a neuromodulator pulse (width `width` ms) arrives at `delay` ms: η ∫ M(t) e(t) dt. */
export function threeFactorDw(delay: number, tauE: number, eta = 1, width = 200): number {
  let s = 0
  const dt = 5
  for (let t = delay; t < delay + width; t += dt) s += eligibility(t, tauE) * dt
  return (eta * s) / width
}
