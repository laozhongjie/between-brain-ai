import type { Bi } from '../../data/types'
import type { CardMechanism } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** Layer 2: single neurons. */
export const LAYER2: CardMechanism[] = [
  {
    id: 'neuron-models', layer: 2,
    title: b('神经元的抽象层次 ↔ 人工神经元', 'Levels of neuron abstraction ↔ the artificial neuron'),
    brain: b(
      '真实神经元的膜电位随时间积分输入，达到阈值后发放动作电位并重置。Hodgkin–Huxley 方程用离子通道精确描述这一过程；LIF 模型只保留「漏电积分 + 阈值」；Izhikevich 模型用两个变量就能重现规则放电、爆发、快速放电等数十种放电模式。神经元还有适应（持续刺激下放电变慢），因此自带短时记忆。',
      'A real neuron integrates input over time in its membrane potential and fires a spike at threshold, then resets. Hodgkin–Huxley describes this with ion channels; the LIF model keeps just leaky integration + threshold; the Izhikevich model reproduces dozens of firing patterns (regular, bursting, fast spiking…) with two variables. Neurons also adapt (firing slows under constant drive), giving each cell a built-in short-term memory.'),
    brainMath: [
      { tex: t`C\frac{dV}{dt} = -\bar g_{\text{Na}}m^3h\,(V-E_{\text{Na}}) - \bar g_{\text{K}}n^4(V-E_{\text{K}}) - g_L(V-E_L) + I`, caption: b('Hodgkin–Huxley（1952）：钠、钾通道的门控变量 m, h, n 各有自己的动力学', 'Hodgkin–Huxley (1952): gating variables m, h, n each have their own dynamics') },
      { tex: t`\tau_m\frac{dV}{dt} = -(V - V_{\text{rest}}) + R\,I(t),\qquad V \ge \theta \Rightarrow \text{spike},\ V \leftarrow V_{\text{reset}}`, caption: b('漏电积分放电（LIF）模型', 'Leaky integrate-and-fire (LIF)') },
      { tex: t`\dot v = 0.04v^2 + 5v + 140 - u + I,\quad \dot u = a(bv - u),\quad v \ge 30 \Rightarrow v \leftarrow c,\ u \leftarrow u + d`, caption: b('Izhikevich（2003）：改变 a, b, c, d 就得到不同的放电模式', 'Izhikevich (2003): parameters a, b, c, d select the firing pattern') },
    ],
    ai: b(
      'McCulloch–Pitts（1943）神经元是一个阈值逻辑单元；感知机（1958）为其加上可学习的权重。现代深度学习的单元是「加权求和 + ReLU/GELU」，可以看作脉冲神经元「频率-电流曲线」的平滑近似，但没有内部状态。状态空间模型（S4、Mamba）重新为每个单元引入了线性动力学和时间常数。',
      'The McCulloch–Pitts (1943) neuron is a threshold logic unit; the perceptron (1958) added learnable weights. Modern units are “weighted sum + ReLU/GELU”, a smooth stand-in for a spiking neuron’s rate–current curve, with no internal state. State-space models (S4, Mamba) reintroduce per-unit linear dynamics and time constants.'),
    aiMath: [
      { tex: t`y = H\Big(\sum_i w_i x_i - \theta\Big)\quad\to\quad y = \mathrm{ReLU}(w^{\top}x + b)`, caption: b('从 McCulloch–Pitts 阈值单元到现代 ReLU 单元', 'From the McCulloch–Pitts threshold unit to the ReLU unit') },
      { tex: t`h_t = \bar A\,h_{t-1} + \bar B\,x_t,\qquad y_t = C\,h_t`, caption: b('状态空间模型：每个通道带有线性动力学（Mamba 中 A、B 随输入变化）', 'State-space model: each channel has linear dynamics (input-dependent in Mamba)') },
    ],
    corr: 'crude', evidence: 'established',
    refs: ['mcculloch1943', 'rosenblatt1958', 'hodgkin1952', 'izhikevich2003', 'brette2005', 'gu2023'],
    lab: 'neuron',
  },
  {
    id: 'dendrites', layer: 2,
    title: b('树突计算 ↔ 门控与多层单元', 'Dendritic computation ↔ gating and multi-layer units'),
    brain: b(
      '树突不是被动的导线：各分支有自己的非线性（NMDA 尖峰、钙尖峰），同一分支上聚集的输入会被超线性放大。Poirazi 等（2003）表明锥体神经元可近似为两层网络；Beniaguev 等（2021）发现要拟合一个皮层神经元的输入输出，需要 5–8 层的时序卷积网络。人类 L2/3 神经元的树突钙峰对输入强度呈非单调响应，单个神经元就能计算异或（Gidon 2020）。顶树突接收反馈和上下文，基底树突接收前馈输入，两者同时到达时触发爆发放电（Larkum 2013）。',
      'Dendrites are not passive wires: branches have their own nonlinearities (NMDA and calcium spikes), and inputs clustered on a branch are amplified supralinearly. Poirazi et al. (2003) showed a pyramidal neuron ≈ a two-layer network; Beniaguev et al. (2021) needed a 5–8-layer temporal convolutional network to fit one cortical neuron. Human L2/3 dendritic calcium spikes respond non-monotonically, letting a single neuron compute XOR (Gidon 2020). Apical dendrites receive feedback/context and basal dendrites feedforward input; coincidence triggers bursts (Larkum 2013).'),
    brainMath: [
      { tex: t`y = g\Big(\sum_{j} \alpha_j\, s\Big(\sum_{i\in \text{branch } j} w_{ij}\,x_i\Big)\Big)`, caption: b('两层模型：每个树突分支 s(·) 是一个子单元，胞体 g(·) 汇总', 'Two-layer model: each branch s(·) is a subunit; the soma g(·) combines them') },
      { tex: t`\text{burst} \iff V_{\text{basal}} > \theta_b \ \wedge\ V_{\text{apical}} > \theta_a`, caption: b('顶树突-基底树突耦合：前馈与上下文同时满足时才产生爆发（示意）', 'Apical–basal coupling: a burst when feedforward and context coincide (schematic)') },
    ],
    ai: b(
      '标准人工单元是「点神经元」。最接近树突的是乘性门控：GLU、LSTM 门、以及「主动树突」网络（Iyer 2022），用上下文向量选择每个单元的哪个树突段起作用，从而在多任务中减少遗忘。',
      'Standard units are point neurons. The closest analogs are multiplicative gates: GLU, LSTM gates, and active-dendrite networks (Iyer 2022), where a context vector selects which dendritic segment drives each unit, reducing forgetting across tasks.'),
    aiMath: [
      { tex: t`y = \big(W x\big) \odot \sigma\big(U c\big)`, caption: b('上下文门控：c 是上下文（类比顶树突输入）', 'Context gating: c is context (cf. apical input)') },
      { tex: t`y = (W_1x)\odot\sigma(W_2x)`, caption: b('GLU：前馈信号自身的乘性门控', 'GLU: multiplicative self-gating') },
    ],
    corr: 'crude', evidence: 'established',
    refs: ['poirazi2003', 'beniaguev2021', 'gidon2020', 'larkum2013', 'iyer2022', 'payeur2021'],
    lab: 'dendrite',
  },
  {
    id: 'spikes', layer: 2,
    title: b('脉冲与时间编码 ↔ 连续激活 / 脉冲神经网络', 'Spikes & temporal coding ↔ continuous activations / SNNs'),
    brain: b(
      '神经元之间传递的是全或无的动作电位。信息可以编码在频率里，也可以编码在精确时间、首个脉冲潜伏期、相对于振荡的相位或群体同步中。只有发生变化时才发送事件，这使得通信高度稀疏、节能。',
      'Neurons exchange all-or-none spikes. Information can be carried by rate, precise timing, first-spike latency, phase relative to oscillations or population synchrony. Events are sent only when something happens, making communication sparse and energy-efficient.'),
    brainMath: [
      { tex: t`S(t) = \sum_k \delta(t - t_k),\qquad r = \frac{1}{T}\int_0^T S(t)\,dt`, caption: b('脉冲序列与频率编码', 'Spike train and rate code') },
      { tex: t`P(n \mid r, T) = \frac{(rT)^n e^{-rT}}{n!}`, caption: b('泊松放电模型（常用的一阶近似）', 'Poisson firing (a common first approximation)') },
    ],
    ai: b(
      '主流网络传递的是同步更新的连续数值。脉冲神经网络（SNN，「第三代神经网络」，Maass 1997）使用事件驱动计算；由于脉冲不可微，训练时用「替代梯度」（Neftci 2019）或 e-prop 等方法。SNN 在神经形态芯片上很节能，但在大规模任务上的精度和生态仍落后于主流模型。',
      'Mainstream networks pass synchronously updated real values. Spiking neural networks (“third generation”, Maass 1997) compute event-driven; since spikes are non-differentiable, training uses surrogate gradients (Neftci 2019) or e-prop. SNNs are very efficient on neuromorphic chips but lag mainstream models in accuracy and ecosystem at scale.'),
    aiMath: [{ tex: t`\frac{\partial S}{\partial V} \approx \frac{1}{\big(1 + \beta\,|V - \theta|\big)^2}`, caption: b('替代梯度：用平滑函数代替阶跃函数的导数', 'Surrogate gradient: a smooth stand-in for the step-function derivative') }],
    corr: 'crude', evidence: 'debated',
    refs: ['maass1997', 'neftci2019', 'bellec2020'],
  },
  {
    id: 'ei-celltypes', layer: 2,
    title: b('兴奋/抑制与细胞类型多样性 ↔ 同质单元 + 归一化', 'Excitation/inhibition & cell-type diversity ↔ uniform units + normalization'),
    brain: b(
      '皮层中大约 80% 是兴奋性锥体神经元，约 20% 是抑制性中间神经元（比例因物种和脑区而异），后者又分为 PV（快速抑制、同步振荡）、SST（抑制树突、调节输入）、VIP（抑制其他抑制神经元，即「去抑制」，打开信息通道）等类型。兴奋与抑制保持动态平衡，使网络既灵敏又不失控。',
      'Roughly 80% of cortical neurons are excitatory pyramidal cells and ~20% inhibitory interneurons (varying by species and area): PV (fast inhibition, gamma oscillations), SST (dendritic inhibition, input control), VIP (inhibiting other interneurons, i.e. disinhibition that opens a channel), and more. Excitation and inhibition stay dynamically balanced, keeping the network sensitive but stable.'),
    brainMath: [
      { tex: t`\tau_E\dot r_E = -r_E + f(W_{EE}r_E - W_{EI}r_I + I_E),\qquad \tau_I\dot r_I = -r_I + f(W_{IE}r_E - W_{II}r_I + I_I)`, caption: b('兴奋-抑制群体模型（本网站的后台动态就用这种 Wilson–Cowan 形式）', 'E–I population model (the Wilson–Cowan form this site’s background dynamics use)') },
    ],
    ai: b(
      'AI 单元基本同质，权重可正可负，没有专门的抑制性单元。增益控制由 LayerNorm/BatchNorm 等全局操作完成，门控由乘性门实现。',
      'AI units are essentially uniform with signed weights and no dedicated inhibitory cells. Gain control comes from global ops like LayerNorm/BatchNorm; gating from multiplicative gates.'),
    aiMath: [{ tex: t`\mathrm{LN}(x) = \gamma\,\frac{x - \mu}{\sigma} + \beta`, caption: b('LayerNorm：一种全局的增益归一化', 'LayerNorm: a global gain normalization') }],
    corr: 'crude', evidence: 'established',
    refs: ['tremblay2016', 'carandini2012'],
  },
  {
    id: 'noise', layer: 2,
    title: b('噪声与随机性 ↔ Dropout / 采样', 'Noise & stochasticity ↔ dropout / sampling'),
    brain: b(
      '离子通道开闭、递质释放、突触整合都是随机的，同一刺激引起的放电每次不同。这种变异性可能被用于概率推断（放电模式代表后验分布的样本）和行为探索，而神经调质（如去甲肾上腺素）会改变这种变异性。',
      'Channel gating, transmitter release and synaptic integration are all stochastic; the same stimulus evokes different spikes each time. This variability may serve probabilistic inference (activity as samples from a posterior) and behavioral exploration, and neuromodulators such as noradrenaline alter it.'),
    brainMath: [{ tex: t`F = \frac{\mathrm{Var}(N)}{\mathbb{E}[N]} \approx 1 \ \text{(Poisson-like cortical spiking)}`, caption: b('Fano 因子：皮层放电计数的变异性通常接近泊松过程', 'Fano factor: cortical spike-count variability is often near-Poisson') }],
    ai: b(
      'AI 在训练中刻意注入噪声（dropout、数据增强），在生成时用温度控制采样随机性，扩散模型更是以噪声为核心。但推理中的随机性通常是外加的，而非来自单元本身。',
      'AI injects noise deliberately in training (dropout, augmentation), controls sampling randomness with temperature, and diffusion models are built on noise. But inference randomness is usually added externally, not intrinsic to units.'),
    aiMath: [{ tex: t`\tilde h = h \odot m,\ m_i \sim \mathrm{Bernoulli}(p);\qquad p(a) \propto e^{Q(a)/T}`, caption: b('Dropout 与带温度 T 的 softmax 采样', 'Dropout and softmax sampling with temperature T') }],
    corr: 'similar', evidence: 'debated',
    refs: ['faisal2008', 'srivastava2014', 'doya2002'],
  },
  {
    id: 'energy-sparsity', layer: 2,
    title: b('能耗与稀疏编码 ↔ 稠密计算 / MoE', 'Energy & sparse coding ↔ dense compute / MoE'),
    brain: b(
      '信号传递（动作电位与突触传递）占据了大脑能量预算的主要部分（Attwell & Laughlin 2001），因此大脑倾向于稀疏放电：用少数活跃神经元表示信息。Olshausen & Field（1996）表明，只要要求编码稀疏，就能从自然图像中自动学出与 V1 简单细胞相似的感受野。',
      'Signaling (spikes and synaptic transmission) dominates the brain’s energy budget (Attwell & Laughlin 2001), so the brain favors sparse firing: few active neurons per representation. Olshausen & Field (1996) showed that demanding sparsity alone makes V1-like simple-cell receptive fields emerge from natural images.'),
    brainMath: [{ tex: t`\min_{\Phi,\,a}\ \big\|x - \Phi a\big\|_2^2 + \lambda \sum_i |a_i|`, caption: b('稀疏编码：用尽量少的激活重建输入', 'Sparse coding: reconstruct the input with as few active units as possible') }],
    ai: b(
      '主流网络是稠密计算，训练与推理耗能巨大。条件计算提供了部分稀疏：MoE 每个 token 只激活少数专家（Switch Transformer），ReLU 网络也有天然的激活稀疏。',
      'Mainstream networks compute densely and consume enormous energy. Conditional computation adds some sparsity: MoE activates a few experts per token (Switch Transformer), and ReLU nets have natural activation sparsity.'),
    aiMath: [{ tex: t`y = \sum_{i \in \mathrm{TopK}(g(x))} g_i(x)\,E_i(x)`, caption: b('稀疏 MoE：只计算得分最高的 k 个专家', 'Sparse MoE: compute only the top-k experts') }],
    corr: 'crude', evidence: 'established',
    refs: ['attwell2001', 'olshausen1996', 'fedus2022'],
  },
]
