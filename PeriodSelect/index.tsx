import React, { useState, CSSProperties, ReactNode } from 'react';
import './index.less';

export interface PeriodSelectOption<T = string | number> {
	/** 选项展示内容 */
	label: ReactNode;
	/** 选项值 */
	value: T;
	/** 是否禁用当前选项 */
	disabled?: boolean;
}

export type PeriodSelectSize = 'small' | 'middle' | 'large';

export interface PeriodSelectProps<T = string | number> {
	/** 选项列表，默认提供【周度、月度、季度、年度】 */
	options?: PeriodSelectOption<T>[];
	/** 当前选中值（受控模式） */
	value?: T;
	/** 默认选中值（非受控模式） */
	defaultValue?: T;
	/** 切换选项时的回调函数 */
	onChange?: (value: T, option: PeriodSelectOption<T>) => void;
	/** 尺寸大小，默认为 'middle' */
	size?: PeriodSelectSize;
	/** 自定义高亮激活颜色（文字与高亮竖线） */
	activeColor?: string;
	/** 是否整体禁用 */
	disabled?: boolean;
	/** 是否等宽撑满父容器 */
	block?: boolean;
	/** 自定义容器类名 */
	className?: string;
	/** 自定义容器样式 */
	style?: CSSProperties;
}

// 默认内置的周期选项（精准匹配周度、月度、季度、年度）
export const DEFAULT_PERIOD_OPTIONS: PeriodSelectOption<string>[] = [
	{ label: '周度', value: 'week' },
	{ label: '月度', value: 'month' },
	{ label: '季度', value: 'quarter' },
	{ label: '年度', value: 'year' },
];

export function PeriodSelect<T = string | number>({
	options = DEFAULT_PERIOD_OPTIONS as unknown as PeriodSelectOption<T>[],
	value: controlledValue,
	defaultValue,
	onChange,
	size = 'middle',
	activeColor,
	disabled = false,
	block = false,
	className = '',
	style,
}: PeriodSelectProps<T>) {
	const initialValue =
		defaultValue !== undefined ? defaultValue : (options[0]?.value as T);
	const [internalValue, setInternalValue] = useState<T>(initialValue);

	const currentValue =
		controlledValue !== undefined ? controlledValue : internalValue;

	const handleSelect = (item: PeriodSelectOption<T>) => {
		if (disabled || item.disabled) return;
		if (controlledValue === undefined) {
			setInternalValue(item.value);
		}
		onChange?.(item.value, item);
	};

	const containerClass = [
		'rpc_period_select',
		`rpc_period_select_${size}`,
		disabled ? 'rpc_period_select_disabled' : '',
		block ? 'rpc_period_select_block' : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div
			className={containerClass}
			style={
				{
					...style,
					...(activeColor ? { '--rpc-period-active-color': activeColor } : {}),
				} as CSSProperties
			}
		>
			{options.map((item, index) => {
				const isActive = currentValue === item.value;
				const isItemDisabled = disabled || Boolean(item.disabled);

				// 判断是否需要在当前选项左侧展示蓝色高亮竖线
				// 精确还原截图：当激活项不是第一项时，其左侧显示一条与主题色一致的竖线
				const showActiveLine = isActive && index > 0;

				const itemClass = [
					'rpc_period_select_item',
					isActive ? 'rpc_period_select_item_active' : '',
					showActiveLine ? 'rpc_period_select_item_has_active_line' : '',
					isItemDisabled ? 'rpc_period_select_item_disabled' : '',
				]
					.filter(Boolean)
					.join(' ');

				return (
					<div
						key={String(item.value)}
						className={itemClass}
						onClick={() => handleSelect(item)}
					>
						{showActiveLine && <span className="rpc_period_select_active_line" />}
						<span className="rpc_period_select_text">{item.label}</span>
					</div>
				);
			})}
		</div>
	);
}

export default PeriodSelect;
