import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M05 Neural noise: variability from channels, synapses and the network, and the limits of averaging it away. */
export const NOISE: MechEntry = {
  definition: b(
    '同一个刺激重复呈现时，神经元每次的放电都不一样，这种变异称为神经噪声。它来自几个物理来源：离子通道随机开关，突触随机释放递质，以及网络中其他神经元不断变化的背景输入。噪声可以靠平均许多神经元来降低，但神经元之间相关的那部分噪声平均不掉。',
    'When the same stimulus is shown again and again, a neuron fires differently each time. This variability is called neural noise. It has several physical sources. Ion channels open and close at random, synapses release transmitter at random and the rest of the network sends changing background input. Averaging many neurons reduces noise, but the part shared between neurons does not average away.'),
  scale: b('离子通道、突触到神经元群体', 'From ion channels and synapses to populations'),
  timescale: b('毫秒级的涨落，跨试次的变异', 'Fluctuations over milliseconds, variability across trials'),
  steps: [
    {
      title: b('离子通道噪声', 'Ion channel noise'),
      points: [
        b('每个离子通道随机地在开和关之间跳动；通道数少的细轴突和小树突上，这种随机性会改变脉冲的时间甚至有无。', 'Each ion channel flips between open and closed at random. On thin axons and small dendrites with few channels, this randomness can shift spike timing or even decide whether a spike happens.'),
      ],
    },
    {
      title: b('突触噪声', 'Synaptic noise'),
      points: [
        b('突触以概率释放递质，同一个突触前脉冲每次产生的电流大小不同（见[突触传递](card:synapse-weight)）。', 'Synapses release transmitter with some probability, so the same presynaptic spike produces a different current each time (see [synaptic transmission](card:synapse-weight)).'),
      ],
    },
    {
      title: b('网络背景活动', 'Background network activity'),
      points: [
        b('一个皮层神经元同时接收数千个输入，大部分与当前刺激无关，它们的涨落使膜电位不停起伏。', 'A cortical neuron receives thousands of inputs at once, most unrelated to the current stimulus, and their fluctuations keep its membrane potential moving.'),
        b('兴奋与抑制大致平衡时，膜电位停在阈值附近，放电由这些涨落触发，看起来接近随机。', 'When excitation and inhibition roughly balance, the potential sits near threshold and spikes are triggered by the fluctuations, which looks nearly random.'),
      ],
    },
    {
      title: b('试次间变异', 'Trial-to-trial variability'),
      points: [
        b('皮层神经元在重复刺激下的脉冲数方差约等于平均值，与泊松过程相近。', 'The variance of spike counts of cortical neurons across repeats is about equal to the mean, close to a Poisson process.'),
      ],
    },
    {
      title: b('群体平均与相关噪声', 'Population averaging and correlated noise'),
      points: [
        b('下游把许多神经元的活动平均起来，独立的噪声相互抵消。', 'Downstream neurons average many neurons, and independent noise cancels out.'),
        b('相邻神经元共享部分输入，它们的噪声有相关；相关的那部分不随神经元数量减少。', 'Neighboring neurons share some inputs, so their noise is correlated, and that shared part does not shrink with more neurons.'),
      ],
    },
    {
      title: b('噪声的用处', 'Uses of noise'),
      points: [
        b('一些理论认为，变异可以表示不确定性：活动的波动对应于对外部状态的概率分布的采样。', 'Some theories hold that variability can represent uncertainty, with activity fluctuations acting as samples from a probability distribution over the world.'),
        b('行为上的随机性也有助于探索新的选择。', 'Randomness in behavior also helps explore new options.'),
      ],
    },
  ],
  notes: [
    b('2008 年的综述把神经系统的噪声来源从感受器到肌肉逐一整理，指出噪声在多个层次限制了感知和运动的精度。', 'A 2008 review traced the sources of noise in the nervous system from receptors to muscles. It showed that noise limits the precision of perception and movement at many levels.'),
    b('Shadlen 与 Newsome 在 1998 年分析了兴奋与抑制平衡怎样使皮层神经元以接近随机的方式放电。', 'Shadlen and Newsome analyzed in 1998 how a balance of excitation and inhibition makes cortical neurons fire in a nearly random way.'),
    b('1994 年在猴子 MT 区测得，相邻神经元噪声的相关系数约为 $0.1$ 到 $0.2$；据此估计，平均超过约 $100$ 个神经元后，精度几乎不再提高。', 'In 1994, noise correlations between neighboring neurons in monkey area MT were measured at about $0.1$ to $0.2$. From this, averaging beyond about $100$ neurons was estimated to add little precision.'),
    b('后来的理论指出，限制精度的不是所有相关，而是与信号方向相同的那部分相关。', 'Later theory pointed out that what limits precision is not all correlation but the part aligned with the signal.'),
  ],
  counterpart: [
    b('Dropout 在训练中随机关闭部分单元，减少过拟合；推理时通常关闭，网络变为确定的。', 'Dropout switches off random units during training to reduce overfitting. It is usually off at inference, and the network becomes deterministic.'),
    b('语言模型按温度从输出分布中采样，温度越高越随机；扩散模型通过逐步去除加入的噪声来生成样本。', 'Language models sample from their output distribution at a temperature, and higher temperatures are more random. Diffusion models generate samples by gradually removing added noise.'),
    b('在 AI 中，随机性是设计者选择加入的；在大脑中，它首先来自无法消除的物理过程。', 'In AI, randomness is added by choice of the designer. In the brain it comes first from physical processes that cannot be removed.'),
  ],
  math: [
    {
      title: b('相关噪声限制平均：神经元再多，误差也降不到某个下限以下', 'Correlated noise limits averaging: past a point more neurons do not lower the error'),
      tex: t`\mathrm{Var}\Big(\frac{1}{N}\sum_{i=1}^{N} x_i\Big) = \frac{\sigma^{2}}{N}\big(1 + (N - 1)\,\rho\big)\ \xrightarrow{\,N \to \infty\,}\ \rho\,\sigma^{2}`,
      symbols: [
        { tex: t`x_i`, meaning: b('第 $i$ 个神经元的响应（每次试次不同）', 'response of neuron $i$, different on each trial') },
        { tex: t`N`, meaning: b('被平均的神经元数', 'number of neurons averaged') },
        { tex: t`\sigma^{2}`, meaning: b('单个神经元噪声的方差', 'noise variance of one neuron') },
        { tex: t`\rho`, meaning: b('任意两个神经元噪声的相关系数', 'correlation coefficient of noise between any two neurons') },
      ],
      steps: [
        b('$N$ 个神经元平均后，方差由两部分组成：每个神经元自己的噪声，以及每两个神经元之间的协方差。', 'After averaging $N$ neurons, the variance has two parts: each neuron’s own noise and the covariance between every pair.'),
        b('自己的噪声贡献 $\\sigma^2/N$，随 $N$ 增大而减小。', 'Own noise contributes $\\sigma^2/N$, which shrinks as $N$ grows.'),
        b('协方差贡献 $\\rho\\,\\sigma^2 (N - 1)/N$，随 $N$ 增大趋于 $\\rho\\,\\sigma^2$，不会消失。', 'The covariance contributes $\\rho\\,\\sigma^2 (N - 1)/N$, which approaches $\\rho\\,\\sigma^2$ as $N$ grows and never vanishes.'),
      ],
      example: b(
        '取 $\\sigma^2 = 1$、$\\rho = 0.1$。$N = 10$ 时方差为 $(1 + 0.9)/10 = 0.19$；$N = 100$ 时为 $(1 + 9.9)/100 \\approx 0.11$；再多也只能降到 $0.1$。若噪声独立，$N = 100$ 时方差只有 $0.01$。相关系数只有 $0.1$，却让 $100$ 个神经元的平均比独立时差了约 $11$ 倍。',
        'Take $\\sigma^2 = 1$ and $\\rho = 0.1$. With $N = 10$ the variance is $(1 + 0.9)/10 = 0.19$, and with $N = 100$ it is $(1 + 9.9)/100 \\approx 0.11$. More neurons only bring it down to $0.1$. With independent noise, $N = 100$ would give just $0.01$. A correlation of only $0.1$ makes the average of $100$ neurons about $11$ times worse than with independent noise.'),
      consequences: [
        b('增加神经元数量的收益很快饱和；相关性比神经元数量更决定群体编码的精度。', 'The benefit of more neurons saturates quickly. Correlation matters more than numbers for the precision of a population code.'),
        b('注意等过程降低神经元之间的噪声相关，可能是它提高感知精度的一种方式。', 'Processes such as attention lower noise correlations between neurons, which may be one way they improve perceptual precision.'),
      ],
      limitations: [
        b('假设所有神经元的方差和相关都相同；真实的相关随神经元之间的距离和偏好相似度变化。', 'All neurons are assumed to share one variance and one correlation. Real correlations vary with distance and similarity of preference.'),
        b('用简单平均读出；最优的读出可以利用相关的结构，部分避开这一下限。', 'The readout is a plain average. An optimal readout can use the structure of correlations and partly avoid this floor.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('证据累积与信心：信心是已有证据下判断正确的概率', 'Evidence accumulation and confidence: confidence as the chance of being right given the evidence'), to: 'topic:metacognitive-monitoring' },
    { title: b('温度缩放：用一个参数修正过度自信', 'Temperature scaling: one parameter corrects overconfidence'), to: 'topic:metacognitive-monitoring' },
    { title: b('按可靠性加权：合并后的估计比任何单一感官都精确', 'Weighting by reliability: the combined estimate beats any single sense'), to: 'topic:multisensory' },
  ],
  conditions: [
    b('神经元在受控的电流注入下能以毫秒精度重复放电，所以皮层的变异有相当部分来自网络输入，而不是细胞本身。', 'Neurons repeat their spikes to the millisecond under controlled current injection. Much of cortical variability therefore comes from network input rather than from the cell itself.'),
    b('变异中有多少是无用的噪声、有多少表示不确定性或内部状态（如注意和觉醒），仍有争议。', 'How much variability is useless noise and how much represents uncertainty or internal states such as attention and arousal is debated.'),
    b('噪声相关的大小依赖动物的状态和测量方法，不同研究的数值差别较大。', 'The size of noise correlations depends on the animal’s state and the method, and values differ widely between studies.'),
  ],
  uses: [
    { to: 'topic:metacognitive-monitoring', role: b('带噪声的证据逐步累积，累积的程度给出对判断的信心。', 'Noisy evidence builds up step by step, and how far it has built gives the confidence in a judgment.') },
    { to: 'topic:multisensory', role: b('每种感官的噪声大小决定合并时给它多少权重。', 'The noise level of each sense decides how much weight it gets when senses are combined.') },
    { to: 'topic:reward-learning', role: b('选择中的随机性让动物偶尔尝试价值看起来较低的选项，从而学到新的价值。', 'Randomness in choice lets animals sometimes try options that look worse, and so learn new values.') },
  ],
  refs: ['faisal2008', 'shadlen1998', 'mainen1995', 'zohary1994', 'averbeck2006', 'morenobote2014', 'cohen2009', 'srivastava2014', 'doya2002'],
}
