import type { Bi } from '../../data/types'
import type { CrossTopic, MechGroup, Topic } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const sys = (biological: Bi, computational: Bi) => ({ biological, computational })

/** The functional topics of the first edition (docs/atlas-v1-plan.md), in directory order. */
export const TOPICS: Topic[] = [
  // D1 Perception & representation
  { id: 'visual-recognition', code: 'F01', name: b('视觉识别与场景理解', 'Visual recognition and scene understanding'),
    systems: sys(b('腹侧与背侧视觉通路', 'Ventral and dorsal streams'), b('CNN 与 ViT', 'CNNs and ViTs')),
    legacy: 'sys-vision', tour: 'vision' },
  { id: 'auditory-scene', code: 'F02', name: b('听觉与声场分析', 'Audition and auditory scene analysis'),
    systems: sys(b('听觉通路与听觉皮层', 'Auditory pathway and cortex'), b('语音识别与声源分离', 'Speech recognition and separation')),
    legacy: 'sys-hearing', tour: 'hearing' },
  { id: 'multisensory', code: 'F03', name: b('多感官整合', 'Multisensory integration'),
    systems: sys(b('多感官整合回路', 'Multisensory integration circuits'), b('多模态融合模型', 'Multimodal fusion models')) },

  // D2 Learning & adaptation
  { id: 'credit-assignment', code: 'F07', name: b('信用分配', 'Credit assignment'),
    systems: sys(b('资格迹与多巴胺可塑性', 'Eligibility traces and dopamine'), b('反向传播与时序差分', 'Backpropagation and TD learning')) },
  { id: 'meta-learning', code: 'F08', name: b('元学习与快速适应', 'Meta-learning and rapid adaptation'),
    systems: sys(b('前额叶的元强化学习', 'Prefrontal meta-reinforcement learning'), b('上下文学习与元学习', 'In-context and meta-learning')) },
  { id: 'continual-learning', code: 'F09', name: b('持续学习、干扰与可塑性', 'Continual learning, interference and plasticity'),
    systems: sys(b('突触巩固与互补学习', 'Consolidation and complementary learning'), b('回放、正则与参数隔离', 'Replay, regularization and isolation')) },

  // D3 Memory & knowledge
  { id: 'working-memory', code: 'F11', name: b('工作记忆', 'Working memory'),
    systems: sys(b('前额叶工作记忆', 'Prefrontal working memory'), b('上下文窗口与循环状态', 'Context windows and recurrent state')),
    legacy: 'sys-memory' },
  { id: 'episodic-memory', code: 'F12', name: b('情景记忆与联想检索', 'Episodic memory and associative retrieval'),
    systems: sys(b('海马情景记忆系统', 'Hippocampal episodic memory'), b('RAG 与外部记忆', 'RAG and external memory')),
    legacy: 'sys-memory', tour: 'memory' },
  { id: 'consolidation-replay', code: 'F15', name: b('巩固、回放与遗忘', 'Consolidation, replay and forgetting'),
    systems: sys(b('睡眠回放与系统巩固', 'Sleep replay and consolidation'), b('经验回放与模型更新', 'Experience replay and updating')) },
  { id: 'cognitive-maps', code: 'F16', name: b('认知地图与关系记忆', 'Cognitive maps and relational memory'),
    systems: sys(b('海马认知地图', 'Hippocampal cognitive maps'), b('TEM 与 Transformer', 'TEM and transformers')),
    legacy: 'sys-memory' },

  // D4 Prediction, reasoning & planning
  { id: 'world-models', code: 'F17', name: b('世界模型与预测', 'World models and prediction'),
    systems: sys(b('皮层与小脑的预测', 'Cortical and cerebellar prediction'), b('学习型世界模型', 'Learned world models')) },
  { id: 'compositional-reasoning', code: 'F19', name: b('组合与关系推理', 'Compositional and relational reasoning'),
    systems: sys(b('人类组合推理', 'Human compositional reasoning'), b('MLC 与大语言模型', 'MLC and large language models')) },
  { id: 'planning', code: 'F20', name: b('规划与前瞻模拟', 'Planning and prospective simulation'),
    systems: sys(b('海马预演与前额叶规划', 'Hippocampal and prefrontal planning'), b('搜索与学习型规划', 'Search and learned planning')) },

  // D5 Attention & cognitive control
  { id: 'attention-gating', code: 'F22', name: b('注意选择与信息门控', 'Attentional selection and information gating'),
    systems: sys(b('选择性注意与丘脑门控', 'Selective attention and thalamic gating'), b('Transformer 注意力与路由', 'Transformer attention and routing')),
    legacy: 'sys-attention', tour: 'attention' },
  { id: 'metacognitive-monitoring', code: 'F24', name: b('元认知监测', 'Metacognitive monitoring'),
    systems: sys(b('信心与错误监测', 'Confidence and error monitoring'), b('模型置信度校准', 'Model confidence calibration')) },
  { id: 'metacognitive-control', code: 'F25', name: b('元认知调控', 'Metacognitive control'),
    systems: sys(b('基于信心的复核与求助', 'Confidence-guided checking'), b('自我纠错与推理预算', 'Self-correction and reasoning budgets')) },

  // D6 Action & embodied interaction
  { id: 'motor-control', code: 'F26', name: b('运动控制与在线校正', 'Motor control and online correction'),
    systems: sys(b('小脑内部模型与脊髓反馈', 'Cerebellar models and spinal feedback'), b('机器人反馈控制与 MPC', 'Robot feedback control and MPC')),
    legacy: 'sys-motor', tour: 'motor' },
  { id: 'skill-learning', code: 'F27', name: b('技能获得与灵巧操作', 'Skill acquisition and dexterous manipulation'),
    systems: sys(b('运动技能学习', 'Motor skill learning'), b('VLA 模型', 'VLA models')),
    legacy: 'sys-motor' },

  // D7 Value, motivation & regulation
  { id: 'reward-learning', code: 'F30', name: b('价值评估与奖赏学习', 'Valuation and reward learning'),
    systems: sys(b('多巴胺奖赏预测误差', 'Dopamine prediction errors'), b('时序差分与分布式强化学习', 'TD and distributional RL')),
    legacy: 'sys-reward', tour: 'reward' },
  { id: 'emotion-understanding', code: 'F32', name: b('情绪理解与表达', 'Emotion understanding and expression'),
    systems: sys(b('情绪识别与共情', 'Emotion recognition and empathy'), b('情感计算与语言模型', 'Affective computing and LLMs')) },
  { id: 'emotion-regulation', code: 'F33', name: b('情绪状态与调节', 'Affective states and emotion regulation'),
    systems: sys(b('杏仁核与前额叶调节', 'Amygdala and prefrontal regulation'), b('功能性情绪模型', 'Functional emotion models')),
    legacy: 'sys-fear', tour: 'fear' },
  { id: 'interoception', code: 'F34', name: b('内感受与生理调节', 'Interoception and physiological regulation'),
    systems: sys(b('下丘脑与岛叶的调节', 'Hypothalamic and insular regulation'), b('稳态强化学习与资源管理', 'Homeostatic RL and resource management')),
    legacy: 'sys-homeostasis', tour: 'homeostasis' },

  // D8 Language & social cognition
  { id: 'language', code: 'F35', name: b('语言结构与意义', 'Language structure and meaning'),
    systems: sys(b('左半球语言网络', 'Left-hemisphere language network'), b('大语言模型', 'Large language models')),
    legacy: 'sys-language', tour: 'language' },
  { id: 'social-inference', code: 'F37', name: b('社会推断与他人模型', 'Social inference and models of others'),
    systems: sys(b('心智理论网络', 'Theory-of-mind network'), b('大语言模型的信念推断', 'Belief inference in LLMs')) },

  // D9 Development & long-term organization
  { id: 'innate-constraints', code: 'F39', name: b('先天约束与学习起点', 'Innate constraints and learning starting points'),
    systems: sys(b('先天的初始结构', 'Innate initial structure'), b('归纳偏置与预训练', 'Inductive biases and pretraining')) },
  { id: 'developmental-stages', code: 'F40', name: b('发育阶段与学习顺序', 'Developmental stages and learning order'),
    systems: sys(b('关键期与婴儿发育', 'Critical periods and infant development'), b('课程学习与分阶段训练', 'Curricula and staged training')) },
]

