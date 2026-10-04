import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M03 Hebbian learning and STDP: synapses change with the timing of activity on both sides. */
export const STDP: MechEntry = {
  definition: b(
    '赫布学习是指一个突触按两侧神经元的共同活动改变强度：一起放电的神经元，连接变强。脉冲时间依赖可塑性（STDP）把它精确到毫秒：突触前脉冲在突触后脉冲之前几十毫秒内到达，连接增强；顺序反过来，连接减弱。改变的物理形式是突触上受体数量的增减。',
    'Hebbian learning means a synapse changes its strength with the joint activity of the neurons on both sides. Neurons that fire together wire together. Spike-timing-dependent plasticity (STDP) makes this precise to the millisecond. If the presynaptic spike arrives within tens of milliseconds before the postsynaptic spike, the connection strengthens. In the reverse order it weakens. Physically, receptors are added to or removed from the synapse.'),
  scale: b('单个突触，依赖两侧神经元的放电', 'A single synapse, depending on firing on both sides'),
  timescale: b('时间窗约几十毫秒，改变持续数小时以上', 'A window of tens of milliseconds, changes lasting hours or longer'),
  steps: [
    {
      title: b('突触前释放递质', 'The presynaptic side releases transmitter'),
      points: [
        b('突触前脉冲释放谷氨酸，结合突触后的 AMPA 受体和 NMDA 受体。', 'A presynaptic spike releases glutamate, which binds AMPA and NMDA receptors on the postsynaptic side.'),
        b('静息时 NMDA 受体的通道被镁离子堵住，结合了谷氨酸也打不开。', 'At rest the NMDA channel is blocked by magnesium and stays shut even with glutamate bound.'),
      ],
    },
    {
      title: b('突触后脉冲回传', 'The postsynaptic spike propagates back'),
      points: [
        b('突触后神经元放电时，脉冲沿树突回传，使突触处的膜电位升高。', 'When the postsynaptic neuron fires, the spike travels back into the dendrites and raises the membrane potential at the synapse.'),
        b('膜电位升高把镁离子推出 NMDA 通道。', 'The raised potential drives magnesium out of the NMDA channel.'),
      ],
    },
    {
      title: b('NMDA 受体检测巧合', 'NMDA receptors detect coincidence'),
      points: [
        b('只有谷氨酸已经结合、同时镁离子被推出时，NMDA 通道才打开，钙离子流入。', 'Only when glutamate is bound and magnesium is driven out at the same time does the NMDA channel open and let calcium in.'),
        b('所以 NMDA 受体相当于一个「与门」，检测两侧活动是否同时发生。', 'The NMDA receptor therefore acts as an AND gate that detects whether activity on both sides coincides.'),
      ],
    },
    {
      title: b('大量钙引起增强', 'Much calcium causes potentiation'),
      points: [
        b('突触前在先、突触后在后时，钙内流又大又快，激活激酶，把更多 AMPA 受体插入突触。', 'When the presynaptic spike comes first, calcium influx is large and fast. It activates kinases, which insert more AMPA receptors into the synapse.'),
        b('受体增多，同样的递质产生更大的电流：长时程增强（LTP）。', 'More receptors give a larger current for the same transmitter. This is long-term potentiation (LTP).'),
      ],
    },
    {
      title: b('少量钙引起减弱', 'A little calcium causes depression'),
      points: [
        b('顺序反过来时，钙内流小而持久，激活磷酸酶，AMPA 受体被移走：长时程抑制（LTD）。', 'In the reverse order, calcium influx is small and lasting. It activates phosphatases and AMPA receptors are removed. This is long-term depression (LTD).'),
      ],
    },
    {
      title: b('时间窗随情况变化', 'The window varies'),
      points: [
        b('时间窗的形状随突触类型、树突位置和放电频率而变；高频时以增强为主。', 'The shape of the window varies with synapse type, dendritic location and firing rate, and high rates favor potentiation.'),
        b('多巴胺等神经调质可以改变甚至翻转时间窗（见[三因子学习](card:three-factor)）。', 'Neuromodulators such as dopamine can change or even flip the window (see [three-factor learning](card:three-factor)).'),
      ],
    },
  ],
  notes: [
    b('Hebb 在 1949 年提出「一起放电的神经元连接增强」的设想；1973 年在海马中发现了长时程增强。', 'Hebb proposed in 1949 that neurons firing together strengthen their connection. Long-term potentiation was found in the hippocampus in 1973.'),
    b('1997 年 Markram 等和 1998 年 Bi 与 Poo 测出了 STDP 的时间窗：在培养的海马神经元上，窗口宽约 $\\pm 20$ 到 $40$ 毫秒。', 'Markram and colleagues in 1997 and Bi and Poo in 1998 measured the STDP window. In cultured hippocampal neurons it spans about $\\pm 20$ to $40$ milliseconds.'),
    b('2001 年的实验发现，放电频率和同时激活的突触数量也会决定增强还是减弱，单纯的时间窗不足以描述。', 'A 2001 experiment found that firing rate and the number of synapses active together also decide between potentiation and depression. A timing window alone is not enough.'),
    b('理论分析表明，如果减弱的总量略大于增强，STDP 会让突触之间相互竞争，只保留能可靠预测放电的输入。', 'Theory shows that if total depression slightly exceeds potentiation, STDP makes synapses compete and keeps only inputs that reliably predict firing.'),
  ],
  counterpart: [
    b('Oja 规则等赫布型规则在人工网络中可以学出输入的主成分，只用局部信息，不需要误差信号。', 'Hebbian rules such as Oja’s rule can learn the principal components of the input in artificial networks, using only local information and no error signal.'),
    b('脉冲神经网络可以只用 STDP 和侧抑制无监督地学会识别手写数字，但准确率低于反向传播训练的网络。', 'Spiking networks can learn to recognize handwritten digits without supervision using only STDP and lateral inhibition, but less accurately than networks trained by backpropagation.'),
    b('可微分可塑性让网络用梯度下降学会每个连接的赫布系数，在推理时继续按赫布规则改变权重。', 'Differentiable plasticity lets a network learn a Hebbian coefficient for each connection by gradient descent. During inference the weights keep changing by the Hebbian rule.'),
  ],
  math: [
    {
      title: b('STDP 时间窗：先后顺序决定增强还是减弱', 'The STDP window: the order of spikes decides strengthening or weakening'),
      tex: t`\Delta w(\Delta t) = \begin{cases} A_{+}\,e^{-\Delta t/\tau_{+}}, & \Delta t > 0 \\ -A_{-}\,e^{\Delta t/\tau_{-}}, & \Delta t < 0 \end{cases},\qquad \Delta t = t_{\text{post}} - t_{\text{pre}},\qquad \int \Delta w\,d(\Delta t) = A_{+}\tau_{+} - A_{-}\tau_{-}`,
      symbols: [
        { tex: t`\Delta t`, meaning: b('突触后脉冲时间减去突触前脉冲时间', 'postsynaptic spike time minus presynaptic spike time') },
        { tex: t`\Delta w`, meaning: b('一对脉冲引起的权重变化', 'weight change caused by one pair of spikes') },
        { tex: t`A_{+},\;A_{-}`, meaning: b('增强和减弱的最大幅度', 'maximum size of strengthening and weakening') },
        { tex: t`\tau_{+},\;\tau_{-}`, meaning: b('两侧时间窗的宽度', 'width of each side of the window') },
      ],
      steps: [
        b('计算两次脉冲的时间差：突触前在先为正，在后为负。', 'Compute the time difference of the two spikes, positive when the presynaptic spike comes first.'),
        b('时间差为正时增强，为负时减弱，幅度随时间差的绝对值指数下降。', 'A positive difference strengthens and a negative one weakens, with a size that falls exponentially with the absolute difference.'),
        b('若两侧的脉冲时间互不相关，对所有时间差平均，净变化与积分 $A_{+}\\tau_{+} - A_{-}\\tau_{-}$ 同号。', 'If spike times on the two sides are unrelated, the average over all differences has the same sign as the integral $A_{+}\\tau_{+} - A_{-}\\tau_{-}$.'),
      ],
      example: b(
        '取 $A_{+} = 0.010$、$A_{-} = 0.0105$、$\\tau_{+} = \\tau_{-} = 20$ 毫秒。突触前比突触后早 $10$ 毫秒：$\\Delta w = 0.010\\,e^{-0.5} \\approx +0.0061$。晚 $10$ 毫秒：$\\Delta w \\approx -0.0064$。积分为 $20 \\times (0.010 - 0.0105) = -0.01$，所以时间无关的随机输入总体上被削弱，只有经常领先于放电的输入被增强。',
        'Take $A_{+} = 0.010$, $A_{-} = 0.0105$ and $\\tau_{+} = \\tau_{-} = 20$ ms. A presynaptic spike $10$ ms before the postsynaptic one gives $\\Delta w = 0.010\\,e^{-0.5} \\approx +0.0061$. One $10$ ms after gives $\\Delta w \\approx -0.0064$. The integral is $20 \\times (0.010 - 0.0105) = -0.01$. Random inputs unrelated in time are weakened overall, and only inputs that often lead the neuron’s firing are strengthened.'),
      consequences: [
        b('STDP 增强能预测放电的输入，网络因此能学会时间上的因果顺序，例如按顺序激活的一串神经元。', 'STDP strengthens inputs that predict firing, so networks can learn causal order in time, such as a chain of neurons that fire in sequence.'),
        b('减弱略多于增强时，输入之间相互竞争，避免所有突触一起变强。', 'With slightly more depression than potentiation, inputs compete and not all synapses grow strong together.'),
      ],
      limitations: [
        b('只考虑成对的脉冲；多个脉冲之间的相互作用和放电频率的影响没有包括在内。', 'Only spike pairs are considered. Interactions among several spikes and the effect of firing rate are left out.'),
        b('权重没有上下限，长时间运行时需要额外的约束防止无限增长。', 'Weights have no bounds, so long runs need extra constraints to stop unlimited growth.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('赫布规则把一段经历写进 CA3 的连接', 'A Hebbian rule writes an experience into CA3 connections'), to: 'topic:episodic-memory' },
    { title: b('出生前的自发活动：按相关性细化连接', 'Spontaneous activity before birth refines connections by correlation'), to: 'topic:innate-constraints' },
    { title: b('眼优势竞争：两只眼的输入争夺有限的连接', 'Ocular dominance: inputs from the two eyes compete for limited connections'), to: 'topic:developmental-stages' },
  ],
  conditions: [
    b('STDP 主要在脑片和培养神经元中用成对刺激测得；在清醒动物的自然放电下，它对学习的贡献有多大仍有争议。', 'STDP was measured mainly in slices and cultures with paired stimulation. How much it contributes to learning under natural firing in awake animals is debated.'),
    b('不同突触的时间窗差别很大，有的甚至与经典形状相反，没有统一的规则。', 'Windows differ greatly between synapses, some even reversed from the classic shape, so there is no single rule.'),
    b('单靠赫布规则不能告诉突触「哪个结果是好的」，需要第三个因子提供奖赏或误差信息（见[三因子学习](card:three-factor)）。', 'Hebbian rules alone cannot tell a synapse which outcome was good. A third factor must supply reward or error information (see [three-factor learning](card:three-factor)).'),
  ],
  uses: [
    { to: 'topic:episodic-memory', role: b('一段经历中同时活跃的细胞之间的连接被增强，以后可以从部分线索补全。', 'Connections among cells active together during an experience are strengthened and can later complete it from a partial cue.') },
    { to: 'topic:innate-constraints', role: b('出生前视网膜的自发波让相邻的细胞一起放电，细化视觉通路的拓扑地图。', 'Spontaneous retinal waves before birth make neighboring cells fire together and refine the topographic maps of the visual pathway.') },
    { to: 'topic:developmental-stages', role: b('关键期内两只眼的输入按相关性竞争连接，决定眼优势的分布。', 'During the critical period, inputs from the two eyes compete for connections by correlation, setting ocular dominance.') },
  ],
  refs: ['hebb1949', 'bliss1993', 'markram1997', 'bi1998', 'song2000', 'sjostrom2001', 'diehl2015', 'miconi2018'],
}
