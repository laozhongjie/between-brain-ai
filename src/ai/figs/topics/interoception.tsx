import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num } from '../grammar'
import { Axes, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, Vec, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Body signals reach the hypothalamus, which compares them with set points and regulates, drives motivation and value; the insula integrates; prediction regulates ahead. */
function InteroceptionBrainArch({ t }: FigProps) {
  const id = 'f34b'
  return (
    <Svg id={id} w={380} h={276} label={t(b('下丘脑与岛叶调节的结构与信息流：内感受信号、脑干与下丘脑、自动调节、动机与价值、岛叶、预测性调节', 'Hypothalamic and insular regulation: interoceptive signals, brainstem and hypothalamus, automatic regulation, drive and value, insula, predictive regulation'))}>
      <Mod x={14} y={14} w={352} h={36} side="bio" label={t(b('内感受器', 'Interoceptors'))} sub={t(b('血糖、渗透压、体温、心跳、胃肠', 'glucose, osmolality, temperature, heart, gut'))} size={10.5} />
      <Mod x={14} y={80} w={170} h={40} side="bio" label={t(b('脑干与下丘脑', 'Brainstem, hypothalamus'))} sub={t(b('与设定点比较，如 37 摄氏度', 'compare with set points, e.g. 37 °C'))} size={10.5} />
      <Mod x={196} y={80} w={170} h={40} side="bio" label={t(b('岛叶', 'Insula'))} sub={t(b('从后到前整合，形成整体感受', 'integrated back to front'))} size={10.5} />
      <Mod x={14} y={152} w={170} h={40} side="bio" label={t(b('自动调节', 'Automatic regulation'))} sub={t(b('出汗、心率、胰岛素、激素', 'sweat, heart, insulin, hormones'))} size={10.5} />
      <Mod x={196} y={152} w={170} h={40} side="bio" label={t(b('动机与价值', 'Drive and value'))} sub={t(b('饥饿、口渴；食物与水更有价值', 'hunger, thirst; food, water gain value'))} size={10.5} />
      <Mod x={14} y={222} w={352} h={40} side="bio" label={t(b('预测性调节', 'Predictive regulation'))} sub={t(b('预期进食或运动时提前调整', 'adjusts ahead of an expected meal or exercise'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[99, 50], [99, 80]]} label={t(b('迷走神经与脊髓', 'vagus, spinal cord'))} lx={44} ly={0} />
      <Flow id={id} side="bio" pts={[[281, 50], [281, 80]]} />
      <Flow id={id} side="bio" pts={[[99, 120], [99, 152]]} />
      <Flow id={id} side="bio" pts={[[150, 120], [150, 136], [250, 136], [250, 152]]} />
      <Flow id={id} side="bio" pts={[[320, 120], [320, 152]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[14, 172], [8, 172], [8, 32], [14, 32]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[70, 222], [70, 192]]} label={t(b('提前', 'ahead'))} lx={18} ly={0} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={80} n={2} side="bio" />
      <Num x={14} y={152} n={3} side="bio" />
      <Num x={196} y={152} n={4} side="bio" />
      <Num x={196} y={80} n={5} side="bio" />
      <Num x={14} y={222} n={6} side="bio" />
    </Svg>
  )
}

/** Robot sensors give a drive against target ranges; protection acts directly, the drive's reduction becomes a reward for the policy, and planning schedules charging. */
function HomeostaticRlArch({ t }: FigProps) {
  const id = 'f34c'
  return (
    <Svg id={id} w={380} h={256} label={t(b('稳态强化学习与资源管理的结构与信息流：内部传感器、与目标范围比较、底层保护、稳态奖励、资源规划', 'Homeostatic RL and resource management: internal sensors, target ranges, low-level protection, homeostatic reward, resource planning'))}>
      <Mod x={14} y={14} w={352} h={36} side="comp" label={t(b('内部传感器', 'Internal sensors'))} sub={t(b('电量、电机温度、关节负载', 'battery, motor temperature, joint load'))} size={10.5} />
      <Mod x={14} y={74} w={170} h={40} side="comp" label={t(b('与目标范围比较', 'Target ranges'))} sub={t(b('合成一个驱力', 'combined into one drive'))} size={10.5} />
      <Mod x={196} y={74} w={170} h={40} side="comp" label={t(b('底层保护', 'Low-level protection'))} sub={t(b('过热降速，电量低时停止', 'slow when hot, stop when low'))} size={10.5} />
      <Mod x={14} y={138} w={170} h={40} side="comp" label={t(b('稳态奖励', 'Homeostatic reward'))} sub={t(b('驱力减少量加任务奖励', 'drive reduction plus task reward'))} size={10.5} />
      <Mod x={196} y={138} w={170} h={40} side="comp" label={t(b('资源规划', 'Resource planning'))} sub={t(b('按预测能耗安排充电', 'charging from predicted use'))} size={10.5} />
      <Mod x={14} y={202} w={170} h={40} side="comp" label={t(b('策略', 'Policy'))} sub={t(b('在任务与维持自身之间权衡', 'balances task and upkeep'))} size={10.5} />
      <Gap x={196} y={202} w={170} h={40} label={t(b('内部状态渗透到\n感知、学习与价值', 'Inner state reaching\nperception, learning, value'))} />

      <Flow id={id} side="comp" pts={[[99, 50], [99, 74]]} />
      <Flow id={id} side="comp" fast pts={[[281, 50], [281, 74]]} />
      <Flow id={id} side="comp" pts={[[99, 114], [99, 138]]} />
      <Flow id={id} side="comp" pts={[[170, 114], [170, 126], [260, 126], [260, 138]]} />
      <Flow id={id} side="comp" pts={[[99, 178], [99, 202]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={74} n={2} side="comp" />
      <Num x={196} y={74} n={3} side="comp" />
      <Num x={14} y={138} n={4} side="comp" />
      <Num x={196} y={138} n={5} side="comp" />
      <Num x={196} y={202} n={6} side="comp" />
    </Svg>
  )
}

/** Blood glucose after a meal under feedback alone and with predictive regulation, interactive: drag the predictive gain
 * k_f. Illustrative dynamics: dx/dt = g(t) − k(x − 5) − k_f s g(t + Δ) with a meal bump g, k = 0.03 /min, Δ = 12 min. */
function GlucosePlot({ t }: FigProps) {
  const [kf, setKf] = useState(0.5)
  const col = SIDE_COLOR.bio
  const A = 0.15, s = 0.12, k = 0.03, D = 12, dt = 1
  const g = (m: number) => A * Math.exp(-((m - 60) ** 2) / (2 * 18 * 18))
  const run = (gain: number) => { const out: [number, number][] = []; let x = 5; for (let m = 0; m <= 240; m += dt) { out.push([m, x]); x += (g(m) - k * (x - 5) - gain * s * (g(m + D) / A)) * dt } return out }
  const peak = (gain: number) => Math.max(...run(gain).map((p) => p[1]))
  const f: Frame = { x: 44, y: 30, w: 270, h: 124, xr: [0, 240], yr: [4, 9] }
  const line = (pts: [number, number][]) => pts.map(([m, x]) => [px(f, m), py(f, x)] as [number, number])
  const readout = (v: number) => t(b(`$k_f = ${v.toFixed(2)}$：峰值 ${peak(v).toFixed(1)}，只有反馈时 ${peak(0).toFixed(1)}`, `$k_f = ${v.toFixed(2)}$: peak ${peak(v).toFixed(1)}, feedback alone ${peak(0).toFixed(1)}`))
  return (
    <>
      <Svg id="f34mb0" w={380} h={198} label={t(b('预测调节：在血糖升高之前就开始调节，峰值更低', 'Predictive regulation: acting before glucose rises keeps the peak lower'))}>
        <rect x={px(f, 42)} y={f.y} width={px(f, 78) - px(f, 42)} height={f.h} fill={C.lemonD} fillOpacity={0.06} />
        <Axes f={f} xTicks={[[0, '0'], [60, '60'], [120, '120'], [240, '240']]} yTicks={[[5, '5'], [7, '7'], [9, '9']]} xLabel={t(b('时间（分钟）', 'Time (min)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('血糖', 'Blood glucose'))} anchor="start" />
        <Label x={px(f, 60)} y={f.y + 10} s={t(b('进食吸收', 'meal absorbed'))} size={10} color={C.lemonD} />
        <Ref f={f} y={5} />
        <Path pts={line(run(0))} color={C.dim} />
        <Path pts={line(run(kf))} color={col} />
        <Label x={f.x + f.w + 4} y={py(f, 5) - 8} s={t(b('设定点 5', 'set point 5'))} anchor="start" size={10} />
        <Label x={px(f, 150)} y={py(f, 4.45)} s={t(b('灰：只有反馈　粉：加上预测', 'gray: feedback only   pink: with prediction'))} size={10} />
      </Svg>
      <FigSlider label={t(b('预测增益 $k_f$', 'Predictive gain $k_f$'))} value={kf} min={0} max={1} step={0.01} onChange={setKf} readout={readout(kf)} widest={[0.5].map(readout)} />
    </>
  )
}

/** Value depending on need, V = r₀ (h* − h) / h* with r₀ = 10 and h* = 100, interactive: drag the reserve h. Starts at
 * the worked example's 40. */
function NeedValuePlot({ t }: FigProps) {
  const [h, setH] = useState(40)
  const col = SIDE_COLOR.bio
  const V = (x: number) => (10 * (100 - x)) / 100
  const f: Frame = { x: 44, y: 30, w: 270, h: 124, xr: [0, 100], yr: [0, 10] }
  const readout = (x: number) => t(b(`储备 ${x}：食物价值 ${V(x).toFixed(1)}`, `reserve ${x}: food worth ${V(x).toFixed(1)}`))
  return (
    <>
      <Svg id="f34mb1" w={380} h={198} label={t(b('需要改变价值：储备越少，同样的食物越有价值', 'Need changes value: the lower the reserve, the more the same food is worth'))}>
        <Axes f={f} xTicks={[[0, '0'], [40, '40'], [90, '90'], [100, '100']]} yTicks={[[0, '0'], [5, '5'], [10, '10']]} xLabel={t(b('能量储备 h（设定点 100）', 'Energy reserve h (set point 100)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('同一份食物的价值', 'Value of the same food'))} anchor="start" />
        <Path pts={trace(f, V, 0, 100, 2)} color={col} opacity={0.45} />
        <Dot f={f} x={h} y={V(h)} color={col} r={4} />
        <Label x={px(f, 90)} y={py(f, V(90)) - 12} s={t(b('吃饱了', 'sated'))} size={10} />
        <Label x={px(f, 8)} y={py(f, V(8)) + 14} s={t(b('很饿', 'very hungry'))} anchor="start" size={10} />
      </Svg>
      <FigSlider label={t(b('储备 $h$', 'Reserve $h$'))} value={h} min={0} max={100} step={1} onChange={setH} readout={readout(h)} widest={[40, 100].map(readout)} />
    </>
  )
}

/** Homeostatic reward on the worked example (set point (10, 10), n = m = 2, water fixed at 9), interactive: drag the
 * current energy; one meal adds 2. The reward is the drop in distance to the set point. */
function DrivePlot({ t }: FigProps) {
  const [en, setEn] = useState(6)
  const col = SIDE_COLOR.comp
  const D = (e: number, w = 9) => Math.hypot(10 - e, 10 - w)
  const r = (e: number) => D(e) - D(e + 2)
  const f: Frame = { x: 40, y: 22, w: 150, h: 150, xr: [3, 15], yr: [3, 15] }
  const sc = f.w / 12
  const readout = (e: number) => t(b(`能量 ${e.toFixed(1)} → ${(e + 2).toFixed(1)}：奖励 ${r(e) >= 0 ? '+' : '−'}${Math.abs(r(e)).toFixed(2)}`, `energy ${e.toFixed(1)} → ${(e + 2).toFixed(1)}: reward ${r(e) >= 0 ? '+' : '−'}${Math.abs(r(e)).toFixed(2)}`))
  return (
    <>
      <Svg id="f34mc0" w={380} h={206} label={t(b('稳态奖励：离设定点更近就是正奖励，吃过头离得更远就是负奖励', 'Homeostatic reward: getting closer to the set point is rewarded, overshooting it is punished'))}>
        {[1, 2, 3, 4, 5].map((rad) => <circle key={rad} cx={px(f, 10)} cy={py(f, 10)} r={rad * sc} fill="none" stroke={C.dim} strokeOpacity={0.35} />)}
        <Axes f={f} xTicks={[[6, '6'], [10, '10'], [14, '14']]} yTicks={[[6, '6'], [10, '10'], [14, '14']]} xLabel={t(b('能量', 'Energy'))} />
        <Label x={f.x - 4} y={f.y - 10} s={t(b('水分', 'Water'))} anchor="start" />
        <circle cx={px(f, 10)} cy={py(f, 10)} r={3.5} fill={C.ink} />
        <Vec x1={px(f, en)} y1={py(f, 9)} x2={px(f, en + 2)} y2={py(f, 9)} color={r(en) >= 0 ? col : C.lemonD} width={2} />
        <circle cx={px(f, en)} cy={py(f, 9)} r={3.5} fill={C.white} stroke={col} strokeWidth={1.5} />
        <Label x={214} y={44} s={t(b('白点：设定点 (10, 10)\n圆圈：驱力相等的位置', 'white: set point (10, 10)\ncircles: equal drive'))} anchor="start" size={10} color={C.ink} />
        <Label x={214} y={94} s={t(b('箭头：吃一份，能量 +2', 'arrow: one meal, energy +2'))} anchor="start" size={10} />
        <Label x={214} y={130} s={r(en) >= 0 ? t(b('离设定点更近：正奖励', 'closer to the set point:\npositive reward')) : t(b('吃过头、离得更远：\n负奖励', 'overshoot, farther away:\nnegative reward'))} anchor="start" size={10} color={r(en) >= 0 ? col : C.lemonD} />
      </Svg>
      <FigSlider label={t(b('当前能量', 'Current energy'))} value={en} min={4} max={12} step={0.1} onChange={setEn} readout={readout(en)} widest={[10, 6].map(readout)} />
    </>
  )
}

export const INTEROCEPTION_FIGS: TopicFigs = {
  arch: { brain: InteroceptionBrainArch, ai: HomeostaticRlArch },
  math: {
    bio: {
      0: { Fig: GlucosePlot, cap: b('示意：一次进食后的血糖。灰线只有反馈，要等血糖升高才开始调节；粉线加上预测项，在食物被吸收之前就提前分泌胰岛素。拖动滑块改变预测增益 $k_f$：增益越大，峰值越低、回落越快，$k_f = 0$ 时两条线重合；增益太大时胰岛素来得太早，血糖会先略低于设定点。', 'Illustration: blood glucose after a meal. The gray line uses feedback alone and acts only once glucose rises; the pink line adds the predictive term and releases insulin before the food is absorbed. Drag the slider to change the predictive gain $k_f$: the larger it is, the lower and shorter the peak; at $k_f = 0$ the lines coincide, and too large a gain releases insulin so early that glucose first dips below the set point.') },
      1: { Fig: NeedValuePlot, cap: b('拖动滑块改变能量储备 $h$，$r_0 = 10$、设定点 $h^{*} = 100$。默认储备 $40$ 时食物价值 $6$；储备 $90$ 时只有 $1$。食物本身没变，变的是它与身体状态的关系，所以喂饱的动物不再为它按压杠杆。', 'Drag the slider to change the reserve $h$, with $r_0 = 10$ and set point $h^{*} = 100$. At the default reserve of $40$ the food is worth $6$; at $90$, only $1$. The food has not changed, only its relation to the body’s state, which is why a sated animal stops pressing the lever for it.') },
    },
    comp: {
      0: { Fig: DrivePlot, cap: b('小例子：设定点 $(10, 10)$，$n = m = 2$，驱力就是到设定点的距离，水分固定为 $9$。拖动滑块改变当前能量，箭头是吃一份食物（能量 $+2$）。默认能量 $6$ 时驱力从 $4.12$ 降到 $2.24$，奖励约 $+1.89$；能量已有 $10$ 时再吃，驱力从 $1$ 升到 $2.24$，奖励 $-1.24$。', 'The worked example: set point $(10, 10)$, $n = m = 2$, so drive is the distance to the set point, with water fixed at $9$. Drag the slider to change the current energy; the arrow is one meal (energy $+2$). At the default energy of $6$ drive falls from $4.12$ to $2.24$, a reward of about $+1.89$; eating at energy $10$ raises drive from $1$ to $2.24$, a reward of $-1.24$.') },
    },
  },
}
