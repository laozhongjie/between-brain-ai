import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** X03 Blueprint for a humanlike agent: whole-brain functional architecture vs LLM agent architectures. */
export const AGENT_BLUEPRINT: TopicContent = {
  thesis: {
    biological: b(
      '大脑由许多专门系统组成：感觉皮层建立表征，海马保存经历，前额叶在工作记忆中维持目标并调度其他系统，基底节和小脑选择并校正动作。没有一个中央程序逐一调用它们；前额叶自上而下的偏置，加上多巴胺、去甲肾上腺素等神经调质对全脑学习率和探索程度的调整，让各系统协同工作。目标来自身体的需要和社会关系，整个系统在一生中持续学习。',
      'The brain is made of many specialized systems. Sensory cortex builds representations and the hippocampus stores experience. Prefrontal cortex holds goals in working memory and directs other systems, and the basal ganglia and cerebellum select and correct actions. No central program calls them one by one. Top-down bias from prefrontal cortex keeps the systems working together. So do neuromodulators such as dopamine and norepinephrine, which tune learning rate and exploration brain-wide. Goals come from bodily needs and social ties, and the whole system keeps learning for life.'),
    computational: b(
      'LLM 智能体以一个大语言模型为核心，围绕它搭建模块：上下文窗口充当工作记忆，向量库或文件充当长期记忆，工具调用连接搜索、代码执行和机器人控制。规划、反思和自我评估都是同一个模型在不同提示下的调用，模块之间通过文本传递信息，循环由人写的程序控制。目标由用户给出，部署后模型权重通常不变。',
      'An LLM agent is built around one large language model. The context window serves as working memory and a vector store or files serve as long-term memory. Tool calls connect search, code execution and robot control. Planning, reflection and self-evaluation are calls to the same model with different prompts. Modules pass text to each other, and a program written by people runs the loop. The user supplies the goal, and the model’s weights usually stay fixed after deployment.'),
    gap: b(
      '两边都把智能分到多个模块并让它们协作。差距在于：大脑的模块结构各异，由连续的调制信号协调，自己产生目标，在使用中学习；LLM 智能体的模块多是同一个模型的不同调用，靠文本和外部程序连接，没有自己的驱力，部署后很少更新。另一方面，智能体在知识广度、速度和可复制性上远超任何个人。',
      'Both split intelligence into modules that work together. The brain’s modules differ in structure, are coordinated by continuous modulatory signals, generate their own goals and learn in use. An LLM agent’s modules are mostly calls to one model, joined by text and outside programs. They have no drives of their own and few updates after deployment. On the other hand, agents far exceed any person in breadth of knowledge, speed and copyability.'),
  },
  short: { biological: b('大脑', 'Brain'), computational: b('智能体', 'Agents') },
  kinds: ['algorithm', 'behavior'],
  evidence: 'debated',
  asOf: b('AI 侧描述截至 2026 年 10 月以 LLM 为核心的智能体系统；长任务能力引用 2025 年 3 月发表的测量。', 'The AI column describes agent systems built around LLMs as of October 2026. Long-task ability cites a measurement published in March 2025.'),
  capabilities: [
    {
      lead: 'bio',
      dimension: b('模块之间的协调', 'Coordinating modules'),
      brain: b('前额叶在工作记忆中保持目标，自上而下偏置感觉、记忆和动作系统；神经调质同时调整全脑的学习率和探索程度。', 'Prefrontal cortex holds the goal in working memory and biases sensory, memory and action systems top-down. Neuromodulators tune learning rate and exploration across the brain at the same time.'),
      ai: b('调用顺序由程序和提示词写定；模块之间只交换文本，温度和推理预算等全局参数由开发者设定。', 'Programs and prompts fix the order of calls. Modules exchange only text, and developers set global parameters such as temperature and reasoning budget.'),
      gap: b('大脑用连续、分层的信号协调；智能体用离散的文本接口。', 'The brain coordinates with continuous, layered signals, while agents use discrete text interfaces.'),
    },
    {
      lead: 'bio',
      dimension: b('目标的来源', 'Where goals come from'),
      brain: b('目标来自体内稳态的需要、奖赏学习和社会关系，并随身体状态和环境变化。', 'Goals come from homeostatic needs, reward learning and social ties, and change with bodily state and surroundings.'),
      ai: b('目标由用户的指令给出；智能体能把大目标拆成子目标，但没有自己的需要。', 'The user’s instruction sets the goal. An agent can split a large goal into subgoals but has no needs of its own.'),
      gap: b('智能体能分解目标，但不产生目标。', 'Agents decompose goals but do not generate them.'),
    },
    {
      lead: 'bio',
      dimension: b('记忆的分层与转化', 'Layers of memory and transfer between them'),
      brain: b('工作记忆、情景记忆、语义记忆和程序性记忆分属不同系统，经历在睡眠中被回放，逐步转为长期知识。', 'Working, episodic, semantic and procedural memory belong to different systems, and experience is replayed in sleep and gradually becomes long-term knowledge.'),
      ai: b('上下文窗口、检索库和模型权重分别保存短期信息、外部记录和训练所得知识；三者之间的转化要靠人设计的流程。', 'The context window, the retrieval store and the weights hold short-term information, external records and trained knowledge. Moving content between them needs a process that people design.'),
      gap: b('智能体有分层的存储，但缺少自动的巩固。', 'Agents have layered storage but lack automatic consolidation.'),
    },
    {
      lead: 'bio',
      dimension: b('多时间尺度的控制', 'Control across timescales'),
      brain: b('脊髓反射在几十毫秒内响应，小脑在动作进行中校正，前额叶在秒到分钟的尺度上规划。', 'Spinal reflexes respond within tens of milliseconds, the cerebellum corrects movements as they unfold and prefrontal cortex plans over seconds to minutes.'),
      ai: b('机器人基础模型开始采用双系统：视觉语言模块理解指令和场景，扩散模型模块实时生成动作。', 'Robot foundation models have begun to use two systems. A vision-language module interprets instructions and scenes, and a diffusion module generates actions in real time.'),
      gap: b('双系统是分层控制的开端，层数和速度跨度仍远少于大脑。', 'Two systems are a start on layered control, with far fewer layers and a narrower range of speeds than the brain.'),
    },
    {
      lead: 'bio',
      dimension: b('长任务的可靠性', 'Reliability on long tasks'),
      brain: b('人能把一个项目持续推进数天到数年，出错时修改计划。', 'People can carry a project forward for days to years and revise the plan when things go wrong.'),
      ai: b('2025 年 3 月的测量中，最好的模型能以 50% 的成功率完成人类专家约需 50 分钟的软件任务；这一长度约每 7 个月翻一番。', 'In a March 2025 measurement, the best model completed software tasks that take human experts about 50 minutes with 50% success. This length has doubled about every 7 months.'),
      gap: b('智能体能可靠完成的任务长度增长很快，但仍远短于人能持续的时间。', 'The task length agents can complete reliably is growing fast but remains far shorter than what people sustain.'),
    },
    {
      lead: 'comp',
      dimension: b('知识广度与复制', 'Breadth of knowledge and copying'),
      brain: b('一个人的专业知识集中在少数领域，学会的技能不能直接复制给别人。', 'A person’s expertise covers a few fields, and learned skills cannot be copied directly to anyone else.'),
      ai: b('一个模型覆盖大量领域的文本知识，同一组权重可以同时运行成千上万个副本。', 'One model covers text knowledge across many fields, and the same weights can run as thousands of copies at once.'),
      gap: b('智能体在广度和复制上远超个人。', 'Agents far exceed any person in breadth and copying.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('感觉皮层', 'Sensory cortex'),
        points: [
          b('眼、耳和皮肤的感受器把刺激转成电脉冲，感觉皮层逐级把它们加工成物体、声音和位置的表征。', 'Receptors in the eyes, ears and skin turn stimuli into electrical pulses. Sensory cortex processes them stage by stage into representations of objects, sounds and places.'),
          b('表征送往前额叶和海马，也接受它们自上而下的偏置。', 'The representations go to prefrontal cortex and the hippocampus and receive top-down bias from them.'),
        ],
      },
      {
        title: b('海马与长期记忆', 'Hippocampus and long-term memory'),
        points: [
          b('海马把一段经历的各个部分快速绑定成一条记忆，需要时按线索补全并送回皮层（见[情景记忆](topic:episodic-memory)）。', 'The hippocampus quickly binds the parts of an experience into one memory. When needed it completes the memory from a cue and sends it back to cortex (see [episodic memory](topic:episodic-memory)).'),
          b('睡眠中回放这些记忆，逐步转入新皮层成为一般知识。', 'In sleep these memories are replayed and gradually move into neocortex as general knowledge.'),
        ],
      },
      {
        title: b('前额叶与工作记忆', 'Prefrontal cortex and working memory'),
        points: [
          b('前额叶神经元的持续放电保持当前的目标和规则（见[工作记忆](topic:working-memory)）。', 'Sustained firing of prefrontal neurons holds the current goal and rules (see [working memory](topic:working-memory)).'),
          b('它自上而下偏置感觉处理、记忆提取和动作选择，让与目标相关的信息占优。', 'It biases sensory processing, memory retrieval and action selection top-down, so goal-relevant information wins.'),
        ],
      },
      {
        title: b('价值与驱力', 'Value and drives'),
        points: [
          b('下丘脑报告饥饿、口渴和体温等身体需要，杏仁核和眶额皮层评估价值与风险。', 'The hypothalamus reports bodily needs such as hunger, thirst and temperature, and the amygdala and orbitofrontal cortex judge value and risk.'),
          b('这些评估决定什么值得追求，作为目标送到前额叶，作为奖赏送到多巴胺系统。', 'These judgments decide what is worth pursuing and go to prefrontal cortex as goals and to the dopamine system as reward.'),
        ],
      },
      {
        title: b('神经调质广播', 'Neuromodulator broadcast'),
        points: [
          b('几个小核团向全脑投射多巴胺、血清素、去甲肾上腺素和乙酰胆碱。', 'A few small nuclei project dopamine, serotonin, norepinephrine and acetylcholine across the brain.'),
          b('一种假说认为，它们分别设定全脑的学习信号、对未来奖赏的耐心、探索程度和学习速度。', 'One hypothesis holds that they set the brain-wide learning signal, patience for future reward, degree of exploration and learning speed.'),
        ],
      },
      {
        title: b('动作选择与执行', 'Action selection and execution'),
        points: [
          b('基底节在候选动作中选出一个，运动皮层发出指令，小脑在执行中校正。', 'The basal ganglia pick one of the candidate actions, motor cortex issues the command and the cerebellum corrects it during execution.'),
          b('动作的结果经感觉皮层回到系统，奖赏预测误差更新价值。', 'The results of the action return through sensory cortex, and reward prediction errors update values.'),
        ],
      },
    ],
    computational: [
      {
        title: b('输入编码', 'Input encoding'),
        points: [
          b('用户指令、文本、图像和音频被切成词元，编码成数字向量。', 'User instructions, text, images and audio are split into tokens and encoded as vectors of numbers.'),
          b('这些词元进入上下文窗口。', 'These tokens enter the context window.'),
        ],
      },
      {
        title: b('上下文窗口', 'Context window'),
        points: [
          b('指令、对话、工具结果和检索结果都以词元的形式排在窗口里，这是智能体唯一的工作记忆。', 'Instructions, dialogue, tool results and retrieved records all sit in the window as tokens. This is the agent’s only working memory.'),
          b('超出长度上限的内容被截断，或被压缩成摘要。', 'Content beyond the length limit is cut off or compressed into a summary.'),
        ],
      },
      {
        title: b('LLM 核心', 'LLM core'),
        points: [
          b('模型读取整个窗口，生成下一段文本：一段思考、一个计划或一次工具调用。', 'The model reads the whole window and generates the next text: a thought, a plan or a tool call.'),
          b('规划、反思和自我评估都是这同一个模型在不同提示下的调用；权重在部署后不变。', 'Planning, reflection and self-evaluation are all calls to this same model with different prompts, and its weights stay fixed after deployment.'),
        ],
      },
      {
        title: b('外部记忆', 'External memory'),
        points: [
          b('经历和文档以文本和向量的形式存入向量库或文件。', 'Experiences and documents are stored as text and vectors in a vector store or files.'),
          b('需要时按相关性、新近度和重要性检索出几条，写回上下文窗口。', 'When needed, a few records are retrieved by relevance, recency and importance and written back into the context window.'),
        ],
      },
      {
        title: b('工具与执行', 'Tools and execution'),
        points: [
          b('外部程序解析模型输出的调用，执行搜索、代码、API 或机器人控制。', 'An outside program parses the calls the model outputs and runs search, code, APIs or robot control.'),
          b('结果作为观察写回上下文，开始下一轮；程序决定循环何时结束。', 'The results go back into the context as observations and the next round starts. The program decides when the loop ends.'),
        ],
      },
      {
        title: b('缺失的部分（虚线框）', 'Missing parts (dashed boxes)'),
        points: [
          b('没有自己的驱力，也没有调整全系统的调制信号。', 'There are no drives of its own and no modulatory signals that tune the whole system.'),
          b('使用中不更新权重；跨会话的经历只能存在外部记忆里。', 'Weights are not updated in use, and experience across sessions can live only in external memory.'),
        ],
      },
    ],
  },
  archNotes: {
    biological: [
      b('前额叶理论（Miller 与 Cohen，2001）认为，前额叶的主要作用是保持目标并偏置其他脑区的竞争，而不是亲自完成各项计算。', 'The prefrontal theory of Miller and Cohen, from 2001, holds that prefrontal cortex mainly keeps goals and biases competition in other regions. It does not do each computation itself.'),
      b('全局工作空间理论认为，只有少数信息能进入一个容量有限的「工作空间」并广播到全脑；它是关于意识的理论之一，仍有争议。', 'Global workspace theory holds that only a little information enters a capacity-limited workspace and is broadcast brain-wide. It is one theory of consciousness and remains debated.'),
      b('Yu 与 Dayan（2005）提出，乙酰胆碱报告「预期中的不确定性」，去甲肾上腺素报告「意外的不确定性」。', 'Yu and Dayan proposed in 2005 that acetylcholine signals expected uncertainty and norepinephrine signals unexpected uncertainty.'),
      b('工作记忆的容量约为 4 个组块，所以前额叶一次只能维持少量目标和规则。', 'Working memory holds about 4 chunks, so prefrontal cortex can keep only a few goals and rules at once.'),
      b('图中的模块是功能划分。真实脑区往往参与多种功能，同一功能也由多个脑区共同完成。', 'The modules in the figure are functional divisions. Real brain regions often take part in several functions, and one function involves several regions.'),
    ],
    computational: [
      b('ReAct（2022）让模型交替输出「思考」和「动作」，把推理和工具调用放进同一个循环，是许多智能体框架的基础。', 'ReAct, from 2022, has the model alternate between thoughts and actions, putting reasoning and tool calls in one loop. Many agent frameworks build on it.'),
      b('Generative Agents（2023）给 25 个智能体配上记忆流、检索和「反思」，让它们在一个模拟小镇中生活；反思把多条记忆总结成更抽象的判断，再存回记忆。', 'Generative Agents, from 2023, gave 25 agents a memory stream, retrieval and reflection and let them live in a simulated town. Reflection summarizes several memories into a more abstract judgment and stores it back.'),
      b('CoALA（2023）借用认知架构的概念描述 LLM 智能体：工作记忆、情景记忆、语义记忆、程序性记忆，以及一个「决策循环」。', 'CoALA, from 2023, describes LLM agents with concepts from cognitive architectures: working, episodic, semantic and procedural memory, plus a decision cycle.'),
      b('2025 年 3 月的长任务测量用「50% 时间跨度」衡量能力：模型能以一半成功率完成的任务，人类专家需要多长时间。', 'The March 2025 long-task study measures ability as the 50% time horizon. It is how long human experts need for the tasks a model completes half the time.'),
      b('GR00T N1（2025）是面向人形机器人的双系统模型：视觉语言模块为「系统 2」，扩散 Transformer 动作模块为「系统 1」。', 'GR00T N1, from 2025, is a two-system model for humanoid robots. The vision-language module is System 2 and a diffusion transformer action module is System 1.'),
      b('RT-2（2023）把网页上学到的视觉与语言知识直接用于输出机器人动作。', 'RT-2, from 2023, applies vision and language knowledge learned from the web directly to output robot actions.'),
    ],
  },
  bioMath: [
    {
      title: b('神经调质设定全局参数：一组广播信号调整整个学习系统', 'Neuromodulators set global parameters: a few broadcast signals tune the whole learning system'),
      tex: t`\delta_t = r_t + \gamma\,V(s_{t+1}) - V(s_t),\qquad \Delta V(s_t) = \alpha\,\delta_t,\qquad P(a \mid s) = \frac{e^{\beta Q(s, a)}}{\sum_{b} e^{\beta Q(s, b)}}`,
      symbols: [
        { tex: t`\delta_t`, meaning: b('奖赏预测误差，假说中对应多巴胺', 'reward prediction error, linked to dopamine in the hypothesis') },
        { tex: t`\gamma`, meaning: b('折扣因子：未来奖赏打多少折，假说中对应血清素', 'discount factor: how much future reward is discounted, linked to serotonin') },
        { tex: t`\alpha`, meaning: b('学习率，假说中对应乙酰胆碱', 'learning rate, linked to acetylcholine') },
        { tex: t`\beta`, meaning: b('逆温度：选择有多集中在最优动作上，假说中对应去甲肾上腺素', 'inverse temperature: how strongly choices focus on the best action, linked to norepinephrine') },
        { tex: t`V,\;Q`, meaning: b('状态的价值与动作的价值', 'value of a state and value of an action') },
        { tex: t`r_t`, meaning: b('时刻 $t$ 得到的奖赏', 'reward received at time $t$') },
      ],
      steps: [
        b('每一步比较得到的奖赏加上下一状态打折后的价值，与原来的预期，差值是预测误差 $\\delta_t$。', 'At each step, compare the reward plus the discounted value of the next state with the old expectation. The difference is the prediction error $\\delta_t$.'),
        b('价值按学习率 $\\alpha$ 朝减小误差的方向更新。', 'The value moves to reduce the error, scaled by the learning rate $\\alpha$.'),
        b('选择动作时，按价值的 softmax 抽样，$\\beta$ 决定选择有多集中。四个参数各由一种广播信号设定，同时作用于所有用到它们的脑区。', 'Actions are drawn by a softmax over values, and $\\beta$ sets how focused the choice is. Each of the four parameters is set by one broadcast signal and acts at once on every region that uses it.'),
      ],
      example: b(
        '现在拿到 $2$ 个单位的奖赏，或 $3$ 步之后拿到 $10$ 个单位。$\\gamma = 0.9$ 时，后者的现值为 $10 \\times 0.9^3 \\approx 7.3$，选择等待；$\\gamma = 0.5$ 时为 $10 \\times 0.5^3 = 1.25$，选择眼前的 $2$。只改变一个全局参数，同一套价值系统的选择就会翻转，分界点约为 $\\gamma = 0.585$。',
        'A reward of $2$ units now, or $10$ units after $3$ steps. At $\\gamma = 0.9$ the delayed reward is worth $10 \\times 0.9^3 \\approx 7.3$, so waiting wins. At $\\gamma = 0.5$ it is worth $10 \\times 0.5^3 = 1.25$, so the immediate $2$ wins. Changing one global parameter flips the choice of the same value system, and the turning point is about $\\gamma = 0.585$.'),
      consequences: [
        b('少数广播信号就能改变整个系统的行为方式（更耐心、更大胆、学得更快），不必逐个修改模块。', 'A few broadcast signals can change how the whole system behaves, more patient, bolder or faster to learn, without changing each module.'),
        b('LLM 智能体中没有对应的信号；类似的全局参数由开发者为每次运行设定。', 'LLM agents have no matching signal. Similar global parameters are set by developers for each run.'),
      ],
      limitations: [
        b('这是 Doya 在 2002 年提出的假说；每种神经调质还有许多其他作用，对应关系并非一一对应。', 'This is a hypothesis Doya proposed in 2002. Each neuromodulator has many other roles, and the mapping is not one to one.'),
        b('模型是单一的强化学习系统，没有描述各个脑区如何分别使用这些信号。', 'The model is a single reinforcement learning system and does not describe how each region uses these signals.'),
      ],
    },
    {
      title: b('按不确定性仲裁：更可靠的控制系统获得更大的发言权（简化为加权）', 'Arbitration by uncertainty: the more reliable controller gets more say (simplified as a weighting)'),
      tex: t`w_{\text{MB}} = \frac{\sigma_{\text{MB}}^{-2}}{\sigma_{\text{MB}}^{-2} + \sigma_{\text{MF}}^{-2}},\qquad Q = w_{\text{MB}}\,Q_{\text{MB}} + (1 - w_{\text{MB}})\,Q_{\text{MF}}`,
      symbols: [
        { tex: t`Q_{\text{MB}}`, meaning: b('基于模型的价值：在头脑中推演后果得到，与前额叶相关', 'model-based value: from simulating consequences, linked to prefrontal cortex') },
        { tex: t`Q_{\text{MF}}`, meaning: b('无模型的价值：由反复经验缓存得到（习惯），与背外侧纹状体相关', 'model-free value: cached from repeated experience, habit, linked to dorsolateral striatum') },
        { tex: t`\sigma_{\text{MB}},\;\sigma_{\text{MF}}`, meaning: b('两个系统对各自估计的不确定性', 'each system’s uncertainty about its own estimate') },
        { tex: t`w_{\text{MB}}`, meaning: b('基于模型系统的权重', 'weight of the model-based system') },
      ],
      steps: [
        b('两个系统各自给出一个价值估计和它的不确定性。', 'Each system gives a value estimate and its uncertainty.'),
        b('不确定性的平方取倒数，作为可信度；按可信度的比例分配权重。', 'The inverse square of uncertainty serves as reliability, and the weights follow the ratio of reliabilities.'),
        b('最终价值是两个估计的加权和；经验越多，习惯系统越可靠，权重随之转移。', 'The final value is the weighted sum of the two estimates. With more experience the habit system becomes more reliable and the weight shifts to it.'),
      ],
      example: b(
        '学习初期 $\\sigma_{\\text{MB}} = 0.5$、$\\sigma_{\\text{MF}} = 2$：$w_{\\text{MB}} = 4 / (4 + 0.25) \\approx 0.94$，主要靠推演。长期练习后 $\\sigma_{\\text{MF}}$ 降到 $0.3$：$w_{\\text{MB}} = 4 / (4 + 11.1) \\approx 0.26$，控制权交给了习惯。',
        'Early in learning, $\\sigma_{\\text{MB}} = 0.5$ and $\\sigma_{\\text{MF}} = 2$, so $w_{\\text{MB}} = 4 / (4 + 0.25) \\approx 0.94$ and simulation dominates. After long practice $\\sigma_{\\text{MF}}$ falls to $0.3$, so $w_{\\text{MB}} = 4 / (4 + 11.1) \\approx 0.26$ and control passes to habit.'),
      consequences: [
        b('同一个任务由不同系统接管：新情况用费力的推演，熟练后转为省力的习惯。', 'Different systems take over the same task. New situations use effortful simulation, and practice hands them to cheap habits.'),
        b('分配依据是各系统自己报告的可靠性，不需要一个知道全部细节的中央调度者。', 'The allocation follows the reliability each system reports, with no central scheduler that knows every detail.'),
      ],
      limitations: [
        b('原模型（Daw 等，2005）按不确定性选择一个系统，这里简化为加权平均。', 'The original model of Daw and colleagues, from 2005, picks one system by uncertainty. Here it is simplified to a weighted average.'),
        b('大脑如何计算和比较两个系统的不确定性，仍不清楚。', 'How the brain computes and compares the two uncertainties is still unclear.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('ReAct 循环：每一轮的思考、动作和观察都追加到上下文', 'The ReAct loop: each round’s thought, action and observation are appended to the context'),
      tex: t`(z_t, a_t) \sim \pi_{\theta}(\cdot \mid c_t),\qquad o_t = \mathrm{Env}(a_t),\qquad c_{t+1} = \mathrm{trunc}_{L}\big(c_t \oplus z_t \oplus a_t \oplus o_t\big)`,
      symbols: [
        { tex: t`c_t`, meaning: b('第 $t$ 轮开始时的上下文（一串词元）', 'context at the start of round $t$, a sequence of tokens') },
        { tex: t`\pi_{\theta}`, meaning: b('权重为 $\\theta$ 的 LLM，部署后 $\\theta$ 固定', 'the LLM with weights $\\theta$, fixed after deployment') },
        { tex: t`z_t,\;a_t`, meaning: b('模型生成的思考文本和动作（工具调用或最终回答）', 'the thought text and action the model generates, a tool call or final answer') },
        { tex: t`o_t`, meaning: b('执行动作后得到的观察，例如搜索结果或代码输出', 'observation returned by the action, such as search results or code output') },
        { tex: t`\oplus`, meaning: b('把文本接在末尾', 'append text at the end') },
        { tex: t`\mathrm{trunc}_{L}`, meaning: b('超过上限 $L$ 个词元时截断或压缩', 'cut or compress beyond a limit of $L$ tokens') },
      ],
      steps: [
        b('模型读取当前上下文，生成一段思考和一个动作。', 'The model reads the current context and generates a thought and an action.'),
        b('外部程序执行动作，返回观察。', 'An outside program executes the action and returns an observation.'),
        b('思考、动作和观察依次接在上下文末尾；超出上限时截断或压缩，然后进入下一轮。', 'The thought, action and observation are appended to the context in order. Past the limit the context is cut or compressed, and the next round starts.'),
      ],
      example: b(
        '设每轮新增思考约 $200$、动作约 $50$、观察约 $1500$ 个词元，共 $1750$ 个。上下文上限为 $128000$ 个词元时，约 $73$ 轮后最早的内容开始被截断或压缩，智能体由此失去最初的细节，除非把它们存进外部记忆。',
        'Assume each round adds about $200$ tokens of thought, $50$ of action and $1500$ of observation, $1750$ in all. With a limit of $128000$ tokens, the earliest content starts to be cut or compressed after about $73$ rounds. The agent then loses the early details unless it stores them in external memory.'),
      consequences: [
        b('权重不变，任务中学到的一切都必须写进上下文或外部记忆。', 'With fixed weights, everything learned during a task must be written into the context or external memory.'),
        b('观察越长，智能体能保留的轮数越少；长任务需要摘要和检索。', 'The longer the observations, the fewer rounds the agent can keep, so long tasks need summaries and retrieval.'),
      ],
      limitations: [
        b('真实框架会压缩、检索和分派子任务，循环比这里复杂。', 'Real frameworks compress, retrieve and delegate subtasks, so the loop is more complex than this.'),
        b('式中没有描述每一步出错的概率；错误会沿着上下文传到后续各轮。', 'The equation does not describe the chance of error at each step, and errors carry through the context into later rounds.'),
      ],
    },
    {
      title: b('Generative Agents 的记忆检索：新近度、重要性和相关性相加', 'Memory retrieval in Generative Agents: recency, importance and relevance added up'),
      tex: t`\mathrm{score}(m) = \alpha_{\text{rec}}\,0.995^{\,\Delta t_m} + \alpha_{\text{imp}}\,\mathrm{imp}(m) + \alpha_{\text{rel}}\,\cos\big(E(q),\,E(m)\big)`,
      symbols: [
        { tex: t`m`, meaning: b('记忆流中的一条记忆（一段自然语言描述）', 'one memory in the memory stream, a natural-language record') },
        { tex: t`\Delta t_m`, meaning: b('这条记忆上次被读取后经过的小时数（模拟时间）', 'hours since the memory was last read, in simulated time') },
        { tex: t`\mathrm{imp}(m)`, meaning: b('重要性：写入时由 LLM 按 $1$ 到 $10$ 打分，再缩放到 $0$ 到 $1$', 'importance: rated $1$ to $10$ by the LLM when written, then scaled to $0$ to $1$') },
        { tex: t`E(q),\;E(m)`, meaning: b('当前查询和记忆的嵌入向量', 'embedding vectors of the current query and the memory') },
        { tex: t`\alpha`, meaning: b('三项的权重，原文都取 $1$', 'weights of the three terms, all $1$ in the paper') },
        { tex: t`\cos`, meaning: b('余弦相似度：两个向量方向越接近越大', 'cosine similarity: larger the closer the two directions are') },
      ],
      steps: [
        b('新近度：每过一小时乘以 $0.995$，越久没读的记忆得分越低。', 'Recency: multiply by $0.995$ for every hour, so memories unread for longer score lower.'),
        b('重要性在写入时打好分；相关性用当前查询和记忆的嵌入向量计算。', 'Importance is scored at writing time. Relevance comes from the embeddings of the query and the memory.'),
        b('三项归一化后相加，取得分最高的几条写进上下文。', 'The three terms are normalized and added, and the top few memories enter the context.'),
      ],
      example: b(
        '查询为「准备聚会」，三项已归一化，省略原文的逐项缩放。A：$2$ 小时前读过，$0.995^2 \\approx 0.99$，重要性 $0.3$，相关性 $0.4$，合计 $1.69$。B：$48$ 小时前，$0.995^{48} \\approx 0.79$，重要性 $0.9$，相关性 $0.9$，合计 $2.59$。C：$1$ 小时前，$0.995$，重要性 $0.1$，相关性 $0.2$，合计约 $1.30$。B 虽然最旧，却最先被取出。',
        'The query is “preparing the party”, with the terms already normalized and the paper’s per-term scaling left out. A was read $2$ hours ago, $0.995^2 \\approx 0.99$, with importance $0.3$ and relevance $0.4$, total $1.69$. B was read $48$ hours ago, $0.995^{48} \\approx 0.79$, with importance $0.9$ and relevance $0.9$, total $2.59$. C was read $1$ hour ago, $0.995$, with importance $0.1$ and relevance $0.2$, total about $1.30$. B is the oldest but is retrieved first.'),
      consequences: [
        b('哪段经历被想起，由几项可解释的分数决定，开发者可以直接调整权重。', 'Which experience is recalled depends on a few interpretable scores whose weights developers can tune directly.'),
        b('功能上类似人的回忆受新近、重要和与当前情境相关的影响。', 'It is functionally similar to how human recall depends on recency, importance and relevance to the current situation.'),
      ],
      limitations: [
        b('权重和衰减速度是人为设定的，重要性靠 LLM 打分。', 'The weights and decay rate are set by hand, and importance relies on scores from the LLM.'),
        b('记忆以文本原样保存，不会像人的记忆那样在回忆和睡眠中被改写与巩固。', 'Memories are kept as verbatim text and are not rewritten or consolidated through recall and sleep as human memories are.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('工作记忆容量小', 'Small working memory'),
        text: b('前额叶一次只能维持约 4 个组块，复杂任务要靠外部笔记和分步处理。', 'Prefrontal cortex keeps only about 4 chunks at a time, so complex tasks need outside notes and step-by-step work.'),
        steps: [3],
      },
      {
        title: b('驱力之间会冲突', 'Drives conflict'),
        text: b('眼前的奖赏常常压过长期目标，情绪和身体状态会改变决策。', 'Immediate rewards often override long-term goals, and emotion and bodily state change decisions.'),
        steps: [4, 5],
      },
      {
        title: b('知识不能复制', 'Knowledge cannot be copied'),
        text: b('每个人都要从头学习，专业能力需要多年积累，无法直接传给别人。', 'Each person learns from scratch, expertise takes years and cannot be passed on directly.'),
        steps: [2],
      },
    ],
    computational: [
      {
        title: b('模块靠文本连接', 'Modules joined by text'),
        text: b('规划、记忆和工具之间只能交换文本，没有连续的调制信号，协调方式由程序写定。', 'Planning, memory and tools can exchange only text, with no continuous modulatory signals, and programs fix how they coordinate.'),
        steps: [3, 5],
      },
      {
        title: b('上下文即全部工作记忆', 'The context is all the working memory'),
        text: b('超出上限的内容会丢失，长任务依赖摘要和检索的质量。', 'Content beyond the limit is lost, so long tasks depend on the quality of summaries and retrieval.'),
        steps: [2],
      },
      {
        title: b('没有自己的驱力', 'No drives of its own'),
        text: b('目标完全来自用户；智能体不会因为自身状态改变优先级。', 'Goals come entirely from the user, and the agent never changes priorities because of its own state.'),
        steps: [6],
      },
      {
        title: b('错误在长链中累积', 'Errors build up over long chains'),
        text: b('每一轮的错误都会进入上下文，任务越长，成功率越低。', 'Each round’s errors enter the context, so the longer the task, the lower the success rate.'),
        steps: [3, 5],
      },
    ],
    misreadings: [
      {
        claim: b('LLM 是智能体的大脑', 'The LLM is the agent’s brain'),
        fact: b('在这些系统里，LLM 承担推理和语言生成；大脑中的记忆巩固、驱力、神经调质和多时间尺度控制，在智能体里要么由外部程序代替，要么没有对应。分工可以在功能上类比，结构上并不相同。', 'In these systems the LLM does reasoning and language generation. Memory consolidation, drives, neuromodulation and control across timescales in the brain are either replaced by outside programs in agents or have no counterpart. The division of labor is functionally analogous, but the structure differs.'),
        source: b('多篇 LLM 智能体综述把 LLM 称为智能体的「大脑」，例如 2023 年的综述《The Rise and Potential of Large Language Model Based Agents》按「大脑、感知、行动」组织智能体。', 'Several LLM agent surveys call the LLM the agent’s brain. For example, the 2023 survey The Rise and Potential of Large Language Model Based Agents organizes agents into brain, perception and action.'),
      },
    ],
  },
  refs: {
    neuro: ['miller2001', 'dehaene2011', 'yu2005', 'cowan2001'],
    models: ['doya2002', 'daw2005'],
    ai: ['yao2022', 'park2023', 'sumers2023', 'kwa2025', 'bjorck2025', 'brohan2023'],
  },
}
