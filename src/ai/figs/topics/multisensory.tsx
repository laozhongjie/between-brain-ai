import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Var } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Three senses feed the superior colliculus and association cortex; reliability weighting and a common-source
 *  judgment produce one percept, which feeds back to the senses. */
function MultisensoryArch({ t }: FigProps) {
  const id = 'f03b'
  return (
    <Svg id={id} w={380} h={272} label={t(b('多感官整合回路的结构与信息流', 'Structure and information flow of multisensory integration circuits'))}>
      <Mod x={14} y={14} w={108} h={38} side="bio" label={t(b('视觉', 'Vision'))} sub={t(b('以眼为中心', 'eye-centered'))} />
      <Mod x={136} y={14} w={108} h={38} side="bio" label={t(b('听觉', 'Hearing'))} sub={t(b('以头为中心', 'head-centered'))} />
      <Mod x={258} y={14} w={108} h={38} side="bio" label={t(b('触觉', 'Touch'))} sub={t(b('以身体为中心', 'body-centered'))} />
      <Mod x={14} y={84} w={120} h={42} side="bio" label={t(b('上丘', 'Sup. colliculus'))} sub={t(b('视听触地图对齐', 'maps aligned'))} />
      <Mod x={150} y={84} w={216} h={42} side="bio" label={t(b('联合皮层', 'Association cortex'))} sub={t(b('颞上沟、顶叶：换到共同坐标', 'STS, parietal: one shared frame'))} />
      <Var cx={74} cy={170} side="bio" label={t(b('转向', 'Orient'))} r={15} />
      <Mod x={150} y={152} w={100} h={42} side="bio" label={t(b('可靠性加权', 'Reliability'))} sub={t(b('可靠的权重大', 'reliable weighs more'))} size={10.5} />
      <Mod x={266} y={152} w={100} h={42} side="bio" label={t(b('同源判断', 'Common source?'))} sub={t(b('合并或分开', 'merge or keep apart'))} size={10.5} />
      <Mod x={150} y={222} w={216} h={36} side="bio" label={t(b('合并后的知觉', 'Combined percept'))} />

      <Flow id={id} side="bio" fast pts={[[50, 52], [50, 84]]} />
      <Flow id={id} side="bio" fast pts={[[160, 52], [160, 68], [100, 68], [100, 84]]} />
      <Flow id={id} side="bio" pts={[[200, 52], [200, 84]]} />
      <Flow id={id} side="bio" pts={[[312, 52], [312, 84]]} />
      <Flow id={id} side="bio" pts={[[74, 126], [74, 155]]} />
      <Flow id={id} side="bio" pts={[[200, 126], [200, 152]]} />
      <Flow id={id} side="bio" pts={[[316, 126], [316, 152]]} />
      <Flow id={id} side="bio" pts={[[200, 194], [200, 222]]} />
      <Flow id={id} side="bio" pts={[[316, 194], [316, 222]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[150, 240], [8, 240], [8, 33], [14, 33]]} label={t(b('反馈', 'feedback'))} ly={-7} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={14} y={84} n={2} side="bio" />
      <Num x={150} y={84} n={3} side="bio" />
      <Num x={150} y={152} n={4} side="bio" />
      <Num x={266} y={152} n={5} side="bio" />
      <Num x={110} y={240} n={6} side="bio" />
    </Svg>
  )
}

/** One encoder per modality, projection into a shared space, contrastive alignment in training and fusion into a language model. */
function MultimodalModelArch({ t }: FigProps) {
  const id = 'f03c'
  return (
    <Svg id={id} w={380} h={296} label={t(b('多模态模型的结构与信息流', 'Structure and information flow of a multimodal model'))}>
      <Mod x={14} y={14} w={108} h={30} side="comp" label={t(b('图像', 'Image'))} size={10.5} />
      <Mod x={136} y={14} w={108} h={30} side="comp" label={t(b('声音', 'Audio'))} size={10.5} />
      <Mod x={258} y={14} w={108} h={30} side="comp" label={t(b('文字', 'Text'))} size={10.5} />
      <Mod x={14} y={70} w={108} h={36} side="comp" label={t(b('图像编码器', 'Image encoder'))} sub="ViT" size={10.5} />
      <Mod x={136} y={70} w={108} h={36} side="comp" label={t(b('音频编码器', 'Audio encoder'))} sub={t(b('频谱 Transformer', 'spectrogram transformer'))} size={10.5} />
      <Mod x={258} y={70} w={108} h={36} side="comp" label={t(b('文本编码器', 'Text encoder'))} sub="Transformer" size={10.5} />
      <Mod x={14} y={132} w={352} h={34} side="comp" label={t(b('投影到共享空间', 'Projection into a shared space'))} sub={t(b('长度为 1 的向量，可用点积比较', 'unit vectors, compared by dot product'))} />
      <Mod x={14} y={190} w={170} h={38} side="comp" label={t(b('对比对齐', 'Contrastive alignment'))} sub={t(b('训练时配对拉近', 'pairs pulled together in training'))} size={10.5} />
      <Mod x={196} y={190} w={170} h={38} side="comp" label={t(b('融合进语言模型', 'Fusion into an LLM'))} sub={t(b('额外词元或交叉注意力', 'extra tokens or cross-attention'))} size={10.5} />
      <Mod x={196} y={252} w={170} h={30} side="comp" label={t(b('输出', 'Output'))} size={10.5} />
      <Gap x={14} y={246} w={80} h={42} label={t(b('可靠性\n估计', 'Reliability\nestimate'))} />
      <Gap x={104} y={246} w={80} h={42} label={t(b('同源判断', 'Common\nsource?'))} />

      <Flow id={id} side="comp" pts={[[68, 44], [68, 70]]} />
      <Flow id={id} side="comp" pts={[[190, 44], [190, 70]]} />
      <Flow id={id} side="comp" pts={[[312, 44], [312, 70]]} />
      <Flow id={id} side="comp" pts={[[68, 106], [68, 132]]} />
      <Flow id={id} side="comp" pts={[[190, 106], [190, 132]]} />
      <Flow id={id} side="comp" pts={[[312, 106], [312, 132]]} />
      <Flow id={id} side="comp" pts={[[99, 166], [99, 190]]} />
      <Flow id={id} side="comp" pts={[[281, 166], [281, 190]]} />
      <Flow id={id} side="comp" pts={[[281, 228], [281, 252]]} />
      <Num x={14} y={70} n={1} side="comp" />
      <Num x={14} y={132} n={2} side="comp" />
      <Num x={14} y={190} n={3} side="comp" />
      <Num x={196} y={190} n={4} side="comp" />
      <Num x={196} y={252} n={5} side="comp" />
      <Num x={14} y={246} n={6} side="comp" />
      <Num x={104} y={246} n={6} side="comp" />
    </Svg>
  )
}

