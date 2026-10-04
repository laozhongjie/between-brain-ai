import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M05 Spikes and temporal coding: information in how many spikes come, and in exactly when. */
export const SPIKES: MechEntry = {
  definition: b(
    '神经元之间传递的是大小相同、持续约 1 毫秒的电脉冲，所以信息只能编码在脉冲的数量和时间上。频率编码用一段时间内的脉冲数表示强度；时间编码用第一个脉冲的延迟、脉冲相对于脑电振荡的相位，或多个神经元之间的同步来表示信息。',
    'Neurons exchange electrical pulses of equal size that last about 1 ms, so information can only be coded in how many spikes come and when. A rate code represents intensity by the number of spikes in a period. Temporal codes use the latency of the first spike, the phase of spikes relative to brain oscillations, or synchrony among neurons.'),
  scale: b('单个神经元到神经元群体', 'From single neurons to populations'),
  timescale: b('时间精度从数十微秒到数百毫秒不等', 'Timing precision from tens of microseconds to hundreds of milliseconds'),
  steps: [
    {
      title: b('全或无的脉冲', 'All-or-none spikes'),
      points: [
        b('每个脉冲的大小基本相同，传递的是「何时」和「多少」，不是「多强」。', 'Every spike has nearly the same size, so it carries when and how many, not how strong.'),
      ],
    },
    {
      title: b('频率编码', 'Rate code'),
      points: [
        b('刺激越强，一段时间内的脉冲越多；下游神经元把一段时间的输入积累起来读出频率。', 'The stronger the stimulus, the more spikes in a period, and downstream neurons read the rate by accumulating input over time.'),
        b('读得准需要时间：窗口越短，数到的脉冲越少，随机误差越大。', 'Reading it accurately takes time. The shorter the window, the fewer spikes counted and the larger the random error.'),
      ],
    },
    {
      title: b('延迟编码', 'Latency code'),
      points: [
        b('刺激越强，第一个脉冲来得越早；下游只要看哪些神经元先放电，就能在一个脉冲之内读出信息。', 'The stronger the stimulus, the earlier the first spike. Downstream neurons can read information within one spike by noting which neurons fire first.'),
      ],
    },
    {
      title: b('相位编码', 'Phase code'),
      points: [
        b('脉冲可以落在脑电振荡（如海马的 $\\theta$ 节律）的不同相位上；海马位置细胞的放电相位随动物穿过位置场逐渐提前。', 'Spikes can fall at different phases of a brain oscillation, such as the hippocampal theta rhythm. Hippocampal place cells fire at earlier and earlier phases as the animal crosses the place field.'),
      ],
    },
    {
      title: b('同步与精确时序', 'Synchrony and precise timing'),
      points: [
        b('几个输入同时到达比分散到达更容易让下游放电，所以同步本身可以携带信息。', 'Inputs that arrive together drive a neuron more easily than scattered ones, so synchrony itself can carry information.'),
        b('听觉脑干比较两耳脉冲到达的时间差，精度达到数十微秒，用来判断声源方向。', 'The auditory brainstem compares the arrival times of spikes from the two ears to tens of microseconds to locate sound.'),
      ],
    },
    {
      title: b('事件驱动的通信', 'Event-driven communication'),
      points: [
        b('没有脉冲时，突触不传递信号，也几乎不消耗信号能量（见[效率与物理实现](topic:efficiency)）。', 'Without spikes, synapses send nothing and spend almost no signaling energy (see [efficiency and physical implementation](topic:efficiency)).'),
      ],
    },
  ],
  notes: [
    b('1996 年的实验发现，人在约 150 毫秒内就能判断图片中是否有动物；视觉通路有约十级，每级只有约 10 毫秒，每个神经元来不及发放多个脉冲，这被用作支持时间编码的论据。', 'A 1996 experiment found that people can tell within about 150 ms whether a picture contains an animal. The visual pathway has about ten stages of about 10 ms each, too short for each neuron to fire several spikes. This is used as an argument for temporal codes.'),
    b('1995 年的实验发现，皮层神经元对恒定电流的放电时间变化较大，对有起伏的输入则能以约 1 毫秒的精度重复放电。', 'A 1995 experiment found that cortical neurons fire at variable times for constant current. For fluctuating input they repeat their spike times to about 1 ms.'),
    b('皮层神经元的放电常接近泊松过程：给定频率时，脉冲的具体时间看起来是随机的（见[神经噪声](card:noise)）。', 'Cortical firing is often close to a Poisson process. Given the rate, the exact spike times look random (see [neural noise](card:noise)).'),
    b('Maass 在 1997 年证明，脉冲神经网络在理论上的计算能力不低于同规模的传统神经网络，称之为「第三代神经网络」。', 'Maass proved in 1997 that spiking networks are in theory at least as powerful as traditional networks of the same size. He called them the third generation of neural networks.'),
  ],
  counterpart: [
    b('主流网络传递的是按时钟同步更新的连续数值，没有脉冲时间的概念。', 'Mainstream networks pass continuous values updated on a shared clock, with no notion of spike timing.'),
    b('脉冲神经网络用积分发放神经元传递事件；脉冲不可微，训练时用平滑的「替代梯度」代替阶跃函数的导数。', 'Spiking networks pass events between integrate-and-fire neurons. Spikes are not differentiable, so training replaces the step function’s derivative with a smooth surrogate gradient.'),
    b('在大规模任务上，脉冲网络的精度和软件生态仍落后于主流模型，优势主要在神经形态硬件上的能耗。', 'On large tasks, spiking networks still lag mainstream models in accuracy and software, and their advantage lies mainly in energy on neuromorphic hardware.'),
  ],
  math: [
    {
      title: b('泊松放电：窗口越短，频率读得越不准', 'Poisson firing: the shorter the window, the less accurate the rate'),
      tex: t`P(n \mid r, T) = \frac{(rT)^{n}\,e^{-rT}}{n!},\qquad \mathbb{E}[n] = rT,\qquad \frac{\sqrt{\mathrm{Var}(n)}}{\mathbb{E}[n]} = \frac{1}{\sqrt{rT}}`,
      symbols: [
        { tex: t`r`, meaning: b('放电频率（每秒脉冲数）', 'firing rate, spikes per second') },
        { tex: t`T`, meaning: b('读出的时间窗口', 'reading window') },
        { tex: t`n`, meaning: b('窗口内数到的脉冲数', 'number of spikes counted in the window') },
        { tex: t`P(n \mid r, T)`, meaning: b('数到 $n$ 个脉冲的概率', 'probability of counting $n$ spikes') },
      ],
      steps: [
        b('假设每一小段时间内放电的概率相同、彼此独立，窗口内的脉冲数服从泊松分布。', 'Assume the chance of a spike is the same in every small interval and independent, so the count in the window follows a Poisson distribution.'),
        b('平均脉冲数是 $rT$，方差也是 $rT$。', 'The mean count is $rT$, and so is the variance.'),
        b('用 $n/T$ 估计频率时，相对误差为 $1/\\sqrt{rT}$：窗口内平均脉冲越少，估计越不准。', 'Estimating the rate as $n/T$ gives a relative error of $1/\\sqrt{rT}$. The fewer spikes expected in the window, the worse the estimate.'),
      ],
      example: b(
        '取 $r = 20$ Hz。$T = 50$ 毫秒时，平均只有 $1$ 个脉冲，一个也没有的概率为 $e^{-1} \\approx 0.37$，相对误差为 $1$。$T = 500$ 毫秒时，平均 $10$ 个，相对误差约 $0.32$。单个神经元要在 50 毫秒内可靠地传递频率，几乎不可能。',
        'Take $r = 20$ Hz. With $T = 50$ ms there is only $1$ spike on average and the chance of none is $e^{-1} \\approx 0.37$. The relative error is $1$. With $T = 500$ ms there are $10$ on average and the relative error is about $0.32$. A single neuron can hardly convey a rate reliably within 50 ms.'),
      consequences: [
        b('快速的判断要么靠许多神经元一起报告频率，要么靠脉冲的时间而不是数量。', 'Fast judgments must rely either on many neurons reporting rates together or on spike timing rather than counts.'),
        b('窗口越长，频率越准，但反应越慢：频率编码在速度和精度之间取舍。', 'A longer window gives a more accurate rate but a slower response. Rate codes trade speed against precision.'),
      ],
      limitations: [
        b('真实神经元有不应期和适应，短时间内的放电比泊松过程更规则。', 'Real neurons have refractory periods and adaptation, so their firing over short times is more regular than Poisson.'),
        b('频率本身也会随时间变化，单一的 $r$ 只是一种近似。', 'The rate itself changes over time, and a single $r$ is only an approximation.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('两耳时间差：声源方向的计算', 'Interaural time difference: computing sound direction'), to: 'topic:auditory-scene' },
    { title: b('能效编码：低放电率时每单位能量的信息最多', 'Energy-efficient coding: most information per unit energy at low rates'), to: 'topic:efficiency' },
  ],
  conditions: [
    b('频率编码和时间编码并不互斥；同一个脑区可能同时用两种方式，哪一种起主要作用因脑区和任务而异。', 'Rate and temporal codes are not exclusive. One area may use both, and which dominates depends on the area and task.'),
    b('要证明时间编码被大脑使用，需要表明下游确实读取了时间信息，而不只是时间信息存在，这类证据较少。', 'Showing that the brain uses a temporal code requires that downstream neurons actually read the timing, not just that it exists. Such evidence is scarcer.'),
    b('皮层的放电变异有多少是噪声、有多少携带信息，仍有争议。', 'How much of cortical firing variability is noise and how much carries information is debated.'),
  ],
  uses: [
    { to: 'topic:auditory-scene', role: b('两耳脉冲的精确时间差让听觉通路判断声源的方向。', 'Precise timing differences between spikes from the two ears let the auditory pathway locate sounds.') },
    { to: 'topic:visual-recognition', role: b('约 150 毫秒的快速识别要求大多数神经元只能贡献很少的脉冲。', 'Recognition within about 150 ms means most neurons can contribute only a few spikes.') },
    { to: 'topic:efficiency', role: b('事件驱动的脉冲通信是大脑和神经形态芯片省能的主要原因之一。', 'Event-driven spike communication is one main reason brains and neuromorphic chips save energy.') },
  ],
  refs: ['thorpe1996', 'mainen1995', 'okeefe1993', 'vanrullen2005', 'grothe2010', 'shadlen1998', 'maass1997', 'neftci2019', 'bellec2020'],
}
