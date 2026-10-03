import { useState } from 'react'
import type { Bi } from '../../../data/types'
import { C, Svg, T } from '../kit'
import { Flow, Gap, Mod, Num, Region, Var } from '../grammar'
import { Axes, Dot, FigSlider, Heat, Label, Path, SIDE_COLOR, Vec, gauss, px, py, rng, trace, type Frame } from '../plot'
import type { FigProps, TopicFigs } from '../types'

const b = (zh: string, en: string): Bi => ({ zh, en })

/** Retina, LGN and V1 on top; the ventral stream (V2/V4 to IT) and the dorsal stream (MT to parietal) below. */
function VisualStreamsArch({ t }: FigProps) {
  const id = 'f01b'
  return (
    <Svg id={id} w={380} h={306} label={t(b('视觉通路的结构与信息流：视网膜、LGN、V1，腹侧通路的 V2、V4 和 IT，背侧通路的 MT 和顶叶', 'Visual pathways: retina, LGN and V1, then V2, V4 and IT in the ventral stream and MT and parietal cortex in the dorsal stream'))}>
      <Mod x={18} y={14} w={84} h={38} side="bio" label={t(b('视网膜', 'Retina'))} sub={t(b('光变成电信号', 'light to pulses'))} />
      <Mod x={128} y={14} w={64} h={38} side="bio" label="LGN" sub={t(b('丘脑', 'thalamus'))} />
      <Mod x={218} y={14} w={148} h={38} side="bio" label="V1" sub={t(b('边缘与方向', 'edges and orientation'))} />
      <Region x={10} y={76} w={362} h={88} side="bio" label={t(b('腹侧通路', 'Ventral stream'))} />
      <Mod x={24} y={102} w={120} h={46} side="bio" label="IT" sub={t(b('物体与面孔', 'objects and faces'))} />
      <Mod x={214} y={102} w={120} h={46} side="bio" label={t(b('V2、V4', 'V2, V4'))} sub={t(b('角、曲线、纹理', 'corners, curves, texture'))} />
      <Region x={10} y={180} w={362} h={80} side="bio" label={t(b('背侧通路', 'Dorsal stream'))} />
      <Mod x={24} y={204} w={120} h={42} side="bio" label={t(b('顶叶', 'Parietal cortex'))} sub={t(b('位置与动作', 'location and action'))} />
      <Mod x={214} y={204} w={120} h={42} side="bio" label="MT" sub={t(b('运动方向', 'motion direction'))} />
      <Var cx={84} cy={287} side="bio" label={t(b('眼动', 'Eyes'))} />
      <T x={104} y={287} anchor="start" s={t(b('扫视，每秒约 3 次', 'saccades, about 3 per second'))} size={9} color={C.dim} />

      <Flow id={id} side="bio" fast pts={[[102, 33], [128, 33]]} />
      <Flow id={id} side="bio" fast pts={[[192, 33], [218, 33]]} />
      <Flow id={id} side="bio" pts={[[300, 52], [300, 102]]} />
      <Flow id={id} side="bio" pts={[[214, 125], [144, 125]]} />
      <Flow id={id} side="bio" pts={[[352, 52], [352, 225], [334, 225]]} />
      <Flow id={id} side="bio" pts={[[214, 225], [144, 225]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[84, 102], [84, 64], [250, 64], [250, 52]]} at={1} label={t(b('反馈', 'feedback'))} ly={8} />
      <Flow id={id} side="bio" pts={[[84, 246], [84, 274]]} />
      <Flow id={id} side="bio" kind="fb" pts={[[71, 287], [4, 287], [4, 33], [18, 33]]} />
      <Num x={18} y={14} n={1} side="bio" />
      <Num x={218} y={14} n={2} side="bio" />
      <Num x={214} y={102} n={3} side="bio" />
      <Num x={24} y={102} n={4} side="bio" />
      <Num x={214} y={204} n={5} side="bio" />
      <Num x={118} y={64} n={6} side="bio" />
      <Num x={62} y={274} n={6} side="bio" />
    </Svg>
  )
}

