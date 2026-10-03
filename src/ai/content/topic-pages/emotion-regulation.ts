import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F33 Affective states and emotion regulation: amygdala and prefrontal regulation circuits vs functional emotion models in agents. */
export const EMOTION_REGULATION: TopicContent = {
  thesis: {
    biological: b(
      '情绪是一种全身状态。杏仁核察觉威胁后，在几百毫秒内改变心率、激素、注意和记忆的写入，这种状态会持续一段时间，并推广到相似的情境。前额叶用多种策略调节情绪：重新解释情境（认知重评）能降低杏仁核的反应，腹内侧前额叶参与恐惧的消退。压力过大时，前额叶的功能下降，调节随之失效。',
      'Emotion is a whole-body state. When the amygdala detects threat, it changes heart rate, hormones, attention and memory storage within hundreds of milliseconds. The state lasts for a while and spreads to similar situations. Prefrontal cortex regulates emotion with several strategies. Reinterpreting the situation, cognitive reappraisal, lowers the amygdala response, and ventromedial prefrontal cortex supports extinction of fear. Under heavy stress, prefrontal function falls and regulation fails.'),
    computational: b(
      '强化学习研究中有「功能性情绪」模型：用奖励的变化、预测误差或内部变量算出类似恐惧、希望的信号，用来调节探索、学习率和风险偏好。2023 年的研究发现，在提示中加入引发焦虑的内容，会改变大语言模型的探索行为并加重偏见。但这些「情绪」多由设计者定义，通常只调节一两个参数，没有身体基础，也没有持续的自我调节。',
      'Reinforcement learning research has functional emotion models that compute fear-like or hope-like signals from reward changes, prediction errors or internal variables and use them to tune exploration, learning rate and risk taking. A 2023 study found that adding anxiety-inducing content to prompts changed a large language model’s exploration and increased its biases. But these emotions are mostly defined by designers, usually tune one or two parameters and have no bodily basis or ongoing self-regulation.'),
    gap: b(
      '大脑的情绪是一个同时改变注意、学习、记忆和身体的全局状态，并由前额叶持续调节；AI 中的「情绪」多是单独设计的一个调节变量，或只是语言表达上的变化。',
      'In the brain, emotion is a global state that changes attention, learning, memory and the body at once, under ongoing prefrontal regulation. In AI, emotion is mostly a separately designed tuning variable or a change in how language is expressed.'),
  },
  short: { biological: b('大脑', 'The brain'), computational: b('智能体', 'Agents') },
  kinds: ['behavior', 'algorithm'],
  evidence: 'debated',
  asOf: b('AI 侧描述截至 2026 年 10 月强化学习中的功能性情绪模型与大语言模型；具体结果按发表年份注明。', 'The AI column describes functional emotion models in reinforcement learning and large language models as of October 2026. Results are dated by publication year.'),
  capabilities: [
    {
      lead: 'bio',
      dimension: b('全局状态切换', 'Global state switching'),
      brain: b('察觉威胁后，心率、激素、注意、记忆写入和动作准备一起改变，整个系统进入「应对」状态。', 'After detecting threat, heart rate, hormones, attention, memory storage and action readiness change together, putting the whole system into a coping state.'),
      ai: b('功能性情绪信号通常只调节一两个参数，例如探索率或风险偏好。', 'Functional emotion signals usually tune only one or two parameters, such as exploration rate or risk taking.'),
      gap: b('生物情绪的作用在于协调许多系统同时改变，这在 AI 中很少实现。', 'The value of biological emotion lies in coordinating many systems at once, which AI rarely does.'),
    },
    {
      lead: 'bio',
      dimension: b('一次就学会恐惧', 'Learning fear in one go'),
      brain: b('一次强烈的危险经历就能形成持久的恐惧记忆，并推广到相似的情境。', 'One intense dangerous experience can form a lasting fear memory that spreads to similar situations.'),
      ai: b('强化学习智能体通常需要多次负奖励才能学会避开危险，实际系统依赖人为设定的安全约束。', 'Reinforcement learning agents usually need many negative rewards to learn to avoid danger, and real systems rely on human-set safety constraints.'),
      gap: b('生物的恐惧学习快而稳固，在危险环境中保护了个体，代价是可能过度推广。', 'Biological fear learning is fast and durable, protecting the individual in danger at the risk of overgeneralizing.'),
    },
    {
      lead: 'bio',
      dimension: b('主动调节情绪', 'Actively regulating emotion'),
      brain: b('重新解释情境能降低杏仁核的反应和主观的负面感受，这一效应在许多脑成像研究中得到重复。', 'Reinterpreting a situation lowers amygdala responses and negative feelings, an effect replicated across many brain imaging studies.'),
      ai: b('模型没有需要调节的内部情绪状态；可以按指令改变回答的语气，但这不是对内部状态的调节。', 'Models have no internal emotional state to regulate. They can change tone on instruction, but that is not regulating an inner state.'),
      gap: b('「调节」需要先有被调节的状态，AI 中通常缺少这一前提。', 'Regulation requires a state to regulate, a premise usually missing in AI.'),
    },
    {
      lead: 'mixed',
      dimension: b('压力下的稳定性', 'Stability under pressure'),
      brain: b('强烈压力会削弱前额叶的功能，人更依赖习惯，思考和调节能力下降。', 'Strong stress weakens prefrontal function, so people rely more on habits and think and regulate less well.'),
      ai: b('模型不会疲劳或产生应激激素，但提示中的情绪化措辞会改变它的决策和偏见。', 'Models do not tire or release stress hormones, but emotional wording in prompts changes their decisions and biases.'),
      gap: b('两边在「情绪化的输入」下都会改变行为，原因不同：人是生理状态改变，模型是输入的统计关联改变。', 'Both change behavior under emotional input for different reasons: a physiological state change in people, changed statistical associations in models.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('两条输入通路', 'Two input routes'),
        points: [b('丘脑经快速通路直接把粗略的感觉信号送到杏仁核，约十几毫秒；经皮层的慢速通路随后提供细节，判断到底是什么。', 'The thalamus sends a rough sensory signal straight to the amygdala along a fast route in about a dozen milliseconds. A slower route through cortex then supplies detail about what it actually is.')],
      },
      {
        title: b('杏仁核评估', 'Amygdala appraisal'),
        points: [b('杏仁核的外侧核学习「这个刺激预示危险」的关联，中央核发出输出信号。', 'The lateral amygdala learns that a stimulus predicts danger, and the central nucleus sends out the response.')],
      },
      {
        title: b('全身反应', 'Whole-body response'),
        points: [
          b('下丘脑引起应激激素（如皮质醇）释放，脑干改变心率和呼吸，动物可能僵住或逃跑。', 'The hypothalamus triggers stress hormones such as cortisol, the brainstem changes heart rate and breathing and the animal may freeze or flee.'),
          b('去甲肾上腺素提高警觉，并增强这段经历的记忆写入。', 'Noradrenaline raises alertness and strengthens memory storage of the episode.'),
        ],
      },
      {
        title: b('状态的持续与推广', 'Persistence and generalization'),
        points: [b('情绪状态在刺激消失后仍持续几分钟到几小时，并影响随后的注意、记忆和决策；相似的情境也会引起类似的反应。', 'The emotional state persists for minutes to hours after the stimulus ends, affecting later attention, memory and decisions, and similar situations evoke similar responses.')],
      },
      {
        title: b('前额叶调节', 'Prefrontal regulation'),
        points: [
          b('外侧前额叶执行重新评价，改变对情境的解释，间接降低杏仁核的反应。', 'Lateral prefrontal cortex carries out reappraisal, changing how the situation is interpreted and indirectly lowering the amygdala response.'),
          b('腹内侧前额叶在恐惧消退中抑制杏仁核的输出，记住「这个线索现在是安全的」。', 'In fear extinction, ventromedial prefrontal cortex inhibits amygdala output, remembering that the cue is now safe.'),
        ],
      },
      {
        title: b('身体反馈', 'Bodily feedback'),
        points: [b('心跳、呼吸和内脏的变化经岛叶回到大脑，成为情绪感受的一部分，也影响后续的决策。', 'Changes in heartbeat, breathing and the viscera return to the brain through the insula, becoming part of the feeling and influencing later decisions.')],
      },
    ],
    computational: [
      {
        title: b('环境与奖励', 'Environment and reward'),
        points: [b('智能体从环境中得到观察和奖励。', 'The agent gets observations and rewards from the environment.')],
      },
      {
        title: b('计算情绪信号', 'Computing emotion signals'),
        points: [b('根据价值的变化、预测误差或目标进展，计算出类似「恐惧」（价值下降）、「希望」（价值上升）的变量。', 'From changes in value, prediction errors or goal progress, compute variables like fear, value falling, or hope, value rising.')],
      },
      {
        title: b('调节参数', 'Tuning parameters'),
        points: [b('这些信号调节探索率、学习率或对风险的态度，例如「恐惧」时减少探索、偏向保守的动作。', 'These signals tune exploration, learning rate or attitude to risk, for example exploring less and choosing conservative actions under fear.')],
      },
      {
        title: b('安全约束', 'Safety constraints'),
        points: [b('实际系统常用单独的安全模块，在预测到危险时直接阻止动作，相当于硬编码的「恐惧反射」。', 'Real systems often use a separate safety module that blocks actions when danger is predicted, a hard-coded fear reflex.')],
      },
      {
        title: b('语言模型中的「情绪」', 'Emotion in language models'),
        points: [b('提示中的情绪内容会改变语言模型的回答风格和决策，但模型内部没有持续的情绪状态。', 'Emotional content in prompts changes a language model’s style and decisions, but the model has no lasting emotional state inside.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('缺少身体基础和持续的自我调节：没有一个同时影响多个系统、又能被主动调节的全局状态。', 'Missing a bodily basis and ongoing self-regulation: there is no global state that affects many systems at once and can be actively regulated.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('2014 年的框架提出，情绪状态在不同物种中有共同的特征：强度可变、有正负、会持续、会推广到相似情境；这些特征可以在动物中测量，不依赖主观报告。', 'A 2014 framework proposed shared features of emotional states across species: variable intensity, positive or negative valence, persistence and generalization. These can be measured in animals without subjective report.'),
      b('2015 年的过程模型把情绪调节分为五类策略：选择情境、改变情境、转移注意、重新评价和抑制表达，越早介入的策略通常越有效。', 'A 2015 process model groups emotion regulation into five strategies: choosing situations, changing them, shifting attention, reappraising and suppressing expression. Earlier strategies usually work better.'),
      b('恐惧消退不是抹去原来的记忆，而是学会一个新的「安全」记忆；换一个情境或时间久了，原来的恐惧可能复发。', 'Fear extinction does not erase the original memory but learns a new safety memory. In a new context or after time passes, the original fear can return.'),
      b('躯体标记假说认为，身体反应作为信号指导决策；前额叶腹内侧受损的病人在需要权衡风险的决策中表现异常，但对这一假说的解释仍有争议。', 'The somatic marker hypothesis holds that bodily responses act as signals guiding decisions. Patients with ventromedial prefrontal damage decide abnormally when weighing risk, but interpretations of the hypothesis remain debated.'),
    ],
    computational: [
      b('2018 年的综述总结了强化学习中的情绪模型：情绪可以由内在动机、奖励与价值的变化或硬编码规则产生，并用于调节动作选择、学习和沟通。', 'A 2018 survey summarized emotion models in reinforcement learning. Emotions can arise from intrinsic motivation, changes in reward and value or hard-coded rules, and serve to tune action selection, learning and communication.'),
      b('2023 年的研究让 GPT-3.5 回答焦虑问卷，并发现引发焦虑的提示会改变它在多臂老虎机任务中的探索，加重它在偏见测试中的偏见。', 'A 2023 study had GPT-3.5 answer an anxiety questionnaire and found anxiety-inducing prompts changed its exploration in a bandit task and increased its biases on bias tests.'),
      b('风险敏感的强化学习用条件风险价值等指标关注最坏情况，在功能上类似「谨慎」或「焦虑」带来的保守行为。', 'Risk-sensitive reinforcement learning uses measures such as conditional value at risk to focus on worst cases, functionally like the conservatism of caution or anxiety.'),
      b('情绪化的输出（例如说「我很难过」）是语言层面的模仿，不能据此推断模型有情绪体验。', 'Emotional outputs, such as saying “I feel sad”, are imitation at the level of language and do not show the model experiences emotion.'),
    ],
  },
  bioMath: [
    {
      title: b('恐惧学习与消退：消退是学会「现在安全」，不是忘记', 'Fear learning and extinction: extinction learns “safe now”, not forgetting'),
      tex: t`V_{\text{fear}} \leftarrow V_{\text{fear}} + \alpha\,(\lambda - V_{\text{fear}}),\qquad R = V_{\text{fear}} - c\,V_{\text{safe}}`,
      symbols: [
        { tex: t`V_{\text{fear}}`, meaning: b('线索与危险之间关联的强度（杏仁核中的恐惧记忆）', 'strength of the cue–danger association, the fear memory in the amygdala') },
        { tex: t`\lambda`, meaning: b('这次的结果：有电击为 $1$，没有为 $0$', 'this trial’s outcome: $1$ with a shock, $0$ without') },
        { tex: t`\alpha`, meaning: b('学习率：强烈的危险经历使它很大', 'learning rate, large for intense danger') },
        { tex: t`V_{\text{safe}}`, meaning: b('消退中学到的安全记忆（腹内侧前额叶）', 'safety memory learned in extinction, in ventromedial prefrontal cortex') },
        { tex: t`c`, meaning: b('情境是否与消退时相同：相同为 $1$，不同时接近 $0$', 'whether the context matches extinction: $1$ if the same, near $0$ if different') },
        { tex: t`R`, meaning: b('最终的恐惧反应', 'resulting fear response') },
      ],
      steps: [
        b('线索与危险同时出现，恐惧关联按误差上升；学习率很大时，一次就接近饱和。', 'When a cue and danger occur together, the fear association rises by the error. With a large learning rate, it nearly saturates in one go.'),
        b('之后线索反复出现而没有危险，大脑另外学会一个安全记忆，而不是把原来的恐惧关联降下来。', 'When the cue then repeats without danger, the brain learns a separate safety memory instead of lowering the original fear association.'),
        b('最终的反应是恐惧减去情境允许的安全记忆；换了情境，安全记忆不起作用，恐惧就复发。', 'The response is fear minus the safety memory the context allows. In a new context the safety memory does not apply and fear returns.'),
      ],
      example: b(
        '取 $\\alpha = 0.8$：一次电击后 $V_{\\text{fear}} = 0.8$。消退后 $V_{\\text{safe}} = 0.7$，在原来的房间里（$c = 1$）反应为 $0.1$，几乎不怕；换到新的房间（$c = 0.2$），反应为 $0.8 - 0.14 = 0.66$，恐惧明显回来了。',
        'With $\\alpha = 0.8$, one shock sets $V_{\\text{fear}} = 0.8$. After extinction $V_{\\text{safe}} = 0.7$. In the original room, $c = 1$, the response is $0.1$, barely afraid. In a new room, $c = 0.2$, it is $0.8 - 0.14 = 0.66$, and fear clearly returns.'),
      consequences: [
        b('解释了为什么暴露疗法后，换个环境恐惧可能复发。', 'It explains why fear can return in a new setting after exposure therapy.'),
        b('说明情绪记忆的调节依赖前额叶对情境的判断。', 'It shows that regulating emotional memories depends on prefrontal judgment of context.'),
      ],
      limitations: [
        b('简化为两个变量，真实的恐惧记忆涉及多个脑区和多种可塑性。', 'It reduces things to two variables, while real fear memory involves many areas and kinds of plasticity.'),
        b('情境因子 $c$ 是假设的参数，模型不说明大脑怎样判断情境相似。', 'The context factor $c$ is an assumed parameter, and the model does not explain how the brain judges context similarity.'),
      ],
    },
    {
      title: b('情绪状态的持续与推广', 'Persistence and generalization of emotional states'),
      tex: t`\tau_E\,\frac{dE}{dt} = -E + I(t),\qquad R(x) = E\cdot \exp\!\Big(-\frac{\lVert x - x_0 \rVert^2}{2\sigma^2}\Big)`,
      symbols: [
        { tex: t`E`, meaning: b('情绪状态的强度', 'intensity of the emotional state') },
        { tex: t`I(t)`, meaning: b('引起情绪的输入，例如一次威胁', 'input causing the emotion, such as a threat') },
        { tex: t`\tau_E`, meaning: b('状态衰减的时间常数：分钟级，远长于单个神经元的毫秒级', 'decay time constant: minutes, far longer than a neuron’s milliseconds') },
        { tex: t`x,\;x_0`, meaning: b('当前情境和最初引起情绪的情境', 'current situation and the situation that first caused the emotion') },
        { tex: t`\sigma`, meaning: b('推广的范围：越大，越不相似的情境也会引起反应', 'breadth of generalization: the larger, the less similar the situations that still trigger it') },
        { tex: t`R(x)`, meaning: b('在情境 $x$ 中的反应', 'response in situation $x$') },
      ],
      steps: [
        b('一次输入使情绪状态升高，之后按很慢的时间常数衰减，所以刺激消失后状态仍在。', 'An input raises the emotional state, which then decays with a slow time constant, so it outlasts the stimulus.'),
        b('在状态持续期间，新情境引起的反应取决于它与原情境的相似程度。', 'While the state lasts, the response to a new situation depends on how similar it is to the original.'),
        b('推广范围 $\\sigma$ 越大，越多的情境被当成危险。', 'The larger the breadth $\\sigma$, the more situations are treated as dangerous.'),
      ],
      example: b(
        '设 $\\tau_E = 10$ 分钟。受惊后 $E = 1$，10 分钟后仍有 $e^{-1} \\approx 0.37$。此时遇到与原情境相距 $\\sigma$ 的情境，反应为 $0.37 \\times e^{-0.5} \\approx 0.22$；若 $\\sigma$ 很大（过度推广），几乎所有情境都会引起接近 $0.37$ 的反应。',
        'Let $\\tau_E = 10$ min. After a scare $E = 1$, and 10 min later $e^{-1} \\approx 0.37$ remains. A situation $\\sigma$ away from the original then evokes $0.37 \\times e^{-0.5} \\approx 0.22$. With a very large $\\sigma$, overgeneralization, almost any situation evokes close to $0.37$.'),
      consequences: [
        b('描述了情绪与一般感觉反应的区别：持续时间长，并会推广。', 'It captures how emotion differs from ordinary sensory responses: it lasts and it spreads.'),
        b('过度推广与焦虑障碍有关：太多无害的情境被当成危险。', 'Overgeneralization relates to anxiety disorders, where too many harmless situations are treated as dangerous.'),
      ],
      limitations: [
        b('这是对行为特征的描述模型，不对应具体的神经回路。', 'It is a descriptive model of behavior, not a specific neural circuit.'),
        b('真实情绪有多个维度和类别，单一的强度变量过于简化。', 'Real emotion has many dimensions and kinds, and a single intensity variable oversimplifies.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('功能性「恐惧」调节探索：价值下降时更保守', 'Functional fear tuning exploration: more conservative as value falls'),
      tex: t`F_t = \max\big(0,\; V(s_{t-1}) - V(s_t)\big),\qquad T_t = \frac{T_0}{1 + k\,F_t},\qquad \pi(a) \propto e^{Q(s_t, a)/T_t}`,
      symbols: [
        { tex: t`V(s)`, meaning: b('状态的价值', 'value of a state') },
        { tex: t`F_t`, meaning: b('「恐惧」信号：价值下降的幅度', 'fear signal: how much value dropped') },
        { tex: t`T_t`, meaning: b('选择的温度：越高越随机（多探索），越低越偏向最好的动作', 'choice temperature: higher is more random, more exploration, lower favors the best action') },
        { tex: t`T_0,\;k`, meaning: b('基础温度和恐惧的影响强度', 'base temperature and the strength of fear’s effect') },
        { tex: t`Q(s, a)`, meaning: b('在状态 $s$ 做动作 $a$ 的价值', 'value of action $a$ in state $s$') },
      ],
      steps: [
        b('价值突然下降时，算出一个正的「恐惧」信号。', 'When value drops suddenly, compute a positive fear signal.'),
        b('恐惧越大，选择的温度越低，智能体越不探索、越只选最有把握的动作。', 'The more fear, the lower the temperature, so the agent explores less and picks only the safest-looking action.'),
        b('价值回升后恐惧消失，探索恢复。', 'When value recovers, fear vanishes and exploration resumes.'),
      ],
      example: b(
        '$T_0 = 1$、$k = 4$。平常 $F = 0$，温度为 $1$。掉进陷阱使价值从 $5$ 降到 $4.5$，$F = 0.5$，温度降为 $1/3$。两个动作价值为 $1$ 和 $0$ 时，选较好动作的概率从约 $0.73$ 升到约 $0.95$。',
        '$T_0 = 1$ and $k = 4$. Normally $F = 0$ and the temperature is $1$. Falling into a trap drops value from $5$ to $4.5$, so $F = 0.5$ and the temperature falls to $1/3$. With two actions worth $1$ and $0$, the chance of choosing the better one rises from about $0.73$ to about $0.95$.'),
      consequences: [
        b('一个简单的信号就能让行为在危险后变得保守，与生物恐惧的功能之一相似。', 'A simple signal makes behavior conservative after danger, like one function of biological fear.'),
        b('情绪在这里被理解为调节学习和决策的参数，而不是体验。', 'Emotion is understood here as a parameter tuning learning and decisions, not as experience.'),
      ],
      limitations: [
        b('只调节一个参数，不像生物情绪那样同时改变注意、记忆和身体。', 'It tunes one parameter, unlike biological emotion that changes attention, memory and body at once.'),
        b('信号的定义和强度由设计者决定，状态不会持续，也不会被主动调节。', 'The signal’s definition and strength are set by the designer, and the state neither persists nor is actively regulated.'),
      ],
    },
    {
      title: b('风险敏感目标：只看最坏的那部分结果', 'Risk-sensitive objective: attending to the worst outcomes'),
      tex: t`\mathrm{CVaR}_{\alpha}(R) = \mathbb{E}\big[\,R \mid R \le \mathrm{VaR}_{\alpha}(R)\,\big]`,
      symbols: [
        { tex: t`R`, meaning: b('一次行动可能得到的总回报（随机变量）', 'total return of an action, a random variable') },
        { tex: t`\alpha`, meaning: b('关注最差的那一部分的比例，例如 $0.1$ 表示最差的 10%', 'share of worst outcomes considered, such as $0.1$ for the worst 10%') },
        { tex: t`\mathrm{VaR}_{\alpha}`, meaning: b('最差 $\\alpha$ 比例结果的分界线', 'the cutoff of the worst $\\alpha$ share of outcomes') },
        { tex: t`\mathrm{CVaR}_{\alpha}`, meaning: b('最差 $\\alpha$ 比例结果的平均值', 'average of the worst $\\alpha$ share of outcomes') },
      ],
      steps: [
        b('把一个动作可能带来的所有结果从差到好排序。', 'Sort all outcomes an action might bring from worst to best.'),
        b('只取最差的 $\\alpha$ 比例，求它们的平均值。', 'Take only the worst $\\alpha$ share and average them.'),
        b('选这个值最大的动作：不追求平均最好，而是避免最坏的情况。', 'Choose the action with the largest value: avoiding the worst rather than seeking the best average.'),
      ],
      example: b(
        '动作 A：九成得 $10$、一成得 $-50$，平均 $4$。动作 B：总是得 $3$。按平均值选 A；按 $\\alpha = 0.1$ 的条件风险价值，A 为 $-50$、B 为 $3$，选 B，行为变得「谨慎」。',
        'Action A gives $10$ nine times in ten and $-50$ once, averaging $4$. Action B always gives $3$. By average, choose A. By conditional value at risk with $\\alpha = 0.1$, A scores $-50$ and B $3$, so choose B, behaving cautiously.'),
      consequences: [
        b('让智能体在可能出现灾难性后果的环境中更安全。', 'It makes agents safer where catastrophic outcomes are possible.'),
        b('在功能上类似焦虑带来的「宁可保守」的倾向。', 'It functionally resembles the anxious preference for caution.'),
      ],
      limitations: [
        b('风险偏好由 $\\alpha$ 固定设定，不像人那样随情境和情绪状态变化。', 'Risk attitude is fixed by $\\alpha$ and does not shift with situation and emotional state as in people.'),
        b('需要估计回报的完整分布，在复杂环境中代价高。', 'It needs the full return distribution, which is costly to estimate in complex environments.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('压力下调节失效', 'Regulation fails under stress'),
        text: b('强烈的压力削弱前额叶的功能，人更依赖习惯性的反应，难以冷静调节。', 'Strong stress weakens prefrontal function, so people fall back on habitual reactions and struggle to regulate calmly.'),
        steps: [5],
      },
      {
        title: b('恐惧会过度推广', 'Fear overgeneralizes'),
        text: b('一次危险经历可能使许多相似但无害的情境也引起恐惧，这与焦虑障碍有关。', 'One dangerous experience can make many similar but harmless situations frightening, which relates to anxiety disorders.'),
        steps: [2, 4],
      },
      {
        title: b('消退后可能复发', 'Relapse after extinction'),
        text: b('消退学到的是新的安全记忆，换了情境或时间久了，原来的恐惧可能回来。', 'Extinction learns a new safety memory, so the original fear can return in a new context or after time.'),
        steps: [5],
      },
    ],
    computational: [
      {
        title: b('情绪是单一的调节变量', 'Emotion is one tuning variable'),
        text: b('功能性情绪通常只调节一两个参数，缺少协调多个系统的全局状态。', 'Functional emotions usually tune one or two parameters and lack a global state that coordinates many systems.'),
        steps: [2, 3, 6],
      },
      {
        title: b('容易被输入左右', 'Swayed by input'),
        text: b('提示中的情绪化措辞会改变语言模型的决策和偏见，而模型本身没有需要调节的状态。', 'Emotional wording in prompts changes a language model’s decisions and biases, though the model has no state to regulate.'),
        steps: [5],
      },
      {
        title: b('安全依赖外部规则', 'Safety relies on external rules'),
        text: b('避免危险主要靠人为设定的安全约束，智能体自己很难从少数危险经历中学会稳健的回避。', 'Avoiding danger relies mainly on human-set safety constraints, and agents struggle to learn robust avoidance from a few dangerous experiences.'),
        steps: [4],
      },
    ],
    misreadings: [
      {
        claim: b('杏仁核是恐惧中枢', 'The amygdala is the fear center'),
        fact: b('杏仁核在威胁检测和恐惧学习中很重要，但情绪状态涉及下丘脑、脑干、岛叶、前额叶等许多区域，也不只与恐惧有关。', 'The amygdala matters in threat detection and fear learning, but emotional states involve the hypothalamus, brainstem, insula, prefrontal cortex and more, and not only fear.'),
      },
      {
        claim: b('模型说自己焦虑，说明它有情绪', 'A model saying it is anxious shows it has emotions'),
        fact: b('提示中的情绪内容会改变模型的行为，但这不说明模型有持续的内部情绪状态或体验。', 'Emotional content in prompts changes model behavior, but this does not show a lasting internal emotional state or experience.'),
      },
      {
        claim: b('理性的智能体不需要情绪', 'A rational agent needs no emotion'),
        fact: b('情绪在生物中承担着协调多个系统、快速学习危险和设定优先级的功能；AI 若要具备这些功能，需要以其他方式实现。', 'In living things, emotion coordinates many systems, learns danger fast and sets priorities. An AI needing these functions must achieve them some other way.'),
      },
    ],
  },
  refs: {
    neuro: ['ledoux2000', 'milad2002', 'ochsner2002', 'bouton2004', 'arnsten2009', 'buhle2014', 'damasio1996'],
    models: ['anderson2014', 'gross2015'],
    ai: ['moerland2018', 'codaforno2023', 'tamar2015'],
  },
}
