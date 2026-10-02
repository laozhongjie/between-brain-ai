import type { CardGuide } from '../../types'

const b = (zh: string, en: string) => ({ zh, en })

export const NEURON_GUIDES: Record<string, CardGuide> = {
  'neuron-models': {
    question: b('一个计算单元需要记住刚才发生过什么吗？', 'Does a computing unit need to remember what just happened?'),
    answer: b('真实神经元的响应依赖过去的输入；普通激活函数只处理当前数值，有状态模型则显式保留历史。', 'A neuron’s response depends on past input. A plain activation function acts on current values; stateful models explicitly retain history.'),
    scope: b('比较单个生物神经元、无状态人工单元与循环网络或状态空间模型中的有状态单元。', 'Compares biological neurons, stateless artificial units and stateful units in recurrent or state-space models.'),
    comparisons: [
      { dimension: b('时间记忆', 'Temporal memory'), brain: b('膜电位、适应等内部变量随时间演化。', 'Internal variables such as membrane potential and adaptation evolve over time.'), ai: b('ReLU 本身无记忆；循环状态或状态空间层可保存过去的信息。', 'ReLU itself has no memory; recurrent states or state-space layers can retain past information.') },
      { dimension: b('输出形式', 'Output'), brain: b('多数神经元通过脉冲时刻与频率传递信息。', 'Most neurons communicate through spike timing and firing rate.'), ai: b('常见单元输出连续数值；脉冲网络显式表示事件。', 'Typical units output numerical values; spiking networks explicitly represent events.') },
    ],
    borrow: b('为时间任务加入小型内部状态，让单元既看当前输入，也反映近期历史。', 'For temporal tasks, add small internal states so units reflect both current input and recent history.'),
    boundary: b('更像真实神经元不代表任务效果更好；膜电位模型的复杂度应由任务与硬件预算决定。', 'Greater biological realism does not guarantee better task performance; model complexity should follow task and hardware budgets.'),
    experiments: [
      { title: b('加入缓慢适应变量', 'Add a slow adaptation state'), change: b('给单元增加随激活累积、随时间衰减的状态。', 'Add a state that accumulates with activation and decays over time.'), test: b('在重复刺激和突变序列上，与无状态基线比较识别率和延迟。', 'Compare recognition and latency with a stateless baseline on repeated and changing sequences.'), tradeoff: b('适应过强会压低持续但重要的信号。', 'Excessive adaptation suppresses sustained but important signals.') },
      { title: b('使用不同记忆时长', 'Mix memory timescales'), change: b('让不同通道使用不同的状态衰减率。', 'Give different channels different state-decay rates.'), test: b('在混合短时与长时依赖的任务中，比较单一衰减率模型。', 'Compare with a single-rate model on tasks mixing short and long dependencies.'), tradeoff: b('慢状态可能携带过时信息，需要重置机制。', 'Slow states can retain stale information and need resetting.') },
    ],
  },
  dendrites: {
    question: b('相同输入在不同情境下，为什么要产生不同响应？', 'Why should the same input produce different responses in different contexts?'),
    answer: b('树突分支可以先分别处理输入，再影响神经元输出。AI 可借鉴输入分工与门控，而非只把所有信号混合求和。', 'Dendritic branches can process inputs separately before influencing the output. AI can borrow input separation and gating rather than simply summing every signal.'),
    scope: b('比较树突非线性模型与 GLU、上下文门控及多区室网络，不把所有神经元都当成同一种结构。', 'Compares dendritic nonlinearities with GLUs, context gates and compartmental networks, without assuming all neurons share one structure.'),
    comparisons: [
      { dimension: b('输入怎样汇合', 'Combining inputs'), brain: b('树突分支可局部放大或筛选输入，胞体再整合。', 'Branches can locally amplify or filter inputs before integration at the soma.'), ai: b('点单元先求和再激活；门控结构可让一条通路调节另一条。', 'Point units sum then activate; gated structures let one pathway modulate another.') },
      { dimension: b('上下文的作用', 'Role of context'), brain: b('某些皮层细胞的不同树突区接收不同来源的信号。', 'Different dendritic regions of some cortical cells receive different signal sources.'), ai: b('任务向量可以显式选择通道、专家或子网络。', 'Task vectors can explicitly select channels, experts or subnetworks.') },
    ],
    borrow: b('把「输入是什么」与「当前要做什么」分开处理，再由上下文调节输入通路。', 'Process input content separately from the current task, then use context to modulate the input pathway.'),
    boundary: b('单个神经元可表现复杂非线性，不意味着能直接替代任意深层网络；活体如何利用这些性质仍在研究。', 'Complex neuronal nonlinearities do not make one neuron a substitute for an arbitrary deep network; their in-vivo use is still under study.'),
    experiments: [
      { title: b('按任务门控特征', 'Gate features by task'), change: b('用任务向量乘性调节共享特征，而不是复制整个模型。', 'Use task vectors to multiplicatively gate shared features rather than copying the whole model.'), test: b('比较多任务准确率、任务间干扰和参数数量。', 'Compare multi-task accuracy, interference and parameter count.'), tradeoff: b('任务识别错误会关闭需要的通路。', 'Misidentifying the task can close needed pathways.') },
      { title: b('将输入与反馈分区', 'Separate input and feedback'), change: b('用独立分支接收感觉输入与高层反馈，再做受限融合。', 'Use separate branches for sensory input and high-level feedback, then combine them with constrained gating.'), test: b('在上下文冲突和缺失情况下，对比简单拼接输入。', 'Compare with concatenated inputs under conflicting or missing context.'), tradeoff: b('反馈过强可能覆盖真实输入，需要限制增益。', 'Strong feedback can override the actual input; gains need bounds.') },
    ],
  },
  spikes: {
    question: b('没有新变化时，还需要一直计算吗？', 'Must computation continue when nothing changes?'),
    answer: b('脉冲系统通过离散事件通信，能减少无变化时的工作量；节能收益取决于活动稀疏度和运行硬件。', 'Spiking systems communicate through discrete events and can reduce work during inactivity; energy savings depend on activity and hardware.'),
    scope: b('比较脉冲通信、常见按帧计算与事件驱动实现，不把脉冲形式本身等同于低功耗。', 'Compares spike communication, typical frame-based computation and event-driven implementations, without equating spikes themselves with low power.'),
    comparisons: [
      { dimension: b('何时更新', 'When updates happen'), brain: b('脉冲在不同位置、不同时刻产生，不依赖统一帧时钟。', 'Spikes occur at different places and times without a shared frame clock.'), ai: b('常见网络按帧或批次更新；事件模型可以只处理发生变化的位置。', 'Typical networks update by frames or batches; event models can process only changed locations.') },
      { dimension: b('怎样携带信息', 'Information code'), brain: b('脉冲的时刻、频率与群体模式都可能有用。', 'Spike timing, rate and population patterns can all carry information.'), ai: b('实值网络直接传数值；脉冲网络需要选择时间或频率编码。', 'Real-valued networks transmit numbers directly; spiking networks need timing or rate codes.') },
    ],
    borrow: b('让计算和通信由有意义的变化触发，而不是为了每个时刻都产生完整输出。', 'Trigger computation and communication through meaningful changes instead of generating full updates at every instant.'),
    boundary: b('在普通 GPU 上逐步模拟脉冲可能更慢；需要把编码、时间步和数据搬运一起算进成本。', 'Step-by-step spike simulation on a GPU can be slower; include encoding, time steps and data movement in the cost.'),
    experiments: [
      { title: b('只更新发生变化的区域', 'Update only changed regions'), change: b('用变化阈值决定哪些传感器区域需要重算。', 'Use change thresholds to decide which sensor regions need recomputation.'), test: b('比较静态与快速运动场景的漏检率和实测能耗。', 'Compare missed detections and measured energy in static and fast-motion scenes.'), tradeoff: b('阈值过高会漏掉缓慢变化的小目标。', 'High thresholds can miss slowly changing small targets.') },
      { title: b('在目标硬件上比较编码', 'Compare codes on target hardware'), change: b('为同一任务实现实值与事件编码版本。', 'Implement real-valued and event-coded versions of the same task.'), test: b('在匹配准确率下测量端到端延迟和每次推理能量。', 'Measure end-to-end latency and energy per inference at matched accuracy.'), tradeoff: b('稀疏运算数的下降不一定转化为设备节能。', 'Reduced sparse operation counts need not translate into device-level savings.') },
    ],
  },
  'ei-celltypes': {
    question: b('哪些单元负责计算，哪些负责控制计算？', 'Which units compute, and which control computation?'),
    answer: b('兴奋与抑制共同调节网络响应。工程上可把内容处理与增益、门控控制分工设计。', 'Excitation and inhibition jointly regulate network responses. Engineering can separate content processing from gain and gating control.'),
    scope: b('比较皮层细胞类型的功能分工与人工网络的控制模块；这里的兴奋、抑制是信号作用，不是情绪。', 'Compares functional roles of cortical cell types with artificial control modules. Excitation and inhibition refer to signal effects, not emotions.'),
    comparisons: [
      { dimension: b('连接作用', 'Connection effects'), brain: b('主要细胞类型通常有稳定的递质身份，效应还取决于受体和回路。', 'Major cell types usually retain transmitter identity; effects also depend on receptors and circuits.'), ai: b('普通权重可正可负，不要求一个单元的输出有统一符号。', 'Ordinary weights can be positive or negative without a common output sign per unit.') },
      { dimension: b('调节方式', 'Regulation'), brain: b('不同抑制性细胞可参与局部门控、增益和时序协调。', 'Different inhibitory cells can contribute to local gating, gain and temporal coordination.'), ai: b('归一化、门控和路由器分别承担部分控制功能。', 'Normalisation, gates and routers perform some related control functions.') },
    ],
    borrow: b('用小型控制模块调节主网络，而不要求每个计算单元都兼顾所有调节任务。', 'Use small control modules to regulate the main network rather than giving every unit every control role.'),
    boundary: b('强制权重符号一致并不自动带来更好泛化；细胞类型与工程模块也不是逐一对应的。', 'Constraining weight signs does not automatically improve generalisation; cell types and engineering modules do not map one to one.'),
    experiments: [
      { title: b('分离控制器与内容网络', 'Separate control from content'), change: b('让小控制器输出各层的增益和稀疏门控。', 'Let a small controller output layer gains and sparse gates.'), test: b('在任务切换和输入干扰下，与等参数量网络比较表现。', 'Compare with a parameter-matched network under task switches and distracting inputs.'), tradeoff: b('控制器可能成为瓶颈，并引入新的不稳定反馈。', 'The controller can become a bottleneck and introduce unstable feedback.') },
      { title: b('检验符号约束的作用', 'Test sign constraints'), change: b('仅在一个子模块限制输出权重符号，其他条件保持一致。', 'Constrain output-weight signs in one module while matching other conditions.'), test: b('比较学习速度、抗扰动能力和最终精度。', 'Compare learning speed, perturbation robustness and final accuracy.'), tradeoff: b('限制表达能力可能需要更多单元才能补偿。', 'Restricted expressivity may require more units to compensate.') },
    ],
  },
  noise: {
    question: b('随机性只是误差，还是也能帮助探索？', 'Is randomness only error, or can it help exploration?'),
    answer: b('随机性既可能损害精度，也可以支持探索或不确定性估计。关键是噪声加在哪里、加多少。', 'Randomness can impair precision or support exploration and uncertainty estimation. Its location and magnitude matter.'),
    scope: b('比较神经变异性与采样、dropout 和随机策略；不假设所有生物噪声都有功能。', 'Compares neural variability with sampling, dropout and stochastic policies, without assuming all biological noise is useful.'),
    comparisons: [
      { dimension: b('来源', 'Source'), brain: b('离子通道、递质释放和网络状态都能引入变异。', 'Ion channels, transmitter release and network state can introduce variability.'), ai: b('随机性可来自采样、扰动或随机训练步骤。', 'Randomness can come from sampling, perturbation or stochastic training.') },
      { dimension: b('能否控制', 'Controllability'), brain: b('变异随状态改变，但其计算作用并未完全确定。', 'Variability changes with state, but its computational role is not fully settled.'), ai: b('可以显式调节温度、噪声尺度和随机种子。', 'Temperature, noise scale and random seeds can be explicitly controlled.') },
    ],
    borrow: b('根据任务阶段和不确定性调整探索强度，同时用重复试验检查输出可靠性。', 'Adjust exploration to task stage and uncertainty, and assess reliability through repeated trials.'),
    boundary: b('多次随机输出不自动代表校准良好的不确定性；随机性也不能取代安全约束。', 'Repeated random outputs do not automatically provide calibrated uncertainty, and randomness cannot replace safety constraints.'),
    experiments: [
      { title: b('调节探索强度', 'Adapt exploration strength'), change: b('用经过校准的误差估计控制策略采样温度。', 'Use calibrated error estimates to control policy-sampling temperature.'), test: b('与固定温度比较探索覆盖、累计收益和失败次数。', 'Compare exploration coverage, cumulative return and failures with fixed temperature.'), tradeoff: b('误把噪声当作新奇可能导致无效探索。', 'Mistaking noise for novelty can produce unproductive exploration.') },
      { title: b('检查随机预测是否可信', 'Check stochastic uncertainty'), change: b('在推理中保留受控扰动，重复预测得到分散程度。', 'Retain controlled perturbations at inference and measure prediction spread across repeats.'), test: b('检查分散程度是否能预测实际错误，并对比分布变化前后。', 'Test whether spread predicts actual errors before and after distribution shifts.'), tradeoff: b('重复计算增加成本，预测仍可能一致地出错。', 'Repeated computation costs more, and predictions may still be consistently wrong.') },
    ],
  },
  'energy-sparsity': {
    question: b('怎样把计算留给真正需要它的部分？', 'How can computation be reserved for the parts that need it?'),
    answer: b('稀疏活动和条件计算都尝试减少不必要的工作，但实际能耗还取决于存储访问、硬件和任务。', 'Sparse activity and conditional computation both reduce unnecessary work, but real energy use also depends on memory access, hardware and task.'),
    scope: b('比较生物能量约束与稀疏网络、MoE 和能耗感知设计；大脑 20 W 不能直接作为模型能效排名。', 'Compares biological energy constraints with sparse networks, MoE and energy-aware design; the brain’s 20 W is not a direct model-efficiency ranking.'),
    comparisons: [
      { dimension: b('计算预算', 'Compute budget'), brain: b('信号传递和维持细胞状态都需要代谢资源。', 'Both signalling and maintaining cellular state require metabolic resources.'), ai: b('算术、存储和通信消耗电能，部署配置决定实际功率。', 'Arithmetic, storage and communication consume energy; deployment determines actual power.') },
      { dimension: b('减少哪些工作', 'What work is skipped'), brain: b('不同区域和任务的活动稀疏程度不同。', 'Activity sparsity varies across regions and tasks.'), ai: b('剪枝减少连接，MoE 选择专家，动态计算跳过部分步骤。', 'Pruning removes connections, MoE selects experts and dynamic computation skips steps.') },
    ],
    borrow: b('把精度、响应时间与实测能耗一起作为设计目标，而不是只追求更少参数。', 'Optimise accuracy, response time and measured energy together rather than minimising parameters alone.'),
    boundary: b('生物与数字硬件的任务和测量边界不同；稀疏模型还可能受不规则访存限制。', 'Biological and digital systems differ in tasks and measurement boundaries; sparse models can also be limited by irregular memory access.'),
    experiments: [
      { title: b('按输入选择计算模块', 'Select modules by input'), change: b('给模型加入容量受限的路由器，只激活部分专家。', 'Add a capacity-limited router that activates a subset of experts.'), test: b('与稠密模型在同一设备上比较准确率、吞吐和每次任务能量。', 'Compare accuracy, throughput and energy per task with a dense model on the same device.'), tradeoff: b('专家负载失衡和通信可能抵消算术节省。', 'Load imbalance and communication can erase arithmetic savings.') },
      { title: b('用实测成本选择稀疏度', 'Choose sparsity by measured cost'), change: b('对多种剪枝比例进行设备级测速与功耗记录。', 'Profile latency and power on the device at several pruning levels.'), test: b('寻找满足精度要求时能耗最低的配置。', 'Find the lowest-energy configuration that meets the accuracy target.'), tradeoff: b('某台设备上的最优配置未必适合另一台设备。', 'The best configuration on one device may not transfer to another.') },
    ],
  },
}
