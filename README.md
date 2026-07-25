# react-public-components

封装 react 常用的组件，欢迎更多同学提出大众化普遍存在的业务场景。

本仓库包含两个独立的 React 组件：

1. **CollapseBox** — 可折叠的内容容器组件
2. **Splitter** — 可拖拽调整、可折叠的分屏面板组件

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

| 属性            | 类型                                   | 默认值         | 说明                                   |
| --------------- | -------------------------------------- | -------------- | -------------------------------------- |
| `children`      | `ReactNode`（必须为 `Splitter.Panel`） | -              | 面板集合，建议 2 个及以上              |
| `className`     | `string`                               | -              | 根节点自定义类名                       |
| `style`         | `CSSProperties`                        | -              | 根节点自定义样式                       |
| `orientation`   | `'horizontal' \| 'vertical'`           | `'horizontal'` | 分屏方向（优先级高于 `vertical`）      |
| `vertical`      | `boolean`                              | `false`        | 是否垂直分屏（兼容写法）               |
| `lazy`          | `boolean`                              | `false`        | 是否在拖拽结束时才更新视图（提升性能） |
| `onResizeStart` | `(sizes: number[]) => void`            | -              | 拖拽开始回调                           |
| `onResize`      | `(sizes: number[]) => void`            | -              | 拖拽过程中尺寸变化回调                 |
| `onResizeEnd`   | `(sizes: number[]) => void`            | -              | 拖拽/折叠/重置结束回调                 |

### Splitter.Panel Props

| 属性          | 类型                     | 默认值  | 说明                                                      |
| ------------- | ------------------------ | ------- | --------------------------------------------------------- |
| `children`    | `ReactNode`              | -       | 面板内容                                                  |
| `size`        | `number \| '${number}%'` | -       | 受控尺寸                                                  |
| `defaultSize` | `number \| '${number}%'` | -       | 初始尺寸（未设置时按剩余空间平均分配）                    |
| `min`         | `number \| '${number}%'` | `0`     | 最小尺寸                                                  |
| `max`         | `number \| '${number}%'` | -       | 最大尺寸                                                  |
| `collapsible` | `boolean`                | `false` | 是否显示折叠按钮                                          |
| `resizable`   | `boolean`                | `true`  | 是否允许拖拽调整（两侧任一为 `false` 都会禁用对应分隔条） |
| `style`       | `CSSProperties`          | -       | 面板自定义样式                                            |

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
- `@ant-design/icons`（折叠方向图标）

---

## 三、目录结构

```
.
├── CollapseBox/
│   ├── index.tsx
│   └── index.less
└── Splitter/
    └── index.tsx
```
