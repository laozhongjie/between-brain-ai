import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M04 Neuron models: a membrane that charges, leaks and fires, described at several levels of detail. */
export const NEURON_MODELS: MechEntry = {
  definition: b(
    '神经元的细胞膜像一个会漏电的电容：突触电流给它充电，膜电位升高；离子通道把电荷慢慢漏掉，膜电位回落。膜电位越过阈值时，钠通道迅速打开，产生一个约 1 毫秒的电脉冲（动作电位），随后膜电位复位。神经元模型就是用不同的详细程度描述这一过程，从离子通道方程到人工网络中的一个加权求和单元。',
    'A neuron’s membrane acts like a leaky capacitor. Synaptic current charges it and the membrane potential rises. Ion channels slowly leak the charge away and the potential falls back. When the potential crosses a threshold, sodium channels open quickly and produce the action potential, an electrical pulse of about 1 ms. Then the potential resets. Neuron models describe this process at different levels of detail, from ion channel equations to a weighted-sum unit in an artificial network.'),
  scale: b('单个神经元', 'A single neuron'),
  timescale: b('膜时间常数约 10 到 30 毫秒，一个脉冲约 1 毫秒', 'Membrane time constant of about 10 to 30 ms, one spike of about 1 ms'),
  steps: [
    {
      title: b('突触电流充电', 'Synaptic current charges the membrane'),
      points: [
        b('兴奋性突触的电流流入细胞，膜电位从约 $-70$ mV 开始升高。', 'Current from excitatory synapses flows in, and the membrane potential rises from about $-70$ mV.'),
        b('膜的电容决定同样的电流能让电位升多快。', 'The membrane’s capacitance sets how fast the same current raises the potential.'),
      ],
    },
    {
      title: b('漏电拉回静息', 'Leak pulls back to rest'),
      points: [
        b('常开的离子通道让电荷不断漏出，膜电位以时间常数 $\\tau_m = RC$ 回到静息值。', 'Channels that are always open let charge leak out, and the potential returns to rest with time constant $\\tau_m = RC$.'),
        b('所以神经元只「记得」大约最近 $\\tau_m$ 时间内的输入。', 'So the neuron only remembers its input over roughly the last $\\tau_m$.'),
      ],
    },
    {
      title: b('越过阈值产生脉冲', 'Crossing threshold fires a spike'),
      points: [
        b('膜电位升到约 $-55$ mV，电压门控钠通道成群打开，钠离子涌入，电位在不到 1 毫秒内冲到正值。', 'At about $-55$ mV, voltage-gated sodium channels open together, sodium rushes in, and the potential shoots positive within a millisecond.'),
        b('脉冲沿轴突传到所有输出突触，大小基本不变：「全或无」。', 'The spike travels along the axon to every output synapse at nearly the same size: all or none.'),
      ],
    },
    {
      title: b('复极化与不应期', 'Repolarization and refractory period'),
      points: [
        b('钾通道随后打开，把电位拉回；接下来约 1 到 2 毫秒内，钠通道处于失活状态，细胞不能再次放电。', 'Potassium channels then open and pull the potential back. For about 1 to 2 ms after that, sodium channels are inactivated and the cell cannot fire again.'),
        b('不应期给放电频率设了上限。', 'The refractory period sets an upper limit on firing rate.'),
      ],
    },
    {
      title: b('适应', 'Adaptation'),
      points: [
        b('许多神经元在持续输入下放电越来越慢，这是慢的钾电流逐渐积累造成的。', 'Many neurons fire more and more slowly under constant input, because slow potassium currents build up.'),
        b('不同类型的神经元有不同的离子通道组合，放电模式也不同：规则放电、成串放电、快速放电等。', 'Different types of neurons have different mixes of channels and different firing patterns, such as regular spiking, bursting and fast spiking.'),
      ],
    },
    {
      title: b('抽象的层次', 'Levels of abstraction'),
      points: [
        b('Hodgkin-Huxley 模型描述每种离子通道；积分发放模型只保留充电、漏电和阈值；放电率模型只保留输入与平均放电率的关系。', 'The Hodgkin and Huxley model describes each ion channel. Integrate-and-fire models keep only charging, leak and threshold. Rate models keep only the relation between input and mean firing rate.'),
        b('人工网络的单元是放电率模型的进一步简化：加权求和后经过一个非线性函数。', 'The unit of an artificial network simplifies the rate model further: a weighted sum passed through a nonlinear function.'),
      ],
    },
  ],
  notes: [
    b('Hodgkin 与 Huxley 在 1952 年用乌贼巨轴突的测量建立了动作电位的方程，并因此获得诺贝尔奖。', 'Hodgkin and Huxley built the equations of the action potential in 1952 from measurements on the squid giant axon, work that won a Nobel Prize.'),
    b('McCulloch 与 Pitts 在 1943 年把神经元抽象为阈值逻辑单元，这是人工神经元的起点。', 'McCulloch and Pitts abstracted the neuron as a threshold logic unit in 1943, the starting point of artificial neurons.'),
    b('Izhikevich（2003）和自适应指数积分发放模型（2005）用两个变量重现了皮层神经元的大多数放电模式，计算量远小于 Hodgkin-Huxley 模型。', 'The Izhikevich model, from 2003, and the adaptive exponential integrate-and-fire model, from 2005, use two variables. They reproduce most cortical firing patterns at far less cost than the Hodgkin and Huxley model.'),
    b('单个神经元的计算还依赖树突的非线性，点神经元模型没有包括这一部分（见[树突计算](card:dendrites)）。', 'A single neuron’s computation also depends on dendritic nonlinearity, which point-neuron models leave out (see [dendritic computation](card:dendrites)).'),
  ],
  counterpart: [
    b('ReLU 单元 $\\max(0, \\mathbf{w}^{\\top}\\mathbf{x} + b)$ 对应放电率模型：输入低于阈值时为 $0$，高于阈值时随输入增大，但没有上限，也没有膜的时间动态。', 'A ReLU unit $\\max(0, \\mathbf{w}^{\\top}\\mathbf{x} + b)$ corresponds to a rate model. It is $0$ below threshold and grows with input above it, but has no ceiling and no membrane dynamics.'),
    b('脉冲神经网络使用积分发放神经元，状态随时间变化，只在越过阈值时发出事件（见[脉冲与时间编码](card:spikes)）。', 'Spiking neural networks use integrate-and-fire neurons whose state changes over time and that emit events only when crossing threshold (see [spikes and temporal coding](card:spikes)).'),
    b('状态空间模型（如 Mamba）的每个通道带一个按指数衰减的状态，形式上与漏电的膜电位相似。', 'In state-space models such as Mamba, each channel carries a state that decays exponentially, similar in form to a leaky membrane potential.'),
  ],
  math: [
    {
      title: b('积分发放模型：恒定输入下的放电频率', 'Integrate-and-fire: firing rate under constant input'),
      tex: t`\tau_m\,\frac{dV}{dt} = -(V - V_{\text{rest}}) + R\,I,\qquad r(I) = \frac{1}{t_{\text{ref}} + \tau_m \ln\dfrac{R I}{R I - \theta}}\quad (R I > \theta)`,
      symbols: [
        { tex: t`V`, meaning: b('膜电位', 'membrane potential') },
        { tex: t`V_{\text{rest}}`, meaning: b('静息电位', 'resting potential') },
        { tex: t`\tau_m`, meaning: b('膜时间常数，等于膜电阻乘电容', 'membrane time constant, membrane resistance times capacitance') },
        { tex: t`R I`, meaning: b('恒定输入电流在膜上造成的电位升高', 'rise in potential caused by a constant input current') },
        { tex: t`\theta`, meaning: b('阈值与静息电位之差', 'distance from rest to threshold') },
        { tex: t`t_{\text{ref}}`, meaning: b('不应期', 'refractory period') },
        { tex: t`r`, meaning: b('放电频率', 'firing rate') },
      ],
      steps: [
        b('恒定输入下，膜电位从静息值出发，按指数向 $V_{\\text{rest}} + RI$ 逼近。', 'Under constant input, the potential starts at rest and approaches $V_{\\text{rest}} + RI$ exponentially.'),
        b('若 $RI$ 大于 $\\theta$，电位在时间 $\\tau_m \\ln\\frac{RI}{RI - \\theta}$ 后到达阈值，发出脉冲，复位后重复。', 'If $RI$ exceeds $\\theta$, the potential reaches threshold after $\\tau_m \\ln\\frac{RI}{RI - \\theta}$, fires, resets and repeats.'),
        b('一个周期等于这段时间加上不应期，放电频率是它的倒数；$RI \\le \\theta$ 时永远到不了阈值，频率为 $0$。', 'One cycle is this time plus the refractory period, and the rate is its inverse. With $RI \\le \\theta$ the threshold is never reached and the rate is $0$.'),
      ],
      example: b(
        '取 $\\tau_m = 20$ 毫秒、$t_{\\text{ref}} = 2$ 毫秒。$RI = 1.5\\,\\theta$ 时，到达阈值需要 $20 \\ln 3 \\approx 22$ 毫秒，周期约 $24$ 毫秒，频率约 $42$ Hz。$RI = 1.1\\,\\theta$ 时需要 $20 \\ln 11 \\approx 48$ 毫秒，频率约 $20$ Hz。$RI = 3\\,\\theta$ 时约 $99$ Hz。',
        'Take $\\tau_m = 20$ ms and $t_{\\text{ref}} = 2$ ms. At $RI = 1.5\\,\\theta$, reaching threshold takes $20 \\ln 3 \\approx 22$ ms. A cycle is about $24$ ms and the rate is about $42$ Hz. At $RI = 1.1\\,\\theta$ it takes $20 \\ln 11 \\approx 48$ ms, about $20$ Hz. At $RI = 3\\,\\theta$ the rate is about $99$ Hz.'),
      consequences: [
        b('输入刚过阈值时，频率随输入陡然上升；输入很大时，频率受不应期限制，趋于 $1/t_{\\text{ref}}$。', 'Just above threshold the rate climbs steeply with input. For large input it is limited by the refractory period and approaches $1/t_{\\text{ref}}$.'),
        b('ReLU 只保留了「阈值以下为零、以上随输入增大」这一点，丢掉了陡升和饱和。', 'ReLU keeps only zero below threshold and growth above it, and drops the steep rise and the saturation.'),
      ],
      limitations: [
        b('没有离子通道的细节，脉冲的形状、适应和成串放电都不能描述。', 'There are no ion channel details, so spike shape, adaptation and bursting cannot be described.'),
        b('恒定输入是理想化的；真实输入有涨落，阈值以下也会因噪声偶尔放电。', 'Constant input is idealized. Real input fluctuates, and noise causes occasional spikes even below threshold.'),
      ],
    },
  ],
  elsewhere: [],
  conditions: [
    b('积分发放模型能较好地预测皮层神经元对注入电流的放电时间，但对树突上的输入预测较差。', 'Integrate-and-fire models predict fairly well when cortical neurons fire in response to injected current, but less well for input arriving on dendrites.'),
    b('选择哪个层次的模型取决于问题：研究网络动力学常用积分发放或放电率模型，研究药物或疾病需要离子通道模型。', 'The right level depends on the question. Network dynamics often use integrate-and-fire or rate models, while drugs and disease need ion channel models.'),
    b('不同类型神经元的参数差别很大，同一组参数不能代表所有神经元。', 'Parameters differ greatly between neuron types, so one parameter set cannot stand for all neurons.'),
  ],
  uses: [
    { to: 'topic:efficiency', role: b('积分发放神经元是神经形态芯片的基本单元，只在越过阈值时发出事件。', 'Integrate-and-fire neurons are the basic unit of neuromorphic chips and emit events only at threshold crossings.') },
    { to: 'topic:auditory-scene', role: b('膜时间常数和阈值决定神经元能跟上多快的声音变化，听觉通路中有时间常数极短的神经元。', 'Membrane time constant and threshold decide how fast a neuron can follow sound, and the auditory pathway has neurons with very short time constants.') },
    { to: 'topic:visual-recognition', role: b('视觉模型中的单元通常用放电率模型或 ReLU 近似皮层神经元。', 'Units in vision models usually approximate cortical neurons with rate models or ReLU.') },
  ],
  refs: ['hodgkin1952', 'mcculloch1943', 'rosenblatt1958', 'izhikevich2003', 'brette2005', 'gerstner2014', 'maass1997', 'gu2023'],
}
