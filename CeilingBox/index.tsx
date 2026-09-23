import React, { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface CeilingBoxProps {
	/** 子元素内容，支持普通 ReactNode 或 Render Props 函数接收 isAffixed 状态 */
	children: ReactNode | ((isAffixed: boolean) => ReactNode);
	/** 距离视口/容器顶部的吸顶偏移距离（像素），默认为 0 */
	offsetTop?: number;
	/** 距离视口/容器底部的吸底偏移距离（像素，传值时开启吸底模式） */
	offsetBottom?: number;
	/** 监听滚动的目标 DOM 容器，不传时默认监听 window 全局滚动 */
	target?: () => HTMLElement | Window | null;
	/** 吸顶/吸底状态改变时的回调函数 */
	onChange?: (isAffixed: boolean) => void;
	/** 吸顶时是否自动启用毛玻璃磨砂与精致阴影滤镜，默认为 true */
	blur?: boolean;
	/** 吸顶/吸底状态下的图层层级 z-index，默认为 1000 */
	zIndex?: number;
	/** 自定义类名 */
	className?: string;
	/** 自定义行内样式 */
	style?: CSSProperties;
	/** 吸顶激活状态下追加的自定义类名 */
	affixedClassName?: string;
	/** 吸顶激活状态下追加的自定义行内样式 */
	affixedStyle?: CSSProperties;
}

const CeilingBox: React.FC<CeilingBoxProps> = ({
	children,
	offsetTop = 0,
	offsetBottom,
	target,
	onChange,
	blur = true,
	zIndex = 1000,
	className = '',
	style,
	affixedClassName = '',
	affixedStyle,
}) => {
	const [isAffixed, setIsAffixed] = useState<boolean>(false);
	const [boxRect, setBoxRect] = useState<{ width: number; height: number }>({
		width: 0,
		height: 0,
	});

	const placeholderRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const isAffixedRef = useRef<boolean>(false);

	isAffixedRef.current = isAffixed;

	useEffect(() => {
		const getTargetElement = (): HTMLElement | Window => {
			if (target) {
				const el = target();
				if (el) return el;
			}
			return window;
		};

		const handleScroll = () => {
			if (!placeholderRef.current) return;

			const targetEl = getTargetElement();
			const placeholderRect = placeholderRef.current.getBoundingClientRect();

			let targetTop = 0;
			let targetBottom = window.innerHeight;

			if (targetEl !== window && targetEl instanceof HTMLElement) {
				const containerRect = targetEl.getBoundingClientRect();
				targetTop = containerRect.top;
				targetBottom = containerRect.bottom;
			}

			let shouldAffix = false;

			if (offsetBottom !== undefined) {
				// 吸底模式
				shouldAffix = placeholderRect.bottom >= targetBottom - offsetBottom;
			} else {
				// 吸顶模式 (默认)
				shouldAffix = placeholderRect.top <= targetTop + offsetTop;
			}

			if (shouldAffix !== isAffixedRef.current) {
				// 触发吸顶切换前记录原本的宽高
				if (shouldAffix && contentRef.current) {
					const rect = contentRef.current.getBoundingClientRect();
					setBoxRect({ width: rect.width, height: rect.height });
				}

				setIsAffixed(shouldAffix);
				onChange?.(shouldAffix);
			}
		};

		const targetNode = getTargetElement();
		targetNode.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll, { passive: true });

		// 初始检查一次
		handleScroll();

		return () => {
			targetNode.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, [offsetTop, offsetBottom, target, onChange]);

	// 计算吸顶定位样式
	const computeFixedStyle = (): CSSProperties => {
		if (!isAffixed) return {};

		const fixedStyle: CSSProperties = {
			position: 'fixed',
			zIndex,
			width: boxRect.width ? `${boxRect.width}px` : '100%',
			boxSizing: 'border-box',
		};

		if (offsetBottom !== undefined) {
			fixedStyle.bottom = `${offsetBottom}px`;
		} else {
			fixedStyle.top = `${offsetTop}px`;
		}

		if (placeholderRef.current) {
			const rect = placeholderRef.current.getBoundingClientRect();
			fixedStyle.left = `${rect.left}px`;
		}

		return fixedStyle;
	};

	const renderedContent = typeof children === 'function' ? children(isAffixed) : children;

	return (
		<div
			ref={placeholderRef}
			className={`rpc_ceiling_box_wrapper ${className}`}
			style={{
				...style,
				height: isAffixed && boxRect.height ? `${boxRect.height}px` : undefined,
			}}
		>
			<div
				ref={contentRef}
				className={`rpc_ceiling_box ${
					isAffixed ? 'rpc_ceiling_box_affixed' : ''
				} ${isAffixed && blur ? 'rpc_ceiling_box_blur' : ''} ${isAffixed ? affixedClassName : ''}`}
				style={{
					...computeFixedStyle(),
					...(isAffixed ? affixedStyle : {}),
				}}
			>
				{renderedContent}
			</div>
		</div>
	);
};

export default CeilingBox;
