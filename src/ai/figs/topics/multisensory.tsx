import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Var } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Three senses feed the superior colliculus and association cortex; reliability weighting and a common-source
 *  judgment produce one percept, which feeds back to the senses. */
function MultisensoryArch({ t }: FigProps) {
  const id = 'f03b'
  return (
    <Svg id={id} w={380} h={272} label={t(b('多感官整合回路的结构与信息流', 'Structure and information flow of multisensory integration circuits'))}>
      <Mod x={14} y={14} w={108} h={38} side="bio" label={t(b('视觉', 'Vision'))} sub={t(b('以眼为中心', 'eye-centered'))} />
      <Mod x={136} y={14} w={108} h={38} side="bio" label={t(b('听觉', 'Hearing'))} sub={t(b('以头为中心', 'head-centered'))} />
      <Mod x={258} y={14} w={108} h={38} side="bio" label={t(b('触觉', 'Touch'))} sub={t(b('以身体为中心', 'body-centered'))} />
      <Mod x={14} y={84} w={120} h={42} side="bio" label={t(b('上丘', 'Sup. colliculus'))} sub={t(b('视听触地图对齐', 'maps aligned'))} />
      <Mod x={150} y={84} w={216} h={42} side="bio" label={t(b('联合皮层', 'Association cortex'))} sub={t(b('颞上沟、顶叶：换到共同坐标', 'STS, parietal: one shared frame'))} />
      <Var cx={74} cy={170} side="bio" label={t(b('转向', 'Orient'))} r={15} />
      <Mod x={150} y={152} w={100} h={42} side="bio" label={t(b('可靠性加权', 'Reliability'))} sub={t(b('可靠的权重大', 'reliable weighs more'))} size={10.5} />
      <Mod x={266} y={152} w={100} h={42} side="bio" label={t(b('同源判断', 'Common source?'))} sub={t(b('合并或分开', 'merge or keep apart'))} size={10.5} />
      <Mod x={150} y={222} w={216} h={36} side="bio" label={t(b('合并后的知觉', 'Combined percept'))} />

      <Flow id={id} side="bio" fast pts={[[50, 52], [50, 84]]} />
      <Flow id={id} side="bio" fast pts={[[160, 52], [160, 68], [100, 68], [100, 84]]} />
      <Flow id={id} side="bio" pts={[[200, 52], [200, 84]]} />
      <Flow id={id} side="bio" pts={[[312, 52], [312, 84]]} />
      <Flow id={id} side="bio" pts={[[74, 126], [74, 155]]} />
      <Flow id={id} side="bio" pts={[[200, 126], [200, 152]]} />
      <Flow id={id} side="bio" pts={[[316, 126], [316, 152]]} />
      <Flow id={id} side="bio" pts={[[200, 194], [200, 222]]} />
      <Flow id={id} side="bio" pts={[[316, 194], [316, 222]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[150, 240], [8, 240], [8, 33], [14, 33]]} label={t(b('反馈', 'feedback'))} ly={-7} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={84} n={2} side="bio" />
      <Num x={150} y={84} n={3} side="bio" />
      <Num x={150} y={152} n={4} side="bio" />
      <Num x={266} y={152} n={5} side="bio" />
      <Num x={110} y={240} n={6} side="bio" />
    </Svg>
  )
}

