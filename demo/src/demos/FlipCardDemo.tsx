import FlipCard from '../../../FlipCard';

export default function FlipCardDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 3D 正反面翻转卡片（鼠标悬停或点击触发 180° 平滑翻转）
				</h3>

				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					{/* 悬停水平翻转 */}
					<FlipCard
						width={280}
						height={180}
						trigger="hover"
						front={
							<div
								style={{
									width: '100%',
									height: '100%',
									boxSizing: 'border-box',
									background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
									color: '#ffffff',
									padding: 20,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									borderRadius: 12,
								}}
							>
								<div>
									<div style={{ fontSize: 12, opacity: 0.8 }}>FRONT CARD (正面)</div>
									<div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>
										企业服务集群 Node-01
									</div>
								</div>
								<div style={{ fontSize: 12 }}>👉 鼠标悬停查看背面详细指标</div>
							</div>
						}
						back={
							<div
								style={{
									width: '100%',
									height: '100%',
									boxSizing: 'border-box',
									background: '#1f1f1f',
									color: '#52c41a',
									padding: 20,
									fontFamily: 'monospace',
									fontSize: 13,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									gap: 6,
									borderRadius: 12,
								}}
							>
								<div>IP: 192.168.1.108</div>
								<div>CPU: 18.5% (4 Cores)</div>
								<div>Memory: 4.2GB / 16GB</div>
								<div>Status: HEALTHY (99.99%)</div>
							</div>
						}
					/>

					{/* 点击垂直翻转 */}
					<FlipCard
						width={280}
						height={180}
						trigger="click"
						direction="vertical"
						front={
							<div
								style={{
									width: '100%',
									height: '100%',
									boxSizing: 'border-box',
									background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
									color: '#ffffff',
									padding: 20,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									borderRadius: 12,
								}}
							>
								<div>
									<div style={{ fontSize: 12, opacity: 0.8 }}>CLICK TO FLIP</div>
									<div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>
										兑换券礼包卡
									</div>
								</div>
								<div style={{ fontSize: 12 }}>👆 点击垂直翻转至背面</div>
							</div>
						}
						back={
							<div
								style={{
									width: '100%',
									height: '100%',
									boxSizing: 'border-box',
									background: '#ffffff',
									border: '1px solid #e8e8e8',
									borderRadius: 12,
									color: '#262626',
									padding: 20,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
								}}
							>
								<div style={{ fontSize: 28, marginBottom: 4 }}>🎁</div>
								<div style={{ fontSize: 14, fontWeight: 600 }}>VIP-PRO-2026</div>
								<div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
									长按或截图保存兑换码
								</div>
							</div>
						}
					/>
				</div>
			</div>
		</div>
	);
}
