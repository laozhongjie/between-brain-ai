import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Store, Var } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** One synapse: co-activity writes an eligibility trace, dopamine reads it out into a weight change. */
function ThreeFactorArch({ t }: FigProps) {
  const id = 'f07b'
  return (
    <Svg id={id} w={380} h={286} label={t(b('三因子学习的结构与信息流：突触、资格迹、多巴胺和更新', 'Three-factor learning: synapse, eligibility trace, dopamine and update'))}>
      <Mod x={14} y={14} w={120} h={36} side="bio" label={t(b('输入神经元', 'Input neuron'))} sub={t(b('突触前', 'presynaptic'))} />
      <Store x={150} y={10} w={80} h={56} side="bio" label={t(b('突触', 'Synapse'))} sub={t(b('权重 w', 'weight w'))} />
      <Mod x={262} y={14} w={104} h={36} side="bio" label={t(b('输出神经元', 'Output neuron'))} sub={t(b('突触后', 'postsynaptic'))} />
      <Store x={150} y={90} w={80} h={56} side="bio" label={t(b('资格迹', 'Trace'))} sub={t(b('几秒内衰减', 'fades in seconds'))} />
      <Mod x={262} y={100} w={104} h={40} side="bio" label={t(b('高级皮层', 'Higher cortex'))} sub={t(b('反馈到树突', 'feedback to dendrites'))} size={10.5} />
      <Mod x={14} y={166} w={120} h={40} side="bio" label={t(b('多巴胺神经元', 'Dopamine neurons'))} sub={t(b('比预期好则爆发', 'burst if better'))} size={10.5} />
      <Mod x={150} y={166} w={80} h={40} side="bio" label={t(b('更新', 'Update'))} sub={t(b('迹 × 多巴胺', 'trace × DA'))} />
      <Var cx={74} cy={256} side="bio" label={t(b('结果', 'Outcome'))} r={15} />
      <T x={150} y={232} anchor="start" s={t(b('多巴胺广播到大量突触', 'dopamine reaches many synapses'))} size={9} color={C.dim} />

      <Flow id={id} side="bio" pts={[[134, 26], [150, 26]]} />
      <Flow id={id} side="bio" pts={[[230, 26], [262, 26]]} />
      <Flow id={id} side="bio" pts={[[190, 66], [190, 90]]} label={t(b('共同活动', 'co-activity'))} lx={30} ly={0} />
      <Flow id={id} side="bio" head="read" pts={[[190, 146], [190, 166]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[134, 186], [150, 186]]} />
      <Flow id={id} side="bio" pts={[[230, 186], [246, 186], [246, 52], [230, 52]]} label={t(b('改变权重', 'change weight'))} at={1} lx={30} ly={40} />
      <Flow id={id} side="bio" pts={[[74, 241], [74, 206]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[314, 100], [314, 50]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={150} y={92} n={2} side="bio" />
      <Num x={14} y={166} n={3} side="bio" />
      <Num x={150} y={166} n={4} side="bio" />
      <Num x={262} y={100} n={5} side="bio" />
    </Svg>
  )
}

/** A layered network: forward pass with stored activations, an error, the backward pass, the update and TD learning. */
function BackpropArch({ t }: FigProps) {
  const id = 'f07c'
  return (
    <Svg id={id} w={380} h={284} label={t(b('反向传播与时序差分学习的结构与信息流', 'Structure and information flow of backpropagation and TD learning'))}>
      <Mod x={14} y={14} w={352} h={30} side="comp" label={t(b('输入', 'Input'))} size={10.5} />
      <Mod x={14} y={64} w={352} h={34} side="comp" label={t(b('第 1 层', 'Layer 1'))} sub={t(b('保存激活', 'activations stored'))} />
      <Mod x={14} y={118} w={352} h={34} side="comp" label={t(b('第 2 层', 'Layer 2'))} sub={t(b('保存激活', 'activations stored'))} />
      <Mod x={14} y={172} w={170} h={34} side="comp" label={t(b('输出', 'Output'))} size={10.5} />
      <Mod x={196} y={172} w={170} h={34} side="comp" label={t(b('误差', 'Error'))} sub={t(b('与目标之差或 TD 误差', 'vs. target, or TD error'))} />
      <Mod x={14} y={232} w={170} h={38} side="comp" label={t(b('时序差分', 'TD learning'))} sub={t(b('奖赏与相邻两步的预测', 'reward and successive predictions'))} size={10.5} />
      <Mod x={270} y={232} w={96} h={38} side="comp" label={t(b('权重更新', 'Update'))} sub={t(b('所有权重一步', 'all weights'))} size={10.5} />

      <Flow id={id} side="comp" pts={[[60, 44], [60, 64]]} />
      <Flow id={id} side="comp" pts={[[60, 98], [60, 118]]} />
      <Flow id={id} side="comp" pts={[[60, 152], [60, 172]]} label={t(b('前向', 'forward'))} lx={24} ly={0} />
      <Flow id={id} side="comp" pts={[[184, 189], [196, 189]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[330, 172], [330, 152]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[330, 118], [330, 98]]} label={t(b('反向传递', 'backward'))} lx={-36} ly={0} />
      <Flow id={id} side="comp" pts={[[318, 206], [318, 232]]} />
      <Flow id={id} side="comp" pts={[[184, 251], [230, 251], [230, 206]]} />
      <Num x={14} y={64} n={1} side="comp" />
      <Num x={196} y={172} n={2} side="comp" />
      <Num x={344} y={135} n={3} side="comp" />
      <Num x={270} y={232} n={4} side="comp" />
      <Num x={14} y={232} n={5} side="comp" />
    </Svg>
  )
}

/** Time scales of credit assignment, from milliseconds to months. */
function CreditTimeline({ t }: FigProps) {
  const id = 'f07d'
  const ticks: [number, Bi][] = [[150, b('10 毫秒', '10 ms')], [230, b('100 毫秒', '100 ms')], [310, b('1 秒', '1 s')], [380, b('10 秒', '10 s')], [430, b('1 分钟', '1 min')], [520, b('1 小时', '1 h')], [590, b('1 天', '1 day')], [650, b('1 周', '1 week')], [720, b('1 月', '1 month')]]
  return (
    <Svg id={id} w={760} h={250} label={t(b('信用分配的时间尺度', 'Time scales of credit assignment'))}>
      <T x={16} y={44} anchor="start" s={t(b('三因子学习', 'Three-factor\nlearning'))} size={10.5} color={C.pinkD} weight={600} />
      <T x={16} y={176} anchor="start" s={t(b('反向传播与\n时序差分', 'Backprop\nand TD'))} size={10.5} color={C.skyD} weight={600} />

      <Mod x={150} y={26} w={80} h={36} side="bio" label={t(b('共同活动', 'Co-activity'))} sub={t(b('几十毫秒', 'tens of ms'))} size={10.5} />
      <Mod x={230} y={26} w={150} h={36} side="bio" label={t(b('资格迹与多巴胺', 'Trace meets dopamine'))} sub={t(b('一到几秒内重叠', 'overlap within seconds'))} size={10.5} />
      <Mod x={470} y={26} w={90} h={36} side="bio" label={t(b('巩固', 'Consolidation'))} sub={t(b('几小时', 'hours'))} size={10.5} />
      <Mod x={560} y={26} w={90} h={36} side="bio" label={t(b('离线回放', 'Offline replay'))} sub={t(b('休息与睡眠', 'rest and sleep'))} size={10.5} />

      <line x1={140} y1={100} x2={752} y2={100} stroke={C.line} strokeWidth={1} />
      {ticks.map(([x, l]) => (
        <g key={x}>
          <line x1={x} y1={96} x2={x} y2={104} stroke={C.dim} strokeWidth={1} />
          <T x={x} y={115} s={t(l)} size={9.5} color={C.dim} />
        </g>
      ))}

      <Mod x={150} y={150} w={40} h={36} side="comp" label={t(b('前向', 'Fwd'))} size={10} />
      <Mod x={190} y={150} w={60} h={36} side="comp" label={t(b('反向', 'Back'))} sub={t(b('并更新', 'and update'))} size={10} />
      <Mod x={590} y={150} w={150} h={36} side="comp" label={t(b('训练', 'Training'))} sub={t(b('数十万到数百万步', '10⁵ to 10⁶ steps'))} size={10.5} />
      <Flow id={id} side="comp" kind="fb" pts={[[250, 168], [590, 168]]} label={t(b('重复', 'repeat'))} ly={-6} />
      <Gap x={590} y={202} w={160} h={30} label={t(b('之后参数固定', 'then fixed'))} />
      <Num x={150} y={26} n={1} side="bio" />
      <Num x={230} y={26} n={2} side="bio" />
      <Num x={470} y={26} n={3} side="bio" />
      <Num x={560} y={26} n={4} side="bio" />
      <Num x={150} y={150} n={1} side="comp" />
      <Num x={190} y={150} n={2} side="comp" />
      <Num x={590} y={150} n={3} side="comp" />
    </Svg>
  )
}

export const CREDIT_FIGS: TopicFigs = {
  arch: { brain: ThreeFactorArch, ai: BackpropArch },
  dynamics: CreditTimeline,
}
