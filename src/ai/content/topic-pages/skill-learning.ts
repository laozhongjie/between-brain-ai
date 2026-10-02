import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F27 Skill acquisition and dexterous manipulation: skill learning in the basal ganglia and motor cortex vs vision-language-action models. */
export const SKILL_LEARNING: TopicContent = {
  thesis: {
    biological: b(
      '学一项新技能，开始时动作慢、变化大、需要专注，由前额叶和背内侧纹状体主导；练习中，多巴胺强化成功的动作，小脑纠正误差，运动皮层中相关的表征扩大；熟练后，背外侧纹状体把一连串动作打包成一个整体，执行变得自动。练习后的睡眠还能进一步提高速度和准确性。人手能在手指间灵活转动物体，并在几次示范后学会新的操作。',
      'Early in learning a new skill, movements are slow, variable and need focus, led by prefrontal cortex and the dorsomedial striatum. With practice, dopamine reinforces successful actions, the cerebellum corrects errors and related representations in motor cortex expand. Once skilled, the dorsolateral striatum packs a sequence of actions into one unit, and execution becomes automatic. Sleep after practice further improves speed and accuracy. The human hand turns objects nimbly between the fingers and learns new manipulations after a few demonstrations.'),
    computational: b(
      'VLA（视觉语言动作）模型把预训练的视觉语言模型接上动作输出：输入相机画面和一句指令，输出机械臂的动作。它们在大量遥操作示范上做模仿学习，并与网页图文一起训练，能把语义知识迁移到操作上，例如理解「把能当锤子用的东西拿起来」。但灵巧的手内操作仍然很难，在没见过的家庭环境中完成多步任务的成功率也不稳定。',
      'VLA, vision-language-action, models attach action outputs to pretrained vision-language models. Given camera images and an instruction, they output robot arm actions. Trained by imitation on many teleoperated demonstrations together with web images and text, they transfer semantic knowledge to manipulation, such as understanding “pick up the thing you could use as a hammer”. But dexterous in-hand manipulation remains hard, and success on multi-step tasks in unseen homes is uneven.'),
    gap: b(
      'VLA 让机器人能听懂指令、认出各种物体，语义层面进步很快；差距在于手和练习：人有灵巧的手和密集的触觉，能通过自己练习不断改进，模型依赖大量人工示范，部署后很少自主练习提高。',
      'VLAs let robots follow instructions and recognize many objects, with fast progress at the semantic level. The gap lies in hands and practice. People have dexterous hands with dense touch and keep improving through their own practice, while models rely on many human demonstrations and rarely improve by practicing on their own after deployment.'),
  },
  short: { biological: b('人', 'People'), computational: b('VLA', 'VLAs') },
  kinds: ['behavior', 'algorithm'],
  evidence: 'established',
  asOf: b('计算侧描述截至 2026 年 10 月的 VLA 模型与机器人模仿学习；具体结果按发表年份注明。', 'The computational column describes VLA models and robot imitation learning as of October 2026. Results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('按语言指令操作', 'Acting on language instructions'),
      brain: b('人听懂指令就能操作从没见过的物体，并利用常识（「能当锤子用的东西」）。', 'People follow instructions with never-seen objects and use common sense, such as something that could serve as a hammer.'),
      ai: b('2023 年的 RT-2 能执行训练示范中没有出现过的指令，例如拿起「可以当锤子用的东西」，这一能力来自与网页数据共同训练。', 'RT-2 in 2023 carried out instructions absent from its training demonstrations, such as picking up something usable as a hammer, an ability gained from co-training with web data.'),
      gap: b('在理解指令和认出物体上，VLA 已有较好的泛化。', 'In understanding instructions and recognizing objects, VLAs already generalize fairly well.'),
    },
    {
      lead: 'bio',
      dimension: b('灵巧的手内操作', 'Dexterous in-hand manipulation'),
      brain: b('人能在手指间转动、调整物体，拧瓶盖、转笔、系鞋带都不需要看。', 'People turn and adjust objects between their fingers and twist caps, spin pens and tie shoes without looking.'),
      ai: b('2019 年的机器人手用仿真训练的策略还原魔方，常规打乱时的成功率约六成；多数 VLA 只控制夹爪，不做手内操作。', 'In 2019 a robot hand restored a Rubik’s cube with a policy trained in simulation, succeeding about six times in ten on regular scrambles. Most VLAs control only a gripper and do no in-hand manipulation.'),
      gap: b('手指的灵巧操作是机器人最明显的短板之一。', 'Finger dexterity is one of robots’ clearest weaknesses.'),
    },
    {
      lead: 'bio',
      dimension: b('学会新技能需要的示范', 'Demonstrations needed for a new skill'),
      brain: b('看几次示范，再自己练习，人就能学会一个新的操作。', 'A few demonstrations plus their own practice let people learn a new manipulation.'),
      ai: b('OpenVLA 在新任务上微调通常要几十到上百条示范；预训练本身用了约一百万条机器人轨迹。', 'Fine-tuning OpenVLA on a new task usually takes tens to a hundred or more demonstrations, and pretraining itself used about a million robot trajectories.'),
      gap: b('模型需要的示范远多于人，并且很少通过自主练习改进。', 'Models need far more demonstrations than people and rarely improve through their own practice.'),
    },
    {
      lead: 'bio',
      dimension: b('新环境中的多步任务', 'Multi-step tasks in new places'),
      brain: b('人进入陌生的厨房也能收拾干净，找到东西该放的位置。', 'People can tidy an unfamiliar kitchen and figure out where things go.'),
      ai: b('2025 年的 $\\pi_{0.5}$ 在训练中没见过的家庭里完成了清理厨房、整理卧室等多步任务，但成功率因任务和环境而有较大差异。', 'In 2025, $\\pi_{0.5}$ completed multi-step tasks such as cleaning a kitchen and tidying a bedroom in homes unseen in training, but success varied widely by task and setting.'),
      gap: b('长时程任务中的小失误会累积，模型的可靠性仍远不及人。', 'Small slips accumulate over long tasks, and model reliability remains far below people’s.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('早期：目标导向', 'Early: goal-directed'),
        points: [b('前额叶与背内侧纹状体主导，每一步都需要注意和思考，动作慢、变化大。', 'Prefrontal cortex and the dorsomedial striatum lead. Each step needs attention and thought, and movements are slow and variable.')],
      },
      {
        title: b('试错与多巴胺强化', 'Trial and error with dopamine'),
        points: [b('结果比预期好时，多巴胺强化刚才的动作；动作本身的随机变化提供了探索，原理见[信用分配](topic:credit-assignment)。', 'When an outcome beats expectations, dopamine reinforces the action just made. Natural variation in movement supplies exploration, explained in [credit assignment](topic:credit-assignment).')],
      },
      {
        title: b('小脑精细化', 'Cerebellar refinement'),
        points: [b('小脑根据误差调整动作的时序和协调，使动作更准、更平滑。', 'The cerebellum adjusts timing and coordination from errors, making movements more accurate and smooth.')],
      },
      {
        title: b('运动皮层重组', 'Motor cortex reorganization'),
        points: [b('数周的练习使运动皮层中与该技能相关的区域扩大，形成新的连接。', 'Weeks of practice enlarge the motor cortex areas involved in the skill and form new connections.')],
      },
      {
        title: b('后期：自动化与组块', 'Late: automation and chunking'),
        points: [
          b('背外侧纹状体逐渐接管，一连串动作被打包成一个整体，只在开头和结尾有明显的神经活动。', 'The dorsolateral striatum gradually takes over, and a sequence of actions is packed into one unit with marked neural activity only at its start and end.'),
          b('执行不再需要注意，人可以边做边想别的事。', 'Execution no longer needs attention, and people can think of other things while doing it.'),
        ],
      },
      {
        title: b('睡眠巩固', 'Consolidation in sleep'),
        points: [b('练习后的一夜睡眠能提高技能的速度和准确性，即使没有额外练习。', 'A night’s sleep after practice improves speed and accuracy without extra practice.')],
      },
    ],
    computational: [
      {
        title: b('视觉与语言编码', 'Encoding vision and language'),
        points: [b('预训练的视觉语言模型把相机画面和文字指令编码成一串词元向量。', 'A pretrained vision-language model encodes camera images and the instruction into a sequence of token vectors.')],
      },
      {
        title: b('动作的表示', 'Representing actions'),
        points: [b('连续的动作（末端位置、姿态、夹爪开合）被切成离散的词元，像文字一样逐个生成；或者由专门的动作头一次输出一小段连续动作。', 'Continuous actions, end-effector position, orientation and gripper, are cut into discrete tokens generated like text, or a dedicated action head outputs a short chunk of continuous actions at once.')],
      },
      {
        title: b('模仿学习', 'Imitation learning'),
        points: [b('在大量人工遥操作的示范上训练：给定画面和指令，预测示范者当时的动作。', 'Training on many human teleoperated demonstrations: given images and instruction, predict the demonstrator’s action.')],
      },
      {
        title: b('与网页数据共同训练', 'Co-training with web data'),
        points: [b('同时用网页图文数据训练，把物体识别和常识迁移到动作上，所以能理解示范中没出现过的指令。', 'Web images and text are trained on at the same time, transferring object knowledge and common sense to action, so instructions absent from the demonstrations can be understood.')],
      },
      {
        title: b('底层控制执行', 'Low-level execution'),
        points: [b('模型输出的目标位姿或关节目标交给底层控制器，每秒执行若干次。', 'The model’s target poses or joint targets go to a low-level controller, executed several times per second.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('缺少自主练习改进和触觉反馈：部署后，模型通常不会通过自己的尝试变得更熟练。', 'Missing self-practice and touch feedback: after deployment, the model usually does not become more skilled through its own attempts.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('技能学习常被分为三个阶段：认知阶段（想清楚怎么做）、联系阶段（动作逐渐稳定）、自动阶段（不需要注意）。这是描述性的划分，阶段之间是连续过渡。', 'Skill learning is often split into three stages: cognitive, working out how, associative, movements stabilizing, and autonomous, needing no attention. The division is descriptive, and the stages blend.'),
      b('大鼠和小鼠实验显示，学习早期背内侧纹状体的活动和可塑性更重要，后期转向背外侧纹状体；破坏后者会使动物难以形成习惯。', 'Rat and mouse studies show the dorsomedial striatum matters more early in learning and the dorsolateral striatum later. Damaging the latter makes habits hard to form.'),
      b('「组块」现象：熟练后，纹状体神经元在一串动作的开始和结束时放电，中间较安静，就像给整串动作加了「开始」和「结束」的标签。', 'Chunking: after training, striatal neurons fire at the start and end of an action sequence and are quieter in between, like tagging the whole sequence with begin and end markers.'),
      b('2002 年的研究中，练习手指敲击序列后睡一夜，速度提高约两成，而同样时长的清醒间隔没有这种提高。', 'In a 2002 study, a night’s sleep after practicing a finger-tapping sequence raised speed by about a fifth, while an equal waking interval did not.'),
    ],
    computational: [
      b('RT-2 把动作的每个维度切成 256 档，用文字词元表示，与图文数据一起训练，使机器人能执行涉及物体属性和简单推理的新指令。', 'RT-2 cuts each action dimension into 256 bins represented as text tokens and trains them together with image-text data, so the robot can carry out new instructions involving object properties and simple reasoning.'),
      b('Open X-Embodiment 汇集了 20 多种机器人、上百万条轨迹的数据；OpenVLA 在其中约一百万条轨迹上训练，参数约 70 亿。', 'Open X-Embodiment pools over a million trajectories from more than 20 kinds of robot. OpenVLA, with about 7 billion parameters, trained on about a million of them.'),
      b('扩散策略用逐步去噪的方式生成一段连续动作，能表示同一情形下的多种合理动作，在许多操作任务上优于直接回归。', 'Diffusion policy generates a chunk of continuous actions by gradual denoising and can represent several reasonable actions for one situation, beating direct regression on many manipulation tasks.'),
      b('2019 年的魔方实验中，还原步骤由传统算法给出，机器人手负责在手指间执行每一步转动；策略在大量随机化的仿真中训练后迁移到真实的手。', 'In the 2019 Rubik’s cube work, a classic algorithm chose the moves and the robot hand executed each turn with its fingers. The policy trained in heavily randomized simulation and transferred to the real hand.'),
    ],
  },
  bioMath: [
    {
      title: b('练习的幂律：进步先快后慢，但不会停止', 'The power law of practice: fast gains first, slower later, never stopping'),
      tex: t`T(N) = A + B\,N^{-\alpha}`,
      symbols: [
        { tex: t`N`, meaning: b('练习的次数', 'number of practice trials') },
        { tex: t`T(N)`, meaning: b('第 $N$ 次完成动作所用的时间', 'time to complete the action on trial $N$') },
        { tex: t`A`, meaning: b('无限练习后能达到的极限时间', 'limit time after unlimited practice') },
        { tex: t`B`, meaning: b('最初与极限之间的差距', 'initial gap above the limit') },
        { tex: t`\alpha`, meaning: b('学习速率，通常在 $0.2$ 到 $0.6$ 之间', 'learning rate, usually between $0.2$ and $0.6$') },
      ],
      steps: [
        b('用时等于一个极限值，加上一个随练习次数按幂函数减小的部分。', 'Time equals a limit plus a part that shrinks as a power of the number of trials.'),
        b('早期每多练一次，时间减少很多；后期要多练很多次才减少一点。', 'Early on, each trial cuts time a lot. Later, many more trials are needed for small gains.'),
        b('在对数坐标上，用时与练习次数接近一条直线。', 'On log scales, time against trials is close to a straight line.'),
      ],
      example: b(
        '设 $A = 1$ 秒、$B = 4$ 秒、$\\alpha = 0.5$。第 1 次用 $5$ 秒；第 100 次用 $1 + 4/10 = 1.4$ 秒；第 10000 次用 $1 + 4/100 = 1.04$ 秒。从第 1 次到第 100 次节省 $3.6$ 秒，从第 100 次到第 10000 次只再节省 $0.36$ 秒。',
        'Let $A = 1$ s, $B = 4$ s and $\\alpha = 0.5$. Trial 1 takes $5$ s, trial 100 takes $1 + 4/10 = 1.4$ s and trial 10000 takes $1 + 4/100 = 1.04$ s. Trials 1 to 100 save $3.6$ s, while trials 100 to 10000 save only $0.36$ more.'),
      consequences: [
        b('解释了专家为什么还在进步：进步变慢，但不会停止。', 'It explains why experts still improve: gains slow but do not stop.'),
        b('神经网络的损失随训练量下降，也常呈现类似的幂律形状。', 'Neural network loss falling with training often shows a similar power-law shape.'),
      ],
      limitations: [
        b('这是对行为数据的描述，不说明背后的机制；平均多人的曲线可能掩盖个体的突然跳跃。', 'It describes behavioral data without a mechanism, and averaging people can hide sudden individual jumps.'),
        b('有人认为指数函数在单个学习者的数据上拟合得更好，仍有争论。', 'Some argue an exponential fits individual learners better, which is debated.'),
      ],
    },
    {
      title: b('双速率学习：快过程学得快也忘得快，慢过程学得慢但保持得久', 'Two-rate learning: a fast process learns and forgets quickly, a slow one learns slowly and holds on'),
      tex: t`x_f(n+1) = A_f\,x_f(n) + B_f\,e(n),\qquad x_s(n+1) = A_s\,x_s(n) + B_s\,e(n),\qquad x(n) = x_f(n) + x_s(n),\qquad A_f < A_s,\;\; B_f > B_s`,
      symbols: [
        { tex: t`x(n)`, meaning: b('第 $n$ 次尝试时，动作已经学会补偿的量', 'how much the movement compensates on attempt $n$') },
        { tex: t`x_f,\ x_s`, meaning: b('快过程和慢过程各自贡献的部分', 'the parts contributed by the fast and the slow process') },
        { tex: t`e(n)`, meaning: b('第 $n$ 次尝试的误差：扰动减去已经补偿的量', 'error on attempt $n$: the perturbation minus what is already compensated') },
        { tex: t`A_f,\ A_s`, meaning: b('保持系数：两次尝试之间留下多少，越接近 $1$ 忘得越慢', 'retention: how much is kept between attempts; the closer to $1$, the slower the forgetting') },
        { tex: t`B_f,\ B_s`, meaning: b('学习率：每次误差改变多少', 'learning rate: how much each error changes the process') },
      ],
      steps: [
        b('每次尝试后，同一个误差 $e$ 同时送给两个过程，各自按自己的学习率 $B$ 修正。', 'After each attempt, the same error $e$ goes to both processes, and each corrects itself at its own learning rate $B$.'),
        b('两次尝试之间，两个过程按各自的保持系数 $A$ 衰减：快过程衰减快，慢过程几乎不衰减。', 'Between attempts, each decays by its retention $A$. The fast process decays quickly, the slow one hardly at all.'),
        b('实际的补偿是两者之和。早期的快速进步主要来自快过程，之后慢过程逐渐接管。', 'The actual compensation is the sum of the two. Early rapid gains come mainly from the fast process, and the slow process gradually takes over.'),
      ],
      example: b(
        '取接近实验拟合的数值 $A_f = 0.6$、$A_s = 0.99$。练习后快过程贡献 $0.3$、慢过程贡献 $0.6$。停下 10 次尝试、没有误差输入时，快过程剩 $0.3 \\times 0.6^{10} \\approx 0.002$，慢过程剩 $0.6 \\times 0.99^{10} \\approx 0.54$。保留下来的几乎全部来自慢过程。',
        'Take values close to experimental fits, $A_f = 0.6$ and $A_s = 0.99$. After practice the fast process contributes $0.3$ and the slow one $0.6$. After 10 attempts with no error input, the fast process keeps $0.3 \\times 0.6^{10} \\approx 0.002$ and the slow one $0.6 \\times 0.99^{10} \\approx 0.54$. Almost everything retained comes from the slow process.'),
      consequences: [
        b('解释了节省效应：重新学习同一任务比第一次快，因为慢过程还保留着上次的痕迹。', 'It explains savings: relearning a task is faster than the first time, because the slow process still holds a trace.'),
        b('解释了自发恢复：反向练习把快过程拉回后，停顿时它先消退，慢过程里原来的适应重新显现。', 'It explains spontaneous recovery: after reverse training pulls the fast process back, it fades first during a pause, and the original adaptation in the slow process reappears.'),
        b('AI 中的对应是快慢两套权重或两种学习率，例如快权重和互补学习系统的设计。', 'The AI counterpart is two sets of weights or two learning rates, as in fast weights and complementary learning system designs.'),
      ],
      limitations: [
        b('模型描述的是对力场、视觉偏移等扰动的适应，不能单独解释学会新的动作序列或组块。', 'It describes adaptation to perturbations such as force fields or visual shifts, and does not by itself explain learning new movement sequences or chunks.'),
        b('两个过程在脑中的位置尚无定论，一般认为与小脑等多个区域有关。', 'Where the two processes sit in the brain is unsettled. Both are thought to involve the cerebellum among other areas.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('动作词元化：把连续的动作切成离散的档位', 'Action tokenization: cutting continuous actions into discrete bins'),
      tex: t`k = \Big\lfloor \frac{a - a_{\min}}{a_{\max} - a_{\min}} \times (K - 1) \Big\rfloor,\qquad \hat{a} = a_{\min} + \frac{k}{K - 1}\,(a_{\max} - a_{\min})`,
      symbols: [
        { tex: t`a`, meaning: b('动作的一个维度，例如末端在 $x$ 方向的位移', 'one action dimension, such as end-effector displacement in $x$') },
        { tex: t`a_{\min},\;a_{\max}`, meaning: b('这一维度的取值范围', 'range of this dimension') },
        { tex: t`K`, meaning: b('档位数，RT-2 中为 256', 'number of bins, 256 in RT-2') },
        { tex: t`k`, meaning: b('档位编号，作为一个词元输出', 'bin index, output as one token') },
        { tex: t`\hat{a}`, meaning: b('执行时从档位还原的动作值', 'action value restored from the bin for execution') },
        { tex: t`\lfloor\cdot\rfloor`, meaning: b('向下取整', 'round down') },
      ],
      steps: [
        b('把每个动作维度的取值范围等分成 $K$ 档。', 'Split each action dimension’s range into $K$ equal bins.'),
        b('训练时，示范中的动作换算成档位编号，当作词元让模型预测。', 'In training, demonstrated actions become bin indices treated as tokens for the model to predict.'),
        b('执行时把模型输出的编号还原成动作值；一个时刻的完整动作由几个维度的词元依次组成。', 'At execution, the model’s indices are converted back to action values. One full action is a few dimension tokens in a row.'),
      ],
      example: b(
        '范围 $[-1, 1]$、$K = 256$。动作 $a = 0.3$ 对应 $\\lfloor 0.65 \\times 255 \\rfloor = 165$ 档；还原为 $-1 + 165/255 \\times 2 \\approx 0.294$，误差约 $0.006$，即范围的千分之三左右。',
        'With range $[-1, 1]$ and $K = 256$, action $a = 0.3$ maps to bin $\\lfloor 0.65 \\times 255 \\rfloor = 165$, restored as $-1 + 165/255 \\times 2 \\approx 0.294$, an error of about $0.006$, around three thousandths of the range.'),
      consequences: [
        b('动作和文字用同一种词元表示，语言模型的结构和网页数据上学到的知识可以直接用于控制。', 'Actions and text share one token form, so the language model’s architecture and web-learned knowledge apply directly to control.'),
        b('精度由档位数决定，对多数抓取任务足够。', 'Precision is set by the number of bins, enough for most grasping tasks.'),
      ],
      limitations: [
        b('逐个生成词元较慢，限制了控制频率，不适合需要快速反应的灵巧操作。', 'Generating tokens one by one is slow and limits control rate, unsuited to dexterous tasks needing fast reactions.'),
        b('离散化会丢失细微的力和速度变化，接触中的精细调节难以表示。', 'Discretization loses fine changes in force and speed, so delicate adjustment during contact is hard to represent.'),
      ],
    },
    {
      title: b('行为克隆：最大化示范动作的概率', 'Behavior cloning: maximizing the probability of demonstrated actions'),
      tex: t`\mathcal{L}(\theta) = -\,\mathbb{E}_{(o,\,l,\,a) \sim \mathcal{D}}\big[\log \pi_{\theta}(a \mid o, l)\big]`,
      symbols: [
        { tex: t`o`, meaning: b('观察：相机画面和机器人状态', 'observation: camera images and robot state') },
        { tex: t`l`, meaning: b('语言指令', 'language instruction') },
        { tex: t`a`, meaning: b('示范者在这一时刻的动作（词元序列）', 'the demonstrator’s action at that moment, as tokens') },
        { tex: t`\mathcal{D}`, meaning: b('示范数据集', 'demonstration dataset') },
        { tex: t`\pi_{\theta}`, meaning: b('模型给出的动作概率', 'action probability from the model') },
      ],
      steps: [
        b('从示范中取出一个时刻：当时的画面、指令和示范者的动作。', 'Take one moment from a demonstration: the images, instruction and demonstrator’s action.'),
        b('让模型给出这个动作的概率，取负对数作为损失。', 'Have the model give the action’s probability and take its negative log as the loss.'),
        b('在所有示范上最小化平均损失，模型就学会「在这种情况下，人会怎么做」。', 'Minimize the average loss over all demonstrations, and the model learns what a person would do in each situation.'),
      ],
      example: b(
        '示范中，看到杯子在左侧、指令是「拿起杯子」时，人把手臂向左移动。若模型给这个动作（对应的档位）的概率是 $0.1$，损失为 $-\\log 0.1 \\approx 2.3$；训练后概率升到 $0.8$，损失降到约 $0.22$。',
        'In a demonstration, with the cup on the left and the instruction “pick up the cup”, the person moves the arm left. If the model gives that action’s bin probability $0.1$, the loss is $-\\log 0.1 \\approx 2.3$. After training the probability rises to $0.8$ and the loss falls to about $0.22$.'),
      consequences: [
        b('只要有足够多的示范，就能学会复杂的操作，不需要设计奖励函数。', 'With enough demonstrations, complex manipulation can be learned without designing a reward.'),
        b('与人「看示范学习」相似，但人随后会自己练习改进，模型通常没有这一步。', 'It resembles people learning from demonstration, but people then practice and improve, a step models usually lack.'),
      ],
      limitations: [
        b('模型只学会模仿，遇到示范中没出现过的偏差时不知道怎样纠正，小错误会累积。', 'The model only learns to imitate and does not know how to recover from deviations absent in the demonstrations, so small errors accumulate.'),
        b('需要大量人工遥操作，收集成本高。', 'It needs much human teleoperation, which is costly to collect.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('需要长时间练习', 'Long practice needed'),
        text: b('精通一项技能常需数月到数年的练习，后期进步越来越慢。', 'Mastering a skill often takes months to years, with progress ever slower later.'),
        steps: [4, 5],
      },
      {
        title: b('习惯难以改掉', 'Habits are hard to change'),
        text: b('自动化后的动作不需要注意，也因此难以改正，错误的姿势一旦形成就很难纠正。', 'Automated actions need no attention and are therefore hard to correct, so a bad technique once formed is hard to undo.'),
        steps: [5],
      },
      {
        title: b('技能会衰退', 'Skills decay'),
        text: b('长期不练，精细技能的速度和准确性会下降。', 'Without practice, the speed and accuracy of fine skills decline.'),
        steps: [4],
      },
    ],
    computational: [
      {
        title: b('手内操作困难', 'In-hand manipulation is hard'),
        text: b('多数 VLA 只控制夹爪，灵巧的手指操作和接触中的精细调节仍是难题。', 'Most VLAs control only a gripper, and dexterous finger manipulation and fine adjustment in contact remain hard.'),
        steps: [2, 6],
      },
      {
        title: b('依赖大量示范', 'Many demonstrations needed'),
        text: b('学会新任务通常要几十到上百条人工示范，且不会通过自主练习改进。', 'A new task usually needs tens to a hundred or more human demonstrations, and the model does not improve by practicing on its own.'),
        steps: [3, 6],
      },
      {
        title: b('长时程任务不稳定', 'Unstable over long tasks'),
        text: b('多步任务中小错误会累积，在新环境中的成功率因任务而差异很大。', 'Small errors accumulate over multi-step tasks, and success in new environments varies widely by task.'),
        steps: [3, 5],
      },
    ],
    misreadings: [
      {
        claim: b('VLA 已经能像人一样灵巧地操作', 'VLAs manipulate as dexterously as people'),
        fact: b('VLA 在理解指令、认出物体上进步很快；灵巧的手内操作和接触中的精细调节仍明显落后于人。', 'VLAs have advanced fast in understanding instructions and recognizing objects. Dexterous in-hand manipulation and fine adjustment in contact still lag clearly behind people.'),
      },
      {
        claim: b('技能存在肌肉里，所以叫『肌肉记忆』', 'Skills live in the muscles, hence ‘muscle memory’'),
        fact: b('「肌肉记忆」只是一种说法：熟练技能由纹状体、运动皮层、小脑等多个脑区共同支持，各自承担不同作用，没有单一的存储位置。', '“Muscle memory” is a figure of speech. Skilled movement relies on the striatum, motor cortex, cerebellum and other brain systems, each with its own role, and has no single storage site.'),
      },
    ],
  },
  refs: {
    neuro: ['karni1995', 'graybiel1998', 'walker2002', 'costa2004', 'yin2006', 'wolpert2011'],
    models: ['smith2006'],
    ai: ['akkaya2019', 'brohan2023', 'chi2023', 'oxe2023', 'kim2024', 'pi2025'],
  },
}
