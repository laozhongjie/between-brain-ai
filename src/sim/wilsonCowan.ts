/**
 * Delay-coupled Wilson–Cowan network (one excitatory/inhibitory pair per node).
 *
 *   τE·dE/dt = −E + S_E(c1·E − c2·I + P + G·Σ_j W_ij·E_j(t − d_ij) + ext + noise)
 *   τI·dI/dt = −I + S_I(c3·E − c4·I + Q)
 *
 * `speed` scales both time constants, which shifts the oscillation frequency while keeping its shape:
 * this is how brain states (awake alpha/beta, NREM delta, REM theta) are produced.
 */

export interface Edge {
  src: number
  dst: number
  weight: number
  /** conduction delay in ms */
  delay: number
}

export interface WCParams {
  c1: number
  c2: number
  c3: number
  c4: number
  aE: number
  thE: number
  aI: number
  thI: number
  P: number
  Q: number
  /** ms */
  tauE: number
  tauI: number
}

// Classic limit-cycle parameters (Wilson & Cowan 1972).
export const DEFAULT_WC: WCParams = {
  c1: 16, c2: 12, c3: 15, c4: 3,
  aE: 1.3, thE: 4, aI: 2, thI: 3.7,
  P: 1.25, Q: 0,
  tauE: 8, tauI: 8,
}

const sig = (x: number, a: number, th: number) => 1 / (1 + Math.exp(-a * (x - th))) - 1 / (1 + Math.exp(a * th))

export interface Globals {
  /** global coupling strength */
  G: number
  /** time-scale multiplier (1 = default speed) */
  speed: number
  /** noise std on the excitatory input */
  noise: number
  /** added to every node's drive P */
  drive: number
}

export class WCNetwork {
  readonly n: number
  readonly E: Float64Array
  readonly I: Float64Array
  /** external input per node (decays with tauExt) */
  readonly ext: Float64Array
  /** per-node offset added to P */
  readonly bias: Float64Array
  /** per-node natural-frequency multiplier (heterogeneity lets strong coupling synchronise, weak coupling desynchronise) */
  readonly rate: Float64Array
  /** low-passed E (≈ 150 ms) and slow baseline (≈ 12 s) */
  readonly fast: Float64Array
  readonly slow: Float64Array
  g: Globals = { G: 0.6, speed: 1, noise: 0.35, drive: 0 }
  p: WCParams
  tauExt = 180
  t = 0

  private hist: Float64Array
  private hlen: number
  private head = 0
  private edges: Edge[]
  private delaySteps: Int32Array
  private coupling: Float64Array
  private dtHist: number
  private rng: () => number

  constructor(n: number, edges: Edge[], opts: { p?: WCParams; maxDelay?: number; dtHist?: number; seed?: number } = {}) {
    this.n = n
    this.p = { ...(opts.p ?? DEFAULT_WC) }
    this.E = new Float64Array(n)
    this.I = new Float64Array(n)
    this.ext = new Float64Array(n)
    this.bias = new Float64Array(n)
    this.rate = new Float64Array(n)
    this.fast = new Float64Array(n)
    this.slow = new Float64Array(n)
    this.coupling = new Float64Array(n)
    this.edges = edges
    this.dtHist = opts.dtHist ?? 0.5
    const maxDelay = opts.maxDelay ?? 60
    this.hlen = Math.ceil(maxDelay / this.dtHist) + 2
    this.hist = new Float64Array(this.hlen * n)
    this.delaySteps = Int32Array.from(edges, (e) => Math.min(this.hlen - 1, Math.max(1, Math.round(e.delay / this.dtHist))))
    this.rng = mulberry32(opts.seed ?? 1)
    // Random initial phases so nodes do not start in lock-step
    for (let i = 0; i < n; i++) {
      this.rate[i] = 0.8 + 0.4 * this.rng()
      this.E[i] = this.rng() * 0.3
      this.I[i] = this.rng() * 0.3
    }
  }

  /** Add a transient input to a node (decays exponentially). */
  inject(i: number, amount: number) {
    this.ext[i] += amount
  }

  /** Advance by dt ms (sim time is scaled by g.speed inside the derivative). */
  step(dt = this.dtHist) {
    const { n, E, I, p, g, hist, hlen, edges, delaySteps, coupling } = this
    coupling.fill(0)
    for (let k = 0; k < edges.length; k++) {
      const e = edges[k]
      const idx = (this.head - delaySteps[k] + hlen) % hlen
      coupling[e.dst] += e.weight * hist[idx * n + e.src]
    }
    const rE = (dt * g.speed) / p.tauE
    const rI = (dt * g.speed) / p.tauI
    const decay = Math.exp(-dt / this.tauExt)
    const aFast = dt / 150
    const aSlow = dt / 12000
    for (let i = 0; i < n; i++) {
      const input = p.c1 * E[i] - p.c2 * I[i] + p.P + g.drive + this.bias[i] + g.G * coupling[i] + this.ext[i] + g.noise * gauss(this.rng)
      const r = this.rate[i]
      const e = E[i] + r * rE * (-E[i] + sig(input, p.aE, p.thE))
      const ii = I[i] + r * rI * (-I[i] + sig(p.c3 * E[i] - p.c4 * I[i] + p.Q, p.aI, p.thI))
      E[i] = e < 0 ? 0 : e
      I[i] = ii < 0 ? 0 : ii
      this.ext[i] *= decay
      this.fast[i] += aFast * (E[i] - this.fast[i])
      this.slow[i] += aSlow * (E[i] - this.slow[i])
    }
    this.head = (this.head + 1) % hlen
    hist.set(E, this.head * n)
    this.t += dt
  }
}

function gauss(rng: () => number) {
  const u = rng() || 1e-9
  const v = rng()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Dominant frequency (Hz) of a signal sampled every dtMs, via mean-crossing count. */
export function dominantFreq(x: ArrayLike<number>, dtMs: number) {
  let mean = 0
  for (let i = 0; i < x.length; i++) mean += x[i]
  mean /= x.length
  let crossings = 0
  for (let i = 1; i < x.length; i++) if (x[i - 1] < mean && x[i] >= mean) crossings++
  return crossings / ((x.length * dtMs) / 1000)
}
