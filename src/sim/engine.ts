import { buildConnectivity, CORTICAL_INDICES } from '../data/connectivity'
import { NODES, NODE_BY_ID } from '../data/nodes'
import { BrainState, type Phasic } from './brainState'
import { WCNetwork } from './wilsonCowan'

const DT = 0.5 // ms per integration step
const EEG_RATE_MS = 4 // 250 Hz
export const EEG_LEN = 1000 // 4 s window

const idx = (id: string) => NODE_BY_ID[id].index
const SENSORY_IO = new Set(['eye', 'ear', 'nose', 'tongue', 'skin', 'viscera'].flatMap((k) => [k, `lh.${k}`, `rh.${k}`]))
const MOTOR_OUT = ['muscles', 'larynx'].map(idx)
const DA_TARGETS = ['lh.accumbens', 'rh.accumbens', 'lh.caudate', 'rh.caudate', 'lh.putamen', 'rh.putamen'].map(idx)
const PHASIC_NODES = {
  lc: [idx('lc')],
  vta: [idx('vta')],
  snc: [idx('lh.snc'), idx('rh.snc')],
  raphe: [idx('raphe')],
  adrenal: [idx('adrenal')],
  heart: [idx('heart')],
  amygdala: [idx('lh.amygdala'), idx('rh.amygdala')],
}

/**
 * The running brain: neural-mass network + global brain state.
 * Ticked once per animation frame; the 3D scene and panels read its public arrays.
 */
class Engine {
  readonly net = new WCNetwork(NODES.length, buildConnectivity(), { seed: 11 })
  readonly state = new BrainState()
  /** 0..1 activation per node, drives glow and ambient pulses */
  readonly activity = new Float32Array(NODES.length)
  /** virtual EEG ring buffer (cortical mean field) */
  readonly eeg = new Float32Array(EEG_LEN)
  eegHead = 0
  /** time of day in minutes (set by the scenario director) */
  dayMin = 7 * 60
  simTime = 0
  private eegAcc = 0
  private eegMean = 0
  private phasic: Phasic = { lc: 0, vta: 0, snc: 0, raphe: 0, adrenal: 0, heart: 0, amygdala: 0 }

  constructor() {
    for (const n of NODES) if (n.inert) this.net.bias[n.index] = -5
    this.net.g = this.state.globals()
    for (let i = 0; i < 6000; i++) this.net.step(DT)
    this.net.slow.set(this.net.fast)
  }

  /** Stimulate a node. Sensory input is gated by sleep (the thalamus closes its gate in NREM). */
  inject(id: string, amount: number) {
    const n = NODE_BY_ID[id]
    if (!n || n.inert) return
    const gate = SENSORY_IO.has(id) ? 1 - 0.75 * this.state.w.nrem : 1
    this.net.inject(n.index, amount * gate)
  }

  tick(dtMs: number) {
    dtMs = Math.min(dtMs, 100) // avoid a spiral after tab switches
    const { net, state } = this
    const ph = this.phasic

    for (const k of Object.keys(PHASIC_NODES) as (keyof Phasic)[]) {
      let s = 0
      for (const i of PHASIC_NODES[k]) s += Math.max(0, net.fast[i] - net.slow[i])
      // Slow waves in NREM are not "events": keep them out of vitals and neuromodulators
      ph[k] = (s / PHASIC_NODES[k].length) * (1 - 0.9 * state.w.nrem)
    }
    state.update(dtMs, this.dayMin, ph)
    net.g = state.globals()

    // Neuromodulation: dopamine lifts the striatum; REM atonia silences motor output
    for (const i of DA_TARGETS) net.bias[i] = 0.4 * (state.levels.DA - 0.4)
    for (const i of MOTOR_OUT) net.bias[i] = -1.2 * state.w.rem

    const steps = Math.round(dtMs / DT)
    for (let s = 0; s < steps; s++) {
      net.step(DT)
      this.eegAcc += DT
      if (this.eegAcc >= EEG_RATE_MS) {
        this.eegAcc -= EEG_RATE_MS
        let m = 0
        for (const c of CORTICAL_INDICES) m += net.E[c]
        m /= CORTICAL_INDICES.length
        this.eegMean += 0.002 * (m - this.eegMean)
        this.eeg[this.eegHead] = m - this.eegMean
        this.eegHead = (this.eegHead + 1) % EEG_LEN
      }
    }
    this.simTime += steps * DT

    // Glow = phasic (event-driven) activation; in NREM a gentle, capped glow following the synchronous slow waves
    const wn = state.w.nrem
    for (let i = 0; i < NODES.length; i++) {
      const phasic = 4.5 * Math.max(0, net.fast[i] - net.slow[i])
      const wave = Math.min(0.28, 1.2 * Math.max(0, net.E[i] - net.slow[i]))
      const a = (1 - wn) * phasic + wn * wave
      this.activity[i] = a > 1 ? 1 : a
    }
  }
}

export const engine = new Engine()
