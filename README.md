# react-public-components

封装 react 常用的组件，欢迎更多同学提出大众化普遍存在的业务场景。

本仓库包含三个独立的 React 组件：

1. **CollapseBox** — 可折叠的内容容器组件
2. **Splitter** — 可拖拽调整、可折叠的分屏面板组件
3. **DisabledBox** — 禁用态包装容器组件（带锁图标及拦截事件）

---

## 一、CollapseBox 可折叠容器

### 简介

`CollapseBox` 是一个带切换按钮的可折叠容器。支持水平（左右收起）与垂直（上下收起）两种方向，按钮可放置在容器四条边的任意一侧，适合用作侧边栏、详情面板等可隐藏区域。

### 引入方式

```tsx
import { CollapseBox } from 'react-public-components';
// 导入组件样式
import 'react-public-components/styles.css';
```

### Props

| 属性             | 类型                                     | 默认值         | 说明                                                                               |
| ---------------- | ---------------------------------------- | -------------- | ---------------------------------------------------------------------------------- |
| `children`       | `ReactNode`                              | -              | 容器内部渲染的内容                                                                 |
| `title`          | `string`                                 | `'内容区域'`   | 标题（当前版本内部隐藏渲染，仅作为占位属性保留）                                   |
| `direction`      | `'horizontal' \| 'vertical'`             | `'horizontal'` | 折叠方向：`horizontal` 沿 X 轴收起，`vertical` 沿 Y 轴收起                         |
| `buttonPosition` | `'right' \| 'left' \| 'top' \| 'bottom'` | `'right'`      | 切换按钮位置。`horizontal` 时建议 `left`/`right`，`vertical` 时建议 `top`/`bottom` |
| `defaultWidth`   | `number \| string`                       | `600`          | 容器宽度（支持像素数字如 `500` 或百分比字符串如 `'50%'`）                          |
| `defaultHeight`  | `number \| string`                       | `300`          | 容器高度（支持像素数字如 `300` 或百分比字符串如 `'50%'`）                          |
| `contentPadding` | `string`                                 | `'16px'`       | 内容区内边距                                                                       |
| `headerHeight`   | `number`                                 | `16`           | 头部预留高度，用于计算内容区最大高度                                               |
| `className`      | `string`                                 | -              | 根节点自定义类名                                                                   |

### 基础用法

```tsx
import { CollapseBox } from 'react-public-components';

export default function Demo() {
	return (
		<CollapseBox
			direction="horizontal"
			buttonPosition="right"
			defaultWidth="50%"
			defaultHeight={400}
		>
			<p>这里是折叠容器中的内容。</p>
		</CollapseBox>
	);
}
```

### 垂直方向示例

```tsx
<CollapseBox direction="vertical" buttonPosition="bottom" defaultHeight={300}>
	<p>上下方向折叠的内容。</p>
</CollapseBox>
```

---

## 二、Splitter 分屏面板

### 简介

`Splitter` 是一个支持拖拽调整大小、可折叠、可重置的分屏面板组件，灵感来自 Ant Design 的 Splitter，但提供了更精细的折叠按钮交互。支持 `horizontal`（左右分屏）与 `vertical`（上下分屏）两种方向。

### 引入方式

```tsx
import { Splitter } from 'react-public-components';
```

### Splitter Props

