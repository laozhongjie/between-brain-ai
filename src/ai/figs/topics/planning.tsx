import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** The hippocampus previews paths, orbitofrontal cortex and ventral striatum value them, prefrontal cortex chooses against habits; replay caches plans offline. */
function PlanningBrainArch({ t }: FigProps) {
  const id = 'f20b'
  return (
    <Svg id={id} w={380} h={314} label={t(b('海马预演与前额叶规划的结构与信息流：当前位置与目标、海马预演、评估、前额叶选择与剪枝、与习惯竞争、离线规划', 'Planning: current place and goal, hippocampal preview, evaluation, prefrontal choice and pruning, competition with habits, offline planning'))}>
      <Mod x={14} y={14} w={352} h={36} side="bio" label={t(b('海马与前额叶', 'Hippocampus and prefrontal cortex'))} sub={t(b('当前位置与目标', 'current place and goal'))} size={10.5} />
      <Mod x={14} y={72} w={170} h={40} side="bio" label={t(b('海马预演', 'Hippocampal preview'))} sub={t(b('每 125 毫秒扫过一条路径', 'sweeps one path per 125 ms'))} size={10.5} />
      <Mod x={196} y={72} w={170} h={40} side="bio" label={t(b('眶额皮层与腹侧纹状体', 'Orbitofrontal, ventral striatum'))} sub={t(b('评估每条路径的价值', 'value of each path'))} size={10} />
      <Mod x={14} y={134} w={352} h={40} side="bio" label={t(b('前额叶选择与剪枝', 'Prefrontal choice and pruning'))} sub={t(b('选出动作序列，放弃看起来糟糕的分支', 'picks an action sequence, drops bad-looking branches'))} size={10.5} />
      <Mod x={14} y={196} w={170} h={40} side="bio" label={t(b('动作', 'Action'))} sub={t(b('新情况：规划主导', 'new situation: planning wins'))} size={10.5} />
      <Mod x={196} y={196} w={170} h={40} side="bio" label={t(b('背外侧纹状体', 'Dorsolateral striatum'))} sub={t(b('习惯：熟悉时主导', 'habits: win when familiar'))} size={10.5} />
      <Mod x={14} y={260} w={352} h={40} side="bio" label={t(b('休息与睡眠中的回放', 'Replay in rest and sleep'))} sub={t(b('预先算好有用的路线', 'works out useful routes in advance'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[99, 50], [99, 72]]} />
      <Flow id={id} side="bio" pts={[[184, 92], [196, 92]]} />
      <Flow id={id} side="bio" pts={[[281, 112], [281, 134]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[40, 134], [40, 112]]} label={t(b('换一条', 'next path'))} lx={24} ly={0} />
      <Flow id={id} side="bio" pts={[[99, 174], [99, 196]]} />
      <Flow id={id} side="bio" pts={[[196, 216], [184, 216]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[281, 260], [281, 236]]} label={t(b('缓存进策略', 'cached into the policy'))} lx={-52} ly={0} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={72} n={2} side="bio" />
      <Num x={196} y={72} n={3} side="bio" />
      <Num x={14} y={134} n={4} side="bio" />
      <Num x={196} y={196} n={5} side="bio" />
      <Num x={14} y={260} n={6} side="bio" />
    </Svg>
  )
}

/** Monte Carlo tree search: the network gives priors and values, the search descends, expands a leaf and backs up its value; self-play trains the network. */
function MctsArch({ t }: FigProps) {
  const id = 'f20c'
  const node = (cx: number, cy: number, label = '') => <Var cx={cx} cy={cy} r={11} side="comp" label={label} />
  return (
    <Svg id={id} w={380} h={268} label={t(b('搜索与学习型规划的结构与信息流：网络评估、沿树选择、扩展叶节点、回传、选择走法', 'Search-based planning: network evaluation, selection down the tree, leaf expansion, backup, move choice'))}>
      <Mod x={14} y={14} w={170} h={40} side="comp" label={t(b('神经网络', 'Neural network'))} sub={t(b('走法的先验与局面的价值', 'move priors, position value'))} size={10.5} />
      <Region x={6} y={72} w={252} h={182} side="comp" label={t(b('搜索树', 'Search tree'))} />
      {/* edges first, the chosen path thick */}
      <Flow id={id} side="comp" head="none" pts={[[124, 115], [80, 145]]} />
      <Flow id={id} side="comp" head="none" fast pts={[[131, 117], [131, 143]]} />
      <Flow id={id} side="comp" head="none" pts={[[140, 113], [198, 147]]} />
      <Flow id={id} side="comp" head="none" pts={[[125, 165], [106, 191]]} />
      <Flow id={id} side="comp" head="none" fast pts={[[137, 165], [156, 191]]} />
      {node(131, 106, t(b('根', 'root')))}
      {node(76, 154)}
      {node(131, 154)}
      {node(208, 154)}
      {node(104, 202)}
      {node(158, 202, t(b('新', 'new')))}
      <T x={178} y={214} s={t(b('网络评估', 'network value'))} size={9} color={C.dim} anchor="start" />
      <Flow id={id} side="comp" kind="fb" pts={[[166, 193], [142, 114]]} curve={[168, 150]} label={t(b('回传', 'backup'))} lx={14} ly={0} />
      <Mod x={268} y={110} w={100} h={46} side="comp" label={t(b('选择走法', 'Choose a move'))} sub={t(b('访问最多的', 'most visited'))} size={10.5} />
      <Gap x={268} y={186} w={100} h={56} label={t(b('大语言模型：\n每步之后的\n状态检查', 'LLMs: checking\nthe state after\neach step'))} />

      <Flow id={id} side="comp" pts={[[99, 54], [99, 84], [131, 84], [131, 95]]} label={t(b('先验、价值', 'priors, value'))} at={1} ly={-6} lx={22} />
      <Flow id={id} side="comp" pts={[[258, 133], [268, 133]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[318, 110], [318, 34], [184, 34]]} label={t(b('自我对弈训练', 'self-play training'))} at={1} ly={-7} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={116} y={130} n={2} side="comp" />
      <Num x={150} y={226} n={3} side="comp" />
      <Num x={186} y={118} n={4} side="comp" />
      <Num x={268} y={110} n={5} side="comp" />
      <Num x={268} y={186} n={6} side="comp" />
    </Svg>
  )
}

export const PLANNING_FIGS: TopicFigs = {
  arch: { brain: PlanningBrainArch, ai: MctsArch },
}
