# Brain Dynamics Atlas · 人脑三维动态图谱

浏览器中的 3D 人脑可视化：真实解剖结构 + 脑区功能/输入/输出标注 + 闭环动态模拟（神经群体振荡 + 事件驱动通路信号）+ “一个人的一天”剧本。

**在线体验：<https://laozhongjie.github.io/brain-dynamics-atlas/>**

![过马路时一辆车冲来：恐惧低通路、交感神经与躲闪动作](docs/screenshot.jpg)

> 这是教学/科普用途的示意性模拟，不是经过验证的科研模型。

## 功能

- **真实解剖**：FreeSurfer fsaverage 模板，68 个 Desikan 皮层分区 + 丘脑、基底节、海马、杏仁核、小脑、脑干等；另有 LGN、VTA、蓝斑、视交叉上核等核团标记，以及眼、耳、心脏、肾上腺等身体器官。
- **功能知识库（中英双语）**：点击任意结构，查看它负责什么、输入从哪里来、输出到哪里去（可点击跳转）。
- **查看方式**：旋转、缩放、点击飞到脑区；皮层透明度、左右半球分离、矢状/冠状/水平剖切、解剖/功能系统着色；远看显示脑叶，近看显示脑区标签。
- **闭环动态（混合模型）**
  - 后台：118 节点的时滞耦合 Wilson-Cowan 神经群体模型，耦合来自真实通路、丘脑-皮层环路、胼胝体和局部连接；脑状态决定节律：清醒 α、专注 β、REM θ、NREM 同步 δ 慢波。
  - 前台：62 条真实神经通路（视觉腹/背侧流、听觉、痛觉、嗅味觉、皮质脊髓束、基底节与小脑环路、弓状束、Papez 环路、HPA 轴、奖赏通路……），信号光点逐站传递并刺激沿途节点。
  - 没有外界输入时，内部环路依然自发运行：走神（默认模式网络）、海马回放、做梦。
- **单独查看功能系统**：视觉、听觉、触觉与痛觉、运动、语言、记忆、恐惧与情绪、奖赏、稳态与应激、睡眠与觉醒、注意与决策，共 11 个系统。进入后只保留该系统的结构（其余淡化成灰影），一日剧本暂停，按“输入 → 各站处理 → 输出”分步演示，可单步、重播或自动播放。
- **示意图模式**：一键切换为 2D 分层流程图（感觉器官 → 中继 → 皮层处理 → 决策与控制 → 身体输出，脑干/脊髓画成总线），与 3D 共用同一套模拟，脉冲沿箭头实时流动；支持缩放、平移和双指缩放，也能配合单独查看模式使用。
- **一个人的一天**：17 个事件，从黎明的梦、闹钟、早餐、过马路受惊、开会发言、专注工作、被烫缩手、学习、跑步、见朋友、听音乐，到深睡和 REM。每一步都有讲解，身体面板显示动作、说话、心率、呼吸、神经调质与激素。

## 技术栈

Vite · React · TypeScript · three.js · React Three Fiber · drei · postprocessing · zustand · Vitest；数据管线：Python · MNE · nibabel · scikit-image · trimesh。

## 运行

```bash
npm install
npm run dev      # 开发服务器
npm test         # 单元测试
npm run build    # 生产构建
```

## 大脑模型数据管线

`public/models/brain.glb` 和 `src/data/region_meta.json` 由 `pipeline/build_brain.py` 生成（产物已提交，一般无需重跑）：

```bash
conda env create -f pipeline/environment.yml
conda run -n brain-atlas python pipeline/build_brain.py
npm run compress-model   # meshopt 压缩：6.6 MB → 1.4 MB
```

- 皮层：FreeSurfer `fsaverage` pial 表面，按 Desikan-Killiany 图谱（`aparc.annot`）每半球 34 区拆分。
- 皮层下：`aseg.mgz` 各标签 marching cubes 重建（丘脑、尾状核、壳核、苍白球、伏隔核、海马、杏仁核、腹侧间脑、小脑、脑干）。
- 下丘脑在 aseg 中无独立标签，用位于其解剖位置的椭球近似。
- 坐标：FreeSurfer surface RAS (mm) → three.js `(R, S, -A) × 0.01`。

## 数据许可

模型数据来自 FreeSurfer `fsaverage` 模板（经 MNE-Python 下载），受 [FreeSurfer Software License](https://surfer.nmr.mgh.harvard.edu/fswiki/FreeSurferSoftwareLicense) 约束；如用于商业用途请先核实许可条款。
