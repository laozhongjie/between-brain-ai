import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import { FigSlider, Label, SIDE_COLOR, px, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Concepts from temporal cortex fill the roles of an abstract structure in prefrontal working memory, then are integrated and checked. */
function CompositionBrainArch({ t }: FigProps) {
  const id = 'f19b'
  return (
    <Svg id={id} w={380} h={262} label={t(b('人类组合推理的结构与信息流：颞叶语义区、海马与前额叶的抽象结构、工作记忆中的绑定、前额叶最前部、执行与检查', 'Human composition: temporal semantic areas, abstract structure in hippocampus and prefrontal cortex, binding in working memory, frontopolar cortex, execution and checking'))}>
      <Mod x={14} y={14} w={170} h={40} side="bio" label={t(b('颞叶语义区', 'Temporal semantic areas'))} sub={t(b('单个概念：跳、两次', 'single concepts: jump, twice'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('海马与前额叶', 'Hippocampus, prefrontal'))} sub={t(b('抽象结构：动作，然后次数', 'structure: action, then count'))} size={10.5} />
      <Region x={6} y={76} w={368} h={110} side="bio" label={t(b('前额叶工作记忆', 'Prefrontal working memory'))} />
      <Mod x={22} y={102} w={150} h={40} side="bio" label={t(b('角色「动作」', 'Role: action'))} sub={t(b('填入：跳', 'filler: jump'))} size={10.5} />
      <Mod x={208} y={102} w={150} h={40} side="bio" label={t(b('角色「次数」', 'Role: count'))} sub={t(b('填入：两次', 'filler: twice'))} size={10.5} />
      <T x={190} y={168} s={t(b('临时的组合；容量有限，复杂问题拆成几步', 'a temporary combination; capacity is small, so hard problems go in steps'))} size={9} color={C.dim} />
      <Mod x={14} y={208} w={170} h={40} side="bio" label={t(b('前额叶最前部', 'Frontopolar cortex'))} sub={t(b('把几个关系合在一起比较', 'compares several relations'))} size={10.5} />
      <Mod x={196} y={208} w={170} h={40} side="bio" label={t(b('执行与检查', 'Execution and checking'))} sub={t(b('产生答案，与例子比对', 'answer, checked against examples'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[99, 54], [99, 102]]} />
      <Flow id={id} side="bio" pts={[[281, 54], [281, 102]]} />
      <Flow id={id} side="bio" pts={[[99, 186], [99, 208]]} />
      <Flow id={id} side="bio" pts={[[184, 228], [196, 228]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[330, 208], [330, 186]]} label={t(b('不对就重组', 'regroup if wrong'))} lx={-36} ly={0} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={196} y={14} n={2} side="bio" />
      <Num x={22} y={102} n={3} side="bio" />
      <Num x={14} y={208} n={4} side="bio" />
      <Num x={196} y={208} n={5} side="bio" />
    </Svg>
  )
}

/** MLC: examples and a query pass through embeddings and attention; meta-training on random grammars shapes the weights. */
function MlcArch({ t }: FigProps) {
  const id = 'f19c'
  return (
    <Svg id={id} w={380} h={282} label={t(b('MLC 与大语言模型的结构与信息流：示例与查询、词元嵌入、注意力、元训练、输出', 'MLC and LLMs: examples and query, token embeddings, attention, meta-training, output'))}>
      <Mod x={14} y={14} w={236} h={40} side="comp" label={t(b('示例与查询', 'Examples and query'))} sub={t(b('几条指令与输出的例子，加一条新指令', 'example instructions and outputs, then a new one'))} size={10.5} />
      <Mod x={14} y={74} w={236} h={40} side="comp" label={t(b('词元嵌入', 'Token embeddings'))} sub={t(b('人造词的向量不带固定含义', 'made-up words carry no fixed meaning'))} size={10.5} />
      <Region x={6} y={134} w={252} h={74} side="comp" label="Transformer" />
      <Mod x={18} y={156} w={228} h={40} side="comp" label={t(b('注意力找出含义', 'Attention finds the meaning'))} sub={t(b('新指令中的词对上例子中的同一个词', 'links a word to the same word in the examples'))} size={10.5} />
      <Mod x={14} y={228} w={236} h={40} side="comp" label={t(b('输出', 'Output'))} sub={t(b('逐个输出符号', 'symbols, one at a time'))} size={10.5} />
      <Mod x={268} y={74} w={100} h={56} side="comp" label={t(b('元训练', 'Meta-training'))} sub={t(b('随机语法的小任务', 'random grammars'))} size={10.5} />
      <Gap x={268} y={228} w={100} h={40} label={t(b('显式的\n变量与规则', 'Explicit\nvariables, rules'))} />

      <Flow id={id} side="comp" pts={[[132, 54], [132, 74]]} />
      <Flow id={id} side="comp" pts={[[132, 114], [132, 156]]} />
      <Flow id={id} side="comp" pts={[[132, 196], [132, 228]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[318, 130], [318, 176], [246, 176]]} label={t(b('塑造权重', 'shapes weights'))} at={1} ly={-7} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={74} n={2} side="comp" />
      <Num x={18} y={156} n={3} side="comp" />
      <Num x={268} y={74} n={4} side="comp" />
      <Num x={14} y={228} n={5} side="comp" />
      <Num x={268} y={228} n={6} side="comp" />
    </Svg>
  )
}

/** Tensor-product binding of the worked example: S = f₁ ⊗ r₁ + f₂ ⊗ r₂ with roles r₁ = (1, 0), r₂ = (0, 1). The fillers
 * become the columns of S; swapping them binds the other sentence with the same roles. Filler vectors illustrative. */
function BindingPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const dog = [0.9, 0.2, 0.6], cat = [0.2, 0.8, 0.4]
  const mat = (x: number, title: string, a: number[], c: number[], la: string, lc: string) => (
    <g>
      <Label x={x + 40} y={26} s={title} color={C.ink} />
      {[a, c].map((v, j) => v.map((s, i) => (
        <g key={`${i}-${j}`}>
          <rect x={x + 8 + j * 36} y={44 + i * 26} width={34} height={24} fill={j ? C.lemonD : col} fillOpacity={0.15 + 0.6 * s} />
          <text x={x + 25 + j * 36} y={56 + i * 26} fontSize={9.5} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{s}</text>
        </g>
      )))}
      <Label x={x + 25} y={134} s={la} size={9.5} color={col} />
      <Label x={x + 61} y={134} s={lc} size={9.5} color={C.lemonD} />
      <Label x={x + 25} y={150} s={t(b('施事者', 'agent'))} size={9} />
      <Label x={x + 61} y={150} s={t(b('受事者', 'patient'))} size={9} />
    </g>
  )
  return (
    <Svg id="f19mb0" w={380} h={200} label={t(b('张量积绑定：内容向量放进角色对应的列，交换填充者就表示另一句话', 'Tensor-product binding: content vectors go into their roles’ columns, and swapping them expresses the other sentence'))}>
      {mat(14, t(b('狗追猫', 'dog chases cat')), dog, cat, t(b('狗', 'dog')), t(b('猫', 'cat')))}
      {mat(128, t(b('猫追狗', 'cat chases dog')), cat, dog, t(b('猫', 'cat')), t(b('狗', 'dog')))}
      <Label x={246} y={56} s={t(b('S 乘以 r₁ = (1, 0)，\n取出第一列：施事者', 'S times r₁ = (1, 0)\npicks column 1: the agent'))} anchor="start" size={10} />
      <Label x={246} y={110} s={t(b('两句话用同一套角色\n向量，只换了填充者', 'both sentences use the\nsame roles; only the\nfillers swap'))} anchor="start" size={10} color={col} />
      <Label x={190} y={180} s={t(b('每列是一个内容向量（示意，三维）', 'Each column is a content vector (illustrative, 3D)'))} size={9.5} />
    </Svg>
  )
}

/** The size principle, interactive: examples 16, 8, 2, 64, 32, 4 arrive one by one; both rules fit, but "powers of two"
 * has 7 members in 1–100 and "even numbers" 50, so each example multiplies the odds by 50/7 (equal priors). Starts at
 * the worked example's four examples. */
function SizePrinciplePlot({ t }: FigProps) {
  const [n, setN] = useState(4)
  const col = SIDE_COLOR.bio
  const ex = [16, 8, 2, 64, 32, 4].slice(0, n)
  const pw = [1, 2, 4, 8, 16, 32, 64]
  const odds = (k: number) => Math.pow(50 / 7, k)
  const post = odds(n) / (1 + odds(n))
  const f: Frame = { x: 20, y: 40, w: 340, h: 16, xr: [1, 100], yr: [0, 1] }
  const f2: Frame = { x: 70, y: 112, w: 200, h: 40, xr: [0, 1], yr: [0, 1] }
  const fmt = (v: number) => (v >= 10000 ? `${Math.round(v / 1000)}k` : String(Math.round(v)))
  const readout = (k: number) => t(b(`${k} 个例子：2 的幂 : 偶数 ≈ ${fmt(odds(k))} : 1`, `${k} examples: powers of two : evens ≈ ${fmt(odds(k))} : 1`))
  return (
    <>
      <Svg id="f19mb1" w={380} h={190} label={t(b('规模原则：两条规则都符合例子时，范围小的那条随例子增加而越来越可信', 'The size principle: when both rules fit the examples, the narrower one grows ever more credible with each example'))}>
        {Array.from({ length: 50 }, (_, i) => <line key={i} x1={px(f, 2 * (i + 1))} x2={px(f, 2 * (i + 1))} y1={f.y} y2={f.y + 8} stroke={C.dim} strokeOpacity={0.6} />)}
        {pw.map((v) => <circle key={v} cx={px(f, v)} cy={f.y + 18} r={3} fill={col} />)}
        {ex.map((v) => <circle key={v} cx={px(f, v)} cy={f.y + 18} r={6.5} fill="none" stroke={C.ink} strokeWidth={1.4} />)}
        <line x1={f.x} x2={f.x + f.w} y1={f.y + 28} y2={f.y + 28} stroke={C.dim} />
        {[1, 50, 100].map((v) => <text key={v} x={px(f, v)} y={f.y + 38} fontSize={9.5} textAnchor="middle" fill={C.dim} fontFamily="var(--mono)">{v}</text>)}
        <Label x={f.x} y={22} s={t(b('灰色刻度：偶数（50 个）　粉点：2 的幂（7 个）　圈：看到的例子', 'gray ticks: evens (50)   pink dots: powers of two (7)   rings: examples seen'))} anchor="start" size={9.5} />
        <rect x={f2.x} y={f2.y} width={f2.w * post} height={16} fill={col} fillOpacity={0.6} />
        <rect x={f2.x + f2.w * post} y={f2.y} width={f2.w * (1 - post)} height={16} fill={C.dim} fillOpacity={0.5} />
        <Label x={f2.x - 6} y={f2.y + 8} s={t(b('后验', 'posterior'))} anchor="end" size={10} />
        <Label x={f2.x + f2.w + 6} y={f2.y + 8} s={t(b(`2 的幂 ${post.toFixed(post > 0.999 ? 4 : 3)}`, `powers of two ${post.toFixed(post > 0.999 ? 4 : 3)}`))} anchor="start" size={10} color={col} />
        <Label x={190} y={160} s={t(b('每多一个例子，似然之比再乘以 50/7 ≈ 7', 'each example multiplies the likelihood ratio by 50/7 ≈ 7'))} size={10} />
      </Svg>
      <FigSlider label={t(b('例子个数', 'Examples'))} value={n} min={0} max={6} step={1} onChange={setN} readout={readout(n)} widest={[0, 1, 2, 3, 4, 5, 6].map(readout)} />
    </>
  )
}

export const COMPOSITIONAL_FIGS: TopicFigs = {
  arch: { brain: CompositionBrainArch, ai: MlcArch },
  math: {
    bio: {
      0: { Fig: BindingPlot, cap: b('示意：「狗」和「猫」各是一个内容向量，绑定后成为矩阵 $S$ 的两列，第一列对应施事者、第二列对应受事者。用 $\\mathbf{r}_1 = (1, 0)$ 去乘就取出第一列，得到「狗」。换成「猫追狗」只需交换两列，角色向量不变，所以从未见过的组合也能表示。', 'Illustration: “dog” and “cat” are content vectors; binding makes them the two columns of $S$, the first for the agent and the second for the patient. Multiplying by $\\mathbf{r}_1 = (1, 0)$ picks the first column, “dog.” For “cat chases dog” the columns swap while the roles stay, so unseen combinations can be expressed too.') },
      1: { Fig: SizePrinciplePlot, cap: b('拖动滑块增加例子。看到的例子既都是偶数，也都是 2 的幂，两条规则都符合。但 1 到 100 中 2 的幂只有 7 个，偶数有 50 个，范围小的规则让这些例子显得「不是巧合」。默认 4 个例子时似然之比约为 $2600 : 1$，第 0 个时两者各半。', 'Drag the slider to add examples. The examples are all even and all powers of two, so both rules fit. But only 7 numbers from 1 to 100 are powers of two, against 50 evens, so the narrower rule makes the examples look like no coincidence. With the default four examples the likelihood ratio is about $2600 : 1$; with none, the two are even.') },
    },
  },
}
