import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store, Var } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Heat, Label, Path, Ref, SIDE_COLOR, Vec, px, py, rng, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Hippocampal circuit: cortex in via entorhinal cortex, DG separates, CA3 stores and completes, CA1 returns. */
function HippocampusArch({ t }: FigProps) {
  const id = 'f12b'
  return (
    <Svg id={id} w={380} h={290} label={t(b('海马情景记忆系统的结构与信息流：新皮层、内嗅皮层，以及海马中的齿状回、CA3、CA1', 'Hippocampal episodic memory: neocortex, entorhinal cortex, and the dentate gyrus, CA3 and CA1 inside the hippocampus'))}>
      <Mod x={14} y={14} w={352} h={42} side="bio" label={t(b('新皮层', 'Neocortex'))} sub={t(b('感觉皮层与联合皮层', 'sensory and association cortex'))} />
      <Mod x={110} y={92} w={160} h={34} side="bio" label={t(b('内嗅皮层', 'Entorhinal cortex'))} />
      <Region x={6} y={150} w={368} h={84} side="bio" label={t(b('海马', 'Hippocampus'))} />
      <Mod x={14} y={168} w={104} h={42} side="bio" label={t(b('齿状回', 'Dentate gyrus'))} sub={t(b('模式分离', 'pattern separation'))} />
      <Store x={142} y={158} w={96} h={64} side="bio" label="CA3" sub={t(b('联想存储', 'associative store'))} />
      <Mod x={262} y={168} w={104} h={42} side="bio" label="CA1" sub={t(b('比较与输出', 'compare and output'))} />
      <Var cx={190} cy={266} side="bio" label={t(b('调质', 'NM'))} />
      <T x={212} y={266} anchor="start" s={t(b('新奇、情绪信号', 'novelty, emotion'))} size={9} color={C.dim} />

      <Flow id={id} side="bio" fast pts={[[165, 56], [165, 92]]} label={t(b('输入', 'in'))} lx={-16} ly={0} />
      <Flow id={id} side="bio" fast pts={[[215, 92], [215, 56]]} label={t(b('重现', 'reinstate'))} lx={24} ly={0} />
      <Flow id={id} side="bio" pts={[[110, 109], [66, 109], [66, 168]]} />
      <Flow id={id} side="bio" pts={[[118, 189], [142, 189]]} label={t(b('写入', 'write'))} ly={-9} />
      <Flow id={id} side="bio" kind="fb" pts={[[172, 160], [208, 160]]} curve={[190, 130]} label={t(b('循环补全', 'recurrent completion'))} ly={-8} />
      <Flow id={id} side="bio" head="read" pts={[[238, 189], [262, 189]]} label={t(b('读出', 'read'))} ly={-9} />
      <Flow id={id} side="bio" pts={[[314, 168], [314, 109], [270, 109]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[190, 253], [190, 222]]} label={t(b('增强写入', 'boost writing'))} lx={-34} ly={0} />
      <Num x={122} y={74} n={1} side="bio" />
      <Num x={118} y={168} n={2} side="bio" />
      <Num x={142} y={162} n={3} side="bio" />
      <Num x={250} y={206} n={4} side="bio" />
      <Num x={330} y={138} n={5} side="bio" />
      <Num x={166} y={266} n={6} side="bio" />
    </Svg>
  )
}

