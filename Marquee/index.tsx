import React, { useRef, useState, useEffect, ReactNode, CSSProperties } from 'react';
import './index.less';

export type MarqueeDirection = 'left' | 'right' | 'up' | 'down';

export interface MarqueeProps {
	/** 滚动子内容 */
	children: ReactNode;
	/** 滚动方向：'left' | 'right' | 'up' | 'down'，默认为 'left' */
	direction?: MarqueeDirection;
	/** 滚动速度（像素/秒），默认为 50 */
	speed?: number;
	/** 鼠标悬浮时是否暂停动画，默认为 true */
	pauseOnHover?: boolean;
	/** 是否开启两侧边缘羽化渐变遮罩，默认为 false */
	gradient?: boolean;
	/** 边缘渐变遮罩的颜色（通常与背景色一致），默认为 '#ffffff' */
	gradientColor?: string;
	/** 子项间距（像素），默认为 24 */
	gap?: number;
	/** 是否持续保持播放 */
	play?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const Marquee: React.FC<MarqueeProps> = ({
	children,
	direction = 'left',
	speed = 50,
	pauseOnHover = true,
	gradient = false,
	gradientColor = '#ffffff',
	gap = 24,
	play = true,
	className = '',
	style,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [duration, setDuration] = useState<number>(20);

	const isVertical = direction === 'up' || direction === 'down';

	// 根据内容尺寸动态计算保持固定速度所需的 CSS 动画时长
	useEffect(() => {
		const calculateDuration = () => {
			if (!contentRef.current) return;
			const size = isVertical
				? contentRef.current.clientHeight
				: contentRef.current.clientWidth;

			if (size > 0 && speed > 0) {
				setDuration(size / speed);
			}
		};

		calculateDuration();
		window.addEventListener('resize', calculateDuration);
		return () => window.removeEventListener('resize', calculateDuration);
	}, [children, speed, isVertical, gap]);

	let animName = 'rpcMarqueeLeft';
	if (direction === 'right') animName = 'rpcMarqueeRight';
	else if (direction === 'up') animName = 'rpcMarqueeUp';
	else if (direction === 'down') animName = 'rpcMarqueeDown';

	return (
		<div
			ref={containerRef}
			className={`rpc_marquee ${isVertical ? 'rpc_marquee_vertical' : ''} ${
				pauseOnHover ? 'rpc_marquee_pause_on_hover' : ''
			} ${gradient ? 'rpc_marquee_gradient' : ''} ${className}`}
			style={{
				['--rpc-marquee-gap' as any]: `${gap}px`,
				['--rpc-marquee-gradient-color' as any]: gradientColor,
				...style,
			}}
		>
			<div
				className="rpc_marquee_container"
				style={{
					animationName: animName,
					animationDuration: `${duration}s`,
					animationTimingFunction: 'linear',
					animationIterationCount: 'infinite',
					animationPlayState: play ? 'running' : 'paused',
				}}
			>
				<div ref={contentRef} className="rpc_marquee_content">
					{children}
				</div>
				{/* 拼接副本以实现平滑无缝回环 */}
				<div className="rpc_marquee_content" aria-hidden="true">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Marquee;