/** One encoder per modality, projection into a shared space, contrastive alignment in training and fusion into a language model. */
function MultimodalModelArch({ t }: FigProps) {
  const id = 'f03c'
  return (
    <Svg id={id} w={380} h={296} label={t(b('多模态模型的结构与信息流', 'Structure and information flow of a multimodal model'))}>
      <Mod x={14} y={14} w={108} h={30} side="comp" label={t(b('图像', 'Image'))} size={10.5} />
      <Mod x={136} y={14} w={108} h={30} side="comp" label={t(b('声音', 'Audio'))} size={10.5} />
      <Mod x={258} y={14} w={108} h={30} side="comp" label={t(b('文字', 'Text'))} size={10.5} />
      <Mod x={14} y={70} w={108} h={36} side="comp" label={t(b('图像编码器', 'Image encoder'))} sub="ViT" size={10.5} />
      <Mod x={136} y={70} w={108} h={36} side="comp" label={t(b('音频编码器', 'Audio encoder'))} sub={t(b('频谱 Transformer', 'spectrogram model'))} size={10.5} />
      <Mod x={258} y={70} w={108} h={36} side="comp" label={t(b('文本编码器', 'Text encoder'))} sub="Transformer" size={10.5} />
      <Mod x={14} y={132} w={352} h={34} side="comp" label={t(b('投影到共享空间', 'Projection into a shared space'))} sub={t(b('长度为 1 的向量，可用点积比较', 'unit vectors, compared by dot product'))} />
      <Mod x={14} y={190} w={170} h={38} side="comp" label={t(b('对比对齐', 'Contrastive alignment'))} sub={t(b('训练时配对拉近', 'pairs pulled together in training'))} size={10.5} />
      <Mod x={196} y={190} w={170} h={38} side="comp" label={t(b('融合进语言模型', 'Fusion into an LLM'))} sub={t(b('额外词元或交叉注意力', 'extra tokens or cross-attention'))} size={10.5} />
      <Mod x={196} y={252} w={170} h={30} side="comp" label={t(b('输出', 'Output'))} size={10.5} />
      <Gap x={14} y={246} w={80} h={42} label={t(b('可靠性\n估计', 'Reliability\nestimate'))} />
      <Gap x={104} y={246} w={80} h={42} label={t(b('同源判断', 'Common\nsource?'))} />

      <Flow id={id} side="comp" pts={[[68, 44], [68, 70]]} />
      <Flow id={id} side="comp" pts={[[190, 44], [190, 70]]} />
      <Flow id={id} side="comp" pts={[[312, 44], [312, 70]]} />
      <Flow id={id} side="comp" pts={[[68, 106], [68, 132]]} />
      <Flow id={id} side="comp" pts={[[190, 106], [190, 132]]} />
      <Flow id={id} side="comp" pts={[[312, 106], [312, 132]]} />
      <Flow id={id} side="comp" pts={[[99, 166], [99, 190]]} />
      <Flow id={id} side="comp" pts={[[281, 166], [281, 190]]} />
      <Flow id={id} side="comp" pts={[[281, 228], [281, 252]]} />
      <Num x={14} y={70} n={1} side="comp" />
      <Num x={14} y={132} n={2} side="comp" />
      <Num x={14} y={190} n={3} side="comp" />
      <Num x={196} y={190} n={4} side="comp" />
      <Num x={196} y={252} n={5} side="comp" />
      <Num x={14} y={246} n={6} side="comp" />
      <Num x={104} y={246} n={6} side="comp" />
    </Svg>
  )
}

const normal = (m: number, s: number) => (x: number) => Math.exp(-((x - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI))

/** Cue combination, interactive: touch says 12 cm (σ = 2); drag vision's σ_V (vision says 10 cm) to see the weights
 * and the combined estimate move. Starts at the worked example's σ_V = 1. */
function CueCombinationPlot({ t }: FigProps) {
  const [sv, setSv] = useState(1)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 40, y: 30, w: 318, h: 128, xr: [4, 18], yr: [0, 0.9] }
  const comb = (s: number) => { const wv = (1 / s ** 2) / (1 / s ** 2 + 1 / 4); return { wv, m: wv * 10 + (1 - wv) * 12, sd: Math.sqrt((s * s * 4) / (s * s + 4)) } }
  const c = comb(sv)
  const readout = (s: number) => { const r = comb(s); return t(b(`$\\sigma_V = ${s.toFixed(2)}$，$w_V = ${r.wv.toFixed(2)}$，合并 ${r.m.toFixed(1)} 厘米`, `$\\sigma_V = ${s.toFixed(2)}$, $w_V = ${r.wv.toFixed(2)}$, combined ${r.m.toFixed(1)} cm`)) }
  const key = (y: number, color: string, s: string, width = 1.8, opacity = 1) => (
    <g>
      <line x1={222} x2={240} y1={y} y2={y} stroke={color} strokeWidth={width} strokeOpacity={opacity} />
      <Label x={246} y={y} s={s} anchor="start" size={10} color={color} />
    </g>
  )
  return (
    <>
      <Svg id="f03mb0" w={380} h={202} label={t(b('视觉与触觉的估计按可靠性合并；视觉越不可靠，合并点越靠近触觉', 'Vision and touch combined by reliability: the less reliable vision is, the closer the combined point moves to touch'))}>
        <Axes f={f} xTicks={[[4, '4'], [8, '8'], [10, '10'], [12, '12'], [16, '16']]} xLabel={t(b('物体宽度（厘米）', 'Object width (cm)'))} yLabel={t(b('估计的分布', 'Spread of the estimate'))} />
        <Path pts={trace(f, normal(12, 2))} color={C.dim} />
        <Path pts={trace(f, normal(10, sv))} color={col} opacity={0.5} />
        <Path pts={trace(f, normal(c.m, c.sd))} color={col} width={2.2} />
        <Ref f={f} x={c.m} />
        {key(42, col, t(b(`视觉：10，σ = ${sv.toFixed(2)}`, `vision: 10, σ = ${sv.toFixed(2)}`)), 1.8, 0.5)}
        {key(58, C.dim, t(b('触觉：12，σ = 2', 'touch: 12, σ = 2')))}
        {key(74, col, t(b(`合并：${c.m.toFixed(1)}，σ = ${c.sd.toFixed(2)}`, `combined: ${c.m.toFixed(1)}, σ = ${c.sd.toFixed(2)}`)), 2.2)}
      </Svg>
      <FigSlider label={t(b('视觉的 $\\sigma_V$', 'Vision’s $\\sigma_V$'))} value={sv} min={0.5} max={4} step={0.05} onChange={setSv}
        readout={readout(sv)} widest={[1, 3.95].map(readout)} />
    </>
  )
}

