import React, { ReactNode, CSSProperties } from 'react';
import './index.less';

export type RibbonPlacement = 'start' | 'end';

export interface BadgeRibbonProps {
	/** 缎带文字内容 */
	text: ReactNode;
	/** 缎带背景颜色，默认为 '#ff4d4f' */
	color?: string;
	/** 挂载位置：'start' 左上角，'end' 右上角，默认为 'end' */
	placement?: RibbonPlacement;
	/** 被包裹的卡片子元素 */
	children: ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const BadgeRibbon: React.FC<BadgeRibbonProps> = ({
	text,
	color = '#ff4d4f',
	placement = 'end',
	children,
	className = '',
	style,
}) => {
	return (
		<div className={`rpc_badge_ribbon_wrapper ${className}`} style={style}>
			{children}
			<div
				className={`rpc_badge_ribbon rpc_badge_ribbon_${placement}`}
				style={{ background: color }}
			>
				{text}
			</div>
		</div>
	);
};

export default BadgeRibbon;
