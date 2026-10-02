import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F12 Episodic memory and associative retrieval: hippocampal episodic memory vs retrieval-augmented generation. */
export const EPISODIC_MEMORY: TopicContent = {
  thesis: b(
    '海马在一次经历后就能把时间、地点、人物和结果绑定成一条记忆，凭部分线索唤回并区分相似经历，但回忆会被重构而出错。检索增强生成能逐字保存远多于人的内容，但写入什么、如何分段都由系统设计决定，检索主要依靠文本相似度，缺少对事件结构的绑定。',
    'The hippocampus binds time, place, people and outcome into one memory after a single experience. It recalls the memory from a partial cue and keeps similar experiences apart, but recall is reconstructive and can be wrong. Retrieval-augmented generation stores far more content verbatim than a person can. But its designers decide what is stored and how it is split, and retrieval relies mainly on text similarity rather than bound event structure.'),
  kinds: ['behavior', 'math'],
  evidence: 'established',
  asOf: b('计算系统一列描述截至 2026 年 10 月主流的检索增强生成系统。', 'The computational column describes mainstream retrieval-augmented generation systems as of October 2026.'),
  capabilities: [
    {
      dimension: b('一次写入', 'Single-exposure storage'),
      brain: b('经历一次就能形成可以回忆的记忆，不需要反复练习。', 'One experience is enough to form a recallable memory, with no repetition.'),
      ai: b('写入向量库只需一次存储操作；模型参数不会因为一次对话而改变。', 'Adding content to the vector store takes one write. The model parameters do not change after a conversation.'),
      gap: b('两边都能一次写入。区别在于计算系统的写入发生在模型参数之外，写不写由系统决定。', 'Both store after one exposure. In the computational system the write happens outside the parameters, and the system decides whether to write.'),
    },
    {
      dimension: b('线索回忆', 'Cue-based recall'),
      brain: b('一个气味或地点这样的部分线索，就能唤回整段经历（模式补全）。', 'A partial cue such as a smell or a place can bring back a whole episode (pattern completion).'),
      ai: b('用查询向量找出最相似的文本片段；线索与原文措辞差别大时容易漏检。', 'A query vector finds the most similar text chunks. Recall drops when the cue is worded differently from the stored text.'),
      gap: b('海马按内容联想补全，检索依赖嵌入相似度，换一种说法或需要多步联想时更容易失败。', 'The hippocampus completes by association. Retrieval relies on embedding similarity and fails more often with rephrased cues or multi-step links.'),
    },
    {
      dimension: b('区分相似经历', 'Separating similar episodes'),
      brain: b('齿状回把相似的输入分配到重叠很少的表征，减少混淆；这种能力随年龄增长而下降。', 'The dentate gyrus maps similar inputs to barely overlapping representations, which reduces confusion. This ability declines with age.'),
      ai: b('相似片段的向量彼此接近，常被一起取回；要区分它们，需要时间戳、来源等元数据。', 'Similar chunks have nearby vectors and are often retrieved together. Telling them apart needs metadata such as timestamps and sources.'),
      gap: b('计算系统没有专门的去相关步骤，区分相似事件依赖额外的元数据设计。', 'The computational system has no dedicated decorrelation step. Separating similar events depends on extra metadata design.'),
    },
    {
      dimension: b('事件结构', 'Event structure'),
      brain: b('经历按事件边界切分，时间顺序与因果一起保存；预测出错的时刻常成为事件边界。', 'Experience is cut at event boundaries, and order and causes are stored together. Boundaries often fall where predictions fail.'),
      ai: b('主流系统按固定长度切块；EM-LLM 等研究按预测意外程度切分事件，仍属研究原型。', 'Mainstream systems split text into fixed-length chunks. Research systems such as EM-LLM split where tokens are surprising, but they remain prototypes.'),
      gap: b('按长度而不是按事件切分，事件之间的顺序和因果容易丢失。2025 年测试的多个大语言模型，在涉及多个相关事件和复杂时空关系的情景记忆任务上表现不佳。', 'Splitting by length rather than by event loses order and causal links between events. Several large language models tested in 2025 struggled with episodic tasks involving related events and complex time and place relations.'),
    },
    {
      dimension: b('容量与保真', 'Capacity and fidelity'),
      brain: b('容量很大：看过 2500 张物体图片后，仍能从相似图片中认出看过的那张。细节会随时间丢失并被重构，也会形成虚假记忆。', 'Capacity is large. After viewing 2,500 object images, people still pick out the seen one among similar images. Details fade, get reconstructed and can become false memories.'),
      ai: b('可以逐字保存几乎不受限的文本，内容不会自行改变；但在很长的上下文中，位于中段的信息更容易被忽略。', 'Text can be stored verbatim at almost any scale and does not change by itself. In long contexts, information in the middle is used less reliably.'),
      gap: b('计算系统保存得更多、更精确，但写入通常不经过价值筛选；人脑会优先保存新奇或带情绪的经历。', 'The computational system stores more and more precisely, but writes usually skip any value filter. The brain favors novel and emotional experiences.'),
    },
  ],
  bioMath: [
    {
      tex: t`W = \frac{1}{N}\sum_{\mu=1}^{P} \xi^{\mu}\,(\xi^{\mu})^{\top}`,
      caption: b('赫布式联想存储：每条经历 $\\xi^{\\mu}$ 一次写入循环连接权重', 'Hebbian associative storage: each episode $\\xi^{\\mu}$ is written into the recurrent weights in one step'),
      maps: b('$\\xi^{\\mu}$ 对应 CA3 中一条经历的活动模式，$W$ 对应 CA3 的循环突触，$N$ 是神经元数。', '$\\xi^{\\mu}$ is the CA3 activity pattern of one episode, $W$ the CA3 recurrent synapses and $N$ the number of neurons.'),
      explains: b('一次写入就能存储；可存的模式数随神经元数增长，约为 $0.14N$ 条。', 'Storage after one exposure, with capacity growing with neuron count to about $0.14N$ patterns.'),
      limits: b('不能解释时间顺序与事件边界。真实 CA3 活动稀疏并受调质控制，容量估计只适用于理想化模型。', 'It does not explain temporal order or event boundaries. Real CA3 activity is sparse and modulated, so the capacity estimate holds only for the idealized model.'),
    },
    {
      tex: t`x_{t+1} = \operatorname{sign}\!\big(W x_t\big)`,
      caption: b('模式补全：从部分线索 $x_0$ 出发，活动收敛到最接近的已存模式', 'Pattern completion: from a partial cue $x_0$, activity converges to the closest stored pattern'),
      maps: b('$x_t$ 对应回忆过程中 CA3 的活动。', '$x_t$ is CA3 activity during recall.'),
      explains: b('部分线索就能唤回整段记忆；存得太多时，相似模式会混合成错误的回忆。', 'A partial cue retrieves a whole memory. With too many stored patterns, similar ones blend into false recall.'),
      limits: b('不能解释回忆后的再巩固与改写，也没有描述齿状回的模式分离。', 'It does not cover reconsolidation after recall or pattern separation in the dentate gyrus.'),
    },
  ],
  compMath: [
    {
      tex: t`s_i = \cos\!\big(E(q),\,E(d_i)\big),\qquad \mathcal{D}_k = \operatorname{top\text{-}k}_{\,i}\; s_i`,
      caption: b('检索：用嵌入的余弦相似度给片段打分，取前 $k$ 个', 'Retrieval: chunks are scored by the cosine similarity of their embeddings and the top $k$ are kept'),
      maps: b('$E$ 是嵌入模型，$q$ 是查询，$d_i$ 是第 $i$ 个文本片段。', '$E$ is the embedding model, $q$ the query and $d_i$ the $i$-th chunk.'),
      explains: b('措辞相近的线索为什么能取回内容，以及相似片段为什么会被一起取回。', 'Why similarly worded cues retrieve content, and why similar chunks come back together.'),
      limits: b('分数只比较单个片段与查询，不表示事件之间的顺序或因果。', 'The score compares one chunk with the query. It encodes no order or causal link between events.'),
    },
    {
      tex: t`\xi^{\text{new}} = X\,\operatorname{softmax}\!\big(\beta\, X^{\top}\xi\big)`,
      caption: b('现代 Hopfield 网络的更新规则，与 Transformer 注意力的形式相同', 'The modern Hopfield update, which has the same form as transformer attention'),
      maps: b('$X$ 的各列是已存模式（或上下文中的键），$\\xi$ 是查询，$\\beta$ 控制取回的锐度。', 'The columns of $X$ are stored patterns (or keys in context), $\\xi$ is the query and $\\beta$ sets how sharp retrieval is.'),
      explains: b('把联想记忆与注意力放进同一种数学形式：一步取回与查询最相似的模式的加权组合。', 'It puts associative memory and attention in one form. One step returns a weighted mix of the patterns most similar to the query.'),
      limits: b('这是形式上的联系，不说明海马使用注意力机制，也不涉及外部向量库的写入与管理。', 'The link is formal. It does not show that the hippocampus uses attention, and it says nothing about writing or managing an external store.'),
    },
  ],
  limits: {
    biological: b(
      '回忆是重构的：细节会遗忘，会受先验和情绪影响，也会形成虚假记忆。相似经历之间会相互干扰。',
      'Recall is reconstructive. Details fade, prior beliefs and emotion shape what is recalled, and false memories form. Similar episodes interfere with each other.'),
    computational: b(
      '写入、分段、关联和遗忘都需要外部设计。检索依赖嵌入相似度，换一种说法或需要多步关联时容易失败。检索结果不会整合进模型参数。HippoRAG 等用知识图谱改善多步检索的方法仍处于研究阶段。',
      'Writing, splitting, linking and forgetting all need external design. Retrieval relies on embedding similarity and often fails on rephrased or multi-step cues. Retrieved content never enters the parameters. Graph-based methods such as HippoRAG improve multi-step retrieval but remain research systems.'),
    unsupported: b(
      '不能据此认为海马就是一个向量数据库。按索引理论，海马保存的是指向皮层表征的索引，而不是内容本身，这一理论仍有争议。检索增强生成也不是情景记忆的实现，两者只在「凭线索取回过去的内容」这一功能上相近。',
      'This does not make the hippocampus a vector database. Under indexing theory it stores an index to cortical representations, not the content itself, and the theory is debated. Retrieval-augmented generation is not an implementation of episodic memory either. The two only share the function of retrieving past content from a cue.'),
  },
  refs: {
    neuro: ['tulving2002', 'yassa2011', 'teyler2007', 'zacks2007', 'brady2008', 'schacter1999', 'nader2000'],
    models: ['mcclelland1995', 'hopfield1982', 'amit1985', 'ramsauer2020', 'whittington2020'],
    ai: ['lewis2020', 'liu2024', 'fountas2025', 'gutierrez2024', 'huet2025'],
  },
}
