import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** X02 Efficiency, resources and physical implementation: the brain's energy budget vs GPUs and neuromorphic chips. */
export const EFFICIENCY: TopicContent = {
  thesis: {
    biological: b(
      '大脑约占体重的 2%，却消耗全身约 20% 的氧和能量，总功率约 20 W。能量主要花在通信上：皮层用于计算的只有约 0.1 W，用于脉冲传导和突触传递的约 3.5 W。单个脉冲代价高，所以皮层的平均放电率低于每秒一次，同一时刻强烈活跃的神经元很少。',
      'The brain is about 2% of body weight but uses about 20% of the body’s oxygen and energy, about 20 W in total. Most of it goes to communication. Cortex spends only about 0.1 W on computation and about 3.5 W on spike conduction and synaptic transmission. Each spike is costly, so cortical neurons fire less than once per second on average and few are strongly active at once.'),
    computational: b(
      'GPU 把存储和计算分开：每次运算都要把权重和激活从显存搬到运算单元，读一次显存的能耗可达一次运算的上百倍。大模型逐词生成时，速度受显存带宽限制，而不是算力。神经形态芯片（TrueNorth、Loihi）把存储放在每个核旁边，只在脉冲到来时计算，功耗低至几十毫瓦，但能运行的模型规模和精度远落后于 GPU。',
      'A GPU keeps memory apart from compute. Every operation moves weights and activations from memory to the compute units, and one memory read can cost a hundred times one operation. When a large model generates word by word, memory bandwidth limits its speed, not compute. Neuromorphic chips such as TrueNorth and Loihi keep memory beside each core and compute only when a spike arrives. They draw tens of milliwatts but run far smaller and less accurate models than GPUs.'),
    gap: b(
      '两边的能耗都主要花在搬运信息上，而不是计算本身。差距在于：大脑把存储和计算放在同一个突触里，用稀疏、低频、带噪声的脉冲把通信压到最低；GPU 用稠密、高频、精确的运算换来速度、可编程性和可复制的权重。两边的能耗统计范围不同，比较时必须说明边界。',
      'Both spend most of their energy on moving information rather than on computing. The brain stores and computes in the same synapse and keeps communication low with sparse, slow, noisy spikes. A GPU trades energy for dense, fast, exact arithmetic, programmability and copyable weights. The two energy figures cover different things, so any comparison must state its boundaries.'),
  },
  short: { biological: b('大脑', 'Brain'), computational: b('芯片', 'Chips') },
  kinds: ['implementation'],
  evidence: 'established',
  asOf: b('AI 侧描述截至 2026 年 10 月已发表的 GPU 训练与推理能耗测量，以及已发表的神经形态芯片。', 'The AI column describes published energy measurements of GPU training and inference, and published neuromorphic chips, as of October 2026.'),
  capabilities: [
    {
      lead: 'bio',
      dimension: b('存储与计算的距离', 'Distance between memory and compute'),
      brain: b('权重保存在突触里，突触也完成加权运算，信息不需要在存储和计算之间来回搬运。', 'Weights live in synapses, which also do the weighting, so information never shuttles between memory and compute.'),
      ai: b('权重存在显存里，每次运算都要搬到运算单元；45 纳米工艺下读一次 DRAM 约是一次浮点乘法的 170 倍能耗。', 'Weights sit in memory and move to the compute units for every operation. At 45 nm, one DRAM read costs about 170 times a floating-point multiply.'),
      gap: b('搬运数据是芯片能耗的大头，大脑在结构上省去了这一步。', 'Moving data dominates chip energy, and the brain’s structure skips this step.'),
    },
    {
      lead: 'bio',
      dimension: b('按需计算', 'Computing only when needed'),
      brain: b('神经元只在输入足够时放电，没有脉冲就几乎不花信号能量；平均放电率低于每秒一次。', 'A neuron fires only when its input is strong enough and spends almost no signaling energy without spikes. The average rate is below one spike per second.'),
      ai: b('GPU 按固定时钟计算每个数值，包括零；MoE 每个词元只激活少数专家，稀疏只发生在模块层面。', 'A GPU computes every value on a fixed clock, zeros included. MoE activates a few experts per token, so sparsity exists only at the module level.'),
      gap: b('大脑的稀疏是逐个单元、逐个事件的；芯片的稀疏粒度粗得多。', 'Brain sparsity works unit by unit and event by event, while chip sparsity is much coarser.'),
    },
    {
      lead: 'comp',
      dimension: b('运算速度', 'Speed of operations'),
      brain: b('神经元每秒最多放电数百次，信号沿轴突每秒传播约 1 到 100 米。', 'Neurons fire at most a few hundred times per second, and signals travel along axons at about 1 to 100 meters per second.'),
      ai: b('芯片的时钟每秒超过十亿次，单个运算单元比神经元快约百万倍。', 'Chip clocks run above a billion cycles per second, so one compute unit is about a million times faster than a neuron.'),
      gap: b('大脑靠数量和并行弥补速度，单个单元远慢于芯片。', 'The brain makes up for speed with numbers and parallelism, but each unit is far slower than a chip.'),
    },
    {
      lead: 'comp',
      dimension: b('数值精度', 'Numerical precision'),
      brain: b('突触传递是随机的：一个脉冲到达时，单个突触不一定释放递质，精度要靠许多突触和神经元平均获得。', 'Synaptic transmission is random. When a spike arrives a single synapse may not release transmitter, so precision comes from averaging over many synapses and neurons.'),
      ai: b('运算精确且可重复；推理常用 8 位甚至更低的数值来省电和省显存，精度损失可以测量和控制。', 'Arithmetic is exact and repeatable. Inference often uses 8-bit or lower numbers to save energy and memory, with a loss that can be measured and controlled.'),
      gap: b('芯片能按需要选择精度；大脑的精度受分子噪声限制。', 'Chips can choose their precision, while molecular noise limits the brain’s.'),
    },
    {
      lead: 'bio',
      dimension: b('事件驱动的硬件', 'Event-driven hardware'),
      brain: b('约 860 亿个神经元异步工作，每个只在脉冲到来时消耗信号能量。', 'About 86 billion neurons work asynchronously, each spending signaling energy only when a spike arrives.'),
      ai: b('TrueNorth 用 100 万个脉冲神经元，功耗约 70 mW；脉冲网络在大规模任务上的精度仍落后于 GPU 上的主流模型。', 'TrueNorth runs 1 million spiking neurons on about 70 mW. On large tasks, spiking networks remain less accurate than mainstream models on GPUs.'),
      gap: b('神经形态芯片借来了事件驱动的省电方式，但规模和训练方法还跟不上。', 'Neuromorphic chips borrowed event-driven savings, but their scale and training methods lag behind.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('能量供应', 'Energy supply'),
        points: [
          b('血液送来葡萄糖和氧，神经元和胶质细胞中的线粒体把它们转化为 ATP（细胞的能量分子）。', 'Blood brings glucose and oxygen, and mitochondria in neurons and glial cells turn them into ATP, the cell’s energy molecule.'),
          b('大脑几乎没有能量储备，必须持续供血；ATP 主要送到突触和轴突。', 'The brain has almost no energy reserve and needs constant blood supply. ATP goes mainly to synapses and axons.'),
        ],
      },
      {
        title: b('突触：存储即计算', 'Synapse: memory and compute in one place'),
        points: [
          b('连接强度以受体数量和递质释放概率的形式保存在突触里。', 'Connection strength is stored in the synapse as the number of receptors and the probability of transmitter release.'),
          b('递质到达时，突触直接产生一个按强度缩放的电流，存储和加权在同一处完成。', 'When transmitter arrives, the synapse produces a current scaled by its strength, so storage and weighting happen in one place.'),
        ],
      },
      {
        title: b('树突与胞体整合', 'Integration in dendrites and soma'),
        points: [
          b('树突把数千个突触的电流汇总到胞体，膜电位随之升降。', 'Dendrites sum currents from thousands of synapses into the soma, and the membrane potential rises and falls.'),
          b('只有膜电位越过阈值时才产生脉冲；这一步的计算耗能很少。', 'A spike starts only when the potential crosses threshold. This computing step uses little energy.'),
        ],
      },
      {
        title: b('轴突与突触传递', 'Axons and synaptic transmission'),
        points: [
          b('脉冲沿轴突传到数千个突触，每次传递后，离子泵消耗 ATP 把钠、钾等离子泵回原位。', 'A spike travels along the axon to thousands of synapses, and after each transmission ion pumps spend ATP to move sodium and potassium back.'),
          b('通信的这部分耗能约是计算的 35 倍，是信号能耗的主体。', 'This communication costs about 35 times as much as computation and makes up most of the signaling energy.'),
        ],
      },
      {
        title: b('稀疏放电', 'Sparse firing'),
        points: [
          b('固定的能量预算只够少量脉冲，平均放电率低于每秒一次。', 'A fixed energy budget allows only a few spikes, so the average rate stays below one per second.'),
          b('信息因此编码在少数活跃的神经元上，不同时刻、不同任务轮流使用不同的神经元。', 'Information is therefore carried by few active neurons, and different moments and tasks use different neurons in turn.'),
        ],
      },
      {
        title: b('按需分配', 'Allocation by demand'),
        points: [
          b('某个脑区活跃时，局部血流在数秒内增加，fMRI 测的就是这个变化。', 'When a region is active, its local blood flow rises within seconds, which is the change fMRI measures.'),
          b('局部变化通常不超过 5%，大脑的总耗能几乎不随任务改变。', 'Local changes are usually 5% or less, and total brain energy hardly changes with the task.'),
        ],
      },
    ],
    computational: [
      {
        title: b('显存', 'Memory (HBM)'),
        points: [
          b('权重和激活以 16 位或更低的二进制数存在高带宽显存（HBM）中。', 'Weights and activations are stored as 16-bit or smaller binary numbers in high-bandwidth memory (HBM).'),
          b('大模型的权重有数百 GB，要分布在多块 GPU 的显存里。', 'A large model’s weights take hundreds of GB and are spread over the memory of many GPUs.'),
        ],
      },
      {
        title: b('搬到片上', 'Moving data on chip'),
        points: [
          b('每次运算前，数据从显存读入芯片上的缓存（SRAM）和寄存器。', 'Before each operation, data is read from memory into on-chip cache (SRAM) and registers.'),
          b('读一次显存的能耗是一次运算的百倍以上，数据越靠近运算单元，读取越便宜。', 'A memory read costs over a hundred times one operation, and the closer data sits to the compute units, the cheaper it is to read.'),
        ],
      },
      {
        title: b('张量核心', 'Tensor cores'),
        points: [
          b('成千上万个运算单元按同一个时钟节拍执行矩阵乘法，不论数值是否为零。', 'Thousands of compute units run matrix multiplications on one clock, whether the values are zero or not.'),
          b('结果写回缓存或显存，作为下一层的输入。', 'Results go back to cache or memory as input to the next layer.'),
        ],
      },
      {
        title: b('芯片之间的通信', 'Communication between chips'),
        points: [
          b('训练大模型要用成百上千块 GPU，梯度和激活通过高速互连交换。', 'Training a large model uses hundreds or thousands of GPUs, which exchange gradients and activations over fast interconnects.'),
          b('这些通信同样消耗能量和时间，常常决定能用多少块芯片并行。', 'This communication also costs energy and time, and often limits how many chips can work in parallel.'),
        ],
      },
      {
        title: b('批处理与复用', 'Batching and reuse'),
        points: [
          b('推理时把许多请求合成一批，读一次权重就为整批请求计算。', 'Inference groups many requests into a batch, so one read of the weights serves the whole batch.'),
          b('批越大，每读一个字节做的运算越多，越接近芯片的峰值算力。', 'The larger the batch, the more operations per byte read, and the closer the chip gets to its peak compute.'),
        ],
      },
      {
        title: b('神经形态芯片', 'Neuromorphic chips'),
        points: [
          b('每个核旁边放着自己的突触存储，脉冲以事件的形式在核之间传递，没有脉冲就不计算。', 'Each core keeps its own synapse memory beside it, spikes travel between cores as events, and no spike means no computation.'),
          b('TrueNorth 不能在片上学习；Loihi 支持片上学习规则，但训练大规模脉冲网络仍然困难。', 'TrueNorth cannot learn on chip. Loihi supports on-chip learning rules, but training large spiking networks remains hard.'),
        ],
      },
    ],
  },
  archNotes: {
    biological: [
      b('大脑约占成人体重的 2%，却消耗全身约 20% 的氧；认知任务中局部血流的变化通常不超过 5%，全脑测量中常检测不到变化。', 'The brain is about 2% of adult body weight but uses about 20% of the body’s oxygen. In cognitive tasks local blood flow usually changes by 5% or less, and whole-brain measures often show no change.'),
      b('2021 年的估算：皮层灰质用于计算的约 0.1 W，用于长距离通信的约 3.5 W，约为计算的 35 倍。', 'A 2021 estimate puts cortical gray matter at about 0.1 W for computation and about 3.5 W for long-distance communication, about 35 times as much.'),
      b('2003 年的估算认为，单个脉冲的代价限制了同一时刻能强烈活跃的皮层神经元，不到 1%。', 'A 2003 estimate concluded that the cost of a spike limits the cortical neurons that can be strongly active at once to under 1%.'),
      b('大脑的能量大部分用于突触传递：按 2012 年的综述，突触前后的传递过程约占神经元与胶质信号和静息能耗的 55%；许多突触末梢内有线粒体就近供应 ATP。', 'Most brain energy goes to synaptic transmission. A 2012 review puts pre- and postsynaptic transmission at about 55% of the ATP used on signaling and resting potentials. Many synaptic terminals hold mitochondria that supply ATP close by.'),
      b('人脑约有 860 亿个神经元，每个神经元通常有数千个突触。', 'The human brain has about 86 billion neurons, each typically with thousands of synapses.'),
      b('神经系统中的噪声来自离子通道的随机开闭和递质的随机释放，限制了单个神经元的精度。', 'Noise in the nervous system comes from the random opening of ion channels and random transmitter release, and it limits the precision of single neurons.'),
    ],
    computational: [
      b('2014 年的测量（45 纳米工艺）：32 位浮点加法约 0.9 pJ，乘法约 3.7 pJ，读一次片上 SRAM 约 5 pJ，读一次 DRAM 约 640 pJ。新工艺下各项都更低，但读外部存储远贵于运算的规律不变。', 'Measurements from 2014 at 45 nm: a 32-bit float add costs about 0.9 pJ and a multiply about 3.7 pJ. An on-chip SRAM read costs about 5 pJ and a DRAM read about 640 pJ. Newer processes lower every number, but external memory reads still cost far more than arithmetic.'),
      b('训练 GPT-3 估计用电约 1287 MWh；同一研究指出，模型、数据中心和芯片的选择可使碳排放相差 100 到 1000 倍。', 'Training GPT-3 is estimated to have used about 1287 MWh. The same study found that the choice of model, data center and chip can change emissions by 100 to 1000 times.'),
      b('2025 年 Google 测得一次 Gemini 应用文本请求的中位能耗约 0.24 Wh，统计范围包括芯片、主机、空闲容量和数据中心开销；一年内这一数字下降了约 33 倍。', 'In 2025 Google measured the median Gemini Apps text prompt at about 0.24 Wh, counting chips, host machines, idle capacity and data center overhead. Over one year this figure fell about 33 times.'),
      b('8 位推理可以在 1750 亿参数的模型上不降低效果，显存占用减半。', '8-bit inference works on models with 175 billion parameters without a loss in quality and halves the memory needed.'),
      b('FlashAttention 重排注意力的计算顺序，减少显存读写，在 GPT-2 上把训练提速约 3 倍：同样的运算，搬运更少就更快。', 'FlashAttention reorders the attention computation to read and write memory less, which sped up GPT-2 training about 3 times. The same arithmetic with less data movement runs faster.'),
      b('TrueNorth（2014）有 4096 个核、100 万个神经元和 2.56 亿个突触；Loihi（2018）每块芯片有 128 个核，支持片上学习。', 'TrueNorth, from 2014, has 4096 cores, 1 million neurons and 256 million synapses. Loihi, from 2018, has 128 cores per chip and supports on-chip learning.'),
    ],
  },
  bioMath: [
    {
      title: b('能效编码：每单位能量传递的信息在低放电率时最多', 'Energy-efficient coding: information per unit of energy peaks at a low firing rate'),
      tex: t`\eta(p) = \frac{H(p)}{E_0 + p\,E_s},\qquad H(p) = -p\log_2 p - (1 - p)\log_2(1 - p),\qquad r = \frac{E_s}{E_0}`,
      symbols: [
        { tex: t`p`, meaning: b('在一个时间窗内放电的概率', 'probability of firing in one time window') },
        { tex: t`H(p)`, meaning: b('一个时间窗传递的信息量（比特）', 'information carried in one window, in bits') },
        { tex: t`E_0`, meaning: b('不放电时维持神经元的基础能耗', 'baseline cost of keeping the neuron alive without firing') },
        { tex: t`E_s`, meaning: b('一次脉冲及其突触传递的额外能耗', 'extra cost of one spike and its synaptic transmission') },
        { tex: t`r`, meaning: b('脉冲代价与基础代价之比', 'ratio of spike cost to baseline cost') },
        { tex: t`\eta`, meaning: b('能效：每单位能量传递的比特数', 'efficiency: bits per unit of energy') },
      ],
      steps: [
        b('放电概率为 $p$ 时，一个时间窗传递 $H(p)$ 比特；$p = 0.5$ 时最多，为 $1$ 比特。', 'At firing probability $p$, one window carries $H(p)$ bits, at most $1$ bit when $p = 0.5$.'),
        b('同一时间窗的能耗是基础能耗加上 $p$ 乘以脉冲能耗。', 'The energy of that window is the baseline cost plus $p$ times the spike cost.'),
        b('两者相除得到能效；脉冲越贵（$r$ 越大），能效最高的 $p$ 越小。', 'Dividing the two gives the efficiency. The more expensive a spike, the larger $r$, the smaller the most efficient $p$.'),
      ],
      example: b(
        '取 $r = 50$（以 $E_0$ 为单位，$E_s = 50$）。$p = 0.5$ 时，$H = 1$ 比特，能耗 $1 + 25 = 26$，能效约 $0.038$。$p = 0.05$ 时，$H \\approx 0.29$ 比特，能耗 $1 + 2.5 = 3.5$，能效约 $0.082$，是前者的两倍多。逐点计算可知，能效最高的放电概率约为 $0.055$。',
        'Take $r = 50$, so $E_s = 50$ in units of $E_0$. At $p = 0.5$, $H = 1$ bit, the energy is $1 + 25 = 26$ and the efficiency is about $0.038$. At $p = 0.05$, $H \\approx 0.29$ bits and the energy is $1 + 2.5 = 3.5$. The efficiency is about $0.082$, more than twice as high. Point by point, the most efficient firing probability is about $0.055$.'),
      consequences: [
        b('只要脉冲比静息贵得多，能效最高的编码就是稀疏的：每个神经元传的信息少一些，但省下的能量更多。', 'Whenever a spike costs much more than rest, the most efficient code is sparse. Each neuron carries less information but saves even more energy.'),
        b('这为皮层的低平均放电率提供了一个能量上的解释。', 'This gives an energy-based account of the low average firing rate of cortex.'),
      ],
      limitations: [
        b('模型把神经元简化为每个时间窗放电或不放电的二元单元，忽略了脉冲时间和群体编码。', 'The model treats a neuron as a binary unit that fires or not in each window, ignoring spike timing and population codes.'),
        b('$r$ 的真实值因细胞类型和物种而异，最优放电率因此只能给出量级。', 'The real value of $r$ varies with cell type and species, so the optimal rate is only an order of magnitude.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('Roofline 模型：算力和显存带宽中较小的一个决定速度', 'The roofline model: the smaller of compute and memory bandwidth sets the speed'),
      tex: t`P = \min\big(P_{\text{peak}},\; B \cdot I\big),\qquad I = \frac{\text{FLOPs}}{\text{bytes}},\qquad I^{*} = \frac{P_{\text{peak}}}{B}`,
      symbols: [
        { tex: t`P`, meaning: b('实际能达到的运算速度（每秒浮点运算次数）', 'attainable speed, in floating-point operations per second') },
        { tex: t`P_{\text{peak}}`, meaning: b('芯片的峰值算力', 'peak compute of the chip') },
        { tex: t`B`, meaning: b('显存带宽（每秒能读写的字节数）', 'memory bandwidth, bytes read or written per second') },
        { tex: t`I`, meaning: b('运算强度：每从显存读一个字节做多少次运算', 'arithmetic intensity: operations per byte read from memory') },
        { tex: t`I^{*}`, meaning: b('拐点：运算强度高于它才受算力限制', 'ridge point: above it, compute is the limit') },
      ],
      steps: [
        b('数出一段计算要做多少次运算、要从显存读写多少字节，相除得到运算强度 $I$。', 'Count the operations and the bytes moved to and from memory for a piece of work, and divide to find the intensity $I$.'),
        b('带宽乘以运算强度，是显存能「喂」出的速度；与峰值算力比较，取较小者。', 'Bandwidth times intensity is the speed memory can feed. Compare it with peak compute and take the smaller.'),
        b('$I < I^{*}$ 时受带宽限制，提高 $I$（复用数据）才能加速；$I > I^{*}$ 时受算力限制。', 'Below $I^{*}$ bandwidth is the limit, and only raising $I$ by reusing data speeds things up. Above it, compute is the limit.'),
      ],
      example: b(
        '设一块芯片峰值 $1000$ TFLOP/s、显存带宽 $3$ TB/s，拐点 $I^{*} \\approx 333$。大模型逐词生成、批大小为 $1$ 时，每个 16 位权重（$2$ 字节）只用于一次乘加（$2$ 次运算），$I \\approx 1$，速度约 $3$ TFLOP/s，只有峰值的 $0.3\\%$。把 $64$ 个请求合成一批，$I \\approx 64$，速度约 $192$ TFLOP/s。',
        'Assume a chip with $1000$ TFLOP/s peak and $3$ TB/s bandwidth, so the ridge point is $I^{*} \\approx 333$. A large model generating one word at a time with batch size $1$ uses each 16-bit weight, $2$ bytes, for one multiply-add, $2$ operations. So $I \\approx 1$ and the speed is about $3$ TFLOP/s, $0.3\\%$ of peak. A batch of $64$ requests gives $I \\approx 64$ and about $192$ TFLOP/s.'),
      consequences: [
        b('单个请求的逐词生成几乎完全受显存带宽限制，芯片的大部分算力闲置。', 'Word-by-word generation for one request is almost entirely limited by bandwidth, and most of the chip’s compute sits idle.'),
        b('批处理、量化和 FlashAttention 这类方法都在提高运算强度，也就是减少每次运算的搬运。', 'Batching, quantization and FlashAttention all raise arithmetic intensity, which means less data moved per operation.'),
      ],
      limitations: [
        b('只考虑一层存储；真实芯片有寄存器、缓存和显存多层，每层都有自己的「屋顶」。', 'It considers one memory level. Real chips have registers, caches and main memory, each with its own roof.'),
        b('例中忽略了注意力读取的 KV 缓存，它会随上下文变长进一步降低运算强度。', 'The example ignores the KV cache read by attention, which lowers intensity further as context grows.'),
      ],
    },
    {
      title: b('数据搬运的能耗：一次运算的能量大多花在取数上', 'The energy of moving data: most of an operation’s energy goes to reading operands'),
      tex: t`E = N_{\text{op}}\,e_{\text{op}} + N_{\text{read}}\,e_{\text{read}}`,
      symbols: [
        { tex: t`N_{\text{op}}`, meaning: b('运算次数', 'number of operations') },
        { tex: t`e_{\text{op}}`, meaning: b('每次运算的能耗', 'energy per operation') },
        { tex: t`N_{\text{read}}`, meaning: b('读取操作数的次数', 'number of operand reads') },
        { tex: t`e_{\text{read}}`, meaning: b('每次读取的能耗，取决于数据存在哪一层（寄存器、缓存或显存）', 'energy per read, which depends on where the data sits: register, cache or main memory') },
      ],
      steps: [
        b('把一段计算拆成运算和读取两部分。', 'Split a piece of work into operations and reads.'),
        b('运算的能耗基本固定；读取的能耗取决于数据离运算单元有多远。', 'The energy of operations is roughly fixed. The energy of reads depends on how far the data is from the compute unit.'),
        b('两部分相加；设计芯片和算法的目标是让大多数读取落在最近的一层。', 'Add the two. Chip and algorithm design aim to make most reads hit the nearest level.'),
      ],
      example: b(
        '按 2014 年 45 纳米工艺的数值，一次 32 位乘加约 $3.7 + 0.9 = 4.6$ pJ。若两个操作数都从 DRAM 读取，读取约 $2 \\times 640 = 1280$ pJ，搬运占总能耗的 $99.6\\%$。若都从片上 SRAM 读取，读取约 $10$ pJ，总能耗降到约 $15$ pJ。',
        'With the 2014 numbers for 45 nm, one 32-bit multiply-add costs about $3.7 + 0.9 = 4.6$ pJ. If both operands come from DRAM, the reads cost about $2 \\times 640 = 1280$ pJ, and moving data is $99.6\\%$ of the total. If both come from on-chip SRAM, the reads cost about $10$ pJ and the total drops to about $15$ pJ.'),
      consequences: [
        b('同一次运算，取数位置不同，能耗可相差近百倍；节能的关键是复用已经搬到近处的数据。', 'The same operation can differ almost a hundredfold in energy depending on where its data comes from. Saving energy means reusing data already close by.'),
        b('大脑把权重放在突触里，相当于让每次「读取」都发生在运算单元内部。', 'The brain keeps weights in synapses, so every read in effect happens inside the compute unit.'),
      ],
      limitations: [
        b('数值来自旧工艺，新芯片的各项更低，比例也有变化。', 'The numbers come from an older process. New chips are lower on every item, and the ratios differ too.'),
        b('没有计入时钟、控制逻辑、散热和数据中心的开销。', 'Clocking, control logic, cooling and data center overhead are not counted.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('单元速度慢', 'Slow units'),
        text: b('脉冲每秒最多数百次，轴突传导需要毫秒到数十毫秒，串行的多步计算很慢。', 'Spikes come at most a few hundred times per second and axonal conduction takes milliseconds to tens of milliseconds, so serial multi-step computation is slow.'),
        steps: [4],
      },
      {
        title: b('预算基本固定', 'A fixed budget'),
        text: b('总功率受血供和散热限制，不能为难题临时增加能量。', 'Total power is limited by blood supply and heat removal, so energy cannot be added for a hard problem.'),
        steps: [1, 6],
      },
      {
        title: b('依赖持续供血', 'Needs constant blood flow'),
        text: b('没有能量储备，供血中断几分钟就会造成损伤。', 'With no energy reserve, a few minutes without blood flow cause damage.'),
        steps: [1],
      },
      {
        title: b('突触传递有噪声', 'Noisy transmission'),
        text: b('单个突触的传递不可靠，精确计算要靠大量冗余。', 'Single synapses transmit unreliably, so exact computation needs heavy redundancy.'),
        steps: [2],
      },
    ],
    computational: [
      {
        title: b('搬运主导能耗', 'Data movement dominates'),
        text: b('存储与计算分离，读显存的能耗远超运算本身。', 'Memory is separate from compute, and memory reads cost far more than the arithmetic.'),
        steps: [1, 2],
      },
      {
        title: b('稠密地按节拍计算', 'Dense, clocked computation'),
        text: b('零值也要参与运算，单个数值层面的稀疏难以转化为节能。', 'Zeros still enter the arithmetic, so sparsity at the level of single values rarely saves energy.'),
        steps: [3],
      },
      {
        title: b('多芯片通信开销', 'Cost of chip-to-chip traffic'),
        text: b('规模越大，芯片之间交换数据的时间和能耗占比越高。', 'The larger the system, the larger the share of time and energy spent exchanging data between chips.'),
        steps: [4],
      },
      {
        title: b('神经形态芯片难训练', 'Neuromorphic chips are hard to train'),
        text: b('脉冲不可微，大规模脉冲网络的训练方法和软件生态仍落后于 GPU。', 'Spikes are not differentiable, and training methods and software for large spiking networks still lag behind GPUs.'),
        steps: [6],
      },
    ],
    misreadings: [
      {
        claim: b('人只用了大脑的 10%', 'People use only 10% of their brain'),
        fact: b('成像研究显示大脑各个部分都会被使用。稀疏放电是能量约束下的编码方式：同一时刻强烈活跃的神经元很少，但不同时刻、不同任务轮流使用不同的神经元。', 'Imaging shows that every part of the brain is used. Sparse firing is a coding strategy under an energy limit. Few neurons are strongly active at once, but different moments and tasks use different neurons.'),
      },
      {
        claim: b('大脑的能效是 AI 的上百万倍', 'The brain is millions of times more energy-efficient than AI'),
        fact: b('这类倍数取决于统计范围和任务定义：大脑的 20 W 不含身体其他部分，芯片能耗常含机房和冷却，同一任务上的严格比较很少。可以确定的是，芯片能耗中数据搬运占很大比例，大脑在结构上避开了这一项。', 'Such ratios depend on what is counted and which task is compared. The brain’s 20 W leaves out the rest of the body, and chip figures often include data centers and cooling. Strict comparisons on the same task are rare. What is clear is that data movement takes a large share of chip energy and the brain’s structure avoids it.'),
      },
    ],
  },
  refs: {
    neuro: ['raichle2002', 'attwell2001', 'harris2012', 'lennie2003', 'levy2021', 'herculano2009', 'faisal2008'],
    models: ['levy1996'],
    ai: ['horowitz2014', 'williams2009', 'patterson2021', 'elsworth2025', 'dettmers2022', 'dao2022', 'fedus2022', 'merolla2014', 'davies2018', 'neftci2019'],
  },
}
