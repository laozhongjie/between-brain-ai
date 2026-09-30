import type { Bi } from '../../data/types'
import { Arrow, Box, C, Chain, Dot, Grid, Line, Svg, T, plot } from './kit'
import type { FigPair, FigProps } from './types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const P = { fill: C.pink, stroke: C.pinkD }
const L = { fill: C.lav, stroke: C.lavD }
const S = { fill: C.sky, stroke: C.skyD }
const M = { fill: C.mint, stroke: C.mintD }
const E = { fill: C.peach, stroke: C.peachD }
const Y = { fill: C.lemon, stroke: C.lemonD }

/** A red cross marking a missing capability; wraps onto two lines when wider than `maxW`. */
function Missing({ x, y, s, maxW = 152 }: { x: number; y: number; s: string; maxW?: number }) {
  // rough text width at 9.5px: CJK ≈ 10px, Latin ≈ 5.4px
  const width = (str: string) => [...str].reduce((w, ch) => w + (/[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 10 : 5.4), 0)
  let lines = [s]
  if (width(s) + 32 > maxW) {
    const words = s.includes(' ') ? s.split(' ') : [...s]
    const sep = s.includes(' ') ? ' ' : ''
    let best = 1
    for (let i = 1; i < words.length; i++) if (Math.abs(width(words.slice(0, i).join(sep)) - width(s) / 2) < Math.abs(width(words.slice(0, best).join(sep)) - width(s) / 2)) best = i
    lines = [words.slice(0, best).join(sep), words.slice(best).join(sep)]
  }
  const w = Math.min(maxW, Math.max(...lines.map(width)) + 32)
  const h = lines.length > 1 ? 40 : 30
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={C.white} stroke={C.pinkD} strokeDasharray="4 3" />
      <T x={x + 12} y={y + h / 2} size={12} color={C.pinkD} weight={700} s="✕" />
      <T x={x + 22} y={y + h / 2} anchor="start" size={9.5} color={C.pinkD} s={lines.join('\n')} />
    </g>
  )
}

// ───────────── Vision ─────────────

function VisionBrainFig({ t }: FigProps) {
  const id = 'f-vb'
  return (
    <Svg id={id} label={t(b('视觉通路', 'Visual pathways'))}>
      <Chain id={id} x={8} y={134} items={[{ label: t(b('视网膜', 'retina')), ...P }, { label: 'LGN', ...P }, { label: 'V1', ...P }, { label: 'V4', ...P }, { label: 'IT', ...P }]} color="pink" />
      <Box x={212} y={52} w={54} h={28} label="MT" {...S} />
      <Box x={280} y={52} w={62} h={28} label={t(b('顶叶', 'parietal'))} {...S} />
      <Arrow id={id} x1={171} y1={134} x2={214} y2={82} color="sky" />
      <Arrow id={id} x1={266} y1={66} x2={278} y2={66} color="sky" />
      <T x={276} y={36} size={10} color={C.skyD} weight={600} s={t(b('背侧：在哪里 / 怎么做', 'dorsal: where / how'))} />
      <T x={170} y={212} size={10} color={C.pinkD} weight={600} s={t(b('腹侧：是什么（感受野逐级变大、特征更抽象）', 'ventral: what (bigger receptive fields, more abstract features)'))} />
      <Arrow id={id} x1={306} y1={166} x2={172} y2={166} color="dim" dashed bend={-18} label={t(b('大量反馈', 'dense feedback'))} ly={22} />
      <Arrow id={id} x1={20} y1={40} x2={20} y2={128} color="peach" label={t(b('眼动：主动选择看哪里', 'saccades: choose where to look'))} lx={70} ly={-30} />
    </Svg>
  )
}

function CnnFig({ t }: FigProps) {
  const id = 'f-cnn'
  const stack = (x: number, y: number, s: number, n: number, color: string) => Array.from({ length: n }, (_, i) => (
    <rect key={i} x={x + i * 4} y={y - i * 4} width={s} height={s} fill={color} fillOpacity={0.55} stroke={C.lavD} strokeWidth={0.8} />
  ))
  return (
    <Svg id={id} label={t(b('卷积神经网络', 'Convolutional network'))}>
      <Grid x={10} y={76} rows={5} cols={5} cell={10} vals={[[.2, .4, .9, .4, .2], [.3, .8, 1, .8, .3], [.2, .9, 1, .9, .2], [.1, .5, .9, .5, .1], [0, .2, .4, .2, 0]]} color={C.pinkD} />
      <T x={35} y={140} size={9.5} s={t(b('图像', 'image'))} />
      <Arrow id={id} x1={64} y1={100} x2={86} y2={100} color="lav" label={t(b('卷积', 'conv'))} />
      <g>{stack(90, 82, 40, 3, C.lav)}</g>
      <Arrow id={id} x1={140} y1={100} x2={160} y2={100} color="lav" label={t(b('池化', 'pool'))} />
      <g>{stack(164, 96, 26, 5, C.lav)}</g>
      <Arrow id={id} x1={212} y1={100} x2={230} y2={100} color="lav" />
      <g>{stack(234, 104, 14, 7, C.lav)}</g>
      <Arrow id={id} x1={276} y1={100} x2={292} y2={100} color="lav" />
      {[70, 86, 102, 118, 134].map((y, i) => <circle key={i} cx={300} cy={y} r={5} fill={C.mint} stroke={C.mintD} />)}
      <T x={332} y={92} size={10} color={C.mintD} weight={600} s={t(b('苹果', 'apple'))} />
      <T x={332} y={108} size={9.5} color={C.mintD} s="0.93" />
      <T x={170} y={160} size={9.5} color={C.dim} s={t(b('逐层：空间变小、通道变多、特征变抽象', 'layer by layer: smaller, deeper, more abstract'))} />
      <Missing x={40} y={180} s={t(b('没有反馈、没有眼动', 'no feedback, no eye movements'))} />
      <Missing x={196} y={180} s={t(b('需要大量标注样本', 'needs many labelled examples'))} />
    </Svg>
  )
}

// ───────────── Hearing ─────────────

