import React, { useState, ReactNode, CSSProperties } from 'react';
import './index.less';

export type CodeSnippetTheme = 'dark' | 'light';

export interface CodeSnippetProps {
	/** 代码文本内容 */
	code: string;
	/** 编程语言标识，默认为 'bash' */
	language?: string;
	/** 代码块主题风格：'dark' 暗色（默认） / 'light' 亮色 */
	theme?: CodeSnippetTheme;
	/** 顶部自定义标题或说明标签（不传时展示大写的 language） */
	title?: ReactNode;
	/** 是否显示代码行号，默认为 false */
	showLineNumbers?: boolean;
	/** 是否展示右上角一键复制按钮，默认为 true */
	copyable?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
	code,
	language = 'bash',
	theme = 'dark',
	title,
	showLineNumbers = false,
	copyable = true,
	className = '',
	style,
}) => {
	const [copied, setCopied] = useState<boolean>(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// fallback
		}
	};

	const lines = code.split('\n');

	return (
		<div className={`rpc_code_snippet rpc_code_snippet_${theme} ${className}`} style={style}>
			<div className="rpc_code_snippet_top_bar">
				<div className="rpc_code_snippet_dots">
					<span className="rpc_code_snippet_dot rpc_code_snippet_dot_red" />
					<span className="rpc_code_snippet_dot rpc_code_snippet_dot_yellow" />
					<span className="rpc_code_snippet_dot rpc_code_snippet_dot_green" />
				</div>

				<span className="rpc_code_snippet_lang">{title ?? language}</span>

				{copyable ? (
					<button type="button" className="rpc_code_snippet_copy_btn" onClick={handleCopy}>
						{copied ? '✓ 已复制' : '复制'}
					</button>
				) : (
					<span />
				)}
			</div>

			<div className="rpc_code_snippet_body">
				{showLineNumbers && (
					<div className="rpc_code_snippet_line_numbers">
						{lines.map((_, idx) => (
							<span key={idx} className="rpc_code_snippet_line_no">
								{idx + 1}
							</span>
						))}
					</div>
				)}
				<pre className="rpc_code_snippet_content">
					<code>{code}</code>
				</pre>
			</div>
		</div>
	);
};

export default CodeSnippet;
