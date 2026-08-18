import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import CopyButton from '../CopyButton';
import './index.less';

export interface TextEllipsisExpandConfig {
	/** 展开按钮文案，默认为 '展开' */
	collapsedText?: ReactNode;
	/** 收起按钮文案，默认为 '收起' */
	expandedText?: ReactNode;
	/** 默认是否展开 */
	defaultExpanded?: boolean;
	/** 展开状态改变回调 */
	onExpandChange?: (expanded: boolean) => void;
}

export interface TextEllipsisProps {
	/** 显示的文本或节点 */
	children: ReactNode;
	/** 最大显示行数，超过则截断，默认为 1 */
	lines?: number;
	/** 是否支持展开/收起，可传 boolean 或配置对象 */
	expandable?: boolean | TextEllipsisExpandConfig;
	/** Tooltip 浮层展示配置：'auto' 仅在溢出截断时展示、true 始终在 hover 时展示、false 禁用 */
	tooltip?: 'auto' | boolean | ReactNode;
	/** 是否显示复制按钮 */
	copyable?: boolean;
	/** 前缀节点 */
	prefix?: ReactNode;
	/** 后缀节点 */
	suffix?: ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const TextEllipsis: React.FC<TextEllipsisProps> = ({
	children,
	lines = 1,
	expandable = false,
	tooltip = 'auto',
	copyable = false,
	prefix,
	suffix,
	className = '',
	style,
}) => {
	const expandConfig = typeof expandable === 'object' ? expandable : {};
	const [expanded, setExpanded] = useState<boolean>(
		expandConfig.defaultExpanded ?? false,
	);
	const [isOverflow, setIsOverflow] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const textRef = useRef<HTMLDivElement>(null);

	// 检测文本是否发生溢出截断
	const checkOverflow = () => {
		const el = textRef.current;
		if (!el) return;
		if (lines === 1) {
			setIsOverflow(el.scrollWidth > el.clientWidth);
		} else {
			setIsOverflow(el.scrollHeight > el.clientHeight);
		}
	};

	useEffect(() => {
		checkOverflow();
		window.addEventListener('resize', checkOverflow);
		return () => {
			window.removeEventListener('resize', checkOverflow);
		};
	}, [children, lines, expanded]);

	const handleToggleExpand = (e: React.MouseEvent) => {
		e.stopPropagation();
		const nextState = !expanded;
		setExpanded(nextState);
		expandConfig.onExpandChange?.(nextState);
	};

	// 提取纯文本用于复制和默认 Tooltip
	const rawText = typeof children === 'string' || typeof children === 'number' ? String(children) : '';

	// 判断是否展示 Tooltip
	const shouldShowTooltip =
		!expanded &&
		(tooltip === true || (tooltip === 'auto' && isOverflow) || (typeof tooltip === 'string' && tooltip.length > 0));

	const tooltipText = typeof tooltip === 'string' || React.isValidElement(tooltip) ? tooltip : rawText;

	const collapsedBtnText = expandConfig.collapsedText ?? '展开';
	const expandedBtnText = expandConfig.expandedText ?? '收起';

	const isSingleLine = lines <= 1;

	return (
		<div
			className={`rpc_text_ellipsis ${className}`}
			style={style}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{prefix && <span className="rpc_text_ellipsis_prefix">{prefix}</span>}

			<div
				ref={textRef}
				className={`rpc_text_ellipsis_content_wrap ${
					expanded
						? 'rpc_text_ellipsis_expanded'
						: isSingleLine
							? 'rpc_text_ellipsis_single_line'
							: 'rpc_text_ellipsis_multi_line'
				}`}
				style={{
					WebkitLineClamp: expanded ? undefined : lines > 1 ? lines : undefined,
				}}
			>
				{children}
			</div>

			{expandable && (isOverflow || expanded) && (
				<span className="rpc_text_ellipsis_action_btn" onClick={handleToggleExpand}>
					{expanded ? expandedBtnText : collapsedBtnText}
				</span>
			)}

			{copyable && rawText && (
				<span className="rpc_text_ellipsis_suffix">
					<CopyButton mode="icon" text={rawText} tooltip={false} />
				</span>
			)}

			{suffix && <span className="rpc_text_ellipsis_suffix">{suffix}</span>}

			{shouldShowTooltip && tooltipText && (
				<div
					className={`rpc_text_ellipsis_tooltip ${
						isHovered ? 'rpc_text_ellipsis_tooltip_visible' : ''
					}`}
				>
					{tooltipText}
				</div>
			)}
		</div>
	);
};

export default TextEllipsis;
