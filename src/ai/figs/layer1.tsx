import type { Bi } from '../../data/types'
import { Arrow, Box, C, Dot, Grid, Line, Spikes, Svg, T, plot } from './kit'
import type { FigPair, FigProps } from './types'

const b = (zh: string, en: string): Bi => ({ zh, en })

// ───────────── Synaptic efficacy ↔ weights ─────────────

function SynapseFig({ t }: FigProps) {
  const id = 'f-syn'
  return (
    <Svg id={id} label={t(b('化学突触结构', 'Chemical synapse'))}>
      <Arrow id={id} x1={150} y1={4} x2={150} y2={30} color="pink" label={t(b('动作电位', 'spike'))} lx={-30} ly={0} />
      <rect x={70} y={30} width={160} height={68} rx={30} fill={C.pink} stroke={C.pinkD} strokeWidth={1.4} />
      {[[100, 52], [128, 66], [156, 50], [184, 68], [210, 54]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7} fill={C.white} stroke={C.pinkD} strokeWidth={1.2} />
      ))}
      <path d="M142,98 a8,8 0 0 1 16,0" fill={C.white} stroke={C.pinkD} strokeWidth={1.2} />
      {[[138, 106], [150, 111], [162, 105], [146, 116], [158, 115]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2} fill={C.pinkD} />)}
      <rect x={60} y={120} width={180} height={64} rx={12} fill={C.lav} stroke={C.lavD} strokeWidth={1.4} />
      {[102, 130, 158, 186, 214].map((x, i) => <rect key={i} x={x - 6} y={116} width={12} height={9} rx={2} fill={C.mint} stroke={C.mintD} strokeWidth={1.2} />)}
      <Arrow id={id} x1={150} y1={184} x2={150} y2={214} color="lav" label={t(b('突触后电流', 'postsynaptic current'))} lx={50} ly={4} />
      <T x={242} y={40} anchor="start" size={10} s={t(b('突触前终末', 'presynaptic terminal'))} />
      <T x={242} y={64} anchor="start" size={10} s={t(b('囊泡：按概率 p 释放', 'vesicles: release with prob. p'))} />
      <T x={242} y={108} anchor="start" size={10} color={C.dim} s={t(b('突触间隙（递质）', 'cleft (transmitter)'))} />
      <T x={242} y={130} anchor="start" size={10} color={C.mintD} s={t(b('受体：数量决定强度', 'receptors: number sets strength'))} />
      <T x={242} y={160} anchor="start" size={10} s={t(b('突触后神经元', 'postsynaptic neuron'))} />
      <T x={8} y={140} anchor="start" size={9.5} color={C.pinkD} s={t(b('正负号\n由细胞类型\n固定', 'sign fixed\nby cell\ntype'))} />
    </Svg>
  )
}

function NeuronUnitFig({ t }: FigProps) {
  const id = 'f-unit'
  const ins: [number, string, string][] = [[55, 'x₁', 'w₁ = +0.8'], [115, 'x₂', 'w₂ = −1.2'], [175, 'x₃', 'w₃ = +0.3']]
  return (
    <Svg id={id} label={t(b('人工神经元', 'Artificial neuron'))}>
      {ins.map(([y, n, w], i) => (
        <g key={i}>
          <Dot cx={40} cy={y} r={15} fill={C.sky} stroke={C.skyD} label={n} size={11} />
          <Arrow id={id} x1={56} y1={y} x2={176} y2={115 + (y - 115) * 0.2} color={i === 1 ? 'pink' : 'sky'} width={i === 1 ? 2.4 : 1.8} label={w} ly={y < 115 ? -9 : y > 115 ? 12 : -9} />
        </g>
      ))}
      <Dot cx={200} cy={115} r={24} fill={C.lav} stroke={C.lavD} label="Σ" size={16} />
      <Arrow id={id} x1={200} y1={175} x2={200} y2={140} color="dim" label={t(b('偏置 b', 'bias b'))} lx={26} ly={10} />
      <Arrow id={id} x1={224} y1={115} x2={254} y2={115} color="lav" />
      <Box x={256} y={98} w={36} h={34} label="φ" fill={C.lav} stroke={C.lavD} size={15} />
      <Arrow id={id} x1={292} y1={115} x2={318} y2={115} color="lav" />
      <Dot cx={334} cy={115} r={15} fill={C.mint} stroke={C.mintD} label="y" size={12} />
      <T x={180} y={214} size={10} color={C.dim} s={t(b('每条连接 = 一个实数：可正可负，推理时固定', 'each connection = one real number: any sign, fixed at inference'))} />
    </Svg>
  )
}

