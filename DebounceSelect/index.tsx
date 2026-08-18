import React, { useState, useRef, useEffect, useMemo, ReactNode, CSSProperties } from 'react';
import { LoadingOutlined, SearchOutlined, CloseCircleFilled, DownOutlined, CheckOutlined } from '../src/icons';
import './index.less';

export interface SelectOption {
	label: ReactNode;
	value: string | number;
	disabled?: boolean;
	[key: string]: unknown;
}

export type SelectValue =
	| string
	| number
	| SelectOption
	| (string | number | SelectOption)[]
	| undefined;

export interface DebounceSelectProps {
	/** 异步拉取选项列表的函数 */
	fetchOptions: (search: string) => Promise<SelectOption[]>;
	/** 防抖等待时间（毫秒），默认为 300ms */
	debounceTimeout?: number;
	/** 选择模式：'single' 单选，'multiple' 多选（Tag标签形式） */
	mode?: 'single' | 'multiple';
	/** 当前选中值 */
	value?: SelectValue;
	/** 默认选中值 */
	defaultValue?: SelectValue;
	/** 选中值变化回调 */
	onChange?: (value: any, option?: SelectOption | SelectOption[]) => void;
	/** 输入框占位符 */
	placeholder?: string;
	/** 是否支持清空 */
	allowClear?: boolean;
	/** 是否禁用 */
	disabled?: boolean;
	/** 空数据时的展示内容 */
	notFoundContent?: ReactNode;
	/** 默认选项列表（搜索前展示） */
	defaultOptions?: SelectOption[];
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const DebounceSelect: React.FC<DebounceSelectProps> = ({
	fetchOptions,
	debounceTimeout = 300,
	mode = 'single',
	value: controlledValue,
	defaultValue,
	onChange,
	placeholder = '请输入搜索内容...',
	allowClear = true,
	disabled = false,
	notFoundContent = '暂无匹配数据',
	defaultOptions = [],
	className = '',
	style,
}) => {
	const [internalValue, setInternalValue] = useState<SelectValue>(
		defaultValue ?? (mode === 'multiple' ? [] : undefined),
	);

	const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

	const [options, setOptions] = useState<SelectOption[]>(defaultOptions);
	const [fetching, setFetching] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const fetchRef = useRef<number>(0);
	const debounceTimerRef = useRef<number | null>(null);

	// 解析格式化已选值，统一定位到数组格式
	const selectedList: SelectOption[] = useMemo(() => {
		if (currentValue === undefined || currentValue === null) return [];
		const rawArr = Array.isArray(currentValue) ? currentValue : [currentValue];
		return rawArr.map((item) => {
			if (typeof item === 'object' && item !== null && 'value' in item) {
				return item as SelectOption;
			}
			const matched = options.find((opt) => opt.value === item);
			return matched || { label: String(item), value: item as string | number };
		});
	}, [currentValue, options]);

	// 异步搜索逻辑（带时序竞态控制）
	const performSearch = (kw: string) => {
		fetchRef.current += 1;
		const fetchId = fetchRef.current;

		if (debounceTimerRef.current) {
			window.clearTimeout(debounceTimerRef.current);
		}

		debounceTimerRef.current = window.setTimeout(() => {
			setFetching(true);
			fetchOptions(kw)
				.then((newOptions) => {
					// 仅当当前请求是最新一次发起的请求时才更新 options
					if (fetchId === fetchRef.current) {
						setOptions(newOptions);
						setFetching(false);
					}
				})
				.catch(() => {
					if (fetchId === fetchRef.current) {
						setOptions([]);
						setFetching(false);
					}
				});
		}, debounceTimeout);
	};

	// 监听输入变化
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setSearchValue(val);
		if (!isOpen) setIsOpen(true);
		performSearch(val);
	};

