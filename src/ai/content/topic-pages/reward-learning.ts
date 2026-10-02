import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F30 Valuation and reward learning: the dopamine reward prediction error system vs temporal-difference and distributional RL. */
export const REWARD_LEARNING: TopicContent = {
  thesis: {
    biological: b(
      '中脑多巴胺神经元在得到意外的奖赏时短暂爆发放电；学会某个线索预示奖赏后，爆发提前到线索出现时，奖赏本身不再引起反应；预期的奖赏没来时，放电降到基线以下。这正是「奖赏预测误差」：实际减去预期。2020 年的小鼠记录还发现，不同多巴胺神经元有的偏乐观、有的偏悲观，合起来编码了奖赏的整个分布。',
      'Midbrain dopamine neurons fire a brief burst for an unexpected reward. Once a cue is learned to predict reward, the burst moves to the cue and the reward itself no longer evokes a response. When an expected reward fails to come, firing drops below baseline. This is the reward prediction error: actual minus expected. Mouse recordings in 2020 also found that some dopamine neurons are optimistic and others pessimistic, together encoding the whole distribution of reward.'),
    computational: b(
      '时序差分学习用「实际奖赏加对下一步的预测，减去对这一步的预测」作为学习信号，它在数学形式上与多巴胺的反应相同；DQN 用它在 Atari 游戏上达到人类水平。分布式强化学习不只学平均奖赏，而是学整个奖赏分布，这一思路反过来启发了对多巴胺的新发现。大语言模型的人类反馈强化学习用一个奖励模型给回答打分，但模型可能学会钻奖励模型的空子。',
      'Temporal-difference learning uses the actual reward plus the prediction for the next step, minus the prediction for this step, as its learning signal, the same mathematical form as dopamine responses. DQN used it to reach human level on Atari games. Distributional reinforcement learning learns the whole distribution of reward rather than its average, an idea that in turn inspired new findings about dopamine. Reinforcement learning from human feedback scores language model answers with a reward model, but models can learn to exploit its loopholes.'),
    gap: b(
      '这是脑与 AI 之间证据最强的对应之一：同样的误差公式，并有算法预测被神经记录验证。差距在于奖励从哪里来：大脑的价值随饥饿、疲劳等身体状态改变，多巴胺也参与运动和新奇信号；AI 的奖励通常是外部设定的一个数，容易被钻空子。',
      'This is one of the strongest links between brain and AI: the same error formula, with algorithmic predictions confirmed by neural recordings. The gap is where reward comes from. In the brain, value shifts with bodily states such as hunger and fatigue, and dopamine also signals movement and novelty. In AI, reward is usually one externally set number that can be gamed.'),
  },
  short: { biological: b('多巴胺系统', 'Dopamine system'), computational: b('强化学习', 'Reinforcement learning') },
  kinds: ['representation', 'algorithm', 'math'],
  evidence: 'established',
  asOf: b('计算侧描述截至 2026 年 10 月的强化学习算法与大语言模型的奖励模型训练；具体结果按发表年份注明。', 'The computational column describes reinforcement learning algorithms and reward-model training for large language models as of October 2026. Results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('从预测误差中学习', 'Learning from prediction error'),
      brain: b('多巴胺的爆发和暂停编码预测误差；用光遗传学在预期的奖赏时刻人为激活多巴胺神经元，就能让动物学会本来不会学的关联。', 'Dopamine bursts and pauses encode prediction error. Optogenetically activating dopamine neurons at the time of an expected reward makes animals learn an association they otherwise would not.'),
      ai: b('时序差分学习用同样的误差更新价值估计，是许多强化学习算法的核心。', 'Temporal-difference learning updates value estimates with the same error and is at the core of many reinforcement learning algorithms.'),
      gap: b('两边使用同一个计算，生物侧还有因果实验的证据。', 'Both use the same computation, and the biological side has causal experimental evidence.'),
    },
    {
      lead: 'even',
      dimension: b('表示奖赏的分布', 'Representing the reward distribution'),
      brain: b('2020 年的小鼠记录中，不同多巴胺神经元对正负误差的敏感程度不同，合起来能读出奖赏分布的形状。', 'In 2020 mouse recordings, dopamine neurons differed in sensitivity to positive and negative errors, and together the shape of the reward distribution could be read out.'),
      ai: b('分布式强化学习为每个状态学习一组分位数，在 Atari 游戏上比只学平均值表现更好。', 'Distributional reinforcement learning learns a set of quantiles per state and did better on Atari games than learning the average alone.'),
      gap: b('AI 算法先提出，神经记录随后验证，是双向启发的例子。', 'The AI algorithm came first and neural recordings confirmed it, an example of influence in both directions.'),
    },
    {
      lead: 'bio',
      dimension: b('价值随身体状态改变', 'Value changing with bodily state'),
      brain: b('吃饱后，同一种食物的价值立刻下降，动物会减少为它付出的努力。', 'After eating, the value of the same food drops at once, and animals work less for it.'),
      ai: b('奖励函数通常固定；要让价值随内部状态变化，需要专门设计（见[内感受与生理调节](topic:interoception)）。', 'Reward functions are usually fixed, and making value depend on internal states needs special design (see [interoception and physiological regulation](topic:interoception)).'),
      gap: b('生物的价值是相对于身体需要的，AI 的奖励通常是绝对的外部设定。', 'Biological value is relative to bodily needs, while AI reward is usually an absolute external setting.'),
    },
    {
      lead: 'mixed',
      dimension: b('奖励信号被劫持', 'Hijacked reward signals'),
      brain: b('成瘾药物直接提高多巴胺水平，绕过真实的奖赏，导致学习被扭曲。', 'Addictive drugs raise dopamine directly, bypassing real reward and distorting learning.'),
      ai: b('模型可能找到奖励函数的漏洞，拿到高分却没有完成真正的目标（奖励投机）。', 'Models can find loopholes in the reward function and score high without achieving the real goal, called reward hacking.'),
      gap: b('两边都会被「信号与真实目标脱节」误导，原因不同：一个是化学劫持，一个是目标设定不完整。', 'Both can be misled when the signal parts from the real goal, for different reasons: chemical hijacking in one, an incomplete objective in the other.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('状态与线索', 'State and cues'),
        points: [b('皮层把当前看到的线索和所处情境表示成放电模式，作为「当前状态」。', 'Cortex represents current cues and context as a firing pattern, the current state.')],
      },
      {
        title: b('价值估计', 'Value estimation'),
        points: [b('腹侧纹状体和眶额皮层估计当前状态的价值：从这里出发，将来大约能得到多少奖赏。', 'The ventral striatum and orbitofrontal cortex estimate the value of the current state, roughly how much reward lies ahead from here.')],
      },
      {
        title: b('实际奖赏', 'Actual reward'),
        points: [b('味觉、下丘脑等通路报告实际得到的奖赏，例如尝到了甜味。', 'Taste, hypothalamic and other pathways report the reward actually received, such as a sweet taste.')],
      },
      {
        title: b('多巴胺神经元计算误差', 'Dopamine neurons compute the error'),
        points: [
          b('中脑腹侧被盖区的多巴胺神经元接收奖赏输入，同时被局部的抑制性神经元按预期减去一部分。', 'Dopamine neurons in the ventral tegmental area receive reward input while local inhibitory neurons subtract an amount set by expectation.'),
          b('结果是「实际减去预期」：比预期好就爆发，符合预期没反应，比预期差就暂停。', 'The result is actual minus expected: a burst when better, no change when as expected, a pause when worse.'),
        ],
      },
      {
        title: b('广播与更新', 'Broadcast and update'),
        points: [b('多巴胺释放到纹状体和皮层，按三因子规则更新价值估计（腹侧纹状体）和动作选择（背侧纹状体），原理见[信用分配](topic:credit-assignment)。', 'Dopamine is released into the striatum and cortex, updating value estimates in the ventral striatum and action selection in the dorsal striatum by three-factor rules, explained in [credit assignment](topic:credit-assignment).')],
      },
      {
        title: b('分布式编码', 'Distributional coding'),
        points: [b('不同多巴胺神经元对好消息和坏消息的敏感程度不同：乐观的对正误差更敏感，悲观的对负误差更敏感，合起来表示奖赏分布的不同部分。', 'Dopamine neurons differ in sensitivity to good and bad news. Optimistic ones respond more to positive errors and pessimistic ones to negative errors, together representing different parts of the reward distribution.')],
      },
    ],
    computational: [
      {
        title: b('状态编码', 'State encoding'),
        points: [b('神经网络把观察（如游戏画面）编码成状态向量。', 'A neural network encodes the observation, such as a game frame, into a state vector.')],
      },
      {
        title: b('评论家：价值', 'Critic: value'),
        points: [b('评论家网络估计每个状态的价值。', 'A critic network estimates the value of each state.')],
      },
      {
        title: b('行动者：策略', 'Actor: policy'),
        points: [b('行动者网络给出每个动作的概率并选择动作。', 'An actor network gives probabilities for each action and chooses one.')],
      },
      {
        title: b('环境的奖励', 'Reward from the environment'),
        points: [b('环境返回一个标量奖励和下一个状态；奖励规则由设计者事先规定。', 'The environment returns a scalar reward and the next state, by rules the designer set in advance.')],
      },
      {
        title: b('时序差分误差', 'Temporal-difference error'),
        points: [b('用「奖励加下一状态的价值减当前价值」同时更新评论家和行动者。', 'Reward plus next-state value minus current value updates both critic and actor.')],
      },
      {
        title: b('分布式价值头', 'Distributional value head'),
        points: [b('分布式算法让评论家输出一组分位数，表示奖赏可能落在哪些位置，而不只是平均值。', 'Distributional algorithms make the critic output a set of quantiles showing where reward may fall, not just its average.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('1997 年的论文把猴子多巴胺神经元的记录与时序差分学习的误差联系起来，成为计算神经科学中影响最大的对应之一。', 'A 1997 paper linked recordings of monkey dopamine neurons to the temporal-difference error, one of the most influential correspondences in computational neuroscience.'),
      b('2015 年的小鼠实验发现，腹侧被盖区的抑制性神经元按预期的奖赏大小，从多巴胺神经元的反应中减去一个固定量，实现了误差中的「减法」。', 'A 2015 mouse study found that inhibitory neurons in the ventral tegmental area subtract a fixed amount set by expected reward from dopamine responses, carrying out the subtraction in the error.'),
      b('眶额皮层的神经元编码选项的经济价值，例如猴子在不同数量的两种果汁之间选择时，神经元的放电与它们的主观价值成比例。', 'Orbitofrontal neurons encode the economic value of options. When monkeys choose between amounts of two juices, firing scales with subjective value.'),
      b('多巴胺不只编码奖赏预测误差：一部分多巴胺神经元对厌恶刺激、新奇和显著的事件也有反应，并与运动的发起有关。', 'Dopamine encodes more than reward prediction error. Some dopamine neurons respond to aversive, novel and salient events and relate to starting movements.'),
      b('人的价值判断有系统的偏差，例如同样大小的损失比收益感觉更强（损失厌恶）。', 'Human valuation has systematic biases. For example, a loss feels stronger than an equal gain, called loss aversion.'),
    ],
    computational: [
      b('DQN 在 2015 年用深度网络加时序差分学习，在 49 款 Atari 游戏中的许多款上达到或超过专业测试员的水平。', 'In 2015 DQN combined deep networks with TD learning and matched or beat a professional tester on many of 49 Atari games.'),
      b('分布式强化学习于 2017 年提出；2020 年同一团队与神经科学家合作，在小鼠多巴胺神经元中找到了它预测的乐观与悲观的多样性。', 'Distributional reinforcement learning was proposed in 2017. In 2020 the same team, working with neuroscientists, found the optimistic and pessimistic diversity it predicted in mouse dopamine neurons.'),
      b('人类反馈强化学习先用人对回答的偏好训练一个奖励模型，再用强化学习优化语言模型；奖励模型本身不完美，过度优化会导致模型钻空子。', 'Reinforcement learning from human feedback first trains a reward model on human preferences between answers, then optimizes the language model with reinforcement learning. The reward model is imperfect, and over-optimizing lets the model game it.'),
    ],
  },
  bioMath: [
    {
      title: b('奖赏预测误差：多巴胺反应为什么会转移到线索上', 'Reward prediction error: why the dopamine response moves to the cue'),
      tex: t`\delta_t = r_t + V(s_{t+1}) - V(s_t),\qquad V(s_t) \leftarrow V(s_t) + \alpha\,\delta_t`,
      symbols: [
        { tex: t`s_t`, meaning: b('第 $t$ 个时刻的状态，例如「线索出现」「奖赏时刻」', 'state at time $t$, such as cue onset or reward time') },
        { tex: t`r_t`, meaning: b('这一时刻得到的奖赏', 'reward received at this time') },
        { tex: t`V(s)`, meaning: b('对状态 $s$ 之后奖赏的预期', 'expected reward after state $s$') },
        { tex: t`\delta_t`, meaning: b('预测误差，对应多巴胺神经元的放电变化', 'prediction error, matching the change in dopamine firing') },
        { tex: t`\alpha`, meaning: b('学习率', 'learning rate') },
      ],
      steps: [
        b('每个时刻，比较「得到的奖赏加上对下一时刻的预期」与「对这一时刻的预期」。', 'At each moment, compare the reward received plus the expectation for the next moment with the expectation for this moment.'),
        b('差值就是预测误差，多巴胺按它放电。', 'The difference is the prediction error, and dopamine fires by it.'),
        b('用误差修正预期。反复学习后，预期一步步提前到最早的线索上。', 'Correct the expectation by the error. With repeated learning, the expectation moves back step by step to the earliest cue.'),
      ],
      example: b(
        '线索出现后 1 秒给奖赏 $1$。学习前所有 $V = 0$：奖赏时刻 $\\delta = 1 + 0 - 0 = 1$，爆发。学会后 $V(\\text{线索}) = 1$：线索出现时 $\\delta = 0 + 1 - 0 = 1$，爆发提前到线索；奖赏时刻 $\\delta = 1 + 0 - 1 = 0$，没有反应。若奖赏没来，$\\delta = 0 + 0 - 1 = -1$，放电暂停。',
        'Reward $1$ comes 1 s after a cue. Before learning all $V = 0$: at the reward, $\\delta = 1 + 0 - 0 = 1$, a burst. After learning, $V(\\text{cue}) = 1$: at the cue, $\\delta = 0 + 1 - 0 = 1$, so the burst moves to the cue. At the reward, $\\delta = 1 + 0 - 1 = 0$, no response. If the reward fails to come, $\\delta = 0 + 0 - 1 = -1$, a pause.'),
      consequences: [
        b('三种观察（意外奖赏爆发、反应转移到线索、预期落空时暂停）都由同一个公式得出。', 'All three observations, bursts for surprise, the shift to the cue and the pause on omission, follow from one formula.'),
        b('预测误差驱动学习：没有意外，就没有学习（阻断效应）。', 'Prediction error drives learning: no surprise, no learning, as in the blocking effect.'),
      ],
      limitations: [
        b('公式没有包括多巴胺对新奇、厌恶和运动的反应。', 'The formula leaves out dopamine responses to novelty, aversive events and movement.'),
        b('线索和奖赏之间的「时刻」怎样在大脑中表示，仍有争论。', 'How the brain represents the moments between cue and reward is still debated.'),
      ],
    },
    {
      title: b('分布式编码：乐观和悲观的神经元各自学到分布的不同位置', 'Distributional coding: optimistic and pessimistic neurons learn different parts of the distribution'),
      tex: t`V_i \leftarrow V_i + \begin{cases} \alpha_i^{+}\,\delta_i, & \delta_i > 0 \\ \alpha_i^{-}\,\delta_i, & \delta_i \le 0 \end{cases},\qquad \tau_i = \frac{\alpha_i^{+}}{\alpha_i^{+} + \alpha_i^{-}}`,
      symbols: [
        { tex: t`V_i`, meaning: b('第 $i$ 个神经元（或通道）学到的价值', 'value learned by neuron or channel $i$') },
        { tex: t`\delta_i = r - V_i`, meaning: b('它自己的预测误差', 'its own prediction error') },
        { tex: t`\alpha_i^{+},\;\alpha_i^{-}`, meaning: b('对正误差和负误差的学习率', 'learning rates for positive and negative errors') },
        { tex: t`\tau_i`, meaning: b('乐观程度：大于 $0.5$ 偏乐观，小于 $0.5$ 偏悲观', 'optimism: above $0.5$ optimistic, below $0.5$ pessimistic') },
      ],
      steps: [
        b('每个神经元对好消息和坏消息用不同的学习率更新自己的价值。', 'Each neuron updates its value with different rates for good and bad news.'),
        b('对好消息更敏感的神经元，价值停在分布的高处；对坏消息更敏感的，停在低处。', 'Neurons more sensitive to good news settle high in the distribution, and those more sensitive to bad news settle low.'),
        b('一群乐观程度各不相同的神经元，合起来覆盖了奖赏分布的各个位置。', 'A population with varied optimism covers every part of the reward distribution together.'),
      ],
      example: b(
        '奖赏一半时候是 $0$、一半时候是 $10$，平均为 $5$。乐观神经元 $\\tau = 0.8$，平衡点满足 $0.8\\,(10 - V) = 0.2\\,V$，学到 $V = 8$；悲观神经元 $\\tau = 0.2$，学到 $V = 2$；$\\tau = 0.5$ 的学到平均值 $5$。三者合起来显示奖赏是两极分化的，而只知道平均值 $5$ 看不出这一点。',
        'Reward is $0$ half the time and $10$ the other half, averaging $5$. An optimistic neuron with $\\tau = 0.8$ balances where $0.8\\,(10 - V) = 0.2\\,V$, learning $V = 8$. A pessimistic one with $\\tau = 0.2$ learns $V = 2$, and one with $\\tau = 0.5$ learns the mean $5$. Together they show the reward is split in two, which the mean $5$ alone cannot reveal.'),
      consequences: [
        b('2020 年的小鼠记录中，多巴胺神经元确实显示出这种乐观程度的多样性，并且可以从中解码出奖赏分布的形状。', 'In 2020 mouse recordings, dopamine neurons did show this variety of optimism, and the shape of the reward distribution could be decoded from them.'),
        b('知道分布而不只是平均值，有助于评估风险。', 'Knowing the distribution, not just the mean, helps assess risk.'),
      ],
      limitations: [
        b('这一证据主要来自小鼠腹侧被盖区，在其他物种和脑区中的普遍性仍待验证。', 'The evidence comes mainly from mouse ventral tegmental area, and generality across species and areas remains to be tested.'),
        b('大脑下游怎样读取和使用分布信息，还不清楚。', 'How downstream areas read and use the distributional information is unclear.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('行动者与评论家：同一个误差同时训练价值和策略', 'Actor and critic: one error trains both value and policy'),
      tex: t`\delta = r + \gamma V_w(s') - V_w(s),\qquad w \leftarrow w + \alpha\,\delta\,\nabla_w V_w(s),\qquad \theta \leftarrow \theta + \beta\,\delta\,\nabla_{\theta}\log \pi_{\theta}(a \mid s)`,
      symbols: [
        { tex: t`V_w(s)`, meaning: b('评论家（参数 $w$）对状态价值的估计', 'the critic’s state value estimate, with parameters $w$') },
        { tex: t`\pi_{\theta}(a \mid s)`, meaning: b('行动者（参数 $\\theta$）选择动作 $a$ 的概率', 'probability the actor, with parameters $\\theta$, picks action $a$') },
        { tex: t`\gamma`, meaning: b('折扣因子', 'discount factor') },
        { tex: t`\delta`, meaning: b('时序差分误差', 'temporal-difference error') },
        { tex: t`\alpha,\;\beta`, meaning: b('评论家和行动者的学习率', 'learning rates of critic and actor') },
      ],
      steps: [
        b('执行动作 $a$，得到奖励 $r$ 和新状态 $s\'$，算出时序差分误差。', 'Take action $a$, receive reward $r$ and new state $s\'$, and compute the TD error.'),
        b('评论家：误差为正说明低估了，把价值调高；为负则调低。', 'Critic: a positive error means underestimation, so raise the value, and lower it when negative.'),
        b('行动者：误差为正说明这个动作比预期好，提高它的概率；为负则降低。', 'Actor: a positive error means the action beat expectations, so raise its probability, and lower it when negative.'),
      ],
      example: b(
        '当前价值 $V(s) = 2$，执行向左得到奖励 $1$，新状态价值 $V(s\') = 3$，取 $\\gamma = 0.9$：$\\delta = 1 + 2.7 - 2 = 1.7$。评论家把 $V(s)$ 调高；行动者提高在 $s$ 向左的概率。',
        'Current value $V(s) = 2$. Moving left yields reward $1$ and a new state worth $V(s\') = 3$, with $\\gamma = 0.9$: $\\delta = 1 + 2.7 - 2 = 1.7$. The critic raises $V(s)$, and the actor raises the probability of moving left in $s$.'),
      consequences: [
        b('结构与基底节的分工相近：腹侧纹状体像评论家，背侧纹状体像行动者，多巴胺像共同的误差信号。', 'The structure resembles the division in the basal ganglia: ventral striatum like the critic, dorsal striatum like the actor and dopamine like the shared error.'),
        b('同一个标量误差就足以训练两部分，不需要额外的教学信号。', 'One scalar error suffices to train both parts, with no extra teaching signal.'),
      ],
      limitations: [
        b('需要大量经历；奖励稀疏时学得很慢。', 'It needs much experience and learns slowly when rewards are sparse.'),
        b('奖励规则由设计者给定，不随智能体的内部状态改变。', 'Reward rules are set by the designer and do not change with the agent’s internal state.'),
      ],
    },
    {
      title: b('分位数回归：让每个输出学到分布的一个分位点', 'Quantile regression: each output learns one quantile of the distribution'),
      tex: t`\rho_{\tau}(u) = u\,\big(\tau - \mathbb{1}\{u < 0\}\big),\qquad u = r - \theta_{\tau}`,
      symbols: [
        { tex: t`\theta_{\tau}`, meaning: b('网络对分位点 $\\tau$ 的估计', 'the network’s estimate of quantile $\\tau$') },
        { tex: t`u`, meaning: b('实际奖赏与估计之差', 'actual reward minus the estimate') },
        { tex: t`\tau`, meaning: b('分位点，例如 $0.9$ 表示「九成情况低于它」', 'quantile level; $0.9$ means nine in ten outcomes fall below it') },
        { tex: t`\rho_{\tau}`, meaning: b('分位数损失：低估和高估的惩罚不对称', 'quantile loss: under- and overestimates are penalized asymmetrically') },
      ],
      steps: [
        b('对每个分位点 $\\tau$，计算实际奖赏与估计之差 $u$。', 'For each quantile $\\tau$, compute the difference $u$ between actual reward and estimate.'),
        b('低估时（$u > 0$）惩罚乘以 $\\tau$，高估时乘以 $1 - \\tau$。$\\tau$ 越大，越害怕低估，估计就被推向分布的高处。', 'Underestimates, $u > 0$, are penalized by $\\tau$ and overestimates by $1 - \\tau$. The larger $\\tau$, the more underestimation is feared, pushing the estimate high in the distribution.'),
        b('一组不同 $\\tau$ 的输出，共同描绘出整个奖赏分布。', 'A set of outputs with different $\\tau$ together traces the whole reward distribution.'),
      ],
      example: b(
        '奖赏一半时候是 $0$、一半时候是 $10$。$\\tau = 0.25$ 的输出最终停在 $0$ 附近，$\\tau = 0.75$ 的停在 $10$ 附近，中间的分位点落在两者之间的某处。这与生物侧乐观、悲观神经元的例子相对应。',
        'Reward is $0$ half the time and $10$ the other half. The $\\tau = 0.25$ output settles near $0$ and the $\\tau = 0.75$ output near $10$, with middle quantiles between. This matches the optimistic and pessimistic neurons on the biological side.'),
      consequences: [
        b('不对称的惩罚等价于对正负误差用不同的学习率，正是多巴胺分布式编码的机制。', 'Asymmetric penalties equal different learning rates for positive and negative errors, the very mechanism of distributional dopamine coding.'),
        b('学习完整分布让表示更丰富，在 Atari 等任务上提高了表现。', 'Learning the full distribution enriches the representation and improved performance on Atari and other tasks.'),
      ],
      limitations: [
        b('决策时通常仍只用分布的平均值，分布信息的用法还在探索。', 'Decisions usually still use only the distribution’s mean, and how to use the rest is still being explored.'),
        b('分位点的数量和位置需要人为设定。', 'The number and placement of quantiles must be set by hand.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('会被成瘾劫持', 'Hijacked by addiction'),
        text: b('成瘾药物直接提高多巴胺，绕过真实的奖赏，使学习偏向药物相关的线索。', 'Addictive drugs raise dopamine directly, bypassing real reward and biasing learning toward drug-related cues.'),
        steps: [4, 5],
      },
      {
        title: b('价值判断有系统偏差', 'Systematic biases in valuation'),
        text: b('同样大小的损失比收益感觉更强，人的选择因此偏离按期望值计算的结果。', 'An equal loss feels stronger than a gain, so choices depart from expected-value calculations.'),
        steps: [2],
      },
      {
        title: b('学习依赖意外', 'Learning needs surprise'),
        text: b('已经被预测到的奖赏不再引起学习，新的线索若与已有线索同时出现，可能学不到（阻断效应）。', 'Predicted rewards no longer drive learning, and a new cue paired with an already predictive one may not be learned, the blocking effect.'),
        steps: [4],
      },
    ],
    computational: [
      {
        title: b('奖励需要外部设计', 'Reward must be designed'),
        text: b('奖励函数由人规定，写得不完整时，智能体可能钻空子拿到高分却没完成目标。', 'People write the reward function, and when it is incomplete the agent can game it for high scores without reaching the goal.'),
        steps: [4],
      },
      {
        title: b('需要大量经验', 'Needs much experience'),
        text: b('Atari 游戏需要数千万帧的经验，远多于人学会同样游戏所需。', 'Atari games need tens of millions of frames, far more than people need to learn the same games.'),
        steps: [5],
      },
      {
        title: b('价值不随内部状态变化', 'Value ignores internal state'),
        text: b('奖励通常固定，智能体没有「吃饱了就不想要」这样的状态依赖。', 'Reward is usually fixed, and the agent lacks state dependence such as not wanting food once full.'),
        steps: [4, 2],
      },
    ],
    misreadings: [
      {
        claim: b('多巴胺就是快乐物质', 'Dopamine is the pleasure chemical'),
        fact: b('多巴胺主要编码「比预期好或差」的误差，用于学习和激发行动；愉悦感本身更多与其他系统有关，预期中的奖赏甚至不引起多巴胺反应。', 'Dopamine mainly encodes errors relative to expectation, for learning and motivating action. Pleasure itself relates more to other systems, and expected rewards do not even evoke a dopamine response.'),
      },
    ],
  },
  refs: {
    neuro: ['schultz1997', 'padoaschioppa2006', 'brombergmartin2010', 'steinberg2013', 'eshel2015', 'dabney2020', 'kahneman1979'],
    models: ['sutton1988'],
    ai: ['mnih2015', 'bellemare2017', 'dabney2018', 'amodei2016', 'ouyang2022'],
  },
}
