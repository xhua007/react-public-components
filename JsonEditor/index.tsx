import React, { useState, useRef, useEffect, useMemo, CSSProperties } from 'react';
import CopyButton from '../CopyButton';
import './index.less';

export interface JsonEditorProps {
	/** JSON 数据内容（可传 JSON 字符串或 Object 对象） */
	value?: string | object;
	/** 默认 JSON 数据内容 */
	defaultValue?: string | object;
	/** 内容变化回调 */
	onChange?: (rawJson: string, parsedObject?: any) => void;
	/** 是否只读模式，默认为 false */
	readOnly?: boolean;
	/** 缩进空格数，默认为 2 */
	indent?: number;
	/** 编辑器高度，默认为 280 */
	height?: number | string;
	/** 是否展示行号，默认为 true */
	showLineNumbers?: boolean;
	/** 是否展示顶部工具栏，默认为 true */
	showToolbar?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

// 格式化初始传入值
function normalizeJson(val?: string | object, indent: number = 2): string {
	if (val === undefined || val === null) return '{\n  \n}';
	if (typeof val === 'object') {
		try {
			return JSON.stringify(val, null, indent);
		} catch {
			return '{}';
		}
	}
	return String(val);
}

const JsonEditor: React.FC<JsonEditorProps> = ({
	value: controlledValue,
	defaultValue,
	onChange,
	readOnly = false,
	indent = 2,
	height = 280,
	showLineNumbers = true,
	showToolbar = true,
	className = '',
	style,
}) => {
	const initialText = useMemo(() => {
		return normalizeJson(controlledValue !== undefined ? controlledValue : defaultValue, indent);
	}, [controlledValue, defaultValue, indent]);

	const [text, setText] = useState<string>(initialText);
	const [error, setError] = useState<string | null>(null);

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (controlledValue !== undefined) {
			const next = normalizeJson(controlledValue, indent);
			setText(next);
			validate(next);
		}
	}, [controlledValue, indent]);

	// 校验 JSON
	const validate = (content: string) => {
		if (!content.trim()) {
			setError(null);
			return true;
		}
		try {
			const parsed = JSON.parse(content);
			setError(null);
			return parsed;
		} catch (err: any) {
			setError(err.message || 'JSON 语法错误');
			return false;
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const nextText = e.target.value;
		setText(nextText);
		const parsed = validate(nextText);
		onChange?.(nextText, parsed !== false ? parsed : undefined);
	};

	// 一键美化格式化
	const handleFormat = () => {
		try {
			const parsed = JSON.parse(text);
			const formatted = JSON.stringify(parsed, null, indent);
			setText(formatted);
			setError(null);
			onChange?.(formatted, parsed);
		} catch (err: any) {
			setError(err.message || '格式化失败: 语法不合法');
		}
	};

	// 一键压缩 (Minify)
	const handleMinify = () => {
		try {
			const parsed = JSON.parse(text);
			const minified = JSON.stringify(parsed);
			setText(minified);
			setError(null);
			onChange?.(minified, parsed);
		} catch (err: any) {
			setError(err.message || '压缩失败: 语法不合法');
		}
	};

	// 处理 Tab 键缩进
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			const textarea = textareaRef.current;
			if (!textarea) return;

			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const spaces = ' '.repeat(indent);

			const newText = text.substring(0, start) + spaces + text.substring(end);
			setText(newText);
			validate(newText);

			setTimeout(() => {
				textarea.selectionStart = textarea.selectionEnd = start + indent;
			}, 0);
		}
	};

	// 计算总行数
	const lineCount = useMemo(() => {
		return text.split('\n').length;
	}, [text]);

	return (
		<div
			className={`rpc_json_editor ${className}`}
			style={{ height, ...style }}
		>
			{/* 顶部工具栏 */}
			{showToolbar && (
				<div className="rpc_json_editor_toolbar">
					<div className="rpc_json_editor_title">
						<span>{'{ }'}</span>
						<span>JSON {readOnly ? 'Viewer' : 'Editor'}</span>
					</div>

					<div className="rpc_json_editor_actions">
						{!readOnly && (
							<>
								<button
									type="button"
									className="rpc_json_editor_btn"
									onClick={handleFormat}
									title="美化格式化"
								>
									美化
								</button>
								<button
									type="button"
									className="rpc_json_editor_btn"
									onClick={handleMinify}
									title="单行压缩"
								>
									压缩
								</button>
							</>
						)}

						<CopyButton mode="icon" text={text} tooltip="复制 JSON" />
					</div>
				</div>
			)}

			{/* 主体编辑区域 */}
			<div className="rpc_json_editor_body">
				{showLineNumbers && (
					<div className="rpc_json_editor_line_numbers">
						{Array.from({ length: Math.max(1, lineCount) }).map((_, i) => (
							<div key={i}>{i + 1}</div>
						))}
					</div>
				)}

				<textarea
					ref={textareaRef}
					value={text}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					readOnly={readOnly}
					spellCheck={false}
					className="rpc_json_editor_textarea"
					placeholder="在此输入或粘贴 JSON 字符串..."
				/>
			</div>

			{/* 底部状态栏 */}
			<div
				className={`rpc_json_editor_status_bar ${
					error ? 'rpc_json_editor_status_bar_error' : ''
				}`}
			>
				<span>{error ? `⚠️ ${error}` : '✓ JSON 格式有效'}</span>
				<span>{lineCount} 行 · {text.length} 字符</span>
			</div>
		</div>
	);
};

export default JsonEditor;
