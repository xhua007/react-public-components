import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import './index.less';

export interface NumberStepperProps {
	/** 当前数值（受控） */
	value?: number;
	/** 默认数值 */
	defaultValue?: number;
	/** 最小值，默认为 0 */
	min?: number;
	/** 最大值，默认为 100 */
	max?: number;
	/** 步长，默认为 1 */
	step?: number;
	/** 改变回调 */
	onChange?: (val: number) => void;
	/** 是否禁用 */
	disabled?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const NumberStepper: React.FC<NumberStepperProps> = ({
	value: controlledVal,
	defaultValue = 1,
	min = 0,
	max = 100,
	step = 1,
	onChange,
	disabled = false,
	className = '',
	style,
}) => {
	const [internalVal, setInternalVal] = useState<number>(defaultValue);
	const currentVal = controlledVal !== undefined ? controlledVal : internalVal;

	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const updateVal = (val: number) => {
		const clamped = Math.max(min, Math.min(max, val));
		if (controlledVal === undefined) setInternalVal(clamped);
		onChange?.(clamped);
	};

	const handleStep = (delta: number) => {
		if (disabled) return;
		updateVal(currentVal + delta);
	};

	const startLongPress = (delta: number) => {
		if (disabled) return;
		handleStep(delta);
		timerRef.current = setInterval(() => {
			handleStep(delta);
		}, 120);
	};

	const stopLongPress = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	};

	useEffect(() => {
		return () => stopLongPress();
	}, []);

	return (
		<div className={`rpc_num_stepper ${className}`} style={style}>
			<button
				type="button"
				disabled={disabled || currentVal <= min}
				className="rpc_num_stepper_btn"
				onMouseDown={() => startLongPress(-step)}
				onMouseUp={stopLongPress}
				onMouseLeave={stopLongPress}
			>
				-
			</button>

			<input
				type="number"
				value={currentVal}
				disabled={disabled}
				onChange={(e) => updateVal(Number(e.target.value))}
				className="rpc_num_stepper_input"
			/>

			<button
				type="button"
				disabled={disabled || currentVal >= max}
				className="rpc_num_stepper_btn"
				onMouseDown={() => startLongPress(step)}
				onMouseUp={stopLongPress}
				onMouseLeave={stopLongPress}
			>
				+
			</button>
		</div>
	);
};

export default NumberStepper;
