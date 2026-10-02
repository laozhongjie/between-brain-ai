import type { Bi } from '../../data/types'
import { Arrow, Box, C, Dot, Grid, Line, Spikes, Svg, T } from './kit'
import type { FigPair, FigProps } from './types'

const b = (zh: string, en: string): Bi => ({ zh, en })

// ───────────── Neuron models ─────────────

function NeuronAnatomyFig({ t }: FigProps) {
  const id = 'f-na'
  // membrane trace: ramp, spike, reset ×3
  const trace: [number, number][] = []
  let x = 40
  for (let k = 0; k < 3; k++) {
    trace.push([x, 200], [x + 60, 176], [x + 62, 140], [x + 64, 206])
    x += 64 + 20
    trace.push([x - 18, 203])
  }
  return (
    <Svg id={id} label={t(b('神经元的结构与膜电位', 'Neuron anatomy and membrane potential'))}>
      <path d="M100,70 L60,40 L40,30 M60,40 L50,62 M100,70 L50,90 L30,96 M50,90 L40,112 M100,80 L66,118 L60,136" fill="none" stroke={C.pinkD} strokeWidth={3} strokeLinecap="round" />
      <circle cx={112} cy={76} r={20} fill={C.pink} stroke={C.pinkD} strokeWidth={1.5} />
      <path d="M132,76 L150,76" stroke={C.pinkD} strokeWidth={4} />
      {[0, 1, 2].map((i) => <rect key={i} x={156 + i * 38} y={70} width={30} height={12} rx={6} fill={C.lemon} stroke={C.lemonD} />)}
      <path d="M150,76 L270,76 M270,76 L292,58 M270,76 L296,76 M270,76 L292,94" fill="none" stroke={C.pinkD} strokeWidth={2.4} strokeLinecap="round" />
      {[[292, 58], [296, 76], [292, 94]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={4} fill={C.pinkD} />)}
      <T x={40} y={14} size={10} s={t(b('树突：接收输入', 'dendrites: inputs'))} />
      <T x={112} y={112} size={10} s={t(b('胞体：积分', 'soma: integrate'))} />
      <T x={196} y={46} size={9.5} color={C.dim} s={t(b('轴丘：过阈值就放电', 'hillock: fire at threshold'))} />
      <T x={215} y={100} size={9.5} color={C.lemonD} s={t(b('髓鞘轴突：传导', 'myelinated axon: conduct'))} />
      <T x={330} y={76} size={10} s={t(b('终末\n输出', 'terminals\noutput'))} />
      <Line pts={[[36, 170], [300, 170]]} color={C.lavD} width={1} dashed />
      <T x={330} y={170} size={9.5} color={C.lavD} s={t(b('阈值 θ', 'threshold θ'))} />
      <Line pts={trace} color={C.pinkD} width={1.8} />
      <T x={16} y={188} size={9.5} color={C.dim} s="V(t)" />
      <T x={70} y={222} size={9.5} color={C.dim} s={t(b('积分', 'integrate'))} />
      <T x={104} y={130} size={9.5} color={C.pinkD} s={t(b('放电', 'spike'))} />
      <T x={140} y={222} size={9.5} color={C.dim} s={t(b('重置', 'reset'))} />
    </Svg>
  )
}

