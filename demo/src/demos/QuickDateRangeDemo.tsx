import { useState } from 'react';
import QuickDateRange from '../../../QuickDateRange';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function QuickDateRangeDemo() {
	const [range, setRange] = useState<[string, string]>(['2026-08-09', '2026-08-15']);
	const [activeKey, setActiveKey] = useState<string>('7days');

	const usageCode = `import { useState } from 'react';
import { QuickDateRange } from 'react-public-components';

export default function App() {
  const [range, setRange] = useState<[string, string]>(['', '']);

  return (
    <QuickDateRange
      defaultKey="7days"
      onChange={(dateRange, key) => {
        setRange(dateRange);
        console.log('选定区间:', dateRange, 'Key:', key);
      }}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'activeKey', desc: '当前选中的快捷项 key（受控）', type: 'string', default: '-' },
		{
			name: 'defaultKey',
			desc: "默认选中的快捷项 key（如 'today' | 'yesterday' | '7days' | '30days' | 'thisMonth' | 'lastMonth'）",
			type: 'string',
			default: "'7days'",
		},
		{
			name: 'onChange',
			desc: '点击切换日期快捷胶囊时的回调函数，回传 [startDate, endDate] 与 key',
			type: '(dateRange: [string, string], key: string) => void',
			default: '-',
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 快捷日期区间筛选胶囊条（今日/昨日/近7天/近30天/本月联动）
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
					<QuickDateRange
						activeKey={activeKey}
						onChange={(newRange, key) => {
							setRange(newRange);
							setActiveKey(key);
						}}
					/>

					<div style={{ fontSize: 13, color: '#595959' }}>
						当前筛选区间：
						<code style={{ color: '#1677ff', fontWeight: 600 }}>
							{range[0]} ~ {range[1]}
						</code>
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
