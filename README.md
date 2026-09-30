# Brain Dynamics Atlas · 人脑三维动态图谱

浏览器中的 3D 人脑可视化：真实解剖结构 + 脑区功能/输入/输出标注 + 闭环动态模拟（神经群体振荡 + 事件驱动通路信号）+ “一个人的一天”剧本。

> 这是教学/科普用途的示意性模拟，不是经过验证的科研模型。

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
```

- 皮层：FreeSurfer `fsaverage` pial 表面，按 Desikan-Killiany 图谱（`aparc.annot`）每半球 34 区拆分。
- 皮层下：`aseg.mgz` 各标签 marching cubes 重建（丘脑、尾状核、壳核、苍白球、伏隔核、海马、杏仁核、腹侧间脑、小脑、脑干）。
- 下丘脑在 aseg 中无独立标签，用位于其解剖位置的椭球近似。
- 坐标：FreeSurfer surface RAS (mm) → three.js `(R, S, -A) × 0.01`。

## 数据许可

模型数据来自 FreeSurfer `fsaverage` 模板（经 MNE-Python 下载），受 [FreeSurfer Software License](https://surfer.nmr.mgh.harvard.edu/fswiki/FreeSurferSoftwareLicense) 约束；如用于商业用途请先核实许可条款。
