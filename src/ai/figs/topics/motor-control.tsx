import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, Vec, gauss, px, py, rng, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Motor cortex drives the spinal cord and sends a copy to the cerebellum; spinal reflexes, transcortical feedback and co-contraction act at three speeds. */
function MotorBrainArch({ t }: FigProps) {
  const id = 'f26b'
  return (
    <Svg id={id} w={380} h={286} label={t(b('运动控制的结构与信息流：顶叶与运动前区、初级运动皮层、小脑、脊髓反射、经皮层反馈、刚度调节', 'Motor control: parietal and premotor areas, primary motor cortex, cerebellum, spinal reflex, transcortical feedback, stiffness'))}>
      <Mod x={14} y={14} w={170} h={40} side="bio" label={t(b('顶叶与运动前区', 'Parietal, premotor'))} sub={t(b('按目标与身体状态定动作', 'action from goal and body state'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('初级运动皮层', 'Primary motor cortex'))} sub={t(b('发出指令', 'sends the command'))} size={10.5} />
      <Mod x={196} y={86} w={170} h={40} side="bio" label={t(b('小脑', 'Cerebellum'))} sub={t(b('前向模型：预测并校正', 'forward model: predict, correct'))} size={10.5} />
      <Mod x={14} y={158} w={170} h={40} side="bio" label={t(b('脊髓', 'Spinal cord'))} sub={t(b('运动神经元', 'motor neurons'))} size={10.5} />
      <Mod x={14} y={232} w={170} h={40} side="bio" label={t(b('肌肉', 'Muscles'))} sub={t(b('肌梭感受意外的拉长', 'spindles sense a stretch'))} size={10.5} />
      <Mod x={196} y={232} w={170} h={40} side="bio" label={t(b('刚度调节', 'Stiffness control'))} sub={t(b('拮抗肌同时收缩', 'antagonists co-contract'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[184, 34], [196, 34]]} />
      <Flow id={id} side="bio" pts={[[210, 54], [210, 68], [60, 68], [60, 158]]} label={t(b('皮质脊髓束', 'corticospinal'))} at={2} lx={32} ly={-8} />
      <Flow id={id} side="bio" pts={[[270, 54], [270, 86]]} label={t(b('副本', 'copy'))} lx={-16} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[340, 86], [340, 54]]} label={t(b('校正', 'correct'))} lx={18} ly={0} />
      <Flow id={id} side="bio" fast pts={[[99, 198], [99, 232]]} />
      <Flow id={id} side="bio" fast pts={[[40, 232], [40, 198]]} curve={[14, 215]} />
      <T x={66} y={215} s={t(b('反射\n约 30 毫秒', 'reflex\n~30 ms'))} size={9} color={C.pinkD} />
      <Flow id={id} side="bio" kind="fb" pts={[[170, 232], [170, 214], [190, 214], [190, 40], [196, 40]]} label={t(b('经皮层\n50 到 100 毫秒', 'via cortex\n50 to 100 ms'))} at={2} lx={-42} ly={-6} />
      <Flow id={id} side="bio" head="none" pts={[[184, 252], [196, 252]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={196} y={14} n={2} side="bio" />
      <Num x={196} y={86} n={3} side="bio" />
      <Num x={14} y={158} n={4} side="bio" />
      <Num x={190} y={186} n={5} side="bio" />
      <Num x={196} y={232} n={6} side="bio" />
    </Svg>
  )
}

/** State estimation feeds MPC (or a learned policy); the first planned step goes to kilohertz joint controllers, and the loop repeats. */
function RobotControlArch({ t }: FigProps) {
  const id = 'f26c'
  return (
    <Svg id={id} w={380} h={306} label={t(b('机器人反馈控制与 MPC 的结构与信息流：状态估计、MPC 优化、滚动执行、底层反馈、学习型策略', 'Robot control and MPC: state estimation, MPC optimization, receding horizon, low-level feedback, learned policies'))}>
      <Mod x={14} y={14} w={352} h={36} side="comp" label={t(b('状态估计', 'State estimation'))} sub={t(b('编码器、惯性测量单元和相机，经卡尔曼滤波合成', 'encoders, IMU and cameras, fused by a Kalman filter'))} size={10.5} />
      <Region x={6} y={68} w={250} h={118} side="comp" label="MPC" />
      <Mod x={18} y={92} w={226} h={36} side="comp" label={t(b('MPC 优化', 'MPC optimization'))} sub={t(b('预测 0.5 秒，求最优动作序列', 'predict 0.5 s, solve for the best actions'))} size={10.5} />
      <Mod x={18} y={140} w={226} h={36} side="comp" label={t(b('滚动执行', 'Receding horizon'))} sub={t(b('只执行第一步，下个周期重算', 'run the first step, re-solve next cycle'))} size={10.5} />
      <Mod x={268} y={92} w={100} h={84} side="comp" label={t(b('学习型策略', 'Learned policy'))} sub={t(b('仿真中训练', 'trained in simulation'))} size={10.5} />
      <Mod x={14} y={206} w={352} h={36} side="comp" label={t(b('底层反馈', 'Low-level feedback'))} sub={t(b('每个关节以千赫兹频率跟踪目标', 'each joint tracks its target at kilohertz rates'))} size={10.5} />
      <Gap x={14} y={262} w={352} h={32} label={t(b('像皮肤一样密集的触觉，像肌肉一样可调的柔顺性', 'Skin-like dense touch, muscle-like adjustable compliance'))} />

      <Flow id={id} side="comp" pts={[[131, 50], [131, 92]]} />
      <Flow id={id} side="comp" pts={[[131, 128], [131, 140]]} />
      <Flow id={id} side="comp" pts={[[318, 50], [318, 92]]} />
      <Flow id={id} side="comp" pts={[[131, 176], [131, 206]]} />
      <Flow id={id} side="comp" pts={[[318, 176], [318, 206]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[366, 224], [374, 224], [374, 32], [366, 32]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={92} n={2} side="comp" />
      <Num x={18} y={140} n={3} side="comp" />
      <Num x={14} y={206} n={4} side="comp" />
      <Num x={268} y={92} n={5} side="comp" />
      <Num x={14} y={262} n={6} side="comp" />
    </Svg>
  )
}

/** Minimal intervention under optimal feedback control: pressing a button needs vertical precision (Q = 100) but not
 * horizontal (Q = 1), so endpoints scatter widely sideways and tightly up and down. Seeded, illustrative spread. */
function MinimalInterventionPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const u = rng(5), cx = 120, cy = 100
  const pts = Array.from({ length: 40 }, () => [cx + 26 * gauss(u), cy + 4 * gauss(u)])
  return (
    <Svg id="f26mb0" w={380} h={190} label={t(b('最优反馈控制：只纠正影响任务的方向，落点在不影响任务的方向上分散', 'Optimal feedback control: only deviations that matter are corrected, so endpoints spread along the direction that does not'))}>
      <rect x={cx - 70} y={cy + 16} width={140} height={30} rx={6} fill={C.ghost} stroke={C.line} />
      <Label x={cx} y={cy + 31} s={t(b('按钮', 'button'))} size={10} />
      <line x1={cx - 80} x2={cx + 80} y1={cy} y2={cy} stroke={C.dim} strokeDasharray="3 3" />
      <ellipse cx={cx} cy={cy} rx={52} ry={8} fill="none" stroke={col} strokeOpacity={0.6} />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.4} fill={col} fillOpacity={0.8} />)}
      <Vec x1={cx} y1={40} x2={cx} y2={cy - 12} color={C.dim} width={1.2} />
      <Label x={cx} y={30} s={t(b('按下的方向', 'pressing direction'))} size={10} />
      <Label x={226} y={70} s={t(b('垂直方向：Q = 100\n偏差被迅速纠正', 'vertical: Q = 100\ndeviations corrected fast'))} anchor="start" size={10} color={col} />
      <Label x={226} y={120} s={t(b('水平方向：Q = 1\n偏差基本保留', 'horizontal: Q = 1\ndeviations left alone'))} anchor="start" size={10} />
      <Label x={cx} y={160} s={t(b('每个点是一次按键时手指的落点（示意）', 'each dot: where one press landed (illustrative)'))} size={9.5} />
    </Svg>
  )
}

