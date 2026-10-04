import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M03 Three-factor learning: a local trace marks which synapses were involved, a third signal says whether it was good. */
export const THREE_FACTOR: MechEntry = {
  definition: b(
    '三因子学习规则把突触的改变分成两步：两侧神经元的共同活动先在突触上留下一个会衰减的「资格迹」（化学标记），只有当第三个信号在资格迹消失之前到达时，突触才真正改变。第三个信号可以是多巴胺等神经调质报告的奖赏，也可以是树突上传来的误差。',
    'Three-factor learning rules split a synaptic change into two steps. Joint activity on both sides first leaves a decaying eligibility trace, a chemical tag, at the synapse. The synapse changes only if a third signal arrives before the trace fades. The third signal can be reward reported by a neuromodulator such as dopamine, or an error carried by the dendrite.'),
  scale: b('单个突触，第三个信号可覆盖全脑', 'A single synapse, with a third signal that can reach the whole brain'),
  timescale: b('资格迹持续约 1 秒到数秒', 'Eligibility traces last about 1 to several seconds'),
  steps: [
    {
      title: b('共同活动留下标记', 'Joint activity leaves a tag'),
      points: [
        b('突触前和突触后的活动同时发生时，突触上的分子状态改变，形成资格迹 $e$。', 'When presynaptic and postsynaptic activity coincide, the molecular state of the synapse changes and forms an eligibility trace $e$.'),
        b('此时突触强度还没有变，只是被标记为「可以改」。', 'The strength has not changed yet. The synapse is only marked as changeable.'),
      ],
    },
    {
      title: b('资格迹衰减', 'The trace decays'),
      points: [
        b('资格迹以秒级的时间常数衰减；在这段时间内，突触记得自己刚才参与过活动。', 'The trace decays with a time constant of seconds, and during that time the synapse remembers that it took part.'),
      ],
    },
    {
      title: b('神经调质广播结果', 'A neuromodulator broadcasts the outcome'),
      points: [
        b('结果出现后，多巴胺神经元把奖赏预测误差广播到大片脑区。', 'When the outcome arrives, dopamine neurons broadcast the reward prediction error across large brain areas.'),
        b('同一个信号到达所有突触，只有带着资格迹的突触才会改变。', 'The same signal reaches every synapse, and only those carrying a trace change.'),
      ],
    },
    {
      title: b('树突提供局部误差', 'The dendrite supplies a local error'),
      points: [
        b('皮层锥体细胞的顶端树突接收自上而下的反馈；反馈与底部输入同时到达时，细胞发出成串放电。', 'The apical dendrite of cortical pyramidal cells receives top-down feedback. When feedback and basal input arrive together, the cell fires a burst.'),
        b('一种理论认为，成串放电的比例携带了这个细胞自己的误差信号，可以作为它的第三个因子。', 'One theory holds that the fraction of bursts carries the cell’s own error signal, which can serve as its third factor.'),
      ],
    },
    {
      title: b('时间和空间上的信用分配', 'Credit assignment in time and space'),
      points: [
        b('资格迹解决时间上的分配：结果晚到几秒，也能找回之前起作用的突触。', 'The trace solves assignment in time: an outcome seconds later can still find the synapses that acted before.'),
        b('第三个信号是全局的还是逐个细胞的，决定了空间上的分配有多精细（见[信用分配](topic:credit-assignment)）。', 'Whether the third signal is global or per cell decides how fine the assignment in space can be (see [credit assignment](topic:credit-assignment)).'),
      ],
    },
    {
      title: b('与反向传播的差别', 'Difference from backpropagation'),
      points: [
        b('反向传播需要把误差沿前向连接的转置精确地传回，大脑中没有已知的这种通路。', 'Backpropagation needs the error sent back exactly through the transpose of the forward connections, and no such pathway is known in the brain.'),
        b('反馈对齐表明，用固定的随机反馈代替转置，网络也能学习。', 'Feedback alignment shows that a network can still learn when fixed random feedback replaces the transpose.'),
      ],
    },
  ],
  notes: [
    b('2014 年的小鼠脑片实验发现，多巴胺只有在 STDP 配对之后约 $0.3$ 到 $2$ 秒内到达，才能使树突棘增大，直接支持了资格迹的时间窗。', 'A 2014 mouse slice experiment found that dopamine enlarged spines only when it arrived about $0.3$ to $2$ seconds after STDP pairing. This directly supports the time window of eligibility traces.'),
    b('Frémaux 与 Gerstner 在 2016 年把这一类规则统称为「神经调质的三因子学习规则」。', 'Frémaux and Gerstner in 2016 grouped this family as neuromodulated three-factor learning rules.'),
    b('乙酰胆碱、去甲肾上腺素和血清素也能作为第三个因子，分别与注意、意外和惩罚相关。', 'Acetylcholine, norepinephrine and serotonin can also act as third factors, linked to attention, surprise and punishment.'),
    b('2021 年的理论用顶端树突的成串放电构造了一种依赖局部信号、近似反向传播的学习规则。', 'A 2021 theory built a learning rule from apical bursts that uses local signals and approximates backpropagation.'),
  ],
  counterpart: [
    b('反向传播用链式法则把误差精确地分给每一层的每个权重，是主流深度学习的训练方法。', 'Backpropagation uses the chain rule to assign error exactly to every weight in every layer, and trains mainstream deep learning.'),
    b('反馈对齐用固定的随机矩阵传回误差；e-prop 把资格迹和逐个神经元的学习信号结合起来，用于训练循环的脉冲网络。', 'Feedback alignment sends error back through a fixed random matrix. E-prop combines eligibility traces with per-neuron learning signals to train recurrent spiking networks.'),
    b('强化学习中的资格迹 $\\mathrm{TD}(\\lambda)$ 与生物资格迹在功能上相同：记住最近用过的参数，等奖赏到来再更新（见[信用分配](topic:credit-assignment)）。', 'Eligibility traces in reinforcement learning, $\\mathrm{TD}(\\lambda)$, serve the same function as biological traces. They remember recently used parameters and update them when reward arrives (see [credit assignment](topic:credit-assignment)).'),
  ],
  math: [
    {
      title: b('反馈对齐：固定的随机反馈也能把误差传到隐藏层', 'Feedback alignment: fixed random feedback can still carry the error to the hidden layer'),
      tex: t`\mathbf{e} = W_2\,\mathbf{h} - \mathbf{y}^{*},\qquad \Delta W_2 = -\eta\,\mathbf{e}\,\mathbf{h}^{\top},\qquad \Delta W_1 = -\eta\,(B\,\mathbf{e})\,\mathbf{x}^{\top},\qquad B_{\text{BP}} = W_2^{\top}`,
      symbols: [
        { tex: t`\mathbf{x},\;\mathbf{h}`, meaning: b('输入和隐藏层的活动（这里 $\\mathbf{h} = W_1\\mathbf{x}$）', 'activity of the input and the hidden layer, here $\\mathbf{h} = W_1\\mathbf{x}$') },
        { tex: t`\mathbf{y}^{*}`, meaning: b('目标输出', 'target output') },
        { tex: t`\mathbf{e}`, meaning: b('输出误差', 'output error') },
        { tex: t`W_1,\;W_2`, meaning: b('前向的两层权重', 'the two layers of forward weights') },
        { tex: t`B`, meaning: b('把误差送回隐藏层的反馈矩阵；反向传播中 $B = W_2^{\\top}$，反馈对齐中 $B$ 随机且固定', 'feedback matrix that sends the error to the hidden layer: $B = W_2^{\\top}$ in backpropagation, random and fixed in feedback alignment') },
        { tex: t`\eta`, meaning: b('学习率', 'learning rate') },
      ],
      steps: [
        b('前向计算输出，与目标比较得到误差 $\\mathbf{e}$。', 'Compute the output and compare it with the target to get the error $\\mathbf{e}$.'),
        b('输出层按误差和隐藏活动的乘积更新，这一步只需要局部信息。', 'The output layer updates by the product of error and hidden activity, which needs only local information.'),
        b('隐藏层收到 $B\\mathbf{e}$ 作为它的误差，再乘以输入更新。训练中 $W_2$ 会逐渐转向与 $B^{\\top}$ 对齐，随机反馈因此越来越有用。', 'The hidden layer receives $B\\mathbf{e}$ as its error and updates by its product with the input. During training $W_2$ turns toward alignment with $B^{\\top}$, so random feedback grows more useful.'),
      ],
      example: b(
        '一个 $10$ 输入、$4$ 隐藏、$4$ 输出的线性网络学习一个随机的线性映射。前 $1000$ 步中，反馈对齐和反向传播都把测试误差从约 $5.9$ 降到接近 $0$；冻结隐藏层、只训练输出层时，误差停在约 $2.5$。$W_2^{\\top}$ 与 $B$ 的夹角在约 $100$ 步内从约 $99^\\circ$ 降到约 $44^\\circ$，之后稳定在约 $40^\\circ$。',
        'A linear network with $10$ inputs, $4$ hidden units and $4$ outputs learns a random linear map. Over the first $1000$ steps, feedback alignment and backpropagation both bring the test error from about $5.9$ to near $0$. With the hidden layer frozen and only the output layer trained, the error stays at about $2.5$. The angle between $W_2^{\\top}$ and $B$ falls from about $99^\\circ$ to about $44^\\circ$ within about $100$ steps and then settles near $40^\\circ$.'),
      consequences: [
        b('误差不必沿前向连接的转置精确传回，只要反馈的方向与真实梯度的夹角小于 $90^\\circ$，学习就能进行。', 'The error need not travel back exactly through the transpose of the forward weights. Learning works as long as the feedback points within $90^\\circ$ of the true gradient.'),
        b('这削弱了「大脑不能做反向传播式学习」的一个主要理由：权重对称的要求。', 'This weakens one main reason for doubting that the brain could learn in a backpropagation-like way, the need for symmetric weights.'),
      ],
      limitations: [
        b('在深层卷积网络和大规模任务上，反馈对齐的效果明显不如反向传播。', 'On deep convolutional networks and large tasks, feedback alignment works clearly worse than backpropagation.'),
        b('它仍需要逐个神经元的误差信号，大脑中这种信号的载体（树突、成串放电或其他）仍有争议。', 'It still needs an error signal per neuron, and what carries such a signal in the brain, dendrites, bursts or something else, is debated.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('三因子规则：资格迹乘调质信号', 'Three-factor rule: eligibility trace times modulatory signal'), to: 'topic:credit-assignment' },
    { title: b('反向传播：用链式法则把误差分给每一层', 'Backpropagation: the chain rule assigns error to every layer'), to: 'topic:credit-assignment' },
    { title: b('时序差分学习与资格迹', 'Temporal-difference learning with eligibility traces'), to: 'topic:credit-assignment' },
    { title: b('奖赏预测误差：多巴胺反应为什么会转移到线索上', 'Reward prediction error: why the dopamine response moves to the cue'), to: 'topic:reward-learning' },
  ],
  conditions: [
    b('多巴胺门控的可塑性在纹状体和皮层都有直接证据；资格迹的分子载体在不同突触可能不同，仍在研究中。', 'Dopamine-gated plasticity has direct evidence in striatum and cortex. The molecular carrier of the trace may differ between synapses and is still being studied.'),
    b('全局的奖赏信号只能告诉网络「好」或「不好」，网络越大，靠它找到正确方向越慢。', 'A global reward signal only says good or bad, and the larger the network, the slower it finds the right direction from it.'),
    b('树突成串放电能否在活体中承载逐个细胞的误差，证据还很有限。', 'Evidence that dendritic bursts carry per-cell errors in living animals is still limited.'),
  ],
  uses: [
    { to: 'topic:credit-assignment', role: b('资格迹和调质信号把延迟的结果分配给之前起作用的突触。', 'Eligibility traces and modulatory signals assign a delayed outcome to the synapses that acted earlier.') },
    { to: 'topic:reward-learning', role: b('多巴胺的奖赏预测误差作为第三个因子，改变纹状体中与选择相关的突触。', 'Dopamine reward prediction errors act as the third factor and change choice-related synapses in the striatum.') },
    { to: 'topic:skill-learning', role: b('练习中，带来好结果的动作序列所用的皮层到纹状体突触被逐步加强。', 'In practice, cortex-to-striatum synapses used by action sequences with good outcomes are gradually strengthened.') },
  ],
  refs: ['fremaux2016', 'gerstner2018', 'yagishita2014', 'payeur2021', 'lillicrap2016', 'bellec2020', 'rumelhart1986', 'lillicrap2020', 'whittington2017'],
}