| 属性                   | 类型                                                                                                                | 默认值         | 说明                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------- |
| `children`             | `ReactNode`（建议传入 `Splitter.Panel`）                                                                            | -              | 面板集合，建议 2 个及以上                                                             |
| `className`            | `string`                                                                                                            | -              | 根节点自定义类名                                                                      |
| `classNames`           | `Partial<Record<SemanticDOM, string>> \| ((info: { props }) => Partial<Record<SemanticDOM, string>>)`               | -              | 自定义组件内部各语义化结构（`root` / `panel` / `dragger`）的类名，支持对象或函数      |
| `style`                | `CSSProperties`                                                                                                     | -              | 根节点自定义 CSS 样式                                                                 |
| `styles`               | `Partial<Record<SemanticDOM, CSSProperties>> \| ((info: { props }) => Partial<Record<SemanticDOM, CSSProperties>>)` | -              | 自定义组件内部各语义化结构（`root` / `panel` / `dragger`）的 CSS 样式，支持对象或函数 |
| `orientation`          | `'horizontal' \| 'vertical'`                                                                                        | `'horizontal'` | 分屏方向（优先级高于 `vertical`）                                                     |
| `vertical`             | `boolean`                                                                                                           | `false`        | 是否垂直分屏（兼容写法）                                                              |
| `lazy`                 | `boolean`                                                                                                           | `false`        | 是否在拖拽结束时才更新视图（提升性能）                                                |
| `onResizeStart`        | `(sizes: number[]) => void`                                                                                         | -              | 拖拽开始回调                                                                          |
| `onResize`             | `(sizes: number[]) => void`                                                                                         | -              | 拖拽过程中尺寸变化回调                                                                |
| `onResizeEnd`          | `(sizes: number[]) => void`                                                                                         | -              | 拖拽/折叠/重置结束回调                                                                |
| `onCollapse`           | `(collapsed: boolean[], sizes: number[]) => void`                                                                   | -              | 面板展开或折叠状态发生变化时的回调                                                    |
| `onDraggerDoubleClick` | `(index: number) => void`                                                                                           | -              | 双击拖拽条回调                                                                        |
| `draggerIcon`          | `ReactNode`                                                                                                         | -              | 自定义拖拽手柄指示图标节点                                                            |
| `destroyOnHidden`      | `boolean`                                                                                                           | `false`        | 折叠/隐藏时是否销毁所有面板内容节点                                                   |

### Splitter.Panel Props

| 属性              | 类型                                                                                     | 默认值  | 说明                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `children`        | `ReactNode`                                                                              | -       | 面板内容                                                                                       |
| `className`       | `string`                                                                                 | -       | 面板自定义类名                                                                                 |
| `size`            | `number \| '${number}%'`                                                                 | -       | 受控尺寸                                                                                       |
| `defaultSize`     | `number \| '${number}%'`                                                                 | -       | 初始尺寸（未设置时按剩余空间平均分配）                                                         |
| `min`             | `number \| '${number}%'`                                                                 | `0`     | 最小尺寸                                                                                       |
| `max`             | `number \| '${number}%'`                                                                 | -       | 最大尺寸                                                                                       |
| `collapsible`     | `boolean \| { start?: boolean; end?: boolean; showCollapsibleIcon?: boolean \| 'auto' }` | `false` | 是否允许折叠面板。支持配置指定折叠方向（`start`/`end`）及图标显示策略（`showCollapsibleIcon`） |
| `destroyOnHidden` | `boolean`                                                                                | -       | 折叠/隐藏时是否销毁当前面板内容节点（可覆盖 Splitter 根属性）                                  |
| `resizable`       | `boolean`                                                                                | `true`  | 是否允许拖拽调整（两侧任一为 `false` 都会禁用对应分隔条）                                      |
| `style`           | `CSSProperties`                                                                          | -       | 面板自定义样式                                                                                 |

### 基础用法

```tsx
import { Splitter } from 'react-public-components';

export default function Demo() {
	return (
		<Splitter style={{ height: 400 }}>
			<Splitter.Panel defaultSize="40%" min="20%">
				<p>左侧面板</p>
			</Splitter.Panel>
			<Splitter.Panel>
				<p>右侧面板</p>
			</Splitter.Panel>
		</Splitter>
	);
}
```

### 可折叠 + 受控尺寸示例

```tsx
<Splitter orientation="vertical" onResizeEnd={(sizes) => console.log('最终尺寸:', sizes)}>
	<Splitter.Panel defaultSize="30%" collapsible min="10%">
		<p>上方面板（可折叠）</p>
	</Splitter.Panel>
	<Splitter.Panel collapsible>
		<p>下方面板（可折叠）</p>
	</Splitter.Panel>
</Splitter>
```

### 交互说明

