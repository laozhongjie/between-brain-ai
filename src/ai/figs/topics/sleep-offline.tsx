import { useMemo, useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store } from '../grammar'
import { Axes, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** The sleep and wake cycle: pressure and the clock drive a mutual-inhibition switch, which sets cortical arousal by
 * day and gates sensory input into the sleep cycles by night. */
function SleepWakeArch({ t }: FigProps) {
  const id = 'x01b'
  return (
    <Svg id={id} w={380} h={312} label={t(b('睡眠觉醒周期的结构与信息流', 'Structure and information flow of the sleep and wake cycle'))}>
      <Mod x={14} y={14} w={130} h={38} side="bio" label={t(b('睡眠压力', 'Sleep pressure'))} sub={t(b('腺苷等随清醒积累', 'adenosine builds up'))} />
      <Mod x={236} y={14} w={130} h={38} side="bio" label={t(b('视交叉上核', 'SCN'))} sub={t(b('约 24 小时节律', '~24 hour rhythm'))} />
      <Region x={6} y={72} w={368} h={78} side="bio" label={t(b('睡眠开关', 'Sleep switch'))} />
      <Mod x={18} y={94} w={136} h={44} side="bio" label={t(b('腹外侧视前区', 'VLPO'))} sub={t(b('睡眠神经元', 'sleep neurons'))} />
      <Mod x={226} y={94} w={136} h={44} side="bio" label={t(b('觉醒核团', 'Arousal nuclei'))} sub={t(b('蓝斑、结节乳头核', 'locus coeruleus, TMN'))} />
      <Mod x={14} y={176} w={140} h={40} side="bio" label={t(b('丘脑', 'Thalamus'))} sub={t(b('睡眠时削弱感觉输入', 'damps input in sleep'))} />
      <Mod x={226} y={176} w={140} h={40} side="bio" label={t(b('皮层', 'Cortex'))} sub={t(b('增益随觉醒水平变化', 'gain follows arousal'))} />
      <Region x={6} y={238} w={250} h={66} side="bio" label={t(b('睡眠周期', 'Sleep cycles'))} />
      <Mod x={18} y={258} w={106} h={38} side="bio" label={t(b('深睡', 'Deep sleep'))} sub={t(b('回放与巩固', 'replay, consolidation'))} />
      <Mod x={140} y={258} w={106} h={38} side="bio" label={t(b('快速眼动睡眠', 'REM sleep'))} size={10.5} />
      <Mod x={268} y={250} w={98} h={46} side="bio" label={t(b('维护', 'Maintenance'))} sub={t(b('突触下调、脑脊液', 'downscaling, CSF'))} />

      <Flow id={id} side="bio" kind="fb" pts={[[79, 52], [79, 94]]} label={t(b('促进入睡', 'favors sleep'))} lx={-30} ly={-11} />
      <Flow id={id} side="bio" kind="fb" pts={[[301, 52], [301, 94]]} label={t(b('白天支持清醒', 'supports day wake'))} lx={-46} ly={-11} />
      <Flow id={id} side="bio" kind="fb" pts={[[154, 106], [226, 106]]} label={t(b('抑制', 'inhibits'))} />
      <Flow id={id} side="bio" kind="fb" pts={[[226, 126], [154, 126]]} label={t(b('抑制', 'inhibits'))} ly={9} />
      <Flow id={id} side="bio" kind="fb" pts={[[84, 138], [84, 176]]} label={t(b('入睡时', 'in sleep'))} lx={-28} ly={0} />
      <Flow id={id} side="bio" fast pts={[[296, 138], [296, 176]]} label={t(b('广播递质', 'broadcast'))} lx={-44} ly={0} />
      <Flow id={id} side="bio" pts={[[154, 196], [226, 196]]} label={t(b('感觉输入', 'sensory input'))} />
      <Flow id={id} side="bio" pts={[[84, 216], [84, 258]]} />
      <Flow id={id} side="bio" pts={[[124, 270], [140, 270]]} head="write" />
      <Flow id={id} side="bio" pts={[[140, 286], [124, 286]]} head="write" />
      <Flow id={id} side="bio" kind="fb" pts={[[256, 273], [268, 273]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={236} y={14} n={2} side="bio" />
      <Num x={366} y={72} n={3} side="bio" />
      <Num x={226} y={176} n={4} side="bio" />
      <Num x={248} y={238} n={5} side="bio" />
      <Num x={268} y={250} n={6} side="bio" />
    </Svg>
  )
}

/** Offline training phases: the mainstream train-then-deploy loop with external scheduling, and three research
 * methods that add a sleep-like phase. */
function OfflinePhasesArch({ t }: FigProps) {
  const id = 'x01c'
  return (
    <Svg id={id} w={380} h={304} label={t(b('离线训练阶段的结构与信息流', 'Structure and information flow of offline training phases'))}>
      <Mod x={14} y={14} w={150} h={40} side="comp" label={t(b('离线预训练', 'Offline pretraining'))} sub={t(b('数据中心，数周到数月', 'data center, weeks to months'))} />
      <Mod x={216} y={14} w={150} h={40} side="comp" label={t(b('部署与推理', 'Deployment, inference'))} sub={t(b('多个副本全天服务', 'copies serve all day'))} />
      <Mod x={14} y={86} w={150} h={40} side="comp" label={t(b('外部调度', 'External scheduling'))} sub={t(b('团队决定何时更新', 'a team decides updates'))} />
      <Gap x={216} y={86} w={150} h={40} label={t(b('内部触发', 'Internal trigger'))} />
      <Region x={6} y={148} w={368} h={148} side="comp" label={t(b('睡眠式方法（研究）', 'Sleep-like methods (research)'))} />
      <Mod x={18} y={170} w={112} h={34} side="comp" label={t(b('识别网络', 'Recognition net'))} size={10.5} />
      <Mod x={18} y={250} w={112} h={34} side="comp" label={t(b('生成网络', 'Generative net'))} size={10.5} />
      <Mod x={146} y={170} w={100} h={114} side="comp" label={t(b('睡眠式回放', 'Sleep-like replay'))} sub={t(b('阶跃激活、噪声输入', 'step units, noise'))} size={10.5} />
      <Mod x={256} y={170} w={110} h={40} side="comp" label={t(b('空闲时预计算', 'Sleep-time compute'))} size={10} />
      <Store x={256} y={232} w={110} h={52} side="comp" label={t(b('上下文笔记', 'Context notes'))} sub={t(b('提问时读取', 'read at query'))} />

      <Flow id={id} side="comp" pts={[[164, 30], [216, 30]]} label={t(b('复制', 'copy'))} />
      <Flow id={id} side="comp" kind="fb" pts={[[216, 46], [164, 46]]} label={t(b('交互记录', 'logs'))} ly={9} />
      <Flow id={id} side="comp" kind="fb" pts={[[89, 86], [89, 54]]} label={t(b('安排重训', 'schedules retraining'))} lx={-44} ly={0} />
      <Flow id={id} side="comp" pts={[[50, 204], [50, 250]]} label={t(b('醒相', 'wake'))} lx={-16} ly={0} />
      <Flow id={id} side="comp" pts={[[98, 250], [98, 204]]} label={t(b('睡相', 'sleep'))} lx={17} ly={0} />
      <Flow id={id} side="comp" pts={[[311, 210], [311, 232]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={216} y={14} n={2} side="comp" />
      <Num x={14} y={86} n={3} side="comp" />
      <Num x={18} y={170} n={4} side="comp" />
      <Num x={146} y={170} n={5} side="comp" />
      <Num x={256} y={170} n={6} side="comp" />
    </Svg>
  )
}

/* The two-process model of the worked example: τr = 18.2 h, τd = 4.2 h, thresholds 0.58 and 0.17 ± 0.08,
 * highest at 19:00. Clock time runs from 07:00 on day one. */
const TAU_R = 18.2, TAU_D = 4.2, AMP = 0.08
const theta = (base: number, c: number) => base + AMP * Math.sin((2 * Math.PI * (c - 13)) / 24)
const hiTh = (c: number) => theta(0.58, c)
const loTh = (c: number) => theta(0.17, c)

/** Pressure over two days when bedtime is pushed back `late` hours: awake from 07:00 until 23:00 + late, then asleep
 * until pressure meets the lower threshold, then awake again. */
function sleepRun(late: number) {
  const s0 = 0.09, bed = 16 + late, top = 1 - (1 - s0) * Math.exp(-bed / TAU_R)
  let dur = 0
  while (dur < 14 && top * Math.exp(-dur / TAU_D) > loTh(7 + bed + dur)) dur += 0.01
  const low = top * Math.exp(-dur / TAU_D), wake2 = bed + dur
  const S = (h: number) => (h <= bed ? 1 - (1 - s0) * Math.exp(-h / TAU_R) : h <= wake2 ? top * Math.exp(-(h - bed) / TAU_D) : 1 - (1 - low) * Math.exp(-(h - wake2) / TAU_R))
  return { bed, dur, top, S }
}

/** Interactive: drag how many hours bedtime is pushed back, and see the pressure at bedtime and the length of the
 * recovery sleep. Starts at the worked example's 23:00 bedtime. */
function TwoProcessPlot({ t }: FigProps) {
  const [late, setLate] = useState(0)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 38, y: 26, w: 318, h: 132, xr: [0, 40], yr: [0, 1] }
  const run = sleepRun(late)
  const clock = (h: number) => `${String((7 + h) % 24).padStart(2, '0')}:00`
  const readout = (l: number) => {
    const r = sleepRun(l)
    return t(b(`推迟 $${l}$ 小时：入睡时 $S = ${r.top.toFixed(2)}$，睡 $${r.dur.toFixed(1)}$ 小时`, `$${l}$ h later: $S = ${r.top.toFixed(2)}$ at bedtime, $${r.dur.toFixed(1)}$ h of sleep`))
  }
  return (
    <>
      <Svg id="x01mb0" w={380} h={196} label={t(b('两过程模型：睡眠压力在两条随时刻摆动的阈值之间往返', 'The two-process model: sleep pressure runs between two thresholds that swing with the time of day'))}>
        <Axes f={f} xTicks={[0, 8, 16, 24, 32, 40].map((h) => [h, clock(h)] as [number, string])} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('睡眠压力 S', 'Sleep pressure S'))} anchor="start" />
        <rect x={px(f, run.bed)} y={f.y} width={px(f, run.bed + run.dur) - px(f, run.bed)} height={f.h} fill={C.lav} fillOpacity={0.5} />
        <Label x={(px(f, run.bed) + px(f, run.bed + run.dur)) / 2} y={f.y + 10} s={t(b('睡眠', 'sleep'))} size={9.5} />
        <Path pts={Array.from({ length: 161 }, (_, i) => { const h = (40 * i) / 160; return [px(f, h), py(f, hiTh(7 + h))] as [number, number] })} color={C.dim} dashed />
        <Path pts={Array.from({ length: 161 }, (_, i) => { const h = (40 * i) / 160; return [px(f, h), py(f, loTh(7 + h))] as [number, number] })} color={C.dim} dashed />
        <Label x={f.x + f.w + 3} y={py(f, hiTh(47))} s="θ⁺" anchor="start" size={10} />
        <Label x={f.x + f.w + 3} y={py(f, loTh(47))} s="θ⁻" anchor="start" size={10} />
        <Path pts={Array.from({ length: 401 }, (_, i) => { const h = (40 * i) / 400; return [px(f, h), py(f, run.S(h))] as [number, number] })} color={col} width={2} />
        <Ref f={f} x={run.bed} color={col} />
      </Svg>
      <FigSlider label={t(b('推迟入睡', 'Later bedtime'))} value={late} min={0} max={10} step={1} onChange={setLate} readout={readout(late)} widest={[readout(10)]} />
    </>
  )
}

/** The steady activity of the arousal side as sleep pressure sweeps up and back down, for inhibition strength β. */
function switchBranches(beta: number) {
  const f = (x: number) => 1 / (1 + Math.exp(-10 * x))
  const steady = (S: number, w: number, s: number) => {
    for (let i = 0; i < 300; i++) [w, s] = [w + 0.3 * (-w + f(0.5 - beta * s)), s + 0.3 * (-s + f(0.1 + S - beta * w))]
    return [w, s]
  }
  const Ss = Array.from({ length: 101 }, (_, i) => i / 100)
  const up: number[] = [], down: number[] = []
  let w = 1, s = 0
  for (const S of Ss) { [w, s] = steady(S, w, s); up.push(w) }
  w = 0; s = 1
  for (const S of [...Ss].reverse()) { [w, s] = steady(S, w, s); down.unshift(w) }
  const sleepAt = Ss.find((_, i) => up[i] < 0.5)
  const wakeAt = [...Ss].reverse().find((_, i) => down[100 - i] > 0.5)
  return { Ss, up, down, sleepAt, wakeAt }
}

/** Interactive: drag the strength of mutual inhibition β. Strong inhibition gives a wide hysteresis band (the state
 * holds); weak inhibition narrows it until the switch becomes a gradual slide. Starts at the example's β = 1. */
function SwitchPlot({ t }: FigProps) {
  const [beta, setBeta] = useState(1)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 40, y: 26, w: 230, h: 132, xr: [0, 1], yr: [0, 1] }
  const br = useMemo(() => switchBranches(beta), [beta])
  const line = (vs: number[]) => br.Ss.map((S, i) => [px(f, S), py(f, vs[i])] as [number, number])
  const readout = (v: number) => {
    const r = switchBranches(v)
    return r.sleepAt !== undefined && r.wakeAt !== undefined && r.wakeAt < r.sleepAt
      ? t(b(`$\\beta = ${v.toFixed(1)}$：$S > ${r.sleepAt.toFixed(2)}$ 入睡，$S < ${r.wakeAt.toFixed(2)}$ 醒来`, `$\\beta = ${v.toFixed(1)}$: sleep above $${r.sleepAt.toFixed(2)}$, wake below $${r.wakeAt.toFixed(2)}$`))
      : t(b(`$\\beta = ${v.toFixed(1)}$：没有开关，逐渐过渡`, `$\\beta = ${v.toFixed(1)}$: no switch, a gradual slide`))
  }
  return (
    <>
      <Svg id="x01mb1" w={380} h={196} label={t(b('睡眠开关的回滞：压力上升时入睡点高，下降时醒来点低', 'Hysteresis of the sleep switch: the sleep point on the way up lies above the wake point on the way down'))}>
        <Axes f={f} xTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('睡眠压力 S', 'Sleep pressure S'))} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('觉醒侧活动', 'Wake side activity'))} anchor="start" />
        {br.sleepAt !== undefined && br.wakeAt !== undefined && br.wakeAt < br.sleepAt && (
          <rect x={px(f, br.wakeAt)} y={f.y} width={px(f, br.sleepAt) - px(f, br.wakeAt)} height={f.h} fill={C.lav} fillOpacity={0.5} />
        )}
        <Path pts={line(br.down)} color={col} width={1.6} opacity={0.5} dashed />
        <Path pts={line(br.up)} color={col} width={2} />
        <Label x={284} y={52} s={t(b('实线：压力上升\n（从清醒出发）', 'solid: pressure rising\n(starting awake)'))} anchor="start" size={9.5} color={col} />
        <Label x={284} y={100} s={t(b('虚线：压力下降\n（从睡眠出发）', 'dashed: pressure falling\n(starting asleep)'))} anchor="start" size={9.5} />
        <Label x={284} y={142} s={t(b('灰底：两种状态\n都稳定', 'shaded: both states\nare stable'))} anchor="start" size={9.5} />
      </Svg>
      <FigSlider label="$\beta$" value={beta} min={0.4} max={1.2} step={0.1} onChange={setBeta} readout={readout(beta)} widest={[readout(0.8), readout(0.4)]} />
    </>
  )
}