function UnitVsSsmFig({ t }: FigProps) {
  const id = 'f-us'
  return (
    <Svg id={id} label={t(b('无状态单元与状态空间单元', 'Stateless unit vs state-space unit'))}>
      <T x={90} y={14} size={10.5} weight={600} color={C.skyD} s={t(b('人工单元（无状态）', 'artificial unit (stateless)'))} />
      <Dot cx={30} cy={70} r={14} fill={C.sky} stroke={C.skyD} label="x" />
      <Arrow id={id} x1={44} y1={70} x2={66} y2={70} color="sky" />
      <Box x={68} y={52} w={62} h={36} label="Σ wx + b" fill={C.sky} stroke={C.skyD} size={10} />
      <Arrow id={id} x1={130} y1={70} x2={146} y2={70} color="sky" />
      <Box x={148} y={52} w={40} h={36} label="ReLU" fill={C.sky} stroke={C.skyD} size={9.5} />
      <T x={100} y={112} size={9.5} color={C.dim} s={t(b('输出只取决于当前输入', 'output depends only on current input'))} />
      <Line pts={[[200, 20], [200, 130]]} color={C.line} width={1} dashed />
      <T x={280} y={14} size={10.5} weight={600} color={C.lavD} s={t(b('状态空间单元（有状态）', 'state-space unit (stateful)'))} />
      <Dot cx={222} cy={100} r={13} fill={C.sky} stroke={C.skyD} label="xₜ" size={10} />
      <Arrow id={id} x1={235} y1={96} x2={262} y2={80} color="lav" label="B" ly={-2} lx={-6} />
      <Box x={264} y={56} w={44} h={36} label="hₜ" fill={C.lav} stroke={C.lavD} size={12} />
      <Arrow id={id} x1={276} y1={56} x2={298} y2={56} bend={-24} color="lav" label={t(b('A：记住过去', 'A: keep the past'))} ly={-16} />
      <Arrow id={id} x1={308} y1={74} x2={330} y2={96} color="lav" label="C" lx={10} ly={0} />
      <Dot cx={338} cy={108} r={12} fill={C.mint} stroke={C.mintD} label="yₜ" size={10} />
      <T x={280} y={140} size={9.5} color={C.dim} s={t(b('hₜ = A hₜ₋₁ + B xₜ：自带时间常数', 'hₜ = A hₜ₋₁ + B xₜ: built-in time constant'))} />
      <Box x={20} y={160} w={320} h={52} fill={C.ghost} stroke={C.line} r={10} />
      <T x={180} y={176} size={10} s={t(b('生物神经元更像右边：膜电位积累输入、会适应、会不应', 'real neurons are closer to the right: they accumulate, adapt, go refractory'))} />
      <T x={180} y={196} size={10} color={C.dim} s={t(b('而且输出的是离散脉冲，不是一个实数', 'and they output discrete spikes, not a real number'))} />
    </Svg>
  )
}

// ───────────── Dendrites ─────────────

function PyramidalFig({ t }: FigProps) {
  const id = 'f-py'
  return (
    <Svg id={id} label={t(b('锥体神经元的树突分区', 'Dendritic compartments of a pyramidal neuron'))}>
      <path d="M150,130 L150,40 M150,60 L120,30 M150,50 L180,24 M150,40 L140,16 M150,40 L165,14" fill="none" stroke={C.pinkD} strokeWidth={3} strokeLinecap="round" />
      <path d="M140,150 L100,180 L84,200 M100,180 L96,206 M160,150 L200,180 L216,202 M200,180 L206,206" fill="none" stroke={C.pinkD} strokeWidth={3} strokeLinecap="round" />
      <polygon points="150,120 132,156 168,156" fill={C.pink} stroke={C.pinkD} strokeWidth={1.5} />
      <path d="M150,156 L150,222" stroke={C.pinkD} strokeWidth={2} />
      {[[128, 32], [178, 26], [94, 190], [208, 192]].map(([x, y], i) => <Dot key={i} cx={x} cy={y} r={9} fill={C.lemon} stroke={C.lemonD} label="σ" size={10} />)}
      <Arrow id={id} x1={60} y1={20} x2={116} y2={28} color="lav" label={t(b('反馈 / 上下文', 'feedback / context'))} ly={-8} lx={-12} />
      <Arrow id={id} x1={30} y1={206} x2={82} y2={196} color="sky" label={t(b('前馈输入', 'feedforward input'))} ly={14} lx={-4} />
      <Arrow id={id} x1={260} y1={210} x2={220} y2={200} color="sky" />
      <T x={246} y={36} anchor="start" size={10} color={C.lavD} s={t(b('顶树突', 'apical tuft'))} />
      <T x={246} y={186} anchor="start" size={10} color={C.skyD} s={t(b('基底树突', 'basal dendrites'))} />
      <T x={250} y={90} anchor="start" size={9.5} color={C.lemonD} s={t(b('σ：分支自己的\n非线性子单元', 'σ: each branch is\na nonlinear subunit'))} />
      <T x={250} y={140} anchor="start" size={9.5} color={C.pinkD} s={t(b('上下两路同时到达\n→ 爆发放电', 'both arrive together\n→ burst'))} />
      <T x={150} y={226} size={9} color={C.dim} s={t(b('轴突', 'axon'))} />
    </Svg>
  )
}

