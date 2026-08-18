# react-public-components

[![npm version](https://img.shields.io/npm/v/react-public-components.svg)](https://www.npmjs.com/package/react-public-components)
[![license](https://img.shields.io/npm/l/react-public-components.svg)](https://github.com/xhua007/react-public-components)

📦 **企业级现代 React 通用核心组件库**。零沉重 UI 库绑定，开箱即用，提供 64 款真正高频、极客质感的中后台与现代 Web 应用组件。

---

## 🌟 特性亮点

- 💎 **精炼通用**：涵盖中后台与 SaaS 产品的通用、布局导航、数据录入、数据展示、反馈 5 大类别共 64 款高频组件。
- ⚡ **轻量零依赖**：不强制依赖 Ant Design 等庞大第三方 UI 库，体积小巧，按需引入。
- 🛡️ **工业级防御**：核心安全组件（如 `Watermark`）采用原生 DOM 脱离 VDOM 注入防篡改架构，支持毫秒自愈与防审查元素删除。
- 🎨 **极客质感**：现代设计语言，自带平滑微动效、毛玻璃（Glassmorphism）、硬件加速流光与暗色模式适配。
- 📦 **开箱即用**：原生支持 TypeScript 类型定义、ESM、CommonJS 与样式自动构建。

---

## 快速安装

```bash
npm install react-public-components
# 或使用 pnpm
pnpm add react-public-components
# 或使用 yarn
yarn add react-public-components
```

在项目入口文件中引入全局样式：

```tsx
import 'react-public-components/styles.css';
```

---

## 🧩 组件全览（64 款核心高频组件）

### 1. 通用 General (9 款)
| 组件名 | 中文名称 | 特性与场景说明 |
| :--- | :--- | :--- |
| **`CodeSnippet`** | 极客代码块 | Mac 终端风格代码块卡片，带红黄绿圆点、语言标签与一键平滑复制。 |
| **`Watermark`** | 防篡改水印 | 动态防截屏安全水印，基于原生 DOM 独立注入与 ComputedStyle 校验，毫秒自愈防 F12 审查元素删除/隐藏。 |
| **`QrCodeCard`** | 二维码卡片 | 多功能扫码登录/支付卡片，支持 Logo 嵌入、失效过期遮罩、高清下载与精致 Loading。 |
| **`GuidedTour`** | 漫游引导 | 新手引导步进器，带智能镂空高亮遮罩、步骤弹窗与状态持久化。 |
| **`FilePreviewer`** | 文件预览 | 多格式文件与媒体统一弹窗预览器，支持图片、音视频、PDF、代码与一键下载。 |
| **`FloatingActionBar`** | 悬浮操作栏 | 表格与列表多选时从屏幕底部浮出的毛玻璃操作栏，内置统计与批量动作。 |
| **`Fullscreen`** | 全屏容器 | 支持局部元素原生全屏与网页内最大化置顶切换，支持快捷悬浮按钮与 Render Props。 |
| **`CopyButton`** | 复制按钮 | 提供点击复制到剪贴板功能，支持纯图标、带文字按钮与内联文本，内置 Tooltip 动效。 |
| **`ContextMenu`** | 右键菜单 | 为任意区域或列表行提供右键上下文菜单，支持视口防溢出翻转、二级子菜单与快捷键。 |

---

### 2. 布局与导航 Layout & Nav (9 款)
| 组件名 | 中文名称 | 特性与场景说明 |
| :--- | :--- | :--- |
| **`CascadeDrawer`** | 级联下钻抽屉 | 多层级无限下钻抽屉容器，带顶部面包屑返回导航与平滑推拉动效。 |
| **`KanbanBoard`** | 任务看板 | 轻量任务看板与泳道管理，基于原生 HTML5 Drag & Drop 跨列平滑拖拽。 |
| **`DragSortList`** | 拖拽排序列表 | 纯原生轻量拖拽重排序列表，支持平滑占位与阴影反馈。 |
| **`Marquee`** | 无缝跑马灯 | 基于硬件加速的无缝平滑滚动 Logo 墙与广播通知条，支持悬停暂停与边缘渐变。 |
| **`ScrollTracker`** | 滚动与吸顶 | 阅读进度条（ScrollTracker）与智能吸顶容器（StickyHeader，带毛玻璃与阴影）。 |
| **`InfiniteScrollList`** | 无限滚动列表 | 触底自动触发异步加载的无限滚动列表容器，内置加载骨架与到底提示。 |
| **`CollapseBox`** | 折叠容器 | 支持水平与垂直方向折叠的弹性容器组件，支持自定义按钮位置与默认尺寸。 |
| **`Splitter`** | 分隔面板 | 支持多面板拖拽调整尺寸、折叠与双击重置的可定制分隔面板组件。 |
| **`Masonry`** | 瀑布流 | 基于列优先的高性能响应式瀑布流布局组件，遵循 AntD 规范。 |

---

### 3. 数据录入 Data Entry (16 款)
| 组件名 | 中文名称 | 特性与场景说明 |
| :--- | :--- | :--- |
| **`DualRangeSlider`** | 双滑块区间选择器 | 双向双滑块区间选择器，支持数值/价格跨度筛选与防交叉穿透。 |
| **`FilterChips`** | 已选筛选胶囊栏 | 多维已选筛选项胶囊汇总栏，支持单项删除与一键清空全部。 |
| **`FileDropZone`** | 拖拽上传容器 | 现代极客拖拽上传虚线容器，支持流光呼吸高亮与剪贴板截图粘贴。 |
| **`TreeTransfer`** | 树形穿梭框 | 树形层级穿梭框，左侧目录树级联勾选与右侧平铺已选列表。 |
| **`NumberStepper`** | 平滑数字步进器 | 长按连续加减数字步进器，支持步长控制与上下限保护。 |
| **`CountdownButton`** | 验证码倒计时按钮 | 短信验证码 60s 倒计时按钮，支持异步前置检查与防刷锁定。 |
| **`KeyValEditor`** | 键值对编辑器 | 动态增删 API Headers 与环境变量配置项，支持密码掩码与单行禁用。 |
| **`QuickDateRange`** | 快捷日期筛选 | 今日/近7天/本月等预设日期胶囊标签与自定义日期范围双向联动。 |
| **`TreeFilterPanel`** | 树形平铺筛选 | 多级分类平铺联动筛选器，支持多选、快捷全部、分类汇总与一键清空。 |
| **`NumericRangeInput`** | 数值区间输入 | 价格与数值区间范围输入框，自带双向联动校验与快捷区间预设标签。 |
| **`CronPicker`** | Cron 选择器 | 定时任务 Cron 表达式可视化生成器，支持按天/周/月多周期配置与中文人话翻译。 |
| **`TagInput`** | 标签输入器 | 自由标签输入组件，支持回车/逗号打标签、退格删除、双击编辑与正则校验。 |
| **`PasswordStrength`** | 密码强度检测 | 多维度密码复杂度实时评分与 4 段彩色进度条可视化指示器。 |
| **`ImageCropper`** | 图片裁剪 | 轻量原生 Canvas 图片裁剪器，支持拖拽、滚轮缩放、90° 旋转、圆形头像裁剪与 Modal 弹窗。 |
| **`DebounceSelect`** | 防抖下拉框 | 防抖异步搜索选择器，内置时序竞态保护、单选/多选 Tags 模式与加载态。 |
| **`ColorPicker`** | 颜色选择器 | 支持 HEX、HSB、RGB 及渐变色模式的高级颜色选择与调色板组件。 |

---

### 4. 数据展示 Display (27 款)
| 组件名 | 中文名称 | 特性与场景说明 |
| :--- | :--- | :--- |
| **`JsonDiffViewer`** | JSON 差异比对器 | JSON 结构体增删改差异彩色高亮探查，支持新旧值对照。 |
| **`JsonTree`** | JSON 树状探查器 | 树状无限折叠展开的 JSON 探查器，支持数据类型高亮与路径探查。 |
| **`MiniSparkline`** | 单行微趋势折线图 | 指标卡与表格专用的极简微折线走势图，纯 SVG 贝塞尔曲线平滑绘制。 |
| **`SegmentedProgress`** | 分段多色进度条 | 单条轨道并列展示多色分段比例，支持存储空间占比与图例。 |
| **`TrendIndicator`** | KPI 趋势升降胶囊 | 微型 KPI 指标变动升降胶囊，自动根据正负值判断涨跌并支持红绿反转。 |
| **`PhotoViewer`** | 相册画廊查看器 | 全功能多图画廊查看器，支持左右键盘按键切图与缩略图底栏联动。 |
| **`DiffTable`** | 两期差异对比表格 | 两期数据差异对比表格，自动计算增减差值与百分比红绿高亮。 |
| **`StatusTimeline`** | 审批流时间轴 | 高级审批流与动态耗时时间轴，包含节点状态徽标、经办人与流转耗时。 |
| **`GradientText`** | 流光渐变文字 | 现代 SaaS 霓虹横向流光渐变文字，支持背景平滑滚动动画。 |
| **`VideoPlayer`** | 视频播放器 | 轻量现代化视频播放器，暗黑毛玻璃控制条、快进快退 10s、0.75x~2.0x 倍速与画中画。 |
| **`PdfViewer`** | PDF 在线阅读器 | 轻量 Web PDF 阅读器，支持缩放 Zoom、90° 顺时针旋转与一键下载。 |
| **`BadgeRibbon`** | 斜角丝带角标 | 卡片左上/右上 45° 倾斜缎带徽章，支持 HOT/PRO 推荐与渐变色。 |
| **`ShimmerSkeleton`** | 流光骨架屏 | 高质感渐变流光掠过骨架屏，支持卡片、列表、头像与多行文本。 |
| **`FlipCard`** | 3D 翻转卡片 | 3D 正反面翻转卡片，鼠标悬停或点击触发 180° 平滑翻转展示详情。 |
| **`VirtualList`** | 虚拟列表 | 零依赖轻量虚拟滚动列表，万级海量数据 60FPS 极速渲染不卡顿。 |
| **`MetricCard`** | KPI 指标卡 | Dashboard 看板指标卡片，集成 CountUp 数字跳动、环比升降趋势与微折线 Sparkline。 |
| **`ActivityLog`** | 操作审计日志 | 中后台业务操作与审批流动态时间轴，支持操作人头像、相对时间与变动详情折叠。 |
| **`AudioPlayer`** | 音频播放条 | 轻量客服录音与语音回放条，支持 Seek 拖拽、倍速切换与一键下载。 |
| **`TiltCard`** | 3D 倾斜卡片 | 鼠标悬停 3D 景深物理倾斜与流光高光跟随卡片。 |
| **`SpotlightCard`** | 聚光灯卡片 | 鼠标光晕聚光灯实时追踪跟随卡片，具备前沿极客科技感与暗色模式。 |
| **`SensitiveMask`** | 敏感脱敏 | 手机号/身份证/银行卡/邮箱等敏感数据脱敏展示，支持点击眼睛解密与复制。 |
| **`DiffViewer`** | 差异比对 | 轻量文本与代码行级差异比对器，支持分栏 Split 与行内 Unified 模式。 |
| **`JsonEditor`** | JSON 查看与编辑 | 轻量免外部依赖的 JSON 语法高亮查看与编辑器，支持格式化、单行压缩与错误定位。 |
| **`CountUp`** | 数字滚动 | 基于高质量缓动算法的平滑数字跳动动画组件，支持前缀后缀与命令式 Ref 控制。 |
| **`TextEllipsis`** | 文本省略 | 支持单行/多行文本截断、展开/收起切换、溢出智能 Tooltip 与一键复制。 |
| **`BorderBeam`** | 边框流光 | 为卡片或容器边框添加流动高亮与自定义渐变动画的特效组件。 |
| **`DisabledBox`** | 禁用遮罩 | 为子级元素或复杂区域提供统一的禁用态透明遮罩与防交互保护。 |

---

### 5. 反馈 Feedback (3 款)
| 组件名 | 中文名称 | 特性与场景说明 |
| :--- | :--- | :--- |
| **`AnnouncementBar`** | 广播通知横幅 | 页面顶部吸顶渐变广播横幅，支持可配置关闭与持久化记忆。 |
| **`HoverCard`** | 悬浮资料卡 | Twitter / GitHub 风格悬浮信息卡片，防误触延迟与视口防溢出。 |
| **`EnvBadge`** | 环境防误触角标 | 醒目的环境状态标识胶囊，点击查看构建版本详情并支持多环境跳转。 |

---

## 💻 典型用法示例

### 1. Watermark 防篡改水印

```tsx
import { Watermark } from 'react-public-components';

export default function App() {
  return (
    <Watermark
      content={['内部机密 严禁外传', 'alex.chen 2026-08-18']}
      color="rgba(0, 0, 0, 0.10)"
      antiTamper
    >
      <div style={{ padding: 32, height: 400 }}>
        <h2>核心财务分析报告</h2>
        <p>即便在控制台尝试删除 DOM 或在 Styles 面板取消勾选属性，水印也会毫秒自愈复原。</p>
      </div>
    </Watermark>
  );
}
```

### 2. Splitter 分隔面板

```tsx
import { Splitter } from 'react-public-components';

export default function App() {
  return (
    <Splitter style={{ height: 400 }}>
      <Splitter.Panel defaultSize="30%" min="15%" collapsible>
        <div style={{ padding: 16 }}>左侧导航树</div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div style={{ padding: 16 }}>主体工作区内容</div>
      </Splitter.Panel>
    </Splitter>
  );
}
```

### 3. CodeSnippet 极客代码块

```tsx
import { CodeSnippet } from 'react-public-components';

export default function App() {
  return (
    <CodeSnippet
      language="typescript"
      code={`const greeting: string = "Hello, react-public-components!";\nconsole.log(greeting);`}
      showLineNumbers
    />
  );
}
```

---

## 🛠️ 本地开发与预览

克隆本仓库并在本地启动全功能交互 Demo 预览站点：

```bash
# 安装依赖
npm install

# 启动本地开发与组件预览站点（基于 Vite）
npm run dev
```

浏览器打开 `http://localhost:5173` 即可浏览全部 64 款组件的实时效果、代码与参数调节面板。

---

## 📦 发布与构建

```bash
# 1. 构建全量产物（dist/ ESM, CJS, DTS 与 CSS）
npm run build

# 2. 构建 Demo 预览站点
npm run build:demo

# 3. 发布到 npm
npm publish --access public
```

---

## 📄 开源许可

[MIT License](LICENSE)