/** Stiffness by co-contraction, interactive: an outside torque of 2 units deflects the joint by 2 / K, and stiffening
 * costs energy roughly in proportion to K. Starts at the worked example's K = 4. */
function StiffnessPlot({ t }: FigProps) {
  const [K, setK] = useState(4)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 44, y: 30, w: 210, h: 124, xr: [0.5, 6], yr: [0, 4] }
  const f2: Frame = { x: 300, y: 30, w: 50, h: 124, xr: [0, 1], yr: [0, 6] }
  const readout = (k: number) => t(b(`$K = ${k.toFixed(1)}$：被推偏 ${(2 / k).toFixed(2)}`, `$K = ${k.toFixed(1)}$: pushed ${(2 / k).toFixed(2)} off`))
  return (
    <>
      <Svg id="f26mb1" w={380} h={198} label={t(b('刚度调节：同时收紧拮抗肌，关节被外力推偏得更少，但更耗能', 'Stiffness: co-contracting opposing muscles lets an outside force push the joint less, at an energy cost'))}>
        <Axes f={f} xTicks={[[1, '1'], [2, '2'], [4, '4'], [6, '6']]} yTicks={[[0, '0'], [1, '1'], [2, '2'], [4, '4']]} xLabel={t(b('刚度 K（收紧程度）', 'Stiffness K (co-contraction)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('外力矩 2 时被推偏多少', 'Deflection under a torque of 2'))} anchor="start" />
        <Path pts={trace(f, (k) => 2 / k, 0.5, 6, 120)} color={col} opacity={0.45} />
        <Dot f={f} x={K} y={2 / K} color={col} r={4} />
        <line x1={f2.x} x2={f2.x + f2.w} y1={f2.y + f2.h} y2={f2.y + f2.h} stroke={C.dim} />
        <Bar f={f2} x={0.5} v={K} w={0.6} color={C.lemonD} />
        <Label x={f2.x + f2.w / 2} y={f2.y + f2.h + 12} s={t(b('能耗', 'energy'))} size={10} color={C.lemonD} />
      </Svg>
      <FigSlider label="$K$" value={K} min={0.5} max={6} step={0.1} onChange={setK} readout={readout(K)} widest={[1].map(readout)} />
    </>
  )
}

/** Model predictive control tracking a reference of 1: at each control step a 0.5 s prediction is solved (dashed); after
 * a sideways push at 0.5 s the next prediction starts from the new state. First-order dynamics, τ = 0.15 s. */
function MpcPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const tau = 0.15, push = 0.5, drop = 0.45
  const x = (s: number) => { const a = 1 - Math.exp(-s / tau); if (s < push) return a; const at = 1 - Math.exp(-push / tau) - drop; return 1 - (1 - at) * Math.exp(-(s - push) / tau) }
  const f: Frame = { x: 40, y: 30, w: 300, h: 124, xr: [0, 1.2], yr: [0, 1.15] }
  const pred = (s0: number, x0: number) => trace(f, (s) => 1 - (1 - x0) * Math.exp(-(s - s0) / tau), s0, Math.min(1.2, s0 + 0.5), 40)
  const after = 1 - Math.exp(-push / tau) - drop
  return (
    <Svg id="f26mc0" w={380} h={198} label={t(b('模型预测控制：每个周期预测未来一段并重新求解，被推之后从新的状态出发预测', 'Model predictive control: each cycle predicts ahead and re-solves, and after a push the prediction starts from the new state'))}>
      <Axes f={f} xTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('时间（秒）', 'Time (s)'))} grid />
      <Label x={f.x - 4} y={f.y - 12} s={t(b('身体位置', 'Body position'))} anchor="start" />
      <Ref f={f} y={1} />
      <Path pts={trace(f, x, 0, 1.2, 240)} color={col} width={3} opacity={0.45} />
      {([[0, 0], [0.3, x(0.3)], [push + 0.0001, after]] as [number, number][]).map(([s0, x0]) => (
        <g key={s0}>
          <Path pts={pred(s0, x0)} color={C.lemonD} dashed width={1.6} />
          <circle cx={px(f, s0)} cy={py(f, x0)} r={3.5} fill={C.lemonD} />
        </g>
      ))}
      <Vec x1={px(f, push) + 16} y1={py(f, 1.08)} x2={px(f, push) + 3} y2={py(f, after + 0.2)} color={C.ink} width={1.2} />
      <Label x={px(f, push) + 20} y={py(f, 1.08)} s={t(b('被侧向推了一下', 'a sideways push'))} anchor="start" size={10} color={C.ink} />
      <Label x={px(f, 0.85)} y={py(f, 0.62)} s={t(b('黄点：一个周期开始预测\n黄虚线：预测的未来 0.5 秒\n蓝线：实际轨迹', 'yellow dot: a cycle starts\nyellow dashes: its 0.5 s forecast\nblue: actual path'))} size={9.5} />
    </Svg>
  )
}

