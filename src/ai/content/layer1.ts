import type { Bi } from '../../data/types'
import type { CardMechanism } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** Layer 1: molecules & synapses. */
export const LAYER1: CardMechanism[] = [
  {
    id: 'synapse-weight', layer: 1,
    title: b('突触强度 ↔ 权重', 'Synaptic efficacy ↔ weights'),
    brain: b(
      '化学突触通过递质释放，把突触前脉冲转成突触后电流。受体数量、释放概率和近期活动都会影响传递强度。许多神经元保持相对稳定的递质类型，但实际兴奋或抑制效应还取决于受体与生理状态。连接也并非任意存在，其分布受细胞类型、空间和活动历史影响。',
      'Chemical synapses convert presynaptic spikes into postsynaptic currents through transmitter release. Receptor count, release probability and recent activity affect transmission strength. Many neurons retain relatively stable transmitter identities, but actual excitatory or inhibitory effects also depend on receptors and physiological state. Wiring depends on cell type, space and activity history.'),
    brainMath: [
      { tex: t`I_{\text{syn}}(t) = g_{\text{syn}}(t)\,\big(V(t) - E_{\text{syn}}\big),\quad g_{\text{syn}}(t) = \bar g \sum_k e^{-(t-t_k)/\tau_s}\,\Theta(t-t_k)`, caption: b('突触电流：电导随每个突触前脉冲跳升后衰减；$E_{\\text{syn}}$ 决定兴奋还是抑制', 'Synaptic current: conductance jumps at each presynaptic spike and decays; $E_{\\text{syn}}$ sets excitatory vs inhibitory') },
      { tex: t`\text{EPSC} \sim q \cdot \mathrm{Binomial}(n, p)`, caption: b('量子释放模型：n 个释放位点、释放概率 p、单个囊泡的效应 q', 'Quantal release: n release sites, release probability p, quantal size q') },
    ],
    ai: b(
      '标准网络用可正可负的数值权重对输入加权求和。训练修改这些数值，常规推理通常保持它们固定。稀疏网络、MoE、快权重和随机推理可以改变部分假设，但参数量本身不能说明模型是否具备突触的动态功能。',
      'Standard networks combine inputs using signed numerical weights. Training changes the weights, while ordinary inference usually keeps them fixed. Sparse networks, MoE, fast weights and stochastic inference change some assumptions, but parameter count alone says little about synaptic dynamics.'),
    aiMath: [{ tex: t`y_i = \phi\Big(\sum_j w_{ij}\,x_j + b_i\Big),\quad w_{ij}\in\mathbb{R}`, caption: b('人工神经元：权重符号不受约束，且与时间无关', 'Artificial unit: unconstrained sign, no time dependence') }],
    corr: 'similar', evidence: 'established',
    refs: ['faisal2008', 'litwinkumar2017', 'srivastava2014', 'fedus2022'],
  },
  {
    id: 'short-term-plasticity', layer: 1,
    title: b('短时可塑性 ↔ 快权重 / 线性注意力', 'Short-term plasticity ↔ fast weights / linear attention'),
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
    refs: ['tsodyks1997', 'ba2016', 'schlag2021', 'miconi2018'],
    lab: 'stp',
  },
  {
    id: 'stdp', layer: 1,
    title: b('Hebb 学习与 STDP ↔ 局部无监督学习', 'Hebbian learning & STDP ↔ local unsupervised learning'),
    brain: b(
      'Hebb（1949）提出，共同活动可以增强细胞间的连接。经典 STDP 实验进一步发现，突触前后放电的相对时刻会影响增强或削弱，时间窗常在几十毫秒范围。经典模型常把突触前先放电对应为增强，但方向、时间窗和调节因素会随细胞及实验条件变化；先后顺序本身也不能证明因果。',
      'Hebb (1949) proposed that joint activity can strengthen connections. Classical STDP experiments found that relative spike timing affects strengthening or weakening, often over tens of milliseconds. Classical models commonly associate pre-before-post firing with strengthening, but direction, timing windows and modulation vary by cell and experimental conditions; order alone does not prove causation.'),
    brainMath: [
      { tex: t`\Delta w = \begin{cases} A_+\,e^{-\Delta t/\tau_+}, & \Delta t > 0 \\ -A_-\,e^{\Delta t/\tau_-}, & \Delta t < 0 \end{cases},\qquad \Delta t = t_{\text{post}} - t_{\text{pre}}`, caption: b('STDP 时间窗（Bi & Poo 1998）', 'STDP window (Bi & Poo 1998)') },
      { tex: t`\Delta w = \eta\,y\,x \quad\longrightarrow\quad \Delta w = \eta\,y\,(x - y\,w)`, caption: b('Hebb 规则与 Oja 规则（加入归一化后收敛到第一主成分）', 'Hebb rule and Oja’s rule (normalised; converges to the first principal component)') },
    ],
    ai: b(
      '主流深度学习几乎不用 Hebb 规则，而是依赖反向传播。Hebb 类规则出现在自组织映射、Hopfield 网络、部分脉冲神经网络的无监督学习中。“可微可塑性”（Miconi 2018）把 Hebb 项做成可训练的，让网络学会在推理时自我修改。',
      'Mainstream deep learning rarely uses Hebbian rules, relying on backprop. They appear in self-organising maps, Hopfield nets and unsupervised SNN learning. Differentiable plasticity (Miconi 2018) makes Hebbian terms trainable so networks learn to modify themselves at inference.'),
    aiMath: [{ tex: t`y_j = \sigma\Big(\sum_i \big(w_{ij} + \alpha_{ij}\,\mathrm{Hebb}_{ij}(t)\big)x_i\Big),\quad \mathrm{Hebb}_{ij}(t{+}1) = \eta\,x_i y_j + (1-\eta)\,\mathrm{Hebb}_{ij}(t)`, caption: b('可微可塑性：$w$ 和 $\\alpha$ 由反向传播学习，Hebb 项在推理时在线更新', 'Differentiable plasticity: $w$ and $\\alpha$ learned by backprop; the Hebbian trace updates online') }],
    corr: 'crude', evidence: 'debated',
    refs: ['hebb1949', 'bi1998', 'markram1997', 'song2000', 'miconi2018'],
    lab: 'stdp',
  },
  {
    id: 'three-factor', layer: 1,
    title: b('三因子学习与信用分配 ↔ 反向传播', 'Three-factor learning & credit assignment ↔ backpropagation'),
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
    refs: ['rumelhart1986', 'lillicrap2016', 'lillicrap2020', 'whittington2017', 'payeur2021', 'bellec2020', 'fremaux2016', 'gerstner2018'],
    lab: 'three-factor',
  },
  {
    id: 'consolidation', layer: 1,
    title: b('突触巩固 ↔ 持续学习（EWC 等）', 'Synaptic consolidation ↔ continual learning (EWC, …)'),
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
    refs: ['benna2016', 'kirkpatrick2017', 'zenke2017', 'mcclelland1995'],
  },
  {
    id: 'structural-plasticity', layer: 1,
    title: b('结构可塑性 ↔ 剪枝与稀疏训练', 'Structural plasticity ↔ pruning & sparse training'),
    brain: b(
      '树突棘（突触所在处）会随经验不断出现和消失。发育早期突触过量生成，随后按使用情况大量修剪；成年后仍有持续的周转，学习新技能时新棘增加并被选择性保留。关键期内结构可塑性特别强（Hensch 2005）。',
      'Dendritic spines (where synapses sit) appear and disappear with experience. Early development overproduces synapses and then prunes heavily by use; adults keep turning them over, adding and selectively stabilising spines when learning skills. Critical periods show especially strong structural plasticity (Hensch 2005).'),
    brainMath: [{ tex: t`P(\text{spine survives}) \uparrow \ \text{with correlated pre/post activity}`, caption: b('定性规律：相关活动使新突触更可能被保留（Holtmaat & Svoboda 2009）', 'Qualitative rule: correlated activity stabilises new synapses (Holtmaat & Svoboda 2009)') }],
    ai: b(
      '剪枝通常在训练后进行，用于压缩模型。彩票假说（Frankle & Carbin 2019）发现稠密网络中存在可以单独训练到同等精度的稀疏子网络。动态稀疏训练会在训练中剪掉弱连接、再生长新连接。MoE 则在运行时按输入选择激活哪些专家。',
      'Pruning usually happens after training for compression. The lottery-ticket hypothesis (Frankle & Carbin 2019) found sparse subnetworks trainable to full accuracy. Dynamic sparse training prunes and regrows connections during training; MoE selects which experts to activate per input.'),
    aiMath: [{ tex: t`W \leftarrow W \odot M,\quad M_{ij} = \mathbb{1}\big[|w_{ij}| > \theta\big]`, caption: b('按幅值剪枝的掩码', 'Magnitude-pruning mask') }],
    corr: 'crude', evidence: 'established',
    refs: ['holtmaat2009', 'hensch2005', 'frankle2019', 'fedus2022'],
  },
  {
    id: 'glia', layer: 1,
    title: b('胶质细胞与三方突触 ↔（缺失）', 'Glia & the tripartite synapse ↔ (absent)'),
    brain: b(
      '胶质细胞数量与神经元相当。星形胶质细胞包裹大量突触，回收递质、调节离子与能量供应，并能通过钙信号以秒到分钟的尺度调节突触传递，形成“突触前-突触后-胶质”三方突触。它们的计算作用仍在研究中。',
      'Glia are about as numerous as neurons. Astrocytes wrap many synapses, recycle transmitter, regulate ions and energy, and can modulate transmission via calcium signalling over seconds to minutes. Together they form the pre–post–glia tripartite synapse. Their computational role is still being worked out.'),
    ai: b('主流 AI 没有对应机制。最接近的是超网络或慢速调制网络：一个较慢的网络生成或调节另一个网络的参数。', 'No mainstream counterpart. The closest are hypernetworks or slow modulatory networks that generate or scale another network’s parameters.'),
    corr: 'absent', evidence: 'debated',
    refs: ['araque1999'],
  },
]
