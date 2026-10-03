import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import { Axes, Dot, Heat, Label, Path, SIDE_COLOR, px, py, trace, type Frame } from '../plot'
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

const erb = (f: number) => 24.7 * ((4.37 * f) / 1000 + 1)

/** The cochlear filter bank on a linear frequency axis: each filter as wide as ERB(f), one every two ERBs. */
function ErbBankPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 40, y: 30, w: 318, h: 110, xr: [0, 8000], yr: [0, 1.25] }
  const centers = Array.from({ length: 16 }, (_, k) => (Math.pow(10, (3 + 2 * k) / 21.4) - 1) / 0.00437).filter((c) => c < 7600)
  const bump = (c: number) => (x: number) => { const s = erb(c) / Math.sqrt(2 * Math.PI); return Math.exp(-((x - c) ** 2) / (2 * s * s)) }
  const mark = (c: number, s: string) => {
    const w = erb(c), y = py(f, 1.08)
    return (
      <g>
        <line x1={px(f, c - w / 2)} x2={px(f, c + w / 2)} y1={y} y2={y} stroke={col} strokeWidth={1.4} />
        <Label x={px(f, c - w / 2) - 4} y={y - 9} s={s} size={10} color={col} anchor="start" />
      </g>
    )
  }
  return (
    <Svg id="f02mb0" w={380} h={194} label={t(b('耳蜗滤波器组：低频滤波器窄，高频滤波器宽', 'The cochlear filter bank: narrow filters at low frequencies, wide ones at high frequencies'))}>
      <Axes f={f} xTicks={[[0, '0'], [1000, '1k'], [2000, '2k'], [4000, '4k'], [6000, '6k'], [8000, '8k']]} xLabel={t(b('频率（赫兹）', 'Frequency (Hz)'))} yLabel={t(b('滤波器的响应', 'Filter response'))} />
      {centers.map((c) => <Path key={c} pts={trace(f, bump(c), Math.max(0, c - 3 * erb(c)), Math.min(8000, c + 3 * erb(c)), 80)} color={col} width={1.1} opacity={0.35} />)}
      <Path pts={trace(f, bump(1000), 600, 1400, 80)} color={col} width={2} />
      <Path pts={trace(f, bump(4000), 2700, 5300, 80)} color={col} width={2} />
      {mark(1000, t(b('1000 赫兹：宽 133', '1000 Hz: 133 wide')))}
      {mark(4000, t(b('4000 赫兹：宽 456', '4000 Hz: 456 wide')))}
    </Svg>
  )
}

/** Interaural time difference against direction, extended behind the head by symmetry: front and back give the same value. */
function ItdPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const f: Frame = { x: 46, y: 30, w: 300, h: 120, xr: [0, 180], yr: [0, 0.75] }
  const itd = (deg: number) => { const a = (Math.min(deg, 180 - deg) * Math.PI) / 180; return (0.0875 / 343) * (a + Math.sin(a)) * 1000 }
  const d30 = itd(30)
  return (
    <Svg id="f02mb1" w={380} h={194} label={t(b('两耳时间差随方向变化：正侧方最大约 0.66 毫秒，前后对称的方向时间差相同', 'Interaural time difference by direction: at most about 0.66 ms to the side, and the same for mirrored front and back directions'))}>
      <Axes f={f} xTicks={[[0, '0'], [30, '30'], [90, '90'], [150, '150'], [180, '180']]} yTicks={[[0, '0'], [0.33, '0.33'], [0.66, '0.66']]}
        xLabel={t(b('声源方向（度）：0 正前方，90 正侧方，180 正后方', 'Direction (°): 0 front, 90 side, 180 back'))} yLabel={t(b('时间差（毫秒）', 'Time difference (ms)'))} grid />
      <Path pts={trace(f, itd)} color={col} />
      <line x1={px(f, 30)} x2={px(f, 150)} y1={py(f, d30)} y2={py(f, d30)} stroke={C.lemonD} strokeDasharray="3 3" />
      <Dot f={f} x={30} y={d30} color={C.lemonD} />
      <Dot f={f} x={150} y={d30} color={C.lemonD} />
      <Label x={px(f, 90)} y={py(f, d30) + 12} s={t(b('前方 30° 与后方 150° 的时间差相同', '30° in front and 150° behind give the same difference'))} size={10} color={C.lemonD} />
      <Dot f={f} x={90} y={itd(90)} color={col} />
      <Label x={px(f, 90)} y={py(f, itd(90)) - 10} s={t(b('最大 0.66 毫秒', 'at most 0.66 ms'))} size={10} color={col} />
    </Svg>
  )
}

