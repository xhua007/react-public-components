import TrendIndicator from '../../../TrendIndicator';

export default function TrendIndicatorDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 微型 KPI 趋势升降胶囊（自动根据正负值判断涨跌 + 填充/线框/纯文字模式）
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 6 }}>
							填充色块模式（Filled）
						</div>
						<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
							<TrendIndicator value={14.8} />
							<TrendIndicator value={-6.2} />
							<TrendIndicator value={0} />
						</div>
					</div>

					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 6 }}>
							线框模式（Outlined）
						</div>
						<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
							<TrendIndicator value={28.5} type="outlined" />
							<TrendIndicator value={-12.0} type="outlined" />
							<TrendIndicator value={0} type="outlined" />
						</div>
					</div>

					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 6 }}>
							反转色彩规则（如服务器延时/错误率降低为绿色）
						</div>
						<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
							<TrendIndicator value={-35.4} suffix="ms" prefix="延时 " reverse />
							<TrendIndicator value={12.0} suffix="ms" prefix="延时 " reverse />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
