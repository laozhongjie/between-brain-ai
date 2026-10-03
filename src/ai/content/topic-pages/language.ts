import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F35 Language structure and meaning: the left-hemisphere language network vs large language models. */
export const LANGUAGE: TopicContent = {
  thesis: {
    biological: b(
      '左半球额叶和颞叶的一组区域专门处理语言的结构和意义：对有意义的句子反应强，对无意义的字串、音乐和算术几乎不反应。这个语言网络受损的失语症患者，仍能做算术、下棋、理解别人的意图，说明语言与思维可以分离。理解时大脑不断预测下一个词，出乎意料的词引起更大的反应。儿童到十几岁接触的词数估计不超过一亿个。',
      'A set of regions in the left frontal and temporal lobes specializes in the structure and meaning of language. They respond strongly to meaningful sentences and barely to nonsense strings, music or arithmetic. People with aphasia from damage to this language network can still do arithmetic, play chess and understand others’ intentions, so language and thought can come apart. During comprehension the brain keeps predicting the next word, and unexpected words evoke larger responses. Children are estimated to hear under a hundred million words by their early teens.'),
    computational: b(
      '大语言模型通过预测下一个词元学习，语法、词义和语用都很流畅；它们的内部表示能预测人脑语言网络对句子的反应，而且预测下一个词越准的模型，预测脑反应也越好。但训练用的文本比儿童接触的语言多好几个数量级。模型在语法等形式能力上接近人，在推理、稳定运用世界知识等功能能力上则不稳定。',
      'Large language models learn by predicting the next token and are fluent in grammar, word meaning and pragmatics. Their internal representations predict how the human language network responds to sentences, and models better at next-word prediction predict brain responses better. But they train on several orders of magnitude more text than children hear. They come close to people in formal ability such as grammar but are unstable in functional abilities such as reasoning and consistent use of world knowledge.'),
    gap: b(
      '两边都依赖预测，内部表示有可测量的相似。差距在于学习效率和与世界的联系：儿童用少几个数量级的语言，结合感知和社交学会说话；大语言模型的语言能力强于它背后的推理和世界模型。',
      'Both rely on prediction, and their internal representations are measurably similar. The gap lies in learning efficiency and grounding. Children learn to talk from orders of magnitude less language, combined with perception and social life. In large language models, language ability outruns the reasoning and world model behind it.'),
  },
  short: { biological: b('语言网络', 'Language network'), computational: b('大语言模型', 'LLMs') },
  kinds: ['behavior', 'representation', 'algorithm'],
  evidence: 'established',
  asOf: b('AI 侧描述截至 2026 年 10 月的大语言模型；具体研究结果按发表年份注明。', 'The AI column describes large language models as of October 2026. Study results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('语法与流畅度', 'Grammar and fluency'),
      brain: b('母语者能毫不费力地理解和说出符合语法的长句，也能判断句子是否通顺。', 'Native speakers effortlessly understand and produce long grammatical sentences and judge whether sentences sound right.'),
      ai: b('大语言模型生成的文字在语法和流畅度上与人写的难以区分。', 'Text from large language models is hard to tell apart from human writing in grammar and fluency.'),
      gap: b('在语言的形式层面，两者已经接近。', 'At the formal level of language, the two are now close.'),
    },
    {
      lead: 'bio',
      dimension: b('学习需要的语言量', 'Language needed to learn'),
      brain: b('儿童到十几岁接触的词数估计不超过一亿个，同时结合了看、听、动手和与人交流。', 'Children are estimated to hear under a hundred million words by their early teens, combined with seeing, hearing, handling things and talking with people.'),
      ai: b('大语言模型的预训练文本通常有数万亿个词元，比儿童多四个数量级以上。', 'Large language models pretrain on trillions of tokens, more than four orders of magnitude beyond children.'),
      gap: b('人学语言的效率远高于模型，原因可能包括先天约束、多模态输入和社会互动。', 'People learn language far more efficiently, perhaps through innate constraints, multimodal input and social interaction.'),
    },
    {
      lead: 'comp',
      dimension: b('语言知识的广度', 'Breadth of language knowledge'),
      brain: b('一个人通常精通一两种语言，熟悉自己领域的术语。', 'A person usually masters one or two languages and the terms of their own field.'),
      ai: b('一个模型能使用上百种语言，熟悉几乎所有领域的术语和文体。', 'One model uses over a hundred languages and knows the terms and styles of nearly every field.'),
      gap: b('在覆盖的语言和领域上，模型远超个人。', 'In languages and fields covered, models far exceed any individual.'),
    },
    {
      lead: 'bio',
      dimension: b('语言之外的稳定推理', 'Stable reasoning beyond language'),
      brain: b('人的推理和世界知识由语言网络以外的系统支持，语言受损时这些能力仍可保留。', 'Human reasoning and world knowledge rest on systems outside the language network and can survive language loss.'),
      ai: b('模型说得流畅，但推理和世界知识的运用会随措辞和题目形式变化而不稳定。', 'Models speak fluently, but their reasoning and use of world knowledge waver with wording and problem format.'),
      gap: b('流畅的语言容易让人高估模型背后的推理能力。', 'Fluent language easily leads people to overestimate the reasoning behind it.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('声音或文字输入', 'Sound or text input'),
        points: [b('听觉皮层处理语音，左侧梭状回的视觉词形区识别书面的词。', 'Auditory cortex processes speech, and the visual word form area in the left fusiform gyrus recognizes written words.')],
      },
      {
        title: b('从声音到词', 'From sound to words'),
        points: [b('颞上回和颞叶后部把语音或字形映射到心理词典中的词。', 'The superior temporal gyrus and posterior temporal lobe map sounds or letter shapes onto words in the mental lexicon.')],
      },
      {
        title: b('语言网络：组合与意义', 'Language network: combining and meaning'),
        points: [
          b('额叶下部和颞叶的语言网络把词组合成短语和句子，表示结构与意义。', 'The language network in the inferior frontal and temporal lobes combines words into phrases and sentences, representing structure and meaning.'),
          b('这个网络对音乐、算术和一般的推理任务几乎不反应。', 'The network barely responds to music, arithmetic or general reasoning tasks.'),
        ],
      },
      {
        title: b('预测下一个词', 'Predicting the next word'),
        points: [b('理解时大脑持续预测接下来的词；意外的词在约 400 毫秒时引起更大的脑电反应（N400），阅读时停留得也更久。', 'During comprehension the brain keeps predicting upcoming words. An unexpected word evokes a larger brain potential at about 400 ms, the N400, and is read for longer.')],
      },
      {
        title: b('与其他系统的接口', 'Interfaces with other systems'),
        points: [b('理解后的意义交给负责推理的多需求网络和负责理解意图的心智理论网络进一步处理。', 'The understood meaning passes to the multiple-demand network for reasoning and the theory-of-mind network for intentions.')],
      },
      {
        title: b('产出', 'Production'),
        points: [b('说话时，额叶下部的区域组织词序和发音计划，交给运动皮层控制口、舌和声带。', 'For speaking, inferior frontal areas organize word order and articulation plans and pass them to motor cortex controlling the mouth, tongue and vocal cords.')],
      },
    ],
    computational: [
      {
        title: b('分词', 'Tokenization'),
        points: [b('文字被切成词元，每个词元通常是一个词或一个词的一部分。', 'Text is split into tokens, each usually a word or part of one.')],
      },
      {
        title: b('嵌入', 'Embedding'),
        points: [b('每个词元变成一个向量，加上表示位置的信息。', 'Each token becomes a vector with position information added.')],
      },
      {
        title: b('Transformer 层', 'Transformer layers'),
        points: [b('几十层注意力和前馈网络把上下文中的词组合起来，逐层形成句法和语义的表示。', 'Dozens of attention and feedforward layers combine words in context, building syntactic and semantic representations layer by layer.')],
      },
      {
        title: b('预测下一个词元', 'Predicting the next token'),
        points: [b('最后一层的输出经 softmax 给出词表中每个词元作为下一个的概率；训练就是让真实的下一个词元概率最大。', 'The last layer’s output gives, through softmax, a probability for every vocabulary token being next. Training maximizes the probability of the true next token.')],
      },
      {
        title: b('后训练', 'Post-training'),
        points: [b('用指令和人类反馈继续训练，让模型学会对话、遵循指令。', 'Further training on instructions and human feedback teaches the model to converse and follow instructions.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('缺少在感知和社会互动中学习语言的过程：词义主要来自文字之间的关系，而不是与世界的直接联系。', 'Missing learning language through perception and social interaction: word meanings come mainly from relations among words rather than direct links to the world.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('2011 年的研究用功能定位的方法在每个被试中找出语言区域，发现它们对句子的反应强，对算术、工作记忆、认知控制和音乐几乎不反应，说明语言网络有高度的功能特异性。', 'A 2011 study localized language regions in each participant and found they respond strongly to sentences and barely to arithmetic, working memory, cognitive control and music, showing high functional specificity.'),
      b('失语症患者语言严重受损，却仍能解数学题、推理因果、理解他人的想法，这是「语言与思维可以分离」的主要证据之一。', 'People with severe aphasia can still solve math problems, reason about causes and understand others’ thoughts, a main line of evidence that language and thought can come apart.'),
      b('N400 于 1980 年被发现：读到「他在咖啡里加了奶油和袜子」中的「袜子」时，约 400 毫秒处出现更大的负向脑电波。', 'The N400 was discovered in 1980. Reading “he took his coffee with cream and socks”, the word socks evokes a larger negative brain wave around 400 ms.'),
      b('2022 年的颅内记录研究发现，人在听故事时，大脑在词出现之前就表现出预测，并在词出现后表现出与「意外程度」相关的反应，与语言模型的计算原理相似。', 'A 2022 intracranial study found that while listening to stories, the brain shows prediction before each word and responses scaled by surprise after it, similar in principle to language models.'),
      b('2024 年的研究用一个孩子 6 个月到 2 岁间约 61 小时的头戴相机视频训练模型，模型学会了许多词与物体的对应，说明部分词义可以从有限的第一视角经验中学到。', 'A 2024 study trained a model on about 61 hours of head-camera video from one child between 6 months and 2 years, and the model learned many word–object mappings, showing some word meaning can be learned from limited first-person experience.'),
    ],
    computational: [
      b('2021 年的研究比较了数十个语言模型，发现模型预测下一个词的能力越强，它的内部表示预测人脑语言区反应的效果越好，部分模型接近噪声上限。', 'A 2021 study compared dozens of language models and found that the better a model predicts the next word, the better its representations predict responses in human language areas, some approaching the noise ceiling.'),
      b('2024 年的综述区分了「形式语言能力」（语法、词汇）和「功能语言能力」（用语言推理、表达世界知识、理解语境），认为大语言模型在前者上接近人，后者不稳定。', 'A 2024 review separated formal linguistic competence, grammar and vocabulary, from functional competence, using language to reason, express world knowledge and handle context, and argued models approach people on the former and are unstable on the latter.'),
      b('语言模型的损失随数据和参数按幂律下降：数据多十倍，损失约降低两成；这说明规模有效，也说明它的学习效率远低于儿童。', 'Language model loss falls as a power law of data and parameters: ten times more data cuts loss by about a fifth. Scale works, but learning is far less efficient than in children.'),
      b('模型与语言网络的表示相似，是「预测」这一共同目标造成的功能和表征上的对应，不说明两者的实现机制相同。', 'The similarity between model and language network representations is a functional and representational correspondence from a shared goal of prediction, not evidence of the same implementation.'),
    ],
  },
  bioMath: [
    {
      title: b('意外度与阅读时间：越难预测的词读得越久', 'Surprisal and reading time: harder-to-predict words take longer'),
      tex: t`S(w_t) = -\log_2 P(w_t \mid w_1, \dots, w_{t-1}),\qquad \mathrm{RT}(w_t) \approx a + b\,S(w_t)`,
      symbols: [
        { tex: t`w_t`, meaning: b('句子中的第 $t$ 个词', 'word $t$ in the sentence') },
        { tex: t`P(w_t \mid \cdots)`, meaning: b('根据前文，这个词出现的概率', 'probability of the word given the preceding words') },
        { tex: t`S(w_t)`, meaning: b('意外度，单位是比特：越难预测越大', 'surprisal in bits: larger for harder-to-predict words') },
        { tex: t`\mathrm{RT}`, meaning: b('阅读这个词所花的时间', 'time spent reading the word') },
        { tex: t`a,\;b`, meaning: b('基础时间和每比特增加的时间', 'base time and extra time per bit') },
      ],
      steps: [
        b('根据前文估计每个词出现的概率，概率可以来自人的完形填空或语言模型。', 'Estimate each word’s probability from the preceding words, using human cloze responses or a language model.'),
        b('取负对数得到意外度：概率减半，意外度增加 1 比特。', 'Take the negative log for surprisal: halving the probability adds 1 bit.'),
        b('阅读时间随意外度线性增加，也就是随概率的对数变化。', 'Reading time rises linearly with surprisal, that is, with the log of probability.'),
      ],
      example: b(
        '「我早上喝了一杯咖啡」中「咖啡」的概率若为 $0.5$，意外度为 $1$ 比特；换成「我早上喝了一杯墨水」，「墨水」概率若为 $1/64$，意外度为 $6$ 比特。取 $a = 200$ 毫秒、$b = 10$ 毫秒每比特，阅读时间分别约为 $210$ 和 $260$ 毫秒。',
        'If coffee has probability $0.5$ in “I drank a cup of coffee this morning”, its surprisal is $1$ bit. If ink has probability $1/64$ in “I drank a cup of ink this morning”, its surprisal is $6$ bits. With $a = 200$ ms and $b = 10$ ms per bit, reading times are about $210$ and $260$ ms.'),
      consequences: [
        b('说明人在阅读中持续进行概率预测，而且对数关系在很大范围内成立。', 'It shows people predict probabilistically while reading, with the log relation holding over a wide range.'),
        b('语言模型给出的概率能很好地预测人的阅读时间，把两者联系在一起。', 'Probabilities from language models predict human reading times well, tying the two together.'),
      ],
      limitations: [
        b('意外度只解释阅读时间的一部分，句法结构、工作记忆负担等也有影响。', 'Surprisal explains only part of reading time, with syntactic structure and working memory load also mattering.'),
        b('非常大的语言模型给出的概率，有时反而不如中等模型贴合人的阅读时间。', 'Probabilities from very large language models sometimes fit human reading times worse than those from mid-sized ones.'),
      ],
    },
    {
      title: b('编码模型：用语言模型的内部表示预测脑反应', 'Encoding models: predicting brain responses from language model representations'),
      tex: t`\hat{y}_v = \mathbf{w}_v^{\top}\,\mathbf{h}(x),\qquad r_{\text{norm}} = \frac{\operatorname{corr}(\hat{y}_v,\,y_v)}{\rho_{\max}}`,
      symbols: [
        { tex: t`\mathbf{h}(x)`, meaning: b('语言模型某一层对句子 $x$ 的内部表示', 'a language model layer’s internal representation of sentence $x$') },
        { tex: t`y_v`, meaning: b('脑区或体素 $v$ 对这个句子的实际反应', 'actual response of region or voxel $v$ to the sentence') },
        { tex: t`\mathbf{w}_v`, meaning: b('用一部分句子拟合出的线性权重', 'linear weights fitted on some sentences') },
        { tex: t`\hat{y}_v`, meaning: b('预测的脑反应', 'predicted brain response') },
        { tex: t`\rho_{\max}`, meaning: b('噪声上限：同一个人重复测量时能达到的一致程度', 'noise ceiling: the consistency reachable between repeated measurements') },
        { tex: t`r_{\text{norm}}`, meaning: b('可预测度：解释了可解释部分的比例', 'predictivity: share of the explainable part explained') },
      ],
      steps: [
        b('把句子输入语言模型，取出某一层的内部表示。', 'Feed sentences to a language model and take a layer’s internal representation.'),
        b('用一部分句子拟合线性权重，把内部表示映射到脑反应。', 'Fit linear weights on some sentences mapping representation to brain response.'),
        b('在没用过的句子上计算预测与实际反应的相关，除以噪声上限，得到「解释了可解释部分的多少」。', 'On held-out sentences, correlate prediction with actual response and divide by the noise ceiling, giving how much of the explainable part is explained.'),
      ],
      example: b(
        '某脑区重复测量的一致程度（噪声上限）为 $0.5$，模型预测与实际反应的相关为 $0.4$，可预测度为 $0.8$，即解释了约八成可解释的反应。另一个模型相关只有 $0.2$，可预测度为 $0.4$。',
        'A region’s repeat consistency, the noise ceiling, is $0.5$, and a model’s prediction correlates $0.4$ with the actual response, a predictivity of $0.8$, about four fifths of the explainable response. Another model correlates only $0.2$, a predictivity of $0.4$.'),
      consequences: [
        b('能定量比较不同模型与大脑的接近程度；预测下一个词更好的模型，可预测度也更高。', 'It compares quantitatively how close models are to the brain, and models better at next-word prediction score higher.'),
        b('为「大脑在做预测」提供了支持证据。', 'It supports the idea that the brain is predicting.'),
      ],
      limitations: [
        b('线性映射有效，只说明表示中有可读出的共同信息，不说明计算机制相同。', 'A working linear mapping shows shared readable information, not the same computational mechanism.'),
        b('脑成像的时间和空间分辨率有限，噪声上限本身也带有误差。', 'Brain imaging has limited time and space resolution, and the noise ceiling carries its own error.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('下一个词元预测：语言模型的训练目标', 'Next-token prediction: the training objective of language models'),
      tex: t`P(w_t \mid w_{<t}) = \operatorname{softmax}\big(W\,\mathbf{h}_t\big)_{w_t},\qquad \mathcal{L} = -\frac{1}{T}\sum_{t=1}^{T}\log P(w_t \mid w_{<t})`,
      symbols: [
        { tex: t`\mathbf{h}_t`, meaning: b('最后一层在位置 $t$ 的表示', 'last layer’s representation at position $t$') },
        { tex: t`W`, meaning: b('把表示映射到词表的矩阵', 'matrix mapping the representation onto the vocabulary') },
        { tex: t`w_{<t}`, meaning: b('前面所有的词元', 'all preceding tokens') },
        { tex: t`\mathcal{L}`, meaning: b('平均交叉熵损失', 'average cross-entropy loss') },
        { tex: t`T`, meaning: b('序列长度', 'sequence length') },
      ],
      steps: [
        b('对每个位置，模型根据前文给词表中每个词元打分，softmax 变成概率。', 'At each position, the model scores every vocabulary token from the preceding text, and softmax gives probabilities.'),
        b('取真实下一个词元的概率的负对数作为损失，在所有位置上平均。', 'The loss is the negative log probability of the true next token, averaged over positions.'),
        b('降低损失，就是让模型对下一个词的预测越来越准；语法、词义和大量知识都在这一过程中被学到。', 'Lowering the loss makes next-word predictions more accurate, and grammar, meaning and much knowledge are learned along the way.'),
      ],
      example: b(
        '「床前明月」之后，模型给「光」的概率为 $0.9$，损失约 $0.11$；若只给 $0.1$，损失约 $2.3$（自然对数）。平均损失的指数叫困惑度：损失 $\\ln 4 \\approx 1.39$ 相当于每一步在约 4 个词之间犹豫。',
        'After the opening of a famous line, a model gives the right next word probability $0.9$, a loss of about $0.11$. At $0.1$ the loss is about $2.3$ in natural log. The exponential of the average loss is perplexity: a loss of $\\ln 4 \\approx 1.39$ is like hesitating among about 4 words at each step.'),
      consequences: [
        b('一个简单的目标就能学到语法、语义和大量世界知识。', 'One simple objective teaches grammar, meaning and much world knowledge.'),
        b('与人阅读时的预测在原理上相同，这是两者表示相似的一个原因。', 'It matches in principle the prediction people make while reading, one reason their representations are similar.'),
      ],
      limitations: [
        b('只从文字之间的关系学习，词义与感知和行动的联系是间接的。', 'It learns only from relations among words, so word meanings connect to perception and action only indirectly.'),
        b('预测得准不等于推理得对：流畅的文字可能包含错误的事实或推理。', 'Predicting well is not reasoning well. Fluent text can contain wrong facts or reasoning.'),
      ],
    },
    {
      title: b('数据规模定律：损失随数据量按幂律下降', 'Data scaling law: loss falls as a power of data'),
      tex: t`L(D) = \Big(\frac{D_c}{D}\Big)^{\alpha_D},\qquad \alpha_D \approx 0.095`,
      symbols: [
        { tex: t`D`, meaning: b('训练用的词元数', 'number of training tokens') },
        { tex: t`L(D)`, meaning: b('模型足够大时，能达到的损失', 'loss reachable with a large enough model') },
        { tex: t`D_c`, meaning: b('拟合得到的常数', 'a fitted constant') },
        { tex: t`\alpha_D`, meaning: b('下降的速度', 'rate of decline') },
      ],
      steps: [
        b('在不同数据量上训练足够大的模型，记录损失。', 'Train large enough models on different amounts of data and record the loss.'),
        b('在对数坐标上，损失与数据量接近一条直线，斜率就是 $-\\alpha_D$。', 'On log scales, loss against data is nearly a straight line with slope $-\\alpha_D$.'),
        b('数据每增加十倍，损失乘以 $10^{-\\alpha_D}$。', 'Each tenfold increase in data multiplies the loss by $10^{-\\alpha_D}$.'),
      ],
      example: b(
        '$10^{-0.095} \\approx 0.80$：数据增加十倍，损失降低约两成；增加一千倍，损失降到约一半。儿童接触的语言比模型少四个数量级以上，却达到了母语者的水平。',
        '$10^{-0.095} \\approx 0.80$: ten times more data cuts loss by about a fifth, and a thousand times more roughly halves it. Children hear more than four orders of magnitude less language yet reach native-speaker level.'),
      consequences: [
        b('说明扩大规模能稳定提高语言模型的能力。', 'It shows scaling up steadily improves language models.'),
        b('也量化了模型与儿童之间学习效率的巨大差距。', 'It also quantifies the huge gap in learning efficiency between models and children.'),
      ],
      limitations: [
        b('损失降低不一定对应所有能力同步提高，有些能力在规模较大时才突然出现。', 'Lower loss need not mean every ability improves in step, and some abilities appear only at larger scale.'),
        b('公式中的常数依赖模型结构和数据，不能直接外推到很远的规模。', 'The constants depend on architecture and data and cannot be extrapolated far.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('关键期之后学语言变难', 'Harder to learn after critical periods'),
        text: b('成年后学第二语言，很难达到母语者的发音和语法直觉。', 'Adults learning a second language rarely reach native pronunciation and grammatical intuition.'),
        steps: [3, 6],
      },
      {
        title: b('语言网络受损导致失语', 'Damage causes aphasia'),
        text: b('左半球卒中常导致失语，理解或表达语言的能力严重受损。', 'Left-hemisphere stroke often causes aphasia, severely impairing comprehension or expression.'),
        steps: [3],
      },
      {
        title: b('一次只能处理一路', 'One stream at a time'),
        text: b('人难以同时理解两路语言，长句和复杂嵌套会超出工作记忆。', 'People struggle to follow two streams of language at once, and long, deeply nested sentences exceed working memory.'),
        steps: [3, 4],
      },
    ],
    computational: [
      {
        title: b('需要海量数据', 'Needs huge data'),
        text: b('模型需要比儿童多四个数量级以上的语言输入。', 'Models need more than four orders of magnitude more language input than children.'),
        steps: [4],
      },
      {
        title: b('语言强于推理', 'Language outruns reasoning'),
        text: b('流畅的表达可能掩盖推理和事实上的错误，换一种问法结果可能不同。', 'Fluent expression can hide errors of reasoning and fact, and rephrasing can change the result.'),
        steps: [3, 4],
      },
      {
        title: b('词义缺乏接地', 'Meanings lack grounding'),
        text: b('词义主要来自文字之间的关系，与感知、行动和社会互动的联系是间接的。', 'Word meanings come mainly from relations among words, with only indirect links to perception, action and social interaction.'),
        steps: [6],
      },
    ],
    misreadings: [
      {
        claim: b('大语言模型说得流畅，所以它也在思考', 'LLMs speak fluently, so they think'),
        fact: b('在人脑中，语言网络与推理网络可以分离；模型的形式语言能力很强，功能能力（推理、运用世界知识）不稳定，需要分别评估。', 'In the brain, the language network and reasoning networks can come apart. Models are strong in formal language ability and unstable in functional abilities, reasoning and world knowledge, which must be evaluated separately.'),
      },
      {
        claim: b('语言模型与大脑语言区的工作方式相同', 'Language models work like the brain’s language areas'),
        fact: b('两者的表示有可测量的相似，并都依赖预测；这是表征和功能上的对应，不说明实现机制相同。', 'Their representations are measurably similar and both rely on prediction. That is a representational and functional correspondence, not the same mechanism.'),
      },
      {
        claim: b('语言就是思维', 'Language is thought'),
        fact: b('失语症患者语言严重受损时，仍能做算术、推理和理解他人意图，说明许多思维不依赖语言网络。', 'People with severe aphasia still do arithmetic, reason and understand others’ intentions, so much thinking does not depend on the language network.'),
      },
    ],
  },
  refs: {
    neuro: ['kutas1980', 'hickok2007', 'fedorenko2011', 'fedorenko2016', 'fedorenko2024', 'goldstein2022', 'vong2024'],
    models: ['smith2013', 'oh2023', 'schrimpf2021', 'caucheteux2022'],
    ai: ['kaplan2020', 'warstadt2022', 'mahowald2024'],
  },
}
