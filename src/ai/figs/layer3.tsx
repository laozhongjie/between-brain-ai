import type { Bi } from '../../data/types'
import { Arrow, Box, C, Dot, Line, Svg, T } from './kit'
import type { FigPair, FigProps } from './types'

const b = (zh: string, en: string): Bi => ({ zh, en })

// ───────────── Normalisation ─────────────

function PoolFig({ t }: FigProps) {
  const id = 'f-pool'
  const pool = [[60, 150], [110, 170], [210, 170], [260, 150], [160, 190]]
  return (
    <Svg id={id} label={t(b('除法归一化环路', 'Divisive normalization circuit'))}>
      <Arrow id={id} x1={160} y1={14} x2={160} y2={50} color="pink" label={t(b('驱动输入 xᵢ', 'drive xᵢ'))} lx={44} ly={0} />
      <Dot cx={160} cy={70} r={18} fill={C.pink} stroke={C.pinkD} label="rᵢ" size={12} />
      <Arrow id={id} x1={160} y1={88} x2={160} y2={120} color="pink" head="none" />
      {pool.map(([x, y], i) => (
        <g key={i}>
          <Dot cx={x} cy={y} r={11} fill={C.pink} stroke={C.pinkD} />
          <Arrow id={id} x1={x} y1={y - 11} x2={160 + (x - 160) * 0.2} y2={128} color="dim" width={1} />
        </g>
      ))}
      <Dot cx={160} cy={134} r={14} fill={C.sky} stroke={C.skyD} label="I" size={11} />
      <Arrow id={id} x1={148} y1={124} x2={150} y2={90} color="sky" head="bar" bend={-18} label={t(b('÷ 群体总活动', '÷ pooled activity'))} lx={-50} ly={-2} />
      <T x={60} y={210} size={9.5} color={C.dim} s={t(b('邻近群体', 'neighboring pool'))} />
      <T x={290} y={70} size={10.5} s="rᵢ = xᵢ / (σ + Σⱼ xⱼ)" />
      <T x={290} y={100} size={9.5} color={C.skyD} s={t(b('由抑制性中间\n神经元实现', 'implemented by\ninhibitory interneurons'))} />
    </Svg>
  )
}

function SoftmaxFig({ t }: FigProps) {
  const id = 'f-sm'
  const z = [2.0, 1.0, 0.2, -0.5]
  const e = z.map(Math.exp)
  const sum = e.reduce((a, c) => a + c)
  const p = e.map((v) => v / sum)
  const bars = (x0: number, vals: number[], scale: number, color: string, base = 150) => vals.map((v, i) => (
    <rect key={i} x={x0 + i * 16} y={base - Math.max(0, v) * scale} width={11} height={Math.abs(v) * scale} rx={2} fill={color} />
  ))
  return (
    <Svg id={id} label="Softmax">
      {bars(20, z.map((v) => v + 0.6), 30, C.skyD)}
      <T x={45} y={172} size={10} s={t(b('logits z', 'logits z'))} />
      <Arrow id={id} x1={90} y1={110} x2={122} y2={110} color="ink" label="exp" />
      {bars(132, e, 10, C.lavD)}
      <T x={157} y={172} size={10} s="eᶻ" />
      <Arrow id={id} x1={202} y1={110} x2={234} y2={110} color="ink" label="÷ Σ" />
      {bars(244, p, 120, C.mintD)}
      <T x={270} y={172} size={10} s={t(b('概率（和为 1）', 'probabilities (sum 1)'))} />
      <T x={180} y={206} size={10} color={C.dim} s={t(b('固定的全局运算：放大强者、压低弱者（竞争）', 'a fixed global op: boosts the strong, suppresses the weak'))} />
    </Svg>
  )
}

// ───────────── Feedback & predictive coding ─────────────

