import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F16 Cognitive maps and relational memory: hippocampal and entorhinal cognitive maps vs relational representations in TEM and transformers. */
export const COGNITIVE_MAPS: TopicContent = {
  thesis: {
    biological: b(
      '海马的位置细胞在动物到达特定位置时放电，内嗅皮层的网格细胞在空间中按六边形网格周期性放电，两者一起构成一张「认知地图」，支持走捷径和绕路。人类研究发现，同样的网格样编码也出现在组织抽象概念时。核心特点是结构与内容分离：同一套网格结构在不同环境中复用，位置细胞再把结构与具体内容绑定在一起。',
      'Hippocampal place cells fire when an animal reaches a particular place, and entorhinal grid cells fire periodically on a hexagonal grid across space. Together they form a cognitive map that supports shortcuts and detours. Human studies found the same grid-like code when people organize abstract concepts. The core feature is separating structure from content. One grid structure is reused across environments, and place cells bind it to specific content.'),
    computational: b(
      'TEM（Tolman–Eichenbaum 机器）把「结构」和「感觉内容」分开学习，训练后自然出现类似网格细胞和位置细胞的单元，在新环境中只走一部分就能推断其余关系。Transformer 加上按动作递推的位置编码，在数学上与 TEM 相近。训练做路径积分的循环网络中也会出现网格样单元。但通用大语言模型在需要内部地图的规划任务上（如找最短路径、绕路）表现不稳定。',
      'TEM, the Tolman–Eichenbaum machine, learns structure and sensory content separately. After training it develops units like grid and place cells and, in a new environment, infers the remaining relations after exploring only part of it. A transformer with position codes updated by actions is mathematically close to TEM. Recurrent networks trained on path integration also develop grid-like units. But general large language models are unreliable on planning tasks that need an internal map, such as shortest paths and detours.'),
    gap: b(
      '两边都能把关系结构从具体内容中分离出来并复用。差距在于：大脑的地图在一次探索中快速形成，并在空间和抽象领域中通用；TEM 这类模型证明了原理但规模很小，大模型的关系推理则多依赖语言统计，没有稳定的内部地图。',
      'Both can separate relational structure from content and reuse it. The difference is that the brain’s map forms quickly from one exploration and serves both space and abstract domains. Models such as TEM prove the principle at small scale, while large models rely mostly on language statistics for relational reasoning, without a stable internal map.'),
  },
  short: { biological: b('认知地图', 'Cognitive map'), computational: b('TEM 与 Transformer', 'TEM and transformers') },
  kinds: ['representation', 'algorithm', 'math'],
  evidence: 'established',
  asOf: b('AI 侧描述截至 2026 年 10 月的 TEM 类研究模型与通用大语言模型；具体评测结果按发表年份注明。', 'The AI column describes TEM-like research models and general large language models as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'bio',
      dimension: b('走捷径与绕路', 'Shortcuts and detours'),
      brain: b('大鼠熟悉迷宫后，原路被堵时会选择从未走过的捷径；人能在熟悉的城市中临时绕路。', 'Rats that know a maze take a never-used shortcut when the usual route is blocked, and people improvise detours in a familiar city.'),
      ai: b('2023 年的 CogEval 评测中，多个大语言模型在用文字描述的图中找最短路径、绕路时常出错，会走进死循环或编造不存在的连接。', 'In the 2023 CogEval benchmark, several large language models often failed to find shortest paths and detours in graphs described in text, looping or inventing connections that did not exist.'),
      gap: b('大脑用内部地图规划，通用语言模型缺少稳定的地图表示。', 'The brain plans on an internal map, and general language models lack a stable map representation.'),
    },
    {
      lead: 'even',
      dimension: b('把结构迁移到新环境', 'Transferring structure to new places'),
      brain: b('网格细胞的六边形结构在不同环境中保持不变，新环境的地图在几分钟内形成。', 'The hexagonal structure of grid cells stays the same across environments, and a map of a new place forms within minutes.'),
      ai: b('TEM 在新环境中只探索一部分，就能预测未走过的转移会看到什么。', 'In a new environment, TEM predicts what unvisited transitions will show after exploring only part of it.'),
      gap: b('两者都复用学到的结构；TEM 目前只在小型网格世界中验证过。', 'Both reuse learned structure. TEM has been shown only in small grid worlds so far.'),
    },
    {
      lead: 'even',
      dimension: b('路径积分', 'Path integration'),
      brain: b('在黑暗中，动物靠自身运动的速度和方向推算位置，网格细胞随之更新；误差会逐渐累积，需要地标校正。', 'In darkness, animals estimate position from their own speed and heading, and grid cells update accordingly. Errors accumulate and need landmarks to correct.'),
      ai: b('训练循环网络根据速度推算位置，网络中自发出现网格样单元，并能支持导航。', 'Recurrent networks trained to estimate position from velocity spontaneously develop grid-like units that support navigation.'),
      gap: b('同样的计算任务让两者产生了相似的表征。', 'The same computational task produced similar representations in both.'),
    },
    {
      lead: 'mixed',
      dimension: b('抽象关系的组织', 'Organizing abstract relations'),
      brain: b('学习一个二维的概念空间时，人的内嗅皮层出现网格样信号；社会关系和概念联系也以类似地图的方式组织。', 'When people learn a two-dimensional concept space, entorhinal cortex shows grid-like signals, and social and conceptual relations are organized in map-like ways.'),
      ai: b('大语言模型的内部激活中，可以线性读出地点的经纬度和事件的年份，覆盖数以万计的地点和事件。', 'From a large language model’s internal activations, the latitude and longitude of places and the years of events can be read out linearly, across tens of thousands of entries.'),
      gap: b('大脑的地图能用于灵活规划；模型存有大量关系知识，但用它规划并不可靠。', 'The brain’s map supports flexible planning. Models store vast relational knowledge but do not reliably plan with it.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('感觉与自身运动', 'Senses and self-motion'),
        points: [
          b('视觉地标、气味等感觉信息描述「这里有什么」。', 'Visual landmarks, smells and other senses describe what is here.'),
          b('前庭和本体感觉提供速度与方向，头朝向细胞报告当前朝向。', 'The vestibular system and proprioception give speed and direction, and head direction cells report the current heading.'),
        ],
      },
      {
        title: b('内侧内嗅皮层：网格细胞', 'Medial entorhinal cortex: grid cells'),
        points: [
          b('速度和方向信号推动网格细胞群体中的活动峰移动，即使在黑暗中也能推算位置（路径积分）。', 'Speed and heading move a bump of activity across the grid cell population, estimating position even in darkness, called path integration.'),
          b('网格细胞分成几个模块，网格间距从小到大约按 1.4 倍递增，组合起来能唯一表示大范围内的位置。', 'Grid cells come in modules whose spacing grows by a factor of about 1.4, and together they represent positions uniquely over large ranges.'),
        ],
      },
      {
        title: b('外侧内嗅皮层：内容', 'Lateral entorhinal cortex: content'),
        points: [b('外侧内嗅皮层传递物体和气味等「是什么」的信息。', 'Lateral entorhinal cortex carries what information, such as objects and odors.')],
      },
      {
        title: b('海马：位置细胞', 'Hippocampus: place cells'),
        points: [
          b('位置细胞把网格结构与当前的感觉内容结合起来，只在某个特定位置放电。', 'Place cells combine the grid structure with current sensory content and fire only at one particular place.'),
          b('换到新环境，位置细胞重新分配放电位置（重新映射），网格结构则保持不变。', 'In a new environment, place cells reassign their firing locations, called remapping, while the grid structure stays the same.'),
        ],
      },
      {
        title: b('用地图规划', 'Planning with the map'),
        points: [b('海马在决策前按地图预演可能的路径，结果送往前额叶选择路线；这让走捷径和绕路成为可能。', 'Before a decision, the hippocampus previews possible paths on the map and sends the results to prefrontal cortex to choose a route, which makes shortcuts and detours possible.')],
      },
      {
        title: b('抽象空间', 'Abstract spaces'),
        points: [b('同一套系统也用于组织非空间的关系，例如概念的两个特征、社会等级或事物之间的联系。', 'The same system also organizes nonspatial relations, such as two features of a concept, social hierarchy or links between things.')],
      },
    ],
    computational: [
      {
        title: b('动作与观察序列', 'Actions and observations'),
        points: [b('智能体在环境中每走一步，得到一个动作（如「向右」）和一个观察（这一格看到什么）。', 'At each step the agent gets an action, such as right, and an observation of what this cell shows.')],
      },
      {
        title: b('结构模块（类似网格细胞）', 'Structure module (grid-like)'),
        points: [
          b('根据动作更新一个抽象的位置向量：向右走一步，位置向量按「向右」的规则变化。', 'An abstract position vector updates by the action: a step right changes it by the rule for right.'),
          b('这些规则在所有环境中共享，所以学到的是空间本身的结构。', 'The rules are shared across all environments, so what is learned is the structure of space itself.'),
        ],
      },
      {
        title: b('感觉模块', 'Sensory module'),
        points: [b('把当前观察编码成一个向量，描述「这里有什么」。', 'The current observation is encoded as a vector describing what is here.')],
      },
      {
        title: b('绑定记忆（类似位置细胞）', 'Binding memory (place-like)'),
        points: [b('把「抽象位置」与「这里有什么」绑定，存进一个快速更新的记忆中，每一步写入一次。', 'Abstract position and what is here are bound and stored in a fast-updating memory, written once per step.')],
      },
      {
        title: b('预测下一步', 'Predicting the next step'),
        points: [
          b('走到一个位置时，用它的位置向量去记忆中检索，预测会看到什么；预测误差用来训练结构模块。', 'On arriving at a position, its position vector retrieves from memory to predict what will be seen, and the error trains the structure module.'),
          b('如果路径回到了走过的地方，位置向量相同，就能预测出从未经这条路走过来时会看到的东西。', 'If a path returns to a visited place, the position vector is the same, so the model predicts what it will see even when arriving by a new route.'),
        ],
      },
      {
        title: b('Transformer 的对应', 'The transformer counterpart'),
        points: [b('若 Transformer 的位置编码按动作递推，注意力就相当于用位置向量检索绑定记忆，与 TEM 在数学上相近。', 'If a transformer’s position code is updated by actions, attention acts as retrieval from the binding memory by position vector, mathematically close to TEM.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('1948 年 Tolman 提出「认知地图」：大鼠学会迷宫后，原路被封时会选择指向目标的新路线，说明它们学到的不只是一串动作。', 'Tolman proposed the cognitive map in 1948. Rats that learned a maze chose a new route pointing to the goal when the usual one was blocked, showing they had learned more than a chain of actions.'),
      b('位置细胞于 1971 年在大鼠海马中被发现，网格细胞于 2005 年在内嗅皮层中被发现；两项发现获得了 2014 年诺贝尔生理学或医学奖。', 'Place cells were found in the rat hippocampus in 1971 and grid cells in entorhinal cortex in 2005. The two discoveries shared the 2014 Nobel Prize in Physiology or Medicine.'),
      b('网格模块的间距按约 1.4 倍递增，类似用几种不同周期的「刻度」组合表示一个数，能用很少的神经元覆盖很大的范围。', 'Grid module spacing grows by about 1.4 times, like combining scales with different periods to represent a number, covering large ranges with few neurons.'),
      b('位置细胞的放电位置会随时间缓慢漂移：小鼠中隔几天记录，同一位置由不同的细胞群编码的比例逐渐增加，地图整体仍保持可用。', 'Place fields drift slowly over time. Recording mice days apart, a growing share of locations are coded by different cells, while the map as a whole stays usable.'),
      b('后继表征理论认为，位置细胞编码的不是「现在在哪里」，而是「从这里出发，将来可能到达哪里」，这能解释位置野沿常走方向拉长等现象。', 'The successor representation theory holds that place cells code not where the animal is but where it is likely to go from here. This explains why place fields stretch along frequently traveled directions.'),
    ],
    computational: [
      b('TEM 由 Whittington 等人于 2020 年提出，是一个计算模型，不是生物物理仿真；它的贡献在于说明结构与内容分离的学习能自然产生网格与位置样的表征。', 'TEM, proposed by Whittington and colleagues in 2020, is a computational model rather than a biophysical simulation. It shows that learning with structure separated from content naturally produces grid-like and place-like representations.'),
      b('2018 年的研究训练循环网络根据速度推算位置，网格样单元自发出现；加入这种单元的智能体能在迷宫中走捷径。', 'A 2018 study trained recurrent networks to estimate position from velocity, and grid-like units emerged. Agents using them could take shortcuts in mazes.'),
      b('2023 年的研究用线性探针从大语言模型的激活中读出世界各地的经纬度和历史事件的年份，说明模型内部存有类似「地图」和「时间线」的结构。', 'A 2023 study read the latitude and longitude of places worldwide and the years of historical events from a large language model’s activations with linear probes, showing internal structures like a map and a timeline.'),
      b('能读出地图坐标不等于能用地图规划：同一类模型在要求多步路径规划的评测中仍然不可靠。', 'Being able to read out map coordinates is not the same as planning with a map. The same kind of models remain unreliable on multi-step path planning benchmarks.'),
    ],
  },
  bioMath: [
    {
      title: b('网格细胞：三组平面波叠加成六边形网格', 'Grid cells: three plane waves sum to a hexagonal grid'),
      tex: t`r(\mathbf{x}) = \sum_{k=1}^{3} \cos\big(\mathbf{u}_k \cdot (\mathbf{x} - \mathbf{x}_0)\big),\qquad \mathbf{u}_k = \frac{4\pi}{\sqrt{3}\,\lambda}\,\big(\cos\theta_k,\ \sin\theta_k\big),\quad \theta_k = \theta_0 + 60^{\circ}\,k`,
      symbols: [
        { tex: t`\mathbf{x}`, meaning: b('动物所在的位置（二维）', 'the animal’s position, in two dimensions') },
        { tex: t`r(\mathbf{x})`, meaning: b('网格细胞在该位置的放电强度', 'firing of the grid cell at that position') },
        { tex: t`\mathbf{u}_k`, meaning: b('第 $k$ 组条纹的方向与密度', 'direction and density of stripe set $k$') },
        { tex: t`\lambda`, meaning: b('网格间距：相邻放电点之间的距离', 'grid spacing: distance between neighboring firing fields') },
        { tex: t`\theta_0`, meaning: b('网格的整体朝向', 'overall orientation of the grid') },
        { tex: t`\mathbf{x}_0`, meaning: b('网格的偏移：同一模块中不同细胞的放电点错开', 'grid offset: different cells in a module have shifted fields') },
      ],
      steps: [
        b('每一项是一组平行的余弦条纹，三组条纹的方向相差 60 度。', 'Each term is a set of parallel cosine stripes, and the three sets differ in direction by 60 degrees.'),
        b('三组条纹相加，只有三者同时达到波峰的地方值最大，这些点排成六边形网格。', 'Adding the three, the value peaks only where all three crest at once, and those points form a hexagonal grid.'),
        b('同一模块的细胞共享间距和朝向，只是偏移不同，合起来铺满整个空间。', 'Cells in one module share spacing and orientation and differ only in offset, together tiling the whole space.'),
      ],
      example: b(
        '设 $\\lambda = 50$ 厘米。在 $\\mathbf{x} = \\mathbf{x}_0$ 处三项都是 $1$，和为 $3$，是放电中心。沿任一网格方向移动 $50$ 厘米，又到达一个和为 $3$ 的点；而在三个相邻放电中心围成的三角形的中心，三项之和降到最低的 $-1.5$，细胞几乎不放电。',
        'Let $\\lambda = 50$ cm. At $\\mathbf{x} = \\mathbf{x}_0$ all three terms equal $1$ and sum to $3$, a field center. Moving $50$ cm along any grid direction reaches another point summing to $3$. At the center of the triangle formed by three neighboring fields the sum falls to its minimum of $-1.5$, and the cell is nearly silent.'),
      consequences: [
        b('网格是周期性的，单个模块无法区分相隔一个周期的位置；几个间距不同的模块组合，才能唯一确定位置。', 'The grid is periodic, so one module cannot tell apart places one period apart. Combining modules of different spacing pins down position uniquely.'),
        b('这种周期编码天然适合路径积分：移动只是让所有细胞的相位一起平移。', 'This periodic code suits path integration: moving just shifts the phase of every cell together.'),
      ],
      limitations: [
        b('公式描述放电图案的形状，不说明它怎样由神经回路产生；连续吸引子网络和振荡干涉是两种主要解释。', 'The formula describes the firing pattern, not how circuits produce it. Continuous attractor networks and oscillatory interference are the two main explanations.'),
        b('真实网格在不规则环境中会变形，偏离完美的六边形。', 'Real grids distort in irregular environments and depart from a perfect hexagon.'),
      ],
    },
    {
      title: b('后继表征：地图记录的是「从这里出发将来会到哪里」', 'Successor representation: the map records where you will go from here'),
      tex: t`M(s, s') = \mathbb{E}\Big[\sum_{t=0}^{\infty} \gamma^{t}\,\mathbb{1}(s_t = s') \,\Big|\, s_0 = s\Big],\qquad V(s) = \sum_{s'} M(s, s')\,R(s')`,
      symbols: [
        { tex: t`s,\;s'`, meaning: b('当前状态（位置）和另一个状态', 'the current state, a position, and another state') },
        { tex: t`M(s, s')`, meaning: b('从 $s$ 出发，将来经过 $s\'$ 的折扣次数', 'discounted number of future visits to $s\'$ starting from $s$') },
        { tex: t`\gamma`, meaning: b('折扣因子：越远的将来，权重越小', 'discount factor: the further ahead, the less weight') },
        { tex: t`\mathbb{1}(\cdot)`, meaning: b('条件成立时为 $1$，否则为 $0$', '$1$ when the condition holds, otherwise $0$') },
        { tex: t`R(s')`, meaning: b('状态 $s\'$ 的奖赏', 'reward at state $s\'$') },
        { tex: t`V(s)`, meaning: b('状态 $s$ 的价值', 'value of state $s$') },
      ],
      steps: [
        b('对每个位置，统计从它出发将来会多频繁地经过其他各个位置，越远的将来打越多折扣，得到一行数。', 'For each place, count how often each other place will be visited from it in the future, discounting the more distant future, giving one row of numbers.'),
        b('一个位置细胞对应矩阵 $M$ 的一列：它在「将来常会到达它」的那些位置放电。', 'A place cell corresponds to one column of $M$: it fires at places from which its own place is often reached.'),
        b('奖赏改变时，只要把新的奖赏与 $M$ 相乘，就能立刻算出所有位置的新价值，不必重新学习地图。', 'When rewards change, multiplying the new rewards by $M$ gives every place’s new value at once, with no need to relearn the map.'),
      ],
      example: b(
        '一条单向走廊 A、B、C，每步向前一格，取 $\\gamma = 0.5$。从 A 出发，经过 A、B、C 的折扣次数为 $1$、$0.5$、$0.25$。若奖赏放在 C，$R = (0, 0, 1)$，则 $V(\\mathrm{A}) = 0.25$、$V(\\mathrm{B}) = 0.5$、$V(\\mathrm{C}) = 1$；若奖赏改放在 B，只需重算乘积，不必重新走一遍。',
        'A one-way corridor A, B, C, one step forward each time, with $\\gamma = 0.5$. From A, the discounted visits to A, B and C are $1$, $0.5$ and $0.25$. With reward at C, $R = (0, 0, 1)$, so $V(\\mathrm{A}) = 0.25$, $V(\\mathrm{B}) = 0.5$ and $V(\\mathrm{C}) = 1$. If the reward moves to B, just recompute the product without walking the corridor again.'),
      consequences: [
        b('解释了位置野会沿着常走的方向向后拉长：常从后方到达的位置，在后方也有放电。', 'It explains why place fields stretch backward along frequently traveled directions: a place often reached from behind also gets firing behind it.'),
        b('矩阵 $M$ 的主要成分呈现出类似网格的周期图案，把位置细胞和网格细胞联系起来。', 'The main components of $M$ show grid-like periodic patterns, linking place cells and grid cells.'),
      ],
      limitations: [
        b('$M$ 依赖当前的行为方式，路线或策略改变时需要重新学习。', '$M$ depends on current behavior, so it must be relearned when routes or policies change.'),
        b('这是一种理论解释，与「位置细胞编码当前位置」的经典观点并存，二者的适用范围仍在研究。', 'It is a theoretical account alongside the classic view that place cells code current position, and their scope is still being studied.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('结构模块：按动作更新抽象位置（路径积分）', 'Structure module: updating an abstract position by action (path integration)'),
      tex: t`\mathbf{g}_t = W_{a_t}\,\mathbf{g}_{t-1}`,
      symbols: [
        { tex: t`\mathbf{g}_t`, meaning: b('第 $t$ 步的抽象位置向量', 'abstract position vector at step $t$') },
        { tex: t`a_t`, meaning: b('第 $t$ 步的动作，例如向右、向下', 'action at step $t$, such as right or down') },
        { tex: t`W_{a}`, meaning: b('动作 $a$ 对应的变换矩阵，在所有环境中共享', 'transformation matrix of action $a$, shared across all environments') },
      ],
      steps: [
        b('每走一步，用这一步动作对应的矩阵变换位置向量。', 'At each step, transform the position vector by the matrix of that action.'),
        b('矩阵在所有环境中共享，训练让它们学到空间的规律，例如「向右再向左回到原处」。', 'The matrices are shared by all environments, and training teaches them the rules of space, such as right then left returns to the start.'),
        b('因为规律相同，即使在全新的环境中，绕一圈回到起点时位置向量也会回到原值。', 'Because the rules are the same, a loop back to the start returns the position vector to its original value even in a brand new environment.'),
      ],
      example: b(
        '把位置向量取为二维坐标，向右加 $(1, 0)$，向下加 $(0, -1)$，向左加 $(-1, 0)$，向上加 $(0, 1)$。从 $(0, 0)$ 出发依次走右、下、左、上，坐标为 $(1, 0)$、$(1, -1)$、$(0, -1)$、$(0, 0)$，回到起点。模型因此「知道」这里是走过的地方，可以从绑定记忆中取出当初看到的东西。',
        'Treat the position vector as 2D coordinates: right adds $(1, 0)$, down $(0, -1)$, left $(-1, 0)$ and up $(0, 1)$. Starting at $(0, 0)$ and going right, down, left and up gives $(1, 0)$, $(1, -1)$, $(0, -1)$ and $(0, 0)$, back to the start. The model therefore knows it has been here and can retrieve what it saw from the binding memory.'),
      consequences: [
        b('学到的是与具体环境无关的空间结构，可以直接迁移到新环境。', 'What is learned is spatial structure independent of any environment, which transfers directly to new ones.'),
        b('在 TEM 中，位置向量的单元会自发出现类似网格细胞的周期放电图案。', 'In TEM, units of the position vector spontaneously show periodic firing like grid cells.'),
      ],
      limitations: [
        b('真实的路径积分会累积误差，需要感觉地标校正；简单的矩阵乘法没有噪声。', 'Real path integration accumulates error and needs landmarks to correct it, while plain matrix multiplication has no noise.'),
        b('TEM 主要在小型离散网格世界中验证，连续的大尺度环境尚未充分测试。', 'TEM was verified mainly in small discrete grid worlds, and continuous large-scale environments are not yet well tested.'),
      ],
    },
    {
      title: b('绑定与检索：用位置向量取回「那里有什么」', 'Binding and retrieval: fetching what is there by position vector'),
      tex: t`\hat{\mathbf{x}}_t = \sum_{\tau < t} \operatorname{softmax}_{\tau}\!\big(\beta\,\mathbf{g}_t \cdot \mathbf{g}_{\tau}\big)\,\mathbf{x}_{\tau}`,
      symbols: [
        { tex: t`\mathbf{g}_{\tau},\;\mathbf{x}_{\tau}`, meaning: b('第 $\\tau$ 步的抽象位置和当时看到的内容，成对存入记忆', 'abstract position and what was seen at step $\\tau$, stored as a pair') },
        { tex: t`\mathbf{g}_t`, meaning: b('当前的抽象位置，作为查询', 'current abstract position, used as the query') },
        { tex: t`\beta`, meaning: b('锐度：越大，越只取回位置最匹配的那一条', 'sharpness: the larger, the more only the best-matching entry is retrieved') },
        { tex: t`\hat{\mathbf{x}}_t`, meaning: b('预测这一步会看到的内容', 'prediction of what will be seen at this step') },
      ],
      steps: [
        b('走过的每一步都把（位置，内容）成对存入记忆。', 'Every step stores the pair of position and content in memory.'),
        b('到达新的一步时，用当前位置与所有存过的位置比较相似度。', 'At a new step, compare the current position with every stored position.'),
        b('按相似度加权取回内容，作为对这一步观察的预测。这正是 Transformer 注意力的形式：位置是键和查询，内容是值。', 'Retrieve content weighted by similarity as the prediction for this step. This is exactly the form of transformer attention: positions are keys and queries, content is the value.'),
      ],
      example: b(
        '接上例，第 1 步在 $(0, 0)$ 看到「红门」，之后经过三格回到 $(0, 0)$。此时查询与第 1 步的位置完全相同，点积最大，取回的内容就是「红门」：模型在从未沿这条路走到这里的情况下，预测出将会看到红门。',
        'Continuing the example, step 1 saw a red door at $(0, 0)$, and after three cells the agent returns to $(0, 0)$. The query now equals the step-1 position, the dot product is largest and the retrieved content is the red door. The model predicts the red door without ever having reached this place along this route.'),
      consequences: [
        b('把「结构」（位置）和「内容」（看到什么）分开存，新环境只需写入新的内容，结构直接复用。', 'Keeping structure, the positions, apart from content, what is seen, means a new environment only needs new content while the structure is reused.'),
        b('说明了按动作递推位置编码的 Transformer 与海马模型之间的数学联系。', 'It shows the mathematical link between a transformer with action-updated position codes and hippocampal models.'),
      ],
      limitations: [
        b('通用语言模型的位置编码只表示词元的先后顺序，不按空间动作递推，所以这一对应并不直接适用于它们。', 'General language models’ position codes mark only token order and are not updated by spatial actions, so this correspondence does not apply to them directly.'),
        b('数学形式相近不等于海马用注意力计算。', 'A similar mathematical form does not mean the hippocampus computes with attention.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('路径积分会累积误差', 'Path integration drifts'),
        text: b('没有地标时，靠自身运动推算的位置误差越来越大，人在黑暗或雾中容易迷失方向。', 'Without landmarks, position estimated from self-motion drifts further and further, so people lose their bearings in darkness or fog.'),
        steps: [1, 2],
      },
      {
        title: b('地图会漂移', 'Maps drift'),
        text: b('同一位置由哪些细胞编码会随时间改变，长期不去的地方，地图会变得模糊。', 'Which cells code a place changes over time, and maps of places not visited for long become vague.'),
        steps: [4],
      },
      {
        title: b('复杂关系也有上限', 'Limits with complex relations'),
        text: b('抽象关系空间中的地图样编码主要见于二维的简单结构，高维或复杂关系的组织方式尚不清楚。', 'Map-like codes in abstract spaces are seen mainly for simple two-dimensional structures, and how high-dimensional or complex relations are organized is unclear.'),
        steps: [6],
      },
    ],
    computational: [
      {
        title: b('大模型缺少稳定地图', 'No stable map in large models'),
        text: b('2023 年的 CogEval 评测中，多个大语言模型在图上规划时会走进死循环或编造连接。', 'In the 2023 CogEval benchmark, several large language models looped or invented connections when planning on graphs.'),
        steps: [6],
      },
      {
        title: b('TEM 规模很小', 'TEM is small'),
        text: b('结构与内容分离的模型目前只在小型离散环境中验证，尚未扩展到真实世界的导航和知识。', 'Models separating structure from content have been shown only in small discrete environments, not yet in real-world navigation or knowledge.'),
        steps: [2, 4],
      },
      {
        title: b('需要大量训练环境', 'Many training environments needed'),
        text: b('要学会可迁移的结构规则，需要在大量不同环境中训练，远多于动物需要的经历。', 'Learning transferable structural rules takes training on many environments, far more experience than animals need.'),
        steps: [2],
      },
    ],
    misreadings: [
      {
        claim: b('海马就是一个 Transformer', 'The hippocampus is a transformer'),
        fact: b('按动作递推位置编码的 Transformer 与 TEM 等海马模型在数学上相近；这是模型之间的联系，不说明海马用注意力计算。', 'A transformer with action-updated position codes is mathematically close to hippocampal models such as TEM. That is a link between models, not evidence that the hippocampus computes with attention.'),
        source: b('源自 2022 年一篇论文：它指出 Transformer 与海马模型在数学上相近。', 'From a 2022 paper showing that transformers are mathematically close to models of the hippocampus.'),
      },
      {
        claim: b('能读出坐标，模型就有了地图', 'Decodable coordinates mean the model has a map'),
        fact: b('从激活中能线性读出地点的坐标，说明存有这类信息；但同类模型在需要用地图做多步规划时仍不可靠。', 'Coordinates can be read out linearly from activations, so the information is stored. But such models remain unreliable when they must plan several steps on a map.'),
        source: b('2023 年的研究从大语言模型的激活中读出了地点的经纬度，论文题为「语言模型表示空间和时间」。', 'A 2023 study read latitude and longitude from LLM activations. Its title was “Language models represent space and time”.'),
      },
    ],
  },
  refs: {
    neuro: ['tolman1948', 'okeefe1971', 'hafting2005', 'stensola2012', 'ziv2013', 'constantinescu2016', 'garvert2017', 'behrens2018'],
    models: ['stachenfeld2017', 'whittington2020', 'whittington2022', 'banino2018', 'cueva2018'],
    ai: ['gurnee2023', 'momennejad2023'],
  },
}
