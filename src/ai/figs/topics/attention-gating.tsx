import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Two objects compete in visual cortex; a prefrontal goal raises the gain of one, the thalamus gates the senses, salient stimuli capture, the winner enters working memory. */
function AttentionBrainArch({ t }: FigProps) {
  const id = 'f22b'
  return (
    <Svg id={id} w={380} h={256} label={t(b('选择性注意的结构与信息流：视觉皮层中的竞争、前额叶的目标、增益调节、丘脑网状核、上丘与顶叶的捕获、工作记忆', 'Selective attention: competition in visual cortex, prefrontal goal, gain modulation, thalamic reticular nucleus, capture by colliculus and parietal cortex, working memory'))}>
      <Mod x={30} y={14} w={154} h={40} side="bio" label={t(b('前额叶与额叶眼区', 'Prefrontal cortex, FEF'))} sub={t(b('保持当前目标', 'holds the current goal'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('上丘与顶叶', 'Colliculus and parietal'))} sub={t(b('显著刺激自动吸引注意', 'salient stimuli capture'))} size={10.5} />
      <Region x={40} y={80} w={334} h={90} side="bio" label={t(b('视觉皮层', 'Visual cortex'))} />
      <Var cx={150} cy={126} r={15} side="bio" label="A" />
      <Var cx={230} cy={126} r={15} side="bio" label="B" />
      <line x1={166} y1={122} x2={214} y2={122} stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <line x1={166} y1={130} x2={214} y2={130} stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <T x={236} y={156} s={t(b('相互抑制，争夺处理', 'mutual inhibition, competing'))} size={9} color={C.dim} />
      <Mod x={14} y={200} w={170} h={40} side="bio" label={t(b('丘脑网状核', 'Thalamic reticular nucleus'))} sub={t(b('感觉通道的闸门', 'gate of the sensory channels'))} size={10.5} />
      <Mod x={196} y={200} w={170} h={40} side="bio" label={t(b('工作记忆', 'Working memory'))} sub={t(b('胜出的信息被处理和报告', 'the winner is processed, reported'))} size={10.5} />

      <Flow id={id} side="bio" kind="fb" pts={[[107, 54], [107, 126], [135, 126]]} label={t(b('提高增益', 'raises gain'))} lx={30} ly={-8} />
      <Flow id={id} side="bio" pts={[[300, 54], [300, 126], [245, 126]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[22, 54], [22, 200]]} />
      <Flow id={id} side="bio" pts={[[70, 200], [70, 170]]} label={t(b('感觉输入', 'sensory input'))} lx={34} ly={0} />
      <Flow id={id} side="bio" pts={[[150, 141], [150, 184], [281, 184], [281, 200]]} label={t(b('胜出者', 'winner'))} at={1} ly={-6} />
      <Num x={30} y={14} n={2} side="bio" />
      <Num x={196} y={14} n={5} side="bio" />
      <Num x={364} y={92} n={1} side="bio" />
      <Num x={107} y={68} n={3} side="bio" />
      <Num x={14} y={200} n={4} side="bio" />
      <Num x={196} y={200} n={6} side="bio" />
    </Svg>
  )
}

/** Token vectors give queries, keys and values; attention weights sum the values in many heads; a router sends each token to a few experts. */
function TransformerAttentionArch({ t }: FigProps) {
  const id = 'f22c'
  return (
    <Svg id={id} w={380} h={300} label={t(b('Transformer 注意力与路由的结构与信息流：词元向量、查询键值、注意力权重、多头、混合专家路由', 'Transformer attention and routing: token vectors, queries, keys and values, attention weights, heads, expert routing'))}>
      <Mod x={14} y={14} w={352} h={36} side="comp" label={t(b('词元向量', 'Token vectors'))} sub={t(b('所有词元并排放在上下文中', 'every token side by side in the context'))} size={10.5} />
      <Mod x={14} y={72} w={108} h={40} side="comp" label={t(b('查询 Q', 'Query Q'))} sub={t(b('要找什么', 'what to look for'))} size={10.5} />
      <Mod x={136} y={72} w={108} h={40} side="comp" label={t(b('键 K', 'Key K'))} sub={t(b('我是什么', 'what I am'))} size={10.5} />
      <Mod x={258} y={72} w={108} h={40} side="comp" label={t(b('值 V', 'Value V'))} sub={t(b('携带的内容', 'what I carry'))} size={10.5} />
      {/* several heads: copies stacked behind the attention module */}
      <rect x={26} y={128} width={230} height={40} rx={7} fill={C.sky} stroke={C.skyD} strokeOpacity={0.4} strokeWidth={1} />
      <rect x={20} y={133} width={230} height={40} rx={7} fill={C.sky} stroke={C.skyD} strokeOpacity={0.6} strokeWidth={1} />
      <Mod x={14} y={138} w={230} h={40} side="comp" label={t(b('注意力权重', 'Attention weights'))} sub={t(b('点积，softmax，再加权求和', 'dot products, softmax, weighted sum'))} size={10.5} />
      <T x={270} y={133} s={t(b('多头并行', 'heads in parallel'))} size={9} color={C.skyD} anchor="start" />
      <Mod x={14} y={200} w={230} h={40} side="comp" label={t(b('混合专家路由', 'Mixture-of-experts routing'))} sub={t(b('每个词元只送进少数专家', 'each token goes to a few experts'))} size={10.5} />
      <Var cx={282} cy={220} side="comp" label="E1" />
      <Var cx={318} cy={220} side="comp" label="E2" />
      <circle cx={354} cy={220} r={13} fill="none" stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <T x={354} y={220} s="E3" size={9.5} color={C.dim} />
      <Gap x={14} y={256} w={352} h={32} label={t(b('自上而下的目标信号与容量瓶颈', 'Top-down goal signal and a capacity bottleneck'))} />

      <Flow id={id} side="comp" pts={[[68, 50], [68, 72]]} />
      <Flow id={id} side="comp" pts={[[190, 50], [190, 72]]} />
      <Flow id={id} side="comp" pts={[[312, 50], [312, 72]]} />
      <Flow id={id} side="comp" pts={[[68, 112], [68, 138]]} />
      <Flow id={id} side="comp" pts={[[190, 112], [190, 138]]} />
      <Flow id={id} side="comp" pts={[[312, 112], [312, 158], [244, 158]]} />
      <Flow id={id} side="comp" pts={[[129, 178], [129, 200]]} />
      <Flow id={id} side="comp" pts={[[244, 220], [269, 220]]} />
      <Flow id={id} side="comp" pts={[[244, 212], [308, 209]]} curve={[278, 186]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={72} n={2} side="comp" />
      <Num x={14} y={138} n={3} side="comp" />
      <Num x={256} y={133} n={4} side="comp" />
      <Num x={14} y={200} n={5} side="comp" />
      <Num x={14} y={256} n={6} side="comp" />
    </Svg>
  )
}

/** Biased competition on the worked example (preferred alone 50 spikes/s, non-preferred alone 10), interactive: drag the
 * attentional bias from the non-preferred stimulus (w₂ = 3) through none (w₁ = w₂ = 1) to the preferred one (w₁ = 3). */
function BiasedCompetitionPlot({ t }: FigProps) {
  const [a, setA] = useState(1)
  const col = SIDE_COLOR.bio
  const ws = (x: number) => [Math.pow(3, Math.max(0, x)), Math.pow(3, Math.max(0, -x))]
  const R = (x: number) => { const [w1, w2] = ws(x); return (w1 * 50 + w2 * 10) / (w1 + w2) }
  const f: Frame = { x: 44, y: 30, w: 190, h: 124, xr: [-1, 1], yr: [0, 55] }
  const [w1, w2] = ws(a)
  const readout = (x: number) => { const [p, q] = ws(x); return t(b(`$w_1 = ${p.toFixed(2)}$，$w_2 = ${q.toFixed(2)}$：反应 ${R(x).toFixed(0)}`, `$w_1 = ${p.toFixed(2)}$, $w_2 = ${q.toFixed(2)}$: response ${R(x).toFixed(0)}`)) }
  return (
    <>
      <Svg id="f22mb0" w={380} h={198} label={t(b('偏向竞争：注意哪个刺激，神经元的反应就接近它单独出现时的反应', 'Biased competition: the neuron responds almost as if the attended stimulus were alone'))}>
        <Axes f={f} xTicks={[[-1, t(b('注意非偏好', 'non-pref.'))], [0, t(b('不注意', 'neither'))], [1, t(b('注意偏好', 'preferred'))]]} yTicks={[[0, '0'], [10, '10'], [30, '30'], [50, '50']]} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('同时出现时的反应（次/秒）', 'Response to the pair (spikes/s)'))} anchor="start" />
        <Ref f={f} y={50} color={col} />
        <Ref f={f} y={10} color={C.dim} />
        <Label x={f.x + f.w + 6} y={py(f, 50)} s={t(b('偏好刺激单独：50', 'preferred alone: 50'))} anchor="start" size={10} color={col} />
        <Label x={f.x + f.w + 6} y={py(f, 10)} s={t(b('非偏好单独：10', 'non-preferred alone: 10'))} anchor="start" size={10} />
        <Path pts={trace(f, R, -1, 1, 120)} color={col} opacity={0.45} />
        <Dot f={f} x={a} y={R(a)} color={col} r={4} />
        <Label x={f.x + f.w + 6} y={py(f, 30)} s={`w₁ = ${w1.toFixed(1)}, w₂ = ${w2.toFixed(1)}`} anchor="start" size={10} color={C.ink} />
      </Svg>
      <FigSlider label={t(b('注意偏向', 'Attention bias'))} value={a} min={-1} max={1} step={0.02} onChange={setA} readout={readout(a)} widest={[0.5, -0.5].map(readout)} />
    </>
  )
}

