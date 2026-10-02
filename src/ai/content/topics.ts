import type { Bi } from '../../data/types'
import type { CrossTopic, MechGroup, Scale, Topic } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const sys = (biological: Bi, computational: Bi) => ({ biological, computational })

/** The functional topics of the first edition (docs/atlas-v1-plan.md), in directory order. */
export const TOPICS: Topic[] = [
  // D1 Perception & representation
  { id: 'visual-recognition', code: 'F01', name: b('视觉识别与场景理解', 'Visual recognition and scene understanding'),
    systems: sys(b('腹侧与背侧视觉通路', 'Ventral and dorsal streams'), b('CNN 与视觉 Transformer', 'CNNs and vision transformers')),
    legacy: 'sys-vision', tour: 'vision', mechanisms: ['M06', 'M07'] },
  { id: 'auditory-scene', code: 'F02', name: b('听觉与声场分析', 'Audition and auditory scene analysis'),
    systems: sys(b('听觉通路与听觉皮层', 'Auditory pathway and cortex'), b('语音识别与声源分离', 'Speech recognition and separation')),
    legacy: 'sys-hearing', tour: 'hearing', mechanisms: ['M05'] },
  { id: 'multisensory', code: 'F03', name: b('多感官整合', 'Multisensory integration'),
    systems: sys(b('多感官整合回路', 'Multisensory integration circuits'), b('多模态融合模型', 'Multimodal fusion models')),
    mechanisms: ['M06'] },

  // D2 Learning & adaptation
  { id: 'credit-assignment', code: 'F07', name: b('信用分配', 'Credit assignment'),
    systems: sys(b('资格迹与多巴胺可塑性', 'Eligibility traces and dopamine'), b('反向传播与时序差分', 'Backpropagation and TD learning')),
    mechanisms: ['M03'] },
  { id: 'meta-learning', code: 'F08', name: b('元学习与快速适应', 'Meta-learning and rapid adaptation'),
    systems: sys(b('前额叶的元强化学习', 'Prefrontal meta-reinforcement learning'), b('上下文学习与元学习', 'In-context and meta-learning')),
    mechanisms: ['M02'] },
  { id: 'continual-learning', code: 'F09', name: b('持续学习、干扰与可塑性', 'Continual learning, interference and plasticity'),
    systems: sys(b('突触巩固与互补学习', 'Consolidation and complementary learning'), b('回放、正则与参数隔离', 'Replay, regularization and isolation')),
    mechanisms: ['M03', 'M09'] },

  // D3 Memory & knowledge
  { id: 'working-memory', code: 'F11', name: b('工作记忆', 'Working memory'),
    systems: sys(b('前额叶工作记忆', 'Prefrontal working memory'), b('上下文窗口与循环状态', 'Context windows and recurrent state')),
    legacy: 'sys-memory', mechanisms: ['M02', 'M07'] },
  { id: 'episodic-memory', code: 'F12', name: b('情景记忆与联想检索', 'Episodic memory and associative retrieval'),
    systems: sys(b('海马情景记忆系统', 'Hippocampal episodic memory'), b('RAG 与外部记忆', 'RAG and external memory')),
    legacy: 'sys-memory', tour: 'memory', mechanisms: ['M07', 'M08'] },
  { id: 'consolidation-replay', code: 'F15', name: b('巩固、回放与遗忘', 'Consolidation, replay and forgetting'),
    systems: sys(b('睡眠回放与系统巩固', 'Sleep replay and consolidation'), b('经验回放与模型更新', 'Experience replay and updating')),
    mechanisms: ['M03'] },
  { id: 'cognitive-maps', code: 'F16', name: b('认知地图与关系记忆', 'Cognitive maps and relational memory'),
    systems: sys(b('海马认知地图', 'Hippocampal cognitive maps'), b('TEM 与 Transformer', 'TEM and transformers')),
    legacy: 'sys-memory', mechanisms: ['M07'] },

  // D4 Prediction, reasoning & planning
  { id: 'world-models', code: 'F17', name: b('世界模型与预测', 'World models and prediction'),
    systems: sys(b('皮层与小脑的预测', 'Cortical and cerebellar prediction'), b('学习型世界模型', 'Learned world models')),
    mechanisms: ['M07'] },
  { id: 'compositional-reasoning', code: 'F19', name: b('组合与关系推理', 'Compositional and relational reasoning'),
    systems: sys(b('人类组合推理', 'Human compositional reasoning'), b('MLC 与大语言模型', 'MLC and large language models')),
    mechanisms: ['M08'] },
  { id: 'planning', code: 'F20', name: b('规划与前瞻模拟', 'Planning and prospective simulation'),
    systems: sys(b('海马预演与前额叶规划', 'Hippocampal and prefrontal planning'), b('搜索与学习型规划', 'Search and learned planning')),
    mechanisms: [] },

  // D5 Attention & cognitive control
  { id: 'attention-gating', code: 'F22', name: b('注意选择与信息门控', 'Attentional selection and information gating'),
    systems: sys(b('选择性注意与丘脑门控', 'Selective attention and thalamic gating'), b('Transformer 注意力与路由', 'Transformer attention and routing')),
    legacy: 'sys-attention', tour: 'attention', mechanisms: ['M06'] },
  { id: 'metacognitive-monitoring', code: 'F24', name: b('元认知监测', 'Metacognitive monitoring'),
    systems: sys(b('前额叶的信心与错误监测', 'Prefrontal confidence and error monitoring'), b('模型置信度校准', 'Model confidence calibration')),
    mechanisms: [] },
  { id: 'metacognitive-control', code: 'F25', name: b('元认知调控', 'Metacognitive control'),
    systems: sys(b('基于信心的复核与求助', 'Confidence-driven checking and help seeking'), b('自我纠错与推理预算分配', 'Self-correction and reasoning budget allocation')),
    mechanisms: [] },

  // D6 Action & embodied interaction
  { id: 'motor-control', code: 'F26', name: b('运动控制与在线校正', 'Motor control and online correction'),
    systems: sys(b('小脑内部模型与脊髓反馈', 'Cerebellar internal models and spinal feedback'), b('机器人反馈控制与模型预测控制', 'Robot feedback control and model predictive control')),
    legacy: 'sys-motor', tour: 'motor', mechanisms: [] },
  { id: 'skill-learning', code: 'F27', name: b('技能获得与灵巧操作', 'Skill acquisition and dexterous manipulation'),
    systems: sys(b('基底节与运动皮层的技能学习', 'Skill learning in the basal ganglia and motor cortex'), b('视觉语言动作模型', 'Vision-language-action models')),
    legacy: 'sys-motor', mechanisms: ['M03'] },

  // D7 Value, motivation & regulation
  { id: 'reward-learning', code: 'F30', name: b('价值评估与奖赏学习', 'Valuation and reward learning'),
    systems: sys(b('多巴胺奖赏预测误差系统', 'Dopamine reward prediction error system'), b('时序差分与分布式强化学习', 'Temporal-difference and distributional reinforcement learning')),
    legacy: 'sys-reward', tour: 'reward', mechanisms: ['M03'] },
  { id: 'emotion-understanding', code: 'F32', name: b('情绪理解与表达', 'Emotion understanding and expression'),
    systems: sys(b('人类情绪识别与共情', 'Human emotion recognition and empathy'), b('情感计算与语言模型的情绪推断', 'Affective computing and emotion inference in language models')),
    mechanisms: [] },
  { id: 'emotion-regulation', code: 'F33', name: b('情绪状态与调节', 'Affective states and emotion regulation'),
    systems: sys(b('杏仁核与前额叶的情绪调节回路', 'Amygdala and prefrontal emotion regulation circuits'), b('智能体中的功能性情绪模型', 'Functional emotion models in agents')),
    legacy: 'sys-fear', tour: 'fear', mechanisms: [] },
  { id: 'interoception', code: 'F34', name: b('内感受与生理调节', 'Interoception and physiological regulation'),
    systems: sys(b('下丘脑与岛叶的内感受调节', 'Hypothalamic and insular interoceptive regulation'), b('稳态强化学习与机器人资源管理', 'Homeostatic reinforcement learning and robot resource management')),
    legacy: 'sys-homeostasis', tour: 'homeostasis', mechanisms: [] },

  // D8 Language & social cognition
  { id: 'language', code: 'F35', name: b('语言结构与意义', 'Language structure and meaning'),
    systems: sys(b('左半球语言网络', 'Left-hemisphere language network'), b('大语言模型', 'Large language models')),
    legacy: 'sys-language', tour: 'language', mechanisms: [] },
  { id: 'social-inference', code: 'F37', name: b('社会推断与他人模型', 'Social inference and models of others'),
    systems: sys(b('心智理论网络', 'Theory-of-mind network'), b('大语言模型的信念推断', 'Belief inference in large language models')),
    mechanisms: [] },

  // D9 Development & long-term organization
  { id: 'innate-constraints', code: 'F39', name: b('先天约束与学习起点', 'Innate constraints and learning starting points'),
    systems: sys(b('遗传与发育约束的初始结构', 'Genetically and developmentally constrained initial structure'), b('架构归纳偏置与预训练', 'Architectural inductive biases and pretraining')),
    mechanisms: ['M09'] },
  { id: 'developmental-stages', code: 'F40', name: b('发育阶段与学习顺序', 'Developmental stages and learning order'),
    systems: sys(b('关键期与婴儿发育', 'Critical periods and infant development'), b('课程学习与分阶段训练', 'Curriculum learning and staged training')),
    mechanisms: ['M09'] },
]

