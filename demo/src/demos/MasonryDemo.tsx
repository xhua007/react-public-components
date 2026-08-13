import Masonry from '../../../Masonry';

export default function MasonryDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 8 }}>
					10. Masonry 瀑布流组件 (AntD V6 规范)
				</h3>
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
		</div>
	);
}