/** How far a sound is pulled toward a visual flash, interactive: drag the offset. Always merging pulls 0.8 × offset;
 * causal inference scales that by P(same source). P from Gaussian likelihoods with σ = 8.8° (one source), 30° (two)
 * and p_c = 0.75, chosen to match the worked example: P = 0.9 at 5°, 0.05 at 30°. Starts at 5°. */
function CausalInferencePlot({ t }: FigProps) {
  const [d, setD] = useState(5)
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 40, y: 30, w: 300, h: 128, xr: [0, 40], yr: [0, 20] }
  const s1 = 8.8, s2 = 30, pc = 0.75
  const P = (x: number) => { const l1 = pc * normal(0, s1)(x), l2 = (1 - pc) * normal(0, s2)(x); return l1 / (l1 + l2) }
  const pull = (x: number) => P(x) * 0.8 * x
  const readout = (x: number) => t(b(`错位 ${x.toFixed(1)}°：$P = ${P(x).toFixed(2)}$，拉动 ${pull(x).toFixed(1)}°`, `offset ${x.toFixed(1)}°: $P = ${P(x).toFixed(2)}$, pulled ${pull(x).toFixed(1)}°`))
  return (
    <>
      <Svg id="f03mb1" w={380} h={202} label={t(b('因果推断：错位小时声音被画面拉走，错位大时几乎不动', 'Causal inference: a small offset pulls the sound toward the picture, a large one barely moves it'))}>
        <Axes f={f} xTicks={[[0, '0'], [10, '10'], [20, '20'], [30, '30'], [40, '40']]} yTicks={[[0, '0'], [10, '10'], [20, '20']]}
          xLabel={t(b('画面与声音的错位（度）', 'Offset between picture and sound (°)'))} yLabel={t(b('听到的声音被拉动（度）', 'Pull on the heard sound (°)'))} grid />
        <Path pts={trace(f, (x) => 0.8 * x, 0, 25, 2)} color={C.dim} dashed width={1.3} />
        <Label x={px(f, 23)} y={py(f, 19.5)} s={t(b('总是合并', 'always merge'))} anchor="end" size={10} />
        <Path pts={trace(f, pull)} color={col} />
        <Label x={px(f, 30)} y={py(f, 7)} s={t(b('因果推断', 'causal inference'))} anchor="start" size={10} color={col} />
        <line x1={px(f, d)} x2={px(f, d)} y1={py(f, 0)} y2={py(f, pull(d))} stroke={col} strokeDasharray="3 3" />
        <Dot f={f} x={d} y={pull(d)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('错位', 'Offset'))} value={d} min={0} max={40} step={0.5} onChange={setD}
        readout={readout(d)} widest={[15.5, 38.5].map(readout)} />
    </>
  )
}

