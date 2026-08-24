import MiniSparkline from '../../../MiniSparkline';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function MiniSparklineDemo() {
	const usageCode = `import { MiniSparkline } from 'react-public-components';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {/* 蓝色趋势 */}
      <MiniSparkline
        data={[12, 18, 14, 25, 22, 34, 40, 32, 45, 52]}
        color="#1677ff"
        width={100}
        height={32}
      />

      {/* 绿色平稳 */}
      <MiniSparkline
        data={[60, 55, 48, 42, 38, 35, 34, 32, 36, 34]}
        color="#52c41a"
        width={100}
        height={32}
      />
    </div>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'data', desc: '微折线数值序列数组', type: 'number[]', required: true },
		{ name: 'color', desc: '折线与下方填充渐变的主题颜色', type: 'string', default: "'#1677ff'" },
		{ name: 'fill', desc: '是否展示底部渐变面积填充', type: 'boolean', default: 'true' },
		{ name: 'width', desc: 'SVG 图表宽度（像素）', type: 'number', default: '80' },
		{ name: 'height', desc: 'SVG 图表高度（像素）', type: 'number', default: '28' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 单行微型趋势折线图（纯 SVG 贝塞尔曲线 + 渐变面积填充）
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 500 }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '10px 14px',
							background: '#fafafa',
							borderRadius: 8,
						}}
					>
						<div>
							<div style={{ fontSize: 13, fontWeight: 600 }}>API 实时 QPS 吞吐量</div>
							<div style={{ fontSize: 12, color: '#8c8c8c' }}>峰值 14,200 req/s</div>
						</div>
						<MiniSparkline
							data={[12, 18, 14, 25, 22, 34, 40, 32, 45, 52]}
							color="#1677ff"
							width={100}
							height={32}
						/>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '10px 14px',
							background: '#fafafa',
							borderRadius: 8,
						}}
					>
						<div>
							<div style={{ fontSize: 13, fontWeight: 600 }}>集群平均 CPU 占用率</div>
							<div style={{ fontSize: 12, color: '#8c8c8c' }}>当前 34.2%</div>
						</div>
						<MiniSparkline
							data={[60, 55, 48, 42, 38, 35, 34, 32, 36, 34]}
							color="#52c41a"
							width={100}
							height={32}
						/>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '10px 14px',
							background: '#fafafa',
							borderRadius: 8,
						}}
					>
						<div>
							<div style={{ fontSize: 13, fontWeight: 600 }}>网络丢包与错误频次</div>
							<div style={{ fontSize: 12, color: '#8c8c8c' }}>异常激增告警</div>
						</div>
						<MiniSparkline
							data={[2, 1, 3, 2, 4, 8, 14, 22, 18, 35]}
							color="#ff4d4f"
							width={100}
							height={32}
						/>
					</div>
				</div>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 640 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
