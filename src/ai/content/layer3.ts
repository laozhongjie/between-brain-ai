import type { Bi } from '../../data/types'
import type { Card } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** Layer 3 — microcircuits. */
export const LAYER3: Card[] = [
  {
    id: 'normalization', layer: 3,
    title: b('除法归一化与侧抑制 ↔ Softmax / LayerNorm', 'Divisive normalisation & lateral inhibition ↔ softmax / LayerNorm'),
    summary: b('“典型的神经计算”：每个神经元的响应被周围群体的总活动除一下。', 'A “canonical neural computation”: each response is divided by the pooled activity of its neighbours.'),
    brain: b(
      '从视网膜到皮层，神经元的响应普遍受到除法归一化：它的驱动输入被一个邻近群体的加权总活动相除。这实现了对比度不变性、增益控制、赢者通吃式竞争，也被用来解释注意对响应的调节（Carandini & Heeger 2012）。',
      'From retina to cortex, responses are divisively normalised: a neuron’s drive is divided by the weighted activity of a neighbouring pool. This yields contrast invariance, gain control and winner-take-all competition, and also explains attentional modulation (Carandini & Heeger 2012).'),
    brainMath: [{ tex: t`r_i = \gamma\,\frac{x_i^{\,n}}{\sigma^{n} + \sum_j w_{ij}\,x_j^{\,n}}`, caption: b('除法归一化', 'Divisive normalisation') }],
    ai: b('Softmax 是一种指数形式的除法归一化（竞争），LayerNorm/BatchNorm 做减均值除方差的增益控制，注意力权重由 softmax 竞争产生。', 'Softmax is exponential divisive normalisation (competition); LayerNorm/BatchNorm perform gain control; attention weights come from softmax competition.'),
    aiMath: [{ tex: t`\mathrm{softmax}(z)_i = \frac{e^{z_i}}{\sum_j e^{z_j}}`, caption: b('Softmax：σ→0、n→指数的归一化特例', 'Softmax: a normalisation special case with exponential nonlinearity') }],
    corr: 'similar', evidence: 'established',
    diffs: [
      b('生物归一化池是局部、可学习、随情境变化的；AI 多是固定的全局操作。', 'Biological pools are local, learnable and context-dependent; AI’s are mostly fixed global ops.'),
      b('生物中归一化由专门的抑制性神经元实现，并有时间动态。', 'Biology implements it with dedicated inhibitory neurons and temporal dynamics.'),
    ],
    principle: b('原理：竞争与增益控制应该是每一层的内建操作。这一点 AI 已经在做，而且做得有效。', 'Principle: competition and gain control as a built-in operation at every stage — something AI already does effectively.'),
    ideas: [b('试验可学习的局部归一化池（按空间或特征邻域），替代全局 LayerNorm。', 'Try learnable local normalisation pools (spatial or feature neighbourhoods) instead of global LayerNorm.')],
    refs: ['carandini2012', 'vaswani2017'],
  },
  {
    id: 'feedback-predictive', layer: 3,
    title: b('反馈连接与预测编码 ↔ 以前馈为主的网络 / JEPA', 'Feedback & predictive coding ↔ mostly-feedforward nets / JEPA'),
    summary: b('皮层中反馈连接比前馈更多：高层不断预测低层，只把“预测误差”往上传。', 'Cortex has more feedback than feedforward connections: higher areas predict lower ones and only prediction errors travel up.'),
    brain: b(
      '在视觉等感觉皮层中，高层向低层发送预测，低层计算“实际输入 − 预测”的误差并上传；表征通过迭代减小误差而收敛（Rao & Ballard 1999）。这把感知变成推断：看见的是大脑对原因的最佳猜测。自由能原理把这一思路推广到行动（Friston 2010）。',
      'In sensory cortex, higher areas send predictions down; lower areas compute input − prediction and send the error up; representations converge by iteratively reducing error (Rao & Ballard 1999). Perception becomes inference — you see the brain’s best guess of the causes. The free-energy principle extends this to action (Friston 2010).'),
    brainMath: [
      { tex: t`\varepsilon_l = r_l - g\big(W_l\,r_{l+1}\big)`, caption: b('第 l 层的预测误差', 'Prediction error at level l') },
      { tex: t`\tau\,\dot r_{l+1} = W_l^{\top}\big(\varepsilon_l \odot g'\big) - \varepsilon_{l+1}`, caption: b('表征更新：同时解释下层误差、符合上层预测', 'Representation update: explain the error below while matching the prediction above') },
    ],
    ai: b('多数深度网络推理是一次前向传播。预测编码网络用局部误差实现迭代推断，并可近似反向传播（Whittington & Bogacz 2017）。JEPA（LeCun 2022）在潜在空间而非像素空间做预测，是世界模型的一条主要路线。扩散模型和迭代细化也带有“多步推断”的味道。', 'Most deep nets infer in one forward pass. Predictive-coding networks infer iteratively with local errors and can approximate backprop (Whittington & Bogacz 2017). JEPA (LeCun 2022) predicts in latent rather than pixel space — a major world-model route. Diffusion and iterative refinement also have a multi-step-inference flavour.'),
    aiMath: [{ tex: t`\mathcal{L}_{\text{JEPA}} = \big\| s_\theta(y) - \mathrm{Pred}_\phi\big(s_\theta(x), z\big)\big\|^2`, caption: b('JEPA：在表征空间预测目标的嵌入', 'JEPA: predict the target’s embedding in representation space') }],
    corr: 'crude', evidence: 'debated',
    diffs: [
      b('大脑的推理是循环、迭代、持续进行的；主流网络是一次性前馈。', 'Brain inference is recurrent, iterative and continuous; mainstream nets are one-shot feedforward.'),
      b('大脑只上传“意外”，节省带宽；AI 每层都完整传递表征。', 'The brain sends only surprise upward, saving bandwidth; AI passes full representations every layer.'),
      b('预测编码在皮层中的具体实现仍有争议。', 'How cortex implements predictive coding is still debated.'),
    ],
    principle: b('原理：感知 = 在生成模型下的推断；只传递误差；推理时间可以随难度变化。', 'Principle: perception as inference under a generative model; transmit only errors; let inference time scale with difficulty.'),
    ideas: [
      b('为世界模型加入“预测误差门控”：只有误差大的区域才进行昂贵的更新计算。', 'Add prediction-error gating to world models: expensive updates only where error is large.'),
      b('允许推理迭代步数自适应（难的输入多迭代几轮）。', 'Let the number of inference iterations adapt to input difficulty.'),
    ],
    refs: ['rao1999', 'friston2010', 'whittington2017', 'lecun2022'],
  },
  {
    id: 'attractors', layer: 3,
    title: b('吸引子网络与联想记忆 ↔ Hopfield 网络 / 注意力', 'Attractor networks & associative memory ↔ Hopfield nets / attention'),
    summary: b('循环网络可以把记忆存成能量地形中的“谷底”；现代 Hopfield 网络的更新规则就是注意力。', 'Recurrent networks store memories as valleys in an energy landscape; the modern Hopfield update is attention.'),
    brain: b(
      '海马 CA3 等区域有大量循环兴奋连接，被认为能实现模式补全：给出部分线索，网络活动会滑向最近的存储模式（吸引子）。持续放电的吸引子也被用来解释前额叶的工作记忆。',
      'Regions like hippocampal CA3 have dense recurrent excitation thought to perform pattern completion: from a partial cue, activity settles into the nearest stored pattern (an attractor). Persistent-activity attractors are also a leading account of prefrontal working memory.'),
    brainMath: [{ tex: t`E = -\tfrac{1}{2}\sum_{i,j} w_{ij}\,s_i s_j,\qquad w_{ij} = \frac{1}{N}\sum_\mu \xi_i^{\mu}\xi_j^{\mu}`, caption: b('Hopfield（1982）：Hebb 存储的模式是能量最小点', 'Hopfield (1982): Hebbian-stored patterns are energy minima') }],
    ai: b('Ramsauer 等（2020）证明连续的现代 Hopfield 网络的一步更新与 Transformer 注意力在形式上相同，且存储容量随维度指数增长。这是神经科学模型与 AI 核心机制之间最直接的数学联系之一。', 'Ramsauer et al. (2020) showed one update step of a continuous modern Hopfield network is formally identical to Transformer attention, with exponential storage capacity — one of the most direct mathematical links between a neuroscience model and a core AI mechanism.'),
    aiMath: [{ tex: t`\xi^{\text{new}} = X\,\mathrm{softmax}\big(\beta\,X^{\top}\xi\big)\quad\Longleftrightarrow\quad \mathrm{Attention}(Q,K,V) = \mathrm{softmax}\Big(\tfrac{QK^{\top}}{\sqrt{d}}\Big)V`, caption: b('现代 Hopfield 更新 ≡ 注意力', 'Modern Hopfield update ≡ attention') }],
    corr: 'similar', evidence: 'debated',
    diffs: [
      b('生物吸引子是在循环动力学中随时间收敛的；注意力是一步完成的读取。', 'Biological attractors settle over time in recurrent dynamics; attention is a one-step read-out.'),
      b('Transformer 的“记忆”（KV 缓存）只在当前上下文中存在，不会写回长期权重。', 'A Transformer’s KV memory exists only within the current context and is not written back to long-term weights.'),
    ],
    principle: b('原理：内容寻址、模式补全的联想记忆。AI 已经通过注意力间接用上了它。', 'Principle: content-addressable memory with pattern completion — AI already uses it implicitly through attention.'),
    ideas: [b('让注意力的 KV 记忆可以按重要性写入长期存储（跨会话的联想记忆）。', 'Let attention’s KV memory be written into long-term storage by importance (cross-session associative memory).')],
    refs: ['hopfield1982', 'ramsauer2020', 'vaswani2017'],
  },
  {
    id: 'expansion', layer: 3,
    title: b('扩展编码 ↔ Transformer 前馈层 / 随机特征', 'Expansion coding ↔ Transformer FFN / random features'),
    summary: b('小脑和昆虫嗅觉系统把输入投射到极高维、稀疏的表示中，再做线性读出。', 'Cerebellum and insect olfaction project inputs into a very high-dimensional sparse code, then read out linearly.'),
    brain: b(
      '小脑的数百亿颗粒细胞（约占全脑神经元的一半以上）从少量苔藓纤维接收输入，每个颗粒细胞只有约 4 个输入，形成高维、稀疏的“扩展表示”；浦肯野细胞再对其做可学习的线性读出。理论分析表明这种低入度的稀疏连接能最优化可分性（Litwin-Kumar 2017）。',
      'The cerebellum’s tens of billions of granule cells (over half of all neurons) receive input from relatively few mossy fibres, each granule cell with only ~4 inputs, forming a high-dimensional sparse expansion; Purkinje cells learn a linear read-out. Theory shows such low in-degree sparse wiring optimises separability (Litwin-Kumar 2017).'),
    brainMath: [{ tex: t`h = \phi\big(Jx - \theta\big),\ \ \dim h \gg \dim x,\qquad y = w^{\top}h`, caption: b('扩展编码：随机稀疏投射到高维 + 阈值 + 线性读出', 'Expansion: random sparse projection + threshold + linear read-out') }],
    ai: b('Transformer 每层的前馈网络先把维度扩大约 4 倍再压回，常被解释为键值记忆；随机特征方法和极限学习机也采用“随机扩展 + 线性读出”。', 'Each Transformer FFN expands the width ~4× and projects back, often interpreted as key–value memory; random-feature methods and extreme learning machines use random expansion + linear read-out.'),
    aiMath: [{ tex: t`\mathrm{FFN}(x) = W_2\,\phi(W_1 x),\quad W_1 \in \mathbb{R}^{4d\times d}`, caption: b('Transformer 前馈层', 'Transformer feed-forward layer') }],
    corr: 'similar', evidence: 'established',
    diffs: [
      b('生物扩展极度稀疏（每个颗粒细胞约 4 个输入），连接大体随机固定；FFN 是稠密且全部可训练的。', 'Biological expansion is extremely sparse (~4 inputs per granule cell) and largely fixed; FFNs are dense and fully trained.'),
      b('小脑扩展服务于快速误差校正（配合攀缘纤维的教学信号）。', 'Cerebellar expansion serves fast error correction (with climbing-fibre teaching signals).'),
    ],
    principle: b('原理：高维稀疏扩展让线性读出变得强大且学习快速。随机、稀疏且固定的扩展层可以大幅减少需要学习的参数。', 'Principle: high-dimensional sparse expansion makes linear read-outs powerful and learning fast; random, sparse, fixed expansion can drastically cut trainable parameters.'),
    ideas: [b('为机器人的快速适应模块使用“固定稀疏扩展 + 在线线性读出”，只在线学习读出层。', 'For fast robot adaptation, use a fixed sparse expansion + online linear read-out, learning only the read-out.')],
    refs: ['litwinkumar2017', 'vaswani2017', 'wolpert1998'],
  },
]
