import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F22 Attentional selection and information gating: selective attention and thalamocortical gating vs transformer attention and routing. */
export const ATTENTION_GATING: TopicContent = {
  thesis: {
    biological: b(
      '视野中的多个物体在视觉皮层里相互竞争。前额叶和顶叶保持当前目标，向感觉皮层发出反馈，提高与目标相关的神经元的增益，让竞争偏向目标；丘脑像一道闸门，决定哪些感觉信号能传到皮层。注意的容量很有限：专注于一件事时，约一半的人会看不见从画面中走过的大猩猩。',
      'Several objects in view compete in visual cortex. Prefrontal and parietal cortex hold the current goal and send feedback that raises the gain of neurons relevant to it, biasing the competition toward the target. The thalamus acts as a gate deciding which sensory signals reach cortex. Attention has very limited capacity: while focused on one task, about half of people fail to see a gorilla walking through the scene.'),
    computational: b(
      'Transformer 的注意力让每个词元用查询与所有词元的键比较，按相似度加权汇总它们的值；多个注意力头并行，各自捕捉不同的关系。混合专家模型用一个路由器为每个词元只挑少数几个子网络计算。注意力没有容量瓶颈，但权重由内容相似度决定，任务目标只能通过输入间接影响。',
      'In transformer attention, each token compares its query with every token’s key and sums their values weighted by similarity. Many heads run in parallel, each capturing different relations. Mixture-of-experts models use a router that sends each token through only a few subnetworks. Attention has no capacity bottleneck, but its weights follow content similarity, and task goals affect them only indirectly through the input.'),
    gap: b('名字相同，计算不同：认知层面的注意是按目标选择、有容量限制的控制过程；Transformer 的注意力机制是一种按相似度加权汇总的运算，没有明确的目标信号和容量瓶颈。', 'Same name, different computations. Cognitive attention is a goal-driven, capacity-limited control process. The transformer attention mechanism is a similarity-weighted pooling operation with no explicit goal signal or capacity bottleneck.'),
  },
  short: { biological: b('注意', 'Attention'), computational: b('注意力机制', 'Attention mechanism') },
  kinds: ['behavior', 'math'],
  evidence: 'established',
  asOf: b('AI 侧描述截至 2026 年 10 月的 Transformer 注意力与混合专家路由；具体评测结果按发表年份注明。', 'The AI column describes transformer attention and mixture-of-experts routing as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'bio',
      dimension: b('按目标选择', 'Selecting by goal'),
      brain: b('寻找红色物体时，视觉皮层中对红色敏感的神经元整体增强，无关的特征被压低。', 'When searching for something red, red-tuned neurons across visual cortex are boosted and irrelevant features suppressed.'),
      ai: b('注意力权重由内容相似度决定，目标只能写进提示；2023 年的研究中，加入无关句子会明显降低大语言模型的解题准确率。', 'Attention weights follow content similarity, and goals can only be written into the prompt. In a 2023 study, adding irrelevant sentences clearly lowered large language models’ accuracy.'),
      gap: b('大脑有专门的自上而下控制信号，模型的「选择」是内容匹配的副产品。', 'The brain has dedicated top-down control signals, while selection in models is a by-product of content matching.'),
    },
    {
      lead: 'comp',
      dimension: b('同时处理的信息量', 'Information handled at once'),
      brain: b('同时能细致处理的物体只有少数几个，其余只得到粗略的处理。', 'Only a few objects get detailed processing at once, and the rest only coarse processing.'),
      ai: b('每一层注意力都能同时读取上下文中的成千上万个词元。', 'Each attention layer reads thousands of tokens in context at once.'),
      gap: b('模型没有注意的容量瓶颈，可并行访问的信息远多于人。', 'Models have no attentional bottleneck and can access far more information in parallel.'),
    },
    {
      lead: 'mixed',
      dimension: b('漏看', 'Missing things'),
      brain: b('专注于数传球的次数时，约一半的人没看到从画面中走过的大猩猩（非注意盲视）。', 'Counting basketball passes, about half of people missed a gorilla walking through the scene, called inattentional blindness.'),
      ai: b('上下文中的所有内容原则上都能被读取，但长上下文中段的信息更容易被忽略。', 'All content in context can in principle be read, but information in the middle of long contexts is more often missed.'),
      gap: b('人漏看是因为容量有限，模型漏看是因为注意力权重被稀释，原因不同。', 'People miss things because capacity is limited, models because attention weights are diluted, for different reasons.'),
    },
    {
      lead: 'even',
      dimension: b('按难度分配计算', 'Allocating effort by difficulty'),
      brain: b('任务越难，人投入越多的注意和时间，瞳孔也随之扩大。', 'The harder the task, the more attention and time people invest, and their pupils dilate.'),
      ai: b('混合专家模型为每个词元只启用少数子网络；推理模型对难题写出更长的推理过程。', 'Mixture-of-experts models activate only a few subnetworks per token, and reasoning models write longer reasoning for hard problems.'),
      gap: b('两边都把有限的计算集中到需要的地方，机制不同。', 'Both concentrate limited computation where it is needed, by different mechanisms.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('感觉表征相互竞争', 'Sensory representations compete'),
        points: [b('同一感受野内有多个物体时，视觉皮层中代表它们的神经元群相互抑制，争夺进一步处理的机会。', 'When several objects share a receptive field, the neuron groups representing them in visual cortex inhibit each other, competing for further processing.')],
      },
      {
        title: b('目标信号', 'Goal signal'),
        points: [b('前额叶和额叶眼区在工作记忆中保持当前目标，例如「找红色的东西」「看左边」。', 'Prefrontal cortex and the frontal eye field hold the current goal in working memory, such as find something red or look left.')],
      },
      {
        title: b('增益调节', 'Gain modulation'),
        points: [
          b('目标区域向视觉皮层发出反馈，提高与目标相关的神经元的增益：同样的刺激，引起更强的放电。', 'Goal areas send feedback to visual cortex that raises the gain of target-relevant neurons, so the same stimulus evokes stronger firing.'),
          b('电刺激额叶眼区，就能增强视觉皮层中对应位置的反应，即使眼睛不动。', 'Stimulating the frontal eye field boosts responses at the matching location in visual cortex, even without eye movement.'),
        ],
      },
      {
        title: b('丘脑门控', 'Thalamic gating'),
        points: [b('丘脑网状核包围丘脑，像闸门一样调节各感觉通道向皮层的传递；前额叶经它选择让视觉还是听觉信息优先通过。', 'The thalamic reticular nucleus surrounds the thalamus and gates each sensory channel’s transmission to cortex. Prefrontal cortex uses it to choose whether visual or auditory information gets through first.')],
      },
      {
        title: b('自下而上的捕获', 'Bottom-up capture'),
        points: [b('突然的闪光或巨响等显著刺激，经上丘和顶叶自动吸引注意，可以打断当前的任务。', 'Salient stimuli such as a sudden flash or loud noise capture attention automatically through the superior colliculus and parietal cortex and can interrupt the current task.')],
      },
      {
        title: b('选中的信息进入工作记忆', 'Selected information enters working memory'),
        points: [b('赢得竞争的信息进入工作记忆，被详细处理和报告；未被选中的信息很快消退，常常根本没被意识到。', 'Information that wins the competition enters working memory for detailed processing and report. Unselected information fades quickly and often never reaches awareness.')],
      },
    ],
    computational: [
      {
        title: b('词元向量', 'Token vectors'),
        points: [b('输入的每个词元是一个向量，所有词元并排放在上下文中。', 'Each input token is a vector, and all tokens sit side by side in the context.')],
      },
      {
        title: b('查询、键和值', 'Queries, keys and values'),
        points: [b('每个词元用三个学到的矩阵分别算出查询（要找什么）、键（我是什么）和值（我携带的内容）。', 'Each token computes a query, what it looks for, a key, what it is, and a value, what it carries, with three learned matrices.')],
      },
      {
        title: b('注意力权重', 'Attention weights'),
        points: [b('查询与所有键做点积，经 softmax 变成权重，再按权重把所有值加起来。', 'The query takes dot products with all keys, softmax turns them into weights and all values are summed by weight.')],
      },
      {
        title: b('多头并行', 'Multiple heads in parallel'),
        points: [b('几十个注意力头同时计算，有的关注相邻词，有的关注语法关系，有的复制前文出现过的模式。', 'Dozens of heads compute at once. Some focus on neighboring words, some on grammatical relations, some copy patterns seen earlier.')],
      },
      {
        title: b('混合专家路由', 'Mixture-of-experts routing'),
        points: [b('路由器为每个词元打分，只把它送进得分最高的少数几个专家子网络，其余专家不参与计算。', 'A router scores each token and sends it only to the few highest-scoring expert subnetworks, while the others stay idle.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('没有明确的自上而下目标信号和容量瓶颈：所有内容都参与竞争，任务目标只能通过输入间接起作用。', 'No explicit top-down goal signal or capacity bottleneck: all content competes, and task goals act only indirectly through the input.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('「偏向竞争」理论于 1995 年提出：注意不是一盏照亮某处的探照灯，而是在相互竞争的表征之间施加偏向，让目标获胜。', 'Biased competition theory, proposed in 1995, holds that attention is not a spotlight on one place but a bias applied among competing representations that lets the target win.'),
      b('2009 年的「注意的归一化模型」用一个公式统一解释了注意对神经反应的多种影响：注意乘上刺激驱动，再除以周围活动的总和。', 'The 2009 normalization model of attention explains many effects of attention on neural responses with one formula: attention multiplies the stimulus drive, then divides by the pooled surrounding activity.'),
      b('目标引导的注意主要依赖背侧的额顶网络，显著刺激的捕获主要依赖腹侧的颞顶网络，两者相互作用。', 'Goal-directed attention relies mainly on a dorsal frontoparietal network and capture by salient stimuli on a ventral temporoparietal network, and the two interact.'),
      b('两种注意的速度不同：显著刺激在约一两百毫秒内自动吸引注意，按目标主动转移注意约需三百毫秒。', 'The two kinds of attention differ in speed. Salient stimuli capture attention automatically within one or two hundred milliseconds, while a voluntary shift toward a goal takes about three hundred.'),
      b('丘脑网状核作为「探照灯」的设想最早在 1984 年提出；2015 年的小鼠实验显示，前额叶通过它在视觉和听觉之间选择。', 'The idea of the thalamic reticular nucleus as a searchlight was proposed in 1984. A 2015 mouse study showed prefrontal cortex uses it to choose between vision and hearing.'),
    ],
    computational: [
      b('「注意力机制」这个名字借自认知科学，但它本身是一种按相似度加权汇总的运算，不包含目标、容量限制或意识。', 'The name attention mechanism is borrowed from cognitive science, but it is a similarity-weighted pooling operation with no goals, capacity limits or awareness.'),
      b('注意力的计算量随上下文长度的平方增长；稀疏注意力、滑动窗口等方法只计算部分位置对，以降低成本。', 'Attention’s computation grows with the square of context length. Sparse attention, sliding windows and similar methods compute only some pairs of positions to cut the cost.'),
      b('混合专家模型的总参数可以很大，但每个词元只用到其中一小部分；需要额外的「负载均衡」约束，避免所有词元都挤到少数专家上。', 'Mixture-of-experts models can have huge total parameters while each token uses a small part. An extra load-balancing constraint keeps tokens from crowding onto a few experts.'),
      b('路由选择的是「用哪部分计算」，而不是「处理哪些信息」，与认知层面的注意选择不同。', 'Routing chooses which computation to use, not which information to process, unlike attentional selection in cognition.'),
    ],
  },
  bioMath: [
    {
      title: b('偏向竞争：注意改变两个刺激在反应中的权重', 'Biased competition: attention changes the weights of two stimuli in a response'),
      tex: t`R = \frac{w_1\,r_1 + w_2\,r_2}{w_1 + w_2}`,
      symbols: [
        { tex: t`r_1,\;r_2`, meaning: b('两个刺激各自单独出现时，神经元的放电频率', 'the neuron’s firing rate to each stimulus alone') },
        { tex: t`w_1,\;w_2`, meaning: b('两个刺激在竞争中的权重，注意会增大被注意者的权重', 'weights of the two stimuli in the competition; attention raises the attended one') },
        { tex: t`R`, meaning: b('两个刺激同时出现时的放电频率', 'firing rate when both stimuli appear together') },
      ],
      steps: [
        b('两个刺激同时落在感受野内时，神经元的反应接近两者单独反应的加权平均。', 'With two stimuli in the receptive field, the response is close to a weighted average of the single responses.'),
        b('不注意时两者权重相近，反应落在中间。', 'Without attention the weights are similar and the response lies in between.'),
        b('注意某一个刺激，就增大它的权重，反应被拉向它单独出现时的水平，好像另一个刺激被「过滤」掉了。', 'Attending one stimulus raises its weight and pulls the response toward its level alone, as if the other were filtered out.'),
      ],
      example: b(
        '偏好刺激单独引起 $50$ 次每秒的放电，非偏好刺激引起 $10$ 次。同时出现、不加注意时（$w_1 = w_2 = 1$），反应约为 $30$。注意偏好刺激，使 $w_1 = 3$：$(3 \\times 50 + 10)/4 = 40$。注意非偏好刺激，使 $w_2 = 3$：$(50 + 3 \\times 10)/4 = 20$。',
        'The preferred stimulus alone evokes $50$ spikes per second and the nonpreferred one $10$. Together without attention, $w_1 = w_2 = 1$, the response is about $30$. Attending the preferred one with $w_1 = 3$ gives $(3 \\times 50 + 10)/4 = 40$. Attending the nonpreferred one with $w_2 = 3$ gives $(50 + 3 \\times 10)/4 = 20$.'),
      consequences: [
        b('注意的效果表现为「好像只有被注意的刺激存在」，这与猕猴 V2 和 V4 的记录结果一致。', 'Attention acts as if only the attended stimulus were present, matching recordings in macaque V2 and V4.'),
        b('解释了为什么注意在刺激拥挤时作用最大：没有竞争，就没有可偏向的对象。', 'It explains why attention matters most in clutter: without competition there is nothing to bias.'),
      ],
      limitations: [
        b('加权平均是对实验数据的描述，权重怎样由前额叶和顶叶的反馈产生，需要更详细的回路模型。', 'The weighted average describes data. How prefrontal and parietal feedback produces the weights needs a more detailed circuit model.'),
        b('模型只考虑两个刺激和一个神经元，真实场景中竞争发生在大量神经元和多个区域中。', 'It considers two stimuli and one neuron, while real competition spans many neurons and areas.'),
      ],
    },
    {
      title: b('注意的归一化模型：注意乘上刺激驱动，再除以周围活动', 'Normalization model of attention: attention multiplies the drive, then divides by the surround'),
      tex: t`R(x, \theta) = \frac{A(x, \theta)\,E(x, \theta)}{S(x, \theta) + \sigma},\qquad S = s * \big[A\,E\big]`,
      symbols: [
        { tex: t`x,\;\theta`, meaning: b('神经元偏好的位置和特征（如朝向）', 'preferred location and feature, such as orientation, of a neuron') },
        { tex: t`E`, meaning: b('刺激对神经元的驱动', 'drive of the stimulus on the neuron') },
        { tex: t`A`, meaning: b('注意场：被注意的位置或特征处大于 $1$，其余为 $1$', 'attention field: above $1$ at attended locations or features, $1$ elsewhere') },
        { tex: t`S`, meaning: b('抑制驱动：邻近神经元的 $A E$ 在空间和特征上的平均', 'suppressive drive: $AE$ of neighboring neurons pooled over space and features') },
        { tex: t`s *`, meaning: b('用一个平滑核对周围求平均', 'pooling over the neighborhood with a smoothing kernel') },
        { tex: t`\sigma`, meaning: b('一个常数，防止除以 $0$', 'a constant that prevents division by $0$') },
      ],
      steps: [
        b('刺激驱动乘以注意场：被注意的位置或特征被放大。', 'Multiply the stimulus drive by the attention field, amplifying attended locations or features.'),
        b('再除以周围神经元经同样放大后的平均活动。', 'Divide by the pooled activity of neighbors, amplified the same way.'),
        b('被注意的刺激越孤立，增益越明显；周围也被放大时，部分效果被除法抵消。', 'The more isolated the attended stimulus, the clearer the gain. When the surround is amplified too, division cancels part of the effect.'),
      ],
      example: b(
        '取 $E = 10$、$\\sigma = 5$。不注意时周围平均 $S = 5$，反应 $10/(5 + 5) = 1$。注意一个小目标，$A = 2$ 只作用于它，周围平均几乎不变：$20/(5 + 5) = 2$，反应翻倍。若注意范围很大、把周围也放大使 $S = 10$，反应为 $20/(10 + 5) \\approx 1.33$，增益变小。',
        'Let $E = 10$ and $\\sigma = 5$. Without attention, the surround is $S = 5$ and the response $10/(5 + 5) = 1$. Attending a small target with $A = 2$ on it alone leaves the surround nearly unchanged: $20/(5 + 5) = 2$, double. If attention covers a wide area and amplifies the surround to $S = 10$, the response is $20/(10 + 5) \\approx 1.33$, a smaller gain.'),
      consequences: [
        b('同一个公式能解释注意时而像「提高对比度」、时而像「放大反应」，取决于刺激大小和注意范围。', 'One formula explains why attention sometimes acts like raising contrast and sometimes like scaling responses, depending on stimulus size and attention width.'),
        b('把注意与[归一化](card:normalization)这一普遍的皮层运算联系起来。', 'It links attention to [normalization](card:normalization), a general cortical operation.'),
      ],
      limitations: [
        b('注意场 $A$ 是模型的输入，模型不说明目标怎样决定它。', 'The attention field $A$ is an input to the model, which does not explain how goals set it.'),
        b('它描述增益的变化，不包括丘脑门控和自下而上的捕获。', 'It describes gain changes, not thalamic gating or bottom-up capture.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('多头注意力：按相似度加权汇总，多个头并行', 'Multi-head attention: similarity-weighted pooling in parallel heads'),
      tex: t`\mathrm{head}_h = \operatorname{softmax}\!\Big(\frac{Q_h K_h^{\top}}{\sqrt{d}}\Big) V_h,\qquad \mathrm{MHA}(X) = \big[\mathrm{head}_1, \dots, \mathrm{head}_H\big]\,W_O`,
      symbols: [
        { tex: t`X`, meaning: b('上下文中所有词元的向量', 'vectors of all tokens in context') },
        { tex: t`Q_h,\;K_h,\;V_h`, meaning: b('第 $h$ 个头的查询、键、值，由 $X$ 乘以各自的矩阵得到', 'queries, keys and values of head $h$, from $X$ times its matrices') },
        { tex: t`d`, meaning: b('每个头的向量维度', 'vector dimension per head') },
        { tex: t`H`, meaning: b('头的数量', 'number of heads') },
        { tex: t`W_O`, meaning: b('把各头的结果合并回原维度的矩阵', 'matrix that merges the heads back to the model dimension') },
      ],
      steps: [
        b('每个头独立计算查询与键的点积，得到所有词元两两之间的相似度。', 'Each head computes dot products between queries and keys, giving pairwise similarities between all tokens.'),
        b('softmax 把每个词元对其他词元的相似度变成权重，按权重汇总值。', 'Softmax turns each token’s similarities into weights, and the values are pooled by weight.'),
        b('各头的结果拼接后乘以 $W_O$。不同的头学到关注不同的关系。', 'The heads’ results are concatenated and multiplied by $W_O$. Different heads learn to track different relations.'),
      ],
      example: b(
        '句子「小猫追着它的尾巴」。一个头里，「它的」的查询与「小猫」的键相似度最高，权重约 $0.8$，于是「它的」的新向量主要混入了「小猫」的信息。另一个头里，「尾巴」主要关注紧挨着的「它的」。',
        'In the sentence the kitten chases its tail, one head gives its a query most similar to the key of kitten, weight about $0.8$, so the new vector of its mixes in mainly kitten. In another head, tail attends mainly to the adjacent its.'),
      consequences: [
        b('任何两个位置都能直接交换信息，不受距离限制，这是 Transformer 擅长长距离关系的原因。', 'Any two positions exchange information directly regardless of distance, which is why transformers handle long-range relations well.'),
        b('权重完全由内容决定：与当前词元相似的内容获得更多关注，不管它与任务目标是否相关。', 'Weights depend entirely on content. Content similar to the current token gets more weight whether or not it serves the task goal.'),
      ],
      limitations: [
        b('没有容量限制，也没有自上而下的目标信号；目标只能写进上下文，通过相似度间接起作用。', 'No capacity limit and no top-down goal signal. Goals can only be written into context and act indirectly through similarity.'),
        b('计算量随上下文长度的平方增长。', 'Computation grows with the square of context length.'),
      ],
    },
    {
      title: b('混合专家路由：每个词元只经过少数几个专家', 'Mixture-of-experts routing: each token passes through only a few experts'),
      tex: t`\mathbf{g}(\mathbf{x}) = \operatorname{softmax}\big(\operatorname{TopK}(W_r\,\mathbf{x},\,k)\big),\qquad \mathbf{y} = \sum_{i \in \operatorname{TopK}} g_i(\mathbf{x})\,E_i(\mathbf{x})`,
      symbols: [
        { tex: t`\mathbf{x}`, meaning: b('一个词元的向量', 'vector of one token') },
        { tex: t`W_r`, meaning: b('路由器的权重，为每个专家打分', 'router weights that score every expert') },
        { tex: t`\operatorname{TopK}`, meaning: b('只保留得分最高的 $k$ 个，其余记为负无穷', 'keeps the top $k$ scores and sets the rest to minus infinity') },
        { tex: t`E_i`, meaning: b('第 $i$ 个专家：一个前馈子网络', 'expert $i$: a feedforward subnetwork') },
        { tex: t`g_i`, meaning: b('专家 $i$ 的混合权重', 'mixing weight of expert $i$') },
        { tex: t`\mathbf{y}`, meaning: b('这一层的输出', 'output of the layer') },
      ],
      steps: [
        b('路由器为每个专家打分。', 'The router scores every expert.'),
        b('只保留最高的 $k$ 个，用 softmax 变成权重；其他专家完全不计算。', 'Keep only the top $k$ and turn them into weights with softmax. The other experts compute nothing.'),
        b('把被选中专家的输出按权重相加。训练时另加约束，让各专家的负载大致均衡。', 'Add the chosen experts’ outputs by weight. Training adds a constraint so experts carry roughly equal load.'),
      ],
      example: b(
        '8 个专家，$k = 2$。某个词元的得分为 $(2.0, 0.1, 1.5, \\dots)$，选中专家 1 和 3，权重约为 $\\tfrac{e^{2}}{e^{2} + e^{1.5}} \\approx 0.62$ 和 $0.38$。这个词元只用到 8 个专家中的 2 个，计算量约为全部使用时的四分之一。',
        'Eight experts with $k = 2$. A token scores $(2.0, 0.1, 1.5, \\dots)$, so experts 1 and 3 are chosen with weights about $\\tfrac{e^{2}}{e^{2} + e^{1.5}} \\approx 0.62$ and $0.38$. The token uses 2 of 8 experts, about a quarter of the full computation.'),
      consequences: [
        b('模型总参数可以很大，而每个词元的计算量保持不变。', 'Total parameters can be huge while computation per token stays fixed.'),
        b('路由是一种「选择用哪部分计算」的门控，与丘脑选择感觉通道在形式上有相似之处。', 'Routing is a gate choosing which computation to use, formally reminiscent of the thalamus choosing a sensory channel.'),
      ],
      limitations: [
        b('路由选择的是计算路径，不是要处理的信息，与认知层面的注意选择不同。', 'Routing selects a computation path, not the information to process, unlike attentional selection.'),
        b('路由由内容决定，不接受明确的任务目标信号；负载不均时部分专家得不到训练。', 'Routing follows content and takes no explicit task goal. With uneven load, some experts go untrained.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('容量很小', 'Tiny capacity'),
        text: b('同时只能细致处理少数对象，专注一件事时可能完全看不见另一件（非注意盲视）。', 'Only a few objects get detailed processing at once, and while focused on one thing people can miss another entirely, called inattentional blindness.'),
        steps: [1, 6],
      },
      {
        title: b('容易被显著刺激打断', 'Easily interrupted'),
        text: b('突然的声音或闪光会自动夺走注意，打断正在进行的任务。', 'A sudden sound or flash grabs attention automatically and interrupts the task at hand.'),
        steps: [5],
      },
      {
        title: b('持续注意会下降', 'Sustained attention fades'),
        text: b('长时间保持注意时，警觉性下降，错误增多。', 'Holding attention for long reduces vigilance and increases errors.'),
        steps: [2, 3],
      },
    ],
    computational: [
      {
        title: b('没有目标驱动的选择', 'No goal-driven selection'),
        text: b('注意力权重由内容相似度决定，无关但相似的内容也会被读取，造成干扰。', 'Attention weights follow content similarity, so irrelevant but similar content is read too and interferes.'),
        steps: [3, 6],
      },
      {
        title: b('长上下文中权重被稀释', 'Weights dilute in long contexts'),
        text: b('上下文越长，每个有用词元分到的权重越少，中段信息更容易被忽略。', 'The longer the context, the less weight each useful token gets, and middle information is missed more often.'),
        steps: [3],
      },
      {
        title: b('计算随长度平方增长', 'Cost grows quadratically'),
        text: b('标准注意力的计算量随上下文长度的平方增长，超长输入成本很高。', 'Standard attention’s computation grows with the square of context length, so very long inputs are costly.'),
        steps: [3, 4],
      },
    ],
    misreadings: [
      {
        claim: b('Transformer 的注意力就是人的注意', 'Transformer attention is human attention'),
        fact: b('Transformer 的注意力机制是一种按相似度加权汇总的运算；认知层面的注意是按目标选择、有容量限制的控制过程，两者只是共用一个名字。', 'The transformer attention mechanism is a similarity-weighted pooling operation. Cognitive attention is a goal-driven, capacity-limited control process. They share only a name.'),
      },
      {
        claim: b('注意就像一盏照亮某处的探照灯', 'Attention is a spotlight on one place'),
        fact: b('注意也可以按特征（如颜色）或物体选择，并且通过改变神经元增益和竞争权重起作用，不只是照亮一个位置。', 'Attention can also select by feature, such as color, or by object, and works by changing neuron gain and competition weights, not only by lighting up a place.'),
        source: b('「探照灯」是 Posner 在 1980 年提出后，在认知心理学中流行开来的比喻。', 'The spotlight is a metaphor that spread through cognitive psychology after Posner proposed it in 1980.'),
      },
    ],
  },
  refs: {
    neuro: ['desimone1995', 'reynolds1999', 'moore2003', 'corbetta2002', 'crick1984', 'wimmer2015', 'simons1999'],
    models: ['reynolds2009'],
    ai: ['vaswani2017', 'shazeer2017', 'fedus2022', 'liu2024', 'shi2023'],
  },
}
