import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F24 Metacognitive monitoring: prefrontal confidence and error monitoring vs model confidence calibration. */
export const METACOGNITIVE_MONITORING: TopicContent = {
  thesis: {
    biological: b(
      '人在做判断的同时，会估计这个判断有多可靠，也就是信心；信心高的判断通常更常正确。犯错后约 100 毫秒，前扣带皮层就产生一个错误信号，往往在本人意识到之前。这种「对自己判断的判断」叫元认知，能力因人而异，与前额叶前部的结构有关，并且可以和任务本身的表现分开测量。',
      'While making a judgment, people estimate how reliable it is, their confidence, and high-confidence judgments are usually right more often. About 100 ms after an error, anterior cingulate cortex produces an error signal, often before the person is aware of it. This judging of one’s own judgments is metacognition. It varies across people, relates to the structure of anterior prefrontal cortex and can be measured apart from task performance itself.'),
    computational: b(
      '模型对每个答案的输出概率可以当作置信度。预训练的大语言模型在许多选择题上概率校准得不错，但经过对齐等后训练后，校准常常变差。让模型用文字说出信心时，往往过度自信；2025 年的医学测试中，多个模型面对本应识别为「无法回答」的问题，仍给出高信心的答案。',
      'A model’s output probability for each answer can serve as its confidence. Pretrained large language models are fairly well calibrated on many multiple-choice questions, but calibration often worsens after post-training such as alignment. Asked to state their confidence in words, models tend to be overconfident. In 2025 medical tests, several models gave high-confidence answers to questions they should have recognized as unanswerable.'),
    gap: b(
      '两边都能产生与正确率相关的信心信号。差距在于来源和用途：人的信心来自对自身决策过程的监测，并伴随错误检测和行为调整；模型的信心多是输出分布的副产品，口头说出的信心可能与内部概率脱节。',
      'Both produce confidence signals related to accuracy. The gap lies in source and use. Human confidence comes from monitoring one’s own decision process and comes with error detection and adjusted behavior. Model confidence is mostly a by-product of the output distribution, and stated confidence can come apart from internal probabilities.'),
  },
  short: { biological: b('人', 'People'), computational: b('模型', 'Models') },
  kinds: ['behavior', 'math'],
  evidence: 'debated',
  asOf: b('AI 侧描述截至 2026 年 10 月的大语言模型与深度网络的置信度；具体评测结果按发表年份注明。', 'The AI column describes confidence in large language models and deep networks as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'mixed',
      dimension: b('信心与正确率一致', 'Confidence matching accuracy'),
      brain: b('整体上信心越高越常正确，但个体差异大；常见的偏差是过度自信，尤其在困难的问题上。', 'Overall, higher confidence goes with more correct answers, but individuals differ widely. A common bias is overconfidence, especially on hard questions.'),
      ai: b('预训练模型的输出概率在许多选择题上校准良好；后训练常使校准变差，用文字表达的信心普遍偏高。', 'Pretrained models’ output probabilities are well calibrated on many multiple-choice questions. Post-training often worsens calibration, and confidence stated in words is generally too high.'),
      gap: b('两边都会过度自信；模型的内部概率可能校准得好，但说出来的信心不一定与之一致。', 'Both can be overconfident. A model’s internal probabilities may be well calibrated while its stated confidence does not match them.'),
    },
    {
      lead: 'bio',
      dimension: b('察觉自己的错误', 'Detecting one’s own errors'),
      brain: b('按错键后约 100 毫秒，大脑就产生错误信号，人随后会放慢、更正。', 'About 100 ms after pressing a wrong key, the brain produces an error signal, and people then slow down and correct.'),
      ai: b('2023 年的研究发现，没有外部反馈时，大语言模型很少能发现并改正自己推理中的错误，有时会把对的改成错的。', 'A 2023 study found that without outside feedback, large language models rarely found and fixed errors in their own reasoning and sometimes changed right answers to wrong ones.'),
      gap: b('大脑有专门的快速错误监测，模型缺少独立于生成过程的检查。', 'The brain has dedicated fast error monitoring, while models lack checking independent of generation.'),
    },
    {
      lead: 'bio',
      dimension: b('知道自己不知道', 'Knowing what one does not know'),
      brain: b('人会说「我不知道」，也能感到答案「就在嘴边」（知道感），据此决定是否继续想或去查。', 'People say “I don’t know” and can feel an answer is on the tip of the tongue, the feeling of knowing, and decide from this whether to keep thinking or look it up.'),
      ai: b('2025 年的医学测试中，多个模型在本应识别为无法回答的问题上仍给出高信心的答案。', 'In 2025 medical tests, several models still gave high-confidence answers to questions they should have recognized as unanswerable.'),
      gap: b('识别知识的边界，是模型元认知中最薄弱的部分之一。', 'Recognizing the edge of its knowledge is one of the weakest parts of model metacognition.'),
    },
    {
      lead: 'comp',
      dimension: b('可校正的置信评分', 'Correctable confidence scores'),
      brain: b('信心报告带有噪声，会受到答案流畅程度等无关因素的影响，难以精确修正。', 'Confidence reports are noisy and swayed by irrelevant factors such as how fluently an answer comes, and are hard to correct precisely.'),
      ai: b('每个输出都有一个概率，可以在验证集上用温度缩放等方法精确地重新校准。', 'Every output has a probability that can be precisely recalibrated on a validation set with methods such as temperature scaling.'),
      gap: b('模型的置信度是可以测量和修正的数字，人的信心难以这样系统地修正。', 'Model confidence is a number that can be measured and corrected, while human confidence cannot be corrected so systematically.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('一阶决策', 'First-order decision'),
        points: [b('感觉证据在顶叶等区域逐渐累积，累积值达到某个界限时做出选择。', 'Sensory evidence accumulates in parietal and other areas, and a choice is made when the total reaches a bound.')],
      },
      {
        title: b('读出信心', 'Reading out confidence'),
        points: [
          b('同一累积过程的状态被读成信心：证据越多、越早达到界限，信心越高。', 'The state of the same accumulation is read as confidence: more evidence and reaching the bound sooner mean higher confidence.'),
          b('猴子顶叶神经元的放电既预测它的选择，也预测它是否会选择「放弃、拿小奖」的安全选项。', 'Firing of monkey parietal neurons predicts both the choice and whether the monkey will take a safe opt-out for a small reward.'),
        ],
      },
      {
        title: b('前额叶前部整合', 'Anterior prefrontal integration'),
        points: [b('前额叶前部把信心与任务情境整合起来，供报告和决策使用；该区域的灰质体积与元认知准确性的个体差异相关。', 'Anterior prefrontal cortex integrates confidence with task context for report and decisions. Its gray matter volume relates to individual differences in metacognitive accuracy.')],
      },
      {
        title: b('错误检测', 'Error detection'),
        points: [b('前扣带皮层比较实际做出的反应与应有的反应，出错后约 100 毫秒产生错误相关负波。', 'Anterior cingulate cortex compares the response made with the intended one and produces an error-related negativity about 100 ms after a mistake.')],
      },
      {
        title: b('影响行为', 'Effects on behavior'),
        points: [b('信心和错误信号让人在出错后放慢、复查，或决定寻求帮助、收集更多信息。', 'Confidence and error signals make people slow down and recheck after errors, or decide to seek help and gather more information.')],
      },
    ],
    computational: [
      {
        title: b('输出概率', 'Output probabilities'),
        points: [b('模型对每个候选答案给出一个概率，最高概率常被当作置信度。', 'The model gives a probability for each candidate answer, and the highest is often taken as confidence.')],
      },
      {
        title: b('事后校准', 'Post-hoc calibration'),
        points: [b('在留出的验证数据上调整一个温度参数，让「说 80% 的答案」确实有约 80% 正确。', 'A temperature parameter is tuned on held-out validation data so that answers given 80% are right about 80% of the time.')],
      },
      {
        title: b('口头表达信心', 'Stating confidence in words'),
        points: [b('也可以让模型在回答后用文字说出信心，例如「我有 90% 的把握」。这个数字是生成出来的文字，不一定等于内部概率。', 'The model can also state its confidence in words after answering, such as “90% sure”. That number is generated text and need not equal the internal probability.')],
      },
      {
        title: b('自我评估', 'Self-evaluation'),
        points: [b('让模型判断自己刚给出的答案是否正确，或在回答前判断自己是否知道答案；在训练分布内效果较好，换到新领域会下降。', 'The model can judge whether its own answer is correct, or whether it knows the answer before replying. This works fairly well within the training distribution and drops in new domains.')],
      },
      {
        title: b('后训练的影响', 'Effect of post-training'),
        points: [b('对齐等后训练改变了输出分布，使模型更倾向给出确定的回答，概率校准常因此变差。', 'Post-training such as alignment reshapes the output distribution toward decisive answers, often worsening probability calibration.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('没有独立于生成过程、对推理过程本身的监测：模型很难在没有外部反馈时发现自己推理中的错误。', 'No monitoring of the reasoning process independent of generation: models find it hard to detect errors in their own reasoning without outside feedback.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('元认知包括两部分：监测（我做对了吗、我知道吗）和调控（据此决定复查、求助或放弃）。本卡讨论监测，调控见[元认知调控](topic:metacognitive-control)。', 'Metacognition has two parts: monitoring, am I right and do I know, and control, deciding to recheck, ask or give up. This card covers monitoring, and control is covered in [metacognitive control](topic:metacognitive-control).'),
      b('测量元认知时要把一阶表现分开：任务做得好的人信心自然更准。$\\text{meta-}d\'$ 等指标衡量的是「信心对正确与错误的区分能力」超出表现本身的部分。', 'Measuring metacognition requires separating first-order performance, since people who do well naturally have more accurate confidence. Measures such as $\\text{meta-}d\'$ capture how well confidence separates right from wrong beyond performance itself.'),
      b('大鼠的眶额皮层神经元也编码决策信心，说明信心不依赖语言，动物也能形成并用它调整行为（例如愿意等待奖赏的时间）。', 'Rat orbitofrontal neurons also encode decision confidence, so confidence does not need language. Animals form it and use it to adjust behavior, such as how long they will wait for a reward.'),
      b('元认知并不集中在单一脑区：不同任务（感知判断、记忆判断）的元认知可能依赖部分不同的回路。', 'Metacognition is not located in one area. Metacognition for different tasks, such as perceptual and memory judgments, may rely on partly different circuits.'),
    ],
    computational: [
      b('2017 年的研究发现，现代深度网络（如 ResNet）比早期较小的网络更过度自信；只调一个温度参数的事后校准就能大幅改善。', 'A 2017 study found modern deep networks such as ResNets more overconfident than earlier smaller ones. Post-hoc calibration with a single temperature parameter improved this greatly.'),
      b('GPT-4 技术报告中，预训练模型在选择题上的校准良好，后训练版本的校准明显变差。', 'In the GPT-4 technical report, the pretrained model was well calibrated on multiple-choice questions, and the post-trained version clearly less so.'),
      b('2022 年的研究让模型判断自己的答案为真的概率（P(True)），以及自己是否知道答案（P(IK)），在训练相近的任务上效果较好，跨领域时下降。', 'A 2022 study had models estimate the probability their own answer is true, P(True), and whether they know the answer, P(IK). This worked fairly well on similar tasks and dropped across domains.'),
      b('2025 年的研究发现，用户会高估模型的正确率，模型给出的解释越长，用户的信心越高，即使正确率没有提高。', 'A 2025 study found users overestimate model accuracy, and longer model explanations raised user confidence even without higher accuracy.'),
    ],
  },
  bioMath: [
    {
      title: b('证据累积与信心：信心是「已有证据下判断正确的概率」', 'Evidence accumulation and confidence: the probability of being right given the evidence'),
      tex: t`dx = v\,dt + \sigma\,dW,\qquad |x(t^{*})| = B,\qquad \mathrm{conf} = \frac{1}{1 + e^{-2 v |x| / \sigma^{2}}}`,
      symbols: [
        { tex: t`x`, meaning: b('累积的证据：偏向一个选项为正，偏向另一个为负', 'accumulated evidence: positive for one option, negative for the other') },
        { tex: t`v`, meaning: b('漂移率：证据平均每单位时间偏向正确选项多少', 'drift rate: how much evidence favors the correct option per unit time on average') },
        { tex: t`\sigma\,dW`, meaning: b('随机噪声', 'random noise') },
        { tex: t`B,\;t^{*}`, meaning: b('决策界限，以及累积值首次达到它、做出选择的时刻', 'decision bound, and the time the total first reaches it and a choice is made') },
        { tex: t`\mathrm{conf}`, meaning: b('信心：已有证据下所选选项正确的概率', 'confidence: probability the chosen option is correct given the evidence') },
      ],
      steps: [
        b('证据每一刻按漂移率增加，同时受噪声扰动。', 'Evidence grows with the drift rate at each moment, perturbed by noise.'),
        b('累积值达到界限时做出选择。', 'A choice is made when the total reaches the bound.'),
        b('信心由累积值的大小换算：在已知漂移率时，证据越多，「选对了」的对数几率越大，两者成正比。', 'Confidence converts the total into a probability. With a known drift rate, the log-odds of being right grow in proportion to the evidence.'),
      ],
      example: b(
        '设 $v = 1$、$\\sigma = 1$。做决定时累积证据 $|x| = 1$，对数几率为 $2$，信心约为 $\\tfrac{1}{1 + e^{-2}} \\approx 0.88$；若证据为 $0.5$，信心约为 $0.73$。证据弱或拖得久的决定，信心低，也更常出错。',
        'Let $v = 1$ and $\\sigma = 1$. With evidence $|x| = 1$ at the decision, the log-odds are $2$ and confidence is about $\\tfrac{1}{1 + e^{-2}} \\approx 0.88$. With evidence $0.5$, confidence is about $0.73$. Decisions made on weak evidence, or after long deliberation, carry low confidence and are more often wrong.'),
      consequences: [
        b('信心与决策来自同一个累积过程，所以信心能预测正确率。', 'Confidence and decision come from one accumulation, so confidence predicts accuracy.'),
        b('漂移率未知时，用时越长说明问题越难，信心随之降低；猴子和人的行为都表现出这一点。', 'When the drift rate is unknown, taking longer signals a harder problem and lowers confidence, as both monkeys and people show.'),
      ],
      limitations: [
        b('真实的信心还会受到决策之后继续到达的证据、注意和情绪的影响。', 'Real confidence is also shaped by evidence arriving after the decision, attention and emotion.'),
        b('公式假设已知漂移率；多数情况下大脑需要同时估计任务难度。', 'The formula assumes a known drift rate, while the brain usually must estimate difficulty too.'),
      ],
    },
    {
      title: b('元认知效率：信心区分对错的能力，扣除任务表现本身', 'Metacognitive efficiency: how well confidence separates right from wrong, beyond performance'),
      tex: t`d' = z(H) - z(F),\qquad M_{\text{ratio}} = \frac{\text{meta-}d'}{d'}`,
      symbols: [
        { tex: t`H,\;F`, meaning: b('击中率和虚报率：正确说「有」和错误说「有」的比例', 'hit and false-alarm rates: saying yes correctly and incorrectly') },
        { tex: t`z(\cdot)`, meaning: b('把比例换算成标准正态分布上的位置', 'converts a proportion into a position on the standard normal distribution') },
        { tex: t`d'`, meaning: b('一阶敏感度：任务本身做得有多好', 'first-order sensitivity: how well the task itself is done') },
        { tex: t`\text{meta-}d'`, meaning: b('信心评分能达到的「等效」敏感度', 'the equivalent sensitivity reached by the confidence ratings') },
        { tex: t`M_{\text{ratio}}`, meaning: b('元认知效率：$1$ 表示信心用尽了全部可用信息', 'metacognitive efficiency: $1$ means confidence uses all available information') },
      ],
      steps: [
        b('先用击中率和虚报率算出一阶敏感度 $d\'$，表示任务做得有多好。', 'First compute first-order sensitivity $d\'$ from hit and false-alarm rates, showing how well the task is done.'),
        b('再看信心评分区分正确与错误回答的能力，换算成同一尺度上的 meta-$d\'$。', 'Then see how well confidence separates correct from incorrect answers, converted to meta-$d\'$ on the same scale.'),
        b('两者之比就是元认知效率：它扣除了任务表现的影响，可以在不同人和任务之间比较。', 'Their ratio is metacognitive efficiency. It removes the effect of task performance, so people and tasks can be compared.'),
      ],
      example: b(
        '击中率 $0.84$、虚报率 $0.16$：$d\' = 1 - (-1) = 2$。若信心评分区分对错的能力相当于 $\\text{meta-}d\' = 1.6$，效率为 $0.8$，说明信心没有用上约两成可用的信息。另一个人 $d\' = 1$、$\\text{meta-}d\' = 1$，任务做得差些，但元认知效率为 $1$，更高。',
        'Hit rate $0.84$ and false-alarm rate $0.16$ give $d\' = 1 - (-1) = 2$. If confidence separates right from wrong as well as $\\text{meta-}d\' = 1.6$, efficiency is $0.8$, so confidence misses about a fifth of the available information. Another person with $d\' = 1$ and $\\text{meta-}d\' = 1$ does the task worse but has higher metacognitive efficiency, $1$.'),
      consequences: [
        b('表明元认知能力可以和任务能力分开：做得好的人不一定更了解自己做得好不好。', 'It shows metacognitive ability can be separated from task ability. Doing well does not mean knowing well when one does well.'),
        b('这一指标也可以用于评估模型，比较它们的信心是否真正区分了对错。', 'The measure can also evaluate models, checking whether their confidence truly separates right from wrong.'),
      ],
      limitations: [
        b('计算依赖信号检测理论的正态假设，假设不成立时估计会有偏差。', 'It relies on the normal assumptions of signal detection theory and is biased when they fail.'),
        b('需要大量试验才能估计稳定，单次测量噪声很大。', 'It needs many trials for a stable estimate, and single measurements are noisy.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('期望校准误差：信心与实际正确率差多少', 'Expected calibration error: how far confidence is from actual accuracy'),
      tex: t`\mathrm{ECE} = \sum_{m=1}^{M} \frac{|B_m|}{n}\,\big|\mathrm{acc}(B_m) - \mathrm{conf}(B_m)\big|`,
      symbols: [
        { tex: t`B_m`, meaning: b('第 $m$ 组：置信度落在同一区间（如 0.8 到 0.9）的样本', 'group $m$: samples whose confidence falls in one range, such as 0.8 to 0.9') },
        { tex: t`|B_m|,\;n`, meaning: b('这一组的样本数和总样本数', 'size of the group and total number of samples') },
        { tex: t`\mathrm{acc}(B_m)`, meaning: b('这一组的实际正确率', 'actual accuracy of the group') },
        { tex: t`\mathrm{conf}(B_m)`, meaning: b('这一组的平均置信度', 'average confidence of the group') },
      ],
      steps: [
        b('按置信度把所有回答分成若干组。', 'Sort all answers into groups by confidence.'),
        b('每一组比较平均置信度和实际正确率，取差的绝对值。', 'In each group, compare average confidence with actual accuracy and take the absolute difference.'),
        b('按各组样本数加权平均。完全校准时 ECE 为 $0$。', 'Average by group size. Perfect calibration gives an ECE of $0$.'),
      ],
      example: b(
        '100 个回答。60 个的平均置信度为 $0.9$，实际只对了 $0.7$；40 个的平均置信度为 $0.6$，实际对了 $0.6$。$\\mathrm{ECE} = 0.6 \\times 0.2 + 0.4 \\times 0 = 0.12$，误差全部来自高信心组的过度自信。',
        'One hundred answers. Sixty have average confidence $0.9$ but only $0.7$ are right. Forty have confidence $0.6$ and $0.6$ are right. $\\mathrm{ECE} = 0.6 \\times 0.2 + 0.4 \\times 0 = 0.12$, all from overconfidence in the high-confidence group.'),
      consequences: [
        b('提供了一个可比较的数字，能看出模型在哪个信心区间过度或不足自信。', 'It gives a comparable number showing where a model is over- or underconfident.'),
        b('与人的「信心与正确率一致」是同一个概念，可以把人和模型放在同一尺度上比较。', 'It is the same concept as people’s confidence matching accuracy, so people and models can be compared on one scale.'),
      ],
      limitations: [
        b('校准好不等于区分好：一个总是给 $0.7$、正确率也是 $0.7$ 的模型完全校准，却分不出哪些答案更可靠。', 'Good calibration is not good discrimination. A model that always says $0.7$ and is right $0.7$ of the time is perfectly calibrated but cannot tell which answers are more reliable.'),
        b('结果依赖分组方式，样本少时不稳定。', 'Results depend on the grouping and are unstable with few samples.'),
      ],
    },
    {
      title: b('温度缩放：用一个参数修正过度自信', 'Temperature scaling: one parameter to fix overconfidence'),
      tex: t`p_i = \frac{e^{z_i / T}}{\sum_j e^{z_j / T}}`,
      symbols: [
        { tex: t`z_i`, meaning: b('模型对答案 $i$ 的原始得分（logit）', 'raw score, the logit, for answer $i$') },
        { tex: t`T`, meaning: b('温度：大于 $1$ 让概率更平，小于 $1$ 让概率更尖', 'temperature: above $1$ flattens probabilities, below $1$ sharpens them') },
        { tex: t`p_i`, meaning: b('校准后答案 $i$ 的概率', 'calibrated probability of answer $i$') },
      ],
      steps: [
        b('训练完成后，在一份留出的验证数据上寻找使校准误差最小的温度 $T$。', 'After training, find the temperature $T$ that minimizes calibration error on held-out validation data.'),
        b('所有得分都除以同一个 $T$ 再算概率。', 'Divide every score by the same $T$ before computing probabilities.'),
        b('最高得分的答案不变，所以准确率不变，只有置信度被修正。', 'The top answer stays the same, so accuracy is unchanged and only confidence is corrected.'),
      ],
      example: b(
        '两个答案得分为 $(2, 0)$。$T = 1$ 时，较高者的概率为 $\\tfrac{e^2}{e^2 + 1} \\approx 0.88$；$T = 2$ 时为 $\\tfrac{e}{e + 1} \\approx 0.73$。如果这类回答实际只有 $73\\%$ 正确，$T = 2$ 就让置信度与正确率一致。',
        'Two answers score $(2, 0)$. At $T = 1$, the higher one gets $\\tfrac{e^2}{e^2 + 1} \\approx 0.88$. At $T = 2$, it gets $\\tfrac{e}{e + 1} \\approx 0.73$. If such answers are right only $73\\%$ of the time, $T = 2$ aligns confidence with accuracy.'),
      consequences: [
        b('一个参数就能大幅改善深度网络的校准，成本极低。', 'A single parameter greatly improves deep network calibration at almost no cost.'),
        b('说明模型的问题常常在于概率的「尺度」，而不是排序。', 'It shows the problem is often the scale of probabilities, not their ranking.'),
      ],
      limitations: [
        b('只在与验证数据分布相近的输入上有效；遇到新领域，校准会重新变差。', 'It works only on inputs like the validation data and degrades again in new domains.'),
        b('对模型用文字说出的信心不起作用，那是生成出来的文字，不是概率。', 'It does nothing for confidence stated in words, which is generated text rather than a probability.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('常常过度自信', 'Often overconfident'),
        text: b('在困难或不熟悉的问题上，人的信心通常高于实际正确率。', 'On hard or unfamiliar questions, people’s confidence usually exceeds their accuracy.'),
        steps: [2, 3],
      },
      {
        title: b('被流畅感误导', 'Misled by fluency'),
        text: b('答案来得快、读起来顺，信心就会升高，即使正确率并没有提高。', 'When an answer comes quickly or reads smoothly, confidence rises even if accuracy does not.'),
        steps: [2],
      },
      {
        title: b('元认知因人、因任务而异', 'Varies by person and task'),
        text: b('元认知准确性个体差异大，在一类任务中好，不代表在另一类任务中也好。', 'Metacognitive accuracy varies widely across people, and being good in one kind of task does not carry to another.'),
        steps: [3],
      },
    ],
    computational: [
      {
        title: b('说出的信心偏高', 'Stated confidence runs high'),
        text: b('让模型用文字表达信心时，普遍过度自信，且与内部概率不一定一致。', 'Asked to state confidence in words, models are generally overconfident, and this need not match internal probabilities.'),
        steps: [3],
      },
      {
        title: b('不识别知识边界', 'Missing the edge of knowledge'),
        text: b('2025 年的医学测试中，多个模型对本应识别为无法回答的问题仍给出高信心答案。', 'In 2025 medical tests, several models gave high-confidence answers to questions they should have recognized as unanswerable.'),
        steps: [4, 6],
      },
      {
        title: b('后训练削弱校准', 'Post-training weakens calibration'),
        text: b('对齐等后训练让回答更确定，概率校准常随之变差。', 'Post-training such as alignment makes answers more decisive and often worsens calibration.'),
        steps: [5],
      },
    ],
    misreadings: [
      {
        claim: b('模型说「我不确定」，就说明它有元认知', 'A model saying “I’m not sure” shows metacognition'),
        fact: b('口头表达不确定是生成出来的文字，需要检验它是否真的区分了对错、是否会改变后续行为。', 'Stating uncertainty is generated text. Whether it truly separates right from wrong and changes later behavior must be tested.'),
      },
      {
        claim: b('解释得越详细，模型的答案越可靠', 'The more detailed the explanation, the more reliable the answer'),
        fact: b('2025 年的研究发现，较长的解释提高了用户的信心，却没有提高正确率。', 'A 2025 study found longer explanations raised user confidence without raising accuracy.'),
      },
    ],
  },
  refs: {
    neuro: ['gehring1993', 'kepecs2008', 'kiani2009', 'fleming2010', 'fleming2012'],
    models: ['fleming2014', 'maniscalco2012'],
    ai: ['guo2017', 'kadavath2022', 'openai2023', 'xiong2023', 'huang2023', 'griot2025', 'steyvers2025'],
  },
}
