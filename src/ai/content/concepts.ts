import type { Bi } from '../../data/types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Where an AI concept is compared with the brain: a topic page or a mechanism card, and the brain side it meets there. */
export interface ConceptLink {
  /** `topic:<id>` or `card:<id>` */
  to: string
  brain: Bi
}

/** An AI concept as practitioners name it. Every linked page mentions the term or one of its other names (tests/content.test.ts). */
export interface AiConcept {
  id: string
  term: Bi
  /** other names and spellings, used for search and by that test */
  aka: string[]
  links: ConceptLink[]
}

export interface ConceptGroup {
  id: string
  name: Bi
  concepts: AiConcept[]
}

/** The AI concept index: an entry into the atlas in the vocabulary of AI work, grouped by area. */
export const CONCEPT_GROUPS: ConceptGroup[] = [
  {
    id: 'architecture', name: b('网络架构', 'Architectures'),
    concepts: [
      { id: 'attention', term: b('自注意力（Transformer）', 'Self-attention (Transformer)'), aka: ['注意力', 'attention', 'Transformer'], links: [
        { to: 'topic:attention-gating', brain: b('选择性注意与丘脑门控', 'Selective attention and thalamic gating') },
        { to: 'topic:working-memory', brain: b('前额叶工作记忆', 'Prefrontal working memory') },
        { to: 'card:attractors', brain: b('吸引子网络与联想记忆', 'Attractor networks and associative memory') },
      ] },
      { id: 'moe', term: b('混合专家（MoE）', 'Mixture of experts (MoE)'), aka: ['MoE', '混合专家'], links: [
        { to: 'topic:attention-gating', brain: b('丘脑对感觉通道的选择', 'Thalamic selection of sensory channels') },
        { to: 'card:energy-sparsity', brain: b('稀疏编码与能耗', 'Sparse coding and energy') },
      ] },
      { id: 'cnn', term: b('卷积网络（CNN）', 'Convolutional networks (CNNs)'), aka: ['CNN', '卷积'], links: [
        { to: 'topic:visual-recognition', brain: b('腹侧视觉通路', 'The ventral visual stream') },
        { to: 'topic:innate-constraints', brain: b('先天的初始结构', 'Innate initial structure') },
      ] },
      { id: 'vit', term: b('ViT', 'ViT'), aka: ['ViT', '视觉 Transformer', 'vision transformer'], links: [
        { to: 'topic:visual-recognition', brain: b('腹侧通路中逐级变大的感受野', 'Receptive fields that grow along the ventral stream') },
      ] },
      { id: 'lstm', term: b('LSTM 与门控循环网络', 'LSTMs and gated recurrent networks'), aka: ['LSTM', '门控', 'gating'], links: [
        { to: 'topic:working-memory', brain: b('基底节闸门与前额叶持续活动', 'Basal ganglia gating and prefrontal persistent activity') },
        { to: 'card:dendrites', brain: b('树突计算', 'Dendritic computation') },
      ] },
      { id: 'ssm', term: b('状态空间模型（Mamba）', 'State-space models (Mamba)'), aka: ['Mamba', '状态空间', 'state-space'], links: [
        { to: 'card:neuron-models', brain: b('神经元的膜电位动力学', 'Membrane dynamics of neurons') },
      ] },
      { id: 'normalization', term: b('Softmax 与 LayerNorm', 'Softmax and LayerNorm'), aka: ['Softmax', 'LayerNorm', '归一化', 'normalization'], links: [
        { to: 'card:normalization', brain: b('除法归一化与侧抑制', 'Divisive normalization and lateral inhibition') },
        { to: 'topic:attention-gating', brain: b('注意的归一化模型', 'The normalization model of attention') },
      ] },
      { id: 'ffn', term: b('前馈层与随机特征', 'Feedforward layers and random features'), aka: ['前馈层', '随机特征', 'FFN', 'random features'], links: [
        { to: 'card:expansion', brain: b('小脑颗粒细胞的扩展编码', 'Expansion coding by cerebellar granule cells') },
      ] },
      { id: 'dropout', term: b('Dropout 与随机采样', 'Dropout and sampling'), aka: ['Dropout', '采样', 'sampling'], links: [
        { to: 'card:noise', brain: b('神经活动的噪声与随机性', 'Noise and stochasticity in neural activity') },
      ] },
      { id: 'snn', term: b('脉冲神经网络（SNN）', 'Spiking neural networks (SNNs)'), aka: ['脉冲神经网络', 'spiking', 'SNN'], links: [
        { to: 'card:spikes', brain: b('脉冲与时间编码', 'Spikes and temporal coding') },
      ] },
      { id: 'hopfield', term: b('现代 Hopfield 网络', 'Modern Hopfield networks'), aka: ['Hopfield'], links: [
        { to: 'topic:episodic-memory', brain: b('海马 CA3 的模式补全', 'Pattern completion in hippocampal CA3') },
        { to: 'card:attractors', brain: b('吸引子网络与联想记忆', 'Attractor networks and associative memory') },
      ] },
    ],
  },
  {
    id: 'training', name: b('训练与优化', 'Training and optimization'),
    concepts: [
      { id: 'backprop', term: b('反向传播', 'Backpropagation'), aka: ['反向传播', 'backprop'], links: [
        { to: 'topic:credit-assignment', brain: b('资格迹与多巴胺：三因子学习', 'Eligibility traces and dopamine: three-factor learning') },
        { to: 'card:three-factor', brain: b('三因子学习与信用分配', 'Three-factor learning and credit assignment') },
      ] },
      { id: 'hebbian', term: b('局部学习规则（Hebb）', 'Local learning rules (Hebbian)'), aka: ['Hebb', '赫布', 'STDP'], links: [
        { to: 'card:stdp', brain: b('Hebb 学习与 STDP', 'Hebbian learning and STDP') },
        { to: 'topic:episodic-memory', brain: b('CA3 中一次写入的赫布学习', 'One-shot Hebbian storage in CA3') },
      ] },
      { id: 'pretraining', term: b('预训练', 'Pretraining'), aka: ['预训练', 'pretraining', 'pretrained'], links: [
        { to: 'topic:innate-constraints', brain: b('进化与发育给出的先天结构', 'Innate structure from evolution and development') },
        { to: 'topic:meta-learning', brain: b('多巴胺驱动的慢速学习', 'Slow dopamine-driven learning') },
        { to: 'topic:language', brain: b('儿童的语言习得', 'Language acquisition in children') },
      ] },
      { id: 'finetuning', term: b('微调与 LoRA', 'Fine-tuning and LoRA'), aka: ['微调', 'LoRA', 'fine-tun'], links: [
        { to: 'topic:continual-learning', brain: b('新皮层的缓慢整合', 'Slow integration in the neocortex') },
        { to: 'topic:innate-constraints', brain: b('经验在先天框架上的调整', 'Experience tuning an innate framework') },
      ] },
      { id: 'staged', term: b('分阶段训练', 'Staged training'), aka: ['指令微调', 'instruction tuning'], links: [
        { to: 'topic:developmental-stages', brain: b('婴儿发育的阶段与关键期', 'Stages of infant development and critical periods') },
      ] },
      { id: 'curriculum', term: b('课程学习', 'Curriculum learning'), aka: ['课程', 'curriculum'], links: [
        { to: 'topic:developmental-stages', brain: b('发育顺序与「从小处开始」', 'Developmental order and starting small') },
      ] },
      { id: 'lr-schedule', term: b('学习率调度', 'Learning rate schedules'), aka: ['学习率', 'learning rate'], links: [
        { to: 'topic:developmental-stages', brain: b('随年龄下降的可塑性', 'Plasticity that declines with age') },
        { to: 'topic:meta-learning', brain: b('随环境变化调节的学习率', 'A learning rate tuned to environmental change') },
      ] },
      { id: 'pruning', term: b('剪枝与稀疏训练', 'Pruning and sparse training'), aka: ['剪枝', 'pruning', '稀疏训练'], links: [
        { to: 'card:structural-plasticity', brain: b('突触的生长与修剪', 'Synapse growth and pruning') },
      ] },
      { id: 'contrastive', term: b('对比学习（CLIP）', 'Contrastive learning (CLIP)'), aka: ['对比', 'CLIP', 'contrastive'], links: [
        { to: 'topic:multisensory', brain: b('联合皮层中的多感官表示', 'Multisensory representations in association cortex') },
      ] },
      { id: 'scaling', term: b('缩放定律', 'Scaling laws'), aka: ['规模定律', '幂律', 'scaling', 'power law'], links: [
        { to: 'topic:language', brain: b('儿童用少得多的语言学会说话', 'Children learning language from far less input') },
        { to: 'topic:skill-learning', brain: b('练习的幂律', 'The power law of practice') },
      ] },
      { id: 'inductive-bias', term: b('归纳偏置', 'Inductive bias'), aka: ['归纳偏置', 'inductive bias'], links: [
        { to: 'topic:innate-constraints', brain: b('基因组压缩的先天规则', 'Innate rules compressed in the genome') },
      ] },
      { id: 'fast-weights', term: b('快权重与线性注意力', 'Fast weights and linear attention'), aka: ['快权重', '线性注意力', 'fast weights'], links: [
        { to: 'card:short-term-plasticity', brain: b('短时可塑性', 'Short-term plasticity') },
      ] },
    ],
  },
  {
    id: 'rl', name: b('强化学习', 'Reinforcement learning'),
    concepts: [
      { id: 'td', term: b('时序差分学习', 'Temporal difference learning'), aka: ['时序差分', 'temporal difference', 'TD'], links: [
        { to: 'topic:reward-learning', brain: b('多巴胺奖赏预测误差', 'Dopamine reward prediction errors') },
        { to: 'topic:credit-assignment', brain: b('资格迹', 'Eligibility traces') },
      ] },
      { id: 'actor-critic', term: b('行动者与评论家', 'Actor-critic'), aka: ['行动者', '评论家', 'actor', 'critic'], links: [
        { to: 'topic:reward-learning', brain: b('纹状体的价值估计与动作选择', 'Value estimation and action selection in the striatum') },
      ] },
      { id: 'distributional', term: b('分布式强化学习', 'Distributional RL'), aka: ['分布式', 'distributional'], links: [
        { to: 'topic:reward-learning', brain: b('乐观与悲观的多巴胺神经元', 'Optimistic and pessimistic dopamine neurons') },
      ] },
      { id: 'replay', term: b('经验回放与优先回放', 'Experience replay and prioritized replay'), aka: ['经验回放', '优先', 'replay'], links: [
        { to: 'topic:consolidation-replay', brain: b('睡眠中的海马回放', 'Hippocampal replay in sleep') },
        { to: 'topic:continual-learning', brain: b('新旧内容的交错学习', 'Interleaving old and new learning') },
      ] },
      { id: 'reward-hacking', term: b('奖励设计与奖励黑客', 'Reward design and reward hacking'), aka: ['钻空子', '奖励函数', 'reward function'], links: [
        { to: 'topic:reward-learning', brain: b('随身体状态变化的价值', 'Value that changes with bodily state') },
      ] },
      { id: 'rlhf', term: b('人类反馈强化学习（RLHF）', 'RL from human feedback (RLHF)'), aka: ['人类反馈强化学习', 'RLHF', 'human feedback'], links: [
        { to: 'topic:reward-learning', brain: b('多巴胺奖赏学习', 'Dopamine reward learning') },
        { to: 'topic:developmental-stages', brain: b('发育中的社会反馈与阶段', 'Social feedback and stages in development') },
      ] },
      { id: 'homeostatic-rl', term: b('稳态强化学习', 'Homeostatic RL'), aka: ['稳态强化学习', 'homeostatic'], links: [
        { to: 'topic:interoception', brain: b('下丘脑的设定点与驱力', 'Hypothalamic set points and drives') },
      ] },
      { id: 'risk-rl', term: b('风险敏感强化学习（CVaR）', 'Risk-sensitive RL (CVaR)'), aka: ['CVaR', '风险', 'risk'], links: [
        { to: 'topic:emotion-regulation', brain: b('杏仁核驱动的防御状态', 'Amygdala-driven defensive states') },
      ] },
      { id: 'meta-rl', term: b('元强化学习', 'Meta-RL'), aka: ['元强化学习', 'meta-RL'], links: [
        { to: 'topic:meta-learning', brain: b('前额叶的元强化学习', 'Prefrontal meta-RL') },
      ] },
      { id: 'maml', term: b('MAML 与元学习', 'MAML and meta-learning'), aka: ['MAML', '元学习', 'meta-learning'], links: [
        { to: 'topic:meta-learning', brain: b('学会怎么学（学习定势）', 'Learning to learn (learning sets)') },
      ] },
    ],
  },
  {
    id: 'memory', name: b('记忆与上下文', 'Memory and context'),
    concepts: [
      { id: 'context-window', term: b('上下文窗口与 KV 缓存', 'Context windows and the KV cache'), aka: ['KV 缓存', '上下文窗口', 'KV cache', 'context window'], links: [
        { to: 'topic:working-memory', brain: b('前额叶工作记忆', 'Prefrontal working memory') },
      ] },
      { id: 'long-context', term: b('长上下文与中段丢失', 'Long context and lost in the middle'), aka: ['中段丢失', '长上下文', 'long context'], links: [
        { to: 'topic:working-memory', brain: b('工作记忆的容量与抗干扰', 'Capacity and interference resistance in working memory') },
        { to: 'topic:attention-gating', brain: b('注意的容量限制', 'The capacity limit of attention') },
      ] },
      { id: 'rag', term: b('检索增强生成（RAG）', 'Retrieval-augmented generation (RAG)'), aka: ['RAG', '向量库', 'vector'], links: [
        { to: 'topic:episodic-memory', brain: b('海马情景记忆', 'Hippocampal episodic memory') },
      ] },
      { id: 'icl', term: b('上下文学习', 'In-context learning'), aka: ['上下文学习', 'in-context'], links: [
        { to: 'topic:meta-learning', brain: b('前额叶活动中的快速学习', 'Fast learning in prefrontal activity') },
      ] },
      { id: 'forgetting', term: b('灾难性遗忘与持续学习', 'Catastrophic forgetting and continual learning'), aka: ['灾难性遗忘', '持续学习', 'catastrophic'], links: [
        { to: 'topic:continual-learning', brain: b('突触巩固与互补学习系统', 'Synaptic consolidation and complementary learning systems') },
        { to: 'card:consolidation', brain: b('突触巩固', 'Synaptic consolidation') },
      ] },
      { id: 'ewc', term: b('EWC 与参数正则化', 'EWC and parameter regularization'), aka: ['EWC'], links: [
        { to: 'topic:continual-learning', brain: b('重要突触的巩固', 'Consolidation of important synapses') },
        { to: 'card:consolidation', brain: b('突触巩固', 'Synaptic consolidation') },
      ] },
      { id: 'unlearning', term: b('机器遗忘', 'Machine unlearning'), aka: ['机器遗忘', 'unlearning'], links: [
        { to: 'topic:consolidation-replay', brain: b('主动遗忘与睡眠中的突触下调', 'Active forgetting and synaptic downscaling in sleep') },
      ] },
    ],
  },
  {
    id: 'reasoning', name: b('推理、规划与世界模型', 'Reasoning, planning and world models'),
    concepts: [
      { id: 'cot', term: b('思维链与推理模型', 'Chain of thought and reasoning models'), aka: ['思维链', '推理模型', 'chain of thought', 'reasoning model'], links: [
        { to: 'topic:metacognitive-control', brain: b('基于信心的复核', 'Confidence-driven checking') },
        { to: 'topic:planning', brain: b('海马预演与前额叶规划', 'Hippocampal preplay and prefrontal planning') },
      ] },
      { id: 'test-time', term: b('测试时计算与推理预算', 'Test-time compute and reasoning budgets'), aka: ['推理预算', '推理时的计算', 'reasoning budget'], links: [
        { to: 'topic:metacognitive-control', brain: b('控制的期望价值：值不值得多花力气', 'The expected value of control: whether more effort is worth it') },
      ] },
      { id: 'self-consistency', term: b('自一致性投票', 'Self-consistency voting'), aka: ['自一致性', 'self-consistency'], links: [
        { to: 'topic:metacognitive-control', brain: b('复查与重做', 'Rechecking and redoing') },
      ] },
      { id: 'self-correction', term: b('自我纠错与反思', 'Self-correction and reflection'), aka: ['自我纠错', '自我检查', 'self-correction'], links: [
        { to: 'topic:metacognitive-control', brain: b('错误后减速与复核', 'Post-error slowing and checking') },
      ] },
      { id: 'mcts', term: b('蒙特卡洛树搜索（AlphaZero、MuZero）', 'Monte Carlo tree search (AlphaZero, MuZero)'), aka: ['AlphaZero', 'MuZero', '树搜索', 'tree search'], links: [
        { to: 'topic:planning', brain: b('海马预演与剪枝', 'Hippocampal preplay and pruning') },
      ] },
      { id: 'world-model', term: b('世界模型（Dreamer）', 'World models (Dreamer)'), aka: ['世界模型', 'Dreamer', 'world model'], links: [
        { to: 'topic:world-models', brain: b('小脑前向模型与皮层预测', 'Cerebellar forward models and cortical prediction') },
        { to: 'topic:consolidation-replay', brain: b('睡眠回放', 'Sleep replay') },
      ] },
      { id: 'jepa', term: b('JEPA 与预测表示学习', 'JEPA and predictive representation learning'), aka: ['JEPA'], links: [
        { to: 'card:feedback-predictive', brain: b('反馈连接与预测编码', 'Feedback connections and predictive coding') },
        { to: 'topic:world-models', brain: b('皮层的预测编码', 'Predictive coding in cortex') },
      ] },
      { id: 'video-gen', term: b('视频生成模型', 'Video generation models'), aka: ['视频生成', 'video generation'], links: [
        { to: 'topic:world-models', brain: b('物理直觉', 'Intuitive physics') },
      ] },
      { id: 'compositional', term: b('组合泛化（MLC）', 'Compositional generalization (MLC)'), aka: ['MLC', '组合', 'compositional'], links: [
        { to: 'topic:compositional-reasoning', brain: b('人类的系统性组合', 'Human systematic composition') },
      ] },
      { id: 'positional', term: b('位置编码与 TEM', 'Positional encoding and TEM'), aka: ['位置编码', 'TEM', 'positional'], links: [
        { to: 'topic:cognitive-maps', brain: b('网格细胞与位置细胞', 'Grid cells and place cells') },
      ] },
      { id: 'mpc', term: b('模型预测控制（MPC）', 'Model predictive control (MPC)'), aka: ['MPC'], links: [
        { to: 'topic:motor-control', brain: b('小脑内部模型与最优反馈控制', 'Cerebellar internal models and optimal feedback control') },
      ] },
    ],
  },
  {
    id: 'reliability', name: b('可靠性与评测', 'Reliability and evaluation'),
    concepts: [
      { id: 'calibration', term: b('置信度校准（温度缩放、ECE）', 'Confidence calibration (temperature scaling, ECE)'), aka: ['校准', '温度缩放', 'calibration'], links: [
        { to: 'topic:metacognitive-monitoring', brain: b('信心与元认知监测', 'Confidence and metacognitive monitoring') },
      ] },
      { id: 'abstention', term: b('拒答与选择性回答', 'Abstention and selective prediction'), aka: ['拒答', '选择性回答', 'abstain'], links: [
        { to: 'topic:metacognitive-control', brain: b('没把握时求助或放弃', 'Asking for help or giving up when unsure') },
      ] },
      { id: 'adversarial', term: b('对抗样本', 'Adversarial examples'), aka: ['对抗', '扰动', 'adversarial'], links: [
        { to: 'topic:visual-recognition', brain: b('依靠形状、反馈和眼动的稳健识别', 'Robust recognition through shape, feedback and eye movements') },
      ] },
      { id: 'hallucination', term: b('幻觉', 'Hallucination'), aka: ['幻觉', 'hallucinat'], links: [
        { to: 'topic:multisensory', brain: b('判断信号是否来自同一来源', 'Judging whether signals share a source') },
        { to: 'topic:auditory-scene', brain: b('听觉通路与听觉皮层', 'The auditory pathway and cortex') },
      ] },
      { id: 'linear-probe', term: b('线性探针', 'Linear probes'), aka: ['线性探针', '线性读出', '线性分类器', 'linear probe', 'linear readout'], links: [
        { to: 'topic:visual-recognition', brain: b('IT 群体的线性读出', 'Linear readout of IT populations') },
        { to: 'topic:cognitive-maps', brain: b('从神经活动中读出地图', 'Reading a map out of neural activity') },
      ] },
      { id: 'brain-encoding', term: b('脑编码模型', 'Brain encoding models'), aka: ['编码模型', 'encoding model'], links: [
        { to: 'topic:language', brain: b('语言网络的反应', 'Responses of the language network') },
      ] },
      { id: 'tom-bench', term: b('心智理论测试', 'Theory-of-mind benchmarks'), aka: ['心智理论', 'theory of mind'], links: [
        { to: 'topic:social-inference', brain: b('心智理论网络', 'The theory-of-mind network') },
      ] },
      { id: 'eq-bench', term: b('情绪智力测试', 'Emotional intelligence tests'), aka: ['情绪智力', 'emotional intelligence'], links: [
        { to: 'topic:emotion-understanding', brain: b('情绪识别与共情', 'Emotion recognition and empathy') },
      ] },
    ],
  },
  {
    id: 'embodied', name: b('多模态与具身', 'Multimodal and embodied AI'),
    concepts: [
      { id: 'multimodal', term: b('多模态融合（ImageBind、Flamingo）', 'Multimodal fusion (ImageBind, Flamingo)'), aka: ['多模态', 'ImageBind', 'Flamingo', 'multimodal'], links: [
        { to: 'topic:multisensory', brain: b('按可靠性加权的多感官整合', 'Reliability-weighted multisensory integration') },
      ] },
      { id: 'asr', term: b('语音识别（Whisper）', 'Speech recognition (Whisper)'), aka: ['Whisper', '语音识别', 'speech recognition'], links: [
        { to: 'topic:auditory-scene', brain: b('听觉通路与听觉皮层', 'The auditory pathway and cortex') },
      ] },
      { id: 'mel', term: b('梅尔频谱', 'Mel spectrograms'), aka: ['梅尔', 'mel'], links: [
        { to: 'topic:auditory-scene', brain: b('耳蜗的频率分解', 'Frequency decomposition in the cochlea') },
      ] },
      { id: 'separation', term: b('声源分离', 'Source separation'), aka: ['分离', 'separation'], links: [
        { to: 'topic:auditory-scene', brain: b('鸡尾酒会中的听觉选择', 'Auditory selection at a cocktail party') },
      ] },
      { id: 'vla', term: b('视觉语言动作模型（VLA、RT-2）', 'Vision-language-action models (VLA, RT-2)'), aka: ['VLA', 'RT-2'], links: [
        { to: 'topic:skill-learning', brain: b('运动技能学习', 'Motor skill learning') },
      ] },
      { id: 'imitation', term: b('行为克隆与模仿学习', 'Behavior cloning and imitation learning'), aka: ['行为克隆', '模仿学习', 'behavior cloning', 'imitation'], links: [
        { to: 'topic:skill-learning', brain: b('练习、试错与睡眠巩固', 'Practice, trial and error, and sleep consolidation') },
      ] },
      { id: 'sim2real', term: b('仿真训练与域随机化', 'Simulation training and domain randomization'), aka: ['仿真', '随机化', 'simulation'], links: [
        { to: 'topic:motor-control', brain: b('小脑的快速适应', 'Rapid cerebellar adaptation') },
      ] },
      { id: 'impedance', term: b('PD 控制与阻抗控制', 'PD and impedance control'), aka: ['PD 控制', '阻抗控制', 'impedance'], links: [
        { to: 'topic:motor-control', brain: b('拮抗肌的刚度调节', 'Stiffness control by antagonist muscles') },
      ] },
      { id: 'robot-energy', term: b('机器人的能量与资源管理', 'Energy and resource management in robots'), aka: ['电量', '资源管理', 'battery'], links: [
        { to: 'topic:interoception', brain: b('内感受与预测性调节', 'Interoception and predictive regulation') },
      ] },
    ],
  },
  {
    id: 'affect-social', name: b('情感与社会', 'Affect and social AI'),
    concepts: [
      { id: 'llm', term: b('大语言模型', 'Large language models'), aka: ['大语言模型', '下一个词元', 'large language model'], links: [
        { to: 'topic:language', brain: b('左半球语言网络', 'The left-hemisphere language network') },
        { to: 'topic:social-inference', brain: b('心智理论网络', 'The theory-of-mind network') },
      ] },
      { id: 'affective', term: b('情感计算与情绪识别', 'Affective computing and emotion recognition'), aka: ['情感计算', '情绪识别', 'affective computing'], links: [
        { to: 'topic:emotion-understanding', brain: b('结合情境的情绪推断', 'Context-dependent emotion inference') },
      ] },
      { id: 'functional-emotion', term: b('功能性情绪与内在动机', 'Functional emotions and intrinsic motivation'), aka: ['功能性情绪', 'functional emotion'], links: [
        { to: 'topic:emotion-regulation', brain: b('杏仁核驱动的全局状态', 'Amygdala-driven global states') },
      ] },
      { id: 'tomnet', term: b('机器心智理论（ToMnet）', 'Machine theory of mind (ToMnet)'), aka: ['ToMnet', '机器心智理论'], links: [
        { to: 'topic:social-inference', brain: b('逆向规划：从行为推断目标', 'Inverse planning: inferring goals from behavior') },
      ] },
    ],
  },
]

export const CONCEPTS: AiConcept[] = CONCEPT_GROUPS.flatMap((g) => g.concepts)
