import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F34 Interoception and physiological regulation: hypothalamic and insular interoceptive regulation vs homeostatic RL and robot resource management. */
export const INTEROCEPTION: TopicContent = {
  thesis: {
    biological: b(
      '体温、血糖、水分、心跳和呼吸等身体内部的状态，经迷走神经和脊髓上传，在脑干和下丘脑与设定点比较，并在岛叶形成对身体的整体感受。偏离时，大脑一边启动出汗、心率、激素等自动调节，一边产生「饿」「渴」这样的动机，驱动觅食和饮水。调节常常是预测性的：小鼠一看到食物，下丘脑中的饥饿神经元在进食之前就安静下来。',
      'The body’s internal states, temperature, blood sugar, water, heartbeat and breathing, travel up the vagus nerve and spinal cord, are compared with set points in the brainstem and hypothalamus and form an overall sense of the body in the insula. When they drift, the brain starts automatic regulation such as sweating, heart rate and hormones while producing drives like hunger and thirst that push foraging and drinking. Regulation is often predictive: as soon as a mouse sees food, hunger neurons in its hypothalamus quiet down, before it eats.'),
    computational: b(
      '稳态强化学习把奖励定义为内部变量向目标范围的靠近，智能体由此在觅食、饮水和避险之间自动权衡；模拟中，直接为维持内部稳态而优化的智能体涌现出了多种综合行为。机器人用电量、电机温度等内部变量规划充电和降速。文本模型没有内部生理变量。',
      'Homeostatic reinforcement learning defines reward as internal variables moving toward their target ranges, so an agent weighs foraging, drinking and avoiding danger on its own. In simulation, agents optimized directly to maintain internal balance developed many integrated behaviors. Robots use internal variables such as battery level and motor temperature to plan charging and slowing down. Text models have no internal physiological variables.'),
    gap: b(
      '机器人能精确测量并管理电量和温度，但这些变量与学习和价值的联系需要明确设计；生物的内感受渗透到情绪、价值和决策之中，并以预测的方式提前调节。',
      'Robots measure and manage battery and temperature precisely, but linking these variables to learning and value needs explicit design. In living things, interoception pervades emotion, value and decisions and regulates ahead of need.'),
  },
  short: { biological: b('身体调节', 'Bodily regulation'), computational: b('稳态强化学习', 'Homeostatic RL') },
  kinds: ['behavior', 'algorithm', 'math'],
  evidence: 'established',
  asOf: b('计算侧描述截至 2026 年 10 月的稳态强化学习与机器人资源管理；文本模型没有内部生理变量。', 'The computational column describes homeostatic reinforcement learning and robot resource management as of October 2026. Text models have no internal physiological variables.'),
  capabilities: [
    {
      lead: 'comp',
      dimension: b('测量内部变量', 'Measuring internal variables'),
      brain: b('身体的自动调节很精确，但有意识的内感受常不准确：许多人数自己心跳的准确性很差。', 'Automatic bodily regulation is precise, but conscious interoception is often inaccurate. Many people count their own heartbeats poorly.'),
      ai: b('机器人能精确读出电量、各电机温度和关节负载，并实时记录。', 'Robots read battery level, each motor’s temperature and joint loads precisely and log them in real time.'),
      gap: b('在「知道自己的内部状态」这一点上，机器的测量更精确。', 'In knowing their own internal state, machines measure more precisely.'),
    },
    {
      lead: 'even',
      dimension: b('预测性调节', 'Predictive regulation'),
      brain: b('看到或闻到食物，身体就提前分泌消化液和胰岛素，饥饿神经元在进食之前就安静下来。', 'Seeing or smelling food makes the body release digestive juices and insulin in advance, and hunger neurons quiet before eating.'),
      ai: b('机器人可以用模型预测任务的能耗，提前安排充电；这种预测需要人为设计。', 'Robots can predict a task’s energy use with a model and schedule charging in advance, though this prediction must be designed.'),
      gap: b('两边都能提前调节；生物的预测调节是进化与学习形成的，机器的需要专门建模。', 'Both regulate ahead of time. In living things this comes from evolution and learning, in machines from dedicated modeling.'),
    },
    {
      lead: 'bio',
      dimension: b('内部状态改变价值与动机', 'Internal state shaping value and drive'),
      brain: b('饥饿时食物的价值升高、学习更快；饥饿神经元的活动本身让动物感到不适，从而学会去吃东西。', 'Hunger raises the value of food and speeds learning, and the activity of hunger neurons itself is unpleasant, so animals learn to eat.'),
      ai: b('多数智能体的奖励与内部状态无关；稳态强化学习把两者联系起来，但目前主要用于研究。', 'Most agents’ rewards ignore internal state. Homeostatic reinforcement learning links the two, but mainly in research so far.'),
      gap: b('在生物中，内部状态是价值的来源之一；在多数 AI 中，价值与「身体」无关。', 'In living things, internal state is one source of value. In most AI, value has nothing to do with a body.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('内感受信号', 'Interoceptive signals'),
        points: [b('血糖、渗透压、体温、心跳和胃肠的状态由专门的感受器检测，以电脉冲经迷走神经和脊髓上传，部分激素也直接作用于脑。', 'Blood sugar, osmolality, temperature, heartbeat and gut state are detected by dedicated receptors and sent up the vagus nerve and spinal cord as electrical pulses, and some hormones act on the brain directly.')],
      },
      {
        title: b('脑干与下丘脑：与设定点比较', 'Brainstem and hypothalamus: comparing with set points'),
        points: [b('下丘脑把这些信号与设定点比较，例如体温约 37 摄氏度，算出偏离的方向和大小。', 'The hypothalamus compares these signals with set points, such as a body temperature near 37 °C, and works out the direction and size of the deviation.')],
      },
      {
        title: b('自动调节', 'Automatic regulation'),
        points: [b('自主神经调节出汗、血管收缩和心率，激素调节血糖（胰岛素）和水分（抗利尿激素），不需要意识参与。', 'The autonomic nervous system adjusts sweating, blood vessels and heart rate, and hormones adjust blood sugar, insulin, and water, antidiuretic hormone, without awareness.')],
      },
      {
        title: b('动机与价值', 'Drive and value'),
        points: [
          b('下丘脑的饥饿、口渴神经元产生令人不适的信号，驱动觅食和饮水。', 'Hunger and thirst neurons in the hypothalamus produce unpleasant signals that drive foraging and drinking.'),
          b('同时，与需要相关的东西（食物、水）的价值升高，学习也更快。', 'At the same time, things that meet the need, food and water, gain value and are learned about faster.'),
        ],
      },
      {
        title: b('岛叶：身体的整体感受', 'Insula: an overall sense of the body'),
        points: [b('内感受信号从后岛叶到前岛叶逐级整合，形成对身体状态的整体感受，并与情绪和决策相连。', 'Interoceptive signals are integrated step by step from posterior to anterior insula, forming an overall sense of bodily state linked to emotion and decisions.')],
      },
      {
        title: b('预测性调节', 'Predictive regulation'),
        points: [b('大脑根据预期提前调整：预期进食时提前分泌胰岛素，预期运动时提前提高心率。', 'The brain adjusts ahead of expectations: releasing insulin before an expected meal and raising heart rate before expected exercise.')],
      },
    ],
    computational: [
      {
        title: b('内部传感器', 'Internal sensors'),
        points: [b('电池电量、电机温度、关节负载等由传感器直接测量。', 'Battery level, motor temperature, joint load and more are measured directly by sensors.')],
      },
      {
        title: b('与目标范围比较', 'Comparing with target ranges'),
        points: [b('计算每个内部变量离目标范围有多远，合成为一个「驱力」。', 'Compute how far each internal variable is from its target range and combine these into a drive.')],
      },
      {
        title: b('底层保护', 'Low-level protection'),
        points: [b('超出安全范围时直接触发保护：过热时降速，电量过低时停止任务。', 'Leaving safe ranges triggers protection directly: slowing when overheated and stopping the task at very low battery.')],
      },
      {
        title: b('稳态奖励', 'Homeostatic reward'),
        points: [b('把「驱力减少了多少」作为奖励，与任务奖励一起训练策略，智能体因此学会在任务和维持自身之间权衡。', 'Use how much the drive fell as reward, trained together with task reward, so the agent learns to balance its task against maintaining itself.')],
      },
      {
        title: b('资源规划', 'Resource planning'),
        points: [b('根据预测的能耗安排充电、休息的时机。', 'Schedule charging and rest from predicted energy use.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('内部状态通常只连接到少数几个决策，不像生物那样渗透到感知、学习、情绪和价值的各个方面。', 'Internal state usually connects to only a few decisions rather than pervading perception, learning, emotion and value as in living things.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('内感受指对身体内部状态的感知。2002 年的综述提出，岛叶是整合内感受、形成「身体感受」的关键区域，前岛叶还与主观情绪相关。', 'Interoception is the sensing of the body’s internal state. A 2002 review proposed the insula as the key area integrating interoception into a felt sense of the body, with anterior insula linked to subjective emotion.'),
      b('「稳态」强调把变量维持在设定点附近，「应变稳态」强调根据预测提前调整，设定点本身也会随情境改变，例如运动前心率提前升高。', 'Homeostasis stresses keeping variables near set points, while allostasis stresses adjusting ahead from prediction, with set points themselves shifting by situation, such as heart rate rising before exercise.'),
      b('2015 年的小鼠实验发现，下丘脑的饥饿神经元在小鼠看到或闻到食物的几秒内就安静下来，早于真正进食，说明调节是预测性的。', 'A 2015 mouse study found hypothalamic hunger neurons quiet within seconds of seeing or smelling food, before actually eating, showing regulation is predictive.'),
      b('体温、激素和代谢随约 24 小时的生物钟变化，在醒来和入睡之前就提前调整，这也是一种预测性调节。', 'Temperature, hormones and metabolism follow the roughly 24-hour body clock and shift ahead of waking and sleep, another form of predictive regulation.'),
      b('同年的另一项研究发现，饥饿和口渴神经元的活动本身令小鼠感到不适，它们会学会做能让这种活动减弱的事，这与「奖励等于驱力减少」的思路一致。', 'Another study that year found hunger and thirst neuron activity is itself unpleasant to mice, and they learn to do what reduces it, consistent with reward as drive reduction.'),
      b('有意识的内感受准确性因人而异，与焦虑等情绪特征有关；准确性、自我报告的感受和对准确性的信心是三个不同的维度。', 'Conscious interoceptive accuracy varies across people and relates to traits such as anxiety. Accuracy, self-reported sensibility and confidence in one’s accuracy are three distinct dimensions.'),
    ],
    computational: [
      b('稳态强化学习于 2014 年提出：奖励不是外部给定的数，而是内部状态向设定点靠近的程度。它在数学上统一了「追求奖励」和「维持稳态」。', 'Homeostatic reinforcement learning was proposed in 2014. Reward is not a number given from outside but how much the internal state moves toward its set points, unifying reward seeking and homeostasis mathematically.'),
      b('2024 年的研究在模拟环境中直接以维持内部稳态为目标训练智能体，觅食、避险、体温调节等行为在没有单独设计的情况下自然出现。', 'A 2024 study trained agents in simulation with maintaining internal balance as the only goal, and foraging, danger avoidance and temperature regulation emerged without separate design.'),
      b('2019 年的观点文章提出，让机器具有需要维持的脆弱身体（如软体机器人），可能是让机器拥有类似感受的功能基础；这是一种设想，尚无实现。', 'A 2019 perspective proposed that giving machines a vulnerable body they must maintain, such as a soft robot, might ground feeling-like functions. It is a proposal, not yet realized.'),
      b('机器人的电量管理与生物的能量平衡在功能上相似，但电量通常只影响「何时充电」，不影响感知和学习的方式。', 'Robot battery management is functionally similar to biological energy balance, but battery level usually affects only when to charge, not how the robot perceives or learns.'),
    ],
  },
  bioMath: [
    {
      title: b('负反馈与预测调节：把变量拉回设定点，并提前应对', 'Negative feedback and predictive control: pulling back to the set point and acting ahead'),
      tex: t`u(t) = -k\,\big(x(t) - x^{*}\big) - k_f\,\big(\hat{x}(t + \Delta) - x^{*}\big)`,
      symbols: [
        { tex: t`x(t)`, meaning: b('当前的内部变量，例如血糖', 'current internal variable, such as blood sugar') },
        { tex: t`x^{*}`, meaning: b('设定点', 'set point') },
        { tex: t`u(t)`, meaning: b('调节作用，例如胰岛素分泌', 'regulatory action, such as insulin release') },
        { tex: t`k`, meaning: b('反馈的强度：按当前偏离调节', 'feedback strength: acting on current deviation') },
        { tex: t`\hat{x}(t + \Delta)`, meaning: b('对 $\\Delta$ 时间之后变量的预测', 'predicted value $\\Delta$ ahead') },
        { tex: t`k_f`, meaning: b('预测调节的强度：按预期的偏离提前调节', 'predictive strength: acting on expected deviation') },
      ],
      steps: [
        b('第一项是反馈：变量偏离设定点多少，就朝相反方向调节多少。', 'The first term is feedback: adjust against the current deviation in proportion to it.'),
        b('第二项是预测：如果预期变量将要偏离（例如马上要吃饭），就提前调节。', 'The second term is prediction: if the variable is expected to drift, as before a meal, adjust in advance.'),
        b('两者相加，使变量在扰动到来时偏离更小、恢复更快。', 'Together they make the variable drift less and recover faster when the disturbance comes.'),
      ],
      example: b(
        '进餐前血糖为 $5$，设定点也是 $5$，反馈项为 $0$。大脑预测进食后血糖会升到 $8$，取 $k_f = 0.5$，预测项为 $-1.5$，提前分泌胰岛素。只有反馈时，要等血糖真的升到 $8$ 才开始调节，峰值更高、持续更久。',
        'Before a meal, blood sugar is $5$, equal to the set point, so the feedback term is $0$. The brain predicts sugar will rise to $8$ after eating. With $k_f = 0.5$, the predictive term is $-1.5$, releasing insulin in advance. With feedback alone, regulation would wait until sugar actually reached $8$, giving a higher, longer peak.'),
      consequences: [
        b('解释了为什么看到食物就会分泌胰岛素和消化液：这是预测调节。', 'It explains why seeing food triggers insulin and digestive juices: predictive regulation.'),
        b('预测项依赖学习：习惯在某个时间、某个地点进食，身体就会在那时那地提前准备。', 'The predictive term relies on learning. Eating habitually at a certain time and place makes the body prepare there and then.'),
      ],
      limitations: [
        b('真实的调节有多个相互作用的变量和激素，线性公式只是简化。', 'Real regulation has many interacting variables and hormones, and the linear formula simplifies.'),
        b('设定点本身也会随情境、昼夜和发育改变，模型把它当作常数。', 'Set points themselves shift with situation, time of day and development, while the model treats them as constant.'),
      ],
    },
    {
      title: b('需要改变价值：同样的食物，饿时更有价值', 'Need changes value: the same food is worth more when hungry'),
      tex: t`V(h) = r_0 \cdot \frac{h^{*} - h}{h^{*}},\qquad 0 \le h \le h^{*}`,
      symbols: [
        { tex: t`h`, meaning: b('当前的能量储备', 'current energy reserve') },
        { tex: t`h^{*}`, meaning: b('理想的能量储备', 'ideal energy reserve') },
        { tex: t`r_0`, meaning: b('最饿时食物的最大价值', 'maximum value of food when hungriest') },
        { tex: t`V(h)`, meaning: b('储备为 $h$ 时食物的价值', 'value of food at reserve $h$') },
      ],
      steps: [
        b('用当前储备离理想值有多远，衡量需要的程度。', 'Measure need by how far the current reserve is from the ideal.'),
        b('食物的价值与需要成正比：越饿越有价值。', 'Food value is proportional to need: the hungrier, the more valuable.'),
        b('吃饱时需要为 $0$，同样的食物价值降到 $0$，动物不再为它付出努力。', 'When full, need is $0$, the same food is worth $0$ and the animal stops working for it.'),
      ],
      example: b(
        '设 $r_0 = 10$、$h^{*} = 100$。储备为 $40$ 时，食物价值 $10 \\times 0.6 = 6$；储备为 $90$ 时，价值只有 $1$。实验中，喂饱的动物不再按压杠杆换取同样的食物，表现的正是这种价值下降。',
        'Let $r_0 = 10$ and $h^{*} = 100$. With a reserve of $40$, food is worth $10 \\times 0.6 = 6$. At $90$ it is worth only $1$. In experiments, sated animals stop pressing a lever for the same food, showing exactly this drop in value.'),
      consequences: [
        b('价值不是物体本身的属性，而是物体与当前身体状态的关系。', 'Value is not a property of the object but of its relation to the current bodily state.'),
        b('把内感受与奖赏学习连接起来（见[价值评估与奖赏学习](topic:reward-learning)）。', 'It connects interoception with reward learning (see [valuation and reward learning](topic:reward-learning)).'),
      ],
      limitations: [
        b('线性关系是简化；真实的价值还受口味、新奇、社会情境影响。', 'The linear relation is a simplification. Real value also depends on taste, novelty and social context.'),
        b('多种需要同时存在时，要在它们之间权衡，单一公式不足以描述。', 'With several needs at once, they must be traded off, which one formula cannot capture.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('稳态强化学习：奖励等于驱力的减少', 'Homeostatic reinforcement learning: reward is drive reduction'),
      tex: t`D(H) = \Big(\sum_{i} \big|h_i^{*} - h_i\big|^{n}\Big)^{1/m},\qquad r_t = D(H_t) - D(H_{t+1})`,
      symbols: [
        { tex: t`H = (h_1, h_2, \dots)`, meaning: b('内部变量，例如能量、水分、温度', 'internal variables, such as energy, water and temperature') },
        { tex: t`h_i^{*}`, meaning: b('每个变量的设定点', 'set point of each variable') },
        { tex: t`D(H)`, meaning: b('驱力：内部状态离设定点有多远', 'drive: how far the internal state is from its set points') },
        { tex: t`n,\;m`, meaning: b('决定驱力形状的指数，常取 $n > m$，使大的偏离更紧迫', 'exponents shaping the drive, often $n > m$ so large deviations are more urgent') },
        { tex: t`r_t`, meaning: b('这一步的奖励：驱力减少了多少', 'reward of this step: how much the drive fell') },
      ],
      steps: [
        b('把各个内部变量与设定点的偏离合成一个驱力。', 'Combine the deviations of all internal variables from their set points into one drive.'),
        b('每一步的奖励等于驱力的减少量：靠近设定点为正，远离为负。', 'Each step’s reward is the drop in drive: positive toward the set points, negative away.'),
        b('用这个奖励做强化学习，智能体自动在各种需要之间权衡，也不会过度满足某一种需要。', 'Learning with this reward makes the agent weigh its needs on its own, without over-satisfying any one of them.'),
      ],
      example: b(
        '设定点为 $(10, 10)$，取 $n = m = 2$。状态 $(6, 9)$ 时驱力 $\\sqrt{16 + 1} \\approx 4.12$；吃一份食物使能量加 $2$，变为 $(8, 9)$，驱力 $\\approx 2.24$，奖励约 $1.88$。若已经吃饱 $(10, 9)$ 再吃，变为 $(12, 9)$，驱力从 $1$ 升到 $\\approx 2.24$，奖励约 $-1.24$，过量进食受到惩罚。',
        'Set points $(10, 10)$ with $n = m = 2$. At $(6, 9)$ the drive is $\\sqrt{16 + 1} \\approx 4.12$. Eating adds $2$ energy to give $(8, 9)$ and a drive of $\\approx 2.24$, a reward of about $1.88$. Already full at $(10, 9)$, eating gives $(12, 9)$, the drive rises from $1$ to $\\approx 2.24$ and the reward is about $-1.24$, penalizing overeating.'),
      consequences: [
        b('同一种食物的奖励随内部状态变化，与生物中价值随需要变化的现象一致。', 'The reward for the same food varies with internal state, matching how value tracks need in living things.'),
        b('在模拟中，仅凭这一目标就能涌现出觅食、饮水和避险等多种行为。', 'In simulation, this goal alone can give rise to foraging, drinking and danger avoidance.'),
      ],
      limitations: [
        b('设定点、指数和要追踪哪些变量都需要人为设定。', 'Set points, exponents and which variables to track must all be set by hand.'),
        b('主要在模拟环境中验证，真实机器人中的应用仍然有限。', 'It has been tested mainly in simulation, with limited use on real robots.'),
      ],
    },
    {
      title: b('机器人的充电决策：剩余能量能否完成任务并安全返回', 'A robot’s charging decision: can remaining energy finish the task and return safely'),
      tex: t`E_{\text{rem}} < \hat{E}_{\text{task}} + \hat{E}_{\text{return}} + E_{\text{margin}}`,
      symbols: [
        { tex: t`E_{\text{rem}}`, meaning: b('剩余电量', 'remaining battery energy') },
        { tex: t`\hat{E}_{\text{task}}`, meaning: b('预测完成当前任务需要的能量', 'predicted energy to finish the current task') },
        { tex: t`\hat{E}_{\text{return}}`, meaning: b('预测返回充电站需要的能量', 'predicted energy to return to the charger') },
        { tex: t`E_{\text{margin}}`, meaning: b('安全余量；不等式成立时先去充电', 'safety margin; when the inequality holds, charge first') },
      ],
      steps: [
        b('用能耗模型预测完成任务和返回所需的能量。', 'Predict the energy to finish the task and return with an energy model.'),
        b('加上安全余量，与剩余电量比较。', 'Add a safety margin and compare with the remaining energy.'),
        b('不够就先去充电，够则继续任务。', 'If it is not enough, charge first. Otherwise continue.'),
      ],
      example: b(
        '剩余 $40\\%$，预测任务需 $25\\%$、返回需 $10\\%$、余量 $10\\%$，合计 $45\\%$，大于剩余，所以先去充电。若任务只需 $15\\%$，合计 $35\\%$，就继续工作。',
        'With $40\\%$ left, the task needs a predicted $25\\%$, the return $10\\%$ and the margin $10\\%$, totaling $45\\%$, more than remains, so the robot charges first. If the task needed only $15\\%$, the total of $35\\%$ would let it keep working.'),
      consequences: [
        b('与生物的预测性调节在功能上相似：根据对未来需求的预测提前行动。', 'It resembles biological predictive regulation: acting early on predicted future needs.'),
        b('规则简单、可靠，便于验证和保证安全。', 'The rule is simple and reliable, easy to verify and keep safe.'),
      ],
      limitations: [
        b('电量只影响「何时充电」这一个决策，不像饥饿那样同时改变感知、学习和价值。', 'Battery level affects only when to charge, unlike hunger, which changes perception, learning and value together.'),
        b('需要准确的能耗模型；任务难以预测时规则可能过于保守或冒险。', 'It needs an accurate energy model, and when tasks are hard to predict the rule may be too cautious or too risky.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('有意识的内感受不准确', 'Conscious interoception is inaccurate'),
        text: b('许多人难以准确感知自己的心跳等内部状态，而且这种能力因人而异。', 'Many people cannot accurately sense their heartbeat and other internal states, and the ability varies widely.'),
        steps: [5],
      },
      {
        title: b('调节可能失衡', 'Regulation can go wrong'),
        text: b('长期压力、睡眠不足或代谢疾病会使设定点和调节失衡，例如血糖调节失效。', 'Chronic stress, lack of sleep or metabolic disease can unbalance set points and regulation, as when blood sugar control fails.'),
        steps: [2, 3],
      },
      {
        title: b('预测会带来偏差', 'Prediction can mislead'),
        text: b('习惯性的预测调节可能在不需要时触发，例如在常吃饭的时间不饿也想吃。', 'Habitual predictive regulation can trigger when not needed, such as wanting to eat at the usual mealtime without being hungry.'),
        steps: [6],
      },
    ],
    computational: [
      {
        title: b('内部状态与学习脱节', 'Internal state is cut off from learning'),
        text: b('多数机器人中，电量、温度只用于保护和充电，不影响感知、学习和价值。', 'In most robots, battery and temperature serve only protection and charging, not perception, learning or value.'),
        steps: [3, 6],
      },
      {
        title: b('驱力需要人为设定', 'Drives are set by hand'),
        text: b('追踪哪些变量、设定点和权衡方式都要设计者决定，稳态强化学习主要停留在模拟中。', 'Which variables to track, set points and trade-offs are all decided by designers, and homeostatic reinforcement learning stays mainly in simulation.'),
        steps: [2, 4],
      },
      {
        title: b('文本模型没有身体', 'Text models have no body'),
        text: b('语言模型没有需要维持的内部生理变量，「饿」「累」只是文字。', 'Language models have no internal physiological variables to maintain, and hungry or tired are just words.'),
        steps: [6],
      },
    ],
    misreadings: [],
  },
  refs: {
    neuro: ['craig2002', 'sterling2012', 'betley2015', 'chen2015', 'barrett2015', 'garfinkel2015'],
    models: ['keramati2014'],
    ai: ['man2019', 'yoshida2024'],
  },
}
