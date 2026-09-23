import MetricCard from '../../../MetricCard';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function MetricCardDemo() {
	const usageCode = `import { MetricCard } from 'react-public-components';

export default function App() {
  return (
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
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'title', desc: '指标卡片标题', type: 'ReactNode', required: true },
		{
			name: 'value',
			desc: '核心指标数值（数字自动平滑滚动跳跃，支持字符串）',
			type: 'number | string',
			required: true,
		},
		{ name: 'prefix', desc: '数值前缀单位（如 ¥）', type: 'ReactNode', default: '-' },
		{ name: 'suffix', desc: '数值后缀单位（如 人、%）', type: 'ReactNode', default: '-' },
		{
			name: 'trend',
			desc: "环比趋势方向：'up' 上升（绿） / 'down' 下降（红）",
			type: "'up' | 'down'",
			default: '-',
		},
		{ name: 'trendValue', desc: '趋势数值标签（如 +18.5%）', type: 'ReactNode', default: '-' },
		{ name: 'trendLabel', desc: '趋势对比说明文本（如 较上月）', type: 'ReactNode', default: '-' },
		{
			name: 'chartData',
			desc: '底部迷你 Sparkline 折线图数据数值数组',
			type: 'number[]',
			default: '-',
		},
		{ name: 'chartColor', desc: '微折线图主题颜色', type: 'string', default: "'#1677ff'" },
		{ name: 'footer', desc: '底部说明文本或自定义节点', type: 'ReactNode', default: '-' },
		{ name: 'extra', desc: '卡片右上角额外操作区节点', type: 'ReactNode', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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
						chartData={[0.18, 0.15, 0.16, 0.12, 0.1, 0.08]}
						chartColor="#ff4d4f"
						footer="SLA 服务可用性保持在 99.98%"
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					内置高质量 SVG Sparkline 微折线图与 CountUp 数字平滑跳动，专为 Dashboard 看板设计。
				</p>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 800 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
