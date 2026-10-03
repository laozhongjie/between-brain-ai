import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store } from '../grammar'
import { Axes, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Control passes from prefrontal and dorsomedial striatum to the dorsolateral striatum; dopamine, the cerebellum and sleep reshape motor cortex. */
function SkillBrainArch({ t }: FigProps) {
  const id = 'f27b'
  return (
    <Svg id={id} w={380} h={288} label={t(b('运动技能学习的结构与信息流：早期的前额叶与背内侧纹状体、多巴胺强化、小脑精细化、运动皮层重组、背外侧纹状体的自动化、睡眠巩固', 'Motor skill learning: early prefrontal and dorsomedial striatum, dopamine reinforcement, cerebellar refinement, motor cortex reorganization, dorsolateral automation, sleep'))}>
      <Mod x={14} y={14} w={160} h={40} side="bio" label={t(b('前额叶与背内侧纹状体', 'Prefrontal, DM striatum'))} sub={t(b('早期：目标导向，慢而多变', 'early: goal-directed, slow'))} size={10} />
      <Mod x={206} y={14} w={160} h={40} side="bio" label={t(b('背外侧纹状体', 'Dorsolateral striatum'))} sub={t(b('后期：自动化与组块', 'late: automatic, chunked'))} size={10.5} />
      <Mod x={14} y={92} w={352} h={40} side="bio" label={t(b('运动皮层', 'Motor cortex'))} sub={t(b('数周练习后，相关区域扩大，形成新连接', 'weeks of practice enlarge the area and add connections'))} size={10.5} />
      <Mod x={14} y={166} w={170} h={40} side="bio" label={t(b('多巴胺', 'Dopamine'))} sub={t(b('结果更好时强化刚才的动作', 'reinforces moves that did better'))} size={10.5} />
      <Mod x={196} y={166} w={170} h={40} side="bio" label={t(b('小脑', 'Cerebellum'))} sub={t(b('按误差调整时序与协调', 'tunes timing from errors'))} size={10.5} />
      <Mod x={14} y={234} w={352} h={40} side="bio" label={t(b('睡眠', 'Sleep'))} sub={t(b('练习后的一夜提高速度和准确性', 'a night after practice adds speed and accuracy'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[174, 34], [206, 34]]} />
      <T x={190} y={68} s={t(b('练习中逐渐接管', 'takes over with practice'))} size={9} color={C.pinkD} />
      <Flow id={id} side="bio" pts={[[94, 54], [94, 92]]} />
      <Flow id={id} side="bio" pts={[[286, 54], [286, 92]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[99, 166], [99, 132]]} label={t(b('强化', 'reinforce'))} lx={20} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[281, 166], [281, 132]]} label={t(b('校正', 'correct'))} lx={20} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[190, 234], [190, 132]]} label={t(b('巩固', 'consolidate'))} lx={20} ly={36} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={166} n={2} side="bio" />
      <Num x={196} y={166} n={3} side="bio" />
      <Num x={14} y={92} n={4} side="bio" />
      <Num x={206} y={14} n={5} side="bio" />
      <Num x={14} y={234} n={6} side="bio" />
    </Svg>
  )
}

