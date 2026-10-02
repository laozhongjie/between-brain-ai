import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F15 Consolidation, replay and forgetting: sleep replay and systems consolidation vs experience replay and model updating. */
export const CONSOLIDATION_REPLAY: TopicContent = {
  thesis: {
    biological: b(
      '睡眠中，海马在尖波涟漪中把白天的经历快速重放，速度可达实际的十几倍，也会倒着放，并偏向有奖赏或新奇的经历。涟漪与皮层慢波、丘脑纺锤波在时间上对齐时，记忆巩固得最好。睡眠还可能整体下调白天增强的突触，大脑也有专门的分子机制主动遗忘。',
      'In sleep, the hippocampus replays the day’s experiences in sharp-wave ripples, up to more than ten times faster than they happened, sometimes in reverse and biased toward rewarding or novel events. Memory consolidates best when ripples align in time with cortical slow waves and thalamic spindles. Sleep may also scale down synapses strengthened during the day, and the brain has dedicated molecular machinery for active forgetting.'),
    computational: b(
      '强化学习智能体把经历存进回放缓冲区，训练时随机抽取，打破相邻样本的相关性；优先回放更多地抽取误差大的经历。生成式回放用生成模型重造旧样本，Dreamer 在学到的世界模型中「想象」经历来训练策略。大模型则主要靠定期用新数据重新训练来更新，删除已经学到的特定内容（机器遗忘）仍然很难。',
      'Reinforcement learning agents store experience in a replay buffer and sample it randomly in training, breaking the correlation of consecutive samples. Prioritized replay draws experiences with large errors more often. Generative replay rebuilds old samples with a generative model, and Dreamer trains its policy on experience imagined in a learned world model. Large models are updated mainly by periodic retraining on new data, and removing specific learned content, machine unlearning, remains hard.'),
    gap: b(
      '两边都在离线时重放经历来训练。差距在于：大脑的回放有选择、被压缩、与皮层节律配合，并伴随突触下调和主动遗忘；AI 的回放由人设计的缓冲区和抽样规则决定，部署中的模型没有定期的离线整理，也难以精确地忘掉某些内容。',
      'Both replay experience offline to learn. The difference is that the brain’s replay is selective, compressed and coordinated with cortical rhythms, with synaptic downscaling and active forgetting. AI replay follows buffers and sampling rules designed by people, deployed models have no regular offline cycle and forgetting specific content precisely is hard.'),
  },
  short: { biological: b('睡眠回放', 'Sleep replay'), computational: b('经验回放', 'Experience replay') },
  kinds: ['algorithm', 'math'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月强化学习中的回放方法与大模型的更新方式。', 'The computational column describes replay methods in reinforcement learning and how large models are updated as of October 2026.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('选择回放什么', 'Choosing what to replay'),
      brain: b('回放偏向有奖赏、新奇或尚未解决的经历；奖赏增加时，倒放的次数随之增加。', 'Replay favors rewarding, novel or unresolved experience, and reverse replay increases when reward increases.'),
      ai: b('优先回放按预测误差的大小抽样，误差大的经历被更多地重复训练。', 'Prioritized replay samples by the size of the prediction error, so experiences with large errors are trained on more often.'),
      gap: b('两边都优先处理「最值得学」的经历，标准相近：意外和对未来决策的用处。', 'Both prioritize the experiences most worth learning from, by similar criteria: surprise and usefulness for future choices.'),
    },
    {
      lead: 'bio',
      dimension: b('离线整合', 'Offline integration'),
      brain: b('睡一晚后，记忆保持更好，人还更容易发现任务中隐藏的规律。', 'After a night’s sleep, memories are better retained and people more often discover a hidden rule in a task.'),
      ai: b('部署中的模型没有定期的离线阶段；新知识要等下一次训练，由人安排。', 'Deployed models have no regular offline phase. New knowledge waits for the next training run that people schedule.'),
      gap: b('大脑每晚都在自动整理；模型的整理依赖外部安排的重新训练。', 'The brain reorganizes automatically every night, while models depend on retraining arranged from outside.'),
    },
    {
      lead: 'bio',
      dimension: b('有选择地遗忘', 'Selective forgetting'),
      brain: b('无关和过时的信息被主动遗忘，重要的被保留；遗忘有专门的分子机制。', 'Irrelevant and outdated information is actively forgotten while important information is kept, through dedicated molecular mechanisms.'),
      ai: b('要从训练好的模型中精确删除某些数据的影响，可靠的办法通常是去掉数据后重新训练。', 'Precisely removing the influence of certain data from a trained model usually means reliably retraining without it.'),
      gap: b('模型缺少廉价、精确的遗忘手段。', 'Models lack a cheap, precise way to forget.'),
    },
    {
      lead: 'comp',
      dimension: b('回放的保真与次数', 'Fidelity and amount of replay'),
      brain: b('每晚的回放次数有限，内容被压缩、不完整，有时把不同经历拼接在一起。', 'Each night allows limited replay, and the content is compressed, incomplete and sometimes stitched together from different experiences.'),
      ai: b('缓冲区逐字保存数百万条经历，每条可以被重复训练成百上千次。', 'A buffer stores millions of experiences verbatim, each trainable hundreds or thousands of times.'),
      gap: b('模型回放的规模和精确度远超大脑。', 'Models replay at a scale and precision far beyond the brain.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('清醒时编码', 'Encoding while awake'),
        points: [b('经历中，海马的位置细胞按顺序放电，形成一段序列；参与的突触被临时标记。', 'During experience, hippocampal place cells fire in order, forming a sequence, and the synapses involved are temporarily tagged.')],
      },
      {
        title: b('皮层慢振荡', 'Cortical slow oscillation'),
        points: [b('深睡时，新皮层的神经元约每秒一次在「全体活跃」和「全体安静」之间交替，活跃期为信息传递打开窗口。', 'In deep sleep, neocortical neurons alternate about once per second between all active and all quiet, and the active phase opens a window for transfer.')],
      },
      {
        title: b('丘脑纺锤波', 'Thalamic spindles'),
        points: [b('丘脑在慢振荡的上升期产生约每秒 12 到 15 次的纺锤波，持续约一秒，让皮层处于易于发生可塑性的状态。', 'In the rising phase of the slow oscillation, the thalamus produces spindles at about 12 to 15 cycles per second for about a second, putting cortex in a state ready for plasticity.')],
      },
      {
        title: b('尖波涟漪与回放', 'Sharp-wave ripples and replay'),
        points: [
          b('海马在约 100 毫秒的涟漪中重放白天的放电序列，速度比实际快十几倍。', 'In ripples lasting about 100 ms, the hippocampus replays the day’s firing sequences more than ten times faster than real time.'),
          b('涟漪落在纺锤波中时，重放的内容最有可能被传到新皮层。', 'Ripples that fall within spindles are the most likely to carry the replayed content to neocortex.'),
        ],
      },
      {
        title: b('新皮层整合', 'Integration in neocortex'),
        points: [b('反复的回放让新皮层逐渐建立连接，记忆慢慢不再依赖海马，并与已有知识合并。', 'Repeated replay lets the neocortex gradually build connections, so the memory slowly stops depending on the hippocampus and merges with existing knowledge.')],
      },
      {
        title: b('突触下调与主动遗忘', 'Downscaling and active forgetting'),
        points: [
          b('一种假说认为，睡眠按比例整体下调白天增强的突触，保留相对强弱，同时节省能量、腾出学习空间。', 'One hypothesis holds that sleep scales down synapses strengthened during the day, keeping their relative strengths while saving energy and freeing room to learn.'),
          b('细胞内还有专门的信号通路主动削弱不再需要的记忆痕迹。', 'Cells also have dedicated signaling pathways that actively weaken memory traces no longer needed.'),
        ],
      },
    ],
    computational: [
      {
        title: b('与环境交互', 'Interacting with the environment'),
        points: [b('智能体每走一步，记下一条经历：当时的状态、采取的动作、得到的奖赏和下一个状态。', 'At each step the agent records one experience: the state, the action, the reward and the next state.')],
      },
      {
        title: b('回放缓冲区', 'Replay buffer'),
        points: [b('最近的数十万到数百万条经历被逐字保存，满了就丢掉最旧的。', 'The most recent hundreds of thousands to millions of experiences are stored verbatim, and the oldest are dropped when it is full.')],
      },
      {
        title: b('抽样', 'Sampling'),
        points: [b('训练时从缓冲区随机抽取一批，或按误差大小优先抽取。', 'Training draws a batch from the buffer at random, or by priority according to error size.')],
      },
      {
        title: b('离线训练', 'Offline training'),
        points: [b('用抽到的经历更新网络；同一条经历可以被反复使用很多次。', 'The drawn experiences update the network, and each can be reused many times.')],
      },
      {
        title: b('生成与想象', 'Generation and imagination'),
        points: [b('生成模型产生近似的旧样本；Dreamer 用学到的世界模型想象出新的经历序列，在想象中训练策略。', 'A generative model produces approximate old samples, and Dreamer imagines new sequences of experience with its learned world model and trains its policy in imagination.')],
      },
      {
        title: b('缺失的一步（虚线框）', 'The missing step (dashed box)'),
        points: [b('没有主动、精确的遗忘：模型不能廉价地删除某些已学内容的影响。', 'No active, precise forgetting: the model cannot cheaply remove the influence of particular learned content.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('睡眠中的回放最早在 1994 年的大鼠实验中被发现：白天一起放电的位置细胞，在随后的睡眠中仍倾向于一起放电。', 'Sleep replay was first found in a 1994 rat study. Place cells that fired together during the day tended to fire together again in the following sleep.'),
      b('2009 年的实验用电刺激选择性地抑制睡眠中的涟漪，大鼠的空间记忆随之受损，说明涟漪对巩固有因果作用。', 'A 2009 experiment selectively suppressed ripples in sleep with electrical stimulation, and the rats’ spatial memory was impaired, showing ripples play a causal role in consolidation.'),
      b('2017 年的小鼠实验在慢振荡的特定相位用光遗传学诱发纺锤波，增强了涟漪、纺锤波与慢振荡的三重对齐，记忆随之改善。', 'In a 2017 mouse study, optogenetically triggering spindles at a specific slow-oscillation phase strengthened the triple alignment of ripples, spindles and slow oscillations and improved memory.'),
      b('回放也发生在清醒的休息中，并且可以「预演」从未走过的路径，这被认为与规划有关（见[规划与前瞻模拟](topic:planning)）。', 'Replay also occurs during awake rest and can preview paths never taken, which is thought to relate to planning (see [planning and prospective simulation](topic:planning)).'),
      b('突触稳态假说认为，清醒时的学习使突触整体增强，睡眠按比例把它们调回。它与「睡眠中特定记忆被增强」的证据并存，两者的关系仍有争议。', 'The synaptic homeostasis hypothesis holds that waking learning strengthens synapses overall and sleep scales them back. It coexists with evidence that sleep strengthens particular memories, and how the two relate is debated.'),
      b('在 2004 年的实验中，睡过一夜的被试发现数字任务中隐藏捷径的比例是清醒组的两倍多。', 'In a 2004 experiment, participants who slept were more than twice as likely as those who stayed awake to discover a hidden shortcut in a number task.'),
    ],
    computational: [
      b('经验回放于 1992 年提出，2015 年的 DQN 用它成功地在 Atari 游戏上训练深度网络：随机抽样打破了连续帧之间的强相关，使训练稳定。', 'Experience replay was proposed in 1992, and in 2015 DQN used it to train deep networks on Atari games. Random sampling breaks the strong correlation between consecutive frames and stabilizes training.'),
      b('优先回放会改变样本的分布，因此用「重要性权重」修正：被过多抽到的样本在更新时乘一个较小的权重。', 'Prioritized replay changes the sample distribution, so importance weights correct it: samples drawn too often get a smaller weight in the update.'),
      b('「机器遗忘」研究怎样删除特定训练数据的影响。按数据分片训练多个子模型，删除时只需重新训练受影响的分片，是一种折中方案。', 'Machine unlearning studies how to remove the influence of specific training data. Training separate submodels on data shards, so deletion only retrains the affected shard, is one compromise.'),
      b('大模型的知识有一个「截止日期」：截止之后的事件要等下一个版本的训练才能纳入。', 'A large model’s knowledge has a cutoff date. Later events enter only with the training of the next version.'),
    ],
  },
  dynamicsSteps: {
    biological: [
      {
        title: b('百毫秒：涟漪回放', 'Hundreds of milliseconds: ripple replay'),
        points: [b('一次涟漪约 100 毫秒，重放几秒的经历。', 'One ripple of about 100 ms replays a few seconds of experience.')],
      },
      {
        title: b('秒：纺锤波与慢振荡', 'Seconds: spindles and slow oscillations'),
        points: [b('慢振荡约每秒一次，纺锤波持续约一秒，为涟漪提供传递窗口。', 'Slow oscillations come about once per second and spindles last about a second, giving ripples a window for transfer.')],
      },
      {
        title: b('约 90 分钟：睡眠周期', 'About 90 minutes: sleep cycles'),
        points: [b('深睡和快速眼动睡眠交替，一夜约 4 到 6 个周期，深睡多集中在前半夜。', 'Deep sleep and REM sleep alternate in 4 to 6 cycles a night, with deep sleep concentrated early.')],
      },
      {
        title: b('数晚到数周：系统巩固', 'Nights to weeks: systems consolidation'),
        points: [b('多个夜晚的回放把记忆逐步转入新皮层。', 'Replay over many nights gradually moves the memory into neocortex.')],
      },
      {
        title: b('数月：遗忘', 'Months: forgetting'),
        points: [b('不再被使用、也没有被巩固的痕迹逐渐消失。', 'Traces that are no longer used and were never consolidated gradually disappear.')],
      },
    ],
    computational: [
      {
        title: b('每一步：抽样与更新', 'Each step: sample and update'),
        points: [b('从缓冲区抽一批经历，更新一次网络，耗时毫秒。', 'Draw a batch from the buffer and update the network once, in milliseconds.')],
      },
      {
        title: b('训练期间：反复回放', 'During training: repeated replay'),
        points: [b('数小时到数天的训练中，每条经历被反复使用。', 'Over hours to days of training, each experience is used again and again.')],
      },
      {
        title: b('部署：没有离线整理', 'Deployment: no offline phase'),
        points: [b('部署后不再回放；新知识等待数月一次的新版本训练。', 'After deployment there is no replay, and new knowledge waits for a new version trained every few months.')],
      },
    ],
  },
  bioMath: [
    {
      title: b('优先回放的理论：回放的价值等于收益乘以需要', 'A theory of replay priority: value is gain times need'),
      tex: t`\mathrm{EVB}(s_k, a_k) = \mathrm{Gain}(s_k, a_k) \times \mathrm{Need}(s_k)`,
      symbols: [
        { tex: t`s_k,\;a_k`, meaning: b('一段可以被回放的经历：在状态 $s_k$ 采取动作 $a_k$', 'an experience that could be replayed: action $a_k$ taken in state $s_k$') },
        { tex: t`\mathrm{Gain}`, meaning: b('回放这段经历后，在 $s_k$ 的选择会改进多少', 'how much replaying it would improve choices in $s_k$') },
        { tex: t`\mathrm{Need}`, meaning: b('将来预计会多频繁地处于 $s_k$', 'how often $s_k$ is expected to be visited in the future') },
        { tex: t`\mathrm{EVB}`, meaning: b('回放的期望价值，按它从高到低依次回放', 'expected value of the replay, replayed from highest to lowest') },
      ],
      steps: [
        b('对每段可能回放的经历，估计回放后决策会改进多少（收益）。', 'For each experience that could be replayed, estimate how much decisions would improve, the gain.'),
        b('再估计将来会多常用到这个状态（需要），可以用后继表征计算。', 'Then estimate how often that state will be needed in the future, which can be computed from the successor representation.'),
        b('两者相乘，先回放乘积最大的那一段。', 'Multiply the two and replay the experience with the largest product first.'),
      ],
      example: b(
        '迷宫中刚发现终点有奖赏：终点前一步的收益很大（价值从 $0$ 变成接近奖赏），而且以后经常经过，乘积最大，所以先回放这一步；接着回放再前一步，形成从终点倒着回到起点的倒放序列。动物实验中恰好在得到奖赏后观察到更多倒放。',
        'A reward was just found at the end of a maze. The step before the goal has a large gain, its value jumping from $0$ to nearly the reward, and it will be visited often, so its product is largest and it is replayed first. The step before it follows, giving a reverse sequence from goal back to start. Animal experiments do show more reverse replay right after reward.'),
      consequences: [
        b('统一解释了倒放（奖赏后从终点倒推）和前放（决策前预演未来路径）。', 'It explains both reverse replay, working back from the goal after reward, and forward replay, previewing future paths before a decision.'),
        b('把回放看作在离线时有选择地做强化学习更新，与优先经验回放思路相同。', 'It treats replay as selective offline reinforcement learning updates, the same idea as prioritized experience replay.'),
      ],
      limitations: [
        b('这是一个规范理论，说明「应当」怎样选择，不说明海马怎样算出收益和需要。', 'It is a normative theory of what should be chosen, not how the hippocampus computes gain and need.'),
        b('睡眠中的回放还与巩固和记忆整合有关，模型只描述了决策相关的部分。', 'Sleep replay also serves consolidation and integration, and the model covers only the decision-related part.'),
      ],
    },
    {
      title: b('突触下调：按比例缩小，保留相对强弱', 'Synaptic downscaling: shrink in proportion, keep relative strengths'),
      tex: t`w_i' = w_i \cdot \frac{W_{\text{target}}}{\sum_j w_j},\qquad w_i' < \theta \;\Rightarrow\; w_i' := 0`,
      symbols: [
        { tex: t`w_i`, meaning: b('清醒结束时第 $i$ 个突触的强度', 'strength of synapse $i$ at the end of waking') },
        { tex: t`W_{\text{target}}`, meaning: b('一个神经元突触强度总和的目标值', 'target total of a neuron’s synaptic strengths') },
        { tex: t`w_i'`, meaning: b('睡眠后的强度', 'strength after sleep') },
        { tex: t`\theta`, meaning: b('维持一个突触所需的最低强度；低于它的突触被移除（记为 $0$）', 'minimum strength needed to keep a synapse; weaker ones are removed, set to $0$') },
      ],
      steps: [
        b('清醒时的学习使突触总强度上升。', 'Learning while awake raises total synaptic strength.'),
        b('睡眠中，每个突触乘以同一个比例，使总和回到目标值。', 'In sleep, every synapse is multiplied by the same factor so the total returns to the target.'),
        b('相对强弱不变，所以重要的记忆保留；原本就很弱的突触降到阈值以下被移除，形成遗忘。', 'Relative strengths are unchanged, so important memories stay. Synapses that were already weak drop below threshold and are removed, which is forgetting.'),
      ],
      example: b(
        '三个突触强度为 $(4, 2, 0.5)$，总和 $6.5$，目标为 $5$。比例为 $5/6.5 \\approx 0.77$，下调后约为 $(3.1, 1.5, 0.38)$。若阈值 $\\theta = 0.4$，第三个突触被移除，前两个的比例仍是 $2 : 1$。',
        'Three synapses have strengths $(4, 2, 0.5)$, a total of $6.5$, and the target is $5$. The factor is $5/6.5 \\approx 0.77$, giving about $(3.1, 1.5, 0.38)$. With threshold $\\theta = 0.4$, the third synapse is removed, and the first two keep their $2 : 1$ ratio.'),
      consequences: [
        b('睡眠后神经元恢复学习余地，同时降低能耗。', 'After sleep, neurons regain room to learn and use less energy.'),
        b('弱而孤立的痕迹被清除，强的被相对突出，有助于从噪声中提取重要信息。', 'Weak, isolated traces are cleared and strong ones stand out, helping extract what matters from noise.'),
      ],
      limitations: [
        b('这是一个假说的简化形式；睡眠中也有特定突触被增强的证据。', 'This is a simplified form of a hypothesis. There is also evidence that specific synapses are strengthened in sleep.'),
        b('真实的下调可能因突触类型和脑区而不同，并非统一的比例。', 'Real downscaling may differ by synapse type and region rather than using one factor.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('优先经验回放：误差越大，越常被抽到', 'Prioritized experience replay: larger errors are drawn more often'),
      tex: t`P(i) = \frac{p_i^{\alpha}}{\sum_k p_k^{\alpha}},\qquad p_i = |\delta_i| + \epsilon,\qquad w_i = \Big(\frac{1}{N\,P(i)}\Big)^{\beta}`,
      symbols: [
        { tex: t`\delta_i`, meaning: b('第 $i$ 条经历最近一次的时序差分误差', 'latest temporal-difference error of experience $i$') },
        { tex: t`p_i`, meaning: b('优先级；$\\epsilon$ 是一个很小的数，保证误差为 $0$ 的经历也有机会', 'priority; $\\epsilon$ is a small number so experiences with zero error still have a chance') },
        { tex: t`\alpha`, meaning: b('优先的程度：$0$ 为均匀抽样，越大越偏向高误差', 'degree of prioritization: $0$ is uniform, larger favors high errors') },
        { tex: t`P(i)`, meaning: b('第 $i$ 条经历被抽到的概率', 'probability of drawing experience $i$') },
        { tex: t`N`, meaning: b('缓冲区中的经历数', 'number of experiences in the buffer') },
        { tex: t`w_i,\;\beta`, meaning: b('重要性权重及其强度，用来修正抽样带来的偏差', 'importance weight and its strength, correcting the bias from sampling') },
      ],
      steps: [
        b('每条经历的优先级等于它的误差绝对值，加一个小数。', 'Each experience’s priority is its absolute error plus a small number.'),
        b('按优先级的 $\\alpha$ 次方占总和的比例抽样。', 'Sample in proportion to priority raised to the power $\\alpha$.'),
        b('被多抽的经历在更新时乘以较小的重要性权重，避免学到偏斜的分布；抽到后用新误差更新它的优先级。', 'Experiences drawn more often get a smaller importance weight in the update to avoid a skewed distribution. After use, their priority updates with the new error.'),
      ],
      example: b(
        '三条经历的误差为 $2$、$1$、$0.1$，取 $\\alpha = 1$、忽略 $\\epsilon$。抽样概率约为 $2/3.1 \\approx 0.65$、$0.32$、$0.03$。误差最大的经历被抽到的次数约是最小者的 20 倍。',
        'Three experiences have errors $2$, $1$ and $0.1$. With $\\alpha = 1$ and $\\epsilon$ ignored, the probabilities are about $2/3.1 \\approx 0.65$, $0.32$ and $0.03$. The largest-error experience is drawn about 20 times as often as the smallest.'),
      consequences: [
        b('学习集中在意外的经历上，在 Atari 游戏上明显加快了训练。', 'Learning concentrates on surprising experiences, which clearly sped up training on Atari games.'),
        b('与大脑偏向回放意外和有奖赏经历的现象在功能上相似。', 'It is functionally similar to the brain favoring replay of surprising and rewarding experience.'),
      ],
      limitations: [
        b('优先级只看误差，不考虑将来是否会用到（「需要」）。', 'Priority considers only error, not whether the state will be needed in the future.'),
        b('回放的是逐字保存的原始经历，不会像大脑那样压缩、重组或泛化。', 'It replays verbatim raw experience, without the compression, recombination or generalization of the brain.'),
      ],
    },
    {
      title: b('分片遗忘：删除数据时只重新训练受影响的部分', 'Sharded unlearning: retrain only the affected part when deleting data'),
      tex: t`f(x) = \operatorname{agg}\big(f_1(x), \dots, f_S(x)\big),\qquad C_{\text{delete}} \approx \frac{C_{\text{train}}}{S}`,
      symbols: [
        { tex: t`S`, meaning: b('训练数据被分成的片数', 'number of shards the training data is split into') },
        { tex: t`f_s`, meaning: b('只在第 $s$ 片数据上训练的子模型', 'submodel trained only on shard $s$') },
        { tex: t`\operatorname{agg}`, meaning: b('汇总各子模型的预测，例如投票', 'aggregation of the submodels’ predictions, such as a vote') },
        { tex: t`f(x)`, meaning: b('最终的预测', 'the final prediction') },
        { tex: t`C_{\text{delete}},\;C_{\text{train}}`, meaning: b('删除一条数据的代价和完整训练一次的代价', 'cost of deleting one data point and of one full training run') },
      ],
      steps: [
        b('把训练数据分成 $S$ 片，每片训练一个独立的子模型。', 'Split the training data into $S$ shards and train an independent submodel on each.'),
        b('预测时汇总所有子模型的输出。', 'At prediction time, aggregate the outputs of all submodels.'),
        b('要删除某条数据时，只重新训练包含它的那个子模型，其余不动。', 'To delete a data point, retrain only the submodel that contains it and leave the rest.'),
      ],
      example: b(
        '分成 $S = 10$ 片。删除一条数据只需重新训练一个子模型，代价约为完整训练的 10%。代价是每个子模型只见过十分之一的数据，汇总后的准确率可能低于在全部数据上训练的单个模型。',
        'With $S = 10$ shards, deleting one data point retrains a single submodel, about 10% of full training. The cost is that each submodel sees only a tenth of the data, so the aggregate may be less accurate than one model trained on everything.'),
      consequences: [
        b('能保证被删数据的影响真正消失，而不是只被掩盖。', 'It guarantees the deleted data’s influence is truly gone, not just hidden.'),
        b('说明「精确遗忘」在 AI 中需要从训练阶段就为它设计结构。', 'It shows precise forgetting in AI must be designed into the structure from training onward.'),
      ],
      limitations: [
        b('对大语言模型这样的单一大模型，分片训练很难实施，近似遗忘方法的效果难以验证。', 'For a single large model such as a language model, sharded training is hard to apply, and approximate unlearning is hard to verify.'),
        b('与大脑的遗忘不同：这里删除的是指定的数据，大脑遗忘的是不再有用的内容。', 'Unlike forgetting in the brain, this deletes specified data, while the brain forgets what is no longer useful.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('依赖睡眠', 'Depends on sleep'),
        text: b('睡眠不足会削弱新记忆的巩固；随着年龄增长，深睡和纺锤波减少，巩固也随之变差。', 'Lack of sleep weakens consolidation of new memories. With age, deep sleep and spindles decline, and consolidation worsens.'),
        steps: [2, 3],
      },
      {
        title: b('回放会重组和失真', 'Replay recombines and distorts'),
        text: b('回放的内容被压缩、可能拼接不同经历，巩固后的记忆往往保留要点、丢失细节。', 'Replayed content is compressed and may stitch experiences together, so consolidated memory often keeps the gist and loses detail.'),
        steps: [4, 5],
      },
      {
        title: b('遗忘不能按需控制', 'Forgetting is not on demand'),
        text: b('想忘的不一定忘得掉（如创伤记忆），想记的也会遗忘。', 'What one wants to forget may persist, such as traumatic memories, and what one wants to keep may fade.'),
        steps: [6],
      },
    ],
    computational: [
      {
        title: b('回放策略靠人设计', 'Replay rules are designed'),
        text: b('缓冲区大小、抽样规则和回放比例都要人为设定，不同任务需要不同的调整。', 'Buffer size, sampling rule and replay ratio are all set by people and need tuning for each task.'),
        steps: [2, 3],
      },
      {
        title: b('部署后没有离线整理', 'No offline phase after deployment'),
        text: b('模型在使用中不回放、不整合，知识停在训练截止日期。', 'Models in use do not replay or integrate, so knowledge stops at the training cutoff.'),
        steps: [4],
      },
      {
        title: b('难以精确遗忘', 'Precise forgetting is hard'),
        text: b('从大模型中删除特定数据的影响，通常只能近似处理，或代价高昂地重新训练。', 'Removing specific data from a large model is usually only approximate or needs costly retraining.'),
        steps: [6],
      },
    ],
    misreadings: [
      {
        claim: b('睡眠就是大脑在做经验回放训练', 'Sleep is the brain doing experience replay'),
        fact: b('两者都离线重放经历；睡眠回放被压缩、有选择、与皮层节律协调，还伴随突触下调，远不只是从缓冲区抽样训练。', 'Both replay experience offline. Sleep replay is compressed, selective and coordinated with cortical rhythms, with downscaling too, far more than drawing samples from a buffer.'),
      },
      {
        claim: b('遗忘只是记忆的失败', 'Forgetting is just memory failing'),
        fact: b('遗忘有专门的分子机制，清除无用痕迹有助于泛化和减少干扰；但人并不能随意选择忘掉什么。', 'Forgetting has dedicated molecular mechanisms, and clearing useless traces helps generalization and reduces interference. But people cannot choose freely what to forget.'),
      },
      {
        claim: b('Dreamer 的想象就是做梦', 'Dreamer’s imagination is dreaming'),
        fact: b('Dreamer 在学到的世界模型中生成经历来训练策略，这与「睡眠中模拟经历」在功能上有相似之处；做梦的功能仍未确定，两者不能等同。', 'Dreamer generates experience in a learned world model to train its policy, which resembles simulating experience in sleep in function. The function of dreaming is still unknown, so the two cannot be equated.'),
      },
    ],
  },
  refs: {
    neuro: ['wilson1994', 'girardeau2009', 'buzsaki2015', 'latchoumane2017', 'ambrose2016', 'diekelmann2010', 'wagner2004', 'tononi2014', 'davis2017'],
    models: ['mattar2018'],
    ai: ['lin1992', 'mnih2015', 'schaul2015', 'shin2017', 'hafner2023', 'bourtoule2019'],
  },
}