/** Retrieval-augmented generation: chunk, embed, store; encode the query, read the top k into context. */
function RagArch({ t }: FigProps) {
  const id = 'f12c'
  return (
    <Svg id={id} w={380} h={290} label={t(b('RAG 的结构与信息流', 'Structure and information flow of RAG'))}>
      <Mod x={14} y={14} w={118} h={32} side="comp" label={t(b('文档与对话', 'Documents, chats'))} size={10.5} />
      <Mod x={248} y={14} w={118} h={32} side="comp" label={t(b('用户问题', 'User query'))} size={10.5} />
      <Mod x={14} y={76} w={52} h={32} side="comp" label={t(b('分块', 'Chunk'))} size={10.5} />
      <Gap x={72} y={76} w={64} h={32} label={t(b('事件分段', 'Event\nboundaries'))} />
      <Mod x={248} y={76} w={118} h={32} side="comp" label={t(b('查询编码', 'Query encoder'))} size={10.5} />
      <Mod x={14} y={136} w={118} h={32} side="comp" label={t(b('嵌入模型', 'Embedding model'))} size={10.5} />
      <Mod x={248} y={136} w={118} h={32} side="comp" label={t(b('相似度检索', 'Similarity search'))} size={10} />
      <Store x={14} y={196} w={118} h={68} side="comp" label={t(b('向量库', 'Vector store'))} sub={t(b('文本片段与向量', 'chunks and vectors'))} />
      <Mod x={248} y={196} w={118} h={38} side="comp" label={t(b('上下文窗口', 'Context window'))} sub={t(b('会话结束即清空', 'cleared per session'))} size={10.5} />
      <Mod x={248} y={250} w={118} h={36} side="comp" label={t(b('语言模型', 'Language model'))} sub={t(b('参数冻结', 'frozen weights'))} size={10.5} />
      <Gap x={150} y={250} w={84} h={36} label={t(b('巩固进参数', 'Consolidation\ninto weights'))} />

      <Flow id={id} side="comp" pts={[[40, 46], [40, 76]]} />
      <Flow id={id} side="comp" pts={[[40, 108], [40, 136]]} />
      <Flow id={id} side="comp" pts={[[73, 168], [73, 196]]} label={t(b('写入', 'write'))} lx={20} ly={0} />
      <Flow id={id} side="comp" pts={[[307, 46], [307, 76]]} />
      <Flow id={id} side="comp" pts={[[307, 108], [307, 136]]} />
      <Flow id={id} side="comp" head="read" pts={[[132, 214], [190, 214], [190, 152], [248, 152]]} at={2} label={t(b('读出前 k 个', 'read top k'))} ly={-8} />
      <Flow id={id} side="comp" pts={[[307, 168], [307, 196]]} />
      <Flow id={id} side="comp" pts={[[307, 234], [307, 250]]} />
      <Num x={14} y={76} n={1} side="comp" />
      <Num x={14} y={136} n={2} side="comp" />
      <Num x={56} y={182} n={3} side="comp" />
      <Num x={248} y={136} n={4} side="comp" />
      <Num x={248} y={196} n={5} side="comp" />
      <Num x={72} y={76} n={6} side="comp" />
      <Num x={150} y={250} n={6} side="comp" />
    </Svg>
  )
}

