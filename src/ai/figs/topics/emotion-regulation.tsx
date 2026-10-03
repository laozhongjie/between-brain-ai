import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, SIDE_COLOR, Sub, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** A fast thalamic and a slow cortical route reach the amygdala, which drives body and a lasting state; prefrontal cortex regulates it and the insula feeds the body back. */
function FearBrainArch({ t }: FigProps) {
  const id = 'f33b'
  return (
    <Svg id={id} w={380} h={304} label={t(b('杏仁核与前额叶调节的结构与信息流：丘脑的快速通路与皮层的慢速通路、杏仁核、下丘脑与脑干、持续的情绪状态、前额叶调节、岛叶的身体反馈', 'Amygdala and prefrontal regulation: fast thalamic and slow cortical routes, amygdala, hypothalamus and brainstem, lasting state, prefrontal regulation, bodily feedback through the insula'))}>
      <Mod x={14} y={14} w={150} h={40} side="bio" label={t(b('丘脑', 'Thalamus'))} sub={t(b('粗略的感觉信号', 'a coarse signal'))} size={10.5} />
      <Mod x={214} y={14} w={152} h={40} side="bio" label={t(b('感觉皮层', 'Sensory cortex'))} sub={t(b('细节：到底是什么', 'detail: what it is'))} size={10.5} />
      <Mod x={14} y={96} w={170} h={40} side="bio" label={t(b('杏仁核', 'Amygdala'))} sub={t(b('外侧核学习关联，中央核输出', 'lateral learns, central outputs'))} size={10.5} />
      <Mod x={196} y={96} w={170} h={40} side="bio" label={t(b('外侧与腹内侧前额叶', 'Lateral and vm prefrontal'))} sub={t(b('重新评价，消退中抑制', 'reappraisal, extinction'))} size={10.5} />
      <Mod x={14} y={180} w={170} h={40} side="bio" label={t(b('下丘脑与脑干', 'Hypothalamus, brainstem'))} sub={t(b('应激激素、心率、僵住', 'stress hormones, heart, freezing'))} size={10.5} />
      <Mod x={196} y={180} w={170} h={40} side="bio" label={t(b('持续的情绪状态', 'Lasting emotional state'))} sub={t(b('影响注意、记忆和决策', 'shapes attention, memory, choice'))} size={10.5} />
      <Mod x={14} y={252} w={352} h={40} side="bio" label={t(b('岛叶', 'Insula'))} sub={t(b('心跳、呼吸和内脏的变化回到大脑，成为感受', 'heart, breath and gut changes return as feeling'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[164, 34], [214, 34]]} />
      <Flow id={id} side="bio" fast pts={[[70, 54], [70, 96]]} label={t(b('快速，十几毫秒', 'fast, ~15 ms'))} lx={40} ly={-8} />
      <Flow id={id} side="bio" pts={[[290, 54], [290, 74], [150, 74], [150, 96]]} label={t(b('慢速通路', 'slow route'))} at={1} ly={-7} />
      <Flow id={id} side="bio" kind="fb" pts={[[196, 116], [184, 116]]} />
      <Flow id={id} side="bio" pts={[[99, 136], [99, 180]]} />
      <Flow id={id} side="bio" pts={[[150, 136], [150, 158], [281, 158], [281, 180]]} />
      <Flow id={id} side="bio" pts={[[99, 220], [99, 252]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[281, 252], [281, 220]]} label={t(b('影响决策', 'shapes choices'))} lx={30} ly={0} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={96} n={2} side="bio" />
      <Num x={14} y={180} n={3} side="bio" />
      <Num x={196} y={180} n={4} side="bio" />
      <Num x={196} y={96} n={5} side="bio" />
      <Num x={14} y={252} n={6} side="bio" />
    </Svg>
  )
}

/** An agent computes emotion-like signals from value changes that tune its parameters; a safety module blocks actions; language models only change style. */
function FunctionalEmotionArch({ t }: FigProps) {
  const id = 'f33c'
  return (
    <Svg id={id} w={380} h={256} label={t(b('功能性情绪模型的结构与信息流：环境与奖励、情绪信号、调节参数、安全约束、语言模型中的情绪', 'Functional emotion models: environment and reward, emotion signals, parameter tuning, safety constraints, emotion in language models'))}>
      <Mod x={14} y={14} w={352} h={34} side="comp" label={t(b('环境与奖励', 'Environment and reward'))} sub={t(b('观察与奖励', 'observations and rewards'))} size={10.5} />
      <Mod x={14} y={70} w={170} h={40} side="comp" label={t(b('计算情绪信号', 'Emotion signals'))} sub={t(b('价值下降为恐惧，上升为希望', 'value falls: fear; rises: hope'))} size={10.5} />
      <Mod x={196} y={70} w={170} h={40} side="comp" label={t(b('策略', 'Policy'))} sub={t(b('选择动作', 'chooses actions'))} size={10.5} />
      <Mod x={14} y={134} w={170} h={40} side="comp" label={t(b('调节参数', 'Tuned parameters'))} sub={t(b('探索率、学习率、风险态度', 'exploration, learning rate, risk'))} size={10.5} />
      <Mod x={196} y={134} w={170} h={40} side="comp" label={t(b('安全模块', 'Safety module'))} sub={t(b('预测到危险时阻止动作', 'blocks actions predicted unsafe'))} size={10.5} />
      <Mod x={14} y={200} w={170} h={40} side="comp" label={t(b('语言模型中的「情绪」', 'Emotion in an LLM'))} sub={t(b('提示改变风格，没有持续状态', 'prompts shift style, no lasting state'))} size={10.5} />
      <Gap x={196} y={200} w={170} h={40} label={t(b('影响多个系统、可被\n调节的全局状态', 'A global state that moves\nmany systems, regulated'))} />

      <Flow id={id} side="comp" pts={[[99, 48], [99, 70]]} />
      <Flow id={id} side="comp" pts={[[281, 48], [281, 70]]} />
      <Flow id={id} side="comp" pts={[[99, 110], [99, 134]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[184, 154], [190, 154], [190, 90], [196, 90]]} />
      <Flow id={id} side="comp" pts={[[300, 110], [300, 134]]} label={t(b('动作', 'action'))} lx={18} ly={0} />
      <Flow id={id} side="comp" pts={[[366, 154], [374, 154], [374, 31], [366, 31]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={70} n={2} side="comp" />
      <Num x={14} y={134} n={3} side="comp" />
      <Num x={196} y={134} n={4} side="comp" />
      <Num x={14} y={200} n={5} side="comp" />
      <Num x={196} y={200} n={6} side="comp" />
    </Svg>
  )
}

/** Fear learning, extinction and renewal on the worked example (α = 0.8; after extinction V_safe = 0.7), interactive:
 * drag how similar the test context is to the extinction room; R = V_fear − c V_safe. Starts in the same room, c = 1. */
function ExtinctionPlot({ t }: FigProps) {
  const [c, setC] = useState(1)
  const col = SIDE_COLOR.bio
  const fear = [0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8], safe = [0, 0, 0.3, 0.5, 0.6, 0.65, 0.68, 0.7]
  const f: Frame = { x: 40, y: 34, w: 190, h: 116, xr: [0, 7], yr: [0, 1] }
  const f2: Frame = { x: 280, y: 34, w: 70, h: 116, xr: [0, 1], yr: [0, 1] }
  const R = (x: number) => 0.8 - x * 0.7
  const line = (v: number[]) => v.map((y, i) => [px(f, i), py(f, y)] as [number, number])
  const readout = (x: number) => t(b(`情境相似度 ${x.toFixed(2)}：恐惧反应 ${R(x).toFixed(2)}`, `context similarity ${x.toFixed(2)}: fear response ${R(x).toFixed(2)}`))
  return (
    <>
      <Svg id="f33mb0" w={380} h={196} label={t(b('恐惧消退：学会的是「这里现在安全」，换个情境恐惧就回来', 'Fear extinction: what is learned is “safe here now,” so in another context fear returns'))}>
        <Axes f={f} xTicks={[[1, t(b('电击', 'shock'))], [4, t(b('消退', 'extinction'))]]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} grid />
        <Label x={f.x - 4} y={f.y - 14} s={t(b('学到的联结', 'Learned association'))} anchor="start" />
        <Path pts={line(fear)} color={col} />
        <Path pts={line(safe)} color={C.dim} />
        <Sub x={f.x + f.w + 4} y={py(f, 0.8) - 8} base="V" sub="fear" color={col} />
        <Sub x={f.x + f.w + 4} y={py(f, 0.7) + 8} base="V" sub="safe" />
        <line x1={f2.x} x2={f2.x + f2.w} y1={f2.y + f2.h} y2={f2.y + f2.h} stroke={C.dim} />
        <Bar f={f2} x={0.5} v={R(c)} w={0.6} color={col} />
        <Label x={f2.x + f2.w / 2} y={py(f2, R(c)) - 8} s={R(c).toFixed(2)} size={10} color={col} />
        <Label x={f2.x + f2.w / 2} y={f2.y - 14} s={t(b('测试时的反应', 'Response at test'))} size={10} color={C.ink} />
        <Label x={f2.x + f2.w / 2} y={f2.y + f2.h + 12} s={c > 0.8 ? t(b('原来的房间', 'same room')) : t(b('新的房间', 'new room'))} size={10} />
      </Svg>
      <FigSlider label={t(b('与消退情境的相似度 $c$', 'Similarity $c$ to the extinction room'))} value={c} min={0} max={1} step={0.01} onChange={setC} readout={readout(c)} widest={[0.5].map(readout)} />
    </>
  )
}

/** Persistence and generalization (τ_E = 10 min), interactive: the state decays to 0.37 at 10 minutes (left), and a
 * situation at distance 1 from the original evokes 0.37 · exp(−1 / 2σ²) (right); drag σ. Starts at σ = 1. */
function GeneralizationPlot({ t }: FigProps) {
  const [sg, setSg] = useState(1)
  const col = SIDE_COLOR.bio
  const E10 = Math.exp(-1)
  const f1: Frame = { x: 40, y: 34, w: 120, h: 116, xr: [0, 30], yr: [0, 1] }
  const f2: Frame = { x: 214, y: 34, w: 146, h: 116, xr: [-4, 4], yr: [0, 0.45] }
  const R = (x: number, s: number) => E10 * Math.exp(-(x * x) / (2 * s * s))
  const readout = (s: number) => t(b(`$\\sigma = ${s.toFixed(1)}$：相距 1 的情境反应 ${R(1, s).toFixed(2)}`, `$\\sigma = ${s.toFixed(1)}$: a situation 1 away responds ${R(1, s).toFixed(2)}`))
  return (
    <>
      <Svg id="f33mb1" w={380} h={196} label={t(b('情绪的持续与推广：受惊后状态缓慢消退，并推广到相似的情境', 'Persistence and generalization: the state after a scare fades slowly and spreads to similar situations'))}>
        <Axes f={f1} xTicks={[[0, '0'], [10, '10'], [30, '30']]} yTicks={[[0, '0'], [0.37, '0.37'], [1, '1']]} xLabel={t(b('受惊后（分钟）', 'Minutes after'))} grid />
        <Label x={f1.x - 4} y={f1.y - 14} s={t(b('情绪状态 E', 'Emotional state E'))} anchor="start" />
        <Path pts={trace(f1, (m) => Math.exp(-m / 10), 0, 30, 100)} color={col} />
        <Dot f={f1} x={10} y={E10} color={col} />
        <Axes f={f2} xTicks={[[-4, '−4'], [0, '0'], [1, '1'], [4, '4']]} yTicks={[[0, '0'], [0.37, '0.37']]} xLabel={t(b('与原情境的距离', 'Distance from the original'))} grid />
        <Label x={f2.x - 4} y={f2.y - 14} s={t(b('10 分钟时的反应', 'Response at 10 min'))} anchor="start" />
        <Path pts={trace(f2, (x) => R(x, sg), -4, 4, 160)} color={col} opacity={0.6} />
        <Dot f={f2} x={1} y={R(1, sg)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('推广宽度 $\\sigma$', 'Generalization width $\\sigma$'))} value={sg} min={0.3} max={5} step={0.1} onChange={setSg} readout={readout(sg)} widest={[1].map(readout)} />
    </>
  )
}

/** Functional "fear" lowering the softmax temperature (T₀ = 1, k = 4), interactive: drag the drop in value F; with action
 * values 1 and 0 the better action's probability is 1 / (1 + e^(−1/T)). Starts at the worked example's F = 0.5. */
function FearTemperaturePlot({ t }: FigProps) {
  const [F, setF] = useState(0.5)
  const col = SIDE_COLOR.comp
  const T = (x: number) => 1 / (1 + 4 * x)
  const pBest = (x: number) => 1 / (1 + Math.exp(-1 / T(x)))
  const f: Frame = { x: 44, y: 30, w: 270, h: 124, xr: [0, 2], yr: [0.5, 1] }
  const readout = (x: number) => t(b(`$F = ${x.toFixed(2)}$：温度 ${T(x).toFixed(2)}，选较好动作 ${pBest(x).toFixed(2)}`, `$F = ${x.toFixed(2)}$: temperature ${T(x).toFixed(2)}, better action ${pBest(x).toFixed(2)}`))
  return (
    <>
      <Svg id="f33mc0" w={380} h={198} label={t(b('功能性恐惧：价值突然下降时温度降低，行为更保守、更多选择已知的较好动作', 'Functional fear: a sudden drop in value lowers the temperature, making behavior more conservative'))}>
        <Axes f={f} xTicks={[[0, '0'], [0.5, '0.5'], [1, '1'], [2, '2']]} yTicks={[[0.5, '0.5'], [0.73, '0.73'], [1, '1']]} xLabel={t(b('价值的下降 F', 'Drop in value F'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('选较好动作的概率', 'Chance of the better action'))} anchor="start" />
        <Path pts={trace(f, pBest, 0, 2, 120)} color={col} opacity={0.45} />
        <Dot f={f} x={0} y={pBest(0)} color={C.dim} />
        <Label x={px(f, 0) + 8} y={py(f, pBest(0)) + 10} s={t(b('平常：温度 1', 'normally: T = 1'))} anchor="start" size={10} />
        <Dot f={f} x={F} y={pBest(F)} color={col} r={4} />
      </Svg>
      <FigSlider label="$F$" value={F} min={0} max={2} step={0.01} onChange={setF} readout={readout(F)} widest={[0.5].map(readout)} />
    </>
  )
}

/** CVaR on the worked example, interactive: action A pays 10 nine times in ten and −50 otherwise (mean 4); B always pays
 * 3. Drag α, the share of worst outcomes considered; the choice switches to B below α = 6/7. Starts at α = 0.1. */
function CvarPlot({ t }: FigProps) {
  const [alpha, setAlpha] = useState(0.1)
  const col = SIDE_COLOR.comp
  const cvarA = (a: number) => (a <= 0.1 ? -50 : (0.1 * -50 + (a - 0.1) * 10) / a)
  const f: Frame = { x: 48, y: 30, w: 270, h: 124, xr: [0.05, 1], yr: [-55, 10] }
  const readout = (a: number) => t(b(`$\\alpha = ${a.toFixed(2)}$：A ${cvarA(a).toFixed(1)}，B 3.0，选 ${cvarA(a) > 3 ? 'A' : 'B'}`, `$\\alpha = ${a.toFixed(2)}$: A ${cvarA(a).toFixed(1)}, B 3.0, pick ${cvarA(a) > 3 ? 'A' : 'B'}`))
  return (
    <>
      <Svg id="f33mc1" w={380} h={198} label={t(b('风险敏感：只看最坏的一部分结果时，偶尔有大损失的动作被避开', 'Risk sensitivity: judged by the worst share of outcomes, the action with a rare large loss is avoided'))}>
        <Axes f={f} xTicks={[[0.1, '0.1'], [0.5, '0.5'], [0.86, '6/7'], [1, '1']]} yTicks={[[-50, '−50'], [-20, '−20'], [3, '3']]} xLabel={t(b('α：只看最坏的这部分结果', 'α: share of worst outcomes considered'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('条件风险价值 CVaR', 'Conditional value at risk'))} anchor="start" />
        <Path pts={trace(f, cvarA, 0.05, 1, 200)} color={col} />
        <Path pts={trace(f, () => 3, 0.05, 1, 2)} color={C.lemonD} />
        <Label x={f.x + f.w + 4} y={py(f, cvarA(1)) - 7} s={t(b('A：平均 4', 'A: mean 4'))} anchor="start" size={10} color={col} />
        <Label x={f.x + f.w + 4} y={py(f, 3) + 9} s={t(b('B：总是 3', 'B: always 3'))} anchor="start" size={10} color={C.lemonD} />
        <Dot f={f} x={alpha} y={cvarA(alpha)} color={col} r={4} />
      </Svg>
      <FigSlider label="$\alpha$" value={alpha} min={0.05} max={1} step={0.01} onChange={setAlpha} readout={readout(alpha)} widest={[0.1, 0.3].map(readout)} />
    </>
  )
}

export const EMOTION_REG_FIGS: TopicFigs = {
  arch: { brain: FearBrainArch, ai: FunctionalEmotionArch },
  math: {
    bio: {
      0: { Fig: ExtinctionPlot, cap: b('左：一次电击后 $V_{\\text{fear}} = 0.8$；消退中学到的「现在安全」$V_{\\text{safe}}$ 逐渐升到 $0.7$，而恐惧的联结并没有被抹掉。拖动滑块改变测试情境与消退房间的相似度 $c$：在原来的房间反应只有 $0.1$；换到新房间（$c = 0.2$）反应回到 $0.66$，这就是复发。', 'Left: one shock sets $V_{\\text{fear}} = 0.8$; extinction builds a separate “safe now,” $V_{\\text{safe}}$, up to $0.7$, while the fear association is never erased. Drag the slider to change how similar the test context is to the extinction room, $c$: in the same room the response is only $0.1$; in a new room ($c = 0.2$) it is back to $0.66$, which is renewal.') },
      1: { Fig: GeneralizationPlot, cap: b('左：受惊后情绪状态按 $\\tau_E = 10$ 分钟衰减，10 分钟时还有 $0.37$。右：此时遇到不同的情境，反应随距离按高斯形状下降。拖动滑块改变推广宽度 $\\sigma$：默认 $1$ 时，相距 $1$ 的情境反应 $0.22$；$\\sigma$ 很大时，几乎所有情境都接近 $0.37$，这就是过度推广。', 'Left: after a scare the emotional state decays with $\\tau_E = 10$ min, still $0.37$ at 10 minutes. Right: situations met then respond less with distance, in a Gaussian shape. Drag the slider to change the width $\\sigma$: at the default $1$, a situation $1$ away responds $0.22$; with a large $\\sigma$ nearly every situation gets close to $0.37$, which is overgeneralization.') },
    },
    comp: {
      0: { Fig: FearTemperaturePlot, cap: b('拖动滑块改变价值的下降 $F$，$T_0 = 1$、$k = 4$，两个动作的价值为 $1$ 和 $0$。平常 $F = 0$，选较好动作的概率约 $0.73$；默认掉进陷阱 $F = 0.5$，温度降到 $1/3$，概率升到约 $0.95$。下降越大，行为越保守。', 'Drag the slider to change the drop in value $F$, with $T_0 = 1$, $k = 4$ and action values $1$ and $0$. Normally $F = 0$ and the better action is chosen about $0.73$ of the time; at the default trap, $F = 0.5$, the temperature falls to $1/3$ and the chance rises to about $0.95$. The bigger the drop, the more conservative the behavior.') },
      1: { Fig: CvarPlot, cap: b('小例子：A 九成得 $10$、一成得 $-50$，平均 $4$；B 总是 $3$。拖动滑块改变 $\\alpha$，即只看最坏的多少比例的结果。默认 $\\alpha = 0.1$ 时 A 的条件风险价值为 $-50$，选 B；$\\alpha$ 超过 $6/7$ 才改选 A，$\\alpha = 1$ 就是普通的平均值。', 'The worked example: A pays $10$ nine times in ten and $-50$ otherwise, a mean of $4$; B always pays $3$. Drag the slider to change $\\alpha$, the share of worst outcomes considered. At the default $\\alpha = 0.1$, A’s conditional value at risk is $-50$, so B is chosen; only above $6/7$ does A win, and $\\alpha = 1$ is the plain mean.') },
    },
  },
}
