import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F39 Innate constraints and learning starting points: genetically and developmentally constrained initial structure vs architectural inductive biases and pretraining. */
export const INNATE_CONSTRAINTS: TopicContent = {
  thesis: {
    biological: b(
      '动物出生时就带着大量结构：小马出生几小时就能走，新生儿更喜欢注视像脸的图案，刚孵出的小鸡第一次看到物体，就形成不随视角改变的表征。这些能力来自基因编码的发育规则，而不是逐个突触的详细指定：人类基因组约 30 亿个碱基对，远不足以直接写下约 100 万亿个突触的连接。出生前的自发活动（如视网膜波）也在没有视觉经验时预先调好视觉通路。',
      'Animals are born with a great deal of structure. Foals walk within hours of birth, newborns prefer to look at face-like patterns and newly hatched chicks form view-invariant representations the first time they see an object. These abilities come from genetically encoded developmental rules, not a synapse-by-synapse specification: the human genome has about 3 billion base pairs, far too few to write down some 100 trillion synaptic connections. Spontaneous activity before birth, such as retinal waves, also tunes the visual pathway before any visual experience.'),
    computational: b(
      '网络的架构本身就是一种先验：卷积假设局部性和平移不变，图网络假设关系结构；即使不训练，卷积结构也能作为图像的先验修复噪声。预训练为下游任务提供起点，常被比作「先天」，但它其实是在海量数据上的后天学习。有研究按「基因组瓶颈」的思路，用一个很小的网络生成大网络的权重，压缩几个数量级后仍保留了大部分能力。',
      'A network’s architecture is itself a prior. Convolution assumes locality and translation invariance, and graph networks assume relational structure. Even untrained, a convolutional structure can serve as an image prior that removes noise. Pretraining gives downstream tasks a starting point and is often likened to innateness, but it is learning from vast data. Following the idea of a genomic bottleneck, one study used a small network to generate a large network’s weights and kept most of its ability after compressing by orders of magnitude.'),
    gap: b(
      '两边都为学习提供起点。区别在于来源和形式：生物的先天结构是进化长期优化、经基因组压缩后传下来的发育规则；AI 的归纳偏置由人设计，预训练则是一次大规模的个体学习。',
      'Both give learning a starting point. They differ in source and form. Biological innate structure is a set of developmental rules optimized over evolution and passed down compressed in the genome. AI inductive biases are designed by people, and pretraining is one large episode of individual learning.'),
  },
  short: { biological: b('先天结构', 'Innate structure'), computational: b('归纳偏置', 'Inductive biases') },
  kinds: ['behavior', 'implementation'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月的网络架构、预训练与相关研究方法。', 'The computational column describes network architectures, pretraining and related research methods as of October 2026.'),
  capabilities: [
    {
      lead: 'bio',
      dimension: b('未经训练就具备的能力', 'Abilities without training'),
      brain: b('小马出生几小时内能站立行走；刚孵出的小鸡第一次看到物体就能在不同视角下认出它。', 'Foals stand and walk within hours of birth, and newly hatched chicks recognize an object from new views the first time they see it.'),
      ai: b('未经训练的网络几乎什么都不会；只有少数专门搜索出的结构，在随机共享权重下也能完成简单任务。', 'Untrained networks can do almost nothing. Only a few specially searched architectures perform simple tasks with random shared weights.'),
      gap: b('生物的起点远比随机初始化的网络「有能力」。', 'The biological starting point is far more capable than a randomly initialized network.'),
    },
    {
      lead: 'bio',
      dimension: b('先验的紧凑程度', 'Compactness of the prior'),
      brain: b('约 30 亿个碱基对的基因组，为整个大脑写下发育规则，信息量不到 1 GB。', 'A genome of about 3 billion base pairs writes the developmental rules for a whole brain in under 1 GB of information.'),
      ai: b('大模型的起点是预训练得到的数千亿个参数，存储量在数百 GB 以上。', 'A large model’s starting point is hundreds of billions of pretrained parameters, hundreds of gigabytes or more.'),
      gap: b('生物的先验经过极度压缩，这可能迫使它只保留可泛化的规则。', 'The biological prior is extremely compressed, which may force it to keep only generalizable rules.'),
    },
    {
      lead: 'comp',
      dimension: b('更换先验的速度', 'Speed of changing the prior'),
      brain: b('先天结构由进化塑造，改变需要许多代。', 'Innate structure is shaped by evolution and takes many generations to change.'),
      ai: b('架构可以由人在几天内重新设计，预训练可以在几周内针对新领域重做。', 'Architectures can be redesigned in days, and pretraining redone for a new domain in weeks.'),
      gap: b('AI 能快速尝试不同的起点，这是生物做不到的。', 'AI can try different starting points quickly, which living things cannot.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('基因组：发育规则', 'Genome: developmental rules'),
        points: [b('基因组编码细胞类型、分子标记和轴突导向的规则，而不是每个连接的具体位置。', 'The genome encodes rules for cell types, molecular markers and axon guidance, not the exact position of each connection.')],
      },
      {
        title: b('发育：粗略的连接图', 'Development: a coarse wiring map'),
        points: [b('神经元分裂、迁移，轴突沿着化学浓度梯度找到目标区域，形成大致正确的连接图，例如视网膜到丘脑的大致对应。', 'Neurons divide and migrate, and axons follow chemical gradients to their target areas, forming a roughly correct wiring map, such as the coarse mapping from retina to thalamus.')],
      },
      {
        title: b('自发活动：出生前的细化', 'Spontaneous activity: refinement before birth'),
        points: [b('出生前，视网膜自发产生一波波的活动，相邻的细胞一起放电；按「一起放电就加强连接」的规则，视觉通路的地图被细化。', 'Before birth, the retina spontaneously produces waves of activity in which neighboring cells fire together. By the rule that cells firing together strengthen their connections, maps along the visual pathway are refined.')],
      },
      {
        title: b('先天的回路与偏好', 'Innate circuits and preferences'),
        points: [
          b('新生儿偏好像脸的图案，婴儿对物体、数量和空间有基本的预期（核心知识）。', 'Newborns prefer face-like patterns, and infants have basic expectations about objects, number and space, called core knowledge.'),
          b('许多动物有先天的本能回路，例如小鼠看到头顶快速扩大的阴影会逃跑。', 'Many animals have innate instinct circuits, such as mice fleeing a rapidly expanding shadow overhead.'),
        ],
      },
      {
        title: b('经验在先天框架上学习', 'Experience learns on the innate framework'),
        points: [b('出生后，经验在这个框架上调整连接；许多能力只在特定的发育时期最容易受经验塑造（见[发育阶段与学习顺序](topic:developmental-stages)）。', 'After birth, experience adjusts connections on this framework, and many abilities are most open to experience at particular developmental periods (see [developmental stages and learning order](topic:developmental-stages)).')],
      },
    ],
    computational: [
      {
        title: b('选择架构', 'Choosing an architecture'),
        points: [b('设计者选择卷积、注意力或图网络等结构，决定了网络「容易学会什么」。', 'Designers choose convolution, attention, graph networks and the like, deciding what the network learns easily.')],
      },
      {
        title: b('初始化', 'Initialization'),
        points: [b('权重按设计好的随机分布初始化，保证训练开始时信号能稳定地传过很多层。', 'Weights are initialized from designed random distributions so signals pass stably through many layers when training starts.')],
      },
      {
        title: b('预训练', 'Pretraining'),
        points: [b('在海量数据上训练，得到可用于许多下游任务的参数。', 'Training on vast data yields parameters usable for many downstream tasks.')],
      },
      {
        title: b('下游微调', 'Downstream fine-tuning'),
        points: [b('在具体任务上少量训练，从预训练的起点出发很快就能学会。', 'A little training on a specific task, starting from the pretrained point, learns quickly.')],
      },
      {
        title: b('结构搜索', 'Architecture search'),
        points: [b('也可以用自动搜索的方法找到更适合某类任务的结构，这在形式上类似进化对结构的选择。', 'Automated search can also find architectures better suited to a task family, formally like evolution selecting structure.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('缺少一个压缩的「发育程序」：AI 的起点直接存储为全部参数，而不是由少量规则生成。', 'Missing a compressed developmental program: AI starting points are stored as all their parameters rather than generated by a few rules.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('人脑约有 860 亿个神经元，突触数量估计在 100 万亿量级；人类基因组约 30 亿个碱基对，信息量约 1 GB 以内，因此基因组只能编码连接的规则。', 'The human brain has about 86 billion neurons and synapses on the order of 100 trillion. The human genome has about 3 billion base pairs, under about 1 GB of information, so it can encode only rules for connection.'),
      b('2019 年的文章提出「基因组瓶颈」观点：动物的许多能力不是学来的，而是经进化编码在基因组中；由于基因组很小，编码的必须是可压缩、可泛化的规则。这是作者的观点，有一定争议。', 'A 2019 article argued for a genomic bottleneck: many animal abilities are not learned but encoded in the genome by evolution, and since the genome is small, what it encodes must be compressible, generalizable rules. This is the author’s view and is somewhat debated.'),
      b('2013 年的实验在完全受控的视觉环境中孵化小鸡，只让它看一个物体的一个视角；小鸡在其他视角下也能认出这个物体。', 'A 2013 experiment hatched chicks in fully controlled visual environments, showing each chick only one view of one object. The chicks recognized the object from other views too.'),
      b('「核心知识」理论认为，人类婴儿天生具有几个系统，分别表示物体、动作者、数量和空间；后来的知识在这些系统的基础上建立。', 'Core knowledge theory holds that human infants have a few innate systems representing objects, agents, number and space, on which later knowledge builds.'),
      b('新生儿对像脸图案的偏好在出生后一两个月内减弱，随后由依赖经验的面孔识别系统接替。', 'Newborns’ preference for face-like patterns fades within a month or two after birth and is succeeded by an experience-dependent face recognition system.'),
    ],
    computational: [
      b('2017 年的「深度图像先验」研究发现，即使不在任何数据上训练，只用卷积网络的结构去拟合一张带噪声的图像，也能去除噪声，说明结构本身包含了关于自然图像的先验。', 'The 2017 deep image prior study found that, without training on any data, fitting a noisy image with just a convolutional network’s structure removes the noise, showing the structure itself carries a prior about natural images.'),
      b('2019 年的「权重无关网络」通过搜索结构，找到在所有连接共享同一个随机权重时也能完成简单控制任务的网络。', 'Weight agnostic networks, from 2019, searched for architectures that perform simple control tasks with every connection sharing one random weight.'),
      b('预训练被比作先天，但它是个体在海量数据上的学习，至多对下游学习起到先验的作用，不能等同于基因。', 'Pretraining is likened to innateness, but it is individual learning on vast data and at most acts as a prior for later learning. It cannot be equated with genes.'),
      b('2024 年的研究让一个小的「基因组网络」生成大网络的权重，在强化学习和图像任务上压缩了几个数量级，仍保留了大部分能力，并在迁移到新任务时有优势。', 'A 2024 study had a small genomic network generate a large network’s weights. On reinforcement learning and image tasks it compressed by orders of magnitude while keeping most of the ability, with advantages in transfer to new tasks.'),
    ],
  },
  bioMath: [
    {
      title: b('基因组瓶颈：基因组的信息量远小于写下全部连接所需', 'The genomic bottleneck: the genome holds far less than all connections need'),
      tex: t`B_{\text{genome}} \approx 2 \times 3 \times 10^{9} \approx 6 \times 10^{9}\ \text{bits},\qquad B_{\text{wiring}} \approx N_{\text{syn}}\,\log_2 N_{\text{neuron}} \approx 10^{14} \times 36 \approx 4 \times 10^{15}\ \text{bits}`,
      symbols: [
        { tex: t`B_{\text{genome}}`, meaning: b('基因组的信息量：每个碱基对有 4 种可能，即 2 比特', 'information in the genome: each base pair has 4 options, 2 bits') },
        { tex: t`N_{\text{syn}}`, meaning: b('突触数量，约 $10^{14}$', 'number of synapses, about $10^{14}$') },
        { tex: t`N_{\text{neuron}}`, meaning: b('神经元数量，约 $8.6 \\times 10^{10}$', 'number of neurons, about $8.6 \\times 10^{10}$') },
        { tex: t`\log_2 N_{\text{neuron}}`, meaning: b('指明一个突触连到哪个神经元需要的比特数，约 36', 'bits needed to say which neuron a synapse connects to, about 36') },
        { tex: t`B_{\text{wiring}}`, meaning: b('逐个写下全部连接所需的信息量', 'information needed to write down every connection') },
      ],
      steps: [
        b('计算基因组能携带多少信息：30 亿个碱基对，每个 2 比特。', 'Compute how much the genome can hold: 3 billion base pairs at 2 bits each.'),
        b('计算逐个指定连接需要多少信息：每个突触要说明它连向哪个神经元。', 'Compute what specifying each connection needs: every synapse must say which neuron it connects to.'),
        b('两者相差约六个数量级，所以基因组只能编码生成连接的规则。', 'They differ by about six orders of magnitude, so the genome can encode only rules that generate connections.'),
      ],
      example: b(
        '基因组约 $6 \\times 10^{9}$ 比特，不到 1 GB；逐个写下连接约需 $4 \\times 10^{15}$ 比特，约 500 TB。即使基因组全部用来描述连接，也只够写下约百万分之一。',
        'The genome holds about $6 \\times 10^{9}$ bits, under 1 GB. Writing out every connection needs about $4 \\times 10^{15}$ bits, about 500 TB. Even if the whole genome described connections, it could write about a millionth of them.'),
      consequences: [
        b('先天结构必须以规则的形式存在：细胞类型、导向分子、连接的统计规律。', 'Innate structure must take the form of rules: cell types, guidance molecules, statistical regularities of connection.'),
        b('这种压缩可能迫使先天结构只保留能泛化的部分，这是「基因组瓶颈」观点的核心。', 'This compression may force innate structure to keep only what generalizes, the core of the genomic bottleneck view.'),
      ],
      limitations: [
        b('这是信息量的粗略估算；基因表达、表观遗传和母体环境也会贡献信息。', 'This is a rough information estimate. Gene expression, epigenetics and the maternal environment also contribute information.'),
        b('估算说明「必须是规则」，不说明具体是哪些规则。', 'The estimate shows it must be rules, not which rules.'),
      ],
    },
    {
      title: b('出生前的自发活动：一起放电的细胞连在一起，细化地图', 'Spontaneous activity before birth: cells that fire together wire together, refining maps'),
      tex: t`\Delta w_{ij} = \eta\,\big(\langle x_i\,x_j \rangle - \bar{x}^2\big)`,
      symbols: [
        { tex: t`x_i,\;x_j`, meaning: b('目标神经元 $i$ 和视网膜细胞 $j$ 的活动', 'activity of target neuron $i$ and retinal cell $j$') },
        { tex: t`w_{ij}`, meaning: b('从输入细胞 $j$ 到目标神经元 $i$ 的连接', 'connection from input cell $j$ to target neuron $i$') },
        { tex: t`\langle x_i x_j \rangle`, meaning: b('两个细胞同时放电的平均程度', 'how often the two cells fire together on average') },
        { tex: t`\bar{x}`, meaning: b('平均活动水平', 'average activity level') },
        { tex: t`\eta`, meaning: b('学习率', 'learning rate') },
      ],
      steps: [
        b('视网膜波一次只扫过一小片区域，所以位置相邻的细胞常常一起放电，相距远的很少同时放电。', 'A retinal wave sweeps only a small patch at a time, so neighboring cells often fire together and distant ones rarely do.'),
        b('按赫布规则，一起放电高于平均水平的连接被加强，低于平均的被减弱。', 'By the Hebbian rule, connections that fire together more than average strengthen and those less than average weaken.'),
        b('结果，目标区域中的每个神经元只保留来自视网膜上一小片相邻区域的输入，形成精细的地形图。', 'As a result, each target neuron keeps input only from a small neighborhood of the retina, forming a fine topographic map.'),
      ],
      example: b(
        '目标神经元起初接收视网膜上 A、B、C 三个位置的输入，A 与 B 相邻，C 很远。视网膜波中 A 和 B 常一起放电，$\\langle x_A x_B \\rangle$ 高于平均，这两条连接被加强；C 很少与它们同步，连接逐渐减弱并被修剪。',
        'A target neuron starts with input from retinal positions A, B and C, where A and B are neighbors and C is far away. In retinal waves A and B often fire together, $\\langle x_A x_B \\rangle$ exceeds average and those connections strengthen. C rarely fires with them, so its connection weakens and is pruned.'),
      consequences: [
        b('视觉系统在眼睛睁开之前就具备了大致的地形图和部分特征选择性。', 'The visual system has rough topographic maps and some feature selectivity before the eyes ever open.'),
        b('说明「先天」与「学习」并不对立：先天结构的一部分本身就是由内部产生的活动「学」出来的。', 'It shows innate and learned are not opposites. Part of innate structure is itself learned from internally generated activity.'),
      ],
      limitations: [
        b('真实的细化还依赖分子导向信号和竞争，赫布规则只是其中一部分。', 'Real refinement also depends on molecular guidance cues and competition, and the Hebbian rule is only part of it.'),
        b('公式省略了权重的归一化，否则连接会无限增长。', 'The formula omits weight normalization, without which connections would grow without bound.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('卷积作为归纳偏置：权重共享减少需要学习的参数', 'Convolution as an inductive bias: weight sharing cuts the parameters to learn'),
      tex: t`P_{\text{full}} = (H W C_{\text{in}}) \times (H W C_{\text{out}}),\qquad P_{\text{conv}} = k^2\,C_{\text{in}}\,C_{\text{out}}`,
      symbols: [
        { tex: t`H,\;W`, meaning: b('图像的高和宽（像素）', 'image height and width in pixels') },
        { tex: t`C_{\text{in}},\;C_{\text{out}}`, meaning: b('输入和输出的通道数', 'numbers of input and output channels') },
        { tex: t`k`, meaning: b('卷积核的边长', 'side length of the kernel') },
        { tex: t`P_{\text{full}},\;P_{\text{conv}}`, meaning: b('全连接层和卷积层的参数数量', 'parameter counts of a fully connected layer and a convolution layer') },
      ],
      steps: [
        b('全连接层让每个输出像素与每个输入像素相连，参数数量随图像面积的平方增长。', 'A fully connected layer links every output pixel to every input pixel, so parameters grow with the square of image area.'),
        b('卷积层只连接邻近的像素（局部性），并在所有位置使用同一组权重（平移不变）。', 'A convolution connects only nearby pixels, locality, and uses one set of weights everywhere, translation invariance.'),
        b('这两个假设把参数减少了许多个数量级，也让网络天生倾向于学习局部、可重复出现的特征。', 'These two assumptions cut parameters by many orders of magnitude and make the network naturally favor local, repeating features.'),
      ],
      example: b(
        '$32 \\times 32$ 的图像，输入输出各 $64$ 个通道。全连接层约需 $(1024 \\times 64)^2 \\approx 4.3 \\times 10^{9}$ 个参数；$3 \\times 3$ 卷积只需 $9 \\times 64 \\times 64 \\approx 3.7 \\times 10^{4}$ 个，少了约十万倍。',
        'A $32 \\times 32$ image with $64$ channels in and out. A fully connected layer needs about $(1024 \\times 64)^2 \\approx 4.3 \\times 10^{9}$ parameters, while a $3 \\times 3$ convolution needs only $9 \\times 64 \\times 64 \\approx 3.7 \\times 10^{4}$, about a hundred thousand times fewer.'),
      consequences: [
        b('合适的先验让网络用更少的数据学好，这与先天结构减少学习负担的作用相似。', 'A fitting prior lets the network learn well from less data, much as innate structure lightens the burden of learning.'),
        b('即使不训练，卷积结构本身也偏好自然图像的规律（深度图像先验）。', 'Even untrained, the convolutional structure favors the regularities of natural images, the deep image prior.'),
      ],
      limitations: [
        b('先验由人设计，只编码了少数几条假设，远不如生物的先天结构丰富。', 'The prior is designed by people and encodes only a few assumptions, far poorer than biological innate structure.'),
        b('假设不合适时（例如需要全局关系的任务），先验反而成为限制。', 'When the assumption does not fit, as in tasks needing global relations, the prior becomes a constraint.'),
      ],
    },
    {
      title: b('基因组网络：用小网络生成大网络的权重', 'Genomic network: a small network generates a large network’s weights'),
      tex: t`w_{ij} = G_{\phi}\big(\mathbf{c}_i,\,\mathbf{c}_j\big),\qquad |\phi| \ll \#\{w_{ij}\}`,
      symbols: [
        { tex: t`\mathbf{c}_i,\;\mathbf{c}_j`, meaning: b('神经元 $i$ 和 $j$ 的「身份编码」，类似细胞的分子标记', 'identity codes of neurons $i$ and $j$, like a cell’s molecular markers') },
        { tex: t`G_{\phi}`, meaning: b('参数为 $\\phi$ 的小网络（基因组网络），由身份编码算出连接权重', 'a small network with parameters $\\phi$, the genomic network, computing weights from identity codes') },
        { tex: t`w_{ij}`, meaning: b('大网络中神经元 $j$ 到 $i$ 的权重', 'weight from neuron $j$ to $i$ in the large network') },
        { tex: t`|\phi|`, meaning: b('基因组网络的参数数量，远少于大网络的权重数', 'parameter count of the genomic network, far below the large network’s weight count') },
      ],
      steps: [
        b('给大网络中的每个神经元一个简短的身份编码。', 'Give every neuron in the large network a short identity code.'),
        b('小网络根据两个神经元的身份编码，算出它们之间的连接权重。', 'The small network computes the connection weight between two neurons from their identity codes.'),
        b('训练小网络而不是直接训练大网络的权重，使大网络完成任务；能被压缩的只有规律性的连接模式。', 'Train the small network, not the large network’s weights directly, so the large network does the task. Only regular connection patterns can be compressed this way.'),
      ],
      example: b(
        '一个有 $10^{6}$ 个权重的网络，由一个只有 $10^{3}$ 个参数的基因组网络生成，压缩一千倍。2024 年的研究用这种方法把网络压缩了几个数量级，生成的网络在未经额外学习时就保留了大部分能力，作为起点学习新任务也更快。',
        'A network with $10^{6}$ weights generated by a genomic network with only $10^{3}$ parameters is compressed a thousandfold. A 2024 study compressed networks by orders of magnitude this way, and the generated networks kept most of their ability without extra learning and learned new tasks faster from that start.'),
      consequences: [
        b('为「基因组瓶颈」提供了一个可计算的模型：压缩迫使先验只保留可泛化的规则。', 'It offers a computable model of the genomic bottleneck: compression forces the prior to keep only generalizable rules.'),
        b('与生物用分子标记和导向规则生成连接的方式在思路上相近。', 'It resembles in spirit how biology generates connections from molecular markers and guidance rules.'),
      ],
      limitations: [
        b('目前只在中小规模的任务上验证。', 'It has so far been tested only on small and medium tasks.'),
        b('身份编码和基因组网络的形式由研究者设定，与真实的分子机制差别很大。', 'The identity codes and genomic network are chosen by researchers and differ greatly from real molecular mechanisms.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('先天结构改变很慢', 'Innate structure changes slowly'),
        text: b('先天结构由进化塑造，难以适应快速变化的新环境。', 'Shaped by evolution, innate structure adapts poorly to fast-changing new environments.'),
        steps: [1],
      },
      {
        title: b('先天偏好可能出错', 'Innate biases can mislead'),
        text: b('先天的偏好和预期在现代环境中可能导致错误，例如把像脸的图案当成脸。', 'Innate preferences and expectations can mislead in modern environments, such as seeing faces in face-like patterns.'),
        steps: [4],
      },
      {
        title: b('发育异常的影响深远', 'Developmental errors have deep effects'),
        text: b('基因或早期发育的异常会影响大脑的基本结构，后天经验难以完全弥补。', 'Genetic or early developmental abnormalities affect basic brain structure, and later experience can hardly make up for them fully.'),
        steps: [2, 3],
      },
    ],
    computational: [
      {
        title: b('起点缺乏现成的能力', 'Starting points lack ready abilities'),
        text: b('随机初始化的网络几乎没有能力，必须依靠大量训练或预训练。', 'Randomly initialized networks have almost no ability and depend on heavy training or pretraining.'),
        steps: [2, 3],
      },
      {
        title: b('先验由人设计', 'Priors are designed by people'),
        text: b('架构中的假设由研究者选择，只编码少数几条规律，不合适时会限制学习。', 'Assumptions in architectures are chosen by researchers, encode only a few regularities and constrain learning when they do not fit.'),
        steps: [1],
      },
      {
        title: b('起点不紧凑', 'Starting points are not compact'),
        text: b('预训练的起点以全部参数存储，没有被压缩成可泛化的规则。', 'Pretrained starting points are stored as all their parameters rather than compressed into generalizable rules.'),
        steps: [6],
      },
    ],
    misreadings: [
      {
        claim: b('预训练就是 AI 的先天基因', 'Pretraining is AI’s innate genes'),
        fact: b('预训练是在海量数据上的个体学习，至多对下游学习起先验作用；生物的先天结构是进化优化、经基因组压缩的发育规则，两者来源和形式都不同。', 'Pretraining is individual learning on vast data and at most a prior for later learning. Biological innate structure is developmental rules optimized by evolution and compressed in the genome, different in source and form.'),
      },
      {
        claim: b('大脑出生时是一块白板', 'The brain starts as a blank slate'),
        fact: b('大脑出生时已有大量结构和偏好，许多动物生来就会走、会躲避天敌，人类婴儿也对物体、数量和面孔有先天的预期。', 'The brain is born with much structure and many preferences. Many animals walk and avoid predators from birth, and human infants have innate expectations about objects, number and faces.'),
      },
      {
        claim: b('先天的就不需要学习', 'What is innate needs no learning'),
        fact: b('先天结构常常本身就通过出生前的自发活动「学」出来，出生后又在经验中继续调整；先天与学习相互交织。', 'Innate structure is often itself learned from spontaneous activity before birth and keeps adjusting with experience afterward. The innate and the learned intertwine.'),
      },
    ],
  },
  refs: {
    neuro: ['johnson1991', 'spelke2007', 'ackman2012', 'wood2013', 'herculano2009'],
    models: ['zador2019', 'shuvaev2024'],
    ai: ['ulyanov2017', 'gaier2019', 'elsken2018', 'frankle2019'],
  },
}