	// 点击外部关闭弹窗
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			if (debounceTimerRef.current) {
				window.clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	// 选中项处理
	const handleSelectOption = (option: SelectOption) => {
		if (option.disabled) return;

		if (mode === 'single') {
			if (controlledValue === undefined) {
				setInternalValue(option.value);
			}
			onChange?.(option.value, option);
			setIsOpen(false);
			setSearchValue('');
		} else {
			const exists = selectedList.some((item) => item.value === option.value);
			let nextSelected: SelectOption[];
			if (exists) {
				nextSelected = selectedList.filter((item) => item.value !== option.value);
			} else {
				nextSelected = [...selectedList, option];
			}
			const nextValues = nextSelected.map((item) => item.value);
			if (controlledValue === undefined) {
				setInternalValue(nextValues);
			}
			onChange?.(nextValues, nextSelected);
			setSearchValue('');
			inputRef.current?.focus();
		}
	};

	// 移除选中 Tag
	const handleRemoveTag = (e: React.MouseEvent, val: string | number) => {
		e.stopPropagation();
		const nextSelected = selectedList.filter((item) => item.value !== val);
		const nextValues = nextSelected.map((item) => item.value);
		if (controlledValue === undefined) {
			setInternalValue(nextValues);
		}
		onChange?.(nextValues, nextSelected);
	};

	// 清空全部
	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation();
		const emptyVal = mode === 'multiple' ? [] : undefined;
		if (controlledValue === undefined) {
			setInternalValue(emptyVal);
		}
		onChange?.(emptyVal, mode === 'multiple' ? [] : undefined);
		setSearchValue('');
	};

	const showClear = allowClear && !disabled && (selectedList.length > 0 || searchValue.length > 0);

	return (
		<div
			ref={containerRef}
			className={`rpc_debounce_select ${className}`}
			style={style}
		>
			<div
				className={`rpc_debounce_select_selector ${
					isOpen ? 'rpc_debounce_select_selector_focused' : ''
				} ${disabled ? 'rpc_debounce_select_selector_disabled' : ''}`}
				onClick={() => {
					if (!disabled) {
						setIsOpen(true);
						inputRef.current?.focus();
						if (options.length === 0 && !searchValue) {
							performSearch('');
						}
					}
				}}
			>
				{/* 多选 Tags */}
				{mode === 'multiple' &&
					selectedList.map((item) => (
						<span key={item.value} className="rpc_debounce_select_tag">
							<span>{item.label}</span>
							{!disabled && (
								<span
									className="rpc_debounce_select_tag_close"
									onClick={(e) => handleRemoveTag(e, item.value)}
								>
									×
								</span>
							)}
						</span>
					))}

				{/* 单选回显值或输入框 */}
				{mode === 'single' && selectedList.length > 0 && !searchValue && !isOpen && (
					<span style={{ color: '#262626', marginRight: 4 }}>{selectedList[0].label}</span>
				)}

				<input
					ref={inputRef}
					type="text"
					className="rpc_debounce_select_input"
					value={searchValue}
					onChange={handleInputChange}
					placeholder={selectedList.length === 0 ? placeholder : ''}
					disabled={disabled}
				/>

				{/* 右侧动作按钮 */}
				<div className="rpc_debounce_select_actions">
					{fetching && <LoadingOutlined />}
					{!fetching && showClear && (
						<CloseCircleFilled className="rpc_debounce_select_clear_btn" onClick={handleClear} />
					)}
					{!fetching && !showClear && (
						<DownOutlined
							style={{
								transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
								transition: 'transform 0.2s',
								fontSize: 10,
							}}
						/>
					)}
				</div>
			</div>

			{/* 下拉浮层 */}
			{isOpen && !disabled && (
				<div className="rpc_debounce_select_dropdown">
					{fetching && options.length === 0 ? (
						<div className="rpc_debounce_select_empty">
							<LoadingOutlined style={{ marginRight: 8 }} />
							正在搜索中...
						</div>
					) : options.length > 0 ? (
						options.map((opt) => {
							const isSelected = selectedList.some((item) => item.value === opt.value);
							return (
								<div
									key={opt.value}
									className={`rpc_debounce_select_item ${
										isSelected ? 'rpc_debounce_select_item_selected' : ''
									} ${opt.disabled ? 'rpc_debounce_select_item_disabled' : ''}`}
									onClick={() => handleSelectOption(opt)}
								>
									<span>{opt.label}</span>
									{isSelected && <CheckOutlined style={{ fontSize: 12 }} />}
								</div>
							);
						})
					) : (
						<div className="rpc_debounce_select_empty">{notFoundContent}</div>
					)}
				</div>
			)}
		</div>
	);
};

export default DebounceSelect;
