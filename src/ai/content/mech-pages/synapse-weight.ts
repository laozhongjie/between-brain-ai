import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M01 Synaptic transmission: quantal, probabilistic release sets the strength of a connection. */
export const SYNAPSE_WEIGHT: MechEntry = {
  definition: b(
    '突触传递是一个神经元影响另一个神经元的物理过程：电脉冲到达轴突末梢，引起装有递质的小泡随机释放，递质在下一个细胞上打开离子通道，产生一个电流。一个连接的「强度」由三个量决定：释放位点的数量、每个位点释放的概率，以及一个小泡引起的电流大小。',
    'Synaptic transmission is the physical process by which one neuron affects another. An electrical pulse reaches the axon terminal and vesicles filled with transmitter are released at random. The transmitter opens ion channels on the next cell and produces a current. Three quantities set the strength of a connection: the number of release sites, the release probability of each site and the current from one vesicle.'),
  scale: b('单个突触：不到 1 微米的接触点', 'A single synapse: a contact under 1 micrometer across'),
  timescale: b('一次传递约 1 到 10 毫秒', 'One transmission takes about 1 to 10 milliseconds'),
  steps: [
    {
      title: b('脉冲到达末梢', 'A spike reaches the terminal'),
      points: [
        b('动作电位沿轴突传到末梢，打开电压门控的钙通道，钙离子流入。', 'The action potential reaches the terminal and opens voltage-gated calcium channels, and calcium flows in.'),
      ],
    },
    {
      title: b('小泡随机释放', 'Vesicles release at random'),
      points: [
        b('末梢有 $n$ 个释放位点，每个位点以概率 $p$ 释放一个装有递质的小泡。', 'The terminal has $n$ release sites, and each releases one vesicle of transmitter with probability $p$.'),
        b('皮层突触的 $p$ 常常低于 $0.5$，一个脉冲经常什么也没有释放。', 'In cortex $p$ is often below $0.5$, so a spike often releases nothing.'),
      ],
    },
    {
      title: b('递质结合受体', 'Transmitter binds receptors'),
      points: [
        b('递质在约 20 纳米宽的间隙中扩散，结合下一个细胞上的受体。', 'The transmitter diffuses across a gap of about 20 nanometers and binds receptors on the next cell.'),
        b('受体数量决定一个小泡能打开多少离子通道。', 'The number of receptors sets how many ion channels one vesicle can open.'),
      ],
    },
    {
      title: b('突触电流', 'Synaptic current'),
      points: [
        b('离子通道打开，离子按膜电位与反转电位之差流入或流出，产生量子大小为 $q$ 的电流。', 'Ion channels open and ions flow according to the difference between the membrane potential and the reversal potential, giving a current of quantal size $q$.'),
        b('兴奋性突触使膜电位升高，抑制性突触使它降低。', 'Excitatory synapses raise the membrane potential and inhibitory ones lower it.'),
      ],
    },
    {
      title: b('在树突上汇总', 'Summing on the dendrite'),
      points: [
        b('数千个突触的电流在树突和胞体上叠加，决定这个神经元是否放电。', 'Currents from thousands of synapses add up in the dendrites and soma and decide whether the neuron fires.'),
      ],
    },
    {
      title: b('强度可以改变', 'Strength can change'),
      points: [
        b('学习可以改变 $p$（突触前）、$q$（突触后受体数量）或 $n$（新增或撤除释放位点）。', 'Learning can change $p$ on the presynaptic side, $q$ through the number of postsynaptic receptors, or $n$ by adding or removing release sites.'),
        b('同样的平均强度可以由不同的组合实现，它们在可靠性上不同。', 'The same mean strength can come from different combinations, which differ in reliability.'),
      ],
    },
  ],
  notes: [
    b('1954 年，del Castillo 与 Katz 在神经肌肉接头上发现，突触电位是由大小相同的「量子」叠加而成，并提出了二项释放模型。', 'In 1954 del Castillo and Katz found at the neuromuscular junction that synaptic potentials are sums of equal quanta, and proposed the binomial release model.'),
    b('单个突触的释放概率在不同突触之间相差很大，从接近 $0$ 到接近 $1$，也会随近期的活动改变（见[短时可塑性](card:short-term-plasticity)）。', 'Release probability varies widely between synapses, from near $0$ to near $1$, and changes with recent activity (see [short-term plasticity](card:short-term-plasticity)).'),
    b('按 Dale 原理，一个神经元的所有输出突触释放同一类递质，所以一个神经元要么兴奋、要么抑制，它的连接不能像人工网络的权重那样随意变号。', 'By Dale’s principle, all output synapses of a neuron release the same kind of transmitter. A neuron is excitatory or inhibitory, and its connections cannot change sign as artificial weights can.'),
    b('不可靠的释放会增加噪声，也节省能量：只有一部分脉冲引起递质释放和随后的离子泵耗能。', 'Unreliable release adds noise but also saves energy, since only some spikes trigger release and the ion pumping that follows.'),
  ],
  counterpart: [
    b('人工网络的权重 $w_{ij}$ 是一个确定的实数，每次计算都完整地传递，正负号可以在训练中改变。', 'A weight $w_{ij}$ in an artificial network is a fixed real number that passes on in full at every step. Its sign can change in training.'),
    b('DropConnect 和 Dropout 在训练时随机丢弃连接或单元，功能上类似不可靠的释放，但只在训练时使用。', 'DropConnect and Dropout randomly drop connections or units during training. This is functionally similar to unreliable release, but used only in training.'),
  ],
  math: [
    {
      title: b('二项释放：突触电流由随机释放的小泡数决定', 'Binomial release: the synaptic current depends on how many vesicles are released at random'),
      tex: t`P(k) = \binom{n}{k} p^{k} (1 - p)^{n-k},\qquad \mathbb{E}[I] = n\,p\,q,\qquad \mathrm{CV} = \sqrt{\frac{1 - p}{n\,p}}`,
      symbols: [
        { tex: t`n`, meaning: b('释放位点数', 'number of release sites') },
        { tex: t`p`, meaning: b('每个位点在一个脉冲后释放的概率', 'release probability of each site after one spike') },
        { tex: t`k`, meaning: b('这一次释放的小泡数', 'number of vesicles released this time') },
        { tex: t`q`, meaning: b('一个小泡引起的电流（量子大小）', 'current caused by one vesicle, the quantal size') },
        { tex: t`\mathbb{E}[I]`, meaning: b('平均突触电流', 'mean synaptic current') },
        { tex: t`\mathrm{CV}`, meaning: b('变异系数：标准差除以平均值，越大越不可靠', 'coefficient of variation: standard deviation over mean, larger means less reliable') },
      ],
      steps: [
        b('每个位点独立地以概率 $p$ 释放，$n$ 个位点中释放 $k$ 个的概率服从二项分布。', 'Each site releases independently with probability $p$, so the chance that $k$ of $n$ sites release follows a binomial distribution.'),
        b('突触电流等于 $k$ 乘以 $q$，平均为 $npq$。', 'The current equals $k$ times $q$, with mean $npq$.'),
        b('变异系数只取决于 $n$ 和 $p$：位点越少、概率越低，每次传递差别越大。', 'The coefficient of variation depends only on $n$ and $p$. Fewer sites and lower probability make each transmission more variable.'),
      ],
      example: b(
        '取 $n = 5$、$p = 0.3$、$q = 10$ pA。平均电流为 $5 \\times 0.3 \\times 10 = 15$ pA；完全不释放的概率为 $0.7^5 \\approx 0.17$；变异系数为 $\\sqrt{0.7 / 1.5} \\approx 0.68$。若 $n = 15$、$p = 0.1$，平均电流同样是 $15$ pA，但完全不释放的概率升到 $0.9^{15} \\approx 0.21$，变异系数约为 $0.77$。',
        'Take $n = 5$, $p = 0.3$ and $q = 10$ pA. The mean current is $5 \\times 0.3 \\times 10 = 15$ pA and the chance of no release at all is $0.7^5 \\approx 0.17$. The coefficient of variation is $\\sqrt{0.7 / 1.5} \\approx 0.68$. With $n = 15$ and $p = 0.1$ the mean is also $15$ pA. But the chance of no release rises to $0.9^{15} \\approx 0.21$, and the coefficient of variation is about $0.77$.'),
      consequences: [
        b('「连接强度」不是一个数，而是一个分布；同样的平均值，可靠程度可以很不同。', 'Connection strength is a distribution, not a number. The same mean can come with very different reliability.'),
        b('改变 $p$ 和改变 $q$ 对平均值的作用相同，对可靠性和后续的短时动态作用不同，所以实验可以从电流的波动推断学习改变的是哪一侧。', 'Changing $p$ or $q$ has the same effect on the mean but different effects on reliability and short-term dynamics. Experiments can therefore infer from the fluctuations which side learning changed.'),
      ],
      limitations: [
        b('模型假设各位点独立、$p$ 和 $q$ 处处相同；真实突触的位点之间并不完全一样。', 'The model assumes independent sites with the same $p$ and $q$. Real release sites are not all alike.'),
        b('$p$ 会随最近的放电历史变化，单次脉冲的模型没有描述这一点。', '$p$ changes with recent firing history, which a single-spike model does not describe.'),
      ],
    },
  ],
  elsewhere: [],
  conditions: [
    b('二项模型在神经肌肉接头上得到了很好的验证；在中枢突触上，位点数和量子大小难以直接测量，估计值依赖模型假设。', 'The binomial model is well confirmed at the neuromuscular junction. At central synapses the number of sites and the quantal size are hard to measure directly, and estimates depend on model assumptions.'),
    b('不可靠的释放是缺陷还是功能（节能、提供学习所需的随机性）仍有争议。', 'Whether unreliable release is a flaw or a feature, saving energy or providing randomness for learning, is debated.'),
    b('树突的位置和非线性会改变一个突触对胞体的实际影响，单一的强度值无法完整描述（见[树突计算](card:dendrites)）。', 'Dendritic location and nonlinearity change a synapse’s real effect on the soma, so a single strength value cannot describe it fully (see [dendritic computation](card:dendrites)).'),
  ],
  uses: [
    { to: 'topic:episodic-memory', role: b('一段经历被写成海马 CA3 中一组突触强度的变化。', 'An experience is written as changes in the strengths of a set of synapses in hippocampal CA3.') },
    { to: 'topic:credit-assignment', role: b('学习规则要决定改变哪些突触的强度，以及改变多少。', 'Learning rules must decide which synapses to change and by how much.') },
    { to: 'topic:efficiency', role: b('突触传递是大脑能耗中最大的一项，释放的可靠性直接影响能耗。', 'Synaptic transmission is the largest item of brain energy use, and release reliability directly affects it.') },
  ],
  refs: ['delcastillo1954', 'branco2009', 'faisal2008', 'harris2012', 'srivastava2014'],
}