/** CNN and ViT side by side: pixels in, local convolutions or patch attention, a feature vector, a classifier. */
function VisionModelArch({ t }: FigProps) {
  const id = 'f01c'
  return (
    <Svg id={id} w={380} h={320} label={t(b('CNN 与 ViT 的结构与信息流', 'Structure and information flow of a CNN and a ViT'))}>
      <Mod x={14} y={14} w={352} h={36} side="comp" label={t(b('图像', 'Image'))} sub={t(b('像素数组，例如 224 × 224 × 3', 'pixel array, e.g. 224 × 224 × 3'))} />
      <Region x={8} y={68} w={178} h={132} side="comp" label="CNN" />
      <Mod x={20} y={94} w={154} h={38} side="comp" label={t(b('卷积层', 'Convolution'))} sub={t(b('局部模板扫过全图', 'local template over the image'))} />
      <Mod x={20} y={148} w={154} h={40} side="comp" label={t(b('池化与深层卷积', 'Pooling, deeper layers'))} sub={t(b('感受野逐层扩大', 'receptive fields grow'))} />
      <Region x={194} y={68} w={178} h={132} side="comp" label="ViT" />
      <Mod x={206} y={94} w={154} h={38} side="comp" label={t(b('图块嵌入', 'Patch embedding'))} sub={t(b('16 × 16 像素一块', '16 × 16 pixels each'))} />
      <Mod x={206} y={148} w={154} h={40} side="comp" label={t(b('自注意力层', 'Self-attention'))} sub={t(b('每块与所有块比较', 'every patch with every patch'))} />
      <Mod x={120} y={216} w={140} h={32} side="comp" label={t(b('特征向量', 'Feature vector'))} />
      <Mod x={120} y={268} w={140} h={40} side="comp" label={t(b('分类头', 'Classifier'))} sub={t(b('softmax 输出类别概率', 'softmax class probabilities'))} />
      <Gap x={14} y={268} w={92} h={40} label={t(b('眼动', 'Eye\nmovements'))} />
      <Gap x={274} y={268} w={92} h={40} label={t(b('自上而下\n反馈', 'Top-down\nfeedback'))} />

      <Flow id={id} side="comp" pts={[[97, 50], [97, 94]]} />
      <Flow id={id} side="comp" pts={[[283, 50], [283, 94]]} />
      <Flow id={id} side="comp" pts={[[97, 132], [97, 148]]} />
      <Flow id={id} side="comp" pts={[[283, 132], [283, 148]]} />
      <Flow id={id} side="comp" pts={[[97, 188], [97, 232], [120, 232]]} />
      <Flow id={id} side="comp" pts={[[283, 188], [283, 232], [260, 232]]} />
      <Flow id={id} side="comp" pts={[[190, 248], [190, 268]]} />
      <Num x={14} y={14} n={1} side="comp" />
      <Num x={20} y={94} n={2} side="comp" />
      <Num x={20} y={148} n={3} side="comp" />
      <Num x={206} y={94} n={4} side="comp" />
      <Num x={120} y={216} n={5} side="comp" />
      <Num x={14} y={268} n={6} side="comp" />
      <Num x={274} y={268} n={6} side="comp" />
    </Svg>
  )
}

/** A V1 simple cell, interactive: an odd-symmetric Gabor receptive field (an edge detector, dark left and bright
 * right), a matched grating at the angle set by the slider, and the rectified response against angle with the current
 * point. Starts at the preferred orientation, 0°. */
function GaborPlot({ t }: FigProps) {
  const [deg, setDeg] = useState(0)
  const col = SIDE_COLOR.bio
  const n = 21, sigma = 4, gamma = 0.7, lambda = 9
  const G = (x: number, y: number) => Math.exp(-(x * x + gamma * gamma * y * y) / (2 * sigma * sigma)) * Math.sin((2 * Math.PI * x) / lambda)
  const cells = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => G(c - 10, r - 10)))
  const peak = Math.max(...cells.flat())
  const grating = (d: number, x: number, y: number) => { const a = (d * Math.PI) / 180; return Math.sin((2 * Math.PI * (x * Math.cos(a) + y * Math.sin(a))) / lambda) }
  const resp = (d: number) => { let s = 0; for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) s += cells[r][c] * grating(d, c - 10, r - 10); return s }
  const r0 = resp(0)
  const rel = (d: number) => Math.max(0, resp(d)) / r0
  const stim = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (grating(deg, c - 10, r - 10) + 1) / 2))
  const f: Frame = { x: 224, y: 34, w: 138, h: 120, xr: [-90, 90], yr: [0, 1] }
  const readout = (d: number) => t(b(`偏离 ${d}°：放电 ${rel(d).toFixed(2)}`, `${d}° off: firing ${rel(d).toFixed(2)}`))
  return (
    <>
      <Svg id="f01mb0" w={380} h={200} label={t(b('V1 简单细胞：感受野是一个边缘检测器，只对接近偏好方向的条纹放电', 'A V1 simple cell: the receptive field is an edge detector that fires only for stripes near its preferred orientation'))}>
        <Heat x={14} y={44} cell={4} vals={cells.map((row) => row.map((v) => v / peak))} pos={col} neg={C.lavD} gap={0} />
        <rect x={14} y={44} width={84} height={84} fill="none" stroke={C.line} />
        <Label x={56} y={30} s={t(b('感受野 G', 'Receptive field G'))} size={10} color={C.ink} />
        <Label x={56} y={146} s={t(b('粉色处变亮增加放电\n灰色处变亮抑制放电', 'light on pink excites,\non gray inhibits'))} size={9.5} />
        <Heat x={112} y={44} cell={4} vals={stim} pos={C.ink} gap={0} />
        <rect x={112} y={44} width={84} height={84} fill="none" stroke={C.line} />
        <Label x={154} y={30} s={t(b('条纹刺激', 'Stripe stimulus'))} size={10} color={C.ink} />
        <Label x={154} y={140} s={t(b(`转了 ${deg}°`, `turned ${deg}°`))} size={10} />
        <Axes f={f} xTicks={[[-90, '−90'], [0, '0'], [90, '90']]} yTicks={[[0, '0'], [0.5, '0.5'], [1, '1']]}
          xLabel={t(b('条纹方向（度）', 'Stripe angle (°)'))} yLabel={t(b('放电 r', 'Firing r'))} />
        <Path pts={trace(f, rel, -90, 90, 90)} color={col} opacity={0.45} />
        <Dot f={f} x={deg} y={rel(deg)} color={col} r={4} />
      </Svg>
      <FigSlider label={t(b('条纹方向', 'Stripe angle'))} value={deg} min={-90} max={90} step={1} onChange={setDeg}
        readout={readout(deg)} widest={[-88, -45, 0].map(readout)} />
    </>
  )
}