/** One memory over time in both systems, on a shared log time axis. */
function MemoryTimeline({ t }: FigProps) {
  const id = 'f12d'
  const ticks: [number, Bi][] = [[150, b('毫秒', 'ms')], [240, b('秒', 's')], [330, b('分钟', 'min')], [420, b('小时', 'hours')], [530, b('天', 'days')], [700, b('年', 'years')]]
  return (
    <Svg id={id} w={760} h={262} label={t(b('一条记忆在两个系统中的时间进程', 'One memory over time in both systems'))}>
      <T x={16} y={58} anchor="start" s={t(b('海马\n情景记忆', 'Hippocampal\nepisodic memory'))} size={10.5} color={C.pinkD} weight={600} />
      <T x={16} y={198} anchor="start" s={t(b('RAG', 'RAG'))} size={10.5} color={C.skyD} weight={600} />

      {/* biological lane */}
      <Mod x={150} y={26} w={90} h={36} side="bio" label={t(b('编码', 'Encoding'))} sub={t(b('一次经历', 'one experience'))} />
      <Mod x={322} y={26} w={126} h={36} side="bio" label={t(b('突触巩固', 'Synaptic consolidation'))} sub={t(b('痕迹逐渐稳定', 'trace stabilizes'))} size={10} />
      <Mod x={470} y={26} w={276} h={36} side="bio" label={t(b('系统巩固', 'Systems consolidation'))} sub={t(b('睡眠回放把记忆逐步转入新皮层', 'sleep replay moves it into neocortex over time'))} />
      <Flow id={id} side="bio" pts={[[240, 44], [322, 44]]} />
      <Flow id={id} side="bio" pts={[[448, 44], [470, 44]]} />
      <Mod x={530} y={80} w={60} h={34} side="bio" label={t(b('提取', 'Recall'))} size={10} />
      <Mod x={612} y={80} w={134} h={34} side="bio" label={t(b('再巩固', 'Reconsolidation'))} sub={t(b('记忆可被改写', 'memory can be rewritten'))} size={10} />
      <Flow id={id} side="bio" head="read" pts={[[560, 62], [560, 80]]} />
      <Flow id={id} side="bio" pts={[[590, 97], [612, 97]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[700, 80], [700, 62]]} />

      {/* shared time axis */}
      <line x1={140} y1={128} x2={750} y2={128} stroke={C.line} strokeWidth={1} />
      {ticks.map(([x, l]) => (
        <g key={x}>
          <line x1={x} y1={124} x2={x} y2={132} stroke={C.dim} strokeWidth={1} />
          <T x={x} y={143} s={t(l)} size={9.5} color={C.dim} />
        </g>
      ))}

      {/* computational lane */}
      <Mod x={150} y={166} w={90} h={36} side="comp" label={t(b('写入', 'Write'))} sub={t(b('分块后嵌入', 'chunk and embed'))} />
      <Mod x={262} y={166} w={484} h={36} side="comp" label={t(b('静态存储', 'Static storage'))} sub={t(b('内容不变，除非人为修改或删除', 'unchanged unless edited or deleted'))} />
      <Flow id={id} side="comp" pts={[[240, 184], [262, 184]]} />
      <Gap x={300} y={222} w={200} h={30} label={t(b('没有自动巩固（需另行训练）', 'No automatic consolidation'))} />
      <Mod x={530} y={222} w={60} h={30} side="comp" label={t(b('检索', 'Retrieve'))} size={10} />
      <Mod x={612} y={222} w={134} h={30} side="comp" label={t(b('进入上下文，会话后清空', 'Into context, then cleared'))} size={9.5} />
      <Flow id={id} side="comp" head="read" pts={[[560, 202], [560, 222]]} />
      <Flow id={id} side="comp" pts={[[590, 237], [612, 237]]} />
      <Num x={150} y={26} n={1} side="bio" />
      <Num x={322} y={26} n={2} side="bio" />
      <Num x={470} y={26} n={3} side="bio" />
      <Num x={530} y={80} n={4} side="bio" />
      <Num x={150} y={166} n={1} side="comp" />
      <Num x={262} y={166} n={2} side="comp" />
      <Num x={530} y={222} n={3} side="comp" />
      <Num x={300} y={222} n={4} side="comp" />
    </Svg>
  )
}

