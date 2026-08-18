import { useState } from 'react';
import InfiniteScrollList from '../../../InfiniteScrollList';

export default function InfiniteScrollListDemo() {
	const [items, setItems] = useState<string[]>([
		'任务 #1: 初始化系统配置',
		'任务 #2: 部署生产环境 API 网关',
		'任务 #3: 数据库读写分离与主从同步',
		'任务 #4: 客户端 Token 认证与鉴权',
		'任务 #5: 监控告警大盘对接',
	]);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const loadMoreData = () => {
		if (loading || !hasMore) return;
		setLoading(true);

		// 模拟网络请求
		setTimeout(() => {
			const currentLength = items.length;
			if (currentLength >= 20) {
				setHasMore(false);
				setLoading(false);
				return;
			}

			const nextBatch = Array.from({ length: 5 }).map(
				(_, i) => `任务 #${currentLength + i + 1}: 业务数据自动化处理流水线`,
			);

			setItems((prev) => [...prev, ...nextBatch]);
			setLoading(false);
		}, 800);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 局部容器无限滚动加载列表 (总计加载至 20 项后结束)
				</h3>
				<div
					style={{
						maxWidth: 520,
						border: '1px solid #e8e8e8',
						borderRadius: 8,
						overflow: 'hidden',
						background: '#ffffff',
					}}
				>
					<InfiniteScrollList
						height={280}
						hasMore={hasMore}
						loading={loading}
						onLoadMore={loadMoreData}
						endMessage="🎉 已加载全部 20 条任务数据！"
					>
						<div style={{ padding: '8px 16px' }}>
							{items.map((item, idx) => (
								<div
									key={idx}
									style={{
										padding: '12px 0',
										borderBottom: '1px solid #f5f5f5',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										fontSize: 14,
									}}
								>
									<span>{item}</span>
									<span style={{ fontSize: 12, color: '#8c8c8c' }}>2026-08-15</span>
								</div>
							))}
						</div>
					</InfiniteScrollList>
				</div>
				<div style={{ marginTop: 8, fontSize: 13, color: '#595959' }}>
					当前已加载项：{items.length} 条
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					滚动上方列表到底部，将自动触发异步加载并展示骨架动画，加载完毕后优雅展示结束文案。
				</p>
			</div>
		</div>
	);
}
