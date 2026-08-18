import React, { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import './index.less';

/* =========================================================================
 * 1. ScrollTracker 组件
 * ========================================================================= */

export interface ScrollTrackerProps {
	/** 进度条吸附位置：'top' 顶部，'bottom' 底部，默认为 'top' */
	position?: 'top' | 'bottom';
	/** 进度条高度（像素），默认为 3 */
	height?: number;
	/** 进度条颜色或渐变色配置（如 '#1677ff' 或 ['#1677ff', '#52c41a']） */
	color?: string | string[];
	/** 是否显示右上角/角落的百分比数字浮签，默认为 false */
	showPercentage?: boolean;
	/** 监听滚动的目标元素或 ref（不传时监听整个 window 视口） */
	target?: HTMLElement | (() => HTMLElement | null) | null;
	/** 进度改变回调 (0 ~ 100) */
	onChange?: (percent: number) => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

export const ScrollTracker: React.FC<ScrollTrackerProps> = ({
	position = 'top',
	height = 3,
	color = '#1677ff',
	showPercentage = false,
	target,
	onChange,
	className = '',
	style,
}) => {
	const [percent, setPercent] = useState<number>(0);

	useEffect(() => {
		const calculateScroll = () => {
			let scrollTop = 0;
			let scrollHeight = 0;
			let clientHeight = 0;

			const targetEl = typeof target === 'function' ? target() : target;

			if (targetEl) {
				scrollTop = targetEl.scrollTop;
				scrollHeight = targetEl.scrollHeight;
				clientHeight = targetEl.clientHeight;
			} else {
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				scrollHeight = document.documentElement.scrollHeight;
				clientHeight = document.documentElement.clientHeight;
			}

			const total = scrollHeight - clientHeight;
			const currentPercent = total > 0 ? Math.min(100, Math.max(0, (scrollTop / total) * 100)) : 0;
			const rounded = Math.round(currentPercent);

			setPercent(rounded);
			onChange?.(rounded);
		};

		calculateScroll();

		const targetEl = typeof target === 'function' ? target() : target;
		const scrollSource = targetEl || window;

		scrollSource.addEventListener('scroll', calculateScroll, { passive: true });
		window.addEventListener('resize', calculateScroll);

		return () => {
			scrollSource.removeEventListener('scroll', calculateScroll);
			window.removeEventListener('resize', calculateScroll);
		};
	}, [target, onChange]);

	// 计算背景渐变色
	const backgroundStyle = Array.isArray(color)
		? `linear-gradient(90deg, ${color.join(', ')})`
		: color;

	return (
		<div
			className={`rpc_scroll_tracker rpc_scroll_tracker_${position} ${className}`}
			style={{ height, ...style }}
		>
			<div
				className="rpc_scroll_tracker_bar"
				style={{
					width: `${percent}%`,
					background: backgroundStyle,
				}}
			/>
			{showPercentage && (
				<span className="rpc_scroll_tracker_percentage">{percent}%</span>
			)}
		</div>
	);
};

/* =========================================================================
 * 2. StickyHeader 组件
 * ========================================================================= */

export interface StickyHeaderProps {
	/** 子内容 */
	children: ReactNode | ((isSticky: boolean) => ReactNode);
	/** 吸顶距离顶部偏移量（像素），默认为 0 */
	offsetTop?: number;
	/** 吸顶状态改变回调 */
	onStickyChange?: (isSticky: boolean) => void;
	/** 监听滚动的目标容器（默认为 window） */
	target?: HTMLElement | (() => HTMLElement | null) | null;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
	children,
	offsetTop = 0,
	onStickyChange,
	target,
	className = '',
	style,
}) => {
	const [isSticky, setIsSticky] = useState<boolean>(false);
	const headerRef = useRef<HTMLDivElement>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		const targetEl = typeof target === 'function' ? target() : target;

		if (!sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// 当占位元素滚出视口顶部时触发吸顶
				const sticky = !entry.isIntersecting && entry.boundingClientRect.top <= offsetTop;
				setIsSticky(sticky);
				onStickyChange?.(sticky);
			},
			{
				root: targetEl || null,
				threshold: [0],
				rootMargin: `-${offsetTop}px 0px 0px 0px`,
			},
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [offsetTop, target, onStickyChange]);

	return (
		<>
			{/* 探测哨兵元素 */}
			<div ref={sentinelRef} style={{ height: 1, marginBottom: -1 }} />
			<div
				ref={headerRef}
				className={`rpc_sticky_header ${isSticky ? 'rpc_sticky_header_stuck' : ''} ${className}`}
				style={{
					top: `${offsetTop}px`,
					...style,
				}}
			>
				{typeof children === 'function' ? children(isSticky) : children}
			</div>
		</>
	);
};

export default ScrollTracker;
