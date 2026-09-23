import React, {
	useState,
	useEffect,
	useRef,
	useImperativeHandle,
	forwardRef,
	CSSProperties,
	ReactNode,
	RefObject,
} from 'react';
import './index.less';

export interface LazyLoadBoxRef {
	/** 立即强制触发加载真实内容 */
	load: () => void;
	/** 重置加载状态（仅在 once=false 或需要重新触发时可用） */
	reset: () => void;
	/** 获取当前元素是否在可视/预加载区域内 */
	getInView: () => boolean;
	/** 获取当前是否已经完成过加载 */
	getHasLoaded: () => boolean;
	/** 获取容器原生 DOM 节点 */
	getDOMNode: () => HTMLDivElement | null;
}

export interface LazyRenderProps {
	/** 当前是否在视口范围内 */
	isInView: boolean;
	/** 是否已经触发过加载并完成挂载 */
	hasLoaded: boolean;
	/** 重新触发加载函数 */
	load: () => void;
}

export type LazyOffset =
	| number
	| string
	| [number | string, number | string]
	| [number | string, number | string, number | string, number | string];

export interface LazyLoadBoxProps {
	/**
	 * 子组件或 Render Props
	 * 当为普通组件时：未进入视口时不渲染，进入视口预加载范围后挂载并触发其内部网络请求与渲染；
	 * 当为函数时：接收 ({ isInView, hasLoaded, load }) 回传参数
	 */
	children?: ReactNode | ((props: LazyRenderProps) => ReactNode);
	/**
	 * 距离视口/滚动条多远时提前触发加载（单位 px，或标准 rootMargin 字符串/数组）
	 * 例如：
	 * - 纯数字：offset={200} （表示上下预加载 200px）
	 * - 字符串：offset="200px 0px"
	 * - 数组：offset={[100, 200]} （表示上下预加载距离）
	 * 默认：150
	 */
	offset?: LazyOffset;
	/**
	 * 未加载前的预估高度/最小高度，防止页面未渲染时高度坍塌导致滚动条剧烈跳动（CLS）
	 * 默认：180
	 */
	height?: number | string;
	/**
	 * 预估宽度/最小宽度（可选）
	 */
	width?: number | string;
	/**
	 * 未加载时显示的占位内容（如骨架屏或加载动画）
	 * 默认提供内置的高品质流光呼吸骨架屏
	 */
	placeholder?: ReactNode;
	/**
	 * 是否显示默认占位骨架屏（当 placeholder 未指定时生效）
	 * 默认：true
	 */
	skeleton?: boolean;
	/**
	 * 骨架屏是否显示微边框
	 * 默认：false
	 */
	bordered?: boolean;
	/**
	 * 是否只加载一次（默认 true：进入视口后保持挂载，移出不会销毁与重复请求）
	 * 若设为 false，则移出视口时会自动卸载，再次移入时重新挂载
	 */
	once?: boolean;
	/**
	 * 强制立即渲染（忽略视口距离，用于一键展开、批量导出、页面打印等场景）
	 */
	forceRender?: boolean;
	/**
	 * 指定局部滚动容器（支持 DOM 节点、RefObject、选择器字符串或 getter 函数），默认监听 window 视口
	 */
	scrollContainer?:
		HTMLElement | null | string | RefObject<HTMLElement | null> | (() => HTMLElement | null);
	/**
	 * 交叉比例阈值（0 ~ 1），默认 0
	 */
	threshold?: number | number[];
	/**
	 * 是否在加载完成后启用平滑淡入动效
	 * 默认：true
	 */
	animate?: boolean;
	/**
	 * 服务端渲染（SSR）时是否直接渲染内容（默认为 false）
	 */
	ssr?: boolean;
	/**
	 * 首次进入可视/预加载区域触发加载时的回调
	 */
	onVisible?: () => void;
	/**
	 * 可见性变化时的实时回调
	 */
	onInViewChange?: (inView: boolean) => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

/** 规范化 offset 为标准 CSS 4 方向 rootMargin 字符串 */
function parseRootMargin(offset: LazyOffset): string {
	if (typeof offset === 'number') {
		return `${offset}px 0px ${offset}px 0px`;
	}
	if (typeof offset === 'string') {
		return offset;
	}
	if (Array.isArray(offset)) {
		if (offset.length === 2) {
			const [v, h] = offset.map((item) => (typeof item === 'number' ? `${item}px` : item));
			return `${v} ${h} ${v} ${h}`;
		}
		if (offset.length === 4) {
			return offset.map((item) => (typeof item === 'number' ? `${item}px` : item)).join(' ');
		}
	}
	return '150px 0px 150px 0px';
}

export const LazyLoadBox = forwardRef<LazyLoadBoxRef, LazyLoadBoxProps>(
	(
		{
			children,
			offset = 150,
			height = 180,
			width,
			placeholder,
			skeleton = true,
			bordered = false,
			once = true,
			forceRender = false,
			scrollContainer,
			threshold = 0,
			animate = true,
			ssr = false,
			onVisible,
			onInViewChange,
			className = '',
			style,
		},
		ref,
	) => {
		const containerRef = useRef<HTMLDivElement | null>(null);
		const [isInView, setIsInView] = useState<boolean>(Boolean(ssr || forceRender));
		const [hasLoaded, setHasLoaded] = useState<boolean>(Boolean(ssr || forceRender));
		const hasLoadedRef = useRef<boolean>(hasLoaded);
		const onVisibleRef = useRef(onVisible);
		const onInViewChangeRef = useRef(onInViewChange);

		onVisibleRef.current = onVisible;
		onInViewChangeRef.current = onInViewChange;

		const rootMargin = parseRootMargin(offset);

		const triggerLoad = () => {
			if (!hasLoadedRef.current) {
				setHasLoaded(true);
				setIsInView(true);
				hasLoadedRef.current = true;
				onVisibleRef.current?.();
			}
		};

		// 暴露命令式操作方法
		useImperativeHandle(ref, () => ({
			load: triggerLoad,
			reset: () => {
				setHasLoaded(false);
				setIsInView(false);
				hasLoadedRef.current = false;
			},
			getInView: () => isInView,
			getHasLoaded: () => hasLoadedRef.current,
			getDOMNode: () => containerRef.current,
		}));

		// 响应 forceRender 受控属性变化
		useEffect(() => {
			if (forceRender && !hasLoadedRef.current) {
				triggerLoad();
			}
		}, [forceRender]);

		useEffect(() => {
			// 如果已经加载且 once 为 true，则无需挂载 Observer
			if (hasLoaded && once) {
				return;
			}

			const target = containerRef.current;
			if (!target) return;

			// 环境不支持 IntersectionObserver，降级为立即加载
			if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
				triggerLoad();
				return;
			}

			// 解析 scrollContainer 根节点
			let rootElement: HTMLElement | null = null;
			if (typeof scrollContainer === 'string') {
				rootElement = document.querySelector(scrollContainer);
			} else if (typeof scrollContainer === 'function') {
				rootElement = scrollContainer();
			} else if (scrollContainer && 'current' in scrollContainer) {
				rootElement = (scrollContainer as RefObject<HTMLElement | null>).current;
			} else if (scrollContainer instanceof HTMLElement) {
				rootElement = scrollContainer;
			}

			let observer: IntersectionObserver | null = null;

			try {
				observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							const inView = entry.isIntersecting;
							setIsInView(inView);
							onInViewChangeRef.current?.(inView);

							if (inView) {
								if (!hasLoadedRef.current) {
									setHasLoaded(true);
									hasLoadedRef.current = true;
									onVisibleRef.current?.();
								}
								if (once) {
									observer?.unobserve(target);
									observer?.disconnect();
								}
							} else {
								if (!once) {
									setHasLoaded(false);
									hasLoadedRef.current = false;
								}
							}
						});
					},
					{
						root: rootElement,
						rootMargin,
						threshold,
					},
				);

