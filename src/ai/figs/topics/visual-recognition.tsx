import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Retina, LGN and V1 on top; the ventral stream (V2/V4 to IT) and the dorsal stream (MT to parietal) below. */
function VisualStreamsArch({ t }: FigProps) {
  const id = 'f01b'
  return (
    <Svg id={id} w={380} h={306} label={t(b('视觉通路的结构与信息流：视网膜、LGN、V1，腹侧通路的 V2、V4 和 IT，背侧通路的 MT 和顶叶', 'Visual pathways: retina, LGN and V1, then V2, V4 and IT in the ventral stream and MT and parietal cortex in the dorsal stream'))}>
      <Mod x={18} y={14} w={84} h={38} side="bio" label={t(b('视网膜', 'Retina'))} sub={t(b('光变成电信号', 'light to pulses'))} />
      <Mod x={128} y={14} w={64} h={38} side="bio" label="LGN" sub={t(b('丘脑', 'thalamus'))} />
      <Mod x={218} y={14} w={148} h={38} side="bio" label="V1" sub={t(b('边缘与方向', 'edges and orientation'))} />
      <Region x={10} y={76} w={362} h={88} side="bio" label={t(b('腹侧通路', 'Ventral stream'))} />
      <Mod x={24} y={102} w={120} h={46} side="bio" label="IT" sub={t(b('物体与面孔', 'objects and faces'))} />
      <Mod x={214} y={102} w={120} h={46} side="bio" label={t(b('V2、V4', 'V2, V4'))} sub={t(b('角、曲线、纹理', 'corners, curves, texture'))} />
      <Region x={10} y={180} w={362} h={80} side="bio" label={t(b('背侧通路', 'Dorsal stream'))} />
      <Mod x={24} y={204} w={120} h={42} side="bio" label={t(b('顶叶', 'Parietal cortex'))} sub={t(b('位置与动作', 'location and action'))} />
      <Mod x={214} y={204} w={120} h={42} side="bio" label="MT" sub={t(b('运动方向', 'motion direction'))} />
      <Var cx={84} cy={287} side="bio" label={t(b('眼动', 'Eyes'))} />
      <T x={104} y={287} anchor="start" s={t(b('扫视，每秒约 3 次', 'saccades, about 3 per second'))} size={9} color={C.dim} />

      <Flow id={id} side="bio" fast pts={[[102, 33], [128, 33]]} />
      <Flow id={id} side="bio" fast pts={[[192, 33], [218, 33]]} />
      <Flow id={id} side="bio" pts={[[300, 52], [300, 102]]} />
      <Flow id={id} side="bio" pts={[[214, 125], [144, 125]]} />
      <Flow id={id} side="bio" pts={[[352, 52], [352, 225], [334, 225]]} />
      <Flow id={id} side="bio" pts={[[214, 225], [144, 225]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[84, 102], [84, 64], [250, 64], [250, 52]]} at={1} label={t(b('反馈', 'feedback'))} ly={8} />
      <Flow id={id} side="bio" pts={[[84, 246], [84, 274]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[71, 287], [4, 287], [4, 33], [18, 33]]} />
      <Num x={18} y={14} n={1} side="bio" />
      <Num x={218} y={14} n={2} side="bio" />
      <Num x={214} y={102} n={3} side="bio" />
      <Num x={24} y={102} n={4} side="bio" />
      <Num x={214} y={204} n={5} side="bio" />
      <Num x={118} y={64} n={6} side="bio" />
      <Num x={62} y={274} n={6} side="bio" />
    </Svg>
  )
}

