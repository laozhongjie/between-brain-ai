import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Store, Var } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Hippocampal circuit: cortex in via entorhinal cortex, DG separates, CA3 stores and completes, CA1 returns. */
function HippocampusArch({ t }: FigProps) {
  const id = 'f12b'
  return (
    <Svg id={id} w={380} h={290} label={t(b('海马情景记忆系统的结构与信息流', 'Structure and information flow of the hippocampal episodic memory system'))}>
      <Mod x={14} y={14} w={352} h={42} side="bio" label={t(b('新皮层', 'Neocortex'))} sub={t(b('物体、人物、地点等内容分布在各皮层区', 'objects, people and places, spread across cortical areas'))} />
      <Mod x={110} y={92} w={160} h={34} side="bio" label={t(b('内嗅皮层', 'Entorhinal cortex'))} />
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
      <Num x={14} y={168} n={2} side="bio" />
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

export const EPISODIC_FIGS: TopicFigs = {
  arch: { brain: HippocampusArch, ai: RagArch },
  dynamics: MemoryTimeline,
}
