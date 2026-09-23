import { useMemo } from 'react';
import VirtualList from '../../../VirtualList';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function VirtualListDemo() {
	// 生成 10,000 条测试数据
	const bigData = useMemo(() => {
		return Array.from({ length: 10000 }).map((_, i) => ({
			id: i + 1,
			title: `系统审计记录 #${i + 1} - 用户操作数据日志流水`,
			time: '2026-08-15 14:20',
			status: i % 3 === 0 ? '成功' : i % 3 === 1 ? '进行中' : '异常',
		}));
	}, []);

	const usageCode = `import { VirtualList } from 'react-public-components';

export default function App() {
  const data = Array.from({ length: 10000 }).map((_, i) => ({ id: i, name: \`Item \${i}\` }));

  return (
    <VirtualList
      items={data}
      height={360}
      itemHeight={48}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <div>{item.name}</div>}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'items', desc: '海量数据源数组', type: 'T[]', required: true },
		{
			name: 'renderItem',
			desc: '渲染单个列表项的函数，接收 item 与 index',
			type: '(item: T, index: number) => ReactNode',
			required: true,
		},
		{ name: 'itemHeight', desc: '单个列表项的固定行高（像素）', type: 'number', default: '48' },
		{ name: 'height', desc: '滚动可视容器高度（像素）', type: 'number', default: '360' },
		{
			name: 'keyExtractor',
			desc: '提取每项唯一 Key 的函数',
			type: '(item: T, index: number) => string | number',
			default: '-',
		},
		{ name: 'buffer', desc: '视口外额外渲染的缓冲项数量', type: 'number', default: '5' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 零依赖轻量虚拟滚动列表（当前加载 10,000 条海量数据，60FPS 极速渲染）
				</h3>
				<div style={{ maxWidth: 640 }}>
					<VirtualList
						items={bigData}
						height={360}
						itemHeight={48}
						keyExtractor={(item) => item.id}
						renderItem={(item) => (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									width: '100%',
									fontSize: 13,
								}}
							>
								<span style={{ fontWeight: 500 }}>{item.title}</span>
								<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
									<span style={{ color: '#8c8c8c' }}>{item.time}</span>
									<span
										style={{
											padding: '2px 8px',
											borderRadius: 4,
											fontSize: 12,
											background:
												item.status === '成功'
													? '#f6ffed'
													: item.status === '进行中'
														? '#e6f4ff'
														: '#fff1f0',
											color:
												item.status === '成功'
													? '#52c41a'
													: item.status === '进行中'
														? '#1677ff'
														: '#ff4d4f',
										}}
									>
										{item.status}
									</span>
								</div>
							</div>
						)}
					/>
				</div>
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
