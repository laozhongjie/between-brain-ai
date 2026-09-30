import type { Bi } from '../../data/types'
import type { Module } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/**
 * Layer 5: the whole agent, a humanlike robot brain. The world model is one module among many.
 * Grid: columns flow input → processing → output; the bottom row holds processes that span timescales.
 */
export const MODULES: Module[] = [
  {
    id: 'perception', pos: [0, 0], coverage: 3,
    name: b('感知', 'Perception'),
    brain: b('视觉、听觉、触觉等感觉皮层层级；主动采样（眼动、触摸探索）；多感官融合。', 'Sensory cortical hierarchies; active sampling (saccades, haptic exploration); multisensory fusion.'),
    ai: b('CNN、ViT、音频网络、多模态编码器，在许多基准上已达到或超过人类。', 'CNNs, ViTs, audio networks and multimodal encoders, at or above human level on many benchmarks.'),
    gaps: b('主动感知、少样本学习、对分布变化和对抗扰动的稳健性、触觉与本体感觉。', 'Active perception, few-shot learning, robustness to shift and adversarial perturbation, touch and proprioception.'),
    directions: b('由不确定性驱动的主动感知；事件驱动传感器；触觉大模型。', 'Uncertainty-driven active perception; event-driven sensors; tactile foundation models.'),
    cards: ['sys-vision', 'sys-hearing', 'sys-touch', 'normalization'], refs: ['yamins2014', 'kell2018'],
  },
  {
    id: 'world-model', pos: [1, 0], coverage: 2,
    name: b('世界模型', 'World model'),
    brain: b('皮层的预测编码、海马的认知地图与预演、小脑的前向模型共同构成对世界和自身动作后果的预测。', 'Cortical predictive coding, hippocampal cognitive maps and preplay, and cerebellar forward models together predict the world and the consequences of one’s own actions.'),
    ai: b('Dreamer、MuZero、JEPA、视频生成模型等。', 'Dreamer, MuZero, JEPA, video generation models.'),
    gaps: b('长时程、层级化（多时间尺度）的预测；因果与结构化表示；动作条件的物理预测；在线更新。', 'Long-horizon hierarchical (multi-timescale) prediction; causal and structured representations; action-conditioned physics; online updating.'),
    directions: b('在潜在空间做多尺度预测；用认知地图式的结构化潜变量（参考“千脑”理论中每个皮层柱都维护参考系的思路，Hawkins 2019）；预测误差驱动的在线学习。', 'Multi-scale latent prediction; cognitive-map-like structured latents (cf. the Thousand Brains idea that every cortical column keeps a reference frame, Hawkins 2019); prediction-error-driven online learning.'),
    cards: ['feedback-predictive', 'sys-motor', 'sys-memory'], refs: ['ha2018', 'hafner2023', 'lecun2022', 'schrittwieser2020', 'friston2010', 'hawkins2019'],
  },
  {
    id: 'memory', pos: [1, 1], coverage: 2,
    name: b('记忆系统', 'Memory systems'),
    brain: b('情景记忆（海马）、语义记忆（新皮层）、程序性记忆（基底节、小脑）、工作记忆（前额叶），通过回放相互转化。', 'Episodic (hippocampus), semantic (neocortex), procedural (basal ganglia, cerebellum) and working memory (prefrontal), interconverted by replay.'),
    ai: b('上下文窗口、KV 缓存、检索增强、经验回放、模型权重。', 'Context windows, KV caches, retrieval augmentation, experience replay, model weights.'),
    gaps: b('一次学习的情景记忆、自动巩固、主动遗忘、跨会话的个人经历。', 'One-shot episodic memory, automatic consolidation, active forgetting, cross-session personal history.'),
    directions: b('快慢双系统 + 离线巩固；按新奇度和重要性管理写入与遗忘。', 'Fast/slow dual systems + offline consolidation; novelty- and salience-based write/forget policies.'),
    cards: ['sys-memory', 'attractors', 'consolidation', 'short-term-plasticity'], refs: ['mcclelland1995', 'kumaran2016', 'whittington2022'],
  },
  {
    id: 'attention', pos: [2, 0], coverage: 2,
    name: b('注意与全局工作空间', 'Attention & global workspace'),
    brain: b('目标驱动与显著性驱动的选择；基底节门控工作记忆；容量有限的全局广播。', 'Goal- and salience-driven selection; basal-ganglia gating of working memory; capacity-limited global broadcast.'),
    ai: b('Transformer 注意力、MoE 路由、工具调用中的规划器。', 'Transformer attention, MoE routing, planners in tool-using agents.'),
    gaps: b('容量瓶颈带来的抽象、由目标驱动的选择、模块间的统一广播。', 'Abstraction forced by a capacity bottleneck, goal-driven selection, unified broadcast between modules.'),
    directions: b('小容量全局工作空间 + 门控写入；按不确定性分配计算。', 'Small global workspace with gated writes; compute allocation by uncertainty.'),
    cards: ['sys-attention', 'ei-celltypes'], refs: ['dehaene2011', 'miller2001', 'frank2001'],
  },
  {
    id: 'metacognition', pos: [2, 1], coverage: 1,
    name: b('元认知与不确定性', 'Metacognition & uncertainty'),
    brain: b('前额叶（尤其前部）评估自己的信心，决定何时求助、何时深思、何时放弃（Fleming & Dolan 2012）。', 'Prefrontal (especially anterior) cortex judges its own confidence, deciding when to seek help, deliberate or give up (Fleming & Dolan 2012).'),
    ai: b('校准、集成与 MC dropout 的不确定性估计，模型自我评估（Kadavath 2022）。', 'Calibration, ensembles and MC dropout, model self-evaluation (Kadavath 2022).'),
    gaps: b('可靠地“知道自己不知道”，并据此改变行为（求助、探索、慢思考）。', 'Reliably knowing what it doesn’t know, and changing behaviour accordingly (asking, exploring, slowing down).'),
    directions: b('把不确定性作为一等信号，驱动注意、学习率、探索和求助。', 'Make uncertainty a first-class signal driving attention, learning rate, exploration and help-seeking.'),
    cards: ['sys-attention', 'noise'], refs: ['fleming2012', 'kadavath2022', 'yu2005'],
  },
  {
    id: 'language', pos: [2, 2], coverage: 3,
    name: b('语言', 'Language'),
    brain: b('左侧颞叶-额叶语言网络，与感知、行动、社会互动紧密相连。', 'Left temporo-frontal language network, tightly linked with perception, action and social interaction.'),
    ai: b('大语言模型，语言能力很强。', 'Large language models: highly capable.'),
    gaps: b('接地（词与感知、行动相连）、数据效率、在对话中持续学习。', 'Grounding (words tied to perception and action), data efficiency, continual learning through dialogue.'),
    directions: b('具身语言学习；把语言作为规划与社会协作的接口而非全部。', 'Embodied language learning; language as an interface for planning and collaboration, not the whole mind.'),
    cards: ['sys-language'], refs: ['schrimpf2021', 'hickok2007', 'lake2017'],
  },
  {
    id: 'social', pos: [0, 1], coverage: 1,
    name: b('社会认知', 'Social cognition'),
    brain: b('心智理论、镜像系统（Rizzolatti 2004）、面孔与情绪识别、模仿学习、共同注意。', 'Theory of mind, mirror system (Rizzolatti 2004), face and emotion recognition, imitation, joint attention.'),
    ai: b('语言模型能在文本中模拟他人观点；模仿学习用于机器人。', 'LLMs simulate perspectives in text; imitation learning in robotics.'),
    gaps: b('基于具身经验的他人模型、从观察中快速模仿、共同注意与协作。', 'Other-models grounded in embodied experience, fast imitation from observation, joint attention and collaboration.'),
    directions: b('把他人建模为“另一个带目标的智能体”，复用自身世界模型来推断他人意图。', 'Model others as goal-driven agents and reuse one’s own world model to infer their intentions.'),
    cards: ['sys-language', 'sys-fear'], refs: ['rizzolatti2004', 'lake2017'],
  },
  {
    id: 'motivation', pos: [3, 0], coverage: 1,
    name: b('动机与驱力', 'Motivation & drives'),
    brain: b('多巴胺奖赏系统、伏隔核的“想要”、好奇心与新奇寻求、下丘脑的本能驱力。', 'Dopamine reward system, accumbens “wanting”, curiosity and novelty seeking, hypothalamic drives.'),
    ai: b('外部奖赏、好奇心等内在奖励（Pathak 2017）。', 'External reward; intrinsic rewards such as curiosity (Pathak 2017).'),
    gaps: b('自己产生目标；多个驱力之间的权衡；目标随状态变化。', 'Generating its own goals; trading off several drives; goals that change with state.'),
    directions: b('多通道驱力 + 稳态加权；好奇心与能力增长作为内在奖励。', 'Multi-channel drives with homeostatic weighting; curiosity and competence growth as intrinsic reward.'),
    cards: ['sys-reward', 'three-factor'], refs: ['schultz1997', 'pathak2017', 'dabney2020'],
  },
  {
    id: 'emotion', pos: [3, 1], coverage: 1,
    name: b('情绪与价值评估', 'Emotion & valuation'),
    brain: b('杏仁核、眶额、前扣带、岛叶：快速的全局状态切换，调节注意、学习和风险偏好。', 'Amygdala, orbitofrontal, anterior cingulate, insula: fast global state switches tuning attention, learning and risk.'),
    ai: b('负奖励、安全约束；情绪识别模型。', 'Negative reward, safety constraints; emotion-recognition models.'),
    gaps: b('功能性的情绪状态：作为元控制信号快速重塑整个系统的行为模式。', 'Functional emotional states: meta-control signals that rapidly reshape the whole system’s mode.'),
    directions: b('情绪状态向量驱动探索温度、学习率、动作速度与记忆写入。', 'An emotion-state vector driving exploration temperature, learning rate, action speed and memory writes.'),
    cards: ['sys-fear'], refs: ['ledoux2000', 'damasio1996', 'doya2002'],
  },
  {
    id: 'homeostasis', pos: [3, 2], coverage: 0,
    name: b('稳态与身体自我模型', 'Homeostasis & body self-model'),
    brain: b('下丘脑、脑干、岛叶维持内部平衡，并持续更新身体的内部模型。', 'Hypothalamus, brainstem and insula keep internal balance and continuously update a model of the body.'),
    ai: b('几乎没有；稳态强化学习是少数研究。', 'Almost none; homeostatic RL is a niche.'),
    gaps: b('需要维持的内部变量，以及由此产生的价值与自主目标。', 'Internal variables to maintain, and the values and autonomous goals that follow.'),
    directions: b('定义机器人内部变量（电量、温度、磨损），用稳态强化学习产生内在奖励。', 'Define robot internal variables (battery, temperature, wear) and derive intrinsic reward via homeostatic RL.'),
    cards: ['sys-homeostasis'], refs: ['keramati2014', 'craig2002'],
  },
  {
    id: 'action', pos: [4, 0], coverage: 2,
    name: b('动作选择与运动控制', 'Action selection & motor control'),
    brain: b('基底节选择动作，运动皮层下达指令，小脑实时校正，脊髓反射；最优反馈控制。', 'Basal ganglia select, motor cortex commands, cerebellum corrects in real time, spinal reflexes; optimal feedback control.'),
    ai: b('强化学习、模仿学习、MPC、视觉-语言-动作模型（RT-2）。', 'RL, imitation learning, MPC, vision-language-action models (RT-2).'),
    gaps: b('灵巧操作、快速适应、分层多速率控制、柔顺身体。', 'Dexterity, fast adaptation, multi-rate hierarchical control, compliant bodies.'),
    directions: b('大策略 + 小型在线“小脑”校正模块 + 局部反射层。', 'Large policy + small online “cerebellar” corrector + local reflex layer.'),
    cards: ['sys-motor', 'expansion'], refs: ['todorov2002', 'wolpert1998', 'brohan2023'],
  },
  {
    id: 'offline', pos: [1, 3], coverage: 1,
    name: b('睡眠与离线整理', 'Sleep & offline consolidation'),
    brain: b('NREM 回放与巩固、REM 重组、突触整体再归一化。', 'NREM replay and consolidation, REM recombination, global synaptic renormalisation.'),
    ai: b('经验回放、生成式回放、在想象中训练（Dreamer）、蒸馏。', 'Experience replay, generative replay, training in imagination (Dreamer), distillation.'),
    gaps: b('定期、自动的离线周期，以及“清理”与再归一化。', 'Regular automatic offline cycles, including cleanup and renormalisation.'),
    directions: b('机器人“睡眠周期”：回放、蒸馏、权重收缩、遗忘评估。', 'Robot sleep cycles: replay, distillation, weight shrinkage, forgetting checks.'),
    cards: ['sys-sleep', 'consolidation'], refs: ['tononi2014', 'wilson1994', 'shin2017'],
  },
  {
    id: 'lifelong', pos: [0, 3], coverage: 1,
    name: b('终身学习', 'Lifelong learning'),
    brain: b('多时间尺度的突触可塑性、三因子规则、结构可塑性、互补学习系统共同实现不遗忘的持续学习。', 'Multi-timescale synaptic plasticity, three-factor rules, structural plasticity and complementary learning systems together enable learning without forgetting.'),
    ai: b('EWC、Synaptic Intelligence、回放方法；大模型通常预训练后固定。', 'EWC, Synaptic Intelligence, replay methods; large models are usually frozen after pretraining.'),
    gaps: b('部署后的持续在线学习，同时不忘旧知识、不被污染。', 'Continuous online learning after deployment without forgetting or corruption.'),
    directions: b('离线反向传播 + 在线三因子学习的混合；参数级的可塑性状态。', 'Offline backprop + online three-factor hybrid; per-parameter plasticity states.'),
    cards: ['three-factor', 'consolidation', 'structural-plasticity', 'stdp'], refs: ['kirkpatrick2017', 'zenke2017', 'fremaux2016'],
  },
  {
    id: 'development', pos: [3, 3], coverage: 0,
    name: b('发育与先天结构', 'Development & innate structure'),
    brain: b('基因编码的连接蓝图和学习规则（Zador 2019）、关键期（Hensch 2005）、从简单到复杂的成长过程。', 'Genetically encoded wiring and learning rules (Zador 2019), critical periods (Hensch 2005), growth from simple to complex.'),
    ai: b('架构设计与预训练可视为“先天”；课程学习部分模仿发育。', 'Architecture design and pretraining act as the “innate” part; curriculum learning partly mimics development.'),
    gaps: b('压缩的先天先验（一个紧凑的“基因组”生成整个网络）、按阶段开放的可塑性。', 'Compressed innate priors (a compact “genome” generating the network), stage-wise opening of plasticity.'),
    directions: b('用小的“基因组网络”生成大网络的连接与学习规则；设计关键期式训练日程。', 'Use a small “genome network” to generate wiring and learning rules; design critical-period training schedules.'),
    cards: ['structural-plasticity'], refs: ['zador2019', 'hensch2005'],
  },
]

