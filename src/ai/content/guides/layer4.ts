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
    architecture: {
      brain: {
        summary: b('快速绑定具体经历，慢速提取跨经历的规律。', 'Rapidly bind episodes, then slowly extract regularities across them.'),
        steps: [
          { label: b('感觉与皮层输入', 'Sensory and cortical input'), detail: b('当前知觉、目标和已有知识共同构成待编码的事件。', 'Current perception, goals and prior knowledge define the event to be encoded.') },
          { label: b('海马快速绑定', 'Hippocampal binding'), detail: b('海马把内容与时间、地点和情境绑定，形成可由线索检索的情景表征。', 'The hippocampus binds content with time, place and context into a cue-addressable episode.') },
          { label: b('回放与巩固', 'Replay and consolidation'), detail: b('离线或低输入阶段的回放让新皮层逐步吸收跨事件的统计规律。', 'Replay during offline or low-input periods lets cortex gradually absorb statistics across episodes.') },
          { label: b('检索与行为', 'Retrieval and behaviour'), detail: b('线索激活相关经历和知识，影响当前判断、预测与行动。', 'Cues activate related episodes and knowledge, shaping current judgement, prediction and action.') },
        ],
      },
      ai: {
        summary: b('上下文、外部记忆和参数更新是不同的存储层。', 'Context, external memory and parameter updates are distinct storage layers.'),
        steps: [
          { label: b('输入与上下文', 'Input and context'), detail: b('当前输入进入上下文窗口；它只影响本次计算，通常不会改写基础权重。', 'The current input enters the context window; it affects this computation but usually does not rewrite base weights.') },
          { label: b('检索外部记忆', 'Retrieve external memory'), detail: b('检索器依据查询选择文档、向量或结构化事件，再把结果拼接回上下文。', 'A retriever selects documents, vectors or structured events and inserts them into the context.') },
          { label: b('训练与蒸馏', 'Training and distillation'), detail: b('只有显式训练、适配器更新或蒸馏步骤才会改变长期参数。', 'Long-term parameters change only through explicit training, adapter updates or distillation.') },
          { label: b('生成与下次调用', 'Generation and next call'), detail: b('模型根据当前上下文生成输出；是否保留结果并影响下一次调用由系统策略决定。', 'The model generates from the current context; retention for the next call depends on system policy.') },
        ],
      },
      state: b('海马情景记忆、新皮层知识与身体状态相互作用；AI 的上下文、向量库和权重更新必须分别管理。', 'Hippocampal episodes, cortical knowledge and bodily state interact; AI context, vector stores and weight updates must be managed separately.'),
      timescale: b('神经活动为毫秒至秒，情景写入为秒至分钟，巩固和遗忘为小时至多年；AI 检索为毫秒至秒，参数更新通常是独立离线过程。', 'Neural activity spans milliseconds to seconds, episodic encoding seconds to minutes, and consolidation and forgetting hours to years; AI retrieval takes milliseconds to seconds, while parameter updates are usually separate offline processes.'),
      caveat: b('功能上的“快速写入、慢速巩固”对应不等于海马与 RAG 或权重更新具有相同机制。', 'The functional pattern of “fast writing and slow consolidation” does not make hippocampus, RAG and weight updates the same mechanism.'),
    },
    review: {
      systems: {
        biological: b('海马与新皮层互补学习系统', 'Hippocampal and neocortical complementary learning system'),
        computational: b('上下文、检索增强与参数更新系统', 'Context, retrieval and parameter update system'),
      },
      thesis: b('人脑把一次经历的快速绑定与跨经历的慢速知识学习分开，再通过回放与检索协同；现有 AI 可以拼接上下文、外部记忆和参数更新，但这些存储层通常没有自动的统一巩固过程。', 'The brain separates rapid binding of an episode from slow learning across episodes, then coordinates them through replay and retrieval. Current AI can combine context, external memory and parameter updates, but these storage layers usually lack an automatic consolidation process.'),
      capabilities: [
        { dimension: b('新经历的快速写入', 'Rapid encoding of a new episode'), brain: b('一次经历可以绑定时间、地点、人物和结果，形成可检索的情景记忆。', 'An episode can bind time, place, people and outcome into a retrievable event memory.'), ai: b('上下文或外部存储可以快速加入新内容，但写入格式、来源和关联需要系统显式决定。', 'Context or external stores can add new content quickly, but format, provenance and associations must be specified.'), gap: b('AI 可快速保存信息，但事件结构和写入选择通常依赖外部设计。', 'AI can save information quickly, but event structure and write selection usually depend on external design.') },
        { dimension: b('跨经历形成知识', 'Learning knowledge across episodes'), brain: b('新皮层在多次经历和回放中提取规律，并与既有知识整合。', 'The neocortex extracts regularities across experiences and replay, integrating them with prior knowledge.'), ai: b('检索能提供相关材料；只有继续训练、适配器更新或蒸馏才会改变长期参数。', 'Retrieval supplies relevant material; long-term parameters change only through further training, adapters or distillation.'), gap: b('检索与长期学习分离，系统不会因为读到资料就自动获得稳定知识。', 'Retrieval and long-term learning are separate, so reading material does not automatically create stable knowledge.') },
        { dimension: b('相似经历的区分', 'Distinguishing similar episodes'), brain: b('情境、时间和空间关系帮助区分相似事件，但回忆也会受干扰和错误补全影响。', 'Context, time and spatial relations help distinguish similar events, while recall remains vulnerable to interference and false completion.'), ai: b('向量相似度和元数据可支持区分，但相近文本、错误标签或检索偏差会导致混淆。', 'Vector similarity and metadata can help, but near-duplicate text, bad labels or retrieval bias cause confusion.'), gap: b('两者都可能混淆经历；AI 的错误更多暴露在索引、元数据和检索策略上。', 'Both can confuse episodes; AI errors are often exposed in indexing, metadata and retrieval policy.') },
        { dimension: b('遗忘与更新', 'Forgetting and updating'), brain: b('遗忘、重组和巩固共同控制旧知识与新经验的平衡。', 'Forgetting, reconstruction and consolidation balance old knowledge with new experience.'), ai: b('外部记忆可删除或过期，模型参数更新则可能引起灾难性遗忘和版本冲突。', 'External memories can expire or be deleted, while parameter updates can cause catastrophic forgetting and version conflicts.'), gap: b('AI 的存储层有明确控制接口，但跨层更新的稳定性和一致性仍然不足。', 'AI storage layers have explicit controls, but stable and consistent cross-layer updating remains limited.') },
      ],
      state: [
        { dimension: b('当前状态', 'Current state'), brain: b('知觉、目标、身体状态和情境共同决定当前可访问的记忆。', 'Perception, goals, bodily state and context jointly determine accessible memories.'), ai: b('当前输入、系统提示、上下文窗口和检索结果构成一次调用的工作状态。', 'Current input, system prompt, context window and retrieval results form the working state for one call.') },
        { dimension: b('长期状态', 'Long-term state'), brain: b('海马情景痕迹与新皮层分布式知识持续相互作用。', 'Hippocampal traces and distributed cortical knowledge continue to interact.'), ai: b('长期状态分散在参数、外部数据库、缓存和版本记录中。', 'Long-term state is distributed across parameters, external databases, caches and version records.') },
        { dimension: b('更新路径', 'Update path'), brain: b('经历先快速写入，随后通过回放、重组和巩固改变长期表征。', 'An experience is written quickly, then changes long-term representations through replay, reconstruction and consolidation.'), ai: b('检索本身不更新权重；训练、蒸馏或人工写入流程需要单独触发。', 'Retrieval itself does not update weights; training, distillation or an explicit write process must be triggered separately.') },
      ],
      timescale: [
        { dimension: b('毫秒到秒', 'Milliseconds to seconds'), brain: b('神经活动、注意选择和线索驱动的记忆激活。', 'Neural activity, attentional selection and cue-driven memory activation.'), ai: b('一次前向计算、检索和上下文拼接。', 'One forward pass, retrieval and context assembly.') },
        { dimension: b('秒到小时', 'Seconds to hours'), brain: b('经历编码、反复提取、干扰和初步巩固。', 'Encoding, repeated retrieval, interference and early consolidation.'), ai: b('会话状态、缓存写入和批处理更新，是否发生取决于部署流程。', 'Session state, cache writes and batch updates, depending on deployment.') },
        { dimension: b('天到多年', 'Days to years'), brain: b('睡眠相关回放、结构重组、遗忘和长期能力变化。', 'Sleep-related replay, structural reorganisation, forgetting and long-term ability change.'), ai: b('持续训练、版本迭代和外部知识库维护；没有统一的生物式巩固周期。', 'Continued training, version updates and external knowledge-base maintenance, without one unified biological consolidation cycle.') },
      ],
      limits: {
        biological: b('人脑并非无误数据库：记忆会遗忘、重组、受情绪和先验影响，也会形成虚假记忆。', 'The brain is not an infallible database: memory is forgotten, reconstructed and biased by emotion and prior knowledge, and false memories occur.'),
        computational: b('AI 可以精确保存文本或向量，但缺少可靠的跨层写入、巩固、冲突处理和长期自我更新机制。', 'AI can store text or vectors precisely, but lacks reliable cross-layer writing, consolidation, conflict handling and long-term self-update.'),
        evidence: b('互补学习系统是有影响力的理论框架；海马回放与皮层学习的具体因果链，以及 AI 系统能否形成同等整合，仍需区分证据与功能类比。', 'Complementary learning systems are an influential framework; the exact causal chain from hippocampal replay to cortical learning, and whether AI can achieve comparable integration, must remain distinct from functional analogy.'),
      },
    },
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
    architecture: {
      brain: {
        summary: b('威胁线索改变全身状态，并由调节回路逐步恢复任务控制。', 'Threat cues shift whole-body state, with regulatory circuits gradually restoring task control.'),
        steps: [
          { label: b('威胁线索', 'Threat cue'), detail: b('感觉输入与既有学习共同判断潜在危险和不确定性。', 'Sensory input and prior learning estimate potential danger and uncertainty.') },
          { label: b('防御回路', 'Defensive circuitry'), detail: b('杏仁核及相关通路快速提高警觉，联动脑干、自主神经和内分泌反应。', 'Amygdala-related pathways rapidly raise vigilance and recruit brainstem, autonomic and endocrine responses.') },
          { label: b('全局状态变化', 'Global state shift'), detail: b('注意范围、行动阈值、记忆编码和能量分配同时改变。', 'Attention, action thresholds, memory encoding and energy allocation shift together.') },
          { label: b('前额叶调节', 'Prefrontal regulation'), detail: b('情境和结果信息参与抑制、维持或重新评估防御反应。', 'Context and outcome information help inhibit, sustain or reappraise the defensive response.') },
          { label: b('趋避与恢复', 'Approach, avoidance and recovery'), detail: b('系统选择防御动作或撤离，并在风险下降后逐步回到基线。', 'The system selects defence or withdrawal and gradually returns toward baseline as risk falls.') },
        ],
      },
      ai: {
        summary: b('风险估计、安全控制和策略调度可以共享状态，但并不产生主观恐惧。', 'Risk estimation, safety control and policy scheduling can share state without producing subjective fear.'),
        steps: [
          { label: b('输入状态', 'Input state'), detail: b('传感器、任务上下文和历史轨迹提供风险判断所需的信息。', 'Sensors, task context and history provide inputs for risk estimation.') },
          { label: b('风险与代价估计', 'Risk and cost estimate'), detail: b('模型估计碰撞、失败或不可逆损失的概率与代价。', 'A model estimates the probability and cost of collision, failure or irreversible loss.') },
          { label: b('安全门控', 'Safety gating'), detail: b('硬约束或独立控制器可以限制动作范围，并在必要时抢占规划器。', 'Hard constraints or an independent controller can limit actions and pre-empt the planner when needed.') },
          { label: b('策略与记忆更新', 'Policy and memory update'), detail: b('风险状态可调节探索、推理预算、动作速度和经验写入。', 'Risk state can regulate exploration, inference budget, action speed and memory writing.') },
          { label: b('动作与恢复', 'Action and recovery'), detail: b('系统执行避险或降级动作，并按明确条件恢复正常策略。', 'The system executes avoidance or degraded actions and resumes normal policy under explicit conditions.') },
        ],
      },
      state: b('生物状态包含自主神经、激素、身体感觉与学习历史；AI 通常只有显式接入的风险变量和控制门。', 'Biological state includes autonomic, hormonal, bodily and learned components; AI usually has only explicitly connected risk variables and control gates.'),
      timescale: b('快速防御可在毫秒至秒内启动，激素和记忆调节持续分钟至小时；AI 安全门控可很快执行，但跨任务状态保持需要额外设计。', 'Rapid defence can start within milliseconds to seconds, while hormonal and memory effects last minutes to hours; AI safety gates can act quickly, but cross-task state persistence requires extra design.'),
      caveat: b('负奖励、风险向量或安全停机描述的是控制功能，不能据此推断系统具有恐惧体验。', 'Negative reward, risk vectors and safety stops describe control functions and do not imply a fear experience.'),
    },
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
    architecture: {
      brain: {
        summary: b('目标和显著性驱动选择，有限工作空间协调感知、记忆与行动。', 'Goals and salience drive selection; a limited workspace coordinates perception, memory and action.'),
        steps: [
          { label: b('感觉输入', 'Sensory input'), detail: b('多通道输入并行到达，强度、位置和新奇性形成候选线索。', 'Parallel inputs arrive across modalities; intensity, location and novelty form candidate cues.') },
          { label: b('目标与显著性', 'Goals and salience'), detail: b('任务目标、预期、情绪和不确定性改变竞争结果。', 'Task goals, expectations, affect and uncertainty alter the competition.') },
          { label: b('门控与工作记忆', 'Gating and working memory'), detail: b('基底节和前额叶回路选择要维持、更新或抑制的信息。', 'Basal-ganglia and prefrontal circuits select information to maintain, update or suppress.') },
          { label: b('全局广播', 'Global broadcast'), detail: b('少量内容进入共享工作空间，供多个系统读取和整合。', 'A small amount enters a shared workspace for access by multiple systems.') },
          { label: b('行动或持续思考', 'Action or continued deliberation'), detail: b('系统根据任务难度和不确定性决定行动、换焦点或投入更多控制。', 'The system acts, shifts focus or invests more control according to difficulty and uncertainty.') },
        ],
      },
      ai: {
        summary: b('注意力先对表示做内容加权；门控、路由和停止规则才承担更广义的控制作用。', 'Attention first weights representations by content; gating, routing and stopping rules provide broader control.'),
        steps: [
          { label: b('词元表示', 'Token representations'), detail: b('输入被编码为向量序列，位置和上下文信息随层级传播。', 'Inputs become vector sequences, with position and context propagated through layers.') },
          { label: b('查询、键和值', 'Queries, keys and values'), detail: b('每个查询与键计算相关性，再对值做加权汇聚。', 'Each query scores keys, then forms a weighted sum of values.') },
          { label: b('层内整合', 'Layer-wise integration'), detail: b('多头注意力和前馈层更新表示，但不自动形成跨模块共享工作空间。', 'Multi-head attention and feed-forward layers update representations without automatically forming a cross-module workspace.') },
          { label: b('路由与预算', 'Routing and budget'), detail: b('外部控制器可选择专家、追加推理步骤、检索信息或停止。', 'An external controller can select experts, add reasoning steps, retrieve information or stop.') },
          { label: b('输出', 'Output'), detail: b('生成器、策略或工具调用读取最终表示并产生响应。', 'A generator, policy or tool caller reads the final representation and produces a response.') },
        ],
      },
      state: b('工作记忆依赖持续神经活动和突触状态；Transformer 的上下文是当前前向计算中的表示，路由器状态则另行维护。', 'Working memory depends on persistent neural activity and synaptic state; a Transformer context is a representation within the current forward pass, while router state is maintained separately.'),
      timescale: b('感觉选择可在几十至数百毫秒内变化，工作记忆可维持秒级；AI 注意力在一次前向传播内计算，额外推理依赖离散步骤和延迟预算。', 'Sensory selection can change over tens to hundreds of milliseconds, with working memory lasting seconds; AI attention is computed within a forward pass, while extra reasoning adds discrete steps and latency.'),
      caveat: b('Transformer 注意力是内容加权算子；它不单独说明目标维持、意识、元认知或行为控制。', 'Transformer attention is a content-weighting operator; by itself it does not explain goal maintenance, consciousness, metacognition or behavioural control.'),
    },
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
