import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M09 Glia and the tripartite synapse: support cells that may also take part in signaling, on a slower timescale. */
export const GLIA: MechEntry = {
  definition: b(
    '胶质细胞是脑中与神经元并存的另一大类细胞，数量与神经元相当。星形胶质细胞的细小突起包裹着突触，回收递质、调节离子浓度，并可能通过钙信号释放「胶质递质」影响突触传递，这种由突触前、突触后和星形胶质细胞组成的结构称为三方突触。少突胶质细胞给轴突包上髓鞘，小胶质细胞在发育中清除多余的突触。',
    'Glial cells are the other major class of brain cells, about as numerous as neurons. The fine processes of astrocytes wrap synapses, take up transmitter and regulate ion levels. They may also release gliotransmitters through calcium signals and affect synaptic transmission. This structure of presynaptic side, postsynaptic side and astrocyte is called the tripartite synapse. Oligodendrocytes wrap axons in myelin, and microglia clear surplus synapses in development.'),
  scale: b('一个星形胶质细胞覆盖约十万个突触', 'One astrocyte covers about a hundred thousand synapses'),
  timescale: b('钙信号在数秒内起落，髓鞘变化需数天到数周', 'Calcium signals rise and fall over seconds, myelin changes over days to weeks'),
  steps: [
    {
      title: b('包裹突触', 'Wrapping synapses'),
      points: [
        b('星形胶质细胞的突起包在许多突触周围，各个星形胶质细胞占据互不重叠的区域。', 'Astrocyte processes surround many synapses, and each astrocyte occupies its own, nonoverlapping domain.'),
      ],
    },
    {
      title: b('回收递质与维持环境', 'Clearing transmitter and keeping conditions'),
      points: [
        b('星形胶质细胞把突触间隙里的谷氨酸迅速吸收，防止它扩散到邻近的突触，并维持钾离子浓度稳定。', 'Astrocytes quickly take up glutamate from the synaptic gap, keeping it from spreading to neighboring synapses, and hold potassium levels steady.'),
      ],
    },
    {
      title: b('缓慢的钙信号', 'Slow calcium signals'),
      points: [
        b('附近突触持续活跃时，星形胶质细胞内的钙浓度在数秒内升高，比神经元的脉冲慢约千倍。', 'When nearby synapses stay active, calcium inside the astrocyte rises over seconds, about a thousand times slower than a neuron’s spike.'),
      ],
    },
    {
      title: b('可能的反馈：胶质递质', 'A possible feedback: gliotransmitters'),
      points: [
        b('一种观点认为，钙升高后星形胶质细胞释放 ATP、D-丝氨酸等物质，改变它覆盖区域内许多突触的释放概率或可塑性。', 'One view holds that after calcium rises, the astrocyte releases substances such as ATP and D-serine. These change the release probability or plasticity of many synapses in its domain.'),
        b('这一过程在正常生理条件下是否发生，仍有激烈争议。', 'Whether this happens under normal physiological conditions is hotly debated.'),
      ],
    },
    {
      title: b('髓鞘调节传导时间', 'Myelin tunes conduction time'),
      points: [
        b('少突胶质细胞包裹轴突形成髓鞘，大幅加快传导；活动和学习会改变髓鞘的厚度和分布，从而调节信号到达的时间。', 'Oligodendrocytes wrap axons in myelin, which greatly speeds conduction. Activity and learning change myelin thickness and coverage, which tunes when signals arrive.'),
      ],
    },
    {
      title: b('小胶质细胞修剪突触', 'Microglia prune synapses'),
      points: [
        b('发育中，小胶质细胞吞噬活动较弱、被补体蛋白标记的突触，参与连接的修剪（见[结构可塑性](card:structural-plasticity)）。', 'In development, microglia engulf weaker synapses tagged by complement proteins and help prune connections (see [structural plasticity](card:structural-plasticity)).'),
      ],
    },
  ],
  notes: [
    b('Araque 等在 1999 年提出「三方突触」的概念，认为星形胶质细胞是突触信息处理的参与者。', 'Araque and colleagues proposed the tripartite synapse in 1999, arguing that astrocytes take part in synaptic information processing.'),
    b('2002 年的研究估计，大鼠海马 CA1 区的一个星形胶质细胞覆盖约 14 万个突触。', 'A 2002 study estimated that one astrocyte in rat hippocampal CA1 covers about 140,000 synapses.'),
    b('2018 年的综述列举了多方面的证据，认为在正常生理条件下胶质递质的释放并不发生，许多早期结果可能来自实验条件。', 'A 2018 review gathered several lines of evidence that gliotransmitter release does not occur under physiological conditions. Many early results may come from the experimental setup.'),
    b('活动依赖的髓鞘形成被视为一种独立于突触的可塑性：学习新的运动技能需要新的少突胶质细胞。', 'Activity-dependent myelination is seen as a form of plasticity apart from synapses, and learning a new motor skill requires new oligodendrocytes.'),
  ],
  counterpart: [
    b('主流 AI 中没有与胶质细胞直接对应的部分：网络中只有一类单元和它们之间的权重。', 'Mainstream AI has no direct counterpart of glia. A network has only one kind of unit and the weights between them.'),
    b('2023 年的一项理论工作提出，神经元与星形胶质细胞组成的网络在数学上可以实现类似 Transformer 注意力的运算，这是一个尚未被实验检验的假说。', 'A 2023 theoretical work proposed that networks of neurons and astrocytes can implement an operation like Transformer attention in mathematical form. This is a hypothesis not yet tested by experiment.'),
  ],
  math: [
    {
      title: b('星形胶质细胞的慢整合（示意）：几秒内的活动共同调节一片突触', 'Slow integration by an astrocyte (schematic): activity over seconds jointly tunes a patch of synapses'),
      tex: t`\tau_a\,\frac{dA}{dt} = -A + \kappa \sum_{j \in D} a_j(t),\qquad p_j(t) = p_0\,\big(1 + \beta\,[A(t) - \theta_a]_{+}\big)`,
      symbols: [
        { tex: t`A`, meaning: b('星形胶质细胞内的钙信号', 'calcium signal inside the astrocyte') },
        { tex: t`\tau_a`, meaning: b('钙信号的时间常数，约数秒', 'time constant of the calcium signal, about seconds') },
        { tex: t`a_j`, meaning: b('它覆盖区域 $D$ 内第 $j$ 个突触的活动', 'activity of synapse $j$ in its domain $D$') },
        { tex: t`\kappa`, meaning: b('突触活动对钙信号的驱动强度', 'how strongly synaptic activity drives the calcium signal') },
        { tex: t`p_j,\;p_0`, meaning: b('突触 $j$ 的释放概率及其基础值', 'release probability of synapse $j$ and its baseline') },
        { tex: t`\theta_a,\;\beta`, meaning: b('钙信号的阈值，以及超过阈值后对释放概率的调节幅度', 'calcium threshold, and how much release probability changes above it') },
      ],
      steps: [
        b('覆盖区域内所有突触的活动加总，缓慢地推高星形胶质细胞的钙信号。', 'The activity of all synapses in the domain adds up and slowly raises the astrocyte’s calcium signal.'),
        b('钙信号超过阈值后，区域内所有突触的释放概率按超出的量一起提高。', 'Once calcium exceeds the threshold, the release probability of every synapse in the domain rises with the excess.'),
        b('活动停止后，钙信号按 $\\tau_a$ 回落，调节在几秒内逐渐消失。', 'After activity stops, calcium falls back with $\\tau_a$ and the modulation fades over seconds.'),
      ],
      example: b(
        '取 $\\tau_a = 2$ 秒、$\\kappa = 1$、$\\theta_a = 0.2$、$\\beta = 1$。区域内的突触以总强度 $1$ 活跃 $1$ 秒：钙信号升到 $1 - e^{-0.5} \\approx 0.39$，在约 $0.45$ 秒时越过阈值，释放概率最高提高约 $19\\%$。活动停止后钙信号按 $e^{-t/2}$ 回落，约在第 $2.3$ 秒降回阈值以下。一秒的活动，换来覆盖区域内所有突触约两秒的调节。',
        'Take $\\tau_a = 2$ s, $\\kappa = 1$, $\\theta_a = 0.2$ and $\\beta = 1$. The synapses of the domain are active with total strength $1$ for $1$ second. Calcium rises to $1 - e^{-0.5} \\approx 0.39$, crossing the threshold at about $0.45$ s, and release probability rises by up to about $19\\%$. After activity stops, calcium falls as $e^{-t/2}$ and drops below threshold near $2.3$ s. One second of activity buys about two seconds of modulation for every synapse in the domain.'),
      consequences: [
        b('若这一机制存在，星形胶质细胞会在神经元之上提供一个更慢、覆盖更广的调节层，把一片区域的近期活动「记住」几秒。', 'If the mechanism exists, astrocytes add a slower, wider layer of modulation above neurons that remembers a region’s recent activity for seconds.'),
        b('一个星形胶质细胞同时作用于十万个量级的突触，这种调节是区域性的，而不是逐个突触的。', 'One astrocyte acts on synapses numbering in the hundred thousands at once, so the modulation is regional rather than per synapse.'),
      ],
      limitations: [
        b('这是示意模型，参数是为说明时间尺度而选的；星形胶质细胞的钙信号在空间上也不均匀，常局限在细小的突起中。', 'This is a schematic model with parameters chosen to show the timescales. Astrocyte calcium is also uneven in space and often confined to fine processes.'),
        b('胶质递质对突触的反馈是否在正常条件下发生仍有争议，模型的第二个式子可能并不成立。', 'Whether gliotransmitter feedback onto synapses happens under normal conditions is debated, and the second equation may not hold.'),
      ],
    },
  ],
  elsewhere: [],
  conditions: [
    b('星形胶质细胞回收递质、维持离子环境的作用已经确立；它们是否直接参与信息处理，仍有争议。', 'That astrocytes clear transmitter and keep ion levels is established. Whether they take part directly in information processing is debated.'),
    b('早期支持胶质递质的许多实验使用了强烈的人工刺激，在更接近生理的条件下结果不一致。', 'Many early experiments supporting gliotransmitters used strong artificial stimulation, and results under more physiological conditions disagree.'),
    b('髓鞘可塑性和小胶质细胞修剪有较多直接证据，但它们在成年学习中的作用范围还在研究。', 'Myelin plasticity and microglial pruning have more direct evidence, but their role in adult learning is still being studied.'),
  ],
  uses: [
    { to: 'topic:sleep-offline', role: b('睡眠中胶质细胞与脑脊液流动相关的清除作用，是睡眠功能的一个候选（仍有争议）。', 'Clearance related to glia and cerebrospinal fluid flow in sleep is one candidate function of sleep, still debated.') },
    { to: 'topic:developmental-stages', role: b('小胶质细胞在发育中修剪多余的突触，参与形成长期的连接。', 'Microglia prune surplus synapses in development and help form long-term wiring.') },
    { to: 'topic:skill-learning', role: b('学习新的运动技能伴随新的髓鞘形成，可能使相关通路的信号到达得更同步。', 'Learning a new motor skill comes with new myelin, which may make signals in the relevant pathway arrive more in step.') },
  ],
  refs: ['araque1999', 'herculano2009', 'bushong2002', 'fiacco2018', 'fields2015', 'mckenzie2014', 'schafer2012', 'kozachkov2023', 'xie2013'],
}
