import type { Bi } from '../../../data/types'
import { Svg } from '../kit'
import { Flow, Gap, Mod, Num, Store } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** The genome encodes rules; development lays a coarse map; spontaneous activity refines it before birth; innate circuits result, and experience then learns on that frame. */
function InnateBrainArch({ t }: FigProps) {
  const id = 'f39b'
  return (
    <Svg id={id} w={380} h={224} label={t(b('先天初始结构的结构与信息流：基因组、发育、自发活动、先天的回路与偏好、经验', 'Innate initial structure: genome, development, spontaneous activity, innate circuits and preferences, experience'))}>
      <Store x={14} y={10} w={170} h={56} side="bio" label={t(b('基因组', 'Genome'))} sub={t(b('细胞类型与导向的规则', 'rules for cell types, guidance'))} />
      <Mod x={196} y={18} w={170} h={40} side="bio" label={t(b('发育', 'Development'))} sub={t(b('轴突沿梯度，形成粗略的连接图', 'axons follow gradients: a coarse map'))} size={10.5} />
      <Mod x={14} y={98} w={170} h={40} side="bio" label={t(b('自发活动', 'Spontaneous activity'))} sub={t(b('出生前的视网膜波细化地图', 'prenatal retinal waves refine it'))} size={10.5} />
      <Mod x={196} y={98} w={170} h={40} side="bio" label={t(b('先天的回路与偏好', 'Innate circuits'))} sub={t(b('偏好像脸的图案，见阴影就逃', 'face preference, flight from looming'))} size={10.5} />
      <Mod x={14} y={170} w={352} h={40} side="bio" label={t(b('经验', 'Experience'))} sub={t(b('出生后在先天框架上调整连接', 'after birth, tunes connections on the innate frame'))} size={10.5} />

      <Flow id={id} side="bio" head="read" pts={[[184, 38], [196, 38]]} />
      <Flow id={id} side="bio" pts={[[281, 58], [281, 78], [99, 78], [99, 98]]} />
      <Flow id={id} side="bio" pts={[[184, 118], [196, 118]]} />
      <Flow id={id} side="bio" pts={[[99, 138], [99, 170]]} />
      <Flow id={id} side="bio" pts={[[281, 138], [281, 170]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={196} y={18} n={2} side="bio" />
      <Num x={14} y={98} n={3} side="bio" />
      <Num x={196} y={98} n={4} side="bio" />
      <Num x={14} y={170} n={5} side="bio" />
    </Svg>
  )
}

/** A designer (or a search) picks the architecture; weights are initialized, pretrained into stored parameters and fine-tuned downstream. */
function InductiveBiasArch({ t }: FigProps) {
  const id = 'f39c'
  return (
    <Svg id={id} w={380} h={214} label={t(b('归纳偏置与预训练的结构与信息流：选择架构、初始化、预训练、下游微调、结构搜索', 'Inductive bias and pretraining: architecture choice, initialization, pretraining, fine-tuning, architecture search'))}>
      <Mod x={14} y={14} w={170} h={40} side="comp" label={t(b('选择架构', 'Architecture'))} sub={t(b('卷积、注意力、图网络', 'convolution, attention, graphs'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="comp" label={t(b('结构搜索', 'Architecture search'))} sub={t(b('自动寻找结构，类似进化', 'automatic, evolution-like'))} size={10.5} />
      <Mod x={14} y={80} w={170} h={40} side="comp" label={t(b('初始化', 'Initialization'))} sub={t(b('按随机分布设定权重', 'weights from a random distribution'))} size={10.5} />
      <Gap x={196} y={80} w={170} h={40} label={t(b('由少量规则生成的\n发育程序', 'A developmental program\nfrom a few rules'))} />
      <Store x={14} y={142} w={170} h={56} side="comp" label={t(b('预训练', 'Pretraining'))} sub={t(b('海量数据，存成全部参数', 'huge data, stored as all weights'))} />
      <Mod x={196} y={150} w={170} h={40} side="comp" label={t(b('下游微调', 'Fine-tuning'))} sub={t(b('从起点出发很快学会', 'learns fast from the start point'))} size={10.5} />

      <Flow id={id} side="comp" pts={[[196, 34], [184, 34]]} />
      <Flow id={id} side="comp" pts={[[99, 54], [99, 80]]} />
      <Flow id={id} side="comp" pts={[[99, 120], [99, 142]]} />
      <Flow id={id} side="comp" head="read" pts={[[184, 170], [196, 170]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={80} n={2} side="comp" />
      <Num x={14} y={146} n={3} side="comp" />
      <Num x={196} y={150} n={4} side="comp" />
      <Num x={196} y={14} n={5} side="comp" />
      <Num x={196} y={80} n={6} side="comp" />
    </Svg>
  )
}

export const INNATE_FIGS: TopicFigs = {
  arch: { brain: InnateBrainArch, ai: InductiveBiasArch },
}
