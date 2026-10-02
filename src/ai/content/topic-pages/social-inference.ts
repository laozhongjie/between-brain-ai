import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F37 Social inference and models of others: the theory-of-mind network vs belief inference in large language models. */
export const SOCIAL_INFERENCE: TopicContent = {
  thesis: {
    biological: b(
      '人能推断别人相信什么、想要什么、打算做什么，也能理解别人持有与事实不符的错误信念。思考别人的想法时，颞顶联合区等区域特异地活动。儿童约 4 岁能通过经典的错误信念测试，婴儿更早就表现出某种敏感。这种推断可以看作「逆向规划」：观察别人的行为，推出最能解释它的信念和愿望。',
      'People infer what others believe, want and intend, and understand that others can hold false beliefs. Thinking about others’ thoughts specifically engages areas such as the temporoparietal junction. Children pass classic false-belief tests at about 4, and infants show some sensitivity earlier. Such inference can be seen as inverse planning: watching behavior and inferring the beliefs and desires that best explain it.'),
    computational: b(
      '2024 年的研究对人和大语言模型进行了一系列心智理论测试：GPT-4 在错误信念、讽刺和间接请求等测试上达到或超过人的水平，但在识别「失言」时表现较差。另一些研究发现，对经典任务做细微改动，模型的成绩会明显下降。专门的机器心智理论网络能从观察中学会预测其他智能体的行为。',
      'A 2024 study ran a battery of theory-of-mind tests on people and large language models. GPT-4 matched or beat people on false beliefs, irony and indirect requests but did worse at recognizing faux pas. Other studies found that small changes to classic tasks clearly lowered model scores. Dedicated machine theory-of-mind networks learn to predict other agents’ behavior from observation.'),
    gap: b(
      '在文字形式的心智理论测试上，强模型已接近人。差距在于稳健性和互动：人的推断在问题形式改变后依然稳定，并在实时互动中不断更新；模型对表面形式敏感，是否形成了对他人心理状态的稳定表示仍不清楚。',
      'On text-based theory-of-mind tests, strong models now approach people. The gap lies in robustness and interaction. Human inferences stay stable when the question changes form and keep updating in live interaction. Models are sensitive to surface form, and whether they form stable representations of others’ mental states is unclear.'),
  },
  short: { biological: b('人', 'People'), computational: b('模型', 'Models') },
  kinds: ['behavior'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月的大语言模型与机器心智理论研究；具体评测结果按发表年份注明。', 'The computational column describes large language models and machine theory-of-mind research as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('标准错误信念测试', 'Standard false-belief tests'),
      brain: b('成年人几乎都能通过，儿童约 4 岁开始能稳定通过。', 'Nearly all adults pass, and children pass reliably from about 4.'),
      ai: b('2024 年的研究中，GPT-4 在错误信念、讽刺和间接请求等测试上达到或超过人类被试的水平。', 'In a 2024 study, GPT-4 matched or beat human participants on false beliefs, irony and indirect requests.'),
      gap: b('在标准的文字测试上，强模型与人相当。', 'On standard text tests, strong models match people.'),
    },
    {
      lead: 'bio',
      dimension: b('题目改动后的稳健性', 'Robustness to altered tasks'),
      brain: b('把容器换成透明的、或让主人公看到了变化，人会立刻调整答案。', 'If the container is made transparent or the protagonist sees the change, people adjust their answer at once.'),
      ai: b('2023 年的研究发现，对经典任务做这类细微改动，多个模型的成绩明显下降，说明它们部分依赖题目的常见模式。', 'A 2023 study found such small alterations to classic tasks clearly lowered several models’ scores, showing partial reliance on familiar task patterns.'),
      gap: b('人依据情境中的信息推理，模型更容易被题目的表面形式带偏。', 'People reason from information in the situation, while models are more easily misled by the surface form.'),
    },
    {
      lead: 'bio',
      dimension: b('识别失言', 'Recognizing faux pas'),
      brain: b('人能看出说话者无意中说了让别人难堪的话，并推断他并不知情。', 'People see when a speaker unknowingly says something embarrassing and infer that the speaker did not know.'),
      ai: b('2024 年的研究中，GPT-4 在失言测试上表现明显不如人，往往不愿下结论说「说话者不知道」。', 'In a 2024 study, GPT-4 did clearly worse than people on faux pas tests and often avoided concluding that the speaker did not know.'),
      gap: b('需要同时考虑多方知识状态和社会后果的推理，模型仍有困难。', 'Reasoning that weighs several people’s knowledge and social consequences at once remains hard for models.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('社会感知', 'Social perception'),
        points: [b('颞上沟处理视线方向、面部表情和身体动作，提供「他在看哪里、在做什么」的信息。', 'The superior temporal sulcus processes gaze, facial expression and body movement, providing where someone is looking and what they are doing.')],
      },
      {
        title: b('颞顶联合区：他人的信念', 'Temporoparietal junction: others’ beliefs'),
        points: [b('思考别人相信什么，尤其是当别人的信念与事实不同时，右侧颞顶联合区特异地活动。', 'Thinking about what others believe, especially when it differs from reality, specifically engages the right temporoparietal junction.')],
      },
      {
        title: b('内侧前额叶：特质与意图', 'Medial prefrontal cortex: traits and intentions'),
        points: [b('内侧前额叶推断别人的性格、长期目标和意图，把一次次观察积累成对一个人的了解。', 'Medial prefrontal cortex infers others’ character, long-term goals and intentions, building knowledge of a person from repeated observations.')],
      },
      {
        title: b('动作模拟', 'Action simulation'),
        points: [b('观察别人的动作时，运动相关区域也会激活；这种模拟可能帮助理解动作的目的，但它在推断信念中的作用仍有争议。', 'Watching others’ actions also activates motor areas. Such simulation may help understand the goal of an action, but its role in inferring beliefs is debated.')],
      },
      {
        title: b('预测行为', 'Predicting behavior'),
        points: [b('把推断出的信念和愿望结合起来，预测对方下一步会做什么，并在互动中不断修正。', 'Combine inferred beliefs and desires to predict what the other will do next, revising continually during interaction.')],
      },
    ],
    computational: [
      {
        title: b('故事输入', 'Story input'),
        points: [b('测试通常是一段文字故事，描述人物、物体和谁看到了什么。', 'Tests are usually short stories describing characters, objects and who saw what.')],
      },
      {
        title: b('追踪人物与信息', 'Tracking characters and information'),
        points: [b('Transformer 层在上下文中追踪每个人物的位置、行动和他们接触过的信息。', 'Transformer layers track each character’s location, actions and the information they were exposed to.')],
      },
      {
        title: b('回答问题', 'Answering'),
        points: [b('模型生成对「他会去哪里找」「她为什么这样说」等问题的回答。', 'The model generates answers to questions such as where he will look or why she said that.')],
      },
      {
        title: b('机器心智理论网络', 'Machine theory-of-mind networks'),
        points: [b('研究中的 ToMnet 观察另一个智能体过去的行为，压缩成一个「特征」向量，再结合当前情境预测它下一步的动作，包括它在持有错误信念时的动作。', 'In research, ToMnet watches another agent’s past behavior, compresses it into a character vector and combines it with the current situation to predict the agent’s next action, including under false beliefs.')],
      },
      {
        title: b('后训练', 'Post-training'),
        points: [b('对话和指令训练让模型更善于回应社会情境，也可能使它在需要下结论时过于谨慎。', 'Dialogue and instruction training makes models more responsive to social situations and may make them overly cautious when a conclusion is needed.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('缺少稳健、可检验的他人心理状态表示，以及在真实互动中持续更新这一表示的过程。', 'Missing a robust, testable representation of others’ mental states and the process of updating it in real interaction.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('错误信念测试于 1983 年提出：玩偶把东西放进篮子后离开，另一个玩偶把它移到盒子里；问孩子第一个玩偶回来会去哪里找。答「篮子」说明孩子理解对方持有错误信念。', 'The false-belief test was introduced in 1983. A doll puts something in a basket and leaves, and another doll moves it to a box. Children are asked where the first doll will look. Answering basket shows they understand the doll holds a false belief.'),
      b('2005 年的实验用注视时间研究 15 个月大的婴儿，发现他们对「违背他人错误信念的行为」看得更久，提示更早的敏感；对这类结果的解释和可重复性仍有争论。', 'A 2005 experiment using looking time found 15-month-olds looked longer at actions that violated another’s false belief, suggesting earlier sensitivity. The interpretation and replicability of such results are debated.'),
      b('2017 年的研究让人观察智能体在简单环境中的移动，并判断它的信念和愿望；贝叶斯逆向规划模型对人的判断给出了定量而准确的预测。', 'A 2017 study had people watch an agent move in a simple environment and judge its beliefs and desires. A Bayesian inverse planning model predicted people’s judgments quantitatively and accurately.'),
      b('镜像神经元最初在猴子运动前区发现，在自己做动作和看别人做同样动作时都放电；它们是否支持对他人信念的推断，证据有限。', 'Mirror neurons were first found in monkey premotor cortex, firing both when acting and when watching the same action. Evidence that they support inferring others’ beliefs is limited.'),
    ],
    computational: [
      b('2024 年的研究在多项测试上比较了 GPT-4、GPT-3.5、LLaMA2 和约 1900 名人类被试，并设计了控制变式；作者指出，表现相近不等于底层认知相同。', 'The 2024 study compared GPT-4, GPT-3.5 and LLaMA2 with about 1900 human participants on several tests, including control variants. The authors noted that similar performance does not mean the same underlying cognition.'),
      b('同年发表的另一项研究报告，GPT-4 解出了约四分之三的错误信念任务，与 6 岁儿童相当；不同研究对任务设计和评分的差异，使结论并不一致。', 'Another study that year reported GPT-4 solved about three quarters of false-belief tasks, comparable to 6-year-olds. Differences in task design and scoring make findings across studies inconsistent.'),
      b('2023 年的压力测试发现，模型的部分成功依赖数据集中的捷径和常见模式，换用对抗性的变式后表现下降。', 'A 2023 stress test found some model successes rely on shortcuts and common patterns in datasets, and performance dropped on adversarial variants.'),
      b('ToMnet 于 2018 年提出，在网格世界中学会推断其他智能体的类型和错误信念；它的环境和智能体都很简单。', 'ToMnet, proposed in 2018, learned to infer other agents’ types and false beliefs in grid worlds. Its environments and agents are simple.'),
      b('失言测试中，GPT-4 的低分部分来自不愿对说话者知道什么下结论的保守倾向，而不完全是推理失败（2024 年的研究）。', 'On the faux pas test, GPT-4’s low scores came partly from a cautious reluctance to commit to what the speaker knew, not only from failed reasoning (a 2024 study).'),
    ],
  },
  bioMath: [
    {
      title: b('逆向规划：从行为推断目标', 'Inverse planning: inferring goals from behavior'),
      tex: t`P(g \mid a_{1:T}) \propto P(g)\prod_{t=1}^{T} P(a_t \mid s_t, g),\qquad P(a \mid s, g) \propto e^{\beta\,Q_g(s, a)}`,
      symbols: [
        { tex: t`g`, meaning: b('对方可能的目标或愿望', 'the other’s possible goal or desire') },
        { tex: t`a_{1:T}`, meaning: b('观察到的一连串动作', 'the sequence of observed actions') },
        { tex: t`Q_g(s, a)`, meaning: b('如果目标是 $g$，在状态 $s$ 做动作 $a$ 有多好', 'how good action $a$ is in state $s$ if the goal is $g$') },
        { tex: t`\beta`, meaning: b('理性程度：越大，越假设对方选最好的动作', 'rationality: the larger, the more the other is assumed to pick the best action') },
        { tex: t`P(g)`, meaning: b('对目标的先验', 'prior over goals') },
      ],
      steps: [
        b('假设对方大致理性：会选择对自己目标有利的动作。', 'Assume the other is roughly rational, choosing actions that serve their goal.'),
        b('对每个可能的目标，算出观察到的动作序列在这个目标下有多合理。', 'For each possible goal, compute how sensible the observed actions are under it.'),
        b('乘上先验并归一化，得到对目标的推断；每看到一个新动作就更新一次。', 'Multiply by the prior and normalize to infer the goal, updating with each new action.'),
      ],
      example: b(
        '一个人从路口出发，咖啡店在左、面包店在右，先验各一半。他向左走一步：若取 $\\beta$ 使「朝目标走」的概率为 $0.8$、「背离」为 $0.2$，则咖啡店的后验为 $\\tfrac{0.5 \\times 0.8}{0.5 \\times 0.8 + 0.5 \\times 0.2} = 0.8$。再向左走一步，升到约 $0.94$。',
        'Someone starts at a junction with a café to the left and a bakery to the right, each with prior one half. They step left. If $\\beta$ makes heading toward the goal $0.8$ likely and away $0.2$, the café’s posterior is $\\tfrac{0.5 \\times 0.8}{0.5 \\times 0.8 + 0.5 \\times 0.2} = 0.8$. Another step left raises it to about $0.94$.'),
      consequences: [
        b('能定量预测人对他人目标和信念的判断，在实验中拟合得很好。', 'It predicts people’s judgments of others’ goals and beliefs quantitatively and fits experiments well.'),
        b('把心智理论看作对他人决策过程的反向推断，与强化学习中的逆强化学习形式相同。', 'It treats theory of mind as inverting another’s decision process, the same form as inverse reinforcement learning.'),
      ],
      limitations: [
        b('需要列出可能的目标并知道环境，复杂的真实社会情境中难以做到。', 'It needs a list of possible goals and knowledge of the environment, hard in complex real social settings.'),
        b('模型描述推断的结果，不说明颞顶联合区等脑区怎样实现它。', 'It describes the inference, not how areas such as the temporoparietal junction carry it out.'),
      ],
    },
    {
      title: b('错误信念：他人的信念只随他看到的信息更新', 'False belief: another’s belief updates only with what they saw'),
      tex: t`b_{\text{other}}(x) = P\big(x \mid o_{\text{other}}\big),\qquad \hat{a}_{\text{other}} = \arg\max_{a}\; \sum_x b_{\text{other}}(x)\,U(a, x)`,
      symbols: [
        { tex: t`x`, meaning: b('世界的真实状态，例如东西在哪里', 'the true state of the world, such as where an object is') },
        { tex: t`o_{\text{other}}`, meaning: b('对方实际观察到的信息', 'what the other actually observed') },
        { tex: t`b_{\text{other}}(x)`, meaning: b('对方的信念：基于他看到的信息，对各种状态的估计', 'the other’s belief: an estimate of each state from what they saw') },
        { tex: t`U(a, x)`, meaning: b('在状态 $x$ 下做动作 $a$ 的结果好坏', 'how good action $a$ is if the state is $x$') },
        { tex: t`\hat{a}_{\text{other}}`, meaning: b('预测对方会做的动作', 'predicted action of the other') },
      ],
      steps: [
        b('区分自己知道的和对方知道的：对方的信念只用他自己观察到的信息更新。', 'Separate what you know from what they know: the other’s belief updates only with what they observed.'),
        b('按对方的信念，而不是按事实，计算对方认为最好的动作。', 'Compute the action the other thinks best from their belief, not from the facts.'),
        b('这个动作就是对对方行为的预测。', 'That action is the prediction of the other’s behavior.'),
      ],
      example: b(
        'Sally 把球放进篮子后离开，Anne 把球移进盒子。Sally 没看到移动，所以她的信念仍是「球在篮子里」的概率为 $1$。找球时，在篮子里找的预期收益最高，因此预测她会去篮子找，尽管球实际在盒子里。',
        'Sally puts a ball in the basket and leaves, and Anne moves it to the box. Sally did not see the move, so her belief that the ball is in the basket is still $1$. Searching the basket has the highest expected payoff, so she is predicted to look there, though the ball is in the box.'),
      consequences: [
        b('通过错误信念测试，需要把「事实」和「对方的信念」分开表示。', 'Passing false-belief tests requires representing facts and the other’s belief separately.'),
        b('同样的框架可以用来设计不会被表面形式误导的测试：只改变对方看到了什么。', 'The same framework helps design tests immune to surface form: change only what the other saw.'),
      ],
      limitations: [
        b('真实的信念推断还涉及对方的记忆、注意和推理能力，并不只是「看到什么」。', 'Real belief inference also involves the other’s memory, attention and reasoning, not only what they saw.'),
        b('模型假设可以明确列出对方的观察，真实互动中这本身就需要推断。', 'The model assumes the other’s observations can be listed, which in real interaction must itself be inferred.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('机器心智理论网络：从过去的行为推断「性格」，预测下一步', 'Machine theory of mind: inferring character from past behavior to predict the next step'),
      tex: t`\mathbf{e}_{\text{char}} = f_{\theta}\big(\tau^{(1)}, \dots, \tau^{(N)}\big),\qquad \hat{\pi}(a \mid s) = g_{\phi}\big(s,\,\mathbf{e}_{\text{char}},\,\mathbf{e}_{\text{mental}}\big)`,
      symbols: [
        { tex: t`\tau^{(i)}`, meaning: b('观察到的另一智能体过去的第 $i$ 段行为轨迹', 'the $i$-th past behavior trajectory of the other agent') },
        { tex: t`\mathbf{e}_{\text{char}}`, meaning: b('特征向量：这个智能体一贯的偏好和类型', 'character vector: the agent’s stable preferences and type') },
        { tex: t`\mathbf{e}_{\text{mental}}`, meaning: b('心理状态向量：它在当前这一局中知道什么', 'mental-state vector: what it knows in the current episode') },
        { tex: t`\hat{\pi}(a \mid s)`, meaning: b('预测它在状态 $s$ 会选择各个动作的概率', 'predicted probabilities of its actions in state $s$') },
      ],
      steps: [
        b('把对方过去的多段行为压缩成一个特征向量，表示它通常想要什么。', 'Compress the other’s past episodes into a character vector showing what it usually wants.'),
        b('把当前这一局中它已经看到的信息压缩成心理状态向量。', 'Compress what it has seen in the current episode into a mental-state vector.'),
        b('结合当前状态，预测它下一步的动作；整个网络用「预测是否准确」来训练。', 'Combine with the current state to predict its next action, training the whole network on prediction accuracy.'),
      ],
      example: b(
        '网格世界中，一个智能体过去几局都优先去拿蓝色物体，特征向量记住了这一偏好。这一局蓝色物体在它离开视线后被移走，网络预测它仍会走向原来的位置，相当于通过了错误信念测试。',
        'In a grid world, an agent has favored blue objects in past episodes, and the character vector stores this. This episode, the blue object is moved while the agent is out of view, and the network predicts it will still head to the old spot, effectively passing a false-belief test.'),
      consequences: [
        b('说明从观察中学会「对他人建模」是可能的，不需要人工写出心理状态的规则。', 'It shows modeling others can be learned from observation without hand-written rules for mental states.'),
        b('结构与人的推断相似：一贯的特质加当前的信念。', 'Its structure resembles human inference: stable traits plus current beliefs.'),
      ],
      limitations: [
        b('只在简单的网格世界和简单的智能体上验证。', 'It has been tested only in simple grid worlds with simple agents.'),
        b('大语言模型并不包含这样明确的结构，二者的心智理论表现来源不同。', 'Large language models contain no such explicit structure, so their theory-of-mind performance comes from different sources.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('以己度人', 'Projecting oneself'),
        text: b('人常把自己知道的信息投射到别人身上，高估别人知道的东西（知识的诅咒）。', 'People often project what they know onto others and overestimate what others know, the curse of knowledge.'),
        steps: [2],
      },
      {
        title: b('对外群体推断较差', 'Worse with outsiders'),
        text: b('对文化背景不同或不熟悉的人，人的推断更容易出错。', 'Inferences about people from unfamiliar backgrounds are more error-prone.'),
        steps: [3],
      },
      {
        title: b('需要发育', 'Needs development'),
        text: b('复杂的社会推理在儿童期逐步发展，部分人群（如某些自闭症谱系个体）在这类任务上有困难。', 'Complex social reasoning develops gradually in childhood, and some people, such as some autistic individuals, find these tasks difficult.'),
        steps: [2, 3],
      },
    ],
    computational: [
      {
        title: b('依赖题目的表面形式', 'Relies on surface form'),
        text: b('对经典任务做细微改动后，模型成绩明显下降。', 'Small alterations to classic tasks clearly lower model scores.'),
        steps: [2, 3],
      },
      {
        title: b('多方知识状态推理困难', 'Hard to reason about many knowers'),
        text: b('识别失言等需要同时考虑多人知道什么的任务上，模型表现较差。', 'On tasks needing several people’s knowledge at once, such as faux pas, models do worse.'),
        steps: [2],
      },
      {
        title: b('不在互动中积累', 'No accumulation through interaction'),
        text: b('对一个人的了解不会跨会话保留，模型无法像长期相处那样逐步理解特定的人。', 'Knowledge of a person does not carry across sessions, so models cannot gradually understand someone as long acquaintance does.'),
        steps: [6],
      },
    ],
    misreadings: [
      {
        claim: b('模型通过了心智理论测试，所以它有心智理论', 'Models pass theory-of-mind tests, so they have theory of mind'),
        fact: b('通过标准题目说明能给出正确答案；改动题目后成绩下降，说明其底层过程可能与人不同，需要更严格的检验。', 'Passing standard items shows correct answers. Drops on altered items suggest the underlying process may differ from people’s, needing stricter tests.'),
        source: b('2023 年一篇预印本以「心智理论可能已在大语言模型中自发涌现」为题。', 'A 2023 preprint was titled “Theory of mind may have spontaneously emerged in large language models”.'),
      },
      {
        claim: b('镜像神经元就是理解他人的机制', 'Mirror neurons are how we understand others'),
        fact: b('镜像神经元在动作观察中放电，可能帮助理解动作目的；推断他人信念主要依赖颞顶联合区等心智理论网络。', 'Mirror neurons fire during action observation and may help understand an action’s goal. Inferring others’ beliefs relies mainly on the theory-of-mind network, such as the temporoparietal junction.'),
      },
    ],
  },
  refs: {
    neuro: ['wimmer1983', 'baroncohen1985', 'saxe2003', 'onishi2005', 'rizzolatti2004'],
    models: ['koster2013', 'baker2017'],
    ai: ['rabinowitz2018', 'ullman2023', 'shapira2023', 'strachan2024', 'kosinski2024'],
  },
}
