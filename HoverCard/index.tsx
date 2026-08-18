import React, { useState, useRef, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface HoverCardProps {
	/** 触发宿主元素 */
	children: ReactNode;
	/** 悬浮弹出的卡片内容 */
	content: ReactNode;
	/** 鼠标移入展开延迟（毫秒），默认为 200 */
	openDelay?: number;
	/** 鼠标移出关闭延迟（毫秒），默认为 200 */
	closeDelay?: number;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const HoverCard: React.FC<HoverCardProps> = ({
	children,
	content,
	openDelay = 200,
	closeDelay = 200,
	className = '',
	style,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleMouseEnter = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			setIsOpen(true);
		}, openDelay);
	};

	const handleMouseLeave = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			setIsOpen(false);
		}, closeDelay);
	};

	return (
		<div
			className={`rpc_hover_card ${className}`}
			style={style}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}

			{isOpen && (
				<div
					className="rpc_hover_card_popover"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{content}
				</div>
			)}
		</div>
	);
};

export default HoverCard;
