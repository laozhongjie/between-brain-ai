import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Store } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Sleep consolidation: hippocampal ripples replay into neocortex in step with thalamic spindles and slow oscillations. */
function SleepReplayArch({ t }: FigProps) {
  const id = 'f15b'
  return (
    <Svg id={id} w={380} h={300} label={t(b('睡眠回放与系统巩固的结构与信息流', 'Structure and information flow of sleep replay and systems consolidation'))}>
      <Mod x={14} y={14} w={352} h={32} side="bio" label={t(b('清醒时编码', 'Encoding while awake'))} sub={t(b('位置细胞按顺序放电，突触被标记', 'place cells fire in order, synapses tagged'))} />
      <Region x={6} y={64} w={368} h={170} side="bio" label={t(b('深睡', 'Deep sleep'))} />
      <Mod x={18} y={90} w={150} h={40} side="bio" label={t(b('新皮层', 'Neocortex'))} sub={t(b('慢振荡，约每秒一次', 'slow oscillation, ~1 per second'))} />
      <Mod x={212} y={90} w={150} h={40} side="bio" label={t(b('丘脑', 'Thalamus'))} sub={t(b('纺锤波，12 到 15 赫兹', 'spindles, 12 to 15 Hz'))} />
      <Store x={110} y={158} w={160} h={62} side="bio" label={t(b('海马', 'Hippocampus'))} sub={t(b('涟漪中压缩回放', 'compressed replay in ripples'))} />
      <Mod x={14} y={250} w={170} h={40} side="bio" label={t(b('长期记忆', 'Long-term memory'))} sub={t(b('与已有知识合并', 'merged with prior knowledge'))} />
      <Mod x={200} y={250} w={166} h={40} side="bio" label={t(b('下调与遗忘', 'Downscaling, forgetting'))} sub={t(b('整体缩小，弱痕迹移除', 'scaled down, weak traces removed'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[190, 46], [190, 158]]} />
      <Flow id={id} side="bio" fast head="read" pts={[[130, 158], [130, 130]]} label={t(b('回放', 'replay'))} lx={-22} ly={0} />
      <Flow id={id} side="bio" kind="fb" pts={[[244, 130], [244, 158]]} label={t(b('与涟漪对齐', 'aligns with ripples'))} lx={44} ly={0} />
      <Flow id={id} side="bio" pts={[[40, 130], [40, 250]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[283, 250], [283, 234]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={18} y={90} n={2} side="bio" />
      <Num x={212} y={90} n={3} side="bio" />
      <Num x={110} y={160} n={4} side="bio" />
      <Num x={14} y={250} n={5} side="bio" />
      <Num x={200} y={250} n={6} side="bio" />
    </Svg>
  )
}

/** Experience replay: the agent fills a buffer, samples it to train, adds generated experience and acts again. */
function ExperienceReplayArch({ t }: FigProps) {
  const id = 'f15c'
  return (
    <Svg id={id} w={380} h={294} label={t(b('经验回放与模型更新的结构与信息流', 'Structure and information flow of experience replay and model updating'))}>
      <Mod x={14} y={14} w={150} h={36} side="comp" label={t(b('环境交互', 'Environment'))} sub={t(b('状态、动作、奖赏', 'state, action, reward'))} />
      <Store x={14} y={80} w={150} h={64} side="comp" label={t(b('回放缓冲区', 'Replay buffer'))} sub={t(b('数十万到数百万条', '10⁵ to 10⁶ experiences'))} />
      <Mod x={14} y={172} w={150} h={36} side="comp" label={t(b('抽样', 'Sampling'))} sub={t(b('随机或按误差优先', 'random or by error'))} />
      <Mod x={216} y={80} w={150} h={44} side="comp" label={t(b('生成与想象', 'Generate, imagine'))} sub={t(b('生成模型或世界模型', 'generative or world model'))} />
      <Mod x={216} y={172} w={150} h={36} side="comp" label={t(b('网络更新', 'Network update'))} sub={t(b('同一条经历反复使用', 'each experience reused'))} />
      <Gap x={216} y={240} w={150} h={40} label={t(b('精确遗忘', 'Precise forgetting'))} />

      <Flow id={id} side="comp" pts={[[89, 50], [89, 80]]} />
      <Flow id={id} side="comp" head="read" pts={[[89, 144], [89, 172]]} />
      <Flow id={id} side="comp" pts={[[164, 190], [216, 190]]} />
      <Flow id={id} side="comp" pts={[[291, 124], [291, 172]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[366, 190], [374, 190], [374, 32], [164, 32]]} label={t(b('按新策略行动', 'act with new policy'))} at={2} ly={-7} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={14} y={82} n={2} side="comp" />
      <Num x={14} y={172} n={3} side="comp" />
      <Num x={216} y={172} n={4} side="comp" />
      <Num x={216} y={80} n={5} side="comp" />
      <Num x={216} y={240} n={6} side="comp" />
    </Svg>
  )
}

/** Offline processing from a single ripple to months of forgetting, and replay in training versus deployment. */
function ReplayTimeline({ t }: FigProps) {
  const id = 'f15d'
  const ticks: [number, Bi][] = [[150, b('10 毫秒', '10 ms')], [210, b('100 毫秒', '100 ms')], [270, b('1 秒', '1 s')], [350, b('1 分钟', '1 min')], [430, b('1 小时', '1 h')], [500, b('1 天', '1 day')], [570, b('1 周', '1 week')], [640, b('1 月', '1 month')], [720, b('1 年', '1 year')]]
  return (
    <Svg id={id} w={760} h={250} label={t(b('巩固、回放与遗忘的时间尺度', 'Time scales of consolidation, replay and forgetting'))}>
      <T x={16} y={44} anchor="start" s={t(b('睡眠回放\n与系统巩固', 'Sleep replay,\nconsolidation'))} size={10.5} color={C.pinkD} weight={600} />
      <T x={16} y={176} anchor="start" s={t(b('经验回放\n与模型更新', 'Experience replay,\nupdating'))} size={10.5} color={C.skyD} weight={600} />

      <Mod x={180} y={26} w={60} h={36} side="bio" label={t(b('涟漪', 'Ripple'))} sub={t(b('约 100 毫秒', '~100 ms'))} size={10.5} />
      <Mod x={240} y={26} w={80} h={36} side="bio" label={t(b('纺锤与慢波', 'Spindle, SO'))} sub={t(b('约 1 秒', '~1 s'))} size={10} />
      <Mod x={430} y={26} w={70} h={36} side="bio" label={t(b('睡眠周期', 'Sleep cycle'))} sub={t(b('约 90 分钟', '~90 min'))} size={10} />
      <Mod x={500} y={26} w={140} h={36} side="bio" label={t(b('系统巩固', 'Systems consolidation'))} sub={t(b('数晚到数周', 'nights to weeks'))} size={10.5} />
      <Mod x={640} y={26} w={80} h={36} side="bio" label={t(b('遗忘', 'Forgetting'))} sub={t(b('数月', 'months'))} size={10.5} />

      <line x1={140} y1={100} x2={752} y2={100} stroke={C.line} strokeWidth={1} />
      {ticks.map(([x, l]) => (
        <g key={x}>
          <line x1={x} y1={96} x2={x} y2={104} stroke={C.dim} strokeWidth={1} />
          <T x={x} y={115} s={t(l)} size={9.5} color={C.dim} />
        </g>
      ))}

      <Mod x={150} y={150} w={60} h={36} side="comp" label={t(b('每步', 'Each step'))} sub={t(b('毫秒', 'ms'))} size={10.5} />
      <Mod x={350} y={150} w={220} h={36} side="comp" label={t(b('训练中反复回放', 'Repeated replay in training'))} sub={t(b('数小时到数天', 'hours to days'))} />
      <Gap x={570} y={150} w={180} h={36} label={t(b('部署：不再回放，数月一次新版本', 'Deployed: no replay, new versions\nevery few months'))} />
      <Num x={180} y={26} n={1} side="bio" />
      <Num x={240} y={26} n={2} side="bio" />
      <Num x={430} y={26} n={3} side="bio" />
      <Num x={500} y={26} n={4} side="bio" />
      <Num x={640} y={26} n={5} side="bio" />
      <Num x={150} y={150} n={1} side="comp" />
      <Num x={350} y={150} n={2} side="comp" />
      <Num x={570} y={150} n={3} side="comp" />
    </Svg>
  )
}

export const CONSOLIDATION_FIGS: TopicFigs = {
  arch: { brain: SleepReplayArch, ai: ExperienceReplayArch },
  dynamics: ReplayTimeline,
}
