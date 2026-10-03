import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num } from '../grammar'
import { Axes, Bar, Label, SIDE_COLOR, Vec, px, py, type Frame } from '../plot'
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

/** The valence–arousal plane with the worked example's three emotions and a few others placed by convention. */
function CircumplexPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const cx = 120, cy = 100, R = 76
  const pts: [number, number, string, boolean][] = [
    [0.7, 0.7, t(b('兴奋', 'excited')), true], [0.6, -0.6, t(b('平静', 'calm')), true], [-0.7, 0.7, t(b('愤怒', 'angry')), true],
    [-0.55, 0.85, t(b('恐惧', 'afraid')), false], [0.9, 0.15, t(b('高兴', 'happy')), false], [-0.75, -0.45, t(b('悲伤', 'sad')), false], [-0.2, -0.85, t(b('无聊', 'bored')), false],
  ]
  return (
    <Svg id="f32mb0" w={380} h={200} label={t(b('情绪的二维空间：横轴愉快程度，纵轴激动程度；愤怒和恐惧挨得很近', 'The two-dimensional space of emotion: valence across, arousal up; anger and fear sit close together'))}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.line} strokeDasharray="2 3" />
      <Vec x1={cx - R - 10} y1={cy} x2={cx + R + 14} y2={cy} color={C.dim} width={1.1} />
      <Vec x1={cx} y1={cy + R + 10} x2={cx} y2={cy - R - 14} color={C.dim} width={1.1} />
      <Label x={cx + R + 16} y={cy + 12} s={t(b('愉快 v', 'valence v'))} anchor="end" size={10} />
      <Label x={cx + 6} y={cy - R - 10} s={t(b('激动 a', 'arousal a'))} anchor="start" size={10} />
      {pts.map(([v, a, s, ex]) => (
        <g key={s}>
          <circle cx={cx + v * R} cy={cy - a * R} r={ex ? 4 : 3} fill={ex ? col : C.dim} />
          <Label x={cx + v * R + (v >= 0 ? 7 : -7)} y={cy - a * R} s={s} anchor={v >= 0 ? 'start' : 'end'} size={10} color={ex ? col : C.dim} />
        </g>
      ))}
      <Label x={236} y={56} s={t(b('粉点：小例子中的三种情绪', 'pink: from the example'))} anchor="start" size={10} color={col} />
      <Label x={236} y={92} s={t(b('方向 φ 表示情绪的种类，\n距离 r 表示强度', 'the angle φ gives the kind,\nthe distance r the strength'))} anchor="start" size={10} />
      <Label x={236} y={142} s={t(b('愤怒与恐惧都在左上方，\n只看激动程度分不开', 'anger and fear both sit up\nleft; arousal alone cannot\ntell them apart'))} anchor="start" size={10} />
    </Svg>
  )
}

/** Context sets the prior: an ambiguous tearful face is equally likely under sadness and joy, so the judgment follows the
 * context: 0.9 sad at a funeral, 0.9 joy at a wedding. */
function ContextPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const f1: Frame = { x: 44, y: 34, w: 130, h: 110, xr: [0.4, 2.6], yr: [0, 1] }
  const f2: Frame = { x: 228, y: 34, w: 130, h: 110, xr: [0.4, 2.6], yr: [0, 1] }
  const panel = (f: Frame, title: string, sad: number) => (
    <g>
      <Axes f={f} xTicks={[[1, t(b('悲伤', 'sad'))], [2, t(b('喜悦', 'joy'))]]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} grid />
      <Label x={f.x + f.w / 2} y={f.y - 14} s={title} color={C.ink} />
      <Bar f={f} x={0.8} v={0.5} w={0.32} color={C.dim} />
      <Bar f={f} x={1.8} v={0.5} w={0.32} color={C.dim} />
      <Bar f={f} x={1.2} v={sad} w={0.32} color={col} />
      <Bar f={f} x={2.2} v={1 - sad} w={0.32} color={col} />
      <Label x={px(f, 1.2)} y={py(f, sad) - 8} s={sad.toFixed(1)} size={10} color={col} />
      <Label x={px(f, 2.2)} y={py(f, 1 - sad) - 8} s={(1 - sad).toFixed(1)} size={10} color={col} />
    </g>
  )
  return (
    <Svg id="f32mb1" w={380} h={196} label={t(b('情境决定判断：同一张含糊的流泪面孔，在葬礼上读成悲伤，在婚礼上读成喜极而泣', 'Context decides: the same ambiguous tearful face reads as sadness at a funeral and as tears of joy at a wedding'))}>
      {panel(f1, t(b('葬礼', 'Funeral')), 0.9)}
      {panel(f2, t(b('婚礼', 'Wedding')), 0.1)}
      <rect x={60} y={178} width={10} height={10} fill={C.dim} fillOpacity={0.35} stroke={C.dim} />
      <Label x={76} y={183} s={t(b('面孔本身：两种情绪一样可能', 'face alone: both equally likely'))} anchor="start" size={9.5} />
      <rect x={250} y={178} width={10} height={10} fill={col} fillOpacity={0.35} stroke={col} />
      <Label x={266} y={183} s={t(b('加上情境后的判断', 'judgment with context'))} anchor="start" size={9.5} color={col} />
    </Svg>
  )
}

export const EMOTION_UNDERSTANDING_FIGS: TopicFigs = {
  arch: { brain: EmpathyBrainArch, ai: AffectiveComputingArch },
  math: {
    bio: {
      0: { Fig: CircumplexPlot, cap: b('每种情绪是愉快 × 激动平面上的一个点（位置按惯例示意）。小例子中兴奋在 $45°$、平静在 $-45°$、愤怒在 $135°$。愤怒和恐惧都在左上方，彼此很近，所以只看身体的唤醒很难区分，需要情境来解释。', 'Each emotion is a point on the valence × arousal plane (positions illustrative, by convention). In the worked example excitement sits at $45°$, calm at $-45°$ and anger at $135°$. Anger and fear are both up and to the left, close together, so bodily arousal alone hardly separates them and context has to interpret it.') },
      1: { Fig: ContextPlot, cap: b('小例子：一张含糊的流泪面孔在悲伤和喜悦下出现的可能性相同（灰），所以判断完全由情境的先验决定（粉）：葬礼上悲伤 $0.9$，婚礼上喜悦 $0.9$。面孔越明确，灰柱差得越多，情境的作用就越小。', 'The worked example: an ambiguous tearful face is equally likely under sadness and joy (gray), so the judgment follows the context’s prior entirely (pink): $0.9$ sad at a funeral, $0.9$ joy at a wedding. The clearer the face, the more the gray bars differ and the less the context matters.') },
    },
  },
}
