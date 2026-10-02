import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** A genetic timetable opens a critical period in which inputs compete, then brakes close it; body growth and social interaction bring new input. */
function CriticalPeriodBrainArch({ t }: FigProps) {
  const id = 'f40b'
  return (
    <Svg id={id} w={380} h={258} label={t(b('关键期与婴儿发育的结构与信息流：基因设定的时间表、关键期开启、经验竞争、关键期关闭、身体发育、社会互动', 'Critical periods and infant development: genetic timetable, opening, competition, closing, bodily growth, social interaction'))}>
      <Mod x={14} y={14} w={352} h={36} side="bio" label={t(b('基因设定的时间表', 'Genetic timetable'))} sub={t(b('初级感觉区最早，前额叶最晚', 'primary sensory areas first, prefrontal last'))} size={10.5} />
      <Region x={6} y={70} w={368} h={112} side="bio" label={t(b('关键期', 'Critical period'))} />
      <Mod x={18} y={96} w={104} h={40} side="bio" label={t(b('开启', 'Opens'))} sub={t(b('抑制性神经元成熟', 'inhibition matures'))} size={10.5} />
      <Mod x={136} y={96} w={108} h={40} side="bio" label={t(b('竞争', 'Competition'))} sub={t(b('活跃的输入保留', 'active inputs stay'))} size={10.5} />
      <Mod x={258} y={96} w={104} h={40} side="bio" label={t(b('关闭', 'Closes'))} sub={t(b('分子刹车稳定连接', 'brakes stabilize'))} size={10.5} />
      <T x={190} y={160} s={t(b('两只眼睛或不同语音的输入相互竞争', 'inputs from the two eyes, or from different speech sounds, compete'))} size={9} color={C.dim} />
      <Mod x={14} y={204} w={170} h={40} side="bio" label={t(b('身体发育', 'Bodily growth'))} sub={t(b('会坐、爬、走，带来新输入', 'sitting, crawling, walking'))} size={10.5} />
      <Mod x={196} y={204} w={170} h={40} side="bio" label={t(b('社会互动', 'Social interaction'))} sub={t(b('照料者的语言与共同注意', 'caregiver speech, joint attention'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[70, 50], [70, 96]]} />
      <Flow id={id} side="bio" pts={[[122, 116], [136, 116]]} />
      <Flow id={id} side="bio" pts={[[244, 116], [258, 116]]} />
      <Flow id={id} side="bio" pts={[[99, 204], [99, 182]]} label={t(b('新的输入', 'new input'))} lx={30} ly={0} />
      <Flow id={id} side="bio" pts={[[281, 204], [281, 182]]} label={t(b('引导注意', 'guides attention'))} lx={34} ly={0} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={18} y={96} n={2} side="bio" />
      <Num x={136} y={96} n={3} side="bio" />
      <Num x={258} y={96} n={4} side="bio" />
      <Num x={14} y={204} n={5} side="bio" />
      <Num x={196} y={204} n={6} side="bio" />
    </Svg>
  )
}

/** Data are ordered by difficulty and pass three training stages; the learning-rate schedule lowers plasticity along the way. */
function StagedTrainingArch({ t }: FigProps) {
  const id = 'f40c'
  return (
    <Svg id={id} w={380} h={222} label={t(b('课程学习与分阶段训练的结构与信息流：数据排序、预训练、指令微调、人类反馈强化学习、学习率调度', 'Curriculum and staged training: data ordering, pretraining, instruction tuning, RLHF, learning-rate schedule'))}>
      <Mod x={14} y={14} w={170} h={40} side="comp" label={t(b('数据排序', 'Data ordering'))} sub={t(b('先易后难', 'easy before hard'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="comp" label={t(b('学习率调度', 'Learning-rate schedule'))} sub={t(b('早期大，之后逐渐减小', 'large early, then smaller'))} size={10.5} />
      <Region x={6} y={76} w={368} h={70} side="comp" label={t(b('训练阶段', 'Training stages'))} />
      <Mod x={18} y={98} w={104} h={40} side="comp" label={t(b('预训练', 'Pretraining'))} sub={t(b('通用表示', 'general features'))} size={10.5} />
      <Mod x={136} y={98} w={108} h={40} side="comp" label={t(b('指令微调', 'Instruction tuning'))} sub={t(b('按要求回答', 'follow requests'))} size={10} />
      <Mod x={258} y={98} w={104} h={40} side="comp" label={t(b('人类反馈强化学习', 'RLHF'))} sub={t(b('按偏好调整', 'tuned to preferences'))} size={9.5} />
      <Gap x={14} y={168} w={352} h={40} label={t(b('由身体成长和社会互动驱动的学习顺序', 'A learning order driven by bodily growth and social interaction'))} />

      <Flow id={id} side="comp" pts={[[70, 54], [70, 98]]} />
      <Flow id={id} side="comp" pts={[[122, 118], [136, 118]]} />
      <Flow id={id} side="comp" pts={[[244, 118], [258, 118]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[281, 54], [281, 76]]} label={t(b('调节可塑性', 'sets plasticity'))} lx={38} ly={0} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={98} n={2} side="comp" />
      <Num x={136} y={98} n={3} side="comp" />
      <Num x={258} y={98} n={4} side="comp" />
      <Num x={196} y={14} n={5} side="comp" />
      <Num x={14} y={168} n={6} side="comp" />
    </Svg>
  )
}

export const DEVELOPMENT_FIGS: TopicFigs = {
  arch: { brain: CriticalPeriodBrainArch, ai: StagedTrainingArch },
}
