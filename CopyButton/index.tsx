import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { CopyOutlined, CheckOutlined } from '../src/icons';
import './index.less';

export interface CopyButtonProps {
	/** 要复制的目标文本 */
	text?: string;
	/** 动态获取要复制的目标文本（支持异步） */
	getText?: () => string | Promise<string>;
	/** 复制按钮的展示形态：button 按钮形态、icon 纯图标、inline 行内文本 */
	mode?: 'button' | 'icon' | 'inline';
	/** 按钮类型（仅在 mode='button' 时有效） */
	type?: 'default' | 'primary';
	/** 默认图标 */
	icon?: ReactNode;
	/** 复制成功后的图标 */
	copiedIcon?: ReactNode;
	/** 复制成功后展示的文本 */
	copiedText?: ReactNode;
	/** 默认展示的子内容/按钮文案 */
	children?: ReactNode;
	/** 复制成功提示的 Tooltip 配置（传 false 禁用，传字符串/ReactNode 自定义文案，传 true 使用默认'复制成功'） */
	tooltip?: boolean | ReactNode;
	/** 复制成功后的高亮展示持续时间（毫秒），默认 2000ms */
	duration?: number;
	/** 是否禁用 */
	disabled?: boolean;
	/** 成功复制回调 */
	onCopy?: (text: string) => void;
	/** 复制失败回调 */
	onError?: (error: unknown) => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

/** 浏览器剪贴板复制降级方案 */
async function copyToClipboard(content: string): Promise<void> {
	if (navigator.clipboard && window.isSecureContext) {
		await navigator.clipboard.writeText(content);
		return;
	}

	const textArea = document.createElement('textarea');
	textArea.value = content;
	textArea.style.position = 'fixed';
	textArea.style.left = '-999999px';
	textArea.style.top = '-999999px';
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	return new Promise((resolve, reject) => {
		const successful = document.execCommand('copy');
		textArea.remove();
		if (successful) {
			resolve();
		} else {
			reject(new Error('复制失败'));
		}
	});
}

const CopyButton: React.FC<CopyButtonProps> = ({
	text,
	getText,
	mode = 'button',
	type = 'default',
	icon,
	copiedIcon,
	copiedText,
	children,
	tooltip = true,
	duration = 2000,
	disabled = false,
	onCopy,
	onError,
	className = '',
	style,
}) => {
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}
		};
	}, []);

	const handleCopy = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (disabled) return;

		try {
			let targetText = text || '';
			if (getText) {
				targetText = await getText();
			}

			await copyToClipboard(targetText);
			setIsCopied(true);
			onCopy?.(targetText);

			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}
			timerRef.current = window.setTimeout(() => {
				setIsCopied(false);
			}, duration);
		} catch (err) {
			onError?.(err);
		}
	};

	const defaultIcon = icon ?? <CopyOutlined />;
	const defaultCopiedIcon = copiedIcon ?? <CheckOutlined style={{ color: '#52c41a' }} />;

	// 计算展示的图标与文案
	const currentIcon = isCopied ? defaultCopiedIcon : defaultIcon;
	const currentText = isCopied ? (copiedText ?? children ?? '已复制') : (children ?? (mode === 'button' ? '复制' : null));

	// Tooltip 提示文本计算
	let tooltipContent: ReactNode = null;
	if (tooltip) {
		if (isCopied) {
			tooltipContent = typeof tooltip === 'boolean' ? '复制成功！' : tooltip;
		} else if (mode === 'icon') {
			tooltipContent = '点击复制';
		}
	}

	const classNames = [
		'rpc_copy_button',
		`rpc_copy_button_${mode}`,
		type === 'primary' && mode === 'button' ? 'rpc_copy_button_primary' : '',
		isCopied ? 'rpc_copy_button_copied' : '',
		disabled ? 'rpc_copy_button_disabled' : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div
			className={classNames}
			style={style}
			onClick={handleCopy}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			role="button"
			tabIndex={disabled ? -1 : 0}
		>
			<span className="rpc_copy_button_icon_wrap">{currentIcon}</span>
			{currentText && <span>{currentText}</span>}

			{tooltip && tooltipContent && (
				<div
					className={`rpc_copy_button_tooltip ${
						isCopied ? 'rpc_copy_button_tooltip_visible' : isHovered ? 'rpc_copy_button_tooltip_hover' : ''
					}`}
				>
					{tooltipContent}
				</div>
			)}
		</div>
	);
};

export default CopyButton;