function TwoLayerFig({ t }: FigProps) {
  const id = 'f-tl'
  const xs = [30, 60, 90, 120, 150, 180]
  return (
    <Svg id={id} label={t(b('树突神经元等价的两层网络', 'Two-layer network equivalent'))}>
      {xs.map((x, i) => <Dot key={i} cx={x} cy={200} r={9} fill={C.sky} stroke={C.skyD} />)}
      <T x={105} y={222} size={9.5} color={C.dim} s={t(b('输入按分支分组', 'inputs grouped by branch'))} />
      {[45, 105, 165].map((x, k) => (
        <g key={k}>
          {[0, 1].map((j) => <Arrow key={j} id={id} x1={xs[k * 2 + j]} y1={190} x2={x} y2={136} color="sky" width={1.2} head="none" />)}
          <Dot cx={x} cy={124} r={13} fill={C.lemon} stroke={C.lemonD} label="σ" size={11} />
          <Arrow id={id} x1={x} y1={111} x2={105} y2={72} color="lemon" width={1.3} />
        </g>
      ))}
      <T x={105} y={150} size={9.5} color={C.lemonD} s={t(b('隐层 = 树突分支', 'hidden layer = branches'))} />
      <Dot cx={105} cy={58} r={15} fill={C.pink} stroke={C.pinkD} label="g" size={12} />
      <T x={140} y={58} anchor="start" size={9.5} color={C.pinkD} s={t(b('输出 = 胞体', 'output = soma'))} />
      <Line pts={[[236, 12], [236, 200]]} color={C.line} width={1} dashed />
      <T x={300} y={20} size={10.5} weight={600} color={C.lavD} s={t(b('上下文门控', 'context gating'))} />
      <Box x={250} y={140} w={46} h={30} label="W x" fill={C.sky} stroke={C.skyD} size={10} />
      <Box x={304} y={140} w={46} h={30} label="σ(U c)" fill={C.lav} stroke={C.lavD} size={10} />
      <Dot cx={300} cy={96} r={13} fill={C.white} stroke={C.ink} label="⊙" size={13} />
      <Arrow id={id} x1={273} y1={140} x2={292} y2={108} color="sky" />
      <Arrow id={id} x1={327} y1={140} x2={308} y2={108} color="lav" />
      <Arrow id={id} x1={300} y1={83} x2={300} y2={50} color="ink" />
      <T x={300} y={42} size={10} s="y" />
      <T x={298} y={186} size={9.5} color={C.lavD} s={t(b('c 类比顶树突输入', 'c ≈ apical input'))} />
    </Svg>
  )
}

// ───────────── Spikes ─────────────

function RasterFig({ t }: FigProps) {
  const id = 'f-ra'
  const rows = [[40, 150, 260], [95], [70, 72, 74, 210], [], [180], [30, 140, 142, 300], [240], [120]]
  return (
    <Svg id={id} label={t(b('脉冲光栅图', 'Spike raster'))}>
      {rows.map((xs, i) => (
        <g key={i}>
          <T x={18} y={30 + i * 20} size={9} color={C.dim} s={`n${i + 1}`} />
          <Line pts={[[34, 30 + i * 20], [330, 30 + i * 20]]} color={C.ghost} width={1} />
          <Spikes xs={xs.map((x) => 40 + x)} y={36 + i * 20} h={12} />
        </g>
      ))}
      <Arrow id={id} x1={40} y1={190} x2={330} y2={190} color="dim" label={t(b('时间', 'time'))} lx={150} ly={0} />
      <T x={180} y={218} size={10} color={C.pinkD} s={t(b('稀疏、异步：没有事件就不通信；信息可在精确时刻里', 'sparse, asynchronous: no event, no traffic; timing can carry information'))} />
    </Svg>
  )
}