- **拖拽调整**：在两个面板之间的分隔条上按下鼠标拖动即可调整两侧尺寸。
- **折叠**：分隔条上会渲染两个折叠按钮，分别用于折叠左/上面板与右/下面板。
- **重置**：双击分隔条可重置为初始尺寸。
- **键盘控制**：分隔条聚焦后使用方向键调整（`Shift + 方向键` 步长放大）。
- **百分比/像素**：`size`、`defaultSize`、`min`、`max` 均支持数字（px）或 `'${number}%'` 字符串。

### 依赖说明

- `react`（含 hooks、Children API）
- 零第三方 UI 库依赖（内部采用原生内联 SVG 图标组件）

---

## 三、DisabledBox 禁用容器

### 简介

`DisabledBox` 是一个处理禁用态内容的包装容器组件。当处于禁用状态（`disabled={true}`）时，会自动显示锁图标、将文字颜色设为禁用灰色，并在捕获阶段拦截点击事件，同时保持 `mouseenter`/`mouseleave` 等 hover 事件正常响应（以保证 Tooltip 等提示浮层正常工作）。

### 引入方式

```tsx
import { DisabledBox } from 'react-public-components';
```

### Props

| 属性        | 类型                | 默认值   | 说明                                                   |
| ----------- | ------------------- | -------- | ------------------------------------------------------ |
| `children`  | `ReactNode`         | -        | 容器包裹的主体内容                                     |
| `title`     | `ReactNode`         | -        | 标题或替代内容（当未传入 `children` 时生效）           |
| `disabled`  | `boolean`           | `false`  | 是否禁用，禁用时显示锁图标、文字呈现灰色且拦截点击事件 |
| `iconAlign` | `'left' \| 'right'` | `'left'` | 锁图标的对齐位置                                       |

### 基础用法

```tsx
import { DisabledBox } from 'react-public-components';

export default function Demo() {
	return (
		<DisabledBox disabled={true}>
			<p>受保护的不可点击内容</p>
		</DisabledBox>
	);
}
```

---

## 四、目录结构

```
.
├── CollapseBox/
│   ├── index.tsx
│   └── index.less
├── Splitter/
│   └── index.tsx
└── DisabledBox/
    ├── index.tsx
    └── index.less
```

---

## 五、发布到 npm

### 1. 前置准备

1. **登录 npm**：确保已注册 npm 账号，并在终端中完成登录：

   ```bash
   npm login --auth-type=web
   ```

   _检查当前登录状态：_

   ```bash
   npm whoami
   ```

2. **检查镜像源**：发布必须使用 npm 官方镜像源，如果使用了国内镜像源（如淘宝/npmmirror），请切换回官方源：
   ```bash
   # 查看当前镜像源
   npm config get registry

   # 切换为官方源
   npm config set registry https://registry.npmjs.org/
   ```

### 2. 更新版本号

根据 [语义化版本 (SemVer)](https://semver.org/lang/zh-CN/) 规范更新 `package.json` 中的版本号：

```bash
# 小修复（Patch）：0.1.1 -> 0.1.2
npm version patch

# 新功能（Minor）：0.1.1 -> 0.2.0
npm version minor

# 破坏性更新（Major）：0.1.1 -> 1.0.0
npm version major
```

### 3. 构建与发布

推荐先在本地手动运行构建命令验证代码无误，再运行发布命令：

```bash
# 1. 手动构建打包（验证代码是否有编译错误）
npm run build

# 2. （可选）预览发布内容，检查打入包的文件列表
npm publish --dry-run

# 3. 正式发布（注意是 npm publish，不需要加 run）
npm publish
```

> **自动化保障**：本项目已在 `package.json` 中配置了 `"prepublishOnly": "npm run build"` 生命周期钩子。即便你忘记手动运行 `npm run build`，在直接执行 `npm publish` 时，npm 也会**自动先帮你打包构建**，确保发布的始终是最新代码。
>
> **提示**：如果是首发公开包，可显式指定访问级别：
>
> ```bash
> npm publish --access public
> ```
