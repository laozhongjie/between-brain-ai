import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import { legacyFig } from '../layer4'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Two cochleas feed the superior olive, then the inferior colliculus and thalamus, A1 and the superior temporal gyrus. */
function AuditoryPathwayArch({ t }: FigProps) {
  const id = 'f02b'
  return (
    <Svg id={id} w={380} h={310} label={t(b('听觉通路的结构与信息流：两侧耳蜗、上橄榄核、下丘与丘脑、听觉皮层中的 A1 和颞上回', 'Auditory pathway: both cochleas, superior olive, inferior colliculus and thalamus, then A1 and the superior temporal gyrus in auditory cortex'))}>
      <Mod x={14} y={14} w={110} h={40} side="bio" label={t(b('左耳蜗', 'Left cochlea'))} sub={t(b('按频率展开', 'spread by frequency'))} />
      <Mod x={256} y={14} w={110} h={40} side="bio" label={t(b('右耳蜗', 'Right cochlea'))} sub={t(b('按频率展开', 'spread by frequency'))} />
      <Mod x={110} y={80} w={160} h={40} side="bio" label={t(b('上橄榄核', 'Superior olive'))} sub={t(b('比较两耳的时间差与强度差', 'compares time and level at the ears'))} />
      <Mod x={110} y={140} w={160} h={36} side="bio" label={t(b('下丘与丘脑', 'Colliculus and thalamus'))} size={10.5} />
      <Region x={6} y={194} w={368} h={78} side="bio" label={t(b('听觉皮层', 'Auditory cortex'))} />
      <Mod x={18} y={218} w={140} h={40} side="bio" label="A1" sub={t(b('频率地图', 'frequency map'))} />
      <Mod x={222} y={218} w={140} h={40} side="bio" label={t(b('颞上回', 'Superior temporal gyrus'))} sub={t(b('语音与声音对象', 'speech and sound objects'))} size={10.5} />
      <Var cx={292} cy={292} side="bio" label={t(b('注意', 'Attn'))} />
      <T x={312} y={292} anchor="start" s={t(b('选定说话人', 'picks a talker'))} size={9} color={C.dim} />

      <Flow id={id} side="bio" fast pts={[[69, 54], [69, 100], [110, 100]]} />
      <Flow id={id} side="bio" fast pts={[[311, 54], [311, 100], [270, 100]]} />
      <Flow id={id} side="bio" pts={[[190, 120], [190, 140]]} />
      <Flow id={id} side="bio" pts={[[140, 176], [140, 218]]} />
      <Flow id={id} side="bio" pts={[[158, 238], [222, 238]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[292, 279], [292, 258]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[18, 230], [8, 230], [8, 34], [14, 34]]} />
      <T x={22} y={180} anchor="start" s={t(b('下行调节', 'descending'))} size={9} color={C.dim} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={110} y={80} n={2} side="bio" />
      <Num x={110} y={140} n={3} side="bio" />
      <Num x={18} y={218} n={4} side="bio" />
      <Num x={222} y={218} n={5} side="bio" />
      <Num x={270} y={292} n={6} side="bio" />
      <Num x={8} y={130} n={6} side="bio" />
    </Svg>
  )
}

/** A separation model (encoder, masks, decoder) feeding a recognizer (mel spectrogram, encoder, text decoder). */
function SpeechModelArch({ t }: FigProps) {
  const id = 'f02c'
  return (
    <Svg id={id} w={380} h={294} label={t(b('语音分离与语音识别模型的结构与信息流', 'Structure and information flow of speech separation and recognition models'))}>
      <Mod x={14} y={14} w={352} h={34} side="comp" label={t(b('麦克风波形', 'Microphone waveform'))} sub={t(b('单声道，每秒 16000 个采样', 'one channel, 16,000 samples per second'))} />
      <Region x={6} y={64} w={180} h={160} side="comp" label={t(b('声源分离', 'Source separation'))} />
      <Mod x={18} y={88} w={156} h={34} side="comp" label={t(b('编码器', 'Encoder'))} sub={t(b('学到的卷积', 'learned convolution'))} />
      <Mod x={18} y={132} w={156} h={34} side="comp" label={t(b('掩码估计', 'Mask estimation'))} sub={t(b('每个说话人一个掩码', 'one mask per speaker'))} />
      <Mod x={18} y={176} w={156} h={34} side="comp" label={t(b('解码器', 'Decoder'))} sub={t(b('每人一路波形', 'one waveform per speaker'))} />
      <Region x={194} y={64} w={180} h={160} side="comp" label={t(b('语音识别', 'Speech recognition'))} />
      <Mod x={206} y={88} w={156} h={34} side="comp" label={t(b('梅尔频谱', 'Mel spectrogram'))} sub={t(b('每 10 毫秒一帧', 'one frame per 10 ms'))} />
      <Mod x={206} y={132} w={156} h={34} side="comp" label={t(b('编码器', 'Encoder'))} sub="Transformer" />
      <Mod x={206} y={176} w={156} h={34} side="comp" label={t(b('文字解码器', 'Text decoder'))} sub={t(b('逐个输出词元', 'one token at a time'))} />
      <Mod x={206} y={244} w={156} h={30} side="comp" label={t(b('文字', 'Text'))} />
      <Gap x={14} y={240} w={82} h={42} label={t(b('双耳线索', 'Binaural\ncues'))} />
      <Gap x={104} y={240} w={82} h={42} label={t(b('选择听谁', 'Choosing\nwhom to hear'))} />

      <Flow id={id} side="comp" pts={[[96, 48], [96, 88]]} />
      <Flow id={id} side="comp" pts={[[284, 48], [284, 88]]} />
      <Flow id={id} side="comp" pts={[[96, 122], [96, 132]]} />
      <Flow id={id} side="comp" pts={[[96, 166], [96, 176]]} />
      <Flow id={id} side="comp" pts={[[174, 193], [190, 193], [190, 105], [206, 105]]} />
      <Flow id={id} side="comp" pts={[[284, 122], [284, 132]]} />
      <Flow id={id} side="comp" pts={[[284, 166], [284, 176]]} />
      <Flow id={id} side="comp" pts={[[284, 210], [284, 244]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={88} n={2} side="comp" />
      <Num x={206} y={88} n={2} side="comp" />
      <Num x={18} y={132} n={3} side="comp" />
      <Num x={206} y={132} n={4} side="comp" />
      <Num x={206} y={176} n={5} side="comp" />
      <Num x={14} y={240} n={6} side="comp" />
      <Num x={104} y={240} n={6} side="comp" />
    </Svg>
  )
}

export const AUDITORY_FIGS: TopicFigs = {
  arch: { brain: AuditoryPathwayArch, ai: SpeechModelArch },
  math: {
    bio: {
      0: {
        ...legacyFig('sys-hearing', 'brain'),
        cap: b('听觉通路：耳蜗把声音按频率展开，脑干比较两只耳朵的时间差来定位，再经丘脑到 A1 的频率地图，最后到颞上回处理语音和音乐。', 'Hearing: the cochlea spreads sound by frequency and the brainstem compares the two ears to localize. Signals then pass through the thalamus to the frequency map of A1 and on to the superior temporal gyrus for speech and music.'),
      },
    },
    comp: { 0: legacyFig('sys-hearing', 'ai') },
  },
}
