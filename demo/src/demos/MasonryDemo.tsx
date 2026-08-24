import Masonry from '../../../Masonry';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function MasonryDemo() {
	const usageCode = `import { Masonry } from 'react-public-components';

export default function App() {
  const items = [
    { key: '1', height: 120, children: <div>卡片 1</div> },
    { key: '2', height: 200, children: <div>卡片 2</div> },
    { key: '3', height: 160, children: <div>卡片 3</div> },
  ];

  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gutter={[16, 16]}
      items={items}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'items', desc: '瀑布流子项数据列表，每项含 key, height, children, data', type: 'MasonryItem[]', required: true },
		{ name: 'columns', desc: '瀑布流列数，支持固定数字或响应式断点对象（如 { xs: 1, md: 3, lg: 4 }）', type: 'number | object', default: '3' },
		{ name: 'gutter', desc: '间距配置，支持统一数值或水平垂直数组 [horizontal, vertical]', type: 'number | [number, number]', default: '0' },
		{ name: 'fresh', desc: '是否持续监听子项尺寸变化自适应重排', type: 'boolean', default: 'false' },
		{ name: 'itemRender', desc: '自定义单项渲染函数', type: '(item: MasonryItem) => ReactNode', default: '-' },
		{ name: 'onLayoutChange', desc: '瀑布流布局列排序重算完成回调', type: '(layout) => void', default: '-' },
		{ name: 'styles', desc: '语义化 DOM 样式对象 (root, item)', type: 'MasonryStyles', default: '-' },
		{ name: 'classNames', desc: '语义化 DOM 类名对象 (root, item)', type: 'MasonryClassNames', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 8 }}>10. Masonry 瀑布流组件 (AntD V6 规范)</h3>
				<p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
					支持响应式 columns ({`{ xs: 1, sm: 2, md: 3, lg: 4 }`})、gutter 水平垂直间距、fresh
					尺寸更新以及 onLayoutChange 回调。
				</p>
				<Masonry
					columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
					gutter={[16, 16]}
					fresh={true}
					onLayoutChange={(layout) => console.log('Masonry 布局排列改变:', layout)}
					styles={{
						root: { background: '#f5f5f5', padding: 16, borderRadius: 12 },
						item: { transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)' },
					}}
					items={[
						{
							key: '1',
							height: 120,
							children: (
								<div
									style={{
										background: '#ffe7ba',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 1 (高度 120px)
								</div>
							),
						},
						{
							key: '2',
							height: 200,
							children: (
								<div
									style={{
										background: '#ffd591',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 2 (高度 200px)
								</div>
							),
						},
						{
							key: '3',
							height: 150,
							children: (
								<div
									style={{
										background: '#ffbb96',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 3 (高度 150px)
								</div>
							),
						},
						{
							key: '4',
							height: 240,
							children: (
								<div
									style={{
										background: '#b7eb8f',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 4 (高度 240px)
								</div>
							),
						},
						{
							key: '5',
							height: 100,
							children: (
								<div
									style={{
										background: '#91caff',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 5 (高度 100px)
								</div>
							),
						},
						{
							key: '6',
							height: 180,
							children: (
								<div
									style={{
										background: '#adc6ff',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 6 (高度 180px)
								</div>
							),
						},
						{
							key: '7',
							height: 130,
							children: (
								<div
									style={{
										background: '#d3ade6',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 7 (高度 130px)
								</div>
							),
						},
					]}
				/>
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
