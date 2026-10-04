import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M08 Expansion coding: a few inputs fanned out to many sparse units, so a simple readout can separate them. */
export const EXPANSION: MechEntry = {
  definition: b(
    '扩展编码是把少量输入通道投射到数量多得多的神经元上，每个神经元只接收少数几个输入的组合，并且只有少数神经元同时活跃。这样，原本在少数维度里纠缠在一起的模式，在高维空间里变得容易用一个简单的加权求和区分开。小脑颗粒细胞和昆虫蘑菇体的 Kenyon 细胞是典型的例子。',
    'Expansion coding projects a few input channels onto far more neurons. Each neuron receives a combination of only a few inputs, and only a few neurons are active at once. Patterns tangled together in a few dimensions then become easy to separate in the high-dimensional space with a simple weighted sum. Cerebellar granule cells and Kenyon cells in the insect mushroom body are classic examples.'),
  scale: b('从数百到数百亿个神经元的投射', 'Projections onto hundreds to tens of billions of neurons'),
  timescale: b('一次前馈传递，约数毫秒到数十毫秒', 'One feedforward pass, milliseconds to tens of milliseconds'),
  steps: [
    {
      title: b('少量输入通道', 'A few input channels'),
      points: [
        b('小脑的苔藓纤维、果蝇的约 50 类嗅觉投射神经元，把感觉和运动信息送进来。', 'Mossy fibers in the cerebellum, or about 50 types of olfactory projection neurons in the fly, bring in sensory and motor information.'),
      ],
    },
    {
      title: b('扩展到大量细胞', 'Expansion to many cells'),
      points: [
        b('输入投射到数量多得多的细胞：果蝇约 2000 个 Kenyon 细胞，人类小脑约数百亿个颗粒细胞。', 'The input projects onto far more cells: about 2000 Kenyon cells in the fly and tens of billions of granule cells in the human cerebellum.'),
      ],
    },
    {
      title: b('每个细胞只看少数输入', 'Each cell sees only a few inputs'),
      points: [
        b('一个颗粒细胞只接收约 4 根苔藓纤维；一个 Kenyon 细胞接收约 7 个随机选择的投射神经元。', 'A granule cell receives only about 4 mossy fibers, and a Kenyon cell receives about 7 randomly chosen projection neurons.'),
        b('每个细胞因此代表一种输入组合。', 'Each cell therefore stands for one combination of inputs.'),
      ],
    },
    {
      title: b('抑制使活动稀疏', 'Inhibition keeps activity sparse'),
      points: [
        b('抑制性细胞（小脑的 Golgi 细胞）提高放电阈值，只有输入组合足够匹配的少数细胞放电。', 'Inhibitory cells, Golgi cells in the cerebellum, raise the firing threshold, so only the few cells whose input combination matches well fire.'),
      ],
    },
    {
      title: b('线性读出', 'Linear readout'),
      points: [
        b('浦肯野细胞或蘑菇体输出神经元对扩展后的活动做加权求和，学习只改变这一层的连接。', 'Purkinje cells or mushroom body output neurons take a weighted sum of the expanded activity, and learning changes only this layer.'),
        b('在高维、稀疏的表示中，不同的模式更可能被一个超平面分开。', 'In a high-dimensional sparse representation, different patterns are more likely to be split by a hyperplane.'),
      ],
    },
    {
      title: b('同类结构', 'Similar structures'),
      points: [
        b('海马齿状回的细胞比它的输入多得多，活动也很稀疏，被认为负责把相似的经历分开存储（见[情景记忆](topic:episodic-memory)）。', 'The hippocampal dentate gyrus has far more cells than its input and very sparse activity. It is thought to store similar experiences apart (see [episodic memory](topic:episodic-memory)).'),
      ],
    },
  ],
  notes: [
    b('Marr 在 1969 年提出小脑理论：颗粒细胞把苔藓纤维输入扩展成组合编码，浦肯野细胞在攀缘纤维的指导下学习读出。', 'Marr proposed in 1969 a theory of the cerebellum. Granule cells expand mossy fiber input into a combinatorial code, and Purkinje cells learn to read it out guided by climbing fibers.'),
    b('2013 年的研究追踪了果蝇 Kenyon 细胞的输入，发现每个细胞的输入是从投射神经元中近似随机选取的。', 'A 2013 study traced the inputs of fly Kenyon cells and found that each cell’s inputs are drawn roughly at random from the projection neurons.'),
    b('2017 年的理论分析表明，每个细胞约 4 个输入的低入度能使读出的可分性最大，与小脑的解剖数据一致。', 'A 2017 theory showed that a low in-degree of about 4 inputs per cell maximizes the separability of the readout, matching cerebellar anatomy.'),
    b('2014 年的理论分析了扩展和稀疏怎样共同减少表示之间的重叠，以及噪声怎样限制扩展的收益。', 'A 2014 theory analyzed how expansion and sparseness together reduce overlap between representations, and how noise limits the gain from expansion.'),
  ],
  counterpart: [
    b('Transformer 的前馈层先把每个向量扩展到 $4$ 倍宽度，经过非线性后再投影回来，结构上与扩展编码相似。', 'The feedforward layer of a Transformer expands each vector to $4$ times its width, applies a nonlinearity and projects back. In structure this resembles expansion coding.'),
    b('随机特征方法和核方法把输入映射到高维空间，再训练一个线性分类器；储备池计算用一个固定的随机循环网络做同样的事。', 'Random feature and kernel methods map input to a high-dimensional space and train a linear classifier on it. Reservoir computing does the same with a fixed random recurrent network.'),
    b('前馈层的扩展权重是训练出来的，不是随机的，活动也比颗粒细胞稠密得多。', 'The expansion weights of feedforward layers are trained rather than random, and their activity is far denser than that of granule cells.'),
  ],
  math: [
    {
      title: b('Cover 定理：维度越高，随机分组越可能被一个超平面分开', 'Cover’s theorem: the higher the dimension, the more likely a random split is separable by a hyperplane'),
      tex: t`C(P, N) = 2\sum_{k=0}^{N-1}\binom{P - 1}{k},\qquad F(P, N) = \frac{C(P, N)}{2^{P}}`,
      symbols: [
        { tex: t`P`, meaning: b('要区分的输入模式的数量', 'number of input patterns to tell apart') },
        { tex: t`N`, meaning: b('表示所用的维度（神经元数）', 'dimension of the representation, the number of neurons') },
        { tex: t`C(P, N)`, meaning: b('能被一个过原点的超平面实现的分组方式的数量', 'number of ways to split the patterns that a hyperplane through the origin can realize') },
        { tex: t`2^{P}`, meaning: b('把 $P$ 个模式分成两类的全部方式', 'all ways to split $P$ patterns into two classes') },
        { tex: t`F`, meaning: b('随机指定一种分组时，它能被线性分开的概率', 'chance that a randomly chosen split is linearly separable') },
      ],
      steps: [
        b('$P$ 个处于一般位置的点，在 $N$ 维空间里能被线性实现的分组数为 $C(P, N)$。', 'For $P$ points in general position in $N$ dimensions, the number of linearly realizable splits is $C(P, N)$.'),
        b('除以全部 $2^P$ 种分组，得到随机分组可分的概率 $F$。', 'Divide by all $2^P$ splits to get the chance $F$ that a random split is separable.'),
        b('$P \\le N$ 时 $F = 1$；$P = 2N$ 时 $F = 1/2$；之后迅速趋于 $0$。', 'For $P \\le N$, $F = 1$. At $P = 2N$, $F = 1/2$, and beyond that it falls quickly toward $0$.'),
      ],
      example: b(
        '$6$ 个模式在 $4$ 维中：$C = 2(1 + 5 + 10 + 10) = 52$，$F = 52/64 \\approx 0.81$，约五分之一的分组无法线性实现。把同样的 $6$ 个模式扩展到 $10$ 维：$F = 1$，任意分组都能用一个超平面分开。$4$ 维中的 $8$ 个模式，$F$ 正好是 $0.5$。',
        'Six patterns in $4$ dimensions give $C = 2(1 + 5 + 10 + 10) = 52$ and $F = 52/64 \\approx 0.81$. About a fifth of the splits cannot be realized linearly. Expanding the same $6$ patterns to $10$ dimensions gives $F = 1$, and any split can be made by a hyperplane. With $8$ patterns in $4$ dimensions, $F$ is exactly $0.5$.'),
      consequences: [
        b('维度大约是模式数的一半以上时，几乎任何分组都能被线性读出学会；扩展编码用增加神经元数换取简单的读出。', 'When the dimension is over about half the number of patterns, almost any split can be learned by a linear readout. Expansion coding trades more neurons for a simple readout.'),
        b('学习只需要改变读出层，扩展层可以是固定的、甚至随机的。', 'Learning only needs to change the readout, and the expansion layer can be fixed or even random.'),
      ],
      limitations: [
        b('定理假设模式处于「一般位置」，真实的感觉输入往往高度相关，需要非线性和稀疏才能真正增加有效维度。', 'The theorem assumes patterns in general position. Real sensory inputs are often highly correlated, and nonlinearity and sparseness are needed to really raise the effective dimension.'),
        b('只讨论能否分开，不讨论能否推广到新的模式；维度过高时读出可能只是记住了训练样本。', 'It concerns only whether patterns can be split, not whether the readout generalizes. With too many dimensions the readout may only memorize the training patterns.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('IT 群体的线性读出：类别在高级区域变得可分', 'Linear readout of IT populations: categories become separable in higher areas'), to: 'topic:visual-recognition' },
  ],
  conditions: [
    b('小脑和蘑菇体的解剖结构与扩展编码理论吻合；颗粒细胞的活动在清醒动物中是否真的如理论所需那样稀疏，近年的记录有不同结果。', 'The anatomy of the cerebellum and mushroom body fits expansion coding theory. Recent recordings disagree on whether granule cell activity in awake animals is as sparse as the theory needs.'),
    b('扩展的收益受噪声限制：每个细胞只看少数输入，输入噪声会在高维中被放大。', 'Noise limits the gain from expansion. Each cell sees only a few inputs, and input noise can be amplified in high dimensions.'),
    b('随机连接足够用于可分性，但也有证据表明部分连接受到学习或发育的塑造。', 'Random connections suffice for separability, but there is also evidence that some connections are shaped by learning or development.'),
  ],
  uses: [
    { to: 'topic:motor-control', role: b('小脑颗粒细胞把运动指令和感觉反馈扩展成组合编码，浦肯野细胞据此学习预测和校正动作。', 'Cerebellar granule cells expand motor commands and sensory feedback into a combinatorial code, from which Purkinje cells learn to predict and correct movement.') },
    { to: 'topic:episodic-memory', role: b('齿状回的扩展和稀疏编码把相似的经历分成不重叠的表示，减少回忆时的混淆。', 'Expansion and sparse coding in the dentate gyrus split similar experiences into nonoverlapping representations and reduce confusion at recall.') },
    { to: 'topic:visual-recognition', role: b('视觉通路逐级重新组织表示，使物体类别在高级区域能被线性读出。', 'The visual pathway reorganizes representations stage by stage, so object categories can be read out linearly in higher areas.') },
  ],
  refs: ['marr1969', 'cover1965', 'litwinkumar2017', 'babadi2014', 'caron2013', 'yassa2011', 'vaswani2017', 'wolpert1998'],
}
