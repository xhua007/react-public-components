import TrendIndicator from '../../../TrendIndicator';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function TrendIndicatorDemo() {
	const usageCode = `import { TrendIndicator } from 'react-public-components';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {/* 默认填充色块 */}
      <TrendIndicator value={18.5} />
      <TrendIndicator value={-5.2} />

      {/* 线框模式 */}
      <TrendIndicator value={32.0} type="outlined" />

      {/* 反转红绿色彩（如成本/延时降低为绿） */}
      <TrendIndicator value={-45.2} suffix="ms" prefix="延时 " reverse />
    </div>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'value', desc: '变动数值（正数自动显示 + 并标绿，负数自动显示 - 并标红）', type: 'number', required: true },
		{ name: 'type', desc: "展示模式：'filled' 填充胶囊 / 'outlined' 描边 / 'text' 纯文字", type: "'filled' | 'outlined' | 'text'", default: "'filled'" },
		{ name: 'suffix', desc: '数值后缀单位', type: 'string', default: "'%'" },
		{ name: 'prefix', desc: '数值前缀说明', type: 'string', default: "''" },
		{ name: 'precision', desc: '保留小数位数', type: 'number', default: '1' },
		{ name: 'reverse', desc: '是否反转红绿色彩规则（如延时/错误率下降时判定为好）', type: 'boolean', default: 'false' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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
