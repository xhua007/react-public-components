import React, { useState, useRef, CSSProperties } from 'react';
import './index.less';

export interface DualRangeSliderProps {
	/** 最小值，默认为 0 */
	min?: number;
	/** 最大值，默认为 100 */
	max?: number;
	/** 步长，默认为 1 */
	step?: number;
	/** 当前区间值 [minVal, maxVal]（受控） */
	value?: [number, number];
	/** 默认区间值 */
	defaultValue?: [number, number];
	/** 改变回调 */
	onChange?: (val: [number, number]) => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
	min = 0,
	max = 100,
	value: controlledVal,
	defaultValue = [20, 80],
	onChange,
	className = '',
	style,
}) => {
	const [internalVal, setInternalVal] = useState<[number, number]>(defaultValue);
	const rangeVal = controlledVal !== undefined ? controlledVal : internalVal;

	const trackRef = useRef<HTMLDivElement>(null);
	const activeThumbRef = useRef<'left' | 'right' | null>(null);

	const updateVal = (val: [number, number]) => {
		if (controlledVal === undefined) setInternalVal(val);
		onChange?.(val);
	};

	const handleThumbMouseDown = (thumb: 'left' | 'right') => {
		activeThumbRef.current = thumb;

		const handleMouseMove = (e: MouseEvent) => {
			if (!activeThumbRef.current || !trackRef.current) return;
			const rect = trackRef.current.getBoundingClientRect();
			const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
			const currentNum = Math.round(min + ratio * (max - min));

			if (activeThumbRef.current === 'left') {
				const clamped = Math.min(currentNum, rangeVal[1]);
				updateVal([clamped, rangeVal[1]]);
			} else {
				const clamped = Math.max(currentNum, rangeVal[0]);
				updateVal([rangeVal[0], clamped]);
			}
		};

		const handleMouseUp = () => {
			activeThumbRef.current = null;
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const leftPct = ((rangeVal[0] - min) / (max - min)) * 100;
	const rightPct = ((rangeVal[1] - min) / (max - min)) * 100;

	return (
		<div className={`rpc_dual_slider ${className}`} style={style}>
			<div ref={trackRef} className="rpc_dual_slider_track">
				<div
					className="rpc_dual_slider_highlight"
					style={{
						left: `${leftPct}%`,
						width: `${rightPct - leftPct}%`,
					}}
				/>

				<div
					className="rpc_dual_slider_thumb"
					style={{ left: `${leftPct}%` }}
					onMouseDown={() => handleThumbMouseDown('left')}
				/>

				<div
					className="rpc_dual_slider_thumb"
					style={{ left: `${rightPct}%` }}
					onMouseDown={() => handleThumbMouseDown('right')}
				/>
			</div>
		</div>
	);
};

export default DualRangeSlider;