/** A VLA encodes image and instruction, represents actions as tokens, is trained on demonstrations and web data, and hands targets to a controller. */
function VlaArch({ t }: FigProps) {
  const id = 'f27c'
  return (
    <Svg id={id} w={380} h={296} label={t(b('VLA 模型的结构与信息流：视觉与语言编码、动作的表示、模仿学习、与网页数据共同训练、底层控制执行', 'VLA models: vision and language encoding, action representation, imitation learning, co-training with web data, low-level execution'))}>
      <Mod x={14} y={14} w={236} h={40} side="comp" label={t(b('视觉与语言编码', 'Vision and language encoding'))} sub={t(b('相机画面与指令变成词元向量', 'camera image and instruction become tokens'))} size={10.5} />
      <Region x={6} y={72} w={252} h={104} side="comp" label={t(b('VLA 模型', 'VLA model'))} />
      <Mod x={18} y={100} w={200} h={40} side="comp" label={t(b('动作的表示', 'Action representation'))} sub={t(b('离散的动作词元，或动作头', 'discrete action tokens, or an action head'))} size={10.5} />
      <Store x={268} y={72} w={100} h={50} side="comp" label={t(b('人工示范', 'Demonstrations'))} sub={t(b('模仿学习', 'imitation'))} />
      <Store x={268} y={132} w={100} h={50} side="comp" label={t(b('网页图文', 'Web data'))} sub={t(b('共同训练', 'co-training'))} />
      <Mod x={14} y={196} w={352} h={40} side="comp" label={t(b('底层控制执行', 'Low-level execution'))} sub={t(b('目标位姿交给控制器，每秒执行若干次', 'target poses go to a controller several times a second'))} size={10.5} />
      <Gap x={14} y={254} w={352} h={30} label={t(b('自主练习改进与触觉反馈', 'Improving by own practice, touch feedback'))} />

      <Flow id={id} side="comp" pts={[[131, 54], [131, 100]]} />
      <Flow id={id} side="comp" pts={[[118, 140], [118, 196]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[268, 99], [218, 112]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[268, 157], [218, 130]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={100} n={2} side="comp" />
      <Num x={268} y={74} n={3} side="comp" />
      <Num x={268} y={134} n={4} side="comp" />
      <Num x={14} y={196} n={5} side="comp" />
      <Num x={14} y={254} n={6} side="comp" />
    </Svg>
  )
}

/** The power law of practice T(N) = A + B N^(−α) with A = 1 s and B = 4 s, interactive: drag α. Log axis for N. Starts
 * at the worked example's α = 0.5. */
function PowerLawPlot({ t }: FigProps) {
  const [alpha, setAlpha] = useState(0.5)
  const col = SIDE_COLOR.bio
  const T = (n: number) => 1 + 4 * Math.pow(n, -alpha)
  const f: Frame = { x: 44, y: 30, w: 290, h: 124, xr: [0, 4], yr: [0, 5.2] }
  const readout = (a: number) => { const T2 = (n: number) => 1 + 4 * Math.pow(n, -a); return t(b(`$\\alpha = ${a.toFixed(2)}$：第 100 次 ${T2(100).toFixed(2)} 秒，第 10000 次 ${T2(10000).toFixed(2)} 秒`, `$\\alpha = ${a.toFixed(2)}$: trial 100 ${T2(100).toFixed(2)} s, trial 10000 ${T2(10000).toFixed(2)} s`)) }
  return (
    <>
      <Svg id="f27mb0" w={380} h={198} label={t(b('练习的幂律：进步先快后慢，但不会停止', 'The power law of practice: fast at first, then slower, but never stopping'))}>
        <Axes f={f} xTicks={[[0, '1'], [1, '10'], [2, '100'], [3, '1000'], [4, '10⁴']]} yTicks={[[0, '0'], [1, '1'], [3, '3'], [5, '5']]} xLabel={t(b('练习次数 N（对数）', 'Practice trials N (log)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('完成用时（秒）', 'Time to complete (s)'))} anchor="start" />
        <Ref f={f} y={1} color={C.lemonD} />
        <Label x={f.x + f.w + 4} y={py(f, 1)} s={t(b('极限 A', 'limit A'))} anchor="start" size={10} color={C.lemonD} />
        <Path pts={trace(f, (lg) => T(Math.pow(10, lg)), 0, 4, 160)} color={col} />
        {[0, 2, 4].map((lg) => <Dot key={lg} f={f} x={lg} y={T(Math.pow(10, lg))} color={col} />)}
      </Svg>
      <FigSlider label="$\alpha$" value={alpha} min={0.2} max={1} step={0.01} onChange={setAlpha} readout={readout(alpha)} widest={[0.2, 0.5].map(readout)} />
    </>
  )
}

/** Two-rate adaptation (A_f = 0.6, B_f = 0.2, A_s = 0.99, B_s = 0.02): adapt to a perturbation of +1, adapt back to −1
 * until the total is near 0, then clamp the error at 0. The fast process fades first and the slow one's old
 * adaptation reappears: spontaneous recovery. */
function TwoRatePlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const Af = 0.6, Bf = 0.2, As = 0.99, Bs = 0.02
  const xf: number[] = [0], xs: number[] = [0]
  const p1 = 120, p2End = (() => {
    let f = 0, s = 0
    for (let i = 0; i < p1; i++) { const e = 1 - (f + s); f = Af * f + Bf * e; s = As * s + Bs * e }
    let k = 0
    while (f + s > 0 && k < 60) { const e = -1 - (f + s); f = Af * f + Bf * e; s = As * s + Bs * e; k++ }
    return p1 + k
  })()
  const total = p2End + 60
  for (let i = 0; i < total; i++) {
    const target = i < p1 ? 1 : i < p2End ? -1 : null
    const e = target === null ? 0 : target - (xf[i] + xs[i])
    xf.push(Af * xf[i] + Bf * e); xs.push(As * xs[i] + Bs * e)
  }
  const f: Frame = { x: 40, y: 30, w: 280, h: 124, xr: [0, total], yr: [-0.6, 1.1] }
  const line = (v: number[]) => v.map((y, i) => [px(f, i), py(f, y)] as [number, number])
  return (
    <Svg id="f27mb1" w={380} h={198} label={t(b('双速率学习：反向练习抵消适应后，停下来时快过程先消退，慢过程保留的适应重新出现', 'Two-rate learning: after counter-adaptation cancels the change, a pause lets the fast process fade first and the slow one’s adaptation reappears'))}>
      <rect x={px(f, p2End)} y={f.y} width={px(f, total) - px(f, p2End)} height={f.h} fill={C.lemonD} fillOpacity={0.06} />
      <Axes f={f} xTicks={[[0, '0'], [p1, String(p1)], [total, String(total)]]} yTicks={[[0, '0'], [1, '1']]} xLabel={t(b('尝试次数', 'Trials'))} grid />
      <Label x={f.x - 4} y={f.y - 12} s={t(b('适应量', 'Adaptation'))} anchor="start" />
      <Label x={px(f, p1 / 2)} y={f.y + 8} s={t(b('适应 +1', 'adapt to +1'))} size={10} />
      <Label x={px(f, (p2End + total) / 2)} y={f.y + 8} s={t(b('停下，不再有误差', 'pause, no error'))} size={10} color={C.lemonD} />
      <Path pts={line(xf)} color={C.lemonD} width={1.3} opacity={0.8} />
      <Path pts={line(xs)} color={col} width={1.3} opacity={0.55} />
      <Path pts={line(xf.map((v, i) => v + xs[i]))} color={col} width={2.2} />
      <Label x={f.x + f.w + 4} y={py(f, xs[total])} s={t(b('慢过程', 'slow'))} anchor="start" size={10} color={col} />
      <Label x={f.x + f.w + 4} y={py(f, xf[total] + xs[total]) - 13} s={t(b('总和', 'total'))} anchor="start" size={10} color={col} />
      <Label x={f.x + f.w + 4} y={py(f, xf[total]) + 10} s={t(b('快过程', 'fast'))} anchor="start" size={10} color={C.lemonD} />
      <Label x={px(f, p2End) + 4} y={py(f, -0.45)} s={t(b('反向练习到总和为 0', 'counter-adapt to zero'))} anchor="start" size={9.5} />
    </Svg>
  )
}

/** Action tokenization on [−1, 1], interactive: a smooth arm trajectory and its quantized version; drag the number of bins
 * K (powers of two). The largest rounding error is one bin width, 2 / (K − 1). Starts at 16 to make the steps visible. */
function TokenizePlot({ t }: FigProps) {
  const [lk, setLk] = useState(4)
  const col = SIDE_COLOR.comp
  const K = Math.pow(2, lk)
  const a = (s: number) => 0.8 * Math.sin(2 * Math.PI * s) * Math.exp(-0.6 * s) + 0.15
  const q = (v: number) => { const k = Math.floor(((v + 1) / 2) * (K - 1)); return -1 + (k / (K - 1)) * 2 }
  const f: Frame = { x: 40, y: 30, w: 300, h: 124, xr: [0, 2], yr: [-1, 1] }
  const steps: [number, number][] = []
  for (let i = 0; i <= 400; i++) { const s = (2 * i) / 400; const y = q(a(s)); if (steps.length) steps.push([px(f, s), steps[steps.length - 1][1]]); steps.push([px(f, s), py(f, y)]) }
  const readout = (l: number) => { const k = Math.pow(2, l); return t(b(`$K = ${k}$ 档：最大误差 ${(2 / (k - 1)).toFixed(3)}`, `$K = ${k}$ bins: largest error ${(2 / (k - 1)).toFixed(3)}`)) }
  return (
    <>
      <Svg id="f27mc0" w={380} h={198} label={t(b('动作词元化：连续的动作被切成档位，档位越多越接近原来的动作', 'Action tokenization: a continuous action becomes discrete bins, closer to the original as bins increase'))}>
        <Axes f={f} xTicks={[[0, '0'], [1, '1'], [2, '2']]} yTicks={[[-1, '−1'], [0, '0'], [1, '1']]} xLabel={t(b('时间（秒）', 'Time (s)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('关节动作', 'Joint action'))} anchor="start" />
        <Path pts={trace(f, a, 0, 2, 200)} color={C.dim} width={1.2} />
        <Path pts={steps} color={col} width={1.6} />
        <Label x={f.x + f.w + 4} y={py(f, a(2))} s={t(b('原动作', 'original'))} anchor="start" size={10} />
        <Label x={f.x + f.w + 4} y={py(f, a(2)) + 14} s={t(b('词元化', 'tokens'))} anchor="start" size={10} color={col} />
      </Svg>
      <FigSlider label={t(b('档位数', 'Bins'))} value={lk} min={2} max={8} step={1} onChange={setLk} readout={readout(lk)} widest={[2, 3, 8].map(readout)} />
    </>
  )
}

/** The behavior-cloning loss −log π(a) for the demonstrated action, interactive: drag the probability the policy gives it.
 * Starts at the worked example's 0.1 before training. */
function BcLossPlot({ t }: FigProps) {
  const [p, setP] = useState(0.1)
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 44, y: 30, w: 290, h: 124, xr: [0, 1], yr: [0, 4.6] }
  const readout = (v: number) => t(b(`示范动作的概率 ${v.toFixed(2)}：损失 ${(-Math.log(v)).toFixed(2)}`, `probability of the demonstrated action ${v.toFixed(2)}: loss ${(-Math.log(v)).toFixed(2)}`))
  return (
    <>
      <Svg id="f27mc1" w={380} h={198} label={t(b('行为克隆的损失：模型给示范动作的概率越低，损失越大', 'Behavior cloning loss: the lower the probability given to the demonstrated action, the larger the loss'))}>
        <Axes f={f} xTicks={[[0, '0'], [0.1, '0.1'], [0.5, '0.5'], [0.8, '0.8'], [1, '1']]} yTicks={[[0, '0'], [2, '2'], [4, '4']]} xLabel={t(b('模型给示范动作的概率', 'Probability given to the demonstrated action'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('损失 −log π', 'Loss −log π'))} anchor="start" />
        <Path pts={trace(f, (v) => -Math.log(v), 0.01, 1, 200)} color={col} opacity={0.45} />
        <Dot f={f} x={0.8} y={-Math.log(0.8)} color={C.dim} />
        <Label x={px(f, 0.8)} y={py(f, -Math.log(0.8)) - 12} s={t(b('训练后 0.8', 'after training 0.8'))} size={10} />
        <Dot f={f} x={p} y={-Math.log(p)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('概率', 'Probability'))} value={p} min={0.02} max={1} step={0.01} onChange={setP} readout={readout(p)} widest={[0.02, 0.5].map(readout)} />
    </>
  )
}

export const SKILL_FIGS: TopicFigs = {
  arch: { brain: SkillBrainArch, ai: VlaArch },
  math: {
    bio: {
      0: { Fig: PowerLawPlot, cap: b('拖动滑块改变 $\\alpha$，$A = 1$ 秒、$B = 4$ 秒，横轴为对数。默认 $\\alpha = 0.5$：第 1 次 $5$ 秒，第 100 次 $1.4$ 秒，第 10000 次 $1.04$ 秒。前 100 次省下 $3.6$ 秒，之后 9900 次只再省 $0.36$ 秒，但曲线一直在下降，不会停。', 'Drag the slider to change $\\alpha$, with $A = 1$ s and $B = 4$ s, on a log axis. At the default $\\alpha = 0.5$: $5$ s on trial 1, $1.4$ s on trial 100 and $1.04$ s on trial 10000. The first 100 trials save $3.6$ s, the next 9900 only $0.36$ s more, yet the curve keeps falling.') },
      1: { Fig: TwoRatePlot, cap: b('用接近实验拟合的参数模拟：先适应 $+1$，再反向练习直到总适应量回到 $0$，然后停下（误差固定为 $0$）。此时快过程（黄）被拉到负值、慢过程仍为正，两者抵消；停下后快过程很快消退，慢过程保留的适应重新显现，这就是自发恢复。', 'A simulation with parameters near experimental fits: adapt to $+1$, counter-adapt until the total returns to $0$, then pause with the error clamped at $0$. At that point the fast process (yellow) has been pulled negative while the slow one is still positive, and they cancel; during the pause the fast process fades quickly and the slow one’s adaptation reappears: spontaneous recovery.') },
    },
    comp: {
      0: { Fig: TokenizePlot, cap: b('拖动滑块改变档位数 $K$。灰线是连续的关节动作，蓝色阶梯是词元化后的动作，最大误差为一档的宽度 $2/(K - 1)$。默认 16 档时阶梯明显；小例子用的 256 档，最大误差约 $0.008$，几乎与原动作重合。', 'Drag the slider to change the number of bins $K$. The gray line is the continuous joint action and the blue staircase its tokens; the largest error is one bin width, $2/(K - 1)$. At the default 16 bins the steps are obvious; the worked example’s 256 bins give at most about $0.008$, nearly on top of the original.') },
      1: { Fig: BcLossPlot, cap: b('拖动滑块改变模型给示范动作的概率。小例子中训练前为 $0.1$，损失 $-\\log 0.1 \\approx 2.3$；训练后升到 $0.8$，损失约 $0.22$。概率越接近 $0$，损失增长越快，所以训练首先纠正那些被模型认为几乎不可能的示范动作。', 'Drag the slider to change the probability the model gives the demonstrated action. In the worked example it is $0.1$ before training, a loss of $-\\log 0.1 \\approx 2.3$; after training it reaches $0.8$, a loss of about $0.22$. The loss climbs fastest near $0$, so training first fixes demonstrations the model thought nearly impossible.') },
    },
  },
}
