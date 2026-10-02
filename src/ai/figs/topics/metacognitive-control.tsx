import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Monitoring signals feed the cingulate's cost-benefit estimate; lateral prefrontal cortex then adjusts decisions, seeks help, offloads or reallocates study time. */
function ControlBrainArch({ t }: FigProps) {
  const id = 'f25b'
  return (
    <Svg id={id} w={380} h={220} label={t(b('基于信心的复核与求助的结构与信息流：监测信号、前扣带皮层、外侧前额叶、寻求帮助、认知卸载、学习时间分配', 'Confidence-driven control: monitoring signals, anterior cingulate, lateral prefrontal cortex, seeking help, offloading, study time'))}>
      <Mod x={30} y={14} w={154} h={40} side="bio" label={t(b('监测信号', 'Monitoring signals'))} sub={t(b('信心与错误信号', 'confidence and errors'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('前扣带皮层', 'Anterior cingulate'))} sub={t(b('收益与努力代价的权衡', 'benefit against effort cost'))} size={10.5} />
      <Mod x={196} y={88} w={170} h={40} side="bio" label={t(b('外侧前额叶', 'Lateral prefrontal'))} sub={t(b('提高证据量、放慢、复查', 'more evidence, slower, check'))} size={10.5} />
      <Mod x={30} y={166} w={104} h={40} side="bio" label={t(b('寻求帮助', 'Seek help'))} sub={t(b('再看、查、问人', 'look, search, ask'))} size={10.5} />
      <Mod x={146} y={166} w={104} h={40} side="bio" label={t(b('认知卸载', 'Offloading'))} sub={t(b('写下来、设提醒', 'notes, reminders'))} size={10.5} />
      <Mod x={262} y={166} w={104} h={40} side="bio" label={t(b('分配学习时间', 'Study time'))} sub={t(b('差一点就会的', 'the almost-known'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[184, 34], [196, 34]]} />
      <Flow id={id} side="bio" pts={[[281, 54], [281, 88]]} />
      <Flow id={id} side="bio" head="none" pts={[[281, 128], [281, 146]]} />
      <Flow id={id} side="bio" head="none" pts={[[82, 146], [314, 146]]} />
      <Flow id={id} side="bio" pts={[[82, 146], [82, 166]]} />
      <Flow id={id} side="bio" pts={[[198, 146], [198, 166]]} />
      <Flow id={id} side="bio" pts={[[314, 146], [314, 166]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[30, 186], [20, 186], [20, 34], [30, 34]]} />
      <Num x={30} y={14} n={1} side="bio" />
      <Num x={196} y={14} n={2} side="bio" />
      <Num x={196} y={88} n={3} side="bio" />
      <Num x={30} y={166} n={4} side="bio" />
      <Num x={146} y={166} n={5} side="bio" />
      <Num x={262} y={166} n={6} side="bio" />
    </Svg>
  )
}

/** A reasoning model writes out reasoning, samples several chains and votes, checks itself and can call tools or decline. */
function ReasoningBudgetArch({ t }: FigProps) {
  const id = 'f25c'
  const chain = (x: number, l: string) => (
    <g key={l}>
      <rect x={x} y={82} width={44} height={26} rx={6} fill={C.sky} stroke={C.skyD} strokeWidth={1.2} />
      <text x={x + 22} y={95} fontSize={9.5} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{l}</text>
    </g>
  )
  return (
    <Svg id={id} w={380} h={290} label={t(b('自我纠错与推理预算的结构与信息流：问题输入、写出推理、多次采样与投票、自我检查、工具与拒答', 'Self-correction and reasoning budgets: input, written reasoning, sampling and voting, self-checking, tools and declining'))}>
      <Mod x={14} y={14} w={352} h={32} side="comp" label={t(b('问题输入', 'Problem input'))} size={10.5} />
      <Mod x={14} y={66} w={170} h={40} side="comp" label={t(b('写出推理过程', 'Written reasoning'))} sub={t(b('越长，花的计算越多', 'longer means more compute'))} size={10.5} />
      <Region x={196} y={58} w={170} h={98} side="comp" label={t(b('多次采样与投票', 'Sampling and voting'))} />
      {chain(208, t(b('推理 1', 'Chain 1')))}
      {chain(259, t(b('推理 2', 'Chain 2')))}
      {chain(310, t(b('推理 3', 'Chain 3')))}
      <Mod x={236} y={122} w={90} h={26} side="comp" label={t(b('多数答案', 'Majority'))} size={10} />
      <Mod x={14} y={126} w={170} h={40} side="comp" label={t(b('自我检查', 'Self-checking'))} sub={t(b('回头检查、换一种方法', 'look back, try another way'))} size={10.5} />
      <Mod x={14} y={190} w={352} h={40} side="comp" label={t(b('工具与拒答', 'Tools and declining'))} sub={t(b('调用搜索或代码执行来查证，或回答不知道', 'search or run code to verify, or say it does not know'))} size={10.5} />
      <Gap x={14} y={248} w={352} h={30} label={t(b('由可靠的自我评估驱动的调控', 'Control driven by reliable self-assessment'))} />

      <Flow id={id} side="comp" pts={[[99, 46], [99, 66]]} />
      <Flow id={id} side="comp" pts={[[281, 46], [281, 58]]} />
      <Flow id={id} side="comp" pts={[[150, 106], [150, 126]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[48, 126], [48, 106]]} label={t(b('改写', 'revise'))} lx={18} ly={0} />
      <Flow id={id} side="comp" pts={[[230, 108], [262, 122]]} />
      <Flow id={id} side="comp" pts={[[281, 108], [281, 122]]} />
      <Flow id={id} side="comp" pts={[[332, 108], [300, 122]]} />
      <Flow id={id} side="comp" pts={[[99, 166], [99, 190]]} />
      <Flow id={id} side="comp" pts={[[281, 156], [281, 190]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={66} n={2} side="comp" />
      <Num x={360} y={70} n={3} side="comp" />
      <Num x={14} y={126} n={4} side="comp" />
      <Num x={14} y={190} n={5} side="comp" />
      <Num x={14} y={248} n={6} side="comp" />
    </Svg>
  )
}

export const CONTROL_FIGS: TopicFigs = {
  arch: { brain: ControlBrainArch, ai: ReasoningBudgetArch },
}