function PredictiveFig({ t }: FigProps) {
  const id = 'f-pc'
  const levels = [170, 105, 40]
  return (
    <Svg id={id} label={t(b('预测编码层级', 'Predictive-coding hierarchy'))}>
      {levels.map((y, i) => (
        <g key={i}>
          <T x={20} y={y} size={10} color={C.dim} s={t(b(`第 ${i + 1} 层`, `level ${i + 1}`))} />
          <Box x={70} y={y - 16} w={80} h={32} label={t(b('表征 r', 'repr. r'))} fill={C.lav} stroke={C.lavD} size={10.5} />
          <Box x={200} y={y - 16} w={80} h={32} label={t(b('误差 ε', 'error ε'))} fill={C.pink} stroke={C.pinkD} size={10.5} />
          <Arrow id={id} x1={150} y1={y} x2={198} y2={y} color="lav" head="bar" width={1.3} />
          {i < 2 && <Arrow id={id} x1={240} y1={y - 16} x2={130} y2={levels[i + 1] + 16} color="pink" label={i === 0 ? t(b('只上传误差', 'send error up')) : ''} lx={36} ly={2} />}
          {i < 2 && <Arrow id={id} x1={100} y1={levels[i + 1] + 16} x2={220} y2={y - 16} color="lav" dashed label={i === 0 ? t(b('向下预测', 'predict down')) : ''} lx={-40} ly={2} />}
        </g>
      ))}
      <Arrow id={id} x1={240} y1={222} x2={240} y2={188} color="ink" label={t(b('感觉输入', 'sensory input'))} lx={44} ly={0} />
      <T x={320} y={105} size={9.5} color={C.dim} s={t(b('迭代直到\n误差最小', 'iterate until\nerror is small'))} />
    </Svg>
  )
}

function JepaFig({ t }: FigProps) {
  const id = 'f-jepa'
  return (
    <Svg id={id} label="JEPA">
      <Box x={14} y={40} w={40} h={30} label="x" fill={C.sky} stroke={C.skyD} />
      <Arrow id={id} x1={54} y1={55} x2={78} y2={55} color="sky" />
      <Box x={80} y={36} w={70} h={38} label={t(b('编码器', 'encoder'))} fill={C.lav} stroke={C.lavD} />
      <Arrow id={id} x1={150} y1={55} x2={176} y2={55} color="lav" label="sₓ" />
      <Box x={178} y={36} w={70} h={38} label={t(b('预测器', 'predictor'))} fill={C.lav} stroke={C.lavD} />
      <Arrow id={id} x1={213} y1={100} x2={213} y2={76} color="dim" label="z" lx={10} ly={4} />
      <Arrow id={id} x1={248} y1={55} x2={316} y2={80} color="lav" label="ŝᵧ" />
      <Box x={14} y={140} w={40} h={30} label="y" fill={C.sky} stroke={C.skyD} />
      <Arrow id={id} x1={54} y1={155} x2={78} y2={155} color="sky" />
      <Box x={80} y={136} w={110} h={38} label={t(b('目标编码器', 'target encoder'))} fill={C.ghost} stroke={C.lavD} dashed />
      <Arrow id={id} x1={190} y1={155} x2={316} y2={130} color="lav" label="sᵧ" />
      <Box x={292} y={82} w={60} h={46} label={t(b('潜空间\n误差', 'latent\nloss'))} fill={C.pink} stroke={C.pinkD} size={10} />
      <T x={180} y={206} size={10} color={C.dim} s={t(b('在表征空间预测，而不是重建每个像素；但仍是一次前馈', 'predicts in representation space, not pixels; still one feedforward pass'))} />
    </Svg>
  )
}

// ───────────── Attractors ─────────────

function LandscapeFig({ t }: FigProps) {
  const id = 'f-land'
  // energy landscape: flat at y=40 with three valleys (stored memories) dipping to ~100
  const pts: [number, number][] = Array.from({ length: 121 }, (_, i) => {
    const u = i / 120
    const g = Math.exp(-(((u - 0.2) / 0.08) ** 2)) + 0.9 * Math.exp(-(((u - 0.55) / 0.09) ** 2)) + 0.8 * Math.exp(-(((u - 0.85) / 0.07) ** 2))
    return [20 + u * 312, 40 + 60 * g]
  })
  return (
    <Svg id={id} label={t(b('能量地形中的吸引子', 'Attractors in an energy landscape'))}>
      <Line pts={pts} color={C.lavD} width={2.2} />
      {[[82, t(b('记忆 1', 'memory 1'))], [191, t(b('记忆 2', 'memory 2'))], [285, t(b('记忆 3', 'memory 3'))]].map(([x, s], i) => (
        <T key={i} x={x as number} y={132} size={9.5} color={C.lavD} s={s as string} />
      ))}
      <Dot cx={140} cy={38} r={7} fill={C.peach} stroke={C.peachD} />
      <Arrow id={id} x1={146} y1={44} x2={182} y2={90} color="peach" bend={-8} />
      <T x={236} y={16} size={9.5} color={C.peachD} s={t(b('部分线索 → 滑向最近的记忆', 'partial cue → nearest memory'))} />
      <T x={20} y={16} anchor="start" size={9.5} color={C.dim} s={t(b('能量 E', 'energy E'))} />
      <g transform="translate(90,160)">
        {[[0, 0], [30, 10], [10, 34], [36, 44]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={7} fill={C.pink} stroke={C.pinkD} />)}
        <path d="M0,0 L30,10 L36,44 L10,34 Z M0,0 L36,44 M30,10 L10,34" fill="none" stroke={C.pinkD} strokeWidth={1} />
        <T x={60} y={22} anchor="start" size={9.5} color={C.pinkD} s={t(b('海马 CA3：大量循环兴奋连接\n实现模式补全', 'hippocampal CA3: dense recurrent\nexcitation for pattern completion'))} />
      </g>
    </Svg>
  )
}