/** The mechanism index: 17 entries in five groups by what they compute; each entry is numbered M01 to M17 in this order. */
export const MECH_GROUPS: MechGroup[] = [
  { id: 'connection', name: b('连接与传递', 'Connections and transmission'),
    desc: b('信号怎样经过一个连接传到下一个细胞，连接本身怎样生成、变化和被维护。对应 AI 中的权重与连接结构。', 'How a signal crosses a connection to the next cell, and how connections themselves form, change and are maintained. In AI terms, weights and wiring.'),
    cards: ['synapse-weight', 'short-term-plasticity', 'structural-plasticity', 'glia'] },
  { id: 'learning', name: b('学习规则', 'Learning rules'),
    desc: b('突触按什么信号改变，改变怎样保留下来。对应 AI 中的训练与参数更新。', 'Which signals make synapses change, and how the changes are kept. In AI terms, training and parameter updates.'),
    cards: ['stdp', 'three-factor', 'consolidation'] },
  { id: 'neuron', name: b('单个神经元', 'Single neurons'),
    desc: b('一个神经元怎样整合输入、产生脉冲，信息怎样编码在脉冲里。对应 AI 中的单元与激活函数。', 'How one neuron integrates input and fires, and how information is coded in spikes. In AI terms, units and activation functions.'),
    cards: ['neuron-models', 'dendrites', 'spikes'] },
  { id: 'circuit', name: b('回路运算', 'Circuit computations'),
    desc: b('一群相连的神经元共同完成的运算：平衡、归一化、保持与预测。对应 AI 中的层内运算与网络结构。', 'Operations a group of connected neurons performs together: balance, normalization, holding and prediction. In AI terms, operations within layers and network structure.'),
    cards: ['ei-celltypes', 'normalization', 'attractors', 'feedback-predictive'] },
  { id: 'population', name: b('群体编码', 'Population codes'),
    desc: b('信息怎样分布在许多神经元的活动中，噪声怎样限制它。对应 AI 中的表征。', 'How information is spread over the activity of many neurons, and how noise limits it. In AI terms, representations.'),
    cards: ['expansion', 'energy-sparsity', 'noise'] },
]