/** Hebbian writing of the worked example's pattern (+1, +1, −1, −1): W_ij = ξ_i ξ_j / 4 (the diagonal left at 0). */
function HebbWritePlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const xi = [1, 1, -1, -1], cell = 30, x0 = 70, y0 = 46
  return (
    <Svg id="f12mb0" w={380} h={196} label={t(b('赫布写入：同时放电或同时不放电的神经元之间连接增强，一个放一个不放的减弱', 'Hebbian writing: connections strengthen between neurons that fire or stay silent together, and weaken between mismatched ones'))}>
      {xi.map((v, i) => (
        <g key={i}>
          <text x={x0 + i * cell + cell / 2} y={y0 - 12} fontSize={10} textAnchor="middle" dominantBaseline="middle" fill={v > 0 ? col : C.dim}>{v > 0 ? '+1' : '−1'}</text>
          <text x={x0 - 12} y={y0 + i * cell + cell / 2} fontSize={10} textAnchor="end" dominantBaseline="middle" fill={v > 0 ? col : C.dim}>{v > 0 ? '+1' : '−1'}</text>
        </g>
      ))}
      {xi.map((vi, i) => xi.map((vj, j) => {
        const w = i === j ? 0 : (vi * vj) / 4
        return (
          <g key={`${i}-${j}`}>
            <rect x={x0 + j * cell} y={y0 + i * cell} width={cell - 1} height={cell - 1} fill={w > 0 ? col : w < 0 ? C.lavD : C.ghost} fillOpacity={w ? 0.45 : 1} />
            <text x={x0 + j * cell + cell / 2} y={y0 + i * cell + cell / 2} fontSize={10} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{w > 0 ? '+¼' : w < 0 ? '−¼' : '0'}</text>
          </g>
        )
      }))}
      <Label x={x0 + 2 * cell} y={y0 - 30} s={t(b('经历的模式 ξ', 'Pattern ξ of the experience'))} color={C.ink} />
      <Label x={x0 + 2 * cell} y={y0 + 4 * cell + 14} s={t(b('连接表 W', 'Connection table W'))} color={C.ink} />
      <Label x={218} y={70} s={t(b('神经元 1、2 同时放电：+¼', 'neurons 1 and 2 fire together: +¼'))} anchor="start" size={10} color={col} />
      <Label x={218} y={96} s={t(b('3、4 同时不放电：也是 +¼', '3 and 4 both silent: also +¼'))} anchor="start" size={10} color={col} />
      <Label x={218} y={122} s={t(b('1 放电而 3 不放电：−¼', '1 fires, 3 does not: −¼'))} anchor="start" size={10} />
      <Label x={218} y={156} s={t(b('再存一段经历，就在同一张\n表上再加一层', 'each new experience adds\nanother layer to the same table'))} anchor="start" size={10} />
    </Svg>
  )
}

/** Pattern completion in a Hopfield network of 64 neurons (8 × 8), interactive: drag how many random patterns are stored.
 * The cue keeps the top half of pattern 1 and blanks the rest; asynchronous updates run five sweeps. The curve averages
 * five stored patterns per point. Seeded, so every render is the same. */
const HOP_N = 64
function hopfield(P: number, seed = 3) {
  const u = rng(seed)
  const pats = Array.from({ length: P }, () => Array.from({ length: HOP_N }, () => (u() < 0.5 ? -1 : 1)))
  const W = Array.from({ length: HOP_N }, (_, i) => Array.from({ length: HOP_N }, (_, j) => (i === j ? 0 : pats.reduce((a, p) => a + p[i] * p[j], 0) / HOP_N)))
  const recall = (k: number) => {
    const x: number[] = pats[k].map((v, i) => (i < HOP_N / 2 ? v : 0))
    const cue = [...x]
    for (let sweep = 0; sweep < 5; sweep++) for (let i = 0; i < HOP_N; i++) { const h = W[i].reduce((a, w, j) => a + w * x[j], 0); if (h !== 0) x[i] = h > 0 ? 1 : -1 }
    return { cue, out: x, acc: x.reduce((a, v, i) => a + (v === pats[k][i] ? 1 : 0), 0) / HOP_N }
  }
  return { pats, recall }
}
const HOP_CURVE = Array.from({ length: 20 }, (_, i) => { const net = hopfield(i + 1); const k = Math.min(5, i + 1); return Array.from({ length: k }, (_, j) => net.recall(j).acc).reduce((a, v) => a + v, 0) / k })