function DenseClockFig({ t }: FigProps) {
  const id = 'f-dc'
  const vals = (s: number) => Array.from({ length: 8 }, (_, r) => Array.from({ length: 1 }, () => ((r * 37 + s * 11) % 10) / 10))
  return (
    <Svg id={id} label={t(b('时钟同步的稠密激活', 'Clocked dense activations'))}>
      {[0, 1, 2, 3].map((layer) => (
        <g key={layer}>
          {[0, 1, 2].map((step) => (
            <Grid key={step} x={50 + layer * 76 + step * 16} y={30} rows={8} cols={1} cell={16} vals={vals(layer * 3 + step)} color={C.lavD} />
          ))}
          <T x={74 + layer * 76} y={172} size={10} s={t(b(`第 ${layer + 1} 层`, `layer ${layer + 1}`))} />
          {layer < 3 && <Arrow id={id} x1={100 + layer * 76} y1={96} x2={124 + layer * 76} y2={96} color="lav" />}
        </g>
      ))}
      <T x={74} y={20} size={9} color={C.dim} s="t₁ t₂ t₃" />
      <T x={180} y={196} size={10} color={C.lavD} s={t(b('每个时钟步，所有单元都算出并传递一个实数', 'every clock tick, every unit computes and sends a real number'))} />
      <T x={180} y={216} size={9.5} color={C.dim} s={t(b('没有变化也照样计算', 'computes even when nothing changes'))} />
    </Svg>
  )
}

// ───────────── E/I and cell types ─────────────

function CircuitFig({ t }: FigProps) {
  const id = 'f-ei'
  return (
    <Svg id={id} label={t(b('皮层兴奋-抑制微环路', 'Cortical E–I microcircuit'))}>
      <path d="M160,120 L160,40" stroke={C.pinkD} strokeWidth={3} />
      <polygon points="160,104 140,140 180,140" fill={C.pink} stroke={C.pinkD} strokeWidth={1.5} />
      <T x={160} y={156} size={10} color={C.pinkD} weight={600} s={t(b('锥体 E', 'pyramidal E'))} />
      <Dot cx={60} cy={130} r={16} fill={C.sky} stroke={C.skyD} label="PV" size={10} />
      <Dot cx={260} cy={60} r={16} fill={C.mint} stroke={C.mintD} label="SST" size={9.5} />
      <Dot cx={300} cy={150} r={16} fill={C.peach} stroke={C.peachD} label="VIP" size={9.5} />
      <Arrow id={id} x1={76} y1={127} x2={138} y2={124} color="sky" head="bar" label={t(b('抑制胞体', 'inhibits soma'))} ly={-10} />
      <Arrow id={id} x1={244} y1={58} x2={166} y2={52} color="mint" head="bar" label={t(b('抑制树突', 'inhibits dendrite'))} ly={-10} />
      <Arrow id={id} x1={292} y1={135} x2={266} y2={76} color="peach" head="bar" label={t(b('抑制 SST', 'inhibits SST'))} lx={30} ly={0} />
      <Arrow id={id} x1={146} y1={140} x2={74} y2={142} color="pink" bend={16} dashed />
      <Arrow id={id} x1={176} y1={116} x2={246} y2={70} color="pink" bend={10} dashed />
      <T x={60} y={168} size={9.5} color={C.skyD} s={t(b('快速增益控制\nγ 振荡', 'fast gain control\nγ rhythm'))} />
      <T x={300} y={188} size={9.5} color={C.peachD} s={t(b('去抑制：打开通路', 'disinhibition:\nopens a channel'))} />
      <T x={180} y={218} size={9.5} color={C.dim} s={t(b('→ 兴奋   ⊣ 抑制   虚线：E 驱动抑制细胞', '→ excite   ⊣ inhibit   dashed: E drives interneurons'))} />
    </Svg>
  )
}

