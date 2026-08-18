import { useState } from 'react';
import NumericRangeInput, { RangeValue } from '../../../NumericRangeInput';

export default function NumericRangeInputDemo() {
	const [priceRange, setPriceRange] = useState<RangeValue>([100, 500]);
	const [ageRange, setAgeRange] = useState<RangeValue>([undefined, undefined]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 电商商品价格区间筛选 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 商品价格区间输入（带货币前缀 ¥、单位后缀与快捷预设胶囊）
				</h3>
				<div style={{ maxWidth: 440 }}>
					<NumericRangeInput
						value={priceRange}
						onChange={(val) => setPriceRange(val)}
						prefix="¥"
						suffix="元"
						shortcuts={[
							{ label: '0-100元', value: [0, 100] },
							{ label: '100-500元', value: [100, 500] },
							{ label: '500-1000元', value: [500, 1000] },
							{ label: '1000元以上', value: [1000, undefined] },
						]}
					/>
				</div>
				<div style={{ marginTop: 8, fontSize: 13, color: '#595959' }}>
					当前选定区间：<code>{JSON.stringify(priceRange)}</code>
				</div>
			</div>

			{/* 2. 基础数值范围与错误校验 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 年龄/人数区间与错误标红</h3>
				<div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
					<NumericRangeInput
						value={ageRange}
						onChange={(val) => setAgeRange(val)}
						suffix="岁"
						min={0}
						max={120}
					/>

					<NumericRangeInput
						defaultValue={[50, 20]}
						suffix="人"
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					当最小值大于最大值时（如右侧 50 ~ 20），外边框自动高亮红色警告。
				</p>
			</div>
		</div>
	);
}