function CompletionPlot({ t }: FigProps) {
  const [P, setP] = useState(4)
  const col = SIDE_COLOR.bio
  const net = hopfield(P)
  const { cue, out } = net.recall(0)
  const grid = (v: number[]) => Array.from({ length: 8 }, (_, r) => v.slice(r * 8, r * 8 + 8).map((s) => (s > 0 ? 1 : s < 0 ? 0.05 : 0.3)))
  const f: Frame = { x: 236, y: 30, w: 124, h: 124, xr: [0, 20], yr: [0.5, 1] }
  const readout = (k: number) => t(b(`存了 ${k} 段：补全正确 ${Math.round(HOP_CURVE[k - 1] * 100)}%`, `${k} stored: ${Math.round(HOP_CURVE[k - 1] * 100)}% completed right`))
  return (
    <>
      <Svg id="f12mb1" w={380} h={200} label={t(b('补全：存的记忆少时，一半线索就能补全；超过约 0.14N 段后，补全开始出错', 'Completion: with few memories stored, half a cue completes the pattern; beyond about 0.14N, completion breaks down'))}>
        {[[cue, t(b('线索：只有上半', 'Cue: top half'))], [out, t(b('补全结果', 'Completed'))], [net.pats[0], t(b('原来的记忆', 'Original'))]].map(([v, s], i) => (
          <g key={i}>
            <Heat x={12 + i * 70} y={52} cell={7.5} vals={grid(v as number[])} pos={i === 1 ? col : C.ink} />
            <Label x={12 + i * 70 + 30} y={40} s={s as string} size={10} color={i === 1 ? col : C.ink} />
          </g>
        ))}
        <Label x={112} y={130} s={t(b('8 × 8 = 64 个神经元', '8 × 8 = 64 neurons'))} size={10} />
        <Axes f={f} xTicks={[[0, '0'], [9, '9'], [20, '20']]} yTicks={[[0.5, '50%'], [1, '100%']]} xLabel={t(b('存了几段记忆', 'Memories stored'))} grid />
        <Label x={f.x - 4} y={f.y - 12} s={t(b('补全正确的比例', 'Share completed right'))} anchor="start" />
        <Ref f={f} x={0.14 * HOP_N} color={C.lemonD} />
        <Label x={px(f, 9) + 4} y={py(f, 0.56)} s="0.14N" anchor="start" size={10} color={C.lemonD} />
        <Path pts={HOP_CURVE.map((v, i) => [px(f, i + 1), py(f, Math.max(0.5, v))] as [number, number])} color={col} opacity={0.45} />
        <Dot f={f} x={P} y={Math.max(0.5, HOP_CURVE[P - 1])} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('存入的记忆', 'Memories stored'))} value={P} min={1} max={20} step={1} onChange={setP}
        readout={readout(P)} widest={[10, 18].map(readout)} />
    </>
  )
}

/** Retrieval by cosine similarity, interactive: similarity is the cosine of the angle to the query. Drag k. Documents and
 * angles are illustrative; the second is the worked example's look-alike. Starts at k = 2. */
