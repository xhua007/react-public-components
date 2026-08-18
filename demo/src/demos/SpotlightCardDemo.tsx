import SpotlightCard from '../../../SpotlightCard';

export default function SpotlightCardDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 浅色模式聚光灯卡片 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 鼠标聚光灯追踪卡片（鼠标在卡片上移动查看光晕跟随）
				</h3>
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 680 }}>
					<SpotlightCard spotlightColor="rgba(22, 119, 255, 0.12)">
						<div style={{ padding: 24 }}>
							<div style={{ fontSize: 24, marginBottom: 8 }}>⚡</div>
							<h4 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#1f1f1f' }}>
								高性能流式渲染
							</h4>
							<p style={{ margin: 0, color: '#595959', fontSize: 13, lineHeight: 1.6 }}>
								基于现代前端架构打造，零多余重绘，极速响应海量数据交互。
							</p>
						</div>
					</SpotlightCard>

					<SpotlightCard spotlightColor="rgba(82, 196, 26, 0.14)">
						<div style={{ padding: 24 }}>
							<div style={{ fontSize: 24, marginBottom: 8 }}>🛡️</div>
							<h4 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#1f1f1f' }}>
								企业级安全合规
							</h4>
							<p style={{ margin: 0, color: '#595959', fontSize: 13, lineHeight: 1.6 }}>
								内置多重脱敏、鉴权与防攻击防护机制，确保敏感数据绝不外泄。
							</p>
						</div>
					</SpotlightCard>
				</div>
			</div>

			{/* 2. 暗色科技主题卡片 (Dark Mode) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 暗色极客科技主题 (dark=true)</h3>
				<div style={{ maxWidth: 680 }}>
					<SpotlightCard dark spotlightColor="rgba(114, 46, 209, 0.35)" spotlightSize={400}>
						<div style={{ padding: 28 }}>
							<div style={{ color: '#d3adf7', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
								FUTURE OF UI COMPONENTS
							</div>
							<h4 style={{ margin: '0 0 12px 0', fontSize: 20, color: '#ffffff' }}>
								下一代组件设计哲学
							</h4>
							<p style={{ margin: 0, color: '#a1a1aa', fontSize: 14, lineHeight: 1.7 }}>
								将极致的视觉美感与中后台实用业务逻辑深度融合。无论是光晕追踪、微交互动效还是无障碍键盘导航，皆开箱即用。
							</p>
						</div>
					</SpotlightCard>
				</div>
			</div>
		</div>
	);
}
