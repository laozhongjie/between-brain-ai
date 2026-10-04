import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M04 Dendritic computation: branches that add up their own inputs nonlinearly before the soma sees them. */
export const DENDRITES: MechEntry = {
  definition: b(
    '树突是神经元接收输入的分支。它们不只是把电流传给胞体的导线：一个分支上同时激活的多个突触，可以引发这个分支自己的局部电脉冲（树突棘波），使输出远大于各个输入之和。所以一个神经元更像一个两层网络：每个分支先做一次非线性求和，胞体再把各分支的结果加起来。',
    'Dendrites are the branches through which a neuron receives input. They are not just wires carrying current to the soma. Several synapses active together on one branch can trigger the branch’s own local electrical spike, a dendritic spike. Its output is far more than the sum of the inputs. A neuron is therefore more like a two-layer network. Each branch first makes a nonlinear sum, and the soma then adds the results of the branches.'),
  scale: b('单个神经元的树突树，数十到数百个分支', 'The dendritic tree of one neuron, tens to hundreds of branches'),
  timescale: b('局部树突棘波持续数毫秒到数十毫秒', 'Local dendritic spikes last milliseconds to tens of milliseconds'),
  steps: [
    {
      title: b('输入落在分支上', 'Inputs land on branches'),
      points: [
        b('一个锥体细胞有上万个突触，分布在基底树突和顶端树突的许多分支上。', 'A pyramidal cell has over ten thousand synapses spread over many branches of its basal and apical dendrites.'),
        b('离胞体越远的突触，电流传到胞体时衰减得越多。', 'The farther a synapse is from the soma, the more its current fades on the way there.'),
      ],
    },
    {
      title: b('聚集的输入引发局部棘波', 'Clustered input triggers a local spike'),
      points: [
        b('同一分支上几个相邻突触同时激活时，NMDA 受体和电压门控通道打开，产生一个局部的树突棘波。', 'When several neighboring synapses on one branch are active together, NMDA receptors and voltage-gated channels open and produce a local dendritic spike.'),
        b('分散在不同分支上的同样数量的输入则只做近似线性的叠加。', 'The same number of inputs spread over different branches only adds up roughly linearly.'),
      ],
    },
    {
      title: b('胞体汇总各分支', 'The soma sums the branches'),
      points: [
        b('各分支的输出传到胞体相加，决定神经元是否放电。', 'The outputs of the branches travel to the soma and add up to decide whether the neuron fires.'),
        b('这一步相当于两层网络的第二层：每个分支是一个隐藏单元。', 'This step is like the second layer of a two-layer network, with each branch acting as a hidden unit.'),
      ],
    },
    {
      title: b('顶端树突接收上下文', 'The apical dendrite receives context'),
      points: [
        b('锥体细胞的顶端树突伸到皮层最外层，接收来自高级脑区和丘脑的反馈。', 'The apical dendrite of a pyramidal cell reaches the outermost cortical layer and receives feedback from higher areas and the thalamus.'),
        b('底部的基底树突主要接收前馈的感觉输入。', 'The basal dendrites near the bottom mainly receive feedforward sensory input.'),
      ],
    },
    {
      title: b('两处同时激活引起成串放电', 'Activation at both sites causes a burst'),
      points: [
        b('胞体的脉冲回传到顶端树突，若此时顶端也有输入，会触发一个钙棘波，使细胞成串放电。', 'A spike from the soma travels back into the apical dendrite. If the apex also has input at that time, it triggers a calcium spike and the cell fires a burst.'),
        b('所以细胞能区分「只有前馈」和「前馈加上下文」两种情况，输出不同的信号。', 'The cell can therefore tell feedforward input alone from feedforward input with context, and send different signals.'),
      ],
    },
    {
      title: b('按分支学习', 'Learning per branch'),
      points: [
        b('可塑性可以只发生在一个分支上，不同的分支可能存储不同的内容，减少相互干扰。', 'Plasticity can happen on one branch only, and different branches may store different content, which reduces interference.'),
      ],
    },
  ],
  notes: [
    b('Poirazi、Brannon 与 Mel 在 2003 年用详细的锥体细胞模拟表明，单个神经元的输入输出关系可以用一个两层网络很好地近似。', 'Poirazi, Brannon and Mel showed in 2003, with detailed pyramidal cell simulations, that a single neuron’s input-output relation is well approximated by a two-layer network.'),
    b('2021 年的研究用深度网络拟合皮层神经元的完整模型，需要 5 到 8 层才能达到相当的精度。', 'A 2021 study fitted a full cortical neuron model with deep networks and needed 5 to 8 layers for comparable accuracy.'),
    b('2020 年在人类皮层第 2/3 层神经元中发现了一种钙介导的树突动作电位，它能对输入做类似异或的运算。', 'A 2020 study found a calcium-mediated dendritic action potential in human layer 2/3 cortical neurons that computes something like exclusive or on its inputs.'),
    b('Larkum 等在 1999 年描述了顶端与胞体同时激活引起钙棘波的机制，后来被看作皮层整合前馈与反馈的一种细胞基础。', 'Larkum and colleagues described in 1999 how coincident activation of apex and soma triggers calcium spikes. This was later seen as a cellular basis for joining feedforward and feedback in cortex.'),
  ],
  counterpart: [
    b('GLU 等门控单元把一路输入乘以另一路输入的 S 形函数，功能上类似上下文调制前馈信号，但没有空间上分开的分支。', 'Gated units such as GLU multiply one input by a sigmoid of another. This is functionally like context modulating the feedforward signal, but without spatially separate branches.'),
    b('「主动树突」网络让每个单元的多个树突段匹配不同的任务上下文，在持续学习中减少了遗忘。', 'Active-dendrite networks let several dendritic segments of each unit match different task contexts, which reduced forgetting in continual learning.'),
    b('主流网络中的一个单元只是一次加权求和；要达到单个皮层神经元的计算量，需要一个多层的小网络。', 'A unit in mainstream networks is a single weighted sum. Matching one cortical neuron takes a small multilayer network.'),
  ],
  math: [
    {
      title: b('两层神经元模型：同样的输入，聚在一个分支上效果大得多', 'The two-layer neuron model: the same inputs have far more effect when clustered on one branch'),
      tex: t`y = \sum_{j} s\Big(\sum_{i \in B_j} w_{ij}\,x_i\Big),\qquad s(u) = \frac{1}{1 + e^{-(u - \theta_b)/k}}`,
      symbols: [
        { tex: t`x_i`, meaning: b('第 $i$ 个突触的输入（$0$ 或 $1$）', 'input at synapse $i$, $0$ or $1$') },
        { tex: t`B_j`, meaning: b('落在分支 $j$ 上的突触', 'the synapses on branch $j$') },
        { tex: t`w_{ij}`, meaning: b('分支 $j$ 上第 $i$ 个突触的强度，例中都取 $1$', 'strength of synapse $i$ on branch $j$, $1$ in the example') },
        { tex: t`s`, meaning: b('分支的 S 形非线性：输入超过 $\\theta_b$ 后引发局部棘波', 'sigmoid nonlinearity of a branch: input above $\\theta_b$ triggers a local spike') },
        { tex: t`\theta_b,\;k`, meaning: b('分支的阈值和陡峭程度，例中取 $3$ 和 $0.5$', 'threshold and steepness of a branch, $3$ and $0.5$ in the example') },
        { tex: t`y`, meaning: b('传到胞体的总驱动', 'total drive reaching the soma') },
      ],
      steps: [
        b('每个分支把自己的突触输入加起来。', 'Each branch adds up its own synaptic inputs.'),
        b('分支的和经过 S 形函数：低于阈值时几乎没有输出，高于阈值时接近 $1$。', 'The branch sum passes through the sigmoid: almost nothing below threshold and close to $1$ above.'),
        b('胞体把各分支的输出相加。', 'The soma adds the outputs of the branches.'),
      ],
      example: b(
        '一个神经元有 $4$ 个分支，收到 $4$ 个输入。都落在同一分支上：$s(4) = 1/(1 + e^{-2}) \\approx 0.88$，加上其余三个空分支的约 $0.007$，总驱动约 $0.89$。每个分支各一个：$4 \\times s(1) = 4/(1 + e^{4}) \\approx 0.07$。同样的四个输入，聚集时的效果约为分散时的 $12$ 倍。',
        'A neuron has $4$ branches and receives $4$ inputs. All on one branch: $s(4) = 1/(1 + e^{-2}) \\approx 0.88$, plus about $0.007$ from the three empty branches, a total drive of about $0.89$. One per branch: $4 \\times s(1) = 4/(1 + e^{4}) \\approx 0.07$. The same four inputs have about $12$ times the effect when clustered.'),
      consequences: [
        b('输入落在哪里和输入有多少同样重要：神经元能检测「这几个输入同时出现」这样的组合特征。', 'Where inputs land matters as much as how many there are. The neuron can detect combinations such as these few inputs appearing together.'),
        b('一个神经元能完成单个线性阈值单元做不到的运算，例如对不同分支上的组合分别响应。', 'One neuron can compute what a single linear threshold unit cannot, such as responding separately to combinations on different branches.'),
      ],
      limitations: [
        b('分支被当作彼此独立的单元；真实分支之间有电耦合，靠近胞体的分支相互影响更大。', 'Branches are treated as independent units. Real branches are electrically coupled, and those near the soma influence each other more.'),
        b('没有包括顶端树突和回传脉冲，所以描述不了成串放电。', 'The apical dendrite and back-propagating spikes are left out, so bursts cannot be described.'),
      ],
    },
  ],
  elsewhere: [],
  conditions: [
    b('树突棘波在脑片和麻醉动物中证据充分；在清醒动物的自然行为中，它们出现得多频繁、起多大作用仍在研究。', 'Dendritic spikes are well documented in slices and anesthetized animals. How often they occur and how much they matter in natural behavior of awake animals is still being studied.'),
    b('树突的非线性因细胞类型、物种和分支位置而异，人类皮层神经元的树突比啮齿类更长、性质也有不同。', 'Dendritic nonlinearity varies with cell type, species and branch location. Human cortical neurons have longer dendrites with somewhat different properties than rodents.'),
    b('输入是否真的按功能聚集在同一分支上，不同研究的结论不一。', 'Studies disagree on whether inputs really cluster by function on the same branch.'),
  ],
  uses: [
    { to: 'topic:continual-learning', role: b('按分支存储不同任务的输入组合，可能减少新旧记忆的干扰；主动树突网络借用了这一思路。', 'Storing input combinations for different tasks on different branches may reduce interference between old and new memories, an idea active-dendrite networks borrow.') },
    { to: 'topic:attention-gating', role: b('顶端树突接收的自上而下反馈可以增强或门控底部的感觉输入。', 'Top-down feedback on the apical dendrite can amplify or gate the sensory input at the base.') },
    { to: 'topic:credit-assignment', role: b('顶端与胞体同时激活引起的成串放电，可能为每个细胞提供自己的学习信号。', 'Bursts from coincident apex and soma activation may give each cell its own learning signal.') },
  ],
  refs: ['poirazi2003', 'london2005', 'larkum1999', 'larkum2013', 'beniaguev2021', 'gidon2020', 'iyer2022', 'payeur2021'],
}
