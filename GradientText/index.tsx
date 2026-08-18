import React, { ReactNode, CSSProperties } from 'react';
import './index.less';

export interface GradientTextProps {
	/** 文字内容 */
	children: ReactNode;
	/** 渐变色定义，默认为 'linear-gradient(90deg, #1677ff 0%, #722ed1 50%, #eb2f96 100%)' */
	gradient?: string;
	/** 是否开启流光滚动动画，默认为 true */
	animate?: boolean;
	/** 流光动画周期时间（秒），默认为 4 */
	speed?: number;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const GradientText: React.FC<GradientTextProps> = ({
	children,
	gradient = 'linear-gradient(90deg, #1677ff 0%, #722ed1 50%, #eb2f96 100%)',
	animate = true,
	speed = 4,
	className = '',
	style,
}) => {
	return (
		<span
			className={`rpc_gradient_text ${animate ? 'rpc_gradient_text_animate' : ''} ${className}`}
			style={{
				backgroundImage: gradient,
				animationDuration: `${speed}s`,
				...style,
			}}
		>
			{children}
		</span>
	);
};

export default GradientText;