export const SCALES: { id: Scale; name: Bi }[] = [
  { id: 'synapse', name: b('突触', 'Synapses') },
  { id: 'neuron', name: b('神经元', 'Neurons') },
  { id: 'circuit', name: b('微环路', 'Microcircuits') },
  { id: 'cross', name: b('跨尺度', 'Across scales') },
]

/** The scale index: the old layer 1 to 3 cards, grouped by mechanism. */
export const MECH_GROUPS: MechGroup[] = [
  { id: 'M01', scale: 'synapse', name: b('突触传递与连接参数', 'Synaptic transmission and connection parameters'), cards: ['synapse-weight'] },
  { id: 'M02', scale: 'synapse', name: b('短时状态与快速权重', 'Short-term state and fast weights'), cards: ['short-term-plasticity'] },
  { id: 'M03', scale: 'synapse', name: b('可塑性与学习信号', 'Plasticity and learning signals'), cards: ['stdp', 'three-factor', 'consolidation'] },
  { id: 'M04', scale: 'neuron', name: b('神经元动力学与树突计算', 'Neuron dynamics and dendritic computation'), cards: ['neuron-models', 'dendrites'] },
  { id: 'M05', scale: 'neuron', name: b('脉冲、时间编码与随机性', 'Spikes, temporal coding and stochasticity'), cards: ['spikes', 'noise'] },
  { id: 'M06', scale: 'circuit', name: b('兴奋抑制、归一化与门控', 'Excitation, inhibition, normalization and gating'), cards: ['ei-celltypes', 'normalization'] },
  { id: 'M07', scale: 'circuit', name: b('循环动力学与吸引子', 'Recurrent dynamics and attractors'), cards: ['attractors', 'feedback-predictive'] },
  { id: 'M08', scale: 'circuit', name: b('群体表征与扩展编码', 'Population codes and expansion coding'), cards: ['expansion', 'energy-sparsity'] },
  { id: 'M09', scale: 'cross', name: b('结构、调制与支持过程', 'Structure, modulation and support processes'), cards: ['structural-plasticity', 'glia'] },
]

