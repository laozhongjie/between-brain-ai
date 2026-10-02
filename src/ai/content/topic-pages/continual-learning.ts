import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F09 Continual learning, interference and plasticity: synaptic consolidation and complementary learning systems vs replay, regularization and parameter isolation. */
export const CONTINUAL_LEARNING: TopicContent = {
  thesis: {
    biological: b(
      '大脑一生都在学习，学会新技能通常不会抹掉旧技能。目前的解释分两层：在突触层面，重要的连接经巩固变得稳定，学习中新长出的部分树突棘可以保持数月；在系统层面，海马快速记下新经历，再在睡眠中回放，让新皮层以很慢的速度把新旧内容交错学习。人也会遗忘，相似的新旧记忆相互干扰。',
      'The brain learns throughout life, and new skills usually do not erase old ones. Current explanations work on two levels. At synapses, important connections stabilize through consolidation, and some spines grown during learning last for months. At the systems level, the hippocampus records new experience quickly and replays it in sleep, so the neocortex slowly learns new and old content interleaved. People still forget, and similar old and new memories interfere.'),
    computational: b(
      '神经网络按顺序学习多个任务时，学新任务常会大幅破坏旧任务，这叫灾难性遗忘。应对方法有三类：回放（把旧数据或生成的旧样本混进训练）、正则化（如 EWC 给重要参数加约束）和参数隔离（为新任务分配新参数）。长期连续训练还会让网络逐渐失去学习新东西的能力。大模型在实践中主要靠混合数据重新训练来更新。',
      'When a neural network learns tasks one after another, learning a new task often wrecks old ones, called catastrophic forgetting. Remedies fall into three groups: replay, mixing old or generated samples into training, regularization such as EWC that constrains important parameters, and parameter isolation that gives new tasks new parameters. Long continual training also makes networks gradually lose the ability to learn. In practice, large models are updated mainly by retraining on mixed data.'),
    gap: b(
      '大脑把「快速记录」和「缓慢整合」分给两个系统，并在离线时交错重放；主流 AI 一次训练后冻结。持续学习方法能减轻遗忘，但在任务长期不断到来时，仍难以同时保持稳定和可塑。',
      'The brain splits fast recording and slow integration between two systems and interleaves them offline, while mainstream AI trains once and freezes. Continual learning methods reduce forgetting but still struggle to stay both stable and plastic when tasks keep arriving.'),
  },
  short: { biological: b('大脑', 'The brain'), computational: b('持续学习方法', 'Continual learning methods') },
  kinds: ['behavior', 'algorithm', 'math'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月的持续学习方法与大模型的更新方式。', 'The computational column describes continual learning methods and how large models are updated as of October 2026.'),
  capabilities: [
    {
      lead: 'bio',
      dimension: b('学新不忘旧', 'Learning without forgetting'),
      brain: b('学会一门新语言或新技能后，旧技能基本保留；遗忘主要来自相似内容的干扰和长期不用。', 'After learning a new language or skill, old skills are largely kept. Forgetting comes mainly from interference by similar content and long disuse.'),
      ai: b('按顺序微调时，旧任务的表现可能大幅下降；回放和正则化能减轻，但不能完全消除。', 'With sequential fine-tuning, performance on old tasks can drop sharply. Replay and regularization reduce this but do not remove it.'),
      gap: b('大脑的遗忘是渐进的、有选择的，网络的遗忘可能是突然而全面的。', 'Forgetting in the brain is gradual and selective, while in networks it can be sudden and wholesale.'),
    },
    {
      lead: 'bio',
      dimension: b('保持可塑性', 'Staying plastic'),
      brain: b('成年后仍能学习新东西，尽管有些能力（如母语口音）过了关键期就难以习得。', 'Adults keep learning new things, although some abilities, such as a native accent, become hard after critical periods.'),
      ai: b('2024 年的研究显示，标准深度学习方法在长期连续训练中会逐渐失去学习新任务的能力，需要重新初始化部分单元来恢复。', 'A 2024 study showed that standard deep learning gradually loses the ability to learn new tasks during long continual training, and some units must be reinitialized to recover it.'),
      gap: b('长期保持学习能力是标准网络缺少的性质。', 'Keeping the ability to learn over the long term is a property standard networks lack.'),
    },
    {
      lead: 'even',
      dimension: b('旧知识帮助新学习', 'Old knowledge speeds new learning'),
      brain: b('已有知识框架时，新的相关信息学一次就能记住，并在一两天内整合进新皮层（大鼠实验）。', 'With an existing framework of knowledge, related new information is learned in one go and integrated into neocortex within a day or two, in rat experiments.'),
      ai: b('预训练模型在新任务上微调，只需少量数据就能达到好的效果。', 'A pretrained model fine-tuned on a new task does well with little data.'),
      gap: b('两边都表现出很强的正向迁移。', 'Both show strong forward transfer.'),
    },
    {
      lead: 'comp',
      dimension: b('精确保留', 'Exact retention'),
      brain: b('记忆会随时间淡化，也会在回忆时被改写。', 'Memories fade over time and are rewritten when recalled.'),
      ai: b('冻结后参数不变，已学能力不会自行退化。', 'Once frozen, parameters do not change, and learned abilities never decay by themselves.'),
      gap: b('只要不再训练，模型能完全保留学过的东西；代价是不再学习。', 'As long as training stops, a model keeps everything it learned, at the cost of no longer learning.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('海马快速记录', 'Fast recording in the hippocampus'),
        points: [
          b('一段新经历以较大的学习率写进海马，一次就能存下。', 'A new experience is written into the hippocampus with a high learning rate, stored in one go.'),
          b('海马的稀疏编码让新旧记忆彼此重叠很少，减少干扰。', 'Sparse coding in the hippocampus keeps new and old memories from overlapping much, reducing interference.'),
        ],
      },
      {
        title: b('突触巩固', 'Synaptic consolidation'),
        points: [
          b('被反复使用的连接经蛋白质合成变得稳定，新长出的部分树突棘可以保持数月。', 'Connections used repeatedly stabilize through protein synthesis, and some newly grown spines persist for months.'),
          b('理论模型认为，每个突触内部有多个变化快慢不同的状态，记忆从快的状态逐步转入慢的状态。', 'Theoretical models suggest each synapse has several internal states of different speeds, and memory moves gradually from fast to slow ones.'),
        ],
      },
      {
        title: b('睡眠回放', 'Replay in sleep'),
        points: [
          b('睡眠中，海马重放白天的经历，同时皮层中的旧记忆也被重新激活。', 'In sleep, the hippocampus replays the day’s experience while old memories in cortex reactivate too.'),
          b('新旧内容由此交错出现，相当于把新旧样本混在一起训练新皮层。', 'New and old content thus alternate, like training the neocortex on a mix of new and old samples.'),
        ],
      },
      {
        title: b('新皮层缓慢学习', 'Slow learning in neocortex'),
        points: [
          b('新皮层以很小的学习率，在交错的新旧样本上逐步调整连接。', 'The neocortex adjusts its connections gradually with a small learning rate on interleaved new and old samples.'),
          b('新知识被融入已有的结构，而不是覆盖它；与已有知识一致的内容整合得更快。', 'New knowledge fits into the existing structure instead of overwriting it, and content consistent with prior knowledge integrates faster.'),
        ],
      },
      {
        title: b('干扰与遗忘', 'Interference and forgetting'),
        points: [
          b('与旧记忆相似的新内容会写到重叠的连接上，造成干扰。', 'New content similar to an old memory writes onto overlapping connections and interferes.'),
          b('长期不用的连接会被修剪，记忆随之淡化。', 'Connections left unused are pruned, and the memory fades.'),
        ],
      },
    ],
    computational: [
      {
        title: b('任务按顺序到来', 'Tasks arrive in sequence'),
        points: [b('模型先学任务 A，再学任务 B，学 B 时通常拿不到 A 的全部数据。', 'The model learns task A, then task B, usually without full access to A’s data while learning B.')],
      },
      {
        title: b('梯度下降更新共享参数', 'Gradient descent on shared parameters'),
        points: [
          b('所有任务共用同一组参数，学 B 时的梯度只考虑 B 的误差。', 'All tasks share one set of parameters, and the gradient while learning B considers only B’s error.'),
          b('对 A 重要的参数被随意改动，A 的表现因此崩溃。', 'Parameters important to A are changed freely, and performance on A collapses.'),
        ],
      },
      {
        title: b('回放缓冲区', 'Replay buffer'),
        points: [b('保存一小部分旧数据（或用生成模型产生旧样本），混进新任务的每一批训练数据。', 'A small sample of old data, or samples from a generative model, is mixed into every batch of the new task.')],
      },
      {
        title: b('正则化', 'Regularization'),
        points: [b('估计每个参数对旧任务有多重要，学新任务时给重要参数加上「拉回原位」的约束（如 EWC）。', 'Estimate how important each parameter is to old tasks and, while learning a new one, pull important parameters back toward their old values, as in EWC.')],
      },
      {
        title: b('参数隔离', 'Parameter isolation'),
        points: [b('冻结原有参数，为新任务增加少量新参数（如 LoRA 适配器），旧任务因此不受影响。', 'Freeze the existing parameters and add a few new ones for the new task, such as LoRA adapters, so old tasks are untouched.')],
      },
      {
        title: b('缺失的一步（虚线框）', 'The missing step (dashed box)'),
        points: [b('没有自动的离线整合：模型不会在空闲时自己把新旧知识交错重放、合并进同一组参数。', 'No automatic offline integration: the model never replays new and old knowledge interleaved and merges them into one set of parameters on its own.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('「互补学习系统」理论于 1995 年提出：海马负责快速学习具体经历，新皮层负责缓慢提取共同结构；如果新皮层也快速学习，就会像神经网络一样出现灾难性干扰。', 'Complementary learning systems theory was proposed in 1995. The hippocampus learns specific experiences fast and the neocortex slowly extracts shared structure. If the neocortex learned fast, it would suffer catastrophic interference like a neural network.'),
      b('2016 年的更新指出，与已有知识一致的新信息，新皮层也能较快学会；2007 年的大鼠实验中，已建立「知识框架」的大鼠一次就学会新的位置与气味配对，48 小时后已不依赖海马。', 'A 2016 update noted that the neocortex can learn new information quickly when it fits existing knowledge. In a 2007 rat study, rats with an established framework learned new place and odor pairs in one trial and no longer needed the hippocampus after 48 hours.'),
      b('小鼠运动皮层的成像显示，学习新动作时长出少量新的树突棘，其中一部分可以保持到动物一生，与动作记忆的保持相关。', 'Imaging of mouse motor cortex showed a few new spines grow when a new movement is learned, and some last for the animal’s lifetime, associated with keeping the motor memory.'),
      b('遗忘不全是缺陷：遗忘细节有助于提取概括，主动遗忘也能减少过时信息的干扰。', 'Forgetting is not only a flaw. Losing details helps extract generalizations, and active forgetting reduces interference from outdated information.'),
    ],
    computational: [
      b('灾难性遗忘在 1989 年就被发现：用反向传播先学一组算术题、再学另一组，网络几乎完全忘掉了第一组。', 'Catastrophic forgetting was found in 1989. A network trained by backpropagation on one set of arithmetic facts and then another nearly forgot the first set.'),
      b('EWC 用费舍尔信息估计参数的重要性：改动某个参数会让旧任务的预测变化多少。它在一系列游戏和图像任务上减轻了遗忘，但任务很多时约束会越积越多。', 'EWC estimates importance with Fisher information, how much changing a parameter would change predictions on old tasks. It reduced forgetting on series of games and image tasks, but constraints pile up as tasks multiply.'),
      b('「可塑性丧失」与遗忘不同：网络不是忘了旧任务，而是学不会新任务。原因包括许多单元不再激活、权重变得过大等；定期重新初始化不常用的单元可以缓解。', 'Loss of plasticity differs from forgetting. The network does not forget old tasks but can no longer learn new ones. Causes include many units going inactive and weights growing too large, and periodically reinitializing little-used units helps.'),
      b('LoRA 把对一个大矩阵的修改限制为两个小矩阵的乘积，新增参数通常不到原模型的百分之一；不同任务的适配器可以分别保存、切换使用。', 'LoRA restricts the change to a large matrix to the product of two small matrices, usually under one percent of the original parameters. Adapters for different tasks can be stored and swapped.'),
    ],
  },
  bioMath: [
    {
      title: b('干扰：新记忆写在与旧记忆重叠的连接上', 'Interference: a new memory written onto connections shared with an old one'),
      tex: t`W = \mathbf{y}_A\mathbf{x}_A^{\top} + \mathbf{y}_B\mathbf{x}_B^{\top},\qquad W\mathbf{x}_A = \mathbf{y}_A\,\lVert\mathbf{x}_A\rVert^2 + \mathbf{y}_B\,\big(\mathbf{x}_B^{\top}\mathbf{x}_A\big)`,
      symbols: [
        { tex: t`\mathbf{x}_A,\;\mathbf{y}_A`, meaning: b('旧记忆的输入模式和要回忆出的输出模式', 'input and output patterns of the old memory') },
        { tex: t`\mathbf{x}_B,\;\mathbf{y}_B`, meaning: b('新记忆的输入和输出模式', 'input and output patterns of the new memory') },
        { tex: t`W`, meaning: b('连接矩阵，两段记忆都用赫布规则写在这里', 'the connection matrix, where both memories are written by the Hebbian rule') },
        { tex: t`\mathbf{x}_B^{\top}\mathbf{x}_A`, meaning: b('两个输入模式的重叠程度', 'overlap between the two input patterns') },
      ],
      steps: [
        b('两段记忆按赫布规则先后写进同一个连接矩阵。', 'Two memories are written one after the other into the same connection matrix by the Hebbian rule.'),
        b('用旧记忆的输入去回忆：得到的输出是旧记忆本身，加上新记忆按「两个输入的重叠」混进来的一部分。', 'Recall with the old input. The output is the old memory plus a share of the new one, scaled by how much the two inputs overlap.'),
        b('两个输入完全不重叠（点积为 $0$）时，没有干扰；重叠越大，旧记忆被新记忆污染得越多。', 'With no overlap, a dot product of $0$, there is no interference. The more they overlap, the more the new memory corrupts the old.'),
      ],
      example: b(
        '设 $\\mathbf{x}_A = (1, 1, 0, 0)$，$\\mathbf{x}_B = (0, 0, 1, 1)$，重叠为 $0$，回忆 A 时只得到 $2\\,\\mathbf{y}_A$，没有干扰。若改为 $\\mathbf{x}_B = (1, 0, 1, 0)$，重叠为 $1$，回忆 A 得到 $2\\,\\mathbf{y}_A + \\mathbf{y}_B$，新记忆混进了一半强度。',
        'Let $\\mathbf{x}_A = (1, 1, 0, 0)$ and $\\mathbf{x}_B = (0, 0, 1, 1)$. Their overlap is $0$, so recalling A gives only $2\\,\\mathbf{y}_A$, with no interference. If instead $\\mathbf{x}_B = (1, 0, 1, 0)$, the overlap is $1$ and recalling A gives $2\\,\\mathbf{y}_A + \\mathbf{y}_B$, the new memory mixed in at half strength.'),
      consequences: [
        b('解释了为什么相似的新旧内容最容易相互干扰（倒摄干扰）。', 'It explains why similar old and new content interfere most, called retroactive interference.'),
        b('也说明了海马稀疏编码的作用：让不同记忆的输入模式尽量不重叠。', 'It also shows why sparse coding in the hippocampus helps: it keeps the input patterns of different memories from overlapping.'),
      ],
      limitations: [
        b('这是最简单的线性联想记忆；真实网络有非线性和抑制，干扰的形式更复杂。', 'This is the simplest linear associative memory. Real networks have nonlinearity and inhibition, and interference takes more complex forms.'),
        b('模型只描述干扰，不包括巩固和回放怎样减轻它。', 'The model describes interference only, not how consolidation and replay reduce it.'),
      ],
    },
    {
      title: b('突触级联：记忆从快变量逐步流向慢变量', 'Synaptic cascade: memory flows from fast to slow variables'),
      tex: t`C_k\,\frac{du_k}{dt} = g_{k-1,k}\,\big(u_{k-1} - u_k\big) + g_{k,k+1}\,\big(u_{k+1} - u_k\big),\qquad k = 1, \dots, m`,
      symbols: [
        { tex: t`u_1`, meaning: b('突触的可见强度，学习直接改变它', 'the visible strength of the synapse, changed directly by learning') },
        { tex: t`u_2, \dots, u_m`, meaning: b('突触内部变化越来越慢的隐藏状态', 'hidden internal states of the synapse, each slower than the last') },
        { tex: t`C_k`, meaning: b('第 $k$ 个状态的「容量」：越大，变化越慢', 'capacity of state $k$: the larger, the slower it changes') },
        { tex: t`g_{k,k+1}`, meaning: b('相邻两个状态之间的耦合强度', 'coupling between neighboring states') },
      ],
      steps: [
        b('学习改变最外层的 $u_1$。', 'Learning changes the outermost state $u_1$.'),
        b('每个状态都向相邻状态靠拢，就像液体在一串大小不同的容器之间流动。', 'Each state moves toward its neighbors, like liquid flowing through a chain of beakers of different sizes.'),
        b('变化逐步流入越来越慢的状态，并在那里保存很久；慢状态又反过来把 $u_1$ 拉回，使记忆不被后来的小变化轻易抹掉。', 'The change flows gradually into slower states and stays there a long time. Slow states in turn pull $u_1$ back, so later small changes do not easily erase the memory.'),
      ],
      example: b(
        '两个状态，$C_1 = 1$、$C_2 = 10$，耦合 $g_{12} = 1$。学习把 $u_1$ 从 $0$ 推到 $1$，$u_2 = 0$。随后 $u_1$ 下降、$u_2$ 缓慢上升，最终两者都停在约 $\\tfrac{1}{11} \\approx 0.09$：一部分记忆以慢变量的形式保存下来，不会再随 $u_1$ 的快速波动消失。',
        'Two states with $C_1 = 1$, $C_2 = 10$ and coupling $g_{12} = 1$. Learning pushes $u_1$ from $0$ to $1$, with $u_2 = 0$. Then $u_1$ falls and $u_2$ slowly rises until both settle near $\\tfrac{1}{11} \\approx 0.09$. Part of the memory is kept in the slow variable and no longer vanishes with fast fluctuations of $u_1$.'),
      consequences: [
        b('同一个突触同时具备快速学习和长期保持，记忆容量随突触数量增长得比单一状态模型快得多。', 'One synapse both learns fast and retains long, and memory capacity grows with the number of synapses much faster than in single-state models.'),
        b('记忆的衰减呈幂律而不是指数，与行为中遗忘曲线的形状一致。', 'Memories decay as a power law rather than exponentially, consistent with the shape of behavioral forgetting curves.'),
      ],
      limitations: [
        b('隐藏状态对应哪些分子过程尚不清楚，这是一个理论模型。', 'Which molecular processes the hidden states correspond to is unclear. This is a theoretical model.'),
        b('模型只描述单个突触，不包括海马与新皮层之间的系统巩固。', 'It describes a single synapse, not systems consolidation between hippocampus and neocortex.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('EWC：给对旧任务重要的参数加上弹性约束', 'EWC: elastic constraints on parameters important to old tasks'),
      tex: t`\mathcal{L}(\theta) = \mathcal{L}_B(\theta) + \sum_i \frac{\lambda}{2}\,F_i\,\big(\theta_i - \theta_{A,i}^{*}\big)^2`,
      symbols: [
        { tex: t`\mathcal{L}_B`, meaning: b('新任务 B 的损失', 'loss of the new task B') },
        { tex: t`\theta_{A,i}^{*}`, meaning: b('学完任务 A 后第 $i$ 个参数的值', 'value of parameter $i$ after learning task A') },
        { tex: t`F_i`, meaning: b('费舍尔信息：参数 $i$ 对任务 A 有多重要', 'Fisher information: how important parameter $i$ is to task A') },
        { tex: t`\lambda`, meaning: b('旧任务与新任务之间的权衡系数', 'trade-off between old and new tasks') },
      ],
      steps: [
        b('学完任务 A 后，记下每个参数的值，并估计它的重要性 $F_i$：改动它会让 A 的预测变化多少。', 'After task A, record each parameter and estimate its importance $F_i$, how much changing it would alter A’s predictions.'),
        b('学任务 B 时，损失在 B 的误差之外加上一项：参数偏离原值越远、越重要，惩罚越大。', 'While learning B, add a term to B’s error that grows with how far each parameter strays and how important it is.'),
        b('结果是不重要的参数自由改变以学习 B，重要的参数基本留在原位。', 'Unimportant parameters move freely to learn B, while important ones stay close to where they were.'),
      ],
      example: b(
        '两个参数，对任务 A 的重要性 $F = (10, 0.1)$，取 $\\lambda = 1$。若学 B 需要把两个参数都移动 $0.5$，惩罚分别为 $\\tfrac12 \\times 10 \\times 0.25 = 1.25$ 和 $\\tfrac12 \\times 0.1 \\times 0.25 = 0.0125$。第一个参数的移动代价是第二个的 100 倍，所以学习主要通过改变第二个参数完成。',
        'Two parameters with importance $F = (10, 0.1)$ for task A, and $\\lambda = 1$. If learning B needs both to move by $0.5$, the penalties are $\\tfrac12 \\times 10 \\times 0.25 = 1.25$ and $\\tfrac12 \\times 0.1 \\times 0.25 = 0.0125$. Moving the first costs 100 times more, so learning happens mainly through the second.'),
      consequences: [
        b('不需要保存旧数据，只需要旧参数和它们的重要性。', 'No old data need be kept, only the old parameters and their importance.'),
        b('思路与「巩固让重要突触变得难以改变」相近。', 'The idea is close to consolidation making important synapses hard to change.'),
      ],
      limitations: [
        b('任务越多，被约束的参数越多，网络逐渐失去学习新任务的空间。', 'With more tasks, more parameters are constrained, and the network gradually loses room to learn.'),
        b('重要性用二次近似估计，旧任务与新任务差别大时不准确。', 'Importance comes from a quadratic approximation, which is inaccurate when tasks differ a lot.'),
      ],
    },
    {
      title: b('经验回放：把旧样本混进新的训练批次', 'Experience replay: mixing old samples into new batches'),
      tex: t`\mathcal{L}(\theta) = (1 - \rho)\;\mathbb{E}_{\mathcal{D}_B}\big[\ell\big] + \rho\;\mathbb{E}_{\mathcal{M}}\big[\ell\big],\qquad P_{\text{keep}}(n) = \frac{M}{n}`,
      symbols: [
        { tex: t`\mathcal{D}_B`, meaning: b('新任务的数据', 'data of the new task') },
        { tex: t`\mathcal{M}`, meaning: b('回放缓冲区：保存下来的一小部分旧样本', 'replay buffer: a small set of saved old samples') },
        { tex: t`M`, meaning: b('缓冲区的容量', 'buffer capacity') },
        { tex: t`\rho`, meaning: b('每批训练中旧样本所占的比例', 'share of old samples in each batch') },
        { tex: t`\ell`, meaning: b('单个样本的损失', 'loss on one sample') },
        { tex: t`P_{\text{keep}}(n)`, meaning: b('第 $n$ 个样本被留在缓冲区的概率，$n$ 是到目前为止见过的样本数', 'probability that sample $n$ stays in the buffer, with $n$ the number seen so far') },
      ],
      steps: [
        b('每一批训练数据中，按比例 $\\rho$ 从缓冲区取旧样本，其余用新任务的样本。', 'Fill a share $\\rho$ of each batch with samples from the buffer and the rest with new samples.'),
        b('缓冲区满了以后，第 $n$ 个新样本以 $M/n$ 的概率被留下，替换掉一个随机的旧样本（蓄水池抽样）。', 'Once the buffer is full, the $n$-th new sample is kept with probability $M/n$, replacing a random old one, called reservoir sampling.'),
        b('这样缓冲区始终是到目前为止所有样本的一个均匀随机子集，新旧任务都有代表。', 'The buffer then always holds a uniform random subset of everything seen, with every task represented.'),
      ],
      example: b(
        '缓冲区容量 $M = 1000$。见到第 $2000$ 个样本时，它被留下的概率是 $0.5$；第 $10000$ 个样本是 $0.1$。最终缓冲区里，早期任务和后期任务的样本比例与它们出现的次数成正比。',
        'Buffer capacity $M = 1000$. Sample $2000$ is kept with probability $0.5$, and sample $10000$ with $0.1$. In the end, early and late tasks are represented in proportion to how often they appeared.'),
      consequences: [
        b('交错训练新旧样本，与睡眠回放让新皮层交错学习的思路相同。', 'Interleaving old and new samples follows the same idea as sleep replay interleaving learning in the neocortex.'),
        b('在许多基准上，简单的回放就是最有效的持续学习方法之一。', 'On many benchmarks, simple replay is among the most effective continual learning methods.'),
      ],
      limitations: [
        b('需要保存旧数据，有存储和隐私成本；只用生成模型回放时，生成质量会限制效果。', 'Old data must be stored, with storage and privacy costs. With generative replay only, sample quality limits the benefit.'),
        b('缓冲区远小于全部历史，任务很多时每个任务的代表样本越来越少。', 'The buffer is far smaller than the full history, so with many tasks each gets fewer representatives.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('相似内容相互干扰', 'Similar content interferes'),
        text: b('新学的内容与旧记忆相似时，两者容易混淆，旧记忆可能被削弱。', 'When new content resembles an old memory, the two are easily confused and the old one may weaken.'),
        steps: [5],
      },
      {
        title: b('有些能力过了时期就难学', 'Some abilities close with age'),
        text: b('母语口音、某些感知能力在关键期之后很难再完全习得。', 'A native accent and some perceptual abilities are hard to acquire fully after critical periods.'),
        steps: [2, 4],
      },
      {
        title: b('整合需要睡眠和时间', 'Integration takes sleep and time'),
        text: b('系统巩固要经过多个夜晚，睡眠不足会削弱新记忆的保持。', 'Systems consolidation takes several nights, and lack of sleep weakens retention of new memories.'),
        steps: [3],
      },
    ],
    computational: [
      {
        title: b('灾难性遗忘', 'Catastrophic forgetting'),
        text: b('共享参数只按新任务的误差更新，旧任务的表现可能突然崩溃。', 'Shared parameters update only by the new task’s error, and old performance can collapse suddenly.'),
        steps: [2],
      },
      {
        title: b('可塑性逐渐丧失', 'Plasticity fades'),
        text: b('长期连续训练后，网络学习新任务的能力下降，需要重置部分单元。', 'After long continual training, the network learns new tasks less well and needs some units reset.'),
        steps: [2, 4],
      },
      {
        title: b('没有自动整合', 'No automatic integration'),
        text: b('部署中的模型不会自己在空闲时整合新经验；更新依赖人工安排的重新训练。', 'A deployed model never integrates new experience on its own when idle. Updates depend on retraining that people schedule.'),
        steps: [6],
      },
    ],
    misreadings: [],
  },
  refs: {
    neuro: ['wixted2004', 'yang2009', 'tse2007', 'wilson1994', 'girardeau2009'],
    models: ['mcclelland1995', 'kumaran2016', 'benna2016'],
    ai: ['mccloskey1989', 'french1999', 'kirkpatrick2017', 'rolnick2018', 'vitter1985', 'rusu2016', 'hu2021', 'dohare2024', 'parisi2018', 'wang2024cl'],
  },
}