// ───────────── Short-term plasticity ↔ fast weights ─────────────

const DEP = [1, 0.55, 0.36, 0.26, 0.21, 0.18, 0.17, 0.16, 0.5]
const FAC = [1, 1.7, 2.2, 2.5, 2.7, 2.8, 2.9, 3.0, 3.6]
const SPIKE_X = [...Array.from({ length: 8 }, (_, i) => 110 + i * 24), 330]

function StpFig({ t }: FigProps) {
  const id = 'f-stp'
  const bars = (vals: number[], base: number, scale: number, color: string) =>
    vals.map((v, i) => <rect key={i} x={SPIKE_X[i] - 5} y={base - v * scale} width={10} height={v * scale} rx={2} fill={color} />)
  return (
    <Svg id={id} label={t(b('短时抑制与易化', 'Short-term depression and facilitation'))}>
      <T x={8} y={30} anchor="start" size={10.5} s={t(b('突触前放电', 'presynaptic spikes'))} />
      <Spikes xs={SPIKE_X} y={40} h={18} />
      <Line pts={[[100, 40], [345, 40]]} color={C.line} width={1} />
      <T x={8} y={95} anchor="start" size={10.5} color={C.pinkD} s={t(b('抑制型突触\n（变化检测）', 'depressing\n(change detector)'))} />
      {bars(DEP, 118, 40, C.pinkD)}
      <Line pts={[[100, 118], [345, 118]]} color={C.line} width={1} />
      <T x={8} y={180} anchor="start" size={10.5} color={C.lavD} s={t(b('易化型突触\n（连发检测）', 'facilitating\n(burst detector)'))} />
      {bars(FAC, 212, 22, C.lavD)}
      <Line pts={[[100, 212], [345, 212]]} color={C.line} width={1} />
      <Arrow id={id} x1={292} y1={24} x2={322} y2={24} color="dim" label={t(b('500 ms 后', '500 ms later'))} ly={-8} />
      <T x={225} y={132} size={9.5} color={C.dim} s={t(b('资源 x 耗尽 → 越来越弱', 'resources x deplete → weaker'))} />
      <T x={205} y={226} size={9.5} color={C.dim} s={t(b('利用率 u 升高 → 越来越强', 'utilisation u rises → stronger'))} />
    </Svg>
  )
}

function FastWeightFig({ t }: FigProps) {
  const id = 'f-fw'
  const vals = Array.from({ length: 6 }, (_, r) => Array.from({ length: 6 }, (_, c) => ((r * 7 + c * 3) % 10) / 12 + (r === c ? 0.3 : 0)))
  return (
    <Svg id={id} label={t(b('快权重 / 线性注意力', 'Fast weights / linear attention'))}>
      {['1', '2', '3', '4'].map((n, i) => (
        <g key={n}>
          <Box x={30 + i * 72} y={10} w={60} h={30} label={`k${'₁₂₃₄'[i]} v${'₁₂₃₄'[i]}`} fill={C.sky} stroke={C.skyD} />
          <Arrow id={id} x1={60 + i * 72} y1={40} x2={150 + i * 12} y2={82} color="sky" dashed />
        </g>
      ))}
      <T x={320} y={62} size={10} color={C.skyD} s={t(b('逐个写入\nW += v kᵀ', 'write each\nW += v kᵀ'))} />
      <Grid x={140} y={86} rows={6} cols={6} cell={14} vals={vals} />
      <T x={182} y={180} size={10.5} weight={600} s={t(b('快权重矩阵 Wₜ', 'fast-weight matrix Wₜ'))} />
      <T x={182} y={195} size={9.5} color={C.dim} s={t(b('每步先 × λ 衰减，再写入', 'each step: decay × λ, then write'))} />
      <Box x={30} y={110} w={52} h={32} label="q" fill={C.lav} stroke={C.lavD} size={13} />
      <Arrow id={id} x1={82} y1={126} x2={138} y2={126} color="lav" label={t(b('查询', 'query'))} />
      <Arrow id={id} x1={226} y1={126} x2={282} y2={126} color="lav" label={t(b('读出', 'read'))} />
      <Box x={284} y={110} w={62} h={32} label="y = W q" fill={C.mint} stroke={C.mintD} />
      <T x={180} y={218} size={10} color={C.dim} s={t(b('矩阵随上下文变化，相当于会变的“突触”', 'the matrix changes with context, like plastic synapses'))} />
    </Svg>
  )
}

