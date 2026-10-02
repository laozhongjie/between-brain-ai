import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
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
      <Mod x={14} y={14} w={236} h={40} side="comp" label={t(b('示例与查询', 'Examples and query'))} sub={t(b('几条指令与输出的例子，加一条新指令', 'a few instruction and output examples, then a new one'))} size={10.5} />
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

export const COMPOSITIONAL_FIGS: TopicFigs = {
  arch: { brain: CompositionBrainArch, ai: MlcArch },
}
