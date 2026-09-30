import type { Globals } from './wilsonCowan'

export type Stage = 'wake' | 'nrem' | 'rem'

/**
 * Network parameters per stage, calibrated in tests/sim.test.ts:
 *  wake ≈ 10 Hz alpha (desynchronised), focus ≈ 20 Hz beta, REM ≈ 6–7 Hz theta,
 *  NREM ≈ 1.5 Hz large synchronous slow waves (strong coupling, little noise).
 */
export const STAGE_GLOBALS = {
  wake: { G: 0.3, speed: 0.45, noise: 0.6, drive: 0 } as Globals,
  rem: { G: 0.3, speed: 0.28, noise: 0.6, drive: 0 } as Globals,
  nrem: { G: 2.5, speed: 0.07, noise: 0.02, drive: 0 } as Globals,
  focusSpeed: 0.8,
  focusDrive: 0.15,
}

export interface StateTargets {
  stage: Stage
  /** 0 relaxed … 1 highly focused */
  focus: number
  /** 0 rest … 1 intense exercise */
  exertion: number
  /** ambient light 0 dark … 1 daylight */
  light: number
}

export interface Levels {
  /** noradrenaline (locus coeruleus) */
  NE: number
  /** dopamine (VTA / SNc) */
  DA: number
  /** serotonin (raphe) */
  HT: number
  /** acetylcholine */
  ACh: number
  cortisol: number
  melatonin: number
  /** sleep pressure */
  adenosine: number
}

/** Phasic (event-driven) activation of key nodes, read from the network each frame. */
export interface Phasic {
  lc: number
  vta: number
  snc: number
  raphe: number
  adrenal: number
  heart: number
  amygdala: number
}

const STAGE_BASE: Record<Stage, Pick<Levels, 'NE' | 'DA' | 'HT' | 'ACh'>> = {
  wake: { NE: 0.5, DA: 0.4, HT: 0.5, ACh: 0.55 },
  nrem: { NE: 0.22, DA: 0.3, HT: 0.3, ACh: 0.15 },
  rem: { NE: 0.04, DA: 0.4, HT: 0.04, ACh: 0.85 },
}
const HEART_BASE: Record<Stage, number> = { wake: 70, nrem: 56, rem: 64 }
const BREATH_BASE: Record<Stage, number> = { wake: 14, nrem: 11, rem: 16 }

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const approach = (cur: number, target: number, dtMs: number, tauMs: number) => cur + (target - cur) * (1 - Math.exp(-dtMs / tauMs))

/** Cortisol follows a circadian curve: peak ~30 min after waking (~08:00), lowest around midnight. */
export function circadianCortisol(dayMin: number) {
  const h = dayMin / 60
  const c = Math.cos((2 * Math.PI * (h - 8)) / 24)
  return 0.15 + 0.7 * Math.pow(Math.max(0, c), 1.5)
}

/** Melatonin: secreted in darkness during the biological night (~21:30–07:00). */
export function circadianMelatonin(dayMin: number) {
  const h = dayMin / 60
  return h >= 21.5 || h < 7 ? 0.9 : 0.05
}

/**
 * Sleep pressure (adenosine) for this day's schedule: builds from waking at 07:00 until bedtime (~23:00),
 * then is cleared during the night. Derived from the clock so it stays consistent when seeking.
 */
export function sleepPressure(dayMin: number) {
  const h = (((dayMin - 7 * 60) % 1440) + 1440) % 1440 / 60 // hours since 07:00
  const awake = 16
  return h <= awake ? 0.08 + 0.057 * h : Math.max(0.05, 0.08 + 0.057 * awake - 0.13 * (h - awake))
}

export class BrainState {
  targets: StateTargets = { stage: 'wake', focus: 0.2, exertion: 0, light: 1 }
  /** smoothed stage weights, sum to 1 */
  w: Record<Stage, number> = { wake: 1, nrem: 0, rem: 0 }
  focus = 0.2
  exertion = 0
  levels: Levels = { NE: 0.5, DA: 0.4, HT: 0.5, ACh: 0.55, cortisol: 0.5, melatonin: 0.05, adenosine: 0.1 }
  vitals = { heartRate: 70, breathRate: 14 }

  get stage(): Stage {
    return this.w.nrem > 0.5 ? 'nrem' : this.w.rem > 0.5 ? 'rem' : 'wake'
  }
  /** 0 awake … 1 asleep */
  get sleep() {
    return this.w.nrem + this.w.rem
  }

  update(dtMs: number, dayMin: number, ph: Phasic) {
    const T = this.targets
    for (const s of ['wake', 'nrem', 'rem'] as Stage[]) this.w[s] = approach(this.w[s], T.stage === s ? 1 : 0, dtMs, 2500)
    this.focus = approach(this.focus, T.focus, dtMs, 1500)
    this.exertion = approach(this.exertion, T.exertion, dtMs, 2500)

    const blend = (k: keyof (typeof STAGE_BASE)['wake']) =>
      this.w.wake * STAGE_BASE.wake[k] + this.w.nrem * STAGE_BASE.nrem[k] + this.w.rem * STAGE_BASE.rem[k]
    const L = this.levels
    L.NE = approach(L.NE, clamp01(blend('NE') + 0.15 * this.focus + 0.25 * this.exertion + 3 * ph.lc), dtMs, 600)
    L.DA = approach(L.DA, clamp01(blend('DA') + 0.2 * this.exertion + 2.5 * (ph.vta + 0.5 * ph.snc)), dtMs, 700)
    L.HT = approach(L.HT, clamp01(blend('HT') + 2 * ph.raphe), dtMs, 1500)
    L.ACh = approach(L.ACh, clamp01(blend('ACh') + 0.2 * this.focus), dtMs, 1500)
    L.cortisol = approach(L.cortisol, clamp01(circadianCortisol(dayMin) + 3 * ph.adrenal + 0.1 * this.exertion), dtMs, 2500)
    L.melatonin = approach(L.melatonin, clamp01(circadianMelatonin(dayMin) * (1 - 0.8 * T.light)), dtMs, 3000)

    L.adenosine = approach(L.adenosine, clamp01(sleepPressure(dayMin)), dtMs, 1500)

    const hb = this.w.wake * HEART_BASE.wake + this.w.nrem * HEART_BASE.nrem + this.w.rem * HEART_BASE.rem
    const bb = this.w.wake * BREATH_BASE.wake + this.w.nrem * BREATH_BASE.nrem + this.w.rem * BREATH_BASE.rem
    this.vitals.heartRate = approach(this.vitals.heartRate, hb + 85 * this.exertion + 260 * ph.heart + 120 * ph.amygdala, dtMs, 1800)
    this.vitals.breathRate = approach(this.vitals.breathRate, bb + 18 * this.exertion + 40 * ph.amygdala, dtMs, 2500)
  }

  /** Network globals for the current (blended) state. */
  globals(): Globals {
    const { wake, nrem, rem } = STAGE_GLOBALS
    const w = this.w
    const mix = (k: keyof Globals) => w.wake * wake[k] + w.nrem * nrem[k] + w.rem * rem[k]
    const arousal = w.wake * (this.focus + 0.5 * (this.levels.NE - 0.5))
    return {
      G: mix('G'),
      speed: mix('speed') + (STAGE_GLOBALS.focusSpeed - wake.speed) * clamp01(arousal),
      noise: mix('noise'),
      drive: mix('drive') + STAGE_GLOBALS.focusDrive * clamp01(arousal),
    }
  }
}
