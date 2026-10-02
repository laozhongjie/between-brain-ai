import type { Bi } from '../../../data/types'
import type { TopicContent } from '../../types'

const b = (zh: string, en: string): Bi => ({ zh, en })
const t = String.raw

/** F01 Visual recognition and scene understanding: the ventral and dorsal streams vs CNNs and ViTs. */
export const VISUAL_RECOGNITION: TopicContent = {
  thesis: {
    biological: b(
      '图像出现约 100 毫秒后，腹侧通路的高级区域就已携带物体类别的信息。从 V1 到下颞叶，特征逐级变复杂，也越来越不受位置和大小影响；背侧通路处理位置和运动，为眼动和抓取服务。识别还依赖反馈和眼动，在噪声、遮挡和风格变化下依然稳健。',
      'About 100 ms after an image appears, high areas of the ventral stream already carry its object category. From V1 to inferotemporal cortex, features grow more complex and less tied to position and size. The dorsal stream handles location and motion for eye movements and grasping. Recognition also uses feedback and eye movements and stays stable under noise, occlusion and changes of style.'),
    computational: b(
      'CNN（卷积神经网络）用层层卷积从局部边缘提取到整个物体；ViT（视觉 Transformer）把图像切成小块，用自注意力在全图范围整合。它们在标准基准上的分类准确率已与人相当，深层 CNN 的中间层还能预测猕猴视觉皮层的反应。但标准模型偏向纹理，会被人眼看不出的扰动骗过，也不会主动移动视线。',
      'A CNN (convolutional neural network) stacks convolutions that build from local edges to whole objects. A ViT (vision transformer) cuts the image into patches and integrates them across the image with self-attention. Their classification accuracy on standard benchmarks matches people, and the middle layers of deep CNNs predict responses in macaque visual cortex. But standard models lean on texture, fail under perturbations people cannot see and never move their gaze.'),
    gap: b(
      '两者都是分层的特征提取，深层网络是目前预测腹侧通路反应最好的模型之一。差距在于怎样应对新条件：大脑用形状、反馈和眼动，模型主要靠一次前馈和更多训练数据。',
      'Both extract features layer by layer, and deep networks are among the best current models of ventral stream responses. The gap lies in handling new conditions. The brain uses shape, feedback and eye movements, while models rely on one feedforward pass and more training data.'),
  },
  short: { biological: b('视觉皮层', 'Visual cortex'), computational: b('视觉模型', 'Vision models') },
  kinds: ['behavior', 'representation', 'algorithm'],
  evidence: 'established',
  asOf: b('计算侧描述截至 2026 年 10 月的主流图像识别模型；具体评测结果按发表年份注明。', 'The computational column describes mainstream image recognition models as of October 2026. Benchmark results are dated by publication year.'),
  capabilities: [
    {
      lead: 'even',
      dimension: b('快速识别', 'Rapid recognition'),
      brain: b('图像只闪现几十毫秒，人也能判断其中有没有动物；猕猴下颞叶约 100 毫秒就能读出物体类别。', 'People can tell whether a briefly flashed image contains an animal. In macaques, inferotemporal cortex carries the object category about 100 ms after onset.'),
      ai: b('一次前向计算在图形处理器上只需几毫秒；在标准基准上的分类准确率已与人相当。', 'One forward pass takes a few milliseconds on a graphics processor. Classification accuracy on standard benchmarks matches people.'),
      gap: b('在「看一眼说出类别」这种任务上两者相当，但模型与人在哪些图片上出错并不一致。', 'Both do well at naming the category at a glance, but models and people fail on different images.'),
    },
    {
      lead: 'bio',
      dimension: b('失真与扰动', 'Distortion and perturbation'),
      brain: b('噪声、模糊、风格变化下仍能识别；肉眼看不出的微小改动不会改变判断。', 'Recognition survives noise, blur and changes of style. Changes too small to see never alter the judgment.'),
      ai: b('2021 年的评测中，用超大规模数据训练的模型在多数失真上已接近或超过人类；但人眼看不出的对抗扰动仍能改变标准模型的判断。', 'In 2021 tests, models trained on very large datasets matched or beat people on most distortions. Adversarial perturbations that people cannot see still change the output of standard models.'),
      gap: b('更多数据缩小了失真上的差距，对抗扰动带来的脆弱在标准模型中仍然存在。', 'More data narrowed the gap on distortions. Vulnerability to adversarial perturbations remains in standard models.'),
    },
    {
      lead: 'bio',
      dimension: b('依据形状', 'Reliance on shape'),
      brain: b('形状和纹理矛盾时（例如带大象皮纹理的猫），人绝大多数按形状判断。', 'When shape and texture conflict, such as a cat with elephant skin texture, people judge by shape nearly every time.'),
      ai: b('只用 ImageNet 训练的 CNN 多数按纹理判断；ViT 和大数据训练的模型更偏向形状，但仍不及人。', 'CNNs trained only on ImageNet mostly judge by texture. ViTs and models trained on larger data lean more on shape but still less than people.'),
      gap: b('偏重纹理是模型在新风格图像上出错的原因之一；增加形状偏好能提高稳健性。', 'Texture reliance is one reason models fail on images in a new style. Raising shape bias improves robustness.'),
    },
    {
      lead: 'bio',
      dimension: b('场景与空间关系', 'Scenes and spatial relations'),
      brain: b('一瞥就能抓住场景大意，并判断物体之间的位置、遮挡和接触关系。', 'One glance gives the gist of a scene and the positions, occlusions and contacts between objects.'),
      ai: b('2024 年的测试中，多个视觉语言模型在判断两个圆是否重叠、数线条交点这类简单几何任务上表现不佳。', 'In 2024 tests, several vision-language models did poorly on simple geometry, such as whether two circles overlap or how many times lines cross.'),
      gap: b('模型擅长说出「有什么」，对「在哪里、怎样相互关联」的精确判断较弱。', 'Models are good at naming what is there and weaker at exactly where things are and how they relate.'),
    },
    {
      lead: 'comp',
      dimension: b('广度与并行', 'Breadth and parallelism'),
      brain: b('据估计，成人能区分的物体类别有数万种；但每次注视只能看清视野中央一小块，看全一个场景要多次移动视线。', 'Adults are estimated to tell apart tens of thousands of object categories. But each fixation sees only a small central patch sharply, so a scene takes several eye movements.'),
      ai: b('一次计算就处理整张图像，可以同时检测数百个物体；CLIP 这类模型能按任意文字描述的类别分类。', 'One pass processes the whole image and can detect hundreds of objects at once. Models such as CLIP classify by any category written in text.'),
      gap: b('模型在吞吐量和类别广度上占优，不受注视范围限制。', 'Models lead in throughput and category breadth and are not limited to one point of gaze.'),
    },
  ],
  archSteps: {
    biological: [
      {
        title: b('视网膜与 LGN', 'Retina and LGN'),
        points: [
          b('光感受器把光转成电信号，视网膜神经节细胞对一小块区域的明暗对比放电。', 'Photoreceptors turn light into electrical signals, and retinal ganglion cells fire for light contrast in a small patch.'),
          b('这些电脉冲经视神经送到丘脑的外侧膝状体（LGN），再转送到初级视觉皮层 V1。', 'These electrical pulses travel along the optic nerve to the lateral geniculate nucleus (LGN) of the thalamus, which relays them to primary visual cortex, V1.'),
        ],
      },
      {
        title: b('V1：边缘与方向', 'V1: edges and orientation'),
        points: [
          b('每个 V1 神经元只看视野中很小的一块（感受野），只对特定方向的边缘或线条放电。', 'Each V1 neuron watches only a tiny patch of the visual field, its receptive field, and fires only for edges or lines at one orientation.'),
          b('相邻神经元覆盖相邻位置和各个方向，整片 V1 相当于一组覆盖全视野的边缘检测器。', 'Neighboring neurons cover neighboring places and all orientations, so V1 works as a bank of edge detectors over the whole field.'),
          b('V1 的输出分两路：送往 V2 和 V4（腹侧通路），以及送往 MT（背侧通路）。', 'V1 output splits two ways: to V2 and V4 in the ventral stream, and to MT in the dorsal stream.'),
        ],
      },
      {
        title: b('V2 与 V4：组合成形状', 'V2 and V4: combining into shapes'),
        points: [
          b('V2 和 V4 的神经元汇总多个 V1 神经元的输入，对角、曲线、纹理和简单形状放电。', 'Neurons in V2 and V4 pool many V1 inputs and fire for corners, curves, textures and simple shapes.'),
          b('感受野逐级变大，对位置的小变化越来越不敏感。结果送往下颞叶。', 'Receptive fields grow at each stage and become less sensitive to small shifts. The result goes to inferotemporal cortex.'),
        ],
      },
      {
        title: b('下颞叶（IT）：物体与类别', 'Inferotemporal cortex (IT): objects and categories'),
        points: [
          b('IT 神经元对整个物体或面孔放电，物体换了位置、大小或角度，放电仍大致相同。', 'IT neurons fire for whole objects or faces, and their firing stays roughly the same when the object moves, resizes or turns.'),
          b('一群 IT 神经元的放电频率构成一个数字向量，同类物体的向量彼此靠近，用一条直线（线性读出）就能分开不同类别。', 'The firing rates of an IT population form a vector of numbers. Vectors of one category lie close together, so a straight line, a linear readout, separates categories.'),
          b('类别信息送往前额叶和记忆系统，用于命名、决策和记忆。', 'The category information goes to prefrontal cortex and memory systems for naming, decisions and memory.'),
        ],
      },
      {
        title: b('背侧通路：位置与动作', 'Dorsal stream: location and action'),
        points: [
          b('MT 神经元对特定方向的运动放电，结果送往顶叶。', 'MT neurons fire for motion in particular directions and pass the result to parietal cortex.'),
          b('顶叶把物体位置换算成相对于眼睛和手的坐标，用来引导眼动和抓取。', 'Parietal cortex converts object location into coordinates relative to the eyes and hand, used to guide eye movements and grasping.'),
        ],
      },
      {
        title: b('反馈与眼动', 'Feedback and eye movements'),
        points: [
          b('高级区域把信号送回 V4 和 V1，增强与当前任务和预期相关的特征。', 'High areas send signals back to V4 and V1 that enhance features relevant to the current task and expectation.'),
          b('背侧通路参与控制扫视，每秒约 3 次把视野中央对准新的位置，视网膜输入随之整个更新。', 'The dorsal stream helps control saccades, about three per second, that point the center of gaze at new places. The retinal input then changes completely.'),
        ],
      },
    ],
    computational: [
      {
        title: b('像素输入', 'Pixel input'),
        points: [
          b('图像是一个数字数组，例如 $224 \\times 224$ 个像素，每个像素有红、绿、蓝三个亮度值。', 'An image is an array of numbers, for example $224 \\times 224$ pixels, each with red, green and blue values.'),
          b('整张图一次性送进网络，每个位置的分辨率相同。', 'The whole image enters the network at once, with the same resolution everywhere.'),
        ],
      },
      {
        title: b('卷积层：局部特征', 'Convolution: local features'),
        points: [
          b('一个小卷积核（例如 $3 \\times 3$ 像素）在整张图上滑动，在每个位置计算加权和，得到一张特征图。', 'A small kernel, for example $3 \\times 3$ pixels, slides over the image and computes a weighted sum at each position, giving a feature map.'),
          b('同一个卷积核在所有位置使用同一组权重（权重共享），所以同一特征在哪里出现都能被检测到。', 'The kernel uses the same weights at every position, called weight sharing, so a feature is detected wherever it appears.'),
          b('训练后，第一层卷积核多数变成对特定方向边缘和颜色敏感的滤波器。', 'After training, most first-layer kernels become filters for edges at particular orientations and for colors.'),
        ],
      },
      {
        title: b('池化与深层卷积', 'Pooling and deeper convolution'),
        points: [
          b('池化或步长下采样把特征图缩小，下一层的每个单元因此覆盖更大的图像区域。', 'Pooling or strided downsampling shrinks the feature map, so each unit in the next layer covers a larger image region.'),
          b('经过几十层后，特征从边缘变成部件，再变成整个物体。', 'After tens of layers, features progress from edges to parts to whole objects.'),
        ],
      },
      {
        title: b('ViT：图块与自注意力', 'ViT: patches and self-attention'),
        points: [
          b('ViT 把图像切成 $16 \\times 16$ 像素的图块，每块压成一个向量（词元），并加上表示位置的编码。', 'A ViT cuts the image into $16 \\times 16$ pixel patches, turns each into a vector, a token, and adds a code for its position.'),
          b('每一层自注意力让每个图块与所有图块比较，按相似度汇集信息，所以从第一层起就能整合全图。', 'Each self-attention layer compares every patch with every other patch and gathers information by similarity, so the whole image is integrated from the first layer.'),
        ],
      },
      {
        title: b('特征向量与分类头', 'Feature vector and classifier'),
        points: [
          b('最后一层的输出汇总成一个特征向量，相当于这张图的「概要」。', 'The last layer output is pooled into one feature vector, a summary of the image.'),
          b('线性层加 softmax 把特征向量变成各类别的概率，概率最高的类别就是答案。', 'A linear layer with softmax turns the feature vector into class probabilities, and the most probable class is the answer.'),
        ],
      },
      {
        title: b('缺失的两步（虚线框）', 'The two missing steps (dashed boxes)'),
        points: [
          b('没有眼动：网络不会决定下一步看哪里，图像只输入一次。', 'No eye movements: the network never decides where to look next, and the image enters once.'),
          b('没有自上而下的反馈：后层的结果不会送回前层修正特征。', 'No top-down feedback: later layers never send results back to correct earlier features.'),
        ],
      },
    ],
  },
  archNotes: {
    biological: [
      b('视网膜上有上亿个光感受器，但视神经只有约 100 万根神经纤维，所以信息在视网膜里已被大幅压缩。只有视野中央约 2 度（中央凹）看得清楚，周边分辨率很低。', 'The retina has over a hundred million photoreceptors but the optic nerve only about a million fibers, so the retina already compresses heavily. Only the central 2 degrees or so, the fovea, are sharp, and resolution falls off in the periphery.'),
      b('感受野：一个神经元只对视野中某一块区域里的刺激有反应，这块区域就是它的感受野。从 V1 到 IT，感受野从不到 1 度扩大到覆盖大半个视野。', 'Receptive field: a neuron responds only to stimuli in one region of the visual field, its receptive field. From V1 to IT, receptive fields grow from under a degree to most of the field.'),
      b('Hubel 和 Wiesel 在猫的 V1 中发现两类细胞：简单细胞只在边缘处于特定位置时放电，复杂细胞在感受野内任意位置都放电。后者汇总了前者，是「位置容忍」逐级累积的第一步。', 'Hubel and Wiesel found two cell types in cat V1. Simple cells fire only when an edge sits at one position. Complex cells fire anywhere in their receptive field by pooling simple cells, the first step toward tolerance to position.'),
      b('「腹侧管识别、背侧管动作」是一种简化：两条通路之间有大量连接，背侧也携带形状信息。', 'Ventral for recognition and dorsal for action is a simplification. The two streams are richly connected, and the dorsal stream carries shape information too.'),
      b('IT 中有专门对面孔、身体、地点放电的区域。猕猴实验表明，用几百个 IT 记录位点在约 100 毫秒内的放电，线性分类器就能较准确地读出物体类别和身份。', 'IT has regions that fire for faces, bodies and places. In macaques, the firing of a few hundred IT recording sites within about 100 ms lets a linear classifier read out object category and identity well.'),
      b('反馈连接的数量与前馈连接相当，但它在识别中的具体作用仍在研究中。', 'Feedback connections are about as numerous as feedforward ones, but their exact role in recognition is still being studied.'),
      b('对遮挡、杂乱等难识别的图像，IT 中的类别信息比普通图像出现得更晚，被认为依赖区域内的循环连接和高级区域的反馈；只有前馈的深层网络对这类图像表现最差。', 'For hard images, such as occluded or cluttered ones, category information appears in IT later than for ordinary images and is thought to depend on recurrent connections and feedback from higher areas. Purely feedforward deep networks do worst on these images.'),
      b('「V1 简单细胞就是 Gabor 滤波器」是一种简化：Gabor 函数能很好地拟合简单细胞的感受野，但真实细胞还有对比度归一化和感受野外的调节等非线性。', 'Calling a V1 simple cell a Gabor filter is a simplification. A Gabor function fits simple cell receptive fields well. Real cells add nonlinear effects such as contrast normalization and modulation from outside the receptive field.'),
    ],
    computational: [
      b('训练：用反向传播在大量标注图像上调整全部权重，例如 ImageNet 的约 128 万张训练图像、1000 个类别。CLIP 这类模型改用数亿对「图像与文字说明」训练。', 'Training adjusts every weight by backpropagation on many labeled images, for example the roughly 1.28 million training images in 1,000 ImageNet classes. Models such as CLIP train instead on hundreds of millions of image and caption pairs.'),
      b('ReLU 是最常用的激活函数：输入为负时输出 $0$，为正时原样输出，作用类似神经元的放电阈值。', 'ReLU is the most common activation function. It outputs $0$ for negative input and passes positive input unchanged, much like a firing threshold.'),
      b('权重共享在生物中没有直接对应：每个神经元有自己的突触，相邻神经元相似的选择性要通过学习和发育形成。', 'Weight sharing has no direct biological counterpart. Each neuron has its own synapses, and similar tuning in neighbors must come from learning and development.'),
      b('ViT 内置的「局部」假设比 CNN 少，只用 ImageNet 训练时不如 CNN；在数亿张图像上预训练后才超过 CNN。实际系统常把两者结合。', 'A ViT builds in fewer locality assumptions than a CNN and does worse when trained on ImageNet alone. It beats CNNs only after pretraining on hundreds of millions of images. Real systems often combine the two.'),
      b('高分辨率图像通常先缩小或切成多块再输入，这是在计算量上的折中，与眼动的「选择看哪里」不同。', 'High-resolution images are usually shrunk or tiled before input. This trades off computation and differs from choosing where to look.'),
      b('网络对每张图按顺序把所有层算一遍，难图和易图的计算量相同。加入循环连接的模型（如 CORnet）和按需增加计算的模型仍主要是研究原型。', 'The network runs every layer once in order for each image, with the same computation for hard and easy images. Models with recurrent connections, such as CORnet, and models that add computation on demand are still mostly research prototypes.'),
      b('深层 CNN 只能解释腹侧通路反应的一部分；逐张图像比较时，它们出错的图像与猴子和人并不一致。', 'Deep CNNs explain only part of ventral stream responses, and compared image by image, the images they get wrong differ from the ones monkeys and people get wrong.'),
    ],
  },
  bioMath: [
    {
      title: b('V1 简单细胞：Gabor 滤波器加整流', 'V1 simple cell: a Gabor filter plus rectification'),
      tex: t`r = \Big[\sum_{x,y} G(x,y)\, I(x,y)\Big]_+ ,\qquad G(x,y) = \exp\!\Big(-\frac{x'^2 + \gamma^2 y'^2}{2\sigma^2}\Big) \cos\!\Big(\frac{2\pi x'}{\lambda} + \phi\Big)`,
      symbols: [
        { tex: t`I(x,y)`, meaning: b('感受野内位置 $(x,y)$ 的亮度', 'brightness at position $(x,y)$ in the receptive field') },
        { tex: t`G(x,y)`, meaning: b('感受野的权重分布：正值处变亮会增加放电，负值处变亮会抑制放电', 'the receptive field weights: light on positive regions raises firing, light on negative regions lowers it') },
        { tex: t`r`, meaning: b('神经元的放电频率', 'the firing rate of the neuron') },
        { tex: t`[\,\cdot\,]_+`, meaning: b('整流：负值记为 $0$，因为放电频率不能为负', 'rectification: negative values become $0$, since firing rates cannot be negative') },
        { tex: t`x',\,y'`, meaning: b('按偏好方向 $\\theta$ 旋转后的坐标', 'coordinates rotated to the preferred orientation $\\theta$') },
        { tex: t`\lambda,\,\phi`, meaning: b('条纹的间距和相位，决定细胞偏好多粗的线条、边缘在哪一侧', 'stripe spacing and phase, which set the preferred line width and edge side') },
        { tex: t`\sigma,\,\gamma`, meaning: b('感受野的大小和长宽比', 'size and aspect ratio of the receptive field') },
      ],
      steps: [
        b('$G$ 是一个被钟形包络限制范围的余弦条纹：只在感受野中央附近有权重，权重沿偏好方向正负交替。', '$G$ is a cosine stripe pattern limited by a bell-shaped envelope. The weights exist only near the center and alternate in sign across the preferred orientation.'),
        b('把图像亮度与权重逐点相乘再相加，得到这块图像与「模板」的吻合程度。', 'Multiply brightness by weight point by point and add up. The sum is how well the image patch matches the template.'),
        b('吻合越好放电越多；方向不对或明暗相反时和为负，整流后不放电。', 'A better match gives more firing. With the wrong orientation or reversed contrast the sum is negative, and the cell stays silent after rectification.'),
      ],
      example: b(
        '把感受野简化为一行四个权重 $(-1, -1, +1, +1)$。左暗右亮的边缘 $(0, 0, 1, 1)$ 得到 $2$，细胞放电；左亮右暗 $(1, 1, 0, 0)$ 得到 $-2$，整流后为 $0$；均匀亮 $(1, 1, 1, 1)$ 得到 $0$，同样不放电。',
        'Reduce the receptive field to four weights in a row, $(-1, -1, +1, +1)$. A dark to light edge $(0, 0, 1, 1)$ gives $2$, so the cell fires. A light to dark edge $(1, 1, 0, 0)$ gives $-2$, which becomes $0$. Uniform light $(1, 1, 1, 1)$ gives $0$, so the cell is silent too.'),
      consequences: [
        b('每个简单细胞是一个特定方向、特定粗细的边缘检测器；覆盖各方向和位置的一群细胞，相当于对图像做了一组滤波。', 'Each simple cell is an edge detector for one orientation and width. A population covering all orientations and positions filters the image with a whole bank of filters.'),
        b('训练好的 CNN 第一层滤波器也大多呈现这种形状，两者在这一层的表征很接近。', 'The first-layer filters of a trained CNN mostly take this shape too, so the two representations are close at this stage.'),
      ],
      limitations: [
        b('真实细胞的反应会被周围的整体对比度归一化（见[归一化](card:normalization)），模型是纯线性加整流。', 'Real responses are normalized by surrounding contrast (see [normalization](card:normalization)). The model is purely linear plus rectification.'),
        b('感受野外的刺激也会调节反应，模型只看感受野之内。', 'Stimuli outside the receptive field also modulate the response, while the model sees only inside it.'),
        b('复杂细胞对位置不敏感，需要另外的汇总模型描述。', 'Complex cells are insensitive to position and need a separate pooling model.'),
      ],
    },
    {
      title: b('IT 群体的线性读出：类别在高级区域变得「可分」', 'Linear readout of IT: categories become separable in high areas'),
      tex: t`y = \mathbf{w}^{\top}\mathbf{r} + b,\qquad \hat{c} = \begin{cases} A, & y > 0 \\ B, & y \le 0 \end{cases}`,
      symbols: [
        { tex: t`\mathbf{r}`, meaning: b('一群 IT 神经元在一段时间窗内的放电频率组成的向量', 'the vector of firing rates of an IT population in a time window') },
        { tex: t`\mathbf{w}`, meaning: b('读出权重，每个神经元一个', 'readout weights, one per neuron') },
        { tex: t`b`, meaning: b('偏置，决定分界线的位置', 'bias, which sets where the boundary lies') },
        { tex: t`y`, meaning: b('加权和，正负决定判为哪一类', 'the weighted sum, whose sign decides the class') },
        { tex: t`\hat{c}`, meaning: b('读出的类别：$A$ 或 $B$', 'the class read out: $A$ or $B$') },
      ],
      steps: [
        b('把每个 IT 神经元的放电频率乘上各自的权重，再加起来。', 'Multiply each IT neuron firing rate by its weight and add up.'),
        b('加权和大于 $0$ 判为 $A$ 类，否则判为 $B$ 类。几何上，这是在神经元活动空间中画一条直线（高维中是一个平面）把两类分开。', 'A sum above $0$ means class $A$, otherwise class $B$. Geometrically this draws a straight line, a plane in high dimensions, through the space of activity.'),
        b('权重由实验者用一部分图像训练得到，再用没见过的图像检验。', 'The experimenter fits the weights on some images and tests on images not seen before.'),
      ],
      example: b(
        '两个 IT 神经元：面孔细胞看到面孔时放电 40 次每秒、看到汽车时 5 次；汽车细胞正好相反。取 $\\mathbf{w} = (1, -1)$、$b = 0$。面孔得到 $40 - 5 = 35 > 0$，判为面孔；汽车得到 $5 - 40 = -35$，判为汽车。',
        'Two IT neurons. A face cell fires 40 times per second for faces and 5 for cars, and a car cell does the opposite. Take $\\mathbf{w} = (1, -1)$ and $b = 0$. A face gives $40 - 5 = 35 > 0$ and is called a face. A car gives $5 - 40 = -35$ and is called a car.'),
      consequences: [
        b('在 V1 中，同一物体换个位置或角度，活动模式差别很大，不同类别交织在一起，一条直线分不开；到了 IT，类别变得线性可分。这一过程被称为「解缠」。', 'In V1, one object in a new position or pose gives a very different pattern, and categories are tangled so no straight line separates them. In IT they become linearly separable. This process is called untangling.'),
        b('深层网络的后几层也有同样的性质，这是比较两者表征的常用方法。', 'The last layers of deep networks share this property, a common way to compare the two representations.'),
      ],
      limitations: [
        b('线性读出是实验者的分析工具，不说明大脑下游真的这样读取。', 'Linear readout is an analysis tool of the experimenter. It does not show that downstream areas read IT this way.'),
        b('记录到的只是几百个位点，IT 中有数以百万计的神经元。', 'Recordings cover a few hundred sites, while IT has millions of neurons.'),
      ],
    },
  ],
  compMath: [
    {
      title: b('卷积层：同一个局部模板扫过整张图', 'Convolution: one local template swept over the image'),
      tex: t`y_k(i,j) = \max\Big(0,\; \sum_{c}\sum_{u,v} W_{k,c}(u,v)\; x_c(i+u,\, j+v) + b_k\Big)`,
      symbols: [
        { tex: t`x_c(i,j)`, meaning: b('输入第 $c$ 个通道在位置 $(i,j)$ 的值，第一层的通道就是红、绿、蓝', 'value of input channel $c$ at $(i,j)$; in the first layer the channels are red, green and blue') },
        { tex: t`W_{k,c}(u,v)`, meaning: b('第 $k$ 个卷积核的权重，$(u,v)$ 是核内的相对位置', 'weights of kernel $k$, with $(u,v)$ the offset inside the kernel') },
        { tex: t`b_k`, meaning: b('第 $k$ 个卷积核的偏置', 'bias of kernel $k$') },
        { tex: t`y_k(i,j)`, meaning: b('输出特征图 $k$ 在位置 $(i,j)$ 的值', 'value of output feature map $k$ at $(i,j)$') },
        { tex: t`\max(0,\cdot)`, meaning: b('ReLU：负值变为 $0$', 'ReLU: negative values become $0$') },
      ],
      steps: [
        b('把卷积核放在位置 $(i,j)$，与下面一小块输入逐点相乘，所有通道的结果相加，再加偏置。', 'Place the kernel at $(i,j)$, multiply it point by point with the input patch under it, add across all channels and add the bias.'),
        b('经过 ReLU 去掉负值，得到这个位置的输出。', 'Remove negative values with ReLU to get the output at that position.'),
        b('把卷积核移到下一个位置重复。所有位置用同一组 $W$，所以同一个特征在哪里都能被检出。', 'Move the kernel to the next position and repeat. Every position uses the same $W$, so a feature is found wherever it is.'),
      ],
      example: b(
        '与左边 V1 的例子相同：一行权重 $(-1, -1, +1, +1)$ 扫过一行亮度 $(0, 0, 1, 1, 1, 1)$。在第 1 个位置得到 $2$，检测到边缘；在第 3 个位置 $(1, 1, 1, 1)$ 得到 $0$，没有边缘。',
        'As in the V1 example: the weights $(-1, -1, +1, +1)$ slide along the row $(0, 0, 1, 1, 1, 1)$. At position 1 the result is $2$, an edge. At position 3, $(1, 1, 1, 1)$ gives $0$, no edge.'),
      consequences: [
        b('卷积层的计算与简单细胞模型形式相同：加权求和再整流。', 'A convolution layer computes the same form as the simple cell model: a weighted sum, then rectification.'),
        b('权重共享使特征检测与位置无关，大大减少了需要学习的参数。', 'Weight sharing makes detection independent of position and greatly reduces the parameters to learn.'),
      ],
      limitations: [
        b('所有位置的分辨率和计算量相同，不像视网膜那样中央精细、周边粗糙。', 'Every position has the same resolution and computation, unlike the retina with its sharp center and coarse periphery.'),
        b('信息只从前往后流动，没有循环和反馈。', 'Information flows only forward, with no recurrence or feedback.'),
      ],
    },
    {
      title: b('ViT 自注意力：每个图块与所有图块比较', 'ViT self-attention: every patch compared with every patch'),
      tex: t`\mathbf{z}_i' = \sum_{j=1}^{n} \operatorname{softmax}_j\!\Big(\frac{\mathbf{q}_i \cdot \mathbf{k}_j}{\sqrt{d}}\Big)\, \mathbf{v}_j,\qquad \mathbf{q}_i = W_Q \mathbf{z}_i,\;\; \mathbf{k}_j = W_K \mathbf{z}_j,\;\; \mathbf{v}_j = W_V \mathbf{z}_j`,
      symbols: [
        { tex: t`\mathbf{z}_i`, meaning: b('第 $i$ 个图块的向量', 'the vector of patch $i$') },
        { tex: t`n`, meaning: b('图块数，$224 \\times 224$ 的图像切成 $16 \\times 16$ 的块时为 196', 'number of patches, 196 for a $224 \\times 224$ image in $16 \\times 16$ patches') },
        { tex: t`\mathbf{q}_i,\,\mathbf{k}_j,\,\mathbf{v}_j`, meaning: b('查询、键和值：同一个图块向量乘上三个学到的矩阵', 'query, key and value: one patch vector multiplied by three learned matrices') },
        { tex: t`d`, meaning: b('向量的维度；除以 $\\sqrt{d}$ 防止点积过大', 'vector dimension; dividing by $\\sqrt{d}$ keeps dot products from growing too large') },
        { tex: t`\operatorname{softmax}_j`, meaning: b('把图块 $i$ 对所有 $j$ 的相似度变成总和为 $1$ 的权重', 'turns the similarities of patch $i$ to all $j$ into weights that sum to $1$') },
        { tex: t`\mathbf{z}_i'`, meaning: b('图块 $i$ 更新后的向量', 'the updated vector of patch $i$') },
      ],
      steps: [
        b('每个图块算出自己的查询、键和值。', 'Each patch computes its query, key and value.'),
        b('图块 $i$ 的查询与每个图块的键做点积，得到它与各图块的相关程度。', 'The query of patch $i$ takes a dot product with every key, giving how related it is to each patch.'),
        b('softmax 把相关程度变成权重，再把所有图块的值按权重相加，得到图块 $i$ 的新向量。', 'Softmax turns these into weights, and the values of all patches are added by weight to give the new vector of patch $i$.'),
      ],
      example: b(
        '一张猫的照片里，图块「猫耳朵」的查询与「猫眼睛」「猫胡须」图块的键相似度高，与「背景墙」的低。更新后，「猫耳朵」的向量主要混入了脸部其他部位的信息，即使它们在图上相隔很远。',
        'In a photo of a cat, the query of the ear patch is similar to the keys of the eye and whisker patches and not to the wall behind. After the update, the ear vector mainly mixes in information from the rest of the face, even from patches far away in the image.'),
      consequences: [
        b('第一层就能把相隔很远的图块联系起来，不必像 CNN 那样靠层层扩大感受野。', 'Distant patches connect from the first layer, without waiting for receptive fields to grow layer by layer.'),
        b('因为缺少「局部」这一内置假设，ViT 需要更多训练数据才能学到 CNN 天生具备的局部结构。', 'Lacking a built-in locality assumption, a ViT needs more training data to learn the local structure a CNN starts with.'),
      ],
      limitations: [
        b('这里的「注意力」是一种加权汇总的计算，与认知层面的注意不是同一回事。', 'Attention here is a computation of weighted pooling, not the same as attention in the cognitive sense.'),
        b('计算量随图块数的平方增长，图像越大代价越高；图块是固定网格，不是有选择的注视点。', 'Computation grows with the square of the number of patches, so large images are costly. Patches form a fixed grid, not chosen points of gaze.'),
      ],
    },
  ],
  limits: {
    biological: [
      {
        title: b('只有中央看得清', 'Only the center is sharp'),
        text: b('只有视野中央约 2 度分辨率高，看全一个场景要靠多次眼动，眼动之间的变化可能被忽略（变化盲视）。', 'Only the central 2 degrees or so are sharp, so seeing a whole scene takes many eye movements, and changes between them can go unnoticed, called change blindness.'),
        steps: [1, 6],
      },
      {
        title: b('会被错觉误导', 'Fooled by illusions'),
        text: b('周围的对比和情境会改变知觉：同样的灰色在不同背景下看起来深浅不同，同样长的线段看起来长短不同。', 'Surrounding contrast and context change perception. The same gray looks lighter or darker on different backgrounds, and equal lines look unequal.'),
        steps: [2, 3],
      },
      {
        title: b('同时处理的物体有限', 'Few objects at a time'),
        text: b('快速连续呈现的图像中，后一个目标常被漏掉；同时能细致辨认的物体只有少数几个。', 'In rapid sequences of images a second target is often missed, and only a few objects can be identified in detail at once.'),
        steps: [6],
      },
    ],
    computational: [
      {
        title: b('会被对抗扰动骗过', 'Fooled by adversarial noise'),
        text: b('对图像加上人眼看不出的特定扰动，标准模型就可能把熊猫判成长臂猿；扰动沿权重最敏感的方向累积。', 'Adding a specific perturbation people cannot see can make a standard model call a panda a gibbon. The perturbation adds up along the directions the weights are most sensitive to.'),
        steps: [2, 3],
      },
      {
        title: b('偏重纹理', 'Leaning on texture'),
        text: b('只用 ImageNet 训练的 CNN 多按纹理判断，遇到素描、卡通等新风格时准确率明显下降。', 'CNNs trained only on ImageNet judge mostly by texture, and accuracy drops clearly on new styles such as sketches and cartoons.'),
        steps: [3],
      },
      {
        title: b('不会主动看', 'No active looking'),
        text: b('没有眼动和反馈，难识别的图像得不到额外的处理，也不能根据第一眼的结果去看关键位置。', 'Without eye movements or feedback, hard images get no extra processing, and the model cannot use a first look to inspect key places.'),
        steps: [6],
      },
      {
        title: b('空间关系判断较弱', 'Weak on spatial relations'),
        text: b('2024 年的测试中，多个视觉语言模型在判断两个圆是否重叠、数线条交点等简单几何任务上表现不佳。', 'In 2024 tests, several vision-language models did poorly on simple geometry such as whether two circles overlap or how many times lines cross.'),
      },
    ],
    misreadings: [
      {
        claim: b('模型在基准上超过人类，视觉已被解决', 'Models beat people on benchmarks, so vision is solved'),
        fact: b('基准分数只覆盖特定类别、特定拍摄条件下的单张图像分类；稳健性、空间关系和主动观察仍有明显差距。', 'Benchmark scores cover single-image classification of specific categories under specific conditions. Robustness, spatial relations and active looking still show clear gaps.'),
        source: b('例如 2015 年一篇论文的标题宣称在 ImageNet 分类上「超过人类水平」。', 'For example, the title of a 2015 paper announced “surpassing human-level performance on ImageNet classification”.'),
      },
    ],
  },
  refs: {
    neuro: ['hubel1962', 'jones1987', 'goodale1992', 'thorpe1996', 'hung2005', 'dicarlo2012', 'kar2019', 'biederman1987'],
    models: ['yamins2014', 'rajalingham2018', 'kubilius2019', 'krizhevsky2017'],
    ai: ['dosovitskiy2020', 'szegedy2013', 'goodfellow2014', 'geirhos2018', 'geirhos2021', 'radford2021', 'rahmanzadehgervi2024'],
  },
}