function HearingBrainFig({ t }: FigProps) {
  const id = 'f-hb'
  const cochlea = (y: number) => (
    <g>
      <defs>
        <linearGradient id={`${id}-g${y}`} x1="0" x2="1">
          <stop offset="0" stopColor={C.pinkD} />
          <stop offset="1" stopColor={C.pink} />
        </linearGradient>
      </defs>
      <rect x={46} y={y - 10} width={66} height={20} rx={10} fill={`url(#${id}-g${y})`} stroke={C.pinkD} />
    </g>
  )
  return (
    <Svg id={id} label={t(b('听觉通路', 'Auditory pathway'))}>
      <Dot cx={20} cy={60} r={12} {...P} label={t(b('左', 'L'))} size={9.5} />
      <Dot cx={20} cy={170} r={12} {...P} label={t(b('右', 'R'))} size={9.5} />
      {cochlea(60)}
      {cochlea(170)}
      <T x={79} y={36} size={9} color={C.dim} s={t(b('耳蜗：高频 → 低频', 'cochlea: high → low freq'))} />
      <Arrow id={id} x1={112} y1={60} x2={144} y2={104} color="pink" />
      <Arrow id={id} x1={112} y1={170} x2={144} y2={126} color="pink" />
      <Box x={146} y={96} w={64} h={40} label={t(b('脑干\n比较双耳', 'brainstem\ncompare ears'))} {...P} size={9.5} />
      <Arrow id={id} x1={210} y1={116} x2={226} y2={116} color="pink" />
      <Box x={228} y={100} w={40} h={32} label="MGN" {...P} size={10} />
      <Arrow id={id} x1={268} y1={116} x2={282} y2={116} color="pink" />
      <Box x={284} y={100} w={64} h={32} label={t(b('A1 频率图', 'A1 tonotopy'))} {...P} size={9.5} />
      <Arrow id={id} x1={316} y1={100} x2={316} y2={74} color="pink" />
      <Box x={272} y={40} w={80} h={32} label={t(b('颞上回\n语音 / 音乐', 'STG\nspeech / music'))} {...L} size={9.5} />
      <T x={178} y={170} size={9.5} color={C.dim} s={t(b('双耳时间差 → 声源方向', 'interaural delay → direction'))} />
      <T x={180} y={212} size={9.5} color={C.lavD} s={t(b('注意可以从嘈杂中“挑出”一个声音', 'attention can pick one voice out of a crowd'))} />
    </Svg>
  )
}

function AudioNetFig({ t }: FigProps) {
  const id = 'f-an'
  return (
    <Svg id={id} label={t(b('音频/语音网络', 'Audio / speech network'))}>
      <Line pts={plot((u) => Math.sin(u * 40) * Math.exp(-((u - 0.5) ** 2) * 6), 10, 80, 100, 26, 120)} color={C.skyD} width={1.4} />
      <T x={45} y={140} size={9.5} s={t(b('声波', 'waveform'))} />
      <Arrow id={id} x1={84} y1={100} x2={106} y2={100} color="sky" label="STFT" />
      <Grid x={110} y={64} rows={6} cols={8} cell={9} vals={Array.from({ length: 6 }, (_, r) => Array.from({ length: 8 }, (_, c) => Math.exp(-((r - 2 - c * 0.3) ** 2) / 2)))} color={C.skyD} />
      <T x={146} y={128} size={9.5} s={t(b('频谱图', 'spectrogram'))} />
      <Arrow id={id} x1={186} y1={100} x2={206} y2={100} color="lav" />
      <Box x={208} y={74} w={86} h={52} label={t(b('编码器\n卷积 / Transformer', 'encoder\nconv / Transformer'))} {...L} size={9.5} />
      <Arrow id={id} x1={294} y1={100} x2={312} y2={100} color="lav" />
      <Box x={314} y={86} w={38} h={28} label={t(b('文字', 'text'))} {...M} size={10} />
      <Missing x={30} y={170} s={t(b('没有双耳空间听觉', 'no binaural spatial hearing'))} />
      <Missing x={196} y={170} s={t(b('不听自己说话', 'does not hear itself speak'))} />
    </Svg>
  )
}

// ───────────── Touch & pain ─────────────

function TouchBrainFig({ t }: FigProps) {
  const id = 'f-tb4'
  return (
    <Svg id={id} label={t(b('躯体感觉与痛觉通路', 'Somatosensory and pain pathways'))}>
      <Box x={10} y={180} w={64} h={30} label={t(b('皮肤感受器', 'skin receptor'))} {...E} size={9.5} />
      <Box x={10} y={104} w={64} h={30} label={t(b('肌肉', 'muscle'))} {...M} size={10} />
      <Arrow id={id} x1={74} y1={195} x2={98} y2={186} color="peach" />
      <Box x={100} y={164} w={60} h={40} label={t(b('脊髓', 'spinal cord'))} {...P} size={10} />
      <Arrow id={id} x1={112} y1={164} x2={74} y2={126} color="mint" width={2} label={t(b('反射：不经大脑', 'reflex: skips brain'))} lx={34} ly={-2} />
      <Arrow id={id} x1={160} y1={176} x2={186} y2={150} color="pink" />
      <Box x={188} y={126} w={52} h={28} label={t(b('脑干', 'brainstem'))} {...P} size={9.5} />
      <Arrow id={id} x1={228} y1={126} x2={242} y2={104} color="pink" />
      <Box x={236} y={76} w={60} h={28} label={t(b('丘脑 VPL', 'thalamus'))} {...P} size={9.5} />
      <Arrow id={id} x1={286} y1={76} x2={300} y2={52} color="pink" label={t(b('在哪、多重', 'where, how strong'))} lx={-46} ly={-4} />
      <Box x={276} y={20} w={76} h={32} label={t(b('S1 身体地图', 'S1 body map'))} {...P} size={9.5} />
      <Arrow id={id} x1={296} y1={104} x2={306} y2={150} color="pink" dashed />
      <Box x={262} y={152} w={90} h={36} label={t(b('前扣带 / 岛叶\n“好痛”', 'ACC / insula\n“it hurts”'))} {...P} size={9.5} />
      <T x={308} y={204} size={9.5} color={C.pinkD} s={t(b('痛觉情绪 → 学习', 'pain affect → learning'))} />
    </Svg>
  )
}

function RobotTouchFig({ t }: FigProps) {
  const id = 'f-rt'
  return (
    <Svg id={id} label={t(b('机器人触觉', 'Robot touch'))}>
      <path d="M20,40 L20,120 L40,120 L40,60 M60,40 L60,120 L80,120 L80,60" fill="none" stroke={C.ink} strokeWidth={2} />
      <Grid x={22} y={96} rows={3} cols={2} cell={8} vals={[[.9, .4], [.6, .2], [.1, 0]]} color={C.peachD} />
      <Grid x={62} y={96} rows={3} cols={2} cell={8} vals={[[.3, .8], [.2, .5], [0, .1]]} color={C.peachD} />
      <T x={50} y={140} size={9.5} s={t(b('指尖触觉阵列', 'fingertip sensors'))} />
      <Arrow id={id} x1={96} y1={80} x2={118} y2={80} color="sky" />
      <Box x={120} y={62} w={70} h={36} label={t(b('编码器', 'encoder'))} {...S} />
      <Arrow id={id} x1={190} y1={80} x2={210} y2={80} color="lav" />
      <Box x={212} y={62} w={62} h={36} label={t(b('策略', 'policy'))} {...L} />
      <Arrow id={id} x1={274} y1={80} x2={294} y2={80} color="lav" />
      <Box x={296} y={62} w={56} h={36} label={t(b('电机', 'motors'))} {...M} />
      <Box x={200} y={14} w={150} h={30} label={t(b('规则：力 > 上限 → 停止', 'rule: force > limit → stop'))} fill={C.ghost} stroke={C.line} size={9.5} />
      <Missing x={30} y={168} s={t(b('缺：毫秒级局部反射层', 'missing: ms local reflex layer'))} />
      <Missing x={196} y={168} s={t(b('缺：像痛觉一样的全局学习信号', 'missing: pain-like global learning signal'))} />
    </Svg>
  )
}

// ───────────── Motor ─────────────

