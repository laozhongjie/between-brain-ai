import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg } from '../kit'
import { Flow, Gap, Mod, Num } from '../grammar'
import { Axes, Bar, Dot, FigSlider, Label, Path, Ref, SIDE_COLOR, gauss, px, py, rng, trace, type Frame } from '../plot'
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
      <Mod x={30} y={142} w={154} h={40} side="comp" label={t(b('事后校准', 'Post-hoc calibration'))} sub={t(b('在验证集上调温度', 'temperature set on held-out data'))} size={10.5} />
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

/** Evidence accumulation with v = 1, σ = 1 and bounds at ±1, and confidence 1 / (1 + e^{−2v|x|/σ²}) at the decision. */
function AccumulationPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const f1: Frame = { x: 40, y: 30, w: 170, h: 130, xr: [0, 1.6], yr: [-1.25, 1.25] }
  const f2: Frame = { x: 266, y: 30, w: 96, h: 130, xr: [0, 2], yr: [0.5, 1] }
  // seeds picked for one fast correct, one slow correct and one wrong decision
  const walk = (seed: number) => {
    const u = rng(seed), dt = 0.01, pts: [number, number][] = [[0, 0]]
    let x = 0, tm = 0
    while (Math.abs(x) < 1 && tm < 1.6) { x += dt + Math.sqrt(dt) * gauss(u); tm += dt; pts.push([tm, Math.max(-1, Math.min(1, x))]) }
    return pts
  }
  const paths = [walk(1), walk(30), walk(22)]
  const conf = (x: number) => 1 / (1 + Math.exp(-2 * x))
  return (
    <Svg id="f24mb0" w={380} h={206} label={t(b('证据随时间累积到界限；做决定时证据越多，信心越高', 'Evidence accumulates to a bound; more evidence at the decision means higher confidence'))}>
      <Axes f={f1} xTicks={[[0, '0'], [0.5, '0.5'], [1, '1'], [1.5, '1.5']]} yTicks={[[-1, '−B'], [0, '0'], [1, 'B']]}
        xLabel={t(b('时间（秒）', 'Time (s)'))} yLabel={t(b('累积的证据 x', 'Accumulated evidence x'))} />
      <line x1={f1.x} x2={f1.x + f1.w} y1={py(f1, 1)} y2={py(f1, 1)} stroke={col} strokeOpacity={0.5} />
      <line x1={f1.x} x2={f1.x + f1.w} y1={py(f1, -1)} y2={py(f1, -1)} stroke={C.dim} />
      <Label x={f1.x + f1.w - 2} y={py(f1, 1) - 8} s={t(b('选对', 'correct'))} anchor="end" size={10} color={col} />
      <Label x={f1.x + f1.w - 2} y={py(f1, -1) - 8} s={t(b('选错', 'wrong'))} anchor="end" size={10} />
      {paths.map((p, i) => {
        const pts = p.map(([a, v]) => [px(f1, a), py(f1, v)] as [number, number])
        const [ex, ey] = pts[pts.length - 1]
        return (
          <g key={i}>
            <Path pts={pts} color={i === 2 ? C.dim : col} width={1.3} opacity={i === 2 ? 0.9 : 0.85} />
            <circle cx={ex} cy={ey} r={2.6} fill={i === 2 ? C.dim : col} />
          </g>
        )
      })}
      <Axes f={f2} xTicks={[[0, '0'], [0.5, '0.5'], [1, '1'], [2, '2']]} yTicks={[[0.5, '0.5'], [0.75, '0.75'], [1, '1']]}
        xLabel={t(b('做决定时的证据 |x|', 'Evidence at decision |x|'))} yLabel={t(b('信心', 'Confidence'))} />
      <Path pts={trace(f2, conf)} color={col} />
      <Dot f={f2} x={0.5} y={conf(0.5)} color={col} />
      <Dot f={f2} x={1} y={conf(1)} color={col} />
      <Label x={px(f2, 0.5) + 6} y={py(f2, conf(0.5)) + 10} s="0.73" anchor="start" size={10} color={col} />
      <Label x={px(f2, 1) + 6} y={py(f2, conf(1)) + 10} s="0.88" anchor="start" size={10} color={col} />
    </Svg>
  )
}

