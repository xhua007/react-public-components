import { useState } from 'react';
import DualRangeSlider from '../../../DualRangeSlider';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function DualRangeSliderDemo() {
	const [range, setRange] = useState<[number, number]>([150, 680]);

	const usageCode = `import { useState } from 'react';
import { DualRangeSlider } from 'react-public-components';

export default function App() {
  const [range, setRange] = useState<[number, number]>([100, 500]);

  return (
    <DualRangeSlider
      min={0}
      max={1000}
      step={10}
      value={range}
      onChange={(val) => setRange(val)}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{
			name: 'value',
			desc: '当前双向区间值 [minVal, maxVal]（受控）',
			type: '[number, number]',
			default: '-',
		},
		{ name: 'defaultValue', desc: '默认区间值', type: '[number, number]', default: '[20, 80]' },
		{ name: 'min', desc: '允许选择的最小值', type: 'number', default: '0' },
		{ name: 'max', desc: '允许选择的最大值', type: 'number', default: '100' },
		{ name: 'step', desc: '滑动步长', type: 'number', default: '1' },
		{
			name: 'onChange',
			desc: '区间滑动改变时的回调函数',
			type: '(val: [number, number]) => void',
			default: '-',
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 双向双滑块区间选择器（价格/数值范围 + 防交叉碰撞）
				</h3>

				<div style={{ maxWidth: 460 }}>
					<DualRangeSlider min={0} max={1000} value={range} onChange={(val) => setRange(val)} />

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: 12,
							fontSize: 13,
							color: '#595959',
						}}
					>
						<span>当前筛选价格区间：</span>
						<b style={{ color: '#1677ff' }}>
							¥ {range[0]} ~ ¥ {range[1]}
						</b>
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
