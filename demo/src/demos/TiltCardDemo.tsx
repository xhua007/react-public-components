import TiltCard from '../../../TiltCard';

export default function TiltCardDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 3D 视差物理倾斜卡片（鼠标在卡片上方移动体验 3D 景深与流光高光）
				</h3>

				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					{/* 会员卡片 */}
					<TiltCard
						maxAngle={18}
						style={{
							width: 320,
							height: 190,
							background: 'linear-gradient(135deg, #1f1f1f 0%, #141414 100%)',
							borderRadius: 16,
							border: '1px solid #333333',
							color: '#ffffff',
						}}
					>
						<div
							style={{
								padding: 24,
								height: '100%',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>BLACK CARD</span>
								<span style={{ fontSize: 20 }}>💎</span>
							</div>

							<div style={{ fontSize: 18, fontFamily: 'monospace', letterSpacing: 2 }}>
								8888 •••• •••• 2026
							</div>

							<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8c8c8c' }}>
								<span>CARDHOLDER: ALEX CHEN</span>
								<span>EXP: 12/28</span>
							</div>
						</div>
					</TiltCard>

					{/* 科技产品卡片 */}
					<TiltCard
						maxAngle={14}
						style={{
							width: 320,
							height: 190,
							background: 'linear-gradient(135deg, #1677ff 0%, #722ed1 100%)',
							borderRadius: 16,
							color: '#ffffff',
						}}
					>
						<div
							style={{
								padding: 24,
								height: '100%',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							<div>
								<div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>CLOUD PLATFORM</div>
								<div style={{ fontSize: 18, fontWeight: 600 }}>Enterprise Pro Tier</div>
							</div>

							<p style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
								全天候 99.99% SLA 保证，支持多地域负载均衡与无限带宽。
							</p>

							<div style={{ fontSize: 12, fontWeight: 600 }}>即刻开启体验 →</div>
						</div>
					</TiltCard>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					基于纯 CSS 3D 透视矩阵与鼠标坐标插值，表面带有逼真的动态光源反光（Glare）。
				</p>
			</div>
		</div>
	);
}
