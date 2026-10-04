import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M02 Short-term plasticity: synaptic strength that rises and falls with the last second of firing. */
export const SHORT_TERM_PLASTICITY: MechEntry = {
  definition: b(
    '短时可塑性是突触强度在几十毫秒到几秒内随最近放电历史的变化：连续脉冲会耗尽可释放的小泡，使后面的传递变弱（抑制），残留的钙离子又会提高释放概率，使后面的传递变强（易化）。这种变化不需要合成新蛋白，几秒内自行恢复。',
    'Short-term plasticity is the change of synaptic strength over tens of milliseconds to seconds with recent firing. Consecutive spikes use up releasable vesicles and weaken later transmissions, which is depression. Leftover calcium raises release probability and strengthens later transmissions, which is facilitation. No new proteins are needed, and the change fades within seconds.'),
  scale: b('单个突触的末梢', 'The terminal of a single synapse'),
  timescale: b('几十毫秒到几秒', 'Tens of milliseconds to seconds'),
  steps: [
    {
      title: b('一个脉冲消耗资源', 'A spike uses up resources'),
      points: [
        b('末梢里可释放的小泡记为资源 $x$；一个脉冲释放其中比例为 $u$ 的部分。', 'The releasable vesicles in the terminal are the resource $x$, and a spike releases a fraction $u$ of it.'),
        b('传递的强度与 $u \\cdot x$ 成正比。', 'The strength of the transmission is proportional to $u \\cdot x$.'),
      ],
    },
    {
      title: b('资源慢慢恢复', 'Resources recover slowly'),
      points: [
        b('用掉的小泡以时间常数 $\\tau_D$（常为几百毫秒）重新补充。', 'Used vesicles are refilled with time constant $\\tau_D$, often a few hundred milliseconds.'),
        b('脉冲来得太快时资源来不及补充，传递越来越弱，这就是抑制。', 'When spikes come too fast the resource cannot refill, and transmission grows weaker. This is depression.'),
      ],
    },
    {
      title: b('残留的钙提高释放概率', 'Leftover calcium raises release probability'),
      points: [
        b('每个脉冲留下一些钙离子，使下一个脉冲的 $u$ 变大，以时间常数 $\\tau_F$ 消退。', 'Each spike leaves some calcium behind, which raises $u$ for the next spike and fades with time constant $\\tau_F$.'),
        b('$u$ 起点低、$\\tau_F$ 长的突触以易化为主。', 'Synapses with a low starting $u$ and a long $\\tau_F$ are dominated by facilitation.'),
      ],
    },
    {
      title: b('突触成为滤波器', 'The synapse becomes a filter'),
      points: [
        b('抑制型突触对放电率的突然升高反应最强，对持续的高频放电反应饱和。', 'Depressing synapses respond most to a sudden rise in rate and saturate under sustained high rates.'),
        b('易化型突触对一串脉冲中后面的脉冲反应更强，偏爱成串的放电。', 'Facilitating synapses respond more to later spikes in a train and favor bursts.'),
      ],
    },
    {
      title: b('状态保存信息', 'The state holds information'),
      points: [
        b('放电停止后，$u$ 和 $x$ 还要几百毫秒到几秒才回到原值，这段时间里突触本身记住了刚才的活动。', 'After firing stops, $u$ and $x$ need hundreds of milliseconds to seconds to return, and in that time the synapse itself remembers the recent activity.'),
        b('一种工作记忆理论认为，信息可以在没有持续放电的情况下以这种状态保存（见[工作记忆](topic:working-memory)）。', 'One theory of working memory holds that information can be kept in this state without sustained firing (see [working memory](topic:working-memory)).'),
      ],
    },
    {
      title: b('同一轴突，不同目标', 'One axon, different targets'),
      points: [
        b('同一个锥体细胞的轴突，连到另一个锥体细胞时多为抑制型，连到某些中间神经元时多为易化型。', 'The axon of one pyramidal cell is mostly depressing onto another pyramidal cell and mostly facilitating onto some interneurons.'),
        b('所以同一串脉冲会向不同的目标传递不同的信息。', 'The same spike train therefore carries different messages to different targets.'),
      ],
    },
  ],
  notes: [
    b('Tsodyks 与 Markram 在 1997 年提出用 $u$ 和 $x$ 两个变量描述皮层突触的短时动态，这一模型至今被广泛使用。', 'Tsodyks and Markram proposed in 1997 to describe short-term dynamics of cortical synapses with two variables, $u$ and $x$. The model is still widely used.'),
    b('1998 年的实验发现，同一个锥体细胞发出的突触按目标细胞的类型呈现抑制或易化。', 'A 1998 experiment found that synapses from the same pyramidal cell are depressing or facilitating depending on the type of target cell.'),
    b('1997 年的理论与实验表明，抑制型突触让突触后神经元对放电率的相对变化敏感，起到增益控制的作用。', 'Theory and experiments in 1997 showed that depressing synapses make the postsynaptic neuron sensitive to relative changes in rate, acting as gain control.'),
    b('短时可塑性与长时程可塑性不同：它不改变突触的结构，几秒内就会恢复。', 'Short-term plasticity differs from long-term plasticity. It does not change the synapse’s structure and recovers within seconds.'),
  ],
  counterpart: [
    b('快权重（fast weights）在普通权重之上叠加一个随输入快速变化、逐渐衰减的权重矩阵，用来保存最近的信息。', 'Fast weights add, on top of ordinary weights, a weight matrix that changes quickly with input and decays, holding recent information.'),
    b('线性注意力可以写成一个不断累加外积的快权重矩阵，与短时可塑性在数学形式上有联系（见[元学习](topic:meta-learning)）。', 'Linear attention can be written as a fast weight matrix that keeps adding outer products, which links it mathematically to short-term plasticity (see [meta-learning](topic:meta-learning)).'),
    b('主流 Transformer 的权重在一次推理中不变，近期信息只存在激活和上下文里。', 'The weights of mainstream Transformers do not change within a run, and recent information lives only in activations and context.'),
  ],
  math: [
    {
      title: b('抑制型突触的稳态：放电率越高，每个脉冲传递得越少', 'Steady state of a depressing synapse: the higher the rate, the less each spike transmits'),
      tex: t`x_{\infty}(f) = \frac{1 - e^{-1/(f\,\tau_D)}}{1 - (1 - U)\,e^{-1/(f\,\tau_D)}},\qquad A_{\infty} = U\,x_{\infty},\qquad R(f) = f\,U\,x_{\infty}(f)`,
      symbols: [
        { tex: t`f`, meaning: b('规则脉冲串的频率（每秒次数）', 'rate of a regular spike train, per second') },
        { tex: t`U`, meaning: b('每个脉冲释放的资源比例（这里不变，不含易化）', 'fraction of resources released per spike, fixed here, no facilitation') },
        { tex: t`\tau_D`, meaning: b('资源恢复的时间常数', 'time constant of resource recovery') },
        { tex: t`x_{\infty}`, meaning: b('稳态时每个脉冲到来前剩余的资源', 'resource left before each spike in the steady state') },
        { tex: t`A_{\infty}`, meaning: b('稳态时每个脉冲传递的强度', 'strength each spike transmits in the steady state') },
        { tex: t`R`, meaning: b('每秒传递的总量', 'total transmitted per second') },
      ],
      steps: [
        b('一个脉冲把资源从 $x$ 降到 $(1 - U)\\,x$。', 'A spike lowers the resource from $x$ to $(1 - U)\\,x$.'),
        b('到下一个脉冲的 $1/f$ 秒里，资源按 $\\tau_D$ 向 $1$ 恢复。', 'Over the $1/f$ seconds until the next spike, the resource recovers toward $1$ with $\\tau_D$.'),
        b('令脉冲前的资源每次相同，解出稳态 $x_{\\infty}$；乘以 $U$ 得到每个脉冲的强度，再乘以 $f$ 得到每秒传递的总量。', 'Require the resource before each spike to be the same and solve for the steady state $x_{\\infty}$. Times $U$ gives the strength per spike, and times $f$ gives the total per second.'),
      ],
      example: b(
        '取 $U = 0.5$、$\\tau_D = 0.5$ 秒。$f = 2$ Hz 时，$e^{-1} \\approx 0.37$，$x_{\\infty} = 0.63 / 0.82 \\approx 0.78$，每秒传递 $2 \\times 0.5 \\times 0.78 \\approx 0.78$。$f = 20$ Hz 时，$e^{-0.1} \\approx 0.90$，$x_{\\infty} \\approx 0.17$，每秒传递约 $1.74$。放电率提高 $10$ 倍，传递的总量只增加约 $2.2$ 倍。',
        'Take $U = 0.5$ and $\\tau_D = 0.5$ seconds. At $f = 2$ Hz, $e^{-1} \\approx 0.37$ and $x_{\\infty} = 0.63 / 0.82 \\approx 0.78$. The synapse transmits $2 \\times 0.5 \\times 0.78 \\approx 0.78$ per second. At $f = 20$ Hz, $e^{-0.1} \\approx 0.90$, $x_{\\infty} \\approx 0.17$ and it transmits about $1.74$ per second. A tenfold rise in rate gives only about $2.2$ times the total.'),
      consequences: [
        b('高频时每秒传递的总量趋于饱和，接近 $1/\\tau_D$；突触传递的主要是放电率的变化，而不是放电率本身。', 'At high rates the total per second saturates near $1/\\tau_D$. The synapse mainly transmits changes in rate rather than the rate itself.'),
        b('$U$ 越大，抑制越强、饱和越早；拖动 $U$ 可以看到这一点。', 'The larger $U$, the stronger the depression and the earlier the saturation, as dragging $U$ shows.'),
      ],
      limitations: [
        b('只考虑了抑制，没有易化；完整的模型让 $u$ 也随脉冲变化（见[工作记忆](topic:working-memory)）。', 'Only depression is included, not facilitation. The full model also lets $u$ change with spikes (see [working memory](topic:working-memory)).'),
        b('真实的脉冲串不规则，资源池也不止一个，恢复速度可能随活动加快。', 'Real spike trains are irregular, there is more than one vesicle pool, and recovery may speed up with activity.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('Tsodyks 与 Markram 模型：易化与抑制同时作用', 'The Tsodyks and Markram model: facilitation and depression together'), to: 'topic:working-memory' },
    { title: b('线性注意力作为快权重：在激活中完成一步学习', 'Linear attention as fast weights: one learning step inside the activations'), to: 'topic:meta-learning' },
  ],
  conditions: [
    b('抑制和易化的比例因突触类型、脑区和发育阶段而不同，同一模型的参数要按突触测定。', 'The balance of depression and facilitation varies with synapse type, region and development, so the model’s parameters must be measured per synapse.'),
    b('工作记忆能在多大程度上依靠突触状态而不是持续放电，仍有争议。', 'How far working memory can rely on synaptic state rather than sustained firing is debated.'),
    b('多数数据来自脑片中的成对记录，在清醒动物中直接测量短时动态仍然困难。', 'Most data come from paired recordings in brain slices, and measuring short-term dynamics directly in awake animals remains hard.'),
  ],
  uses: [
    { to: 'topic:working-memory', role: b('突触易化可能在放电停止的间隙里保存几秒的信息。', 'Synaptic facilitation may keep information for seconds in gaps without firing.') },
    { to: 'topic:meta-learning', role: b('快速变化的突触状态为「不改长期权重的快速学习」提供了一种生物实现。', 'Fast-changing synaptic state offers a biological route to fast learning without changing long-term weights.') },
    { to: 'topic:auditory-scene', role: b('抑制型突触突出声音的起始和变化，弱化持续不变的背景。', 'Depressing synapses emphasize sound onsets and changes and weaken steady background.') },
  ],
  refs: ['tsodyks1997', 'markram1998', 'abbott1997', 'zucker2002', 'mongillo2008', 'ba2016', 'schlag2021'],
}