function MotorBrainFig({ t }: FigProps) {
  const id = 'f-mb'
  return (
    <Svg id={id} label={t(b('运动控制回路', 'Motor control loops'))}>
      <Chain id={id} x={8} y={16} w={62} gap={16} items={[{ label: t(b('前额叶\n目标', 'PFC\ngoal')), ...L }, { label: t(b('运动前区\n计划', 'premotor\nplan')), ...P }, { label: t(b('基底节\n选择', 'basal g.\nselect')), ...P }, { label: 'M1', ...P }]} color="pink" h={38} size={9.5} />
      <Arrow id={id} x1={271} y1={54} x2={271} y2={90} color="pink" />
      <Box x={230} y={92} w={82} h={30} label={t(b('脊髓 → 肌肉', 'cord → muscles'))} {...P} size={9.5} />
      <Arrow id={id} x1={271} y1={122} x2={271} y2={160} color="pink" />
      <Box x={230} y={162} w={82} h={30} label={t(b('身体运动', 'movement'))} {...M} size={10} />
      <Box x={96} y={110} w={96} h={44} label={t(b('小脑：前向模型\n预测动作结果', 'cerebellum: forward\nmodel predicts'))} {...E} size={9.5} />
      <Arrow id={id} x1={250} y1={54} x2={180} y2={108} color="peach" dashed label={t(b('传出副本', 'efference copy'))} lx={12} ly={-4} />
      <Arrow id={id} x1={230} y1={178} x2={170} y2={156} color="mint" label={t(b('本体感觉反馈', 'proprioception'))} ly={16} lx={-4} />
      <Arrow id={id} x1={96} y1={132} x2={50} y2={132} color="peach" label={t(b('误差', 'error'))} />
      <Box x={10} y={118} w={40} h={28} label={t(b('丘脑', 'thal.'))} {...P} size={9.5} />
      <Arrow id={id} x1={30} y1={118} x2={250} y2={56} color="peach" bend={-34} label={t(b('校正 M1', 'correct M1'))} ly={-2} lx={-60} />
      <T x={180} y={214} size={9.5} color={C.dim} s={t(b('反射、小脑校正、皮层计划三层同时运行', 'reflexes, cerebellar correction and cortical planning run in parallel'))} />
    </Svg>
  )
}

function RobotPolicyFig({ t }: FigProps) {
  const id = 'f-rp'
  return (
    <Svg id={id} label={t(b('机器人策略与世界模型', 'Robot policy and world model'))}>
      <Box x={8} y={26} w={70} h={40} label={t(b('图像 + 指令', 'image + text'))} {...S} size={9.5} />
      <Arrow id={id} x1={78} y1={46} x2={96} y2={46} color="sky" />
      <Box x={98} y={30} w={56} h={32} label={t(b('编码器', 'encoder'))} {...L} size={9.5} />
      <Arrow id={id} x1={154} y1={46} x2={170} y2={46} color="lav" label="z" />
      <Box x={172} y={30} w={56} h={32} label={t(b('策略 π', 'policy π'))} {...L} size={10} />
      <Arrow id={id} x1={228} y1={46} x2={246} y2={46} color="lav" label="a" />
      <Box x={248} y={30} w={48} h={32} label={t(b('底层\n控制器', 'low-level\nctrl'))} {...M} size={9} />
      <Arrow id={id} x1={296} y1={46} x2={310} y2={46} color="mint" />
      <Box x={312} y={26} w={42} h={40} label={t(b('环境', 'env'))} fill={C.ghost} stroke={C.line} size={9.5} />
      <Arrow id={id} x1={332} y1={66} x2={60} y2={66} color="dim" bend={-40} dashed label={t(b('新观测', 'next observation'))} ly={28} lx={-80} />
      <Box x={120} y={118} w={130} h={38} label={t(b('世界模型 f(z, a) → z′\n在想象中推演', 'world model f(z, a) → z′\nimagined rollouts'))} {...E} size={9.5} />
      <Arrow id={id} x1={186} y1={62} x2={186} y2={116} color="peach" dashed both />
      <Missing x={40} y={180} s={t(b('几次尝试就适应新工具', 'adapt to a new tool in a few tries'))} />
      <Missing x={206} y={180} s={t(b('柔顺身体与密集本体感觉', 'compliant body, dense proprioception'))} />
    </Svg>
  )
}

// ───────────── Language ─────────────

function LanguageBrainFig({ t }: FigProps) {
  const id = 'f-lb'
  return (
    <Svg id={id} label={t(b('语言网络', 'Language network'))}>
      <Dot cx={20} cy={110} r={12} {...P} label={t(b('耳', 'ear'))} size={9.5} />
      <Arrow id={id} x1={32} y1={110} x2={52} y2={110} color="pink" />
      <Box x={54} y={96} w={38} h={28} label="A1" {...P} size={10} />
      <Arrow id={id} x1={92} y1={110} x2={112} y2={110} color="pink" />
      <Box x={114} y={92} w={80} h={36} label={t(b('Wernicke\n理解语音', 'Wernicke\ncomprehend'))} {...Y} size={9.5} />
      <Arrow id={id} x1={154} y1={128} x2={154} y2={158} color="lemon" />
      <Box x={114} y={160} w={80} h={32} label={t(b('颞中回：词义', 'MTG: meaning'))} {...Y} size={9.5} />
      <Arrow id={id} x1={194} y1={110} x2={246} y2={110} color="lemon" width={2.2} label={t(b('弓状束', 'arcuate'))} />
      <Box x={248} y={92} w={64} h={36} label={t(b('Broca\n组织发音', 'Broca\nplan speech'))} {...Y} size={9.5} />
      <Arrow id={id} x1={280} y1={92} x2={280} y2={66} color="lemon" />
      <Box x={244} y={36} w={72} h={30} label={t(b('M1 口面区', 'M1 face area'))} {...P} size={9.5} />
      <Arrow id={id} x1={316} y1={51} x2={332} y2={51} color="pink" />
      <T x={344} y={51} size={9.5} s={t(b('说', 'speak'))} />
      <Line pts={[[344, 62], [344, 212], [20, 212], [20, 128]]} color={C.dim} dashed width={1.4} />
      <Arrow id={id} x1={20} y1={140} x2={20} y2={124} color="dim" />
      <T x={250} y={202} size={9.5} color={C.dim} s={t(b('听到自己的声音：实时纠错', 'hearing yourself: fix slips in real time'))} />
      <Arrow id={id} x1={194} y1={176} x2={260} y2={128} color="lemon" dashed label={t(b('选词', 'pick words'))} lx={20} ly={6} />
    </Svg>
  )
}