function AttentionReadFig({ t }: FigProps) {
  const id = 'f-att'
  const w = [0.08, 0.66, 0.18, 0.08]
  return (
    <Svg id={id} label={t(b('注意力作为联想读取', 'Attention as associative read-out'))}>
      <Box x={14} y={96} w={40} h={30} label="q" fill={C.lav} stroke={C.lavD} size={13} />
      {w.map((v, i) => {
        const y = 30 + i * 44
        return (
          <g key={i}>
            <Box x={96} y={y} w={40} h={26} label={`k${'₁₂₃₄'[i]}`} fill={C.sky} stroke={C.skyD} size={10.5} />
            <Arrow id={id} x1={54} y1={111} x2={94} y2={y + 13} color="lav" width={1} head="none" />
            <rect x={150} y={y + 4} width={v * 70} height={18} rx={3} fill={C.lavD} />
            <Box x={236} y={y} w={40} h={26} label={`v${'₁₂₃₄'[i]}`} fill={C.mint} stroke={C.mintD} size={10.5} />
            <Arrow id={id} x1={276} y1={y + 13} x2={308} y2={111} color="mint" width={0.6 + v * 5} head="none" />
          </g>
        )
      })}
      <T x={185} y={20} size={9.5} color={C.lavD} s="softmax(q·k)" />
      <Dot cx={322} cy={111} r={14} fill={C.mint} stroke={C.mintD} label={t(b('读出', 'out'))} size={9.5} />
      <T x={180} y={214} size={10} color={C.dim} s={t(b('一步完成的读取，等价于现代 Hopfield 的一次更新', 'a one-step read, equal to one modern-Hopfield update'))} />
    </Svg>
  )
}

// ───────────── Expansion coding ─────────────

function CerebellumFig({ t }: FigProps) {
  const id = 'f-cb'
  const gy = Array.from({ length: 12 }, (_, i) => 40 + i * 13)
  return (
    <Svg id={id} label={t(b('小脑的扩展编码环路', 'Cerebellar expansion circuit'))}>
      {[70, 110, 150].map((y, i) => <Arrow key={i} id={id} x1={10} y1={y} x2={62} y2={y} color="sky" label={i === 0 ? t(b('苔藓纤维（少）', 'mossy fibers (few)')) : ''} ly={-24} lx={16} />)}
      {gy.map((y, i) => (
        <g key={i}>
          {[0, 1, 2, 3].map((k) => <line key={k} x1={64} y1={70 + ((i + k) % 3) * 40} x2={108} y2={y} stroke={C.skyD} strokeWidth={0.5} opacity={0.5} />)}
          <circle cx={112} cy={y} r={4.5} fill={i % 4 === 1 ? C.pinkD : C.pink} stroke={C.pinkD} strokeWidth={0.8} />
          <line x1={117} y1={y} x2={250} y2={y} stroke={C.pinkD} strokeWidth={i % 4 === 1 ? 1.4 : 0.6} opacity={i % 4 === 1 ? 0.9 : 0.35} />
        </g>
      ))}
      <T x={112} y={206} size={9.5} color={C.pinkD} s={t(b('颗粒细胞（极多、稀疏）\n每个只有约 4 个输入', 'granule cells (many, sparse)\n~4 inputs each'))} />
      <T x={190} y={26} size={9.5} color={C.dim} s={t(b('平行纤维', 'parallel fibers'))} />
      <path d="M270,40 L262,200 L290,200 Z" fill={C.lav} stroke={C.lavD} strokeWidth={1.4} />
      <T x={300} y={122} anchor="start" size={9.5} color={C.lavD} s={t(b('浦肯野细胞\n线性读出', 'Purkinje cell\nlinear read-out'))} />
      <Arrow id={id} x1={340} y1={216} x2={292} y2={186} color="peach" />
      <T x={300} y={18} size={9.5} color={C.peachD} s={t(b('攀缘纤维（右下）\n送来误差教学信号', 'climbing fiber (bottom right)\nbrings the error signal'))} />
    </Svg>
  )
}