// ───────────── STDP ↔ local learning ─────────────

function StdpFig({ t }: FigProps) {
  const id = 'f-stdp'
  return (
    <Svg id={id} label={t(b('脉冲时序依赖可塑性', 'Spike-timing-dependent plasticity'))}>
      <Dot cx={36} cy={40} r={14} label={t(b('前', 'pre'))} />
      <Arrow id={id} x1={50} y1={40} x2={120} y2={40} color="pink" label={t(b('突触 w', 'synapse w'))} />
      <Dot cx={136} cy={40} r={14} fill={C.lav} stroke={C.lavD} label={t(b('后', 'post'))} />
      <T x={10} y={92} anchor="start" size={10} s={t(b('前', 'pre'))} /><Spikes xs={[60]} y={98} />
      <T x={10} y={116} anchor="start" size={10} s={t(b('后', 'post'))} /><Spikes xs={[92]} y={122} color={C.lavD} />
      <Arrow id={id} x1={60} y1={132} x2={92} y2={132} color="mint" width={1.2} label="Δt > 0" ly={10} both />
      <T x={150} y={106} anchor="start" size={10.5} color={C.mintD} weight={600} s={t(b('先前后后 → 增强', 'pre then post → strengthen'))} />
      <T x={10} y={168} anchor="start" size={10} s={t(b('前', 'pre'))} /><Spikes xs={[92]} y={174} />
      <T x={10} y={192} anchor="start" size={10} s={t(b('后', 'post'))} /><Spikes xs={[60]} y={198} color={C.lavD} />
      <Arrow id={id} x1={60} y1={208} x2={92} y2={208} color="pink" width={1.2} label="Δt < 0" ly={10} both />
      <T x={150} y={184} anchor="start" size={10.5} color={C.pinkD} weight={600} s={t(b('先后后前 → 削弱', 'post then pre → weaken'))} />
      <g transform="translate(250,20)">
        <Line pts={[[0, 50], [100, 50]]} color={C.line} width={1} />
        <Line pts={[[50, 0], [50, 100]]} color={C.line} width={1} />
        <Line pts={plot((u) => Math.exp(-u * 4), 50, 100, 50, 45)} color={C.mintD} width={2} />
        <Line pts={plot((u) => -Math.exp(-(1 - u) * 4), 0, 50, 50, 40)} color={C.pinkD} width={2} />
        <T x={96} y={62} size={9} color={C.dim} s="Δt" />
        <T x={62} y={6} size={9} color={C.dim} s="Δw" />
      </g>
    </Svg>
  )
}

function DiffPlasticityFig({ t }: FigProps) {
  const id = 'f-dp'
  return (
    <Svg id={id} label={t(b('可微可塑性', 'Differentiable plasticity'))}>
      <Dot cx={40} cy={90} r={16} fill={C.sky} stroke={C.skyD} label="xᵢ" size={12} />
      <Arrow id={id} x1={56} y1={90} x2={96} y2={90} color="sky" />
      <Box x={98} y={56} w={150} h={68} fill={C.white} stroke={C.lavD} r={10} />
      <Box x={108} y={64} w={56} h={52} label={t(b('w\n慢权重', 'w\nslow'))} fill={C.lav} stroke={C.lavD} size={10.5} />
      <T x={173} y={90} s="+" size={16} />
      <Box x={182} y={64} w={58} h={52} label={t(b('α·Hebb\n快迹', 'α·Hebb\nfast trace'))} fill={C.lemon} stroke={C.lemonD} size={10.5} />
      <Arrow id={id} x1={248} y1={90} x2={288} y2={90} color="lav" />
      <Dot cx={304} cy={90} r={16} fill={C.mint} stroke={C.mintD} label="yⱼ" size={12} />
      <Arrow id={id} x1={40} y1={108} x2={200} y2={124} bend={-40} color="lemon" dashed />
      <Arrow id={id} x1={304} y1={108} x2={222} y2={124} bend={30} color="lemon" dashed />
      <T x={170} y={176} size={10.5} color={C.lemonD} s={t(b('推理时在线更新：Hebb ← η·xᵢ·yⱼ', 'updated online at inference: Hebb ← η·xᵢ·yⱼ'))} />
      <Box x={276} y={16} w={70} h={28} label={t(b('损失 L', 'loss L'))} fill={C.pink} stroke={C.pinkD} />
      <Arrow id={id} x1={276} y1={30} x2={140} y2={62} bend={-20} color="pink" dashed label={t(b('离线反向传播：学 w 和 α', 'offline backprop learns w and α'))} ly={-14} lx={-10} />
      <T x={180} y={214} size={10} color={C.dim} s={t(b('部署后，快迹让网络继续自我调整', 'after deployment, the fast trace keeps adapting the network'))} />
    </Svg>
  )
}

