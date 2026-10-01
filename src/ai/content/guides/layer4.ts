import type { CardGuide } from '../../types'

const b = (zh: string, en: string) => ({ zh, en })

export const SYSTEM_GUIDES: Record<string, CardGuide> = {
  'sys-vision': {
    question: b('看清一个物体，需要一次识别还是不断观察？', 'Does recognising an object take one pass or repeated observation?'),
    answer: b('人会移动眼睛、结合上下文重新观察；标准图像分类器通常对给定图像完成一次识别。', 'People move their eyes and revisit what they see using context; a standard image classifier typically makes one prediction from a supplied image.'),
    scope: b('这里主要比较人类视觉与前馈 CNN、ViT 图像分类器。主动视觉、循环视觉和具身模型已有相关探索。', 'The main comparison is human vision versus feedforward CNN and ViT classifiers. Active, recurrent and embodied vision already explore alternatives.'),
    comparisons: [
      { dimension: b('如何获取信息', 'Acquiring information'), brain: b('通过眼动选择注视点，中央看细节，外周提供概况。', 'Eye movements select fixations; central vision captures detail while the periphery supplies context.'), ai: b('分类器通常接收固定图像；裁剪和分辨率由输入流程设定。', 'Classifiers usually receive fixed images; preprocessing sets crops and resolution.') },
      { dimension: b('看不清时怎么办', 'Handling ambiguity'), brain: b('可借助上下文、反馈和再次观察调整判断。', 'Context, feedback and another look can revise the interpretation.'), ai: b('单次前馈分类器不会自行再看一次，需额外的控制机制。', 'A single-pass classifier needs an added controller to request another observation.') },
      { dimension: b('遇到陌生变化', 'Unfamiliar variation'), brain: b('对许多自然变化有适应能力，但同样会受错觉和任务限制影响。', 'Adapts to many natural variations but is also vulnerable to illusions and task constraints.'), ai: b('鲁棒性随数据、训练方法和测试分布变化，不能由标准准确率直接判断。', 'Robustness depends on data, training and test distribution, not just standard accuracy.') },
    ],
    borrow: b('把视觉设计成“选择下一次观察”的过程：先粗看，再把有限计算用在最能消除疑问的位置。', 'Treat vision as choosing the next observation: look broadly first, then spend compute where it can resolve uncertainty.'),
    boundary: b('模型能预测某些视觉皮层响应，不等于完整复现人类视觉；主动采样是否有效必须在同等预算下验证。', 'Predicting some visual-cortex responses does not reproduce all of human vision; active sampling needs evaluation at matched budgets.'),
    experiments: [
      { title: b('低分辨率总览，加局部细看', 'Overview plus focused inspection'), change: b('先处理低分辨率全图，再让控制器选择少量高清局部区域。', 'Process a low-resolution overview, then let a controller select a few high-resolution regions.'), test: b('与整图高清推理比较小物体识别率、处理像素数和延迟。', 'Compare small-object accuracy, pixels processed and latency with full-resolution inference.'), tradeoff: b('选错注视点会漏检；选择器自身也消耗计算。', 'Bad fixations miss objects, and the selector has its own compute cost.') },
      { title: b('给遮挡场景一次修正机会', 'Refine an occluded scene'), change: b('对低置信度结果追加一轮反馈修正或另一视角。', 'Give low-confidence results one refinement pass or another view.'), test: b('在遮挡和分布变化下，对比单次模型的准确率与响应时间。', 'Compare accuracy and response time with a single-pass model under occlusion and distribution shift.'), tradeoff: b('额外计算可能强化错误先验；需允许拒答或停止。', 'Extra compute can reinforce a wrong prior; allow abstention or stopping.') },
    ],
  },
  'sys-hearing': {
    question: b('嘈杂环境中，怎样听清一个人说话？', 'How can a system follow one speaker in noise?'),
    answer: b('听觉既分解声音，也选择声源，并利用自己说话时的反馈。音频模型已能处理其中一些任务，但通常分模块训练。', 'Hearing decomposes sound, selects sources and uses feedback from speaking. Audio models handle parts of this process, often in separately trained modules.'),
    scope: b('比较人类听觉与音频识别、语音分离及语音生成系统，不把所有音频 AI 视为同一种模型。', 'Compares human hearing with audio recognition, speech separation and speech generation, rather than treating all audio AI as one model.'),
    comparisons: [
      { dimension: b('选择声源', 'Selecting a source'), brain: b('目标和上下文帮助持续跟踪感兴趣的声音。', 'Goals and context help track a sound of interest over time.'), ai: b('分离或识别模型依赖训练目标，可通过说话人信息引导。', 'Separation and recognition models follow training objectives and can use speaker conditioning.') },
      { dimension: b('听与说的联系', 'Listening while speaking'), brain: b('听到自己的声音后，可以在线调整发音。', 'Hearing one’s own voice supports online correction.'), ai: b('语音合成输出不一定回到识别器；闭环需要主动设计。', 'Synthesised speech need not feed back to a recogniser; a closed loop must be designed.') },
    ],
    borrow: b('让声源选择和输出校正随环境变化，而不是只优化一段录音的识别分数。', 'Adapt source selection and output correction to the environment, rather than only optimising recognition on a recording.'),
    boundary: b('相似的分层表示不代表相同的听觉体验，也不说明所有音频任务已被统一解决。', 'Similar hierarchical representations imply neither the same auditory experience nor a unified solution to all audio tasks.'),
    experiments: [
      { title: b('让语音系统监听自己的输出', 'Monitor generated speech'), change: b('将实际播放后录到的声音送回识别器，检测漏词或失真。', 'Feed recorded playback to a recogniser to detect missing words or distortion.'), test: b('在噪声与回声变化下比较词错误率和纠错延迟。', 'Compare word error rate and correction latency under noise and echo changes.'), tradeoff: b('回声消除和重复纠正可能增加延迟或形成循环。', 'Echo cancellation and repeated correction can add latency or create loops.') },
      { title: b('持续跟踪目标说话人', 'Track a target speaker'), change: b('保留目标声源的短时状态，并用任务提示引导分离。', 'Maintain short-term target-source state and use task cues to guide separation.'), test: b('对比无状态模型在多人交谈中丢失目标的次数。', 'Compare target loss with a stateless model in multi-speaker conversations.'), tradeoff: b('状态可能锁定错误说话人，需要重新选择机制。', 'State can lock onto the wrong speaker and needs a reset mechanism.') },
    ],
  },
  'sys-touch': {
    question: b('接触物体后，怎样知道该握紧还是松手？', 'After contact, how does a system decide to grip or release?'),
    answer: b('触觉把接触位置、压力和身体状态连起来；机器人需要把传感器读数变成及时的动作调整。', 'Touch links contact location, pressure and body state; robots must turn sensor readings into timely action adjustments.'),
    scope: b('比较人体触觉与装有触觉传感器的机器人；传感器覆盖范围和控制系统差异很大。', 'Compares human touch with tactile robots, whose sensor coverage and control systems vary widely.'),
    comparisons: [
      { dimension: b('身体地图', 'Body map'), brain: b('触觉与本体感觉共同定位身体上的接触。', 'Touch and proprioception jointly locate contact on the body.'), ai: b('需要标定传感器位置，并把触觉数据接入机器人状态估计。', 'Needs sensor calibration and integration of touch with robot-state estimation.') },
      { dimension: b('快速保护', 'Fast protection'), brain: b('部分保护反射无需等待有意识的判断。', 'Some protective reflexes act before conscious judgement.'), ai: b('可以用本地控制器和硬性限值提供快速保护。', 'Local controllers and hard limits can provide rapid protection.') },
    ],
    borrow: b('把快速安全回路与慢速任务规划分开，触觉变化先触发保护，再更新计划。', 'Separate fast safety loops from slower planning: tactile changes trigger protection before revising the plan.'),
    boundary: b('损伤检测不是主观痛苦；设计机器人保护机制无需宣称赋予它疼痛体验。', 'Damage detection is not subjective suffering; protective robot control does not require claims of pain experience.'),
    experiments: [
      { title: b('在抓取中检测滑落', 'Detect slip during grasping'), change: b('用局部触觉变化触发小幅握力修正。', 'Use local tactile changes to trigger small grip-force corrections.'), test: b('比较不同材质上的滑落次数、物体损伤和反应延迟。', 'Compare slips, object damage and reaction latency across materials.'), tradeoff: b('过敏感的阈值可能造成过度抓握。', 'Over-sensitive thresholds can cause excessive gripping.') },
      { title: b('设置独立保护回路', 'Add an independent protection loop'), change: b('让本地控制器在压力或温度超限时停止动作。', 'Let a local controller stop motion when force or temperature exceeds limits.'), test: b('在仿真中注入规划延迟，测量超限持续时间与任务完成率。', 'Inject planning delays in simulation and measure limit-violation duration and task completion.'), tradeoff: b('安全停机可能频繁打断任务，需要明确恢复条件。', 'Safety stops can interrupt tasks frequently and need clear recovery conditions.') },
    ],
  },
  'sys-motor': {
    question: b('动作已经开始，如何及时纠正偏差？', 'How can an action be corrected while it is happening?'),
    answer: b('运动控制结合计划、预测和感觉反馈；机器人也能把慢速决策与快速纠错分开。', 'Motor control combines plans, predictions and sensory feedback; robots can also separate slow decisions from fast correction.'),
    scope: b('比较人体分层运动控制与机器人策略、前向模型和反馈控制器。', 'Compares hierarchical human motor control with robot policies, forward models and feedback controllers.'),
    comparisons: [
      { dimension: b('预测结果', 'Predicting consequences'), brain: b('运动指令的副本可帮助预测动作带来的感觉变化。', 'Copies of motor commands can help predict sensory consequences.'), ai: b('前向模型或世界模型预测执行动作后的状态。', 'Forward or world models predict the state after an action.') },
      { dimension: b('纠错速度', 'Correction timescale'), brain: b('脊髓、小脑与皮层在不同时间尺度参与控制。', 'Spinal, cerebellar and cortical circuits contribute on different timescales.'), ai: b('高层策略可与高频低层控制器配合，不必每次重算整套计划。', 'A high-level policy can work with a fast low-level controller without replanning everything.') },
    ],
    borrow: b('让小型快速模块处理短时偏差，把大模型留给目标与长期规划。', 'Use a small fast module for short-term deviations and reserve larger models for goals and planning.'),
    boundary: b('机器人已有成熟反馈控制；称为“小脑模块”只是功能类比，不意味着复制了小脑。', 'Robotics already has mature feedback control; a “cerebellar module” is a functional analogy, not a replica.'),
    experiments: [
      { title: b('增加快速残差控制器', 'Add a fast residual controller'), change: b('在基础策略输出上叠加幅度受限的在线纠正。', 'Add bounded online corrections to a base policy’s output.'), test: b('改变负载或摩擦，与基础策略比较跟踪误差和恢复时间。', 'Change load or friction and compare tracking error and recovery with the base policy.'), tradeoff: b('纠正器与基础策略可能互相抵消，需要稳定性约束。', 'The two controllers can work against each other and need stability constraints.') },
      { title: b('预测自己的感觉反馈', 'Predict self-generated feedback'), change: b('用动作和当前状态预测下一时刻传感器读数。', 'Predict the next sensor readings from the action and current state.'), test: b('比较加入预测残差前后的外部扰动检测率。', 'Compare disturbance detection with and without prediction residuals.'), tradeoff: b('模型误差可能被误判为外部扰动。', 'Model errors can be mistaken for external disturbances.') },
    ],
  },
  'sys-language': {
    question: b('会预测下一个词，是否就等于懂得语言？', 'Is predicting the next word the same as understanding language?'),
    answer: b('语言预测能学到丰富结构，但人与模型获取词义、使用语言和更新知识的方式仍有区别。', 'Language prediction learns rich structure, but people and models still differ in how they acquire meaning, use language and update knowledge.'),
    scope: b('主要比较人类语言学习与文本预训练模型，同时承认多模态训练、工具使用和在线学习的扩展。', 'Mainly compares human language learning with text-pretrained models, while recognising multimodal training, tool use and online-learning extensions.'),
    comparisons: [
      { dimension: b('词义从哪里来', 'Sources of meaning'), brain: b('语言与感知、行动、互动和社会情境共同发展。', 'Language develops alongside perception, action, interaction and social context.'), ai: b('文本模型主要从语言数据学习；多模态模型还使用图像、声音等数据。', 'Text models mainly learn from language data; multimodal models also use images, audio and other data.') },
      { dimension: b('对话后如何变化', 'Learning after a conversation'), brain: b('新经历可以改变长期记忆与后续用语。', 'New experiences can change long-term memory and future language use.'), ai: b('上下文能改变本次回答，但通常不会自动更新基础权重。', 'Context changes the current response but usually does not automatically update base weights.') },
    ],
    borrow: b('把词语与可观察的结果联系起来，让交流中的成功和失败成为学习反馈。', 'Connect words to observable outcomes and use communicative success or failure as feedback.'),
    boundary: b('模型表征能预测部分脑响应，只支持特定对应关系，不证明两者具有相同机制或理解方式。', 'Predicting some brain responses supports a specific correspondence, not identical mechanisms or understanding.'),
    experiments: [
      { title: b('通过动作学习指令含义', 'Learn instructions through action'), change: b('让智能体执行指令，并从任务结果获得纠正反馈。', 'Let an agent act on instructions and receive corrective feedback from outcomes.'), test: b('用未见过的物体和指令组合，对比只做文本训练的系统。', 'Compare against text-only training on unseen objects and instruction combinations.'), tradeoff: b('环境反馈有噪声，错误归因会学到错误关联。', 'Environmental feedback is noisy and misattribution can teach the wrong associations.') },
      { title: b('把对话更正写入可检查记忆', 'Store conversational corrections'), change: b('为经确认的更正保存来源、时间和适用范围。', 'Store confirmed corrections with source, time and scope.'), test: b('比较跨会话更正保持率，以及旧错误是否再次出现。', 'Compare correction retention across sessions and recurrence of old errors.'), tradeoff: b('需要处理冲突、过时内容和不可信更正。', 'Must handle conflicting, stale or untrustworthy corrections.') },
    ],
  },
  'sys-memory': {
    question: b('怎样记住一次经历，又不忘掉已有知识？', 'How can a new experience be retained without losing old knowledge?'),
    answer: b('互补学习系统把快速记经历与慢速学规律分开。AI 可以用记忆库与模型更新协作，但两者不会自动融合。', 'Complementary learning separates rapid episode storage from gradual learning of regularities. AI can combine a memory store with model updates, but integration is not automatic.'),
    scope: b('比较互补学习系统理论与上下文、检索增强和经验回放；不是对所有记忆系统的完整分类。', 'Compares complementary learning theory with context, retrieval augmentation and replay, rather than classifying every memory system.'),
    comparisons: [
      { dimension: b('记录一次经历', 'Recording an episode'), brain: b('海马系统参与把事件与时间、地点等背景绑定。', 'The hippocampal system helps bind events with temporal and spatial context.'), ai: b('记忆库能保存事件和元数据；普通文本分块未必保留这些关联。', 'Stores can retain events and metadata; plain text chunks may omit these relationships.') },
      { dimension: b('形成长期知识', 'Forming lasting knowledge'), brain: b('回放与巩固被认为支持经验和皮层知识的相互作用。', 'Replay and consolidation are thought to support interactions between episodes and cortical knowledge.'), ai: b('检索不会自动改写权重；需要独立的学习或蒸馏步骤。', 'Retrieval does not automatically rewrite weights; learning or distillation needs a separate step.') },
      { dimension: b('决定保留什么', 'Choosing what to retain'), brain: b('重复、显著性与已有知识影响记忆保留，也会造成偏差。', 'Repetition, salience and prior knowledge affect retention and can introduce bias.'), ai: b('可显式设置容量、写入、过期与删除策略。', 'Capacity, writing, expiry and deletion policies can be explicitly designed.') },
    ],
    borrow: b('把快速写入、按线索检索和慢速巩固分成可协调的步骤。', 'Coordinate fast writing, cue-based retrieval and slow consolidation as separate processes.'),
    boundary: b('RAG 可以包含丰富上下文；大脑也会遗忘或错误补全，不能把生物记忆当作无误的数据库。', 'RAG can contain rich context; biological memory also forgets and misremembers, so it is not an infallible database.'),
    experiments: [
      { title: b('为经历保留上下文', 'Keep context with episodes'), change: b('存储事件、时间、任务、结果与来源，而不只存孤立文本。', 'Store event, time, task, outcome and source rather than isolated text.'), test: b('用相似事件的区分任务，对比普通文本检索的误检率。', 'Compare false retrievals with plain text search on similar-event discrimination.'), tradeoff: b('元数据质量会限制检索效果，并增加存储成本。', 'Metadata quality limits retrieval and adds storage cost.') },
      { title: b('定期把经验整合进模型', 'Periodically consolidate experience'), change: b('用筛选后的旧经历和新经历混合训练小型适配器。', 'Train a small adapter on a selected mixture of old and new episodes.'), test: b('同时检查新知识掌握率、旧任务退化和错误内容吸收率。', 'Measure new learning, old-task regression and uptake of erroneous content together.'), tradeoff: b('巩固会固化错误；需要审核样本和可回滚版本。', 'Consolidation can entrench errors; samples need review and versions need rollback.') },
    ],
  },
  'sys-fear': {
    question: b('发现危险后，为什么整个系统都要改变状态？', 'Why should detecting danger change the state of the whole system?'),
    answer: b('情绪相关机制会同时影响注意、行动和学习。工程上可借鉴这种协调作用，而不把情绪词汇当作情绪机制。', 'Emotion-related mechanisms coordinate attention, action and learning. Engineering can borrow that coordination without treating emotional language as an emotional mechanism.'),
    scope: b('比较情绪相关的全局调节与奖励、安全控制和状态调度；这里讨论功能，不判断主观体验。', 'Compares global emotion-related regulation with rewards, safety control and state scheduling. The comparison concerns function, not subjective experience.'),
    comparisons: [
      { dimension: b('影响范围', 'Scope of influence'), brain: b('威胁可同时改变注意、身体反应和记忆形成。', 'Threat can jointly change attention, bodily responses and memory formation.'), ai: b('奖励或安全模块通常只控制特定目标；也可设计跨模块调节。', 'Reward or safety modules usually target specific objectives; cross-module regulation can be designed.') },
      { dimension: b('紧急反应', 'Urgent response'), brain: b('某些防御反应可以先于详细判断发生。', 'Some defensive responses can precede detailed appraisal.'), ai: b('专用安全控制器可先执行保守动作，再交给规划器。', 'A safety controller can take conservative action before handing back to a planner.') },
    ],
    borrow: b('用少量可解释的状态协调速度、探索和记忆优先级，避免各模块各自作出冲突决策。', 'Use a few interpretable states to coordinate speed, exploration and memory priority, reducing conflicting module decisions.'),
    boundary: b('情绪机制与恐惧通路的解释仍在发展；一个“情绪向量”既不是完整生物情绪，也不证明存在感受。', 'Accounts of emotion and fear circuits are evolving; an “emotion vector” is neither complete biological emotion nor evidence of feelings.'),
    experiments: [
      { title: b('把风险状态广播给多个模块', 'Broadcast a risk state'), change: b('让同一风险估计同时约束动作速度、探索幅度和记忆写入。', 'Use one risk estimate to constrain action speed, exploration and memory writing.'), test: b('在仿真危险场景中，与各模块独立控制比较事故率和完成时间。', 'Compare incidents and completion time with independently controlled modules in simulated hazards.'), tradeoff: b('全局误报可能让整个系统过度保守。', 'A global false alarm can make the whole system overly cautious.') },
      { title: b('为紧急情况设置快速通道', 'Add a fast emergency path'), change: b('在慢速规划外设置可解释的避险触发条件。', 'Add interpretable avoidance triggers outside the slow planner.'), test: b('测量最坏情况下的响应延迟、漏报和误触发。', 'Measure worst-case response latency, missed hazards and false triggers.'), tradeoff: b('需要处理快速通道与长期目标之间的控制权交接。', 'Control must transfer cleanly between emergency responses and long-term goals.') },
    ],
  },
  'sys-reward': {
    question: b('学到新东西的是奖励本身，还是意料之外的部分？', 'Does learning depend on reward itself or on what was unexpected?'),
    answer: b('许多多巴胺响应与奖励预测误差相符；时序差分学习也用实际结果与预期的差距更新价值。', 'Many dopamine responses fit reward prediction error; temporal-difference learning likewise updates value from outcomes relative to expectations.'),
    scope: b('比较奖励预测误差模型与 TD 强化学习，不把所有多巴胺活动都解释为同一个标量。', 'Compares reward-prediction-error models with TD reinforcement learning, without reducing all dopamine activity to one scalar.'),
    comparisons: [
      { dimension: b('更新信号', 'Update signal'), brain: b('部分神经元对好于或差于预期的结果作出不同响应。', 'Some neurons respond differently to better- and worse-than-expected outcomes.'), ai: b('TD 误差由奖励与后续价值估计相对于当前预测的差计算。', 'TD error compares reward plus estimated future value with the current prediction.') },
      { dimension: b('什么算有价值', 'What is valuable'), brain: b('身体需求、经验和情境会改变奖励价值。', 'Bodily needs, experience and context alter reward value.'), ai: b('奖励通常由任务设计定义，也可加入内部状态和多个目标。', 'Rewards usually follow task design but can include internal state and multiple objectives.') },
    ],
    borrow: b('用预期与结果的差来驱动学习，并让奖励的权重反映当前需求。', 'Drive learning with discrepancies between expectations and outcomes, while weighting rewards by current needs.'),
    boundary: b('TD 是有力的计算解释，但多巴胺信号还涉及运动、显著性等因素；公式相似不等于神经实现相同。', 'TD is a powerful computational account, but dopamine also relates to movement and salience; similar equations do not imply identical implementation.'),
    experiments: [
      { title: b('把任务收益与内部需求分开', 'Separate task reward from internal needs'), change: b('分别估计任务、安全和能量价值，再按状态组合。', 'Estimate task, safety and energy values separately, then combine them by state.'), test: b('改变电量和风险条件，比较固定奖励与动态权重的表现。', 'Vary battery and risk conditions and compare fixed rewards with dynamic weighting.'), tradeoff: b('权重变化会使学习目标漂移，需要保持安全约束。', 'Changing weights makes the objective nonstationary; safety constraints must remain in force.') },
      { title: b('预测结果分布而非单个均值', 'Predict a distribution of outcomes'), change: b('使用分布式价值估计区分相同均值、不同风险的行动。', 'Use distributional value estimates to distinguish equal-mean actions with different risks.'), test: b('比较尾部损失、价值校准和平均回报。', 'Compare tail losses, value calibration and mean return.'), tradeoff: b('分布估计需要更多数据，风险选择仍需明确规则。', 'Distribution estimation needs more data, and risk selection still needs an explicit rule.') },
    ],
  },
  'sys-homeostasis': {
    question: b('除了完成任务，智能体还需要维持什么？', 'What must an agent maintain besides completing its task?'),
    answer: b('生物体必须调节能量、温度等内部状态。机器人也能把电量和磨损纳入决策，而非只追求外部得分。', 'Organisms regulate internal variables such as energy and temperature. Robots can likewise consider battery and wear rather than only external scores.'),
    scope: b('比较生物稳态调节与显式建模内部资源的智能体；机器人和稳态强化学习已有对应设计。', 'Compares biological homeostasis with agents that explicitly model internal resources; robotics and homeostatic RL already include related designs.'),
    comparisons: [
      { dimension: b('需要维持的状态', 'Variables to maintain'), brain: b('持续感知并调节温度、水分和能量等。', 'Continuously senses and regulates temperature, hydration and energy.'), ai: b('只有接入传感器和目标函数的资源变量才影响决策。', 'Resource variables affect decisions only when connected to sensing and objectives.') },
      { dimension: b('目标如何变化', 'Changing priorities'), brain: b('饥饿、疲劳等状态会改变行动优先级。', 'Hunger and fatigue change action priorities.'), ai: b('可让充电、冷却和维护需求参与任务调度。', 'Charging, cooling and maintenance needs can influence scheduling.') },
    ],
    borrow: b('把“完成任务”与“持续可运行”一起优化，让维护行为有明确的状态依据。', 'Optimise task completion together with continued operability, grounding maintenance actions in measured state.'),
    boundary: b('人的目标不只来自生理需要；加入内部奖励也不自动产生自主意图或意识。', 'Human goals are not solely physiological; internal rewards do not automatically create autonomous intentions or consciousness.'),
    experiments: [
      { title: b('把维护安排进任务规划', 'Plan for maintenance'), change: b('让规划器同时跟踪电量、温度和剩余任务。', 'Track battery, temperature and remaining work in the planner.'), test: b('比较长时间运行的完成任务数、停机时间和资源超限次数。', 'Compare long-run completed tasks, downtime and resource-limit violations.'), tradeoff: b('过重的维护奖励可能让智能体回避工作。', 'Overweighting maintenance can make an agent avoid work.') },
      { title: b('从状态改善构造内部奖励', 'Reward internal-state improvement'), change: b('按资源偏离目标范围的减少量提供奖励，并保留硬性限值。', 'Reward reductions in deviation from target resource ranges while retaining hard limits.'), test: b('在资源短缺仿真中，对比单纯外部奖励策略。', 'Compare with an external-reward-only policy in resource-shortage simulations.'), tradeoff: b('智能体可能利用指标漏洞；传感器和奖励都需核验。', 'Agents may exploit proxy metrics; both sensing and reward design need checking.') },
    ],
  },
  'sys-sleep': {
    question: b('暂时停止接收新任务，能不能学得更稳？', 'Can time away from new tasks make learning more stable?'),
    answer: b('睡眠与记忆巩固有关，回放是其中一种候选机制。AI 可借鉴离线整理经验，但不需要复制生物睡眠。', 'Sleep is associated with memory consolidation, with replay as one candidate mechanism. AI can organise experience offline without copying biological sleep.'),
    scope: b('比较睡眠相关学习理论与经验回放、生成式回放及离线训练，不把这些算法等同于做梦。', 'Compares sleep-related learning theories with experience replay, generative replay and offline training, without equating these algorithms with dreaming.'),
    comparisons: [
      { dimension: b('学习的时机', 'When learning occurs'), brain: b('清醒学习与睡眠中的活动共同影响后续记忆。', 'Waking learning and sleep activity both influence later memory.'), ai: b('可以在交互间隙回放经验；部署模型是否继续训练取决于设计。', 'Experience can be replayed between interactions; continued deployment-time training is a design choice.') },
      { dimension: b('整理的内容', 'What gets reorganised'), brain: b('再激活、突触调整与不同睡眠阶段的作用仍在研究。', 'Reactivation, synaptic changes and the roles of sleep stages remain under study.'), ai: b('可明确选择旧样本、生成样本和需要更新的参数。', 'Old samples, generated samples and parameters to update can be explicitly selected.') },
    ],
    borrow: b('把收集经验与整理经验分开，利用离线阶段检查遗忘、筛选回放和更新模型。', 'Separate experience collection from organisation, using offline periods to check forgetting, select replay and update models.'),
    boundary: b('整体突触下调和梦的具体学习作用仍属理论问题；不能直接把全体权重缩小当作有益维护。', 'Global synaptic downscaling and the learning role of dreams remain theoretical questions; shrinking every weight is not automatically useful maintenance.'),
    experiments: [
      { title: b('安排短时离线巩固', 'Schedule short consolidation periods'), change: b('在任务间隙混合回放新旧经验，更新小型适配模块。', 'Replay mixed old and new experiences between tasks to update a small adapter.'), test: b('与同等训练预算的连续更新比较遗忘和停机成本。', 'Compare forgetting and downtime with continuous updates at the same training budget.'), tradeoff: b('离线时间降低可用性，回放样本也可能有偏。', 'Offline periods reduce availability and replay samples can be biased.') },
      { title: b('按学习价值选择回放', 'Select replay by learning value'), change: b('混合高误差、新奇和随机样本，避免只追逐困难例子。', 'Mix high-error, novel and random samples rather than only chasing difficult cases.'), test: b('比较均匀回放的旧任务保持率与新任务学习速度。', 'Compare old-task retention and new-task learning speed with uniform replay.'), tradeoff: b('高误差可能来自坏数据，需要限制重复次数。', 'High errors may come from bad data; cap repeated replay.') },
    ],
  },
  'sys-attention': {
    question: b('信息太多时，应该看什么、想多久？', 'When information is abundant, what deserves attention and for how long?'),
    answer: b('大脑的注意涉及目标、资源分配和行动选择；Transformer 注意力是内容加权运算，只对应其中一部分功能。', 'Brain attention involves goals, resource allocation and action selection; Transformer attention is content weighting and covers only part of that function.'),
    scope: b('比较认知注意和执行控制与标准 Transformer 注意力、门控和推理预算分配。', 'Compares cognitive attention and executive control with standard Transformer attention, gating and inference-budget allocation.'),
    comparisons: [
      { dimension: b('选择依据', 'Basis of selection'), brain: b('目标、显著性和已有经验共同影响注意。', 'Goals, salience and experience jointly shape attention.'), ai: b('标准注意力按学习到的查询与键计算权重，目标通过输入和训练影响它。', 'Standard attention weights learned queries and keys; goals influence it through inputs and training.') },
      { dimension: b('容量限制', 'Capacity limits'), brain: b('工作记忆有任务相关的容量限制。', 'Working memory has task-dependent capacity limits.'), ai: b('上下文长度受架构和计算预算限制，不等于人的工作记忆项数。', 'Context length depends on architecture and compute, not a human working-memory item count.') },
      { dimension: b('何时多想一会', 'When to deliberate longer'), brain: b('控制方式会随熟练程度、任务难度与不确定性改变。', 'Control changes with practice, difficulty and uncertainty.'), ai: b('可用路由器、停止规则或预算策略分配额外推理。', 'Routers, stopping rules or budget policies can allocate extra inference.') },
    ],
    borrow: b('显式决定哪些信息进入共享记忆，以及哪些问题值得额外计算。', 'Explicitly decide what enters shared memory and which problems merit extra computation.'),
    boundary: b('同名不等于同机制；全局工作空间是理论框架，建立共享缓冲区并不证明系统具有意识。', 'A shared name does not imply a shared mechanism; global workspace is a theoretical framework, and a shared buffer does not establish consciousness.'),
    experiments: [
      { title: b('让专家共享有限工作区', 'Give experts a limited workspace'), change: b('用门控选择少量任务相关内容，供多个模块读取。', 'Gate a small amount of task-relevant content into a workspace read by several modules.'), test: b('对比无限制共享的任务准确率、通信量和干扰程度。', 'Compare accuracy, communication volume and interference with unrestricted sharing.'), tradeoff: b('门控错误会丢掉关键线索，需要保留重新检索的路径。', 'Bad gating discards important cues, so keep a path for retrieval.') },
      { title: b('按不确定性分配推理预算', 'Allocate compute by uncertainty'), change: b('让经过校准的控制器选择直接回答、追加推理或请求信息。', 'Let a calibrated controller choose direct response, more reasoning or additional information.'), test: b('在相同平均预算下比较准确率、延迟尾部与拒答质量。', 'Compare accuracy, tail latency and abstention quality at the same average budget.'), tradeoff: b('置信度失准时，系统会在错误问题上浪费计算。', 'Miscalibrated confidence sends compute to the wrong problems.') },
    ],
  },
}
