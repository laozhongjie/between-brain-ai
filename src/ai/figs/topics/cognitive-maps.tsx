import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Mod, Num, Region, Store } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Content through lateral entorhinal cortex, self-motion through grid cells, bound by hippocampal place cells. */
function CognitiveMapArch({ t }: FigProps) {
  const id = 'f16b'
  return (
    <Svg id={id} w={380} h={282} label={t(b('认知地图的结构与信息流：感觉与自身运动、内嗅皮层、海马位置细胞、前额叶', 'Cognitive map: senses and self-motion, entorhinal cortex, hippocampal place cells, prefrontal cortex'))}>
      <Mod x={14} y={14} w={170} h={36} side="bio" label={t(b('感觉与地标', 'Senses, landmarks'))} sub={t(b('这里有什么', 'what is here'))} />
      <Mod x={196} y={14} w={170} h={36} side="bio" label={t(b('自身运动', 'Self-motion'))} sub={t(b('速度与朝向', 'speed and heading'))} />
      <Region x={6} y={66} w={368} h={74} side="bio" label={t(b('内嗅皮层', 'Entorhinal cortex'))} />
      <Mod x={18} y={88} w={150} h={40} side="bio" label={t(b('外侧', 'Lateral'))} sub={t(b('内容', 'content'))} />
      <Mod x={212} y={88} w={150} h={40} side="bio" label={t(b('网格细胞', 'Grid cells'))} sub={t(b('内侧，路径积分', 'medial, path integration'))} />
      <Mod x={110} y={164} w={160} h={44} side="bio" label={t(b('海马位置细胞', 'Place cells'))} sub={t(b('结构与内容绑定', 'structure bound to content'))} />
      <Mod x={110} y={234} w={160} h={36} side="bio" label={t(b('前额叶', 'Prefrontal cortex'))} sub={t(b('选择路线', 'chooses a route'))} />
      <Mod x={290} y={234} w={76} h={36} side="bio" label={t(b('抽象关系', 'Abstract'))} sub={t(b('概念、社会', 'concepts'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[99, 50], [99, 88]]} />
      <Flow id={id} side="bio" fast pts={[[281, 50], [281, 88]]} />
      <Flow id={id} side="bio" pts={[[93, 128], [93, 186], [110, 186]]} />
      <Flow id={id} side="bio" pts={[[287, 128], [287, 186], [270, 186]]} />
      <Flow id={id} side="bio" pts={[[190, 208], [190, 234]]} label={t(b('预演路径', 'preview paths'))} lx={-34} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[340, 234], [340, 140]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={212} y={88} n={2} side="bio" />
      <Num x={18} y={88} n={3} side="bio" />
      <Num x={110} y={164} n={4} side="bio" />
      <Num x={110} y={234} n={5} side="bio" />
      <Num x={290} y={234} n={6} side="bio" />
    </Svg>
  )
}

/** TEM: actions drive a shared structure code, observations a sensory code, bound in a fast memory that predicts what comes next. */
function TemArch({ t }: FigProps) {
  const id = 'f16c'
  return (
    <Svg id={id} w={380} h={290} label={t(b('TEM 与 Transformer 关系表示的结构与信息流', 'Structure and information flow of relational representations in TEM and transformers'))}>
      <Mod x={14} y={14} w={170} h={34} side="comp" label={t(b('动作', 'Action'))} sub={t(b('向右、向下……', 'right, down …'))} />
      <Mod x={196} y={14} w={170} h={34} side="comp" label={t(b('观察', 'Observation'))} sub={t(b('这一格看到什么', 'what this cell shows'))} />
      <Mod x={14} y={78} w={170} h={44} side="comp" label={t(b('结构模块', 'Structure module'))} sub={t(b('按动作更新抽象位置', 'position updated by action'))} />
      <Mod x={196} y={78} w={170} h={44} side="comp" label={t(b('感觉模块', 'Sensory module'))} sub={t(b('编码观察', 'encodes the observation'))} />
      <Store x={110} y={154} w={160} h={62} side="comp" label={t(b('绑定记忆', 'Binding memory'))} sub={t(b('位置与内容成对', 'position and content pairs'))} />
      <Mod x={110} y={244} w={160} h={36} side="comp" label={t(b('预测下一步', 'Predict next'))} sub={t(b('将会看到什么', 'what will be seen'))} />
      <Mod x={290} y={244} w={76} h={36} side="comp" label="Transformer" sub={t(b('类比', 'analog'))} size={10} />

      <Flow id={id} side="comp" pts={[[99, 48], [99, 78]]} />
      <Flow id={id} side="comp" pts={[[281, 48], [281, 78]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[40, 122], [40, 138], [8, 138], [8, 100], [14, 100]]} />
      <Flow id={id} side="comp" pts={[[93, 122], [93, 184], [110, 184]]} />
      <Flow id={id} side="comp" pts={[[287, 122], [287, 184], [270, 184]]} />
      <Flow id={id} side="comp" head="read" pts={[[190, 216], [190, 244]]} label={t(b('按位置检索', 'retrieve by position'))} lx={-46} ly={0} />
      <Flow id={id} side="comp" kind="fb" head="none" pts={[[328, 244], [328, 206], [270, 206]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={78} n={2} side="comp" />
      <Num x={196} y={78} n={3} side="comp" />
      <Num x={110} y={156} n={4} side="comp" />
      <Num x={110} y={244} n={5} side="comp" />
      <Num x={290} y={244} n={6} side="comp" />
    </Svg>
  )
}

/** When maps form and how long they last in both systems. */
function MapTimeline({ t }: FigProps) {
  const id = 'f16d'
  const ticks: [number, Bi][] = [[150, b('10 毫秒', '10 ms')], [220, b('100 毫秒', '100 ms')], [290, b('1 秒', '1 s')], [370, b('1 分钟', '1 min')], [450, b('1 小时', '1 h')], [530, b('1 天', '1 day')], [610, b('1 周', '1 week')], [680, b('1 月', '1 month')]]
  return (
    <Svg id={id} w={760} h={250} label={t(b('认知地图形成与维持的时间尺度', 'Time scales of forming and keeping cognitive maps'))}>
      <T x={16} y={44} anchor="start" s={t(b('海马\n认知地图', 'Hippocampal\nmaps'))} size={10.5} color={C.pinkD} weight={600} />
      <T x={16} y={176} anchor="start" s={t(b('TEM 与\nTransformer', 'TEM and\ntransformers'))} size={10.5} color={C.skyD} weight={600} />

      <Mod x={205} y={26} w={60} h={36} side="bio" label={t(b('θ 序列', 'Theta'))} sub={t(b('约 125 毫秒', '~125 ms'))} size={10.5} />
      <Mod x={340} y={26} w={90} h={36} side="bio" label={t(b('新地图形成', 'New map'))} sub={t(b('几分钟', 'minutes'))} size={10.5} />
      <Mod x={530} y={26} w={170} h={36} side="bio" label={t(b('维持与漂移', 'Maintenance and drift'))} sub={t(b('天到周', 'days to weeks'))} />

      <line x1={140} y1={100} x2={752} y2={100} stroke={C.line} strokeWidth={1} />
      {ticks.map(([x, l]) => (
        <g key={x}>
          <line x1={x} y1={96} x2={x} y2={104} stroke={C.dim} strokeWidth={1} />
          <T x={x} y={115} s={t(l)} size={9.5} color={C.dim} />
        </g>
      ))}

      <Mod x={530} y={150} w={170} h={36} side="comp" label={t(b('TEM 训练', 'TEM training'))} sub={t(b('大量不同环境', 'many environments'))} />
      <Mod x={150} y={150} w={60} h={36} side="comp" label={t(b('逐步绑定', 'Binding'))} sub={t(b('每步一次', 'each step'))} size={10} />
      <Mod x={290} y={150} w={160} h={36} side="comp" label={t(b('上下文中的地图', 'Map in context'))} sub={t(b('会话结束即消失', 'gone after the session'))} size={10.5} />
      <Num x={205} y={26} n={1} side="bio" />
      <Num x={340} y={26} n={2} side="bio" />
      <Num x={530} y={26} n={3} side="bio" />
      <Num x={530} y={150} n={1} side="comp" />
      <Num x={150} y={150} n={2} side="comp" />
      <Num x={290} y={150} n={3} side="comp" />
    </Svg>
  )
}

export const COGNITIVE_MAP_FIGS: TopicFigs = {
  arch: { brain: CognitiveMapArch, ai: TemArch },
  dynamics: MapTimeline,
}
