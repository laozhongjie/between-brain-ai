import type { Bi } from '../../../data/types'
import { Svg } from '../kit'
import { Flow, Gap, Mod, Num } from '../grammar'
import { legacyFig } from '../layer4'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Body signals reach the hypothalamus, which compares them with set points and regulates, drives motivation and value; the insula integrates; prediction regulates ahead. */
function InteroceptionBrainArch({ t }: FigProps) {
  const id = 'f34b'
  return (
    <Svg id={id} w={380} h={276} label={t(b('下丘脑与岛叶调节的结构与信息流：内感受信号、脑干与下丘脑、自动调节、动机与价值、岛叶、预测性调节', 'Hypothalamic and insular regulation: interoceptive signals, brainstem and hypothalamus, automatic regulation, drive and value, insula, predictive regulation'))}>
      <Mod x={14} y={14} w={352} h={36} side="bio" label={t(b('内感受器', 'Interoceptors'))} sub={t(b('血糖、渗透压、体温、心跳、胃肠', 'glucose, osmolality, temperature, heart, gut'))} size={10.5} />
      <Mod x={14} y={80} w={170} h={40} side="bio" label={t(b('脑干与下丘脑', 'Brainstem, hypothalamus'))} sub={t(b('与设定点比较，如 37 摄氏度', 'compare with set points, e.g. 37 °C'))} size={10.5} />
      <Mod x={196} y={80} w={170} h={40} side="bio" label={t(b('岛叶', 'Insula'))} sub={t(b('从后到前整合，形成整体感受', 'integrated back to front'))} size={10.5} />
      <Mod x={14} y={152} w={170} h={40} side="bio" label={t(b('自动调节', 'Automatic regulation'))} sub={t(b('出汗、心率、胰岛素、激素', 'sweat, heart, insulin, hormones'))} size={10.5} />
      <Mod x={196} y={152} w={170} h={40} side="bio" label={t(b('动机与价值', 'Drive and value'))} sub={t(b('饥饿、口渴；食物与水更有价值', 'hunger, thirst; food, water gain value'))} size={10.5} />
      <Mod x={14} y={222} w={352} h={40} side="bio" label={t(b('预测性调节', 'Predictive regulation'))} sub={t(b('预期进食或运动时提前调整', 'adjusts ahead of an expected meal or exercise'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[99, 50], [99, 80]]} label={t(b('迷走神经与脊髓', 'vagus, spinal cord'))} lx={44} ly={0} />
      <Flow id={id} side="bio" pts={[[281, 50], [281, 80]]} />
      <Flow id={id} side="bio" pts={[[99, 120], [99, 152]]} />
      <Flow id={id} side="bio" pts={[[150, 120], [150, 136], [250, 136], [250, 152]]} />
      <Flow id={id} side="bio" pts={[[320, 120], [320, 152]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[14, 172], [8, 172], [8, 32], [14, 32]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[70, 222], [70, 192]]} label={t(b('提前', 'ahead'))} lx={18} ly={0} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={80} n={2} side="bio" />
      <Num x={14} y={152} n={3} side="bio" />
      <Num x={196} y={152} n={4} side="bio" />
      <Num x={196} y={80} n={5} side="bio" />
      <Num x={14} y={222} n={6} side="bio" />
    </Svg>
  )
}

/** Robot sensors give a drive against target ranges; protection acts directly, the drive's reduction becomes a reward for the policy, and planning schedules charging. */
function HomeostaticRlArch({ t }: FigProps) {
  const id = 'f34c'
  return (
    <Svg id={id} w={380} h={256} label={t(b('稳态强化学习与资源管理的结构与信息流：内部传感器、与目标范围比较、底层保护、稳态奖励、资源规划', 'Homeostatic RL and resource management: internal sensors, target ranges, low-level protection, homeostatic reward, resource planning'))}>
      <Mod x={14} y={14} w={352} h={36} side="comp" label={t(b('内部传感器', 'Internal sensors'))} sub={t(b('电量、电机温度、关节负载', 'battery, motor temperature, joint load'))} size={10.5} />
      <Mod x={14} y={74} w={170} h={40} side="comp" label={t(b('与目标范围比较', 'Target ranges'))} sub={t(b('合成一个驱力', 'combined into one drive'))} size={10.5} />
      <Mod x={196} y={74} w={170} h={40} side="comp" label={t(b('底层保护', 'Low-level protection'))} sub={t(b('过热降速，电量低时停止', 'slow when hot, stop when low'))} size={10.5} />
      <Mod x={14} y={138} w={170} h={40} side="comp" label={t(b('稳态奖励', 'Homeostatic reward'))} sub={t(b('驱力减少量加任务奖励', 'drive reduction plus task reward'))} size={10.5} />
      <Mod x={196} y={138} w={170} h={40} side="comp" label={t(b('资源规划', 'Resource planning'))} sub={t(b('按预测能耗安排充电', 'charging from predicted use'))} size={10.5} />
      <Mod x={14} y={202} w={170} h={40} side="comp" label={t(b('策略', 'Policy'))} sub={t(b('在任务与维持自身之间权衡', 'balances task and upkeep'))} size={10.5} />
      <Gap x={196} y={202} w={170} h={40} label={t(b('内部状态渗透到\n感知、学习与价值', 'Inner state reaching\nperception, learning, value'))} />

      <Flow id={id} side="comp" pts={[[99, 50], [99, 74]]} />
      <Flow id={id} side="comp" fast pts={[[281, 50], [281, 74]]} />
      <Flow id={id} side="comp" pts={[[99, 114], [99, 138]]} />
      <Flow id={id} side="comp" pts={[[170, 114], [170, 126], [260, 126], [260, 138]]} />
      <Flow id={id} side="comp" pts={[[99, 178], [99, 202]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={74} n={2} side="comp" />
      <Num x={196} y={74} n={3} side="comp" />
      <Num x={14} y={138} n={4} side="comp" />
      <Num x={196} y={138} n={5} side="comp" />
      <Num x={196} y={202} n={6} side="comp" />
    </Svg>
  )
}

export const INTEROCEPTION_FIGS: TopicFigs = {
  arch: { brain: InteroceptionBrainArch, ai: HomeostaticRlArch },
  math: {
    bio: { 0: legacyFig('sys-homeostasis', 'brain') },
    comp: { 0: legacyFig('sys-homeostasis', 'ai') },
  },
}
