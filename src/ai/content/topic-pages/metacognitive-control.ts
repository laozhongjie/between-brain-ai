import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F25 Metacognitive control: confidence-driven checking and help seeking vs self-correction and reasoning budget allocation. */
export const METACOGNITIVE_CONTROL: TopicContent = {
  thesis: {
    biological: b(
      '监测之后要据此行动。信心低时，人会放慢、复查、收集更多信息，或者去问别人、把事情写下来交给外部工具；信心高时直接行动。学习时，人把时间花在「差一点就会」的内容上。一种有影响的理论认为，前扣带皮层权衡「多投入努力的收益」与「努力本身的代价」，决定投入多少控制。',
      'Monitoring has to lead to action. With low confidence, people slow down, recheck, gather more information, ask someone or write things down for external tools. With high confidence they act directly. When studying, people spend time on what they almost know. One influential theory holds that anterior cingulate cortex weighs the benefit of extra effort against the cost of effort itself to decide how much control to invest.'),
    computational: b(
      '推理模型在回答前写出推理过程，可以用更多计算换取正确率：推理更长、多次采样再投票。用强化学习训练后，模型会出现回头检查的行为。但没有外部反馈时，模型的自我纠错效果有限，有时还会改错；专门训练能改进这一点。推理的长度与题目难度也不匹配，简单题上常常「想太多」。',
      'Reasoning models write out their reasoning before answering and can trade more computation for accuracy, with longer reasoning or several samples and a vote. After reinforcement learning, models show behavior such as going back to check. But without outside feedback, self-correction helps little and sometimes makes things worse, though dedicated training improves it. Reasoning length also fits difficulty poorly, and models often overthink easy problems.'),
    gap: b(
      '两边都能在难题上投入更多计算或努力。差距在于驱动方式：人的调控由对自身状态的估计驱动，能选择求助、查证或放弃；模型的调控主要由训练形成的模式驱动，投入多少与实际需要不匹配，没有外部反馈时的自我纠错不可靠。',
      'Both can spend more computation or effort on hard problems. The gap is what drives it. Human control is driven by an estimate of one’s own state and can choose to ask, verify or give up. Model control is driven mainly by trained habits, effort fits need poorly and self-correction without outside feedback is unreliable.'),
  },
  short: { biological: b('人', 'People'), computational: b('模型', 'Models') },
  kinds: ['behavior', 'algorithm'],
  evidence: 'debated',
  asOf: b('AI 侧描述截至 2026 年 10 月的推理模型与自我纠错方法；具体评测结果按发表年份注明。', 'The AI column describes reasoning models and self-correction methods as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('难题投入更多', 'More effort on hard problems'),
      brain: b('不确定时，人会多花时间、主动收集更多信息再决定；信心越低，越倾向于再看一眼。', 'When unsure, people take longer and gather more information before deciding. The lower their confidence, the more they look again.'),
      ai: b('2024 年的研究显示，按题目难度分配推理时的计算，能以较小的模型达到较大模型的正确率。', 'A 2024 study showed that allocating inference-time computation by problem difficulty lets a smaller model match a larger one’s accuracy.'),
      gap: b('两边都能把更多资源用在难题上；人的分配由信心驱动，模型的分配多由训练或外部规则决定。', 'Both put more resources into hard problems. People allocate by confidence, models mostly by training or external rules.'),
    },
    {
      lead: 'bio',
      dimension: b('无反馈时自我纠错', 'Self-correction without feedback'),
      brain: b('人能当场发现并更正许多自己的错误，错误之后会放慢、更加小心。', 'People catch and fix many of their own errors on the spot, then slow down and take more care.'),
      ai: b('2023 年的研究中，没有外部反馈时，让模型「检查并修改答案」常常不提高、甚至降低正确率；2024 年的专门训练方法使自我纠错有了改进。', 'In a 2023 study, asking a model to check and revise its answer without outside feedback often did not help and sometimes lowered accuracy. A 2024 training method improved self-correction.'),
      gap: b('人的纠错依赖独立的错误信号，模型的「检查」与生成来自同一个过程，难以发现自己的盲点。', 'Human correction relies on a separate error signal, while a model’s check comes from the same process as its answer and struggles to find its own blind spots.'),
    },
    {
      lead: 'bio',
      dimension: b('求助与查证', 'Asking and verifying'),
      brain: b('信心低时，人会问别人、查资料，或把信息写下来、设提醒，交给外部工具。', 'With low confidence, people ask others, look things up, or write things down and set reminders for external tools.'),
      ai: b('模型可以调用搜索和代码工具，但何时该查、何时该拒答的判断仍不可靠，常在该求助时直接给出答案。', 'Models can call search and code tools, but deciding when to look something up or decline remains unreliable, and they often answer when they should seek help.'),
      gap: b('「知道该求助」依赖可靠的监测，这正是模型的薄弱环节。', 'Knowing when to seek help depends on reliable monitoring, which is where models are weak.'),
    },
    {
      lead: 'mixed',
      dimension: b('努力与需要的匹配', 'Fitting effort to need'),
      brain: b('因为努力有代价，人有时会省事，在该检查时不检查；疲劳时更明显。', 'Because effort is costly, people sometimes cut corners and skip checks they should do, more so when tired.'),
      ai: b('2024 年的研究发现，推理模型在「2 加 3 等于几」这样的简单题上也会写出很长的推理，浪费计算。', 'A 2024 study found reasoning models write long reasoning even for problems as simple as two plus three, wasting computation.'),
      gap: b('人倾向于投入不足，模型常常投入过多，两者都没有做到精确匹配。', 'People tend to invest too little and models often too much, and neither matches need precisely.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('监测信号', 'Monitoring signals'),
        points: [b('信心和错误信号（见上一张卡）说明当前判断有多可靠。', 'Confidence and error signals, from the previous card, show how reliable the current judgment is.')],
      },
      {
        title: b('评估控制的价值', 'Valuing control'),
        points: [b('前扣带皮层比较「多投入努力能带来多少好处」与「努力本身的代价」，算出值得投入多少控制。', 'Anterior cingulate cortex compares how much extra effort would gain with what the effort itself costs, working out how much control is worth investing.')],
      },
      {
        title: b('执行调控', 'Exerting control'),
        points: [
          b('外侧前额叶据此调整决策方式：提高决策所需的证据量、放慢、复查。', 'Lateral prefrontal cortex adjusts decision making accordingly: requiring more evidence, slowing down and rechecking.'),
          b('犯错之后的下一次反应通常变慢、更准确。', 'The response after an error is usually slower and more accurate.'),
        ],
      },
      {
        title: b('寻求信息与帮助', 'Seeking information and help'),
        points: [b('信心低时，人更可能选择再看一次证据、查资料或问别人，信心高时则跳过。', 'With low confidence, people are more likely to look at the evidence again, look things up or ask someone, and skip this when confident.')],
      },
      {
        title: b('认知卸载', 'Cognitive offloading'),
        points: [b('对自己的记忆没把握时，人会把信息写下来或设提醒，把记忆的负担交给外部工具。', 'When unsure of their memory, people write information down or set reminders, handing the load to external tools.')],
      },
      {
        title: b('学习时间的分配', 'Allocating study time'),
        points: [b('学习时，人跳过已经掌握的和太难的内容，把时间花在「差一点就会」的部分。', 'When studying, people skip what they know and what is too hard, spending time on what they almost know.')],
      },
    ],
    computational: [
      {
        title: b('问题输入', 'Problem input'),
        points: [b('问题和指令进入模型。', 'The question and instructions enter the model.')],
      },
      {
        title: b('写出推理过程', 'Writing out reasoning'),
        points: [b('模型先生成一段中间推理再给答案；推理越长，花的计算越多。', 'The model generates intermediate reasoning before answering, and longer reasoning uses more computation.')],
      },
      {
        title: b('多次采样与投票', 'Sampling and voting'),
        points: [b('对同一问题生成多条推理，取出现最多的答案（自一致性），或用评分模型挑出最好的一条。', 'Several reasoning paths are generated for one question and the most common answer is taken, called self-consistency, or a scoring model picks the best.')],
      },
      {
        title: b('自我检查', 'Self-checking'),
        points: [b('用强化学习训练后，模型会在推理中回头检查、改用其他方法；没有外部反馈时，这种检查的可靠性有限。', 'After reinforcement learning, models go back to check and try other approaches within their reasoning. Without outside feedback, such checks have limited reliability.')],
      },
      {
        title: b('工具与拒答', 'Tools and declining'),
        points: [b('模型可以调用搜索或代码执行来查证，也可以回答「不知道」；何时这样做，由训练形成的模式决定。', 'The model can call search or code execution to verify, or answer “I don’t know”. When it does so is decided by trained habits.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('没有由可靠的自我评估驱动的调控：模型难以准确判断何时该多想、何时该停、何时该查、何时该拒答。', 'No control driven by reliable self-assessment: models struggle to judge when to think more, stop, verify or decline.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('「错误后减速」于 1966 年被报告：在快速选择任务中犯错后，下一次反应明显变慢，常常也更准确。', 'Post-error slowing was reported in 1966. After an error in a fast choice task, the next response is clearly slower and often more accurate.'),
      b('2018 年的实验中，被试在做出决定后可以选择再看一次刺激；信心越低，选择再看的比例越高，即使客观难度相同。', 'In a 2018 experiment, participants could choose to see the stimulus again after deciding. The lower their confidence, the more often they chose to look again, even at equal objective difficulty.'),
      b('「控制的期望价值」理论把前扣带皮层的多种活动统一为一个计算：估计每种控制强度的收益和代价，选净收益最大的那一种。', 'The expected value of control theory unifies many anterior cingulate findings as one computation: estimate the benefit and cost of each level of control and pick the one with the largest net value.'),
      b('「近端学习区」模型描述学习时间的分配：人优先学习接近掌握、但尚未掌握的内容，这比优先学最难的内容更有效。', 'The region of proximal learning model describes study time allocation. People prioritize content close to mastery but not yet mastered, which works better than starting with the hardest.'),
    ],
    computational: [
      b('思维链提示于 2022 年被系统研究：让模型先写出中间步骤，能明显提高多步推理题的正确率。', 'Chain-of-thought prompting was studied systematically in 2022. Having models write intermediate steps clearly raised accuracy on multi-step reasoning.'),
      b('2025 年发表的 DeepSeek-R1 研究报告，只用结果正确与否作为奖励进行强化学习，模型自发出现了反思、回头检查等行为。', 'DeepSeek-R1, published in 2025, reported that reinforcement learning with only answer correctness as reward led models to develop reflection and going back to check on their own.'),
      b('「选择性回答」方法训练一个单独的判断器，决定模型的哪些答案可以给出、哪些应当拒答；在新领域中，这种判断会变差。', 'Selective answering trains a separate judge to decide which answers to give and which to decline. In new domains, the judgment degrades.'),
      b('推理时的计算越多不一定越好：简单题上过长的推理浪费计算，有时还会把对的答案改错。', 'More inference-time computation is not always better. Overlong reasoning on easy problems wastes computation and sometimes turns right answers wrong.'),
    ],
  },
  bioMath: [
    {
      title: b('控制的期望价值：值不值得多花力气', 'Expected value of control: is extra effort worth it'),
      tex: t`\mathrm{EVC}(c) = \sum_{i} P(o_i \mid c)\,V(o_i) - \mathrm{Cost}(c),\qquad c^{*} = \arg\max_{c}\,\mathrm{EVC}(c)`,
      symbols: [
        { tex: t`c`, meaning: b('一种控制方式及其强度，例如「复查一遍」', 'a kind and level of control, such as checking once more') },
        { tex: t`o_i`, meaning: b('可能的结果，例如答对或答错', 'possible outcomes, such as right or wrong') },
        { tex: t`P(o_i \mid c)`, meaning: b('采用这种控制时各结果的概率', 'probability of each outcome under this control') },
        { tex: t`V(o_i)`, meaning: b('结果的价值', 'value of the outcome') },
        { tex: t`\mathrm{Cost}(c)`, meaning: b('控制本身的代价：时间、精力', 'cost of the control itself: time and effort') },
      ],
      steps: [
        b('对每种可选的控制方式，估计采用它之后各种结果的概率。', 'For each possible control, estimate the probability of each outcome under it.'),
        b('算出预期收益，再减去这种控制的代价。', 'Compute the expected benefit and subtract the control’s cost.'),
        b('选净值最大的那一种。信心低时，复查能大幅提高答对的概率，所以值得；信心高时，复查几乎不改变结果，就不值得。', 'Choose the one with the largest net value. With low confidence, checking raises the chance of being right a lot, so it pays. With high confidence it changes little and does not.'),
      ],
      example: b(
        '答对价值 $10$，答错 $0$，复查代价 $1$。信心 $0.95$ 时，复查把正确率提高到 $0.97$：不复查 $9.5$，复查 $9.7 - 1 = 8.7$，不值得。信心 $0.6$ 时，复查把正确率提高到 $0.85$：不复查 $6$，复查 $8.5 - 1 = 7.5$，值得复查。',
        'Being right is worth $10$, wrong $0$, and checking costs $1$. At confidence $0.95$, checking raises accuracy to $0.97$: not checking gives $9.5$, checking $9.7 - 1 = 8.7$, not worth it. At confidence $0.6$, checking raises it to $0.85$: not checking gives $6$, checking $8.5 - 1 = 7.5$, worth it.'),
      consequences: [
        b('把监测（信心）和调控（是否复查）连接起来：信心决定了复查能带来多少收益。', 'It links monitoring, confidence, to control, whether to check: confidence sets how much checking would gain.'),
        b('也解释了疲劳时人更少检查：努力的代价升高，净值下降。', 'It also explains why people check less when tired: the cost of effort rises and the net value falls.'),
      ],
      limitations: [
        b('代价和价值怎样在神经中表示和比较仍有争议，前扣带皮层的具体角色也有多种解释。', 'How costs and values are represented and compared neurally is debated, and the exact role of anterior cingulate cortex has several accounts.'),
        b('估计每种控制会带来多少改善，本身也需要元认知，模型把它当作已知。', 'Estimating how much each control would help itself needs metacognition, which the model takes as given.'),
      ],
    },
    {
      title: b('速度与准确的权衡：提高决策界限换取更少的错误', 'Speed and accuracy: raising the bound trades time for fewer errors'),
      tex: t`P_{\text{error}} = \frac{1}{1 + e^{2 v B / \sigma^{2}}},\qquad \bar{T} = \frac{B}{v}\,\tanh\!\Big(\frac{v B}{\sigma^{2}}\Big)`,
      symbols: [
        { tex: t`B`, meaning: b('决策界限：做决定前需要累积多少证据', 'decision bound: how much evidence must accumulate before deciding') },
        { tex: t`v,\;\sigma`, meaning: b('证据的漂移率和噪声', 'drift rate and noise of the evidence') },
        { tex: t`P_{\text{error}}`, meaning: b('出错的概率', 'probability of error') },
        { tex: t`\bar{T}`, meaning: b('平均决策时间', 'mean decision time') },
      ],
      steps: [
        b('证据累积到界限 $B$ 时做决定。', 'Decide when evidence reaches the bound $B$.'),
        b('界限越高，噪声把累积值推到错误一边的可能越小，错误率指数下降。', 'The higher the bound, the less likely noise pushes the total to the wrong side, so errors fall exponentially.'),
        b('代价是要等更久。「更谨慎」在这个模型里就是提高 $B$。', 'The cost is waiting longer. Being more careful in this model means raising $B$.'),
      ],
      example: b(
        '设 $v = 1$、$\\sigma = 1$。$B = 1$ 时，错误率约 $0.12$，平均用时约 $0.76$；$B = 2$ 时，错误率降到约 $0.018$，用时约 $1.93$。用时增加约 2.5 倍，错误减少到约七分之一。',
        'Let $v = 1$ and $\\sigma = 1$. With $B = 1$, error is about $0.12$ and mean time about $0.76$. With $B = 2$, error falls to about $0.018$ and time rises to about $1.93$. About 2.5 times the time cuts errors to about a seventh.'),
      consequences: [
        b('解释了错误后减速：错误信号让大脑临时提高界限，下一次更慢、更准。', 'It explains post-error slowing: an error signal makes the brain raise the bound temporarily, so the next response is slower and more accurate.'),
        b('与模型「推理更长以换取更高正确率」在功能上相似，都是用时间换准确。', 'It is functionally similar to models reasoning longer for higher accuracy: both trade time for accuracy.'),
      ],
      limitations: [
        b('真实的界限可能随时间下降（等太久就先做决定），模型假设界限固定。', 'Real bounds may fall with time, deciding anyway after waiting too long, while the model assumes a fixed bound.'),
        b('公式不说明大脑怎样决定把界限设在哪里。', 'The formula does not say how the brain decides where to set the bound.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('自一致性投票：多次采样，用多数答案', 'Self-consistency voting: sample many times, take the majority'),
      tex: t`P_{\text{maj}} = \sum_{k > n/2} \binom{n}{k}\,p^{k}\,(1 - p)^{\,n-k}`,
      symbols: [
        { tex: t`n`, meaning: b('对同一问题采样的推理条数', 'number of reasoning paths sampled for one question') },
        { tex: t`p`, meaning: b('单条推理得出正确答案的概率', 'probability one path reaches the right answer') },
        { tex: t`\binom{n}{k}`, meaning: b('从 $n$ 条中选出 $k$ 条的组合数', 'number of ways to choose $k$ of $n$') },
        { tex: t`P_{\text{maj}}`, meaning: b('多数答案正确的概率（简化为对错两种答案时）', 'probability the majority answer is right, simplified to right or wrong') },
      ],
      steps: [
        b('对同一问题独立生成 $n$ 条推理，每条给出一个答案。', 'Generate $n$ independent reasoning paths for one question, each giving an answer.'),
        b('统计哪个答案出现最多。', 'Count which answer appears most often.'),
        b('只要单条正确率超过一半且各条相互独立，采样越多，多数答案正确的概率越高。', 'As long as single-path accuracy exceeds one half and paths are independent, more samples make the majority more likely right.'),
      ],
      example: b(
        '单条正确率 $p = 0.6$。只采 $1$ 次，正确率 $0.6$；采 $5$ 次取多数，约 $0.68$；采 $15$ 次，约 $0.79$。计算量分别是 1 倍、5 倍和 15 倍。',
        'Single-path accuracy is $p = 0.6$. One sample gives $0.6$, the majority of $5$ about $0.68$ and of $15$ about $0.79$. Computation is 1, 5 and 15 times as much.'),
      consequences: [
        b('用更多计算可靠地换取正确率，不需要重新训练模型。', 'More computation reliably buys accuracy without retraining the model.'),
        b('相当于把「复查」变成「独立重做几次再比较」。', 'It turns checking into redoing independently several times and comparing.'),
      ],
      limitations: [
        b('若单条正确率低于一半，或各条推理犯同样的错误，投票不但没用还会巩固错误。', 'If single-path accuracy is below one half, or paths make the same mistake, voting does not help and can entrench the error.'),
        b('采样次数是事先设定的，不根据这道题的难度调整。', 'The number of samples is set in advance, not adjusted to the difficulty of the question.'),
      ],
    },
    {
      title: b('选择性回答：信心低于阈值就拒答', 'Selective answering: decline below a confidence threshold'),
      tex: t`\mathrm{coverage} = P(\hat{c} \ge \tau),\qquad \mathrm{risk} = P(\hat{y} \ne y \mid \hat{c} \ge \tau)`,
      symbols: [
        { tex: t`\hat{c}(x)`, meaning: b('模型或判断器对问题 $x$ 的答案给出的信心', 'confidence that the model or a judge gives its answer to question $x$') },
        { tex: t`\tau`, meaning: b('阈值：低于它就拒答', 'threshold: below it, decline') },
        { tex: t`\hat{y},\;y`, meaning: b('模型的答案和正确答案', 'the model’s answer and the correct answer') },
        { tex: t`\mathrm{coverage}`, meaning: b('覆盖率：实际回答了的问题所占比例', 'coverage: share of questions actually answered') },
        { tex: t`\mathrm{risk}`, meaning: b('风险：回答了的问题中答错的比例', 'risk: share of answered questions that are wrong') },
      ],
      steps: [
        b('为每个答案估计信心。', 'Estimate confidence for each answer.'),
        b('信心不低于阈值就回答，否则说「不知道」或转交人工。', 'Answer if confidence meets the threshold, otherwise say “I don’t know” or hand over to a person.'),
        b('提高阈值，回答的问题变少，但答错的比例下降；在两者之间按需要取舍。', 'Raising the threshold answers fewer questions but with fewer errors, and the trade-off is set by need.'),
      ],
      example: b(
        '1000 个问题，整体正确率 $80\\%$。取一个阈值后只回答信心最高的 600 个，其中答错 30 个：覆盖率 $60\\%$，风险 $5\\%$；不设阈值时，风险是 $20\\%$。',
        'One thousand questions with overall accuracy $80\\%$. A threshold that answers only the 600 most confident, with 30 wrong, gives coverage $60\\%$ and risk $5\\%$. Without a threshold, risk is $20\\%$.'),
      consequences: [
        b('把元认知监测变成实际行动：不确定时拒答或求助，减少高风险错误。', 'It turns monitoring into action: declining or seeking help when unsure, reducing costly errors.'),
        b('与人「没把握就问别人」的策略在功能上相同。', 'It is functionally the same as people asking someone when unsure.'),
      ],
      limitations: [
        b('效果完全取决于信心估计的质量；在新领域中信心估计变差，拒答也随之失效。', 'It depends entirely on the quality of the confidence estimate. In new domains the estimate degrades and so does declining.'),
        b('阈值需要事先设定，不能随风险高低自动调整。', 'The threshold is set in advance and does not adjust automatically to the stakes.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('倾向于省力', 'Tends to save effort'),
        text: b('努力有代价，人常在该复查时不复查，疲劳和时间压力下更明显。', 'Effort is costly, so people often skip checks they should make, more so under fatigue and time pressure.'),
        steps: [2],
      },
      {
        title: b('调控受信心偏差影响', 'Control inherits confidence bias'),
        text: b('过度自信时不会去查证或求助，错误因此被保留。', 'When overconfident, people do not verify or ask, so errors remain.'),
        steps: [1, 4],
      },
      {
        title: b('学习时间分配会失误', 'Study time misallocated'),
        text: b('熟悉感会让人以为已经学会，过早停止学习。', 'A feeling of familiarity makes people think they have learned something and stop too early.'),
        steps: [6],
      },
    ],
    computational: [
      {
        title: b('自我纠错不可靠', 'Unreliable self-correction'),
        text: b('没有外部反馈时，自我检查常常不提高正确率，有时把对的改成错的。', 'Without outside feedback, self-checking often does not raise accuracy and sometimes changes right answers to wrong.'),
        steps: [4],
      },
      {
        title: b('计算投入不匹配', 'Mismatched effort'),
        text: b('简单题上推理过长，难题上又可能过早给出答案。', 'Reasoning runs long on easy problems and may stop too soon on hard ones.'),
        steps: [2, 6],
      },
      {
        title: b('不知道何时求助', 'Not knowing when to ask'),
        text: b('模型可以调用工具或拒答，但何时这样做的判断在新领域中不可靠。', 'Models can call tools or decline, but judging when to do so is unreliable in new domains.'),
        steps: [5],
      },
    ],
    misreadings: [
      {
        claim: b('推理模型会反思，就说明它有元认知调控', 'Reasoning models reflect, so they have metacognitive control'),
        fact: b('强化学习训练出了回头检查的行为模式；这种检查是否基于对自身可靠性的准确估计、能否在没有反馈时可靠地纠错，仍需检验。', 'Reinforcement learning produced the habit of going back to check. Whether these checks rest on an accurate estimate of one’s own reliability, and correct reliably without feedback, still needs testing.'),
        source: b('2025 年 DeepSeek-R1 的报告把训练中出现的回头检查称为「顿悟时刻」。', 'The 2025 DeepSeek-R1 report called the self-checking that emerged in training an “aha moment”.'),
      },
      {
        claim: b('推理越长，答案越可靠', 'Longer reasoning means more reliable answers'),
        fact: b('在难题上更多计算通常有帮助，但简单题上过长的推理浪费计算，有时还会把对的答案改错。', 'More computation usually helps on hard problems, but overlong reasoning on easy ones wastes computation and sometimes turns right answers wrong.'),
      },
    ],
  },
  refs: {
    neuro: ['rabbitt1966', 'metcalfe2005', 'desender2018', 'risko2016'],
    models: ['shenhav2013'],
    ai: ['wei2022', 'wang2022sc', 'huang2023', 'kumar2024', 'snell2024', 'chen2024', 'deepseek2025', 'kamath2020'],
  },
}