/** The normalization model of attention on the worked example (E = 10, σ = 5, surround S = 5, gain A = 2 on the target),
 * interactive: drag how much of the surround the attention field also covers; S grows to 10 at full coverage. */
function NormalizationPlot({ t }: FigProps) {
  const [p, setP] = useState(0)
  const col = SIDE_COLOR.bio
  const gain = (x: number) => (20 / (5 * (1 + x) + 5)) / (10 / (5 + 5))
  const f: Frame = { x: 44, y: 30, w: 176, h: 124, xr: [0, 1], yr: [1, 2.1] }
  const readout = (x: number) => t(b(`覆盖周围 ${Math.round(x * 100)}%：反应 ×${gain(x).toFixed(2)}`, `covers ${Math.round(x * 100)}% of the surround: response ×${gain(x).toFixed(2)}`))
  return (
    <>
      <Svg id="f22mb1" w={380} h={198} label={t(b('注意的归一化：注意范围只罩住目标时反应翻倍，连周围也放大时增益变小', 'Normalization of attention: an attention field on the target alone doubles the response, while one that also lifts the surround gains less'))}>
        <Axes f={f} xTicks={[[0, t(b('只罩目标', 'target only'))], [1, t(b('连周围', 'with surround'))]]} yTicks={[[1, '×1'], [1.5, '×1.5'], [2, '×2']]} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('注意带来的增益', 'Gain from attention'))} anchor="start" />
        <Path pts={trace(f, gain, 0, 1, 60)} color={col} opacity={0.45} />
        <Dot f={f} x={p} y={gain(p)} color={col} r={4} />
        <circle cx={316} cy={92} r={46} fill="none" stroke={C.dim} strokeDasharray="3 3" />
        <circle cx={316} cy={92} r={10} fill={col} fillOpacity={0.6} />
        <circle cx={316} cy={92} r={14 + 32 * p} fill={C.lemonD} fillOpacity={0.12} stroke={C.lemonD} strokeOpacity={0.7} />
        <Label x={316} y={162} s={t(b('粉：目标　虚线：周围\n黄：注意范围', 'pink: target\ndashed: surround\nyellow: attention'))} size={9.5} />
      </Svg>
      <FigSlider label={t(b('注意范围', 'Attention field'))} value={p} min={0} max={1} step={0.01} onChange={setP} readout={readout(p)} widest={[0.5, 1].map(readout)} />
    </>
  )
}