function LlmFig({ t }: FigProps) {
  const id = 'f-llm'
  const probs = [0.1, 0.55, 0.2, 0.1, 0.05]
  return (
    <Svg id={id} label={t(b('大语言模型', 'Large language model'))}>
      {['w₁', 'w₂', 'w₃'].map((w, i) => <Box key={i} x={30 + i * 44} y={186} w={38} h={26} label={w} {...S} size={10} />)}
      <Box x={162} y={186} w={38} h={26} label="w₄" {...M} size={10} dashed />
      <Arrow id={id} x1={93} y1={186} x2={93} y2={168} color="sky" />
      <Box x={30} y={138} w={126} h={28} label={t(b('词嵌入 + 位置', 'embeddings + positions'))} {...S} size={9.5} />
      {[0, 1, 2].map((i) => <Box key={i} x={30 + i * 4} y={98 - i * 6} w={126} h={30} label={i === 2 ? t(b('Transformer 块 × N', 'Transformer block × N')) : ''} {...L} size={10} />)}
      <Arrow id={id} x1={93} y1={138} x2={93} y2={130} color="lav" />
      <Arrow id={id} x1={168} y1={100} x2={204} y2={100} color="lav" label="softmax" ly={12} />
      {probs.map((p, i) => <rect key={i} x={210 + i * 14} y={120 - p * 90} width={10} height={p * 90} rx={2} fill={i === 1 ? C.mintD : C.lavD} opacity={i === 1 ? 1 : 0.5} />)}
      <T x={244} y={134} size={9.5} color={C.dim} s={t(b('下一个词的概率', 'next-word probabilities'))} />
      <Arrow id={id} x1={234} y1={144} x2={186} y2={184} color="mint" label={t(b('采样后接到末尾', 'sample and append'))} lx={52} ly={4} />
      <T x={300} y={40} size={9.5} color={C.dim} s={t(b('只用文字\n预测下一个词', 'text only:\npredict next word'))} />
      <Missing x={210} y={176} s={t(b('没有感知与行动接地', 'no perception/action grounding'))} />
    </Svg>
  )
}

// ───────────── Memory ─────────────

function MemoryBrainFig({ t }: FigProps) {
  const id = 'f-mem'
  return (
    <Svg id={id} label={t(b('互补学习系统', 'Complementary learning systems'))}>
      <rect x={20} y={12} width={320} height={60} rx={14} fill={C.lav} stroke={C.lavD} />
      {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={46 + i * 21} cy={36 + (i % 2) * 12} r={4} fill={C.lavD} opacity={0.6} />)}
      <T x={180} y={62} size={10} color={C.lavD} weight={600} s={t(b('新皮层：慢慢提取规律（语义知识）', 'neocortex: slowly extracts regularities (semantic)'))} />
      <Box x={130} y={100} w={100} h={30} label={t(b('内嗅皮层', 'entorhinal'))} {...M} size={10} />
      <rect x={100} y={158} width={160} height={46} rx={14} fill={C.mint} stroke={C.mintD} />
      <T x={180} y={174} size={10.5} color={C.mintD} weight={600} s={t(b('海马', 'hippocampus'))} />
      <T x={180} y={192} size={9.5} color={C.mintD} s={t(b('一次记住（情景）', 'one-shot episodes'))} />
      <Arrow id={id} x1={150} y1={72} x2={160} y2={98} color="lav" label={t(b('编码', 'encode'))} lx={-22} />
      <Arrow id={id} x1={170} y1={130} x2={170} y2={156} color="mint" />
      <Arrow id={id} x1={200} y1={156} x2={200} y2={132} color="mint" dashed />
      <Arrow id={id} x1={214} y1={100} x2={240} y2={74} color="mint" dashed label={t(b('睡眠回放 → 巩固', 'sleep replay → consolidate'))} lx={60} ly={4} />
      <T x={310} y={150} size={9.5} color={C.dim} s={t(b('快系统教会\n慢系统', 'fast system\nteaches slow one'))} />
    </Svg>
  )
}

function LlmMemoryFig({ t }: FigProps) {
  const id = 'f-lm'
  return (
    <Svg id={id} label={t(b('AI 的记忆组件', 'AI memory components'))}>
      <Box x={20} y={14} w={210} h={44} label={t(b('模型权重：预训练后基本冻结', 'weights: mostly frozen after pretraining'))} {...L} size={10} />
      <Grid x={20} y={104} rows={1} cols={14} cell={15} vals={[[.3, .4, .5, .6, .6, .7, .8, .8, .9, .9, 1, 1, 1, 1]]} color={C.skyD} />
      <T x={125} y={134} size={10} color={C.skyD} s={t(b('上下文窗口（会话结束即消失）', 'context window (gone after the session)'))} />
      <Arrow id={id} x1={125} y1={102} x2={125} y2={60} color="lav" label={t(b('读', 'read'))} lx={12} ly={0} />
      <ellipse cx={300} cy={112} rx={40} ry={10} fill={C.peach} stroke={C.peachD} />
      <rect x={260} y={112} width={80} height={44} fill={C.peach} stroke="none" />
      <path d="M260,112 L260,156 A40,10 0 0 0 340,156 L340,112" fill={C.peach} stroke={C.peachD} />
      <T x={300} y={138} size={9.5} color={C.peachD} s={t(b('向量库', 'vector DB'))} />
      <Arrow id={id} x1={260} y1={118} x2={234} y2={112} color="peach" />
      <T x={300} y={86} size={9.5} color={C.peachD} s={t(b('检索 top-k', 'retrieve top-k'))} />
      <Arrow id={id} x1={250} y1={100} x2={214} y2={60} color="pink" dashed label="✕" lx={10} ly={0} />
      <Missing x={20} y={170} s={t(b('没有自动巩固进权重', 'no automatic consolidation into weights'))} />
      <Missing x={196} y={170} s={t(b('检索的是文本片段，不是情景', 'retrieves text chunks, not episodes'))} />
    </Svg>
  )
}

// ───────────── Emotion ─────────────

function FearBrainFig({ t }: FigProps) {
  const id = 'f-fb'
  return (
    <Svg id={id} label={t(b('恐惧回路', 'Fear circuit'))}>
      <Box x={8} y={100} w={50} h={30} label={t(b('刺激', 'stimulus'))} {...E} size={9.5} />
      <Arrow id={id} x1={58} y1={115} x2={74} y2={115} color="peach" />
      <Box x={76} y={100} w={50} h={30} label={t(b('丘脑', 'thalamus'))} {...P} size={9.5} />
      <Arrow id={id} x1={126} y1={122} x2={176} y2={152} color="pink" width={2.4} />
      <T x={96} y={170} size={9.5} color={C.pinkD} weight={600} s={t(b('低通路\n约 12 ms', 'low road\n~12 ms'))} />
      <Arrow id={id} x1={110} y1={100} x2={130} y2={62} color="sky" />
      <Box x={112} y={30} w={76} h={30} label={t(b('感觉皮层', 'sensory cortex'))} {...S} size={9.5} />
      <Arrow id={id} x1={170} y1={60} x2={194} y2={138} color="sky" />
      <T x={146} y={96} size={9.5} color={C.skyD} s={t(b('高通路\n看清是什么', 'high road\nidentify'))} />
      <Dot cx={200} cy={160} r={22} fill={C.pink} stroke={C.pinkD} label={t(b('杏仁核', 'amygdala'))} size={9.5} />
      <Box x={228} y={20} w={70} h={30} label="vmPFC" {...L} size={10} />
      <Arrow id={id} x1={250} y1={50} x2={212} y2={140} color="lav" head="bar" />
      <T x={312} y={62} size={9.5} color={C.lavD} s={t(b('刹车：“没事了”', 'brake: “it’s OK”'))} />
      <Arrow id={id} x1={222} y1={160} x2={266} y2={120} color="pink" />
      <Box x={268} y={100} w={84} h={30} label={t(b('下丘脑：应激', 'hypothal.: stress'))} {...P} size={9} />
      <Arrow id={id} x1={222} y1={168} x2={266} y2={190} color="pink" />
      <Box x={268} y={176} w={84} h={30} label={t(b('脑干：心跳、僵住', 'brainstem: heart'))} {...P} size={9} />
      <T x={80} y={214} size={9.5} color={C.pinkD} s={t(b('全身状态瞬间切换', 'the whole state switches at once'))} />
    </Svg>
  )
}

