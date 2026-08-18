import React, { useState, useRef, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface SpotlightCardProps {
	/** 卡片子内容 */
	children: ReactNode;
	/** 聚光灯光晕颜色，默认为 'rgba(22, 119, 255, 0.15)' */
	spotlightColor?: string;
	/** 聚光灯光晕半径（像素），默认为 320 */
	spotlightSize?: number;
	/** 是否开启暗色主题（高对比科技感），默认为 false */
	dark?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
	children,
	spotlightColor = 'rgba(22, 119, 255, 0.15)',
	spotlightSize = 320,
	dark = false,
	className = '',
	style,
}) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		setPosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			className={`rpc_spotlight_card ${dark ? 'rpc_spotlight_card_dark' : ''} ${className}`}
			style={style}
		>
			{/* 聚光灯层 */}
			<div
				className="rpc_spotlight_card_spotlight"
				style={{
					background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
				}}
			/>
			<div className="rpc_spotlight_card_content">{children}</div>
		</div>
	);
};

export default SpotlightCard;
