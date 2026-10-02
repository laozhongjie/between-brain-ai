import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store } from '../grammar'
import { legacyFig } from '../layer4'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Control passes from prefrontal and dorsomedial striatum to the dorsolateral striatum; dopamine, the cerebellum and sleep reshape motor cortex. */
function SkillBrainArch({ t }: FigProps) {
  const id = 'f27b'
  return (
    <Svg id={id} w={380} h={288} label={t(b('运动技能学习的结构与信息流：早期的前额叶与背内侧纹状体、多巴胺强化、小脑精细化、运动皮层重组、背外侧纹状体的自动化、睡眠巩固', 'Motor skill learning: early prefrontal and dorsomedial striatum, dopamine reinforcement, cerebellar refinement, motor cortex reorganization, dorsolateral automation, sleep'))}>
      <Mod x={14} y={14} w={160} h={40} side="bio" label={t(b('前额叶与背内侧纹状体', 'Prefrontal, DM striatum'))} sub={t(b('早期：目标导向，慢而多变', 'early: goal-directed, slow'))} size={10} />
      <Mod x={206} y={14} w={160} h={40} side="bio" label={t(b('背外侧纹状体', 'Dorsolateral striatum'))} sub={t(b('后期：自动化与组块', 'late: automatic, chunked'))} size={10.5} />
      <Mod x={14} y={92} w={352} h={40} side="bio" label={t(b('运动皮层', 'Motor cortex'))} sub={t(b('数周练习后，相关区域扩大，形成新连接', 'weeks of practice enlarge the area and add connections'))} size={10.5} />
      <Mod x={14} y={166} w={170} h={40} side="bio" label={t(b('多巴胺', 'Dopamine'))} sub={t(b('结果更好时强化刚才的动作', 'reinforces moves that did better'))} size={10.5} />
      <Mod x={196} y={166} w={170} h={40} side="bio" label={t(b('小脑', 'Cerebellum'))} sub={t(b('按误差调整时序与协调', 'tunes timing from errors'))} size={10.5} />
      <Mod x={14} y={234} w={352} h={40} side="bio" label={t(b('睡眠', 'Sleep'))} sub={t(b('练习后的一夜提高速度和准确性', 'a night after practice adds speed and accuracy'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[174, 34], [206, 34]]} />
      <T x={190} y={68} s={t(b('练习中逐渐接管', 'takes over with practice'))} size={9} color={C.pinkD} />
      <Flow id={id} side="bio" pts={[[94, 54], [94, 92]]} />
      <Flow id={id} side="bio" pts={[[286, 54], [286, 92]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[99, 166], [99, 132]]} label={t(b('强化', 'reinforce'))} lx={20} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[281, 166], [281, 132]]} label={t(b('校正', 'correct'))} lx={20} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[190, 234], [190, 132]]} label={t(b('巩固', 'consolidate'))} lx={20} ly={36} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={166} n={2} side="bio" />
      <Num x={196} y={166} n={3} side="bio" />
      <Num x={14} y={92} n={4} side="bio" />
      <Num x={206} y={14} n={5} side="bio" />
      <Num x={14} y={234} n={6} side="bio" />
    </Svg>
  )
}

/** A VLA encodes image and instruction, represents actions as tokens, is trained on demonstrations and web data, and hands targets to a controller. */
function VlaArch({ t }: FigProps) {
  const id = 'f27c'
  return (
    <Svg id={id} w={380} h={296} label={t(b('VLA 模型的结构与信息流：视觉与语言编码、动作的表示、模仿学习、与网页数据共同训练、底层控制执行', 'VLA models: vision and language encoding, action representation, imitation learning, co-training with web data, low-level execution'))}>
      <Mod x={14} y={14} w={236} h={40} side="comp" label={t(b('视觉与语言编码', 'Vision and language encoding'))} sub={t(b('相机画面与指令变成词元向量', 'camera image and instruction become tokens'))} size={10.5} />
      <Region x={6} y={72} w={252} h={104} side="comp" label={t(b('VLA 模型', 'VLA model'))} />
      <Mod x={18} y={100} w={200} h={40} side="comp" label={t(b('动作的表示', 'Action representation'))} sub={t(b('离散的动作词元，或动作头', 'discrete action tokens, or an action head'))} size={10.5} />
      <Store x={268} y={72} w={100} h={50} side="comp" label={t(b('人工示范', 'Demonstrations'))} sub={t(b('模仿学习', 'imitation'))} />
      <Store x={268} y={132} w={100} h={50} side="comp" label={t(b('网页图文', 'Web data'))} sub={t(b('共同训练', 'co-training'))} />
      <Mod x={14} y={196} w={352} h={40} side="comp" label={t(b('底层控制执行', 'Low-level execution'))} sub={t(b('目标位姿交给控制器，每秒执行若干次', 'target poses go to a controller several times a second'))} size={10.5} />
      <Gap x={14} y={254} w={352} h={30} label={t(b('自主练习改进与触觉反馈', 'Improving by own practice, touch feedback'))} />

      <Flow id={id} side="comp" pts={[[131, 54], [131, 100]]} />
      <Flow id={id} side="comp" pts={[[118, 140], [118, 196]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[268, 99], [218, 112]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[268, 157], [218, 130]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={100} n={2} side="comp" />
      <Num x={268} y={74} n={3} side="comp" />
      <Num x={268} y={134} n={4} side="comp" />
      <Num x={14} y={196} n={5} side="comp" />
      <Num x={14} y={254} n={6} side="comp" />
    </Svg>
  )
}

export const SKILL_FIGS: TopicFigs = {
  arch: { brain: SkillBrainArch, ai: VlaArch },
  math: { comp: { 1: legacyFig('sys-motor', 'ai') } },
}
