import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M09 Structural plasticity: synapses that form and disappear, so which connections exist also stores information. */
export const STRUCTURAL_PLASTICITY: MechEntry = {
  definition: b(
    '结构可塑性是指突触本身的生成和消失，而不只是已有突触强度的变化。在皮层中，轴突和树突在许多位置彼此靠近，每个这样的位置都可能长出一个突触；实际只有一部分位置有突触。树突棘（突触后的小突起）在几天内不断出现和消失，学习会让其中一部分稳定下来。「哪些连接存在」因此本身就能存储信息。',
    'Structural plasticity is the formation and loss of synapses themselves, not only changes in the strength of existing ones. In cortex, axons and dendrites pass close to each other at many places, and each such place could grow a synapse, but only some do. Dendritic spines, the small postsynaptic protrusions, keep appearing and disappearing over days, and learning stabilizes some of them. Which connections exist can therefore store information by itself.'),
  scale: b('单个树突棘到整片皮层的连接', 'From single dendritic spines to the wiring of a cortical area'),
  timescale: b('数小时到数月，发育期更快', 'Hours to months, faster in development'),
  steps: [
    {
      title: b('潜在的连接位置', 'Potential connection sites'),
      points: [
        b('轴突经过树突附近、距离小于约 2 微米的地方，都是可能形成突触的位置。', 'Wherever an axon passes within about 2 micrometers of a dendrite, a synapse could form.'),
        b('皮层中实际形成突触的只占这些位置的一小部分。', 'In cortex, synapses form at only a small fraction of these sites.'),
      ],
    },
    {
      title: b('树突棘不断出现和消失', 'Spines keep appearing and disappearing'),
      points: [
        b('活体成像显示，成年小鼠皮层中每天都有一部分树突棘新生、一部分消失。', 'Imaging in living animals shows that in adult mouse cortex some spines form and some vanish every day.'),
        b('新生的树突棘大多只存在几天，少数会长期保留。', 'Most new spines last only a few days, and a few persist for a long time.'),
      ],
    },
    {
      title: b('学习让新连接稳定', 'Learning stabilizes new connections'),
      points: [
        b('学习一项新的运动技能后，运动皮层很快长出新的树突棘，其中一部分在之后几个月都保留着。', 'After learning a new motor skill, motor cortex quickly grows new spines, and some of them stay for months.'),
        b('被反复使用的连接被保留，不被使用的被移除。', 'Connections in repeated use are kept, and unused ones are removed.'),
      ],
    },
    {
      title: b('发育中的过量生成与修剪', 'Overproduction and pruning in development'),
      points: [
        b('发育早期先形成大量突触，之后按活动修剪掉其中相当一部分；小胶质细胞参与吞噬被淘汰的突触。', 'Early development forms many synapses, and a large share is later pruned by activity. Microglia help engulf the synapses that lose out.'),
        b('关键期内的修剪决定了视觉等系统的长期连接（见[发育阶段与学习顺序](topic:developmental-stages)）。', 'Pruning during critical periods sets the long-term wiring of systems such as vision (see [developmental stages and learning order](topic:developmental-stages)).'),
      ],
    },
    {
      title: b('连接的有无存储信息', 'The presence of connections stores information'),
      points: [
        b('一个神经元从众多潜在位置中「选择」哪些形成突触，可以携带比单纯改变强度更多的信息。', 'Which of many potential sites a neuron chooses to connect can carry more information than changing strengths alone.'),
      ],
    },
    {
      title: b('长期记忆的一种载体', 'One carrier of long-term memory'),
      points: [
        b('新生并保留下来的树突棘与长期保持的记忆相关；实验中去除这些树突棘会损害已学会的技能。', 'Spines that form and stay are linked to memories kept for a long time. Removing these spines in experiments impairs a learned skill.'),
      ],
    },
  ],
  notes: [
    b('2002 年的几何分析估计，皮层中实际形成的突触约占潜在位置的 $0.2$ 到 $0.3$，这一比例称为「填充率」。', 'A 2002 geometric analysis estimated that actual synapses in cortex fill about $0.2$ to $0.3$ of the potential sites, a ratio called the filling fraction.'),
    b('2005 年对小鼠皮层的长期成像把树突棘分成「短暂」和「持久」两类：短暂的只存在几天，持久的可保持数月。', 'Long-term imaging of mouse cortex in 2005 divided spines into transient ones that last days and persistent ones that last months.'),
    b('2009 年的两项研究发现，学习运动任务后形成的少量树突棘能保持很久，并与技能的保持相关。', 'Two 2009 studies found that a few spines formed after motor learning persist for a long time. They relate to retention of the skill.'),
    b('2012 年的研究表明，发育中小胶质细胞依赖补体信号吞噬活动较弱的突触。', 'A 2012 study showed that in development microglia engulf less active synapses through complement signaling.'),
  ],
  counterpart: [
    b('剪枝在训练后去掉幅度小的权重，「彩票假说」发现剪枝后的稀疏子网络可以从原始初值重新训练到相近的精度。', 'Pruning removes small weights after training. The lottery ticket hypothesis found that the sparse subnetwork left can be retrained from its original initialization to similar accuracy.'),
    b('动态稀疏训练（如 SET、RigL）在训练中不断删除弱连接、在别处长出新连接，保持连接总数不变，与结构可塑性在形式上最接近。', 'Dynamic sparse training, such as SET and RigL, keeps deleting weak connections and growing new ones elsewhere at a fixed total. This is closest in form to structural plasticity.'),
    b('主流大模型的连接结构在训练开始前就已固定，学习只改变权重的大小。', 'In mainstream large models the wiring is fixed before training begins, and learning changes only the sizes of the weights.'),
  ],
  math: [
    {
      title: b('连接的选择能存多少信息：从潜在位置中选出实际突触', 'How much information the choice of connections holds: picking actual synapses from potential sites'),
      tex: t`I = \log_2 \binom{N}{fN} \approx N\,H(f),\qquad H(f) = -f\log_2 f - (1 - f)\log_2(1 - f),\qquad \frac{I}{fN} \approx \frac{H(f)}{f}`,
      symbols: [
        { tex: t`N`, meaning: b('一个神经元的潜在连接位置数', 'number of potential connection sites of a neuron') },
        { tex: t`f`, meaning: b('填充率：实际形成突触的比例', 'filling fraction: the share of sites that form synapses') },
        { tex: t`fN`, meaning: b('实际的突触数', 'number of actual synapses') },
        { tex: t`I`, meaning: b('「选哪些位置」这件事能区分的连接方式所对应的比特数', 'bits needed to tell apart the possible choices of sites') },
        { tex: t`H(f)`, meaning: b('每个潜在位置「有或没有」的信息量', 'information per potential site, present or absent') },
        { tex: t`I/(fN)`, meaning: b('平均每个实际突触携带的比特数', 'average bits carried per actual synapse') },
      ],
      steps: [
        b('从 $N$ 个潜在位置中选 $fN$ 个形成突触，共有 $\\binom{N}{fN}$ 种选法。', 'Choosing $fN$ of $N$ potential sites for synapses can be done in $\\binom{N}{fN}$ ways.'),
        b('区分这么多种选法需要 $\\log_2\\binom{N}{fN}$ 比特，$N$ 较大时约为 $N\\,H(f)$。', 'Telling them apart takes $\\log_2\\binom{N}{fN}$ bits, about $N\\,H(f)$ for large $N$.'),
        b('除以实际突触数，得到平均每个突触由「存在与否」携带的信息，与它的强度携带的信息相加。', 'Dividing by the number of actual synapses gives the average information each carries by existing, on top of what its strength carries.'),
      ],
      example: b(
        '$10$ 个潜在位置、其中 $3$ 个有突触：$\\binom{10}{3} = 120$ 种选法，约 $6.9$ 比特，平均每个突触约 $2.3$ 比特。$1000$ 个潜在位置、填充率 $0.25$：$I \\approx 1000 \\times 0.81 = 811$ 比特，$250$ 个突触平均每个约 $3.2$ 比特。填充率越低，每个突触携带的信息越多，但潜在位置的总信息在 $f = 0.5$ 时最大。',
        'With $10$ potential sites and $3$ synapses there are $\\binom{10}{3} = 120$ choices, about $6.9$ bits, or about $2.3$ bits per synapse. With $1000$ sites and a filling fraction of $0.25$, $I \\approx 1000 \\times 0.81 = 811$ bits. That is about $3.2$ bits for each of the $250$ synapses. The lower the filling fraction, the more each synapse carries, while the total over sites peaks at $f = 0.5$.'),
      consequences: [
        b('在填充率较低的皮层中，形成或撤除连接为每个突触增加了数个比特的存储，是突触强度之外的另一种存储方式。', 'In cortex, where the filling fraction is low, forming or removing connections adds several bits of storage per synapse. This is storage beyond synaptic strength.'),
        b('这种存储变化慢、耗能少、不易被新的学习覆盖，适合长期记忆。', 'This storage changes slowly, costs little energy and is hard for new learning to overwrite, which suits long-term memory.'),
      ],
      limitations: [
        b('计算假设所有潜在位置等价、可以任意选择；真实的选择受轴突走向和细胞类型限制。', 'The count assumes all potential sites are equivalent and freely chosen. Real choices are limited by axon paths and cell types.'),
        b('这是信息容量的上限，大脑实际利用了多少并不清楚。', 'This is an upper bound on capacity, and how much the brain actually uses is unclear.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('眼优势竞争：两只眼的输入争夺有限的连接', 'Ocular dominance: inputs from the two eyes compete for limited connections'), to: 'topic:developmental-stages' },
    { title: b('基因组瓶颈：基因组的信息量远小于写下全部连接所需', 'Genomic bottleneck: the genome holds far less information than writing out every connection'), to: 'topic:innate-constraints' },
  ],
  conditions: [
    b('树突棘的数量与突触基本对应，但并非所有突触都在树突棘上，抑制性突触的结构变化研究较少。', 'Spine counts largely track synapses, but not all synapses sit on spines, and structural change of inhibitory synapses is less studied.'),
    b('成年后结构变化的速率随脑区、年龄和经验而异，多数数据来自小鼠的感觉和运动皮层。', 'The rate of structural change in adults varies with area, age and experience, and most data come from mouse sensory and motor cortex.'),
    b('新生树突棘与记忆的因果关系有直接实验支持，但它们承担了多少长期记忆仍有争议。', 'The causal link between new spines and memory has direct experimental support, but how much long-term memory they carry is debated.'),
  ],
  uses: [
    { to: 'topic:developmental-stages', role: b('关键期内的过量生成与按活动修剪，决定了感觉系统的长期连接。', 'Overproduction and activity-based pruning in critical periods set the long-term wiring of sensory systems.') },
    { to: 'topic:skill-learning', role: b('学习运动技能后新生并保留的树突棘与技能的长期保持相关。', 'Spines formed and kept after motor learning relate to long-term retention of the skill.') },
    { to: 'topic:continual-learning', role: b('为新知识长出新连接、保留旧连接，可能减少新学习对旧记忆的覆盖。', 'Growing new connections for new knowledge while keeping old ones may reduce how much new learning overwrites old memory.') },
  ],
  refs: ['holtmaat2009', 'holtmaat2005', 'stepanyants2002', 'chklovskii2004', 'xu2009', 'yang2009', 'hayashitakagi2015', 'schafer2012', 'hensch2005', 'frankle2019', 'mocanu2018', 'evci2020'],
}
