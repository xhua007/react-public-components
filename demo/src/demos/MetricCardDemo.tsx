import MetricCard from '../../../MetricCard';

export default function MetricCardDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 中后台 KPI 指标大盘卡片（平滑数字跳动 + 环比趋势箭头 + 迷你微折线 Sparkline）
				</h3>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
						gap: 16,
						maxWidth: 800,
					}}
				>
					{/* 卡片 1: 营收 */}
					<MetricCard
						title="本月累计总营收"
						value={1289600}
						prefix="¥"
						trend="up"
						trendValue="+24.8%"
						trendLabel="较上月"
						chartData={[30, 45, 40, 65, 58, 80, 92]}
						chartColor="#1677ff"
						footer="日均销售额：¥42,980"
					/>

					{/* 卡片 2: 活跃用户 */}
					<MetricCard
						title="平台活跃用户数 (MAU)"
						value={89420}
						suffix="人"
						trend="up"
						trendValue="+12.3%"
						chartData={[60, 68, 64, 75, 82, 89]}
						chartColor="#52c41a"
						footer="昨日新增注册用户 1,280 人"
					/>

					{/* 卡片 3: 异常报错率 */}
					<MetricCard
						title="API 请求错误率"
						value={0.08}
						suffix="%"
						trend="down"
						trendValue="-0.04%"
						chartData={[0.18, 0.15, 0.16, 0.12, 0.10, 0.08]}
						chartColor="#ff4d4f"
						footer="SLA 服务可用性保持在 99.98%"
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					内置高质量 SVG Sparkline 微折线图与 CountUp 数字平滑跳动，专为 Dashboard 看板设计。
				</p>
			</div>
		</div>
	);
}
