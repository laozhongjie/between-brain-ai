import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store, Var } from '../grammar'
import { legacyFig } from '../layer4'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Sensory input passes a basal ganglia gate into prefrontal cortex, held by recurrent activity and facilitating synapses. */
function WorkingMemoryArch({ t }: FigProps) {
  const id = 'f11b'
  return (
    <Svg id={id} w={380} h={278} label={t(b('工作记忆的结构与信息流：感觉皮层、基底节闸门、前额叶中的持续活动与突触易化、顶叶', 'Working memory: sensory cortex, basal ganglia gate, persistent activity and facilitating synapses in prefrontal cortex, parietal cortex'))}>
      <Mod x={14} y={14} w={150} h={36} side="bio" label={t(b('感觉皮层', 'Sensory cortex'))} sub={t(b('刺激的放电模式', 'firing pattern of the stimulus'))} />
      <Mod x={216} y={14} w={150} h={36} side="bio" label={t(b('基底节闸门', 'Basal ganglia gate'))} sub={t(b('纹状体与丘脑', 'striatum and thalamus'))} />
      <Region x={6} y={76} w={368} h={118} side="bio" label={t(b('前额叶', 'Prefrontal cortex'))} />
      {([[50, 'A'], [110, 'B'], [170, 'C']] as [number, string][]).map(([cx, l]) => (
        <g key={l}>
          <Var cx={cx} cy={140} side="bio" label={l} r={14} />
          <Flow id={id} side="bio" kind="fb" head="none" pts={[[cx - 11, 131], [cx + 11, 131]]} curve={[cx, 92]} />
        </g>
      ))}
      <line x1={64} y1={140} x2={96} y2={140} stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <line x1={124} y1={140} x2={156} y2={140} stroke={C.dim} strokeWidth={1.2} strokeDasharray="3 3" />
      <T x={110} y={176} s={t(b('循环兴奋维持，相互抑制', 'self-sustained, mutually inhibiting'))} size={9} color={C.dim} />
      <Store x={226} y={106} w={136} h={62} side="bio" label={t(b('突触易化', 'Facilitation'))} sub={t(b('放电停止后约一秒', 'about 1 s after firing'))} />
      <Mod x={110} y={224} w={160} h={40} side="bio" label={t(b('顶叶与运动区', 'Parietal, motor areas'))} sub={t(b('比较、计算、指导动作', 'compare, compute, act'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[164, 32], [216, 32]]} />
      <Flow id={id} side="bio" pts={[[291, 50], [291, 76]]} label={t(b('闸门打开时写入', 'written when open'))} lx={-50} ly={0} />
      <Flow id={id} side="bio" pts={[[186, 140], [226, 140]]} />
      <Flow id={id} side="bio" pts={[[190, 194], [190, 224]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={216} y={14} n={2} side="bio" />
      <Num x={30} y={112} n={3} side="bio" />
      <Num x={226} y={108} n={4} side="bio" />
      <Num x={110} y={224} n={5} side="bio" />
      <Num x={34} y={176} n={6} side="bio" />
    </Svg>
  )
}

/** A transformer keeps every token in its KV cache; a recurrent model keeps a gated fixed-size state. */
function ContextStateArch({ t }: FigProps) {
  const id = 'f11c'
  return (
    <Svg id={id} w={380} h={306} label={t(b('上下文窗口与循环状态的结构与信息流', 'Structure and information flow of context windows and recurrent state'))}>
      <Mod x={14} y={14} w={352} h={30} side="comp" label={t(b('词元输入', 'Token input'))} size={10.5} />
      <Region x={6} y={60} w={180} h={176} side="comp" label="Transformer" />
      <Store x={18} y={86} w={84} h={62} side="comp" label={t(b('上下文窗口', 'Context'))} sub={t(b('逐字保存', 'verbatim'))} />
      <Gap x={112} y={94} w={62} h={46} label={t(b('写入\n闸门', 'Write\ngate'))} />
      <Mod x={18} y={176} w={156} h={40} side="comp" label={t(b('注意力读取', 'Attention readout'))} sub={t(b('与所有词元比较', 'compares with every token'))} size={10.5} />
      <Region x={194} y={60} w={180} h={176} side="comp" label={t(b('循环模型', 'Recurrent model'))} />
      <Mod x={206} y={86} w={156} h={40} side="comp" label={t(b('门控', 'Gates'))} sub={t(b('写入多少、保留多少', 'how much to write and keep'))} size={10.5} />
      <Store x={206} y={150} w={156} h={62} side="comp" label={t(b('状态向量', 'State vector'))} sub={t(b('固定大小', 'fixed size'))} />
      <Mod x={14} y={262} w={352} h={30} side="comp" label={t(b('输出下一个词元', 'Next token'))} size={10.5} />

      <Flow id={id} side="comp" pts={[[60, 44], [60, 86]]} />
      <Flow id={id} side="comp" head="read" pts={[[60, 148], [60, 176]]} />
      <Flow id={id} side="comp" pts={[[96, 216], [96, 262]]} />
      <Flow id={id} side="comp" pts={[[264, 44], [264, 86]]} />
      <Flow id={id} side="comp" pts={[[264, 126], [264, 150]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[340, 150], [340, 126]]} />
      <Flow id={id} side="comp" head="read" pts={[[284, 212], [284, 262]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={18} y={88} n={2} side="comp" />
      <Num x={18} y={176} n={3} side="comp" />
      <Num x={206} y={86} n={4} side="comp" />
      <Num x={14} y={262} n={5} side="comp" />
      <Num x={112} y={94} n={6} side="comp" />
    </Svg>
  )
}

/** How long content is held: seconds in the brain, a whole session in a context window. */
function WorkingMemoryTimeline({ t }: FigProps) {
  const id = 'f11d'
  const ticks: [number, Bi][] = [[150, b('10 毫秒', '10 ms')], [230, b('100 毫秒', '100 ms')], [320, b('1 秒', '1 s')], [410, b('10 秒', '10 s')], [480, b('1 分钟', '1 min')], [560, b('10 分钟', '10 min')], [640, b('1 小时', '1 h')], [740, b('1 天', '1 day')]]
  return (
    <Svg id={id} w={760} h={250} label={t(b('工作记忆与上下文的保持时间', 'How long working memory and context hold content'))}>
      <T x={16} y={44} anchor="start" s={t(b('前额叶\n工作记忆', 'Prefrontal\nworking memory'))} size={10.5} color={C.pinkD} weight={600} />
      <T x={16} y={176} anchor="start" s={t(b('上下文窗口\n与循环状态', 'Context and\nrecurrent state'))} size={10.5} color={C.skyD} weight={600} />

      <Mod x={200} y={26} w={60} h={36} side="bio" label={t(b('编码', 'Encode'))} sub={t(b('百毫秒', '100s of ms'))} size={10.5} />
      <Mod x={260} y={26} w={70} h={36} side="bio" label={t(b('易化', 'Facilitation'))} sub={t(b('约 1 秒', 'about 1 s'))} size={10} />
      <Mod x={330} y={26} w={100} h={36} side="bio" label={t(b('维持', 'Maintenance'))} sub={t(b('几秒到十几秒', 'seconds'))} size={10.5} />
      <Mod x={430} y={26} w={60} h={36} side="bio" label={t(b('消退', 'Fades'))} size={10.5} />

      <line x1={140} y1={100} x2={752} y2={100} stroke={C.line} strokeWidth={1} />
      {ticks.map(([x, l]) => (
        <g key={x}>
          <line x1={x} y1={96} x2={x} y2={104} stroke={C.dim} strokeWidth={1} />
          <T x={x} y={115} s={t(l)} size={9.5} color={C.dim} />
        </g>
      ))}

      <Mod x={150} y={150} w={50} h={36} side="comp" label={t(b('词元', 'Token'))} sub={t(b('毫秒', 'ms'))} size={10} />
      <Mod x={200} y={150} w={440} h={36} side="comp" label={t(b('会话中逐字保持', 'Kept verbatim through the session'))} sub={t(b('直到超出窗口长度被截掉', 'until cut off at the window length'))} />
      <Gap x={640} y={150} w={110} h={36} label={t(b('会话结束清空', 'Cleared at the end'))} />
      <Num x={200} y={26} n={1} side="bio" />
      <Num x={260} y={26} n={2} side="bio" />
      <Num x={330} y={26} n={3} side="bio" />
      <Num x={430} y={26} n={4} side="bio" />
      <Num x={150} y={150} n={1} side="comp" />
      <Num x={200} y={150} n={2} side="comp" />
      <Num x={640} y={150} n={3} side="comp" />
    </Svg>
  )
}

export const WORKING_MEMORY_FIGS: TopicFigs = {
  arch: { brain: WorkingMemoryArch, ai: ContextStateArch },
  dynamics: WorkingMemoryTimeline,
  math: { comp: { 0: legacyFig('sys-memory', 'ai') } },
}
