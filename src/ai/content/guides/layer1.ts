import type { CardGuide } from '../../types'

const b = (zh: string, en: string) => ({ zh, en })

export const SYNAPSE_GUIDES: Record<string, CardGuide> = {
  'synapse-weight': {
    question: b('突触只是大脑里的一个权重吗？', 'Is a synapse just a weight in the brain?'),
    answer: b('权重和突触强度都影响信号传递，但突触还受释放概率、近期活动和生理状态影响。', 'Weights and synaptic strength both affect signal transmission, but synapses also depend on release probability, recent activity and physiological state.'),
    scope: b('比较化学突触与标准人工网络的标量权重；动态权重和随机推理是人工模型的扩展。', 'Compares chemical synapses with scalar weights in standard networks; dynamic weights and stochastic inference are extensions.'),
    comparisons: [
      { dimension: b('保存的状态', 'Stored state'), brain: b('受体、释放概率等共同影响当前传递强度。', 'Receptors, release probability and other factors jointly determine transmission strength.'), ai: b('标准连接用一个数值表示强度，推理时通常固定。', 'A standard connection has a numerical strength, usually fixed during inference.') },
      { dimension: b('重复相同输入', 'Repeating an input'), brain: b('递质释放具有概率性，响应也会随近期使用而变化。', 'Transmitter release is probabilistic and responses change with recent use.'), ai: b('固定权重的确定性运算给出相同结果；可额外加入随机机制。', 'Deterministic computation with fixed weights returns the same result; stochastic mechanisms can be added.') },
      { dimension: b('连接与符号', 'Wiring and sign'), brain: b('连接受空间成本约束，递质类型限制信号作用。', 'Spatial costs constrain wiring and transmitter types constrain signal effects.'), ai: b('常见矩阵允许任意符号，也有稀疏、局部或符号受限设计。', 'Typical matrices allow either sign; sparse, local and sign-constrained designs also exist.') },
    ],
    borrow: b('把连接看成可以带局部状态的资源，而不只是一张训练后固定的数值表。', 'Treat connections as resources that can carry local state, not only a table of fixed trained values.'),
    boundary: b('突触数与模型参数数不能直接换算；生物符号和随机性约束不一定都值得照搬。', 'Synapse counts cannot be directly converted to parameter counts; biological sign and noise constraints need not all be copied.'),
    experiments: [
      { title: b('在连接中加入受控随机性', 'Add controlled stochastic connections'), change: b('推理时保留少量随机失活，多次计算输出分布。', 'Retain limited stochastic masking at inference and sample the output distribution.'), test: b('检查不确定性校准、异常输入检测和额外延迟。', 'Evaluate uncertainty calibration, unusual-input detection and added latency.'), tradeoff: b('随机扰动可能损害准确率，也不保证识别未知情况。', 'Perturbations may hurt accuracy and do not guarantee detection of unknown cases.') },
      { title: b('按模块限制连接', 'Restrict connections by module'), change: b('在部分层使用局部稀疏连接，并保持总训练预算一致。', 'Use local sparse connections in selected layers at the same training budget.'), test: b('比较准确率、连接数量和目标设备上的实测能耗。', 'Compare accuracy, connection count and measured energy on the target device.'), tradeoff: b('限制长距离连接可能降低整合全局信息的能力。', 'Restricting distant connections may weaken global information integration.') },
    ],
  },
  'short-term-plasticity': {
    question: b('不改长期知识，能暂时记住最近的输入吗？', 'Can recent input be remembered without changing long-term knowledge?'),
    answer: b('短时可塑性让突触暂时变强或变弱；快权重用快速更新的状态实现另一种短时记忆。', 'Short-term plasticity temporarily strengthens or weakens synapses; fast weights implement another form of short-term memory through rapidly updated state.'),
    scope: b('比较短时易化、短时抑制与快权重及部分线性注意力机制。', 'Compares short-term facilitation and depression with fast weights and some linear-attention mechanisms.'),
    comparisons: [
      { dimension: b('写入方式', 'Writing'), brain: b('近期脉冲改变可用资源和释放概率，进而改变传递。', 'Recent spikes alter available resources and release probability, changing transmission.'), ai: b('输入按更新规则写入快权重矩阵或状态。', 'Inputs write to a fast-weight matrix or state through an update rule.') },
      { dimension: b('遗忘方式', 'Forgetting'), brain: b('不同突触有不同恢复时间，近期影响逐渐消退。', 'Different synapses recover at different rates as recent effects fade.'), ai: b('状态可不衰减、固定衰减或按输入门控衰减，取决于架构。', 'State can persist, decay at a fixed rate or decay through input-dependent gates.') },
    ],
    borrow: b('把短时状态与长期参数分开，并让不同通道记住不同长度的历史。', 'Separate short-term state from long-term parameters and give channels different memory horizons.'),
    boundary: b('生物资源耗竭与内容寻址不是同一种操作；线性注意力的数学关系不意味着直接复制了突触机制。', 'Biological resource depletion and content addressing are different operations; the linear-attention connection is not a direct copy of synaptic mechanisms.'),
    experiments: [
      { title: b('混合不同遗忘速度', 'Mix forgetting rates'), change: b('给快权重的不同头设置快、慢衰减率。', 'Give fast-weight heads a mixture of fast and slow decay rates.'), test: b('在长短依赖混合序列上，对比单一衰减率的记忆准确率。', 'Compare memory accuracy with a single decay rate on mixed-horizon sequences.'), tradeoff: b('较慢状态可能积累干扰；需要控制容量。', 'Slow states can accumulate interference and need capacity control.') },
      { title: b('抑制重复而突出变化', 'Suppress repetition, highlight change'), change: b('让感知前端对持续相同输入逐渐降低响应。', 'Make a sensory front end gradually reduce its response to repeated input.'), test: b('同时检查变化检测率和持续目标的漏检率。', 'Measure change detection alongside missed sustained targets.'), tradeoff: b('持续信号不一定无用，安全相关输入不能被盲目压低。', 'Persistent signals may matter; safety-relevant inputs must not be blindly suppressed.') },
    ],
  },
  stdp: {
    question: b('只靠相邻单元的活动，能学到什么？', 'What can be learned from neighbouring units alone?'),
    answer: b('Hebb 类学习利用共同活动，STDP 还利用放电先后顺序。它们能形成局部关联，但并不自动解决复杂任务的目标分配。', 'Hebbian learning uses joint activity and STDP also uses spike order. They form local associations but do not automatically solve credit assignment for complex tasks.'),
    scope: b('比较经典 Hebb、STDP 模型与反向传播和可微可塑性；真实时序规则随细胞和状态而变。', 'Compares classical Hebbian and STDP models with backpropagation and differentiable plasticity; biological timing rules vary by cell and state.'),
    comparisons: [
      { dimension: b('需要哪些信息', 'Required information'), brain: b('经典 STDP 根据突触前后放电的相对时刻更新连接。', 'Classical STDP updates connections using relative pre- and postsynaptic spike timing.'), ai: b('反向传播用任务损失的梯度；局部学习模型可只读取附近活动。', 'Backpropagation uses task-loss gradients; local-learning models can use nearby activity only.') },
      { dimension: b('如何避免失控', 'Keeping learning stable'), brain: b('活动相关增强需要稳态调节、抑制等机制配合。', 'Activity-dependent strengthening needs homeostatic regulation, inhibition and related mechanisms.'), ai: b('可使用归一化、权重约束或学习到的局部更新规则。', 'Normalisation, weight constraints or learned local update rules can stabilise changes.') },
    ],
    borrow: b('让少量连接利用最近活动快速适应，同时显式限制更新幅度。', 'Let a small set of connections adapt quickly to recent activity while explicitly bounding updates.'),
    boundary: b('先后相关不等于证明因果；STDP 在体外有充分证据，但对活体复杂学习的贡献仍有争议。', 'Temporal correlation does not prove causation. STDP has strong in-vitro evidence, but its role in complex in-vivo learning remains debated.'),
    experiments: [
      { title: b('叠加局部适应通道', 'Add a local adaptation path'), change: b('冻结主模型，在小型适配器中加入有界 Hebb 更新。', 'Freeze the main model and add bounded Hebbian updates in a small adapter.'), test: b('在缓慢分布变化下，比较适应速度与旧任务保持率。', 'Compare adaptation speed and old-task retention under gradual distribution shift.'), tradeoff: b('无标签更新也可能强化模型自己的错误。', 'Unlabelled updates can reinforce the model’s own mistakes.') },
      { title: b('从事件时序学习特征', 'Learn features from event timing'), change: b('用 STDP 训练事件传感器前端，再训练一个监督读出。', 'Train an event-sensor front end with STDP, then fit a supervised readout.'), test: b('在相同标签预算下，与随机特征和端到端训练比较。', 'Compare with random features and end-to-end training at the same label budget.'), tradeoff: b('局部学到的特征未必对下游任务最有用。', 'Locally learned features may not be optimal for the downstream task.') },
    ],
  },
  'three-factor': {
    question: b('奖励晚到了，怎样知道刚才哪一步值得学习？', 'When reward arrives late, how can earlier actions receive credit?'),
    answer: b('三因子模型先给近期活动留下会衰减的痕迹，再由奖励等信号决定是否更新连接。', 'Three-factor models leave decaying traces of recent activity, then use signals such as reward to decide whether connections should change.'),
    scope: b('比较资格迹与调质信号的学习模型、反向传播及在线近似方法；大脑并无已确认的单一通用学习算法。', 'Compares eligibility-trace and neuromodulatory models with backpropagation and online approximations; no single universal brain-learning algorithm is established.'),
    comparisons: [
      { dimension: b('保存什么', 'What is retained'), brain: b('资格迹模型保留近期突触活动，等待后续调制。', 'Eligibility-trace models retain recent synaptic activity for later modulation.'), ai: b('反向传播通常保存或重算中间激活；在线方法可以保留资格迹。', 'Backpropagation typically stores or recomputes activations; online methods can maintain eligibility traces.') },
      { dimension: b('谁决定更新', 'What drives the update'), brain: b('局部活动与多巴胺等调质信号共同影响可塑性。', 'Local activity and modulatory signals such as dopamine jointly influence plasticity.'), ai: b('损失梯度给出参数更新方向；近似规则可用广播信号调节。', 'Loss gradients give parameter-update directions; approximate rules can use broadcast modulation.') },
    ],
    borrow: b('把“刚才哪些连接参与过”与“后来结果好不好”分开记录，再组合成学习信号。', 'Record which connections recently participated separately from whether the later outcome was good, then combine them for learning.'),
    boundary: b('资格迹解决部分时间归因问题，不保证精确梯度，也不代表所有脑区都使用同一种规则。', 'Eligibility traces address part of temporal credit assignment, but guarantee neither exact gradients nor one rule across brain regions.'),
    experiments: [
      { title: b('用延迟反馈更新小模块', 'Adapt a small module with delayed feedback'), change: b('离线训练主模型，部署时只让少量参数按资格迹与奖励更新。', 'Pretrain the main model and update only a small parameter subset using traces and rewards at deployment.'), test: b('逐步增加奖励延迟，比较任务收益、遗忘与内存开销。', 'Increase reward delays and compare return, forgetting and memory overhead.'), tradeoff: b('迹衰减太快会漏掉贡献，太慢会混入无关活动。', 'Fast decay loses relevant events; slow decay includes irrelevant ones.') },
      { title: b('比较在线近似与完整反传', 'Compare online approximation with backprop'), change: b('在同一个小型循环网络上实现资格迹更新和完整时间反传。', 'Implement trace-based updates and full backpropagation through time in the same small recurrent network.'), test: b('绘制任务分数相对于峰值内存和更新延迟的曲线。', 'Plot task score against peak memory and update latency.'), tradeoff: b('节省存储通常要付出梯度近似误差。', 'Memory savings usually come with gradient-approximation error.') },
    ],
  },
  consolidation: {
    question: b('学新知识时，哪些旧参数应该少改一点？', 'Which old parameters should change less when learning something new?'),
    answer: b('巩固让部分变化更稳定；持续学习算法则估计哪些参数重要，并限制它们被新任务覆盖。', 'Consolidation stabilises some changes; continual-learning methods estimate important parameters and protect them from new-task interference.'),
    scope: b('比较突触巩固模型与 EWC、参数重要性方法，不把脑内遗忘视为不存在。', 'Compares synaptic-consolidation models with EWC and parameter-importance methods, without assuming biological memory never forgets.'),
    comparisons: [
      { dimension: b('如何保留历史', 'Retaining history'), brain: b('多个分子过程在不同时间尺度参与突触变化的稳定。', 'Multiple molecular processes help stabilise synaptic changes over different timescales.'), ai: b('EWC 保存旧参数与重要性估计，惩罚对重要参数的大幅改动。', 'EWC retains old parameters and importance estimates to penalise large changes to important weights.') },
      { dimension: b('何时保护', 'When protection happens'), brain: b('巩固受活动、调质和时间影响，并非明确的任务结束按钮。', 'Consolidation depends on activity, modulation and time, not an explicit task-end switch.'), ai: b('经典 EWC 常在任务边界估计重要性；在线变体可连续更新。', 'Classical EWC often estimates importance at task boundaries; online variants can update continuously.') },
    ],
    borrow: b('让学习速度取决于历史重要性，而不是所有参数始终用同样的可修改程度。', 'Make learning rates depend on historical importance instead of treating every parameter as equally changeable.'),
    boundary: b('保护越强不一定越好：过度巩固会阻碍新学习。参数重要性也只是旧知识的近似指标。', 'Stronger protection is not always better: excessive consolidation blocks new learning, and parameter importance is only a proxy for old knowledge.'),
    experiments: [
      { title: b('为参数增加快慢状态', 'Add fast and slow parameter states'), change: b('让快速更新缓慢整合进稳定状态，并限制状态数量。', 'Slowly integrate fast updates into stable states with a bounded number of states.'), test: b('在无明确任务边界的序列中比较新学习与旧知识保持。', 'Compare new learning and old-knowledge retention in streams without task boundaries.'), tradeoff: b('每个参数的额外状态增加内存，慢整合可能错过快速变化。', 'Extra states cost memory and slow integration can miss rapid changes.') },
      { title: b('同时使用保护与回放', 'Combine protection and replay'), change: b('把重要性约束与小容量旧样本回放结合。', 'Combine importance constraints with a small replay buffer.'), test: b('分别移除保护或回放，检查各自对遗忘的贡献。', 'Remove protection or replay separately to measure each contribution to retention.'), tradeoff: b('回放占用存储，双重保护可能降低适应速度。', 'Replay takes storage, and combined protection can slow adaptation.') },
    ],
  },
  'structural-plasticity': {
    question: b('学习只能改连接强度，还是也能改变连接本身？', 'Can learning change the connections themselves, not just their strength?'),
    answer: b('大脑会形成和移除部分突触；动态稀疏训练也会调整连接，区别在于时机、依据和持续时间。', 'Brains form and remove some synapses; dynamic sparse training also changes connections, with different timing, criteria and duration.'),
    scope: b('比较经验相关结构变化、训练后剪枝和动态稀疏训练；MoE 选择专家不等于形成新连接。', 'Compares experience-related structural change, post-training pruning and dynamic sparse training; selecting an MoE expert is not growing a connection.'),
    comparisons: [
      { dimension: b('何时改结构', 'When structure changes'), brain: b('发育和成年学习都伴随部分连接的形成、稳定与消失。', 'Development and adult learning involve formation, stabilisation and loss of some connections.'), ai: b('剪枝可在训练后进行；动态稀疏方法在训练中改连接。', 'Pruning can happen after training; dynamic sparse methods rewire during training.') },
      { dimension: b('如何分配容量', 'Allocating capacity'), brain: b('活动、细胞过程和空间成本共同约束连接变化。', 'Activity, cellular processes and spatial costs constrain rewiring.'), ai: b('可按权重、梯度或任务需求选择移除与新增位置。', 'Weights, gradients or task demands can guide removal and growth.') },
    ],
    borrow: b('把容量分配也纳入学习：在预算内新增有用连接，同时保留支撑旧任务的路径。', 'Learn capacity allocation too: add useful connections within a budget while retaining paths that support old tasks.'),
    boundary: b('生物关键期不能直接变成通用训练日程；更像生长的算法也可能只是增加了计算预算。', 'Biological critical periods do not directly specify a universal training schedule; growth-like algorithms may simply spend more compute.'),
    experiments: [
      { title: b('在固定预算内重新连接', 'Rewire within a fixed budget'), change: b('移除低贡献连接，并按梯度信息补充相同数量的新连接。', 'Remove low-contribution connections and add the same number using gradient information.'), test: b('与固定稀疏结构比较新任务适应、旧任务保持和训练耗时。', 'Compare adaptation, retention and training time with fixed sparse wiring.'), tradeoff: b('重连会改变优化状态，也可能损伤看似不重要的旧通路。', 'Rewiring changes optimisation state and can damage seemingly unimportant old pathways.') },
      { title: b('逐步降低结构变化率', 'Gradually reduce rewiring'), change: b('训练前期允许更多连接替换，后期减少，并设置任务变化时的重启条件。', 'Allow more replacement early, reduce it later and define restart conditions for task changes.'), test: b('在相同连接预算下比较恒定与递减重连率。', 'Compare constant and decreasing rewiring rates at the same connection budget.'), tradeoff: b('过早稳定结构会限制后续任务适应。', 'Stabilising structure too early limits later adaptation.') },
    ],
  },
  glia: {
    question: b('计算之外，谁负责维持局部环境和资源？', 'Who maintains local conditions and resources around computation?'),
    answer: b('星形胶质细胞参与递质回收、离子环境和代谢支持。把它们类比成慢速资源调节器有启发性，但仍是粗略类比。', 'Astrocytes contribute to transmitter recycling, ionic conditions and metabolic support. A slow resource regulator is an instructive but rough engineering analogy.'),
    scope: b('比较胶质细胞的支持与调节作用和工程资源控制；没有公认的一一对应 AI 模块。', 'Compares glial support and regulation with engineering resource control; there is no accepted one-to-one AI module.'),
    comparisons: [
      { dimension: b('调节对象', 'What is regulated'), brain: b('细胞外环境和局部突触活动与胶质过程相互作用。', 'Extracellular conditions and local synaptic activity interact with glial processes.'), ai: b('优化器和调度器能调节学习率、计算和内存，但不是细胞模型。', 'Optimisers and schedulers regulate learning rates, compute and memory, but are not cell models.') },
      { dimension: b('时间尺度', 'Timescale'), brain: b('许多胶质过程比单次神经脉冲慢，且作用具有空间范围。', 'Many glial processes are slower than individual spikes and have spatial extent.'), ai: b('可为一组计算单元设置低频更新的资源控制器。', 'A group of units can be governed by a slower resource controller.') },
    ],
    borrow: b('在快速计算之外，试验慢速、区域性的资源与稳定性调节。', 'Explore slow, regional resource and stability regulation alongside fast computation.'),
    boundary: b('胶质细胞的计算作用仍在研究；以下是工程假设，不能当作已经确认的脑算法。', 'Glial computational roles remain under study; the proposals below are engineering hypotheses, not established brain algorithms.'),
    experiments: [
      { title: b('按区域调整学习强度', 'Regulate learning by region'), change: b('让慢速控制器根据局部活动统计调整一组参数的学习率。', 'Let a slow controller adjust group learning rates from local activity statistics.'), test: b('与全局学习率比较训练稳定性、适应速度和控制器开销。', 'Compare stability, adaptation speed and controller overhead with a global learning rate.'), tradeoff: b('反馈滞后可能导致学习率振荡。', 'Delayed feedback can make learning rates oscillate.') },
      { title: b('把资源预算分给不同模块', 'Allocate budgets across modules'), change: b('用长期使用统计分配各模块的更新频率。', 'Allocate module update frequencies using long-term usage statistics.'), test: b('在总计算预算相同的条件下，比较任务表现和模块闲置率。', 'At equal total compute, compare task performance and module idle rates.'), tradeoff: b('低频但重要的模块可能被错误削减资源。', 'Rarely used but important modules may lose needed resources.') },
    ],
  },
}