/** PD control of a unit-inertia joint (K_p = 50), interactive: a step from 0.9 to 1.0 rad; drag K_d from underdamped to
 * overdamped. Damping ratio K_d / (2√K_p). Starts at the worked example's K_d = 2. */
function PdStepPlot({ t }: FigProps) {
  const [kd, setKd] = useState(2)
  const col = SIDE_COLOR.comp
  const kp = 50, T = 2, dt = 0.002
  const sim = (d: number) => { const out: [number, number][] = []; let th = 0.9, w = 0; for (let s = 0; s <= T + 1e-9; s += dt) { out.push([s, th]); const a = kp * (1 - th) - d * w; w += a * dt; th += w * dt } return out }
  const zeta = (d: number) => d / (2 * Math.sqrt(kp))
  const over = (d: number) => { const z = zeta(d); return z >= 1 ? 0 : Math.exp((-Math.PI * z) / Math.sqrt(1 - z * z)) }
  const f: Frame = { x: 44, y: 30, w: 296, h: 124, xr: [0, T], yr: [0.88, 1.12] }
  const readout = (d: number) => t(b(`$K_d = ${d.toFixed(1)}$：阻尼比 ${zeta(d).toFixed(2)}，冲过头 ${Math.round(over(d) * 100)}%`, `$K_d = ${d.toFixed(1)}$: damping ratio ${zeta(d).toFixed(2)}, overshoot ${Math.round(over(d) * 100)}%`))
  return (
    <>
      <Svg id="f26mc1" w={380} h={198} label={t(b('PD 控制：微分增益小时关节来回振荡，大到临界阻尼时平稳到达', 'PD control: with a small derivative gain the joint oscillates; near critical damping it arrives smoothly'))}>
        <Axes f={f} xTicks={[[0, '0'], [0.5, '0.5'], [1, '1'], [2, '2']]} yTicks={[[0.9, '0.9'], [1, '1.0'], [1.1, '1.1']]} xLabel={t(b('时间（秒）', 'Time (s)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('关节角度（弧度）', 'Joint angle (rad)'))} anchor="start" />
        <Ref f={f} y={1} color={C.lemonD} />
        <Path pts={sim(kd).filter((_, i) => i % 2 === 0).map(([s, v]) => [px(f, s), py(f, Math.max(0.88, Math.min(1.12, v)))] as [number, number])} color={col} />
        <Label x={f.x + f.w - 4} y={py(f, 1) - 9} s={t(b('目标 1.0', 'target 1.0'))} anchor="end" size={10} color={C.lemonD} />
      </Svg>
      <FigSlider label="$K_d$" value={kd} min={0} max={20} step={0.2} onChange={setKd} readout={readout(kd)} widest={[10, 2, 0].map(readout)} />
    </>
  )
}

export const MOTOR_FIGS: TopicFigs = {
  arch: { brain: MotorBrainArch, ai: RobotControlArch },
  math: {
    bio: {
      0: { Fig: MinimalInterventionPlot, cap: b('示意：按按钮时垂直方向要精确（$Q = 100$），水平方向偏一点无所谓（$Q = 1$）。最优反馈控制给垂直方向很大的增益、水平方向很小的增益，所以每次按键的落点在水平方向分散、垂直方向集中，实验中手的变异也是这样分布的。', 'Illustration: pressing a button needs vertical precision ($Q = 100$) while a little sideways error does not matter ($Q = 1$). Optimal feedback control gives the vertical direction a large gain and the horizontal a small one, so landing points spread sideways and stay tight vertically, as measured hand variability does.') },
      1: { Fig: StiffnessPlot, cap: b('拖动滑块改变刚度 $K$。外力矩为 $2$，关节被推偏 $2/K$：肌肉放松（$K = 1$）时偏 $2$，默认同时收紧到 $K = 4$ 时只偏 $0.5$。收紧越多越耗能（右边的柱），所以人只在需要时、只在需要的方向上提高刚度。', 'Drag the slider to change the stiffness $K$. An outside torque of $2$ deflects the joint by $2/K$: $2$ with relaxed muscles ($K = 1$), only $0.5$ at the default co-contraction $K = 4$. Stiffening costs energy (the bar on the right), so people raise stiffness only when and where it is needed.') },
    },
    comp: {
      0: { Fig: MpcPlot, cap: b('示意：一维的位置跟踪目标 $1$。每个周期从当前状态出发，求解未来 0.5 秒的最优动作（虚线是预测），只执行第一步。0.5 秒时被推了一下，下一个周期的预测就从新的位置出发，动作随之调整。', 'Illustration: a 1D position tracking a target of $1$. Each cycle solves for the best actions over the next 0.5 s from the current state (dashed: the prediction) and executes only the first. At 0.5 s a push knocks it off, and the next cycle’s prediction starts from the new position, so the actions adjust.') },
      1: { Fig: PdStepPlot, cap: b('拖动滑块改变微分增益 $K_d$，$K_p = 50$，关节从 $0.9$ 弧度出发去 $1.0$。默认 $K_d = 2$ 时阻尼很小，关节冲过目标约 $64\\%$ 再来回振荡；增大 $K_d$，振荡减弱，约 $14$ 时达到临界阻尼，平稳到达而不冲过头。$K_p$ 相当于刚度，$K_d$ 相当于阻尼。', 'Drag the slider to change the derivative gain $K_d$, with $K_p = 50$, as the joint moves from $0.9$ rad to $1.0$. At the default $K_d = 2$ damping is light: the joint overshoots by about $64\\%$ and swings back and forth. Raising $K_d$ calms the swings, and near $14$ the system is critically damped and arrives without overshoot. $K_p$ plays stiffness and $K_d$ damping.') },
    },
  },
}
