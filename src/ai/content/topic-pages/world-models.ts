import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F17 World models and prediction: cortical prediction and cerebellar forward models vs learned world models. */
export const WORLD_MODELS: TopicContent = {
  thesis: {
    biological: b(
      '大脑不断预测接下来会发生什么。运动时，运动皮层把指令的副本送到小脑，小脑在动作完成前就预测出感觉结果；预测准确的部分被抵消，所以挠自己不觉得痒。皮层也被认为在各层之间传递预测和预测误差。人还能在心里模拟物理过程，判断一堆积木会不会倒。',
      'The brain keeps predicting what comes next. During movement, motor cortex sends a copy of its command to the cerebellum, which predicts the sensory result before the movement ends. Correctly predicted input is canceled, which is why tickling yourself does not tickle. Cortex is also thought to pass predictions and prediction errors between its levels. People can simulate physics in their heads, judging whether a stack of blocks will fall.'),
    computational: b(
      '学习型世界模型（如 Dreamer）把观测压缩成紧凑的潜在状态，学习「采取某个动作后状态怎样变化、得到多少奖赏」，然后在这个模型里「想象」大量轨迹来训练策略。2025 年发表的 Dreamer 用同一套配置在 150 多个任务上取得了好结果。但 2024 年的研究发现，视频生成模型在训练分布之外不能正确外推物理规律。',
      'Learned world models such as Dreamer compress observations into compact latent states and learn how the state changes and how much reward follows each action. They then imagine many trajectories inside this model to train a policy. Dreamer, published in 2025, did well on more than 150 tasks with one configuration. But a 2024 study found that video generation models fail to extrapolate physical laws beyond their training distribution.'),
    gap: b(
      '两边都用内部模型预测动作的后果，并在模型中模拟来做决策。差距在于泛化：人对物理的预测能推广到没见过的形状和情境，学习型世界模型主要在与训练数据相似的范围内可靠。',
      'Both use internal models to predict the results of actions and simulate in them to decide. The gap is generalization. Human physical predictions extend to unseen shapes and situations, while learned world models are reliable mainly near their training data.'),
  },
  short: { biological: b('大脑', 'The brain'), computational: b('世界模型', 'World models') },
  kinds: ['behavior', 'algorithm', 'math'],
  evidence: 'debated',
  asOf: b('计算侧描述截至 2026 年 10 月的学习型世界模型与视频生成模型；具体评测结果按发表年份注明。', 'The computational column describes learned world models and video generation models as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('预测动作的后果', 'Predicting action outcomes'),
      brain: b('小脑在动作完成前就预测出感觉结果，用来抵消自己造成的感觉并实时校正动作。', 'The cerebellum predicts the sensory result before a movement ends, canceling self-made sensations and correcting the movement in real time.'),
      ai: b('Dreamer 预测每个动作之后的潜在状态和奖赏，并用这些预测学习控制策略。', 'Dreamer predicts the latent state and reward after each action and learns a control policy from these predictions.'),
      gap: b('两边都学会了「动作导致什么」，各自在自己的身体或任务中有效。', 'Both learn what actions lead to, each within its own body or tasks.'),
    },
    {
      lead: 'bio',
      dimension: b('物理直觉的泛化', 'Generalizing physical intuition'),
      brain: b('人能判断从没见过的积木堆会不会倒、会往哪边倒，判断与物理模拟的结果吻合。', 'People judge whether, and which way, a never-seen stack of blocks will fall, matching the results of physics simulation.'),
      ai: b('2024 年的研究中，视频生成模型在训练分布内表现好，分布外却不能正确外推物理规律，更像在套用相似的案例。', 'In a 2024 study, video generation models did well within their training distribution but failed to extrapolate physical laws outside it, behaving more like case matching.'),
      gap: b('人的物理预测更接近可推广的规律，模型更依赖训练中见过的相似情形。', 'Human physical predictions behave more like general laws, while models rely more on similar cases seen in training.'),
    },
    {
      lead: 'comp',
      dimension: b('在想象中练习', 'Practicing in imagination'),
      brain: b('人能在心里预演动作和计划，心理练习对技能有一定帮助，但规模和精度有限。', 'People rehearse actions and plans in their heads, and mental practice helps skills somewhat, with limited scale and precision.'),
      ai: b('Dreamer 的策略完全在想象出的轨迹上训练，可以模拟数以百万计的步骤。', 'Dreamer’s policy trains entirely on imagined trajectories and can simulate millions of steps.'),
      gap: b('模型在想象中的练习量远超人能完成的心理模拟。', 'Models practice in imagination far more than people can simulate mentally.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('运动指令与传出副本', 'Motor command and efference copy'),
        points: [b('运动皮层发出指令驱动肌肉，同时把一份副本（传出副本）送到小脑。', 'Motor cortex sends a command to the muscles and a copy of it, the efference copy, to the cerebellum.')],
      },
      {
        title: b('小脑前向模型', 'Cerebellar forward model'),
        points: [
          b('小脑根据指令副本和当前状态，预测这个动作会带来的感觉：肢体会到哪里、会碰到什么。', 'From the copy and the current state, the cerebellum predicts the sensations the movement will bring: where the limb will be and what it will touch.'),
          b('预测在动作完成之前就已算出，比真实感觉反馈早几十到上百毫秒。', 'The prediction is ready before the movement ends, tens to a hundred or more milliseconds ahead of real feedback.'),
        ],
      },
      {
        title: b('比较与抵消', 'Comparison and cancellation'),
        points: [b('预测与真实的感觉比较：被预测到的部分被抵消，只有出乎意料的部分保留下来，形成预测误差。', 'The prediction is compared with real sensation. Predicted input is canceled, and only the unexpected part remains, forming a prediction error.')],
      },
      {
        title: b('误差的两个去向', 'Two uses of the error'),
        points: [
          b('误差经攀缘纤维送回小脑，调整前向模型，使下次预测更准（运动适应）。', 'The error returns to the cerebellum through climbing fibers and adjusts the forward model, so the next prediction is better, called motor adaptation.'),
          b('误差也用于在线校正正在进行的动作。', 'The error also corrects the ongoing movement online.'),
        ],
      },
      {
        title: b('皮层中的预测', 'Prediction in cortex'),
        points: [b('一种有影响的理论（预测编码）认为，高级皮层向下发送预测，低级区域只把预测不了的部分向上传；小鼠视觉皮层中已记录到「看到的与预期的运动不符」时的误差信号。', 'An influential theory, predictive coding, holds that higher cortex sends predictions down and lower areas pass up only what was not predicted. Mismatch signals between seen and expected motion have been recorded in mouse visual cortex.')],
      },
      {
        title: b('心理模拟', 'Mental simulation'),
        points: [b('前额叶和海马等区域用内部模型想象未发生的情形，例如物体会怎样运动、某条路线会通向哪里。', 'Prefrontal cortex, the hippocampus and other areas use internal models to imagine what has not happened, such as how objects will move or where a route leads.')],
      },
    ],
    computational: [
      {
        title: b('编码器', 'Encoder'),
        points: [b('把一帧图像等观测压缩成一个紧凑的潜在状态，只保留对预测有用的信息。', 'An observation such as an image frame is compressed into a compact latent state that keeps what is useful for prediction.')],
      },
      {
        title: b('动态模型', 'Dynamics model'),
        points: [b('一个循环网络根据当前潜在状态和动作，预测下一个潜在状态和奖赏。', 'A recurrent network predicts the next latent state and reward from the current latent state and action.')],
      },
      {
        title: b('预测与训练误差', 'Predictions and training error'),
        points: [b('从潜在状态重建观测、预测奖赏，与真实值比较得到误差，用来训练编码器和动态模型。', 'Observations are reconstructed and rewards predicted from latent states, and the error against real values trains the encoder and dynamics model.')],
      },
      {
        title: b('想象', 'Imagination'),
        points: [b('从一个真实状态出发，在潜在空间中连续预测许多步，生成想象的轨迹，不需要与环境交互。', 'Starting from a real state, the model predicts many steps in latent space to produce imagined trajectories, without touching the environment.')],
      },
      {
        title: b('在想象中学习策略', 'Learning a policy in imagination'),
        points: [b('行动者在想象轨迹上选择动作，评论家估计价值，两者都只用想象的数据训练。', 'An actor chooses actions along imagined trajectories and a critic estimates value, both trained only on imagined data.')],
      },
      {
        title: b('缺失的一步（虚线框）', 'The missing step (dashed box)'),
        points: [b('没有显式的、可外推的物理规律：模型学到的是训练数据中的统计规律，遇到分布外的情形可能失效。', 'No explicit, extrapolating physical laws: the model learns statistical regularities of its training data and may fail outside that distribution.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('1998 年的实验中，用机械手挠被试的手掌：被试自己操作时感觉不痒；在动作与触碰之间加入延迟或改变方向，痒感随之增强，说明抵消依赖准确的预测。', 'In a 1998 experiment, a robotic device tickled participants’ palms. Self-operated touch felt less ticklish, and adding delay or changing direction between action and touch increased the tickle, showing cancellation depends on accurate prediction.'),
      b('前向模型从「动作」预测「感觉」，逆模型则从「想要的结果」算出「需要的动作」；小脑被认为同时学习这两类内部模型。', 'A forward model predicts sensation from action, and an inverse model computes the needed action from the desired result. The cerebellum is thought to learn both kinds of internal model.'),
      b('预测编码是对皮层功能的一种解释框架：它预测误差信号的存在和层级流向，部分证据支持，但「整个皮层都在做预测编码」仍有争议。', 'Predictive coding is an explanatory framework for cortex. It predicts error signals and their flow between levels, with partial support, but whether all of cortex works this way is debated.'),
      b('物理直觉研究中，一个「带噪声的物理模拟器」模型能很好地拟合人对积木塔稳定性和倒向的判断，包括人的典型错误。', 'In studies of physical intuition, a noisy physics simulator model fits people’s judgments of tower stability and fall direction well, including their typical errors.'),
    ],
    computational: [
      b('世界模型的思路可以追溯到 2018 年的「World Models」：先学习环境的压缩模型，再在模型中训练控制器。', 'The idea traces back to the 2018 paper World Models: first learn a compressed model of the environment, then train a controller inside it.'),
      b('2025 年发表的 Dreamer 用同一套超参数在 150 多个任务上训练，包括从零开始在 Minecraft 中采集钻石；这说明的是算法的通用性，不是单个智能体同时掌握所有任务。', 'Dreamer, published in 2025, trained on more than 150 tasks with one set of hyperparameters, including collecting diamonds in Minecraft from scratch. This shows the algorithm is general, not that one agent masters all tasks at once.'),
      b('MuZero 学习一个只预测奖赏、价值和策略的模型，并用它做树搜索，在围棋、国际象棋和 Atari 上达到很强的水平。', 'MuZero learns a model that predicts only reward, value and policy and searches with it, reaching strong play in Go, chess and Atari.'),
      b('JEPA 等方法主张在抽象的表示空间中预测，而不是逐像素生成，以避免把能力花在无关细节上。', 'Approaches such as JEPA argue for predicting in an abstract representation space rather than generating every pixel, to avoid spending capacity on irrelevant detail.'),
    ],
  },
  bioMath: [
    {
      title: b('前向模型：预测感觉后果，并用误差修正自身', 'Forward model: predicting sensory outcomes and learning from the error'),
      tex: t`\hat{s}_{t+1} = f_{w}(s_t, u_t),\qquad e_{t+1} = s_{t+1} - \hat{s}_{t+1},\qquad \Delta w = \eta\, e_{t+1}\,\frac{\partial f_w}{\partial w}`,
      symbols: [
        { tex: t`s_t`, meaning: b('当前的身体与感觉状态，例如手的位置', 'current body and sensory state, such as hand position') },
        { tex: t`u_t`, meaning: b('运动指令（小脑收到的是它的副本）', 'motor command, of which the cerebellum receives a copy') },
        { tex: t`f_w`, meaning: b('前向模型，$w$ 是它的参数（小脑中的突触）', 'the forward model, with parameters $w$, synapses in the cerebellum') },
        { tex: t`\hat{s}_{t+1}`, meaning: b('预测的感觉结果', 'predicted sensory result') },
        { tex: t`e_{t+1}`, meaning: b('预测误差：真实减去预测', 'prediction error: actual minus predicted') },
        { tex: t`\eta`, meaning: b('学习率', 'learning rate') },
      ],
      steps: [
        b('动作开始时，用指令副本和当前状态算出预测的感觉。', 'As the movement starts, compute the predicted sensation from the command copy and current state.'),
        b('真实感觉到达后，减去预测：被预测到的部分抵消为 $0$，剩下的是误差。', 'When real sensation arrives, subtract the prediction. The predicted part cancels to $0$, and the remainder is the error.'),
        b('误差沿着「哪个参数对预测影响最大」的方向修正前向模型。', 'The error corrects the forward model along the parameters that most affect the prediction.'),
      ],
      example: b(
        '自己挠手心时，预测的触觉为 $1$、真实触觉为 $1$，误差为 $0$，几乎感觉不到；别人挠时没有预测，误差为 $1$，感觉强烈。戴上偏移 10 度的棱镜后，伸手的落点误差起初为 10 度，每次按误差修正一部分，几十次后误差接近 $0$。',
        'Tickling your own palm, the predicted touch is $1$ and the actual is $1$, so the error is $0$ and little is felt. When someone else does it, nothing is predicted, the error is $1$ and it feels strong. With prisms shifting the view by 10 degrees, reaching errors start at 10 degrees, and correcting a share each time brings them close to $0$ after tens of tries.'),
      consequences: [
        b('解释了自我产生的感觉为何被减弱，以及感觉反馈延迟时动作为何仍能平稳。', 'It explains why self-made sensations are weakened and why movement stays smooth despite delayed feedback.'),
        b('也解释了运动适应：误差逐次减小，摘掉棱镜后会出现反方向的后效。', 'It also explains motor adaptation: errors shrink trial by trial, and removing the prisms causes an aftereffect in the opposite direction.'),
      ],
      limitations: [
        b('真实的前向模型是非线性、高维的，公式只表示其原理。', 'Real forward models are nonlinear and high-dimensional, and the formula shows only the principle.'),
        b('小脑中误差信号的确切编码方式仍在研究。', 'Exactly how the cerebellum encodes the error signal is still being studied.'),
      ],
    },
    {
      title: b('预测编码：高层预测低层，误差向上传', 'Predictive coding: higher levels predict lower ones, errors flow up'),
      tex: t`\boldsymbol{\varepsilon} = \mathbf{x} - W\mathbf{r},\qquad \tau\,\frac{d\mathbf{r}}{dt} = W^{\top}\boldsymbol{\varepsilon} - \lambda\,\mathbf{r},\qquad \Delta W \propto \boldsymbol{\varepsilon}\,\mathbf{r}^{\top}`,
      symbols: [
        { tex: t`\mathbf{x}`, meaning: b('低层的输入（例如图像的局部特征）', 'input at the lower level, such as local image features') },
        { tex: t`\mathbf{r}`, meaning: b('高层的表征（对输入原因的估计）', 'representation at the higher level, an estimate of what caused the input') },
        { tex: t`W`, meaning: b('从高层到低层的预测权重', 'prediction weights from higher to lower level') },
        { tex: t`\boldsymbol{\varepsilon}`, meaning: b('预测误差：输入中没被预测到的部分', 'prediction error: the part of the input not predicted') },
        { tex: t`\lambda`, meaning: b('让表征保持简洁的约束强度', 'strength of a constraint that keeps the representation simple') },
        { tex: t`\tau`, meaning: b('表征更新的时间常数', 'time constant of updating the representation') },
      ],
      steps: [
        b('高层用当前表征 $\\mathbf{r}$ 生成对低层输入的预测 $W\\mathbf{r}$，送到低层。', 'The higher level uses its representation $\\mathbf{r}$ to predict the lower input, $W\\mathbf{r}$, and sends it down.'),
        b('低层算出误差，只把误差向上传。', 'The lower level computes the error and sends only the error up.'),
        b('高层按误差调整表征，直到误差足够小；长期来看，权重按「误差乘表征」学习，使预测越来越准。', 'The higher level adjusts its representation until the error is small. Over time, weights learn by error times representation, so predictions improve.'),
      ],
      example: b(
        '一维情况：输入 $x = 2$，权重 $W = 1$，表征起初 $r = 0$。误差 $\\varepsilon = 2$，表征向上调整；当 $r$ 接近 $2$（忽略 $\\lambda$）时，误差接近 $0$，不再向上传东西。之后如果输入突然变成 $3$，误差又变为 $1$，只有「变化」被传上去。',
        'In one dimension: input $x = 2$, weight $W = 1$, representation starting at $r = 0$. The error is $\\varepsilon = 2$, so the representation rises. As $r$ nears $2$, ignoring $\\lambda$, the error nears $0$ and nothing more goes up. If the input suddenly becomes $3$, the error is $1$ again, so only the change is sent up.'),
      consequences: [
        b('可预测的输入在低层被「解释掉」，只有新信息向上传，节省了传递。', 'Predictable input is explained away at the lower level, and only new information goes up, saving transmission.'),
        b('预测与输入不符时出现的误差信号，在小鼠视觉皮层和人类脑电中都有观察。', 'Error signals when input mismatches prediction have been observed in mouse visual cortex and in human brain recordings.'),
      ],
      limitations: [
        b('皮层中是否存在专门的「误差神经元」和「预测神经元」，以及它们怎样分布在各层，仍有争议。', 'Whether cortex has dedicated error and prediction neurons, and how they are arranged across layers, is debated.'),
        b('模型是线性的、每层一个，真实皮层的预测涉及多个区域和时间尺度。', 'The model is linear with one unit per level, while real cortical prediction spans many areas and time scales.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('世界模型的训练目标：重建观测、预测奖赏、约束潜在状态', 'World model objective: reconstruct, predict reward, regularize the latent state'),
      tex: t`\mathcal{L} = \mathbb{E}\Big[\sum_t -\ln p(x_t \mid h_t, z_t) - \ln p(r_t \mid h_t, z_t) + \beta\,\mathrm{KL}\big(q(z_t \mid h_t, x_t)\,\big\Vert\,p(z_t \mid h_t)\big)\Big],\quad h_t = f(h_{t-1}, z_{t-1}, a_{t-1})`,
      symbols: [
        { tex: t`x_t,\;r_t,\;a_t`, meaning: b('第 $t$ 步的观测、奖赏和动作', 'observation, reward and action at step $t$') },
        { tex: t`h_t`, meaning: b('循环网络的确定性状态，记住过去', 'deterministic recurrent state that remembers the past') },
        { tex: t`z_t`, meaning: b('随机的潜在状态，描述这一步的情形', 'stochastic latent state describing this step') },
        { tex: t`q(z_t \mid h_t, x_t)`, meaning: b('看到观测后对潜在状态的估计', 'estimate of the latent state after seeing the observation') },
        { tex: t`p(z_t \mid h_t)`, meaning: b('没看到观测、只靠预测得到的潜在状态', 'latent state predicted without seeing the observation') },
        { tex: t`\beta`, meaning: b('两者差异项的权重', 'weight on the difference between the two') },
      ],
      steps: [
        b('循环网络根据上一步的状态和动作更新 $h_t$，这就是对「接下来会怎样」的预测。', 'The recurrent network updates $h_t$ from the previous state and action, its prediction of what comes next.'),
        b('前两项要求潜在状态能重建观测、预测奖赏，保证它包含有用的信息。', 'The first two terms require the latent state to reconstruct observations and predict rewards, so it holds useful information.'),
        b('KL 项要求「只靠预测」的潜在状态与「看到观测后」的潜在状态一致：差得越多，说明预测越差。训练降低这一项，就是在学习预测。', 'The KL term asks the predicted latent state to match the one after seeing the observation. The bigger the gap, the worse the prediction, and lowering it is learning to predict.'),
      ],
      example: b(
        '一个球在画面中向右滚。若模型已学会运动规律，预测的潜在状态 $p$ 与看到下一帧后的 $q$ 几乎相同，KL 接近 $0$。若球突然撞墙反弹而模型没学过，两者差异大，KL 变大，训练就修正动态模型。',
        'A ball rolls right in the frame. If the model has learned the motion, the predicted latent $p$ almost equals $q$ after seeing the next frame, and the KL is near $0$. If the ball suddenly bounces off a wall the model never learned, the two differ, the KL grows and training corrects the dynamics.'),
      consequences: [
        b('训练后，模型可以不看观测，只靠 $p$ 连续预测很多步，这就是「想象」。', 'After training, the model can predict many steps using only $p$ without observations, which is imagination.'),
        b('KL 项与预测编码中的预测误差作用相近：都衡量「预测与实际之差」并用它学习。', 'The KL term plays a role like prediction error in predictive coding: both measure prediction against reality and learn from it.'),
      ],
      limitations: [
        b('模型学到的是训练数据中的统计规律，分布外的物理情形可能预测错误。', 'The model learns statistics of its training data and may mispredict physics outside that distribution.'),
        b('重建观测要求模型关注像素细节，其中许多与决策无关。', 'Reconstructing observations forces attention to pixel detail, much of it irrelevant to decisions.'),
      ],
    },
    {
      title: b('想象中的误差累积：每步一点偏差，展开越长偏得越远', 'Error compounding in imagination: a small error each step grows with the horizon'),
      tex: t`\lVert \hat{s}_{t+1} - s_{t+1} \rVert \le \varepsilon + L\,\lVert \hat{s}_{t} - s_{t} \rVert \qquad\Longrightarrow\qquad \lVert \hat{s}_{H} - s_{H} \rVert \le \varepsilon \sum_{k=0}^{H-1} L^{k}`,
      symbols: [
        { tex: t`s_t,\ \hat{s}_t`, meaning: b('第 $t$ 步的真实状态和想象中的状态', 'true and imagined state at step $t$') },
        { tex: t`\varepsilon`, meaning: b('世界模型单步预测的最大误差', 'largest one-step error of the world model') },
        { tex: t`L`, meaning: b('环境动力学对状态差异的放大倍数：两个状态差一点，走一步后最多差 $L$ 倍', 'how much the dynamics amplify a difference: states that differ slightly differ at most $L$ times as much after one step') },
        { tex: t`H`, meaning: b('想象展开的步数', 'number of imagined steps') },
      ],
      steps: [
        b('第一步从真实状态出发，偏差只有模型本身的误差 $\\varepsilon$。', 'The first step starts from a true state, so the deviation is just the model error $\\varepsilon$.'),
        b('之后每一步，已有的偏差被动力学放大最多 $L$ 倍，再加上这一步新的 $\\varepsilon$；想象中没有真实观测来纠正它。', 'At every later step, the existing deviation is amplified by up to $L$ and a new $\\varepsilon$ is added. Nothing observed in the real world corrects it.'),
        b('把 $H$ 步加起来得到右边的界：$L = 1$ 时误差随步数线性增长，$L > 1$ 时指数增长。', 'Summing $H$ steps gives the bound on the right. With $L = 1$ the error grows linearly with the steps, with $L > 1$ exponentially.'),
      ],
      example: b(
        '设 $\\varepsilon = 0.01$、$L = 1.2$。想象 5 步，误差上界约 $0.07$；15 步约 $0.72$；30 步约 $12$。单步只有百分之一的误差，30 步后已经完全偏离。',
        'Let $\\varepsilon = 0.01$ and $L = 1.2$. Over 5 imagined steps the bound is about $0.07$, over 15 about $0.72$, over 30 about $12$. A one percent error per step leaves the trajectory far off after 30 steps.'),
      consequences: [
        b('解释了 Dreamer 这类方法为什么只想象十几步：再长，想象的轨迹就与真实相去甚远。', 'It explains why methods like Dreamer imagine only about fifteen steps: longer trajectories drift far from reality.'),
        b('生物侧的前向模型每一步都与实际的感觉反馈比较，用误差修正（见前向模型公式），所以在线运动中误差不会这样累积。', 'The forward model on the biological side is compared with actual sensory feedback at every step and corrected by the error (see the forward model equation), so in ongoing movement the error does not compound like this.'),
      ],
      limitations: [
        b('这是最坏情况的上界，实际误差常小于它，也取决于策略把状态带到了哪里。', 'This is a worst-case bound. Actual errors are often smaller and depend on where the policy takes the state.'),
        b('策略在想象中训练时，可能专门走向模型出错的地方，使实际误差比随机情况更大。', 'A policy trained in imagination may steer toward states where the model is wrong, making errors larger than in random cases.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('预测也会出错', 'Predictions can mislead'),
        text: b('很强的预期会改变知觉本身，让人看到或听到预期中的东西。', 'Strong expectations change perception itself, so people see or hear what they expect.'),
        steps: [3, 5],
      },
      {
        title: b('物理直觉有系统偏差', 'Physical intuition has biases'),
        text: b('人对某些运动（如抛物线、曲线管道中的球）的直觉判断会系统性出错。', 'People systematically misjudge some motions, such as projectile paths or a ball leaving a curved tube.'),
        steps: [6],
      },
      {
        title: b('适应需要时间', 'Adaptation takes time'),
        text: b('身体或环境改变后，前向模型要经过多次尝试才能重新校准。', 'After the body or environment changes, the forward model needs many tries to recalibrate.'),
        steps: [4],
      },
    ],
    computational: [
      {
        title: b('不能外推物理规律', 'No extrapolation of physics'),
        text: b('2024 年的研究中，视频生成模型在训练分布外不能正确外推运动规律，更像在匹配相似案例。', 'In a 2024 study, video generation models failed to extrapolate motion laws outside their training distribution, behaving more like case matching.'),
        steps: [2, 6],
      },
      {
        title: b('想象中的误差会累积', 'Errors compound in imagination'),
        text: b('想象的步数越多，预测越偏离真实，长时程规划受限。', 'The more steps are imagined, the further predictions drift from reality, limiting long-horizon planning.'),
        steps: [4],
      },
      {
        title: b('策略会利用模型的漏洞', 'Policies exploit model errors'),
        text: b('策略在想象中找到世界模型预测错误的地方并加以利用，到真实环境中就会失败。', 'In imagination, a policy can find and exploit places where the world model is wrong, then fail in the real environment.'),
        steps: [5],
      },
    ],
    misreadings: [
      {
        claim: b('大脑就是一台预测机器，皮层只做预测编码', 'The brain is just a prediction machine running predictive coding'),
        fact: b('预测在运动控制和知觉中作用明确；但「整个皮层都按预测编码工作」是一种有争议的理论框架。', 'Prediction clearly matters in motor control and perception. But that all of cortex runs predictive coding is a debated theoretical framework.'),
      },
      {
        claim: b('能生成逼真视频，就理解了物理', 'Generating realistic video means understanding physics'),
        fact: b('视频在训练分布内看起来逼真，但分布外的物理规律常常外推失败；逼真不等于掌握了规律。', 'Videos look realistic within the training distribution, but physical laws often fail to extrapolate outside it. Realism is not mastery of the laws.'),
        source: b('2024 年 OpenAI 介绍 Sora 的技术报告题为「视频生成模型作为世界模拟器」。', 'OpenAI’s 2024 technical report on Sora was titled “Video generation models as world simulators”.'),
      },
    ],
  },
  refs: {
    neuro: ['wolpert1998', 'blakemore1998', 'shadmehr2010', 'keller2012', 'battaglia2013'],
    models: ['rao1999', 'friston2010'],
    ai: ['ha2018', 'janner2019', 'hafner2023', 'hafner2025', 'schrittwieser2020', 'lecun2022', 'kang2024'],
  },
}