// ───────────── Three-factor learning ↔ backprop ─────────────

function ThreeFactorFig({ t }: FigProps) {
  const id = 'f-3f'
  return (
    <Svg id={id} label={t(b('三因子学习', 'Three-factor learning'))}>
      {[40, 90, 140].map((y, i) => (
        <g key={i}>
          <Dot cx={30} cy={y} r={11} />
          <Arrow id={id} x1={41} y1={y} x2={118} y2={y} color="pink" />
          <Dot cx={130} cy={y} r={11} fill={C.lav} stroke={C.lavD} />
        </g>
      ))}
      <rect x={70} y={78} width={34} height={14} rx={3} fill={C.lemon} stroke={C.lemonD} />
      <T x={87} y={85} size={9} color={C.lemonD} weight={600} s="e" />
      <T x={30} y={172} size={9.5} color={C.lemonD} anchor="start" s={t(b('资格迹：只有刚刚\n共同放电的突触带“标签”', 'eligibility: only synapses that\njust co-fired carry a tag'))} />
      <Dot cx={210} cy={200} r={14} fill={C.peach} stroke={C.peachD} label="DA" size={10} />
      <T x={250} y={214} size={9.5} color={C.peachD} anchor="start" s={t(b('多巴胺神经元', 'dopamine neuron'))} />
      {[40, 90, 140].map((y, i) => <Arrow key={i} id={id} x1={206} y1={186} x2={96} y2={y + 4} color="peach" dashed bend={-10} width={1.2} />)}
      <T x={188} y={150} size={9.5} color={C.peachD} s={t(b('M：广播到\n大量突触', 'M: broadcast\nto many synapses'))} />
      <g transform="translate(236,20)">
        <Line pts={[[0, 90], [118, 90]]} color={C.line} width={1} />
        <Line pts={plot((u) => Math.exp(-u * 3.2), 4, 116, 90, 70)} color={C.lemonD} width={2} />
        <Line pts={[[62, 90], [62, 30], [74, 30], [74, 90]]} color={C.peachD} width={2} />
        <T x={4} y={100} size={9} color={C.dim} anchor="start" s={t(b('t=0 共同放电', 't=0 co-firing'))} />
        <T x={70} y={22} size={9} color={C.peachD} s={t(b('1 s 后奖赏', 'reward 1 s later'))} />
        <T x={30} y={40} size={9} color={C.lemonD} s="e(t)" />
      </g>
      <T x={296} y={134} size={9.5} color={C.dim} s={t(b('Δw ∝ M × e', 'Δw ∝ M × e'))} />
    </Svg>
  )
}

function BackpropFig({ t }: FigProps) {
  const id = 'f-bp'
  const cols: [number, number, string][] = [[34, 3, 'x'], [104, 4, 'h₁'], [174, 4, 'h₂'], [244, 2, 'y']]
  return (
    <Svg id={id} label={t(b('反向传播', 'Backpropagation'))}>
      {cols.map(([x, n, name], ci) => (
        <g key={ci}>
          {Array.from({ length: n }, (_, i) => {
            const y = 100 + (i - (n - 1) / 2) * 32
            return <Dot key={i} cx={x} cy={y} r={10} fill={ci === 0 ? C.sky : ci === 3 ? C.mint : C.lav} stroke={ci === 0 ? C.skyD : ci === 3 ? C.mintD : C.lavD} />
          })}
          <T x={x} y={170} size={10.5} s={name} weight={600} />
          {ci < 3 && <Arrow id={id} x1={x + 14} y1={60} x2={cols[ci + 1][0] - 14} y2={60} color="ink" label={t(b('前向', 'forward'))} ly={-8} size={9} />}
        </g>
      ))}
      <Box x={284} y={82} w={62} h={36} label={t(b('损失 L', 'loss L'))} fill={C.pink} stroke={C.pinkD} />
      <Arrow id={id} x1={254} y1={100} x2={282} y2={100} color="ink" />
      {[[284, 174], [174, 104], [104, 34]].map(([a, c], i) => (
        <Arrow key={i} id={id} x1={a - 8} y1={140} x2={c + 14} y2={140} color="pink" dashed label={i === 0 ? 'δ' : 'Wᵀδ'} ly={10} />
      ))}
      <T x={180} y={200} size={10} color={C.pinkD} s={t(b('误差沿同一组权重的转置 Wᵀ 逐层传回', 'error flows back through the transposed weights Wᵀ'))} />
      <T x={180} y={218} size={9.5} color={C.dim} s={t(b('需要：对称权重 · 存下全部激活 · 前向与反向两个阶段', 'needs: symmetric weights · stored activations · two phases'))} />
    </Svg>
  )
}

