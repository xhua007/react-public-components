import React, { useState, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface TreeFilterNode {
	label: string;
	value: string | number;
	children?: TreeFilterNode[];
}

export interface TreeFilterPanelProps {
	/** 树形分类选项列表 */
	options: TreeFilterNode[];
	/** 当前选中的值数组（受控） */
	value?: (string | number)[];
	/** 默认选中的值数组 */
	defaultValue?: (string | number)[];
	/** 选中值变化回调 */
	onChange?: (values: (string | number)[]) => void;
	/** 是否支持多选，默认为 true */
	multiple?: boolean;
	/** 标题前缀，默认为 ['一级分类', '二级分类', '三级标签'] */
	levelLabels?: string[];
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const TreeFilterPanel: React.FC<TreeFilterPanelProps> = ({
	options = [],
	value: controlledValue,
	defaultValue = [],
	onChange,
	multiple = true,
	levelLabels = ['一级分类', '二级分类', '三级标签'],
	className = '',
	style,
}) => {
	const [internalVal, setInternalVal] = useState<(string | number)[]>(defaultValue);
	const selectedValues = controlledValue !== undefined ? controlledValue : internalVal;

	// 记录每一层当前激活选中的父节点
	const [activeLevel1, setActiveLevel1] = useState<string | number | null>(
		options[0]?.value || null,
	);

	const level1Option = options.find((opt) => opt.value === activeLevel1) || options[0];
	const level2Options = level1Option?.children || [];

	const [activeLevel2, setActiveLevel2] = useState<string | number | null>(
		level2Options[0]?.value || null,
	);

	const level2Option = level2Options.find((opt) => opt.value === activeLevel2) || level2Options[0];
	const level3Options = level2Option?.children || [];

	const handleSelect = (val: string | number) => {
		let next: (string | number)[];
		if (!multiple) {
			next = [val];
		} else {
			if (selectedValues.includes(val)) {
				next = selectedValues.filter((v) => v !== val);
			} else {
				next = [...selectedValues, val];
			}
		}

		if (controlledValue === undefined) setInternalVal(next);
		onChange?.(next);
	};

	const handleClear = () => {
		if (controlledValue === undefined) setInternalVal([]);
		onChange?.([]);
	};

	return (
		<div className={`rpc_tree_filter_panel ${className}`} style={style}>
			{/* 一级分类 */}
			{options.length > 0 && (
				<div className="rpc_tree_filter_panel_row">
					<div className="rpc_tree_filter_panel_label">{levelLabels[0] || '一级分类'}：</div>
					<div className="rpc_tree_filter_panel_options">
						{options.map((opt) => {
							const isSelected = selectedValues.includes(opt.value);
							const isCurrentActive = activeLevel1 === opt.value;

							return (
								<span
									key={opt.value}
									className={`rpc_tree_filter_panel_item ${
										isSelected || isCurrentActive ? 'rpc_tree_filter_panel_item_active' : ''
									}`}
									onClick={() => {
										setActiveLevel1(opt.value);
										if (opt.children && opt.children.length > 0) {
											setActiveLevel2(opt.children[0].value);
										}
										handleSelect(opt.value);
									}}
								>
									{opt.label}
								</span>
							);
						})}
					</div>
				</div>
			)}

			{/* 二级分类 */}
			{level2Options.length > 0 && (
				<div className="rpc_tree_filter_panel_row">
					<div className="rpc_tree_filter_panel_label">{levelLabels[1] || '二级分类'}：</div>
					<div className="rpc_tree_filter_panel_options">
						{level2Options.map((opt) => {
							const isSelected = selectedValues.includes(opt.value);
							const isCurrentActive = activeLevel2 === opt.value;

							return (
								<span
									key={opt.value}
									className={`rpc_tree_filter_panel_item ${
										isSelected || isCurrentActive ? 'rpc_tree_filter_panel_item_active' : ''
									}`}
									onClick={() => {
										setActiveLevel2(opt.value);
										handleSelect(opt.value);
									}}
								>
									{opt.label}
								</span>
							);
						})}
					</div>
				</div>
			)}

			{/* 三级标签 */}
			{level3Options.length > 0 && (
				<div className="rpc_tree_filter_panel_row">
					<div className="rpc_tree_filter_panel_label">{levelLabels[2] || '三级标签'}：</div>
					<div className="rpc_tree_filter_panel_options">
						{level3Options.map((opt) => {
							const isSelected = selectedValues.includes(opt.value);

							return (
								<span
									key={opt.value}
									className={`rpc_tree_filter_panel_item ${
										isSelected ? 'rpc_tree_filter_panel_item_active' : ''
									}`}
									onClick={() => handleSelect(opt.value)}
								>
									{opt.label}
								</span>
							);
						})}
					</div>
				</div>
			)}

			{/* 底部汇总与重置 */}
			<div className="rpc_tree_filter_panel_footer">
				<span>已选条件：{selectedValues.length} 项</span>
				{selectedValues.length > 0 && (
					<button
						type="button"
						className="rpc_tree_filter_panel_clear_btn"
						onClick={handleClear}
					>
						清空所有筛选
					</button>
				)}
			</div>
		</div>
	);
};

export default TreeFilterPanel;
