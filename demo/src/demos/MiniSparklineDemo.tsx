import MiniSparkline from '../../../MiniSparkline';

export default function MiniSparklineDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 单行微型趋势折线图（纯 SVG 贝塞尔曲线 + 渐变面积填充）
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 500 }}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#fafafa', borderRadius: 8 }}>
						<div>
							<div style={{ fontSize: 13, fontWeight: 600 }}>API 实时 QPS 吞吐量</div>
							<div style={{ fontSize: 12, color: '#8c8c8c' }}>峰值 14,200 req/s</div>
						</div>
						<MiniSparkline data={[12, 18, 14, 25, 22, 34, 40, 32, 45, 52]} color="#1677ff" width={100} height={32} />
					</div>

					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#fafafa', borderRadius: 8 }}>
						<div>
							<div style={{ fontSize: 13, fontWeight: 600 }}>集群平均 CPU 占用率</div>
							<div style={{ fontSize: 12, color: '#8c8c8c' }}>当前 34.2%</div>
						</div>
						<MiniSparkline data={[60, 55, 48, 42, 38, 35, 34, 32, 36, 34]} color="#52c41a" width={100} height={32} />
					</div>

					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#fafafa', borderRadius: 8 }}>
						<div>
							<div style={{ fontSize: 13, fontWeight: 600 }}>网络丢包与错误频次</div>
							<div style={{ fontSize: 12, color: '#8c8c8c' }}>异常激增告警</div>
						</div>
						<MiniSparkline data={[2, 1, 3, 2, 4, 8, 14, 22, 18, 35]} color="#ff4d4f" width={100} height={32} />
					</div>
				</div>
			</div>
		</div>
	);
}