// ───────────── Consolidation ↔ EWC ─────────────

function CascadeFig({ t }: FigProps) {
  const id = 'f-bf'
  const beakers = [[30, 0.75], [110, 0.55], [190, 0.4], [270, 0.3]] as const
  return (
    <Svg id={id} label={t(b('Benna–Fusi 突触级联', 'Benna–Fusi synaptic cascade'))}>
      <Arrow id={id} x1={60} y1={14} x2={60} y2={50} color="pink" label={t(b('学习写入', 'learning writes'))} lx={48} ly={0} />
      {beakers.map(([x, lvl], i) => (
        <g key={i}>
          <rect x={x} y={120 - lvl * 60} width={60} height={lvl * 60 + 0} fill={i === 0 ? C.pink : C.lav} opacity={0.9} />
          <path d={`M${x},56 L${x},120 L${x + 60},120 L${x + 60},56`} fill="none" stroke={C.ink} strokeWidth={1.6} />
          <T x={x + 30} y={138} size={11} weight={600} s={`u${'₁₂₃₄'[i]}`} />
          {i < 3 && <rect x={x + 60} y={112} width={20} height={Math.max(2, 7 - i * 2)} fill={C.lavD} />}
        </g>
      ))}
      <T x={60} y={160} size={10} color={C.pinkD} s={t(b('可见权重\n变化快', 'visible weight\nfast'))} />
      <T x={300} y={160} size={10} color={C.lavD} s={t(b('最慢\n最稳定', 'slowest\nmost stable'))} />
      <Arrow id={id} x1={96} y1={194} x2={300} y2={194} color="dim" label={t(b('越往右，时间常数越长', 'time constant grows to the right'))} ly={12} />
      <T x={180} y={40} size={10} color={C.dim} s={t(b('细管连接：变化慢慢流向更慢的变量', 'thin pipes: changes seep into slower variables'))} />
    </Svg>
  )
}

function EwcFig({ t }: FigProps) {
  const id = 'f-ewc'
  return (
    <Svg id={id} label={t(b('EWC 在参数空间中的作用', 'EWC in parameter space'))}>
      <Line pts={[[20, 210], [340, 210]]} color={C.line} width={1} />
      <Line pts={[[20, 210], [20, 14]]} color={C.line} width={1} />
      <T x={330} y={222} size={9.5} color={C.dim} s="θ₁" />
      <T x={10} y={20} size={9.5} color={C.dim} s="θ₂" />
      <ellipse cx={130} cy={130} rx={105} ry={30} fill={C.sky} fillOpacity={0.7} stroke={C.skyD} />
      <T x={70} y={130} size={10} color={C.skyD} s={t(b('任务 A 低损失区', 'task A low loss'))} />
      <ellipse cx={240} cy={100} rx={30} ry={80} fill={C.pink} fillOpacity={0.55} stroke={C.pinkD} />
      <T x={240} y={32} size={10} color={C.pinkD} s={t(b('任务 B 低损失区', 'task B low loss'))} />
      <Dot cx={130} cy={130} r={5} fill={C.skyD} stroke={C.skyD} />
      <T x={130} y={146} size={9.5} s="θ*(A)" />
      <Dot cx={240} cy={70} r={5} fill={C.pinkD} stroke={C.pinkD} />
      <Arrow id={id} x1={134} y1={126} x2={236} y2={73} color="pink" dashed label={t(b('普通训练：忘掉 A', 'plain training: forgets A'))} ly={-12} lx={-20} />
      <Arrow id={id} x1={136} y1={132} x2={226} y2={132} color="mint" width={2.2} label="EWC" ly={12} />
      <Dot cx={228} cy={132} r={5} fill={C.mintD} stroke={C.mintD} />
      <T x={180} y={186} size={10} color={C.mintD} s={t(b('沿 A 不在乎的方向移动，停在两区交叠处', 'moves along directions A does not care about, stops in the overlap'))} />
    </Svg>
  )
}