/** Two attention heads on "小猫 追着 它的 尾巴" (the kitten chases its tail): one links "its" to "kitten", the other
 * looks at the neighboring token. Causal: each token attends to itself and earlier ones. Weights illustrative. */
function HeadsPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const toks = [t(b('小猫', 'kitten')), t(b('追着', 'chases')), t(b('它的', 'its')), t(b('尾巴', 'tail'))]
  const h1 = [[1, 0, 0, 0], [0.7, 0.3, 0, 0], [0.8, 0.1, 0.1, 0], [0.3, 0.1, 0.2, 0.4]]
  const h2 = [[1, 0, 0, 0], [0.6, 0.4, 0, 0], [0.1, 0.7, 0.2, 0], [0.1, 0.1, 0.7, 0.1]]
  const cell = 26
  const grid = (x0: number, m: number[][], title: string, hi: [number, number]) => (
    <g>
      <Label x={x0 + 2 * cell} y={22} s={title} color={C.ink} size={10} />
      {toks.map((s, j) => <text key={`c${j}`} x={x0 + j * cell + cell / 2} y={40} fontSize={9} textAnchor="middle" fill={C.dim}>{s}</text>)}
      {m.map((row, i) => row.map((v, j) => (
        <g key={`${i}-${j}`}>
          <rect x={x0 + j * cell} y={48 + i * cell} width={cell - 1} height={cell - 1} fill={j > i ? C.ghost : col} fillOpacity={j > i ? 1 : 0.08 + 0.8 * v} stroke={hi[0] === i && hi[1] === j ? C.ink : 'none'} strokeWidth={1.5} />
          {j <= i && <text x={x0 + j * cell + cell / 2} y={48 + i * cell + cell / 2} fontSize={8.5} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{v.toFixed(1)}</text>}
        </g>
      )))}
    </g>
  )
  return (
    <Svg id="f22mc0" w={380} h={196} label={t(b('两个注意力头：一个把「它的」连到「小猫」，另一个看相邻的词', 'Two attention heads: one links “its” to “kitten”, the other looks at the neighboring word'))}>
      {toks.map((s, i) => <text key={i} x={60} y={48 + i * cell + cell / 2} fontSize={9} textAnchor="end" dominantBaseline="middle" fill={C.dim}>{s}</text>)}
      {grid(66, h1, t(b('头 1：指代', 'Head 1: reference')), [2, 0])}
      {grid(186, h2, t(b('头 2：相邻词', 'Head 2: neighbor')), [3, 2])}
      <Label x={190} y={166} s={t(b('行是查询，列是键；每行权重之和为 1，右上角被因果掩码遮住', 'rows are queries, columns keys; each row sums to 1; the upper right is masked'))} size={9.5} />
      <Label x={190} y={182} s={t(b('白框：「它的」主要看「小猫」（头 1），「尾巴」主要看「它的」（头 2）', 'boxed: “its” looks at “kitten” (head 1), “tail” at “its” (head 2)'))} size={9.5} />
    </Svg>
  )
}

