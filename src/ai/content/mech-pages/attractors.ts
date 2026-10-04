import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M07 Attractor networks: self-sustaining activity patterns in recurrent circuits. */
export const ATTRACTORS: MechEntry = {
  definition: b(
    '吸引子是循环网络中能自我维持的活动模式：一群神经元的放电组合一旦形成，就靠它们之间的循环连接维持下去，受到小扰动后回到原样。离散的吸引子保存一组彼此分开的模式，连续的吸引子保存一个连续量，例如方向或位置。',
    'An attractor is a self-sustaining activity pattern in a recurrent network. Once a combination of firing neurons forms, the recurrent connections among them keep it going, and after a small disturbance it returns. Discrete attractors store a set of separate patterns. Continuous attractors store a continuous quantity such as a direction or a position.'),
  scale: b('数十到数万个神经元的循环回路', 'Recurrent circuits of tens to tens of thousands of neurons'),
  timescale: b('数十毫秒内形成，保持数秒或更久', 'Forms within tens of milliseconds, holds for seconds or longer'),
  steps: [
    {
      title: b('循环连接', 'Recurrent connections'),
      points: [
        b('环上的神经元按偏好方向排列，每个神经元在某个方向时放电最强。', 'Neurons on the ring are ordered by preferred direction, and each fires most for one direction.'),
        b('偏好相近的神经元互相兴奋，偏好相差较远的互相抑制。', 'Neurons with similar preferences excite each other, and those with distant preferences inhibit each other.'),
      ],
    },
    {
      title: b('输入建立活动包', 'Input creates a bump'),
      points: [
        b('一个短暂的输入，例如看到一个地标，激活偏好附近的一小群神经元。', 'A brief input, such as seeing a landmark, activates a small group of neurons with nearby preferences.'),
        b('这群神经元彼此兴奋、压制其他神经元，形成一个局部的「活动包」。', 'This group excites itself and suppresses the rest, forming a local bump of activity.'),
      ],
    },
    {
      title: b('没有输入时保持', 'Holding without input'),
      points: [
        b('输入撤去后，活动包靠自己的循环连接维持，不需要外部信号。', 'After the input is gone, the bump is kept up by its own recurrent connections, with no outside signal.'),
        b('活动包的位置就是网络记住的方向。', 'The position of the bump is the direction the network remembers.'),
      ],
    },
    {
      title: b('速度输入推动移动', 'Velocity input moves the bump'),
      points: [
        b('转头时，角速度信号让活动包一侧的神经元更兴奋，另一侧更弱。', 'When the head turns, an angular velocity signal makes neurons on one side of the bump more excited and on the other side weaker.'),
        b('活动包因此沿环滑动，滑过的距离等于速度的积分，网络就把转速换算成了方向。', 'The bump therefore slides along the ring by the integral of the velocity, so the network turns speed into direction.'),
      ],
    },
    {
      title: b('点吸引子：模式补全', 'Point attractors: pattern completion'),
      points: [
        b('另一类网络保存离散的模式：可以把它的状态想象成在一片有多个谷底的地形上滚动。', 'Another kind of network stores discrete patterns. Its state can be pictured as rolling on a landscape with several valleys.'),
        b('部分或带噪声的输入从附近出发，滑到最近的谷底，即最接近的存储模式，这就是海马 CA3 的模式补全（见[情景记忆](topic:episodic-memory)）。', 'A partial or noisy input starts nearby and slides into the nearest valley, the closest stored pattern. This is pattern completion in hippocampal CA3 (see [episodic memory](topic:episodic-memory)).'),
      ],
    },
    {
      title: b('连续吸引子的漂移', 'Drift in continuous attractors'),
      points: [
        b('连续吸引子的谷底是一条平坦的沟，沟里每个位置都同样稳定，没有力把活动包拉回原位。', 'The valley of a continuous attractor is a flat trough where every position is equally stable, so nothing pulls the bump back.'),
        b('噪声让活动包随机漂移，记住的方向随保持时间变得越来越不准。', 'Noise makes the bump drift at random, so the remembered direction grows less accurate the longer it is held.'),
      ],
    },
  ],
  notes: [
    b('环吸引子模型由 Zhang 在 1996 年提出，用来解释大鼠的头朝向细胞：这些细胞在动物头朝某个方向时放电，在黑暗中也能保持。', 'Zhang proposed the ring attractor model in 1996 to explain head-direction cells in rats. These cells fire when the head points one way, and keep doing so in darkness.'),
    b('2017 年在果蝇中央复合体中直接看到了环吸引子：一个活动包随果蝇的朝向沿环移动，在黑暗中保持；用光遗传学在别处制造新的活动包，原来的就消失。', 'In 2017 a ring attractor was seen directly in the fly central complex. One bump moved around the ring with the fly’s heading and persisted in darkness. When optogenetics created a new bump elsewhere, the old one vanished.'),
    b('2022 年对大鼠网格细胞的群体记录发现，活动只占据一个环面形状的低维空间，睡眠中也是如此，符合连续吸引子的预测。', 'Population recordings of rat grid cells in 2022 found that activity occupies only a low-dimensional, torus-shaped space, also during sleep, as continuous attractor models predict.'),
    b('脑干的眼动积分器把眼动的速度指令累加成眼位，并在注视时保持住，是线吸引子的经典例子。', 'The oculomotor integrator in the brainstem sums eye velocity commands into eye position and holds it during fixation, a classic example of a line attractor.'),
    b('2014 年对猴子前额叶的分析发现，空间工作记忆中活动包的漂移方向能预测回答偏离的方向。', 'A 2014 analysis of monkey prefrontal cortex studied spatial working memory. The drift of the bump predicted the direction of errors in the answers.'),
    b('Hopfield 网络（1982）用赫布规则存储离散模式；随机模式超过约 $0.14N$ 个（$N$ 为神经元数）时，提取开始失败。', 'The Hopfield network, from 1982, stores discrete patterns with a Hebbian rule. Beyond about $0.14N$ random patterns, with $N$ neurons, recall starts to fail.'),
  ],
  counterpart: [
    b('Hopfield 网络用对称的权重存储离散模式，每次更新让能量下降，状态落到最近的存储模式；现代 Hopfield 网络的一次更新与 Transformer 注意力的形式相同。', 'Hopfield networks store discrete patterns in symmetric weights. Each update lowers the energy, and the state settles into the nearest stored pattern. One update of a modern Hopfield network has the same form as Transformer attention.'),
    b('训练好的 RNN 常常自己形成吸引子：做情感分类的 RNN 用一条线吸引子累加正负证据，做路径积分的 RNN 出现类似网格细胞的表征。', 'Trained RNNs often form attractors on their own. RNNs for sentiment classification sum positive and negative evidence along a line attractor, and RNNs trained for path integration develop grid-like representations.'),
    b('Transformer 没有自我维持的循环状态：信息存在上下文里，每一步重新读取（见[工作记忆](topic:working-memory)）。', 'Transformers have no self-sustaining recurrent state. Information sits in the context and is read again at every step (see [working memory](topic:working-memory)).'),
  ],
  math: [
    {
      title: b('环吸引子：近处兴奋、远处抑制的连接让活动包自我维持', 'Ring attractor: excitation nearby and inhibition far away keep a bump going on its own'),
      tex: t`\tau\,\frac{dr_i}{dt} = -r_i + f\Big(\frac{1}{N}\sum_{j} J\cos(\theta_i - \theta_j)\,r_j + I_i(t)\Big),\qquad f(x) = \tanh\big(\max(0, x)\big)`,
      symbols: [
        { tex: t`r_i`, meaning: b('第 $i$ 个神经元的活动，$0$ 到 $1$', 'activity of neuron $i$, from $0$ to $1$') },
        { tex: t`\theta_i`, meaning: b('第 $i$ 个神经元的偏好方向', 'preferred direction of neuron $i$') },
        { tex: t`J`, meaning: b('循环连接的强度', 'strength of the recurrent connections') },
        { tex: t`\cos(\theta_i - \theta_j)`, meaning: b('偏好相差不到 $90^\\circ$ 时为正（兴奋），超过时为负（抑制）', 'positive (excitation) when preferences differ by less than $90^\\circ$, negative (inhibition) beyond') },
        { tex: t`I_i(t)`, meaning: b('外部输入，例如短暂出现的地标', 'outside input, such as a briefly seen landmark') },
        { tex: t`\tau,\;N`, meaning: b('活动变化的时间常数，以及神经元数', 'time constant of activity changes, and the number of neurons') },
        { tex: t`f`, meaning: b('放电函数：负值截为 $0$，正值较小时近似等于输入，较大时逐渐饱和到 $1$', 'firing function: negatives become $0$, small positive inputs pass almost unchanged and large ones saturate toward $1$') },
      ],
      steps: [
        b('每个神经元把其他神经元的活动按 $J\\cos(\\theta_i - \\theta_j)$ 加权平均：偏好相近的推高它，偏好相反的压低它。', 'Each neuron averages the activity of the others weighted by $J\\cos(\\theta_i - \\theta_j)$. Similar preferences push it up and opposite ones push it down.'),
        b('加上外部输入后经过 $f$，活动以时间常数 $\\tau$ 向这个值靠拢。', 'Add the outside input and pass through $f$. Activity moves toward the result with time constant $\\tau$.'),
        b('短暂的输入建立活动包；输入撤去后，活动包能否留下，取决于它自己产生的循环输入是否足以再现它。', 'A brief input creates a bump. Whether the bump survives once the input is gone depends on whether its own recurrent input is enough to reproduce it.'),
      ],
      example: b(
        '设活动包形如 $a\\,[\\cos(\\theta - 90^\\circ)]_+$（负值取 $0$）。把它代入循环项，对所有 $j$ 平均得到 $\\tfrac{J}{4}\\,a\\cos(\\theta - 90^\\circ)$：形状不变，幅度乘以 $J/4$。$J = 2$ 时每次只回来一半，幅度按 $e^{-t/(2\\tau)}$ 衰减，$10\\tau$ 后只剩 $e^{-5} \\approx 0.7\\%$。$J = 6$ 时回来 $1.5$ 倍，幅度不断增长，直到 $f$ 的饱和让每次回来的量正好等于原幅度（约 $0.9$），输入撤去后活动包一直留在 $90^\\circ$。',
        'Let the bump be $a\\,[\\cos(\\theta - 90^\\circ)]_+$, with negatives set to $0$. Putting it into the recurrent term and averaging over all $j$ gives $\\tfrac{J}{4}\\,a\\cos(\\theta - 90^\\circ)$. The shape stays and the amplitude is multiplied by $J/4$. At $J = 2$ only half comes back, so the amplitude decays as $e^{-t/(2\\tau)}$ and after $10\\tau$ only $e^{-5} \\approx 0.7\\%$ is left. At $J = 6$, $1.5$ times comes back, so the amplitude grows until the saturation of $f$ returns exactly the same amplitude, about $0.9$. The bump stays at $90^\\circ$ after the input is gone.'),
      consequences: [
        b('$J \\ge 4$ 时活动包自我维持，而且可以停在环上任何位置，所以网络能连续地记住一个角度。', 'For $J \\ge 4$ the bump sustains itself and can rest anywhere on the ring, so the network remembers an angle continuously.'),
        b('偏向活动包一侧的输入会推动它沿环移动，网络因此能把角速度积分成方向。', 'Input biased to one side of the bump pushes it along the ring, so the network can integrate angular velocity into direction.'),
      ],
      limitations: [
        b('连续地保持要求所有神经元的连接完全一致；任何不均匀都会让活动包滑向少数偏好位置，噪声则让它随机漂移。', 'Holding continuously needs identical connections for every neuron. Any unevenness makes the bump slide toward a few favored positions, and noise makes it drift at random.'),
        b('模型只有一类神经元，用余弦连接同时表示兴奋和抑制；真实回路中两者由不同的细胞完成（见[兴奋与抑制](card:ei-celltypes)）。', 'The model has one kind of neuron and uses cosine weights for both excitation and inhibition. In real circuits different cells do the two (see [excitation and inhibition](card:ei-celltypes)).'),
      ],
    },
  ],
  elsewhere: [
    { title: b('Hopfield 网络：赫布规则存储模式，更新使能量下降', 'Hopfield networks: Hebbian storage and updates that lower the energy'), to: 'topic:episodic-memory' },
    { title: b('现代 Hopfield 网络与注意力', 'Modern Hopfield networks and attention'), to: 'topic:episodic-memory' },
    { title: b('循环自兴奋延长保持时间', 'Recurrent self-excitation lengthens the hold'), to: 'topic:working-memory' },
    { title: b('网格细胞的放电图案', 'The firing pattern of grid cells'), to: 'topic:cognitive-maps' },
  ],
  conditions: [
    b('连续吸引子需要精细调节：连接强度稍有偏差，活动包就会漂移或消失；真实回路怎样维持这种精度仍有争议。', 'Continuous attractors need fine tuning. A small error in connection strength makes the bump drift or vanish, and how real circuits keep this precision is debated.'),
    b('Hopfield 的能量函数要求连接对称，真实突触并不对称；不对称的网络仍可能有吸引子，但没有简单的能量解释。', 'The Hopfield energy function requires symmetric connections, and real synapses are not symmetric. Asymmetric networks can still have attractors, but without a simple energy account.'),
    b('工作记忆不一定靠持续放电：有证据表明部分信息在活动沉默期间以短时突触变化保存（见[短时可塑性](card:short-term-plasticity)），两种机制各占多少仍有争议。', 'Working memory need not rely on sustained firing. Evidence suggests some information survives silent periods as short-term synaptic changes (see [short-term plasticity](card:short-term-plasticity)), and how much each mechanism contributes is debated.'),
    b('果蝇的环吸引子和大鼠网格细胞的环面结构有直接的群体记录证据；在哺乳动物皮层中，多数吸引子证据仍是间接的。', 'The fly ring attractor and the torus of rat grid cells have direct population evidence. In mammalian cortex, most evidence for attractors is still indirect.'),
  ],
  uses: [
    { to: 'topic:working-memory', role: b('前额叶的持续放电在延迟期保持刺激的位置；活动包的漂移解释了记忆误差随延迟增大。', 'Sustained prefrontal firing holds a stimulus location through the delay, and drift of the bump explains why errors grow with the delay.') },
    { to: 'topic:episodic-memory', role: b('CA3 的点吸引子从部分线索补全整段经历。', 'Point attractors in CA3 complete a whole experience from a partial cue.') },
    { to: 'topic:cognitive-maps', role: b('头朝向细胞的环吸引子和网格细胞的环面吸引子在没有视觉输入时维持方向和位置。', 'The ring attractor of head-direction cells and the torus attractor of grid cells keep direction and position without visual input.') },
  ],
  refs: ['hopfield1982', 'amit1985', 'zhang1996', 'benyishai1995', 'seung1996', 'wimmer2014', 'kim2017', 'gardner2022', 'khona2022', 'stokes2015', 'ramsauer2020', 'maheswaranathan2019', 'cueva2018'],
}
