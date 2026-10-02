import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F08 Meta-learning and rapid adaptation: prefrontal meta-reinforcement learning vs in-context learning and meta-learning algorithms. */
export const META_LEARNING: TopicContent = {
  thesis: {
    biological: b(
      '经历过许多同类问题后，动物和人会「学会怎么学」：猴子做过几百个两选一问题后，遇到新问题只需试一次就知道答案。一种有影响的理论认为，多巴胺驱动的慢速突触学习把前额叶训练成一个快速学习器；在新任务中，前额叶靠神经活动的变化在几次试验内调整策略，突触不必改变。学习速度本身也会被调节：环境越多变，学得越快。',
      'After many problems of one kind, animals and people learn how to learn. Monkeys that solved a few hundred two-choice problems needed a single trial to solve a new one. One influential theory holds that slow, dopamine-driven synaptic learning trains prefrontal cortex into a fast learner. In a new task, prefrontal activity changes over a few trials to adjust the strategy, without changing synapses. Learning speed itself is tuned, rising when the environment is volatile.'),
    computational: b(
      '一条路线是元学习算法（如 MAML）：在许多任务上训练，找到一个好的起点，几步梯度就能适应新任务。另一条是上下文学习：大语言模型在提示里看到几个示例就能完成新任务，参数不变，适应只发生在激活中。在一些简化设定下，上下文学习在数学上等价于在激活中执行一步梯度下降。',
      'One route is meta-learning algorithms such as MAML. Training on many tasks finds a good starting point from which a few gradient steps adapt to a new task. The other is in-context learning. A large language model sees a few examples in the prompt and does a new task with unchanged parameters, so adaptation happens only in activations. In some simplified settings, in-context learning is mathematically equivalent to one step of gradient descent in the activations.'),
    gap: b(
      '两边都用「慢学习塑造快学习」的两层结构。差距在于快学习的去向：大脑的快速适应能逐渐巩固进长期记忆；模型的上下文学习在会话结束后消失，元学习的效果也局限在与训练任务相似的范围内。',
      'Both use two levels, slow learning shaping fast learning. The gap is where fast learning goes. The brain’s rapid adaptation can consolidate into long-term memory, while in-context learning vanishes after the session and meta-learning works only near the training tasks.'),
  },
  short: { biological: b('前额叶', 'Prefrontal cortex'), computational: b('上下文学习', 'In-context learning') },
  kinds: ['behavior', 'algorithm', 'math'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月的大语言模型上下文学习与主流元学习算法。', 'The computational column describes in-context learning in large language models and mainstream meta-learning algorithms as of October 2026.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('少样本适应', 'Few-shot adaptation'),
      brain: b('学会一类问题的规律后，新问题试一次就能找到答案。', 'Once the pattern of a problem type is learned, a new problem is solved after one try.'),
      ai: b('大语言模型在提示中看到几个示例，就能完成新的分类、改写或格式转换任务。', 'A large language model given a few examples in the prompt can do a new classification, rewriting or format task.'),
      gap: b('两者都能从几个例子中快速适应，前提都是之前有大量同类经历。', 'Both adapt quickly from a few examples, and both depend on much prior experience of similar tasks.'),
    },
    {
      lead: 'bio',
      dimension: b('调节学习速度', 'Tuning learning speed'),
      brain: b('环境频繁变化时，人会自动加快学习、更看重最近的结果；环境稳定时则放慢。', 'When the environment changes often, people speed up learning and weight recent outcomes more. When it is stable, they slow down.'),
      ai: b('训练中的学习率按预设的计划变化；上下文学习能部分适应变化，但没有显式追踪环境稳定性的机制。', 'Learning rates in training follow a preset schedule. In-context learning partly adapts to change but has no explicit mechanism tracking how stable the environment is.'),
      gap: b('大脑把「学多快」当作一个随时估计的量，模型通常把它当作外部设定。', 'The brain treats learning speed as something to estimate continuously, while models usually treat it as a setting.'),
    },
    {
      lead: 'bio',
      dimension: b('保留快速学到的东西', 'Keeping what was learned fast'),
      brain: b('在任务中快速学到的规则，经过练习和睡眠可以成为长期记忆。', 'Rules picked up quickly in a task can become long-term memory through practice and sleep.'),
      ai: b('上下文中学到的规律在会话结束后消失；要保留需要另外微调。', 'Patterns learned in context vanish when the session ends. Keeping them needs separate fine-tuning.'),
      gap: b('模型的快学习和慢学习之间没有自动的通道。', 'Models have no automatic path from fast to slow learning.'),
    },
    {
      lead: 'comp',
      dimension: b('可适应的任务范围', 'Range of tasks'),
      brain: b('快速适应主要发生在自己熟悉的领域；陌生领域要从头积累经验。', 'Rapid adaptation happens mainly in familiar domains. Unfamiliar ones need experience built from scratch.'),
      ai: b('同一个模型可以在翻译、编程、数学和写作等大量领域中按示例适应。', 'One model adapts from examples across many domains, such as translation, coding, math and writing.'),
      gap: b('预训练覆盖的领域远多于一个人的经验，所以模型可适应的任务更广。', 'Pretraining covers far more domains than one person’s experience, so models adapt across a wider range.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('慢速学习：多巴胺与突触', 'Slow learning: dopamine and synapses'),
        points: [
          b('在许多同类任务中，多巴胺的奖赏预测误差逐渐调整前额叶和纹状体的突触。', 'Across many tasks of one kind, dopamine reward prediction errors gradually adjust synapses in prefrontal cortex and striatum.'),
          b('这一过程需要数天到数月，结果是前额叶学会了「这类任务一般怎样解」。', 'This takes days to months and leaves prefrontal cortex knowing how tasks of this kind are usually solved.'),
        ],
      },
      {
        title: b('前额叶的循环网络', 'Prefrontal recurrent network'),
        points: [
          b('前额叶接收当前的观察，以及上一个动作和上一次的奖赏。', 'Prefrontal cortex receives the current observation together with the last action and the last reward.'),
          b('循环连接让活动在试验之间保持，并把这些历史整合成一个活动模式。', 'Recurrent connections keep activity going between trials and integrate this history into one pattern of activity.'),
        ],
      },
      {
        title: b('快速学习：在活动中', 'Fast learning: in activity'),
        points: [
          b('在新任务中，前额叶的活动模式随每次试验的结果改变，代表「现在哪个选项更好」。', 'In a new task, the prefrontal pattern changes with each trial’s outcome and represents which option is currently better.'),
          b('这种学习发生在几秒到几分钟内，突触几乎不变。', 'This learning takes seconds to minutes, with synapses almost unchanged.'),
        ],
      },
      {
        title: b('选择动作', 'Choosing an action'),
        points: [b('前额叶的活动送到纹状体和运动区，决定下一步的选择；结果又回到第 2 步。', 'Prefrontal activity goes to the striatum and motor areas to set the next choice, and the result returns to step 2.')],
      },
      {
        title: b('调节学习速度', 'Tuning learning speed'),
        points: [
          b('前扣带皮层等区域追踪环境变化得有多快；变化越快，学习率越高。', 'Areas such as anterior cingulate cortex track how fast the environment changes, and faster change means a higher learning rate.'),
          b('去甲肾上腺素、乙酰胆碱等调质被认为参与设定学习速度和探索程度。', 'Modulators such as noradrenaline and acetylcholine are thought to help set learning speed and exploration.'),
        ],
      },
    ],
    computational: [
      {
        title: b('预训练（慢）', 'Pretraining (slow)'),
        points: [
          b('用梯度下降在海量文本或大量任务上训练参数，持续数周到数月。', 'Gradient descent trains the parameters on huge amounts of text or many tasks over weeks to months.'),
          b('训练数据中反复出现「先给例子、再按例子回答」的结构，上下文学习能力随之出现。', 'The data repeatedly shows examples followed by answers in the same pattern, and in-context learning emerges from this.'),
        ],
      },
      {
        title: b('提示中的示例', 'Examples in the prompt'),
        points: [b('输入几组「问题与答案」，最后是一个新问题；这些示例只存在于上下文窗口中。', 'The input holds a few question and answer pairs, then a new question. The examples exist only in the context window.')],
      },
      {
        title: b('注意力读取示例', 'Attention reads the examples'),
        points: [
          b('新问题的词元通过注意力读取示例；某些注意力头会找到前面出现过的相同模式，并复制它的后续（归纳头）。', 'Tokens of the new question read the examples through attention. Some heads find an earlier occurrence of the same pattern and copy what followed, called induction heads.'),
          b('示例中的规律因此体现在激活里，参数没有改变。', 'The pattern in the examples thus lives in the activations, with parameters unchanged.'),
        ],
      },
      {
        title: b('输出', 'Output'),
        points: [b('模型按示例中的规律给出答案。', 'The model answers following the pattern in the examples.')],
      },
      {
        title: b('元学习算法', 'Meta-learning algorithms'),
        points: [
          b('MAML 等方法分两层训练：内层在单个任务上走几步梯度，外层调整初始参数，让这几步尽量有效。', 'Methods such as MAML train on two levels. The inner level takes a few gradient steps on one task, and the outer level adjusts the starting parameters so those steps work as well as possible.'),
          b('另一类（如 RL$^2$）直接训练一个循环网络，让它在活动中学习，与前额叶理论的结构相同。', 'Another kind, such as RL$^2$, trains a recurrent network to learn in its activity, the same structure as the prefrontal theory.'),
        ],
      },
      {
        title: b('缺失的一步（虚线框）', 'The missing step (dashed box)'),
        points: [b('没有把上下文中学到的东西巩固进参数的步骤；会话结束后它就消失。', 'No step consolidates what was learned in context into the parameters, so it disappears when the session ends.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('「学习定势」由 Harlow 在 1949 年提出：猴子面对一系列两选一问题，每个问题的正确物体不同。做过几百个问题后，猴子在新问题的第二次试验就几乎全对：第一次试错后，按结果「留下或换掉」。', 'Harlow described learning sets in 1949. Monkeys faced a series of two-choice problems, each with a different correct object. After a few hundred problems they were nearly always right on the second trial of a new one, keeping or switching after the first outcome.'),
      b('前额叶元强化学习理论来自 2018 年的建模研究：用强化学习训练的循环网络，再现了猴子和人在多种任务中的行为和前额叶神经活动。它是一种解释框架，相应的神经证据仍在积累。', 'The prefrontal meta-reinforcement learning theory comes from a 2018 modeling study. A recurrent network trained by reinforcement learning reproduced monkey and human behavior and prefrontal activity in several tasks. It is an explanatory framework, and neural evidence is still accumulating.'),
      b('环境多变时学习率升高的证据来自 2007 年的人类实验：奖赏规律频繁变化的阶段，被试更看重最近的结果，前扣带皮层的活动与估计的变化程度相关。', 'Evidence that learning rate rises in volatile settings comes from a 2007 human study. In phases where reward rules changed often, participants weighted recent outcomes more, and anterior cingulate activity tracked the estimated volatility.'),
      b('工作记忆也贡献了快速学习：在需要记住的刺激不多时，人主要靠工作记忆而不是强化学习来快速调整。', 'Working memory also contributes to fast learning. When only a few stimuli must be remembered, people adjust mainly through working memory rather than reinforcement learning.'),
    ],
    computational: [
      b('上下文学习在 GPT-3（2020）中被系统报告：不更新参数，只在提示中放入示例，就能完成多种新任务。', 'In-context learning was reported systematically for GPT-3 in 2020: with examples in the prompt and no parameter updates, it handled many new tasks.'),
      b('研究发现，训练数据的分布影响上下文学习是否出现：同一类别成簇出现、类别频率差异很大时更容易出现；它与「把知识存进权重」的学习之间存在此消彼长。', 'Studies found that the data distribution decides whether in-context learning emerges. It appears more readily when items of a class come in bursts and class frequencies vary widely, and it trades off against storing knowledge in the weights.'),
      b('「上下文学习等价于梯度下降」的结果来自线性回归等简化设定中的构造和训练实验；在大模型中它是一种解释，并非全部机制。', 'The result that in-context learning equals gradient descent comes from constructions and experiments in simplified settings such as linear regression. In large models it is one explanation, not the whole mechanism.'),
      b('上下文窗口的长度限制了一次能放入的示例数；示例的顺序和格式也会明显影响结果。', 'Context length limits how many examples fit, and the order and format of examples noticeably affect results.'),
    ],
  },
  bioMath: [
    {
      title: b('自适应学习率：意外越多，学得越快', 'Adaptive learning rate: more surprise, faster learning'),
      tex: t`V_{t+1} = V_t + \alpha_t\,\delta_t,\qquad \delta_t = r_t - V_t,\qquad \alpha_{t+1} = \eta\,|\delta_t| + (1 - \eta)\,\alpha_t`,
      symbols: [
        { tex: t`V_t`, meaning: b('第 $t$ 次试验时对某个选项奖赏的预期', 'expected reward of an option on trial $t$') },
        { tex: t`r_t`, meaning: b('这次实际得到的奖赏', 'reward actually received this time') },
        { tex: t`\delta_t`, meaning: b('预测误差：实际减去预期', 'prediction error: actual minus expected') },
        { tex: t`\alpha_t`, meaning: b('学习率：每次用多大比例的误差修正预期', 'learning rate: how much of the error corrects the expectation') },
        { tex: t`\eta`, meaning: b('学习率本身变化的快慢', 'how fast the learning rate itself changes') },
      ],
      steps: [
        b('每次试验后，用预测误差的一部分修正预期，这一部分就是学习率 $\\alpha_t$。', 'After each trial, correct the expectation by a share of the prediction error. That share is the learning rate $\\alpha_t$.'),
        b('学习率本身也更新：最近的误差绝对值大（经常出乎意料），学习率就升高；误差小，学习率就回落。', 'The learning rate updates too. Large recent errors, frequent surprise, raise it, and small errors let it fall back.'),
        b('结果是环境变化时学得快，环境稳定时学得慢、不被偶然的结果带偏。', 'The result is fast learning when things change and slow learning when they are stable, so chance outcomes do not mislead.'),
      ],
      example: b(
        '设 $\\eta = 0.5$，起初 $\\alpha = 0.1$、$V = 0.8$。规则突然改变，奖赏变为 $0$：误差 $-0.8$，预期降为 $0.8 - 0.1 \\times 0.8 = 0.72$，学习率升为 $0.5 \\times 0.8 + 0.5 \\times 0.1 = 0.45$。下一次奖赏仍为 $0$：误差 $-0.72$，预期降到 $0.72 - 0.45 \\times 0.72 \\approx 0.40$，下降速度明显加快。',
        'Let $\\eta = 0.5$, with $\\alpha = 0.1$ and $V = 0.8$ at first. The rule suddenly changes and reward drops to $0$. The error is $-0.8$, the expectation falls to $0.8 - 0.1 \\times 0.8 = 0.72$ and the learning rate rises to $0.5 \\times 0.8 + 0.5 \\times 0.1 = 0.45$. Reward is $0$ again: the error is $-0.72$ and the expectation drops to $0.72 - 0.45 \\times 0.72 \\approx 0.40$, a much faster fall.'),
      consequences: [
        b('学习速度成为由经验调节的量，而不是固定参数，这就是一种最简单的「学会怎么学」。', 'Learning speed becomes something experience tunes rather than a fixed parameter, the simplest form of learning to learn.'),
        b('它预测人在多变的环境中会更看重最近的结果，实验结果与此一致。', 'It predicts that people weight recent outcomes more in volatile settings, as experiments show.'),
      ],
      limitations: [
        b('只调节一个学习率，学不到任务的结构（例如「两个选项此消彼长」）。', 'It tunes one learning rate and cannot learn task structure, such as two options moving in opposite directions.'),
        b('更完整的模型用贝叶斯方法同时估计环境的变化程度和不确定性。', 'Fuller models use Bayesian methods to estimate volatility and uncertainty together.'),
      ],
    },
    {
      title: b('元强化学习：权重固定，学习发生在循环活动中', 'Meta-reinforcement learning: fixed weights, learning in recurrent activity'),
      tex: t`\mathbf{h}_t = f\big(W_h\,\mathbf{h}_{t-1} + W_x\,[\,\mathbf{o}_t,\; a_{t-1},\; r_{t-1}\,]\big),\qquad a_t \sim \pi(\mathbf{h}_t)`,
      symbols: [
        { tex: t`\mathbf{h}_t`, meaning: b('第 $t$ 步前额叶网络的活动模式', 'activity pattern of the prefrontal network at step $t$') },
        { tex: t`\mathbf{o}_t`, meaning: b('当前的观察', 'the current observation') },
        { tex: t`a_{t-1},\;r_{t-1}`, meaning: b('上一个动作和上一次的奖赏', 'the last action and the last reward') },
        { tex: t`W_h,\;W_x`, meaning: b('循环连接和输入连接的权重，在新任务中保持不变', 'recurrent and input weights, unchanged in a new task') },
        { tex: t`f`, meaning: b('神经元的非线性响应', 'nonlinear response of the neurons') },
        { tex: t`\pi`, meaning: b('由当前活动决定的选择概率', 'choice probabilities set by the current activity') },
      ],
      steps: [
        b('每一步，网络把上一次的动作和奖赏与当前观察一起输入。', 'At each step, the network takes the last action and reward along with the current observation.'),
        b('循环连接把这些输入与过去的活动合并，形成新的活动模式。', 'Recurrent connections merge these inputs with past activity into a new pattern.'),
        b('活动模式决定下一次的选择。经过长期训练的权重，使这一过程本身就像一个学习算法：活动在几次试验内「记住」哪个选项更好。', 'The pattern sets the next choice. Weights trained over a long time make this process act like a learning algorithm, with activity remembering within a few trials which option is better.'),
      ],
      example: b(
        '两个选项，其中一个每次有奖。网络第一次选左边，没有得到奖赏；这一结果作为输入进入网络，活动模式随之偏向「右边更好」，第二次就选右边并得到奖赏，之后一直选右边。整个过程中 $W_h$ 和 $W_x$ 都没有改变。',
        'Two options, one always rewarded. The network first picks left and gets nothing. That outcome enters as input, the activity shifts toward “right is better”, the second choice is right and rewarded, and it keeps choosing right. $W_h$ and $W_x$ never change throughout.'),
      consequences: [
        b('解释了为什么学会一类问题后，新问题能在几次试验内解决，而不需要逐步改变突触。', 'It explains why, once a problem type is learned, a new problem is solved within a few trials without gradual synaptic change.'),
        b('慢速的多巴胺学习负责训练权重，快速学习由权重塑造的动力学完成，形成两个时间尺度。', 'Slow dopamine learning trains the weights, and fast learning comes from the dynamics those weights shape, giving two time scales.'),
      ],
      limitations: [
        b('理论来自建模；神经证据主要是行为与活动模式的相似，因果证据仍有限。', 'The theory comes from modeling. Neural evidence is mainly similarity of behavior and activity, and causal evidence is limited.'),
        b('训练好的网络只在与训练任务相似的问题上快速学习。', 'The trained network learns fast only on problems like its training tasks.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('MAML：学一个好的起点，几步梯度就能适应新任务', 'MAML: learning a starting point from which a few gradient steps adapt'),
      tex: t`\theta_i' = \theta - \alpha\,\nabla_{\theta}\mathcal{L}_{i}(\theta),\qquad \theta \leftarrow \theta - \beta\,\nabla_{\theta}\sum_{i} \mathcal{L}_{i}\big(\theta_i'\big)`,
      symbols: [
        { tex: t`\theta`, meaning: b('共享的初始参数', 'the shared starting parameters') },
        { tex: t`\mathcal{L}_i`, meaning: b('第 $i$ 个任务的损失', 'loss of task $i$') },
        { tex: t`\theta_i'`, meaning: b('在任务 $i$ 上走一步梯度后的参数', 'parameters after one gradient step on task $i$') },
        { tex: t`\alpha,\;\beta`, meaning: b('内层（适应）和外层（元学习）的学习率', 'learning rates of the inner, adapting level and the outer, meta level') },
      ],
      steps: [
        b('内层：对每个训练任务，从同一个起点 $\\theta$ 出发走一步梯度，得到适应后的参数 $\\theta_i\'$。', 'Inner level: for each training task, take one gradient step from the same start $\\theta$ to get adapted parameters $\\theta_i\'$.'),
        b('看适应后的参数在各自任务上表现如何，把这些损失加起来。', 'Check how the adapted parameters do on their tasks and add up the losses.'),
        b('外层：调整起点 $\\theta$，让「走一步之后」的总损失最小。', 'Outer level: adjust the start $\\theta$ so the total loss after one step is as small as possible.'),
      ],
      example: b(
        '两个任务，损失分别是 $(\\theta - 1)^2$ 和 $(\\theta + 1)^2$，取 $\\alpha = 0.25$。从 $\\theta$ 出发走一步，得到 $0.5\\theta + 0.5$ 和 $0.5\\theta - 0.5$，适应后的总损失为 $0.25\\,(\\theta - 1)^2 + 0.25\\,(\\theta + 1)^2$，在 $\\theta = 0$ 时最小。最好的起点在两个任务的中间，一步就能向任意一个靠近一半。',
        'Two tasks with losses $(\\theta - 1)^2$ and $(\\theta + 1)^2$, and $\\alpha = 0.25$. One step from $\\theta$ gives $0.5\\theta + 0.5$ and $0.5\\theta - 0.5$. The total loss after adapting is $0.25\\,(\\theta - 1)^2 + 0.25\\,(\\theta + 1)^2$, smallest at $\\theta = 0$. The best start lies between the tasks, and one step covers half the distance to either.'),
      consequences: [
        b('起点本身成了「学到的知识」：它编码了这类任务的共同结构。', 'The starting point becomes learned knowledge, encoding the shared structure of the task family.'),
        b('适应仍要改变参数，只是需要的步数和数据很少。', 'Adapting still changes parameters, but with very few steps and examples.'),
      ],
      limitations: [
        b('新任务与训练任务差别较大时，几步梯度不够。', 'When a new task differs a lot from the training tasks, a few steps are not enough.'),
        b('外层要对内层的梯度再求梯度，计算和内存开销大。', 'The outer level differentiates through the inner gradient, which is costly in computation and memory.'),
      ],
    },
    {
      title: b('上下文学习作为梯度下降：线性注意力在激活中完成一步学习', 'In-context learning as gradient descent: linear attention takes one learning step in activations'),
      tex: t`\hat{y}_q = \eta \sum_{j=1}^{n} y_j\,\big(\mathbf{x}_j^{\top}\mathbf{x}_q\big) = W_1\,\mathbf{x}_q,\qquad W_1 = 0 + \eta \sum_{j=1}^{n} y_j\,\mathbf{x}_j^{\top}`,
      symbols: [
        { tex: t`(\mathbf{x}_j, y_j)`, meaning: b('提示中的第 $j$ 个示例：输入和答案', 'example $j$ in the prompt: input and answer') },
        { tex: t`\mathbf{x}_q`, meaning: b('新问题的输入', 'input of the new question') },
        { tex: t`\hat{y}_q`, meaning: b('模型给出的答案', 'the model’s answer') },
        { tex: t`\eta`, meaning: b('相当于学习率的缩放系数', 'a scaling factor that plays the role of a learning rate') },
        { tex: t`W_1`, meaning: b('线性回归从权重 $0$ 出发、在示例上走一步梯度后的权重', 'linear regression weights after one gradient step on the examples, starting from $0$') },
      ],
      steps: [
        b('左边是线性注意力：新问题作为查询，与每个示例的输入作点积，再按点积加权汇总示例的答案。', 'The left side is linear attention. The new question is the query, its dot product with each example input weights that example’s answer, and the answers are summed.'),
        b('右边是线性回归的一步梯度下降：从权重 $0$ 出发，在示例上走一步，再用得到的权重预测新问题。', 'The right side is one gradient descent step of linear regression: start from weights $0$, step once on the examples and predict the new question with the result.'),
        b('两边的结果完全相同，所以注意力层可以在不改变参数的情况下，在激活中完成一步学习。', 'The two sides are identical, so an attention layer can take one learning step in its activations without changing parameters.'),
      ],
      example: b(
        '示例为 $(1, 2)$ 和 $(2, 4)$，规律是 $y = 2x$；新问题 $x_q = 3$。点积加权和为 $3 \\times 1 \\times 2 + 3 \\times 2 \\times 4 = 30$，取 $\\eta = 1/(1^2 + 2^2) = 0.2$，答案为 $6$，正好符合规律。',
        'The examples are $(1, 2)$ and $(2, 4)$, following $y = 2x$, and the new question is $x_q = 3$. The weighted sum is $3 \\times 1 \\times 2 + 3 \\times 2 \\times 4 = 30$. With $\\eta = 1/(1^2 + 2^2) = 0.2$ the answer is $6$, exactly right.'),
      consequences: [
        b('解释了「参数不变也能学习」：学习发生在注意力对示例的读取中。', 'It explains learning without parameter changes: learning happens in how attention reads the examples.'),
        b('多层注意力可以叠加成多步学习，所以示例越多、层数越深，适应可能越好。', 'Stacked attention layers can add up to several learning steps, so more examples and depth may adapt better.'),
      ],
      limitations: [
        b('等价关系在线性注意力和简单回归任务中严格成立；大模型中的软注意力和复杂任务只能部分用它解释。', 'The equivalence holds exactly for linear attention on simple regression. Softmax attention and complex tasks in large models are explained only in part.'),
        b('这一步「学习」只存在于激活中，会话结束就消失。', 'This learning step exists only in activations and vanishes at the end of the session.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('只在熟悉的问题上快', 'Fast only on familiar problems'),
        text: b('「学会怎么学」依赖长期经历过的同类问题；结构陌生的问题仍要慢慢学。', 'Learning to learn depends on long experience with similar problems. Problems with unfamiliar structure are still learned slowly.'),
        steps: [1],
      },
      {
        title: b('工作记忆容量有限', 'Limited working memory'),
        text: b('快速学习依赖在活动中保持信息，需要同时记住的东西一多，快速学习就失效。', 'Fast learning keeps information in activity, so it fails when too much must be held at once.'),
        steps: [2, 3],
      },
      {
        title: b('会过度调整', 'Overreacting'),
        text: b('把偶然的结果当成环境变化时，学习率升得过高，选择变得不稳定。', 'Mistaking chance outcomes for real change raises the learning rate too much and makes choices unstable.'),
        steps: [5],
      },
    ],
    computational: [
      {
        title: b('学到的东西会消失', 'What is learned vanishes'),
        text: b('上下文中学到的规律不会进入参数，下一次会话要重新给出示例。', 'Patterns learned in context never enter the parameters, so the next session needs the examples again.'),
        steps: [6],
      },
      {
        title: b('对示例的格式敏感', 'Sensitive to example format'),
        text: b('示例的顺序、措辞和格式改变，结果可能明显不同。', 'Changing the order, wording or format of examples can change results noticeably.'),
        steps: [2, 3],
      },
      {
        title: b('局限于训练分布', 'Bound to the training distribution'),
        text: b('元学习和上下文学习的效果，在与训练任务差别较大的新任务上明显下降。', 'Meta-learning and in-context learning work much less well on tasks far from the training tasks.'),
        steps: [1, 5],
      },
    ],
    misreadings: [
      {
        claim: b('上下文学习就是模型在学习新知识', 'In-context learning is the model acquiring new knowledge'),
        fact: b('参数没有改变，适应只存在于这次会话的激活中；结束后模型回到原样。', 'Parameters do not change. Adaptation exists only in this session’s activations, and the model returns to its original state afterward.'),
      },
      {
        claim: b('前额叶已被证明是元强化学习系统', 'Prefrontal cortex is proven to be a meta-RL system'),
        fact: b('这是一种有影响的解释框架，能再现多种行为和神经活动特征；因果证据仍在积累中。', 'It is an influential framework that reproduces many behavioral and neural features. Causal evidence is still accumulating.'),
      },
      {
        claim: b('大模型内部真的在做梯度下降', 'Large models literally run gradient descent inside'),
        fact: b('严格等价只在线性注意力和简单回归中成立；大模型的上下文学习可能包含多种机制。', 'Exact equivalence holds only for linear attention on simple regression. In-context learning in large models may involve several mechanisms.'),
      },
    ],
  },
  refs: {
    neuro: ['harlow1949', 'behrens2007', 'doya2002'],
    models: ['pearcehall1980', 'wang2018', 'botvinick2019', 'duan2016'],
    ai: ['finn2017', 'brown2020', 'olsson2022', 'chan2022', 'vonoswald2022'],
  },
}