function TopKPlot({ t }: FigProps) {
  const [k, setK] = useState(2)
  const col = SIDE_COLOR.comp
  const docs: [number, string][] = [
    [12, t(b('周二在咖啡馆见小王', 'Tue: Wang at the café'))],
    [29, t(b('上周的会议纪要', 'Last week’s notes'))],
    [48, t(b('咖啡馆的菜单', 'The café’s menu'))],
    [-60, t(b('去年的旅行照片', 'Old trip photos'))],
    [-80, t(b('项目预算表', 'Project budget'))],
  ]
  const ranked = [...docs].sort((a, c) => Math.abs(a[0]) - Math.abs(c[0]))
  const cut = Math.cos((Math.abs(ranked[k - 1][0]) * Math.PI) / 180)
  const ox = 112, oy = 180, len = 98
  const readout = (n: number) => t(b(`$k = ${n}$：相似度 ${Math.cos((Math.abs(ranked[n - 1][0]) * Math.PI) / 180).toFixed(2)} 以上的被取回`, `$k = ${n}$: similarity ${Math.cos((Math.abs(ranked[n - 1][0]) * Math.PI) / 180).toFixed(2)} and up retrieved`))
  return (
    <>
      <Svg id="f12mc0" w={380} h={200} label={t(b('向量检索：与问题夹角越小越相似，取前 k 个；语义相近但无关的片段也会被取回', 'Vector retrieval: the smaller the angle to the query, the more similar; the top k are taken, including look-alikes that do not answer'))}>
        <Vec x1={ox} y1={oy} x2={ox} y2={oy - len - 8} color={C.ink} width={2} />
        <Label x={226} y={30} s={t(b('问题：上周在咖啡馆见了谁', 'Query: who did I meet\nat the café last week?'))} anchor="start" color={C.ink} size={10} />
        <Label x={ox} y={oy - len - 22} s={t(b('问题', 'query'))} color={C.ink} size={10} />
        {docs.map(([a, s], i) => {
          const on = Math.cos((Math.abs(a) * Math.PI) / 180) >= cut - 1e-9
          const r = (a * Math.PI) / 180, ex = ox + len * Math.sin(r), ey = oy - len * Math.cos(r)
          return (
            <g key={s}>
              <line x1={ox} y1={oy} x2={ex} y2={ey} stroke={on ? col : C.dim} strokeWidth={on ? 2 : 1} strokeOpacity={on ? 1 : 0.6} />
              <circle cx={ex + 9 * Math.sin(r)} cy={ey - 9 * Math.cos(r)} r={7} fill={C.white} stroke={on ? col : C.dim} />
              <text x={ex + 9 * Math.sin(r)} y={ey - 9 * Math.cos(r)} fontSize={9} textAnchor="middle" dominantBaseline="middle" fill={on ? col : C.dim}>{i + 1}</text>
              <Label x={226} y={60 + i * 24} s={`${i + 1}  ${s}`} anchor="start" size={9.5} color={on ? col : C.dim} />
              <Label x={372} y={60 + i * 24} s={Math.cos(r).toFixed(2)} anchor="end" size={9.5} color={on ? col : C.dim} />
            </g>
          )
        })}
      </Svg>
      <FigSlider label="$k$" value={k} min={1} max={5} step={1} onChange={setK} readout={readout(k)} widest={[1, 2, 3, 4, 5].map(readout)} />
    </>
  )
}

/** The modern Hopfield read-out softmax(β Xᵀξ) over four stored patterns with illustrative similarities 0.9, 0.7, 0.2, 0.1,
 * interactive: drag β from a blend toward a single pattern. Starts at β = 8. */
function HopfieldBetaPlot({ t }: FigProps) {
  const [beta, setBeta] = useState(8)
  const col = SIDE_COLOR.comp
  const sims = [0.9, 0.7, 0.2, 0.1]
  const wOf = (bt: number) => { const e = sims.map((s) => Math.exp(bt * s)); const z = e.reduce((a, v) => a + v, 0); return e.map((v) => v / z) }
  const w = wOf(beta)
  const f: Frame = { x: 44, y: 44, w: 220, h: 116, xr: [0.4, 4.6], yr: [0, 1] }
  const readout = (bt: number) => t(b(`$\\beta = ${bt.toFixed(1)}$：最相近的记忆占 ${wOf(bt)[0].toFixed(2)}`, `$\\beta = ${bt.toFixed(1)}$: the closest memory gets ${wOf(bt)[0].toFixed(2)}`))
  return (
    <>
      <Svg id="f12mc1" w={380} h={200} label={t(b('现代 Hopfield 读出：β 小时是几段记忆的混合，β 大时只取最相近的一段', 'Modern Hopfield read-out: a blend of memories at small β, the single closest one at large β'))}>
        <Axes f={f} xTicks={sims.map((s, i) => [i + 1, String(s)] as [number, string])} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
          xLabel={t(b('存储的记忆与线索的相似度', 'Similarity of each stored memory to the cue'))} grid />
        <Label x={f.x - 4} y={f.y - 26} s={t(b('读出时的权重', 'Weight in the read-out'))} anchor="start" />
        {w.map((v, i) => <Bar key={i} f={f} x={i + 1} v={v} w={0.6} color={i ? C.dim : col} />)}
        {w.map((v, i) => <Label key={i} x={px(f, i + 1)} y={py(f, v) - 8} s={v.toFixed(2)} size={10} color={i ? C.dim : col} />)}
        <Label x={282} y={64} s={t(b('β 小：几段记忆\n混在一起读出', 'small β: memories\nread out blended'))} anchor="start" size={10} />
        <Label x={282} y={118} s={t(b('β 大：只取最相近\n的一段，与经典\nHopfield 相同', 'large β: only the\nclosest, as in the\nclassic network'))} anchor="start" size={10} color={col} />
      </Svg>
      <FigSlider label="$\beta$" value={beta} min={0} max={20} step={0.5} onChange={setBeta} readout={readout(beta)} widest={[10, 0].map(readout)} />
    </>
  )
}

