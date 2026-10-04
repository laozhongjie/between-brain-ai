import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M03 Synaptic consolidation: an early, labile change becomes lasting once tagged synapses capture new proteins. */
export const CONSOLIDATION: MechEntry = {
  definition: b(
    '突触巩固是突触变化从「暂时」变成「持久」的过程。学习刚发生时，突触的增强只靠已有蛋白的修饰，几小时内就会消退；只有当细胞合成新的蛋白，并被送到这个突触上，增强才能维持数天以上。突触标记与捕获假说认为，被激活的突触先留下一个标记，之后再捕获胞体合成的蛋白。',
    'Synaptic consolidation is the process by which a synaptic change goes from temporary to lasting. Right after learning, potentiation relies only on modifying existing proteins and fades within hours. Only when the cell makes new proteins and delivers them to the synapse does it last for days or longer. The synaptic tagging and capture hypothesis holds that an activated synapse first sets a tag and later captures proteins made in the cell body.'),
  scale: b('单个突触与它所在的神经元', 'A single synapse and the neuron it belongs to'),
  timescale: b('早期变化持续 1 到 3 小时，巩固后持续数天以上', 'Early changes last 1 to 3 hours, consolidated ones days or longer'),
  steps: [
    {
      title: b('早期增强', 'Early potentiation'),
      points: [
        b('一次刺激通过修饰已有的蛋白和插入受体增强突触，不需要新的蛋白。', 'A stimulus strengthens the synapse by modifying existing proteins and inserting receptors, with no new proteins.'),
        b('这种增强在 1 到 3 小时内消退。', 'This potentiation fades within 1 to 3 hours.'),
      ],
    },
    {
      title: b('设置标记', 'Setting a tag'),
      points: [
        b('被激活的突触同时留下一个局部的、会衰减的标记，表示「这里刚刚变过」。', 'The activated synapse also sets a local tag that decays, marking that it has just changed.'),
        b('弱刺激就足以设置标记，但不足以引起蛋白合成。', 'A weak stimulus is enough to set a tag but not to start protein synthesis.'),
      ],
    },
    {
      title: b('强刺激引起蛋白合成', 'A strong stimulus starts protein synthesis'),
      points: [
        b('强刺激或多巴胺等神经调质的信号让细胞启动基因表达，合成与可塑性相关的蛋白。', 'A strong stimulus, or a signal from a neuromodulator such as dopamine, makes the cell start gene expression and make plasticity-related proteins.'),
        b('这些蛋白沿树突运输，可以到达同一个神经元上的许多突触。', 'These proteins travel along the dendrites and can reach many synapses on the same neuron.'),
      ],
    },
    {
      title: b('标记捕获蛋白', 'Tags capture proteins'),
      points: [
        b('只有仍带着标记的突触能捕获这些蛋白，把早期增强转为持久增强。', 'Only synapses still carrying a tag can capture these proteins, turning early potentiation into lasting potentiation.'),
        b('没有标记的突触即使拿到蛋白也不会改变，标记过期的突触则回到原来的强度。', 'Synapses without a tag do not change even if proteins arrive, and synapses whose tag has expired return to their old strength.'),
      ],
    },
    {
      title: b('弱经历借强经历留下', 'A weak experience lasts with help from a strong one'),
      points: [
        b('一个本来会被忘掉的弱经历，如果前后一两个小时内有一个强的或新奇的经历，也可能被记住。', 'A weak experience that would be forgotten may be remembered if a strong or novel experience comes within an hour or two before or after.'),
      ],
    },
    {
      title: b('之后的系统巩固', 'Systems consolidation afterward'),
      points: [
        b('突触巩固在几小时内完成；记忆从海马转到新皮层的系统巩固需要数天到数年，依赖睡眠中的回放（见[巩固、回放与遗忘](topic:consolidation-replay)）。', 'Synaptic consolidation finishes within hours. Systems consolidation, the move of memories from hippocampus to neocortex, takes days to years and relies on replay in sleep (see [consolidation, replay and forgetting](topic:consolidation-replay)).'),
      ],
    },
  ],
  notes: [
    b('Frey 与 Morris 在 1997 年用大鼠海马脑片证明：一条通路上的弱刺激本来只引起早期增强，若一小时内另一条通路受到强刺激，弱刺激的增强也能持久。', 'In 1997 Frey and Morris used rat hippocampal slices. Weak stimulation of one pathway alone gave only early potentiation, but it lasted if another pathway got strong stimulation within an hour.'),
    b('强刺激在弱刺激之前或之后都能起作用，但间隔超过约 3 小时后效果消失，说明标记和蛋白都只存在有限的时间。', 'Strong stimulation works before or after the weak one, but the effect vanishes beyond about 3 hours. Both tags and proteins exist only for a limited time.'),
    b('在动物行为中也观察到类似现象：一次新奇的体验可以让前后不久的弱学习被长期记住，这被称为「行为标记」。', 'A similar effect appears in behavior. A novel experience can make weak learning shortly before or after it last, which is called behavioral tagging.'),
    b('突触巩固与持续学习中的突触级联模型相关：后者用多个时间尺度的变量描述同一种「先快后慢」的转移（见[持续学习](topic:continual-learning)）。', 'Synaptic consolidation relates to cascade models of synapses in continual learning, which describe the same fast-then-slow transfer with variables on several timescales (see [continual learning](topic:continual-learning)).'),
  ],
  counterpart: [
    b('EWC 和 Synaptic Intelligence 为每个参数估计一个「重要性」，学新任务时保护重要的参数，功能上类似给突触打上「需要保留」的标记。', 'EWC and Synaptic Intelligence estimate an importance for each parameter and protect important ones while learning a new task. This is functionally like tagging synapses to keep.'),
    b('快慢两套权重的模型让一套权重快速变化、逐渐衰减，另一套缓慢地吸收其中稳定的部分。', 'Models with fast and slow weights let one set change quickly and decay while the other slowly absorbs what stays stable.'),
    b('这些方法的重要性由梯度或损失计算，而不是由后来的强事件或奖赏决定。', 'In these methods importance comes from gradients or loss, not from a later strong event or reward.'),
  ],
  math: [
    {
      title: b('标记与捕获（示意）：两者在时间上重叠越多，越可能巩固', 'Tagging and capture (schematic): the more the two overlap in time, the more likely consolidation is'),
      tex: t`C(\Delta) = \frac{1}{Z}\int_{0}^{\infty} T(t)\,P(t)\,dt,\qquad T(t) = e^{-t/\tau_T},\qquad P(t) = e^{-(t - \Delta)/\tau_P}\ \ (t \ge \Delta)`,
      symbols: [
        { tex: t`T(t)`, meaning: b('弱刺激在 $t = 0$ 时设置的标记，随时间衰减', 'tag set by the weak stimulus at $t = 0$, decaying over time') },
        { tex: t`P(t)`, meaning: b('强刺激在 $t = \\Delta$ 时引起的可塑性蛋白，随时间衰减', 'plasticity proteins triggered by the strong stimulus at $t = \\Delta$, decaying over time') },
        { tex: t`\Delta`, meaning: b('强刺激相对弱刺激的时间（小时），可正可负', 'time of the strong stimulus relative to the weak one, in hours, positive or negative') },
        { tex: t`\tau_T,\;\tau_P`, meaning: b('标记和蛋白的存在时间，例中取 $1.5$ 和 $2$ 小时', 'lifetimes of tag and proteins, $1.5$ and $2$ hours in the example') },
        { tex: t`Z`, meaning: b('归一化常数，使同时发生时 $C = 1$', 'normalizing constant so that $C = 1$ when both happen together') },
        { tex: t`C`, meaning: b('捕获的程度，近似为弱刺激的增强被巩固的可能性', 'degree of capture, roughly the chance that the weak potentiation is consolidated') },
      ],
      steps: [
        b('弱刺激在 $t = 0$ 设置标记，标记按 $\\tau_T$ 衰减。', 'The weak stimulus sets a tag at $t = 0$, which decays with $\\tau_T$.'),
        b('强刺激在 $t = \\Delta$ 引起蛋白合成，蛋白按 $\\tau_P$ 衰减；$\\Delta$ 为负表示强刺激在前。', 'The strong stimulus starts protein synthesis at $t = \\Delta$, and the proteins decay with $\\tau_P$. A negative $\\Delta$ means the strong stimulus came first.'),
        b('捕获只在两者同时存在时发生，所以捕获量等于两条曲线乘积的积分。积分可以直接算出：强刺激在后时 $C = e^{-\\Delta/\\tau_T}$，在前时 $C = e^{\\Delta/\\tau_P}$。', 'Capture happens only while both exist, so it equals the integral of the product of the two curves. The integral has a closed form: $C = e^{-\\Delta/\\tau_T}$ when the strong stimulus comes later and $C = e^{\\Delta/\\tau_P}$ when it comes first.'),
      ],
      example: b(
        '取 $\\tau_T = 1.5$、$\\tau_P = 2$ 小时。强刺激在弱刺激之后 $1$ 小时：$C = e^{-1/1.5} \\approx 0.51$；之后 $3$ 小时：$C \\approx 0.14$。强刺激在之前 $1$ 小时：$C = e^{-1/2} \\approx 0.61$。间隔越长，能被捕获的越少，几个小时后几乎为零。',
        'Take $\\tau_T = 1.5$ and $\\tau_P = 2$ hours. A strong stimulus $1$ hour after the weak one gives $C = e^{-1/1.5} \\approx 0.51$, and $3$ hours after gives $C \\approx 0.14$. One hour before gives $C = e^{-1/2} \\approx 0.61$. The longer the gap, the less is captured, and after a few hours almost nothing.'),
      consequences: [
        b('巩固取决于前后几个小时内发生了什么，而不只取决于学习的那一刻。', 'Consolidation depends on what happens in the hours around learning, not only on the moment of learning.'),
        b('蛋白是一个细胞内共享的有限资源，同一时间窗内的多个弱经历会竞争它。', 'Proteins are a limited resource shared within a cell, so several weak experiences in the same window compete for them.'),
      ],
      limitations: [
        b('这是一个示意模型：标记和蛋白的真实时间进程不是简单的指数，参数也因实验而异。', 'This is a schematic model. The real time courses of tags and proteins are not simple exponentials, and the parameters differ between experiments.'),
        b('标记和可塑性蛋白的分子身份仍不完全清楚。', 'The molecular identity of tags and plasticity proteins is not fully known.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('突触级联：记忆从快变量逐步流向慢变量', 'Synaptic cascade: memory flows from fast variables to slow ones'), to: 'topic:continual-learning' },
    { title: b('EWC：给对旧任务重要的参数加上弹性约束', 'EWC: elastic constraints on parameters that matter for old tasks'), to: 'topic:continual-learning' },
    { title: b('突触下调：睡眠中按比例缩小，保留相对强弱', 'Synaptic downscaling: shrinking in proportion during sleep, keeping relative strengths'), to: 'topic:consolidation-replay' },
  ],
  conditions: [
    b('标记与捕获主要在海马脑片中得到证明；在完整动物的记忆中，它的作用有行为标记等间接证据。', 'Tagging and capture were shown mainly in hippocampal slices. Its role in the memories of whole animals has indirect evidence such as behavioral tagging.'),
    b('持久的增强是否完全依赖新合成的蛋白，以及维持记忆的具体分子，仍有争议。', 'Whether lasting potentiation depends entirely on newly made proteins, and which molecules maintain memory, are debated.'),
    b('突触巩固和系统巩固发生在不同的尺度上，不能用同一个过程解释。', 'Synaptic and systems consolidation happen on different scales and cannot be explained by one process.'),
  ],
  uses: [
    { to: 'topic:continual-learning', role: b('先快后慢的巩固让新的变化先暂存，只有被确认重要的才长期保留，减少对旧记忆的覆盖。', 'Fast-then-slow consolidation holds new changes briefly and keeps only those confirmed as important, which reduces overwriting of old memories.') },
    { to: 'topic:consolidation-replay', role: b('突触巩固在学习后几小时内完成，为之后睡眠中的系统巩固提供基础。', 'Synaptic consolidation completes within hours of learning and lays the base for later systems consolidation in sleep.') },
    { to: 'topic:reward-learning', role: b('多巴胺等信号可以触发蛋白合成，让与奖赏或新奇相关的经历更容易被长期记住。', 'Signals such as dopamine can trigger protein synthesis, so experiences tied to reward or novelty are more easily kept long term.') },
  ],
  refs: ['frey1997', 'redondo2011', 'benna2016', 'kirkpatrick2017', 'zenke2017', 'mcclelland1995'],
}
