import { useMemo, useState } from 'react'
import type { Bi } from '../../data/types'
import { useT } from '../../i18n'
import {
  IZH_PRESETS, STP_PRESETS, dendriticNeuron, eligibility, grid, pointNeuron, rateOf, simulateIzhikevich,
  simulateLIF, spikeTrain, stdpPairing, stdpWindow, threeFactorDw, tsodyksMarkram, type DendriteMode, type Pt,
} from './models'
import { SERIES } from '../../theme'
import { Heatmap, LinePlot, RampLegend } from './Plot'
import { Rich } from '../Tex'

const b = (zh: string, en: string): Bi => ({ zh, en })

function Slider({ label, value, min, max, step, onChange, fmt = (v: number) => String(v) }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt?: (v: number) => string
}) {
  return (
    <label className="lab-slider">
      <span><Rich text={label} /></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)}
        style={{ '--v': `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties} />
      <output>{fmt(value)}</output>
    </label>
  )
}

function Seg<T extends string>({ value, options, onChange }: { value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className="seg lab-seg">
      {options.map(([v, label]) => (
        <button key={v} className={value === v ? 'on' : ''} onClick={() => onChange(v)}>{label}</button>
      ))}
    </div>
  )
}

// ───────────── 1. Neuron models ─────────────

const IZH_NAMES: Record<string, Bi> = {
  RS: b('规则放电 RS（适应）', 'Regular spiking (adapts)'),
  IB: b('内在爆发 IB', 'Intrinsically bursting'),
  CH: b('快速爆发 CH', 'Chattering'),
  FS: b('快速放电 FS（抑制性）', 'Fast spiking (inhibitory)'),
  LTS: b('低阈值放电 LTS', 'Low-threshold spiking'),
}

export function NeuronLab() {
  const t = useT()
  const [s, setS] = useState(0.5)
  const [preset, setPreset] = useState('RS')
  const lif = useMemo(() => simulateLIF(40 * s), [s])
  const izh = useMemo(() => simulateIzhikevich(IZH_PRESETS[preset], 20 * s), [s, preset])
  const relu = useMemo<Pt[]>(() => [[0, 0], [20, 0], [20, Math.max(0, s - 0.35) * 100], [300, Math.max(0, s - 0.35) * 100]], [s])
  const fi = useMemo(() => {
    const xs = Array.from({ length: 21 }, (_, i) => i / 20)
    return {
      lif: xs.map((x) => [x, rateOf(simulateLIF(40 * x).spikes)] as Pt),
      izh: xs.map((x) => [x, rateOf(simulateIzhikevich(IZH_PRESETS[preset], 20 * x).spikes)] as Pt),
      relu: xs.map((x) => [x, Math.max(0, x - 0.35) * 100] as Pt),
    }
  }, [preset])

  return (
    <div className="lab">
      <p className="lab-intro"><Rich text={t(b(
        '同一个阶跃输入（20 ms 开始）分别送进三种神经元。人工神经元只输出一个恒定的「频率」；LIF 会积分、放电、重置；Izhikevich 模型还能产生适应、爆发等模式。右下图比较三者的频率-输入曲线：ReLU 正是这条曲线的平滑近似，但丢掉了时间过程。',
        'The same step input (from 20 ms) drives three neuron models. The artificial unit outputs a constant “rate”; LIF integrates, fires and resets; Izhikevich adds adaptation and bursting. The bottom-right plot compares rate–input curves: ReLU approximates this curve but discards the time course.'))} /></p>
      <div className="lab-controls">
        <Slider label={t(b('输入强度（归一化）', 'Input (normalized)'))} value={s} min={0} max={1} step={0.01} onChange={setS} fmt={(v) => v.toFixed(2)} />
        <Seg value={preset} options={Object.keys(IZH_PRESETS).map((k) => [k, t(IZH_NAMES[k])])} onChange={setPreset} />
      </div>
      <div className="lab-grid">
        <LinePlot series={[{ name: t(b('人工神经元（ReLU 输出）', 'Artificial unit (ReLU)')), color: SERIES[0], points: relu }]} xLabel="t (ms)" yLabel={t(b('输出', 'Output'))} yDomain={[-2, 70]} height={150} fmtY={(y) => y.toFixed(0)} />
        <LinePlot series={[{ name: 'LIF', color: SERIES[1], points: lif.v }]} xLabel="t (ms)" yLabel="V (mV)" yDomain={[-75, 25]} height={150} fmtY={(y) => y.toFixed(0)} />
        <LinePlot series={[{ name: 'Izhikevich', color: SERIES[2], points: izh.v }]} xLabel="t (ms)" yLabel="v (mV)" yDomain={[-85, 35]} height={150} fmtY={(y) => y.toFixed(0)} />
        <LinePlot
          series={[
            { name: 'ReLU', color: SERIES[0], points: fi.relu },
            { name: 'LIF', color: SERIES[1], points: fi.lif },
            { name: `Izhikevich ${preset}`, color: SERIES[2], points: fi.izh },
          ]}
          xLabel={t(b('输入强度', 'Input'))} yLabel={t(b('频率 (Hz)', 'Rate (Hz)'))} height={150} xDomain={[0, 1]}
          vline={{ x: s, label: t(b('当前', 'now')) }} fmtX={(x) => x.toFixed(2)} fmtY={(y) => y.toFixed(0)}
        />
      </div>
    </div>
  )
}

// ───────────── 2. Dendrites ─────────────

export function DendriteLab() {
  const t = useT()
  const [theta, setTheta] = useState(1.5)
  const [mode, setMode] = useState<DendriteMode>('dcaap')
  const point = useMemo(() => grid((a, c) => pointNeuron(a, c, theta)), [theta])
  const dend = useMemo(() => grid((a, c) => dendriticNeuron(a, c, mode)), [mode])
  const corners: [number, number][] = [[0, 0], [1, 0], [0, 1], [1, 1]]
  const modeNames: Record<DendriteMode, string> = {
    clustered: t(b('输入聚集在同一分支（AND / 特征绑定）', 'Clustered on one branch (AND / binding)')),
    distributed: t(b('输入分散在不同分支（OR）', 'Distributed across branches (OR)')),
    dcaap: t(b('人类树突钙峰 dCaAP（XOR）', 'Human dendritic Ca²⁺ spike (XOR)')),
  }

  return (
    <div className="lab">
      <p className="lab-intro"><Rich text={t(b(
        '两个输入 $x_1$、$x_2$。左边是「点神经元」（线性求和 + 阈值），无论阈值怎么调都算不出异或（XOR）。右边是带树突非线性的神经元：同一分支上的输入被超线性放大（绑定），人类皮层神经元的树突钙峰对「中等强度」响应最强，因此单个神经元就能算 XOR（Gidon 2020）。',
        'Two inputs $x_1$, $x_2$. Left: a point neuron (linear sum + threshold) cannot compute XOR at any threshold. Right: a neuron with dendritic nonlinearities: inputs on the same branch are amplified supralinearly (binding), and human cortical dendritic Ca²⁺ spikes respond most to intermediate drive, so one neuron computes XOR (Gidon 2020).'))} /></p>
      <div className="lab-controls">
        <Slider label={t(b('点神经元阈值 $\\theta$', 'Point-neuron threshold $\\theta$'))} value={theta} min={0.2} max={1.9} step={0.05} onChange={setTheta} fmt={(v) => v.toFixed(2)} />
        <Seg value={mode} options={(Object.keys(modeNames) as DendriteMode[]).map((k) => [k, modeNames[k]])} onChange={setMode} />
      </div>
      <div className="lab-grid two">
        <Heatmap values={point} title={t(b('点神经元', 'Point neuron'))} xLabel="x₁" yLabel="x₂" />
        <Heatmap values={dend} title={t(b('树突神经元', 'Dendritic neuron'))} xLabel="x₁" yLabel="x₂" />
      </div>
      <RampLegend lo={t(b('输出 0', 'output 0'))} hi="1" />
      <table className="lab-table">
        <thead><tr><th><Rich text="$x_1$" /></th><th><Rich text="$x_2$" /></th><th>XOR</th><th>{t(b('点神经元', 'Point'))}</th><th>{t(b('树突', 'Dendritic'))}</th></tr></thead>
        <tbody>
          {corners.map(([a, c]) => {
            const p = pointNeuron(a, c, theta) > 0.5 ? 1 : 0
            const d = dendriticNeuron(a, c, mode) > 0.5 ? 1 : 0
            const x = a !== c ? 1 : 0
            return (
              <tr key={`${a}${c}`}>
                <td>{a}</td><td>{c}</td><td>{x}</td>
                <td className={p === x ? 'ok' : 'bad'}>{p} {p === x ? '✓' : '✗'}</td>
                <td className={d === x ? 'ok' : 'bad'}>{d} {d === x ? '✓' : '✗'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ───────────── 3. STDP ─────────────

export function StdpLab() {
  const t = useT()
  const [dt, setDt] = useState(10)
  const [Aplus, setAplus] = useState(0.05)
  const [tauPlus, setTauPlus] = useState(17)
  const p = { Aplus, Aminus: Aplus * 1.1, tauPlus, tauMinus: 34 }
  const win = useMemo<Pt[]>(() => Array.from({ length: 201 }, (_, i) => { const x = -100 + i; return [x, stdpWindow(x, p)] }), [Aplus, tauPlus]) // eslint-disable-line react-hooks/exhaustive-deps
  const traj = useMemo(() => stdpPairing(dt, p), [dt, Aplus, tauPlus]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="lab">
      <p className="lab-intro"><Rich text={t(b(
        '左图是 STDP 时间窗：突触后比突触前晚放电（$\\Delta t > 0$，前者「导致」了后者）则增强，反之削弱。右图把一对神经元以固定的 $\\Delta t$ 反复配对 60 次，观察权重如何变化（软边界：权重保持在 0–1 之间）。',
        'Left: the STDP window. Post after pre ($\\Delta t > 0$, pre “caused” post) potentiates, the reverse depresses. Right: pair two neurons 60 times at a fixed $\\Delta t$ and watch the weight evolve (soft bounds keep it in 0–1).'))} /></p>
      <div className="lab-controls">
        <Slider label="$\Delta t = t_{\text{post}} - t_{\text{pre}}$ (ms)" value={dt} min={-80} max={80} step={1} onChange={setDt} />
        <Slider label="$A_+$" value={Aplus} min={0.01} max={0.1} step={0.005} onChange={setAplus} fmt={(v) => v.toFixed(3)} />
        <Slider label="$\tau_+$ (ms)" value={tauPlus} min={5} max={40} step={1} onChange={setTauPlus} />
      </div>
      <div className="lab-grid two">
        <LinePlot series={[{ name: '$\\Delta w(\\Delta t)$', color: SERIES[0], points: win }]} xLabel="Δt (ms)" yLabel="Δw" height={200} mark={{ x: dt, y: stdpWindow(dt, p), label: `Δt=${dt}` }} fmtY={(y) => y.toFixed(3)} />
        <LinePlot series={[{ name: 'w', color: SERIES[1], points: traj }]} xLabel={t(b('配对次数', 'Pairings'))} yLabel="w" yDomain={[0, 1]} height={200} />
      </div>
    </div>
  )
}

// ───────────── 4. Short-term plasticity ─────────────

export function StpLab() {
  const t = useT()
  const [freq, setFreq] = useState(20)
  const times = useMemo(() => spikeTrain(freq), [freq])
  const dep = useMemo(() => tsodyksMarkram(times, STP_PRESETS.depressing), [times])
  const fac = useMemo(() => tsodyksMarkram(times, STP_PRESETS.facilitating), [times])
  const toPts = (a: number[]): Pt[] => a.map((v, i) => [i + 1, v])

  return (
    <div className="lab">
      <p className="lab-intro"><Rich text={t(b(
        '突触前以固定频率连续放电 8 次，然后隔 500 ms 再放一次（第 9 个点，看恢复）。抑制型突触（U 大，恢复慢）越来越弱，像一个「变化检测器」；易化型突触（U 小，易化慢衰减）越来越强，像一个「连发检测器」。这就是一种写在突触里的短时记忆，类似 AI 的快权重。',
        'The presynaptic neuron fires 8 spikes at a fixed rate, then once more 500 ms later (point 9, recovery). A depressing synapse (large U, slow recovery) weakens, acting as a change detector; a facilitating one (small U, slow facilitation decay) strengthens, acting as a burst detector. A short-term memory written into the synapse, like AI fast weights.'))} /></p>
      <div className="lab-controls">
        <Slider label={t(b('放电频率 (Hz)', 'Firing rate (Hz)'))} value={freq} min={2} max={100} step={1} onChange={setFreq} />
      </div>
      <LinePlot
        series={[
          { name: t(b('抑制型 $U{=}0.5,\\ \\tau_{\\text{rec}}{=}800$ ms', 'Depressing $U{=}0.5,\\ \\tau_{\\text{rec}}{=}800$ ms')), color: SERIES[0], points: toPts(dep), dots: true },
          { name: t(b('易化型 $U{=}0.1,\\ \\tau_f{=}1000$ ms', 'Facilitating $U{=}0.1,\\ \\tau_f{=}1000$ ms')), color: SERIES[1], points: toPts(fac), dots: true },
        ]}
        xLabel={t(b('第几个脉冲（9 = 恢复脉冲）', 'Spike number (9 = recovery)'))} yLabel={t(b('相对 PSC 幅度', 'Relative PSC'))}
        xDomain={[0.5, 9.5]} height={230} fmtX={(x) => x.toFixed(0)}
      />
    </div>
  )
}

// ───────────── 5. Three-factor learning ─────────────

export function ThreeFactorLab() {
  const t = useT()
  const [delay, setDelay] = useState(1000)
  const [tauE, setTauE] = useState(1000)
  const course = useMemo(() => {
    const e: Pt[] = []
    const m: Pt[] = []
    for (let x = -200; x <= 5000; x += 20) {
      e.push([x, eligibility(x, tauE)])
      m.push([x, x >= delay && x < delay + 200 ? 1 : 0])
    }
    return { e, m }
  }, [delay, tauE])
  const curve = useMemo<Pt[]>(() => Array.from({ length: 101 }, (_, i) => { const d = i * 50; return [d, threeFactorDw(d, tauE)] }), [tauE])

  return (
    <div className="lab">
      <p className="lab-intro"><Rich text={t(b(
        '在 $t = 0$ 时，突触前后同时放电，留下一个逐渐衰减的「资格迹」（蓝）。几百毫秒到几秒后，多巴胺等神经调质信号（橙）到来，只有当资格迹还没衰减完时，突触才会真正改变。右图显示权重变化随奖赏延迟的衰减：资格迹越长，能跨越的时间越久。这正是大脑把「几秒后的结果」分配给「当时的突触」的一种可能方式。',
        'At $t = 0$ pre and post fire together, leaving a decaying eligibility trace (blue). Hundreds of ms to seconds later a neuromodulator such as dopamine arrives (orange); the synapse changes only if the trace has not yet faded. Right: weight change vs reward delay: longer traces bridge longer gaps. One way the brain may assign an outcome seconds later to the synapses that caused it.'))} /></p>
      <div className="lab-controls">
        <Slider label={t(b('奖赏延迟 (ms)', 'Reward delay (ms)'))} value={delay} min={0} max={4800} step={50} onChange={setDelay} />
        <Slider label={t(b('资格迹时间常数 $\\tau_e$ (ms)', 'Trace time constant $\\tau_e$ (ms)'))} value={tauE} min={100} max={3000} step={50} onChange={setTauE} />
      </div>
      <div className="lab-grid two">
        <LinePlot
          series={[
            { name: t(b('资格迹 $e(t)$', 'Eligibility $e(t)$')), color: SERIES[0], points: course.e },
            { name: t(b('神经调质 $M(t)$', 'Neuromodulator $M(t)$')), color: SERIES[1], points: course.m },
          ]}
          xLabel="t (ms)" yLabel={t(b('强度', 'Level'))} yDomain={[0, 1.1]} height={200}
        />
        <LinePlot
          series={[{ name: '$\\Delta w$', color: SERIES[2], points: curve }]}
          xLabel={t(b('奖赏延迟 (ms)', 'Reward delay (ms)'))} yLabel="Δw" yDomain={[0, 1.05]} height={200}
          mark={{ x: delay, y: threeFactorDw(delay, tauE), label: `Δw=${threeFactorDw(delay, tauE).toFixed(2)}` }}
        />
      </div>
    </div>
  )
}