/** Two neurons' responses to faces and cars: tangled in V1, separable by one line in IT (w = (1, −1), b = 0). */
function ReadoutPlot({ t }: FigProps) {
  const col = SIDE_COLOR.bio
  const u = rng(7)
  const cloud = (cx: number, cy: number, sd: number, k: number) => Array.from({ length: k }, () => [cx + sd * gauss(u), cy + sd * gauss(u)] as [number, number])
  const v1Face = [...cloud(12, 12, 4, 7), ...cloud(36, 36, 4, 7)], v1Car = [...cloud(12, 36, 4, 7), ...cloud(36, 12, 4, 7)]
  const itFace = cloud(38, 8, 4.5, 14), itCar = cloud(8, 38, 4.5, 14)
  const f1: Frame = { x: 40, y: 32, w: 130, h: 120, xr: [0, 48], yr: [0, 48] }
  const f2: Frame = { x: 228, y: 32, w: 130, h: 120, xr: [0, 48], yr: [0, 48] }
  const ticks: [number, string][] = [[0, '0'], [20, '20'], [40, '40']]
  const pts = (f: Frame, list: [number, number][], face: boolean) => list.map(([a, c], i) => (
    <circle key={i} cx={px(f, Math.max(0, Math.min(48, a)))} cy={py(f, Math.max(0, Math.min(48, c)))} r={3} fill={face ? col : 'none'} fillOpacity={0.8} stroke={face ? col : C.dim} strokeWidth={1.3} />
  ))
  return (
    <Svg id="f01mb1" w={380} h={210} label={t(b('同一组面孔和汽车：在 V1 中交织在一起，在 IT 中一条直线就能分开', 'The same faces and cars: tangled in V1, separable by one line in IT'))}>
      <Axes f={f1} xTicks={ticks} yTicks={ticks} xLabel={t(b('神经元 1', 'Neuron 1'))} yLabel={t(b('V1：交织', 'V1: tangled'))} />
      {pts(f1, v1Face, true)}{pts(f1, v1Car, false)}
      <Axes f={f2} xTicks={ticks} yTicks={ticks} xLabel={t(b('面孔细胞（次/秒）', 'Face cell (spikes/s)'))} yLabel={t(b('IT：汽车细胞', 'IT: car cell'))} />
      <Path pts={[[px(f2, 0), py(f2, 0)], [px(f2, 48), py(f2, 48)]]} color={C.ink} width={1.2} dashed />
      {pts(f2, itFace, true)}{pts(f2, itCar, false)}
      <Label x={px(f2, 40)} y={py(f2, 24)} s={t(b('判为面孔', 'face'))} size={10} color={col} />
      <Label x={px(f2, 12)} y={py(f2, 22)} s={t(b('判为汽车', 'car'))} size={10} />
      <circle cx={46} cy={194} r={3} fill={col} />
      <Label x={54} y={194} s={t(b('面孔', 'faces'))} anchor="start" size={10} />
      <circle cx={100} cy={194} r={3} fill="none" stroke={C.dim} strokeWidth={1.3} />
      <Label x={108} y={194} s={t(b('汽车', 'cars'))} anchor="start" size={10} />
    </Svg>
  )
}

