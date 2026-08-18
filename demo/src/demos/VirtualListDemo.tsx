import { useMemo } from 'react';
import VirtualList from '../../../VirtualList';

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
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					仅渲染可视区域及上下少许缓冲 DOM，内存占用极低，海量数据随意拖拽滚动无卡顿。
				</p>
			</div>
		</div>
	);
}
