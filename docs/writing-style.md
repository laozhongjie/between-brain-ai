# 写作规范

本文件约束网站所有用户可见文案，重点是「大脑与 AI」卡片。中文以 `tech-doc-style-chinese` 为基础，英文以 `asd-ste100` 的 STE-flavored 模式为基础。本文件与两个 skill 冲突时，以本文件为准；事实准确始终优先于任何文风规则。

## 1. 通用规则

- **禁止破折号。** 中文不用 `——`，英文不用 em dash `—`，`tests/text.test.ts` 会拦截。数值范围也不用 en dash `–`，中文写「至」或「到」，英文写 `to`。
- **不用装饰性箭头。** `↔`、`→` 不出现在正文和标题中，关系用文字写明。公式和图中表示真实信息流的箭头除外。
- **数学与符号写成 `$…$`**，由 KaTeX 渲染，不用 Unicode 拼公式。
- **不新增事实。** 改写时不补充来源没有的数字、日期、因果或结论。
- **不改变确定程度。** 「通常」「可能」「多数」等限定词是内容，不能为了简洁删掉。
- **中英文同步但不逐词翻译。** 两侧信息量与结构一致，各自用自然的表达。
- **同一概念在一张卡片内只用一个名称。** 不为避免重复替换同义词。
- 卡片正文不直接称呼读者，不用「你」或 `you`。

## 2. 中文

- **引号用「」，嵌套用『』。** 不用 “”。
- 中文与英文、数字之间加一个半角空格，例如「使用 RAG 检索」「约 20 W」。全角标点两侧不加空格。
- 使用全角标点和全角括号（）。英文原文和公式内部保持原样。
- 一句话只有一个主干。并列项超过三个时拆句，或改成列表。
- 分号只用于确实并列的两个分句，不用来串联多层意思。
- **空泛词写成具体动作。** 「协同」「联动」「对齐」「赋能」等，写出具体是谁对谁做了什么。
  - 正式术语保留，首次出现时说明含义，例如运动控制中的「闭环控制」。
  - 品牌标语豁免，例如「在心智与模型之间」。
- **术语跟随行业习惯。** 行业里通用英文缩写的，用缩写作为主称：页面首次出现写「RAG（检索增强生成）」，之后写 RAG；标题和系统名直接用缩写。行业里通用中文的，用中文。

## 3. English

- **American spelling:** modeled, modeling, organize, normalization, behavior, color, center, analyze, optimize, stabilize, labeled.
- **No Oxford comma:** "context, external memory and parameter updates".
- **Sentence case** for titles, headings and tags: "Memory and knowledge", not "Memory And Knowledge".
- **No semicolons.** Split into separate sentences.
- **Sentence length:** at most 25 words in card text. Table cells hold one short sentence.
- **Prefer active voice.** Passive voice is allowed when the actor is unknown or irrelevant, as is normal in scientific writing ("is thought to").
- **Present perfect is allowed** when it carries current relevance ("has been shown").
- **Use verbs, not nominalizations:** "binds an episode", not "the binding of an episode".
- **No noun stacks** longer than three words.
- **No marketing adjectives:** robust, powerful, seamless, cutting-edge. Give the measurement instead.
- Curly quotes “” and the apostrophe ’.

## 4. 证据与确定程度

用词必须与证据等级一致，中英文对应如下。

| 等级 | 中文 | English | 适用 |
|---|---|---|---|
| 已确立 | 「已经证实」「多项研究一致表明」 | "is established", "multiple studies show" | 有重复验证的结论 |
| 有证据 | 「有证据表明」「研究发现」 | "evidence suggests", "studies found" | 有实验支持但未成定论 |
| 有争议 | 「仍有争议」「一种主流解释认为」 | "is debated", "one leading account holds" | 存在相互竞争的解释 |
| 推测 | 「可能」「推测」 | "may", "is hypothesized" | 理论推断，缺少直接证据 |
| 功能类比 | 「功能上类似」「可以类比为」 | "is functionally similar to", "is analogous to" | 作用相近，机制未证明相同 |

不允许的写法：

- 不带范围的全称判断，例如「AI 没有元认知」「AI 完全不能」"AI lacks X"。写明具体系统、任务和条件。
- 把功能类比写成机制相同，例如「海马就是 RAG」。
- 把单项测试结果推广为总体能力，例如「AI 情商超过人类」。

## 5. AI 能力的时效

AI 的能力结论会很快过时，必须写明比较对象和时间：

