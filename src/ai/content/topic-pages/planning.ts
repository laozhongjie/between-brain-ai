import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F20 Planning and prospective simulation: hippocampal preplay and prefrontal planning vs search and learned planning. */
export const PLANNING: TopicContent = {
  thesis: {
    biological: b(
      '大鼠在岔路口停顿时，海马位置细胞会在一两百毫秒内快速「扫过」前方可能的路径；休息时的回放也会描绘通向已知目标、甚至从未走过的路线。前额叶评估这些预演并选择行动。人能规划，但深度有限，会剪掉看起来不好的分支，专家比新手看得更深。2026 年的一篇综述认为，规划不只是在决策时展开搜索树，离线回放和预测性表征也承担了规划的工作。',
      'When a rat pauses at a fork, hippocampal place cells sweep quickly along possible paths ahead within one or two hundred milliseconds. Replay at rest also traces routes to known goals, even ones never taken. Prefrontal cortex evaluates these previews and chooses. People plan with limited depth, pruning branches that look bad, and experts look deeper than novices. A 2026 review argues that planning is not only expanding a search tree at decision time. Offline replay and predictive representations also do planning work.'),
    computational: b(
      '蒙特卡洛树搜索在每一步模拟数百到数万条后续走法，用神经网络评估局面来引导搜索，AlphaZero 和 MuZero 以此在围棋和国际象棋上远超人类。大语言模型在经典规划任务上曾表现很差；2024 年的推理模型明显改进，但把物体名称换成无意义的词、或问题变长时，成功率明显下降。',
      'Monte Carlo tree search simulates hundreds to tens of thousands of continuations per move and uses a neural network to evaluate positions and guide the search. AlphaZero and MuZero used it to far surpass people at Go and chess. Large language models did poorly on classic planning tasks. Reasoning models in 2024 improved clearly, but success dropped when object names were replaced by meaningless words or problems grew longer.'),
    gap: b(
      '在规则明确的棋类中，机器的搜索深度和广度远超人；在开放的日常环境中，人依靠抽象、剪枝和可复用的结构，用很少的计算就能规划。大语言模型的规划在形式变化时仍不可靠。',
      'In games with clear rules, machine search far exceeds people in depth and breadth. In open everyday settings, people plan with little computation through abstraction, pruning and reusable structure. Planning by large language models remains unreliable when the form changes.'),
  },
  short: { biological: b('人', 'People'), computational: b('机器', 'Machines') },
  kinds: ['behavior', 'algorithm', 'math'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月的树搜索系统与大语言模型的规划能力；具体评测结果按发表年份注明。', 'The computational column describes tree search systems and planning by large language models as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'comp',
      dimension: b('搜索的深度与广度', 'Depth and breadth of search'),
      brain: b('人在棋类中通常只向前考虑几步，专家比新手更深，但远不及机器。', 'People usually look a few moves ahead in games. Experts look deeper than novices, but far less than machines.'),
      ai: b('AlphaZero 每走一步模拟数百条以上的后续变化，在围棋、国际象棋和将棋上超过最强的人类和程序。', 'AlphaZero simulates hundreds of continuations or more per move and surpassed the strongest people and programs at Go, chess and shogi.'),
      gap: b('在规则明确、可以精确模拟的环境中，机器的规划能力远超人。', 'Where rules are clear and simulation is exact, machine planning far exceeds people.'),
    },
    {
      lead: 'bio',
      dimension: b('开放任务中的规划', 'Planning in open tasks'),
      brain: b('人能为从没做过的多步任务制定计划，例如第一次在陌生城市安排一天的行程。', 'People plan multi-step tasks they have never done, such as arranging a first day in an unfamiliar city.'),
      ai: b('2024 年的测试中，推理模型在积木堆叠类规划题上明显改进，但物体名称换成无意义的词或步骤变多时，成功率明显下降。', 'In 2024 tests, reasoning models improved clearly on block-stacking planning problems, but success dropped markedly when object names became meaningless words or more steps were needed.'),
      gap: b('模型的规划依赖题目的表面形式，人的规划依赖对任务结构的理解。', 'Model planning depends on the surface form of problems, human planning on understanding task structure.'),
    },
    {
      lead: 'even',
      dimension: b('目标改变时重新规划', 'Replanning when goals change'),
      brain: b('奖赏或目标改变后，人能立刻改变选择，而不必重新经历一遍（基于模型的决策）。', 'When rewards or goals change, people change their choices at once without experiencing everything again, called model-based choice.'),
      ai: b('树搜索每一步都重新规划，目标改变后下一步就会调整；只靠缓存策略的系统则做不到。', 'Tree search replans at every step, so it adjusts at the next move after a goal changes. Systems that rely only on a cached policy cannot.'),
      gap: b('有模型、会搜索的系统和人一样能立刻重新规划。', 'Systems with a model and search replan at once, as people do.'),
    },
    {
      lead: 'bio',
      dimension: b('计算的经济性', 'Economy of computation'),
      brain: b('人会剪掉看起来糟糕的分支，只考虑少数几条路线，用很少的计算得到够好的计划。', 'People prune branches that look bad and consider only a few routes, getting good-enough plans with little computation.'),
      ai: b('树搜索靠大量模拟取胜，计算量随搜索深度迅速增长。', 'Tree search wins through massive simulation, and computation grows quickly with depth.'),
      gap: b('人用更少的计算换取够好的结果；机器用更多的计算换取更优的结果。', 'People trade computation for good-enough results, while machines trade more computation for better ones.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('当前位置与目标', 'Current place and goal'),
        points: [b('海马表示当前的位置或状态，前额叶在工作记忆中保持目标。', 'The hippocampus represents the current place or state, and prefrontal cortex holds the goal in working memory.')],
      },
      {
        title: b('海马预演', 'Hippocampal preview'),
        points: [
          b('在岔路口，每个约 125 毫秒的节律周期中，位置细胞依次放电，快速扫过前方的一条可能路径，下一个周期可能换另一条。', 'At a fork, in each rhythm cycle of about 125 ms, place cells fire in sequence and sweep along one possible path ahead, possibly another path in the next cycle.'),
          b('休息时，涟漪中的序列也会描绘通向已知目标的路线。', 'At rest, sequences in ripples also trace routes toward known goals.'),
        ],
      },
      {
        title: b('评估', 'Evaluation'),
        points: [b('眶额皮层和腹侧纹状体评估每条预演路径的预期价值。', 'Orbitofrontal cortex and ventral striatum evaluate the expected value of each previewed path.')],
      },
      {
        title: b('前额叶选择与剪枝', 'Prefrontal choice and pruning'),
        points: [
          b('前额叶比较各条路径，选出动作序列；看起来很糟的分支被提前放弃，不再往下想。', 'Prefrontal cortex compares the paths and chooses a sequence of actions. Branches that look very bad are dropped early and not explored further.'),
          b('前额叶损伤的病人在需要多步规划的任务（如移动圆盘到目标排列）上明显困难。', 'Patients with prefrontal damage struggle clearly on tasks needing multi-step planning, such as moving disks into a target arrangement.'),
        ],
      },
      {
        title: b('与习惯竞争', 'Competition with habits'),
        points: [b('背外侧纹状体存有不需要规划的习惯动作；时间紧、环境熟悉时习惯占主导，情况新、不确定时规划占主导。', 'The dorsolateral striatum stores habits that need no planning. Under time pressure in familiar settings, habits dominate. In new, uncertain ones, planning dominates.')],
      },
      {
        title: b('离线规划', 'Offline planning'),
        points: [b('休息和睡眠中的回放可以预先算好有用的路线，把结果「缓存」进策略，下次决策时不必再从头搜索。', 'Replay during rest and sleep can work out useful routes in advance and cache the results in the policy, so the next decision needs no search from scratch.')],
      },
    ],
    computational: [
      {
        title: b('网络评估当前局面', 'Network evaluates the position'),
        points: [b('神经网络读入当前局面，输出每个走法的先验概率（策略）和对局面胜率的估计（价值）。', 'A neural network reads the position and outputs prior probabilities for each move, the policy, and an estimate of winning, the value.')],
      },
      {
        title: b('沿树选择', 'Selecting down the tree'),
        points: [b('从根节点出发，每一层按「价值高、先验高、还没怎么试过」的综合分数选一个分支往下走。', 'From the root, each level picks the branch with the best combined score of high value, high prior and few visits so far.')],
      },
      {
        title: b('扩展与评估叶节点', 'Expanding and evaluating a leaf'),
        points: [b('到达树的边缘时，用网络评估这个新局面，不需要一直下到终局。', 'At the edge of the tree, the network evaluates the new position without playing to the end.')],
      },
      {
        title: b('回传', 'Backup'),
        points: [b('把评估值沿走过的路径向上传，更新每个节点的平均价值和访问次数。', 'The evaluation is passed back up the path, updating each node’s average value and visit count.')],
      },
      {
        title: b('选择走法并学习', 'Choosing a move and learning'),
        points: [
          b('重复数百次后，选访问次数最多的走法。', 'After hundreds of repetitions, the most visited move is chosen.'),
          b('自我对弈中，搜索结果又用来训练网络，让下一次的先验和评估更准。', 'In self-play, search results train the network, making the next priors and evaluations more accurate.'),
        ],
      },
      {
        title: b('缺失的一步：大语言模型的状态检查', 'The missing step: state checking in language models'),
        points: [b('大语言模型用文字逐步写出计划，但没有外部模型时，不会可靠地检查每一步之后的状态是否合法，错误会被带到后面的步骤。', 'Large language models write plans step by step in text but, without an external model, do not reliably check whether the state after each step is valid, so errors carry forward.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('决策点的「前向扫描」于 2007 年在大鼠 CA3 中被记录：大鼠在岔路口停顿时，海马活动交替指向两条可能的路线。', 'Forward sweeps at decision points were recorded in rat CA3 in 2007. When the rat paused at a fork, hippocampal activity alternately pointed down the two possible routes.'),
      b('2013 年的实验中，大鼠在开阔场地中寻找已记住的奖赏位置，出发前的海马序列描绘了通往目标的路径，包括从未走过的路径。', 'In a 2013 experiment, rats searching an open arena for a remembered reward showed hippocampal sequences before setting off that traced paths to the goal, including paths never taken.'),
      b('2012 年的研究发现，人在多步决策中遇到大损失的分支时，会倾向直接放弃整条分支，即使这样偶尔会错过更好的结果。', 'A 2012 study found that in multi-step decisions, people tend to abandon a whole branch after a large loss, even when this occasionally misses a better outcome.'),
      b('2023 年对一种四子棋变体的研究发现，人的规划深度随专业水平提高而增加，专家看得更深，但深度仍然有限。', 'A 2023 study of a four-in-a-row variant found planning depth rises with expertise. Experts look deeper, but depth stays limited.'),
      b('基于模型与无模型（习惯）两种控制方式由不同回路支持，大脑按各自的不确定性决定由谁主导；这种分工在人类的两步决策任务中得到验证。', 'Model-based and model-free, habitual, control rely on different circuits, and the brain lets whichever is less uncertain lead. This division was confirmed in human two-step decision tasks.'),
    ],
    computational: [
      b('AlphaGo 在 2016 年击败职业围棋选手，结合了从人类棋谱学习的网络和树搜索；AlphaZero 在 2018 年只靠自我对弈学会了围棋、国际象棋和将棋。', 'AlphaGo beat a professional Go player in 2016, combining networks learned from human games with tree search. AlphaZero learned Go, chess and shogi in 2018 from self-play alone.'),
      b('MuZero 不需要知道游戏规则，而是在学到的模型中搜索，把同样的方法扩展到 Atari 游戏。', 'MuZero needs no game rules and searches in a learned model, extending the method to Atari games.'),
      b('PlanBench 等评测用积木堆叠等经典规划问题测试大语言模型；把物体和动作换成无意义名称的「神秘版」题目，用来检验模型是否依赖题目的表面形式。', 'Benchmarks such as PlanBench test large language models on classic planning problems like block stacking. Mystery versions that rename objects and actions with meaningless words test whether models rely on surface form.'),
      b('把大语言模型与外部规划器或验证器结合（模型提出方案，程序检查合法性），是目前提高规划可靠性的常见做法。', 'Pairing a large language model with an external planner or verifier, with the model proposing and a program checking validity, is a common way to make planning more reliable.'),
    ],
  },
  bioMath: [
    {
      title: b('基于模型的规划：用状态转移和奖赏推算每个选择的价值', 'Model-based planning: computing each choice’s value from transitions and rewards'),
      tex: t`Q(s, a) = R(s, a) + \gamma \sum_{s'} T(s' \mid s, a)\,\max_{a'} Q(s', a')`,
      symbols: [
        { tex: t`s,\;a`, meaning: b('当前状态和一个可选动作', 'current state and one possible action') },
        { tex: t`R(s, a)`, meaning: b('这个动作立刻带来的奖赏', 'immediate reward of the action') },
        { tex: t`T(s' \mid s, a)`, meaning: b('做了这个动作后到达状态 $s\'$ 的概率：内部模型', 'probability of reaching $s\'$ after the action: the internal model') },
        { tex: t`\gamma`, meaning: b('折扣因子', 'discount factor') },
        { tex: t`Q(s, a)`, meaning: b('在 $s$ 做 $a$ 的价值', 'value of doing $a$ in $s$') },
      ],
      steps: [
        b('对每个可选动作，用内部模型预测它会把你带到哪里。', 'For each possible action, use the internal model to predict where it leads.'),
        b('在到达的状态上，假设之后会选最好的动作，取那里的最大价值。', 'In the state reached, assume the best action will follow and take the maximum value there.'),
        b('立即奖赏加上折扣后的后续价值，就是这个动作的价值；从远处往回逐层计算。', 'Immediate reward plus discounted future value gives the action’s value, computed backward level by level.'),
      ],
      example: b(
        '两步迷宫，$\\gamma = 1$。向左先得 $0$，之后可选 $3$ 或 $1$；向右先得 $2$，之后只能得 $0$。向左的价值为 $0 + \\max(3, 1) = 3$，向右为 $2 + 0 = 2$，所以选左。若左侧后面的奖赏改为 $0$，只要更新模型中的奖赏重新计算，立刻就会改选右，不需要再走一遍。',
        'A two-step maze with $\\gamma = 1$. Left gives $0$ first, then a choice of $3$ or $1$. Right gives $2$ first, then only $0$. Left is worth $0 + \\max(3, 1) = 3$ and right $2 + 0 = 2$, so choose left. If the later rewards on the left become $0$, updating the rewards in the model and recomputing switches the choice to right at once, with no need to walk it again.'),
      consequences: [
        b('目标或奖赏改变时，只需更新模型就能立刻重新规划，这是「基于模型」的标志。', 'When goals or rewards change, updating the model is enough to replan at once, the signature of model-based control.'),
        b('海马预演可以看作在执行这种计算：沿模型展开路径并评估。', 'Hippocampal preview can be seen as running this computation, rolling out paths on the model and evaluating them.'),
      ],
      limitations: [
        b('精确计算要考虑所有分支，分支数随深度指数增长，大脑不可能全部算完。', 'Exact computation considers all branches, which grow exponentially with depth, more than the brain could compute.'),
        b('模型不准时，规划出的结果也会出错。', 'When the model is wrong, the plan is wrong too.'),
      ],
    },
    {
      title: b('剪枝：放弃看起来糟糕的分支，指数级地减少计算', 'Pruning: dropping bad-looking branches cuts computation exponentially'),
      tex: t`N_{\text{full}} = \sum_{k=1}^{d} b^{k} \approx b^{d},\qquad N_{\text{pruned}} \approx (\rho\, b)^{d}`,
      symbols: [
        { tex: t`b`, meaning: b('每一步可选的动作数（分支数）', 'number of choices per step, the branching factor') },
        { tex: t`d`, meaning: b('规划的深度（向前考虑几步）', 'planning depth, how many steps ahead') },
        { tex: t`\rho`, meaning: b('每个分支被保留、继续往下想的比例', 'share of branches kept and explored further') },
        { tex: t`N_{\text{full}},\;N_{\text{pruned}}`, meaning: b('不剪枝和剪枝时要考虑的局面数', 'number of positions to consider without and with pruning') },
      ],
      steps: [
        b('不剪枝时，每深一步，要考虑的局面数乘以 $b$。', 'Without pruning, each extra step multiplies the positions by $b$.'),
        b('如果每一层只保留比例为 $\\rho$ 的分支，每深一步只乘以 $\\rho b$。', 'If each level keeps only a share $\\rho$ of branches, each step multiplies by only $\\rho b$.'),
        b('因为是逐层相乘，剪枝的节省随深度指数增长。', 'Because it multiplies level by level, the savings grow exponentially with depth.'),
      ],
      example: b(
        '每步 3 个选择、向前想 5 步，不剪枝要考虑约 $3^5 = 243$ 个结局。每层只保留一半，变成约 $1.5^5 \\approx 7.6$ 个，计算量少了 30 多倍。代价是被剪掉的分支里偶尔藏着更好的结果。',
        'With 3 choices per step and 5 steps ahead, there are about $3^5 = 243$ outcomes without pruning. Keeping half at each level leaves about $1.5^5 \\approx 7.6$, over 30 times less computation. The cost is that pruned branches occasionally hide better outcomes.'),
      consequences: [
        b('解释了人为什么只考虑少数几条路线，也能在有限时间内做出不错的计划。', 'It explains how people consider only a few routes yet make decent plans in limited time.'),
        b('也解释了人特有的错误：一次大损失会让人放弃整条分支，错过后面的好结果。', 'It also explains a characteristic human error: one large loss makes people drop a whole branch and miss good outcomes later.'),
      ],
      limitations: [
        b('真实的剪枝不是固定比例，取决于每个分支的初步评估和情绪反应。', 'Real pruning is not a fixed share. It depends on a quick evaluation of each branch and on emotional reactions.'),
        b('公式只估计计算量，不说明怎样选出要保留的分支。', 'The formula estimates computation only, not how the kept branches are chosen.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('PUCT：在「看起来好」和「还没试过」之间选择分支', 'PUCT: choosing branches between looking good and not yet tried'),
      tex: t`a^{*} = \arg\max_{a}\Big[\,Q(s, a) + c\,P(s, a)\,\frac{\sqrt{\sum_{b} N(s, b)}}{1 + N(s, a)}\,\Big]`,
      symbols: [
        { tex: t`Q(s, a)`, meaning: b('到目前为止，走法 $a$ 的平均评估值', 'average evaluation of move $a$ so far') },
        { tex: t`P(s, a)`, meaning: b('神经网络给出的先验概率', 'prior probability from the neural network') },
        { tex: t`N(s, a)`, meaning: b('走法 $a$ 已被模拟的次数', 'number of times move $a$ has been simulated') },
        { tex: t`\sum_b N(s, b)`, meaning: b('这个局面下所有走法的总模拟次数', 'total simulations of all moves from this position') },
        { tex: t`c`, meaning: b('探索的权重', 'weight of exploration') },
      ],
      steps: [
        b('第一项是利用：已经看起来好的走法得分高。', 'The first term exploits: moves that already look good score high.'),
        b('第二项是探索：网络认为有希望、但还没怎么试过的走法得分高；试得越多，这一项越小。', 'The second term explores: moves the network finds promising but that are little tried score high, and the term shrinks as they are tried.'),
        b('每次模拟在每一层选得分最高的走法往下走。', 'Each simulation picks the highest-scoring move at every level.'),
      ],
      example: b(
        '总共模拟了 $100$ 次，取 $c = 1$。走法 A：$Q = 0.6$、$P = 0.3$、已试 $50$ 次，得分 $0.6 + 0.3 \\times 10/51 \\approx 0.66$。走法 B：$Q = 0.5$、$P = 0.4$、只试 $5$ 次，得分 $0.5 + 0.4 \\times 10/6 \\approx 1.17$。这一次会去探索 B。',
        'With $100$ simulations so far and $c = 1$: move A has $Q = 0.6$, $P = 0.3$ and $50$ visits, scoring $0.6 + 0.3 \\times 10/51 \\approx 0.66$. Move B has $Q = 0.5$, $P = 0.4$ and only $5$ visits, scoring $0.5 + 0.4 \\times 10/6 \\approx 1.17$. This time the search explores B.'),
      consequences: [
        b('搜索集中在有希望的走法上，但不会完全忽略其他走法，可以发现网络低估的好棋。', 'Search focuses on promising moves without fully ignoring others, so it can find good moves the network underrates.'),
        b('网络的先验相当于直觉，搜索相当于验证直觉，两者互相改进。', 'The network’s prior acts like intuition and the search like checking it, and each improves the other.'),
      ],
      limitations: [
        b('需要一个可以精确模拟的环境（规则或学到的模型）；开放的真实环境很难满足。', 'It needs an environment that can be simulated exactly, by rules or a learned model, which open real settings rarely allow.'),
        b('要好的结果需要大量模拟，计算成本高。', 'Good results need many simulations, at high computational cost.'),
      ],
    },
    {
      title: b('回传：用叶节点的评估更新路径上每个节点的平均价值', 'Backup: updating every node on the path with the leaf evaluation'),
      tex: t`Q(s, a) \leftarrow \frac{N(s, a)\,Q(s, a) + v}{N(s, a) + 1},\qquad N(s, a) \leftarrow N(s, a) + 1`,
      symbols: [
        { tex: t`v`, meaning: b('这次模拟在叶节点得到的评估值', 'evaluation at the leaf in this simulation') },
        { tex: t`Q(s, a)`, meaning: b('节点上的平均价值', 'average value at the node') },
        { tex: t`N(s, a)`, meaning: b('节点被访问的次数', 'visit count of the node') },
      ],
      steps: [
        b('一次模拟到达叶节点后，网络给出评估值 $v$。', 'When a simulation reaches a leaf, the network gives an evaluation $v$.'),
        b('沿着这次走过的路径往回，每个节点的平均价值都加入这个新的 $v$，访问次数加一。', 'Going back along the path, each node folds this new $v$ into its average and adds one to its count.'),
        b('（两人对弈时，每往上一层要把 $v$ 的符号翻转，因为对手的好就是自己的坏。）', '(In two-player games, flip the sign of $v$ at each level up, since the opponent’s gain is one’s loss.)'),
      ],
      example: b(
        '某节点已访问 $4$ 次，平均价值 $0.5$。这次叶节点评估为 $1.0$，更新后平均价值为 $(4 \\times 0.5 + 1.0)/5 = 0.6$，访问次数变为 $5$。',
        'A node has $4$ visits and an average value of $0.5$. This leaf evaluates to $1.0$, so the new average is $(4 \\times 0.5 + 1.0)/5 = 0.6$ and the count becomes $5$.'),
      consequences: [
        b('访问越多，平均值越稳定；最终选访问最多的走法，比选平均值最高的更可靠。', 'More visits make the average more stable, so choosing the most visited move is more reliable than the highest average.'),
        b('与大脑「预演后评估」相似，都是用模拟出的结果更新对选择的估计。', 'Like preview and evaluation in the brain, it updates the estimate of a choice with simulated outcomes.'),
      ],
      limitations: [
        b('评估值来自网络，网络在少见的局面上可能估计错误，搜索会被带偏。', 'Evaluations come from the network, which may be wrong in rare positions, misleading the search.'),
        b('每一步的搜索结果在下一步大多被丢弃，计算不能像人的离线规划那样被长期复用。', 'Most of each move’s search is discarded at the next move, so the computation is not reused long term like offline planning in people.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('规划深度有限', 'Limited depth'),
        text: b('人通常只能向前考虑几步，工作记忆容量限制了能同时保持的路径数。', 'People usually look only a few steps ahead, and working memory limits how many paths can be held at once.'),
        steps: [2, 4],
      },
      {
        title: b('剪枝会错过好结果', 'Pruning misses good outcomes'),
        text: b('遇到大损失的分支会被整条放弃，即使后面藏着更好的结果。', 'A branch with a large loss is abandoned whole, even when better outcomes lie beyond it.'),
        steps: [4],
      },
      {
        title: b('压力下回到习惯', 'Habits take over under pressure'),
        text: b('时间紧、压力大时，习惯系统主导，人容易按老办法做，即使情况已经变了。', 'Under time pressure and stress, the habit system leads and people fall back on old ways even when the situation has changed.'),
        steps: [5],
      },
    ],
    computational: [
      {
        title: b('需要可精确模拟的环境', 'Needs an exactly simulable world'),
        text: b('树搜索依赖规则或学到的模型；在开放、模糊的真实任务中难以使用。', 'Tree search relies on rules or a learned model and is hard to use in open, ambiguous real tasks.'),
        steps: [1, 3],
      },
      {
        title: b('大语言模型的规划不稳定', 'Unstable planning in language models'),
        text: b('2024 年的测试中，推理模型在名称被替换的同构题目和更长的问题上成功率明显下降。', 'In 2024 tests, reasoning models’ success dropped markedly on isomorphic problems with renamed objects and on longer problems.'),
        steps: [6],
      },
      {
        title: b('计算量大', 'Heavy computation'),
        text: b('要得到好的结果，每一步都需要大量模拟，计算量随深度迅速增长。', 'Good results need many simulations per move, and computation grows quickly with depth.'),
        steps: [2, 5],
      },
    ],
    misreadings: [
      {
        claim: b('大脑规划就是在脑中展开一棵搜索树', 'Planning in the brain is expanding a search tree'),
        fact: b('决策时的预演是规划的一部分；离线回放把结果缓存进策略、预测性表征减少逐步搜索，也承担规划的工作。', 'Previewing at decision time is part of planning. Offline replay caching results in the policy and predictive representations reducing step-by-step search also do planning work.'),
      },
      {
        claim: b('AlphaZero 会规划，所以 AI 的规划已经超过人', 'AlphaZero plans, so AI planning surpasses people'),
        fact: b('在规则明确、能精确模拟的棋类中确实远超人；在开放的日常任务中，AI 的规划仍不可靠。', 'In games with clear rules and exact simulation it far surpasses people. In open everyday tasks, AI planning remains unreliable.'),
      },
      {
        claim: b('推理模型已经学会了规划', 'Reasoning models have learned to plan'),
        fact: b('推理模型在标准规划题上明显进步，但换掉物体名称或增加步骤后成功率明显下降，说明它们仍部分依赖题目的表面形式。', 'Reasoning models improved clearly on standard planning problems, but success drops markedly with renamed objects or more steps, so they still rely partly on surface form.'),
      },
    ],
  },
  refs: {
    neuro: ['shallice1982', 'daw2005', 'daw2011', 'johnson2007', 'pfeiffer2013', 'huys2012', 'vanopheusden2023'],
    models: ['mattar2018', 'mattar2026'],
    ai: ['silver2016', 'silver2018', 'schrittwieser2020', 'valmeekam2023', 'valmeekam2024'],
  },
}
