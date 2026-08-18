import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { CloseOutlined } from '../src/icons';
import './index.less';

export interface TagInputProps {
	/** 标签列表（受控） */
	value?: string[];
	/** 默认标签列表 */
	defaultValue?: string[];
	/** 标签列表改变回调 */
	onChange?: (tags: string[]) => void;
	/** 最大允许输入的标签数量 */
	maxCount?: number;
	/** 单个标签的最大字符长度 */
	maxLength?: number;
	/** 是否允许重复标签，默认为 false */
	allowDuplicates?: boolean;
	/** 触发添加标签的按键/分隔符，默认为 ['Enter', ',', '，'] */
	separators?: string[];
	/** 标签自定义校验函数（返回 true 通过，返回 false 或 string 报错） */
	validate?: (tag: string) => boolean | string;
	/** 占位提示文案 */
	placeholder?: string;
	/** 是否禁用 */
	disabled?: boolean;
	/** 自定义渲染单个 Tag */
	renderTag?: (tag: string, index: number, onClose: () => void) => ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const TagInput: React.FC<TagInputProps> = ({
	value: controlledValue,
	defaultValue = [],
	onChange,
	maxCount,
	maxLength,
	allowDuplicates = false,
	separators = ['Enter', ',', '，'],
	validate,
	placeholder = '输入标签后按回车...',
	disabled = false,
	renderTag,
	className = '',
	style,
}) => {
	const [internalTags, setInternalTags] = useState<string[]>(defaultValue);
	const tags = controlledValue !== undefined ? controlledValue : internalTags;

	const [inputValue, setInputValue] = useState<string>('');
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// 添加 Tag
	const addTag = (text: string) => {
		const trimmed = text.trim();
		if (!trimmed) return;

		if (maxCount !== undefined && tags.length >= maxCount) {
			setErrorMessage(`最多只能添加 ${maxCount} 个标签`);
			return;
		}

		if (!allowDuplicates && tags.includes(trimmed)) {
			setErrorMessage(`标签 "${trimmed}" 已存在`);
			return;
		}

		if (validate) {
			const res = validate(trimmed);
			if (typeof res === 'string') {
				setErrorMessage(res);
				return;
			}
			if (res === false) {
				setErrorMessage(`标签 "${trimmed}" 格式不合法`);
				return;
			}
		}

		const nextTags = [...tags, trimmed];
		if (controlledValue === undefined) {
			setInternalTags(nextTags);
		}
		onChange?.(nextTags);
		setInputValue('');
		setErrorMessage('');
	};

	// 删除 Tag
	const removeTag = (index: number) => {
		if (disabled) return;
		const nextTags = tags.filter((_, i) => i !== index);
		if (controlledValue === undefined) {
			setInternalTags(nextTags);
		}
		onChange?.(nextTags);
		setErrorMessage('');
	};

	// 键盘事件处理
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return;

		// 分隔符触发添加
		if (separators.includes(e.key)) {
			e.preventDefault();
			addTag(inputValue);
			return;
		}

		// 退格键删除最后一个 Tag
		if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
			e.preventDefault();
			removeTag(tags.length - 1);
		}
	};

	// 失去焦点时添加
	const handleBlur = () => {
		setIsFocused(false);
		if (inputValue.trim()) {
			addTag(inputValue);
		}
	};

	// 双击编辑 Tag
	const handleDoubleClick = (index: number, tag: string) => {
		if (disabled) return;
		removeTag(index);
		setInputValue(tag);
		inputRef.current?.focus();
	};

	return (
		<div
			ref={containerRef}
			className={`rpc_tag_input ${isFocused ? 'rpc_tag_input_focused' : ''} ${
				disabled ? 'rpc_tag_input_disabled' : ''
			} ${errorMessage ? 'rpc_tag_input_error' : ''} ${className}`}
			style={style}
			onClick={() => {
				if (!disabled) inputRef.current?.focus();
			}}
		>
			{tags.map((tag, idx) => {
				if (renderTag) {
					return renderTag(tag, idx, () => removeTag(idx));
				}
				return (
					<span
						key={idx}
						className="rpc_tag_input_tag"
						onDoubleClick={() => handleDoubleClick(idx, tag)}
						title="双击可重新编辑"
					>
						<span>{tag}</span>
						{!disabled && (
							<CloseOutlined
								className="rpc_tag_input_tag_close"
								onClick={(e) => {
									e.stopPropagation();
									removeTag(idx);
								}}
							/>
						)}
					</span>
				);
			})}

			{(!maxCount || tags.length < maxCount) && (
				<input
					ref={inputRef}
					type="text"
					value={inputValue}
					maxLength={maxLength}
					disabled={disabled}
					className="rpc_tag_input_input"
					placeholder={tags.length === 0 ? placeholder : ''}
					onChange={(e) => {
						setInputValue(e.target.value);
						if (errorMessage) setErrorMessage('');
					}}
					onKeyDown={handleKeyDown}
					onFocus={() => setIsFocused(true)}
					onBlur={handleBlur}
				/>
			)}

			{errorMessage && <div className="rpc_tag_input_error_tip">{errorMessage}</div>}
		</div>
	);
};

export default TagInput;
