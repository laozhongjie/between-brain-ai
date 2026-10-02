import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F12 Episodic memory and associative retrieval: the hippocampal episodic memory system vs RAG. */
export const EPISODIC_MEMORY: TopicContent = {
  thesis: {
    biological: b(
      '一次经历就能形成记忆。海马把同一时刻的人物、地点和事件绑定在一起，之后凭一个片段就能唤回整段经历，并能把相似的经历分开。代价是每次回忆都在重建，细节会丢失或被改写。',
      'One experience is enough to form a memory. The hippocampus binds the people, place and events of one moment, recalls the whole episode from a fragment and keeps similar episodes apart. The cost is that every recall rebuilds the memory, so details get lost or rewritten.'),
    computational: b(
      'RAG（检索增强生成）把文本切成片段，逐字存进向量库，容量几乎不受限，内容也不会走样。但怎样切分、存什么都由系统设计决定，检索只比较文本相似度，片段之间没有时间顺序和因果关联。',
      'Retrieval-augmented generation (RAG) splits text into chunks and stores them verbatim in a vector store, with almost unlimited capacity and no distortion. But the system designer decides how text is split and what is kept. Retrieval only compares text similarity, and chunks carry no order or causal links.'),
    gap: b(
      '海马把经历绑定成结构化的事件（谁、何时、何地、为什么），RAG 存的是彼此独立的文本片段。前者会出错但能联想，后者精确但不会把片段组织成经历。',
      'The hippocampus binds experience into structured events (who, when, where, why), while RAG stores independent text chunks. The first makes errors but associates. The second is exact but never organizes chunks into experiences.'),
  },
  kinds: ['behavior', 'math'],
  evidence: 'established',
  asOf: b('RAG 一列描述截至 2026 年 10 月的主流系统。', 'The RAG column describes mainstream systems as of October 2026.'),
  capabilities: [
    {
      dimension: b('一次写入', 'Single-exposure storage'),
      brain: b('经历一次就能形成可以回忆的记忆，不需要反复练习。', 'One experience is enough to form a recallable memory, with no repetition.'),
      ai: b('写入向量库只需一次插入操作；语言模型的参数不会因为一次对话而改变。', 'Adding a chunk to the vector store takes one insert. The language model parameters do not change after a conversation.'),
      gap: b('两边都能一次写入。区别在于 RAG 的写入发生在模型参数之外，写不写由系统设计决定。', 'Both store after one exposure. RAG writes outside the model parameters, and the system design decides whether to write.'),
    },
    {
      dimension: b('线索回忆', 'Cue-based recall'),
      brain: b('一个气味或地点这样的部分线索，就能唤回整段经历（模式补全）。', 'A partial cue such as a smell or a place can bring back a whole episode (pattern completion).'),
      ai: b('用问题的向量找出最相似的文本片段；线索与原文措辞差别大时容易漏检。', 'The query vector finds the most similar chunks. Recall drops when the cue is worded differently from the stored text.'),
      gap: b('海马靠循环连接补全，RAG 靠向量相似度匹配。换一种说法或需要多步联想时，RAG 更容易失败。', 'The hippocampus completes through recurrent connections, RAG matches by vector similarity. RAG fails more often with rephrased cues or multi-step links.'),
    },
    {
      dimension: b('区分相似经历', 'Separating similar episodes'),
      brain: b('齿状回把相似的输入变成重叠很少的表征，减少混淆；这种能力随年龄增长而下降。', 'The dentate gyrus turns similar inputs into barely overlapping representations, which reduces confusion. This ability declines with age.'),
      ai: b('相似片段的向量彼此接近，常被一起取回；要区分它们，需要时间戳、来源等元数据。', 'Similar chunks have nearby vectors and are often retrieved together. Telling them apart needs metadata such as timestamps and sources.'),
      gap: b('RAG 没有专门的去相关步骤，区分相似事件要靠额外设计的元数据。', 'RAG has no dedicated decorrelation step. Separating similar events depends on extra metadata design.'),
    },
    {
      dimension: b('事件结构', 'Event structure'),
      brain: b('经历按事件边界切分，时间顺序与因果一起保存；预测出错的时刻常成为事件边界。', 'Experience is cut at event boundaries, and order and causes are stored together. Boundaries often fall where predictions fail.'),
      ai: b('主流系统按固定长度切块；EM-LLM 等研究原型按词元的意外程度切分事件。', 'Mainstream systems split text into fixed-length chunks. Research prototypes such as EM-LLM split where tokens are surprising.'),
      gap: b('按长度切分会丢失事件之间的顺序与因果。', 'Splitting by length loses the order and causal links between events.'),
    },
    {
      dimension: b('容量与保真', 'Capacity and fidelity'),
      brain: b('容量很大：看过 2500 张物体图片后，人仍能从相似图片中认出看过的那张。但细节会随时间丢失、被重建，也会形成虚假记忆。', 'Capacity is large. After viewing 2,500 object images, people still pick out the seen one among similar images. But details fade, get rebuilt and can become false memories.'),
      ai: b('可以逐字保存几乎不受限的文本，内容不会自行改变；但在很长的上下文中，位于中段的信息更容易被忽略。', 'Text can be stored verbatim at almost any scale and does not change by itself. In long contexts, information in the middle is used less reliably.'),
      gap: b('RAG 存得更多、更精确，但写入不经过价值筛选；海马会优先保存新奇或带情绪的经历。', 'RAG stores more and more precisely, but writes skip any value filter. The hippocampus favors novel and emotional experiences.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('新皮层到内嗅皮层', 'Neocortex to entorhinal cortex'),
        points: [
          b('新皮层的神经元以电脉冲的形式把信息送出，信息就体现在哪些神经元在放电、各自放电多快。', 'Neocortical neurons send the information out as electrical pulses. The information lies in which neurons fire and how fast each one fires.'),
          b('内嗅皮层把信息分成两路：内侧的网格细胞编码「在哪里」，外侧编码「是什么」。', 'The entorhinal cortex splits it into two streams. Grid cells in the medial part code where, and the lateral part codes what.'),
          b('两路信息经穿通通路进入海马，主要送到齿状回，也有分支直达 CA3 和 CA1。', 'Both streams enter the hippocampus through the perforant path, mainly to the dentate gyrus, with branches straight to CA3 and CA1.'),
        ],
      },
      {
        title: b('齿状回', 'Dentate gyrus'),
        points: [
          b('放电模式被映射到数量多得多的颗粒细胞上，同一时刻只有极少数颗粒细胞放电。', 'The pattern is mapped onto far more granule cells, of which very few fire at once.'),
          b('相似的输入因此变成几乎不重叠的稀疏模式，即模式分离，原理见[扩展编码](card:expansion)。', 'Similar inputs become sparse patterns that barely overlap. This is pattern separation, explained in [expansion coding](card:expansion).'),
          b('这个稀疏模式经苔藓纤维被强力传给 CA3。', 'The mossy fibers impose this sparse pattern on CA3.'),
        ],
      },
      {
        title: b('CA3 写入', 'CA3 writes'),
        points: [
          b('齿状回送来的稀疏模式让一小群 CA3 细胞同时放电。', 'The sparse pattern from the dentate gyrus makes a small group of CA3 cells fire together.'),
          b('同时放电的细胞之间，循环连接按赫布规则被加强（LTP），一次就够。', 'The recurrent connections among the co-firing cells are strengthened by the Hebbian rule (LTP), in one go.'),
          b('经历由此被存成「哪些细胞彼此连得更紧」，保存在 CA3 的连接中。', 'The episode is stored as which cells are more tightly connected, kept in the CA3 connections.'),
        ],
      },
      {
        title: b('CA3 读出', 'CA3 reads out'),
        points: [
          b('回忆线索（例如一个地点）只激活这群细胞中的一部分。', 'A recall cue, such as a place, activates only part of the group.'),
          b('加强过的循环连接把兴奋传遍整群细胞，几轮之后原来的模式被补全，即模式补全，原理见[吸引子网络](card:attractors)。', 'The strengthened recurrent connections spread excitation through the whole group, and after a few rounds the original pattern is complete. This is pattern completion, explained in [attractor networks](card:attractors).'),
          b('补全的模式送往 CA1。', 'The completed pattern goes to CA1.'),
        ],
      },
      {
        title: b('CA1 回到新皮层', 'CA1 back to the neocortex'),
        points: [
          b('CA1 整合 CA3 补全的模式和内嗅皮层的直接输入。', 'CA1 combines the completed pattern from CA3 with direct input from the entorhinal cortex.'),
          b('结果经内嗅皮层深层回到新皮层，重新激活经历当时的皮层放电模式（皮层重现），所以回忆时像「又看到」当时的场景。', 'The result returns through the deep entorhinal layers to the neocortex and reactivates the cortical firing of the original experience (cortical reinstatement). That is why recall feels like seeing the scene again.'),
        ],
      },
      {
        title: b('调质信号', 'Neuromodulators'),
        points: [
          b('新奇或带情绪的事件引起多巴胺和去甲肾上腺素释放。', 'Novel or emotional events release dopamine and noradrenaline.'),
          b('它们增强海马的可塑性，让这一次的 LTP 更强、更持久，从而决定哪些经历被长期保留。', 'They boost hippocampal plasticity, making this round of LTP stronger and longer lasting, and so decide which experiences are kept long term.'),
        ],
      },
    ],
    computational: [
      {
        title: b('分块', 'Chunking'),
        points: [
          b('文档和对话记录按固定长度切成片段，常见几百个词元一块，相邻块留少量重叠。', 'Documents and chat logs are cut into fixed-length chunks, often a few hundred tokens each, with a little overlap.'),
          b('切分只看长度和标点，不看事件边界。每个片段随后送进嵌入模型。', 'The cut follows length and punctuation, not event boundaries. Each chunk then goes to the embedding model.'),
        ],
      },
      {
        title: b('嵌入', 'Embedding'),
        points: [
          b('嵌入模型把每个片段编码成一个几百到几千维的向量。', 'The embedding model encodes each chunk as a vector with hundreds to thousands of dimensions.'),
          b('意思相近的片段，向量方向相近。向量连同原文送去写入向量库。', 'Chunks with similar meaning get vectors pointing in similar directions. The vector and the text go to the vector store.'),
        ],
      },
      {
        title: b('写入向量库', 'Writing to the vector store'),
        points: [
          b('一次插入就完成，原文逐字保存，向量接入近似最近邻索引。', 'One insert stores the text verbatim and links the vector into an approximate nearest neighbor index.'),
          b('语言模型的参数不变，片段留在库中等待查询。', 'The language model parameters do not change, and the chunk waits in the store for queries.'),
        ],
      },
      {
        title: b('查询与检索', 'Query and retrieval'),
        points: [
          b('用户问题经同一个嵌入模型变成查询向量。', 'The user question becomes a query vector through the same embedding model.'),
          b('向量库沿索引找出余弦相似度最高的 $k$ 个片段（常见 3 到 20 个），送进上下文窗口。', 'The store follows its index to the $k$ chunks with the highest cosine similarity, commonly 3 to 20, and sends them into the context window.'),
        ],
      },
      {
        title: b('上下文与语言模型', 'Context and language model'),
        points: [
          b('问题和取回的片段拼成一段提示词。', 'The question and the retrieved chunks are joined into one prompt.'),
          b('语言模型用注意力读取这些片段，生成回答。', 'The language model reads the chunks through attention and writes an answer.'),
          b('会话结束后上下文被清空，模型参数始终不变。', 'The context is cleared when the session ends, and the parameters never change.'),
        ],
      },
      {
        title: b('缺失的两步（虚线框）', 'The two missing steps (dashed boxes)'),
        points: [
          b('没有按事件切分经历的步骤。', 'There is no step that cuts experience into events.'),
          b('也没有把检索到的内容写进模型参数的步骤。', 'There is no step that writes retrieved content into the model parameters.'),
        ],
      },
    ],
  },
  archNotes: {
    biological: [
      b('新皮层是大脑表面的一层皮层，包括处理视觉、听觉等单一感觉的感觉皮层，以及整合多种信息的联合皮层。图中用一个方框代表整个新皮层。', 'The neocortex is the outer layer of the brain. It includes sensory cortex for single senses such as vision and hearing, and association cortex that combines them. One box in the figure stands for all of it.'),
      b('信号的物理形式：感受器把光和声音转成神经元的电脉冲（动作电位）。每个神经元只对特定特征放电，例如某个方向的线条、某个音高；高级区域的神经元对面孔、物体或地点放电。一群神经元的放电频率合起来，可以看成一个数字向量，作用类似 RAG 的嵌入向量。放电的精确时间也携带一部分信息。', 'The physical form of the signal: receptors turn light and sound into electrical pulses of neurons (action potentials). Each neuron fires for particular features, such as a line at one angle or one pitch, and higher areas respond to faces, objects or places. The firing rates of a population together form a vector of numbers, much like an embedding vector in RAG. The precise timing of spikes carries some information too.'),
      b('齿状回颗粒细胞的数量远多于输入它的内嗅皮层细胞，任一时刻只有很小比例的颗粒细胞放电。单个苔藓纤维突触很强，少数几个就能让一个 CA3 细胞放电。', 'Dentate granule cells far outnumber their entorhinal inputs, and only a small fraction fire at any moment. A single mossy fiber synapse is strong, and a few of them can make a CA3 cell fire.'),
      b('CA3 锥体细胞之间有大量相互连接（循环侧支）。在大鼠中，每个 CA3 细胞约接收一万多个来自其他 CA3 细胞的输入。', 'CA3 pyramidal cells are densely interconnected by recurrent collaterals. In the rat, each CA3 cell receives on the order of ten thousand inputs from other CA3 cells.'),
      b('赫布规则的分子机制：NMDA 受体只在突触前释放谷氨酸、且突触后细胞已经去极化时打开，相当于「同时发生」检测器。打开后钙离子流入，触发更多 AMPA 受体插入突触后膜，突触此后传递得更强，这就是长时程增强（LTP）。', 'The molecular basis of the Hebbian rule: the NMDA receptor opens only when the presynaptic side releases glutamate and the postsynaptic cell is already depolarized, so it acts as a coincidence detector. Calcium then flows in and more AMPA receptors are inserted into the postsynaptic membrane, so the synapse transmits more strongly. This is long-term potentiation (LTP).'),
      b('CA1 的作用仍有争议。一种观点认为它在比较「回忆出的内容」与「当前看到的内容」，差异大时发出新奇信号。', 'The role of CA1 is debated. One view holds that it compares what is recalled with what is seen now and signals novelty when they differ.'),
      b('索引理论认为，海马保存的不是内容本身，而是一把索引：记录哪些皮层区域当时一起活动，回忆时据此把它们重新点亮。', 'Indexing theory holds that the hippocampus stores not the content itself but an index of which cortical areas were active together, used to light them up again at recall.'),
    ],
    computational: [
      b('词元（token）是语言模型处理文本的基本单位，大致相当于一个短词或一个词的一部分。', 'A token is the basic unit of text for a language model, roughly a short word or part of a word.'),
      b('嵌入模型通常是一个 Transformer 编码器，事先用对比学习训练：意思相近的文本向量靠近，不相关的文本向量远离。向量概括片段大致在说什么，不单独表示谁、何时、何地。', 'The embedding model is usually a transformer encoder trained in advance with contrastive learning, so texts with similar meaning get nearby vectors and unrelated texts distant ones. The vector summarizes what a chunk is about. It does not separately encode who, when or where.'),
      b('余弦相似度只比较两个向量的方向，不看长短，取值在 $-1$ 到 $1$ 之间。', 'Cosine similarity compares only the directions of two vectors, not their lengths, and ranges from $-1$ to $1$.'),
      b('近似最近邻索引，例如 HNSW 图：新向量插入时连到图中几个最近的邻居；查询时沿图跳转，不必与百万个片段逐一比较。', 'An approximate nearest neighbor index such as an HNSW graph links each new vector to a few of its nearest neighbors. A query hops along the graph instead of comparing millions of chunks one by one.'),
      b('每个片段可以附加来源、时间戳等元数据，这是 RAG 区分相似片段的主要手段；加不加、加什么由系统设计者决定。', 'Each chunk can carry metadata such as source and timestamp, the main way RAG tells similar chunks apart. The system designer decides whether and what to add.'),
      b('措辞不同但意思相同的线索可能找不到；需要串联多条信息时，一次检索常常不够。', 'A cue with the same meaning but different wording may be missed. When an answer needs several linked facts, one retrieval is often not enough.'),
      b('EM-LLM 等研究原型尝试按词元的意外程度切分事件。要让模型真正学会检索到的内容，需要另外微调或继续训练。', 'Research prototypes such as EM-LLM try to split events where tokens are surprising. Making the model actually learn retrieved content needs separate fine-tuning or further training.'),
    ],
  },
  dynamicsSteps: {
    biological: [
      {
        title: b('编码（毫秒到秒）', 'Encoding (milliseconds to seconds)'),
        points: [b('经历发生时，海马在几百毫秒内形成一群细胞的同步放电，并通过 LTP 加强它们之间的连接。', 'During the experience, a group of hippocampal cells fires together within a few hundred milliseconds, and LTP strengthens the connections between them.')],
      },
      {
        title: b('突触巩固（分钟到小时）', 'Synaptic consolidation (minutes to hours)'),
        points: [
          b('刚形成的 LTP 并不牢固，几小时内会消退，称为早期 LTP。', 'Fresh LTP is fragile and fades within hours. This is early LTP.'),
          b('要长期保持，细胞需要表达基因、合成新的蛋白质来加固突触结构，称为晚期 LTP。', 'To last, the cell must express genes and make new proteins that rebuild the synapse. This is late LTP.'),
          b('突触标记假说：被激活的突触留下一个临时「标记」，之后合成的蛋白质被带标记的突触捕获，所以只有参与这段经历的突触被加固。', 'The synaptic tagging hypothesis: an activated synapse leaves a temporary tag, and newly made proteins are captured by tagged synapses. Only the synapses of that episode are reinforced.'),
        ],
      },
      {
        title: b('系统巩固（天到年）', 'Systems consolidation (days to years)'),
        points: [
          b('深睡眠时，海马以尖波涟漪的形式快速重放白天的放电序列，速度比实际经历快很多倍。', 'In deep sleep, the hippocampus replays the day’s firing sequences in sharp-wave ripples, many times faster than they happened.'),
          b('重放与皮层的慢波和睡眠纺锤波同步，被认为驱动新皮层逐渐建立自己的连接。选择性压制涟漪会损害记忆。', 'Replay is coupled to cortical slow waves and sleep spindles and is thought to drive the neocortex to build its own connections. Selectively suppressing ripples impairs memory.'),
          b('标准巩固理论认为，久远的记忆最终可以不依赖海马；多重痕迹理论认为情景细节始终需要海马。两者仍有争议。', 'Standard consolidation theory holds that old memories eventually no longer need the hippocampus. Multiple trace theory holds that episodic detail always does. The question is debated.'),
        ],
      },
      {
        title: b('提取与再巩固', 'Recall and reconsolidation'),
        points: [
          b('每次回忆，已经巩固的记忆会暂时回到不稳定状态，需要重新合成蛋白质才能再次稳定。', 'Each recall returns a consolidated memory to an unstable state, and new protein synthesis is needed to stabilize it again.'),
          b('在这个窗口里记忆可以被修改或加强，所以回忆本身会改写记忆。', 'Within this window the memory can be changed or strengthened, so recall itself rewrites memory.'),
        ],
      },
    ],
    computational: [
      {
        title: b('写入（毫秒）', 'Writing (milliseconds)'),
        points: [b('分块、嵌入、插入索引，一次完成。', 'Chunk, embed, insert into the index, all in one pass.')],
      },
      {
        title: b('静态存储（任意长）', 'Static storage (any length of time)'),
        points: [b('内容保持原样，直到被人工修改、删除或设为过期；被检索多少次都不会改变它。', 'Content stays as it is until someone edits, deletes or expires it. Retrieving it any number of times changes nothing.')],
      },
      {
        title: b('检索（毫秒到秒）', 'Retrieval (milliseconds to seconds)'),
        points: [b('取回的片段只存在于本次请求的上下文中，请求结束即丢弃。', 'Retrieved chunks exist only in the context of the current request and are dropped when it ends.')],
      },
      {
        title: b('没有自动巩固', 'No automatic consolidation'),
        points: [
          b('存储的内容永远不会自动整合进模型参数。', 'Stored content is never integrated into the parameters automatically.'),
          b('要更新模型，需要另做微调，通常以小时到天计，并且有覆盖旧能力（灾难性遗忘）的风险。', 'Updating the model needs separate fine-tuning, usually hours to days, with a risk of overwriting old abilities (catastrophic forgetting).'),
        ],
      },
    ],
  },
  bioMath: [
    {
      title: b('写入：赫布规则把一段经历存进 CA3 的连接', 'Writing: the Hebbian rule stores an episode in CA3 connections'),
      tex: t`W_{ij} = \frac{1}{N}\sum_{\mu=1}^{P} \xi_i^{\mu}\,\xi_j^{\mu}`,
      symbols: [
        { tex: t`N`, meaning: b('CA3 中神经元的数量', 'number of CA3 neurons') },
        { tex: t`P`, meaning: b('已经存入的经历数', 'number of stored episodes') },
        { tex: t`\xi_i^{\mu}`, meaning: b('第 $\\mu$ 段经历中神经元 $i$ 的状态：放电记为 $+1$，不放电记为 $-1$', 'state of neuron $i$ in episode $\\mu$: $+1$ if it fires, $-1$ if not') },
        { tex: t`W_{ij}`, meaning: b('神经元 $j$ 到神经元 $i$ 的连接强度', 'strength of the connection from neuron $j$ to neuron $i$') },
      ],
      steps: [
        b('看一对神经元 $i$ 和 $j$ 在某段经历中的状态。两者同为 $+1$ 或同为 $-1$ 时乘积为 $+1$，连接加强；一个放电一个不放电时乘积为 $-1$，连接减弱。', 'Take a pair of neurons $i$ and $j$ in one episode. If both are $+1$ or both are $-1$, the product is $+1$ and the connection strengthens. If one fires and the other does not, the product is $-1$ and it weakens.'),
        b('每段经历都做一次这样的加减，再把所有经历的结果相加，得到最终的连接强度。', 'Do this once for every episode, then add up the results to get the final connection strengths.'),
        b('每段经历只需出现一次就完成写入，对应「经历一次就能记住」。', 'Each episode needs to appear only once to be written, matching memory after one experience.'),
      ],
      example: b(
        '4 个神经元，一段经历的模式是 $(+1, +1, -1, -1)$。神经元 1 和 2 同时放电，$W_{12}$ 增加 $\\tfrac14$；神经元 1 放电而 3 不放电，$W_{13}$ 减少 $\\tfrac14$；神经元 3 和 4 都不放电，$W_{34}$ 增加 $\\tfrac14$。',
        'Four neurons, one episode with the pattern $(+1, +1, -1, -1)$. Neurons 1 and 2 fire together, so $W_{12}$ rises by $\\tfrac14$. Neuron 1 fires and 3 does not, so $W_{13}$ falls by $\\tfrac14$. Neither 3 nor 4 fires, so $W_{34}$ rises by $\\tfrac14$.'),
      consequences: [
        b('可存的经历数有上限：在这个理想模型中约为 $0.14N$ 段，超过后不同记忆混在一起，出现错误回忆。', 'Capacity is limited: about $0.14N$ episodes in this idealized model. Beyond that, memories blend and recall goes wrong.'),
        b('记忆不在某个位置，而是分散在整张连接表里；损坏少量连接，记忆仍能大致保留。', 'A memory sits in no single place but across the whole connection table, so losing a few connections leaves it largely intact.'),
      ],
      limitations: [
        b('真实 CA3 的放电很稀疏，不是一半 $+1$、一半 $-1$；稀疏编码可以显著提高容量。', 'Real CA3 firing is sparse, not half $+1$ and half $-1$, and sparse coding raises capacity considerably.'),
        b('模型只存「哪些细胞一起放电」，不存先后顺序。', 'The model stores which cells fire together, not their order.'),
        b('生物突触的加强需要 NMDA 受体和蛋白质合成，模型把这些简化成一次加法。', 'Real synapses need NMDA receptors and protein synthesis to strengthen. The model reduces this to one addition.'),
      ],
    },
    {
      title: b('读出：反复迭代，把部分线索补全成完整记忆', 'Reading out: iteration completes a partial cue into the full memory'),
      tex: t`x_i(t+1) = \operatorname{sign}\Big(\sum_{j} W_{ij}\, x_j(t)\Big)`,
      symbols: [
        { tex: t`x_j(t)`, meaning: b('第 $t$ 步时神经元 $j$ 的状态，$+1$ 或 $-1$；线索中未知的神经元先记为 $0$', 'state of neuron $j$ at step $t$, $+1$ or $-1$; neurons the cue leaves unknown start at $0$') },
        { tex: t`\sum_{j} W_{ij}\, x_j(t)`, meaning: b('神经元 $i$ 收到的总输入：其他神经元的状态按连接强度加权后相加', 'total input to neuron $i$: the states of the other neurons, weighted by connection strength and summed') },
        { tex: t`\operatorname{sign}`, meaning: b('取符号：总输入为正则放电（$+1$），为负则不放电（$-1$）', 'sign: fire ($+1$) if the total input is positive, stay silent ($-1$) if negative') },
      ],
      steps: [
        b('从线索开始：线索只给出部分神经元的状态，其余记为 $0$。', 'Start from the cue: it gives the states of some neurons, and the rest start at $0$.'),
        b('每个神经元汇总来自其他神经元的输入，按正负决定下一步是否放电。', 'Each neuron sums its input from the others and fires next step if the sum is positive.'),
        b('重复几步后状态不再变化，停在一个已存的模式上，这就是回忆出的完整经历。', 'After a few steps the state stops changing at a stored pattern. That pattern is the recalled episode.'),
      ],
      example: b(
        '接上例，线索只知道前两个神经元：$(+1, +1, 0, 0)$。神经元 3 收到的输入是 $W_{31} + W_{32} = -\\tfrac14 - \\tfrac14 < 0$，所以不放电；神经元 4 同理。一步就补全为 $(+1, +1, -1, -1)$。',
        'Continuing the example, the cue knows only the first two neurons: $(+1, +1, 0, 0)$. Neuron 3 receives $W_{31} + W_{32} = -\\tfrac14 - \\tfrac14 < 0$, so it stays silent, and neuron 4 likewise. One step completes the pattern to $(+1, +1, -1, -1)$.'),
      consequences: [
        b('线索越完整、存的记忆越少，补全越可靠。', 'The fuller the cue and the fewer the stored memories, the more reliable the completion.'),
        b('线索同时接近两段相似的记忆时，状态可能停在两者的混合上，对应真实回忆中的混淆。齿状回的模式分离正是为了减少这种重叠。', 'When a cue is close to two similar memories, the state can settle on a blend of them, like confusion in real recall. Pattern separation in the dentate gyrus exists to reduce this overlap.'),
      ],
      limitations: [
        b('模型里所有神经元同步更新；真实神经元异步放电、带噪声，并受抑制性中间神经元调控。', 'All neurons update in step in the model. Real neurons fire asynchronously, with noise, under control of inhibitory interneurons.'),
        b('模型里读出不改变连接，而真实记忆每次回忆都可能被再巩固改写。', 'Reading out leaves the connections unchanged in the model, while real recall can rewrite memory through reconsolidation.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('检索：按余弦相似度选出前 $k$ 个片段', 'Retrieval: picking the top $k$ chunks by cosine similarity'),
      tex: t`s_i = \frac{E(q)\cdot E(d_i)}{\lVert E(q)\rVert\,\lVert E(d_i)\rVert},\qquad \mathcal{D}_k = \operatorname{top\text{-}k}_{\,i}\; s_i`,
      symbols: [
        { tex: t`q`, meaning: b('用户的问题', 'the user query') },
        { tex: t`d_i`, meaning: b('向量库中第 $i$ 个文本片段', 'the $i$-th chunk in the store') },
        { tex: t`E(\cdot)`, meaning: b('嵌入模型，把一段文本变成一个向量', 'the embedding model, which turns text into a vector') },
        { tex: t`s_i`, meaning: b('相似度，在 $-1$ 到 $1$ 之间，越接近 $1$ 表示两个向量方向越一致', 'similarity between $-1$ and $1$; closer to $1$ means the vectors point the same way') },
        { tex: t`\mathcal{D}_k`, meaning: b('被取回的 $k$ 个片段', 'the $k$ retrieved chunks') },
      ],
      steps: [
        b('把问题和每个片段都变成向量。', 'Turn the query and every chunk into vectors.'),
        b('计算两个向量夹角的余弦：分子把两个向量逐维相乘再相加，分母除以两者的长度，所以只看方向，不看长短。', 'Compute the cosine of the angle between them. The numerator multiplies the vectors dimension by dimension and adds up, and the denominator divides by their lengths, so only direction counts.'),
        b('按相似度排序，取最高的 $k$ 个放进上下文。实际系统沿近似最近邻索引查找，不必与每个片段逐一比较。', 'Sort by similarity and put the top $k$ into the context. Real systems walk an approximate nearest neighbor index instead of comparing every chunk.'),
      ],
      example: b(
        '问题「上周在咖啡馆见了谁」与片段「周二下午在咖啡馆和小王聊项目」语义接近，得分高。片段「上周的会议纪要」也和「上周」相关，可能同样被取回，尽管它与见面无关。',
        'The query “who did I meet at the café last week” is close in meaning to the chunk “Tuesday afternoon, discussed the project with Wang at the café”, so it scores high. The chunk “minutes of last week’s meeting” also relates to last week and may be retrieved too, although it has nothing to do with the meeting at the café.'),
      consequences: [
        b('相似度只看语义接近程度，所以不需要关键词完全匹配。', 'Similarity measures closeness of meaning, so keywords need not match exactly.'),
        b('相似的片段得分相近，常被一起取回，这是 RAG 混淆相似经历的来源。', 'Similar chunks score alike and come back together. This is where RAG confuses similar episodes.'),
      ],
      limitations: [
        b('分数不包含时间顺序、因果关系，也不知道一个片段属于哪段经历。', 'The score carries no order, no causal links and no notion of which episode a chunk belongs to.'),
        b('答案需要几条信息串联时（先找到人，再找到他说过的话），一次相似度检索往往取不全。', 'When an answer needs a chain of facts, such as first the person and then what they said, one similarity search often misses part of it.'),
      ],
    },
    {
      title: b('与联想记忆的联系：现代 Hopfield 网络与注意力形式相同', 'The link to associative memory: modern Hopfield networks share the form of attention'),
      tex: t`\xi^{\text{new}} = X\,\operatorname{softmax}\!\big(\beta\, X^{\top}\xi\big)`,
      symbols: [
        { tex: t`X`, meaning: b('矩阵，每一列是一个已存的模式；在注意力中对应各个位置的键和值', 'a matrix whose columns are stored patterns; in attention, the keys and values of each position') },
        { tex: t`\xi`, meaning: b('当前的查询状态', 'the current query state') },
        { tex: t`X^{\top}\xi`, meaning: b('查询与每个已存模式的点积相似度', 'dot-product similarity between the query and each stored pattern') },
        { tex: t`\beta`, meaning: b('锐度：越大，越倾向于只取回最相似的那一个', 'sharpness: the larger it is, the more retrieval picks only the most similar pattern') },
        { tex: t`\operatorname{softmax}`, meaning: b('把相似度变成总和为 $1$ 的权重', 'turns similarities into weights that sum to $1$') },
      ],
      steps: [
        b('计算查询与每个已存模式的点积相似度。', 'Compute the dot-product similarity between the query and each stored pattern.'),
        b('用 softmax 把相似度变成权重，越相似权重越大。', 'Softmax turns the similarities into weights, larger for more similar patterns.'),
        b('把已存模式按权重相加，得到更新后的状态。$\\beta$ 足够大时，一步就几乎只取回最相似的模式。', 'Add the stored patterns by weight to get the new state. With a large $\\beta$, one step returns almost only the most similar pattern.'),
      ],
      consequences: [
        b('上面的经典赫布模型和 Transformer 注意力，可以看成同一类联想记忆在不同设定下的形式。', 'The classic Hebbian model above and transformer attention can be seen as forms of the same kind of associative memory under different settings.'),
        b('现代形式能存的模式数随向量维度呈指数增长，远多于经典模型的 $0.14N$。', 'The modern form stores a number of patterns that grows exponentially with dimension, far beyond the classic $0.14N$.'),
      ],
      limitations: [
        b('这是数学形式上的联系，不说明海马在使用注意力。', 'The link is mathematical. It does not show that the hippocampus uses attention.'),
        b('RAG 的写入、索引和管理都在模型之外；这个公式只描述模型读取上下文时的计算。', 'Writing, indexing and managing in RAG all happen outside the model. The equation only describes how the model reads its context.'),
      ],
    },
  ],
  limits: {
    biological: [
      b('回忆是重建出来的：细节会随时间丢失，会被事后信息、先验和情绪改写，也会形成从未发生过的虚假记忆。', 'Recall is rebuilt. Details fade and are reshaped by later information, prior beliefs and emotion, and false memories of events that never happened can form.'),
      b('相似的经历会相互干扰；模式分离只能减少、不能消除这种干扰。', 'Similar episodes interfere with each other. Pattern separation reduces this interference but cannot remove it.'),
      b('能长期保留的只是少数经历，大多数日常细节很快就无法回忆。', 'Only a few experiences are kept long term, and most everyday details soon become unrecallable.'),
    ],
    computational: [
      b('写入、分段、关联和遗忘都要靠外部设计，系统不会自己判断什么值得记。', 'Writing, splitting, linking and forgetting all depend on external design. The system does not judge what is worth keeping.'),
      b('检索依赖文本相似度，换一种说法或需要多步联想时容易失败。HippoRAG 用知识图谱改善多步检索，仍是研究原型。', 'Retrieval depends on text similarity and fails with rephrased or multi-step cues. HippoRAG improves multi-step retrieval with a knowledge graph but remains a research prototype.'),
      b('检索到的内容不会进入模型参数，同样的问题每次都要重新检索。', 'Retrieved content never enters the parameters, so the same question needs retrieval every time.'),
      b('2025 年测试的多个大语言模型，在涉及多个相关事件和复杂时空关系的情景记忆任务上表现不佳。', 'Several large language models tested in 2025 struggled with episodic memory tasks involving several related events and complex relations of time and place.'),
    ],
    unsupported: [
      b('不能说海马就是向量数据库。按索引理论，海马存的是指向皮层表征的索引，不是内容本身，而且这一理论仍有争议。', 'The hippocampus is not a vector database. Under indexing theory it stores an index to cortical representations, not the content itself, and the theory is debated.'),
      b('不能说 RAG 实现了情景记忆。两者只在「凭线索取回过去的内容」这一功能上相近，事件绑定、模式分离和巩固在 RAG 中都没有对应。', 'RAG does not implement episodic memory. The two share only the function of retrieving past content from a cue. Event binding, pattern separation and consolidation have no counterpart in RAG.'),
      b('不能因为现代 Hopfield 网络与注意力形式相同，就认为海马的计算方式与 Transformer 相同。', 'That modern Hopfield networks share the form of attention does not mean the hippocampus computes like a transformer.'),
    ],
  },
  refs: {
    neuro: ['tulving2002', 'hafting2005', 'yassa2011', 'leutgeb2007', 'bliss1993', 'rolls2013', 'teyler2007', 'danker2010', 'lisman2005', 'frey1997', 'girardeau2009', 'nader2000', 'zacks2007', 'brady2008', 'schacter1999'],
    models: ['mcclelland1995', 'hopfield1982', 'amit1985', 'ramsauer2020', 'whittington2020'],
    ai: ['lewis2020', 'karpukhin2020', 'malkov2020', 'liu2024', 'fountas2025', 'gutierrez2024', 'huet2025'],
  },
}