export const CROSS_TOPICS: CrossTopic[] = [
  { id: 'sleep-offline', code: 'X01', name: b('睡眠、觉醒与离线处理', 'Sleep, arousal and offline processing'),
    desc: b('回放、巩固、节律和生理调节在睡眠中如何配合，以及离线训练能借鉴到什么程度。', 'How replay, consolidation, rhythms and physiological regulation work together in sleep, and how far offline training compares.'),
    systems: sys(b('睡眠觉醒周期', 'Sleep and wake cycle'), b('离线训练阶段', 'Offline training phases')),
    legacy: 'sys-sleep', tour: 'sleep',
    topics: ['consolidation-replay', 'continual-learning', 'interoception', 'attention-gating'] },
  { id: 'efficiency', code: 'X02', name: b('效率、资源与物理实现', 'Efficiency, resources and physical implementation'),
    desc: b('能耗、时间、存储、精度与任务表现之间的取舍，区分训练与推理、大脑与设备的测量边界。', 'Trade-offs between energy, time, storage, precision and task performance, with the measurement limits of training versus inference and brains versus devices.'),
    systems: sys(b('大脑的能量预算', 'The brain’s energy budget'), b('GPU 与神经形态芯片', 'GPUs and neuromorphic chips')),
    topics: ['attention-gating', 'language', 'continual-learning'] },
  { id: 'agent-blueprint', code: 'X03', name: b('类人智能体蓝图', 'Blueprint for a humanlike agent'),
    desc: b('一个完整的智能体需要哪些模块，大脑怎样协调它们，当今 LLM 智能体有哪些对应部分和缺口。', 'The modules a complete agent needs, how the brain coordinates them, and what today’s LLM agents have and lack.'),
    systems: sys(b('大脑整体功能架构', 'Whole-brain functional architecture'), b('LLM 智能体架构', 'LLM agent architectures')),
    topics: ['working-memory', 'episodic-memory', 'world-models', 'planning', 'metacognitive-control', 'reward-learning', 'interoception', 'motor-control'] },
]

/** Functional and cross-domain topics by id: both open on the topic page once written. */
export const TOPIC_BY_ID: Record<string, Topic> = Object.fromEntries([...TOPICS, ...CROSS_TOPICS].map((t) => [t.id, t]))
/** The mechanism group a card belongs to, if it is a mechanism entry. */
export const mechOfCard = (cardId: string) => MECH_GROUPS.find((m) => m.cards.includes(cardId))
