import Marquee from '../../../Marquee';

const clientLogos = [
	{ name: 'Google Cloud', emoji: '☁️' },
	{ name: 'Vercel Platform', emoji: '▲' },
	{ name: 'Next.js 15', emoji: '⚡' },
	{ name: 'TypeScript', emoji: '🔷' },
	{ name: 'Tailwind CSS', emoji: '🎨' },
	{ name: 'Ant Design', emoji: '🐜' },
	{ name: 'GitHub Copilot', emoji: '🤖' },
];

export default function MarqueeDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 客户 Logo 墙无缝平滑横向滚动 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 合作伙伴 Logo 墙（硬件加速无缝横向流动 + 悬停暂停 + 边缘渐变羽化）
				</h3>
				<div
					style={{
						background: '#fafafa',
						border: '1px solid #f0f0f0',
						borderRadius: 12,
						padding: '24px 0',
						maxWidth: 680,
					}}
				>
					<Marquee speed={45} gradient gradientColor="#fafafa" pauseOnHover>
						{clientLogos.map((item, idx) => (
							<div
								key={idx}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 8,
									padding: '8px 18px',
									background: '#ffffff',
									border: '1px solid #e8e8e8',
									borderRadius: 8,
									boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
									fontSize: 14,
									fontWeight: 500,
									color: '#262626',
								}}
							>
								<span style={{ fontSize: 18 }}>{item.emoji}</span>
								<span>{item.name}</span>
							</div>
						))}
					</Marquee>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					鼠标移入上方 Logo 墙可自动暂停；左右两侧自带自然平滑的边缘淡化渐变遮罩。
				</p>
			</div>

			{/* 2. 反向滚动与广播条 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 广播通知条（反向流动 direction="right"）</h3>
				<div
					style={{
						background: '#fffbe6',
						border: '1px solid #ffe58f',
						borderRadius: 6,
						padding: '8px 0',
						maxWidth: 680,
						color: '#d46b08',
						fontSize: 13,
					}}
				>
					<Marquee direction="right" speed={35} gap={40}>
						<span>🔥 [重要公告] 系统将于本周日凌晨 02:00 进行核心数据库升级</span>
						<span>🚀 欢迎体验全新上线的 10+ 款现代化业务高阶公共组件</span>
						<span>💡 支持零第三方大型 UI 依赖快速集成</span>
					</Marquee>
				</div>
			</div>
		</div>
	);
}
