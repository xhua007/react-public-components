import { useState } from 'react';
import InfiniteScrollList from '../../../InfiniteScrollList';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

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

	const usageCode = `import { useState } from 'react';
import { InfiniteScrollList } from 'react-public-components';

export default function App() {
  const [list, setList] = useState(['数据项 1', '数据项 2']);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNext = () => {
    setLoading(true);
    setTimeout(() => {
      setList(prev => [...prev, \`数据项 \${prev.length + 1}\`]);
      setLoading(false);
    }, 600);
  };

  return (
    <InfiniteScrollList
      height={300}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={fetchNext}
      endMessage="没有更多内容了"
    >
      {list.map((item, idx) => (
        <div key={idx} style={{ padding: 12 }}>{item}</div>
      ))}
    </InfiniteScrollList>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '列表渲染项内容', type: 'ReactNode', required: true },
		{ name: 'hasMore', desc: '是否还有更多数据可供触底加载', type: 'boolean', required: true },
		{ name: 'loading', desc: '当前是否正在请求下一页', type: 'boolean', required: true },
		{
			name: 'onLoadMore',
			desc: '触底加载下一页数据的回调函数',
			type: '() => void | Promise<void>',
			required: true,
		},
		{
			name: 'height',
			desc: '容器固定高度（传值时为局部滚动容器，不传时监听 window 全局滚动）',
			type: 'number | string',
			default: '-',
		},
		{ name: 'threshold', desc: '触发加载的触底距离阈值（像素）', type: 'number', default: '40' },
		{
			name: 'endMessage',
			desc: '没有更多数据时的底部展示内容',
			type: 'ReactNode',
			default: "'已经到底啦 ~'",
		},
		{
			name: 'loadingIndicator',
			desc: '自定义加载中指示器组件',
			type: 'ReactNode',
			default: 'Spinner + 文案',
		},
		{
			name: 'scrollableTarget',
			desc: '指定外部自定义可滚动容器的 DOM id',
			type: 'string',
			default: '-',
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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
