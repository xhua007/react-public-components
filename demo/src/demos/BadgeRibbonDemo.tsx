import BadgeRibbon from '../../../BadgeRibbon';

export default function BadgeRibbonDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 卡片斜角丝带 / 推荐促销缎带角标
				</h3>

				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					{/* 右上角 HOT 缎带 */}
					<BadgeRibbon text="HOT 爆款" color="#ff4d4f">
						<div
							style={{
								width: 240,
								padding: 20,
								background: '#ffffff',
								border: '1px solid #f0f0f0',
								borderRadius: 8,
							}}
						>
							<div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
								专业企业版 (Pro)
							</div>
							<div style={{ fontSize: 22, fontWeight: 700, color: '#ff4d4f', marginBottom: 12 }}>
								¥ 199 <span style={{ fontSize: 12, color: '#8c8c8c' }}>/月</span>
							</div>
							<p style={{ fontSize: 12, color: '#595959', margin: 0 }}>
								包含全部 40+ 款高阶组件、无限私有部署与全天候技术支持。
							</p>
						</div>
					</BadgeRibbon>

					{/* 左上角 NEW 渐变缎带 */}
					<BadgeRibbon
						text="公测中"
						placement="start"
						color="linear-gradient(135deg, #1677ff 0%, #722ed1 100%)"
					>
						<div
							style={{
								width: 240,
								padding: 20,
								background: '#ffffff',
								border: '1px solid #f0f0f0',
								borderRadius: 8,
							}}
						>
							<div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
								AI 智能研发助手
							</div>
							<div style={{ fontSize: 22, fontWeight: 700, color: '#1677ff', marginBottom: 12 }}>
								免费开放
							</div>
							<p style={{ fontSize: 12, color: '#595959', margin: 0 }}>
								一键生成高质量业务组件代码，支持深度定制与自动测试。
							</p>
						</div>
					</BadgeRibbon>
				</div>
			</div>
		</div>
	);
}
