import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Speech and text reach words in temporal cortex; the frontotemporal language network combines them and predicts the next word, then hands meaning on and plans speech. */
function LanguageBrainArch({ t }: FigProps) {
  const id = 'f35b'
  return (
    <Svg id={id} w={380} h={284} label={t(b('左半球语言网络的结构与信息流：听觉皮层与视觉词形区、颞上回、语言网络、预测下一个词、推理与心智理论网络、产出', 'Left-hemisphere language network: auditory cortex and visual word form area, superior temporal gyrus, language network, next-word prediction, reasoning and theory-of-mind networks, production'))}>
      <Mod x={14} y={14} w={352} h={36} side="bio" label={t(b('听觉皮层与视觉词形区', 'Auditory cortex, visual word form area'))} sub={t(b('语音与书面的词', 'speech and written words'))} size={10.5} />
      <Mod x={14} y={74} w={170} h={40} side="bio" label={t(b('颞上回与颞叶后部', 'Superior, posterior temporal'))} sub={t(b('映射到心理词典中的词', 'map onto words in the lexicon'))} size={10.5} />
      <Region x={6} y={134} w={368} h={76} side="bio" label={t(b('语言网络', 'Language network'))} />
      <Mod x={18} y={158} w={200} h={40} side="bio" label={t(b('额叶下部与颞叶', 'Inferior frontal and temporal'))} sub={t(b('把词组合成句子，表示意义', 'combine words, represent meaning'))} size={10.5} />
      <Mod x={230} y={158} w={136} h={40} side="bio" label={t(b('预测下一个词', 'Next-word prediction'))} sub={t(b('意外的词引起 N400', 'surprise gives an N400'))} size={10} />
      <Mod x={14} y={230} w={170} h={40} side="bio" label={t(b('推理与心智理论网络', 'Reasoning, theory of mind'))} sub={t(b('进一步处理意义', 'take the meaning further'))} size={10.5} />
      <Mod x={196} y={230} w={170} h={40} side="bio" label={t(b('额叶下部与运动皮层', 'Inferior frontal, motor'))} sub={t(b('产出：词序与发音', 'production: order, articulation'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[99, 50], [99, 74]]} />
      <Flow id={id} side="bio" pts={[[99, 114], [99, 158]]} />
      <Flow id={id} side="bio" pts={[[218, 178], [230, 178]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[298, 158], [298, 94], [184, 94]]} label={t(b('预期', 'expectation'))} at={1} ly={-7} />
      <Flow id={id} side="bio" pts={[[99, 198], [99, 230]]} />
      <Flow id={id} side="bio" pts={[[180, 198], [180, 218], [281, 218], [281, 230]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={74} n={2} side="bio" />
      <Num x={18} y={158} n={3} side="bio" />
      <Num x={230} y={158} n={4} side="bio" />
      <Num x={14} y={230} n={5} side="bio" />
      <Num x={196} y={230} n={6} side="bio" />
    </Svg>
  )
}

/** Text is tokenized and embedded, passes dozens of transformer layers and ends in a next-token distribution; post-training continues training on instructions and feedback. */
function LlmArch({ t }: FigProps) {
  const id = 'f35c'
  return (
    <Svg id={id} w={380} h={278} label={t(b('大语言模型的结构与信息流：分词、嵌入、Transformer 层、预测下一个词元、后训练', 'Large language model: tokenization, embedding, transformer layers, next-token prediction, post-training'))}>
      <Mod x={14} y={14} w={170} h={36} side="comp" label={t(b('分词', 'Tokenization'))} sub={t(b('切成词元', 'split into tokens'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={36} side="comp" label={t(b('嵌入', 'Embedding'))} sub={t(b('向量加位置信息', 'vectors plus position'))} size={10.5} />
      <Region x={6} y={70} w={368} h={78} side="comp" label={t(b('Transformer 层', 'Transformer layers'))} />
      <rect x={30} y={88} width={332} height={40} rx={7} fill={C.sky} stroke={C.skyD} strokeOpacity={0.4} strokeWidth={1} />
      <rect x={24} y={93} width={332} height={40} rx={7} fill={C.sky} stroke={C.skyD} strokeOpacity={0.6} strokeWidth={1} />
      <Mod x={18} y={98} w={332} h={40} side="comp" label={t(b('注意力与前馈网络', 'Attention and feedforward'))} sub={t(b('几十层，逐层形成句法和语义的表示', 'dozens of layers build syntax and meaning'))} size={10.5} />
      <Mod x={14} y={170} w={170} h={40} side="comp" label={t(b('预测下一个词元', 'Next-token prediction'))} sub={t(b('softmax 给出每个词元的概率', 'softmax over the vocabulary'))} size={10.5} />
      <Mod x={196} y={170} w={170} h={40} side="comp" label={t(b('后训练', 'Post-training'))} sub={t(b('指令与人类反馈', 'instructions, human feedback'))} size={10.5} />
      <Gap x={14} y={234} w={352} h={32} label={t(b('在感知和社会互动中学习语言', 'Learning language through perception and interaction'))} />

      <Flow id={id} side="comp" pts={[[184, 32], [196, 32]]} />
      <Flow id={id} side="comp" pts={[[281, 50], [281, 98]]} />
      <Flow id={id} side="comp" pts={[[99, 138], [99, 170]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[281, 170], [281, 148]]} label={t(b('继续训练', 'trains further'))} lx={30} ly={0} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={196} y={14} n={2} side="comp" />
      <Num x={18} y={98} n={3} side="comp" />
      <Num x={14} y={170} n={4} side="comp" />
      <Num x={196} y={170} n={5} side="comp" />
      <Num x={14} y={234} n={6} side="comp" />
    </Svg>
  )
}

/** Surprisal and reading time, RT ≈ 200 + 10 S ms, interactive: drag the surprisal S (the word's probability is 2^(−S)).
 * Starts at the worked example's "ink", 6 bits. */
function SurprisalPlot({ t }: FigProps) {
  const [S, setS] = useState(6)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 48, y: 30, w: 270, h: 124, xr: [0, 8], yr: [190, 290] }
  const frac = (s: number) => { const d = Math.pow(2, s); return d < 1.05 ? '1' : `1/${d < 10 ? d.toFixed(1) : Math.round(d)}` }
  const readout = (s: number) => t(b(`概率 ${frac(s)}：${s.toFixed(1)} 比特，约 ${Math.round(200 + 10 * s)} 毫秒`, `probability ${frac(s)}: ${s.toFixed(1)} bits, about ${Math.round(200 + 10 * s)} ms`))
  return (
    <>
      <Svg id="f35mb0" w={380} h={198} label={t(b('意外度与阅读时间：词越难预测，读得越久，与意外度成直线关系', 'Surprisal and reading time: the less predictable a word, the longer it is read, in a straight line'))}>
        <Axes f={f} xTicks={[[0, '0'], [1, '1'], [6, '6'], [8, '8']]} yTicks={[[200, '200'], [250, '250']]} xLabel={t(b('意外度 S（比特）', 'Surprisal S (bits)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('阅读时间（毫秒）', 'Reading time (ms)'))} anchor="start" />
        <Path pts={trace(f, (s) => 200 + 10 * s, 0, 8, 2)} color={col} opacity={0.45} />
        <Dot f={f} x={1} y={210} color={C.dim} />
        <Label x={px(f, 1) + 8} y={py(f, 210) + 8} s={t(b('「咖啡」：1 比特', '“coffee”: 1 bit'))} anchor="start" size={10} />
        <Dot f={f} x={S} y={200 + 10 * S} color={col} r={4} />
        <Label x={px(f, 6)} y={py(f, 260) - 12} s={t(b('「墨水」：6 比特', '“ink”: 6 bits'))} size={10} color={col} />
      </Svg>
      <FigSlider label={t(b('意外度 $S$', 'Surprisal $S$'))} value={S} min={0} max={8} step={0.1} onChange={setS} readout={readout(S)} widest={[3.3, 6.6, 7.9].map(readout)} />
    </>
  )
}

/** Normalized predictivity of two encoding models against a noise ceiling of 0.5 (the worked example). */
function EncodingPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 48, y: 34, w: 200, h: 120, xr: [0.4, 2.6], yr: [0, 0.6] }
  return (
    <Svg id="f35mb1" w={380} h={196} label={t(b('编码模型：预测与脑反应的相关，除以噪声上限，就是可预测度', 'Encoding models: correlation with the brain divided by the noise ceiling gives predictivity'))}>
      <Axes f={f} xTicks={[[1, t(b('模型 1', 'model 1'))], [2, t(b('模型 2', 'model 2'))]]} yTicks={[[0, '0'], [0.2, '0.2'], [0.4, '0.4'], [0.5, '0.5']]} grid />
      <Label x={f.x - 4} y={f.y - 14} s={t(b('与脑反应的相关', 'Correlation with the brain'))} anchor="start" />
      <Ref f={f} y={0.5} color={C.lemonD} />
      <Label x={f.x + f.w + 6} y={py(f, 0.5)} s={t(b('噪声上限 0.5：\n重复测量的一致程度', 'noise ceiling 0.5:\nhow well repeats\nagree'))} anchor="start" size={10} color={C.lemonD} />
      <Bar f={f} x={1} v={0.4} w={0.55} color={col} />
      <Bar f={f} x={2} v={0.2} w={0.55} color={col} opacity={0.5} />
      <Label x={px(f, 1)} y={py(f, 0.4) - 9} s={t(b('0.4，可预测度 0.8', '0.4: predictivity 0.8'))} size={10} color={col} />
      <Label x={px(f, 2)} y={py(f, 0.2) - 9} s={t(b('0.2，可预测度 0.4', '0.2: predictivity 0.4'))} size={10} color={col} />
    </Svg>
  )
}

/** Next-token loss −ln p and perplexity 1 / p, interactive: drag the probability of the right token. Starts at the worked
 * example's 0.9 for 「光」 after 「床前明月」. */
function NextTokenPlot({ t }: FigProps) {
  const [p, setP] = useState(0.9)
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 44, y: 30, w: 290, h: 124, xr: [0, 1], yr: [0, 4.6] }
  const readout = (v: number) => t(b(`概率 ${v.toFixed(2)}：损失 ${(-Math.log(v)).toFixed(2)}，像在 ${(1 / v).toFixed(1)} 个词之间犹豫`, `probability ${v.toFixed(2)}: loss ${(-Math.log(v)).toFixed(2)}, like hesitating among ${(1 / v).toFixed(1)} words`))
  return (
    <>
      <Svg id="f35mc0" w={380} h={198} label={t(b('下一个词元预测：给正确词元的概率越低，损失越大；平均损失的指数是困惑度', 'Next-token prediction: the lower the probability of the right token, the larger the loss; the exponent of the mean loss is perplexity'))}>
        <Axes f={f} xTicks={[[0, '0'], [0.1, '0.1'], [0.25, '0.25'], [0.9, '0.9'], [1, '1']]} yTicks={[[0, '0'], [1.39, 'ln 4'], [2.3, '2.3']]} xLabel={t(b('给正确词元的概率', 'Probability of the right token'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('损失 −ln P', 'Loss −ln P'))} anchor="start" />
        <Path pts={trace(f, (v) => -Math.log(v), 0.01, 1, 200)} color={col} opacity={0.45} />
        <Dot f={f} x={0.25} y={Math.log(4)} color={C.dim} />
        <Label x={px(f, 0.25) + 8} y={py(f, Math.log(4)) - 8} s={t(b('困惑度 4：在 4 个词间犹豫', 'perplexity 4: torn among 4'))} anchor="start" size={10} />
        <Dot f={f} x={p} y={-Math.log(p)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('概率', 'Probability'))} value={p} min={0.02} max={1} step={0.01} onChange={setP} readout={readout(p)} widest={[0.02, 0.09].map(readout)} />
    </>
  )
}

/** The data scaling law L ∝ D^(−0.095), interactive: drag how many times more data. Log–log axes; the loss is relative to
 * the starting amount. */
function DataScalingPlot({ t }: FigProps) {
  const [k, setK] = useState(3)
  const col = SIDE_COLOR.comp
  const L = (lg: number) => Math.pow(10, -0.095 * lg)
  const f: Frame = { x: 44, y: 30, w: 290, h: 124, xr: [0, 6], yr: [0.2, 1.05] }
  const times = (lg: number) => (lg < 3 ? String(Math.round(Math.pow(10, lg))) : `10${['³', '⁴', '⁵', '⁶'][Math.round(lg) - 3] ?? ''}`)
  const readout = (lg: number) => t(b(`数据 ×${times(lg)}：损失降到 ${L(lg).toFixed(2)}`, `data ×${times(lg)}: loss falls to ${L(lg).toFixed(2)}`))
  return (
    <>
      <Svg id="f35mc1" w={380} h={198} label={t(b('数据规模定律：数据每增加十倍，损失降低约两成', 'The data scaling law: each tenfold increase in data cuts the loss by about a fifth'))}>
        <Axes f={f} xTicks={[[0, '1'], [1, '10'], [2, '100'], [3, '10³'], [4, '10⁴'], [6, '10⁶']]} yTicks={[[0.5, '0.5'], [0.8, '0.8'], [1, '1']]} xLabel={t(b('数据量，相对起点的倍数（对数）', 'Data, times the starting amount (log)'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('损失，相对起点', 'Loss, relative to start'))} anchor="start" />
        <Path pts={trace(f, L, 0, 6, 120)} color={col} opacity={0.45} />
        <Dot f={f} x={k} y={L(k)} color={col} r={4} />
        <Label x={px(f, 1)} y={py(f, L(1)) - 12} s={t(b('×10：0.80', '×10: 0.80'))} size={10} />
      </Svg>
      <FigSlider label={t(b('数据量（10 的几次方）', 'Data (power of ten)'))} value={k} min={0} max={6} step={1} onChange={setK} readout={readout(k)} widest={[2, 3].map(readout)} />
    </>
  )
}

export const LANGUAGE_FIGS: TopicFigs = {
  arch: { brain: LanguageBrainArch, ai: LlmArch },
  math: {
    bio: {
      0: { Fig: SurprisalPlot, cap: b('拖动滑块改变词的意外度 $S = -\\log_2 P$，取 $a = 200$ 毫秒、$b = 10$ 毫秒每比特。「我早上喝了一杯咖啡」中的「咖啡」概率 $0.5$，意外度 $1$ 比特，约读 $210$ 毫秒；默认的「墨水」概率 $1/64$，$6$ 比特，约 $260$ 毫秒。概率每减半，阅读时间多出同样的一段。', 'Drag the slider to change a word’s surprisal $S = -\\log_2 P$, with $a = 200$ ms and $b = 10$ ms per bit. In “I drank a cup of coffee this morning,” “coffee” has probability $0.5$, $1$ bit, read in about $210$ ms; the default “ink” has $1/64$, $6$ bits, about $260$ ms. Each halving of probability adds the same stretch of time.') },
      1: { Fig: EncodingPlot, cap: b('小例子：这个脑区重复测量之间的一致程度（噪声上限）为 $0.5$，这是任何模型能达到的上限。模型 1 与脑反应的相关为 $0.4$，可预测度 $0.4/0.5 = 0.8$；模型 2 只有 $0.2$，可预测度 $0.4$。', 'The worked example: repeated measurements of this region agree at $0.5$, the noise ceiling and the most any model can reach. Model 1 correlates $0.4$ with the brain, a predictivity of $0.4/0.5 = 0.8$; model 2 only $0.2$, a predictivity of $0.4$.') },
    },
    comp: {
      0: { Fig: NextTokenPlot, cap: b('拖动滑块改变模型给正确词元的概率。默认「床前明月」之后给「光」$0.9$，损失约 $0.11$；只给 $0.1$ 时损失约 $2.3$。平均损失的指数叫困惑度：损失 $\\ln 4 \\approx 1.39$ 相当于每一步在约 4 个词之间犹豫。', 'Drag the slider to change the probability the model gives the right token. By default “light” after “before my bed, the bright moon” gets $0.9$, a loss of about $0.11$; at $0.1$ the loss is about $2.3$. The exponent of the mean loss is perplexity: a loss of $\\ln 4 \\approx 1.39$ is like hesitating among about 4 words at each step.') },
      1: { Fig: DataScalingPlot, cap: b('拖动滑块改变数据量，两个轴都是对数。$\\alpha_D \\approx 0.095$：数据增加十倍，损失降到约 $0.80$；默认增加一千倍，降到约 $0.52$，差不多一半。儿童接触的语言比模型少四个数量级以上，却达到了母语者的水平。', 'Drag the slider to change the amount of data; both axes are logarithmic. With $\\alpha_D \\approx 0.095$, ten times the data brings the loss to about $0.80$; the default thousandfold, to about $0.52$, nearly half. Children hear four or more orders of magnitude less language than models, yet reach native fluency.') },
    },
  },
}