function RlAgentFig({ t }: FigProps) {
  const id = 'f-rl'
  return (
    <Svg id={id} label={t(b('强化学习智能体', 'RL agent'))}>
      <Box x={20} y={40} w={60} h={34} label={t(b('状态 s', 'state s'))} {...S} size={10} />
      <Arrow id={id} x1={80} y1={57} x2={104} y2={57} color="sky" />
      <Box x={106} y={40} w={60} h={34} label={t(b('策略 π', 'policy π'))} {...L} size={10} />
      <Arrow id={id} x1={166} y1={57} x2={190} y2={57} color="lav" />
      <Box x={192} y={40} w={70} h={34} label={t(b('安全过滤', 'safety filter'))} fill={C.ghost} stroke={C.line} size={9.5} />
      <Arrow id={id} x1={262} y1={57} x2={286} y2={57} color="lav" label="a" />
      <Box x={288} y={36} w={62} h={42} label={t(b('环境', 'environment'))} fill={C.ghost} stroke={C.line} size={9.5} />
      <Arrow id={id} x1={318} y1={78} x2={140} y2={76} color="peach" bend={-36} label={t(b('奖赏 r：一个标量', 'reward r: one scalar'))} ly={30} />
      <Missing x={30} y={160} maxW={318} s={t(b('没有同时调节注意、学习率、风险偏好的情绪状态', 'no emotion state tuning attention, learning rate and risk together'))} />
    </Svg>
  )
}

// ───────────── Reward ─────────────

function RewardBrainFig({ t }: FigProps) {
  const id = 'f-rwb'
  return (
    <Svg id={id} label={t(b('多巴胺奖赏回路', 'Dopamine reward circuit'))}>
      <Box x={10} y={30} w={70} h={34} label={t(b('皮层：状态', 'cortex: state'))} {...L} size={9.5} />
      <Arrow id={id} x1={80} y1={40} x2={120} y2={36} color="lav" />
      <Arrow id={id} x1={80} y1={54} x2={120} y2={80} color="lav" />
      <Box x={122} y={20} w={100} h={30} label={t(b('腹侧纹状体：价值 V', 'ventral striatum: V'))} {...Y} size={9} />
      <Box x={122} y={66} w={100} h={30} label={t(b('背侧纹状体：动作 π', 'dorsal striatum: π'))} {...Y} size={9} />
      <Arrow id={id} x1={222} y1={81} x2={250} y2={81} color="lemon" />
      <Box x={252} y={66} w={98} h={30} label={t(b('苍白球 → 丘脑 → 动作', 'pallidum → thal. → act'))} {...P} size={9} />
      <Dot cx={172} cy={170} r={20} fill={C.peach} stroke={C.peachD} label="VTA" size={10} />
      <Arrow id={id} x1={162} y1={152} x2={150} y2={98} color="peach" dashed label="δ" lx={-10} ly={0} />
      <Arrow id={id} x1={182} y1={152} x2={196} y2={52} color="peach" dashed />
      <T x={250} y={150} size={10} color={C.peachD} s="δ = r + γV(s′) − V(s)" />
      <T x={250} y={168} size={9.5} color={C.dim} s={t(b('多巴胺 = 预测误差', 'dopamine = prediction error'))} />
      <Box x={10} y={156} w={80} h={30} label={t(b('结果 / 奖赏', 'outcome / reward'))} {...M} size={9.5} />
      <Arrow id={id} x1={90} y1={171} x2={150} y2={171} color="mint" />
    </Svg>
  )
}

function ActorCriticFig({ t }: FigProps) {
  const id = 'f-ac'
  return (
    <Svg id={id} label="Actor-critic">
      <Box x={10} y={90} w={48} h={32} label="s" {...S} size={12} />
      <Arrow id={id} x1={58} y1={100} x2={126} y2={50} color="sky" />
      <Arrow id={id} x1={58} y1={112} x2={126} y2={160} color="sky" />
      <Box x={128} y={32} w={96} h={34} label={t(b('评论家 V(s)', 'critic V(s)'))} {...Y} size={10} />
      <Box x={128} y={144} w={96} h={34} label={t(b('行动者 π(a|s)', 'actor π(a|s)'))} {...Y} size={10} />
      <Arrow id={id} x1={224} y1={161} x2={270} y2={130} color="lemon" label="a" />
      <Box x={272} y={100} w={76} h={34} label={t(b('环境', 'environment'))} fill={C.ghost} stroke={C.line} size={9.5} />
      <Arrow id={id} x1={310} y1={100} x2={310} y2={70} color="mint" label="r, s′" lx={18} ly={0} />
      <Box x={262} y={36} w={90} h={34} label={t(b('TD 误差 δ', 'TD error δ'))} {...E} size={10} />
      <Arrow id={id} x1={262} y1={53} x2={226} y2={50} color="peach" dashed />
      <Arrow id={id} x1={280} y1={70} x2={214} y2={142} color="peach" dashed label={t(b('δ 同时更新两者', 'δ updates both'))} lx={-46} ly={0} />
      <T x={180} y={212} size={9.5} color={C.dim} s={t(b('结构与基底节 + 多巴胺几乎一一对应', 'nearly one-to-one with basal ganglia + dopamine'))} />
    </Svg>
  )
}

// ───────────── Homeostasis ─────────────