export const MODULE_BY_ID: Record<string, Module> = Object.fromEntries(MODULES.map((m) => [m.id, m]))

/** Cross-cutting differences between brains and today's AI (including where AI is ahead). */
export const DIFFERENCES: { dim: Bi; brain: Bi; ai: Bi }[] = [
  { dim: b('学习方式', 'Learning'), brain: b('终身、在线、少样本；局部规则 + 神经调质', 'Lifelong, online, few-shot; local rules + neuromodulators'), ai: b('离线大批量训练；反向传播；部署后基本固定', 'Offline large-batch training; backprop; mostly frozen after deployment') },
  { dim: b('计算方式', 'Computation'), brain: b('稀疏、事件驱动、异步、连续时间、循环为主', 'Sparse, event-driven, asynchronous, continuous-time, recurrent'), ai: b('稠密、时钟同步、以前馈为主', 'Dense, clocked, mostly feedforward') },
  { dim: b('基本单元', 'Units'), brain: b('有状态、有树突、有几十种类型的神经元；动态、随机的突触', 'Stateful neurons with dendrites and dozens of types; dynamic, stochastic synapses'), ai: b('无状态的同质单元；静态标量权重', 'Stateless uniform units; static scalar weights') },
  { dim: b('目标', 'Objectives'), brain: b('多个驱力、稳态需求和社会目标，没有单一损失函数', 'Multiple drives, homeostatic needs and social goals, no single loss'), ai: b('单一、外部给定的目标函数', 'A single externally specified objective') },
  { dim: b('数据', 'Data'), brain: b('自己通过行动采集，具身、主动、连续', 'Self-collected through action; embodied, active, continuous'), ai: b('被动的海量静态语料', 'Passive, massive, static corpora') },
  { dim: b('架构', 'Architecture'), brain: b('异质的专门系统 + 广播式神经调质 + 多时间尺度', 'Heterogeneous specialised systems + broadcast neuromodulation + many timescales'), ai: b('同质模块的大规模堆叠', 'Large stacks of uniform blocks') },
  { dim: b('能耗', 'Energy'), brain: b('约 20 W', '~20 W'), ai: b('训练与推理功耗高出许多个数量级', 'Many orders of magnitude more for training and inference') },
  { dim: b('维护', 'Maintenance'), brain: b('睡眠中回放、巩固、再归一化', 'Replay, consolidation and renormalisation in sleep'), ai: b('通常没有离线维护周期', 'Usually no offline maintenance cycle') },
  { dim: b('AI 领先之处', 'Where AI is ahead'), brain: b('记忆会遗忘和失真；速度慢；知识无法直接复制给他人', 'Memory fades and distorts; slow; knowledge cannot be copied to others'), ai: b('精确的大容量记忆、极高速度、权重可复制和共享、知识广度远超个人', 'Exact large memory, enormous speed, copyable/shareable weights, breadth of knowledge far beyond any person') },
]