function BlockFig({ t }: FigProps) {
  const id = 'f-tb'
  const boxes: [string, string, string][] = [['LayerNorm', C.ghost, C.line], [t(b('注意力', 'attention')), C.lav, C.lavD], ['LayerNorm', C.ghost, C.line], ['MLP', C.sky, C.skyD]]
  return (
    <Svg id={id} label={t(b('Transformer 块中的同质单元', 'Uniform units in a Transformer block'))}>
      <T x={30} y={200} size={10} s="x" />
      <Arrow id={id} x1={30} y1={190} x2={30} y2={30} color="ink" />
      {boxes.map(([name, fill, stroke], i) => (
        <g key={i}>
          <Box x={70} y={164 - i * 40} w={120} h={28} label={name} fill={fill} stroke={stroke} size={10.5} />
          <Arrow id={id} x1={30} y1={178 - i * 40} x2={68} y2={178 - i * 40} color="dim" width={1.2} />
          {i % 2 === 1 && <Dot cx={30} cy={150 - (i - 1) * 40 - 34} r={9} fill={C.white} stroke={C.ink} label="+" size={11} />}
        </g>
      ))}
      <T x={275} y={70} size={10} color={C.lavD} s={t(b('每层的单元都一样', 'every unit in a layer is the same'))} />
      <T x={275} y={110} size={10} color={C.dim} s={t(b('增益控制：固定的\nLayerNorm 运算', 'gain control: a fixed\nLayerNorm op'))} />
      <T x={275} y={160} size={10} color={C.dim} s={t(b('没有专门的\n「抑制性控制单元」', 'no dedicated\ninhibitory control cells'))} />
    </Svg>
  )
}

// ───────────── Noise ─────────────

function TrialsFig({ t }: FigProps) {
  const id = 'f-tr'
  const trials = [[60, 104, 170, 238], [70, 98, 182, 250, 272], [56, 126, 190], [82, 110, 160, 230, 260]]
  return (
    <Svg id={id} label={t(b('同一刺激的多次试验', 'Repeated trials of one stimulus'))}>
      <Box x={20} y={16} w={100} h={26} label={t(b('同一个刺激', 'same stimulus'))} fill={C.peach} stroke={C.peachD} />
      <Line pts={[[130, 29], [150, 29], [150, 22], [300, 22], [300, 29], [330, 29]]} color={C.peachD} width={2} />
      {trials.map((xs, i) => (
        <g key={i}>
          <T x={30} y={72 + i * 24} size={9.5} color={C.dim} s={t(b(`第 ${i + 1} 次`, `trial ${i + 1}`))} />
          <Spikes xs={xs.map((x) => x + 30)} y={78 + i * 24} h={13} />
        </g>
      ))}
      <T x={200} y={176} size={10} color={C.pinkD} s={t(b('每次放电都不一样：通道、释放、整合都是随机的', 'spikes differ every time: channels, release and integration are stochastic'))} />
      <T x={200} y={198} size={10} color={C.dim} s={t(b('去甲肾上腺素等调质可以调节这种变异性', 'neuromodulators such as noradrenaline tune this variability'))} />
    </Svg>
  )
}

function DropoutFig({ t }: FigProps) {
  const id = 'f-do'
  const cols = [40, 100, 160]
  const drop = new Set(['1-1', '1-3', '2-0'])
  const bars = (x0: number, vals: number[], color: string) => vals.map((v, i) => <rect key={i} x={x0 + i * 18} y={170 - v * 90} width={12} height={v * 90} rx={2} fill={color} />)
  return (
    <Svg id={id} label={t(b('Dropout 与温度采样', 'Dropout and temperature sampling'))}>
      {cols.map((x, ci) => [0, 1, 2, 3].map((r) => {
        const y = 50 + r * 34
        const off = drop.has(`${ci}-${r}`)
        return <circle key={`${ci}${r}`} cx={x} cy={y} r={10} fill={off ? C.white : C.lav} stroke={off ? C.line : C.lavD} strokeDasharray={off ? '3 2' : undefined} />
      }))}
      {cols.slice(0, 2).map((x, ci) => [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((r2) => {
        if (drop.has(`${ci}-${r}`) || drop.has(`${ci + 1}-${r2}`)) return null
        return <line key={`${ci}${r}${r2}`} x1={x + 10} y1={50 + r * 34} x2={x + 50} y2={50 + r2 * 34} stroke={C.lavD} strokeWidth={0.7} opacity={0.6} />
      })))}
      <T x={100} y={20} size={10} color={C.lavD} s={t(b('训练时随机丢弃单元', 'units dropped at random in training'))} />
      {bars(212, [0.9, 0.25, 0.1, 0.05], C.pinkD)}
      {bars(212 + 80, [0.4, 0.3, 0.2, 0.15], C.skyD)}
      <T x={240} y={186} size={10} color={C.pinkD} s="T = 0.5" />
      <T x={320} y={186} size={10} color={C.skyD} s="T = 2" />
      <T x={280} y={60} size={10} s={t(b('温度 T 控制\n采样的随机性', 'temperature T sets\nsampling randomness'))} />
      <T x={180} y={218} size={9.5} color={C.dim} s={t(b('随机性是人为加入的，多为固定超参数', 'randomness is added by design, usually a fixed hyperparameter'))} />
    </Svg>
  )
}