/** CNN and ViT side by side: pixels in, local convolutions or patch attention, a feature vector, a classifier. */
function VisionModelArch({ t }: FigProps) {
  const id = 'f01c'
  return (
    <Svg id={id} w={380} h={320} label={t(b('CNN 与 ViT 的结构与信息流', 'Structure and information flow of a CNN and a ViT'))}>
      <Mod x={14} y={14} w={352} h={36} side="comp" label={t(b('图像', 'Image'))} sub={t(b('像素数组，例如 224 × 224 × 3', 'pixel array, e.g. 224 × 224 × 3'))} />
      <Region x={8} y={68} w={178} h={132} side="comp" label="CNN" />
      <Mod x={20} y={94} w={154} h={38} side="comp" label={t(b('卷积层', 'Convolution'))} sub={t(b('局部模板扫过全图', 'local template over the image'))} />
      <Mod x={20} y={148} w={154} h={40} side="comp" label={t(b('池化与深层卷积', 'Pooling, deeper layers'))} sub={t(b('感受野逐层扩大', 'receptive fields grow'))} />
      <Region x={194} y={68} w={178} h={132} side="comp" label="ViT" />
      <Mod x={206} y={94} w={154} h={38} side="comp" label={t(b('图块嵌入', 'Patch embedding'))} sub={t(b('16 × 16 像素一块', '16 × 16 pixels each'))} />
      <Mod x={206} y={148} w={154} h={40} side="comp" label={t(b('自注意力层', 'Self-attention'))} sub={t(b('每块与所有块比较', 'every patch with every patch'))} />
      <Mod x={120} y={216} w={140} h={32} side="comp" label={t(b('特征向量', 'Feature vector'))} />
      <Mod x={120} y={268} w={140} h={40} side="comp" label={t(b('分类头', 'Classifier'))} sub={t(b('softmax 输出类别概率', 'softmax class probabilities'))} />
      <Gap x={14} y={268} w={92} h={40} label={t(b('眼动', 'Eye\nmovements'))} />
      <Gap x={274} y={268} w={92} h={40} label={t(b('自上而下\n反馈', 'Top-down\nfeedback'))} />

      <Flow id={id} side="comp" pts={[[97, 50], [97, 94]]} />
      <Flow id={id} side="comp" pts={[[283, 50], [283, 94]]} />
      <Flow id={id} side="comp" pts={[[97, 132], [97, 148]]} />
      <Flow id={id} side="comp" pts={[[283, 132], [283, 148]]} />
      <Flow id={id} side="comp" pts={[[97, 188], [97, 232], [120, 232]]} />
      <Flow id={id} side="comp" pts={[[283, 188], [283, 232], [260, 232]]} />
      <Flow id={id} side="comp" pts={[[190, 248], [190, 268]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={20} y={94} n={2} side="comp" />
      <Num x={20} y={148} n={3} side="comp" />
      <Num x={206} y={94} n={4} side="comp" />
      <Num x={120} y={216} n={5} side="comp" />
      <Num x={14} y={268} n={6} side="comp" />
      <Num x={274} y={268} n={6} side="comp" />
    </Svg>
  )
}

/** One act of recognition over the first 300 ms in both systems, on a shared linear time axis. */
function RecognitionTimeline({ t }: FigProps) {
  const id = 'f01d'
  const x = (ms: number) => 150 + ms * 2
  const ticks = [0, 50, 100, 150, 200, 250, 300]
  return (
    <Svg id={id} w={760} h={250} label={t(b('一次识别在两个系统中的时间进程', 'One act of recognition over time in both systems'))}>
      <T x={16} y={46} anchor="start" s={t(b('腹侧与背侧\n视觉通路', 'Ventral and\ndorsal streams'))} size={10.5} color={C.pinkD} weight={600} />
      <T x={16} y={180} anchor="start" s={t(b('CNN 与 ViT', 'CNNs and ViTs'))} size={10.5} color={C.skyD} weight={600} />

      {/* biological lane */}
      <Mod x={x(0)} y={26} w={x(100) - x(0)} h={36} side="bio" label={t(b('前馈扫过', 'Feedforward sweep'))} sub={t(b('视网膜、V1 到 IT', 'retina, V1, IT'))} />
      <Mod x={x(100)} y={26} w={x(200) - x(100)} h={36} side="bio" label={t(b('循环细化', 'Recurrent refinement'))} sub={t(b('难识别的图像', 'hard images'))} />
      <Mod x={x(250)} y={26} w={x(300) - x(250)} h={36} side="bio" label={t(b('扫视', 'Saccade'))} sub={t(b('输入更新', 'new input'))} size={10} />
      <Flow id={id} side="bio" kind="fb" pts={[[x(200), 44], [x(250), 44]]} />
      {([[50, b('V1 响应', 'V1 responds')], [100, b('IT 可读出类别', 'IT carries category')]] as [number, Bi][]).map(([ms, l]) => (
        <g key={ms}>
          <line x1={x(ms)} y1={64} x2={x(ms)} y2={76} stroke={C.pinkD} strokeWidth={1} strokeDasharray="2 2" />
          <T x={x(ms)} y={86} s={t(l)} size={9} color={C.pinkD} />
        </g>
      ))}

      {/* shared time axis */}
      <line x1={140} y1={112} x2={750} y2={112} stroke={C.line} strokeWidth={1} />
      <T x={132} y={127} anchor="end" s={t(b('毫秒', 'ms'))} size={9.5} color={C.dim} />
      {ticks.map((ms) => (
        <g key={ms}>
          <line x1={x(ms)} y1={108} x2={x(ms)} y2={116} stroke={C.dim} strokeWidth={1} />
          <T x={x(ms)} y={127} s={String(ms)} size={9.5} color={C.dim} />
        </g>
      ))}

      {/* computational lane */}
      <Mod x={x(0)} y={158} w={10} h={36} side="comp" label="" />
      <T x={x(0)} y={146} anchor="start" s={t(b('一次前向计算，约几毫秒', 'One forward pass, a few ms'))} size={9.5} color={C.skyD} />
      <Mod x={x(40)} y={158} w={x(300) - x(40)} h={36} side="comp" label={t(b('输出固定', 'Fixed output'))} sub={t(b('不再更新，同一张图再算一次结果相同', 'never updates, and the same image gives the same result'))} />
      <Flow id={id} side="comp" pts={[[x(0) + 10, 176], [x(40), 176]]} />
      <Gap x={x(100)} y={206} w={x(300) - x(100)} h={30} label={t(b('没有循环细化与眼动', 'No recurrent refinement, no eye movements'))} />
      <Num x={x(0)} y={26} n={1} side="bio" />
      <Num x={x(100)} y={26} n={2} side="bio" />
      <Num x={x(250)} y={26} n={3} side="bio" />
      <Num x={x(0)} y={158} n={1} side="comp" />
      <Num x={x(40)} y={158} n={2} side="comp" />
      <Num x={x(100)} y={206} n={3} side="comp" />
    </Svg>
  )
}

export const VISUAL_FIGS: TopicFigs = {
  arch: { brain: VisualStreamsArch, ai: VisionModelArch },
  dynamics: RecognitionTimeline,
}
