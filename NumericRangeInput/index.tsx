import React, { useState, useEffect, ReactNode, CSSProperties } from 'react';
import './index.less';

export type RangeValue = [number | undefined, number | undefined];

export interface RangeShortcut {
	label: string;
	value: RangeValue;
}

export interface NumericRangeInputProps {
	/** 当前区间值 [min, max]（受控） */
	value?: RangeValue;
	/** 默认区间值 */
	defaultValue?: RangeValue;
	/** 区间改变回调 */
	onChange?: (range: RangeValue) => void;
	/** 允许输入的最小值 */
	min?: number;
	/** 允许输入的最大值 */
	max?: number;
	/** 步长，默认为 1 */
	step?: number;
	/** 精度小数位数 */
	precision?: number;
	/** 前缀标签（如 '¥'） */
	prefix?: ReactNode;
	/** 后缀标签（如 '元'） */
	suffix?: ReactNode;
	/** 连接分隔符，默认为 '~' */
	separator?: ReactNode;
	/** 快捷区间选项列表 */
	shortcuts?: RangeShortcut[];
	/** 是否禁用 */
	disabled?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const NumericRangeInput: React.FC<NumericRangeInputProps> = ({
	value: controlledValue,
	defaultValue = [undefined, undefined],
	onChange,
	min,
	max,
	step = 1,
	precision,
	prefix,
	suffix,
	separator = '~',
	shortcuts,
	disabled = false,
	className = '',
	style,
}) => {
	const [internalVal, setInternalVal] = useState<RangeValue>(defaultValue);
	const range = controlledValue !== undefined ? controlledValue : internalVal;

	const [isFocused, setIsFocused] = useState<boolean>(false);

	const isInvalid =
		range[0] !== undefined && range[1] !== undefined && range[0] > range[1];

	const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value === '' ? undefined : Number(e.target.value);
		const nextRange: RangeValue = [val, range[1]];
		if (controlledValue === undefined) setInternalVal(nextRange);
		onChange?.(nextRange);
	};

	const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value === '' ? undefined : Number(e.target.value);
		const nextRange: RangeValue = [range[0], val];
		if (controlledValue === undefined) setInternalVal(nextRange);
		onChange?.(nextRange);
	};

	const handleShortcutClick = (scVal: RangeValue) => {
		if (disabled) return;
		if (controlledValue === undefined) setInternalVal(scVal);
		onChange?.(scVal);
	};

	return (
		<div className={`rpc_numeric_range_input ${className}`} style={style}>
			<div
				className={`rpc_numeric_range_input_container ${
					isFocused ? 'rpc_numeric_range_input_container_focused' : ''
				} ${isInvalid ? 'rpc_numeric_range_input_container_error' : ''} ${
					disabled ? 'rpc_numeric_range_input_container_disabled' : ''
				}`}
			>
				{prefix && <span className="rpc_numeric_range_input_prefix">{prefix}</span>}

				<input
					type="number"
					value={range[0] !== undefined ? range[0] : ''}
					min={min}
					max={max}
					step={step}
					disabled={disabled}
					placeholder="最小值"
					className="rpc_numeric_range_input_input"
					onChange={handleStartChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>

				<span className="rpc_numeric_range_input_separator">{separator}</span>

				<input
					type="number"
					value={range[1] !== undefined ? range[1] : ''}
					min={min}
					max={max}
					step={step}
					disabled={disabled}
					placeholder="最大值"
					className="rpc_numeric_range_input_input"
					onChange={handleEndChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>

				{suffix && <span className="rpc_numeric_range_input_suffix">{suffix}</span>}
			</div>

			{/* 快捷区间预设 */}
			{shortcuts && shortcuts.length > 0 && (
				<div className="rpc_numeric_range_input_shortcuts">
					{shortcuts.map((sc, idx) => (
						<span
							key={idx}
							className="rpc_numeric_range_input_shortcut_item"
							onClick={() => handleShortcutClick(sc.value)}
						>
							{sc.label}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default NumericRangeInput;
