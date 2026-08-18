import { useState } from 'react';
import ShimmerSkeleton from '../../../ShimmerSkeleton';

export default function ShimmerSkeletonDemo() {
	const [loading, setLoading] = useState<boolean>(true);

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
									极简、现代、零沉重第三方依赖的通用 React 组件库。
								</p>
							</div>
						</ShimmerSkeleton>
					</div>

					{/* 列表骨架 */}
					<div style={{ width: 320 }}>
						<ShimmerSkeleton type="list" rows={3} loading={loading}>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
								<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
									<div
										style={{
											width: 40,
											height: 40,
											borderRadius: '50%',
											background: '#52c41a',
											color: '#fff',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										A
									</div>
									<div>
										<div style={{ fontWeight: 500 }}>Alex Chen</div>
										<div style={{ fontSize: 12, color: '#8c8c8c' }}>主任前端架构师</div>
									</div>
								</div>
								<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
									<div
										style={{
											width: 40,
											height: 40,
											borderRadius: '50%',
											background: '#1677ff',
											color: '#fff',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										S
									</div>
									<div>
										<div style={{ fontWeight: 500 }}>Sarah Wang</div>
										<div style={{ fontSize: 12, color: '#8c8c8c' }}>高级 UX 设计师</div>
									</div>
								</div>
							</div>
						</ShimmerSkeleton>
					</div>
				</div>
			</div>
		</div>
	);
}