export const CROSS_TOPICS: CrossTopic[] = [
  { id: 'X01', name: b('睡眠、觉醒与离线处理', 'Sleep, arousal and offline processing'),
    desc: b('回放、巩固、节律和生理调节在睡眠中如何配合，以及离线训练能借鉴到什么程度。', 'How replay, consolidation, rhythms and physiological regulation work together in sleep, and how far offline training compares.'),
    legacy: 'sys-sleep' },
  { id: 'X02', name: b('效率、资源与物理实现', 'Efficiency, resources and physical implementation'),
    desc: b('能耗、时间、存储、精度与任务表现之间的取舍，区分训练与推理、大脑与设备的测量边界。', 'Trade-offs between energy, time, storage, precision and task performance, with the measurement limits of training versus inference and brains versus devices.') },
  { id: 'X03', name: b('类人智能体蓝图', 'Blueprint for a humanlike agent'),
    desc: b('一个完整的智能体需要哪些模块，当今 AI 在每个模块上的覆盖程度与缺口。', 'The modules a complete agent needs, and how well today’s AI covers each one.'),
    route: '/ai/blueprint' },
]

export const TOPIC_BY_ID: Record<string, Topic> = Object.fromEntries(TOPICS.map((t) => [t.id, t]))
export const MECH_BY_ID: Record<string, MechGroup> = Object.fromEntries(MECH_GROUPS.map((m) => [m.id, m]))
/** The mechanism group a card belongs to, if it is a mechanism entry. */
export const mechOfCard = (cardId: string) => MECH_GROUPS.find((m) => m.cards.includes(cardId))
/** Topics that link to a mechanism group. */
export const topicsOfMech = (mechId: string) => TOPICS.filter((t) => t.mechanisms.includes(mechId))
