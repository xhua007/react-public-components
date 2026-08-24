import { useState } from 'react';
import ShimmerSkeleton from '../../../ShimmerSkeleton';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function ShimmerSkeletonDemo() {
	const [loading, setLoading] = useState<boolean>(true);

	const usageCode = `import { useState } from 'react';
import { ShimmerSkeleton } from 'react-public-components';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ShimmerSkeleton type="card" loading={loading}>
      <div style={{ padding: 16, background: '#fff', borderRadius: 8 }}>
        <h3>真实内容已就绪</h3>
        <p>数据加载完成后平滑淡入展示。</p>
      </div>
    </ShimmerSkeleton>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'loading', desc: '是否处于加载中占位骨架屏状态', type: 'boolean', default: 'true' },
		{ name: 'type', desc: "骨架形态类型：'text' 文本 / 'card' 卡片 / 'list' 列表 / 'avatar' 头像", type: "'text' | 'card' | 'list' | 'avatar'", default: "'card'" },
		{ name: 'rows', desc: '文本骨架占位条数（仅在 type="text" 有效）', type: 'number', default: '3' },
		{ name: 'children', desc: '加载完成 (loading=false) 后展示的真实业务组件', type: 'ReactNode', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
					<h3 style={{ fontSize: 16, margin: 0 }}>
						1. 渐变流光掠过骨架屏（Shimmer Wave Animation）
					</h3>
					<button type="button" onClick={() => setLoading(!loading)}>
						切换 Loading 状态 ({loading ? '加载中' : '已就绪'})
					</button>
				</div>

				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					{/* 卡片骨架 */}
					<div style={{ width: 280 }}>
						<ShimmerSkeleton type="card" loading={loading}>
							<div
								style={{
									padding: 16,
									border: '1px solid #f0f0f0',
									borderRadius: 8,
									background: '#ffffff',
								}}
							>
								<div
									style={{
										height: 160,
										background: '#e6f4ff',
										borderRadius: 6,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 32,
									}}
								>
									🖼️
								</div>
								<h4 style={{ margin: '12px 0 6px 0' }}>高质感 UI 交互套件</h4>
								<p style={{ fontSize: 13, color: '#595959', margin: 0 }}>
									专为高要求企业中后台打造的轻量级公共组件库。
								</p>
							</div>
						</ShimmerSkeleton>
					</div>

					{/* 列表骨架 */}
					<div style={{ width: 320 }}>
						<ShimmerSkeleton type="list" loading={loading}>
							<div
								style={{
									border: '1px solid #f0f0f0',
									borderRadius: 8,
									padding: 16,
									background: '#ffffff',
								}}
							>
								<div style={{ padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
									<b>• 生产集群负载均衡</b>
								</div>
								<div style={{ padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
									<b>• 自动化部署监控</b>
								</div>
								<div style={{ padding: '8px 0' }}>
									<b>• 链路追踪与告警</b>
								</div>
							</div>
						</ShimmerSkeleton>
					</div>
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