				observer.observe(target);
			} catch {
				// 如果传参格式或环境发生意外，安全降级立即触发
				triggerLoad();
			}

			return () => {
				if (observer) {
					observer.unobserve(target);
					observer.disconnect();
				}
			};
		}, [rootMargin, threshold, once, hasLoaded, scrollContainer]);

		const formattedHeight = typeof height === 'number' ? `${height}px` : height;
		const formattedWidth = typeof width === 'number' ? `${width}px` : width;

		// 默认骨架占位
		const defaultPlaceholder = skeleton ? (
			<div
				className={`rpc_lazy_load_placeholder ${bordered ? 'rpc_lazy_load_placeholder_bordered' : ''}`}
				style={{
					minHeight: formattedHeight,
					width: formattedWidth,
				}}
			>
				<div className="rpc_lazy_load_skeleton" />
			</div>
		) : (
			<div
				style={{
					minHeight: formattedHeight,
					width: formattedWidth,
				}}
			/>
		);

		const shouldRenderContent = hasLoaded || (once ? hasLoaded : isInView);

		const containerClass = [
			'rpc_lazy_load_box',
			shouldRenderContent ? 'rpc_lazy_load_loaded' : 'rpc_lazy_load_pending',
			animate && shouldRenderContent ? 'rpc_lazy_load_fade_in' : '',
			className,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div
				ref={containerRef}
				className={containerClass}
				style={{
					minHeight: shouldRenderContent ? undefined : formattedHeight,
					width: formattedWidth,
					...style,
				}}
			>
				{shouldRenderContent
					? typeof children === 'function'
						? (children as (props: LazyRenderProps) => ReactNode)({
								isInView,
								hasLoaded,
								load: triggerLoad,
							})
						: children
					: placeholder !== undefined
						? placeholder
						: defaultPlaceholder}
			</div>
		);
	},
);

LazyLoadBox.displayName = 'LazyLoadBox';

export default LazyLoadBox;