/** Similarities in a batch of three image–text pairs (dog row from the worked example; others illustrative), and the
 * softmax over the dog row at two temperatures. */
function ContrastivePlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const S = [[0.9, 0.6, 0.1], [0.6, 0.9, 0.1], [0.1, 0.2, 0.9]]
  const rows = [t(b('狗照片', 'dog photo')), t(b('猫照片', 'cat photo')), t(b('车照片', 'car photo'))]
  const cols = [t(b('狗', 'dog')), t(b('猫', 'cat')), t(b('车', 'car'))]
  const soft = (tau: number) => { const e = S[0].map((v) => Math.exp(v / tau)); const z = e.reduce((a, v) => a + v, 0); return e.map((v) => v / z) }
  const p1 = soft(1), p01 = soft(0.1)
  const cell = 32, x0 = 74, y0 = 50
  const f: Frame = { x: 232, y: 50, w: 126, h: 96, xr: [0.4, 3.6], yr: [0, 1] }
  return (
    <Svg id="f03mc0" w={380} h={196} label={t(b('对比学习：配对的图像和文字在对角线上最相似；温度越低，正确配对的概率越接近 1', 'Contrastive learning: matched images and texts are most similar on the diagonal; the lower the temperature, the closer the right match gets to 1'))}>
      <Label x={x0 + 1.5 * cell} y={y0 - 26} s={t(b('文字', 'Text'))} color={C.ink} />
      {cols.map((c, j) => <Label key={c} x={x0 + j * cell + cell / 2} y={y0 - 10} s={c} size={10} />)}
      {rows.map((r, i) => <Label key={r} x={x0 - 6} y={y0 + i * cell + cell / 2} s={r} anchor="end" size={10} />)}
      {S.map((row, i) => row.map((v, j) => (
        <g key={`${i}-${j}`}>
          <rect x={x0 + j * cell} y={y0 + i * cell} width={cell - 1} height={cell - 1} fill={col} fillOpacity={0.06 + 0.7 * v} stroke={i === 0 ? C.ink : 'none'} strokeOpacity={0.5} />
          <text x={x0 + j * cell + cell / 2} y={y0 + i * cell + cell / 2} fontSize={10} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{v}</text>
        </g>
      )))}
      <Label x={x0 + 1.5 * cell} y={y0 + 3 * cell + 14} s={t(b('相似度 u · v', 'similarity u · v'))} size={10} />
      <Axes f={f} xTicks={[[1, cols[0]], [2, cols[1]], [3, cols[2]]]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} />
      <Label x={f.x - 4} y={f.y - 26} s={t(b('狗照片配哪段文字', 'Which text for the dog photo'))} anchor="start" />
      {[0, 1, 2].map((j) => <Bar key={`a${j}`} f={f} x={j + 0.82} v={p1[j]} w={0.32} color={C.dim} />)}
      {[0, 1, 2].map((j) => <Bar key={`b${j}`} f={f} x={j + 1.18} v={p01[j]} w={0.32} color={col} />)}
      <Label x={px(f, 1.18)} y={py(f, p01[0]) - 8} s="0.95" size={10} color={col} />
      <Label x={px(f, 2.2)} y={py(f, 0.8)} s="τ = 0.1" anchor="start" size={10} color={col} />
      <Label x={px(f, 2.2)} y={py(f, 0.62)} s="τ = 1" anchor="start" size={10} />
    </Svg>
  )
}