// ───────────── Energy & sparsity ─────────────

function SparsePopFig({ t }: FigProps) {
  const id = 'f-sparse'
  const lit = new Set([8, 22, 31])
  return (
    <Svg id={id} label={t(b('稀疏的神经群体', 'A sparse neural population'))}>
      {Array.from({ length: 36 }, (_, i) => {
        const x = 60 + (i % 6) * 34
        const y = 30 + Math.floor(i / 6) * 28
        const on = lit.has(i)
        return <circle key={i} cx={x} cy={y} r={on ? 11 : 9} fill={on ? C.pinkD : C.pink} fillOpacity={on ? 1 : 0.35} stroke={C.pinkD} strokeOpacity={on ? 1 : 0.4} />
      })}
      <T x={300} y={60} size={11} color={C.pinkD} weight={600} s={t(b('约 20 W', '~20 W'))} />
      <T x={300} y={82} size={9.5} color={C.dim} s={t(b('全脑功耗', 'whole brain'))} />
      <T x={300} y={130} size={10} s={t(b('任一时刻\n只有少数\n神经元活跃', 'only a few\nneurons active\nat any moment'))} />
      <T x={150} y={210} size={10} color={C.dim} s={t(b('信号传递占大部分能耗 → 稀疏编码更省能', 'signalling dominates energy use → sparse codes save energy'))} />
    </Svg>
  )
}

function MoeFig({ t }: FigProps) {
  const id = 'f-moe'
  return (
    <Svg id={id} label={t(b('稠密层与稀疏 MoE', 'Dense layer vs sparse MoE'))}>
      <T x={70} y={16} size={10.5} weight={600} color={C.dim} s={t(b('稠密：全部计算', 'dense: all compute'))} />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={30 + (i % 4) * 26} cy={44 + Math.floor(i / 4) * 26} r={9} fill={C.lavD} />)}
      <Line pts={[[140, 16], [140, 200]]} color={C.line} width={1} dashed />
      <T x={250} y={16} size={10.5} weight={600} color={C.lavD} s={t(b('MoE：只算 top-2 专家', 'MoE: top-2 experts only'))} />
      <Box x={160} y={100} w={40} h={28} label="x" fill={C.sky} stroke={C.skyD} />
      <Box x={214} y={100} w={48} h={28} label={t(b('路由', 'router'))} fill={C.lemon} stroke={C.lemonD} size={10} />
      <Arrow id={id} x1={200} y1={114} x2={212} y2={114} color="ink" />
      {Array.from({ length: 6 }, (_, i) => {
        const y = 36 + i * 30
        const on = i === 1 || i === 4
        return (
          <g key={i}>
            <Box x={300} y={y} w={50} h={22} label={`E${i + 1}`} fill={on ? C.lav : C.ghost} stroke={on ? C.lavD : C.line} size={10} dashed={!on} />
            {on && <Arrow id={id} x1={262} y1={114} x2={298} y2={y + 11} color="lav" />}
          </g>
        )
      })}
      <T x={180} y={218} size={9.5} color={C.dim} s={t(b('稀疏是后加的路由，不是表示本身稀疏', 'sparsity is added routing, not an intrinsically sparse code'))} />
    </Svg>
  )
}

