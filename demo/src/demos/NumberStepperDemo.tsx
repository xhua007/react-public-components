import { useState } from 'react';
import NumberStepper from '../../../NumberStepper';

export default function NumberStepperDemo() {
	const [val, setVal] = useState<number>(5);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 高性能平滑数字加减步进器（支持长按持续快速步进 + 上下限保护）
				</h3>

				<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
					<NumberStepper
						value={val}
						min={1}
						max={50}
						step={1}
						onChange={(v) => setVal(v)}
					/>

					<div style={{ fontSize: 13, color: '#595959' }}>
						当前值：<b style={{ color: '#1677ff' }}>{val}</b> (可按住 + 或 - 体验长按极速步进)
					</div>
				</div>
			</div>
		</div>
	);
}
