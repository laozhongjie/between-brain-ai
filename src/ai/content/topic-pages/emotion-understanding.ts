import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F32 Emotion understanding and expression: human emotion recognition and empathy vs affective computing and emotion inference in language models. */
export const EMOTION_UNDERSTANDING: TopicContent = {
  thesis: {
    biological: b(
      '人从面孔、声音、姿态和情境中推断别人的情绪，而且非常依赖情境：同一张脸放在不同的身体姿势上，会被读成不同的情绪。面部动作与情绪之间并不是一一对应的，同一种情绪在不同的人和文化中可能有不同的表情。共情时，看到别人疼痛，自己与疼痛的情绪成分相关的脑区（前岛叶、前扣带）也会激活。',
      'People infer others’ emotions from faces, voices, posture and context, and rely heavily on context: the same face on different body postures is read as different emotions. Facial movements do not map one to one onto emotions, and one emotion can look different across people and cultures. In empathy, seeing someone in pain activates one’s own brain areas tied to the emotional side of pain, the anterior insula and anterior cingulate.'),
    computational: b(
      '情感计算模型从面部图像、语音和文字中识别情绪。大语言模型在标准情绪智力测验上的得分已明显高于人类常模的平均水平；在医疗问答中，评价者常认为聊天机器人的回答比医生的更有共情。但这些都是对文字测试和文字回答的评价，不说明模型有情绪体验，也不保证在真实、持续的互动中同样准确。',
      'Affective computing models recognize emotion from face images, speech and text. Large language models now score clearly above the average of human norms on standard emotional intelligence tests, and in medical question answering, raters often judged chatbot replies more empathetic than doctors’. But these evaluate text tests and text replies. They do not show that models experience emotion, nor that they are equally accurate in real, ongoing interaction.'),
    gap: b(
      '在文字形式的情绪理解测验上，模型已超过人类平均水平。差距在于多模态的情境整合、长期关系中的理解，以及情绪的共享：人的共情伴随自身情绪状态的变化，模型的共情停留在语言层面。',
      'On text-based tests of emotion understanding, models now beat the human average. The gap lies in integrating multimodal context, understanding within long relationships and sharing emotion. Human empathy comes with changes in one’s own emotional state, while model empathy stays at the level of language.'),
  },
  short: { biological: b('人', 'People'), computational: b('模型', 'Models') },
  kinds: ['behavior'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月的情感计算模型与大语言模型；具体评测结果按发表年份注明。', 'The computational column describes affective computing models and large language models as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'comp',
      dimension: b('标准情绪理解测验', 'Standard emotion understanding tests'),
      brain: b('在五项情绪智力测验的原始验证研究中，人的平均正确率约为 56%。', 'In the original validation studies of five emotional intelligence tests, people averaged about 56% correct.'),
      ai: b('2025 年的研究中，六个大语言模型在同样的测验上平均正确率约为 81%，还能编写出质量相近的新测验题。', 'In a 2025 study, six large language models averaged about 81% on the same tests and could also write new test items of similar quality.'),
      gap: b('在文字情境题上，模型高于人类平均；这些测验衡量的是对情绪的知识与推理，不是真实互动中的表现。', 'On text scenarios, models beat the human average. These tests measure knowledge and reasoning about emotion, not performance in real interaction.'),
    },
    {
      lead: 'mixed',
      dimension: b('从面部判断情绪', 'Reading emotion from faces'),
      brain: b('人看面孔时会结合身体姿态和情境；脱离情境时，对表情的判断远不如通常以为的可靠。', 'People read faces together with posture and context. Out of context, judgments of expressions are far less reliable than commonly assumed.'),
      ai: b('模型在摆拍的标准表情上分类准确率很高，在自然、模糊的表情上明显下降。', 'Models classify posed standard expressions very accurately and drop clearly on natural, ambiguous ones.'),
      gap: b('面部动作本身并不可靠地对应情绪，这一限制对人和模型都存在；人更善于借助情境弥补。', 'Facial movements do not reliably map onto emotions, a limit for both people and models. People are better at filling in from context.'),
    },
    {
      lead: 'comp',
      dimension: b('文字回应的共情评价', 'Rated empathy of written replies'),
      brain: b('医生在网上回答患者问题时，回答通常简短，被评为有共情的比例较低。', 'Doctors answering patient questions online usually reply briefly, and fewer of their replies are rated empathetic.'),
      ai: b('2023 年的研究中，评价者在约八成的比较中更偏好聊天机器人的回答，并认为它更有共情。', 'In a 2023 study, raters preferred the chatbot’s reply in about four of five comparisons and judged it more empathetic.'),
      gap: b('在书面回应的「共情感」上模型得分更高；这是读者的评价，不代表模型体验到了对方的情绪。', 'Models score higher for the felt empathy of written replies. This is the reader’s rating, not evidence that the model feels the other’s emotion.'),
    },
    {
      lead: 'bio',
      dimension: b('情绪的共享', 'Sharing emotion'),
      brain: b('看到别人疼痛时，自己与疼痛的情绪成分相关的脑区也会激活，情绪状态随之改变。', 'Seeing someone in pain activates one’s own areas tied to the emotional side of pain, and one’s emotional state shifts.'),
      ai: b('模型没有身体和内部情绪状态，共情只体现在生成的语言中。', 'Models have no body or internal emotional state, and empathy appears only in the language they generate.'),
      gap: b('「理解对方的情绪」与「与对方共享情绪」是两回事，模型只做到前者的语言部分。', 'Understanding another’s emotion and sharing it are different, and models do only the language part of the former.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('感觉线索', 'Sensory cues'),
        points: [b('梭状回和颞上沟处理面部表情和视线方向，颞上回处理声音的语调，另有区域处理身体姿态。', 'The fusiform gyrus and superior temporal sulcus process facial expression and gaze, the superior temporal gyrus processes vocal tone and other areas process posture.')],
      },
      {
        title: b('杏仁核的快速评估', 'Fast appraisal in the amygdala'),
        points: [b('杏仁核对与威胁有关的线索（如恐惧表情中睁大的眼白）快速反应；双侧杏仁核受损的病人难以识别恐惧表情。', 'The amygdala responds quickly to threat-related cues, such as the widened eye whites of a fearful face. Patients with damage to both amygdalae struggle to recognize fear.')],
      },
      {
        title: b('结合情境推断', 'Inferring with context'),
        points: [b('前额叶和颞顶联合区把线索与情境、对方的经历和性格结合起来，推断「他为什么会有这种感受」。', 'Prefrontal cortex and the temporoparietal junction combine cues with the situation and the other’s history and character to infer why they feel this way.')],
      },
      {
        title: b('情绪共享', 'Emotion sharing'),
        points: [b('前岛叶和前扣带皮层在观察他人痛苦时被激活，形成与对方相近的情绪状态，这是情感层面的共情。', 'The anterior insula and anterior cingulate activate when observing others’ distress, producing a similar emotional state, the affective side of empathy.')],
      },
      {
        title: b('表达与回应', 'Expression and response'),
        points: [b('人调整自己的表情、语气和行为来回应，例如放慢语速、靠近、安慰。', 'People adjust their own expression, tone and behavior to respond, such as slowing their speech, moving closer or comforting.')],
      },
    ],
    computational: [
      {
        title: b('多模态输入', 'Multimodal input'),
        points: [b('图像、语音或文字作为输入。', 'Images, speech or text serve as input.')],
      },
      {
        title: b('特征编码', 'Feature encoding'),
        points: [b('面部图像被编码为面部动作或向量，语音提取音高、音量等韵律特征，文字被编码为词元向量。', 'Face images are encoded as facial actions or vectors, speech as prosodic features such as pitch and loudness, and text as token vectors.')],
      },
      {
        title: b('情绪分类或推断', 'Classifying or inferring emotion'),
        points: [b('分类器输出情绪类别（如高兴、悲伤）或连续的维度（愉快程度、激动程度）。', 'A classifier outputs emotion categories, such as happy or sad, or continuous dimensions, pleasantness and arousal.')],
      },
      {
        title: b('大语言模型的情境推断', 'Contextual inference in language models'),
        points: [b('大语言模型读入一段情境描述，推断人物的情绪和原因，这种能力来自海量文本中的情绪描写。', 'A large language model reads a description of a situation and infers a person’s emotion and its cause, an ability drawn from emotional writing in huge amounts of text.')],
      },
      {
        title: b('生成回应', 'Generating a reply'),
        points: [b('后训练使回答更体贴、更有共情的措辞，例如先承认对方的感受再给建议。', 'Post-training makes replies more considerate and empathetic in wording, such as acknowledging feelings before giving advice.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('没有内部情绪状态和身体反馈，也没有跨会话的关系记忆；「共情」只存在于生成的文字中。', 'No internal emotional state, no bodily feedback and no relationship memory across sessions. Empathy exists only in the generated text.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('「基本情绪」理论认为，存在几种普遍的情绪，每种有特定的面部表情。2019 年的综述系统检查了证据，结论是面部动作与情绪之间的对应远比这个理论设想的弱，且随情境和文化变化。', 'Basic emotion theory holds that a few universal emotions each have a typical facial expression. A 2019 review systematically examined the evidence and concluded the link between facial movements and emotions is far weaker than the theory assumes and varies with context and culture.'),
      b('2008 年的实验把厌恶的面孔接到不同的身体姿势上：配上愤怒的身体姿势，人就把它读成愤怒，说明身体和情境能改写对面孔的判断。', 'A 2008 experiment placed disgusted faces on different bodies. On an angry posture, people read the face as angry, showing body and context can rewrite how a face is read.'),
      b('2004 年的研究中，伴侣受到疼痛刺激时，被试的前岛叶和前扣带激活，但与疼痛的身体位置有关的感觉区不激活：共情共享的是情绪，不是感觉本身。', 'In a 2004 study, when a partner received a painful stimulus, participants’ anterior insula and anterior cingulate activated, but sensory areas for the body location did not. Empathy shares the emotion, not the sensation itself.'),
      b('共情通常分为两部分：情感共情（感同身受）和认知共情（理解对方怎么想、怎么感受），两者依赖部分不同的脑区。', 'Empathy is often split into affective empathy, feeling with someone, and cognitive empathy, understanding how they think and feel, which rely on partly different areas.'),
    ],
    computational: [
      b('情感计算从 1990 年代开始发展，早期依赖面部动作编码和语音特征，现在多用深度网络端到端学习。', 'Affective computing began in the 1990s, first with facial action coding and speech features, now mostly with deep networks trained end to end.'),
      b('2025 年的研究中，模型在情绪智力测验上的得分与原始研究中的人类样本比较，人类数据并非同时同条件采集；同一研究中，模型编写的新题目由 467 名参与者作答以检验质量。', 'In the 2025 study, model scores were compared with human samples from the original studies, not collected under the same conditions at the same time. In the same study, 467 participants answered the new items the models wrote to check their quality.'),
      b('2024 年的系统综述汇总了 12 项研究，发现大语言模型的回应常被评为有共情，但评估方法差异大，多数基于单次书面回答。', 'A 2024 systematic review of 12 studies found language model replies often rated empathetic, but evaluation methods varied widely and most rested on single written replies.'),
      b('面部表情识别在实际应用中存在争议：把表情等同于内心情绪，用于招聘或监控等场合，可能导致错误判断。', 'Facial expression recognition is contested in practice. Equating expressions with inner emotions in settings such as hiring or surveillance can lead to wrong judgments.'),
    ],
  },
  bioMath: [
    {
      title: b('情绪的二维空间：愉快程度与激动程度', 'A two-dimensional space of emotion: pleasantness and arousal'),
      tex: t`\mathbf{e} = (v,\,a),\qquad r = \sqrt{v^2 + a^2},\qquad \phi = \operatorname{atan2}(a,\,v)`,
      symbols: [
        { tex: t`v`, meaning: b('效价：愉快为正，不愉快为负', 'valence: positive for pleasant, negative for unpleasant') },
        { tex: t`a`, meaning: b('唤醒度：激动为正，平静为负', 'arousal: positive for excited, negative for calm') },
        { tex: t`r`, meaning: b('离原点的距离：情绪的强度', 'distance from the origin: intensity of the emotion') },
        { tex: t`\phi`, meaning: b('方向角：情绪的种类', 'angle: the kind of emotion') },
      ],
      steps: [
        b('把每种情绪看作二维平面上的一个点：横轴是愉快程度，纵轴是激动程度。', 'Treat each emotion as a point on a plane: horizontal for pleasantness, vertical for arousal.'),
        b('方向决定是哪种情绪，距离决定有多强烈。', 'Direction decides the kind of emotion and distance its strength.'),
        b('相邻的情绪容易混淆，正对面的情绪相互对立。', 'Neighboring emotions are easily confused, and opposite ones are contrary.'),
      ],
      example: b(
        '兴奋约在 $(0.7, 0.7)$，方向 $45°$；平静约在 $(0.6, -0.6)$，方向 $-45°$；愤怒约在 $(-0.7, 0.7)$，方向 $135°$。愤怒和恐惧都在左上方，彼此接近，所以只看激动程度很难区分它们。',
        'Excitement sits near $(0.7, 0.7)$ at $45°$, calm near $(0.6, -0.6)$ at $-45°$ and anger near $(-0.7, 0.7)$ at $135°$. Anger and fear both sit in the upper left near each other, so arousal alone barely tells them apart.'),
      consequences: [
        b('解释了为什么某些情绪容易混淆，以及身体的唤醒为什么需要情境来解释成具体的情绪。', 'It explains why some emotions are easily confused and why bodily arousal needs context to be read as a specific emotion.'),
        b('情感计算常直接预测这两个维度，而不是离散的类别。', 'Affective computing often predicts these two dimensions directly instead of discrete categories.'),
      ],
      limitations: [
        b('两个维度丢失了许多区别，例如愤怒和恐惧在这个平面上很近，但引起的行为完全不同。', 'Two dimensions lose many distinctions. Anger and fear lie close on the plane but lead to very different behavior.'),
        b('情绪在大脑中是否按这样的维度组织，仍有争论。', 'Whether the brain organizes emotion along these dimensions is debated.'),
      ],
    },
    {
      title: b('结合情境推断情绪：面孔和情境共同决定判断', 'Inferring emotion with context: face and situation decide together'),
      tex: t`P(e \mid \text{face}, \text{context}) \propto P(\text{face} \mid e)\;P(e \mid \text{context})`,
      symbols: [
        { tex: t`e`, meaning: b('对方可能的情绪', 'the other’s possible emotion') },
        { tex: t`P(\text{face} \mid e)`, meaning: b('处于这种情绪时，出现这种表情的可能性', 'how likely this expression is under that emotion') },
        { tex: t`P(e \mid \text{context})`, meaning: b('在这种情境下，这种情绪本来有多常见', 'how common the emotion is in this situation') },
        { tex: t`P(e \mid \text{face}, \text{context})`, meaning: b('结合两者后，对情绪的判断', 'judgment of the emotion combining both') },
      ],
      steps: [
        b('情境给出先验：在葬礼上，悲伤本来就比快乐常见。', 'The situation gives a prior: at a funeral, sadness is more common than joy to begin with.'),
        b('表情给出似然：这张脸在各种情绪下出现的可能性。', 'The expression gives a likelihood: how likely this face is under each emotion.'),
        b('两者相乘再归一化，得到最终判断。表情模糊时，情境的作用更大。', 'Multiply and normalize for the final judgment. When the expression is ambiguous, context weighs more.'),
      ],
      example: b(
        '一张含糊的流泪面孔，在「悲伤」和「喜悦」下出现的可能性相同。在葬礼的情境中，先验为悲伤 $0.9$、喜悦 $0.1$，判断为悲伤的概率是 $0.9$；在婚礼上先验反过来，同一张脸就被读成喜极而泣。',
        'An ambiguous tearful face is equally likely under sadness and joy. At a funeral, with priors of $0.9$ for sadness and $0.1$ for joy, sadness gets probability $0.9$. At a wedding the priors flip, and the same face is read as tears of joy.'),
      consequences: [
        b('解释了为什么同一张脸在不同情境中被读成不同的情绪。', 'It explains why one face is read as different emotions in different situations.'),
        b('模型与人的判断都可以这样分析，便于比较两者对情境的利用程度。', 'Both human and model judgments can be analyzed this way, making it easy to compare how much each uses context.'),
      ],
      limitations: [
        b('真实判断还涉及对对方性格、文化和关系的了解，难以全部写成概率。', 'Real judgments also draw on the other’s personality, culture and relationship, hard to write all as probabilities.'),
        b('这是对推断结果的描述，不说明大脑怎样实现这个计算。', 'It describes the inference, not how the brain implements it.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('情绪分类器：从特征到情绪类别的概率', 'Emotion classifier: from features to category probabilities'),
      tex: t`P(e_k \mid \mathbf{x}) = \frac{\exp(\mathbf{w}_k^{\top}\mathbf{h}(\mathbf{x}))}{\sum_j \exp(\mathbf{w}_j^{\top}\mathbf{h}(\mathbf{x}))},\qquad \mathcal{L} = -\log P(e_{y} \mid \mathbf{x})`,
      symbols: [
        { tex: t`\mathbf{x}`, meaning: b('输入：面部图像、语音片段或文字', 'input: face image, speech clip or text') },
        { tex: t`\mathbf{h}(\mathbf{x})`, meaning: b('编码器提取的特征向量', 'feature vector from the encoder') },
        { tex: t`\mathbf{w}_k`, meaning: b('第 $k$ 种情绪的权重', 'weights of emotion $k$') },
        { tex: t`e_y`, meaning: b('人工标注的情绪类别', 'the human-labeled emotion') },
        { tex: t`\mathcal{L}`, meaning: b('交叉熵损失', 'cross-entropy loss') },
      ],
      steps: [
        b('编码器把输入变成特征向量。', 'The encoder turns the input into a feature vector.'),
        b('每种情绪的权重与特征相乘得到得分，softmax 变成概率。', 'Each emotion’s weights times the features give a score, and softmax turns scores into probabilities.'),
        b('训练时让人工标注的那一类概率最大。', 'Training maximizes the probability of the labeled class.'),
      ],
      example: b(
        '一张笑脸的得分为高兴 $3$、惊讶 $1$、中性 $0$，概率约为 $0.84$、$0.11$、$0.04$。若标注是「高兴」，损失约为 $0.17$。',
        'A smiling face scores happy $3$, surprised $1$ and neutral $0$, giving probabilities about $0.84$, $0.11$ and $0.04$. If the label is happy, the loss is about $0.17$.'),
      consequences: [
        b('在摆拍的标准表情数据上准确率很高。', 'Accuracy is very high on posed standard expressions.'),
        b('模型学到的是标注者对表情的判断，而不是对方的真实情绪。', 'The model learns annotators’ judgments of expressions, not the person’s actual emotion.'),
      ],
      limitations: [
        b('标签假设每个表情对应一种情绪，而这一假设本身证据不足。', 'Labels assume each expression maps to one emotion, an assumption with weak evidence.'),
        b('只看单张图像或片段，缺少情境和对这个人的了解。', 'It sees a single image or clip, without context or knowledge of the person.'),
      ],
    },
    {
      title: b('一致性评估：模型与人类共识的一致程度', 'Agreement: how closely a model matches human consensus'),
      tex: t`\kappa = \frac{p_o - p_e}{1 - p_e}`,
      symbols: [
        { tex: t`p_o`, meaning: b('观察到的一致比例：模型与标准答案相同的比例', 'observed agreement: share of answers matching the standard') },
        { tex: t`p_e`, meaning: b('随机猜测时预期的一致比例', 'agreement expected by chance') },
        { tex: t`\kappa`, meaning: b('扣除偶然一致后的一致程度：$1$ 为完全一致，$0$ 为与随机相当', 'agreement beyond chance: $1$ is perfect and $0$ is chance level') },
      ],
      steps: [
        b('情绪测验的标准答案通常来自专家或多数人的共识。', 'Standard answers on emotion tests usually come from experts or majority consensus.'),
        b('算出模型与标准答案一致的比例，减去随机猜中的部分。', 'Compute how often the model matches the standard and subtract what chance would give.'),
        b('再除以「除了偶然以外最多还能一致多少」，得到可比较的分数。', 'Divide by the most agreement possible beyond chance to get a comparable score.'),
      ],
      example: b(
        '假设都是四选一的题目，随机猜中的比例 $p_e = 0.25$。模型答对 $81\\%$：$\\kappa = (0.81 - 0.25)/0.75 \\approx 0.75$；人类平均答对 $56\\%$：$\\kappa \\approx 0.41$。',
        'Suppose every item has four options, so chance agreement is $p_e = 0.25$. A model at $81\\%$ gives $\\kappa = (0.81 - 0.25)/0.75 \\approx 0.75$, and the human average of $56\\%$ gives $\\kappa \\approx 0.41$.'),
      consequences: [
        b('能把人和模型放在同一尺度上比较「与共识的一致程度」。', 'It puts people and models on one scale of agreement with consensus.'),
        b('说明模型在这类测验上更接近「标准答案」。', 'It shows models land closer to the standard answer on such tests.'),
      ],
      limitations: [
        b('标准答案本身是一种共识，未必等于当事人的真实感受；与共识一致不等于理解得更深。', 'The standard answer is itself a consensus and need not equal what the person actually feels. Agreeing with consensus is not deeper understanding.'),
        b('测验多为文字情境题，与面对面互动中的理解差别很大。', 'Tests are mostly text scenarios, very different from understanding face to face.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('脱离情境时判断不可靠', 'Unreliable out of context'),
        text: b('只看面孔时，人对表情的判断远不如通常以为的准确，还受文化差异影响。', 'From faces alone, people judge expressions far less accurately than commonly assumed, and culture affects it too.'),
        steps: [1, 3],
      },
      {
        title: b('共情有偏向', 'Empathy is biased'),
        text: b('人更容易与亲近的人、同一群体的人共情，对陌生人和外群体的共情较弱。', 'People empathize more easily with those close to them and their own group, and less with strangers and outsiders.'),
        steps: [4],
      },
      {
        title: b('共情会耗竭', 'Empathy wears out'),
        text: b('长期面对他人痛苦（如医护工作）会导致情绪耗竭，共情反应下降。', 'Long exposure to others’ suffering, as in caregiving work, leads to emotional exhaustion and weaker empathic responses.'),
        steps: [4, 5],
      },
    ],
    computational: [
      {
        title: b('测验高分不等于真实理解', 'High test scores are not real understanding'),
        text: b('情绪智力测验多为文字情境题，在真实、多模态、持续的互动中的表现尚缺乏系统评估。', 'Emotional intelligence tests are mostly text scenarios, and performance in real, multimodal, ongoing interaction lacks systematic evaluation.'),
        steps: [4],
      },
      {
        title: b('依赖有争议的标签', 'Relies on contested labels'),
        text: b('表情识别模型学的是「这个表情通常被标为什么」，把表情等同于情绪可能导致误判。', 'Expression recognition models learn what an expression is usually labeled, and equating expressions with emotions can mislead.'),
        steps: [3],
      },
      {
        title: b('没有关系记忆', 'No relationship memory'),
        text: b('会话之间不保留对一个人的了解，难以像长期相处那样理解特定的人。', 'No knowledge of a person carries across sessions, so models cannot understand someone as long acquaintance does.'),
        steps: [6],
      },
    ],
    misreadings: [
      {
        claim: b('模型在情绪测验上超过人，所以它比人更懂情绪', 'Models beat people on emotion tests, so they understand emotion better'),
        fact: b('模型在文字情境题上更接近标准答案；这衡量的是对情绪的知识与推理，不包括真实互动中的理解和情绪体验。', 'Models land closer to the standard answer on text scenarios. That measures knowledge and reasoning about emotion, not understanding in real interaction or emotional experience.'),
      },
      {
        claim: b('看表情就能读出一个人的情绪', 'Faces reveal what someone feels'),
        fact: b('面部动作与情绪之间的对应很弱，并随情境和文化变化；判断情绪需要结合情境。', 'The link between facial movements and emotions is weak and varies with context and culture. Judging emotion needs context.'),
      },
      {
        claim: b('回答被评为有共情，说明模型在共情', 'Replies rated empathetic mean the model empathizes'),
        fact: b('评价衡量的是读者的感受；模型没有内部情绪状态，共情体现在措辞中，而不是共享的情绪中。', 'The rating measures how readers feel. Models have no internal emotional state, and empathy appears in wording, not in shared emotion.'),
      },
    ],
  },
  refs: {
    neuro: ['ekman1992', 'adolphs1994', 'singer2004', 'aviezer2008', 'barrett2019'],
    models: ['russell1980', 'ong2015'],
    ai: ['wang2023ei', 'elyoseph2023', 'ayers2023', 'sorin2024', 'schlegel2025'],
  },
}
