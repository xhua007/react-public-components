import { useState } from 'react';
import PeriodSelect, { PeriodSelectOption } from '../../../PeriodSelect';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function PeriodSelectDemo() {
	const [activePeriod, setActivePeriod] = useState<string>('week');
	const [customPeriod, setCustomPeriod] = useState<string>('day');
	const [colorPeriod, setColorPeriod] = useState<string>('quarter');

	const customOptions: PeriodSelectOption<string>[] = [
		{ label: '日维度', value: 'day' },
		{ label: '周维度', value: 'week' },
		{ label: '月维度', value: 'month' },
		{ label: '年维度', value: 'year' },
	];

	const disabledOptions: PeriodSelectOption<string>[] = [
		{ label: '周度', value: 'week' },
		{ label: '月度', value: 'month' },
		{ label: '季度', value: 'quarter', disabled: true },
		{ label: '年度', value: 'year' },
	];

	const usageCode = `import { useState } from 'react';
import { PeriodSelect } from 'react-public-components';

export default function App() {
  const [period, setPeriod] = useState('week');

  return (
    <div>
      {/* 1. 默认基础用法（内置周度/月度/季度/年度） */}
      <PeriodSelect
        value={period}
        onChange={(val) => setPeriod(val)}
      />

      {/* 2. 自定义主题色与尺寸 */}
      <PeriodSelect
        size="large"
        activeColor="#52c41a"
        defaultValue="month"
      />

      {/* 3. 自定义选项列表 */}
      <PeriodSelect
        options={[
          { label: '日维度', value: 'day' },
          { label: '周维度', value: 'week' },
          { label: '月维度', value: 'month' },
        ]}
      />
    </div>
  );
}`;

	const apiData: ApiPropItem[] = [
		{
			name: 'options',
			desc: '选项列表，每项包含 label, value, disabled。默认内置【周度、月度、季度、年度】',
			type: 'PeriodSelectOption[]',
			default: 'DEFAULT_PERIOD_OPTIONS',
		},
		{
			name: 'value',
			desc: '当前选中的值（受控模式）',
			type: 'string | number',
			default: '-',
		},
		{
			name: 'defaultValue',
			desc: '默认选中的值（非受控模式）',
			type: 'string | number',
			default: "options[0]?.value (默认 'week')",
		},
		{
			name: 'onChange',
			desc: '切换选中项时的回调函数，回传当前选中值与 option 项',
			type: '(value, option) => void',
			default: '-',
		},
		{
			name: 'size',
			desc: '组件尺寸，可选 small | middle | large',
			type: "'small' | 'middle' | 'large'",
			default: "'middle'",
		},
		{
			name: 'activeColor',
			desc: '自定义激活时的高亮颜色（包括激活文字颜色与选中项左侧高亮竖线）',
			type: 'string',
			default: "'#1677ff'",
		},
		{
			name: 'disabled',
			desc: '是否整体禁用',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'block',
			desc: '是否让选项等宽并撑满父容器宽度',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'className',
			desc: '自定义容器类名',
			type: 'string',
			default: '-',
		},
		{
			name: 'style',
			desc: '自定义行内样式',
			type: 'CSSProperties',
			default: '-',
		},
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 基础用法 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 基础用法（默认周度 / 月度 / 季度 / 年度，精准还原视觉高亮竖线）
				</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
						<PeriodSelect value={activePeriod} onChange={(val) => setActivePeriod(val)} />
						<span style={{ fontSize: 13, color: '#666' }}>
							当前选中：
							<strong style={{ color: '#1677ff', marginLeft: 4 }}>{activePeriod}</strong>
						</span>
					</div>
					<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
						<span style={{ fontSize: 12, color: '#888' }}>快速切换演示：</span>
						{['week', 'month', 'quarter', 'year'].map((p) => (
							<button
								key={p}
								type="button"
								style={{
									padding: '2px 8px',
									fontSize: 12,
									cursor: 'pointer',
									borderRadius: 4,
									border: '1px solid #d9d9d9',
									background: activePeriod === p ? '#e6f4ff' : '#fff',
									color: activePeriod === p ? '#1677ff' : '#333',
								}}
								onClick={() => setActivePeriod(p)}
							>
								切到 {p}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* 2. 多尺寸规格 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 三种尺寸规格 (Small / Middle / Large)</h3>
				<div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
						<span style={{ fontSize: 12, color: '#888' }}>Small (24px)</span>
						<PeriodSelect size="small" defaultValue="week" />
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
						<span style={{ fontSize: 12, color: '#888' }}>Middle (28px - 默认)</span>
						<PeriodSelect size="middle" defaultValue="quarter" />
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
						<span style={{ fontSize: 12, color: '#888' }}>Large (32px)</span>
						<PeriodSelect size="large" defaultValue="year" />
					</div>
				</div>
			</div>

			{/* 3. 自定义主题色与选项 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>3. 自定义主题色与自定义维度选项</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
						<PeriodSelect
							options={customOptions}
							value={customPeriod}
							onChange={(val) => setCustomPeriod(val)}
							activeColor="#722ed1"
						/>
						<span style={{ fontSize: 13, color: '#722ed1' }}>紫色主题色 / 自定义日周月年维度</span>
					</div>

					<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
						<PeriodSelect
							value={colorPeriod}
							onChange={(val) => setColorPeriod(val)}
							activeColor="#52c41a"
						/>
						<span style={{ fontSize: 13, color: '#52c41a' }}>绿色主题色</span>
					</div>
				</div>
			</div>

			{/* 4. 禁用状态 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>4. 单项禁用与全局禁用</h3>
				<div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
					<div>
						<div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>
							单项禁用（“季度”禁用）
						</div>
						<PeriodSelect options={disabledOptions} defaultValue="week" />
					</div>
					<div>
						<div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>整体组件禁用</div>
						<PeriodSelect disabled defaultValue="quarter" />
					</div>
				</div>
			</div>

			{/* 5. 块级撑满模式 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>5. 块级等宽撑满容器 (Block 模式)</h3>
				<div style={{ maxWidth: 460, padding: 16, background: '#fafafa', borderRadius: 8 }}>
					<PeriodSelect block defaultValue="month" />
				</div>
			</div>

			{/* 代码示例 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 680 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			{/* API 表格 */}
			<ApiTable data={apiData} />
		</div>
	);
}
