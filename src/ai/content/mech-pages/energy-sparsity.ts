import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M08 Sparse coding: represent each input with as few active units as possible from an overcomplete set. */
export const ENERGY_SPARSITY: MechEntry = {
  definition: b(
    '稀疏编码是指用一大组「特征」中的少数几个来表示每一个输入：特征的数量多于输入的维度，但对任何一个输入，只有少数特征对应的神经元活跃。它既节省脉冲的能量，也让每个神经元的含义更单一、更容易被下游读出。在自然图像上要求稀疏，学到的特征就像初级视皮层的简单细胞。',
    'Sparse coding represents each input with a few features out of a large set. There are more features than input dimensions, but for any one input only the neurons of a few features are active. This saves the energy of spikes and gives each neuron a narrower meaning that is easier to read out. Requiring sparseness on natural images yields features like the simple cells of primary visual cortex.'),
  scale: b('一个脑区中的神经元群体', 'A population of neurons in one area'),
  timescale: b('数十毫秒内完成推断，特征在发育和学习中形成', 'Inference within tens of milliseconds, features formed over development and learning'),
  steps: [
    {
      title: b('输入', 'Input'),
      points: [
        b('一小块图像以视网膜和丘脑神经元的放电形式到达初级视皮层。', 'A small patch of image reaches primary visual cortex as the firing of retinal and thalamic neurons.'),
      ],
    },
    {
      title: b('过完备的特征集', 'An overcomplete set of features'),
      points: [
        b('初级视皮层的神经元比输入纤维多得多，每个神经元偏好一种局部的、有方向的边缘。', 'Primary visual cortex has far more neurons than input fibers, and each prefers a local, oriented edge.'),
        b('特征比维度多，同一块图像可以用很多种组合表示。', 'With more features than dimensions, the same patch can be represented by many combinations.'),
      ],
    },
    {
      title: b('竞争选出少数特征', 'Competition picks a few features'),
      points: [
        b('与输入最匹配的神经元先活跃，并通过侧抑制压低解释同一部分输入的其他神经元。', 'The neurons that match the input best become active first and, through lateral inhibition, suppress others that explain the same part.'),
        b('结果是只有少数神经元强烈放电，它们合起来重建输入。', 'In the end only a few neurons fire strongly, and together they reconstruct the input.'),
      ],
    },
    {
      title: b('稀疏的好处', 'What sparseness buys'),
      points: [
        b('活跃的神经元少，脉冲就少，能耗低（见[效率与物理实现](topic:efficiency)）。', 'Fewer active neurons mean fewer spikes and lower energy (see [efficiency and physical implementation](topic:efficiency)).'),
        b('每个神经元只在特定特征出现时放电，下游更容易读出、存储时相互干扰更少。', 'Each neuron fires only for its feature, which makes readout easier and storage less prone to interference.'),
      ],
    },
    {
      title: b('学习特征', 'Learning the features'),
      points: [
        b('特征本身在经验中调整，使得用少数特征就能很好地重建常见的输入。', 'The features themselves adjust with experience, so that a few of them reconstruct common inputs well.'),
        b('在自然图像上这样学习，得到的特征是局部、有方向、带通的，与简单细胞的感受野相似。', 'Learned this way on natural images, the features are local, oriented and band-pass, like simple-cell receptive fields.'),
      ],
    },
  ],
  notes: [
    b('Olshausen 与 Field 在 1996 年证明，只要求编码稀疏并能重建自然图像，就能自动学出类似初级视皮层简单细胞的感受野。', 'Olshausen and Field showed in 1996 that a sparse code that reconstructs natural images is enough to learn receptive fields like those of V1 simple cells.'),
    b('能量的限制使皮层同一时刻只能有少数神经元强烈活跃，这为稀疏编码提供了一个能量上的理由（见[效率与物理实现](topic:efficiency)）。', 'Energy limits allow only a few cortical neurons to be strongly active at once. This gives sparse coding an energy rationale (see [efficiency and physical implementation](topic:efficiency)).'),
    b('「迭代收缩阈值」算法（ISTA）在 2004 年被证明能收敛到稀疏编码问题的解，它的每一步可以看作一次带阈值的神经元更新。', 'The iterative shrinkage-thresholding algorithm (ISTA) was proven in 2004 to converge to the solution of the sparse coding problem. Each of its steps can be seen as a neuron update with a threshold.'),
    b('稀疏的程度在不同脑区差别很大：海马齿状回和小脑颗粒细胞极其稀疏，部分感觉区则较为稠密。', 'Sparseness varies widely between areas. The dentate gyrus and cerebellar granule cells are extremely sparse, and some sensory areas are denser.'),
  ],
  counterpart: [
    b('L1 正则化在损失中加入权重或激活绝对值之和，使大多数值变成 $0$，是稀疏编码目标在机器学习中的直接对应。', 'L1 regularization adds the sum of absolute values of weights or activations to the loss and drives most of them to $0$. It is the direct machine learning counterpart of the sparse coding objective.'),
    b('稀疏自编码器被用来分解大语言模型的内部激活，得到更容易解释、含义更单一的特征。', 'Sparse autoencoders are used to decompose the internal activations of large language models into features that are easier to interpret and narrower in meaning.'),
    b('训练好的 Transformer 中，前馈层的激活自然变得稀疏；MoE 则在模块层面只激活少数专家（见[注意选择与信息门控](topic:attention-gating)）。', 'In trained Transformers, feedforward activations become sparse on their own. MoE activates only a few experts at the module level (see [attentional selection and information gating](topic:attention-gating)).'),
  ],
  math: [
    {
      title: b('稀疏编码与 ISTA：重建误差加上稀疏惩罚，用收缩阈值逐步求解', 'Sparse coding and ISTA: reconstruction error plus a sparsity penalty, solved by repeated shrinkage'),
      tex: t`\min_{\mathbf{a}}\ \tfrac{1}{2}\big\|\mathbf{x} - \Phi\mathbf{a}\big\|_2^2 + \lambda\,\|\mathbf{a}\|_1,\qquad \mathbf{a} \leftarrow S_{\eta\lambda}\big(\mathbf{a} + \eta\,\Phi^{\top}(\mathbf{x} - \Phi\mathbf{a})\big),\qquad S_{c}(u) = \mathrm{sign}(u)\max(|u| - c,\,0)`,
      symbols: [
        { tex: t`\mathbf{x}`, meaning: b('输入，例如一小块图像的像素', 'input, such as the pixels of an image patch') },
        { tex: t`\Phi`, meaning: b('特征字典：每一列是一个特征', 'dictionary of features, one per column') },
        { tex: t`\mathbf{a}`, meaning: b('各特征的系数，即对应神经元的活动', 'coefficient of each feature, the activity of its neuron') },
        { tex: t`\lambda`, meaning: b('稀疏惩罚的强度', 'strength of the sparsity penalty') },
        { tex: t`\eta`, meaning: b('每一步的步长', 'step size of each update') },
        { tex: t`S_c`, meaning: b('收缩阈值：把绝对值小于 $c$ 的系数变为 $0$，其余向 $0$ 收缩 $c$', 'shrinkage: sets coefficients smaller than $c$ in size to $0$ and moves the rest toward $0$ by $c$') },
      ],
      steps: [
        b('计算当前系数重建输入的残差 $\\mathbf{x} - \\Phi\\mathbf{a}$。', 'Compute the residual of the current reconstruction, $\\mathbf{x} - \\Phi\\mathbf{a}$.'),
        b('每个特征按它与残差的相似度 $\\Phi^{\\top}(\\mathbf{x} - \\Phi\\mathbf{a})$ 增大或减小系数，这一项也让解释同一部分输入的特征相互竞争。', 'Each feature raises or lowers its coefficient by its similarity to the residual, $\\Phi^{\\top}(\\mathbf{x} - \\Phi\\mathbf{a})$. This term also makes features that explain the same part of the input compete.'),
        b('收缩阈值把小的系数清零、把其余的略微缩小；重复直到不再变化。', 'Shrinkage zeroes small coefficients and slightly shrinks the rest. Repeat until nothing changes.'),
      ],
      example: b(
        '$8$ 个特征、$6$ 维输入，输入由第 $3$ 和第 $6$ 个特征按 $1$ 和 $0.6$ 合成，再加少量噪声。$\\lambda = 0$ 时，$8$ 个系数都不为零，重建误差为 $0$。$\\lambda = 0.05$ 时只剩第 $3$、第 $6$ 个特征活跃，系数约为 $1.01$ 和 $0.51$，重建误差约 $6\\%$。$\\lambda = 0.5$ 时仍是这两个特征，但系数缩到约 $0.70$ 和 $0.20$，误差升到约 $42\\%$。',
        'Eight features and a $6$-dimensional input, built from features $3$ and $6$ with weights $1$ and $0.6$ plus a little noise. At $\\lambda = 0$ all $8$ coefficients are nonzero and the reconstruction error is $0$. At $\\lambda = 0.05$ only features $3$ and $6$ stay active, with coefficients of about $1.01$ and $0.51$ and an error of about $6\\%$. At $\\lambda = 0.5$ the same two remain, but the coefficients shrink to about $0.70$ and $0.20$ and the error rises to about $42\\%$.'),
      consequences: [
        b('适度的稀疏惩罚让编码找出真正构成输入的少数特征，而不是把输入摊到所有特征上。', 'A moderate sparsity penalty makes the code find the few features that actually make up the input, instead of spreading it over all features.'),
        b('惩罚越强，活跃的特征越少、能耗越低，但重建越差：稀疏与精确之间存在取舍。', 'The stronger the penalty, the fewer active features and the lower the energy, but the worse the reconstruction. Sparseness trades against precision.'),
      ],
      limitations: [
        b('ISTA 是一种求解算法；大脑是否以类似的方式计算稀疏码，还没有直接证据。', 'ISTA is a solution algorithm, and there is no direct evidence that the brain computes sparse codes in a similar way.'),
        b('例中的字典是固定的；学习字典需要另一个缓慢的更新过程。', 'The dictionary in the example is fixed, and learning it needs a separate, slower update.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('能效编码：每单位能量的信息在低放电率时最多', 'Energy-efficient coding: most information per unit energy at low rates'), to: 'topic:efficiency' },
    { title: b('混合专家路由：每个词元只经过少数几个专家', 'Mixture-of-experts routing: each token passes through only a few experts'), to: 'topic:attention-gating' },
    { title: b('V1 简单细胞：Gabor 滤波器加整流', 'V1 simple cells: a Gabor filter followed by rectification'), to: 'topic:visual-recognition' },
  ],
  conditions: [
    b('稀疏编码能解释简单细胞的感受野形状，但其他目标（如独立成分分析）也能得到相似的结果，不能据此认定大脑在优化这一个目标。', 'Sparse coding explains the shape of simple-cell receptive fields, but other objectives such as independent component analysis give similar results. This does not show that the brain optimizes this one objective.'),
    b('「稀疏」可以指同一时刻少数神经元活跃，也可以指每个神经元很少放电，两者在实验中需要分开测量。', 'Sparse can mean few neurons active at a time or each neuron rarely active, and experiments must measure the two separately.'),
    b('稀疏程度与精度、容错之间的最佳平衡因脑区和任务而不同。', 'The best balance between sparseness, precision and fault tolerance differs between areas and tasks.'),
  ],
  uses: [
    { to: 'topic:visual-recognition', role: b('初级视皮层用少数方向选择性的神经元表示一块图像。', 'Primary visual cortex represents an image patch with a few orientation-selective neurons.') },
    { to: 'topic:efficiency', role: b('稀疏放电是大脑在固定能量预算下的主要编码方式。', 'Sparse firing is the brain’s main coding strategy under a fixed energy budget.') },
    { to: 'topic:episodic-memory', role: b('海马齿状回极其稀疏的编码减少了相似记忆之间的重叠。', 'The extremely sparse code of the dentate gyrus reduces overlap between similar memories.') },
  ],
  refs: ['olshausen1996', 'daubechies2004', 'attwell2001', 'lennie2003', 'cunningham2023', 'li2022lazy', 'fedus2022'],
}