export const EPISODIC_FIGS: TopicFigs = {
  arch: { brain: HippocampusArch, ai: RagArch },
  dynamics: MemoryTimeline,
  math: {
    bio: {
      0: { Fig: HebbWritePlot, cap: b('小例子的 4 个神经元。每个连接加上两端活动的乘积除以 $4$：同号得 $+\\tfrac14$，异号得 $-\\tfrac14$（对角线不连自己，记为 $0$）。整段经历就这样分散写进整张表，没有哪一格单独存着它。', 'The worked example’s four neurons. Each connection gains the product of its two ends divided by $4$: $+\\tfrac14$ for matching signs, $-\\tfrac14$ for opposite ones (the diagonal, a neuron with itself, stays $0$). The whole experience is spread across the table; no single cell holds it.') },
      1: { Fig: CompletionPlot, cap: b('拖动滑块改变网络里存了几段随机记忆（64 个神经元）。线索只给第一段记忆的上半部分，网络按 $\\operatorname{sign}(\\sum_j W_{ij} x_j)$ 逐个更新。存得少时一步步补全成原样；超过约 $0.14N \\approx 9$ 段，记忆之间相互干扰，补全开始出错。', 'Drag the slider to change how many random memories the network stores (64 neurons). The cue gives only the top half of the first memory, and the network updates by $\\operatorname{sign}(\\sum_j W_{ij} x_j)$ one neuron at a time. With few stored, it completes the pattern exactly; beyond about $0.14N \\approx 9$ the memories interfere and completion starts to fail.') },
    },
    comp: {
      0: { Fig: TopKPlot, cap: b('示意：每条射线是一个片段的向量，与问题的夹角越小，余弦相似度越高。拖动滑块改变 $k$。默认 $k = 2$：除了真正回答问题的咖啡馆见面，「上周的会议纪要」因为也和「上周」相关，同样被取回。', 'Illustration: each ray is a passage’s vector, and the smaller its angle to the query, the higher the cosine similarity. Drag the slider to change $k$. At the default $k = 2$, besides the café meeting that answers the question, “last week’s meeting notes” is retrieved too, because it also relates to “last week.”') },
      1: { Fig: HopfieldBetaPlot, cap: b('示意：四段存储的记忆与线索的相似度为 $0.9$、$0.7$、$0.2$、$0.1$，读出按 $\\operatorname{softmax}(\\beta X^{\\top}\\xi)$ 加权。拖动滑块改变 $\\beta$：$\\beta = 0$ 时四段平均，越大越集中到最相近的一段。Transformer 注意力就是 $\\beta = 1/\\sqrt{d}$ 的同一个式子。', 'Illustration: four stored memories have similarities $0.9$, $0.7$, $0.2$ and $0.1$ to the cue, and the read-out weighs them by $\\operatorname{softmax}(\\beta X^{\\top}\\xi)$. Drag the slider to change $\\beta$: at $\\beta = 0$ all four are averaged, and the larger it gets, the more the weight goes to the closest one. Transformer attention is the same expression with $\\beta = 1/\\sqrt{d}$.') },
    },
  },
}
