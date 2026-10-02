import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F40 Developmental stages and learning order: critical periods and infant development vs curriculum learning and staged training. */
export const DEVELOPMENTAL_STAGES: TopicContent = {
  thesis: {
    biological: b(
      '发育有顺序，也有时间窗口：视觉、语音等能力在特定的关键期最容易被经验塑造。小猫出生后几周内遮住一只眼，视觉皮层就被另一只眼主导；成年后遮挡则基本没有影响。婴儿 6 到 8 个月时能分辨外语中的语音差异，到 10 到 12 个月逐渐失去这种能力，只保留母语中有用的区分。早期的「限制」也可能有用：新生儿视力模糊，可能帮助大脑学会整体地加工面孔。',
      'Development has an order and time windows. Abilities such as vision and speech sounds are most shaped by experience during critical periods. Covering one eye of a kitten in its first weeks lets the other eye dominate visual cortex, while covering it in adulthood has little effect. At 6 to 8 months, infants tell apart speech sounds of foreign languages, and by 10 to 12 months they lose this, keeping the distinctions useful in their native language. Early limits can also help: blurry newborn vision may help the brain learn to process faces as wholes.'),
    computational: b(
      '课程学习先学容易的样本、再学难的；在标准设置中收益有限，但在训练时间有限或数据有噪声时有帮助。深度网络也有「关键期」：训练初期给它模糊的图像，之后即使换成清晰图像，表现也难以完全恢复。大模型的训练分为预训练、指令微调和人类反馈强化学习等阶段。BabyLM 挑战尝试只用儿童可能接触到的语言量来训练语言模型。',
      'Curriculum learning trains on easy examples before hard ones. It helps little in standard settings but helps with limited training time or noisy data. Deep networks also have critical periods: blurry images early in training leave lasting deficits even after switching to clear images. Large models train in stages, pretraining, instruction tuning and reinforcement learning from human feedback. The BabyLM challenge trains language models on only as much language as a child might hear.'),
    gap: b(
      '两边都表现出「先学什么、何时学」会影响结果，深度网络甚至出现了类似关键期的现象。差距在于：生物的发育顺序由基因、身体成长和社会环境共同安排，并有开启和关闭关键期的分子机制；AI 的训练顺序由人设计。',
      'Both show that what is learned first, and when, shapes the outcome, and deep networks even show something like critical periods. The difference is that genes, bodily growth and social surroundings arrange biological development, with molecular mechanisms that open and close critical periods, while people design the training order of AI.'),
  },
  short: { biological: b('发育', 'Development'), computational: b('分阶段训练', 'Staged training') },
  kinds: ['behavior', 'algorithm'],
  evidence: 'established',
  asOf: b('计算侧描述截至 2026 年 10 月的课程学习与大模型的分阶段训练；具体结果按发表年份注明。', 'The computational column describes curriculum learning and staged training of large models as of October 2026. Results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('早期限制的作用', 'Benefits of early limits'),
      brain: b('先天性白内障儿童手术后一开始就有较清晰的视力，在整体加工面孔上反而有长期缺陷；正常婴儿从模糊视觉开始。', 'Children treated for congenital cataracts begin with fairly sharp vision and show lasting deficits in processing faces as wholes, while typical infants start from blurry vision.'),
      ai: b('2018 年的研究中，先用模糊图像、再用清晰图像训练的网络，学到了更整体的面孔表示，泛化更好。', 'In a 2018 study, networks trained on blurry images first and clear images later learned more holistic face representations and generalized better.'),
      gap: b('两边都显示，从简单、粗略的输入开始可能帮助学到更好的表示。', 'Both suggest that starting from simple, coarse input may help learn better representations.'),
    },
    {
      lead: 'comp',
      dimension: b('错过时机后的补救', 'Recovering from a missed window'),
      brain: b('关键期内缺乏正常输入（如弱视），成年后很难完全纠正。', 'Without normal input during a critical period, as in amblyopia, full correction in adulthood is hard.'),
      ai: b('网络在训练初期受到干扰后也难以恢复，但可以直接从头重新训练。', 'Networks disrupted early in training also struggle to recover, but they can simply be retrained from scratch.'),
      gap: b('AI 可以重来，生物的发育只有一次。', 'AI can start over, while biological development happens only once.'),
    },
    {
      lead: 'bio',
      dimension: b('学习顺序的安排', 'Arranging the learning order'),
      brain: b('身体的成长（坐、爬、走）和照料者的互动，自然地决定了婴儿下一步能学什么。', 'Bodily growth, sitting, crawling and walking, together with caregivers, naturally decides what an infant can learn next.'),
      ai: b('训练顺序和阶段由人设计；自动课程方法存在，但在标准任务上的收益有限。', 'Training order and stages are designed by people. Automatic curriculum methods exist but help little on standard tasks.'),
      gap: b('生物的学习顺序由身体和环境自主产生，AI 的顺序多是工程选择。', 'Biological learning order arises from body and environment, while AI order is mostly an engineering choice.'),
    },
    {
      lead: 'bio',
      dimension: b('用儿童规模的数据学语言', 'Learning language from child-scale data'),
      brain: b('儿童到十几岁接触的词数估计不超过一亿个，却能完全掌握母语。', 'Children are estimated to hear under a hundred million words by their early teens yet fully master their native language.'),
      ai: b('BabyLM 挑战中，只用约一亿个词训练的模型在语法测试上有所进步，但仍明显不如用海量数据训练的模型。', 'In the BabyLM challenge, models trained on about a hundred million words improved on grammar tests but still lag clearly behind models trained on vast data.'),
      gap: b('同样的数据量下，儿童的学习效果远好于模型。', 'With the same amount of data, children learn far better than models.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('基因设定的时间表', 'A genetically set timetable'),
        points: [b('不同脑区按顺序成熟：初级感觉区最早，前额叶最晚，持续到成年早期。', 'Brain areas mature in order: primary sensory areas first, prefrontal cortex last, continuing into early adulthood.')],
      },
      {
        title: b('关键期开启', 'A critical period opens'),
        points: [b('局部的抑制性中间神经元成熟到一定程度时，关键期开启；用药物提前增强抑制，可以让关键期提前出现。', 'When local inhibitory interneurons mature enough, the critical period opens. Boosting inhibition early with drugs makes it open early.')],
      },
      {
        title: b('经验通过竞争塑造连接', 'Experience shapes connections through competition'),
        points: [b('关键期内，来自两只眼睛或不同语音的输入相互竞争，活跃的输入保留并加强连接，不活跃的被削弱。', 'During the critical period, inputs from the two eyes or from different speech sounds compete. Active inputs keep and strengthen their connections, and inactive ones weaken.')],
      },
      {
        title: b('关键期关闭', 'The critical period closes'),
        points: [b('包裹在神经元周围的分子网络等「刹车」逐渐形成，稳定已有的连接，可塑性下降。', 'Molecular brakes such as nets wrapping around neurons gradually form, stabilizing existing connections and lowering plasticity.')],
      },
      {
        title: b('身体发育带来新的输入', 'Bodily growth brings new input'),
        points: [b('学会坐、爬、走之后，婴儿看到的东西和能做的事都发生变化，新的学习随之开始。', 'After learning to sit, crawl and walk, what infants see and can do changes, and new learning begins.')],
      },
      {
        title: b('社会互动', 'Social interaction'),
        points: [b('照料者的语言、共同注意和回应，引导婴儿注意什么、学会什么；婴儿从真人学语音，比从录像学得更好。', 'Caregivers’ speech, joint attention and responses guide what infants attend to and learn. Infants learn speech sounds better from live people than from video.')],
      },
    ],
    computational: [
      {
        title: b('数据排序', 'Ordering data'),
        points: [b('课程学习按难度排列样本，先易后难，或分阶段逐步加入更难的数据。', 'Curriculum learning orders examples by difficulty, easy first, or adds harder data in stages.')],
      },
      {
        title: b('预训练', 'Pretraining'),
        points: [b('在海量数据上学习通用的表示。', 'General representations are learned on vast data.')],
      },
      {
        title: b('指令微调', 'Instruction tuning'),
        points: [b('在人写的指令和示范回答上继续训练，学会按要求回答。', 'Training continues on human-written instructions and example answers, learning to respond as asked.')],
      },
      {
        title: b('人类反馈强化学习', 'Reinforcement learning from human feedback'),
        points: [b('根据人对回答的偏好进一步调整模型的行为。', 'The model’s behavior is further adjusted from human preferences between answers.')],
      },
      {
        title: b('学习率调度', 'Learning-rate schedule'),
        points: [b('训练早期学习率较大，之后逐渐减小，参数越来越稳定；这在功能上类似可塑性随发育下降。', 'The learning rate is large early and shrinks later, so parameters grow more stable, functionally like plasticity declining with development.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('缺少由身体成长和社会互动驱动的学习顺序：模型不会自己决定下一步学什么。', 'Missing a learning order driven by bodily growth and social interaction: the model does not decide for itself what to learn next.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('1963 年的经典实验中，小猫出生后缝合一只眼的眼睑几周，视觉皮层中的神经元几乎都只对另一只眼有反应；同样的处理用在成年猫身上则几乎没有影响。', 'In a classic 1963 experiment, closing one eyelid of a kitten for a few weeks after birth left nearly all visual cortex neurons responding only to the other eye. The same treatment in adult cats had almost no effect.'),
      b('关键期的开启与局部抑制性神经元的成熟有关，关闭与包裹神经元的分子网络等「刹车」有关；在动物中去除这些刹车，可以在成年后部分重新打开可塑性。', 'Opening a critical period relates to the maturation of local inhibitory neurons, and closing to molecular brakes such as nets wrapping neurons. Removing these brakes in animals can partly reopen plasticity in adulthood.'),
      b('婴儿的语音知觉在第一年中重组：6 到 8 个月时能分辨印地语等外语的语音差异，10 到 12 个月时这种能力明显下降。', 'Infant speech perception reorganizes in the first year. At 6 to 8 months infants distinguish speech sounds of foreign languages such as Hindi, and by 10 to 12 months this ability clearly declines.'),
      b('运动发育研究强调，身体、环境和文化共同塑造发育：学会走路后，婴儿能接触到的物体和人都发生了变化，学习机会也随之改变。', 'Motor development research stresses that body, environment and culture shape development together. After learning to walk, infants reach different objects and people, and their learning opportunities change.'),
      b('「从小处开始」的观点于 1993 年提出：网络在一开始只有有限的记忆或只看简单句子时，才能学会复杂的语法。', 'The idea of starting small was proposed in 1993: networks learned complex grammar only when they began with limited memory or simple sentences.'),
    ],
    computational: [
      b('课程学习于 2009 年被系统提出；2021 年的大规模实验发现，在标准设置中，按难度排序几乎没有帮助，但在训练时间有限或标签有噪声时有明显收益。', 'Curriculum learning was set out systematically in 2009. Large-scale experiments in 2021 found ordering by difficulty barely helps in standard settings but clearly helps with limited training time or noisy labels.'),
      b('2019 年的研究发现，如果深度网络在训练初期只看到模糊的图像，之后即使换成清晰图像、训练很久，最终表现也低于从一开始就用清晰图像训练的网络，与动物关键期的现象相似。', 'A 2019 study found that deep networks shown only blurry images early in training ended up worse than networks trained on clear images from the start, even after long training on clear images, similar to critical periods in animals.'),
      b('BabyLM 挑战从 2023 年开始，限定训练数据为约一千万或一亿个词，以研究用发育上合理的数据量能学到什么。', 'The BabyLM challenge, begun in 2023, limits training data to about ten million or a hundred million words to study what developmentally plausible amounts can teach.'),
      b('大模型的分阶段训练与发育阶段只在「顺序影响结果」上相似；各阶段的目的和机制由工程需要决定。', 'Staged training of large models resembles developmental stages only in that order shapes the outcome. Each stage’s purpose and mechanism come from engineering needs.'),
    ],
  },
  bioMath: [
    {
      title: b('眼优势竞争：两只眼的输入争夺有限的连接', 'Ocular dominance competition: two eyes compete for limited connections'),
      tex: t`\Delta w_e = \eta\,x_e\,y,\qquad y = w_L x_L + w_R x_R,\qquad w_L + w_R = W`,
      symbols: [
        { tex: t`w_L,\;w_R`, meaning: b('左眼和右眼到一个皮层神经元的连接强度', 'connection strengths from the left and right eye to one cortical neuron') },
        { tex: t`x_L,\;x_R`, meaning: b('两只眼的输入活动', 'input activity from the two eyes') },
        { tex: t`y`, meaning: b('皮层神经元的活动', 'activity of the cortical neuron') },
        { tex: t`W`, meaning: b('总连接强度保持不变（归一化）', 'total connection strength held fixed, normalization') },
        { tex: t`\eta`, meaning: b('可塑性的大小：关键期内大，之后小', 'plasticity: large during the critical period, small afterward') },
      ],
      steps: [
        b('按赫布规则，哪只眼的输入与神经元的活动同时出现，它的连接就加强。', 'By the Hebbian rule, an eye’s connection strengthens when its input coincides with the neuron’s activity.'),
        b('总连接强度固定，一只眼加强就意味着另一只眼减弱：两只眼在竞争。', 'With total strength fixed, one eye gaining means the other losing: the eyes compete.'),
        b('遮住一只眼，它的输入为 $0$，连接得不到加强，在归一化中逐渐被另一只眼夺走。', 'Covering one eye makes its input $0$, so its connection never strengthens and is gradually taken over by the other eye through normalization.'),
      ],
      example: b(
        '起初 $w_L = w_R = 0.5$，$W = 1$，取 $\\eta = 0.1$。遮住左眼，$x_L = 0$、$x_R = 1$：每一步 $w_R$ 增加 $0.1 \\times 1 \\times 0.5 = 0.05$，再归一化。几十步后 $w_R$ 接近 $1$，$w_L$ 接近 $0$。关键期过后 $\\eta$ 很小，同样的遮挡几乎不改变连接。',
        'Start with $w_L = w_R = 0.5$, $W = 1$ and $\\eta = 0.1$. Cover the left eye, $x_L = 0$ and $x_R = 1$: each step raises $w_R$ by $0.1 \\times 1 \\times 0.5 = 0.05$ before normalization. After tens of steps $w_R$ nears $1$ and $w_L$ nears $0$. After the critical period, $\\eta$ is tiny and the same covering barely changes the connections.'),
      consequences: [
        b('解释了单眼剥夺为什么会让视觉皮层被另一只眼主导，以及为什么只在关键期内有效。', 'It explains why depriving one eye lets the other dominate visual cortex, and why only during the critical period.'),
        b('这也是弱视的机制之一：童年时一只眼输入不良，会长期失去皮层中的连接。', 'It is also one mechanism of amblyopia: poor input to one eye in childhood loses its cortical connections for good.'),
      ],
      limitations: [
        b('真实的竞争还依赖抑制性神经元和多种分子信号，简单的赫布加归一化只是骨架。', 'Real competition also depends on inhibitory neurons and many molecular signals, and Hebbian learning with normalization is only a skeleton.'),
        b('模型中的 $\\eta$ 随时间变化是假设的，关键期的开启和关闭由专门的机制控制。', 'The changing $\\eta$ in the model is assumed, while dedicated mechanisms control the opening and closing of critical periods.'),
      ],
    },
    {
      title: b('可塑性窗口：同样的经验，在不同年龄效果不同', 'The plasticity window: the same experience works differently at different ages'),
      tex: t`\eta(t) = \eta_{\max}\,\exp\!\Big(-\frac{(t - t_0)^2}{2\sigma^2}\Big) + \eta_{\min}`,
      symbols: [
        { tex: t`t`, meaning: b('年龄', 'age') },
        { tex: t`t_0`, meaning: b('关键期的中心', 'center of the critical period') },
        { tex: t`\sigma`, meaning: b('关键期的宽度', 'width of the critical period') },
        { tex: t`\eta_{\max},\;\eta_{\min}`, meaning: b('关键期内的最大可塑性和成年后保留的可塑性', 'peak plasticity during the critical period and the plasticity kept in adulthood') },
        { tex: t`\eta(t)`, meaning: b('年龄 $t$ 时，经验能改变连接的程度', 'how much experience can change connections at age $t$') },
      ],
      steps: [
        b('可塑性在关键期中心附近最大，越远离越小。', 'Plasticity peaks near the center of the critical period and falls away from it.'),
        b('成年后仍保留一点可塑性，所以并非完全不能学习。', 'Some plasticity remains in adulthood, so learning is not impossible.'),
        b('同样一段经验产生的改变，等于经验的强度乘以当时的可塑性。', 'The change from a stretch of experience equals its strength times the plasticity at the time.'),
      ],
      example: b(
        '设关键期中心在 $t_0 = 8$ 个月、$\\sigma = 2$ 个月，$\\eta_{\\max} = 1$、$\\eta_{\\min} = 0.05$。8 个月时可塑性约 $1.05$，12 个月时约 $0.19$，成年时约 $0.05$。同样听一个月外语语音，8 个月大的婴儿受到的影响是成年人的约二十倍。',
        'Let the critical period center at $t_0 = 8$ months with $\\sigma = 2$ months, $\\eta_{\\max} = 1$ and $\\eta_{\\min} = 0.05$. Plasticity is about $1.05$ at 8 months, $0.19$ at 12 months and $0.05$ in adulthood. The same month of foreign speech sounds affects an 8-month-old about twenty times as much as an adult.'),
      consequences: [
        b('解释了为什么「什么时候学」与「学什么」同样重要。', 'It explains why when something is learned matters as much as what.'),
        b('不同能力的窗口位置不同，形成了发育的先后顺序。', 'Different abilities have windows at different times, forming the developmental sequence.'),
      ],
      limitations: [
        b('真实的关键期形状不一定对称，也会被经验本身推迟或提前。', 'Real critical periods need not be symmetric and can be delayed or advanced by experience itself.'),
        b('窗口的位置和宽度对不同能力和个体差异很大，公式只是示意。', 'Window position and width vary widely across abilities and individuals, and the formula is illustrative.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('课程学习：随训练推进逐步放开难题', 'Curriculum learning: admitting harder examples as training proceeds'),
      tex: t`P_t(x) \propto \exp\!\Big(-\frac{d(x)}{\lambda_t}\Big),\qquad \lambda_{t+1} \ge \lambda_t`,
      symbols: [
        { tex: t`x`, meaning: b('一个训练样本', 'one training example') },
        { tex: t`d(x)`, meaning: b('样本的难度，例如句子长度或模型当前的损失', 'difficulty of the example, such as sentence length or current model loss') },
        { tex: t`\lambda_t`, meaning: b('第 $t$ 步的「放开程度」，随训练增大', 'openness at step $t$, growing with training') },
        { tex: t`P_t(x)`, meaning: b('第 $t$ 步抽到样本 $x$ 的概率', 'probability of drawing $x$ at step $t$') },
      ],
      steps: [
        b('为每个样本估计难度。', 'Estimate each example’s difficulty.'),
        b('训练早期 $\\lambda$ 小，难的样本几乎抽不到，模型主要学简单样本。', 'Early on $\\lambda$ is small, hard examples are rarely drawn and the model learns mainly from easy ones.'),
        b('随训练推进 $\\lambda$ 增大，难样本逐渐加入，最后接近均匀抽样。', 'As training proceeds $\\lambda$ grows, hard examples join and sampling ends near uniform.'),
      ],
      example: b(
        '难度为 $1$ 和 $5$ 的两个样本。$\\lambda = 1$ 时抽样比例约为 $e^{-1} : e^{-5} \\approx 55 : 1$；$\\lambda = 10$ 时约为 $e^{-0.1} : e^{-0.5} \\approx 1.5 : 1$，难样本已经常被抽到。',
        'Two examples with difficulty $1$ and $5$. At $\\lambda = 1$ the sampling ratio is about $e^{-1} : e^{-5} \\approx 55 : 1$. At $\\lambda = 10$ it is about $e^{-0.1} : e^{-0.5} \\approx 1.5 : 1$, so the hard example is drawn often.'),
      consequences: [
        b('在训练时间有限或数据有噪声时，先易后难能更快达到较好的结果。', 'With limited training time or noisy data, easy before hard reaches good results faster.'),
        b('思路与「从小处开始」相同：先在简单的输入上建立表示。', 'The idea matches starting small: build representations on simple input first.'),
      ],
      limitations: [
        b('在充分训练的标准设置中，课程排序几乎没有额外收益。', 'In fully trained standard settings, curriculum ordering gives almost no extra benefit.'),
        b('难度和进度由人设定，与生物发育中由身体和环境自然决定的顺序不同。', 'Difficulty and pacing are set by people, unlike the order that body and environment set naturally in development.'),
      ],
    },
    {
      title: b('学习率调度：可塑性随训练逐步下降', 'Learning-rate schedule: plasticity declines over training'),
      tex: t`\eta_t = \eta_{\min} + \frac{1}{2}\,(\eta_{\max} - \eta_{\min})\Big(1 + \cos\frac{\pi t}{T}\Big)`,
      symbols: [
        { tex: t`\eta_t`, meaning: b('第 $t$ 步的学习率', 'learning rate at step $t$') },
        { tex: t`\eta_{\max},\;\eta_{\min}`, meaning: b('最大和最小学习率', 'maximum and minimum learning rate') },
        { tex: t`T`, meaning: b('总训练步数', 'total training steps') },
      ],
      steps: [
        b('训练开始时学习率最大，参数变化快。', 'At the start the learning rate is largest and parameters change fast.'),
        b('学习率按余弦曲线逐渐减小。', 'The learning rate decreases along a cosine curve.'),
        b('训练结束时学习率最小，参数基本稳定，后来的数据影响很小。', 'At the end it is smallest, parameters are largely settled and later data has little effect.'),
      ],
      example: b(
        '$\\eta_{\\max} = 10^{-3}$、$\\eta_{\\min} = 10^{-5}$。训练进行到一半时 $\\eta \\approx 5 \\times 10^{-4}$，进行到九成时约 $3.4 \\times 10^{-5}$，只有开始时的约三十分之一。',
        '$\\eta_{\\max} = 10^{-3}$ and $\\eta_{\\min} = 10^{-5}$. Halfway through, $\\eta \\approx 5 \\times 10^{-4}$. At nine tenths it is about $3.4 \\times 10^{-5}$, about a thirtieth of the start.'),
      consequences: [
        b('早期的数据对结果影响更大，这与深度网络中观察到的「关键期」一致。', 'Early data shapes the outcome more, consistent with critical periods observed in deep networks.'),
        b('在功能上类似可塑性随发育下降。', 'It is functionally like plasticity declining with development.'),
      ],
      limitations: [
        b('学习率是人设定的全局参数，生物的可塑性因脑区、能力和时间而不同。', 'The learning rate is a global parameter set by people, while biological plasticity varies by area, ability and time.'),
        b('网络可以随时重设学习率重新训练，生物的关键期关闭后难以重新打开。', 'Networks can reset the learning rate and retrain at any time, while biological critical periods are hard to reopen once closed.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('错过时机难以弥补', 'Missed windows are hard to recover'),
        text: b('关键期内缺乏正常输入（如童年弱视、早期语言剥夺）造成的缺陷，成年后很难完全纠正。', 'Deficits from missing normal input during a critical period, such as childhood amblyopia or early language deprivation, are hard to fully correct in adulthood.'),
        steps: [3, 4],
      },
      {
        title: b('成年后学得更慢', 'Slower learning in adulthood'),
        text: b('关键期关闭后，学习新的语音、口音等变得困难。', 'After critical periods close, learning new speech sounds and accents becomes hard.'),
        steps: [4],
      },
      {
        title: b('依赖环境', 'Depends on surroundings'),
        text: b('发育依赖充足的感觉输入和社会互动，环境匮乏会长期影响能力。', 'Development depends on rich sensory input and social interaction, and deprived surroundings affect abilities long term.'),
        steps: [5, 6],
      },
    ],
    computational: [
      {
        title: b('课程收益有限', 'Curricula help little'),
        text: b('在充分训练的标准设置中，按难度排序几乎没有帮助，设计好的课程并不容易。', 'In fully trained standard settings, ordering by difficulty barely helps, and good curricula are hard to design.'),
        steps: [1],
      },
      {
        title: b('训练早期的问题会留下痕迹', 'Early problems leave lasting marks'),
        text: b('训练早期的数据缺陷可能永久影响网络的表现，与关键期的现象相似。', 'Defects in early training data can permanently affect a network, similar to critical periods.'),
        steps: [5],
      },
      {
        title: b('不会自己安排学习顺序', 'No self-arranged learning order'),
        text: b('模型不会根据自身状态和环境决定下一步学什么，阶段划分完全由人设计。', 'Models do not decide what to learn next from their own state and surroundings, and stages are designed entirely by people.'),
        steps: [6],
      },
    ],
    misreadings: [
      {
        claim: b('关键期过后就不能再学习', 'Nothing can be learned after a critical period'),
        fact: b('关键期后可塑性下降但没有消失，成年人仍能学习，只是在语音、双眼视觉等特定能力上更难达到早期的水平。', 'Plasticity falls after a critical period but does not vanish. Adults still learn, though specific abilities such as speech sounds and binocular vision rarely reach early levels.'),
      },
      {
        claim: b('课程学习就是让 AI 像孩子一样发育', 'Curriculum learning makes AI develop like a child'),
        fact: b('两者都利用「先易后难」，这是功能上的类比；儿童的发育顺序由身体、环境和基因共同决定，课程由人设计。', 'Both use easy before hard, a functional analogy. Body, environment and genes decide a child’s developmental order, while people design curricula.'),
      },
      {
        claim: b('训练阶段就是发育阶段', 'Training stages are developmental stages'),
        fact: b('大模型的预训练、指令微调和人类反馈强化学习是工程上的分工，与生物发育只在「顺序影响结果」上相似。', 'Pretraining, instruction tuning and reinforcement learning from human feedback are an engineering division of labor, similar to development only in that order shapes the outcome.'),
      },
    ],
  },
  refs: {
    neuro: ['wiesel1963', 'werker1984', 'kuhl2004', 'hensch2005', 'adolph2019', 'vogelsang2018'],
    models: ['elman1993'],
    ai: ['bengio2009', 'achille2017', 'wu2020', 'warstadt2023', 'ouyang2022'],
  },
}
