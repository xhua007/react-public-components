import { useState } from 'react';
import DualRangeSlider from '../../../DualRangeSlider';

export default function DualRangeSliderDemo() {
	const [range, setRange] = useState<[number, number]>([150, 680]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 双向双滑块区间选择器（价格/数值范围 + 防交叉碰撞）
				</h3>

				<div style={{ maxWidth: 460 }}>
					<DualRangeSlider
						min={0}
						max={1000}
						value={range}
						onChange={(val) => setRange(val)}
					/>

					<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 13, color: '#595959' }}>
						<span>当前筛选价格区间：</span>
						<b style={{ color: '#1677ff' }}>
							¥ {range[0]} ~ ¥ {range[1]}
						</b>
					</div>
				</div>
			</div>
		</div>
	);
}