/** The mel scale against frequency, and the triangular mel filters it spaces evenly. */
function MelPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const mel = (hz: number) => 2595 * Math.log10(1 + hz / 700)
  const hz = (m: number) => 700 * (Math.pow(10, m / 2595) - 1)
  const f: Frame = { x: 46, y: 30, w: 300, h: 110, xr: [0, 8000], yr: [0, 3000] }
  const f2: Frame = { x: 46, y: 176, w: 300, h: 26, xr: [0, 8000], yr: [0, 1] }
  const m8 = mel(8000), k = 20
  const edges = Array.from({ length: k + 2 }, (_, i) => hz((m8 * i) / (k + 1)))
  return (
    <Svg id="f02mc0" w={380} h={230} label={t(b('梅尔刻度：频率高 4 倍，梅尔值只增加约一倍；均匀的梅尔滤波器在赫兹轴上越来越宽', 'The mel scale: four times the frequency only about doubles the mel value, so even mel filters widen along the hertz axis'))}>
      <Axes f={f} xTicks={[[0, '0'], [1000, '1k'], [2000, '2k'], [4000, '4k'], [6000, '6k'], [8000, '8k']]} yTicks={[[0, '0'], [1000, '1000'], [2000, '2000'], [3000, '3000']]}
        yLabel={t(b('梅尔', 'Mel'))} grid />
      <Path pts={trace(f, (x) => x, 0, 3000, 2)} color={C.dim} width={1} dashed />
      <Label x={px(f, 3000) + 6} y={py(f, 2950)} s={t(b('梅尔 = 赫兹', 'mel = Hz'))} size={10} anchor="start" />
      <Path pts={trace(f, mel)} color={col} />
      <Dot f={f} x={1000} y={mel(1000)} color={col} />
      <Dot f={f} x={4000} y={mel(4000)} color={col} />
      <Label x={px(f, 1000) + 8} y={py(f, mel(1000)) + 10} s="1000" anchor="start" size={10} color={col} />
      <Label x={px(f, 4000)} y={py(f, mel(4000)) + 13} s="2146" size={10} color={col} />
      <line x1={f2.x} x2={f2.x + f2.w} y1={f2.y + f2.h} y2={f2.y + f2.h} stroke={C.dim} />
      {edges.slice(0, k).map((e, i) => (
        <polyline key={i} points={`${px(f2, e)},${py(f2, 0)} ${px(f2, edges[i + 1])},${py(f2, 1)} ${px(f2, edges[i + 2])},${py(f2, 0)}`} fill="none" stroke={col} strokeOpacity={0.7} strokeWidth={1} />
      ))}
      <Label x={f2.x - 4} y={f2.y - 10} s={t(b('20 个梅尔滤波器', '20 mel filters'))} anchor="start" size={10} />
      <Label x={f2.x + f2.w / 2} y={f2.y + f2.h + 14} s={t(b('频率（赫兹）', 'Frequency (Hz)'))} />
    </Svg>
  )
}

