import type { Bi } from '../../../data/types'
import { Svg } from '../kit'
import { Flow, Gap, Mod, Num } from '../grammar'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Evidence accumulates to a decision; the same process is read out as confidence, integrated in anterior prefrontal cortex; the cingulate flags errors; both change behavior. */
function MonitoringBrainArch({ t }: FigProps) {
  const id = 'f24b'
  return (
    <Svg id={id} w={380} h={228} label={t(b('信心与错误监测的结构与信息流：顶叶的证据累积、读出信心、前额叶前部、前扣带皮层的错误检测、行为调整', 'Confidence and error monitoring: evidence accumulation in parietal cortex, confidence readout, anterior prefrontal cortex, error detection in the cingulate, behavior'))}>
      <Mod x={14} y={14} w={170} h={40} side="bio" label={t(b('顶叶等区域', 'Parietal and other areas'))} sub={t(b('证据累积到界限，做出选择', 'evidence reaches a bound, a choice'))} size={10.5} />
      <Mod x={196} y={14} w={170} h={40} side="bio" label={t(b('读出信心', 'Confidence readout'))} sub={t(b('同一个累积过程的状态', 'state of the same accumulation'))} size={10.5} />
      <Mod x={14} y={92} w={170} h={40} side="bio" label={t(b('前扣带皮层', 'Anterior cingulate'))} sub={t(b('出错后约 100 毫秒发出信号', 'signals about 100 ms after an error'))} size={10.5} />
      <Mod x={196} y={92} w={170} h={40} side="bio" label={t(b('前额叶前部', 'Anterior prefrontal'))} sub={t(b('信心与情境整合，供报告', 'integrates confidence for report'))} size={10.5} />
      <Mod x={100} y={172} w={180} h={40} side="bio" label={t(b('行为调整', 'Behavior'))} sub={t(b('放慢、复查、求助、再收集', 'slow down, check, ask, gather more'))} size={10.5} />

      <Flow id={id} side="bio" pts={[[184, 34], [196, 34]]} />
      <Flow id={id} side="bio" pts={[[99, 54], [99, 92]]} label={t(b('实际做出的反应', 'the response made'))} lx={44} ly={0} />
      <Flow id={id} side="bio" pts={[[281, 54], [281, 92]]} />
      <Flow id={id} side="bio" pts={[[99, 132], [99, 152], [160, 152], [160, 172]]} label={t(b('错误信号', 'error signal'))} at={1} ly={-7} />
      <Flow id={id} side="bio" pts={[[281, 132], [281, 152], [220, 152], [220, 172]]} />
      <Num x={14} y={14} n={1} side="bio" />
      <Num x={196} y={14} n={2} side="bio" />
      <Num x={196} y={92} n={3} side="bio" />
      <Num x={14} y={92} n={4} side="bio" />
      <Num x={100} y={172} n={5} side="bio" />
    </Svg>
  )
}

/** A model's output probabilities, recalibrated with a temperature; confidence can also be stated in words or self-evaluated; post-training shifts the distribution. */
function CalibrationArch({ t }: FigProps) {
  const id = 'f24c'
  return (
    <Svg id={id} w={380} h={262} label={t(b('模型置信度校准的结构与信息流：输出概率、事后校准、口头信心、自我评估、后训练的影响', 'Model calibration: output probabilities, post-hoc calibration, stated confidence, self-evaluation, post-training'))}>
      <Mod x={30} y={14} w={336} h={34} side="comp" label={t(b('语言模型', 'Language model'))} sub={t(b('生成回答', 'generates an answer'))} size={10.5} />
      <Mod x={30} y={70} w={154} h={40} side="comp" label={t(b('输出概率', 'Output probabilities'))} sub={t(b('最高概率当作置信度', 'top probability as confidence'))} size={10.5} />
      <Mod x={196} y={70} w={150} h={40} side="comp" label={t(b('口头表达信心', 'Stated confidence'))} sub={t(b('生成的文字，不等于概率', 'generated text, not the probability'))} size={10} />
      <Mod x={30} y={142} w={154} h={40} side="comp" label={t(b('事后校准', 'Post-hoc calibration'))} sub={t(b('在验证集上调温度', 'temperature tuned on held-out data'))} size={10.5} />
      <Mod x={196} y={142} w={170} h={40} side="comp" label={t(b('自我评估', 'Self-evaluation'))} sub={t(b('判断自己的答案对不对', 'judges its own answer'))} size={10.5} />
      <Mod x={30} y={208} w={154} h={40} side="comp" label={t(b('后训练', 'Post-training'))} sub={t(b('回答更确定，校准变差', 'more certain, worse calibrated'))} size={10.5} />
      <Gap x={196} y={208} w={170} h={40} label={t(b('对推理过程本身的\n独立监测', 'Independent monitoring\nof the reasoning itself'))} />

      <Flow id={id} side="comp" pts={[[107, 48], [107, 70]]} />
      <Flow id={id} side="comp" pts={[[271, 48], [271, 70]]} />
      <Flow id={id} side="comp" pts={[[358, 48], [358, 142]]} />
      <Flow id={id} side="comp" pts={[[107, 110], [107, 142]]} />
      <Flow id={id} side="comp" kind="fb" pts={[[30, 228], [20, 228], [20, 31], [30, 31]]} />
      <Num x={30} y={70} n={1} side="comp" />
      <Num x={30} y={142} n={2} side="comp" />
      <Num x={196} y={70} n={3} side="comp" />
      <Num x={196} y={142} n={4} side="comp" />
      <Num x={30} y={208} n={5} side="comp" />
      <Num x={196} y={208} n={6} side="comp" />
    </Svg>
  )
}

export const MONITORING_FIGS: TopicFigs = {
  arch: { brain: MonitoringBrainArch, ai: CalibrationArch },
}