// ───────────── Structural plasticity ↔ pruning ─────────────

function SpinesFig({ t }: FigProps) {
  const id = 'f-sp'
  const rows: [number, string, [number, 'keep' | 'new' | 'lost'][]][] = [
    [40, t(b('第 1 天', 'day 1')), [[90, 'keep'], [130, 'keep'], [170, 'keep'], [210, 'keep']]],
    [95, t(b('学习中', 'learning')), [[90, 'keep'], [115, 'new'], [130, 'lost'], [170, 'keep'], [190, 'new'], [210, 'keep']]],
    [150, t(b('数周后', 'weeks later')), [[90, 'keep'], [115, 'keep'], [170, 'keep'], [190, 'keep']]],
  ]
  return (
    <Svg id={id} label={t(b('树突棘的新生与消失', 'Spine gain and loss'))}>
      {rows.map(([y, name, spines]) => (
        <g key={y}>
          <T x={10} y={y} anchor="start" size={10} s={name} />
          <Line pts={[[70, y + 10], [230, y + 10]]} color={C.pinkD} width={4} />
          {spines.map(([x, kind], i) => (
            <g key={i}>
              <line x1={x} x2={x} y1={y + 8} y2={y - 6} stroke={kind === 'new' ? C.mintD : kind === 'lost' ? C.line : C.pinkD} strokeWidth={2.4} strokeDasharray={kind === 'lost' ? '2 2' : undefined} />
              <circle cx={x} cy={y - 9} r={4} fill={kind === 'new' ? C.mint : kind === 'lost' ? C.white : C.pink} stroke={kind === 'new' ? C.mintD : kind === 'lost' ? C.line : C.pinkD} strokeDasharray={kind === 'lost' ? '2 2' : undefined} />
            </g>
          ))}
        </g>
      ))}
      <T x={150} y={190} size={9.5} color={C.mintD} s={t(b('绿：新生', 'green: new'))} />
      <T x={210} y={190} size={9.5} color={C.dim} s={t(b('虚线：消失', 'dashed: lost'))} />
      <g transform="translate(250,30)">
        <Line pts={[[0, 120], [100, 120]]} color={C.line} width={1} />
        <Line pts={[[0, 120], [0, 0]]} color={C.line} width={1} />
        <Line pts={plot((u) => (u < 0.3 ? u / 0.3 : 1 - 0.45 * Math.min(1, (u - 0.3) / 0.5)), 2, 98, 118, 95)} color={C.pinkD} width={2} />
        <T x={50} y={134} size={9} color={C.dim} s={t(b('年龄', 'age'))} />
        <T x={-8} y={-8} anchor="start" size={9} color={C.dim} s={t(b('突触密度', 'synapse density'))} />
        <T x={70} y={46} size={9} color={C.pinkD} s={t(b('修剪', 'pruning'))} />
      </g>
    </Svg>
  )
}

function PruneFig({ t }: FigProps) {
  const id = 'f-pr'
  const L = [50, 90, 130, 170]
  const net = (x0: number, keep: (i: number, j: number) => boolean) => (
    <g>
      {L.map((a, i) => L.map((c, j) => keep(i, j) && <line key={`${i}${j}`} x1={x0} y1={a} x2={x0 + 70} y2={c} stroke={C.lavD} strokeWidth={1.1} opacity={0.8} />))}
      {L.map((y, i) => <circle key={`a${i}`} cx={x0} cy={y} r={8} fill={C.sky} stroke={C.skyD} />)}
      {L.map((y, i) => <circle key={`b${i}`} cx={x0 + 70} cy={y} r={8} fill={C.lav} stroke={C.lavD} />)}
    </g>
  )
  return (
    <Svg id={id} label={t(b('剪枝与彩票假说', 'Pruning and the lottery ticket'))}>
      {net(30, () => true)}
      <T x={65} y={200} size={10} s={t(b('稠密网络', 'dense'))} />
      <Arrow id={id} x1={112} y1={110} x2={160} y2={110} color="pink" label={t(b('剪掉小权重', 'prune small'))} />
      {net(190, (i, j) => (i * 3 + j * 2) % 5 === 0 || i === j)}
      <T x={225} y={200} size={10} s={t(b('稀疏子网络', 'sparse subnetwork'))} />
      <Arrow id={id} x1={270} y1={110} x2={300} y2={110} color="mint" />
      <T x={328} y={110} size={10} color={C.mintD} s={t(b('重新\n训练\n同精度', 'retrain:\nsame\naccuracy'))} />
      <T x={180} y={222} size={9.5} color={C.dim} s={t(b('通常在训练后才调整结构，而不是终身变化', 'structure usually changes after training, not throughout life'))} />
    </Svg>
  )
}

