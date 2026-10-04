/* Small simulations behind the mechanism figures. Plain TypeScript, so the worked examples can be checked with node. */

/** A seeded uniform generator (mulberry32). */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
export const normal = (u: () => number) => Math.sqrt(-2 * Math.log(1 - u())) * Math.cos(2 * Math.PI * u())

type Mat = number[][]
const randMat = (u: () => number, r: number, c: number, s: number): Mat => Array.from({ length: r }, () => Array.from({ length: c }, () => normal(u) * s))
const mv = (m: Mat, v: number[]) => m.map((row) => row.reduce((a, w, j) => a + w * v[j], 0))
const tmv = (m: Mat, v: number[]) => m[0].map((_, j) => m.reduce((a, row, i) => a + row[j] * v[i], 0))

/** A two-layer linear network learning a random linear map (10 inputs, 4 hidden, 4 outputs) with three hidden-layer
 * rules: backpropagation, feedback alignment through a fixed random matrix B, and a frozen hidden layer. Returns the
 * test loss every `every` steps, and for feedback alignment the angle between W2ᵀ and B in degrees. */
export function feedbackAlignment(steps = 3000, every = 100, eta = 0.02) {
  const run = (mode: 'bp' | 'fa' | 'frozen') => {
    const u = seeded(3)
    const ni = 10, nh = 4, no = 4
    const T = randMat(u, no, ni, 1 / Math.sqrt(ni))
    const W1 = randMat(u, nh, ni, 0.3), W2 = randMat(u, no, nh, 0.3), B = randMat(u, nh, no, 0.5)
    const test = Array.from({ length: 200 }, () => Array.from({ length: ni }, () => normal(u)))
    const loss: number[] = [], angle: number[] = []
    for (let s = 0; s <= steps; s++) {
      if (s % every === 0) {
        loss.push(test.reduce((a, x) => { const y = mv(W2, mv(W1, x)), t = mv(T, x); return a + y.reduce((q, v, i) => q + (v - t[i]) ** 2, 0) }, 0) / test.length)
        const a = W2[0].map((_, j) => W2.map((r) => r[j])).flat(), bb = B.flat()
        const dot = a.reduce((q, v, i) => q + v * bb[i], 0), na = Math.hypot(...a), nb = Math.hypot(...bb)
        angle.push((Math.acos(dot / (na * nb)) * 180) / Math.PI)
      }
      const x = Array.from({ length: ni }, () => normal(u))
      const h = mv(W1, x), y = mv(W2, h), t = mv(T, x), e = y.map((v, i) => v - t[i])
      const d = mode === 'bp' ? tmv(W2, e) : mode === 'fa' ? mv(B, e) : h.map(() => 0)
      for (let i = 0; i < no; i++) for (let j = 0; j < nh; j++) W2[i][j] -= eta * e[i] * h[j]
      for (let i = 0; i < nh; i++) for (let j = 0; j < ni; j++) W1[i][j] -= eta * d[i] * x[j]
    }
    return { loss, angle }
  }
  return { bp: run('bp'), fa: run('fa'), frozen: run('frozen') }
}

/** A sparse coding toy: 8 unit-length dictionary atoms in 6 dimensions, an input made of atoms 2 and 5 (weights 1 and
 * 0.6) plus a little noise, and the coefficients ISTA finds for a sparsity weight λ. */
export function sparseCode(lambda: number, iters = 400) {
  const u = seeded(5)
  const d = 6, k = 8
  const atoms = Array.from({ length: k }, () => { const v = Array.from({ length: d }, () => normal(u)); const n = Math.hypot(...v); return v.map((x) => x / n) })
  const x = Array.from({ length: d }, (_, i) => 1 * atoms[2][i] + 0.6 * atoms[5][i] + 0.03 * normal(u))
  const recon = (a: number[]) => Array.from({ length: d }, (_, i) => atoms.reduce((s, at, j) => s + a[j] * at[i], 0))
  // step size from the largest eigenvalue of ΦᵀΦ, by power iteration
  let v = Array(k).fill(1)
  for (let r = 0; r < 50; r++) { const y = recon(v); const g = atoms.map((at) => at.reduce((s, w, i) => s + w * y[i], 0)); const n = Math.hypot(...g); v = g.map((q) => q / n) }
  const L = Math.hypot(...atoms.map((at) => at.reduce((s, w, i) => s + w * recon(v)[i], 0)))
  const eta = 1 / L
  let a = Array(k).fill(0)
  for (let it = 0; it < iters; it++) {
    const res = recon(a).map((y, i) => x[i] - y)
    a = a.map((aj, j) => { const z = aj + eta * atoms[j].reduce((s, w, i) => s + w * res[i], 0); return Math.sign(z) * Math.max(Math.abs(z) - eta * lambda, 0) })
  }
  const err = Math.hypot(...recon(a).map((y, i) => x[i] - y)) / Math.hypot(...x)
  return { a, err, active: a.filter((q) => Math.abs(q) > 1e-3).length }
}