export const SLEEP_OFFLINE_FIGS: TopicFigs = {
  arch: { brain: SleepWakeArch, ai: OfflinePhasesArch },
  math: {
    bio: {
      0: { Fig: TwoProcessPlot, cap: b('从 $7$ 点起床开始画两天。睡眠压力（实线）白天上升，碰到上阈值 $\\theta^{+}$ 入睡，睡眠中下降，碰到下阈值 $\\theta^{-}$ 醒来。拖动滑块推迟入睡：通宵到次日 $7$ 点时 $S \\approx 0.76$，但下阈值正在回升，补觉只有约 $6$ 小时。', 'Two days from waking at $7$:00. Sleep pressure, the solid line, rises by day, meets the upper threshold $\\theta^{+}$ and sleep starts, then falls until it meets the lower threshold $\\theta^{-}$. Drag the slider to delay bedtime. Up all night until $7$:00, $S \\approx 0.76$, but the lower threshold is rising, so recovery sleep lasts only about $6$ hours.') },
      1: { Fig: SwitchPlot, cap: b('让睡眠压力 $S$ 从 $0$ 升到 $1$ 再降回 $0$，记录觉醒侧活动 $u_W$ 的稳定值。$\\beta = 1$ 时，上升途中约 $0.72$ 才入睡，下降途中约 $0.08$ 才醒来，灰底区间里状态由历史决定。拖小 $\\beta$，灰底变窄，再小就不再有开关。', 'Sleep pressure $S$ rises from $0$ to $1$ and falls back, and the steady value of wake-side activity $u_W$ is recorded. At $\\beta = 1$, sleep starts near $0.72$ on the way up and waking near $0.08$ on the way down, and in the shaded band history decides the state. A smaller $\\beta$ narrows the band, and smaller still there is no switch.') },
    },
  },
}
