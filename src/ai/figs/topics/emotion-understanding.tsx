import type { Bi } from '../../../data/types'
import { Svg } from '../kit'
import { Flow, Gap, Mod, Num } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Face, voice and posture areas feed a fast amygdala appraisal and a contextual inference in prefrontal and temporoparietal cortex; insula and cingulate share the feeling. */
function EmpathyBrainArch({ t }: FigProps) {
  const id = 'f32b'
  return (
    <Svg id={id} w={380} h={214} label={t(b('情绪识别与共情的结构与信息流：感觉线索、杏仁核、前额叶与颞顶联合区、前岛叶与前扣带、表达与回应', 'Emotion recognition and empathy: sensory cues, amygdala, prefrontal and temporoparietal cortex, anterior insula and cingulate, expression and response'))}>
      <Mod x={14} y={14} w={352} h={40} side="bio" label={t(b('梭状回、颞上沟与颞上回', 'Fusiform gyrus, STS, STG'))} sub={t(b('表情、视线、语调与姿态', 'expression, gaze, tone and posture'))} size={10.5} />
      <Mod x={14} y={86} w={170} h={40} side="bio" label={t(b('杏仁核', 'Amygdala'))} sub={t(b('对威胁线索快速反应', 'fast response to threat cues'))} size={10.5} />
      <Mod x={196} y={86} w={170} h={40} side="bio" label={t(b('前额叶与颞顶联合区', 'Prefrontal and TPJ'))} sub={t(b('结合情境推断原因', 'infers why, with context'))} size={10.5} />
      <Mod x={14} y={160} w={170} h={40} side="bio" label={t(b('前岛叶与前扣带', 'Anterior insula, cingulate'))} sub={t(b('形成相近的情绪状态', 'a similar feeling arises'))} size={10.5} />
      <Mod x={196} y={160} w={170} h={40} side="bio" label={t(b('表达与回应', 'Expression and response'))} sub={t(b('表情、语气、安慰', 'face, tone, comfort'))} size={10.5} />

      <Flow id={id} side="bio" fast pts={[[99, 54], [99, 86]]} />
      <Flow id={id} side="bio" pts={[[281, 54], [281, 86]]} />
      <Flow id={id} side="bio" pts={[[184, 106], [196, 106]]} />
      <Flow id={id} side="bio" pts={[[99, 126], [99, 160]]} />
      <Flow id={id} side="bio" pts={[[281, 126], [281, 160]]} />
      <Flow id={id} side="bio" pts={[[184, 180], [196, 180]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={86} n={2} side="bio" />
      <Num x={196} y={86} n={3} side="bio" />
      <Num x={14} y={160} n={4} side="bio" />
      <Num x={196} y={160} n={5} side="bio" />
    </Svg>
  )
}

/** Images, speech and text are encoded and classified, or read by a language model that infers the emotion and writes a reply. */
function AffectiveComputingArch({ t }: FigProps) {
  const id = 'f32c'
  return (
    <Svg id={id} w={380} h={252} label={t(b('情感计算与语言模型的结构与信息流：多模态输入、特征编码、情绪分类、大语言模型的情境推断、生成回应', 'Affective computing and language models: multimodal input, feature encoding, emotion classification, contextual inference in an LLM, reply'))}>
      <Mod x={14} y={14} w={352} h={34} side="comp" label={t(b('多模态输入', 'Multimodal input'))} sub={t(b('图像、语音、文字', 'images, speech, text'))} size={10.5} />
      <Mod x={14} y={70} w={170} h={40} side="comp" label={t(b('特征编码', 'Feature encoding'))} sub={t(b('面部动作、韵律、词元向量', 'facial actions, prosody, tokens'))} size={10.5} />
      <Mod x={14} y={134} w={170} h={40} side="comp" label={t(b('情绪分类', 'Emotion classification'))} sub={t(b('类别，或愉快与激动程度', 'a category, or valence and arousal'))} size={10.5} />
      <Mod x={196} y={70} w={170} h={40} side="comp" label={t(b('大语言模型', 'Large language model'))} sub={t(b('从情境推断情绪和原因', 'infers emotion and cause'))} size={10.5} />
      <Mod x={196} y={134} w={170} h={40} side="comp" label={t(b('生成回应', 'Reply'))} sub={t(b('后训练使措辞更体贴', 'post-training adds a caring tone'))} size={10.5} />
      <Gap x={14} y={198} w={352} h={40} label={t(b('内部情绪状态、身体反馈、跨会话的关系记忆', 'Inner emotional state, bodily feedback, memory of the relationship'))} />

      <Flow id={id} side="comp" pts={[[99, 48], [99, 70]]} />
      <Flow id={id} side="comp" pts={[[281, 48], [281, 70]]} label={t(b('文字', 'text'))} lx={18} ly={0} />
      <Flow id={id} side="comp" pts={[[99, 110], [99, 134]]} />
      <Flow id={id} side="comp" pts={[[281, 110], [281, 134]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={70} n={2} side="comp" />
      <Num x={14} y={134} n={3} side="comp" />
      <Num x={196} y={70} n={4} side="comp" />
      <Num x={196} y={134} n={5} side="comp" />
      <Num x={14} y={198} n={6} side="comp" />
    </Svg>
  )
}

export const EMOTION_UNDERSTANDING_FIGS: TopicFigs = {
  arch: { brain: EmpathyBrainArch, ai: AffectiveComputingArch },
}
