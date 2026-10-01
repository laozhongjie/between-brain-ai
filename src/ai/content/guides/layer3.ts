import type { CardGuide } from '../../types'

const b = (zh: string, en: string) => ({ zh, en })

export const CIRCUIT_GUIDES: Record<string, CardGuide> = {
  normalization: {
    question: b('输入忽然变强，系统怎样避免被淹没？', 'How does a system cope when inputs suddenly get stronger?'),
    answer: b('大脑和 AI 都会调节信号强度。相似的是控制增益的作用，不是完全相同的运算。', 'Both brains and AI regulate signal strength. They share a gain-control function, not an identical operation.'),
    scope: b('比较感觉系统的除法归一化与 softmax、LayerNorm；这些方法各自归一化的对象不同。', 'Compares sensory divisive normalisation with softmax and LayerNorm, which normalise different quantities.'),
    comparisons: [
      { dimension: b('参考谁的活动', 'Reference pool'), brain: b('响应受周围或相关神经元群体的活动调节。', 'Responses depend on activity in neighbouring or related populations.'), ai: b('LayerNorm 通常使用单个 token 的特征；softmax 使用一组分数。', 'LayerNorm typically uses a token’s features; softmax uses a set of scores.') },
      { dimension: b('怎样调节', 'Operation'), brain: b('输入除以活动池与常数项，增益可随情境改变。', 'Divides input by pooled activity plus a constant; gain can vary with context.'), ai: b('LayerNorm 居中并缩放；softmax 把分数变成总和为 1 的权重。', 'LayerNorm centres and scales; softmax produces weights that sum to one.') },
    ],
    borrow: b('让单元根据其他单元的活动调整响应，避免少数强信号主导整个网络。', 'Adjust each unit relative to other units so a few strong signals do not dominate.'),
    boundary: b('归一化有多种神经机制解释，不能简单等同于某一种抑制细胞，也不能把 LayerNorm 当作皮层模型。', 'Several neural mechanisms can explain normalisation. Neither one inhibitory cell type nor LayerNorm is a complete cortical account.'),
    experiments: [
      { title: b('按邻域归一化', 'Normalise within neighbourhoods'), change: b('用局部特征池替换一层全局特征归一化。', 'Replace one global feature normalisation with local pools.'), test: b('对比亮度和对比度变化下的准确率，并保持参数预算一致。', 'Compare accuracy under brightness and contrast shifts at matched parameter budgets.'), tradeoff: b('局部池可能丢失跨区域信息；池大小需要调参。', 'Local pools can miss distant context; pool size needs tuning.') },
      { title: b('让增益随任务变化', 'Condition gain on the task'), change: b('用任务信号控制归一化后的缩放系数。', 'Use a task signal to set post-normalisation scaling.'), test: b('比较固定增益与任务增益在干扰物任务中的误差。', 'Compare fixed and task-conditioned gain on distractor tasks.'), tradeoff: b('错误任务信号可能压制真正重要的输入。', 'An incorrect task signal may suppress relevant inputs.') },
    ],
  },
  'feedback-predictive': {
    question: b('第一眼看不清时，能不能再想一轮？', 'Can a system take another look when the first pass is unclear?'),
    answer: b('反馈让高层解释影响低层处理。预测编码用“预测与输入的差距”描述这个过程，但其脑内实现仍有争议。', 'Feedback lets high-level interpretations influence lower-level processing. Predictive coding models this using prediction errors, but its neural implementation remains debated.'),
    scope: b('比较预测编码模型与单次前馈网络；JEPA、扩散和循环网络提供不同形式的预测或迭代。', 'Compares predictive-coding models with single-pass networks; JEPA, diffusion and recurrent models offer distinct forms of prediction or iteration.'),
    comparisons: [
      { dimension: b('信息方向', 'Information flow'), brain: b('感觉皮层既有前馈连接，也有大量反馈连接。', 'Sensory cortex has both feedforward and extensive feedback connections.'), ai: b('单次前馈模型逐层计算；循环或迭代模型可以反复更新。', 'Single-pass models compute layer by layer; recurrent or iterative models can update repeatedly.') },
      { dimension: b('误差在哪里用', 'Use of error'), brain: b('预测编码假说认为局部预测误差参与更新表征。', 'Predictive coding proposes that local errors update representations.'), ai: b('训练损失用于学习参数；不一定在部署时迭代修正当前表征。', 'Training losses update parameters; deployed inference need not iteratively refine the current representation.') },
    ],
    borrow: b('对难以解释的输入追加计算，对已经稳定的部分提前停止。', 'Spend extra computation on hard-to-explain inputs and stop updating stable parts.'),
    boundary: b('不能把“大脑只上传误差”当作已确定事实；多步生成也不自动等于皮层预测编码。', 'It is not established that the brain sends only errors upward; multi-step generation is not automatically cortical predictive coding.'),
    experiments: [
      { title: b('按误差更新局部区域', 'Update regions by prediction error'), change: b('在视频模型中缓存稳定区域，仅重算预测误差较大的区域。', 'Cache stable regions in a video model and recompute regions with larger errors.'), test: b('对比完整重算，记录准确率、延迟及漏掉突发事件的比例。', 'Compare with full recomputation on accuracy, latency and missed sudden events.'), tradeoff: b('错误预测可能让系统反复忽略重要变化。', 'Bad predictions can cause important changes to be repeatedly ignored.') },
      { title: b('为困难输入多迭代几次', 'Refine difficult inputs'), change: b('增加可重复使用的修正模块，并限制最大迭代数。', 'Add a reusable refinement module with a capped iteration count.'), test: b('与固定步数模型比较遮挡识别和平均计算量。', 'Compare occlusion recognition and average compute against fixed-step models.'), tradeoff: b('需要可靠停止条件，否则可能更慢却没有更准确。', 'Without a reliable stopping rule it may be slower without becoming more accurate.') },
    ],
  },
  attractors: {
    question: b('只看到一部分线索，怎样找回完整记忆？', 'How can a partial cue retrieve a whole memory?'),
    answer: b('联想记忆按内容找答案。吸引子模型通过反复更新补全模式，注意力则按相似度读取已有内容。', 'Associative memory retrieves by content. Attractor models refine a pattern over time; attention reads stored content by similarity.'),
    scope: b('比较海马模式补全的吸引子解释与现代 Hopfield 模型、标准注意力读取。', 'Compares attractor accounts of hippocampal pattern completion with modern Hopfield models and standard attention retrieval.'),
    comparisons: [
      { dimension: b('读取过程', 'Retrieval'), brain: b('循环活动可能帮助残缺线索恢复为较完整的活动模式。', 'Recurrent activity may turn a partial cue into a more complete activity pattern.'), ai: b('一次注意力运算读取加权内容；也可以额外设计多次读取。', 'One attention operation reads weighted content; repeated retrieval can be added.') },
      { dimension: b('保存多久', 'Persistence'), brain: b('长期记忆与连接变化相关，短时维持还可依赖活动。', 'Long-term memory involves connection changes; short-term retention can also depend on activity.'), ai: b('标准 KV 缓存通常限于当前上下文；持久记忆需要另行存储。', 'A standard KV cache usually lasts for the current context; persistent memory needs separate storage.') },
    ],
    borrow: b('用线索与已存内容的相似度来检索，并允许在信息不足时继续补全。', 'Retrieve through similarity to stored content and allow further completion when cues are incomplete.'),
    boundary: b('Hopfield 更新与注意力的数学联系不证明 Transformer 实现了海马的全部功能；补全也可能产生错误记忆。', 'The mathematical Hopfield–attention connection does not establish full hippocampal function in Transformers; completion can also retrieve the wrong memory.'),
    experiments: [
      { title: b('跨会话保存有用片段', 'Retain useful content across sessions'), change: b('把被反复使用的记忆写入有容量上限的外部库。', 'Write repeatedly useful memories to a capacity-limited external store.'), test: b('用跨会话问答比较命中率、误检率和检索延迟。', 'Compare cross-session retrieval accuracy, false retrievals and latency.'), tradeoff: b('旧内容会过时，需要删除和来源追踪。', 'Stored content becomes stale and needs deletion and provenance.') },
      { title: b('用残缺线索检验补全', 'Test completion from incomplete cues'), change: b('在一次读取后追加有限次数的联想更新。', 'Add a limited number of associative updates after the first read.'), test: b('逐步增加线索缺失率，与单次检索比较正确恢复率。', 'Increase cue corruption and compare correct recovery with single-step retrieval.'), tradeoff: b('重复读取可能放大最初的错误匹配。', 'Repeated retrieval can amplify the initial wrong match.') },
    ],
  },
  expansion: {
    question: b('为什么先把表示变大，反而可能更容易学习？', 'Why can expanding a representation make learning easier?'),
    answer: b('把混在一起的输入展开为更多特征，简单读出层也可能分开它们；前提是扩展保留了任务所需的信息。', 'Expanding mixed inputs into more features can make them separable by a simple readout, provided the expansion preserves task-relevant information.'),
    scope: b('比较小脑颗粒细胞的稀疏扩展、随机特征与常见 Transformer 前馈层。', 'Compares sparse cerebellar granule-cell expansion, random features and typical Transformer feedforward layers.'),
    comparisons: [
      { dimension: b('连接方式', 'Connectivity'), brain: b('颗粒细胞从少量输入组合出大量不同特征。', 'Granule cells combine a small number of inputs into many distinct features.'), ai: b('常见前馈层采用可训练的稠密矩阵；随机特征可固定扩展矩阵。', 'Typical feedforward layers use learned dense matrices; random features can fix the expansion matrix.') },
      { dimension: b('学习的位置', 'Where learning occurs'), brain: b('简化小脑模型强调扩展后读出连接的误差驱动学习。', 'Simplified cerebellar models emphasise error-driven learning at the readout.'), ai: b('标准前馈层两侧矩阵都训练；随机特征方法主要训练读出。', 'Standard feedforward layers train both matrices; random-feature methods mainly train the readout.') },
    ],
    borrow: b('把稳定的特征展开与快速更新的读出分开，让在线适应只改少量参数。', 'Separate stable feature expansion from a fast-changing readout so online adaptation updates few parameters.'),
    boundary: b('扩展维度不是越大越好；真实小脑还有时间动态、多处可塑性和反馈，不能简化成一个固定随机层。', 'Larger is not always better. Real cerebellar circuits also have temporal dynamics, multiple plastic sites and feedback.'),
    experiments: [
      { title: b('只训练快速读出', 'Train only a fast readout'), change: b('固定稀疏扩展层，在线更新线性控制头。', 'Freeze a sparse expansion and update a linear control head online.'), test: b('改变负载后，与全网络微调比较恢复速度和计算成本。', 'After changing a load, compare recovery speed and compute with full-network fine-tuning.'), tradeoff: b('固定特征若不包含新任务信息，读出层无法弥补。', 'A readout cannot recover task information missing from the fixed features.') },
      { title: b('寻找合适的扩展规模', 'Choose an expansion budget'), change: b('同时扫描扩展宽度、连接稀疏度和激活比例。', 'Vary expansion width, wiring sparsity and active fraction.'), test: b('绘制任务误差与实测内存、延迟的关系。', 'Plot task error against measured memory use and latency.'), tradeoff: b('更少的乘法不一定在当前硬件上运行得更快。', 'Fewer multiplications need not run faster on the target hardware.') },
    ],
  },
}