/** A vertical-edge kernel slides over an image of a bright square; after ReLU only the left edge lights up. */
function ConvMapPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const img = Array.from({ length: 8 }, (_, r) => Array.from({ length: 8 }, (_, c) => (r >= 2 && r <= 5 && c >= 2 && c <= 5 ? 1 : 0)))
  const K = [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]]
  const out = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => {
    let s = 0
    for (let u = 0; u < 3; u++) for (let v = 0; v < 3; v++) s += K[u][v] * img[i + u][j + v]
    return Math.max(0, s) / 3
  }))
  const c1 = 13, x1 = 14, y0 = 40, xk = 152, xo = 268
  // the outlined window: rows 2..4, columns 1..3 of the input, output cell (2, 1), sum +3
  return (
    <Svg id="f01mc0" w={380} h={196} label={t(b('卷积：同一个竖直边缘模板扫过整张图，ReLU 后只在左边缘点亮', 'Convolution: one vertical-edge template slides over the image; after ReLU only the left edge lights up'))}>
      <Heat x={x1} y={y0} cell={c1} vals={img} pos={C.ink} neg={C.ink} />
      <rect x={x1 + 1 * c1} y={y0 + 2 * c1} width={3 * c1} height={3 * c1} fill="none" stroke={col} strokeWidth={1.8} />
      <Label x={x1 + 4 * c1} y={y0 - 14} s={t(b('输入图像', 'Input image'))} color={C.ink} />
      {K.map((row, r) => row.map((v, c) => (
        <g key={`${r}-${c}`}>
          <rect x={xk + c * 20} y={y0 + 20 + r * 20} width={19} height={19} fill={v > 0 ? col : C.lavD} fillOpacity={v ? 0.55 : 0.08} />
          <text x={xk + c * 20 + 9.5} y={y0 + 30 + r * 20} fontSize={10} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>{v > 0 ? '+1' : v < 0 ? '−1' : '0'}</text>
        </g>
      )))}
      <Label x={xk + 30} y={y0 - 14} s={t(b('卷积核', 'Kernel'))} color={C.ink} />
      <Label x={xk + 30} y={y0 + 94} s={t(b('同一组权重\n用在每个位置', 'same weights\nat every position'))} size={10} />
      <Vec x1={x1 + 8 * c1 + 6} y1={y0 + 52} x2={xk - 6} y2={y0 + 52} color={C.dim} width={1.2} />
      <Vec x1={xk + 66} y1={y0 + 52} x2={xo - 6} y2={y0 + 52} color={C.dim} width={1.2} />
      <Heat x={xo} y={y0 + 13} cell={c1} vals={out} pos={col} />
      <rect x={xo + c1} y={y0 + 13 + 2 * c1} width={c1} height={c1} fill="none" stroke={col} strokeWidth={1.8} />
      <Label x={xo + 3 * c1} y={y0 - 14} s={t(b('特征图', 'Feature map'))} color={C.ink} />
      <Label x={xo + 3 * c1} y={y0 + 108} s={t(b('左边缘点亮；\n右边缘为负，被 ReLU 截掉', 'left edge lit; the right\nedge is negative, cut by ReLU'))} size={10} />
    </Svg>
  )
}

/** Attention from one patch (an ear) over an 8 × 8 grid of patches: far-away face patches get high weight; a CNN's
 * first layer sees only the 3 × 3 neighborhood. Scores are illustrative. */
