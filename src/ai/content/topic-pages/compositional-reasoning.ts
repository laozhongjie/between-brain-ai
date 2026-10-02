import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F19 Compositional and relational reasoning: human compositional reasoning vs MLC and large language models. */
export const COMPOSITIONAL_REASONING: TopicContent = {
  thesis: {
    biological: b(
      '人学会一个新词后，马上就能把它放进新的组合：知道「跳」和「两次」，就懂「跳两次」。2023 年的实验中，人只看几个例子就学会一组人造的指令规则，并在约八成的新组合上做出系统的回答。一种主流观点认为，海马与前额叶把抽象的「结构」和具体的「内容」分开表示，再在工作记忆中把内容填进结构的角色里。',
      'Once people learn a new word, they put it into new combinations at once: knowing jump and twice, they understand jump twice. In a 2023 experiment, people learned a set of invented instruction rules from a few examples and answered about eight in ten new combinations systematically. One leading view holds that the hippocampus and prefrontal cortex represent abstract structure separately from content, and working memory fills content into the roles of the structure.'),
    computational: b(
      '普通的序列模型曾在这类测试上失败：训练中只见过单独的「跳」，就不会理解「跳两次」。MLC（组合元学习）在大量规则各不相同的小任务上训练，学会从例子中推断并组合，在同一实验中达到与人相当的水平，连人的典型错误也相似。大语言模型能零样本完成许多类比题，但在需要多步组合时，准确率随步数增加明显下降。',
      'Ordinary sequence models used to fail these tests. Having seen jump only on its own in training, they could not understand jump twice. MLC, meta-learning for compositionality, trains on many small tasks whose rules all differ, learning to infer and combine from examples. In the same experiment it matched people, even in their typical errors. Large language models solve many analogy problems zero-shot, but their accuracy falls clearly as the number of composition steps grows.'),
    gap: b(
      '神经网络并非不能组合：经过合适的元训练，它能像人一样系统泛化。差距在于条件和稳定性：人从有限经历中就形成可靠的组合规则，模型的组合能力依赖训练分布，多步组合和换一种表面形式时容易失效。',
      'Neural networks are not incapable of composition. With suitable meta-training they generalize systematically like people. The gap lies in conditions and stability. People form reliable compositional rules from limited experience, while models depend on their training distribution and break with many steps or a changed surface form.'),
  },
  short: { biological: b('人', 'People'), computational: b('模型', 'Models') },
  kinds: ['behavior', 'algorithm', 'math'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月的元学习组合模型与大语言模型；具体评测结果按发表年份注明。', 'The computational column describes meta-learned compositional models and large language models as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('从几个例子组合新指令', 'Composing new instructions from a few examples'),
      brain: b('2023 年的实验中，人看几个例子学会人造词的含义和组合方式，在约八成的新组合上给出系统的回答。', 'In a 2023 experiment, people learned invented words and how they combine from a few examples and answered about eight in ten new combinations systematically.'),
      ai: b('MLC 在同一实验中达到与人相当的系统性，并重现了人的典型错误；不经元训练的普通网络做不到。', 'MLC reached human-level systematicity in the same experiment and reproduced people’s typical errors. Ordinary networks without meta-training did not.'),
      gap: b('只要训练方式合适，网络可以达到人的水平；这需要大量专门设计的元训练任务。', 'With the right training, networks reach human level, but this needs many purpose-built meta-training tasks.'),
    },
    {
      lead: 'even',
      dimension: b('类比推理', 'Analogical reasoning'),
      brain: b('人能解出字母串、数字矩阵和词语类比，换一种陌生的字母表也基本不受影响。', 'People solve letter-string, digit-matrix and word analogies, and an unfamiliar alphabet barely affects them.'),
      ai: b('2023 年的研究中，大语言模型零样本解类比题的成绩与人相当或更高；2024 年的研究发现，把字母表打乱成陌生顺序后，模型的成绩明显下降。', 'In a 2023 study, large language models solved analogies zero-shot as well as or better than people. A 2024 study found their scores dropped clearly when the alphabet was shuffled into an unfamiliar order.'),
      gap: b('在熟悉的格式上两者相当；表面形式一变，模型比人更容易失效。', 'On familiar formats the two are close. When the surface form changes, models fail more easily than people.'),
    },
    {
      lead: 'bio',
      dimension: b('组合已知事实', 'Combining known facts'),
      brain: b('知道「某人出生在哪个国家」和「该国首都是哪里」，就能回答「他出生国的首都是哪里」。', 'Knowing where someone was born and that country’s capital, people answer what the capital of their birth country is.'),
      ai: b('2022 年的研究发现，模型能分别答对两个子问题，却常答错组合后的问题，而且这个差距不随模型变大而缩小。', 'A 2022 study found models answer both sub-questions correctly yet often miss the combined question, and this gap does not shrink as models grow.'),
      gap: b('「知道各部分」不等于「能把它们组合起来」，模型在这一步上弱于人。', 'Knowing the parts is not the same as combining them, and models are weaker than people at this step.'),
    },
    {
      lead: 'bio',
      dimension: b('多步组合的稳定性', 'Stability over many steps'),
      brain: b('掌握竖式乘法的步骤后，借助纸笔可以算任意位数，错误主要来自粗心。', 'Once people know the steps of long multiplication, pencil and paper let them handle any number of digits, with errors mainly from carelessness.'),
      ai: b('2023 年的研究中，GPT-4 等模型做多位数乘法的准确率随位数增加急剧下降。', 'In a 2023 study, models such as GPT-4 lost accuracy sharply on multi-digit multiplication as the number of digits grew.'),
      gap: b('人能按规则稳定地重复许多步，模型每一步的小错误会累积。', 'People repeat a rule reliably over many steps, while models accumulate small errors at each step.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('概念的表征', 'Representing concepts'),
        points: [b('颞叶的语义区域表示单个概念，例如「跳」「两次」，每个概念对应一种分布式的放电模式。', 'Semantic areas of the temporal lobe represent single concepts such as jump and twice, each as a distributed firing pattern.')],
      },
      {
        title: b('抽象结构', 'Abstract structure'),
        points: [
          b('海马与前额叶表示与内容无关的结构，例如「动作，然后重复次数」或「谁对谁做了什么」。', 'The hippocampus and prefrontal cortex represent structure independent of content, such as an action then a repeat count, or who did what to whom.'),
          b('结构与内容分开编码，同一结构可以套用到新的内容上，原理与[认知地图](topic:cognitive-maps)相同。', 'Structure and content are coded separately, so one structure applies to new content, the same principle as in [cognitive maps](topic:cognitive-maps).'),
        ],
      },
      {
        title: b('角色与填充的绑定', 'Binding roles to fillers'),
        points: [b('前额叶的工作记忆把具体内容填入结构中的角色（「动作」位置填「跳」，「次数」位置填「两次」），形成一个临时的组合。', 'Prefrontal working memory fills content into the roles of the structure, jump into the action slot and twice into the count slot, forming a temporary combination.')],
      },
      {
        title: b('关系整合', 'Relational integration'),
        points: [b('需要同时考虑多个关系时（例如类比题），前额叶最前部的区域明显活跃，负责把几个关系合在一起比较。', 'When several relations must be considered at once, as in analogy problems, the most anterior prefrontal region becomes clearly active, putting the relations together for comparison.')],
      },
      {
        title: b('执行与检查', 'Execution and checking'),
        points: [
          b('按组合出的规则产生答案，并与例子比对检查。', 'The combined rule produces an answer, which is checked against the examples.'),
          b('工作记忆的容量限制了能同时处理的关系数，复杂问题要拆成几步。', 'Working memory capacity limits how many relations can be handled at once, so complex problems are split into steps.'),
        ],
      },
    ],
    computational: [
      {
        title: b('示例与查询', 'Examples and query'),
        points: [b('输入中先给出几条「指令与输出」的例子，再给一条新的指令。', 'The input first gives a few examples of instructions and outputs, then a new instruction.')],
      },
      {
        title: b('词元嵌入', 'Token embeddings'),
        points: [b('每个词元变成一个向量；在 MLC 中，人造词在每个任务里的含义都不同，向量本身不携带固定含义。', 'Each token becomes a vector. In MLC, invented words mean something different in each task, so the vectors carry no fixed meaning.')],
      },
      {
        title: b('注意力找出含义', 'Attention finds the meaning'),
        points: [b('Transformer 的注意力把新指令中的词与例子中的同一个词联系起来，从例子的输出中推断它的含义和组合方式。', 'Transformer attention links each word in the new instruction to the same word in the examples and infers its meaning and how it combines from their outputs.')],
      },
      {
        title: b('元训练', 'Meta-training'),
        points: [
          b('MLC 在大量小任务上训练，每个任务随机生成一套不同的「语法」。', 'MLC trains on many small tasks, each with a randomly generated grammar.'),
          b('因为不能靠记住词义得分，模型只能学会「从例子推断并组合」这一通用能力。', 'Since memorizing word meanings cannot score, the model can only learn the general skill of inferring and combining from examples.'),
        ],
      },
      {
        title: b('输出', 'Output'),
        points: [b('模型逐个输出符号，给出新指令的结果。', 'The model outputs symbols one by one as the result of the new instruction.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('没有显式的变量和规则：组合规律隐含在权重和激活中，无法直接检查，也不保证在训练分布之外成立。', 'No explicit variables or rules: compositional regularities are implicit in weights and activations, cannot be inspected directly and are not guaranteed outside the training distribution.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('「系统性」由 Fodor 和 Pylyshyn 在 1988 年提出：能理解「约翰爱玛丽」的人，必然也能理解「玛丽爱约翰」。他们据此质疑神经网络能否具备这种能力，这场争论持续了三十多年。', 'Systematicity was set out by Fodor and Pylyshyn in 1988: anyone who understands John loves Mary can understand Mary loves John. They questioned whether neural networks could have this ability, a debate that has lasted over thirty years.'),
      b('2023 年的人类实验中，人的回答也有固定的偏好：倾向于一个词对应一个输出、按词序拼接输出。这些偏好既带来系统性，也带来特定的错误。', 'In the 2023 human experiment, people’s answers had consistent biases, such as one output per word and outputs concatenated in word order. These biases bring both systematicity and characteristic errors.'),
      b('关系复杂度理论认为，人能同时处理的关系大约是四元关系，超过就要分步处理；这解释了为什么复杂推理依赖纸笔等外部工具。', 'Relational complexity theory holds that people can process about quaternary relations at once and must work in steps beyond that, which is why complex reasoning relies on external aids such as pencil and paper.'),
      b('「结构与内容分开」在海马和内嗅皮层中有直接证据（网格细胞在不同环境中保持结构），在语言和推理中的神经证据仍在积累。', 'Separating structure from content has direct evidence in the hippocampus and entorhinal cortex, where grid cells keep their structure across environments. Neural evidence in language and reasoning is still accumulating.'),
    ],
    computational: [
      b('SCAN 测试于 2018 年发表：训练中「跳」只单独出现，测试时要理解「跳两次」「绕圈跳」，当时的序列到序列网络几乎全部失败。', 'The SCAN test was published in 2018. In training, jump appeared only on its own, and the test required jump twice and jump around. Sequence-to-sequence networks of the time failed almost completely.'),
      b('MLC 的结论有边界：它的能力来自大量相关的元训练任务，不能称作从零获得，也未证明能推广到元训练分布之外的结构和完整的自然语言。', 'MLC’s result has limits. Its ability comes from many related meta-training tasks, so it is not acquired from nothing, and generalization beyond the meta-training structures or to full natural language is unproven.'),
      b('「组合差距」指模型能答对各个子问题、却答不对组合问题的比例；2022 年的研究发现，让模型先显式写出子问题再回答，可以缩小这一差距。', 'The compositionality gap is how often a model answers each sub-question correctly but misses the combined question. A 2022 study found that having the model write out the sub-questions first narrows this gap.'),
      b('多步任务中，即使每一步的正确率很高，整体正确率也会随步数相乘下降；分步推理和调用计算工具可以缓解。', 'In multi-step tasks, even a high per-step accuracy multiplies down with the number of steps. Step-by-step reasoning and calling tools help.'),
    ],
  },
  bioMath: [
    {
      title: b('张量积绑定：用向量表示「哪个内容在哪个角色上」', 'Tensor product binding: vectors for which content fills which role'),
      tex: t`S = \sum_{i} \mathbf{f}_i \otimes \mathbf{r}_i,\qquad \mathbf{f}_k = S\,\mathbf{r}_k \quad (\mathbf{r}_i \cdot \mathbf{r}_j = \delta_{ij})`,
      symbols: [
        { tex: t`\mathbf{f}_i`, meaning: b('填充者：具体内容的向量，例如「狗」', 'filler: vector of a specific content, such as dog') },
        { tex: t`\mathbf{r}_i`, meaning: b('角色：结构位置的向量，例如「施事者」', 'role: vector of a structural slot, such as agent') },
        { tex: t`\otimes`, meaning: b('外积：把两个向量组合成一个矩阵', 'outer product: combines two vectors into a matrix') },
        { tex: t`S`, meaning: b('整个结构的表示：所有绑定之和', 'representation of the whole structure: the sum of all bindings') },
        { tex: t`\delta_{ij}`, meaning: b('$i = j$ 时为 $1$，否则为 $0$：各角色向量互相正交', '$1$ when $i = j$ and $0$ otherwise: role vectors are orthogonal') },
      ],
      steps: [
        b('每个内容与它所在的角色做外积，得到一个「绑定」。', 'Take the outer product of each content with its role to get a binding.'),
        b('把所有绑定加起来，就是整句话或整个结构的表示。', 'Add all bindings to represent the whole sentence or structure.'),
        b('要取出某个角色上的内容，用这个角色向量去乘：因为角色互相正交，其他绑定都变成 $0$。', 'To read the content of a role, multiply by that role vector. Because roles are orthogonal, all other bindings vanish.'),
      ],
      example: b(
        '「狗追猫」：施事者 $\\mathbf{r}_1 = (1, 0)$，受事者 $\\mathbf{r}_2 = (0, 1)$。记「狗」为 $\\mathbf{f}_1$、「猫」为 $\\mathbf{f}_2$，则 $S = \\mathbf{f}_1 \\otimes \\mathbf{r}_1 + \\mathbf{f}_2 \\otimes \\mathbf{r}_2$。用 $\\mathbf{r}_1$ 去乘得到 $\\mathbf{f}_1$，即「狗」。换成「猫追狗」，只需交换填充者，同一套角色向量照样适用。',
        'Dog chases cat: agent $\\mathbf{r}_1 = (1, 0)$ and patient $\\mathbf{r}_2 = (0, 1)$. With dog as $\\mathbf{f}_1$ and cat as $\\mathbf{f}_2$, $S = \\mathbf{f}_1 \\otimes \\mathbf{r}_1 + \\mathbf{f}_2 \\otimes \\mathbf{r}_2$. Multiplying by $\\mathbf{r}_1$ gives $\\mathbf{f}_1$, the dog. For cat chases dog, just swap the fillers, and the same role vectors still work.'),
      consequences: [
        b('用连续的向量就能精确表示和拆开符号结构，说明系统性在原理上可以由神经活动实现。', 'Continuous vectors can represent and take apart symbolic structures exactly, so systematicity can in principle be realized in neural activity.'),
        b('任何内容都能填入任何角色，所以从未见过的组合也能被表示。', 'Any content fits any role, so combinations never seen can still be represented.'),
      ],
      limitations: [
        b('表示的维度随角色和内容的维度相乘增长，嵌套结构会很快变大。', 'The size grows with the product of role and content dimensions, so nested structures grow quickly.'),
        b('这是一个理论模型，大脑是否用这种方式绑定尚无直接证据。', 'It is a theoretical model, and there is no direct evidence that the brain binds this way.'),
      ],
    },
    {
      title: b('贝叶斯规则学习：从几个例子中选出最简单的解释', 'Bayesian rule learning: choosing the simplest explanation of a few examples'),
      tex: t`P(h \mid D) \propto P(D \mid h)\,P(h),\qquad P(h) \propto 2^{-\ell(h)},\qquad P(D \mid h) = \prod_{d \in D} \frac{1}{|h|}`,
      symbols: [
        { tex: t`h`, meaning: b('一个候选规则（假设）', 'a candidate rule, a hypothesis') },
        { tex: t`D`, meaning: b('看到的例子', 'the examples seen') },
        { tex: t`\ell(h)`, meaning: b('写出这条规则需要的长度：越短越简单', 'length needed to write the rule: shorter is simpler') },
        { tex: t`|h|`, meaning: b('规则允许的情况有多少：越窄越具体', 'how many cases the rule allows: narrower is more specific') },
        { tex: t`P(h \mid D)`, meaning: b('看到例子后，相信这条规则的程度', 'belief in the rule after seeing the examples') },
      ],
      steps: [
        b('列出能解释例子的候选规则。', 'List candidate rules that explain the examples.'),
        b('先验偏好简单的规则：每多一个符号，先验减半。', 'The prior favors simple rules, halving with each extra symbol.'),
        b('似然偏好具体的规则：规则允许的情况越少，例子恰好落在其中就越说明问题，这叫「大小原则」。', 'The likelihood favors specific rules. The fewer cases a rule allows, the more telling it is that the examples fall inside, called the size principle.'),
      ],
      example: b(
        '看到 16、8、2、64 这几个数属于某个概念。「2 的幂」在 1 到 100 中只有 7 个数，「偶数」有 50 个。四个例子下，似然之比为 $(1/7)^4 : (1/50)^4 \\approx 2600 : 1$，所以尽管两条规则都一样简单，人和模型都会倾向「2 的幂」。',
        'The numbers 16, 8, 2 and 64 belong to some concept. Powers of two cover 7 numbers between 1 and 100, even numbers 50. With four examples the likelihood ratio is $(1/7)^4 : (1/50)^4 \\approx 2600 : 1$, so although both rules are equally simple, people and the model both favor powers of two.'),
      consequences: [
        b('解释了人为什么能从很少的例子中归纳出具体而正确的规则。', 'It explains how people induce specific, correct rules from very few examples.'),
        b('候选规则本身是可组合的程序，所以学到的规则可以直接用在新的组合上。', 'Candidate rules are themselves composable programs, so learned rules apply directly to new combinations.'),
      ],
      limitations: [
        b('候选规则的空间很大，精确计算不可行，大脑怎样近似这一计算仍不清楚。', 'The space of candidate rules is huge, exact computation is infeasible and how the brain approximates it is unclear.'),
        b('规则的「长度」依赖所选的表示语言，不同的语言给出不同的先验。', 'A rule’s length depends on the chosen representation language, and different languages give different priors.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('组合元学习：在许多不同的语法上训练「从例子推断」', 'Meta-learning for compositionality: training to infer from examples across many grammars'),
      tex: t`\theta^{*} = \arg\min_{\theta}\; \mathbb{E}_{G \sim p(G)}\;\mathbb{E}_{(D,\,q,\,y) \sim G}\big[-\log p_{\theta}(y \mid q, D)\big]`,
      symbols: [
        { tex: t`G`, meaning: b('一套随机生成的语法：人造词的含义和组合规则', 'a randomly generated grammar: meanings of invented words and their combination rules') },
        { tex: t`p(G)`, meaning: b('语法的分布，每个训练任务从中抽取一套', 'distribution over grammars, one drawn per training task') },
        { tex: t`D`, meaning: b('这套语法下的几个例子', 'a few examples under this grammar') },
        { tex: t`q,\;y`, meaning: b('一条新指令和它的正确输出', 'a new instruction and its correct output') },
        { tex: t`p_{\theta}`, meaning: b('参数为 $\\theta$ 的 Transformer 给出的输出概率', 'output probability from a transformer with parameters $\\theta$') },
      ],
      steps: [
        b('每个训练任务先随机抽一套语法，再按它生成几个例子和一条新指令。', 'Each training task draws a grammar at random, then generates a few examples and a new instruction from it.'),
        b('模型读入例子和新指令，输出答案；损失是正确答案概率的负对数。', 'The model reads the examples and instruction and outputs an answer, with loss the negative log probability of the correct answer.'),
        b('对所有语法求平均并最小化。由于词义每次都变，模型唯一能学会的就是「从例子推断再组合」。', 'Average over grammars and minimize. Since word meanings change every time, the only thing to learn is inferring from examples and then combining.'),
      ],
      example: b(
        '任务 1 中「dax」表示红圈、「fep」表示重复三次；任务 2 中「dax」表示蓝点、「fep」表示前后翻转。模型无法记住「dax」的含义，只能每次从例子中读出，再按例子中的组合方式回答「dax fep」。',
        'In task 1, dax means a red circle and fep means repeat three times. In task 2, dax means a blue dot and fep means reverse. The model cannot memorize dax and must read its meaning from the examples each time, then answer dax fep following how the examples combine.'),
      consequences: [
        b('普通的 Transformer 经过这样的训练，在人类实验中达到人的系统性水平。', 'An ordinary transformer trained this way reaches human-level systematicity in the human experiment.'),
        b('如果训练数据中混入人的回答，模型也学会了人的偏好和典型错误。', 'When human answers are mixed into training, the model also learns human biases and typical errors.'),
      ],
      limitations: [
        b('能力限于元训练中出现过的那类结构；更复杂的结构和完整的自然语言未经验证。', 'Ability is limited to the kinds of structure seen in meta-training. More complex structures and full natural language are unverified.'),
        b('元训练任务需要人专门设计，规模远超人类学习这类规则所需的经验。', 'Meta-training tasks must be designed by people and far exceed the experience humans need for such rules.'),
      ],
    },
    {
      title: b('多步组合的误差累积：每步都对，整体也可能错', 'Error accumulation over many steps: right at each step, wrong overall'),
      tex: t`P_{\text{correct}} = p^{\,k}`,
      symbols: [
        { tex: t`p`, meaning: b('单个步骤的正确率', 'accuracy of a single step') },
        { tex: t`k`, meaning: b('完成任务需要的步骤数', 'number of steps the task needs') },
        { tex: t`P_{\text{correct}}`, meaning: b('全部 $k$ 步都做对的概率', 'probability that all $k$ steps are right') },
      ],
      steps: [
        b('把多步任务看成 $k$ 个依次进行的步骤，每一步都要做对。', 'Treat a multi-step task as $k$ steps in a row, each of which must be right.'),
        b('若各步的错误相互独立，整体正确率等于各步正确率相乘。', 'If errors are independent across steps, overall accuracy is the product of the step accuracies.'),
        b('步数增加时，整体正确率指数下降。', 'As steps increase, overall accuracy falls exponentially.'),
      ],
      example: b(
        '单步正确率 $p = 0.95$。3 步时整体为 $0.95^3 \\approx 0.86$；10 步时为 $0.95^{10} \\approx 0.60$；20 步时只有 $0.95^{20} \\approx 0.36$。多位数乘法的步数随位数快速增加，所以准确率急剧下降。',
        'With per-step accuracy $p = 0.95$: 3 steps give $0.95^3 \\approx 0.86$, 10 steps $0.95^{10} \\approx 0.60$ and 20 steps only $0.95^{20} \\approx 0.36$. Multi-digit multiplication needs many more steps as digits grow, so accuracy falls sharply.'),
      consequences: [
        b('解释了模型在「各部分都会、组合起来出错」时的表现。', 'It explains how models err on combinations even when they handle each part.'),
        b('也说明了提高单步可靠性、在中途检查或调用精确工具（如计算器）的价值。', 'It also shows the value of raising per-step reliability, checking along the way and calling exact tools such as a calculator.'),
      ],
      limitations: [
        b('真实的错误并不独立：模型可能在某类步骤上系统性出错，也可能在中途自我纠正。', 'Real errors are not independent. Models may err systematically on some kinds of steps or correct themselves along the way.'),
        b('人在多步任务中同样会累积错误，区别在于人能按明确的规则检查每一步。', 'People also accumulate errors over many steps. The difference is that people can check each step against an explicit rule.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('同时处理的关系有限', 'Few relations at once'),
        text: b('同时考虑的关系超过约四个就容易出错，复杂推理要拆成几步或借助纸笔。', 'Beyond about four relations at once, errors become likely, so complex reasoning is split into steps or done on paper.'),
        steps: [4, 5],
      },
      {
        title: b('有系统性的偏好与错误', 'Systematic biases and errors'),
        text: b('人倾向于一个词对应一个结果、按词序拼接，在不符合这些偏好的规则上会犯典型错误。', 'People favor one result per word and concatenation in word order, and make typical errors on rules that break these biases.'),
        steps: [3],
      },
      {
        title: b('依赖已有知识', 'Relies on prior knowledge'),
        text: b('在完全陌生、与日常经验无关的抽象规则上，人的推理也会明显变慢、变差。', 'On abstract rules unrelated to everyday experience, human reasoning also becomes clearly slower and worse.'),
        steps: [2],
      },
    ],
    computational: [
      {
        title: b('依赖训练分布', 'Bound to the training distribution'),
        text: b('MLC 的系统性来自专门设计的元训练任务，超出这类结构后未经验证。', 'MLC’s systematicity comes from purpose-built meta-training tasks and is unverified beyond those structures.'),
        steps: [4],
      },
      {
        title: b('表面形式一变就失效', 'Fails when the surface changes'),
        text: b('2024 年的研究中，把字母表打乱成陌生顺序后，大语言模型的类比成绩明显下降，人则基本不受影响。', 'In a 2024 study, shuffling the alphabet into an unfamiliar order clearly lowered large language models’ analogy scores, while people were barely affected.'),
        steps: [2, 3],
      },
      {
        title: b('多步组合误差累积', 'Errors compound over steps'),
        text: b('能答对各个子问题，却答错组合问题；步数越多，准确率下降越快。', 'Models answer each sub-question correctly yet miss the combination, and accuracy falls faster with more steps.'),
        steps: [6],
      },
    ],
    misreadings: [
      {
        claim: b('神经网络不能组合，只会统计匹配', 'Neural networks cannot compose, only match statistics'),
        fact: b('经过合适的元训练，神经网络在人类组合泛化实验中达到了人的水平；它的局限在于依赖训练分布，而不是原理上做不到。', 'With suitable meta-training, a neural network reached human level in a human compositional generalization experiment. Its limit is reliance on the training distribution, not impossibility in principle.'),
        source: b('1988 年 Fodor 和 Pylyshyn 提出的论证，此后争论了三十多年。', 'An argument made by Fodor and Pylyshyn in 1988 and debated for more than thirty years since.'),
      },
      {
        claim: b('AI 已经解决了组合泛化', 'AI has solved compositional generalization'),
        fact: b('成功限于特定的元训练设定；大语言模型在多步组合和换了表面形式的题目上仍明显弱于人。', 'Success is limited to specific meta-training settings. Large language models remain clearly weaker than people on multi-step composition and on problems with a changed surface form.'),
      },
      {
        claim: b('类比测试成绩高，说明推理方式与人相同', 'High analogy scores mean the same reasoning as people'),
        fact: b('成绩相近只说明结果相近；换成陌生的形式后模型成绩下降而人不受影响，说明两者的过程不同。', 'Similar scores show similar results only. Model scores drop on unfamiliar forms while people are unaffected, showing the processes differ.'),
        source: b('2023 年一篇论文报告大语言模型出现了「涌现的类比推理」。', 'A 2023 paper reported “emergent analogical reasoning in large language models”.'),
      },
    ],
  },
  refs: {
    neuro: ['fodor1988', 'halford1998', 'christoff2001', 'lake2023'],
    models: ['smolensky1990', 'tenenbaum2011', 'lake2017'],
    ai: ['lake2018', 'press2022', 'dziri2023', 'webb2023', 'lewis2024'],
  },
}
