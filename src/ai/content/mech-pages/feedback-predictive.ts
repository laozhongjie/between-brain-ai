import type { Bi } from '../../../data/types'
import type { MechEntry } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** M07 Feedback and predictive coding: higher areas send predictions down, and neurons report where input departs from them. */
export const FEEDBACK_PREDICTIVE: MechEntry = {
  definition: b(
    '皮层中，几乎每条从低级区域到高级区域的前馈通路，都伴有反向的反馈连接。预测编码理论认为，反馈携带的是对下一级输入的预测，低级区域的一部分神经元报告输入与预测之间的差异，即预测误差，并把误差向上传。预期之中的输入引起的活动较弱，意外的输入引起的活动较强。',
    'In cortex, almost every feedforward pathway from a lower to a higher area comes with feedback connections in the reverse direction. Predictive coding theory holds that feedback carries a prediction of the input to the level below. Some neurons in the lower area report the difference between input and prediction, the prediction error, and send it upward. Expected input evokes weaker activity and surprising input evokes stronger activity.'),
  scale: b('皮层层级之间，以及皮层的各个层内', 'Between levels of the cortical hierarchy and within cortical layers'),
  timescale: b('数十到数百毫秒', 'Tens to hundreds of milliseconds'),
  steps: [
    {
      title: b('前馈：输入逐级向上', 'Feedforward: input goes up level by level'),
      points: [
        b('感觉输入从低级区域的第 4 层进入，经第 2/3 层传到更高一级。', 'Sensory input enters a lower area in layer 4 and passes through layers 2/3 to the next level up.'),
      ],
    },
    {
      title: b('反馈：预测逐级向下', 'Feedback: predictions go down level by level'),
      points: [
        b('高级区域的深层神经元把投射送回低级区域的第 1 层和深层，携带关于场景或动作后果的预期。', 'Deep-layer neurons of a higher area project back to layer 1 and the deep layers of the lower area. They carry expectations about the scene or the result of an action.'),
      ],
    },
    {
      title: b('误差神经元比较两者', 'Error neurons compare the two'),
      points: [
        b('第 2/3 层的一部分神经元在输入多于预测时放电（正误差），另一部分在输入少于预测时放电（负误差）。', 'Some layer 2/3 neurons fire when input exceeds the prediction, positive error, and others fire when input falls short, negative error.'),
        b('用两群神经元表示正负误差，是因为放电率不能为负。', 'Two groups are needed for positive and negative errors because firing rates cannot be negative.'),
      ],
    },
    {
      title: b('误差向上，修正预测', 'Errors go up and correct the prediction'),
      points: [
        b('误差送到高一级，调整那里的表征，使下一次的预测更接近输入。', 'The errors go to the next level up and adjust its representation, so the next prediction comes closer to the input.'),
        b('输入被预测得越好，向上传的活动越少。', 'The better the input is predicted, the less activity goes up.'),
      ],
    },
    {
      title: b('运动产生的预测', 'Predictions from movement'),
      points: [
        b('小鼠在虚拟环境中奔跑时，运动区域把奔跑速度传到视皮层，预测视野的流动。', 'When a mouse runs in a virtual environment, motor areas send running speed to visual cortex to predict the flow of the visual field.'),
        b('视野突然停止流动时，视皮层的一类神经元强烈放电，报告「预期的流动没有出现」。', 'When the flow suddenly stops, a class of visual cortex neurons fires strongly, reporting that the expected flow did not come.'),
      ],
    },
    {
      title: b('反复迭代', 'Repeated rounds'),
      points: [
        b('前馈与反馈来回几次后，各级的表征逐步协调；难以识别的图像需要更多轮。', 'After several rounds of feedforward and feedback, the representations at each level settle into agreement, and hard images need more rounds.'),
      ],
    },
  ],
  notes: [
    b('Rao 与 Ballard 在 1999 年用预测编码网络解释了视皮层的「端点抑制」等现象：高层能预测的长线条，在低层引起的响应较弱。', 'Rao and Ballard used a predictive coding network in 1999 to explain effects such as end-stopping in visual cortex. Long lines that the higher level predicts evoke weaker responses below.'),
    b('2012 年小鼠实验发现，奔跑时视野流动突然停止，会让视皮层中的「失配」神经元强烈放电。', 'A 2012 mouse experiment found that when visual flow stopped suddenly during running, mismatch neurons in visual cortex fired strongly.'),
    b('2012 年的理论把预测编码的各个部分对应到皮层的各层：误差主要由浅层神经元携带，预测主要由深层神经元携带。', 'A 2012 theory mapped the parts of predictive coding onto cortical layers: errors carried mainly by superficial neurons and predictions mainly by deep ones.'),
    b('2019 年的实验发现，猴子识别难以辨认的物体时，下颞叶的正确表征出现得更晚，与反馈和循环处理一致。', 'A 2019 experiment found that for hard-to-recognize objects, the correct representation in monkey inferior temporal cortex appeared later, consistent with feedback and recurrent processing.'),
  ],
  counterpart: [
    b('主流的 CNN 和 Transformer 在一次推理中只做前馈计算，没有从高层回到低层的预测信号。', 'Mainstream CNNs and Transformers compute only feedforward in one pass, with no prediction signal from higher layers back to lower ones.'),
    b('JEPA 在表征空间中预测被遮住的部分，训练时最小化预测误差，但误差不在推理中逐层传递。', 'JEPA predicts masked parts in representation space and minimizes the prediction error in training, but the error is not passed layer by layer during inference.'),
    b('带循环连接的视觉网络（如 CORnet）加入了反复计算，在难以识别的图像上更接近猴子的反应。', 'Vision networks with recurrent connections, such as CORnet, add repeated computation and match monkey responses better on hard images.'),
  ],
  math: [
    {
      title: b('正负误差：两群神经元分别报告「比预期多」和「比预期少」', 'Positive and negative errors: two groups report more than expected and less than expected'),
      tex: t`\varepsilon^{+}(t) = \big[\,s(t) - g\,v(t)\,\big]_{+},\qquad \varepsilon^{-}(t) = \big[\,g\,v(t) - s(t)\,\big]_{+}`,
      symbols: [
        { tex: t`s(t)`, meaning: b('实际的视野流动速度', 'actual speed of visual flow') },
        { tex: t`v(t)`, meaning: b('奔跑速度，来自运动区域', 'running speed, from motor areas') },
        { tex: t`g`, meaning: b('学到的耦合：每单位奔跑速度预期的视野流动', 'learned coupling: expected flow per unit of running speed') },
        { tex: t`[\cdot]_{+}`, meaning: b('负值取 $0$：放电率不能为负', 'negatives set to $0$, since firing rates cannot be negative') },
        { tex: t`\varepsilon^{+}`, meaning: b('正误差神经元：流动多于预期时放电', 'positive error neurons: fire when flow exceeds the expectation') },
        { tex: t`\varepsilon^{-}`, meaning: b('负误差神经元（失配神经元）：流动少于预期时放电', 'negative error neurons, mismatch neurons: fire when flow falls short') },
      ],
      steps: [
        b('运动信号乘以耦合 $g$，得到预测的流动 $g\\,v$。', 'Multiply the motor signal by the coupling $g$ to get the predicted flow $g\\,v$.'),
        b('用实际流动减去预测：正的部分由一群神经元报告，负的部分由另一群报告。', 'Subtract the prediction from the actual flow. One group reports the positive part and another the negative part.'),
        b('预测准确时两群都安静；只有意外时才有活动向上传。', 'When the prediction is right both groups are quiet, and activity goes up only on surprise.'),
      ],
      example: b(
        '设 $g = 1$。小鼠以速度 $1$ 奔跑，视野以速度 $1$ 流动：$\\varepsilon^{+} = \\varepsilon^{-} = 0$。流动突然停止（$s = 0$），而小鼠仍在跑：$\\varepsilon^{-} = 1$，失配神经元放电。小鼠站着不动，屏幕却播放流动（$v = 0$、$s = 1$）：$\\varepsilon^{+} = 1$。若耦合学得不准，例如 $g = 0.5$，正常奔跑时也有 $\\varepsilon^{+} = 0.5$ 的持续误差。',
        'Let $g = 1$. The mouse runs at speed $1$ and the visual field flows at speed $1$, so $\\varepsilon^{+} = \\varepsilon^{-} = 0$. The flow suddenly stops, $s = 0$, while the mouse keeps running, so $\\varepsilon^{-} = 1$ and mismatch neurons fire. The mouse stands still while the screen plays flow, $v = 0$ and $s = 1$, so $\\varepsilon^{+} = 1$. If the coupling is learned poorly, say $g = 0.5$, normal running leaves a steady error of $\\varepsilon^{+} = 0.5$.'),
      consequences: [
        b('持续的误差可以作为学习信号，把 $g$ 调到让误差消失的值；视觉与运动的耦合因此可以通过经验学会。', 'A lasting error can serve as a learning signal that adjusts $g$ until the error vanishes. Visual and motor coupling can therefore be learned from experience.'),
        b('预期之中的输入几乎不引起向上传的活动，节省了通信和能量。', 'Expected input causes almost no upward activity, which saves communication and energy.'),
      ],
      limitations: [
        b('只有一个线性的预测；真实皮层的预测涉及物体、空间和时间，远比一个比例复杂。', 'There is a single linear prediction. Real cortical predictions involve objects, space and time and are far more complex than one ratio.'),
        b('失配神经元的存在支持误差编码，但不能证明皮层整体按预测编码的方式运行。', 'Mismatch neurons support error coding but do not prove that cortex as a whole works by predictive coding.'),
      ],
    },
  ],
  elsewhere: [
    { title: b('预测编码：高层预测低层，误差向上传', 'Predictive coding: higher levels predict lower ones, errors go up'), to: 'topic:world-models' },
    { title: b('前向模型：预测感觉后果，并用误差修正自身', 'Forward models: predict sensory consequences and correct with the error'), to: 'topic:world-models' },
  ],
  conditions: [
    b('反馈连接普遍存在是确定的；它们是否主要传递预测，还是也传递注意、上下文等其他信号，仍有争议。', 'That feedback connections are widespread is certain. Whether they mainly carry predictions, or also attention, context and other signals, is debated.'),
    b('预测编码的不同版本对误差在哪些神经元、哪一层表示有不同的预测，实验结果并不完全一致。', 'Versions of predictive coding make different predictions about which neurons and layers carry errors, and results do not fully agree.'),
    b('「意外的刺激引起更强的反应」也可以用适应等更简单的机制解释，需要控制实验区分。', 'Stronger responses to surprising stimuli can also be explained by simpler mechanisms such as adaptation, and controlled experiments are needed to tell them apart.'),
  ],
  uses: [
    { to: 'topic:world-models', role: b('皮层按预测与误差来回迭代，可以看作在学习和使用一个关于感觉输入的世界模型。', 'Cortex iterating between prediction and error can be seen as learning and using a world model of its sensory input.') },
    { to: 'topic:visual-recognition', role: b('反馈和循环处理帮助识别被遮挡或难以辨认的物体。', 'Feedback and recurrent processing help recognize occluded or hard-to-recognize objects.') },
    { to: 'topic:motor-control', role: b('运动指令的副本预测动作的感觉后果，预测不符时迅速修正动作。', 'A copy of the motor command predicts the sensory result of the action, and a mismatch quickly corrects the movement.') },
  ],
  refs: ['rao1999', 'friston2010', 'keller2012', 'keller2018', 'bastos2012', 'kar2019', 'kubilius2019', 'lecun2022', 'whittington2017'],
}
