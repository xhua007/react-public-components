import React, { CSSProperties } from 'react';
import './index.less';

export interface FilterChipItem {
	id: string;
	label: string;
	value: string;
}

export interface FilterChipsProps {
	/** 筛选胶囊列表 */
	chips: FilterChipItem[];
	/** 单项删除回调 */
	onRemove?: (id: string) => void;
	/** 全部清空回调 */
	onClearAll?: () => void;
	/** 清空按钮文案，默认为 '清空筛选' */
	clearText?: string;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const FilterChips: React.FC<FilterChipsProps> = ({
	chips = [],
	onRemove,
	onClearAll,
	clearText = '清空筛选',
	className = '',
	style,
}) => {
	if (chips.length === 0) return null;

	return (
		<div className={`rpc_filter_chips ${className}`} style={style}>
			{chips.map((chip) => (
				<span key={chip.id} className="rpc_filter_chips_chip">
					<span className="rpc_filter_chips_label">{chip.label}:</span>
					<span className="rpc_filter_chips_val">{chip.value}</span>
					<span className="rpc_filter_chips_close" onClick={() => onRemove?.(chip.id)}>
						✕
					</span>
				</span>
			))}

			{onClearAll && (
				<button type="button" className="rpc_filter_chips_clear_all" onClick={onClearAll}>
					{clearText}
				</button>
			)}
		</div>
	);
};

export default FilterChips;
