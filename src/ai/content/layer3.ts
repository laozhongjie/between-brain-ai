import type { Bi } from '../../data/types'
import type { CardMechanism } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** Layer 3: microcircuits. */
export const LAYER3: CardMechanism[] = [
  {
    id: 'normalization', layer: 3,
    title: b('除法归一化与侧抑制 ↔ Softmax / LayerNorm', 'Divisive normalization & lateral inhibition ↔ softmax / LayerNorm'),
    brain: b(
      '从视网膜到皮层，神经元的响应普遍受到除法归一化：它的驱动输入被一个邻近群体的加权总活动相除。这实现了对比度不变性、增益控制、赢者通吃式竞争，也被用来解释注意对响应的调节（Carandini & Heeger 2012）。',
      'From retina to cortex, responses are divisively normalized: a neuron’s drive is divided by the weighted activity of a neighboring pool. This yields contrast invariance, gain control and winner-take-all competition, and also explains attentional modulation (Carandini & Heeger 2012).'),
    brainMath: [{ tex: t`r_i = \gamma\,\frac{x_i^{\,n}}{\sigma^{n} + \sum_j w_{ij}\,x_j^{\,n}}`, caption: b('除法归一化', 'Divisive normalization') }],
    ai: b('Softmax 把一组分数转换成总和为 1 的权重，常用于注意力分配。LayerNorm 和 BatchNorm 则先减去均值，再除以带稳定项的标准差，最后进行可学习的缩放和平移。它们都调节信号尺度，但运算和使用的活动池不同。', 'Softmax converts scores into weights that sum to one, often for attention. LayerNorm and BatchNorm subtract a mean, divide by a stabilized standard deviation, then apply learned scaling and shifting. All regulate signal scale, but their operations and reference pools differ.'),
    aiMath: [{ tex: t`\mathrm{softmax}(z)_i = \frac{e^{z_i}}{\sum_j e^{z_j}}`, caption: b('Softmax：可看作 $\\sigma \\to 0$、幂次换成指数的归一化特例', 'Softmax: a normalization special case with exponential nonlinearity') }],
    kinds: ['math', 'algorithm'], evidence: 'established',
    refs: ['carandini2012', 'vaswani2017'],
  },
  {
    id: 'feedback-predictive', layer: 3,
    title: b('反馈连接与预测编码 ↔ 以前馈为主的网络 / JEPA', 'Feedback & predictive coding ↔ mostly-feedforward nets / JEPA'),
    brain: b(
      '感觉皮层有双向连接。预测编码模型提出：高层预测低层输入，低层把实际输入与预测比较，再用误差修正表征（Rao & Ballard 1999）。这样，感知被建模为反复寻找能解释输入的原因。这个模型如何对应真实细胞和通路仍有争议；自由能框架进一步把类似思想用于行动（Friston 2010）。',
      'Sensory cortex has bidirectional connections. Predictive-coding models propose that higher levels predict lower-level input and errors revise representations (Rao & Ballard 1999). Perception is modeled as iteratively finding causes that explain the input. The mapping to cells and pathways remains debated; free-energy accounts extend related ideas to action (Friston 2010).'),
    brainMath: [
      { tex: t`\varepsilon_l = r_l - g\big(W_l\,r_{l+1}\big)`, caption: b('第 l 层的预测误差', 'Prediction error at level l') },
      { tex: t`\tau\,\dot r_{l+1} = W_l^{\top}\big(\varepsilon_l \odot g'\big) - \varepsilon_{l+1}`, caption: b('表征更新：同时解释下层误差、符合上层预测', 'Representation update: explain the error below while matching the prediction above') },
    ],
    ai: b('多数深度网络推理是一次前向传播。预测编码网络用局部误差实现迭代推断，并可近似反向传播（Whittington & Bogacz 2017）。JEPA（LeCun 2022）在潜在空间而非像素空间做预测，是世界模型的一条主要路线。扩散模型和迭代细化也带有「多步推断」的味道。', 'Most deep nets infer in one forward pass. Predictive-coding networks infer iteratively with local errors and can approximate backprop (Whittington & Bogacz 2017). JEPA (LeCun 2022) predicts in latent rather than pixel space, a major world-model route. Diffusion and iterative refinement also have a multi-step-inference flavor.'),
    aiMath: [{ tex: t`\mathcal{L}_{\text{JEPA}} = \big\| s_\theta(y) - \mathrm{Pred}_\phi\big(s_\theta(x), z\big)\big\|^2`, caption: b('JEPA：在表征空间预测目标的嵌入', 'JEPA: predict the target’s embedding in representation space') }],
    kinds: ['algorithm'], evidence: 'debated',
    refs: ['rao1999', 'friston2010', 'whittington2017', 'lecun2022'],
  },
  {
    id: 'attractors', layer: 3,
    title: b('吸引子网络 ↔ Hopfield 网络与 RNN 吸引子', 'Attractor networks ↔ Hopfield networks and RNN attractors'),
    brain: b(
      '海马 CA3 等区域有大量循环兴奋连接，被认为能实现模式补全：给出部分线索，网络活动会滑向最近的存储模式（吸引子）。持续放电的吸引子也被用来解释前额叶的工作记忆。',
      'Regions like hippocampal CA3 have dense recurrent excitation thought to perform pattern completion: from a partial cue, activity settles into the nearest stored pattern (an attractor). Persistent-activity attractors are also a leading account of prefrontal working memory.'),
    brainMath: [{ tex: t`E = -\tfrac{1}{2}\sum_{i,j} w_{ij}\,s_i s_j,\qquad w_{ij} = \frac{1}{N}\sum_\mu \xi_i^{\mu}\xi_j^{\mu}`, caption: b('Hopfield（1982）：Hebb 存储的模式是能量最小点', 'Hopfield (1982): Hebbian-stored patterns are energy minima') }],
    ai: b('Ramsauer 等（2020）证明连续的现代 Hopfield 网络的一步更新与 Transformer 注意力在形式上相同，且存储容量随维度指数增长。这是神经科学模型与 AI 核心机制之间最直接的数学联系之一。', 'Ramsauer et al. (2020) showed one update step of a continuous modern Hopfield network is formally identical to Transformer attention, with exponential storage capacity, one of the most direct mathematical links between a neuroscience model and a core AI mechanism.'),
    aiMath: [{ tex: t`\xi^{\text{new}} = X\,\mathrm{softmax}\big(\beta\,X^{\top}\xi\big)\quad\Longleftrightarrow\quad \mathrm{Attention}(Q,K,V) = \mathrm{softmax}\Big(\tfrac{QK^{\top}}{\sqrt{d}}\Big)V`, caption: b('现代 Hopfield 更新 ≡ 注意力', 'Modern Hopfield update ≡ attention') }],
    kinds: ['math'], evidence: 'debated',
    refs: ['hopfield1982', 'ramsauer2020', 'vaswani2017'],
  },
  {
    id: 'expansion', layer: 3,
    title: b('扩展编码 ↔ Transformer 前馈层 / 随机特征', 'Expansion coding ↔ Transformer FFN / random features'),
    brain: b(
      '小脑的数百亿颗粒细胞（约占全脑神经元的一半以上）从少量苔藓纤维接收输入，每个颗粒细胞只有约 4 个输入，形成高维、稀疏的「扩展表示」；浦肯野细胞再对其做可学习的线性读出。理论分析表明这种低入度的稀疏连接能最优化可分性（Litwin-Kumar 2017）。',
      'The cerebellum’s tens of billions of granule cells (over half of all neurons) receive input from relatively few mossy fibers, each granule cell with only ~4 inputs, forming a high-dimensional sparse expansion; Purkinje cells learn a linear read-out. Theory shows such low in-degree sparse wiring optimizes separability (Litwin-Kumar 2017).'),
    brainMath: [{ tex: t`h = \phi\big(Jx - \theta\big),\ \ \dim h \gg \dim x,\qquad y = w^{\top}h`, caption: b('扩展编码：随机稀疏投射到高维 + 阈值 + 线性读出', 'Expansion: random sparse projection + threshold + linear read-out') }],
    ai: b('Transformer 每层的前馈网络先把维度扩大约 4 倍再压回，常被解释为键值记忆；随机特征方法和极限学习机也采用「随机扩展 + 线性读出」。', 'Each Transformer FFN expands the width ~4× and projects back, often interpreted as key–value memory; random-feature methods and extreme learning machines use random expansion + linear read-out.'),
    aiMath: [{ tex: t`\mathrm{FFN}(x) = W_2\,\phi(W_1 x),\quad W_1 \in \mathbb{R}^{4d\times d}`, caption: b('Transformer 前馈层', 'Transformer feed-forward layer') }],
    kinds: ['math', 'representation'], evidence: 'established',
    refs: ['litwinkumar2017', 'vaswani2017', 'wolpert1998'],
  },
]