function FfnFig({ t }: FigProps) {
  const id = 'f-ffn'
  const col = (x: number, n: number, gap: number, y0: number, lit?: Set<number>) => Array.from({ length: n }, (_, i) => (
    <circle key={i} cx={x} cy={y0 + i * gap} r={n > 8 ? 4.5 : 8} fill={lit ? (lit.has(i) ? C.lavD : C.ghost) : C.sky} stroke={lit ? C.lavD : C.skyD} />
  ))
  const lit = new Set([1, 4, 5, 9, 13])
  return (
    <Svg id={id} label={t(b('Transformer 前馈层', 'Transformer feed-forward layer'))}>
      {col(50, 4, 36, 60)}
      {col(180, 16, 11, 30, lit)}
      {col(310, 4, 36, 60)}
      <Arrow id={id} x1={62} y1={110} x2={168} y2={110} color="sky" label={t(b('W₁：扩展 ×4', 'W₁: expand ×4'))} />
      <Arrow id={id} x1={192} y1={110} x2={298} y2={110} color="lav" label={t(b('W₂：压回', 'W₂: project back'))} />
      <T x={50} y={200} size={10} s="d" />
      <T x={180} y={214} size={10} s={t(b('4d（ReLU 后部分为零）', '4d (partly zero after ReLU)'))} />
      <T x={310} y={200} size={10} s="d" />
      <T x={180} y={14} size={9.5} color={C.dim} s={t(b('稠密且全部可训练；小脑的扩展则极稀疏且大体固定', 'dense and fully trained; the cerebellum’s is very sparse and mostly fixed'))} />
    </Svg>
  )
}

export const LAYER3_FIGS: Record<string, FigPair> = {
  normalization: {
    brain: PoolFig, ai: SoftmaxFig,
    brainCap: b('除法归一化：神经元 rᵢ 的驱动被邻近群体的总活动除一下，这一步由抑制性中间神经元（I）完成，于是响应对整体强度不敏感。', 'Divisive normalization: neuron rᵢ’s drive is divided by the pool’s total activity via an inhibitory interneuron (I), making responses insensitive to overall intensity.'),
    aiCap: b('Softmax：先取指数再除以总和，强者更强、弱者更弱，输出和为 1。它是一个固定的全局运算。', 'Softmax: exponentiate then divide by the sum; strong entries grow, weak ones shrink, outputs sum to 1. It is a fixed global op.'),
  },
  'feedback-predictive': {
    brain: PredictiveFig, ai: JepaFig,
    brainCap: b('预测编码：每一层的表征向下预测下一层（虚线），误差单元只把「没预测到的部分」向上传（实线），反复迭代直到误差变小。', 'Predictive coding: each level’s representation predicts the level below (dashed); error units send only the unexplained part upward (solid), iterating until error is small.'),
    aiCap: b('JEPA：x 和 y 分别编码，预测器在潜空间里由 sₓ 预测 sᵧ，损失在表征空间计算。它借鉴了「预测」，但推理仍是一次前馈。', 'JEPA: x and y are encoded separately and a predictor maps sₓ to sᵧ in latent space, with the loss computed there. It borrows prediction, but inference is still one feedforward pass.'),
  },
  attractors: {
    brain: LandscapeFig, ai: AttentionReadFig,
    brainCap: b('吸引子：存储的记忆是能量地形的谷底，给出部分线索后，循环网络（如海马 CA3）的活动会滑向最近的谷底，完成模式补全。', 'Attractors: stored memories are valleys; from a partial cue, recurrent activity (e.g. hippocampal CA3) slides into the nearest valley, completing the pattern.'),
    aiCap: b('注意力：查询 q 与每个键 k 比较，softmax 得到权重，再按权重混合值 v。这一步与现代 Hopfield 网络的一次更新在数学上相同。', 'Attention: q is compared with every key k, softmax gives weights, and the values v are mixed by them; mathematically one modern-Hopfield update.'),
  },
  expansion: {
    brain: CerebellumFig, ai: FfnFig,
    brainCap: b('小脑：少量苔藓纤维投射到数量极多的颗粒细胞（每个约 4 个输入，只有少数活跃），再由浦肯野细胞线性读出；攀缘纤维送来误差信号。', 'Cerebellum: few mossy fibers fan out to vast numbers of granule cells (~4 inputs each, few active), read out linearly by Purkinje cells; climbing fibers bring the error signal.'),
    aiCap: b('Transformer 前馈层：把 d 维扩展到 4d，经过 ReLU 后再压回 d。结构相似，但这里的扩展是稠密且全部参与训练的。', 'Transformer FFN: expand d to 4d, apply ReLU, project back to d. Similar shape, but the expansion is dense and fully trained.'),
  },
}
