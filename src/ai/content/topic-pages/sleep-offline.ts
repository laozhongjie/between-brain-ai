import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** X01 Sleep, arousal and offline processing: the sleep and wake cycle vs offline training phases. */
export const SLEEP_OFFLINE: TopicContent = {
  thesis: {
    biological: b(
      '下丘脑的睡眠神经元与觉醒核团相互抑制，像一个开关，让大脑在睡与醒之间快速切换。何时切换由两个过程决定：清醒越久积累越多的睡眠压力，以及约 24 小时一周期的昼夜节律。入睡后，感觉输入被大幅削弱，大脑在深睡与快速眼动睡眠之间循环，进行回放、突触调整，可能还有代谢清理。',
      'Sleep neurons in the hypothalamus and the arousal nuclei inhibit each other like a switch, so the brain flips quickly between sleep and wake. Two processes set the timing: sleep pressure that builds the longer one stays awake, and a circadian rhythm of about 24 hours. In sleep, sensory input is strongly damped and the brain cycles between deep and REM sleep for replay, synaptic adjustment and possibly metabolic cleanup.'),
    computational: b(
      '主流模型把学习和使用分成两段：先在数据中心离线训练，部署后权重固定，只做推理。少数方法设计了「睡眠式」离线阶段：wake-sleep 算法交替训练识别网络和生成网络，睡眠式回放让网络在噪声输入下做赫布式调整来减轻遗忘，sleep-time compute 让 LLM 智能体在用户空闲时预先整理上下文。这些阶段何时开始、持续多久，都由人或调度程序决定。',
      'Mainstream models split learning from use. They train offline in a data center, and after deployment their weights stay fixed for inference. A few methods add a sleep-like offline phase. The wake-sleep algorithm alternates between a recognition and a generative network. Sleep-like replay makes Hebbian adjustments under noise input to reduce forgetting. Sleep-time compute lets an LLM agent work through its context while the user is idle. People or schedulers decide when these phases start and how long they last.'),
    gap: b(
      '两边都把一部分处理放到离线进行。差距在于：大脑的离线阶段由内部的睡眠压力和节律触发，一次完成记忆整理和突触调整，代价是每天约三分之一的时间几乎不对外界作出反应；AI 的离线阶段由外部安排，内容只有参数或上下文的更新，但可以让一个副本训练，另一个副本继续服务。',
      'Both move part of their processing offline. The brain’s offline phase is triggered by internal sleep pressure and rhythm and handles memory and synaptic upkeep in one pass. The price is about a third of each day with almost no response to the world. AI offline phases are scheduled from outside and only update parameters or context, but one copy can train while another keeps serving.'),
  },
  short: { biological: b('睡眠', 'Sleep'), computational: b('离线训练', 'Offline training') },
  kinds: ['algorithm', 'implementation'],
  evidence: 'debated',
  asOf: b('AI 侧描述截至 2026 年 10 月主流模型的训练与部署方式，以及带有睡眠式离线阶段的研究方法。', 'The AI column describes how mainstream models are trained and deployed as of October 2026, and research methods with a sleep-like offline phase.'),
  capabilities: [
    {
      lead: 'bio',
      dimension: b('何时进入离线阶段', 'When to go offline'),
      brain: b('睡眠压力足够高、昼夜节律又处在夜间时，开关翻转入睡，不需要外部指令。', 'When sleep pressure is high enough and the circadian rhythm is in its night phase, the switch flips to sleep with no outside command.'),
      ai: b('重新训练和微调的时间由工程团队或调度程序安排，模型自身不判断何时需要更新。', 'Engineering teams or schedulers set when to retrain or fine-tune. The model does not judge when it needs an update.'),
      gap: b('大脑按自身状态触发离线阶段；AI 依赖外部安排。', 'The brain triggers its offline phase from its own state, while AI depends on outside scheduling.'),
    },
    {
      lead: 'bio',
      dimension: b('调节整体状态', 'Regulating the overall state'),
      brain: b('清醒时，蓝斑的去甲肾上腺素随任务调节整个皮层的增益：专注时放大与任务相关的输入，任务收益下降时转向探索。', 'While awake, norepinephrine from the locus coeruleus sets cortical gain by task. It amplifies task-relevant input during focus and shifts toward exploration when the task stops paying off.'),
      ai: b('推理模型会自行决定思考的长短，但采样温度等全局参数通常由用户或系统设定，一次运行中保持不变。', 'Reasoning models choose how long to think. Global settings such as sampling temperature are usually set by the user or system and stay fixed in a run.'),
      gap: b('大脑用同一套神经调质连续调节整体状态；AI 只有部分参数随任务变化。', 'The brain tunes its overall state continuously with one set of neuromodulators, while AI adapts only some parameters to the task.'),
    },
    {
      lead: 'bio',
      dimension: b('离线阶段的学习效果', 'What offline learning achieves'),
      brain: b('睡一晚后，新记忆保持得更好，人也更容易发现任务中隐藏的规律，不需要保存原始经历。', 'After a night’s sleep, new memories are better retained and people more often find a hidden rule in a task. No copy of the raw experience is stored.'),
      ai: b('睡眠式回放把增量 MNIST 上的总体准确率从约 19% 提到约 48%，联合训练全部数据可达 98%。', 'Sleep-like replay raised overall accuracy on incremental MNIST from about 19% to about 48%. Training on all the data together reaches 98%.'),
      gap: b('AI 的睡眠式方法只部分减轻遗忘，单独使用时远不如保存旧数据重新混合训练。', 'AI sleep-like methods only partly reduce forgetting, and alone they fall far short of keeping old data and training on the mix.'),
    },
    {
      lead: 'comp',
      dimension: b('缺少离线阶段的代价', 'The cost of skipping the offline phase'),
      brain: b('连续两周每晚只睡 6 小时，注意测试中的失误逐日累积，最终相当于连续两晚完全不睡。', 'With only 6 hours of sleep a night for two weeks, attention lapses build up daily to the level of two nights without sleep.'),
      ai: b('推理可以全天不间断运行；模型不会因为连续运行而变差，只会因为世界变化而过时。', 'Inference can run around the clock. A model does not degrade from running continuously, it only goes out of date as the world changes.'),
      gap: b('AI 不需要离线阶段来维持运行能力。', 'AI needs no offline phase to keep working.'),
    },
    {
      lead: 'comp',
      dimension: b('离线时与外界的联系', 'Contact with the world while offline'),
      brain: b('睡眠中感觉输入在丘脑被大幅削弱，整个人对外界的反应明显变慢，无法正常行动。', 'In sleep, sensory input is strongly damped at the thalamus, and the whole person responds slowly to the world and cannot act normally.'),
      ai: b('训练在模型副本上进行，部署中的副本继续服务；sleep-time compute 只在用户空闲时运行。', 'Training runs on a copy of the model while the deployed copy keeps serving. Sleep-time compute runs only while the user is idle.'),
      gap: b('AI 的离线处理不必让整个系统停止响应。', 'AI offline processing does not have to stop the whole system from responding.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('睡眠压力积累', 'Sleep pressure builds'),
        points: [
          b('清醒时神经活动持续消耗能量，腺苷等物质在细胞外积累，逐渐抑制觉醒核团。', 'While awake, neural activity keeps using energy, and substances such as adenosine build up outside cells and gradually inhibit the arousal nuclei.'),
          b('这股压力随清醒时间上升，入睡后下降，作为一个输入送到睡眠开关。', 'This pressure rises with time awake and falls in sleep, and it goes to the sleep switch as one input.'),
        ],
      },
      {
        title: b('昼夜节律', 'Circadian clock'),
        points: [
          b('视网膜把光照信号送到视交叉上核，那里的神经元产生约 24 小时一周期的放电节律。', 'The retina sends light signals to the suprachiasmatic nucleus (SCN), whose neurons produce a firing rhythm of about 24 hours.'),
          b('节律经下丘脑的中继传到开关，白天支持清醒，夜间放松对睡眠的抵抗。', 'Relays in the hypothalamus carry the rhythm to the switch, supporting wake by day and easing resistance to sleep at night.'),
        ],
      },
      {
        title: b('睡眠开关', 'The sleep switch'),
        points: [
          b('腹外侧视前区的睡眠神经元与蓝斑、结节乳头核等觉醒核团用抑制性递质相互压制。', 'Sleep neurons in the ventrolateral preoptic area (VLPO) and arousal nuclei such as the locus coeruleus and the tuberomammillary nucleus (TMN) suppress each other with inhibitory transmitters.'),
          b('一方占上风后会进一步压住另一方，所以状态切换迅速，切换后又保持稳定；食欲素神经元从觉醒一侧加固这个开关。', 'Once one side leads it suppresses the other further, so the state flips fast and then holds. Orexin neurons reinforce the switch from the wake side.'),
        ],
      },
      {
        title: b('觉醒水平', 'Arousal level'),
        points: [
          b('清醒时，觉醒核团向全皮层广播去甲肾上腺素、乙酰胆碱和组胺，改变神经元对输入的增益。', 'While awake, the arousal nuclei broadcast norepinephrine, acetylcholine and histamine across cortex and change how strongly neurons respond to input.'),
          b('蓝斑的短促放电跟随与任务相关的事件，持续的高水平放电则伴随分心和探索。', 'Brief bursts of the locus coeruleus follow task-relevant events, while sustained high firing goes with distraction and exploration.'),
        ],
      },
      {
        title: b('睡眠周期', 'Sleep cycles'),
        points: [
          b('入睡后丘脑削弱感觉输入，深睡与快速眼动睡眠约每 90 分钟交替一次。', 'In sleep the thalamus damps sensory input, and deep sleep alternates with REM sleep about every 90 minutes.'),
          b('深睡中，皮层慢振荡、丘脑纺锤波与海马尖波涟漪对齐，白天的经历被回放并转入新皮层（见[巩固、回放与遗忘](topic:consolidation-replay)）。', 'In deep sleep, cortical slow oscillations, thalamic spindles and hippocampal ripples align, and the day’s experience is replayed into neocortex (see [consolidation, replay and forgetting](topic:consolidation-replay)).'),
        ],
      },
      {
        title: b('维护', 'Maintenance'),
        points: [
          b('一种假说认为，深睡按比例下调白天增强的突触，恢复学习余地。', 'One hypothesis holds that deep sleep scales down synapses strengthened during the day and restores room to learn.'),
          b('深睡中脑脊液出现大幅的节律性流动；它是否加快代谢产物的清除，小鼠实验的结论相反。', 'In deep sleep, cerebrospinal fluid moves in large rhythmic waves. Mouse studies disagree on whether this speeds the clearance of metabolic waste.'),
        ],
      },
    ],
    computational: [
      {
        title: b('离线预训练', 'Offline pretraining'),
        points: [
          b('在数据中心用大批数据反复更新参数，大模型的一次训练持续数周到数月。', 'In a data center, parameters are updated over large batches of data, and one training run of a large model lasts weeks to months.'),
          b('训练结束后得到一组固定的权重，复制到服务器上部署。', 'Training ends with a fixed set of weights that is copied to servers for deployment.'),
        ],
      },
      {
        title: b('部署与推理', 'Deployment and inference'),
        points: [
          b('多个副本全天响应请求，权重不变；每次请求的上下文在会话结束后丢弃。', 'Many copies serve requests around the clock with unchanged weights. The context of each request is dropped when the session ends.'),
          b('交互记录可以被收集，作为下一次训练的数据。', 'Interaction logs can be collected as data for the next training run.'),
        ],
      },
      {
        title: b('外部调度（虚线框：没有内部触发）', 'External scheduling (dashed box: no internal trigger)'),
        points: [
          b('何时重新训练或微调，由团队根据新数据、评测结果或发布计划决定。', 'A team decides when to retrain or fine-tune, based on new data, evaluation results or release plans.'),
          b('模型内部没有对应睡眠压力的量来提出「该更新了」。', 'Nothing inside the model plays the role of sleep pressure and signals that an update is due.'),
        ],
      },
      {
        title: b('wake-sleep 交替', 'Wake and sleep phases'),
        points: [
          b('醒相：真实数据自下而上通过识别网络，产生的隐藏表征用来训练生成网络。', 'Wake phase: real data pass bottom-up through the recognition network, and the hidden representation trains the generative network.'),
          b('睡相：生成网络自上而下「梦」出样本，用来训练识别网络；两相交替进行。', 'Sleep phase: the generative network dreams samples top-down, which train the recognition network. The two phases alternate.'),
        ],
      },
      {
        title: b('睡眠式回放', 'Sleep-like replay'),
        points: [
          b('学完一个新任务后，网络的激活函数换成阶跃函数，输入层送入随机的 0 和 1。', 'After a new task is learned, the network’s activation becomes a step function and the input layer receives random zeros and ones.'),
          b('前后两个单元一起激活就增强连接，只有后者激活就削弱连接，然后切回正常训练。', 'A connection strengthens when both units fire and weakens when only the downstream unit fires. Then normal training resumes.'),
        ],
      },
      {
        title: b('空闲时预计算', 'Sleep-time compute'),
        points: [
          b('LLM 智能体在用户提问之前，用空闲时间推理已有的上下文，把推断写成笔记加入上下文。', 'Before the user asks, an LLM agent uses idle time to reason over its existing context and adds its inferences to the context as notes.'),
          b('用户提问时直接读取这些笔记，达到同样准确率所需的测试时计算约减少到五分之一。', 'When the question comes, it reads these notes, and reaching the same accuracy takes about a fifth of the test-time compute.'),
        ],
      },
    ],
  },
  archNotes: {
    biological: [
      b('两过程模型由 Borbély 在 1982 年提出：睡眠压力（过程 S）和昼夜节律（过程 C）共同决定何时入睡、何时醒来，至今仍是睡眠调节的主要框架。', 'Borbély proposed the two-process model in 1982. Sleep pressure, process S, and the circadian rhythm, process C, jointly set when sleep starts and ends. It remains the main framework for sleep regulation.'),
      b('腺苷是睡眠压力的主要候选信号之一；咖啡因阻断腺苷受体，因此能暂时压住困意。', 'Adenosine is one of the main candidate signals of sleep pressure. Caffeine blocks adenosine receptors, which is why it holds off sleepiness for a while.'),
      b('「开关」模型由 Saper 等提出。食欲素神经元缺失时（发作性睡病），开关不再稳定，清醒与睡眠频繁、突然地相互闯入。', 'Saper and colleagues proposed the switch model. Without orexin neurons, as in narcolepsy, the switch loses stability and wake and sleep intrude on each other often and suddenly.'),
      b('适应性增益理论认为，蓝斑在「阵发」模式下帮助利用当前任务，在「持续」模式下推动放弃当前任务、探索其他选择。', 'Adaptive gain theory holds that the locus coeruleus supports the current task in its phasic mode. In its tonic mode it pushes toward leaving the task to explore.'),
      b('2013 年的小鼠实验发现睡眠时细胞外间隙扩大约 60%，$\\beta$ 淀粉样蛋白清除加快；2024 年的小鼠研究用荧光示踪测得睡眠和麻醉时清除反而减慢，这一功能仍有争议。', 'A 2013 mouse study found that the space between cells grew by about 60% in sleep and amyloid beta cleared faster. A 2024 mouse study with fluorescent tracers found clearance slowed in sleep and anesthesia, so this function is debated.'),
      b('2019 年的人类研究发现，深睡中第四脑室出现大幅的脑脊液流入，在时间上与慢波和血流的振荡耦合。', 'A 2019 human study found large inflows of cerebrospinal fluid into the fourth ventricle in deep sleep. They were coupled in time to slow waves and blood flow oscillations.'),
      b('2003 年的睡眠限制实验中，每晚只睡 6 小时的被试失误持续增加，但自评的困倦程度只略有上升。', 'In a 2003 sleep restriction study, people sleeping 6 hours a night made steadily more lapses, but their own ratings of sleepiness rose only slightly.'),
    ],
    computational: [
      b('wake-sleep 算法由 Hinton 等在 1995 年提出，用来训练亥姆霍兹机（一种带识别和生成两套连接的网络）。名称借自睡眠，算法本身不以生理睡眠为模型。', 'Hinton and colleagues proposed the wake-sleep algorithm in 1995 to train the Helmholtz machine, a network with recognition and generative connections. The name comes from sleep, but the algorithm does not model physiological sleep.'),
      b('睡眠式回放（Sleep Replay Consolidation）在 2022 年发表。输入的随机 0 和 1 按此前所有训练数据中各像素的平均亮度生成，权重按上次训练中各层的最大激活缩放，阈值通过超参数搜索确定。', 'Sleep Replay Consolidation was published in 2022. The random zeros and ones follow the mean brightness of each pixel over all earlier training data. Weights are scaled by each layer’s maximum activation in the last training, and thresholds come from a hyperparameter search.'),
      b('在同一研究中，睡眠式回放与少量旧数据的重放（0.75% 的数据）结合时，增量 MNIST 的准确率从约 80% 提高到约 86%。', 'In the same study, sleep-like replay plus rehearsal of 0.75% of the old data raised incremental MNIST accuracy from about 80% to about 86%.'),
      b('2020 年的 brain-inspired replay 不保存原始数据，而是用模型自己的反馈连接生成内部表征来回放，在 CIFAR-100 的增量任务上减轻了遗忘。', 'Brain-inspired replay, from 2020, stores no raw data. It replays internal representations generated by the model’s own feedback connections and reduced forgetting on incremental CIFAR-100.'),
      b('sleep-time compute 在 2025 年由 Letta 与加州大学伯克利分校的研究者提出；在改造为「先给上下文、后提问」的 GSM-Symbolic 与 AIME 上，增加空闲时计算还能把准确率再提高最多 13% 和 18%。', 'Researchers at Letta and UC Berkeley proposed sleep-time compute in 2025. On GSM-Symbolic and AIME, reworked to give the context before the question, more idle-time compute raised accuracy by up to 13% and 18%.'),
      b('2021 年的一篇综述指出，深度学习中的回放还缺少大脑回放的许多特征，例如睡眠的不同阶段和对压缩表征的回放。', 'A 2021 review noted that replay in deep learning still lacks many features of replay in the brain. Examples are distinct sleep stages and replay of compressed representations.'),
    ],
  },
  bioMath: [
    {
      title: b('两过程模型：睡眠压力与昼夜节律决定何时睡、何时醒', 'The two-process model: sleep pressure and the circadian rhythm set when to sleep and wake'),
      tex: t`S_{\text{wake}}(t) = 1 - (1 - S_0)\,e^{-t/\tau_r},\qquad S_{\text{sleep}}(t) = S_0\,e^{-t/\tau_d},\qquad \theta^{\pm}(c) = \theta^{\pm}_0 + A\,\sin\frac{2\pi\,(c - 13)}{24}`,
      symbols: [
        { tex: t`S`, meaning: b('睡眠压力，取值 $0$ 到 $1$', 'sleep pressure, from $0$ to $1$') },
        { tex: t`S_0`, meaning: b('当前阶段开始时（醒来或入睡时）的睡眠压力', 'sleep pressure at the start of the current phase, on waking or falling asleep') },
        { tex: t`t`, meaning: b('当前阶段开始后经过的小时数', 'hours since the current phase began') },
        { tex: t`\tau_r,\;\tau_d`, meaning: b('清醒时上升、睡眠中下降的时间常数，常用值约 $18.2$ 小时和 $4.2$ 小时', 'time constants of the rise while awake and the fall in sleep, commonly about $18.2$ and $4.2$ hours') },
        { tex: t`\theta^{+},\;\theta^{-}`, meaning: b('上阈值（压力升到这里就入睡）与下阈值（降到这里就醒来），例中 $\\theta^{+}_0 = 0.58$、$\\theta^{-}_0 = 0.17$', 'upper threshold, where sleep starts, and lower threshold, where waking starts; $\\theta^{+}_0 = 0.58$ and $\\theta^{-}_0 = 0.17$ in the example') },
        { tex: t`c,\;A`, meaning: b('一天中的时刻（小时）；昼夜节律让阈值摆动的幅度，例中 $A = 0.08$，阈值在 $19$ 点最高、$7$ 点最低', 'clock time in hours; how far the circadian rhythm moves the thresholds, $A = 0.08$ in the example, highest at $19$:00 and lowest at $7$:00') },
      ],
      steps: [
        b('清醒时，睡眠压力以时间常数 $\\tau_r$ 向上限 $1$ 逼近，越接近上限涨得越慢。', 'While awake, sleep pressure approaches its ceiling of $1$ with time constant $\\tau_r$, rising more slowly as it gets close.'),
        b('两个阈值随一天中的时刻上下摆动；压力碰到上阈值 $\\theta^{+}$ 时入睡。', 'Both thresholds swing with the time of day. Sleep starts when pressure meets the upper threshold $\\theta^{+}$.'),
        b('睡眠中，压力以更短的时间常数 $\\tau_d$ 指数下降；降到下阈值 $\\theta^{-}$ 时醒来，进入下一轮。', 'In sleep, pressure falls exponentially with the shorter time constant $\\tau_d$. Waking starts when it reaches the lower threshold $\\theta^{-}$, and the next round follows.'),
      ],
      example: b(
        '取 $\\tau_r = 18.2$、$\\tau_d = 4.2$ 小时。$7$ 点起床时 $S_0 = 0.09$，清醒 $16$ 小时后 $S = 1 - 0.91\\,e^{-16/18.2} \\approx 0.62$，正好碰到 $23$ 点的上阈值。再睡 $8$ 小时，$S = 0.62\\,e^{-8/4.2} \\approx 0.09$，正好降到 $7$ 点的下阈值。若通宵不睡，到次日 $7$ 点 $S \\approx 0.76$；此时下阈值正从最低点回升，压力约 $6$ 小时就与它相遇，补觉比平时短。',
        'Take $\\tau_r = 18.2$ and $\\tau_d = 4.2$ hours. On waking at $7$:00, $S_0 = 0.09$, and after $16$ hours awake $S = 1 - 0.91\\,e^{-16/18.2} \\approx 0.62$, which meets the upper threshold at $23$:00. Sleeping $8$ hours gives $S = 0.62\\,e^{-8/4.2} \\approx 0.09$, which meets the lower threshold at $7$:00. After a night awake, $S \\approx 0.76$ at $7$:00 the next day. The lower threshold is then rising from its low point, and pressure meets it after about $6$ hours, so recovery sleep is shorter than usual.'),
      consequences: [
        b('$\\tau_d$ 远小于 $\\tau_r$，所以 $8$ 小时睡眠就能抵消 $16$ 小时清醒积累的压力。', '$\\tau_d$ is much smaller than $\\tau_r$, so $8$ hours of sleep cancel the pressure of $16$ hours awake.'),
        b('何时醒来不只看压力，也看时刻：白天补觉时阈值在升高，熬夜欠下的睡眠不会一觉全部补回。', 'When waking comes depends on the clock as well as on pressure. In daytime recovery sleep the threshold is rising, so a lost night is not slept back in one go.'),
        b('压力和节律是两个独立的过程：倒时差时节律还停在原来的时区，即使压力很高也可能睡不着。', 'Pressure and rhythm are separate processes. After a time zone change the rhythm stays on the old zone, so sleep can fail even under high pressure.'),
      ],
      limitations: [
        b('模型只描述何时入睡和醒来，不描述睡眠内部的阶段，也不描述睡眠做了什么。', 'The model describes only when sleep starts and ends, not the stages within it or what sleep does.'),
        b('睡眠压力的物质基础仍不完全清楚；阈值的形状和参数因人而异，并随年龄变化。', 'The physical basis of sleep pressure is not fully known. The shape and parameters of the thresholds vary between people and with age.'),
      ],
    },
    {
      title: b('睡眠开关：相互抑制让状态快速翻转并保持（简化）', 'The sleep switch: mutual inhibition makes the state flip fast and hold (simplified)'),
      tex: t`\tau\,\frac{du_W}{dt} = -u_W + f\big(I_W - \beta\,u_S\big),\qquad \tau\,\frac{du_S}{dt} = -u_S + f\big(I_S + S - \beta\,u_W\big),\qquad f(x) = \frac{1}{1 + e^{-10x}}`,
      symbols: [
        { tex: t`u_W,\;u_S`, meaning: b('觉醒核团与睡眠神经元的活动水平，$0$ 到 $1$', 'activity of the arousal nuclei and the sleep neurons, $0$ to $1$') },
        { tex: t`\tau`, meaning: b('活动变化的时间常数，远短于睡眠压力的变化', 'time constant of activity changes, far shorter than changes in sleep pressure') },
        { tex: t`I_W,\;I_S`, meaning: b('两侧的基础输入，例中取 $0.5$ 和 $0.1$', 'baseline input to each side, $0.5$ and $0.1$ in the example') },
        { tex: t`S`, meaning: b('睡眠压力，只加在睡眠一侧', 'sleep pressure, added to the sleep side only') },
        { tex: t`\beta`, meaning: b('相互抑制的强度，例中取 $1$', 'strength of mutual inhibition, $1$ in the example') },
        { tex: t`f`, meaning: b('S 形的放电函数：输入为正时接近 $1$，为负时接近 $0$', 'S-shaped firing function: near $1$ for positive input, near $0$ for negative') },
      ],
      steps: [
        b('每一侧的输入等于自己的基础输入减去另一侧活动乘以 $\\beta$；睡眠一侧还加上睡眠压力 $S$。', 'Each side’s input is its baseline input minus $\\beta$ times the other side’s activity. The sleep side also receives sleep pressure $S$.'),
        b('输入经过 S 形函数，活动向这个值靠拢；活跃的一侧压低另一侧，另一侧越低，它的抑制越弱，这一侧就更活跃。', 'Input passes through the S-shaped function and activity moves toward that value. The active side pushes the other down, which weakens the inhibition it receives and makes it more active still.'),
        b('$S$ 缓慢上升，睡眠一侧的活动随之抬头，又削弱了它受到的抑制；$S$ 超过某个值后，清醒状态不再自洽，开关整体翻转到睡眠。', 'As $S$ slowly rises, activity on the sleep side creeps up and weakens the inhibition it receives. Past a certain $S$ the wake state is no longer self-consistent, and the whole switch flips to sleep.'),
      ],
      example: b(
        '取 $S = 0.4$。若处于清醒：$u_W \\approx 0.99$，睡眠侧的输入 $0.1 + 0.4 - 0.99 = -0.49$，$u_S = f(-0.49) \\approx 0.007$；觉醒侧的输入 $0.5 - 0.007 \\approx 0.49$，$u_W \\approx 0.99$，自洽。若处于睡眠，按对称的算法 $u_S \\approx 0.99$、$u_W \\approx 0.007$，同样自洽。所以 $S = 0.4$ 时两种状态都稳定，维持原来的那一种。按这组参数，只有 $S$ 超过约 $0.72$ 才必然入睡，降到约 $0.08$ 以下才必然醒来。',
        'Take $S = 0.4$. If awake, $u_W \\approx 0.99$, the sleep side’s input is $0.1 + 0.4 - 0.99 = -0.49$ and $u_S = f(-0.49) \\approx 0.007$. The wake side’s input is $0.5 - 0.007 \\approx 0.49$, so $u_W \\approx 0.99$, which is consistent. If asleep, the mirror calculation gives $u_S \\approx 0.99$ and $u_W \\approx 0.007$, also consistent. At $S = 0.4$ both states are stable and the current one stays. With these parameters sleep is certain only above about $S = 0.72$ and waking only below about $0.08$.'),
      consequences: [
        b('入睡点高于醒来点，中间是一段回滞区：在这段区间里状态由历史决定，不会因为压力的小波动来回切换。', 'The point of falling asleep lies above the point of waking, with a hysteresis band between them. In that band the state depends on history and small changes in pressure do not flip it back and forth.'),
        b('相互抑制减弱时回滞区变窄，状态在阈值附近频繁切换；Saper 等认为食欲素神经元的作用正是稳定这个开关。', 'Weaker mutual inhibition narrows the band, and the state flips often near threshold. Saper and colleagues argue that orexin neurons serve to stabilize this switch.'),
      ],
      limitations: [
        b('这是两个群体的简化模型；Phillips 与 Robinson 的完整模型还包括昼夜节律输入和多种觉醒核团。', 'This is a simplified two-population model. The full model of Phillips and Robinson adds circadian input and several arousal nuclei.'),
        b('模型只区分睡与醒，不包括深睡与快速眼动睡眠之间的切换。', 'The model separates only sleep and wake, not the switching between deep and REM sleep.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('wake-sleep 算法：醒相训练生成网络，睡相用「梦」训练识别网络', 'The wake-sleep algorithm: the wake phase trains the generative network, the sleep phase trains recognition on dreams'),
      tex: t`\Delta\theta \propto \nabla_{\theta}\log p_{\theta}(\mathbf{x}, \mathbf{h}),\ \ \mathbf{h} \sim q_{\phi}(\mathbf{h} \mid \mathbf{x}),\qquad \Delta\phi \propto \nabla_{\phi}\log q_{\phi}(\mathbf{h} \mid \mathbf{x}),\ \ (\mathbf{h}, \mathbf{x}) \sim p_{\theta}`,
      symbols: [
        { tex: t`\mathbf{x}`, meaning: b('可见数据，例如一张图片的像素', 'visible data, such as the pixels of an image') },
        { tex: t`\mathbf{h}`, meaning: b('隐藏单元的状态，表示数据背后的原因', 'state of the hidden units, standing for causes behind the data') },
        { tex: t`q_{\phi}`, meaning: b('识别网络：由数据自下而上推出隐藏状态，参数 $\\phi$', 'recognition network: infers hidden states bottom-up from data, parameters $\\phi$') },
        { tex: t`p_{\theta}`, meaning: b('生成网络：由隐藏状态自上而下生成数据，参数 $\\theta$', 'generative network: generates data top-down from hidden states, parameters $\\theta$') },
      ],
      steps: [
        b('醒相：输入一个真实样本 $\\mathbf{x}$，用识别网络采样出 $\\mathbf{h}$；调整生成网络，使它从这个 $\\mathbf{h}$ 生成 $\\mathbf{x}$ 的概率变大。', 'Wake phase: feed a real sample $\\mathbf{x}$ and sample $\\mathbf{h}$ with the recognition network. Adjust the generative network so it becomes more likely to generate $\\mathbf{x}$ from this $\\mathbf{h}$.'),
        b('睡相：让生成网络从顶层随机采样，自上而下「梦」出一对 $(\\mathbf{h}, \\mathbf{x})$；调整识别网络，使它从这个 $\\mathbf{x}$ 推出 $\\mathbf{h}$。', 'Sleep phase: let the generative network sample from its top layer and dream a pair $(\\mathbf{h}, \\mathbf{x})$ top-down. Adjust the recognition network so it infers this $\\mathbf{h}$ from this $\\mathbf{x}$.'),
        b('两相交替。每一相的训练目标都由另一个网络提供，每个连接只需要两端单元的活动和一个局部误差。', 'The phases alternate. Each phase gets its training targets from the other network, and each connection needs only the activity at its two ends and a local error.'),
      ],
      example: b(
        '训练手写数字时，开始的生成网络「梦」出的图像接近噪声，识别网络在睡相学不到有用的东西。醒相不断改进生成网络后，梦出的图像越来越像数字，睡相对识别网络的训练也越来越有效。',
        'On handwritten digits, the early generative network dreams images close to noise, and the recognition network learns little in the sleep phase. As the wake phase improves the generative network, its dreams look more like digits and the sleep phase trains recognition better.'),
      consequences: [
        b('不需要把误差反向传过多层，只用局部规则就能训练两套网络。', 'No error has to travel back through many layers, and local rules alone train both networks.'),
        b('睡相学到什么取决于「梦」的质量：生成网络越接近数据，识别网络越准。', 'What the sleep phase teaches depends on the quality of the dreams. The closer the generative network is to the data, the more accurate recognition becomes.'),
      ],
      limitations: [
        b('两相优化的目标并不相同，合起来不严格提高数据的似然，训练可能停在较差的解。', 'The two phases optimize different objectives, which together do not strictly raise the likelihood of the data, so training can settle on a poor solution.'),
        b('没有证据表明大脑按这种方式交替训练两套网络；名称只是类比。', 'There is no evidence that the brain trains two networks in alternation this way. The name is only an analogy.'),
      ],
    },
    {
      title: b('睡眠式回放：在噪声输入下按前后单元是否同时激活调整权重', 'Sleep-like replay: under noise input, weights change by whether the units at both ends fire together'),
      tex: t`a_i = H\Big(\sum_{j} w_{ij}\,a_j - \theta_l\Big),\qquad \Delta w_{ij} = \begin{cases} +\eta_{\text{inc}}, & a_i = 1,\ a_j = 1 \\ -\eta_{\text{dec}}, & a_i = 1,\ a_j = 0 \end{cases}`,
      symbols: [
        { tex: t`a_j,\;a_i`, meaning: b('前一层与后一层单元的状态，$0$ 或 $1$', 'state of a unit in the earlier and the later layer, $0$ or $1$') },
        { tex: t`w_{ij}`, meaning: b('从单元 $j$ 到单元 $i$ 的权重', 'weight from unit $j$ to unit $i$') },
        { tex: t`H`, meaning: b('阶跃函数：输入超过 $0$ 输出 $1$，否则为 $0$', 'step function: $1$ for input above $0$, else $0$') },
        { tex: t`\theta_l`, meaning: b('第 $l$ 层的激活阈值', 'activation threshold of layer $l$') },
        { tex: t`\eta_{\text{inc}},\;\eta_{\text{dec}}`, meaning: b('每次增强和削弱的幅度', 'size of each increase and decrease') },
      ],
      steps: [
        b('学完新任务后，把每个单元的 ReLU 换成阶跃函数，输入层按各像素的平均亮度随机送入 $0$ 或 $1$。', 'After a new task, replace each unit’s ReLU with a step function. Feed the input layer random $0$s and $1$s that follow each pixel’s mean brightness.'),
        b('活动逐层传播：加权输入超过阈值的单元输出 $1$。', 'Activity spreads layer by layer, and a unit outputs $1$ when its weighted input exceeds the threshold.'),
        b('一个单元激活时，检查它的每个输入：输入也是 $1$ 就增强这条连接，是 $0$ 就削弱；重复多步后，换回 ReLU 继续训练。', 'When a unit fires, check each of its inputs. Strengthen the connection if the input is also $1$, weaken it if $0$. After many steps, switch back to ReLU.'),
      ],
      example: b(
        '设 $\\eta_{\\text{inc}} = 0.01$、$\\eta_{\\text{dec}} = 0.005$。某个隐藏单元激活时，它的输入中像素 A 为 $1$、像素 B 为 $0$：A 的连接加 $0.01$，B 的连接减 $0.005$。旧任务留下的连接更容易被随机输入一起激活，因此反复得到增强；只为新任务服务、此刻没有激活的输入被逐步削弱。',
        'Let $\\eta_{\\text{inc}} = 0.01$ and $\\eta_{\\text{dec}} = 0.005$. A hidden unit fires while pixel A is $1$ and pixel B is $0$, so A’s connection gains $0.01$ and B’s loses $0.005$. Connections left by old tasks are easier for random input to activate together, so they keep getting stronger. Inputs that serve only the new task and are silent now are gradually weakened.'),
      consequences: [
        b('不需要标签和旧数据，网络自身权重引发的活动就能重新强化旧任务的连接。', 'Without labels or old data, activity driven by the network’s own weights strengthens the connections of old tasks again.'),
        b('功能上类似睡眠中的「回放加突触下调」：共同出现的连接增强，无关的连接减弱。', 'It is functionally similar to replay plus synaptic downscaling in sleep: co-active connections strengthen and unrelated ones weaken.'),
      ],
      limitations: [
        b('单独使用时，增量 MNIST 的准确率约 48%，远低于联合训练的 98%。', 'Used alone, it reaches about 48% on incremental MNIST, far below the 98% of joint training.'),
        b('阈值、增减量和步数都要按任务搜索；方法只在小型网络和数据集上验证过。', 'Thresholds, step sizes and step counts need a search per task, and the method has been tested only on small networks and datasets.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('必须付出离线时间', 'Offline time is unavoidable'),
        text: b('每天约三分之一的时间用于睡眠，这段时间里对外界的反应迟钝，个体容易受到威胁。', 'About a third of each day goes to sleep, when responses to the world are slow and the individual is exposed to threats.'),
        steps: [5],
      },
      {
        title: b('睡眠不足的代价会累积', 'Sleep loss adds up'),
        text: b('慢性睡眠限制造成的失误逐日增加，而主观困倦几乎不变，人难以察觉自己的状态。', 'Lapses from chronic sleep restriction grow day by day while felt sleepiness hardly changes, so people barely notice their own state.'),
        steps: [1],
      },
      {
        title: b('节律可能与环境错位', 'The rhythm can fall out of step'),
        text: b('跨时区或轮班时，昼夜节律需要数天才能调整，期间入睡和醒来的时机都受影响。', 'After crossing time zones or with shift work, the circadian rhythm takes days to adjust, and the timing of sleep and waking suffers meanwhile.'),
        steps: [2],
      },
      {
        title: b('开关可能失稳', 'The switch can lose stability'),
        text: b('食欲素神经元缺失时，清醒中会突然入睡，睡眠也会被频繁打断。', 'Without orexin neurons, sleep breaks into waking suddenly and sleep itself is often interrupted.'),
        steps: [3],
      },
    ],
    computational: [
      {
        title: b('离线阶段由外部安排', 'Offline phases are scheduled from outside'),
        text: b('模型不能提出自己需要更新，更新的时机取决于团队的判断和发布节奏。', 'A model cannot signal that it needs an update. The timing depends on team judgment and release cycles.'),
        steps: [3],
      },
      {
        title: b('部署中不整理经历', 'No consolidation during deployment'),
        text: b('部署的模型不会把一天的交互整理进权重，会话结束后上下文被丢弃。', 'A deployed model does not fold the day’s interactions into its weights, and the context is dropped after each session.'),
        steps: [2],
      },
      {
        title: b('睡眠式方法规模小', 'Sleep-like methods are small in scale'),
        text: b('wake-sleep 和睡眠式回放主要在 MNIST、CIFAR 等小数据集上验证，尚未用于大模型训练。', 'Wake-sleep and sleep-like replay have been tested mainly on small datasets such as MNIST and CIFAR, not in large model training.'),
        steps: [4, 5],
      },
      {
        title: b('预计算依赖可预测的问题', 'Precomputing needs predictable questions'),
        text: b('sleep-time compute 的收益在问题越容易从上下文预测时越大，问题难以预料时收益下降。', 'Sleep-time compute helps most when the question is easy to predict from the context, and less when it is hard to foresee.'),
        steps: [6],
      },
    ],
    misreadings: [
      {
        claim: b('人工神经网络也需要睡眠', 'Artificial neural networks need sleep too'),
        fact: b('睡眠式阶段在部分实验中减轻了遗忘，但主流模型不睡也能持续运行；有用的是离线整理所学内容的机制，而不是停机本身。', 'Sleep-like phases reduced forgetting in some experiments, but mainstream models run continuously without sleep. What helps is a mechanism for reorganizing what was learned offline, not downtime itself.'),
      },
      {
        claim: b('睡眠就是大脑在清洗废物', 'Sleep is the brain washing out waste'),
        fact: b('2013 年的小鼠实验发现睡眠中清除加快，2024 年的小鼠研究得出相反结论；清除是否是睡眠的主要功能仍有争议，睡眠同时承担记忆整理等多种作用。', 'A 2013 mouse study found faster clearance in sleep, and a 2024 mouse study found the opposite. Whether clearance is a main function of sleep is debated, and sleep also serves memory and other roles.'),
        source: b('2013 年的 Science 论文发表后，媒体普遍以「睡眠为大脑清除毒素」为题报道。', 'After the 2013 Science paper, the press widely reported it as sleep flushing toxins from the brain.'),
      },
    ],
  },
  refs: {
    neuro: ['saper2005', 'scammell2017', 'borbely2016', 'astonjones2005', 'vandongen2003', 'xie2013', 'miao2024', 'fultz2019', 'tononi2014', 'wagner2004'],
    models: ['phillips2007'],
    ai: ['hinton1995', 'tadros2022', 'vandeven2020', 'lin2025', 'hayes2021'],
  },
}
