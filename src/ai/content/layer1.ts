import type { Bi } from '../../data/types'
import type { Card } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** Layer 1: molecules & synapses. */
export const LAYER1: Card[] = [
  {
    id: 'synapse-weight', layer: 1,
    title: b('突触强度 ↔ 权重', 'Synaptic efficacy ↔ weights'),
    summary: b('最直接的类比，但真实突触是有符号约束、随机、动态、极度稀疏的。', 'The most direct analogy, but real synapses are sign-constrained, stochastic, dynamic and extremely sparse.'),
    brain: b(
      '化学突触把突触前的动作电位转换成突触后的电流。它的“强度”由受体数量、释放概率等决定。一个神经元的所有输出突触要么都是兴奋性的，要么都是抑制性的（Dale 原则）。递质释放是随机的：一个动作电位只以一定概率触发释放。人脑约有 10¹⁴ 个突触，但连接非常稀疏，局部皮层中一对神经元直接相连的概率只有约 10% 量级。',
      'A chemical synapse converts a presynaptic spike into a postsynaptic current; its strength depends on receptor count, release probability, etc. A neuron’s outgoing synapses are all excitatory or all inhibitory (Dale’s principle). Release is stochastic: a spike triggers release only with some probability. The human brain has ~10¹⁴ synapses, yet connectivity is sparse: nearby cortical pairs connect with probability on the order of 10%.'),
    brainMath: [
      { tex: t`I_{\text{syn}}(t) = g_{\text{syn}}(t)\,\big(V(t) - E_{\text{syn}}\big),\quad g_{\text{syn}}(t) = \bar g \sum_k e^{-(t-t_k)/\tau_s}\,\Theta(t-t_k)`, caption: b('突触电流：电导随每个突触前脉冲跳升后衰减；$E_{\\text{syn}}$ 决定兴奋还是抑制', 'Synaptic current: conductance jumps at each presynaptic spike and decays; $E_{\\text{syn}}$ sets excitatory vs inhibitory') },
      { tex: t`\text{EPSC} \sim q \cdot \mathrm{Binomial}(n, p)`, caption: b('量子释放模型：n 个释放位点、释放概率 p、单个囊泡的效应 q', 'Quantal release: n release sites, release probability p, quantal size q') },
    ],
    ai: b(
      '人工网络中的权重是可正可负的实数，稠密相乘后求和，一次前向传播中是确定的。最大的稀疏 MoE 模型参数量达到 10¹² 量级（Switch Transformer 为 1.6 万亿），但每个参数只是一个标量。',
      'Artificial weights are signed real numbers, multiplied densely and summed, and deterministic in a forward pass. The largest sparse MoE models reach ~10¹² parameters (Switch Transformer: 1.6 T), but each parameter is a single scalar.'),
    aiMath: [{ tex: t`y_i = \phi\Big(\sum_j w_{ij}\,x_j + b_i\Big),\quad w_{ij}\in\mathbb{R}`, caption: b('人工神经元：权重符号不受约束，且与时间无关', 'Artificial unit: unconstrained sign, no time dependence') }],
    corr: 'similar', evidence: 'established',
    diffs: [
      b('符号约束：生物突触的正负由神经元类型固定；AI 权重可以在训练中随意改变符号。', 'Sign: fixed by cell type in biology; AI weights flip sign freely during training.'),
      b('随机性：生物传递是概率性的，同一输入每次结果不同；AI 前向传播是确定的（dropout 只在训练时用）。', 'Stochasticity: biological transmission is probabilistic; AI forward passes are deterministic (dropout only in training).'),
      b('动态：突触强度在毫秒到秒的尺度上随使用而变（见“短时可塑性”）；AI 权重在推理时是常数。', 'Dynamics: efficacy changes on ms–s timescales with use (see short-term plasticity); AI weights are constant at inference.'),
      b('稀疏与局部：生物连接稀疏且受空间布线成本约束；AI 层间通常是全连接。', 'Sparsity/locality: biological wiring is sparse and cost-constrained; AI layers are usually fully connected.'),
    ],
    principle: b(
      '“突触强度决定学习到的知识”是可借鉴的原理。Dale 约束和连接稀疏很大程度上是生物约束（化学、布线成本），但稀疏连接也被证明在表示容量与学习之间存在最优点（Litwin-Kumar 2017）。释放的随机性可能兼具约束和功能（正则化、采样）。',
      'That knowledge lives in synaptic strengths is a principle worth borrowing. Dale’s law and sparse wiring are largely biological constraints (chemistry, wiring cost), though sparse connectivity also has an optimum for representation and learning (Litwin-Kumar 2017). Stochastic release may be both constraint and feature (regularisation, sampling).'),
    ideas: [
      b('在推理时保留随机突触（类似 MC dropout）来表达不确定性，而不只是训练时正则化。', 'Keep stochastic synapses at inference (à la MC dropout) to express uncertainty, not only as training regularisation.'),
      b('按空间/模块约束连接，研究稀疏度与泛化、能耗的权衡。', 'Constrain connectivity spatially or by module and study the sparsity–generalisation–energy trade-off.'),
    ],
    refs: ['faisal2008', 'litwinkumar2017', 'srivastava2014', 'fedus2022'],
  },
  {
    id: 'short-term-plasticity', layer: 1,
    title: b('短时可塑性 ↔ 快权重 / 线性注意力', 'Short-term plasticity ↔ fast weights / linear attention'),
    summary: b('突触在几百毫秒内随使用而变强或变弱；AI 里最接近的是快权重，而线性注意力正是一种快权重。', 'Synapses strengthen or weaken over hundreds of ms with use; the AI analogue is fast weights, and linear attention is one.'),
    brain: b(
      '连续放电时，有的突触因为囊泡耗尽而越来越弱（短时抑制），有的因为残余钙而越来越强（短时易化），在几百毫秒到几秒内恢复。于是突触变成了一个随时间变化的滤波器：抑制型突触对“变化”敏感，易化型突触对“连发”敏感。这也是一种不需要改变长期权重的短时记忆。',
      'During repeated firing some synapses weaken as vesicles deplete (short-term depression) and others strengthen via residual calcium (facilitation), recovering over hundreds of ms to seconds. The synapse becomes a time-varying filter: depressing synapses detect change, facilitating ones detect bursts, a short-term memory that leaves long-term weights untouched.'),
    brainMath: [
      { tex: t`\frac{dx}{dt} = \frac{1-x}{\tau_{\text{rec}}} - u\,x\,\delta(t-t_{\text{sp}}),\qquad \frac{du}{dt} = \frac{U-u}{\tau_f} + U(1-u)\,\delta(t-t_{\text{sp}})`, caption: b('Tsodyks–Markram 模型：x 是可用资源，u 是利用率', 'Tsodyks–Markram model: x = available resources, u = utilisation') },
      { tex: t`\text{PSC}_n = A\,u_n\,x_n`, caption: b('第 n 个脉冲引起的突触后电流', 'Postsynaptic current of the n-th spike') },
    ],
    ai: b(
      '快权重（Ba et al. 2016）在慢权重之外维护一个随输入快速更新、快速衰减的矩阵。Schlag 等（2021）证明线性注意力本质上就是“快权重编程器”：每个 token 往快权重矩阵里写入 $v k^{\\top}$，查询时用 $q$ 读取。',
      'Fast weights (Ba et al. 2016) keep a rapidly updated, decaying matrix alongside slow weights. Schlag et al. (2021) showed linear attention is exactly a fast-weight programmer: each token writes $v k^{\\top}$ into a matrix that queries read with $q$.'),
    aiMath: [
      { tex: t`A(t) = \lambda A(t-1) + \eta\,h(t)h(t)^{\top}`, caption: b('快权重（Ba et al. 2016）', 'Fast weights (Ba et al. 2016)') },
      { tex: t`W_t = W_{t-1} + v_t\,\phi(k_t)^{\top},\qquad y_t = W_t\,\phi(q_t)`, caption: b('线性注意力 = 快权重编程器（Schlag et al. 2021）', 'Linear attention = fast-weight programmer (Schlag et al. 2021)') },
    ],
    corr: 'similar', evidence: 'established',
    diffs: [
      b('生物短时可塑性是固定规则的滤波（抑制或易化），每个突触都在做；AI 快权重是按内容写入的联想存储。', 'Biological STP is a fixed-rule filter (depress/facilitate) at every synapse; AI fast weights are content-addressed associative storage.'),
      b('生物有多种时间常数并存；多数注意力机制没有衰减，或只有单一衰减率。', 'Biology mixes many time constants; most attention has no decay or a single one.'),
      b('生物短时变化与长期可塑性相互作用（例如资格迹）；AI 两者通常分离。', 'Biological short-term changes interact with long-term plasticity (e.g. eligibility); in AI they are separate.'),
    ],
    principle: b('原理：记忆应该分布在多个时间尺度上，而且“存储”可以就发生在连接本身，而不必另设缓冲区。', 'Principle: memory should span multiple timescales, and storage can live in the connections themselves rather than a separate buffer.'),
    ideas: [
      b('给线性注意力或状态空间模型的每个头设置不同的衰减常数，模拟抑制型和易化型突触的多样性。', 'Give each linear-attention / SSM head its own decay, mimicking diverse depressing and facilitating synapses.'),
      b('把“变化检测”（抑制型）通道作为机器人感知的前端，减少对恒定输入的重复计算。', 'Use change-detecting (depressing) channels as a robot-perception front end to skip redundant computation on constant input.'),
    ],
    refs: ['tsodyks1997', 'ba2016', 'schlag2021', 'miconi2018'],
    lab: 'stp',
  },
  {
    id: 'stdp', layer: 1,
    title: b('Hebb 学习与 STDP ↔ 局部无监督学习', 'Hebbian learning & STDP ↔ local unsupervised learning'),
    summary: b('“一起放电的神经元连在一起”，而且先后顺序决定是增强还是削弱。', '“Fire together, wire together”, and the order of firing decides strengthen vs weaken.'),
    brain: b(
      'Hebb（1949）提出：如果 A 反复参与使 B 放电，A→B 的连接会增强。实验发现了更精确的规则，即脉冲时序依赖可塑性（STDP）：突触前先于突触后放电（有因果关系）则增强，反之则削弱，时间窗约几十毫秒。这个规则只用到突触两端的局部信息。',
      'Hebb (1949): if A repeatedly helps fire B, A→B strengthens. Experiments revealed a sharper rule, spike-timing-dependent plasticity (STDP): pre-before-post (causal) potentiates, post-before-pre depresses, within tens of ms. It uses only information local to the synapse.'),
    brainMath: [
      { tex: t`\Delta w = \begin{cases} A_+\,e^{-\Delta t/\tau_+}, & \Delta t > 0 \\ -A_-\,e^{\Delta t/\tau_-}, & \Delta t < 0 \end{cases},\qquad \Delta t = t_{\text{post}} - t_{\text{pre}}`, caption: b('STDP 时间窗（Bi & Poo 1998）', 'STDP window (Bi & Poo 1998)') },
      { tex: t`\Delta w = \eta\,y\,x \quad\longrightarrow\quad \Delta w = \eta\,y\,(x - y\,w)`, caption: b('Hebb 规则与 Oja 规则（加入归一化后收敛到第一主成分）', 'Hebb rule and Oja’s rule (normalised; converges to the first principal component)') },
    ],
    ai: b(
      '主流深度学习几乎不用 Hebb 规则，而是依赖反向传播。Hebb 类规则出现在自组织映射、Hopfield 网络、部分脉冲神经网络的无监督学习中。“可微可塑性”（Miconi 2018）把 Hebb 项做成可训练的，让网络学会在推理时自我修改。',
      'Mainstream deep learning rarely uses Hebbian rules, relying on backprop. They appear in self-organising maps, Hopfield nets and unsupervised SNN learning. Differentiable plasticity (Miconi 2018) makes Hebbian terms trainable so networks learn to modify themselves at inference.'),
    aiMath: [{ tex: t`y_j = \sigma\Big(\sum_i \big(w_{ij} + \alpha_{ij}\,\mathrm{Hebb}_{ij}(t)\big)x_i\Big),\quad \mathrm{Hebb}_{ij}(t{+}1) = \eta\,x_i y_j + (1-\eta)\,\mathrm{Hebb}_{ij}(t)`, caption: b('可微可塑性：$w$ 和 $\\alpha$ 由反向传播学习，Hebb 项在推理时在线更新', 'Differentiable plasticity: $w$ and $\\alpha$ learned by backprop; the Hebbian trace updates online') }],
    corr: 'crude', evidence: 'debated',
    diffs: [
      b('STDP 只用局部、时序信息；反向传播需要全局误差。', 'STDP uses local timing only; backprop needs a global error.'),
      b('纯 Hebb 学习不稳定（强者愈强），生物依靠稳态可塑性和抑制来维持平衡。', 'Pure Hebbian learning is unstable (rich get richer); biology relies on homeostatic plasticity and inhibition to stay balanced.'),
      b('STDP 在离体实验中很明确，但它在活体学习中究竟起多大作用仍有争议。', 'STDP is clear in vitro, but its role in learning in vivo is still debated.'),
    ],
    principle: b('原理：对因果时序敏感、只用局部信息的学习规则，可以在不需要全局误差的情况下提取统计结构，适合在线、终身、低能耗学习。精确的时间窗形状可能是生物实现细节。', 'Principle: a local, causality-sensitive rule extracts statistical structure without a global error, suited to online, lifelong, low-power learning. The exact window shape may be an implementation detail.'),
    ideas: [
      b('在已训练的模型上叠加可训练的 Hebb 快速通道，实现部署后的在线适应（测试时学习）。', 'Add a trainable Hebbian fast pathway on top of a trained model for on-device, test-time adaptation.'),
      b('用 STDP 在事件相机等时序传感器上做无监督特征学习，再接入监督头。', 'Use STDP for unsupervised features on event cameras and other temporal sensors, then attach a supervised head.'),
    ],
    refs: ['hebb1949', 'bi1998', 'markram1997', 'song2000', 'miconi2018'],
    lab: 'stdp',
  },
  {
    id: 'three-factor', layer: 1,
    title: b('三因子学习与信用分配 ↔ 反向传播', 'Three-factor learning & credit assignment ↔ backpropagation'),
    summary: b('大脑如何知道哪个突触该为结果负责？这是神经科学最大的未解问题之一。', 'How does the brain know which synapse deserves credit? One of neuroscience’s biggest open questions.'),
    brain: b(
      '一个流行的理论是“三因子规则”：突触前活动 × 突触后活动先留下一个会慢慢衰减的“资格迹”，几秒后到来的第三个信号（多巴胺等神经调质，表示奖赏或意外）决定这个迹是否被写成真正的权重变化。这样就把行为时间尺度（秒）的结果分配给毫秒级的突触事件。此外，还有假说认为树突顶端的“爆发式放电”携带了类似误差的信号。',
      'A leading theory is the three-factor rule: pre × post activity leaves a decaying eligibility trace, and a third signal arriving seconds later (dopamine or another neuromodulator signalling reward or surprise) decides whether it becomes a weight change, bridging behavioural (s) and synaptic (ms) timescales. Other proposals have apical-dendrite bursts carrying error-like signals.'),
    brainMath: [
      { tex: t`\frac{de_{ij}}{dt} = -\frac{e_{ij}}{\tau_e} + f(\text{pre}_j)\,g(\text{post}_i),\qquad \frac{dw_{ij}}{dt} = \eta\,M(t)\,e_{ij}(t)`, caption: b('三因子规则：资格迹 e × 神经调质 M', 'Three-factor rule: eligibility trace e × neuromodulator M') },
    ],
    ai: b(
      '反向传播精确地计算每个权重对损失的梯度，但需要对称的反馈权重（“权重传输问题”）、分开的前向和反向阶段，以及存储所有中间激活。生物上更可行的替代方案包括：反馈对齐（用随机矩阵代替 $W^{\\top}$ 也能学）、预测编码网络（局部误差近似反向传播）、爆发依赖可塑性、e-prop（循环网络的在线资格迹学习）。',
      'Backprop computes exact gradients but needs symmetric feedback weights (the weight-transport problem), separate forward/backward phases and stored activations. More plausible alternatives: feedback alignment (random $B$ instead of $W^{\\top}$ still learns), predictive-coding networks (local errors approximate backprop), burst-dependent plasticity, and e-prop (online eligibility-trace learning for RNNs).'),
    aiMath: [
      { tex: t`\delta_l = \big(W_{l+1}^{\top}\delta_{l+1}\big)\odot f'(a_l),\qquad \Delta W_l = -\eta\,\delta_l\,h_{l-1}^{\top}`, caption: b('反向传播', 'Backpropagation') },
      { tex: t`\delta_l = \big(B_{l+1}\,\delta_{l+1}\big)\odot f'(a_l),\quad B \text{ fixed random}`, caption: b('反馈对齐：不需要对称权重', 'Feedback alignment: no weight symmetry needed') },
    ],
    corr: 'crude', evidence: 'debated',
    diffs: [
      b('反向传播需要全局、精确、对称的误差传递；大脑只有局部信号加上广播式的调质信号。', 'Backprop needs global, exact, symmetric error transport; the brain has local signals plus broadcast modulators.'),
      b('反向传播在离线批量数据上训练；大脑边行动边学习，结果常常延迟数秒才到。', 'Backprop trains offline on batches; the brain learns while acting, with outcomes seconds later.'),
      b('神经科学尚不清楚大脑实际使用哪种机制，可能是多种机制的组合。', 'Neuroscience does not yet know which mechanism the brain uses, possibly several.'),
    ],
    principle: b('原理：“局部可塑性 + 少量全局广播信号 + 资格迹”能在线、低成本地分配信用，非常适合需要在部署中持续学习的机器人。精确的反向传播未必是必需的。', 'Principle: local plasticity + a few broadcast signals + eligibility traces assign credit online and cheaply, ideal for robots that must keep learning after deployment. Exact backprop may not be necessary.'),
    ideas: [
      b('混合学习：离线用反向传播预训练，部署后用三因子规则（奖赏/意外调制）在线微调少量可塑参数。', 'Hybrid: pretrain offline with backprop, then fine-tune a small plastic subset online with three-factor rules modulated by reward or surprise.'),
      b('在神经形态芯片上用 e-prop 或反馈对齐实现片上学习，避免存储全部激活。', 'Use e-prop or feedback alignment for on-chip learning on neuromorphic hardware, avoiding stored activations.'),
    ],
    refs: ['rumelhart1986', 'lillicrap2016', 'lillicrap2020', 'whittington2017', 'payeur2021', 'bellec2020', 'fremaux2016', 'gerstner2018'],
    lab: 'three-factor',
  },
  {
    id: 'consolidation', layer: 1,
    title: b('突触巩固 ↔ 持续学习（EWC 等）', 'Synaptic consolidation ↔ continual learning (EWC, …)'),
    summary: b('大脑学新东西时很少覆盖旧记忆；AI 网络却会“灾难性遗忘”。', 'The brain rarely overwrites old memories when learning; AI networks forget catastrophically.'),
    brain: b(
      '一个突触不只有一个“强度”，还有多个在不同时间尺度上变化的内部状态（分子级联、突触标记与捕获）。新的变化先存在快变量里，只有被重复或被标记为重要的才逐渐转移到慢变量中。理论工作表明，这种多变量级联可以让记忆容量随突触数量近乎线性增长，同时保持长时间保存（Benna & Fusi 2016）。',
      'A synapse has not one strength but several internal states on different timescales (molecular cascades, synaptic tagging and capture). Changes land in fast variables and only repeated or tagged ones migrate to slow ones. Theory shows such cascades let memory capacity scale nearly linearly with synapse count while retaining memories for long (Benna & Fusi 2016).'),
    brainMath: [
      { tex: t`C_k\,\frac{du_k}{dt} = g_{k-1,k}\,(u_{k-1}-u_k) + g_{k,k+1}\,(u_{k+1}-u_k)`, caption: b('Benna–Fusi 模型：突触是一串逐级变慢的“水桶”，$u_1$ 是可见的权重', 'Benna–Fusi model: a chain of progressively slower “beakers”; $u_1$ is the visible weight') },
    ],
    ai: b(
      '标准网络按顺序学习多个任务时会覆盖旧知识（灾难性遗忘）。弹性权重巩固（EWC）用 Fisher 信息估计每个参数对旧任务的重要性，限制重要参数的改动；Synaptic Intelligence 则在训练中在线累积每个参数的重要性。',
      'Standard networks overwrite old knowledge when learning tasks in sequence (catastrophic forgetting). Elastic Weight Consolidation (EWC) uses Fisher information to estimate each parameter’s importance and anchors important ones; Synaptic Intelligence accumulates importance online during training.'),
    aiMath: [{ tex: t`\mathcal{L}(\theta) = \mathcal{L}_B(\theta) + \sum_i \frac{\lambda}{2}\,F_i\,\big(\theta_i - \theta^{*}_{A,i}\big)^2`, caption: b('EWC：学任务 B 时，用 Fisher 信息 F 保护对任务 A 重要的参数', 'EWC: while learning B, Fisher information F protects parameters important for A') }],
    corr: 'crude', evidence: 'debated',
    diffs: [
      b('生物突触的保护是连续、多尺度、自发的；EWC 需要明确的任务边界和额外的重要性估计。', 'Biological protection is continuous, multi-scale and automatic; EWC needs explicit task boundaries and importance estimates.'),
      b('大脑还有系统层面的巩固（海马回放到新皮层，见记忆与睡眠卡片）；AI 通常只有其中一种机制。', 'The brain also consolidates at the systems level (hippocampal replay to cortex, see the memory and sleep cards); AI usually has just one mechanism.'),
      b('即使有 EWC 等方法，AI 的持续学习在规模上仍远不如人。', 'Even with EWC and similar, AI continual learning lags far behind humans at scale.'),
    ],
    principle: b('原理：每个参数都应带有“可塑性状态”（多时间尺度、重要性），并由它决定该参数还能改多少。这是值得借鉴的核心思想。', 'Principle: every parameter should carry a plasticity state (multi-timescale, importance) that governs how much it may still change, a core idea worth borrowing.'),
    ideas: [
      b('把参数扩展为“快-慢”多变量（类似 Benna–Fusi），在优化器层面实现，无需任务边界。', 'Give parameters fast/slow hidden variables (Benna–Fusi style) at the optimiser level, with no task boundaries.'),
      b('突触级巩固与生成式回放（系统级巩固）结合使用。', 'Combine synaptic consolidation with generative replay (systems consolidation).'),
    ],
    refs: ['benna2016', 'kirkpatrick2017', 'zenke2017', 'mcclelland1995'],
  },
  {
    id: 'structural-plasticity', layer: 1,
    title: b('结构可塑性 ↔ 剪枝与稀疏训练', 'Structural plasticity ↔ pruning & sparse training'),
    summary: b('大脑一生都在新建和拆除突触；AI 的网络结构通常在设计时就定死了。', 'The brain builds and removes synapses throughout life; AI architectures are usually fixed at design time.'),
    brain: b(
      '树突棘（突触所在处）会随经验不断出现和消失。发育早期突触过量生成，随后按使用情况大量修剪；成年后仍有持续的周转，学习新技能时新棘增加并被选择性保留。关键期内结构可塑性特别强（Hensch 2005）。',
      'Dendritic spines (where synapses sit) appear and disappear with experience. Early development overproduces synapses and then prunes heavily by use; adults keep turning them over, adding and selectively stabilising spines when learning skills. Critical periods show especially strong structural plasticity (Hensch 2005).'),
    brainMath: [{ tex: t`P(\text{spine survives}) \uparrow \ \text{with correlated pre/post activity}`, caption: b('定性规律：相关活动使新突触更可能被保留（Holtmaat & Svoboda 2009）', 'Qualitative rule: correlated activity stabilises new synapses (Holtmaat & Svoboda 2009)') }],
    ai: b(
      '剪枝通常在训练后进行，用于压缩模型。彩票假说（Frankle & Carbin 2019）发现稠密网络中存在可以单独训练到同等精度的稀疏子网络。动态稀疏训练会在训练中剪掉弱连接、再生长新连接。MoE 则在运行时按输入选择激活哪些专家。',
      'Pruning usually happens after training for compression. The lottery-ticket hypothesis (Frankle & Carbin 2019) found sparse subnetworks trainable to full accuracy. Dynamic sparse training prunes and regrows connections during training; MoE selects which experts to activate per input.'),
    aiMath: [{ tex: t`W \leftarrow W \odot M,\quad M_{ij} = \mathbb{1}\big[|w_{ij}| > \theta\big]`, caption: b('按幅值剪枝的掩码', 'Magnitude-pruning mask') }],
    corr: 'crude', evidence: 'established',
    diffs: [
      b('生物结构变化贯穿终身，由活动驱动；AI 结构多在训练前设计好，剪枝只是事后压缩。', 'Biological rewiring is lifelong and activity-driven; AI structure is designed up front and pruning is post-hoc compression.'),
      b('生物有“先过量、后修剪”的发育程序；AI 很少模拟这种过程。', 'Biology follows an overproduce-then-prune developmental programme; AI rarely emulates it.'),
    ],
    principle: b('原理：拓扑结构本身应该是可学习的资源，按需分配容量，新任务长出新连接，保护旧连接。', 'Principle: topology is a learnable resource, allocate capacity on demand, grow new connections for new tasks and protect old ones.'),
    ideas: [
      b('持续学习中按任务动态长出/冻结子网络（结合重要性度量）。', 'In continual learning, grow and freeze sub-networks per task (with importance measures).'),
      b('模拟“关键期”：训练早期允许高结构可塑性，后期逐渐收紧。', 'Emulate critical periods: high structural plasticity early in training, tightening later.'),
    ],
    refs: ['holtmaat2009', 'hensch2005', 'frankle2019', 'fedus2022'],
  },
  {
    id: 'glia', layer: 1,
    title: b('胶质细胞与三方突触 ↔（缺失）', 'Glia & the tripartite synapse ↔ (absent)'),
    summary: b('星形胶质细胞包裹突触、调节传递，在 AI 中几乎没有对应物。', 'Astrocytes wrap synapses and regulate transmission, almost no AI counterpart.'),
    brain: b(
      '胶质细胞数量与神经元相当。星形胶质细胞包裹大量突触，回收递质、调节离子与能量供应，并能通过钙信号以秒到分钟的尺度调节突触传递，形成“突触前-突触后-胶质”三方突触。它们的计算作用仍在研究中。',
      'Glia are about as numerous as neurons. Astrocytes wrap many synapses, recycle transmitter, regulate ions and energy, and can modulate transmission via calcium signalling over seconds to minutes. Together they form the pre–post–glia tripartite synapse. Their computational role is still being worked out.'),
    ai: b('主流 AI 没有对应机制。最接近的是超网络或慢速调制网络：一个较慢的网络生成或调节另一个网络的参数。', 'No mainstream counterpart. The closest are hypernetworks or slow modulatory networks that generate or scale another network’s parameters.'),
    corr: 'absent', evidence: 'debated',
    diffs: [
      b('胶质调节覆盖大量突触、时间尺度慢、与能量代谢直接相连；AI 没有“基础设施层”的计算。', 'Glial modulation spans many synapses, is slow and tied to energy metabolism; AI has no “infrastructure-level” computation.'),
    ],
    principle: b('尚不明确。可能的原理：在快速计算之下存在一个慢速、区域性的调节层，负责资源分配和稳态。', 'Unclear. A possible principle: a slow, regional modulatory layer beneath fast computation that handles resource allocation and homeostasis.'),
    ideas: [b('探索一个慢速的区域调制网络，根据局部活动和“能量”预算调节一组权重的增益和可塑性。', 'Explore a slow regional modulator that scales the gain and plasticity of weight groups based on local activity and an energy budget.')],
    refs: ['araque1999'],
  },
]
