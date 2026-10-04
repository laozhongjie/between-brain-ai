import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M06 Divisive normalization: each response divided by the pooled activity of its neighbors. */
export const NORMALIZATION: MechEntry = {
  definition: b(
    '除法归一化是指一个神经元的响应等于它自己的输入驱动除以周围一群神经元的总活动。物理上，周围的活动通过抑制性中间神经元和突触电导的变化降低这个神经元的增益。结果是：响应只取决于输入在一群信号中所占的比例，不随整体强度无限增大。',
    'Divisive normalization means a neuron’s response equals its own input drive divided by the total activity of a pool of neighbors. Physically, the surrounding activity lowers the neuron’s gain through inhibitory interneurons and changes in synaptic conductance. As a result the response depends on the input’s share among a group of signals and does not grow without limit with overall strength.'),
  scale: b('皮层微环路，从视网膜到高级皮层都有', 'Cortical microcircuits, found from retina to higher cortex'),
  timescale: b('数十毫秒内起作用', 'Acts within tens of milliseconds'),
  steps: [
    {
      title: b('输入驱动', 'Input drive'),
      points: [
        b('每个神经元先按自己的偏好对刺激产生一个驱动，例如对某个方向的线条。', 'Each neuron first produces a drive to the stimulus by its preference, such as lines of one orientation.'),
      ],
    },
    {
      title: b('周围的活动汇成一个池', 'Surrounding activity forms a pool'),
      points: [
        b('附近偏好各异的神经元的活动被加总，构成「归一化池」。', 'The activity of nearby neurons with various preferences is summed into a normalization pool.'),
        b('池的信号主要通过抑制性中间神经元传回。', 'The pool’s signal comes back mainly through inhibitory interneurons.'),
      ],
    },
    {
      title: b('驱动除以池', 'Drive divided by the pool'),
      points: [
        b('神经元的响应等于自身驱动除以一个常数加池的活动，池越活跃，增益越低。', 'The response equals the neuron’s drive divided by a constant plus pool activity, so the more active the pool, the lower the gain.'),
      ],
    },
    {
      title: b('对比度饱和', 'Contrast saturation'),
      points: [
        b('刺激变强时，驱动和池一起增大，响应趋于一个上限，对比度高时不再随之上升。', 'As the stimulus strengthens, drive and pool rise together and the response approaches a ceiling, no longer rising at high contrast.'),
      ],
    },
    {
      title: b('其他刺激的抑制', 'Suppression by other stimuli'),
      points: [
        b('叠加一个神经元不偏好的刺激，它的驱动不变，池却增大，响应因此下降：交叉方向抑制、周边抑制都是这样产生的。', 'Adding a stimulus the neuron does not prefer leaves its drive unchanged but enlarges the pool, so the response falls. Cross-orientation and surround suppression arise this way.'),
      ],
    },
    {
      title: b('一种通用的运算', 'A general computation'),
      points: [
        b('同样的形式出现在视觉、听觉、嗅觉、多感官整合和注意中，被称为一种「标准神经运算」。', 'The same form appears in vision, hearing, smell, multisensory integration and attention, and is called a canonical neural computation.'),
      ],
    },
  ],
  notes: [
    b('Heeger 在 1992 年提出用除法归一化解释猫初级视皮层细胞的对比度饱和和交叉方向抑制。', 'Heeger proposed in 1992 that divisive normalization explains contrast saturation and cross-orientation suppression in cat primary visual cortex.'),
    b('Carandini 与 Heeger 在 2012 年的综述总结了归一化在多个脑区和物种中的证据，把它称为标准神经运算。', 'Carandini and Heeger’s 2012 review gathered evidence for normalization across many areas and species and called it a canonical neural computation.'),
    b('实现归一化的回路不止一种：抑制性反馈、突触抑制和分流抑制都可能贡献，在不同脑区不同。', 'Normalization has more than one circuit: inhibitory feedback, synaptic depression and shunting inhibition may all contribute, differently in different areas.'),
    b('归一化也让编码更有效：除去共同的整体强度后，各神经元的响应更少冗余。', 'Normalization also makes codes more efficient. With the shared overall strength removed, neurons’ responses are less redundant.'),
  ],
  counterpart: [
    b('softmax 把每个值的指数除以所有指数之和，输出只表示相对大小，形式上是一种归一化。', 'Softmax divides each exponential by the sum of all exponentials, so the output shows only relative size. In form, it is a kind of normalization.'),
    b('LayerNorm 和 BatchNorm 减去均值、除以标准差，稳定训练；AlexNet 曾使用模仿侧抑制的「局部响应归一化」。', 'LayerNorm and BatchNorm subtract the mean and divide by the standard deviation to stabilize training. AlexNet used local response normalization, modeled on lateral inhibition.'),
    b('这些运算由公式直接计算，不需要抑制性单元；归一化池通常是一层的全部单元，而不是一群邻近的单元。', 'These operations are computed directly by formula, with no inhibitory units. The pool is usually all units of a layer rather than a group of neighbors.'),
  ],
  math: [
    {
      title: b('除法归一化：响应等于驱动除以周围活动', 'Divisive normalization: response equals drive divided by surrounding activity'),
      tex: t`r_i = \gamma\,\frac{x_i^{\,n}}{\sigma^{n} + \sum_{j} x_j^{\,n}}`,
      symbols: [
        { tex: t`x_i`, meaning: b('第 $i$ 个神经元的输入驱动，例如它偏好的刺激的对比度', 'input drive of neuron $i$, such as the contrast of its preferred stimulus') },
        { tex: t`\sum_j x_j^{\,n}`, meaning: b('归一化池：周围神经元驱动的总和（包括它自己）', 'normalization pool: the summed drive of neighbors, itself included') },
        { tex: t`\sigma`, meaning: b('半饱和常数：驱动等于它时响应为最大值的一半', 'semi-saturation constant: the drive at which the response is half its maximum') },
        { tex: t`n`, meaning: b('指数，常取 $2$ 左右', 'exponent, usually about $2$') },
        { tex: t`\gamma`, meaning: b('最大响应', 'maximum response') },
      ],
      steps: [
        b('把每个神经元的驱动取 $n$ 次方。', 'Raise each neuron’s drive to the power $n$.'),
        b('加总周围所有神经元的结果，再加上 $\\sigma^n$，作为分母。', 'Sum over all neighbors and add $\\sigma^n$ to form the denominator.'),
        b('自身驱动的 $n$ 次方除以分母，乘以最大响应 $\\gamma$。', 'Divide the neuron’s own powered drive by it and multiply by the maximum response $\\gamma$.'),
      ],
      example: b(
        '取 $\\gamma = 1$、$\\sigma = 1$、$n = 2$。只有偏好刺激、对比度 $x = 2$ 时，$r = 4/(1 + 4) = 0.8$。再叠加一个不偏好的、同样强的遮挡刺激：它不驱动这个神经元，但进入池，$r = 4/(1 + 4 + 4) \\approx 0.44$。遮挡刺激让响应下降了近一半，而它本身对这个神经元没有直接作用。',
        'Take $\\gamma = 1$, $\\sigma = 1$ and $n = 2$. With only the preferred stimulus at contrast $x = 2$, $r = 4/(1 + 4) = 0.8$. Now add an equally strong mask that the neuron does not prefer. It does not drive the neuron but joins the pool, so $r = 4/(1 + 4 + 4) \\approx 0.44$. The mask nearly halves the response with no direct effect on the neuron.'),
      consequences: [
        b('对比度响应曲线呈 S 形并趋于饱和；遮挡刺激让整条曲线向右移，相当于降低了增益。', 'The contrast response curve is S-shaped and saturates. A mask shifts the whole curve to the right, which amounts to lowering the gain.'),
        b('响应反映的是输入的相对大小，因而在整体亮度或对比度变化时保持稳定。', 'The response reflects the relative size of the input, so it stays stable when overall brightness or contrast changes.'),
      ],
      limitations: [
        b('这是描述现象的公式，不指定由哪种回路实现。', 'This is a descriptive formula and does not say which circuit implements it.'),
        b('池的组成和权重在真实脑区中各不相同，公式中把它们简化为相同。', 'The makeup and weights of the pool differ in real areas, and the formula treats them as equal.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('注意的归一化模型：注意乘上刺激驱动，再除以周围活动', 'The normalization model of attention: attention multiplies the drive, then divides by surrounding activity'), to: 'topic:attention-gating' },
    { title: b('温度缩放：softmax 的温度修正过度自信', 'Temperature scaling: the softmax temperature corrects overconfidence'), to: 'topic:metacognitive-monitoring' },
  ],
  conditions: [
    b('归一化描述的现象在许多脑区一致出现，但实现它的回路在不同脑区可能不同，仍在研究。', 'The phenomena normalization describes recur in many areas, but the circuits behind it may differ by area and are still being studied.'),
    b('并非所有的抑制都是除法；减法和除法的抑制在实验中有时难以区分。', 'Not all inhibition is divisive, and subtractive and divisive inhibition are sometimes hard to tell apart in experiments.'),
    b('softmax 与生物归一化只是形式相近，前者用指数，后者的指数 $n$ 和池的组成由实验测定。', 'Softmax and biological normalization are similar only in form. The first uses exponentials, while the biological exponent $n$ and pool makeup are measured experimentally.'),
  ],
  uses: [
    { to: 'topic:attention-gating', role: b('注意改变驱动和池的相对大小，从而偏向被注意的刺激。', 'Attention changes the relative size of drive and pool and so favors the attended stimulus.') },
    { to: 'topic:visual-recognition', role: b('初级视皮层的对比度饱和和交叉方向抑制都可以由归一化解释。', 'Contrast saturation and cross-orientation suppression in primary visual cortex are both explained by normalization.') },
    { to: 'topic:multisensory', role: b('多感官神经元的整合规则可以用跨感官的归一化池描述。', 'The integration rules of multisensory neurons can be described with a normalization pool across senses.') },
  ],
  refs: ['heeger1992', 'carandini2012', 'reynolds2009', 'ohshiro2011', 'krizhevsky2017', 'ba2016', 'vaswani2017'],
}