// ───────────── Glia ↔ (absent) ─────────────

function GliaFig({ t }: FigProps) {
  const id = 'f-gl'
  return (
    <Svg id={id} label={t(b('三方突触', 'Tripartite synapse'))}>
      <path d="M40,60 C40,20 110,10 150,40 C190,10 250,20 250,70 C280,100 280,150 250,170 C240,210 70,210 60,170 C30,150 20,100 40,60 Z" fill={C.lav} opacity={0.55} stroke={C.lavD} strokeDasharray="4 3" />
      <rect x={100} y={60} width={100} height={46} rx={22} fill={C.pink} stroke={C.pinkD} />
      <T x={150} y={83} size={10} s={t(b('突触前', 'pre'))} />
      <rect x={96} y={120} width={108} height={40} rx={10} fill={C.sky} stroke={C.skyD} />
      <T x={150} y={140} size={10} s={t(b('突触后', 'post'))} />
      <T x={60} y={40} size={10} color={C.lavD} weight={600} s={t(b('星形胶质细胞', 'astrocyte'))} />
      <Arrow id={id} x1={206} y1={112} x2={260} y2={96} color="lav" label={t(b('回收递质', 'recycle transmitter'))} lx={40} ly={-2} />
      <Arrow id={id} x1={256} y1={140} x2={208} y2={132} color="lav" />
      <T x={300} y={146} size={9.5} color={C.lavD} s={t(b('Ca²⁺ 信号\n调节传递\n（秒到分钟）', 'Ca²⁺ signals\nmodulate\n(s to min)'))} />
      <Arrow id={id} x1={70} y1={190} x2={100} y2={160} color="peach" label={t(b('供能', 'energy'))} lx={-20} ly={6} />
    </Svg>
  )
}

function HyperFig({ t }: FigProps) {
  const id = 'f-hy'
  return (
    <Svg id={id} label={t(b('超网络（最接近的对应）', 'Hypernetwork (closest analogue)'))}>
      <T x={180} y={16} size={10.5} color={C.dim} s={t(b('主流 AI 中缺失，最接近的是超网络/慢速调制', 'absent in mainstream AI; closest: hypernetworks / slow modulation'))} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Box x={40 + i * 100} y={130} w={80} h={40} label={t(b(`主网络层 ${i + 1}`, `main layer ${i + 1}`))} fill={C.sky} stroke={C.skyD} />
          {i < 2 && <Arrow id={id} x1={120 + i * 100} y1={150} x2={140 + i * 100} y2={150} color="sky" />}
          <Arrow id={id} x1={180} y1={80} x2={80 + i * 100} y2={128} color="lav" dashed />
        </g>
      ))}
      <Box x={130} y={44} w={100} h={36} label={t(b('慢速调制网络', 'slow modulator'))} fill={C.lav} stroke={C.lavD} dashed />
      <T x={300} y={96} size={9.5} color={C.lavD} s={t(b('生成增益\n或学习率', 'emits gains\nor learning rates'))} />
      <T x={180} y={200} size={10} color={C.dim} s={t(b('缺少：与“能量”和局部活动挂钩的慢速调节层', 'missing: a slow layer tied to energy and local activity'))} />
    </Svg>
  )
}