/** Reliability diagram of the worked example: 40 answers at confidence 0.6 (0.6 right), 60 at 0.9 (0.7 right). */
function ReliabilityPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const f: Frame = { x: 44, y: 28, w: 160, h: 150, xr: [0, 1], yr: [0, 1] }
  return (
    <Svg id="f24mc0" w={380} h={214} label={t(b('可靠性图：高信心组的正确率低于信心，差距就是校准误差', 'Reliability diagram: the high-confidence group is right less often than it claims, and the gap is the calibration error'))}>
      <Axes f={f} xTicks={[[0, '0'], [0.6, '0.6'], [0.9, '0.9']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
        xLabel={t(b('平均置信度', 'Mean confidence'))} yLabel={t(b('实际正确率', 'Accuracy'))} grid />
      <Path pts={[[px(f, 0), py(f, 0)], [px(f, 1), py(f, 1)]]} color={C.dim} width={1} dashed />
      <Label x={px(f, 0.3) - 4} y={py(f, 0.3) - 12} s={t(b('完全校准', 'perfect calibration'))} size={10} anchor="end" />
      <Bar f={f} x={0.6} v={0.6} w={0.16} color={col} />
      <Bar f={f} x={0.9} v={0.7} w={0.16} color={col} />
      <rect x={px(f, 0.82)} y={py(f, 0.9)} width={px(f, 0.98) - px(f, 0.82)} height={py(f, 0.7) - py(f, 0.9)} fill={C.lemonD} fillOpacity={0.18} stroke={C.lemonD} strokeDasharray="3 2" />
      <Label x={px(f, 0.6)} y={py(f, 0.3)} s={t(b('40 个', '40'))} size={10} color={col} />
      <Label x={px(f, 0.9)} y={py(f, 0.35)} s={t(b('60 个', '60'))} size={10} color={col} />
      <Label x={226} y={70} s={t(b('高信心组\n信心 0.9，只对了 0.7\n差 0.2，占全部的 60%', 'High-confidence group\nconfidence 0.9, right 0.7\ngap 0.2, 60% of answers'))} anchor="start" color={C.lemonD} />
      <Label x={226} y={128} s={t(b('低信心组\n信心与正确率都是 0.6', 'Low-confidence group\nconfidence and accuracy 0.6'))} anchor="start" color={col} />
      <Label x={226} y={170} s="ECE = 0.6 × 0.2 = 0.12" anchor="start" color={C.ink} />
    </Svg>
  )
}

/** Temperature scaling, interactive: scores (2, 0); drag T to see the two probabilities (left) and the top answer's
 * probability against T (right), with the actual accuracy of 73%. Starts at the worked example's answer, T = 2. */
function TemperaturePlot({ t }: FigProps) {
  const [T, setT] = useState(2)
  const col = SIDE_COLOR.comp
  const pOf = (v: number) => { const a = Math.exp(2 / v); return a / (a + 1) }
  const pa = pOf(T), pb = 1 - pa
  const f1: Frame = { x: 40, y: 40, w: 120, h: 124, xr: [0.4, 2.6], yr: [0, 1] }
  const f2: Frame = { x: 210, y: 40, w: 120, h: 124, xr: [0.5, 4], yr: [0.5, 1] }
  const readout = (v: number) => t(b(`$T = ${v.toFixed(2)}$，答案 A 的概率 ${pOf(v).toFixed(2)}`, `$T = ${v.toFixed(2)}$: answer A gets ${pOf(v).toFixed(2)}`))
  return (
    <>
      <Svg id="f24mc1" w={380} h={206} label={t(b('温度缩放：T 越大，较高答案的概率越低；T = 2 时与实际正确率一致', 'Temperature scaling: the larger T, the lower the top answer’s probability; at T = 2 it matches actual accuracy'))}>
        <Axes f={f1} xTicks={[[1, 'A'], [2, 'B']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]} grid />
        <Label x={f1.x - 4} y={f1.y - 24} s={t(b('概率', 'Probability'))} anchor="start" />
        <Ref f={f1} y={0.73} color={C.lemonD} />
        <Bar f={f1} x={1} v={pa} w={0.6} color={col} />
        <Bar f={f1} x={2} v={pb} w={0.6} color={C.dim} />
        <Label x={px(f1, 1)} y={py(f1, pa) - 8} s={pa.toFixed(2)} size={10} color={col} />
        <Label x={px(f1, 2)} y={py(f1, pb) - 8} s={pb.toFixed(2)} size={10} />
        <Label x={px(f1, 1.5)} y={f1.y + f1.h + 27} s={t(b('A 得分 2，B 得分 0', 'A scores 2, B scores 0'))} size={10} />
        <Axes f={f2} xTicks={[[0.5, ''], [1, '1'], [2, '2'], [3, '3'], [4, '4']]} yTicks={[[0.5, '0.5'], [0.73, '0.73'], [1, '1']]} xLabel={t(b('温度 T', 'Temperature T'))} grid />
        <Label x={f2.x - 4} y={f2.y - 24} s={t(b('答案 A 的概率', 'Probability of A'))} anchor="start" />
        <Ref f={f2} y={0.73} color={C.lemonD} />
        <Label x={f2.x + f2.w + 5} y={py(f2, 0.73)} s={t(b('实际\n正确率', 'actual\naccuracy'))} anchor="start" size={10} color={C.lemonD} />
        <Path pts={trace(f2, pOf, 0.5, 4, 200)} color={col} opacity={0.45} />
        <Dot f={f2} x={T} y={pa} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('温度 $T$', 'Temperature $T$'))} value={T} min={0.5} max={4} step={0.05} onChange={setT}
        readout={readout(T)} widest={[0.5, 2, 3.95].map(readout)} />
    </>
  )
}

