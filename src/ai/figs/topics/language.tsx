import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import { legacyFig } from '../layer4'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Speech and text reach words in temporal cortex; the frontotemporal language network combines them and predicts the next word, then hands meaning on and plans speech. */
function LanguageBrainArch({ t }: FigProps) {
  const id = 'f35b'
  return (
    <Svg id={id} w={380} h={284} label={t(b('左半球语言网络的结构与信息流：听觉皮层与视觉词形区、颞上回、语言网络、预测下一个词、推理与心智理论网络、产出', 'Left-hemisphere language network: auditory cortex and visual word form area, superior temporal gyrus, language network, next-word prediction, reasoning and theory-of-mind networks, production'))}>
      <Mod x={14} y={14} w={352} h={36} side="bio" label={t(b('听觉皮层与视觉词形区', 'Auditory cortex, visual word form area'))} sub={t(b('语音与书面的词', 'speech and written words'))} size={10.5} />
      <Mod x={14} y={74} w={170} h={40} side="bio" label={t(b('颞上回与颞叶后部', 'Superior, posterior temporal'))} sub={t(b('映射到心理词典中的词', 'map onto words in the lexicon'))} size={10.5} />
      <Region x={6} y={134} w={368} h={76} side="bio" label={t(b('语言网络', 'Language network'))} />
      <Mod x={18} y={158} w={200} h={40} side="bio" label={t(b('额叶下部与颞叶', 'Inferior frontal and temporal'))} sub={t(b('把词组合成句子，表示意义', 'combine words, represent meaning'))} size={10.5} />
      <Mod x={230} y={158} w={136} h={40} side="bio" label={t(b('预测下一个词', 'Next-word prediction'))} sub={t(b('意外的词引起 N400', 'surprise gives an N400'))} size={10} />
      <Mod x={14} y={230} w={170} h={40} side="bio" label={t(b('推理与心智理论网络', 'Reasoning, theory of mind'))} sub={t(b('进一步处理意义', 'take the meaning further'))} size={10.5} />
      <Mod x={196} y={230} w={170} h={40} side="bio" label={t(b('额叶下部与运动皮层', 'Inferior frontal, motor'))} sub={t(b('产出：词序与发音', 'production: order, articulation'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[99, 50], [99, 74]]} />
      <Flow id={id} side="bio" pts={[[99, 114], [99, 158]]} />
      <Flow id={id} side="bio" pts={[[218, 178], [230, 178]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[298, 158], [298, 94], [184, 94]]} label={t(b('预期', 'expectation'))} at={1} ly={-7} />
      <Flow id={id} side="bio" pts={[[99, 198], [99, 230]]} />
      <Flow id={id} side="bio" pts={[[180, 198], [180, 218], [281, 218], [281, 230]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={74} n={2} side="bio" />
      <Num x={18} y={158} n={3} side="bio" />
      <Num x={230} y={158} n={4} side="bio" />
      <Num x={14} y={230} n={5} side="bio" />
      <Num x={196} y={230} n={6} side="bio" />
    </Svg>
  )
}

/** Text is tokenized and embedded, passes dozens of transformer layers and ends in a next-token distribution; post-training continues training on instructions and feedback. */
function LlmArch({ t }: FigProps) {
  const id = 'f35c'
  return (
    <Svg id={id} w={380} h={278} label={t(b('大语言模型的结构与信息流：分词、嵌入、Transformer 层、预测下一个词元、后训练', 'Large language model: tokenization, embedding, transformer layers, next-token prediction, post-training'))}>
      <Mod x={14} y={14} w={170} h={36} side="comp" label={t(b('分词', 'Tokenization'))} sub={t(b('切成词元', 'split into tokens'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={36} side="comp" label={t(b('嵌入', 'Embedding'))} sub={t(b('向量加位置信息', 'vectors plus position'))} size={10.5} />
      <Region x={6} y={70} w={368} h={78} side="comp" label={t(b('Transformer 层', 'Transformer layers'))} />
      <rect x={30} y={88} width={332} height={40} rx={7} fill={C.sky} stroke={C.skyD} strokeOpacity={0.4} strokeWidth={1} />
      <rect x={24} y={93} width={332} height={40} rx={7} fill={C.sky} stroke={C.skyD} strokeOpacity={0.6} strokeWidth={1} />
      <Mod x={18} y={98} w={332} h={40} side="comp" label={t(b('注意力与前馈网络', 'Attention and feedforward'))} sub={t(b('几十层，逐层形成句法和语义的表示', 'dozens of layers build syntax and meaning'))} size={10.5} />
      <Mod x={14} y={170} w={170} h={40} side="comp" label={t(b('预测下一个词元', 'Next-token prediction'))} sub={t(b('softmax 给出每个词元的概率', 'softmax over the vocabulary'))} size={10.5} />
      <Mod x={196} y={170} w={170} h={40} side="comp" label={t(b('后训练', 'Post-training'))} sub={t(b('指令与人类反馈', 'instructions, human feedback'))} size={10.5} />
      <Gap x={14} y={234} w={352} h={32} label={t(b('在感知和社会互动中学习语言', 'Learning language through perception and interaction'))} />

      <Flow id={id} side="comp" pts={[[184, 32], [196, 32]]} />
      <Flow id={id} side="comp" pts={[[281, 50], [281, 98]]} />
      <Flow id={id} side="comp" pts={[[99, 138], [99, 170]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[281, 170], [281, 148]]} label={t(b('继续训练', 'trains further'))} lx={30} ly={0} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={196} y={14} n={2} side="comp" />
      <Num x={18} y={98} n={3} side="comp" />
      <Num x={14} y={170} n={4} side="comp" />
      <Num x={196} y={170} n={5} side="comp" />
      <Num x={14} y={234} n={6} side="comp" />
    </Svg>
  )
}

export const LANGUAGE_FIGS: TopicFigs = {
  arch: { brain: LanguageBrainArch, ai: LlmArch },
  math: { bio: { 0: legacyFig('sys-language', 'brain') }, comp: { 0: legacyFig('sys-language', 'ai') } },
}