/** Mixture-of-experts routing with eight experts and illustrative router scores, interactive: drag k. Gates are a softmax
 * over the top k; compute is k / 8 of using every expert. Starts at the worked example's k = 2. */
function MoePlot({ t }: FigProps) {
  const [k, setK] = useState(2)
  const col = SIDE_COLOR.comp
  const scores = [2.0, 0.1, 1.5, 0.8, -0.5, 0.3, 1.0, -1.0]
  const top = [...scores.keys()].sort((a, c) => scores[c] - scores[a]).slice(0, k)
  const z = top.reduce((s, i) => s + Math.exp(scores[i]), 0)
  const g = scores.map((s, i) => (top.includes(i) ? Math.exp(s) / z : 0))
  const f: Frame = { x: 44, y: 44, w: 300, h: 110, xr: [0.4, 8.6], yr: [0, 1] }
  const readout = (n: number) => t(b(`$k = ${n}$：只算 ${n} 个专家，计算量为全部的 ${n}/8`, `$k = ${n}$: ${n} experts run, ${n}/8 of the full compute`))
  return (
    <>
      <Svg id="f22mc1" w={380} h={196} label={t(b('混合专家路由：只有得分最高的 k 个专家参与计算，按 softmax 分配权重', 'Mixture-of-experts routing: only the top k experts compute, weighted by a softmax'))}>
        <Axes f={f} xTicks={scores.map((s, i) => [i + 1, String(s)] as [number, string])} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} xLabel={t(b('8 个专家的路由得分', 'Router scores of the 8 experts'))} grid />
        <Label x={f.x - 4} y={f.y - 26} s={t(b('门控权重', 'Gate weight'))} anchor="start" />
        {g.map((v, i) => <Bar key={i} f={f} x={i + 1} v={Math.max(v, 0.004)} w={0.6} color={v ? col : C.dim} opacity={v ? 0.85 : 0.4} />)}
        {g.map((v, i) => v > 0 && <Label key={i} x={px(f, i + 1)} y={py(f, v) - 8} s={v.toFixed(2)} size={9.5} color={col} />)}
      </Svg>
      <FigSlider label="$k$" value={k} min={1} max={8} step={1} onChange={setK} readout={readout(k)} widest={[2].map(readout)} />
    </>
  )
}