/** Time scales of multisensory integration and of multimodal models, from milliseconds to years. */
function MultisensoryTimeline({ t }: FigProps) {
  const id = 'f03d'
  const ticks: [number, Bi][] = [[150, b('10 毫秒', '10 ms')], [240, b('100 毫秒', '100 ms')], [330, b('1 秒', '1 s')], [420, b('1 分钟', '1 min')], [500, b('1 小时', '1 h')], [570, b('1 天', '1 day')], [630, b('1 周', '1 week')], [690, b('1 年', '1 year')], [750, b('10 年', '10 years')]]
  return (
    <Svg id={id} w={760} h={250} label={t(b('多感官整合与多模态模型的时间尺度', 'Time scales of multisensory integration and multimodal models'))}>
      <T x={16} y={44} anchor="start" s={t(b('多感官\n整合回路', 'Multisensory\ncircuits'))} size={10.5} color={C.pinkD} weight={600} />
      <T x={16} y={176} anchor="start" s={t(b('多模态模型', 'Multimodal\nmodels'))} size={10.5} color={C.skyD} weight={600} />

      {/* biological lane */}
      <Mod x={150} y={26} w={90} h={36} side="bio" label={t(b('神经整合', 'Integration'))} sub={t(b('几十毫秒', 'tens of ms'))} size={10.5} />
      <Mod x={240} y={26} w={90} h={36} side="bio" label={t(b('时间绑定窗口', 'Binding window'))} sub={t(b('一两百毫秒', '100 to 200 ms'))} size={10} />
      <Mod x={400} y={26} w={80} h={36} side="bio" label={t(b('再校准', 'Recalibration'))} sub={t(b('几分钟', 'minutes'))} size={10} />
      <Mod x={640} y={26} w={110} h={36} side="bio" label={t(b('发育', 'Development'))} sub={t(b('约 8 到 10 岁成熟', 'mature by 8 to 10 years'))} size={10.5} />

      {/* time axis */}
      <line x1={140} y1={100} x2={752} y2={100} stroke={C.line} strokeWidth={1} />
      {ticks.map(([x, l]) => (
        <g key={x}>
          <line x1={x} y1={96} x2={x} y2={104} stroke={C.dim} strokeWidth={1} />
          <T x={x} y={115} s={t(l)} size={9.5} color={C.dim} />
        </g>
      ))}

      {/* computational lane */}
      <Mod x={150} y={150} w={90} h={36} side="comp" label={t(b('推理', 'Inference'))} sub={t(b('一次前向计算', 'one forward pass'))} size={10.5} />
      <Mod x={570} y={150} w={80} h={36} side="comp" label={t(b('训练', 'Training'))} sub={t(b('确定对齐', 'sets alignment'))} size={10.5} />
      <Gap x={330} y={202} w={420} h={30} label={t(b('使用中不再校准权重与延迟', 'No recalibration of weights or delays in use'))} />
      <Num x={150} y={26} n={1} side="bio" />
      <Num x={240} y={26} n={2} side="bio" />
      <Num x={400} y={26} n={3} side="bio" />
      <Num x={640} y={26} n={4} side="bio" />
      <Num x={150} y={150} n={1} side="comp" />
      <Num x={570} y={150} n={2} side="comp" />
      <Num x={330} y={202} n={3} side="comp" />
    </Svg>
  )
}

export const MULTISENSORY_FIGS: TopicFigs = {
  arch: { brain: MultisensoryArch, ai: MultimodalModelArch },
  dynamics: MultisensoryTimeline,
}