export const MONITORING_FIGS: TopicFigs = {
  arch: { brain: MonitoringBrainArch, ai: CalibrationArch },
  math: {
    bio: {
      0: { Fig: AccumulationPlot, cap: b('左：三次决定，证据带着漂移 $v = 1$ 和噪声累积，碰到界限就做出选择，其中一次被噪声带到了错误的一边。右：做决定时的证据 $|x|$ 越多，信心越高，小例子中的 $0.5$ 和 $1$ 分别对应 $0.73$ 和 $0.88$。', 'Left: three decisions. Evidence accumulates with drift $v = 1$ plus noise until it hits a bound, and noise carries one of them to the wrong side. Right: more evidence $|x|$ at the decision means higher confidence; the worked example’s $0.5$ and $1$ give $0.73$ and $0.88$.') },
    },
    comp: {
      0: { Fig: ReliabilityPlot, cap: b('可靠性图把回答按置信度分组，比较每组的置信度和实际正确率。落在对角线上就是校准良好；高信心组比对角线低 $0.2$，乘以它占的 60%，就是 $\\mathrm{ECE} = 0.12$。', 'A reliability diagram groups answers by confidence and compares each group’s confidence with its accuracy. On the diagonal means well calibrated. The high-confidence group sits $0.2$ below it, and times its 60% share that gives $\\mathrm{ECE} = 0.12$.') },
      1: { Fig: TemperaturePlot, cap: b('拖动滑块改变温度 $T$，得分仍是 $(2, 0)$。左：两个答案的概率；右：答案 A 的概率随 $T$ 的变化，黄线是实际正确率 $73\\%$。$T = 1$ 时为 $0.88$，高出 $0.15$；拖到 $T = 2$ 正好落在黄线上。答案的排序始终不变，变的只是置信度。', 'Drag the slider to change the temperature $T$; the scores stay $(2, 0)$. Left: the two answers’ probabilities. Right: answer A’s probability against $T$, with actual accuracy, $73\\%$, in yellow. At $T = 1$ it is $0.88$, $0.15$ too high; at $T = 2$ it sits on the yellow line. The ranking never changes, only the confidence.') },
    },
  },
}
