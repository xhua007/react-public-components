import CollapseBox from '../../../CollapseBox';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function CollapseBoxDemo() {
	const usageCode = `import { CollapseBox } from 'react-public-components';

export default function App() {
  return (
    <CollapseBox
      direction="horizontal"
      buttonPosition="right"
      defaultWidth="50%"
      defaultHeight={280}
    >
      <div style={{ padding: 16 }}>
        <h3>侧边折叠工作区</h3>
        <p>点击边缘收缩按钮可一键展开/折叠面板。</p>
      </div>
    </CollapseBox>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '折叠容器主体内容', type: 'ReactNode', default: '-' },
		{ name: 'direction', desc: "折叠方向：'horizontal' 水平 / 'vertical' 垂直", type: "'horizontal' | 'vertical'", default: "'horizontal'" },
		{ name: 'buttonPosition', desc: "折叠触发按钮位置：'left' | 'right' | 'top' | 'bottom'", type: 'string', default: "'right'" },
		{ name: 'defaultWidth', desc: '默认展开宽度（支持像素数字或百分比字符串）', type: 'number | string', default: '600' },
		{ name: 'defaultHeight', desc: '默认展开高度（支持像素数字或百分比字符串）', type: 'number | string', default: '300' },
		{ name: 'title', desc: '内容折叠区域说明标题', type: 'string', default: "'内容区域'" },
		{ name: 'headerHeight', desc: '顶部标题栏高度（仅在垂直折叠且传了 title 时有效）', type: 'number', default: '40' },
		{ name: 'contentPadding', desc: '容器内边距', type: 'string', default: "'16px'" },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. CollapseBox · 水平折叠（按钮在右，宽度 50%）
				</h3>
				<CollapseBox
					direction="horizontal"
					buttonPosition="right"
					defaultWidth="50%"
					defaultHeight={300}
				>
					<p>这里是水平折叠容器的内容。点击右侧按钮可收起/展开。</p>
					<p>支持宽度设置百分比（如 "50%"）或像素数字（如 500）。</p>
				</CollapseBox>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. CollapseBox · 水平折叠（按钮在左）</h3>
				<CollapseBox
					direction="horizontal"
					buttonPosition="left"
					defaultWidth={500}
					defaultHeight={300}
				>
					<p>这里是水平折叠容器的内容。点击左侧按钮可收起/展开。</p>
					<p>支持任意 ReactNode。</p>
				</CollapseBox>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>3. CollapseBox · 垂直折叠（按钮在下）</h3>
				<CollapseBox direction="vertical" buttonPosition="bottom" defaultHeight={240}>
					<p>这里是垂直折叠容器的内容。点击下方按钮可上下折叠。</p>
				</CollapseBox>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>4. CollapseBox · 垂直折叠（按钮在上）</h3>
				<CollapseBox direction="vertical" buttonPosition="top" defaultHeight={240}>
					<p>这里是垂直折叠容器的内容。点击上方按钮可上下折叠。</p>
				</CollapseBox>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 640 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