function HomeoBrainFig({ t }: FigProps) {
  const id = 'f-hob'
  const gauges: [string, number][] = [[t(b('体温', 'temp.')), 0.55], [t(b('血糖', 'glucose')), 0.3], [t(b('水分', 'water')), 0.62]]
  return (
    <Svg id={id} label={t(b('稳态调节回路', 'Homeostatic loop'))}>
      {gauges.map(([name, v], i) => (
        <g key={i}>
          <rect x={16 + i * 26} y={40} width={14} height={90} rx={6} fill={C.ghost} stroke={C.line} />
          <rect x={16 + i * 26} y={130 - v * 90} width={14} height={v * 90} rx={6} fill={i === 1 ? C.pinkD : C.mintD} opacity={0.8} />
          <line x1={12 + i * 26} x2={34 + i * 26} y1={130 - 0.55 * 90} y2={130 - 0.55 * 90} stroke={C.ink} strokeDasharray="2 2" />
          <T x={23 + i * 26} y={144} size={9} s={name} />
        </g>
      ))}
      <T x={8} y={24} anchor="start" size={9.5} color={C.dim} s={t(b('内部变量（虚线：设定点）', 'internal variables (dashed: set point)'))} />
      <Arrow id={id} x1={96} y1={86} x2={122} y2={86} color="mint" label={t(b('内感受', 'interoception'))} ly={-10} />
      <Dot cx={160} cy={86} r={34} fill={C.mint} stroke={C.mintD} />
      <T x={160} y={80} size={10} color={C.mintD} weight={600} s={t(b('下丘脑', 'hypothal.'))} />
      <T x={160} y={96} size={9} color={C.mintD} s={t(b('比较设定点', 'vs set point'))} />
      <Arrow id={id} x1={194} y1={70} x2={236} y2={40} color="mint" />
      <Arrow id={id} x1={196} y1={86} x2={236} y2={86} color="mint" />
      <Arrow id={id} x1={194} y1={102} x2={236} y2={132} color="mint" />
      <Box x={238} y={24} w={112} h={28} label={t(b('自主神经：心率', 'autonomic: heart'))} {...M} size={9} />
      <Box x={238} y={72} w={112} h={28} label={t(b('激素：垂体', 'hormones: pituitary'))} {...M} size={9} />
      <Box x={238} y={120} w={112} h={28} label={t(b('驱力：想吃、想喝', 'drives: hunger, thirst'))} {...E} size={9} />
      <Arrow id={id} x1={294} y1={150} x2={50} y2={150} color="dim" dashed bend={-36} label={t(b('改变身体 → 闭环', 'change the body → loop'))} ly={26} />
    </Svg>
  )
}

function HomeoRlFig({ t }: FigProps) {
  const id = 'f-horl'
  return (
    <Svg id={id} label={t(b('稳态强化学习', 'Homeostatic RL'))}>
      <Box x={10} y={30} w={100} h={40} label={t(b('内部状态 H\n电量 · 温度 · 磨损', 'internal state H\nbattery · temp · wear'))} {...M} size={9} />
      <Arrow id={id} x1={110} y1={50} x2={140} y2={50} color="mint" />
      <Box x={142} y={30} w={96} h={40} label={t(b('驱力 D(H)\n离设定点多远', 'drive D(H)\ndistance to set point'))} {...E} size={9} />
      <Arrow id={id} x1={238} y1={50} x2={262} y2={50} color="peach" />
      <Box x={264} y={30} w={88} h={40} label={t(b('r = D(Hₜ) − D(Hₜ₊₁)', 'r = D(Hₜ) − D(Hₜ₊₁)'))} {...Y} size={9} />
      <Arrow id={id} x1={308} y1={70} x2={308} y2={104} color="lemon" />
      <T x={300} y={124} size={9.5} color={C.dim} s={t(b('+ 外部任务奖赏', '+ task reward'))} />
      <Box x={170} y={140} w={80} h={34} label={t(b('智能体', 'agent'))} {...L} size={10} />
      <Arrow id={id} x1={290} y1={140} x2={252} y2={152} color="lemon" />
      <Arrow id={id} x1={170} y1={157} x2={60} y2={72} color="lav" label={t(b('行动改变 H', 'actions change H'))} lx={-10} ly={16} />
      <T x={180} y={212} size={9.5} color={C.pinkD} s={t(b('少数研究原型，主流 AI 中基本缺失', 'research prototypes only; absent from mainstream AI'))} />
    </Svg>
  )
}

// ───────────── Sleep ─────────────

function HypnogramFig({ t }: FigProps) {
  const id = 'f-hyp'
  const lv = { W: 30, R: 58, N1: 86, N2: 114, N3: 142 }
  const seq: [number, keyof typeof lv][] = [[0, 'W'], [0.05, 'N1'], [0.08, 'N2'], [0.12, 'N3'], [0.24, 'N2'], [0.27, 'R'], [0.31, 'N2'], [0.36, 'N3'], [0.45, 'N2'], [0.5, 'R'], [0.56, 'N2'], [0.62, 'N3'], [0.66, 'N2'], [0.72, 'R'], [0.8, 'N2'], [0.85, 'R'], [0.95, 'W'], [1, 'W']]
  const pts: [number, number][] = []
  seq.forEach(([u, s], i) => {
    const x = 50 + u * 290
    if (i) pts.push([x, pts[pts.length - 1][1]])
    pts.push([x, lv[s]])
  })
  return (
    <Svg id={id} label={t(b('一夜的睡眠结构', 'Sleep architecture over a night'))}>
      {Object.entries(lv).map(([k, y]) => <T key={k} x={24} y={y} size={9.5} color={k === 'R' ? C.pinkD : C.dim} s={k === 'W' ? t(b('清醒', 'wake')) : k === 'R' ? 'REM' : k} />)}
      <Line pts={pts} color={C.lavD} width={2} />
      <T x={52} y={160} size={9} color={C.dim} s="23:00" anchor="start" />
      <T x={340} y={160} size={9} color={C.dim} s="07:00" anchor="end" />
      <Box x={20} y={176} w={160} h={40} label={t(b('深睡 N3：海马回放 → 皮层\n巩固记忆、突触整体下调', 'N3: hippocampal replay → cortex\nconsolidate, downscale synapses'))} {...L} size={9} />
      <Box x={190} y={176} w={160} h={40} label={t(b('REM：情绪记忆重组\n视觉与情绪区活跃（做梦）', 'REM: emotional memory reworked\nvisual/emotional areas active'))} {...P} size={9} />
    </Svg>
  )
}

function OfflineTrainFig({ t }: FigProps) {
  const id = 'f-off'
  return (
    <Svg id={id} label={t(b('在线交互与离线训练', 'Online interaction and offline training'))}>
      <Box x={20} y={20} w={80} h={34} label={t(b('智能体', 'agent'))} {...L} size={10} />
      <Arrow id={id} x1={100} y1={30} x2={170} y2={30} color="lav" label={t(b('行动', 'act'))} />
      <Arrow id={id} x1={170} y1={46} x2={100} y2={46} color="mint" label={t(b('经验', 'experience'))} ly={10} />
      <Box x={172} y={20} w={70} h={34} label={t(b('环境', 'environment'))} fill={C.ghost} stroke={C.line} size={9.5} />
      <T x={300} y={37} size={9.5} color={C.dim} s={t(b('在线（白天）', 'online (day)'))} />
      <Arrow id={id} x1={60} y1={54} x2={60} y2={86} color="mint" />
      <Box x={16} y={88} w={96} h={34} label={t(b('回放缓冲区', 'replay buffer'))} {...M} size={10} />
      <Box x={150} y={88} w={100} h={34} label={t(b('生成模型：做梦', 'generator: dreams'))} {...E} size={9.5} />
      <Arrow id={id} x1={64} y1={122} x2={130} y2={150} color="mint" />
      <Arrow id={id} x1={200} y1={122} x2={160} y2={150} color="peach" />
      <Box x={90} y={152} w={130} h={34} label={t(b('离线训练 / 蒸馏', 'offline training / distillation'))} {...L} size={9.5} />
      <Line pts={[[90, 169], [6, 169], [6, 37]]} color={C.lavD} width={1.6} />
      <Arrow id={id} x1={6} y1={40} x2={18} y2={37} color="lav" />
      <T x={14} y={146} anchor="start" size={9.5} color={C.lavD} s={t(b('更新', 'update'))} />
      <T x={300} y={140} size={9.5} color={C.dim} s={t(b('离线（夜里）', 'offline (night)'))} />
      <Missing x={196} y={190} s={t(b('多数系统没有定期离线周期', 'most systems lack regular offline cycles'))} />
    </Svg>
  )
}