/** The gate tanh(α): 0 at the start of training, so the language model is unchanged; 0.46 at α = 0.5. */
function GatePlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 40, y: 30, w: 300, h: 124, xr: [0, 3], yr: [0, 1] }
  return (
    <Svg id="f03mc1" w={380} h={198} label={t(b('门控 tanh(α)：训练开始时为 0，语言模型不受影响，之后逐渐打开', 'The gate tanh(α): 0 when training starts, leaving the language model unchanged, then opening gradually'))}>
      <Axes f={f} xTicks={[[0, '0'], [0.5, '0.5'], [1, '1'], [2, '2'], [3, '3']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
        xLabel={t(b('学到的门控参数 α', 'Learned gate parameter α'))} yLabel={t(b('图像信息加入的比例 tanh(α)', 'Share of image information, tanh(α)'))} grid />
      <Path pts={trace(f, Math.tanh)} color={col} />
      <Dot f={f} x={0} y={0} color={col} />
      <Dot f={f} x={0.5} y={Math.tanh(0.5)} color={col} />
      <Label x={px(f, 0.35)} y={py(f, 0.08)} s={t(b('α = 0：开始训练，等于不看图', 'α = 0 at the start: as if no image'))} anchor="start" size={10} color={col} />
      <Label x={px(f, 0.5) + 8} y={py(f, Math.tanh(0.5)) + 4} s="α = 0.5：0.46" anchor="start" size={10} color={col} />
    </Svg>
  )
}

export const MULTISENSORY_FIGS: TopicFigs = {
  arch: { brain: MultisensoryArch, ai: MultimodalModelArch },
  math: {
    bio: {
      0: { Fig: CueCombinationPlot, cap: b('拖动滑块改变视觉的不确定性 $\\sigma_V$，例如光线变暗。触觉固定为 $12$ 厘米、$\\sigma = 2$。默认 $\\sigma_V = 1$ 时视觉权重 $0.8$，合并估计 $10.4$ 厘米，标准差 $0.89$ 比视觉单独的 $1$ 还小。$\\sigma_V$ 拖到 $2$，两者权重相等，合并点在正中间；再大，合并点就移向触觉。无论怎么拖，合并后的分布都比两个单独的窄。', 'Drag the slider to change vision’s uncertainty $\\sigma_V$, as in dimming light. Touch stays at $12$ cm with $\\sigma = 2$. At the default $\\sigma_V = 1$ vision weighs $0.8$, the combined estimate is $10.4$ cm, and its standard deviation of $0.89$ is below vision’s own $1$. At $\\sigma_V = 2$ the weights are equal and the combined point sits midway; beyond that it moves toward touch. However you drag, the combined distribution is narrower than either alone.') },
      1: { Fig: CausalInferencePlot, cap: b('拖动滑块改变画面与声音的错位。虚线是总把两个感官合并时声音被拉动的距离；实线乘上了「同一来源」的概率 $P$。默认错位 $5°$，$P \\approx 0.9$，拉动 $3.6°$；拖到 $30°$，$P \\approx 0.05$，只拉动 $1.2°$。拉动在约 $16°$ 达到最大后回落，大错位被判为两个来源。曲线由高斯似然算出，参数取为与小例子吻合。', 'Drag the slider to change the offset between picture and sound. The dashed line is how far the sound would be pulled if the senses were always merged; the solid line multiplies it by the probability $P$ of one source. At the default $5°$, $P \\approx 0.9$ and the pull is $3.6°$; at $30°$, $P \\approx 0.05$ and the pull is only $1.2°$. The pull peaks near $16°$ and falls, as large offsets are judged two sources. The curve comes from Gaussian likelihoods with parameters chosen to match the worked example.') },
    },
    comp: {
      0: { Fig: ContrastivePlot, cap: b('左：一批三对的相似度，第一行取自小例子，其余为示意。损失要求每一行的对角线格子最大。右：对狗照片这一行做 softmax，$\\tau = 1$ 时正确文字只占约 $0.46$，$\\tau = 0.1$ 时占 $0.95$；训练会继续拉大 $0.9$ 与 $0.6$ 的差距。', 'Left: similarities in a batch of three pairs; the first row is from the worked example, the rest illustrative. The loss asks each row’s diagonal cell to be the largest. Right: softmax over the dog row gives the right text only about $0.46$ at $\\tau = 1$ but $0.95$ at $\\tau = 0.1$, and training keeps widening the gap between $0.9$ and $0.6$.') },
      1: { Fig: GatePlot, cap: b('门控 $\\tanh(\\alpha)$ 从 $0$ 开始，所以训练第一步的输出与原来的语言模型完全相同；$\\alpha$ 学到 $0.5$ 时，图像信息以约 $0.46$ 的比例加入。门在训练中逐渐打开，原有的语言能力不会被一下子打乱。', 'The gate $\\tanh(\\alpha)$ starts at $0$, so at the first training step the output equals the original language model. When $\\alpha$ reaches $0.5$, image information enters at about $0.46$. The gate opens gradually during training, so the existing language ability is not disrupted all at once.') },
    },
  },
}
