import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F03 Multisensory integration: multisensory integration circuits vs multimodal fusion models. */
export const MULTISENSORY: TopicContent = {
  thesis: {
    biological: b(
      '大脑按可靠性合并各个感官：哪个感官此刻更可靠，权重就越大，合并后的估计比任何单一感官都更精确。合并之前，大脑还要判断几个信号是否来自同一个事物：时间和位置接近才合并，相差太远就分开处理。',
      'The brain combines the senses by reliability. Whichever sense is more reliable at the moment gets more weight, and the combined estimate is more precise than any single sense. Before combining, the brain also judges whether the signals come from one thing. Signals close in time and place are merged, and distant ones are kept apart.'),
    computational: b(
      '多模态模型为图像、声音和文字各配一个编码器，再把它们映射到同一个向量空间（CLIP、ImageBind 用对比学习对齐），或用交叉注意力让语言模型读取图像和声音。模型能做跨模态检索、看图回答问题。但融合方式在训练后基本固定，模型通常不估计每个模态此刻的可靠性，也很少判断两个信号是否来自同一个来源。',
      'Multimodal models give images, sound and text their own encoders, then map them into one vector space, aligned by contrastive learning in CLIP and ImageBind, or let a language model read image and audio through cross-attention. They retrieve across modalities and answer questions about images. But the fusion is largely fixed after training. Models usually do not estimate how reliable each modality is right now, and rarely judge whether two signals share a source.'),
    gap: b(
      '两者都把不同感官变成可以相互比较的表示。差距在于每一次判断中的实时推断：大脑根据噪声大小调整权重，并先决定要不要合并；模型的融合由训练数据的统计决定。',
      'Both turn different senses into representations that can be compared. The gap is inference at every judgment. The brain adjusts weights to the current noise and first decides whether to merge at all, while the training data statistics set the fusion in models.'),
  },
  short: { biological: b('多感官回路', 'Multisensory circuits'), computational: b('多模态模型', 'Multimodal models') },
  kinds: ['behavior', 'algorithm', 'math'],
  evidence: 'established',
  asOf: b('计算侧描述截至 2026 年 10 月的主流多模态编码与多模态大模型；具体评测结果按发表年份注明。', 'The computational column describes mainstream multimodal encoders and multimodal large models as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'bio',
      dimension: b('按可靠性加权', 'Weighting by reliability'),
      brain: b('看东西变模糊时，自动更依赖触觉；判断物体大小时，合并后的精度接近统计上的最优值。', 'When vision blurs, people automatically rely more on touch. When judging object size, the precision of the combined estimate comes close to the statistical optimum.'),
      ai: b('融合权重在训练中学到；一些模型能在某个模态缺失时继续工作，但很少按此刻的噪声大小调整对它的依赖。', 'Fusion weights are learned in training. Some models keep working when one modality is missing, but they rarely adjust their reliance to the current noise.'),
      gap: b('大脑在每次判断中重新估计可靠性，模型的权重主要反映训练数据的平均情况。', 'The brain re-estimates reliability at each judgment, while model weights mainly reflect the average of the training data.'),
    },
    {
      lead: 'bio',
      dimension: b('判断是否同一来源', 'Judging a common source'),
      brain: b('声音和画面在时间、位置上接近时才合并；相差较远时就当作两件事处理。', 'Sound and sight are merged only when close in time and place. When far apart, they are treated as two events.'),
      ai: b('多数模型默认输入的各个模态属于同一事件；2024 年的评测中，多数音视频大模型会把画面暗示的声音当成听到的声音。', 'Most models assume all inputs belong to one event. In a 2024 benchmark, most audio-visual large models reported sounds that the picture only implied.'),
      gap: b('「要不要合并」这一步在大脑中是推断出来的，在模型中通常是默认的。', 'Whether to merge is inferred in the brain and usually assumed in models.'),
    },
    {
      lead: 'comp',
      dimension: b('跨模态检索', 'Cross-modal retrieval'),
      brain: b('听到狗叫能想起狗的样子，但联想范围限于自己的经验和记忆。', 'Hearing a bark brings to mind a dog, but associations are limited to one’s own experience and memory.'),
      ai: b('按文字找图像、按声音找图像，可以在数以亿计的库中进行；ImageBind 只用「图像与其他模态」的配对，就让声音和文字之间也能相互检索。', 'Models find images from text or from sound across hundreds of millions of items. ImageBind used only pairs of images with other modalities, yet sound and text became retrievable from each other.'),
      gap: b('在检索的规模和速度上，模型远超个人记忆。', 'In scale and speed of retrieval, models far exceed personal memory.'),
    },
    {
      lead: 'bio',
      dimension: b('学会新的感官组合', 'Learning new sensory pairings'),
      brain: b('经过训练，盲人能通过背上的触觉阵列感知摄像头拍到的物体形状和位置（感官替代）。', 'With training, blind people can perceive the shape and location of objects from a camera through a touch array on the back, called sensory substitution.'),
      ai: b('增加一种新模态需要新的编码器和大量配对数据，并重新训练对齐。', 'Adding a modality needs a new encoder, large amounts of paired data and retraining of the alignment.'),
      gap: b('大脑能在使用中把新的输入接到已有的空间表征上，模型要靠重新训练。', 'The brain connects new input to existing spatial representations during use, while models need retraining.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('各感官通路', 'Separate sensory pathways'),
        points: [
          b('视觉、听觉、触觉的信号先在各自的通路和初级皮层中处理，都以电脉冲的形式传递。', 'Visual, auditory and touch signals are first processed in their own pathways and primary cortices, all carried as electrical pulses.'),
          b('三者的坐标系不同：视觉以眼睛为中心，听觉以头为中心，触觉以身体表面为中心。', 'Their coordinates differ. Vision is centered on the eyes, hearing on the head and touch on the body surface.'),
        ],
      },
      {
        title: b('上丘：快速对齐与转向', 'Superior colliculus: fast alignment and orienting'),
        points: [
          b('中脑上丘的神经元同时接收视觉、听觉和触觉输入，三张空间地图在这里对齐。', 'Neurons in the midbrain superior colliculus receive visual, auditory and touch input, and the three spatial maps align there.'),
          b('两个微弱的刺激在同一时间、同一位置出现时，反应可以超过两者单独反应之和（超加性）；结果直接用来驱动眼和头转向。', 'When two faint stimuli occur at the same time and place, the response can exceed the sum of the single responses, called superadditivity. The result drives the eyes and head to orient.'),
        ],
      },
      {
        title: b('联合皮层：共同的表示', 'Association cortex: a shared representation'),
        points: [
          b('颞上沟整合看到的嘴型和听到的语音；顶叶把各个感官的位置换算到同一个以身体为参照的坐标中。', 'The superior temporal sulcus integrates seen mouth movements with heard speech. Parietal cortex converts the location from each sense into one body-centered frame.'),
          b('换算后，各感官的估计可以直接相加比较。', 'After conversion, the estimates from each sense can be added and compared directly.'),
        ],
      },
      {
        title: b('按可靠性加权', 'Weighting by reliability'),
        points: [
          b('一群神经元的活动不只表示估计值，还表示它有多确定：活动越强、越集中，估计越可靠。', 'A population’s activity encodes not only an estimate but how certain it is. Stronger, more focused activity means a more reliable estimate.'),
          b('下游神经元把各感官的群体活动相加时，可靠的一方贡献更大，自然实现了按可靠性加权。', 'When downstream neurons add the populations from each sense, the more reliable one contributes more, which naturally weights by reliability.'),
        ],
      },
      {
        title: b('判断是否同一来源', 'Judging a common source'),
        points: [
          b('较高级的顶叶和额叶区域比较各感官的时间和位置，推断它们来自同一事物的可能性。', 'Higher parietal and frontal areas compare the timing and location from each sense and infer how likely they share one source.'),
          b('可能性高就合并，低就分开；脑成像研究显示，这一推断在皮层层级的较高位置完成。', 'Merge if likely, keep apart if not. Brain imaging shows this inference happens high in the cortical hierarchy.'),
        ],
      },
      {
        title: b('反馈到各感官', 'Feedback to each sense'),
        points: [
          b('合并后的结果送回各感官区，改变每个感官的知觉本身：例如画面会让声音听起来来自屏幕上说话的人（腹语术效应）。', 'The merged result returns to each sensory area and changes perception itself. For example, a picture makes a voice seem to come from the person speaking on screen, the ventriloquist effect.'),
        ],
      },
    ],
    computational: [
      {
        title: b('各模态编码器', 'Encoder per modality'),
        points: [
          b('图像编码器（如 ViT）、音频编码器（处理频谱的 Transformer）和文本编码器分别把输入变成向量序列。', 'An image encoder such as a ViT, an audio encoder that is a transformer over spectrograms and a text encoder each turn input into a sequence of vectors.'),
          b('各编码器的向量维度和含义互不相同，还不能直接比较。', 'Their vectors differ in size and meaning and cannot yet be compared.'),
        ],
      },
      {
        title: b('投影到共享空间', 'Projection into a shared space'),
        points: [
          b('每个模态用一个线性层把向量映射到同一维度，并归一化成长度为 $1$。', 'Each modality maps its vectors to one dimension with a linear layer and normalizes them to length $1$.'),
          b('此后，不同模态的向量可以用点积直接比较相似度。', 'Vectors from different modalities can then be compared directly by dot product.'),
        ],
      },
      {
        title: b('对比对齐（训练阶段）', 'Contrastive alignment (training)'),
        points: [
          b('训练时，配对的图像和文字（或图像和声音）的向量被拉近，不配对的被推远。', 'In training, the vectors of matching image and text, or image and sound, are pulled together and mismatched ones pushed apart.'),
          b('ImageBind 只用图像作纽带，与其他五种模态分别配对，就让六种模态处于同一个空间。', 'ImageBind uses images as the hub, paired with five other modalities, and all six end up in one space.'),
        ],
      },
      {
        title: b('融合进语言模型', 'Fusion into a language model'),
        points: [
          b('多模态大模型把图像和声音的向量当作额外的词元，或通过交叉注意力让文字词元读取它们。', 'Multimodal large models treat image and audio vectors as extra tokens, or let text tokens read them through cross-attention.'),
          b('读取多少由注意力权重决定，而注意力权重取决于内容的相似度。', 'How much is read depends on attention weights, which depend on similarity of content.'),
        ],
      },
      {
        title: b('输出', 'Output'),
        points: [b('输出文字回答、检索结果或分类。', 'The output is a text answer, retrieval results or a class.')],
      },
      {
        title: b('缺失的两步（虚线框）', 'The two missing steps (dashed boxes)'),
        points: [
          b('没有可靠性估计：模型不单独计算每个模态此刻有多可信。', 'No reliability estimate: the model does not compute separately how trustworthy each modality is right now.'),
          b('没有同源判断：模型默认所有输入描述同一件事。', 'No common-source judgment: the model assumes all inputs describe one event.'),
        ],
      },
    ],
  },
  archNotes: {
    biological: [
      b('可靠性的意思是噪声小：多次测量同一个量时结果分散得越少，就越可靠。黑暗中视觉不可靠，嘈杂中听觉不可靠。', 'Reliability means low noise. The less repeated measurements of one quantity scatter, the more reliable the sense. Vision is unreliable in the dark, hearing in noise.'),
      b('上丘的超加性主要出现在两个刺激都很弱时；刺激都很强时，组合反应往往小于两者之和。这条规律被称为「逆效应」。', 'Superadditivity in the superior colliculus appears mainly when both stimuli are faint. With strong stimuli, the combined response is often less than the sum. This is called inverse effectiveness.'),
      b('「概率群体编码」理论认为，泊松型的放电噪声恰好使「把两群神经元的活动相加」等价于贝叶斯最优的合并。这是一种理论模型，生物实现仍在检验中。', 'The theory of probabilistic population codes holds that Poisson-like spiking noise makes adding two populations equivalent to Bayes-optimal combination. It is a theoretical model whose biological implementation is still being tested.'),
      b('腹语术效应：屏幕上人物的嘴在动时，声音听起来来自屏幕，而不是旁边的扬声器。视觉定位比听觉精确，所以权重更大。', 'Ventriloquist effect: when a person on screen moves their lips, the voice seems to come from the screen rather than the speaker beside it. Vision locates more precisely than hearing, so it gets more weight.'),
      b('时间绑定窗口：声音和画面相差一两百毫秒以内，通常仍被感知为同时发生，并被合并。', 'Temporal binding window: sound and sight within one or two hundred milliseconds of each other are usually still perceived as simultaneous and merged.'),
      b('多感官整合需要发育：在视觉与触觉的大小判断中，儿童约 8 到 10 岁之后才接近按可靠性加权的最优整合，此前常由单一感官主导。', 'Multisensory integration develops. In judging size by sight and touch, children approach reliability-weighted integration only after about 8 to 10 years and are often dominated by one sense before that.'),
      b('感官替代研究始于 1960 年代：把摄像头图像转成背部皮肤上的振动点阵，盲人经训练后能辨认物体并判断位置。', 'Sensory substitution research began in the 1960s. A camera image was turned into a grid of vibrations on the back, and blind people learned to identify and locate objects.'),
      b('「大脑总是最优地整合各感官」是一种简化：成年人在部分任务中接近统计最优；儿童、一些任务和条件下会偏离。「最优」是对特定任务行为的描述。', 'Saying that the brain always integrates the senses optimally is a simplification. Adults come close to the statistical optimum on some tasks. Children, and some tasks and conditions, deviate. Optimal describes behavior on specific tasks.'),
    ],
    computational: [
      b('对比学习只要求配对的向量彼此最接近，不要求向量表示每个模态的噪声大小。', 'Contrastive learning only requires paired vectors to be closest to each other. It does not require vectors to represent the noise of each modality.'),
      b('ImageBind 的音频和文字之间从未直接配对训练，但因为都与图像对齐，二者之间也能相互检索。原论文称之为「涌现」的跨模态能力。', 'ImageBind never trained audio directly against text. Because both align with images, they can retrieve each other, which the paper calls emergent cross-modal ability.'),
      b('Flamingo 在冻结的语言模型各层之间插入带门控的交叉注意力层，门控初始为 $0$，训练中逐渐打开，让语言模型学会读取图像。', 'Flamingo inserts gated cross-attention layers between the layers of a frozen language model. The gates start at $0$ and open during training as the model learns to read images.'),
      b('音视频大模型在 2024 年的 AVHBench 评测中暴露出跨模态幻觉：画面里有狗，模型就容易报告听到了狗叫，即使音频中没有。', 'Audio-visual large models showed cross-modal hallucination on the 2024 AVHBench benchmark. If a dog is in the picture, models tend to report a bark even when the audio has none.'),
      b('时间对齐通常由预处理按时间戳完成，模型本身不会在使用中校准各模态之间的延迟。', 'Timing is usually aligned by preprocessing with timestamps. The model itself does not recalibrate delays between modalities during use.'),
    ],
  },
  bioMath: [
    {
      title: b('按可靠性加权：合并后的估计比任何单一感官都精确', 'Reliability weighting: the combined estimate beats any single sense'),
      tex: t`\hat{S} = w_V \hat{S}_V + w_H \hat{S}_H,\quad w_V = \frac{1/\sigma_V^2}{1/\sigma_V^2 + 1/\sigma_H^2},\quad \sigma_{VH}^2 = \frac{\sigma_V^2\,\sigma_H^2}{\sigma_V^2 + \sigma_H^2}`,
      symbols: [
        { tex: t`\hat{S}_V,\;\hat{S}_H`, meaning: b('视觉和触觉各自给出的估计，例如物体的大小', 'the estimates from vision and touch, such as object size') },
        { tex: t`\sigma_V^2,\;\sigma_H^2`, meaning: b('两个估计的方差：多次测量时结果分散的程度', 'their variances: how much repeated measurements scatter') },
        { tex: t`w_V,\;w_H`, meaning: b('两个感官的权重，$w_H = 1 - w_V$', 'the weights of the two senses, with $w_H = 1 - w_V$') },
        { tex: t`\hat{S}`, meaning: b('合并后的估计', 'the combined estimate') },
        { tex: t`\sigma_{VH}^2`, meaning: b('合并后估计的方差', 'variance of the combined estimate') },
      ],
      steps: [
        b('用方差的倒数表示可靠性：方差越小，可靠性越高。', 'Use the inverse of the variance as reliability. Smaller variance means higher reliability.'),
        b('每个感官的权重等于它的可靠性占总可靠性的比例。', 'Each sense’s weight is its share of the total reliability.'),
        b('按权重求两个估计的平均，得到合并估计；它的方差小于两者中较小的那一个。', 'Average the two estimates by weight to get the combined estimate. Its variance is smaller than the smaller of the two.'),
      ],
      example: b(
        '视觉说物体宽 $10$ 厘米，$\\sigma_V = 1$；触觉说 $12$ 厘米，$\\sigma_H = 2$。可靠性分别是 $1$ 和 $\\tfrac14$，所以 $w_V = 0.8$、$w_H = 0.2$，合并估计为 $0.8 \\times 10 + 0.2 \\times 12 = 10.4$ 厘米。合并后的方差为 $\\tfrac{1 \\times 4}{1 + 4} = 0.8$，标准差约 $0.89$，比视觉单独的 $1$ 更小。',
        'Vision says the object is $10$ cm wide with $\\sigma_V = 1$, touch says $12$ cm with $\\sigma_H = 2$. Reliabilities are $1$ and $\\tfrac14$, so $w_V = 0.8$ and $w_H = 0.2$, and the estimate is $0.8 \\times 10 + 0.2 \\times 12 = 10.4$ cm. The combined variance is $\\tfrac{1 \\times 4}{1 + 4} = 0.8$, a standard deviation of about $0.89$, smaller than vision’s $1$ alone.'),
      consequences: [
        b('看不清时，视觉方差变大，权重自动转向触觉；实验中成年人的权重确实随视觉噪声这样变化。', 'When vision blurs, its variance grows and the weight shifts to touch by itself. In experiments, adults’ weights do change this way with visual noise.'),
        b('合并总比只用最好的感官更精确，这是多感官整合的收益。', 'Combining is always more precise than using the best sense alone. This is the benefit of multisensory integration.'),
      ],
      limitations: [
        b('公式假设两个估计的噪声互不相关、服从正态分布，并且来自同一个物体。', 'The formula assumes independent, normally distributed noise and estimates of one object.'),
        b('儿童和一些任务中的成年人偏离这个最优值；公式描述行为结果，不说明神经元怎样实现。', 'Children, and adults in some tasks, deviate from this optimum. The formula describes behavior, not how neurons implement it.'),
      ],
    },
    {
      title: b('因果推断：先判断是否同一来源，再决定合并多少', 'Causal inference: judge a common source first, then decide how much to merge'),
      tex: t`P(C{=}1 \mid x_V, x_A) = \frac{p(x_V, x_A \mid C{=}1)\,p_c}{p(x_V, x_A \mid C{=}1)\,p_c + p(x_V, x_A \mid C{=}2)\,(1 - p_c)},\qquad \hat{s}_A = P\,\hat{s}_{A}^{\text{merge}} + (1 - P)\,\hat{s}_{A}^{\text{apart}}`,
      symbols: [
        { tex: t`x_V,\;x_A`, meaning: b('视觉和听觉各自感到的位置', 'the positions sensed by vision and hearing') },
        { tex: t`C`, meaning: b('原因的个数：$C = 1$ 表示同一来源，$C = 2$ 表示两个来源', 'number of causes: $C = 1$ for one source, $C = 2$ for two') },
        { tex: t`p_c`, meaning: b('事先认为同一来源的概率（先验）', 'prior probability of a common source') },
        { tex: t`p(x_V, x_A \mid C)`, meaning: b('在某种原因下，出现这一对感觉的可能性', 'how likely this pair of sensations is under each cause') },
        { tex: t`P`, meaning: b('左式算出的同一来源的概率', 'the probability of a common source from the left equation') },
        { tex: t`\hat{s}_A^{\text{merge}},\;\hat{s}_A^{\text{apart}}`, meaning: b('合并时（按可靠性加权）和分开时对声音位置的估计', 'the estimate of sound location when merged, by reliability weighting, and when kept apart') },
      ],
      steps: [
        b('分别计算两种解释下出现这对感觉的可能性：同一来源时，两者应当相近；两个来源时，两者互不相关。', 'Compute how likely this pair of sensations is under each explanation. With one source they should be close. With two sources they are unrelated.'),
        b('结合先验，用贝叶斯公式算出同一来源的概率 $P$。', 'Combine with the prior using Bayes’ rule to get the probability $P$ of a common source.'),
        b('最终估计是两种情况下估计的加权平均，权重就是 $P$ 和 $1 - P$。', 'The final estimate averages the two cases, weighted by $P$ and $1 - P$.'),
      ],
      example: b(
        '腹语术实验中，声音在正前方 $0°$。画面在 $5°$ 时，两者接近，$P$ 约为 $0.9$；合并估计为 $4°$，分开估计为 $0°$，最终听到的位置为 $0.9 \\times 4 + 0.1 \\times 0 = 3.6°$，声音被画面「拉走」。画面移到 $30°$ 时，$P$ 降到约 $0.05$，即使合并估计为 $24°$，最终也只有 $0.05 \\times 24 = 1.2°$，几乎不被拉动。',
        'In a ventriloquist test the sound is straight ahead at $0°$. With the picture at $5°$ the two are close and $P$ is about $0.9$. The merged estimate is $4°$, the separate one $0°$, so the sound is heard at $0.9 \\times 4 + 0.1 \\times 0 = 3.6°$, pulled toward the picture. With the picture at $30°$, $P$ drops to about $0.05$. Even with a merged estimate of $24°$, the result is only $0.05 \\times 24 = 1.2°$, barely pulled.'),
      consequences: [
        b('解释了为什么错位小时感官相互「拉动」，错位大时各说各的。', 'It explains why senses pull on each other when slightly misaligned and go separate ways when far apart.'),
        b('模型的预测与人的定位判断吻合，脑成像中也在较高层级的皮层找到了对应的计算。', 'The model’s predictions match human localization, and brain imaging finds the matching computation high in the cortical hierarchy.'),
      ],
      limitations: [
        b('先验 $p_c$ 和噪声大小是拟合出来的参数，模型不说明它们从哪里学来。', 'The prior $p_c$ and the noise levels are fitted parameters. The model does not say how they are learned.'),
        b('真实场景中常有多于两个的可能来源，计算量会迅速增大。', 'Real scenes often have more than two possible sources, and the computation grows quickly.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('对比对齐：让配对的两个模态在同一空间里最接近', 'Contrastive alignment: matching pairs closest in one space'),
      tex: t`\mathcal{L} = -\frac{1}{N}\sum_{i=1}^{N} \log \frac{\exp(\mathbf{u}_i \cdot \mathbf{v}_i / \tau)}{\sum_{j=1}^{N} \exp(\mathbf{u}_i \cdot \mathbf{v}_j / \tau)}`,
      symbols: [
        { tex: t`\mathbf{u}_i`, meaning: b('第 $i$ 张图像的向量，长度为 $1$', 'vector of image $i$, of length $1$') },
        { tex: t`\mathbf{v}_j`, meaning: b('第 $j$ 段文字或声音的向量，长度为 $1$', 'vector of text or sound $j$, of length $1$') },
        { tex: t`N`, meaning: b('一批训练样本中的配对数', 'number of pairs in a training batch') },
        { tex: t`\tau`, meaning: b('温度：越小，越强调最相似的那一对', 'temperature: the smaller it is, the more the closest pair dominates') },
        { tex: t`\mathcal{L}`, meaning: b('损失，越小表示配对越容易被认出', 'the loss; smaller means pairs are recognized more easily') },
      ],
      steps: [
        b('一批数据中有 $N$ 对图像和文字，算出每张图像与每段文字的点积，得到一个 $N \\times N$ 的相似度表。', 'A batch holds $N$ pairs of images and texts. Compute the dot product of every image with every text, giving an $N \\times N$ table of similarities.'),
        b('对每张图像，把它与所有文字的相似度用 softmax 变成概率，看正确配对的那一项概率有多大。', 'For each image, turn its similarities to all texts into probabilities with softmax and see how much goes to the correct text.'),
        b('损失是正确配对概率的负对数的平均；训练降低损失，就是把配对拉近、把其他推远。', 'The loss averages the negative log of these probabilities. Lowering it pulls pairs together and pushes the rest apart.'),
      ],
      example: b(
        '一批 3 对：（狗的照片，「一只狗」）、（猫的照片，「一只猫」）、（汽车照片，「一辆车」）。若狗照片与三段文字的相似度为 $0.9$、$0.6$、$0.1$，取 $\\tau = 0.1$，正确项的概率约为 $\\tfrac{e^{9}}{e^{9} + e^{6} + e^{1}} \\approx 0.95$。训练会继续拉大 $0.9$ 与 $0.6$ 之间的差距。',
        'A batch of 3 pairs: (dog photo, “a dog”), (cat photo, “a cat”), (car photo, “a car”). If the dog photo has similarities $0.9$, $0.6$ and $0.1$ with the three texts and $\\tau = 0.1$, the correct text gets about $\\tfrac{e^{9}}{e^{9} + e^{6} + e^{1}} \\approx 0.95$. Training keeps widening the gap between $0.9$ and $0.6$.'),
      consequences: [
        b('训练后，任何模态的向量都能与其他模态直接比较，所以能按文字找图、按声音找图。', 'After training, vectors from any modality compare directly with the others, so text and sound can find images.'),
        b('与图像对齐的两个模态之间也会间接对齐，这是 ImageBind 能在声音和文字之间检索的原因。', 'Two modalities aligned with images also align with each other indirectly, which is why ImageBind retrieves between sound and text.'),
      ],
      limitations: [
        b('目标只关心「哪一对是配对的」，不要求向量表示某个模态此刻有多可靠。', 'The objective cares only about which pairs match, not about how reliable a modality is right now.'),
        b('训练数据中的配对默认来自同一事件，模型因此学不到「两个信号可能无关」。', 'Training pairs are assumed to come from one event, so the model never learns that two signals may be unrelated.'),
      ],
    },
    {
      title: b('门控交叉注意力：语言模型读取图像的程度由学到的门控制', 'Gated cross-attention: a learned gate sets how much the language model reads the image'),
      tex: t`\mathbf{h}' = \mathbf{h} + \tanh(\alpha)\cdot \operatorname{softmax}\!\Big(\frac{(W_Q\mathbf{h})(W_K Z)^{\top}}{\sqrt{d}}\Big)\, W_V Z`,
      symbols: [
        { tex: t`\mathbf{h}`, meaning: b('语言模型中一个文字词元的向量', 'vector of one text token in the language model') },
        { tex: t`Z`, meaning: b('图像编码器输出的一组视觉向量', 'the set of visual vectors from the image encoder') },
        { tex: t`W_Q,\,W_K,\,W_V`, meaning: b('把文字变成查询、把图像变成键和值的矩阵', 'matrices that turn text into queries and images into keys and values') },
        { tex: t`\alpha`, meaning: b('学到的门控参数，初始为 $0$', 'learned gate parameter, starting at $0$') },
        { tex: t`d`, meaning: b('向量维度', 'vector dimension') },
        { tex: t`\mathbf{h}'`, meaning: b('读取图像后更新的文字向量', 'the text vector after reading the image') },
      ],
      steps: [
        b('文字词元发出查询，与每个视觉向量的键比较相似度，用 softmax 变成权重。', 'The text token sends a query, compares it with the key of every visual vector and turns the similarities into weights with softmax.'),
        b('按权重汇总视觉向量的值，得到「从图像中读到的内容」。', 'Sum the values of the visual vectors by weight to get what was read from the image.'),
        b('乘以 $\\tanh(\\alpha)$ 后加回原来的文字向量。$\\alpha = 0$ 时完全不读图像，训练中 $\\alpha$ 逐渐变大。', 'Multiply by $\\tanh(\\alpha)$ and add to the original text vector. With $\\alpha = 0$ nothing is read, and $\\alpha$ grows during training.'),
      ],
      example: b(
        '训练开始时 $\\alpha = 0$，$\\tanh(0) = 0$，语言模型的输出与不看图时完全相同，原有的语言能力不受破坏。训练后若 $\\alpha = 0.5$，$\\tanh(0.5) \\approx 0.46$，图像信息以这个比例加进每一层。',
        'At the start $\\alpha = 0$ and $\\tanh(0) = 0$, so the output equals that of the model without the image and language ability is untouched. If training ends at $\\alpha = 0.5$, $\\tanh(0.5) \\approx 0.46$, and image information enters each layer at that scale.'),
      consequences: [
        b('冻结的语言模型可以逐步学会读取图像，而不忘记原有的语言能力。', 'A frozen language model can gradually learn to read images without losing its language ability.'),
        b('每个词元读取哪些视觉向量由内容相似度决定，所以回答能指向图中相关的部分。', 'Which visual vectors each token reads depends on content similarity, so answers can point to relevant parts of the image.'),
      ],
      limitations: [
        b('门控 $\\alpha$ 训练后固定，图像模糊或无关时，读取的比例不会随之降低。', 'The gate $\\alpha$ is fixed after training, so the share read does not drop when the image is blurry or unrelated.'),
        b('注意力权重反映内容相似度，不是对可靠性的估计。', 'Attention weights reflect content similarity, not an estimate of reliability.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('会被错觉带偏', 'Pulled by illusions'),
        text: b('看到发「ga」的嘴型、同时听到「ba」，许多人会听成「da」（McGurk 效应）；画面也会把声音的位置拉向屏幕。', 'Seeing lips say “ga” while hearing “ba”, many people hear “da”, the McGurk effect. A picture also pulls the location of a sound toward the screen.'),
        steps: [3, 6],
      },
      {
        title: b('最优整合有条件', 'Optimal only under conditions'),
        text: b('接近最优的加权见于成年人的部分任务；儿童和一些任务中的成年人会偏离，常由单一感官主导。', 'Near-optimal weighting appears in adults on some tasks. Children, and adults on some tasks, deviate and are often dominated by one sense.'),
        steps: [4],
      },
      {
        title: b('适应新的延迟需要时间', 'New delays take time'),
        text: b('音画延迟改变后，需要几分钟的经历才能重新校准，期间会感到不同步。', 'When the delay between sound and picture changes, recalibration takes minutes of experience, and things feel out of sync meanwhile.'),
        steps: [5],
      },
    ],
    computational: [
      {
        title: b('不估计可靠性', 'No reliability estimate'),
        text: b('一个模态质量很差时，模型不一定降低对它的依赖；融合比例主要来自训练数据的平均情况。', 'When one modality is poor, the model does not necessarily rely on it less. The fusion mainly reflects the training data on average.'),
        steps: [4, 6],
      },
      {
        title: b('默认同一来源', 'Assumes one source'),
        text: b('2024 年的 AVHBench 评测中，多数音视频大模型会把画面暗示的声音当成听到的声音，或把声音暗示的物体当成看到的物体。', 'On the 2024 AVHBench benchmark, most audio-visual large models reported sounds implied by the picture as heard, or objects implied by the sound as seen.'),
        steps: [6],
      },
      {
        title: b('新模态要重新训练', 'New modalities need retraining'),
        text: b('增加一种感官需要新的编码器和大量配对数据，并重新训练对齐。', 'Adding a sense needs a new encoder, large amounts of paired data and new alignment training.'),
        steps: [1, 3],
      },
    ],
    misreadings: [],
  },
  refs: {
    neuro: ['ernst2002', 'alais2004', 'meredith1983', 'stein2008', 'rohe2015', 'mcgurk1976', 'fujisaki2004', 'gori2008', 'bachyrita1969'],
    models: ['kording2007', 'ma2006'],
    ai: ['radford2021', 'girdhar2023', 'alayrac2022', 'sungbin2024'],
  },
}