// ───────────── Attention ─────────────

function AttentionBrainFig({ t }: FigProps) {
  const id = 'f-atb'
  return (
    <Svg id={id} label={t(b('大脑的注意与工作记忆', 'Brain attention and working memory'))}>
      <Box x={120} y={10} w={120} h={32} label={t(b('前额叶：当前目标', 'PFC: current goal'))} {...L} size={10} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Grid x={40 + i * 90} y={70} rows={3} cols={4} cell={10} vals={i === 1 ? [[.2, .9, .9, .2], [.2, 1, .9, .1], [.1, .3, .2, 0]] : [[.2, .3, .2, .1], [.1, .2, .3, .1], [.2, .1, .1, .1]]} color={i === 1 ? C.pinkD : C.dim} />
          <Arrow id={id} x1={180} y1={42} x2={60 + i * 90} y2={66} color="lav" dashed width={i === 1 ? 2 : 1} />
        </g>
      ))}
      <T x={150} y={112} size={9.5} color={C.pinkD} s={t(b('自上而下放大与目标相关的特征', 'top-down boost of goal-relevant features'))} />
      <Box x={20} y={140} w={80} h={30} label={t(b('基底节门控', 'BG gate'))} {...Y} size={9.5} />
      <Arrow id={id} x1={100} y1={155} x2={128} y2={155} color="lemon" label={t(b('放行', 'admit'))} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={132 + i * 24} y={142} width={20} height={26} rx={4} fill={i < 3 ? C.lav : C.white} stroke={C.lavD} />)}
      <T x={176} y={186} size={9.5} color={C.lavD} s={t(b('工作记忆：约 4 项', 'working memory: ~4 items'))} />
      <Dot cx={300} cy={160} r={24} fill={C.peach} stroke={C.peachD} label={t(b('全局\n工作空间', 'global\nworkspace'))} size={9} />
      {[[-40, -30], [40, -30], [40, 30]].map(([dx, dy], i) => <Arrow key={i} id={id} x1={300 + dx * 0.5} y1={160 + dy * 0.5} x2={300 + dx * 1.1} y2={160 + dy * 1.1} color="peach" width={1.2} />)}
      <T x={300} y={212} size={9.5} color={C.peachD} s={t(b('少量信息向全脑广播', 'a little is broadcast brain-wide'))} />
    </Svg>
  )
}

function AttentionHeadFig({ t }: FigProps) {
  const id = 'f-ath'
  const n = 8
  const vals = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (c <= r ? Math.exp(-Math.abs(r - c) / 2) * (c === 1 ? 1.4 : 1) : 0)).map((v, _i, arr) => v / Math.max(...arr)))
  return (
    <Svg id={id} label={t(b('注意力头', 'An attention head'))}>
      {Array.from({ length: n }, (_, i) => <Box key={i} x={20 + i * 22} y={14} w={18} h={20} {...S} r={4} />)}
      <T x={108} y={46} size={9.5} color={C.skyD} s={t(b('n 个 token', 'n tokens'))} />
      {['Q', 'K', 'V'].map((q, i) => <Box key={q} x={210 + i * 46} y={14} w={38} h={28} label={q} {...L} size={11} />)}
      <Arrow id={id} x1={196} y1={24} x2={208} y2={24} color="sky" />
      <Grid x={40} y={70} rows={n} cols={n} cell={14} vals={vals} color={C.lavD} />
      <T x={96} y={196} size={9.5} color={C.lavD} s={t(b('n × n 注意力矩阵', 'n × n attention matrix'))} />
      <Arrow id={id} x1={236} y1={42} x2={160} y2={82} color="lav" label="softmax(QKᵀ/√d)" lx={34} ly={-4} size={9} />
      <Arrow id={id} x1={164} y1={126} x2={220} y2={126} color="lav" label="× V" />
      {Array.from({ length: n }, (_, i) => <rect key={i} x={226 + (i % 4) * 30} y={100 + Math.floor(i / 4) * 30} width={24} height={24} rx={4} fill={C.mint} stroke={C.mintD} />)}
      <T x={285} y={170} size={9.5} color={C.mintD} s={t(b('每个位置的输出', 'output per position'))} />
      <T x={200} y={216} size={9.5} color={C.dim} s={t(b('所有 token 两两比较：没有容量瓶颈，也不由目标驱动', 'all pairs compared: no capacity bottleneck, not goal-driven'))} />
    </Svg>
  )
}

