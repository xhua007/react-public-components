import { useState } from 'react';
import QuickDateRange from '../../../QuickDateRange';

export default function QuickDateRangeDemo() {
	const [range, setRange] = useState<[string, string]>(['2026-08-09', '2026-08-15']);
	const [activeKey, setActiveKey] = useState<string>('7days');

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
						当前筛选区间：<code style={{ color: '#1677ff', fontWeight: 600 }}>{range[0]} ~ {range[1]}</code>
					</div>
				</div>
			</div>
		</div>
	);
}
