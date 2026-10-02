import type { Bi } from '../../../data/types'
import { Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Social cues from the STS feed belief inference in the TPJ and trait inference in medial prefrontal cortex; both predict behavior, revised in interaction. */
function TheoryOfMindBrainArch({ t }: FigProps) {
  const id = 'f37b'
  return (
    <Svg id={id} w={380} h={218} label={t(b('心智理论网络的结构与信息流：颞上沟、颞顶联合区、内侧前额叶、动作模拟、预测行为', 'Theory-of-mind network: superior temporal sulcus, temporoparietal junction, medial prefrontal cortex, action simulation, predicting behavior'))}>
      <Mod x={22} y={14} w={162} h={40} side="bio" label={t(b('颞上沟', 'Superior temporal sulcus'))} sub={t(b('视线、表情、身体动作', 'gaze, expression, movement'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('运动相关区域', 'Motor-related areas'))} sub={t(b('模拟观察到的动作', 'simulate observed actions'))} size={10.5} />
      <Mod x={22} y={88} w={162} h={40} side="bio" label={t(b('右侧颞顶联合区', 'Right TPJ'))} sub={t(b('他人的信念，尤其是错误信念', 'others’ beliefs, false ones too'))} size={10.5} />
      <Mod x={196} y={88} w={170} h={40} side="bio" label={t(b('内侧前额叶', 'Medial prefrontal cortex'))} sub={t(b('性格、长期目标与意图', 'traits, goals and intentions'))} size={10.5} />
      <Mod x={22} y={162} w={344} h={40} side="bio" label={t(b('预测行为', 'Predicting behavior'))} sub={t(b('信念加愿望，推测对方下一步会做什么', 'beliefs plus desires predict the next move'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[184, 34], [196, 34]]} />
      <Flow id={id} side="bio" pts={[[103, 54], [103, 88]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[281, 54], [281, 88]]} label={t(b('作用有争议', 'role debated'))} lx={36} ly={0} />
      <Flow id={id} side="bio" pts={[[103, 128], [103, 162]]} />
      <Flow id={id} side="bio" pts={[[281, 128], [281, 162]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[22, 182], [12, 182], [12, 34], [22, 34]]} />
      <Num x={22} y={14} n={1} side="bio" />
      <Num x={22} y={88} n={2} side="bio" />
      <Num x={196} y={88} n={3} side="bio" />
      <Num x={196} y={14} n={4} side="bio" />
      <Num x={22} y={162} n={5} side="bio" />
    </Svg>
  )
}

/** A language model reads a story, tracks who saw what across its layers and answers; ToMnet learns a character vector from past behavior; post-training shapes the replies. */
function BeliefInferenceArch({ t }: FigProps) {
  const id = 'f37c'
  return (
    <Svg id={id} w={380} h={306} label={t(b('大语言模型的信念推断的结构与信息流：故事输入、追踪人物与信息、回答、机器心智理论网络、后训练', 'Belief inference in language models: story input, tracking characters and information, answering, machine theory of mind, post-training'))}>
      <Mod x={14} y={14} w={236} h={40} side="comp" label={t(b('故事输入', 'Story input'))} sub={t(b('人物、物体、谁看到了什么', 'characters, objects, who saw what'))} size={10.5} />
      <Region x={6} y={72} w={252} h={118} side="comp" label={t(b('大语言模型', 'Language model'))} />
      <Mod x={18} y={96} w={228} h={36} side="comp" label={t(b('追踪人物与信息', 'Tracking characters'))} sub={t(b('Transformer 层记下位置、行动、所见', 'layers track place, action, what was seen'))} size={10.5} />
      <Mod x={18} y={144} w={228} h={36} side="comp" label={t(b('回答问题', 'Answering'))} sub={t(b('「他会去哪里找」', '“where will he look?”'))} size={10.5} />
      <Mod x={268} y={96} w={100} h={84} side="comp" label={t(b('后训练', 'Post-training'))} sub={t(b('对话与指令', 'dialogue, instructions'))} size={10.5} />
      <Mod x={14} y={210} w={352} h={40} side="comp" label={t(b('机器心智理论网络', 'Machine theory-of-mind network'))} sub={t(b('把过去的行为压缩成特征向量，预测下一步动作', 'compresses past behavior into a character vector, predicts the next action'))} size={10.5} />
      <Gap x={14} y={266} w={352} h={30} label={t(b('稳健、可检验、在互动中更新的他人心理状态表示', 'A robust, testable model of others, updated in interaction'))} />

      <Flow id={id} side="comp" pts={[[131, 54], [131, 96]]} />
      <Flow id={id} side="comp" pts={[[131, 132], [131, 144]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[268, 138], [258, 138]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={96} n={2} side="comp" />
      <Num x={18} y={144} n={3} side="comp" />
      <Num x={14} y={210} n={4} side="comp" />
      <Num x={268} y={96} n={5} side="comp" />
      <Num x={14} y={266} n={6} side="comp" />
    </Svg>
  )
}

export const SOCIAL_FIGS: TopicFigs = {
  arch: { brain: TheoryOfMindBrainArch, ai: BeliefInferenceArch },
}
