import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M06 Excitation, inhibition and cell types: separate excitatory and inhibitory populations that keep circuits stable. */
export const EI_CELLTYPES: MechEntry = {
  definition: b(
    '皮层的神经元分成两大类：约 80% 是兴奋性的锥体细胞，释放谷氨酸，使下游更容易放电；约 20% 是抑制性的中间神经元，释放 GABA，使下游更难放电。抑制性神经元又分成几种，各自连在锥体细胞的不同部位，分别控制输出、输入和其他抑制性细胞。兴奋与抑制大致平衡，回路才能既灵敏又不失控。',
    'Cortical neurons fall into two classes. About 80% are excitatory pyramidal cells that release glutamate and make targets more likely to fire. About 20% are inhibitory interneurons that release GABA and make targets less likely to fire. Inhibitory cells come in several types that contact different parts of pyramidal cells and control output, input or other inhibitory cells. Only with excitation and inhibition roughly balanced is a circuit both sensitive and under control.'),
  scale: b('皮层微环路：数百到数千个神经元', 'Cortical microcircuits of hundreds to thousands of neurons'),
  timescale: b('抑制在数毫秒内跟上兴奋', 'Inhibition follows excitation within milliseconds'),
  steps: [
    {
      title: b('兴奋性锥体细胞', 'Excitatory pyramidal cells'),
      points: [
        b('锥体细胞彼此兴奋，并把输出送到其他脑区；它们之间的循环兴奋能放大输入。', 'Pyramidal cells excite each other and send output to other areas. Recurrent excitation among them amplifies input.'),
        b('按 Dale 原理，一个神经元的所有输出都是同一个符号。', 'By Dale’s principle, all outputs of a neuron have the same sign.'),
      ],
    },
    {
      title: b('PV 细胞控制输出', 'PV cells control output'),
      points: [
        b('表达小清蛋白（PV）的快速放电细胞连在锥体细胞的胞体附近，快速、强力地抑制它的放电。', 'Fast-spiking cells that express parvalbumin (PV) contact pyramidal cells near the soma and inhibit their firing quickly and strongly.'),
        b('它们紧跟兴奋的增加而增加，防止活动失控，也参与产生 $\\gamma$ 振荡。', 'They rise right after excitation rises, which keeps activity from running away, and they help produce gamma oscillations.'),
      ],
    },
    {
      title: b('SST 细胞控制输入', 'SST cells control input'),
      points: [
        b('表达生长抑素（SST）的细胞连在锥体细胞的树突上，调节某一类输入能否进入细胞。', 'Cells that express somatostatin (SST) contact the dendrites of pyramidal cells and regulate whether a class of input gets in.'),
      ],
    },
    {
      title: b('VIP 细胞解除抑制', 'VIP cells release inhibition'),
      points: [
        b('表达血管活性肠肽（VIP）的细胞主要抑制 SST 细胞，从而解除对锥体细胞的抑制。', 'Cells that express vasoactive intestinal peptide (VIP) mainly inhibit SST cells, which releases the inhibition on pyramidal cells.'),
        b('运动、注意等自上而下的信号常常通过 VIP 细胞起作用，打开某个回路。', 'Top-down signals such as locomotion and attention often act through VIP cells to open a circuit.'),
      ],
    },
    {
      title: b('平衡与抑制稳定', 'Balance and inhibitory stabilization'),
      points: [
        b('兴奋和抑制的输入大致相等、相互抵消，神经元停在阈值附近，对输入的小变化反应很快。', 'Excitatory and inhibitory input are roughly equal and cancel, so neurons sit near threshold and respond fast to small changes.'),
        b('当兴奋性的循环连接强到单独会失控时，网络靠抑制维持稳定，这类网络称为抑制稳定网络。', 'When recurrent excitation is strong enough to run away on its own, the network relies on inhibition to stay stable. Such a network is called inhibition-stabilized.'),
      ],
    },
    {
      title: b('反直觉的效应', 'A counterintuitive effect'),
      points: [
        b('在抑制稳定网络中，直接兴奋抑制性细胞，反而会让它们的放电下降。', 'In an inhibition-stabilized network, exciting the inhibitory cells directly makes their firing go down.'),
        b('这个预测在猫视觉皮层的实验中得到了支持，成为检验皮层处于何种状态的一种方法。', 'This prediction was supported in cat visual cortex and became one test of which regime cortex is in.'),
      ],
    },
  ],
  notes: [
    b('抑制性中间神经元的类型超过数十种，PV、SST 和 VIP 三类合计约占皮层抑制性细胞的大部分。', 'There are dozens of types of inhibitory interneurons. Together, PV, SST and VIP cells make up most cortical inhibitory cells.'),
    b('2013 年的连接组研究发现，PV 细胞主要抑制彼此和锥体细胞，SST 细胞抑制除自己以外的所有类型，VIP 细胞主要抑制 SST 细胞。', 'A 2013 connectivity study found that PV cells mainly inhibit each other and pyramidal cells. SST cells inhibit every type except their own, and VIP cells mainly inhibit SST cells.'),
    b('van Vreeswijk 与 Sompolinsky 在 1996 年提出平衡网络理论：强的兴奋与强的抑制相互抵消，网络中的放电自然呈现不规则的模式。', 'Van Vreeswijk and Sompolinsky proposed balanced network theory in 1996. Strong excitation and strong inhibition cancel, and firing in the network becomes naturally irregular.'),
    b('1997 年的理论首先指出了抑制稳定网络中的「反直觉」效应，2009 年在猫视觉皮层的周边抑制实验中得到了支持。', 'Theory in 1997 first pointed out the counterintuitive effect in inhibition-stabilized networks, and 2009 surround suppression experiments in cat visual cortex supported it.'),
  ],
  counterpart: [
    b('主流网络的单元都相同，同一个单元的输出权重可正可负，没有兴奋与抑制之分。', 'In mainstream networks all units are alike, and one unit’s output weights can be positive or negative, with no excitatory or inhibitory class.'),
    b('LayerNorm、softmax 等运算承担了部分抑制在大脑中的功能：限制活动的总量、让单元之间相互竞争（见[除法归一化](card:normalization)）。', 'Operations such as LayerNorm and softmax take over part of what inhibition does: limiting total activity and making units compete (see [divisive normalization](card:normalization)).'),
    b('一些研究训练遵守 Dale 原理的循环网络，用来比较网络和皮层的活动。', 'Some studies train recurrent networks that obey Dale’s principle in order to compare their activity with cortex.'),
  ],
  math: [
    {
      title: b('抑制稳定网络：多给抑制性细胞输入，它们的放电反而下降', 'Inhibition-stabilized network: more input to inhibitory cells lowers their firing'),
      tex: t`\tau_E\,\dot{r}_E = -r_E + W_{EE}\,r_E - W_{EI}\,r_I + I_E,\qquad \tau_I\,\dot{r}_I = -r_I + W_{IE}\,r_E - W_{II}\,r_I + I_I,\qquad \frac{\partial r_I}{\partial I_I} = \frac{1 - W_{EE}}{\Delta}`,
      symbols: [
        { tex: t`r_E,\;r_I`, meaning: b('兴奋性和抑制性群体的放电率', 'firing rates of the excitatory and inhibitory populations') },
        { tex: t`W_{EE}`, meaning: b('兴奋性细胞之间的循环兴奋强度', 'strength of recurrent excitation among excitatory cells') },
        { tex: t`W_{EI},\;W_{IE},\;W_{II}`, meaning: b('抑制到兴奋、兴奋到抑制、抑制到抑制的连接强度', 'strengths from inhibition to excitation, excitation to inhibition and inhibition to inhibition') },
        { tex: t`I_E,\;I_I`, meaning: b('两个群体的外部输入', 'external input to each population') },
        { tex: t`\Delta`, meaning: b('$(1 - W_{EE})(1 + W_{II}) + W_{EI}W_{IE}$，网络稳定时为正', '$(1 - W_{EE})(1 + W_{II}) + W_{EI}W_{IE}$, positive when the network is stable') },
      ],
      steps: [
        b('令两个方程左边为零，得到稳态下的两个线性方程。', 'Set both left sides to zero to get two linear equations for the steady state.'),
        b('解出 $r_I = \\big(W_{IE} I_E + (1 - W_{EE}) I_I\\big)/\\Delta$。', 'Solve for $r_I = \\big(W_{IE} I_E + (1 - W_{EE}) I_I\\big)/\\Delta$.'),
        b('$I_I$ 前的系数 $(1 - W_{EE})/\\Delta$ 在 $W_{EE} > 1$ 时为负：兴奋性的循环连接强到单独会失控时，增加抑制性细胞的输入反而降低它们的放电。', 'The coefficient of $I_I$, $(1 - W_{EE})/\\Delta$, is negative when $W_{EE} > 1$. When recurrent excitation would run away on its own, more input to inhibitory cells lowers their firing.'),
      ],
      example: b(
        '取 $W_{EE} = 2$、$W_{EI} = W_{IE} = 2$、$W_{II} = 1$、$I_E = 2$，则 $\\Delta = (1 - 2)(2) + 4 = 2$。$I_I = 0$ 时 $r_E = r_I = 2$。把 $I_I$ 加到 $1$：$r_I = (4 - 1)/2 = 1.5$，$r_E = (4 - 2)/2 = 1$，两者都下降。原因是抑制先压低了兴奋性细胞，兴奋性细胞再少给抑制性细胞输入，后者的净输入反而减少。',
        'Take $W_{EE} = 2$, $W_{EI} = W_{IE} = 2$, $W_{II} = 1$ and $I_E = 2$, so $\\Delta = (1 - 2)(2) + 4 = 2$. With $I_I = 0$, $r_E = r_I = 2$. Raising $I_I$ to $1$ gives $r_I = (4 - 1)/2 = 1.5$ and $r_E = (4 - 2)/2 = 1$, both lower. Inhibition first pushes the excitatory cells down. They then send less to the inhibitory cells, whose net input falls.'),
      consequences: [
        b('抑制性细胞的放电变化方向可以检验皮层是否处于抑制稳定状态；视觉皮层的实验支持这一点。', 'The direction in which inhibitory firing changes tests whether cortex is inhibition-stabilized, and visual cortex experiments support that it is.'),
        b('强的循环兴奋带来放大和灵敏，代价是必须依靠快速的抑制保持稳定。', 'Strong recurrent excitation brings amplification and sensitivity at the price of relying on fast inhibition for stability.'),
      ],
      limitations: [
        b('只有一个兴奋性和一个抑制性群体，忽略了 PV、SST、VIP 等抑制类型的差别。', 'There is only one excitatory and one inhibitory population, ignoring the differences between PV, SST and VIP types.'),
        b('模型是线性的，只在放电率为正、远离饱和的范围内成立。', 'The model is linear and holds only where rates are positive and far from saturation.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('注意的归一化模型：注意乘上刺激驱动，再除以周围活动', 'The normalization model of attention: attention multiplies the drive, then divides by surrounding activity'), to: 'topic:attention-gating' },
  ],
  conditions: [
    b('抑制稳定状态在视觉皮层中有较多证据，在其他脑区和不同行为状态下是否成立还不清楚。', 'The inhibition-stabilized regime has good evidence in visual cortex. Whether it holds in other areas and behavioral states is unclear.'),
    b('PV、SST、VIP 的功能分工是一种简化，每一类内部还有多种亚型，连接也因脑区而异。', 'The division of labor among PV, SST and VIP is a simplification. Each class has several subtypes, and connections vary between areas.'),
    b('兴奋与抑制在多快的时间尺度上平衡，以及平衡被打破时的作用，仍在研究。', 'How fast excitation and inhibition balance, and what happens when the balance breaks, are still being studied.'),
  ],
  uses: [
    { to: 'topic:attention-gating', role: b('注意通过调节抑制性细胞改变感觉输入的增益，VIP 细胞的解除抑制是一种可能的通路。', 'Attention changes the gain of sensory input by regulating inhibitory cells, and VIP disinhibition is one possible route.') },
    { to: 'topic:visual-recognition', role: b('视觉皮层的周边抑制依赖抑制稳定的回路：周围的刺激让中心神经元的反应变弱。', 'Surround suppression in visual cortex relies on inhibition-stabilized circuits, so a surrounding stimulus weakens the center neuron’s response.') },
    { to: 'topic:working-memory', role: b('循环兴奋维持持续放电，抑制防止活动扩散到不相关的神经元。', 'Recurrent excitation sustains firing, and inhibition keeps activity from spreading to unrelated neurons.') },
  ],
  refs: ['tremblay2016', 'pfeffer2013', 'vanvreeswijk1996', 'tsodyks1997isn', 'ozeki2009', 'song2016', 'carandini2012'],
}