export const LAYER1_FIGS: Record<string, FigPair> = {
  'synapse-weight': {
    brain: SynapseFig, ai: NeuronUnitFig,
    brainCap: b('化学突触：动作电位让囊泡按概率释放递质，受体把它变成突触后电流。“权重”由受体数量和释放概率共同决定，正负号由神经元类型固定。', 'Chemical synapse: a spike releases vesicles with some probability and receptors turn transmitter into current. “Weight” = receptor count × release probability; the sign is fixed by cell type.'),
    aiCap: b('人工神经元：每条连接只是一个实数权重，可正可负，输入加权求和后经过激活函数 φ。推理时权重不变。', 'Artificial neuron: each connection is one signed real weight; inputs are summed and passed through φ. Weights are fixed at inference.'),
  },
  'short-term-plasticity': {
    brain: StpFig, ai: FastWeightFig,
    brainCap: b('同一串突触前脉冲：抑制型突触一次比一次弱（资源 x 耗尽），易化型突触一次比一次强（利用率 u 升高），停顿后恢复。', 'The same spike train: a depressing synapse weakens (resources x deplete), a facilitating one strengthens (utilisation u rises), both recover after a pause.'),
    aiCap: b('快权重 / 线性注意力：每个 token 把 v kᵀ 叠加进矩阵 W，查询 q 乘以 W 读出相关内容。W 随上下文变化，像一组会变的突触。', 'Fast weights / linear attention: each token adds v kᵀ to a matrix W; a query q reads W. W changes with context, like plastic synapses.'),
  },
  stdp: {
    brain: StdpFig, ai: DiffPlasticityFig,
    brainCap: b('STDP：突触前先于突触后放电则增强，反之削弱。规则只用到突触两端的放电时刻，右上是完整的时间窗。', 'STDP: pre-before-post strengthens, the reverse weakens. The rule uses only spike times at the two ends; the full window is top-right.'),
    aiCap: b('可微可塑性：连接 = 慢权重 w + α·Hebb 快迹。w 和 α 离线由反向传播学得，Hebb 迹在推理时按 xᵢ·yⱼ 在线更新。', 'Differentiable plasticity: connection = slow weight w + α·Hebb trace. w and α are learned offline by backprop; the trace updates online from xᵢ·yⱼ.'),
  },
  'three-factor': {
    brain: ThreeFactorFig, ai: BackpropFig,
    brainCap: b('三因子规则：刚刚共同放电的突触留下衰减的资格迹 e（黄标签）；约 1 秒后多巴胺 M 广播到大量突触，只有带迹的突触被改写。', 'Three-factor rule: synapses that just co-fired carry a decaying eligibility trace e (yellow tag); ~1 s later dopamine M is broadcast and only tagged synapses change.'),
    aiCap: b('反向传播：前向算出损失，误差 δ 沿转置权重 Wᵀ 逐层传回，给每个权重精确的梯度。代价是对称权重、存储所有激活和两阶段计算。', 'Backprop: a forward pass computes the loss, then δ flows back through Wᵀ giving every weight an exact gradient, at the cost of symmetric weights, stored activations and two phases.'),
  },
  consolidation: {
    brain: CascadeFig, ai: EwcFig,
    brainCap: b('Benna–Fusi 级联：新变化先进入快变量 u₁，再经细管慢慢流向更慢的变量。越靠右越稳定，所以旧记忆不容易被新学习冲掉。', 'Benna–Fusi cascade: changes enter the fast variable u₁ and slowly seep into slower ones; the right-hand side is stable, so old memories resist being overwritten.'),
    aiCap: b('EWC：任务 A 的低损失区在不重要的方向上很宽。学习任务 B 时，EWC 沿这些方向移动参数，停在两区交叠处；普通训练则直接跑到 B，忘掉 A。', 'EWC: task A’s low-loss region is wide along unimportant directions. Learning B, EWC moves along them and stops in the overlap; plain training runs straight to B and forgets A.'),
  },
  'structural-plasticity': {
    brain: SpinesFig, ai: PruneFig,
    brainCap: b('结构可塑性：树突棘随学习新生（绿）和消失（虚线），有用的被长期保留。右图：发育早期突触过量生成，之后大量修剪。', 'Structural plasticity: spines appear (green) and vanish (dashed) with learning; useful ones persist. Right: synapses are overproduced early, then heavily pruned.'),
    aiCap: b('剪枝与彩票假说：剪掉稠密网络中的小权重，得到的稀疏子网络单独训练也能达到原精度。但结构调整通常只在训练之后做一次。', 'Pruning and the lottery ticket: remove small weights from a dense net and the sparse subnetwork trains to full accuracy. But restructuring usually happens once, after training.'),
  },
  glia: {
    brain: GliaFig, ai: HyperFig,
    brainCap: b('三方突触：星形胶质细胞（紫色虚线区域）包裹突触，回收递质、供能，并通过钙信号在秒到分钟尺度上调节传递。', 'Tripartite synapse: an astrocyte (dashed lavender) wraps the synapse, recycles transmitter, supplies energy and modulates transmission via calcium over seconds to minutes.'),
    aiCap: b('主流 AI 没有对应物。最接近的是超网络：一个慢速网络生成或调节主网络各层的增益和学习率。', 'No mainstream counterpart. The closest is a hypernetwork: a slow network that generates or scales the gains and learning rates of the main network’s layers.'),
  },
}
