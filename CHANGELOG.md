# 更新日志 (CHANGELOG)

本项目遵循 [语义化版本规范 (SemVer)](https://semver.org/lang/zh-CN/)。

---

## [1.2.0] - 2026-08-18

### 🚀 核心架构与质感重大升级
- **`Watermark`（防篡改安全水印）架构级加固**：
  - 由 `SecurityWatermark` 统一更名为标准的 `Watermark`。
  - **脱离 React Virtual DOM 控制**：水印层改由原生 DOM（Direct DOM Injection）独立动态注入与挂载，彻底解决用户在浏览器 DevTools 中按 `Delete` 删除水印节点时引发 React `removeChild` 运行时崩溃（导致整页白屏只剩 `<div id="root"></div>`）的致命问题。
  - **ComputedStyle 最终计算样式自检**：重构属性校验逻辑，即便在 DevTools Styles 面板中取消勾选 `background-image` 或修改 `style` / `class`，均可在 0ms ~ 毫秒级瞬间自动原地自愈复活。
  - **心跳守护巡检**：加入 400ms 定期完整性检查，防范任何断点或外部脚本篡改。
- **全局 `LoadingOutlined` Spinner 质感重构**：
  - 彻底解决原 Loading 图标在常规尺寸下极细浅淡、容易断裂看不清的问题。
  - 引入 **20% 半透明底轨环（Track Ring）** 与 **加粗饱满的圆角主旋转弧（Indicator Arc）**，线宽与比例全面对标现代主流设计系统。
  - SVG 内嵌 `@keyframes rpc-spin` 动画规则，确保在任何无 CSS、Shadow DOM 独立环境下 100% 顺滑旋转。
  - 同步升级了 `QrCodeCard`、`InfiniteScrollList`、`DebounceSelect`、`CountdownButton` 等所有带有 Loading 态组件的视觉质感。

### 🧹 组件库精炼与聚焦
- 经过多轮高频通用性与业务落地价值评估，彻底移除了低频、玩具型或过度垂直的组件，全库精准保留 **63 款** 真正高复用、高质感的中后台与 Web 通用组件。
- 完善并统一了全库 63 款组件的 TypeScript 类型定义、ESM / CommonJS 构建导出与 Demo 预览映射。

---

## [1.1.19] - 2026-08-15

### 💅 布局与展示组件优化
- **`Fullscreen`（全屏容器）**：增强对局部元素原生全屏与网页内最大化置顶切换支持，优化悬浮快捷按钮交互与 Render Props 渲染逻辑。
- **`CopyButton`（复制按钮）**：优化内联与按钮形态的复制反馈，支持 Tooltip 动效与异步复制状态保护。
- **`ShimmerSkeleton`（流光骨架屏）**：优化渐变流光掠过动画的流畅度与暗黑模式适配。
- **`Masonry`（瀑布流）**：对齐 Ant Design V6 规范，支持列优先响应式布局与子项尺寸动态监听。

---

## [1.1.0] - 2026-08-10

### ✨ 新增现代 SaaS 与中后台通用组件
- **通用 General**：新增 `CodeSnippet`（极客代码块）、`QrCodeCard`（二维码卡片）、`GuidedTour`（漫游引导）、`FilePreviewer`（文件预览）、`FloatingActionBar`（悬浮操作栏）、`ContextMenu`（右键菜单）。
- **布局与导航 Layout & Nav**：新增 `AdaptiveBreadcrumb`（自适应折叠面包屑）、`CascadeDrawer`（级联下钻抽屉）、`KanbanBoard`（任务看板）、`DragSortList`（拖拽排序列表）、`Marquee`（无缝跑马灯）、`ScrollTracker`（阅读进度与吸顶容器）、`InfiniteScrollList`（无限滚动列表）。
- **数据录入 Data Entry**：新增 `DualRangeSlider`（双滑块区间选择器）、`FilterChips`（已选胶囊栏）、`FileDropZone`（拖拽上传容器）、`TreeTransfer`（树形穿梭框）、`NumberStepper`（平滑数字步进器）、`CountdownButton`（验证码倒计时按钮）、`KeyValEditor`（键值对编辑器）、`QuickDateRange`（快捷日期筛选）、`TreeFilterPanel`（树形平铺筛选）、`NumericRangeInput`（数值区间输入）、`CronPicker`（Cron 表达式生成器）、`TagInput`（标签输入器）、`PasswordStrength`（密码强度检测）、`ImageCropper`（Canvas 图片裁剪）、`DebounceSelect`（防抖异步搜索选择器）。
- **数据展示 Display**：新增 `JsonDiffViewer`（JSON 差异比对）、`JsonTree`（JSON 树状探查）、`MiniSparkline`（微走势折线图）、`SegmentedProgress`（分段多色进度条）、`TrendIndicator`（KPI 升降趋势胶囊）、`PhotoViewer`（相册画廊查看器）、`DiffTable`（两期对比表格）、`StatusTimeline`（审批流时间轴）、`GradientText`（流光渐变文字）、`VideoPlayer`（轻量视频播放器）、`PdfViewer`（Web PDF 阅读器）、`BadgeRibbon`（缎带角标）、`FlipCard`（3D 翻转卡片）、`VirtualList`（虚拟滚动列表）、`MetricCard`（KPI 指标卡）、`ActivityLog`（操作审计日志）、`AudioPlayer`（音频播放条）、`TiltCard`（3D 倾斜卡片）、`SpotlightCard`（聚光灯卡片）、`SensitiveMask`（敏感数据脱敏）、`DiffViewer`（代码/文本行级比对）、`JsonEditor`（JSON 语法高亮编辑器）、`CountUp`（数字缓动跳动）、`TextEllipsis`（文本省略与复制）。
- **反馈 Feedback**：新增 `AnnouncementBar`（广播横幅）、`HoverCard`（悬浮资料卡）、`EnvBadge`（环境防误触角标）。

---

## [1.0.0] - 2026-08-01

### 🎉 首发核心基础组件
- **`CollapseBox`**：支持水平与垂直弹性伸缩折叠的内容容器。
- **`Splitter`**：支持多面板拖拽调整尺寸、折叠与双击重置的可定制分屏面板组件。
- **`DisabledBox`**：为子级元素或复杂区域提供统一的禁用态透明遮罩与防交互保护。
- **`BorderBeam`**：为卡片或容器边框添加流动高亮与自定义渐变动画的特效组件。
- **`ColorPicker`**：符合 Ant Design 规范的无外部依赖颜色选择器。
