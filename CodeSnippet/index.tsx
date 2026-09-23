import React, { useState, ReactNode, CSSProperties } from 'react';
import {
	CodeSandboxOutlined,
	CodePenOutlined,
	ThunderboltOutlined,
	CodeOutlined,
	ExportOutlined,
	CopyOutlined,
	CheckOutlined,
	UpOutlined,
	DownOutlined,
} from '../src/icons';
import {
	openInCodeSandbox,
	openInCodePen,
	openInStackBlitz,
	openInNewTab,
	SandboxConfig,
} from './sandbox';
import './index.less';

export type CodeSnippetTheme = 'dark' | 'light';

export interface CodeTabItem {
	key: string;
	label: ReactNode;
	code: string;
	language?: string;
}

export type BuiltinAction =
	'codesandbox' | 'codepen' | 'stackblitz' | 'copy' | 'external' | 'collapse';

export interface CodeSnippetProps {
	/** 代码文本内容（单代码模式） */
	code?: string;
	/** 编程语言标识，默认为 'tsx' */
	language?: string;
	/** 代码块主题风格：'dark' 暗色（默认） / 'light' 亮色 */
	theme?: CodeSnippetTheme;
	/** 顶部自定义标题或说明标签（不传时展示大写的 language） */
	title?: ReactNode;
	/** 是否显示代码行号，默认为 false */
	showLineNumbers?: boolean;
	/** 是否展示一键复制按钮，默认为 true */
	copyable?: boolean;
	/** 多语言/多版本 Tabs 切换（如 TypeScript / JavaScript） */
	tabs?: CodeTabItem[];
	/** 当前激活的 Tab key（受控） */
	activeTabKey?: string;
	/** 默认激活的 Tab key */
	defaultActiveTabKey?: string;
	/** Tab 切换回调 */
	onTabChange?: (key: string) => void;
	/** 是否展示上方经典操作工具栏（CodeSandbox、CodePen、StackBlitz、外部打开、复制、代码展开折叠） */
	showActions?: boolean;
	/** 自定义操作栏按钮列表 */
	actions?: (BuiltinAction | ReactNode)[];
	/** 点击操作按钮时的回调函数 */
	onAction?: (actionKey: string) => void;
	/** 沙箱自定义配置（标题、依赖库等） */
	sandboxConfig?: SandboxConfig;
	/** 外部独立运行的完整页面 URL（若传则 external 按钮直接打开此链接，不传则自动在新窗口动态构建运行） */
	externalUrl?: string;
	/** 是否支持折叠/展开代码 */
	collapsible?: boolean;
	/** 默认是否折叠 */
	defaultCollapsed?: boolean;
	/** 当前是否折叠（受控） */
	collapsed?: boolean;
	/** 折叠状态切换回调 */
	onCollapseChange?: (collapsed: boolean) => void;
	/** 是否展示底部的“收起 / 展开代码”控制条，默认为 false */
	showCollapseFooter?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
	code: singleCode = '',
	language: defaultLang = 'tsx',
	theme = 'dark',
	title,
	showLineNumbers = false,
	copyable = true,
	tabs,
	activeTabKey: controlledTabKey,
	defaultActiveTabKey,
	onTabChange,
	showActions = false,
	actions = ['codesandbox', 'codepen', 'stackblitz', 'external', 'copy', 'collapse'],
	onAction,
	sandboxConfig,
	externalUrl,
	collapsible = false,
	defaultCollapsed = false,
	collapsed: controlledCollapsed,
	onCollapseChange,
	showCollapseFooter = false,
	className = '',
	style,
}) => {
	const hasTabs = Array.isArray(tabs) && tabs.length > 0;
	const [internalTabKey, setInternalTabKey] = useState<string>(
		defaultActiveTabKey ?? (hasTabs ? tabs[0].key : ''),
	);
	const activeKey = controlledTabKey !== undefined ? controlledTabKey : internalTabKey;

	const [internalCollapsed, setInternalCollapsed] = useState<boolean>(defaultCollapsed);
	const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

	const [copied, setCopied] = useState<boolean>(false);

	// 获取当前展示的代码与语言
	const currentTab = hasTabs ? tabs.find((t) => t.key === activeKey) || tabs[0] : null;
	const currentCode = currentTab ? currentTab.code : singleCode;
	const currentLanguage = currentTab ? currentTab.language || defaultLang : defaultLang;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(currentCode);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
			onAction?.('copy');
		} catch {
			// fallback
		}
	};

	const handleToggleCollapse = () => {
		const next = !isCollapsed;
		if (controlledCollapsed === undefined) {
			setInternalCollapsed(next);
		}
		onCollapseChange?.(next);
		onAction?.('collapse');
	};

	const handleActionClick = (action: string) => {
		const config: SandboxConfig = {
			title: typeof title === 'string' ? title : 'react-public-components Demo',
			...sandboxConfig,
		};

		if (action === 'codesandbox') {
			openInCodeSandbox(currentCode, config);
		} else if (action === 'codepen') {
			openInCodePen(currentCode, config);
		} else if (action === 'stackblitz') {
			openInStackBlitz(currentCode, config);
		} else if (action === 'external') {
			if (externalUrl) {
				window.open(externalUrl, '_blank');
			} else {
				openInNewTab(currentCode, config.title || 'Demo Preview');
			}
		} else if (action === 'copy') {
			handleCopy();
			return;
		} else if (action === 'collapse') {
			handleToggleCollapse();
			return;
		}
		onAction?.(action);
	};

	const handleTabClick = (key: string) => {
		if (controlledTabKey === undefined) {
			setInternalTabKey(key);
		}
		onTabChange?.(key);
	};

	const lines = currentCode.split('\n');

	return (
		<div
			className={`rpc_code_snippet rpc_code_snippet_${theme} ${
				isCollapsed ? 'rpc_code_snippet_collapsed' : ''
			} ${className}`}
			style={style}
		>
			{/* 1. 顶部操作工具栏（图1红色区域） */}
			{showActions && (
				<div className="rpc_code_snippet_actions_bar">
					<div className="rpc_code_snippet_actions_list">
						{actions.map((act, index) => {
							if (typeof act !== 'string') {
								return <React.Fragment key={index}>{act}</React.Fragment>;
							}

							switch (act) {
								case 'codesandbox':
									return (
										<button
											key="codesandbox"
											type="button"
											className="rpc_code_snippet_action_btn"
											title="在 CodeSandbox 中打开并在线运行"
											onClick={() => handleActionClick('codesandbox')}
										>
											<CodeSandboxOutlined />
										</button>
									);
								case 'codepen':
									return (
										<button
											key="codepen"
											type="button"
											className="rpc_code_snippet_action_btn"
											title="在 CodePen 中打开并演练"
											onClick={() => handleActionClick('codepen')}
										>
											<CodePenOutlined />
										</button>
									);
								case 'stackblitz':
									return (
										<button
											key="stackblitz"
											type="button"
											className="rpc_code_snippet_action_btn"
											title="在 StackBlitz 中极速启动"
											onClick={() => handleActionClick('stackblitz')}
										>
											<ThunderboltOutlined />
										</button>
									);
								case 'external':
									return (
										<button
											key="external"
											type="button"
											className="rpc_code_snippet_action_btn"
											title="在独立新标签页中全屏运行"
											onClick={() => handleActionClick('external')}
										>
											<ExportOutlined />
										</button>
									);
								case 'copy':
									return (
										<button
											key="copy"
											type="button"
											className={`rpc_code_snippet_action_btn ${
												copied ? 'rpc_code_snippet_action_copied' : ''
											}`}
											title={copied ? '已复制到剪贴板！' : '复制代码'}
											onClick={() => handleActionClick('copy')}
										>
											{copied ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
										</button>
									);
								case 'collapse':
									return (
										<button
											key="collapse"
											type="button"
											className={`rpc_code_snippet_action_btn ${
												!isCollapsed ? 'rpc_code_snippet_action_active' : ''
											}`}
											title={isCollapsed ? '展开代码' : '收起代码'}
											onClick={() => handleActionClick('collapse')}
										>
											<CodeOutlined />
										</button>
									);
								default:
									return null;
							}
						})}
					</div>
				</div>
			)}

			{/* 2. 标签页切换栏（TypeScript / JavaScript） */}
			{hasTabs && (
				<div className="rpc_code_snippet_tabs_bar">
					{tabs.map((tab) => (
						<div
							key={tab.key}
							className={`rpc_code_snippet_tab_item ${
								tab.key === activeKey ? 'rpc_code_snippet_tab_active' : ''
							}`}
							onClick={() => handleTabClick(tab.key)}
						>
							{tab.label}
						</div>
					))}
				</div>
			)}

			{/* 3. 经典标题栏（无 showActions 时显示） */}
			{!showActions && (
				<div className="rpc_code_snippet_top_bar">
					<div className="rpc_code_snippet_dots">
						<span className="rpc_code_snippet_dot rpc_code_snippet_dot_red" />
						<span className="rpc_code_snippet_dot rpc_code_snippet_dot_yellow" />
						<span className="rpc_code_snippet_dot rpc_code_snippet_dot_green" />
					</div>

					<span className="rpc_code_snippet_lang">{title ?? currentLanguage}</span>

					{copyable ? (
						<button type="button" className="rpc_code_snippet_copy_btn" onClick={handleCopy}>
							{copied ? '✓ 已复制' : '复制'}
						</button>
					) : (
						<span />
					)}
				</div>
			)}

			{/* 4. 代码内容主体 */}
			{!isCollapsed && (
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
						<code>{currentCode}</code>
					</pre>
					{showActions && copyable && (
						<div className="rpc_code_snippet_floating_copy" onClick={handleCopy} title="复制代码">
							{copied ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
							<span style={{ fontSize: 11, marginLeft: 4 }}>{currentLanguage}</span>
						</div>
					)}
				</div>
			)}

			{/* 5. 底部收起/展开控制条 */}
			{(showCollapseFooter || collapsible) && !isCollapsed && (
				<div className="rpc_code_snippet_footer" onClick={handleToggleCollapse}>
					<UpOutlined style={{ marginRight: 6, fontSize: 12 }} />
					<span>收起代码</span>
				</div>
			)}

			{(showCollapseFooter || collapsible) && isCollapsed && (
				<div className="rpc_code_snippet_footer" onClick={handleToggleCollapse}>
					<DownOutlined style={{ marginRight: 6, fontSize: 12 }} />
					<span>展开代码</span>
				</div>
			)}
		</div>
	);
};

export default CodeSnippet;