function PatchAttentionPlot({ t }: FigProps) {
  const col = SIDE_COLOR.comp
  const face: [number, number][] = [[1, 5], [3, 2], [3, 5], [4, 1], [4, 6], [5, 3], [5, 4]]
  const score = (r: number, c: number) => (r === 1 && c === 2 ? 3 : face.some(([a, d]) => a === r && d === c) ? 2.6 : (r >= 2 && r <= 5 && c >= 2 && c <= 5 ? 1 : 0))
  const ex = Array.from({ length: 8 }, (_, r) => Array.from({ length: 8 }, (_, c) => Math.exp(score(r, c))))
  const sum = ex.flat().reduce((a, v) => a + v, 0)
  const w = ex.map((row) => row.map((v) => v / sum))
  const top = Math.max(...w.flat())
  const cell = 18, x0 = 20, y0 = 26
  return (
    <Svg id="f01mc1" w={380} h={196} label={t(b('ViT 中一个图块的注意力：远处的脸部图块拿到高权重，CNN 第一层只看到周围一圈', 'One ViT patch’s attention: distant face patches get high weight, while a CNN’s first layer sees only its neighbors'))}>
      <Heat x={x0} y={y0} cell={cell} vals={w.map((row) => row.map((v) => v / top))} pos={col} />
      <rect x={x0 + 1 * cell} y={y0 + 0 * cell} width={3 * cell} height={3 * cell} fill="none" stroke={C.dim} strokeDasharray="3 2" strokeWidth={1.4} />
      <rect x={x0 + 2 * cell} y={y0 + 1 * cell} width={cell} height={cell} fill="none" stroke={C.ink} strokeWidth={2} />
      <Vec x1={x0 + 8 * cell + 44} y1={y0 + 30} x2={x0 + 3 * cell + 4} y2={y0 + 1.5 * cell} color={C.ink} width={1.1} />
      <Label x={x0 + 8 * cell + 48} y={y0 + 30} s={t(b('查询图块：猫耳朵', 'Query patch: cat ear'))} anchor="start" color={C.ink} />
      <Label x={x0 + 8 * cell + 18} y={y0 + 70} s={t(b('颜色越深，注意力权重越大：\n眼睛、胡须、另一只耳朵\n都拿到高权重，哪怕相隔很远', 'Darker means more attention:\neyes, whiskers and the other ear\nscore high, however far away'))} anchor="start" size={10} />
      <Label x={x0 + 8 * cell + 18} y={y0 + 128} s={t(b('虚线框：CNN 第一层的 3 × 3\n卷积能看到的范围', 'Dashed box: what a CNN’s first\n3 × 3 convolution can see'))} anchor="start" size={10} />
    </Svg>
  )
}

export const VISUAL_FIGS: TopicFigs = {
  arch: { brain: VisualStreamsArch, ai: VisionModelArch },
  math: {
    bio: {
      0: { Fig: GaborPlot, cap: b('拖动滑块转动条纹。左：感受野 $G$，左负右正，是一个「左暗右亮」的边缘检测器，与小例子中的 $(-1, -1, +1, +1)$ 相同。中：与之间距相同的条纹，转动到滑块设定的角度。右：加权和整流后的放电，圆点是当前角度。偏离约 $\\pm 40°$ 以外放电为 $0$，所以每个细胞只报告一个方向。', 'Drag the slider to turn the stripes. Left: the receptive field $G$, negative on the left and positive on the right, a dark-to-bright edge detector like the worked example’s $(-1, -1, +1, +1)$. Middle: stripes of matching spacing, turned to the slider’s angle. Right: the rectified weighted sum, with a dot at the current angle. Beyond about $\\pm 40°$ the cell is silent, so each cell reports one orientation.') },
      1: { Fig: ReadoutPlot, cap: b('每个点是一张图片引起的两个神经元的放电。V1 中面孔和汽车交错分布，没有一条直线能分开。IT 中面孔细胞对面孔放电多，汽车细胞对汽车放电多，$\\mathbf{w} = (1, -1)$、$b = 0$ 的读出就是虚线 $y = 0$。', 'Each dot is two neurons’ firing for one image. In V1 faces and cars interleave and no straight line splits them. In IT the face cell fires more for faces and the car cell for cars, and the readout with $\\mathbf{w} = (1, -1)$, $b = 0$ is the dashed line $y = 0$.') },
    },
    comp: {
      0: { Fig: ConvMapPlot, cap: b('一个 $3 \\times 3$ 的竖直边缘核扫过亮方块。框出的窗口跨在左边缘上，加权和为 $+3$，对应特征图中框出的格子；右边缘得到 $-3$，ReLU 后为 $0$。同一组 9 个权重用在所有位置，这就是权重共享。', 'A $3 \\times 3$ vertical-edge kernel slides over a bright square. The outlined window straddles the left edge and sums to $+3$, the outlined cell of the feature map. The right edge gives $-3$, which ReLU sets to $0$. The same nine weights serve every position: weight sharing.') },
      1: { Fig: PatchAttentionPlot, cap: b('示意：图块「猫耳朵」对 $8 \\times 8$ 个图块的 softmax 权重。查询与脸部图块的键相似度高，所以眼睛、胡须拿到大部分权重，背景几乎为 $0$。CNN 第一层只能混合虚线框内的邻居，远处的信息要经过很多层才能到达。', 'Illustration: the softmax weights of the patch “cat ear” over $8 \\times 8$ patches. Its query matches the keys of face patches, so the eyes and whiskers take most of the weight and the background almost none. A CNN’s first layer mixes only the neighbors inside the dashed box; distant information takes many layers to arrive.') },
    },
  },
}