export const LAYER2_FIGS: Record<string, FigPair> = {
  'neuron-models': {
    brain: NeuronAnatomyFig, ai: UnitVsSsmFig,
    brainCap: b('神经元：树突接收输入，胞体积分，膜电位 V(t) 一旦超过阈值就在轴丘产生脉冲并重置，再沿轴突传出。', 'Neuron: dendrites receive, the soma integrates; when V(t) crosses threshold a spike fires at the hillock, V resets and the spike travels down the axon.'),
    aiCap: b('左：常用的人工单元是「加权求和 + 激活」，没有内部状态。右：状态空间单元带有随时间演化的状态 hₜ，更接近真实神经元。', 'Left: the usual artificial unit is “weighted sum + activation”, with no state. Right: a state-space unit carries an evolving state hₜ, closer to a real neuron.'),
  },
  dendrites: {
    brain: PyramidalFig, ai: TwoLayerFig,
    brainCap: b('锥体神经元：顶树突接收反馈和上下文，基底树突接收前馈输入，每个分支都有自己的非线性（σ）。上下两路同时到达才触发爆发放电。', 'Pyramidal neuron: apical dendrites get feedback/context, basal dendrites feedforward input, and each branch has its own nonlinearity (σ). Coincidence of both triggers a burst.'),
    aiCap: b('左：把分支当作隐层，一个神经元等价于一个两层网络。右：AI 中最接近的是上下文门控，前馈信号乘以由上下文算出的门。', 'Left: treating branches as a hidden layer, one neuron equals a two-layer network. Right: the closest AI mechanism is context gating, feedforward signal times a context-computed gate.'),
  },
  spikes: {
    brain: RasterFig, ai: DenseClockFig,
    brainCap: b('光栅图：每行一个神经元，每条竖线一次放电。放电稀疏且异步，没有事件时不传递任何东西。', 'Raster: one neuron per row, one tick per spike. Firing is sparse and asynchronous; nothing is sent between events.'),
    aiCap: b('主流网络：每个时钟步、每一层的每个单元都计算并传出一个实数，不管输入有没有变化。', 'Mainstream nets: at every clock step every unit in every layer computes and sends a real number, whether or not the input changed.'),
  },
  'ei-celltypes': {
    brain: CircuitFig, ai: BlockFig,
    brainCap: b('皮层微环路：PV 细胞抑制锥体细胞胞体（增益控制），SST 抑制树突（输入控制），VIP 抑制 SST，从而「去抑制」打开一条通路。', 'Cortical microcircuit: PV cells inhibit the pyramidal soma (gain), SST cells the dendrites (input), and VIP cells inhibit SST, disinhibiting and opening a pathway.'),
    aiCap: b('Transformer 块：每层单元完全相同，增益控制由固定的 LayerNorm 完成，没有专门负责门控或节律的单元类型。', 'Transformer block: all units are identical, gain control is a fixed LayerNorm, and there are no dedicated gating or rhythm cell types.'),
  },
  noise: {
    brain: TrialsFig, ai: DropoutFig,
    brainCap: b('同一刺激重复 4 次，放电时刻每次都不同。这种内在的随机性可能被用来表示不确定性和驱动探索。', 'The same stimulus four times gives different spikes each time; this intrinsic randomness may represent uncertainty and drive exploration.'),
    aiCap: b('AI 的随机性是人为加的：训练时 dropout 随机丢弃单元，生成时用温度 T 控制采样（T 小更确定，T 大更随机）。', 'AI randomness is added deliberately: dropout removes units in training, and temperature T controls sampling (low T sharper, high T more random).'),
  },
  'energy-sparsity': {
    brain: SparsePopFig, ai: MoeFig,
    brainCap: b('神经群体：任一时刻只有少数神经元活跃（深色）。整个大脑只用约 20 W，能量约束塑造了稀疏编码。', 'A neural population: only a few neurons (dark) are active at once. The whole brain uses ~20 W; energy limits shaped sparse coding.'),
    aiCap: b('左：稠密层每个单元都要计算。右：MoE 由路由器为每个输入只挑少数专家计算，但每个专家内部仍是稠密的。', 'Left: in a dense layer every unit computes. Right: MoE routes each input to a few experts, but each expert is still dense inside.'),
  },
}
