import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F07 Credit assignment: eligibility traces and dopamine-modulated plasticity vs backpropagation and TD learning. */
export const CREDIT_ASSIGNMENT: TopicContent = {
  thesis: {
    biological: b(
      '大脑要把功劳分给正确的突触：结果常在动作后几秒才到（时间问题），而参与的突触有亿万个（空间问题）。证据最多的机制是三因子学习：前后神经元共同活动时，突触留下一个逐渐衰减的「资格迹」；几秒内若多巴胺等调质信号到达，带迹的突触才真正改变。空间上的分配在脑中怎样完成仍不清楚。',
      'The brain must give credit to the right synapses. Outcomes often arrive seconds after an action, the temporal problem, and billions of synapses take part, the spatial problem. The best supported mechanism is three-factor learning. Co-activity leaves a decaying eligibility trace at the synapse, and only tagged synapses change if dopamine or another modulator arrives within seconds. How the spatial problem is solved in the brain remains unclear.'),
    computational: b(
      '反向传播用链式法则精确算出每个权重对误差的贡献，一次反向传递就把误差分到网络中的所有参数。时序差分学习用相邻两步预测之差作为学习信号，把延迟的奖赏逐步传回较早的状态。代价是需要保存整个前向过程的激活、用同样的权重反向传递，并把计算分成前向和反向两个阶段。',
      'Backpropagation uses the chain rule to compute exactly how much each weight contributes to the error, and one backward pass shares the error across every parameter. Temporal-difference (TD) learning uses the difference between successive predictions as its learning signal, passing delayed reward back to earlier states. The cost is storing every activation of the forward pass, sending the error back through the same weights and splitting computation into forward and backward phases.'),
    gap: b(
      '反向传播精确，但对神经元来说条件苛刻；三因子规则局部、在线，但一个全局的调质信号无法告诉每个突触该往哪个方向改。大脑怎样在两者之间取得精确的空间信用分配，是开放问题。',
      'Backpropagation is exact but demanding for neurons. Three-factor rules are local and online, but one global modulator cannot tell each synapse which way to change. How the brain gets precise spatial credit between the two is an open question.'),
  },
  short: { biological: b('三因子学习', 'Three-factor learning'), computational: b('反向传播', 'Backpropagation') },
  kinds: ['algorithm', 'math'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月深度学习与强化学习的标准训练方法。', 'The computational column describes standard training in deep learning and reinforcement learning as of October 2026.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('延迟的结果', 'Delayed outcomes'),
      brain: b('资格迹能把约一两秒前的突触活动与多巴胺信号联系起来；更长的延迟还要借助工作记忆和海马回放。', 'Eligibility traces link synaptic activity from about one or two seconds earlier to a dopamine signal. Longer delays also rely on working memory and hippocampal replay.'),
      ai: b('时序差分学习用价值预测把奖赏一步步传回，可以处理很长的延迟，但通常需要大量重复经历。', 'Temporal-difference learning passes reward back step by step through value predictions and handles long delays, but usually needs many repetitions.'),
      gap: b('两者都把功劳传回到较早的事件；机器能跨越更长的步数，大脑用更少的经历。', 'Both pass credit back to earlier events. Machines span more steps, while the brain needs fewer experiences.'),
    },
    {
      lead: 'comp',
      dimension: b('空间分配的精度', 'Precision of spatial credit'),
      brain: b('多巴胺广泛释放，同一信号送到大量突触；它只说明「结果比预期好还是差」，不说明每个突触该怎么改。', 'Dopamine is released widely and the same signal reaches many synapses. It says only whether the outcome beat expectations, not how each synapse should change.'),
      ai: b('反向传播为数千亿个参数中的每一个算出精确的梯度。', 'Backpropagation computes an exact gradient for every one of hundreds of billions of parameters.'),
      gap: b('全局信号在深层网络中效率很低，这是生物学习规则面对的主要难题。', 'A global signal is very inefficient in deep networks, the main difficulty facing biological learning rules.'),
    },
    {
      lead: 'bio',
      dimension: b('需要的经历', 'Experience needed'),
      brain: b('人玩一款新的电子游戏，几分钟到几小时就能上手。', 'People pick up a new video game within minutes to hours.'),
      ai: b('DQN 每款 Atari 游戏用相当于数百小时的游戏画面训练。', 'DQN trained on the equivalent of hundreds of hours of play for each Atari game.'),
      gap: b('人带着大量已有知识学习；单靠信用分配算法本身，机器学得很慢。', 'People learn with a great deal of prior knowledge. With the credit assignment algorithm alone, machines learn slowly.'),
    },
    {
      lead: 'bio',
      dimension: b('在线与局部', 'Online and local'),
      brain: b('学习在行为过程中持续进行，每个突触只用自己能接触到的信号和广播的调质。', 'Learning goes on during behavior, and each synapse uses only signals it can reach plus broadcast modulators.'),
      ai: b('需要保存前向过程的激活，再单独做一次反向传递；训练和使用通常是分开的阶段。', 'Activations of the forward pass must be stored for a separate backward pass. Training and use are usually separate phases.'),
      gap: b('大脑的学习与使用同时进行，标准反向传播做不到这一点。', 'The brain learns while it acts, which standard backpropagation cannot do.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('共同活动', 'Co-activity'),
        points: [
          b('一个输入神经元放电，电脉冲到达突触，接着突触后神经元也放电。', 'An input neuron fires, the pulse reaches the synapse and the postsynaptic neuron then fires too.'),
          b('这种「前后都活动」的事件只说明这个突触参与了刚才的行为，还不说明行为的好坏。', 'This co-activity shows only that the synapse took part in what just happened, not whether it was good.'),
        ],
      },
      {
        title: b('资格迹', 'Eligibility trace'),
        points: [
          b('共同活动在突触处留下一个化学标记（资格迹），权重暂时不变。', 'Co-activity leaves a chemical tag at the synapse, the eligibility trace, while the weight stays the same.'),
          b('标记在约一秒到几秒内逐渐消失；在此期间，这个突触是「有资格被改变」的。', 'The tag fades over about one to several seconds. Until then, the synapse is eligible for change.'),
        ],
      },
      {
        title: b('结果与多巴胺', 'Outcome and dopamine'),
        points: [
          b('结果比预期好时，中脑多巴胺神经元短暂爆发放电；比预期差时，放电暂停。', 'When an outcome beats expectations, midbrain dopamine neurons fire a brief burst. When it falls short, they pause.'),
          b('多巴胺经长长的轴突广泛释放到纹状体和皮层，同一个信号到达大量突触。', 'Dopamine is released widely through long axons into the striatum and cortex, so one signal reaches many synapses.'),
        ],
      },
      {
        title: b('三因子更新', 'Three-factor update'),
        points: [
          b('只有带资格迹的突触在多巴胺到来时改变：迹越强、多巴胺越多，改变越大。', 'Only tagged synapses change when dopamine arrives. The stronger the trace and the more dopamine, the larger the change.'),
          b('没有参与的突触不受影响，所以全局信号也能落到正确的突触上。', 'Synapses that took no part are untouched, so a global signal still lands on the right synapses.'),
        ],
      },
      {
        title: b('反馈与树突：空间上的分配', 'Feedback and dendrites: spatial credit'),
        points: [
          b('高级皮层的反馈连接到达锥体细胞远端的树突，可能携带「这个神经元该增强还是减弱」的局部信号。', 'Feedback from higher cortex reaches the distal dendrites of pyramidal cells and may carry a local signal of whether this neuron should strengthen or weaken.'),
          b('这些假说能在模型中近似反向传播，但在脑中尚未被直接证实。', 'These hypotheses approximate backpropagation in models but have not been directly confirmed in the brain.'),
        ],
      },
    ],
    computational: [
      {
        title: b('前向传递', 'Forward pass'),
        points: [
          b('输入逐层计算，每一层的激活都被保存下来，供反向传递使用。', 'The input is computed layer by layer, and every activation is stored for the backward pass.'),
        ],
      },
      {
        title: b('误差', 'Error'),
        points: [
          b('输出与目标比较，得到误差。监督学习中目标是正确答案。', 'The output is compared with the target to give an error. In supervised learning the target is the right answer.'),
          b('强化学习中没有现成答案，误差是时序差分误差：实际得到的奖赏加上对下一步的预测，减去对这一步的预测。', 'Reinforcement learning has no ready answer, so the error is the temporal-difference error: the reward received plus the prediction for the next step, minus the prediction for this step.'),
        ],
      },
      {
        title: b('反向传递', 'Backward pass'),
        points: [
          b('误差沿着与前向相同的权重（转置）逐层传回，每层乘上自己激活函数的斜率。', 'The error travels back layer by layer through the same weights, transposed, multiplied at each layer by the slope of its activation function.'),
          b('到达每个权重时，得到它对总误差的精确贡献，即梯度。', 'At each weight this gives its exact contribution to the total error, the gradient.'),
        ],
      },
      {
        title: b('权重更新', 'Weight update'),
        points: [
          b('每个权重朝减小误差的方向移动一小步；所有参数同时更新。', 'Each weight moves a small step in the direction that reduces the error, and all parameters update at once.'),
        ],
      },
      {
        title: b('时间上的分配', 'Credit over time'),
        points: [
          b('时序差分学习反复用下一步的预测修正这一步的预测，奖赏就一步步传回到较早的状态。', 'Temporal-difference learning keeps correcting each prediction with the next one, so reward spreads back step by step to earlier states.'),
          b('循环网络用「时间反向传播」：保存整段序列的激活，再沿时间倒着传误差。', 'Recurrent networks use backpropagation through time: store the activations of the whole sequence and pass the error backward in time.'),
        ],
      },
    ],
  },
  archNotes: {
    biological: [
      b('资格迹的分子基础仍在研究中，可能涉及突触处钙离子触发的激酶活性。纹状体实验中，多巴胺在共同活动后约 0.3 到 2 秒内到达才能增强树突棘。', 'The molecular basis of eligibility traces is still being studied and may involve calcium-triggered kinase activity at the synapse. In striatal experiments, dopamine enlarged dendritic spines only if it arrived about 0.3 to 2 seconds after co-activity.'),
      b('皮层中也发现了资格迹：去甲肾上腺素和血清素在共同活动后几秒内到达，可以分别把迹转成增强或减弱。', 'Eligibility traces have also been found in cortex. Noradrenaline and serotonin arriving within seconds of co-activity turn traces into strengthening or weakening respectively.'),
      b('多巴胺的爆发放电编码「奖赏预测误差」：得到比预期多的奖赏时增加，预期中的奖赏没有到来时减少，详见[价值评估与奖赏学习](topic:reward-learning)。', 'Dopamine bursts encode reward prediction error, rising for more reward than expected and dipping when an expected reward fails to come. See [valuation and reward learning](topic:reward-learning).'),
      b('反向传播在脑中难以照搬的原因：它要求反向通路使用与前向完全相同的权重（权重对称），要求区分前向和反向两个阶段，还要求误差信号能带正负号精确传递。', 'Why backpropagation is hard to copy in the brain: it requires the backward path to use exactly the forward weights, called weight symmetry, separate forward and backward phases and precise signed error signals.'),
      b('已有多种生物上更可行的近似：反馈权重可以是随机的（反馈对齐）；预测编码网络可以只用局部规则近似梯度；树突中的爆发放电可能区分前向信号和反馈信号。它们在大规模任务上通常不如反向传播。', 'Several more plausible approximations exist. Feedback weights can be random, called feedback alignment. Predictive coding networks approximate gradients with local rules. Bursts in dendrites may separate forward from feedback signals. On large tasks they usually trail backpropagation.'),
    ],
    computational: [
      b('梯度是一组偏导数：某个权重变化一点点时，误差会变化多少。反向传播的计算量与一次前向传递相当，这是它能用于巨大网络的原因。', 'A gradient is a set of partial derivatives: how much the error changes when one weight changes slightly. Backpropagation costs about as much as one forward pass, which is why it scales to huge networks.'),
      b('训练大模型时，前向激活需要大量显存保存；常用的「重算」技巧用额外计算换取内存。', 'Training large models needs a lot of memory to store forward activations, and a common trick recomputes them to trade computation for memory.'),
      b('优化器（如 Adam）会按每个参数过去梯度的大小调整步长，但梯度本身仍由反向传播算出。', 'Optimizers such as Adam scale each parameter’s step by the size of its past gradients, but the gradients still come from backpropagation.'),
      b('强化学习中的时序差分误差在数学形式上与多巴胺神经元的反应相同，这是脑与 AI 之间证据最充分的对应之一。', 'The temporal-difference error in reinforcement learning has the same mathematical form as dopamine neuron responses, one of the best supported links between brain and AI.'),
      b('e-prop 等算法把循环网络的梯度拆成「局部资格迹乘学习信号」，在形式上接近三因子规则，用于脉冲神经网络的在线训练。', 'Algorithms such as e-prop split the gradient of a recurrent network into local eligibility traces times a learning signal, close in form to three-factor rules, for online training of spiking networks.'),
    ],
  },
  bioMath: [
    {
      title: b('三因子规则：资格迹乘调质信号', 'Three-factor rule: eligibility trace times modulator'),
      tex: t`\tau_e\,\frac{de_{ij}}{dt} = -e_{ij} + x_j(t)\,y_i(t),\qquad \frac{dw_{ij}}{dt} = \eta\; M(t)\; e_{ij}(t)`,
      symbols: [
        { tex: t`x_j,\;y_i`, meaning: b('突触前神经元 $j$ 和突触后神经元 $i$ 的活动', 'activity of presynaptic neuron $j$ and postsynaptic neuron $i$') },
        { tex: t`e_{ij}`, meaning: b('突触 $ij$ 的资格迹', 'eligibility trace of synapse $ij$') },
        { tex: t`\tau_e`, meaning: b('资格迹衰减的时间常数，约一到几秒', 'time constant of the trace, about one to several seconds') },
        { tex: t`M(t)`, meaning: b('第三个因子：调质信号，例如多巴胺相对基线的变化，可正可负', 'third factor: the modulator, such as dopamine relative to baseline, positive or negative') },
        { tex: t`w_{ij}`, meaning: b('突触强度', 'synaptic strength') },
        { tex: t`\eta`, meaning: b('学习率', 'learning rate') },
      ],
      steps: [
        b('前后神经元同时活动时，$x_j y_i$ 为正，资格迹上升；没有共同活动时，迹按时间常数 $\\tau_e$ 指数衰减。', 'When both neurons are active, $x_j y_i$ is positive and the trace rises. Without co-activity it decays exponentially with time constant $\\tau_e$.'),
        b('权重的变化等于调质信号乘以此刻的资格迹：没有调质或迹已消失，权重都不变。', 'The weight changes by the modulator times the current trace. With no modulator, or a faded trace, nothing changes.'),
        b('$M$ 为正（结果比预期好）时增强，为负时减弱。', 'A positive $M$, an outcome better than expected, strengthens, and a negative one weakens.'),
      ],
      example: b(
        '设 $\\tau_e = 1$ 秒。共同活动在 $t = 0$ 把迹设为 $1$。多巴胺在 $0.5$ 秒后到达，迹为 $e^{-0.5} \\approx 0.61$，突触明显增强；若 $3$ 秒后才到，迹只剩 $e^{-3} \\approx 0.05$，几乎不变。',
        'Let $\\tau_e = 1$ s. Co-activity at $t = 0$ sets the trace to $1$. Dopamine arriving $0.5$ s later meets a trace of $e^{-0.5} \\approx 0.61$, and the synapse strengthens clearly. Arriving after $3$ s it meets only $e^{-3} \\approx 0.05$, and little changes.'),
      consequences: [
        b('奖赏只能「回溯」大约几个 $\\tau_e$ 的时间，更早的原因需要其他机制连接。', 'Reward can reach back only a few $\\tau_e$. Earlier causes need other mechanisms.'),
        b('一个广播的信号就能只改变参与过的突触，解决了「改哪些」的问题，但没有解决「往哪个方向改才最好」。', 'One broadcast signal changes only the synapses that took part. That solves which synapses to change, not which direction is best.'),
      ],
      limitations: [
        b('真实的资格迹可能分为增强和减弱两种，各有不同的时间进程和调质。', 'Real traces may come in strengthening and weakening kinds with different time courses and modulators.'),
        b('把共同活动写成乘积是简化，真实规则依赖脉冲的精确时间（见[脉冲时间依赖可塑性](card:stdp)）。', 'Writing co-activity as a product is a simplification. Real rules depend on precise spike timing (see [spike-timing-dependent plasticity](card:stdp)).'),
      ],
    },
    {
      title: b('扰动学习：全局奖赏信号怎样在平均意义上找到梯度', 'Perturbation learning: how a global reward signal finds the gradient on average'),
      tex: t`\Delta w_{ij} = \eta\,\big(R - \bar{R}\big)\,\xi_i\,x_j,\qquad \mathbb{E}\big[\Delta w_{ij}\big] \propto \frac{\partial \mathbb{E}[R]}{\partial w_{ij}}`,
      symbols: [
        { tex: t`\xi_i`, meaning: b('神经元 $i$ 输出中的随机波动（噪声）', 'random fluctuation, noise, in the output of neuron $i$') },
        { tex: t`R`, meaning: b('这一次得到的奖赏', 'reward received this time') },
        { tex: t`\bar{R}`, meaning: b('平常的奖赏水平（基线）', 'the usual reward level, the baseline') },
        { tex: t`x_j`, meaning: b('输入神经元 $j$ 的活动', 'activity of input neuron $j$') },
        { tex: t`\mathbb{E}[\cdot]`, meaning: b('多次试验的平均', 'average over many trials') },
        { tex: t`\eta`, meaning: b('学习率', 'learning rate') },
      ],
      steps: [
        b('神经元的输出带有随机波动，这次比平常多放电或少放电了一点。', 'A neuron’s output fluctuates randomly, firing a little more or less than usual this time.'),
        b('如果这次奖赏高于平常，就把权重朝「这次的波动方向」改；低于平常就朝反方向改。', 'If reward beats the usual level, move the weights in the direction of this fluctuation. If it falls short, move the other way.'),
        b('单次的改变方向是碰运气，但多次平均下来，正好等于奖赏对权重的梯度方向。', 'Any single change is a gamble, but averaged over many trials it points along the gradient of reward.'),
      ],
      example: b(
        '一个神经元这次多放电了一点（$\\xi_i = +0.1$），输入 $x_j = 1$，奖赏比平常高 $0.5$。取 $\\eta = 1$，则 $\\Delta w_{ij} = 0.5 \\times 0.1 \\times 1 = 0.05$：多放电带来了好结果，就加强这个连接。若同一时间网络中有 1000 个神经元都在随机波动，这一次的奖赏变化里只有很小一部分来自这个神经元，平均需要多得多的试验。',
        'A neuron fires a little more this time, $\\xi_i = +0.1$, with input $x_j = 1$, and reward is $0.5$ above usual. With $\\eta = 1$, $\\Delta w_{ij} = 0.5 \\times 0.1 \\times 1 = 0.05$. Firing more went with a good outcome, so the connection strengthens. If 1000 neurons fluctuate at once, only a small part of the reward change comes from this neuron, and averaging takes far more trials.'),
      consequences: [
        b('只靠一个全局标量信号，原则上也能学到正确方向，这说明三因子规则在功能上是可行的。', 'A single global scalar can in principle learn the right direction, so three-factor rules are workable in function.'),
        b('参与的神经元越多，每个神经元得到的信号越被别人的噪声淹没，学习越慢；这解释了为什么生物需要更精确的空间信号。', 'The more neurons take part, the more each one’s signal drowns in the others’ noise and the slower learning gets. This is why biology would need more precise spatial signals.'),
      ],
      limitations: [
        b('这是一个算法模型，用来说明全局信号的能力和局限，不说明脑中一定这样实现。', 'This is an algorithmic model of what a global signal can and cannot do, not proof that the brain works this way.'),
        b('基线 $\\bar{R}$ 怎样估计、噪声从哪里来，在模型中都是假设。', 'How the baseline $\\bar{R}$ is estimated and where the noise comes from are assumptions of the model.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('反向传播：用链式法则把误差分给每一层的权重', 'Backpropagation: the chain rule shares the error with every layer’s weights'),
      tex: t`\boldsymbol{\delta}^{(l)} = \Big(W^{(l+1)\top}\,\boldsymbol{\delta}^{(l+1)}\Big) \odot \phi'\big(\mathbf{a}^{(l)}\big),\qquad \frac{\partial \mathcal{L}}{\partial W^{(l)}} = \boldsymbol{\delta}^{(l)}\,\mathbf{h}^{(l-1)\top}`,
      symbols: [
        { tex: t`\mathbf{h}^{(l)}`, meaning: b('第 $l$ 层的输出（激活）', 'output, the activation, of layer $l$') },
        { tex: t`\mathbf{a}^{(l)}`, meaning: b('第 $l$ 层经过激活函数之前的加权和', 'weighted sum of layer $l$ before the activation function') },
        { tex: t`\phi'`, meaning: b('激活函数的斜率', 'slope of the activation function') },
        { tex: t`\boldsymbol{\delta}^{(l)}`, meaning: b('第 $l$ 层收到的误差信号', 'error signal reaching layer $l$') },
        { tex: t`W^{(l+1)\top}`, meaning: b('上一层前向权重的转置：误差沿同一组权重倒着传', 'transpose of the next layer’s forward weights: the error goes back through the same weights') },
        { tex: t`\mathcal{L}`, meaning: b('损失，衡量输出与目标的差距', 'the loss, how far the output is from the target') },
      ],
      steps: [
        b('最后一层的误差就是输出与目标之差（乘上激活函数的斜率）。', 'The error of the last layer is the output minus the target, times the slope of the activation.'),
        b('每往前一层，用前向时连接这两层的同一组权重把误差传回，再乘上这一层激活函数的斜率。', 'At each earlier layer, pass the error back through the same weights that link the two layers forward, then multiply by this layer’s slope.'),
        b('某个权重的梯度等于「它后面那个单元的误差」乘以「它前面那个单元的活动」。', 'A weight’s gradient is the error of the unit after it times the activity of the unit before it.'),
      ],
      example: b(
        '两层、每层一个单元、激活函数取恒等：$y = w_2\\,(w_1 x)$。设 $x = 1$、$w_1 = 0.5$、$w_2 = 2$、目标 $2$、损失 $\\tfrac12(y - 2)^2$。前向得 $h = 0.5$、$y = 1$。输出误差 $\\delta_2 = y - 2 = -1$，所以 $\\partial \\mathcal{L}/\\partial w_2 = \\delta_2 h = -0.5$。传回第一层：$\\delta_1 = w_2 \\delta_2 = -2$，$\\partial \\mathcal{L}/\\partial w_1 = \\delta_1 x = -2$。两个梯度都为负，所以两个权重都应增大，而 $w_1$ 增大得更多。',
        'Two layers of one unit each with an identity activation: $y = w_2\\,(w_1 x)$. Let $x = 1$, $w_1 = 0.5$, $w_2 = 2$, target $2$ and loss $\\tfrac12(y - 2)^2$. Forward gives $h = 0.5$ and $y = 1$. The output error is $\\delta_2 = y - 2 = -1$, so $\\partial \\mathcal{L}/\\partial w_2 = \\delta_2 h = -0.5$. Back in the first layer, $\\delta_1 = w_2 \\delta_2 = -2$ and $\\partial \\mathcal{L}/\\partial w_1 = \\delta_1 x = -2$. Both gradients are negative, so both weights should grow, $w_1$ more.'),
      consequences: [
        b('每个权重都得到专属的、带方向的信号，所以深层网络能高效学习。', 'Every weight gets its own signed signal, so deep networks learn efficiently.'),
        b('计算量与一次前向传递同一量级，这是它能扩展到数千亿参数的原因。', 'The cost is on the order of one forward pass, which is why it scales to hundreds of billions of parameters.'),
      ],
      limitations: [
        b('误差必须沿与前向相同的权重传回，而生物的反向连接是另一组突触。', 'The error must go back through the forward weights, while biological feedback runs through different synapses.'),
        b('要保存前向激活并等待误差回来，前向和反向是两个分开的阶段。', 'Forward activations must be stored while waiting for the error, so forward and backward are separate phases.'),
      ],
    },
    {
      title: b('时序差分学习与资格迹：把延迟的奖赏传回较早的状态', 'TD learning with eligibility traces: passing delayed reward back to earlier states'),
      tex: t`\delta_t = r_{t+1} + \gamma V(s_{t+1}) - V(s_t),\qquad e_t = \gamma\lambda\, e_{t-1} + \nabla_{\mathbf{w}} V(s_t),\qquad \mathbf{w} \leftarrow \mathbf{w} + \alpha\,\delta_t\, e_t`,
      symbols: [
        { tex: t`V(s)`, meaning: b('对状态 $s$ 之后能得到的总奖赏的预测（价值）', 'prediction of total future reward from state $s$, its value') },
        { tex: t`r_{t+1}`, meaning: b('离开状态 $s_t$ 后得到的奖赏', 'reward received after leaving $s_t$') },
        { tex: t`\gamma`, meaning: b('折扣因子：越远的奖赏打越多折扣', 'discount factor: farther rewards count less') },
        { tex: t`\delta_t`, meaning: b('时序差分误差：比预期好多少', 'temporal-difference error: how much better than expected') },
        { tex: t`e_t`, meaning: b('资格迹：记录最近访问过哪些状态', 'eligibility trace: a record of recently visited states') },
        { tex: t`\lambda,\;\alpha`, meaning: b('迹的衰减速度和学习率', 'trace decay and learning rate') },
      ],
      steps: [
        b('每走一步，比较「实际得到的奖赏加上对下一状态的预测」与「对这一状态的预测」，差就是 $\\delta_t$。', 'At each step, compare the reward received plus the prediction for the next state with the prediction for this state. The difference is $\\delta_t$.'),
        b('资格迹把刚访问过的状态标记出来，越早访问的标记越弱（每步乘 $\\gamma\\lambda$）。', 'The trace marks recently visited states, and earlier ones more weakly, multiplied by $\\gamma\\lambda$ each step.'),
        b('用 $\\delta_t$ 乘以资格迹更新预测：意外的奖赏同时修正最近几步的预测。', 'Update the predictions by $\\delta_t$ times the trace, so a surprising reward corrects the last few steps at once.'),
      ],
      example: b(
        '三个状态 A、B、C 依次经过，到 C 之后得到奖赏 $1$。开始时三者的价值都是 $0$，取 $\\gamma = 1$、$\\alpha = 0.5$。没有资格迹（$\\lambda = 0$）时，第一次只有 C 的价值变成 $0.5$，要再走几遍，奖赏才一步步传回 B 和 A。取 $\\lambda = 0.5$ 时，到达奖赏那一刻 C、B、A 的迹分别为 $1$、$0.5$、$0.25$，第一次就把价值更新为 $0.5$、$0.25$、$0.125$。',
        'Three states A, B and C are visited in order, with reward $1$ after C. All values start at $0$, with $\\gamma = 1$ and $\\alpha = 0.5$. Without traces, $\\lambda = 0$, the first run only raises C to $0.5$, and the reward needs more runs to reach B and A. With $\\lambda = 0.5$, the traces of C, B and A at the reward are $1$, $0.5$ and $0.25$, so the first run already sets their values to $0.5$, $0.25$ and $0.125$.'),
      consequences: [
        b('$\\delta_t$ 的形式与多巴胺神经元的反应相同：意外的奖赏引起正误差，预期中的奖赏不再引起反应，预期落空引起负误差。', '$\\delta_t$ has the same form as dopamine responses. Surprising reward gives a positive error, expected reward none and missing reward a negative error.'),
        b('资格迹让一次奖赏同时更新多个较早的状态，与生物资格迹的作用相同。', 'Traces let one reward update several earlier states at once, the same role as biological traces.'),
      ],
      limitations: [
        b('状态和价值的表示仍要靠反向传播或其他方法学习，时序差分本身只解决时间上的分配。', 'States and values must still be learned by backpropagation or other methods. TD itself solves only credit over time.'),
        b('在复杂环境中需要大量经历，远多于动物学会同样任务所需的经历。', 'Complex environments need a great deal of experience, far more than animals need for the same task.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('全局信号不够精确', 'A global signal is imprecise'),
        text: b('多巴胺对大量突触广播同一个信号，只能说「好或坏」，在需要许多层协同调整时学习很慢。', 'Dopamine broadcasts one signal to many synapses and can say only good or bad, so learning is slow when many layers must adjust together.'),
        steps: [3, 4],
      },
      {
        title: b('资格迹只能回溯几秒', 'Traces reach back seconds'),
        text: b('结果来得太晚时，资格迹已经消失，需要工作记忆、语言或回放把原因和结果重新联系起来。', 'When outcomes come too late, the trace has faded, and working memory, language or replay must reconnect cause and effect.'),
        steps: [2],
      },
      {
        title: b('空间分配机制未明', 'Spatial credit is unclear'),
        text: b('反馈与树突的作用目前主要来自模型和间接证据，大脑是否近似梯度仍有争议。', 'The role of feedback and dendrites rests mainly on models and indirect evidence, and whether the brain approximates gradients is debated.'),
        steps: [5],
      },
    ],
    computational: [
      {
        title: b('要先存再传', 'Store first, then send back'),
        text: b('必须保存整个前向过程的激活，等误差传回后才能更新，不能边用边学。', 'All forward activations must be stored until the error returns, so the network cannot learn while it acts.'),
        steps: [1, 3],
      },
      {
        title: b('需要大量经历', 'Needs much experience'),
        text: b('单靠梯度和时序差分，强化学习智能体需要比人多得多的经历才能学会同样的任务。', 'With gradients and TD alone, reinforcement learning agents need far more experience than people for the same task.'),
        steps: [5],
      },
      {
        title: b('训练后不再学习', 'No learning after training'),
        text: b('部署后参数固定，新的经验不会通过信用分配进入模型，除非另行训练。', 'Parameters are fixed after deployment, and new experience never enters the model through credit assignment unless it is trained again.'),
        steps: [4],
      },
    ],
    misreadings: [
      {
        claim: b('大脑在做反向传播', 'The brain does backpropagation'),
        fact: b('没有直接证据表明皮层执行标准反向传播；有多种模型说明生物机制可能近似梯度，这仍是开放问题。', 'There is no direct evidence that cortex runs standard backpropagation. Several models show biological mechanisms may approximate gradients, and the question remains open.'),
      },
      {
        claim: b('多巴胺就是时序差分误差', 'Dopamine is the TD error'),
        fact: b('多巴胺神经元的许多反应与时序差分误差的预测吻合，但多巴胺也参与运动、新奇和显著性等信号，不等于单一的学习信号。', 'Many dopamine responses match TD error predictions, but dopamine also signals movement, novelty and salience and is not one single learning signal.'),
      },
    ],
  },
  refs: {
    neuro: ['schultz1997', 'yagishita2014', 'he2015', 'gerstner2018', 'lillicrap2020'],
    models: ['fremaux2016', 'williams1992', 'lillicrap2016', 'whittington2017', 'sacramento2018', 'payeur2021', 'bellec2020'],
    ai: ['rumelhart1986', 'sutton1988', 'mnih2015', 'lake2017'],
  },
}
