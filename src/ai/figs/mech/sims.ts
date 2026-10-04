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
