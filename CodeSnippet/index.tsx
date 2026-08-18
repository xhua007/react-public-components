import React, { useState, CSSProperties } from 'react';
import './index.less';

export interface CodeSnippetProps {
	/** 代码文本内容 */
	code: string;
	/** 编程语言标识，默认为 'bash' */
	language?: string;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
	code,
	language = 'bash',
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

	return (
		<div className={`rpc_code_snippet ${className}`} style={style}>
			<div className="rpc_code_snippet_top_bar">
				<div className="rpc_code_snippet_dots">
					<span className="rpc_code_snippet_dot rpc_code_snippet_dot_red" />
					<span className="rpc_code_snippet_dot rpc_code_snippet_dot_yellow" />
					<span className="rpc_code_snippet_dot rpc_code_snippet_dot_green" />
				</div>

				<span className="rpc_code_snippet_lang">{language}</span>

				<button type="button" className="rpc_code_snippet_copy_btn" onClick={handleCopy}>
					{copied ? '✓ 已复制' : '复制'}
				</button>
			</div>

			<pre className="rpc_code_snippet_content">
				<code>{code}</code>
			</pre>
		</div>
	);
};

export default CodeSnippet;