- 写具体系统或模型类别，以及评测名称：「截至 2026 年 10 月，……在 X 评测中……」/ "As of October 2026, … on the X benchmark …"。
- 没有统一评测时，写清能力范围和条件，不使用没有依据的等级或百分比。

## 6. 卡片各部分

- **标题：** 由两侧具体系统名组成，例如「海马情景记忆系统」和「RAG 与外部记忆」。两个名称分开存储，分隔线由界面绘制，字符串里不拼接符号。不用「人脑」「AI」作为比较主体。系统名要短：中文不超过 10 个字左右，英文不超过 5 个词左右，保证标题在桌面端一行放下。
- **核心结论：** 两侧各写一小段（2 至 3 句），分栏并列，形成对比；另起一行写「关键差距」。不把两个系统写进同一段话。
- **架构图解：** 图中用编号标出步骤，图下正文只讲信息流：每一步用两三个分点，自然地写出传进来的是什么信号、在这个节点产生了什么作用和变化、接下来送到哪里。不加「信号」「作用」「去向」这类固定标签。字号与正文相同。
- **补充说明：** 定义、分子机制、数量规模、有争议的观点等背景信息，不放进信息流正文，而是放在每列下方的「补充说明」里，用小字、两端对齐。两列的正文和补充说明各自从同一高度开始。
- **图文一致：** 正文提到的每个结构，在图上都能找到同名的标注；图上的名称与正文用同一个词。由几个部分组成的结构（如海马包括齿状回、CA3、CA1）在图上用细框圈出并标名。说明里第一次提到抽象概念时，先交代它的物理形式（如「电脉冲」「数字向量」），再用术语。
- **交叉引用做成链接：** 提到机制条目或其他主题时，用 `[名称](card:id)` 或 `[名称](topic:id)` 写成可点击的链接，不写「见机制 M08」这样的纯文字。
- **不写大段文字：** 每个要点一行，按需要分点或分行。限制、差距、证据边界都用分点。
- **能力对照表：** 每格一句完整的话，结尾用句号。同一行的两侧比较同一件事，条件一致。
- **图注：** 先说明图中画了什么，再给一句结论，不重复正文。
- **公式：** 每个公式按以下顺序展开，篇幅不设上限：
  1. 标题：写明公式描述的是什么过程，例如「写入：赫布规则把一段经历存进 CA3 的连接」。
  2. 符号：四列表格，每行解释两个符号（符号、含义、符号、含义），字号比正文小一号。
  3. 计算过程：按步骤说明公式怎样计算。
  4. 算例：用几个数字手算一遍（适用时）。
  5. 推论：由公式能得出什么。
  6. 局限：模型做了哪些简化，与真实系统差在哪里。推论与局限左右并排。
  不使用「对应」「解释了」「不能解释」这类含义模糊或口语化的栏目名。

## 7. 术语表

同一概念全站使用同一译法。新增术语时在此登记。

| 中文 | English | 说明 |
|---|---|---|
| 海马 | hippocampus | 不写「海马体」 |
| 新皮层 | neocortex | |
| 情景记忆 | episodic memory | |
| 工作记忆 | working memory | |
| 巩固 | consolidation | |
| 回放 | replay | |
| 突触 | synapse | |
| 可塑性 | plasticity | |
| 信用分配 | credit assignment | |
| 预测误差 | prediction error | |
| 强化学习 | reinforcement learning | |
| 持续学习 | continual learning | |
| 灾难性遗忘 | catastrophic forgetting | |
| 世界模型 | world model | |
| 元认知 | metacognition | |
| 注意 | attention | 认知层面的注意 |
| 注意力机制 | attention mechanism | Transformer 中的计算机制，与认知层面的「注意」区分 |
| 上下文窗口 | context window | |
| RAG（检索增强生成） | retrieval-augmented generation (RAG) | 首次出现后写 RAG |
| 参数 | parameters | 泛指模型可训练量 |
| 权重 | weights | 专指连接强度 |

## 8. 检查

1. `npm test`：破折号、公式渲染、引用和卡片结构。
2. 中文：把单张卡片的中文文案提取为文本后运行 `python3 ~/.claude/skills/tech-doc-style-chinese/scripts/lint_copy_rules.py <文件>`。
3. 英文：把单张卡片的英文文案提取为文本后运行 `python3 ~/.claude/skills/asd-ste100/scripts/ste-lint.py --disable passive-voice <文件>`。同义词检查只在单张卡片内有意义，不要对全站文案一起运行。
4. 检查器的结果需要人工判断，不机械照改。
