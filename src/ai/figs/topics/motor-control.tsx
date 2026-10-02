import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region } from '../grammar'
import { legacyFig } from '../layer4'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Motor cortex drives the spinal cord and sends a copy to the cerebellum; spinal reflexes, transcortical feedback and co-contraction act at three speeds. */
function MotorBrainArch({ t }: FigProps) {
  const id = 'f26b'
  return (
    <Svg id={id} w={380} h={286} label={t(b('运动控制的结构与信息流：顶叶与运动前区、初级运动皮层、小脑、脊髓反射、经皮层反馈、刚度调节', 'Motor control: parietal and premotor areas, primary motor cortex, cerebellum, spinal reflex, transcortical feedback, stiffness'))}>
      <Mod x={14} y={14} w={170} h={40} side="bio" label={t(b('顶叶与运动前区', 'Parietal, premotor'))} sub={t(b('按目标与身体状态定动作', 'action from goal and body state'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('初级运动皮层', 'Primary motor cortex'))} sub={t(b('发出指令', 'sends the command'))} size={10.5} />
      <Mod x={196} y={86} w={170} h={40} side="bio" label={t(b('小脑', 'Cerebellum'))} sub={t(b('前向模型：预测并校正', 'forward model: predict, correct'))} size={10.5} />
      <Mod x={14} y={158} w={170} h={40} side="bio" label={t(b('脊髓', 'Spinal cord'))} sub={t(b('运动神经元', 'motor neurons'))} size={10.5} />
      <Mod x={14} y={232} w={170} h={40} side="bio" label={t(b('肌肉', 'Muscles'))} sub={t(b('肌梭感受意外的拉长', 'spindles sense a stretch'))} size={10.5} />
      <Mod x={196} y={232} w={170} h={40} side="bio" label={t(b('刚度调节', 'Stiffness control'))} sub={t(b('拮抗肌同时收缩', 'antagonists co-contract'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[184, 34], [196, 34]]} />
      <Flow id={id} side="bio" pts={[[210, 54], [210, 68], [60, 68], [60, 158]]} label={t(b('皮质脊髓束', 'corticospinal'))} at={2} lx={32} ly={-8} />
      <Flow id={id} side="bio" pts={[[270, 54], [270, 86]]} label={t(b('副本', 'copy'))} lx={-16} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[340, 86], [340, 54]]} label={t(b('校正', 'correct'))} lx={18} ly={0} />
      <Flow id={id} side="bio" fast pts={[[99, 198], [99, 232]]} />
      <Flow id={id} side="bio" fast pts={[[40, 232], [40, 198]]} curve={[14, 215]} />
      <T x={66} y={215} s={t(b('反射\n约 30 毫秒', 'reflex\n~30 ms'))} size={9} color={C.pinkD} />
      <Flow id={id} side="bio" kind="fb" pts={[[170, 232], [170, 214], [190, 214], [190, 40], [196, 40]]} label={t(b('经皮层\n50 到 100 毫秒', 'via cortex\n50 to 100 ms'))} at={2} lx={-42} ly={-6} />
      <Flow id={id} side="bio" head="none" pts={[[184, 252], [196, 252]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={196} y={14} n={2} side="bio" />
      <Num x={196} y={86} n={3} side="bio" />
      <Num x={14} y={158} n={4} side="bio" />
      <Num x={190} y={186} n={5} side="bio" />
      <Num x={196} y={232} n={6} side="bio" />
    </Svg>
  )
}

/** State estimation feeds MPC (or a learned policy); the first planned step goes to kilohertz joint controllers, and the loop repeats. */
function RobotControlArch({ t }: FigProps) {
  const id = 'f26c'
  return (
    <Svg id={id} w={380} h={306} label={t(b('机器人反馈控制与 MPC 的结构与信息流：状态估计、MPC 优化、滚动执行、底层反馈、学习型策略', 'Robot control and MPC: state estimation, MPC optimization, receding horizon, low-level feedback, learned policies'))}>
      <Mod x={14} y={14} w={352} h={36} side="comp" label={t(b('状态估计', 'State estimation'))} sub={t(b('编码器、惯性测量单元和相机，经卡尔曼滤波合成', 'encoders, IMU and cameras, fused by a Kalman filter'))} size={10.5} />
      <Region x={6} y={68} w={250} h={118} side="comp" label="MPC" />
      <Mod x={18} y={92} w={226} h={36} side="comp" label={t(b('MPC 优化', 'MPC optimization'))} sub={t(b('预测 0.5 秒，求最优动作序列', 'predict 0.5 s, solve for the best actions'))} size={10.5} />
      <Mod x={18} y={140} w={226} h={36} side="comp" label={t(b('滚动执行', 'Receding horizon'))} sub={t(b('只执行第一步，下个周期重算', 'run the first step, re-solve next cycle'))} size={10.5} />
      <Mod x={268} y={92} w={100} h={84} side="comp" label={t(b('学习型策略', 'Learned policy'))} sub={t(b('仿真中训练', 'trained in simulation'))} size={10.5} />
      <Mod x={14} y={206} w={352} h={36} side="comp" label={t(b('底层反馈', 'Low-level feedback'))} sub={t(b('每个关节以千赫兹频率跟踪目标', 'each joint tracks its target at kilohertz rates'))} size={10.5} />
      <Gap x={14} y={262} w={352} h={32} label={t(b('像皮肤一样密集的触觉，像肌肉一样可调的柔顺性', 'Skin-like dense touch, muscle-like adjustable compliance'))} />

      <Flow id={id} side="comp" pts={[[131, 50], [131, 92]]} />
      <Flow id={id} side="comp" pts={[[131, 128], [131, 140]]} />
      <Flow id={id} side="comp" pts={[[318, 50], [318, 92]]} />
      <Flow id={id} side="comp" pts={[[131, 176], [131, 206]]} />
      <Flow id={id} side="comp" pts={[[318, 176], [318, 206]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[366, 224], [374, 224], [374, 32], [366, 32]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={92} n={2} side="comp" />
      <Num x={18} y={140} n={3} side="comp" />
      <Num x={14} y={206} n={4} side="comp" />
      <Num x={268} y={92} n={5} side="comp" />
      <Num x={14} y={262} n={6} side="comp" />
    </Svg>
  )
}

export const MOTOR_FIGS: TopicFigs = {
  arch: { brain: MotorBrainArch, ai: RobotControlArch },
  math: {
    bio: {
      0: {
        ...legacyFig('sys-motor', 'brain'),
        cap: b('运动：目标与计划经基底节选择，由 M1 经脊髓驱动肌肉。M1 同时把传出副本发给小脑，小脑预测结果并与本体感觉比较，经丘脑实时校正 M1。', 'Movement: a goal and plan are selected through the basal ganglia, and M1 drives the muscles through the spinal cord. M1 also sends an efference copy to the cerebellum, which predicts the result, compares it with proprioception and corrects M1 through the thalamus.'),
      },
    },
  },
}