export const LAYER4_FIGS: Record<string, FigPair> = {
  'sys-vision': {
    brain: VisionBrainFig, ai: CnnFig,
    brainCap: b('视觉：视网膜 → LGN → V1 后分成两路。腹侧流（下）识别“是什么”，背侧流（上）计算“在哪里、怎么做”。高层对低层有大量反馈，眼睛还会主动扫视。', 'Vision: after retina → LGN → V1 the stream splits: ventral (bottom) for “what”, dorsal (top) for “where/how”. Higher areas send dense feedback and the eyes actively saccade.'),
    aiCap: b('卷积网络：卷积和池化逐层缩小空间、增加通道，最后全连接输出类别。它和腹侧流的层级很像，但只有前馈，也不会主动选择看哪里。', 'CNN: convolution and pooling shrink space and add channels layer by layer, ending in a class. It resembles the ventral hierarchy but is feedforward only and never chooses where to look.'),
  },
  'sys-hearing': {
    brain: HearingBrainFig, ai: AudioNetFig,
    brainCap: b('听觉：耳蜗把声音按频率展开，脑干比较两只耳朵的时间差来定位，经丘脑到 A1 的频率地图，再到颞上回处理语音和音乐。', 'Hearing: the cochlea spreads sound by frequency, the brainstem compares the two ears to localise, then thalamus → A1’s frequency map → STG for speech and music.'),
    aiCap: b('音频网络：声波经短时傅里叶变换成频谱图（工程版“耳蜗”），再由编码器转换成文字或标签。通常是单声道，也不会听自己的输出。', 'Audio network: the waveform becomes a spectrogram via STFT (an engineering “cochlea”), then an encoder turns it into text or labels. Usually mono, and it does not hear its own output.'),
  },
  'sys-touch': {
    brain: TouchBrainFig, ai: RobotTouchFig,
    brainCap: b('躯体感觉：皮肤信号进入脊髓后兵分两路。反射直接回到肌肉（不经大脑）；上行经脑干、丘脑到 S1 身体地图，痛觉另到前扣带和岛叶产生“好痛”的感受。', 'Somatosensation: skin signals split at the spinal cord. Reflexes return straight to muscle; the ascending path reaches the S1 body map via brainstem and thalamus, and pain also reaches ACC/insula as suffering.'),
    aiCap: b('机器人触觉：指尖传感器 → 编码器 → 策略 → 电机，安全靠硬编码的阈值规则。缺少毫秒级的局部反射层，也缺少像痛觉那样同时改变注意和学习的信号。', 'Robot touch: fingertip sensors → encoder → policy → motors, with safety as a hard-coded threshold. Missing: a millisecond local reflex layer and a pain-like signal that reshapes attention and learning.'),
  },
  'sys-motor': {
    brain: MotorBrainFig, ai: RobotPolicyFig,
    brainCap: b('运动：目标 → 计划 → 基底节选择 → M1 → 脊髓 → 肌肉。M1 同时把“传出副本”发给小脑，小脑预测结果并和本体感觉比较，经丘脑实时校正 M1。', 'Movement: goal → plan → basal ganglia select → M1 → cord → muscles. M1 also sends an efference copy to the cerebellum, which predicts the outcome, compares it with proprioception and corrects M1 via the thalamus.'),
    aiCap: b('机器人：图像和指令编码成 z，策略输出动作 a，底层控制器执行。世界模型 f(z, a) 可在想象中推演。但快速适应、柔顺身体和密集本体感觉仍然缺失。', 'Robot: image and instruction are encoded to z, a policy outputs action a, a low-level controller executes. A world model f(z, a) can imagine rollouts, but fast adaptation, compliant bodies and dense proprioception are missing.'),
  },
  'sys-language': {
    brain: LanguageBrainFig, ai: LlmFig,
    brainCap: b('语言：耳 → A1 → Wernicke 理解（颞中回取词义）→ 弓状束 → Broca 组织发音 → M1 口面区 → 说话。你也会听到自己的声音来实时纠错。', 'Language: ear → A1 → Wernicke comprehends (MTG retrieves meaning) → arcuate → Broca plans → M1 face area → speech, and you hear yourself to fix slips.'),
    aiCap: b('大语言模型：词语变成向量，经 N 个 Transformer 块，输出下一个词的概率，采样后接到末尾再继续。整个过程只在文字里进行，没有感知和行动接地。', 'LLM: words become vectors, pass through N Transformer blocks, give next-word probabilities, and the sample is appended to continue. It all stays inside text, with no grounding in perception or action.'),
  },
  'sys-memory': {
    brain: MemoryBrainFig, ai: LlmMemoryFig,
    brainCap: b('互补学习系统：新皮层经内嗅皮层把经历交给海马一次记住；睡眠中海马回放，反过来把经历慢慢“教会”新皮层，变成长期知识。', 'Complementary learning systems: the neocortex passes experience via entorhinal cortex to the hippocampus for one-shot storage; in sleep, hippocampal replay slowly teaches the neocortex, turning episodes into knowledge.'),
    aiCap: b('AI 的记忆由三块拼成：冻结的权重、会话结束就消失的上下文窗口、按相似度检索文本片段的向量库。三者之间没有自动的巩固过程。', 'AI memory is three separate parts: frozen weights, a context window that vanishes after the session, and a vector DB that retrieves text chunks. Nothing consolidates between them automatically.'),
  },
  'sys-fear': {
    brain: FearBrainFig, ai: RlAgentFig,
    brainCap: b('恐惧：丘脑经“低通路”约 12 毫秒直达杏仁核，皮层“高通路”随后看清是什么。杏仁核瞬间切换全身状态（应激、心跳、僵住），腹内侧前额叶负责刹车。', 'Fear: the thalamus reaches the amygdala via the low road in ~12 ms, the cortical high road identifies the object later. The amygdala flips the whole-body state (stress, heart, freezing); vmPFC applies the brake.'),
    aiCap: b('强化学习智能体：状态 → 策略 → 安全过滤 → 动作，环境返回一个标量奖赏。没有能同时改变注意、学习率、风险偏好和记忆写入的“情绪状态”。', 'RL agent: state → policy → safety filter → action, and the environment returns one scalar reward. There is no emotion state that jointly changes attention, learning rate, risk taking and memory writes.'),
  },
  'sys-reward': {
    brain: RewardBrainFig, ai: ActorCriticFig,
    brainCap: b('奖赏：皮层提供状态，腹侧纹状体估计价值、背侧纹状体选动作；VTA 的多巴胺编码预测误差 δ，广播回纹状体和皮层来更新两者。', 'Reward: cortex supplies state, ventral striatum estimates value and dorsal striatum picks actions; VTA dopamine encodes the prediction error δ and broadcasts it back to update both.'),
    aiCap: b('Actor-critic：评论家估计 V(s)，行动者输出 π(a|s)，环境返回 r 和新状态，TD 误差 δ 同时更新两者。结构和基底节加多巴胺几乎一一对应。', 'Actor-critic: the critic estimates V(s), the actor outputs π(a|s), the environment returns r and the next state, and the TD error δ updates both. Nearly one-to-one with basal ganglia plus dopamine.'),
  },
  'sys-homeostasis': {
    brain: HomeoBrainFig, ai: HomeoRlFig,
    brainCap: b('稳态：体温、血糖、水分等内部变量经内感受送到下丘脑，与设定点比较后，通过自主神经、激素和“想吃想喝”的驱力把身体拉回平衡，形成闭环。', 'Homeostasis: temperature, glucose, water and other internal variables reach the hypothalamus via interoception; compared with set points, autonomic, hormonal and drive outputs pull the body back into balance.'),
    aiCap: b('稳态强化学习：机器人内部状态（电量、温度、磨损）离设定点的距离构成驱力，奖赏就是驱力的减少，再加上外部任务奖赏。目前只有少数研究原型。', 'Homeostatic RL: the distance of a robot’s internal state (battery, temperature, wear) from set points is the drive, reward is its reduction, plus task reward. Only research prototypes exist.'),
  },
  'sys-sleep': {
    brain: HypnogramFig, ai: OfflineTrainFig,
    brainCap: b('一夜约 4 到 5 个睡眠周期：前半夜深睡（N3）多，海马回放并巩固记忆；后半夜 REM 多，情绪记忆被重新加工。', 'A night has about four to five cycles: deep sleep (N3) dominates early, when the hippocampus replays and consolidates; REM dominates late, reworking emotional memories.'),
    aiCap: b('AI 的对应：在线交互收集经验进回放缓冲区，离线时用缓冲区和生成模型“做梦”产生的样本训练或蒸馏模型。多数部署中的系统没有这种定期离线周期。', 'The AI analogue: online interaction fills a replay buffer; offline, the model trains or distils on buffer samples plus generated “dreams”. Most deployed systems have no such regular offline cycle.'),
  },
  'sys-attention': {
    brain: AttentionBrainFig, ai: AttentionHeadFig,
    brainCap: b('注意：前额叶的目标自上而下放大相关特征；基底节像门一样决定什么进入只有约 4 格的工作记忆；少量信息进入全局工作空间向全脑广播。', 'Attention: PFC goals boost relevant features top-down; the basal ganglia gate what enters a ~4-slot working memory; a little information reaches a global workspace broadcast brain-wide.'),
    aiCap: b('注意力头：每个 token 投影成 Q、K、V，所有 token 两两比较得到 n×n 矩阵，再加权混合 V。它由内容相似度驱动，没有容量瓶颈，也不是由目标驱动。', 'Attention head: tokens project to Q, K, V, every pair is compared into an n×n matrix, then V is mixed by it. It is driven by content similarity, with no capacity bottleneck and no goal.'),
  },
}
