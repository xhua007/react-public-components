import { useState, type CSSProperties, type ReactNode } from 'react';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '../src/icons';
import './index.less';

export type CollapseBoxDirection = 'horizontal' | 'vertical';
export type CollapseBoxButtonPosition = 'left' | 'right' | 'top' | 'bottom';

export interface CollapseBoxProps {
	children?: ReactNode;
	title?: string;
	direction?: CollapseBoxDirection;
	buttonPosition?: CollapseBoxButtonPosition;
	defaultWidth?: number | string;
	defaultHeight?: number | string;
	contentPadding?: string;
	headerHeight?: number;
	className?: string;
}

const formatDimension = (value?: number | string): string | undefined => {
	if (value === undefined || value === null) return undefined;
	return typeof value === 'number' ? `${value}px` : value;
};

const ChevronLeft = () => <LeftOutlined />;

const ChevronRight = () => <RightOutlined />;

const ChevronUp = () => <UpOutlined />;

const ChevronDown = () => <DownOutlined />;

const CollapsibleBox = ({
	children,
	title = '内容区域',
	direction = 'horizontal',
	buttonPosition = 'right',
	defaultWidth = 600,
	defaultHeight = 300,
	contentPadding = '16px',
	headerHeight = 16,
	className,
}: CollapseBoxProps) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const getContentMaxHeight = () => {
		if (typeof defaultHeight === 'number') {
			return `${defaultHeight - headerHeight}px`;
		}
		if (typeof defaultHeight === 'string') {
			return headerHeight ? `calc(${defaultHeight} - ${headerHeight}px)` : defaultHeight;
		}
		return '100%';
	};

	const getIcon = () => {
		if (direction === 'horizontal') {
			if (buttonPosition === 'right') {
				return isExpanded ? <ChevronRight /> : <ChevronLeft />;
			}
			return isExpanded ? <ChevronLeft /> : <ChevronRight />;
		}
		if (buttonPosition === 'bottom') {
			return isExpanded ? <ChevronDown /> : <ChevronUp />;
		}
		return isExpanded ? <ChevronUp /> : <ChevronDown />;
	};

	const getButtonClass = () => {
		if (direction === 'horizontal') {
			return buttonPosition === 'right' ? 'button-right' : 'button-left';
		}
		return buttonPosition === 'bottom' ? 'button-bottom' : 'button-top';
	};

	const getContainerStyle = (): CSSProperties => {
		if (direction === 'horizontal') {
			return {
				width: isExpanded ? '100%' : '0px',
				height: '100%',
			};
		}
		return {
			height: isExpanded ? '100%' : '0px',
			width: '100%',
		};
	};

	const baseWrapperClass =
		direction === 'horizontal' ? 'collapsible-wrapper horizontal' : 'collapsible-wrapper vertical';
	const wrapperClass = className ? `${baseWrapperClass} ${className}` : baseWrapperClass;

	const containerClass = [
		'collapsible-container',
		direction === 'horizontal' && buttonPosition === 'right' ? 'align-right' : '',
		direction === 'vertical' && buttonPosition === 'bottom' ? 'align-bottom' : '',
	]
		.filter(Boolean)
		.join(' ');

	const height = getContentMaxHeight();
	const contentStyle: CSSProperties = {
		maxHeight: direction === 'vertical' ? (isExpanded ? height : '0px') : height,
		overflowY: 'auto',
		padding: contentPadding,
		boxSizing: 'border-box',
	};

	const formattedWidth = formatDimension(defaultWidth);
	const formattedHeight = formatDimension(defaultHeight);
	const wrapperStyle: CSSProperties = {
		width: formattedWidth,
		height: formattedHeight,
	};

	return (
		<div className={wrapperClass} style={wrapperStyle}>
			<div style={getContainerStyle()} className={containerClass}>
				{title && (
					<div className="collapsible-header" style={{ display: 'none' }}>
						<h3>{title}</h3>
					</div>
				)}

				<div className="collapsible-content" style={contentStyle}>
					{children}
				</div>
			</div>

			<div
				onClick={() => setIsExpanded(!isExpanded)}
				className={`toggle-button ${getButtonClass()}`}
				title={isExpanded ? '隐藏' : '展开'}
			>
				{getIcon()}
			</div>
		</div>
	);
};

export default CollapsibleBox;
