import { useState } from 'react';
import NumericRangeInput, { RangeValue } from '../../../NumericRangeInput';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function NumericRangeInputDemo() {
	const [priceRange, setPriceRange] = useState<RangeValue>([100, 500]);
	const [ageRange, setAgeRange] = useState<RangeValue>([undefined, undefined]);

	const usageCode = `import { useState } from 'react';
import { NumericRangeInput } from 'react-public-components';

export default function App() {
  const [range, setRange] = useState<[number | undefined, number | undefined]>([100, 500]);

  return (
    <NumericRangeInput
      value={range}
      onChange={(val) => setRange(val)}
      prefix="¥"
      suffix="元"
      shortcuts={[
        { label: '0-100元', value: [0, 100] },
        { label: '100-500元', value: [100, 500] },
      ]}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'value', desc: '当前区间值 [min, max]（受控）', type: '[number | undefined, number | undefined]', default: '-' },
		{ name: 'defaultValue', desc: '默认区间值', type: '[number | undefined, number | undefined]', default: '[undefined, undefined]' },
		{ name: 'onChange', desc: '区间数值改变时的回调函数', type: '(range: RangeValue) => void', default: '-' },
		{ name: 'min', desc: '允许输入的最小值限制', type: 'number', default: '-' },
		{ name: 'max', desc: '允许输入的最大值限制', type: 'number', default: '-' },
		{ name: 'step', desc: '步长', type: 'number', default: '1' },
		{ name: 'precision', desc: '精度小数位数', type: 'number', default: '-' },
		{ name: 'prefix', desc: '前缀装饰节点（如 ¥）', type: 'ReactNode', default: '-' },
		{ name: 'suffix', desc: '后缀单位节点（如 元、岁、人）', type: 'ReactNode', default: '-' },
		{ name: 'separator', desc: '连接分隔符', type: 'ReactNode', default: "'~'" },
		{ name: 'shortcuts', desc: '快捷区间预设胶囊列表', type: 'RangeShortcut[]', default: '-' },
		{ name: 'disabled', desc: '是否禁用输入', type: 'boolean', default: 'false' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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

					<NumericRangeInput defaultValue={[50, 20]} suffix="人" />
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					当最小值大于最大值时（如右侧 50 ~ 20），外边框自动高亮红色警告。
				</p>
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
