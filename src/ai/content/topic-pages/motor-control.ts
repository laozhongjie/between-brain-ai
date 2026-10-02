import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F26 Motor control and online correction: cerebellar internal models and spinal feedback vs robot feedback control and MPC. */
export const MOTOR_CONTROL: TopicContent = {
  thesis: {
    biological: b(
      '运动由多层反馈回路共同控制：脊髓反射在约 30 毫秒内对肌肉的拉伸作出反应，经皮层的反馈在 50 到 100 毫秒内按任务目标调整，小脑的前向模型在感觉反馈到达之前就预测并校正动作。大脑只纠正影响任务的偏差，其余变化任其存在；它还能同时收紧相互拮抗的肌肉，改变关节的刚度来应对不稳定的环境。',
      'Movement is controlled by layers of feedback loops. Spinal reflexes respond to muscle stretch in about 30 ms, transcortical feedback adjusts by task goal in 50 to 100 ms and the cerebellar forward model predicts and corrects movement before sensory feedback arrives. The brain corrects only deviations that matter for the task and lets other variation be. It can also co-contract opposing muscles to change joint stiffness in unstable conditions.'),
    computational: b(
      '机器人的底层关节控制以每秒上千次的频率运行；模型预测控制（MPC）在每个控制周期用动力学模型预测未来一段时间，求出最优的动作序列，只执行第一步，下个周期重新计算。近年来，在仿真中用强化学习训练的策略，已让四足机器人能在泥地、雪地和碎石上行走。',
      'A robot’s low-level joint control runs a thousand or more times per second. Model predictive control, MPC, uses a dynamics model each cycle to predict a stretch of the future and solve for the best action sequence, executes only the first step and recomputes next cycle. In recent years, policies trained by reinforcement learning in simulation have let quadruped robots walk on mud, snow and rubble.'),
    gap: b(
      '机器人的回路更快、更精确；大脑的部件慢而有噪声，却靠预测、分层反馈和刚度调节实现了灵活而稳健的控制。差距集中在接触丰富的精细操作：人的手有密集的触觉，能在几十毫秒内调整握力，机器人的触觉感知和柔顺性仍然有限。',
      'Robot loops are faster and more precise. The brain’s parts are slow and noisy, yet prediction, layered feedback and stiffness control give flexible, robust control. The gap centers on contact-rich fine manipulation. The human hand has dense touch and adjusts grip force within tens of milliseconds, while robot touch sensing and compliance remain limited.'),
  },
  short: { biological: b('人', 'People'), computational: b('机器人', 'Robots') },
  kinds: ['behavior', 'algorithm', 'math'],
  evidence: 'established',
  asOf: b('计算侧描述截至 2026 年 10 月的机器人反馈控制、模型预测控制与学习型运动策略；具体结果按发表年份注明。', 'The computational column describes robot feedback control, model predictive control and learned locomotion policies as of October 2026. Results are dated by publication year.'),
  capabilities: [
    {
      lead: 'comp',
      dimension: b('控制回路的速度', 'Speed of control loops'),
      brain: b('最快的脊髓反射约 30 毫秒，视觉反馈校正需要 100 毫秒以上。', 'The fastest spinal reflex takes about 30 ms, and correction by vision takes over 100 ms.'),
      ai: b('关节层的控制回路每秒运行上千次，每个周期约 1 毫秒。', 'Joint-level control loops run a thousand or more times per second, about 1 ms per cycle.'),
      gap: b('机器人的回路比神经回路快一到两个数量级；大脑用预测弥补自身的延迟。', 'Robot loops are one to two orders of magnitude faster. The brain uses prediction to make up for its delays.'),
    },
    {
      lead: 'comp',
      dimension: b('精度与重复性', 'Precision and repeatability'),
      brain: b('同一个动作每次都略有不同，误差随速度和力量增大。', 'The same movement differs slightly each time, and error grows with speed and force.'),
      ai: b('工业机械臂能以亚毫米级的精度反复到达同一位置。', 'Industrial arms return to the same position again and again with sub-millimeter precision.'),
      gap: b('在结构化、重复的任务中，机器人的精度远超人。', 'In structured, repetitive tasks, robot precision far exceeds human precision.'),
    },
    {
      lead: 'even',
      dimension: b('在复杂地形上行走', 'Walking on rough terrain'),
      brain: b('人和动物能在冰面、碎石和泥地上调整步态，不需要事先了解地面。', 'People and animals adjust their gait on ice, gravel and mud without knowing the ground in advance.'),
      ai: b('2020 年的研究中，在仿真中训练的四足机器人策略在泥地、雪地、碎石等真实地形上稳定行走；2021 年的方法能在零点几秒内适应负重和地面变化。', 'In a 2020 study, a quadruped policy trained in simulation walked stably on real mud, snow and rubble. A 2021 method adapted to payloads and ground changes within fractions of a second.'),
      gap: b('在腿式运动上，学习型策略已接近动物的稳健性。', 'In legged locomotion, learned policies now approach animal robustness.'),
    },
    {
      lead: 'bio',
      dimension: b('接触丰富的精细操作', 'Contact-rich fine manipulation'),
      brain: b('手指皮肤的触觉感受器密集，物体开始打滑时，握力在约 70 毫秒内自动增加；拿起新物体时，握力根据记忆中的重量和摩擦提前设定。', 'Fingertip skin is dense with touch receptors. When an object starts to slip, grip force rises automatically within about 70 ms, and when lifting a new object, grip is preset from remembered weight and friction.'),
      ai: b('机器人的触觉感知稀疏，多数系统主要依靠视觉和关节力矩；拧瓶盖、穿线等需要连续接触调整的任务仍然困难。', 'Robot touch sensing is sparse, and most systems rely mainly on vision and joint torque. Tasks needing continuous contact adjustment, such as unscrewing a cap or threading, remain hard.'),
      gap: b('触觉和柔顺性是机器人精细操作的主要短板。', 'Touch and compliance are the main weaknesses of robots in fine manipulation.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('目标与计划', 'Goal and plan'),
        points: [b('顶叶和运动前区根据目标位置和身体状态，确定要做的动作。', 'Parietal and premotor cortex choose the movement from the goal location and the body’s state.')],
      },
      {
        title: b('运动皮层发出指令', 'Motor cortex sends commands'),
        points: [
          b('初级运动皮层的指令经皮质脊髓束到达脊髓，驱动运动神经元和肌肉。', 'Commands from primary motor cortex travel down the corticospinal tract to the spinal cord, driving motor neurons and muscles.'),
          b('同一指令的副本送到小脑。', 'A copy of the same command goes to the cerebellum.'),
        ],
      },
      {
        title: b('小脑预测与校正', 'Cerebellar prediction and correction'),
        points: [b('小脑用前向模型预测动作结果，在感觉反馈到达之前校正指令，原理见[世界模型与预测](topic:world-models)。', 'The cerebellum predicts the outcome with a forward model and corrects the command before sensory feedback arrives, explained in [world models and prediction](topic:world-models).')],
      },
      {
        title: b('脊髓反射', 'Spinal reflex'),
        points: [b('肌梭感受到肌肉被意外拉长，信号在脊髓内直接兴奋同一肌肉的运动神经元，约 30 毫秒内使肌肉收缩回去。', 'Muscle spindles sense unexpected stretch, and in the spinal cord the signal directly excites that muscle’s motor neurons, contracting it back within about 30 ms.')],
      },
      {
        title: b('经皮层的长潜伏期反馈', 'Long-latency transcortical feedback'),
        points: [
          b('感觉信号上行到皮层再返回，约 50 到 100 毫秒后产生第二阶段的校正。', 'Sensory signals go up to cortex and back, producing a second correction after about 50 to 100 ms.'),
          b('这一校正按任务目标调整：只纠正影响任务完成的偏差，与任务无关的偏差不纠正。', 'This correction depends on the task goal: it fixes only deviations that affect the task and leaves irrelevant ones alone.'),
        ],
      },
      {
        title: b('刚度调节', 'Stiffness control'),
        points: [b('同时收缩一对相互拮抗的肌肉，可以让关节变硬，不依赖反馈就能抵抗突然的扰动。', 'Contracting a pair of opposing muscles together stiffens the joint, resisting sudden disturbances without waiting for feedback.')],
      },
    ],
    computational: [
      {
        title: b('状态估计', 'State estimation'),
        points: [b('关节编码器、惯性测量单元和相机的读数，经卡尔曼滤波等方法合成对机器人当前状态的估计。', 'Readings from joint encoders, inertial units and cameras are fused, for example by Kalman filtering, into an estimate of the robot’s current state.')],
      },
      {
        title: b('MPC 优化', 'MPC optimization'),
        points: [b('用动力学模型预测未来一段时间（例如 0.5 秒）的运动，求出使代价最小的动作序列：既要跟上目标，又要节省力气、满足约束。', 'A dynamics model predicts motion over a horizon, for example 0.5 s, and an optimizer finds the action sequence with least cost: tracking the target while saving effort and meeting constraints.')],
      },
      {
        title: b('滚动执行', 'Receding horizon'),
        points: [b('只执行序列中的第一步，下一个周期用新的状态重新求解。', 'Only the first step of the sequence is executed, and the next cycle solves again from the new state.')],
      },
      {
        title: b('底层反馈', 'Low-level feedback'),
        points: [b('每个关节的电机控制器以千赫兹频率跟踪目标位置或力矩。', 'Each joint’s motor controller tracks a target position or torque at kilohertz rates.')],
      },
      {
        title: b('学习型策略', 'Learned policies'),
        points: [b('也可以在仿真中用强化学习训练一个神经网络策略，直接输出关节目标；随机化仿真中的地形和物理参数，使它能迁移到真实世界。', 'A neural network policy can also be trained by reinforcement learning in simulation to output joint targets directly. Randomizing terrain and physics in simulation lets it transfer to the real world.')],
      },
      {
        title: b('缺失的一步', 'The missing step'),
        points: [b('缺少像皮肤一样密集的触觉和像肌肉一样可调的柔顺性，接触中的细微变化难以感知和应对。', 'Missing skin-like dense touch and muscle-like adjustable compliance, so small changes during contact are hard to sense and handle.')],
      },
    ],
  },
  archNotes: {
    biological: [
      b('最优反馈控制理论于 2002 年提出：大脑像一个最优控制器，持续根据当前状态调整指令，并且只纠正影响任务的偏差，这被称为「最小干预原则」。', 'Optimal feedback control theory, proposed in 2002, treats the brain as an optimal controller that keeps adjusting commands to the current state and corrects only deviations that affect the task, the minimum intervention principle.'),
      b('长潜伏期的拉伸反应会随任务指令改变：被要求保持位置时反应强，被要求放松时反应弱，说明这一层反馈已经包含了目标信息。', 'The long-latency stretch response changes with task instructions, strong when told to hold position and weak when told to relax, showing this feedback already carries goal information.'),
      b('2001 年的实验中，人在不稳定的力场中伸手，几十次尝试后学会只在不稳定的方向上提高手臂刚度，以最小的力气保持稳定。', 'In a 2001 experiment, people reaching in an unstable force field learned within tens of tries to stiffen the arm only in the unstable direction, staying stable with least effort.'),
      b('1994 年的经典实验中，在伸手时施加与速度相关的侧向力，人在约一百次尝试内适应，撤去力场后出现反方向的偏差（后效），说明大脑学到了新的内部模型。', 'In a classic 1994 experiment, a velocity-dependent sideways force was applied during reaching. People adapted within about a hundred tries and showed opposite errors when it was removed, an aftereffect showing a new internal model had been learned.'),
    ],
    computational: [
      b('MIT Cheetah 3 用简化的凸优化 MPC 实现了动态奔跑和跳跃，每个周期在几毫秒内求解。', 'MIT Cheetah 3 used a simplified convex MPC for dynamic running and jumping, solving each cycle in milliseconds.'),
      b('2020 年的四足机器人策略先在仿真中由「看得见地形」的老师策略学习，再教给只用本体感觉的学生策略，后者在真实野外地形上行走了数公里。', 'A 2020 quadruped policy was first learned by a teacher policy with access to terrain in simulation, then taught to a student using only proprioception, which walked kilometers over real outdoor terrain.'),
      b('RMA 方法让策略从最近的运动历史中估计环境参数（如负重、摩擦），在零点几秒内适应变化，与小脑的快速适应在功能上相似。', 'The RMA method lets a policy estimate environment parameters such as payload and friction from recent motion history and adapt within fractions of a second, functionally like rapid cerebellar adaptation.'),
      b('机器人可以通过控制算法模拟可变刚度（阻抗控制），但电机和减速器的物理特性与肌肉差别很大。', 'Robots can emulate variable stiffness with control algorithms, called impedance control, but motors and gearboxes differ physically from muscle.'),
    ],
  },
  bioMath: [
    {
      title: b('最优反馈控制：只纠正影响任务的偏差', 'Optimal feedback control: correcting only what matters for the task'),
      tex: t`J = \sum_{t}\big(\mathbf{x}_t^{\top} Q\,\mathbf{x}_t + \mathbf{u}_t^{\top} R\,\mathbf{u}_t\big),\qquad \mathbf{u}_t = -L_t\,\hat{\mathbf{x}}_t`,
      symbols: [
        { tex: t`\mathbf{x}_t`, meaning: b('身体状态与目标之间的偏差', 'deviation of the body state from the goal') },
        { tex: t`\mathbf{u}_t`, meaning: b('运动指令', 'motor command') },
        { tex: t`Q`, meaning: b('偏差的代价：只在影响任务的方向上取大值', 'cost of deviation: large only in directions that affect the task') },
        { tex: t`R`, meaning: b('用力的代价', 'cost of effort') },
        { tex: t`L_t`, meaning: b('反馈增益：由 $Q$ 和 $R$ 算出的最优值', 'feedback gain, optimal given $Q$ and $R$') },
        { tex: t`\hat{\mathbf{x}}_t`, meaning: b('对当前状态的估计（结合预测和感觉）', 'estimate of the current state, combining prediction and sensation') },
      ],
      steps: [
        b('写出代价：偏离目标要付代价，用力也要付代价。', 'Write the cost: deviating from the goal costs, and so does effort.'),
        b('求使总代价最小的控制规则，结果是一个反馈：指令等于状态估计乘以增益。', 'Find the control rule that minimizes the total cost. The result is feedback: the command equals the state estimate times a gain.'),
        b('因为 $Q$ 只在影响任务的方向上大，增益也只在这些方向上大，与任务无关的偏差几乎不被纠正。', 'Because $Q$ is large only in task-relevant directions, so is the gain, and task-irrelevant deviations are barely corrected.'),
      ],
      example: b(
        '用手指按下一个按钮：按钮在垂直方向上的位置要求精确，手指在水平方向偏一点无所谓。设垂直方向 $Q = 100$、水平方向 $Q = 1$，用力代价 $R = 1$，则垂直方向的反馈增益远大于水平方向。受到扰动时，垂直偏差被迅速纠正，水平偏差基本保留，实验中手的变异也正是这样分布的。',
        'Pressing a button with a finger: the vertical position must be exact, and a small horizontal offset does not matter. With $Q = 100$ vertically, $Q = 1$ horizontally and effort cost $R = 1$, the vertical gain is far larger than the horizontal. After a push, vertical deviation is quickly corrected and horizontal deviation largely remains, matching how hand variability is distributed in experiments.'),
      consequences: [
        b('解释了为什么动作每次不同却总能完成任务：变异集中在不影响任务的方向上。', 'It explains why movements differ each time yet complete the task: variability collects in task-irrelevant directions.'),
        b('把运动控制看作持续的反馈，而不是先规划好轨迹再执行。', 'It treats motor control as continuous feedback rather than planning a trajectory and then executing it.'),
      ],
      limitations: [
        b('代价函数是研究者设定的，大脑怎样表示和学习它仍不清楚。', 'The cost function is chosen by researchers, and how the brain represents and learns it is unclear.'),
        b('真实系统是非线性、有延迟的，线性二次形式只是近似。', 'Real systems are nonlinear and delayed, and the linear-quadratic form is an approximation.'),
      ],
    },
    {
      title: b('刚度调节：同时收紧拮抗肌，不依赖反馈抵抗扰动', 'Stiffness control: co-contraction resists disturbance without feedback'),
      tex: t`\tau = -K\,(\theta - \theta_d) - B\,\dot{\theta},\qquad K \approx k\,(a_{\text{flex}} + a_{\text{ext}})`,
      symbols: [
        { tex: t`\theta,\;\theta_d`, meaning: b('关节的实际角度和目标角度', 'actual and target joint angle') },
        { tex: t`\tau`, meaning: b('肌肉产生的恢复力矩', 'restoring torque from the muscles') },
        { tex: t`K,\;B`, meaning: b('关节的刚度和阻尼', 'joint stiffness and damping') },
        { tex: t`a_{\text{flex}},\;a_{\text{ext}}`, meaning: b('屈肌和伸肌的激活程度', 'activation of the flexor and extensor muscles') },
        { tex: t`k`, meaning: b('激活与刚度之间的比例系数', 'factor relating activation to stiffness') },
      ],
      steps: [
        b('肌肉像弹簧：关节偏离目标角度时，产生把它拉回来的力矩，大小与偏离量和刚度成正比。', 'Muscles act like springs. When a joint deviates from its target, they produce a torque pulling it back, proportional to the deviation and the stiffness.'),
        b('屈肌和伸肌同时收紧，两者的拉力相互抵消，关节不动，但刚度增加。', 'Tightening flexor and extensor together cancels their pulls so the joint stays put, but stiffness rises.'),
        b('刚度高时，即使反馈还没来得及起作用，扰动造成的偏离也更小。', 'With high stiffness, a disturbance causes less deviation even before feedback can act.'),
      ],
      example: b(
        '设外力矩为 $2$ 个单位。肌肉放松时 $K = 1$，关节被推偏约 $2$ 个单位；同时收紧使 $K = 4$ 时，只偏约 $0.5$。代价是收紧要额外消耗能量，所以人只在需要时、只在需要的方向上提高刚度。',
        'Let an outside torque be $2$ units. With relaxed muscles, $K = 1$, the joint is pushed about $2$ units off. Co-contracting to $K = 4$ cuts this to about $0.5$. The cost is extra energy, so people raise stiffness only when and where needed.'),
      consequences: [
        b('不依赖延迟的反馈就能应对突然的扰动，弥补神经回路慢的缺点。', 'It handles sudden disturbances without waiting for delayed feedback, offsetting slow neural loops.'),
        b('机器人中的阻抗控制使用同样的方程，通过算法而不是拮抗肌来设定刚度。', 'Impedance control in robots uses the same equation, setting stiffness by algorithm instead of opposing muscles.'),
      ],
      limitations: [
        b('肌肉的力与长度、速度的关系是非线性的，线性弹簧只是近似。', 'Muscle force depends nonlinearly on length and velocity, and a linear spring is an approximation.'),
        b('模型没有包括反射，真实的刚度还会因反射增益而改变。', 'The model leaves out reflexes, and real stiffness also changes with reflex gain.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('模型预测控制：每个周期求解一段未来的最优动作', 'Model predictive control: solving for the best near future every cycle'),
      tex: t`\min_{\mathbf{u}_{0:N-1}} \sum_{k=0}^{N-1}\big(\lVert \mathbf{x}_k - \mathbf{x}_k^{\text{ref}} \rVert_Q^2 + \lVert \mathbf{u}_k \rVert_R^2\big)\quad \text{s.t.}\quad \mathbf{x}_{k+1} = f(\mathbf{x}_k, \mathbf{u}_k),\;\; \mathbf{u}_k \in \mathcal{U}`,
      symbols: [
        { tex: t`N`, meaning: b('预测的步数（预测时域）', 'number of steps predicted, the horizon') },
        { tex: t`\mathbf{x}_k,\;\mathbf{x}_k^{\text{ref}}`, meaning: b('第 $k$ 步预测的状态和期望的状态', 'predicted and desired state at step $k$') },
        { tex: t`\mathbf{u}_k`, meaning: b('第 $k$ 步的动作', 'action at step $k$') },
        { tex: t`f`, meaning: b('机器人的动力学模型', 'the robot’s dynamics model') },
        { tex: t`\mathcal{U}`, meaning: b('允许的动作范围，例如力矩上限', 'allowed actions, such as torque limits') },
        { tex: t`Q,\;R`, meaning: b('跟踪误差和用力的权重', 'weights on tracking error and effort') },
      ],
      steps: [
        b('从当前估计的状态出发，用动力学模型预测未来 $N$ 步。', 'From the current estimated state, predict $N$ steps ahead with the dynamics model.'),
        b('求一串动作，使预测的轨迹尽量接近期望，同时用力小、不超出限制。', 'Find a sequence of actions that keeps the predicted path near the desired one with little effort and within limits.'),
        b('只执行第一步；下一个周期用新的测量重新求解，所以模型误差和扰动会被不断纠正。', 'Execute only the first step. The next cycle solves again with new measurements, so model errors and disturbances keep being corrected.'),
      ],
      example: b(
        '四足机器人以每秒 30 次的频率运行 MPC，每次预测未来 0.5 秒（约 15 步）的身体运动，求出各条腿应施加的地面反作用力。被侧向推了一下后，下一个周期的预测就包含了新的速度，力的分配随之调整。',
        'A quadruped runs MPC 30 times per second, each time predicting 0.5 s of body motion, about 15 steps, and solving for the ground forces each leg should apply. After a sideways push, the next cycle’s prediction includes the new velocity and the forces adjust.'),
      consequences: [
        b('能同时考虑目标、约束和未来，适合需要提前准备的动作，例如跳跃前的蹲伏。', 'It weighs goals, limits and the future together, suiting movements that need preparation, such as crouching before a jump.'),
        b('与小脑的前向模型和最优反馈控制在思路上相近：都是基于模型的预测加持续校正。', 'It resembles the cerebellar forward model and optimal feedback control: model-based prediction plus continuous correction.'),
      ],
      limitations: [
        b('依赖准确的动力学模型，接触、摩擦等难以建模的现象会降低效果。', 'It depends on an accurate dynamics model, and hard-to-model contact and friction weaken it.'),
        b('每个周期都要在线求解优化问题，计算量限制了模型的复杂度和预测时域。', 'Solving an optimization every cycle limits model complexity and horizon.'),
      ],
    },
    {
      title: b('PD 控制：底层关节按误差和速度施加力矩', 'PD control: joints apply torque from error and velocity'),
      tex: t`\tau = K_p\,(\theta_d - \theta) + K_d\,(\dot{\theta}_d - \dot{\theta})`,
      symbols: [
        { tex: t`\theta,\;\theta_d`, meaning: b('关节的实际和目标角度', 'actual and target joint angle') },
        { tex: t`\dot{\theta},\;\dot{\theta}_d`, meaning: b('实际和目标角速度', 'actual and target angular velocity') },
        { tex: t`K_p,\;K_d`, meaning: b('比例增益和微分增益', 'proportional and derivative gains') },
        { tex: t`\tau`, meaning: b('电机输出的力矩', 'torque output by the motor') },
      ],
      steps: [
        b('角度误差越大，施加的力矩越大，把关节拉向目标（比例项）。', 'The larger the angle error, the larger the torque pulling the joint toward the target, the proportional term.'),
        b('速度差越大，施加的阻力越大，防止冲过头和振荡（微分项）。', 'The larger the velocity difference, the more damping, preventing overshoot and oscillation, the derivative term.'),
        b('每毫秒计算一次；学习型策略和 MPC 给出目标，PD 控制器负责跟踪。', 'It computes every millisecond. Learned policies and MPC give targets, and the PD controller tracks them.'),
      ],
      example: b(
        '$K_p = 50$、$K_d = 2$，目标角度 $1.0$ 弧度，当前 $0.9$ 弧度、静止。力矩为 $50 \\times 0.1 = 5$；当关节以 $2$ 弧度每秒冲向目标时，微分项贡献 $-4$，力矩只剩约 $1$，避免冲过头。',
        '$K_p = 50$ and $K_d = 2$, with target $1.0$ rad and current $0.9$ rad at rest. Torque is $50 \\times 0.1 = 5$. When the joint rushes toward the target at $2$ rad/s, the derivative term adds $-4$, leaving about $1$ and preventing overshoot.'),
      consequences: [
        b('形式与左边的肌肉弹簧模型相同，$K_p$ 相当于刚度、$K_d$ 相当于阻尼。', 'It has the same form as the muscle spring model on the left: $K_p$ acts as stiffness and $K_d$ as damping.'),
        b('增益可以由软件随时改变，相当于可编程的刚度。', 'Gains can be changed by software at any time, a programmable stiffness.'),
      ],
      limitations: [
        b('增益过高会振荡、过低会跟踪不准，需要针对机器人调整。', 'Gains too high cause oscillation and too low poor tracking, so they need tuning per robot.'),
        b('电机加减速器的刚性结构，在碰撞时不像肌肉和肌腱那样自然缓冲。', 'Rigid motors and gearboxes do not cushion collisions naturally the way muscles and tendons do.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('回路慢、有噪声', 'Slow, noisy loops'),
        text: b('神经传导和肌肉反应的延迟达几十到上百毫秒，动作越快、用力越大，误差越大。', 'Nerve conduction and muscle response delays reach tens to a hundred or more milliseconds, and error grows with speed and force.'),
        steps: [4, 5],
      },
      {
        title: b('适应需要多次尝试', 'Adaptation takes many tries'),
        text: b('面对新的力场或工具，要几十到上百次尝试才能更新内部模型。', 'Facing a new force field or tool, the internal model needs tens to hundreds of tries to update.'),
        steps: [3],
      },
      {
        title: b('疲劳与损伤', 'Fatigue and injury'),
        text: b('肌肉会疲劳，长时间精确重复同一动作难以保持精度。', 'Muscles tire, and precision is hard to keep over long, exact repetition.'),
        steps: [6],
      },
    ],
    computational: [
      {
        title: b('依赖准确模型', 'Depends on accurate models'),
        text: b('接触、摩擦和柔软物体难以建模，MPC 在这些情形中效果下降。', 'Contact, friction and soft objects are hard to model, and MPC degrades in these cases.'),
        steps: [2],
      },
      {
        title: b('触觉与柔顺性不足', 'Limited touch and compliance'),
        text: b('缺少密集的触觉和可调的柔顺性，接触丰富的精细操作仍然困难。', 'Without dense touch and adjustable compliance, contact-rich fine manipulation remains hard.'),
        steps: [6],
      },
      {
        title: b('仿真与现实的差距', 'The gap from simulation to reality'),
        text: b('在仿真中训练的策略迁移到现实时，需要随机化物理参数等手段，仍可能在未见过的情形中失败。', 'Policies trained in simulation need methods such as randomized physics to transfer to reality and may still fail in unseen situations.'),
        steps: [5],
      },
    ],
    misreadings: [],
  },
  refs: {
    neuro: ['johansson1984', 'shadmehr1994', 'burdet2001', 'pruszynski2012', 'wolpert1998', 'shadmehr2010'],
    models: ['todorov2002', 'scott2004'],
    ai: ['dicarlo2018', 'lee2020', 'kumar2021'],
  },
}