/** A two-speaker mixture and the ideal masks: each time-frequency point goes to the louder speaker. Illustrative sources. */
function MaskPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const R = 10, Tn = 14
  const A = (r: number, c: number) => (c < 10 ? 1 : 0.1) * Math.exp(-(((r - 7.5) / 1.3) ** 2)) * (0.6 + 0.4 * Math.sin(c / 1.7))
  const B = (r: number, c: number) => (c > 3 ? 1 : 0.1) * Math.exp(-(((r - 2.5 - 0.15 * c) / 1.2) ** 2)) * (0.6 + 0.4 * Math.cos(c / 1.3))
  const grid = (fn: (r: number, c: number) => number) => Array.from({ length: R }, (_, r) => Array.from({ length: Tn }, (_, c) => fn(R - 1 - r, c)))
  const mix = grid((r, c) => A(r, c) + B(r, c))
  const top = Math.max(...mix.flat())
  const mA = grid((r, c) => A(r, c) / (A(r, c) + B(r, c) + 1e-3))
  const mB = grid((r, c) => B(r, c) / (A(r, c) + B(r, c) + 1e-3))
  const cell = 8, y0 = 34, xs = [10, 136, 262]
  return (
    <Svg id="f02mc1" w={380} h={160} label={t(b('掩码分离：混合频谱的每一点按谁更响分给两个说话人', 'Mask separation: each point of the mixture goes to whichever speaker is louder there'))}>
      <Heat x={xs[0]} y={y0} cell={cell} vals={mix.map((row) => row.map((v) => v / top))} pos={C.ink} />
      <Heat x={xs[1]} y={y0} cell={cell} vals={mA} pos={col} />
      <Heat x={xs[2]} y={y0} cell={cell} vals={mB} pos={C.lemonD} />
      <Label x={xs[0] + 56} y={y0 - 14} s={t(b('混合频谱', 'Mixture'))} color={C.ink} />
      <Label x={xs[1] + 56} y={y0 - 14} s={t(b('A 的掩码', 'Mask for A'))} color={col} />
      <Label x={xs[2] + 56} y={y0 - 14} s={t(b('B 的掩码', 'Mask for B'))} color={C.lemonD} />
      <Label x={xs[0] + 56} y={y0 + R * cell + 14} s={t(b('时间 →　频率 ↑', 'time →  frequency ↑'))} size={10} />
      <Label x={xs[1] + 56} y={y0 + R * cell + 14} s={t(b('A 更响处接近 1', 'near 1 where A is louder'))} size={10} />
      <Label x={xs[2] + 56} y={y0 + R * cell + 14} s={t(b('两个掩码相加为 1', 'the two masks add to 1'))} size={10} />
    </Svg>
  )
}

export const AUDITORY_FIGS: TopicFigs = {
  arch: { brain: AuditoryPathwayArch, ai: SpeechModelArch },
  math: {
    bio: {
      0: { Fig: ErbBankPlot, cap: b('每条曲线是耳蜗上一个位置的滤波器，宽度等于 $\\mathrm{ERB}(f)$，每隔两个 ERB 画一个。$1000$ 赫兹处宽约 $133$ 赫兹，$4000$ 赫兹处宽约 $456$ 赫兹，所以低频分得细、高频分得粗。', 'Each curve is the filter at one place on the cochlea, as wide as $\\mathrm{ERB}(f)$, one drawn every two ERBs. At $1000$ Hz it is about $133$ Hz wide and at $4000$ Hz about $456$ Hz, so low frequencies are split finely and high ones coarsely.') },
      1: { Fig: ItdPlot, cap: b('时间差从正前方的 $0$ 增加到正侧方的约 $0.66$ 毫秒，起点附近每度约 $9$ 微秒。声源转到身后，时间差按对称的方式减小，所以前方 $30°$ 和后方 $150°$ 产生同样的时间差，只靠它会前后混淆。', 'The difference grows from $0$ straight ahead to about $0.66$ ms at the side, about $9$ µs per degree near the front. Behind the head it shrinks symmetrically, so $30°$ in front and $150°$ behind give the same difference, and this cue alone confuses front and back.') },
    },
    comp: {
      0: { Fig: MelPlot, cap: b('上：梅尔值随频率增长越来越慢，$1000$ 赫兹约为 $1000$ 梅尔，$4000$ 赫兹只有约 $2146$ 梅尔。下：20 个三角滤波器在梅尔刻度上等距，换到赫兹轴上就越来越宽，与左边耳蜗滤波器的分布相似。', 'Top: mel grows ever more slowly with frequency: $1000$ Hz is about $1000$ mel, but $4000$ Hz only about $2146$. Bottom: twenty triangular filters evenly spaced in mel widen along the hertz axis, much like the cochlear filters.') },
      1: { Fig: MaskPlot, cap: b('示意：两个说话人的声音在时间和频率上大多错开。每一点的掩码等于这个说话人占该点能量的比例，A 更响的地方 $M_A$ 接近 $1$，两个掩码处处相加为 $1$。混合频谱乘上各自的掩码，再解码，就得到两路声音。', 'Illustration: two speakers mostly occupy different times and frequencies. At each point the mask is that speaker’s share of the energy, so $M_A$ is near $1$ where A is louder, and the two masks add to $1$ everywhere. Multiplying the mixture by each mask and decoding gives the two voices.') },
    },
  },
}