export const ATTENTION_FIGS: TopicFigs = {
  arch: { brain: AttentionBrainArch, ai: TransformerAttentionArch },
  math: {
    bio: {
      0: { Fig: BiasedCompetitionPlot, cap: b('小例子：偏好刺激单独引起 $50$ 次每秒，非偏好刺激 $10$ 次。拖动滑块改变注意偏向：不注意时反应为平均 $30$；注意偏好刺激（$w_1 = 3$）时升到 $40$，注意非偏好刺激时降到 $20$，好像只有被注意的那个刺激在场。', 'The worked example: the preferred stimulus alone drives $50$ spikes per second, the non-preferred $10$. Drag the slider to change the attentional bias. With neither attended the response is the average, $30$; attending the preferred one ($w_1 = 3$) raises it to $40$, attending the other lowers it to $20$, as if only the attended stimulus were there.') },
      1: { Fig: NormalizationPlot, cap: b('小例子：$E = 10$、$\\sigma = 5$，周围平均 $S = 5$，注意把目标放大 $A = 2$。拖动滑块改变注意范围覆盖周围的程度：只罩住目标时，分母不变，反应翻倍；连周围也放大到 $S = 10$ 时，分母变大，增益只有约 $1.33$ 倍。', 'The worked example: $E = 10$, $\\sigma = 5$, surround $S = 5$, and attention multiplies the target by $A = 2$. Drag the slider to change how much of the surround the attention field also covers. On the target alone the denominator is unchanged and the response doubles; when the surround is lifted to $S = 10$ too, the denominator grows and the gain is only about $1.33$.') },
    },
    comp: {
      0: { Fig: HeadsPlot, cap: b('示意：小例子的句子在两个头里的注意力权重，行是查询、列是键，每行加起来为 $1$。头 1 中「它的」把约 $0.8$ 的权重给了「小猫」，所以它的新向量主要混入「小猫」的信息；头 2 中「尾巴」主要看紧挨着的「它的」。不同的头并行地读取不同的关系。', 'Illustration: attention weights of the worked example’s sentence in two heads; rows are queries, columns keys, and each row sums to $1$. In head 1, “its” gives about $0.8$ of its weight to “kitten,” so its new vector mostly mixes in “kitten.” In head 2, “tail” mainly looks at the adjacent “its.” Different heads read different relations in parallel.') },
      1: { Fig: MoePlot, cap: b('示意：8 个专家的路由得分，前三个取自小例子。拖动滑块改变 $k$：只有得分最高的 $k$ 个专家被计算，权重在它们之间做 softmax。默认 $k = 2$ 时选中专家 1 和 3，权重 $0.62$ 和 $0.38$，计算量约为全部使用时的四分之一。', 'Illustration: router scores for eight experts, the first three from the worked example. Drag the slider to change $k$: only the top $k$ experts are computed, with a softmax over them. At the default $k = 2$, experts 1 and 3 are chosen with weights $0.62$ and $0.38$, about a quarter of the compute of using all of them.') },
    },
  },
}
