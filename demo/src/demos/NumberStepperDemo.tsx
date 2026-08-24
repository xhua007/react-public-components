import { useState } from 'react';
import NumberStepper from '../../../NumberStepper';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function NumberStepperDemo() {
	const [val, setVal] = useState<number>(5);

	const usageCode = `import { useState } from 'react';
import { NumberStepper } from 'react-public-components';

export default function App() {
  const [count, setCount] = useState(1);

  return (
    <NumberStepper
      value={count}
      min={1}
      max={99}
      step={1}
      onChange={(v) => setCount(v)}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'value', desc: '当前数值（受控）', type: 'number', default: '-' },
		{ name: 'defaultValue', desc: '默认数值', type: 'number', default: '1' },
		{ name: 'min', desc: '允许输入的最小值', type: 'number', default: '0' },
		{ name: 'max', desc: '允许输入的最大值', type: 'number', default: '100' },
		{ name: 'step', desc: '单次步进增量', type: 'number', default: '1' },
		{ name: 'onChange', desc: '数值改变时的回调函数', type: '(val: number) => void', default: '-' },
		{ name: 'disabled', desc: '是否禁用步进器', type: 'boolean', default: 'false' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 高性能平滑数字加减步进器（支持长按持续快速步进 + 上下限保护）
				</h3>

				<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
					<NumberStepper value={val} min={1} max={50} step={1} onChange={(v) => setVal(v)} />

					<div style={{ fontSize: 13, color: '#595959' }}>
						当前值：<b style={{ color: '#1677ff' }}>{val}</b> (可按住 + 或 - 体验长按极速步进)
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
