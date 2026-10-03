import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F11 Working memory: prefrontal persistent activity and dynamic coding vs context windows and recurrent state. */
export const WORKING_MEMORY: TopicContent = {
  thesis: {
    biological: b(
      '工作记忆把少量信息保持几秒，并在其中比较、计算和更新，容量约 3 到 5 个组块。前额叶等区域的神经元在延迟期间持续放电，靠彼此的循环兴奋维持；另一部分信息可以「静默」地保存在突触的短时变化中。基底节像一个闸门，决定什么内容进入、何时更新。',
      'Working memory holds a little information for seconds while comparing, computing and updating it, with a capacity of about 3 to 5 chunks. Neurons in prefrontal and other areas keep firing through the delay, sustained by recurrent excitation among them. Some information can also be held silently in short-term synaptic changes. The basal ganglia act as a gate that decides what enters and when it updates.'),
    computational: b(
      'Transformer 的上下文窗口逐字保留所有词元，常见可达十几万到上百万个，每一步都能用注意力读取其中任何一个。循环网络（如 LSTM）和状态空间模型则把历史压缩进固定大小的状态，用门控决定写入和遗忘。但上下文装得多不等于用得好：长上下文中段的信息和夹杂无关内容时，表现会下降。',
      'A transformer’s context window keeps every token verbatim, often hundreds of thousands to over a million, and attention can read any of them at each step. Recurrent networks such as LSTMs and state space models instead compress history into a fixed-size state and use gates to decide what to write and forget. But holding more is not using it well. Performance drops for information in the middle of long contexts and when irrelevant content is mixed in.'),
    gap: b(
      '人的工作记忆容量很小，但会主动选择、保护和操作内容；上下文窗口容量巨大、逐字精确，却没有选择进入的闸门。循环网络的门控状态在机制上与生物持续活动更接近。',
      'Human working memory is tiny but actively selects, protects and manipulates its content. A context window is huge and verbatim but has no gate on what enters. The gated state of recurrent networks is closer in mechanism to biological persistent activity.'),
  },
  short: { biological: b('工作记忆', 'Working memory'), computational: b('上下文窗口', 'Context window') },
  kinds: ['behavior', 'algorithm', 'math'],
  evidence: 'debated',
  asOf: b('AI 侧描述截至 2026 年 10 月的主流大语言模型的上下文窗口与循环类模型；具体评测结果按发表年份注明。', 'The AI column describes context windows of mainstream large language models and recurrent models as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'comp',
      dimension: b('容量与精度', 'Capacity and precision'),
      brain: b('同时只能保持约 3 到 5 个组块；不复述的话，十几秒后大部分就会丢失。', 'About 3 to 5 chunks at once. Without rehearsal, most is lost within a dozen or so seconds.'),
      ai: b('上下文窗口能逐字保存十几万到上百万个词元，在会话中不会自行衰减。', 'A context window keeps hundreds of thousands to over a million tokens verbatim, with no decay during the session.'),
      gap: b('在「能装多少、装得多准」上，模型远超人。', 'In how much is held and how exactly, models far exceed people.'),
    },
    {
      lead: 'bio',
      dimension: b('抗干扰', 'Resisting distraction'),
      brain: b('能在干扰中保护目标信息，只在需要时打开闸门更新内容。', 'People protect target information against distraction and open the gate to update only when needed.'),
      ai: b('2023 年的研究中，在数学题里加入无关句子，多个大语言模型的准确率明显下降。', 'In a 2023 study, adding irrelevant sentences to math problems clearly lowered the accuracy of several large language models.'),
      gap: b('上下文中没有「选择性写入」，所有内容都会参与注意力的竞争。', 'Context has no selective write, so all content competes for attention.'),
    },
    {
      lead: 'mixed',
      dimension: b('跟踪变化的状态', 'Tracking changing states'),
      brain: b('能在心里同时更新几个变量（如几只杯子下的球），但数量稍多就出错。', 'People can update a few variables in mind, such as balls under cups, but err once there are a few more.'),
      ai: b('2023 年的研究发现，多数语言模型难以跟踪多个物体经过一连串操作后的状态，用代码训练过的大模型表现较好。', 'A 2023 study found most language models struggle to track the states of several objects through a series of operations, while large models trained on code did better.'),
      gap: b('人可靠但数量少；模型能装下很多对象，但多步更新时容易出错。', 'People are reliable but limited in number. Models hold many objects but err over many updates.'),
    },
    {
      lead: 'even',
      dimension: b('位置效应', 'Position effects'),
      brain: b('回忆一串项目时，开头和结尾记得最好，中间最差（序列位置效应）。', 'Recalling a list, people remember the beginning and end best and the middle worst, the serial position effect.'),
      ai: b('长上下文中，位于开头和结尾的信息利用得最好，中段的信息更容易被忽略。', 'In long contexts, information at the beginning and end is used best, and information in the middle is more often missed.'),
      gap: b('两者出现了形状相似的 U 形曲线，但成因不同。', 'Both show a similar U-shaped curve, with different causes.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('感觉输入与选择', 'Sensory input and selection'),
        points: [b('感觉皮层把看到、听到的内容表示成放电模式，注意选出与当前任务相关的部分。', 'Sensory cortex represents what is seen and heard as firing patterns, and attention selects the part relevant to the task.')],
      },
      {
        title: b('基底节闸门', 'Basal ganglia gate'),
        points: [
          b('纹状体与丘脑组成的回路像一个闸门：闸门打开时，新内容进入前额叶；关闭时，前额叶保持原有内容，不受干扰。', 'A loop through the striatum and thalamus works as a gate. When it opens, new content enters prefrontal cortex. When it closes, prefrontal cortex keeps its content and ignores distraction.'),
          b('什么时候打开，被认为由多巴胺信号在学习中调整。', 'When it opens is thought to be tuned by dopamine signals through learning.'),
        ],
      },
      {
        title: b('前额叶持续活动', 'Prefrontal persistent activity'),
        points: [
          b('一群前额叶神经元在刺激消失后继续放电，靠彼此之间的循环兴奋相互维持。', 'A group of prefrontal neurons keeps firing after the stimulus is gone, sustained by recurrent excitation among them.'),
          b('信息以「哪些神经元在持续放电」的形式保存几秒，原理见[吸引子网络](card:attractors)。', 'The information is held for seconds as which neurons keep firing, explained in [attractor networks](card:attractors).'),
        ],
      },
      {
        title: b('突触中的静默保存', 'Silent storage in synapses'),
        points: [
          b('放电过的突触会短暂增强（短时易化），约一秒内保持。', 'Synapses that just fired are briefly strengthened, called short-term facilitation, for about a second.'),
          b('即使放电停止，信息也可以留在这些突触中，需要时由一次短暂的放电重新激活。', 'Even when firing stops, information can stay in these synapses and be reactivated by a brief burst when needed.'),
        ],
      },
      {
        title: b('操作与读出', 'Manipulation and readout'),
        points: [b('前额叶与顶叶协作，对保持的内容做比较、排序或计算，结果送往运动区指导动作。', 'Prefrontal and parietal cortex work together to compare, order or compute on the held content, and send the result to motor areas.')],
      },
      {
        title: b('容量限制', 'Capacity limit'),
        points: [b('同时保持的几组神经元通过抑制相互竞争，项目一多就相互干扰，容量因此只有几个组块。', 'The groups held at once compete through inhibition, so more items interfere and capacity stays at a few chunks.')],
      },
    ],
    computational: [
      {
        title: b('词元输入', 'Token input'),
        points: [b('文本被切成词元，每个词元变成一个向量，按顺序进入模型。', 'Text is split into tokens, each turned into a vector and fed in order.')],
      },
      {
        title: b('上下文窗口（KV 缓存）', 'Context window (KV cache)'),
        points: [
          b('每个词元在每一层算出的键和值都被逐字保存，窗口越长，占用的内存越多。', 'The key and value of every token at every layer are stored verbatim, and longer windows take more memory.'),
          b('所有内容都会进入窗口，没有「要不要记」的选择。', 'Everything enters the window, with no choice about what to keep.'),
        ],
      },
      {
        title: b('注意力读取', 'Attention readout'),
        points: [b('每一步，新词元的查询与窗口中所有的键比较，按相似度读出相关内容，可以读取任何位置。', 'At each step the new token’s query is compared with every key in the window, and related content is read by similarity from any position.')],
      },
      {
        title: b('循环状态', 'Recurrent state'),
        points: [
          b('LSTM 和状态空间模型把历史压缩进固定大小的状态向量。', 'LSTMs and state space models compress history into a fixed-size state vector.'),
          b('门控决定每一步写入多少新内容、保留多少旧内容，内存不随序列变长而增加。', 'Gates decide how much new content to write and how much old content to keep at each step, so memory does not grow with sequence length.'),
        ],
      },
      {
        title: b('输出', 'Output'),
        points: [b('读出的内容经过后续层，生成下一个词元。', 'The content read out passes through later layers to produce the next token.')],
      },
      {
        title: b('缺失的一步（虚线框）', 'The missing step (dashed box)'),
        points: [b('Transformer 没有选择性写入的闸门，无关内容同样占据窗口并参与注意力竞争。', 'Transformers have no gate for selective writing, so irrelevant content also fills the window and competes for attention.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('组块是被当作一个整体记住的单位：例如「2026」可以是 4 个数字，也可以是一个年份。容量约 4 个组块的估计来自 2001 年的综述，早先流行的「7 加减 2」被认为高估了。', 'A chunk is a unit remembered as a whole. For example, 2026 can be four digits or one year. The estimate of about 4 chunks comes from a 2001 review, and the older figure of 7 plus or minus 2 is thought to overestimate.'),
      b('延迟期持续放电最早在猴子前额叶中被系统记录：猴子记住一个位置几秒，期间特定神经元一直放电，偏好的位置不同，放电的神经元也不同。', 'Delay-period persistent firing was first recorded systematically in monkey prefrontal cortex. While a monkey remembered a location for seconds, particular neurons kept firing, and different locations engaged different neurons.'),
      b('持续放电并不总是稳定的：近年的记录发现，活动常以短暂的高频爆发出现，编码方式也随时间变化（动态编码）。「持续放电」和「静默保存」两种机制的相对作用仍有争议。', 'Persistent firing is not always steady. Recent recordings show activity often comes in brief high-frequency bursts, and the coding changes over time, called dynamic coding. The relative roles of persistent firing and silent storage are debated.'),
      b('不复述时，单个字母组合在约 18 秒后大多被遗忘，这一经典结果说明工作记忆需要主动维持。', 'Without rehearsal, a single letter trigram is mostly forgotten after about 18 seconds. This classic result shows working memory needs active maintenance.'),
    ],
    computational: [
      b('KV 缓存的大小与上下文长度成正比；每生成一个新词元，注意力都要与之前所有词元比较，计算量随长度增长。', 'The KV cache grows in proportion to context length. Each new token is compared with all earlier tokens, so computation grows with length.'),
      b('LSTM 于 1997 年提出，用「遗忘门」「输入门」「输出门」控制一个细胞状态，解决了普通循环网络难以保持长期信息的问题。', 'The LSTM, proposed in 1997, controls a cell state with forget, input and output gates, solving the difficulty plain recurrent networks have with holding information long.'),
      b('状态空间模型（如 Mamba）让门控取决于当前输入（选择性），在长序列上计算量随长度线性增长。', 'State space models such as Mamba make their gates depend on the current input, called selectivity, with computation growing linearly in sequence length.'),
      b('长上下文的「中段丢失」现象在 2024 年被系统报告：关键信息放在长输入的中间时，多个模型的准确率明显低于放在两端。', 'Losing the middle of long contexts was reported systematically in 2024. With key information in the middle of a long input, several models scored clearly lower than with it at either end.'),
    ],
  },
  bioMath: [
    {
      title: b('持续活动：循环兴奋让放电在输入消失后保持', 'Persistent activity: recurrent excitation keeps firing after the input ends'),
      tex: t`\tau\,\frac{dr}{dt} = -r + w\,r + I(t)\qquad\Longrightarrow\qquad \tau_{\text{eff}} = \frac{\tau}{1 - w}`,
      symbols: [
        { tex: t`r`, meaning: b('一群神经元的放电频率', 'firing rate of a group of neurons') },
        { tex: t`\tau`, meaning: b('单个神经元活动的时间常数，约 10 毫秒', 'time constant of single-neuron activity, about 10 ms') },
        { tex: t`w`, meaning: b('这群神经元之间循环兴奋的强度', 'strength of recurrent excitation within the group') },
        { tex: t`I(t)`, meaning: b('外部输入，例如要记住的刺激', 'external input, such as the stimulus to remember') },
        { tex: t`\tau_{\text{eff}}`, meaning: b('输入消失后，活动衰减的实际时间常数', 'effective time constant of decay after the input ends') },
      ],
      steps: [
        b('没有循环兴奋（$w = 0$）时，输入一消失，活动就以 $\\tau$ 约 10 毫秒的速度衰减。', 'Without recurrent excitation, $w = 0$, activity decays with $\\tau$ of about 10 ms as soon as the input ends.'),
        b('循环兴奋把一部分活动送回自身，抵消衰减，实际时间常数变成 $\\tau/(1 - w)$。', 'Recurrent excitation feeds part of the activity back to itself, offsetting decay, so the effective time constant becomes $\\tau/(1 - w)$.'),
        b('$w$ 越接近 $1$，保持得越久；$w = 1$ 时活动可以无限保持，这就是一个积分器或连续吸引子。', 'The closer $w$ is to $1$, the longer the hold. At $w = 1$ activity can last indefinitely, an integrator or continuous attractor.'),
      ],
      example: b(
        '$\\tau = 10$ 毫秒。$w = 0.9$ 时，$\\tau_{\\text{eff}} = 100$ 毫秒；$w = 0.99$ 时为 1 秒；$w = 0.999$ 时为 10 秒。要把记忆保持几秒，循环强度必须精确到千分之一的量级。',
        '$\\tau = 10$ ms. With $w = 0.9$, $\\tau_{\\text{eff}} = 100$ ms. With $w = 0.99$ it is 1 s, and with $w = 0.999$ it is 10 s. Holding a memory for seconds requires the recurrent strength to be tuned to about one part in a thousand.'),
      consequences: [
        b('解释了为什么几秒的工作记忆需要强大而精确的循环连接，前额叶正有大量这样的连接。', 'It explains why seconds of working memory need strong, precise recurrent connections, which prefrontal cortex has in abundance.'),
        b('对 $w$ 的精确要求也提示，真实系统可能借助非线性（多个稳定状态）或突触易化来降低对精确调节的依赖。', 'The precision required of $w$ also suggests real systems may rely on nonlinearity, several stable states, or on facilitation to need less fine-tuning.'),
      ],
      limitations: [
        b('线性模型只有一个变量；真实网络有许多神经元群和抑制，保持的是一个活动模式。', 'The linear model has one variable. Real networks have many populations and inhibition and hold a whole pattern of activity.'),
        b('模型不能解释容量为什么只有几个组块，也不包括静默保存。', 'It does not explain why capacity is only a few chunks, nor silent storage.'),
      ],
    },
    {
      title: b('突触易化：在放电停止后把信息存进突触', 'Synaptic facilitation: storing information in synapses after firing stops'),
      tex: t`\frac{du}{dt} = \frac{U - u}{\tau_F} + U\,(1 - u)\sum_k \delta(t - t_k),\qquad \frac{dx}{dt} = \frac{1 - x}{\tau_D} - u\,x\sum_k \delta(t - t_k)`,
      symbols: [
        { tex: t`u`, meaning: b('每次放电释放递质的比例（易化变量），基线为 $U$', 'share of transmitter released per spike, the facilitation variable, with baseline $U$') },
        { tex: t`x`, meaning: b('突触前可用递质的比例（资源）', 'share of transmitter available at the terminal, the resources') },
        { tex: t`\tau_F`, meaning: b('易化消退的时间常数，约 1.5 秒', 'time constant of facilitation decay, about 1.5 s') },
        { tex: t`\tau_D`, meaning: b('资源恢复的时间常数，约 0.2 秒', 'time constant of resource recovery, about 0.2 s') },
        { tex: t`t_k`, meaning: b('第 $k$ 次放电的时刻', 'time of spike $k$') },
        { tex: t`u\,x`, meaning: b('突触的实际传递效能', 'the actual efficacy of the synapse') },
      ],
      steps: [
        b('每次放电，$u$ 上升一些（钙离子残留使下一次释放更多），同时消耗一部分资源 $x$。', 'Each spike raises $u$ a little, since leftover calcium boosts the next release, and uses up some resources $x$.'),
        b('放电停止后，资源在约 0.2 秒内恢复，而易化要约 1.5 秒才消退。', 'After firing stops, resources recover in about 0.2 s, while facilitation takes about 1.5 s to fade.'),
        b('于是在约一秒内，刚刚放电过的那群神经元之间的突触比别的更强，保存了「刚才是谁在放电」。一次短暂的非特异输入就能把这群神经元重新唤起。', 'For about a second, synapses among the neurons that just fired are stronger than others, storing which group was active. A brief nonspecific input can then reawaken that group.'),
      ],
      example: b(
        '设 $U = 0.2$。一次放电后，$u$ 从 $0.2$ 跳到 $0.2 + 0.2 \\times 0.8 = 0.36$。放电停止 1 秒后，$u \\approx 0.2 + 0.16\\,e^{-1/1.5} \\approx 0.28$，仍比基线高 40%；资源 $x$ 此时已基本恢复。',
        'Let $U = 0.2$. One spike lifts $u$ from $0.2$ to $0.2 + 0.2 \\times 0.8 = 0.36$. One second after firing stops, $u \\approx 0.2 + 0.16\\,e^{-1/1.5} \\approx 0.28$, still 40% above baseline, while resources $x$ have largely recovered.'),
      consequences: [
        b('工作记忆不一定需要不停放电，信息可以「静默」地保存一段时间，节省能量。', 'Working memory need not fire constantly. Information can be held silently for a while, saving energy.'),
        b('解释了为什么延迟期活动常以间歇的爆发出现，而不是稳定的持续放电。', 'It explains why delay activity often comes in intermittent bursts rather than steady firing.'),
      ],
      limitations: [
        b('前额叶中易化型突触的比例和作用仍在研究中。', 'How common and important facilitating synapses are in prefrontal cortex is still being studied.'),
        b('静默保存只能维持约一秒，更长时间仍需要周期性的重新激活。', 'Silent storage lasts only about a second, and longer holds still need periodic reactivation.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('注意力读取上下文：每一步都与所有保存的词元比较', 'Attention over the context: every step compares with every stored token'),
      tex: t`\mathbf{o}_t = \sum_{j=1}^{t} \operatorname{softmax}_j\!\Big(\frac{\mathbf{q}_t \cdot \mathbf{k}_j}{\sqrt{d}}\Big)\,\mathbf{v}_j`,
      symbols: [
        { tex: t`\mathbf{q}_t`, meaning: b('当前词元的查询向量', 'query vector of the current token') },
        { tex: t`\mathbf{k}_j,\;\mathbf{v}_j`, meaning: b('第 $j$ 个词元保存在 KV 缓存中的键和值', 'key and value of token $j$ stored in the KV cache') },
        { tex: t`t`, meaning: b('到目前为止的词元数，即上下文长度', 'number of tokens so far, the context length') },
        { tex: t`d`, meaning: b('向量维度', 'vector dimension') },
        { tex: t`\mathbf{o}_t`, meaning: b('从上下文中读出的内容', 'content read from the context') },
      ],
      steps: [
        b('当前词元的查询与每个保存的键做点积，得到与每个词元的相关程度。', 'The current query takes a dot product with every stored key, giving its relevance to each token.'),
        b('softmax 把相关程度变成总和为 $1$ 的权重。', 'Softmax turns relevance into weights that sum to $1$.'),
        b('按权重把所有值加起来，得到读出的内容。所有 $t$ 个词元都参与，所以任何位置都能被读到，但计算和内存随 $t$ 增长。', 'Sum all values by weight to get the readout. All $t$ tokens take part, so any position can be read, but computation and memory grow with $t$.'),
      ],
      example: b(
        '上下文中有三个词元，查询与它们的点积（已除以 $\\sqrt{d}$）为 $2$、$0$、$0$。权重约为 $0.79$、$0.11$、$0.11$，读出的内容主要来自第一个词元。若上下文中再加入 100 个点积都为 $0$ 的无关词元，第一个词元的权重会降到约 $\\tfrac{e^2}{e^2 + 102} \\approx 0.07$，无关内容稀释了有用信息。',
        'Three tokens are in context, and the query’s dot products with them, divided by $\\sqrt{d}$, are $2$, $0$ and $0$. Weights are about $0.79$, $0.11$ and $0.11$, so the readout comes mainly from the first token. Adding 100 irrelevant tokens with dot product $0$ drops the first token’s weight to about $\\tfrac{e^2}{e^2 + 102} \\approx 0.07$, and irrelevant content dilutes the useful information.'),
      consequences: [
        b('逐字保存、任意位置可读，这是上下文窗口容量远超人类工作记忆的原因。', 'Verbatim storage readable at any position is why a context window far exceeds human working memory.'),
        b('无关内容会分走注意力权重，解释了为什么夹杂无关信息时表现下降。', 'Irrelevant content takes attention weight away, which explains worse performance when irrelevant information is mixed in.'),
      ],
      limitations: [
        b('没有选择性写入：所有内容都进入缓存，只能在读取时靠相似度区分。', 'No selective write: everything enters the cache, and only similarity at readout tells content apart.'),
        b('内存和计算随长度增长，超长上下文成本很高。', 'Memory and computation grow with length, so very long contexts are costly.'),
      ],
    },
    {
      title: b('LSTM 门控：用遗忘门决定保留多少旧状态', 'LSTM gating: the forget gate decides how much old state to keep'),
      tex: t`\mathbf{c}_t = \mathbf{f}_t \odot \mathbf{c}_{t-1} + \mathbf{i}_t \odot \tilde{\mathbf{c}}_t,\qquad \mathbf{f}_t = \sigma\big(W_f\,[\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_f\big)`,
      symbols: [
        { tex: t`\mathbf{c}_t`, meaning: b('细胞状态：网络的「记忆」', 'cell state, the network’s memory') },
        { tex: t`\mathbf{f}_t`, meaning: b('遗忘门，取值 $0$ 到 $1$：保留多少旧状态', 'forget gate, between $0$ and $1$: how much old state to keep') },
        { tex: t`\mathbf{i}_t`, meaning: b('输入门：写入多少新内容', 'input gate: how much new content to write') },
        { tex: t`\tilde{\mathbf{c}}_t`, meaning: b('由当前输入算出的候选新内容', 'candidate new content computed from the current input') },
        { tex: t`\sigma`, meaning: b('S 形函数，把任意数压到 $0$ 到 $1$ 之间', 'sigmoid, which squeezes any number into $0$ to $1$') },
        { tex: t`\mathbf{h}_{t-1},\;\mathbf{x}_t`, meaning: b('上一步的输出和当前输入', 'previous output and current input') },
      ],
      steps: [
        b('遗忘门根据上一步的输出和当前输入，决定旧状态的每一维保留多少。', 'The forget gate uses the previous output and current input to decide how much of each dimension of the old state to keep.'),
        b('输入门决定把多少候选新内容写进去。', 'The input gate decides how much candidate content to write in.'),
        b('新状态等于「保留的旧内容」加「写入的新内容」。门控本身是学到的，所以网络学会在合适的时候保持或更新。', 'The new state is the kept old content plus the written new content. The gates are learned, so the network learns when to hold and when to update.'),
      ],
      example: b(
        '若遗忘门保持在 $0.99$、输入门为 $0$，100 步后旧内容剩 $0.99^{100} \\approx 0.37$；遗忘门为 $1$ 时则完全保持。这与大脑侧的持续活动模型相同：$w$ 越接近 $1$，记忆越久。',
        'With the forget gate at $0.99$ and the input gate at $0$, after 100 steps $0.99^{100} \\approx 0.37$ of the old content remains. With the forget gate at $1$ it is kept entirely. This matches the persistent activity model on the brain side: the closer $w$ is to $1$, the longer the memory.'),
      consequences: [
        b('门控让网络选择性地写入和保持，与基底节闸门的功能相似。', 'Gating lets the network write and hold selectively, functionally like the basal ganglia gate.'),
        b('状态大小固定，内存不随序列长度增加。', 'The state has a fixed size, so memory does not grow with sequence length.'),
      ],
      limitations: [
        b('固定大小的状态必须压缩历史，细节会丢失，精确回忆较早内容比 Transformer 差。', 'A fixed-size state must compress history and loses detail, so exact recall of early content is worse than in a transformer.'),
        b('门控是对生物闸门的功能类比，机制不同。', 'Gating is a functional analogy to the biological gate, with a different mechanism.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('容量很小', 'Tiny capacity'),
        text: b('同时只能保持约 3 到 5 个组块，项目一多就相互干扰。', 'Only about 3 to 5 chunks fit at once, and more items interfere.'),
        steps: [6],
      },
      {
        title: b('不复述就消退', 'Fades without rehearsal'),
        text: b('信息只能保持几秒到十几秒，分心后很快丢失。', 'Information lasts only seconds to a dozen or so seconds and is lost quickly after distraction.'),
        steps: [3, 4],
      },
      {
        title: b('需要持续投入', 'Takes sustained effort'),
        text: b('维持和操作内容需要持续的注意，疲劳和压力会明显降低工作记忆表现。', 'Holding and manipulating content takes sustained attention, and fatigue and stress clearly impair it.'),
        steps: [2, 5],
      },
    ],
    computational: [
      {
        title: b('装得多不等于用得好', 'More held is not better used'),
        text: b('长上下文中段的信息更容易被忽略；夹杂无关内容时准确率下降。', 'Information in the middle of long contexts is missed more often, and accuracy drops when irrelevant content is mixed in.'),
        steps: [3, 6],
      },
      {
        title: b('多步状态更新易错', 'Error-prone state updates'),
        text: b('需要连续更新多个对象的状态时，模型容易在中途出错。', 'When the states of several objects must be updated step after step, models tend to err along the way.'),
        steps: [3],
      },
      {
        title: b('成本随长度增长', 'Cost grows with length'),
        text: b('KV 缓存和注意力的计算随上下文长度增长，超长上下文昂贵且延迟高。', 'The KV cache and attention computation grow with context length, so very long contexts are costly and slow.'),
        steps: [2],
      },
    ],
    misreadings: [
      {
        claim: b('上下文窗口就是 AI 的工作记忆', 'The context window is AI working memory'),
        fact: b('两者都在任务期间保存信息；但上下文没有选择性写入和主动保护，也不随时间衰减，更像一份可以随时翻阅的逐字记录。', 'Both hold information during a task. But context has no selective write or active protection and does not decay, so it is closer to a verbatim transcript that can be consulted at any time.'),
      },
    ],
  },
  refs: {
    neuro: ['cowan2001', 'peterson1959', 'murdock1962', 'funahashi1989', 'goldmanrakic1995', 'lundqvist2016', 'stokes2015'],
    models: ['wang2001', 'mongillo2008', 'oreilly2006'],
    ai: ['hochreiter1997', 'vaswani2017', 'gu2023', 'liu2024', 'shi2023', 'kim2023'],
  },
}
