import DisabledBox from '../../../DisabledBox';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function DisabledBoxDemo() {
	const usageCode = `import { DisabledBox } from 'react-public-components';

export default function App() {
  return (
    <DisabledBox disabled iconAlign="left">
      <button onClick={() => alert('已被拦截')}>敏感操作按钮</button>
    </DisabledBox>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '需要施加禁用保护的子元素内容', type: 'ReactNode', default: '-' },
		{ name: 'disabled', desc: '是否开启禁用保护（禁用时阻止点击冒泡、置灰并显示锁图标）', type: 'boolean', default: 'false' },
		{ name: 'iconAlign', desc: "锁图标对齐方向：'left' 左侧 / 'right' 右侧", type: "'left' | 'right'", default: "'left'" },
		{ name: 'title', desc: '备用内容节点（当未传 children 时生效）', type: 'ReactNode', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>9. DisabledBox 禁用遮罩</h3>
				<DisabledBox disabled={true}>
					<p style={{ margin: 0, padding: 16, background: '#fafafa', borderRadius: 8 }}>
						这里是受保护的内容。呈现透明禁用状态，点击无法触发内部交互。
					</p>
				</DisabledBox>
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
