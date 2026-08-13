import type { CSSProperties, ReactNode, Key } from 'react';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './index.less';

/** 响应式断点名称 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/** 间距配置项 */
export type Gap = undefined | number | Partial<Record<Breakpoint, number>>;

/* eslint-disable @typescript-eslint/no-explicit-any */
/** 瀑布流单项结构 */
export interface MasonryItem<T = any> {
	/** 自定义展示内容，相对 itemRender 具有更高优先级 */
	children?: ReactNode;
	/** 自定义所在列（0-indexed） */
	column?: number;
	/** 自定义存储数据 */
	data?: T;
	/** 高度（手指定时优先使用，否则通过测量动态计算） */
	height?: number;
	/** 唯一标识 */
	key: Key;
}

/** 语义化 DOM 节点 */
export type MasonrySemanticDOM = 'root' | 'item';

export type MasonryClassNames =
	| Partial<Record<MasonrySemanticDOM, string>>
	| ((info: { props: MasonryProps<any> }) => Partial<Record<MasonrySemanticDOM, string>>);

export type MasonryStyles =
	| Partial<Record<MasonrySemanticDOM, CSSProperties>>
	| ((info: { props: MasonryProps<any> }) => Partial<Record<MasonrySemanticDOM, CSSProperties>>);

/** Masonry 组件属性 */
export interface MasonryProps<T = any> {
	/** 用于自定义组件内部各语义化结构的 class，支持对象或函数 */
	classNames?: MasonryClassNames;
	/** 列数，可以是固定值或响应式配置，默认 3 */
	columns?: number | Partial<Record<Breakpoint, number>>;
	/** 是否持续监听子项尺寸变化，默认 false */
	fresh?: boolean;
	/** 间距，可以是固定值、响应式配置或水平垂直间距配置 [horizontalGap, verticalGap]，默认 0 */
	gutter?: Gap | [Gap, Gap];
	/** 瀑布流项列表 */
	items?: MasonryItem<T>[];
	/** 自定义项渲染 */
	itemRender?: (item: MasonryItem<T>) => ReactNode;
	/** 语义化结构 style，支持对象和函数形式 */
	styles?: MasonryStyles;
	/** 列排序回调 */
	onLayoutChange?: (layout: { key: Key; column: number }[]) => void;
	/** 根节点自定义类名 */
	className?: string;
	/** 根节点自定义 CSS 样式 */
	style?: CSSProperties;
	/** JSX 子节点支持 */
	children?: ReactNode;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const BREAKPOINT_ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

/** 计算当前容器宽度对应的响应式断点 */
function getBreakpoint(width: number): Breakpoint {
	if (width >= 1600) return 'xxl';
	if (width >= 1200) return 'xl';
	if (width >= 992) return 'lg';
	if (width >= 768) return 'md';
	if (width >= 576) return 'sm';
	return 'xs';
}

/** 解析响应式配置值 */
function resolveResponsiveValue<T>(
	value: T | Partial<Record<Breakpoint, T>> | undefined,
	currentBp: Breakpoint,
	defaultValue: T,
): T {
	if (value === undefined || value === null) return defaultValue;
	if (typeof value === 'object') {
		const obj = value as Partial<Record<Breakpoint, T>>;
		if (obj[currentBp] !== undefined) return obj[currentBp]!;
		const currentIdx = BREAKPOINT_ORDER.indexOf(currentBp);
		for (let i = currentIdx - 1; i >= 0; i--) {
			const bp = BREAKPOINT_ORDER[i];
			if (obj[bp] !== undefined) return obj[bp]!;
		}
		for (let i = currentIdx + 1; i < BREAKPOINT_ORDER.length; i++) {
			const bp = BREAKPOINT_ORDER[i];
			if (obj[bp] !== undefined) return obj[bp]!;
		}
		return defaultValue;
	}
	return value;
}

/** 解析水平和垂直 Gutter */
function resolveGutter(
	gutter: Gap | [Gap, Gap] | undefined,
	currentBp: Breakpoint,
): [number, number] {
	if (!gutter) return [0, 0];
	if (Array.isArray(gutter)) {
		const h = resolveResponsiveValue(gutter[0], currentBp, 0);
		const v = resolveResponsiveValue(gutter[1], currentBp, 0);
		return [h, v];
	}
	const g = resolveResponsiveValue(gutter, currentBp, 0);
	return [g, g];
}

const Masonry = <T = unknown,>(props: MasonryProps<T>) => {
	const {
		classNames,
		columns = 3,
		fresh = false,
		gutter = 0,
		items,
		itemRender,
		styles,
		onLayoutChange,
		className,
		style,
		children,
	} = props;

	const rootRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState<number>(0);
	const [measuredHeights, setMeasuredHeights] = useState<Record<string, number>>({});
	const itemRefs = useRef<Map<Key, HTMLDivElement>>(new Map());

	// 规范化 items 列表（支持 items 属性或 JSX children）
	const normalizedItems: MasonryItem<T>[] = useMemo(() => {
		if (items) return items;
		if (!children) return [];
		return React.Children.toArray(children).map((child, index) => {
			if (React.isValidElement(child)) {
				const key = child.key ?? `masonry-item-${index}`;
				return {
					key,
					children: child,
				};
			}
			return {
				key: `masonry-item-${index}`,
				children: child,
			};
		});
	}, [items, children]);

	// 计算当前响应式断点
	const currentBreakpoint = useMemo(() => getBreakpoint(containerWidth), [containerWidth]);

	// 解析实际列数与间隔
	const resolvedColumns = useMemo(() => {
		const count = resolveResponsiveValue(columns, currentBreakpoint, 3);
		return Math.max(1, Math.floor(count));
	}, [columns, currentBreakpoint]);

	const [horizontalGap, verticalGap] = useMemo(
		() => resolveGutter(gutter, currentBreakpoint),
		[gutter, currentBreakpoint],
	);

	// 监听容器宽度变化
	useEffect(() => {
		if (!rootRef.current) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const width = entry.contentRect.width;
				if (width > 0) {
					setContainerWidth(width);
				}
			}
		});
		observer.observe(rootRef.current);
		return () => observer.disconnect();
	}, []);

	// 测量每个 item DOM 的实际高度
	const measureItems = useCallback(() => {
		let hasChange = false;
		const newHeights: Record<string, number> = {};

		itemRefs.current.forEach((el, key) => {
			if (el) {
				const strKey = String(key);
				const h = el.offsetHeight;
				if (h > 0) {
					newHeights[strKey] = h;
					if (measuredHeights[strKey] !== h) {
						hasChange = true;
					}
				}
			}
		});

		if (hasChange) {
			setMeasuredHeights((prev) => ({ ...prev, ...newHeights }));
		}
	}, [measuredHeights]);

	useLayoutEffect(() => {
		const handle = requestAnimationFrame(() => {
			measureItems();
		});
		return () => cancelAnimationFrame(handle);
	}, [measureItems]);

	// 监听 fresh 配置：持续监听每个 item 的 DOM 尺寸变动（例如图片加载、文本折叠）
	useEffect(() => {
		if (!fresh) return;
		const observer = new ResizeObserver(() => {
			measureItems();
		});

		itemRefs.current.forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [fresh, measureItems, normalizedItems]);

	// 计算单个列宽
	const columnWidth = useMemo(() => {
		if (containerWidth <= 0) return 0;
		const totalGap = (resolvedColumns - 1) * horizontalGap;
		return Math.max(0, (containerWidth - totalGap) / resolvedColumns);
	}, [containerWidth, resolvedColumns, horizontalGap]);

	// 瀑布流核心布局算法计算
	const { layoutItems, containerHeight, layoutChangeData } = useMemo(() => {
		const colHeights = new Array(resolvedColumns).fill(0);
		const changeData: { key: Key; column: number }[] = [];

		const computedList = normalizedItems.map((item) => {
			// 如果显式指定了 height，优先使用；否则使用 DOM 测量的 height
			const h = item.height ?? measuredHeights[String(item.key)] ?? 0;

			// 判断目标放置列（指定列数或者找当前高度最小的列）
			let targetCol = 0;
			if (typeof item.column === 'number' && item.column >= 0 && item.column < resolvedColumns) {
				targetCol = Math.floor(item.column);
			} else {
				let minH = colHeights[0];
				for (let i = 1; i < resolvedColumns; i++) {
					if (colHeights[i] < minH) {
						minH = colHeights[i];
						targetCol = i;
					}
				}
			}

			const left = targetCol * (columnWidth + horizontalGap);
			const top = colHeights[targetCol];

			// 更新该列高度
			colHeights[targetCol] += h + (h > 0 ? verticalGap : 0);

			changeData.push({ key: item.key, column: targetCol });

			return {
				item,
				left,
				top,
				width: columnWidth,
				height: h,
				column: targetCol,
			};
		});

		const totalH = Math.max(0, ...colHeights);

		return {
			layoutItems: computedList,
			containerHeight: totalH,
			layoutChangeData: changeData,
		};
	}, [normalizedItems, resolvedColumns, horizontalGap, verticalGap, columnWidth, measuredHeights]);

	// 触发 onLayoutChange 回调
	const prevLayoutRef = useRef<string>('');
	useEffect(() => {
		const layoutKey = JSON.stringify(layoutChangeData);
		if (layoutKey !== prevLayoutRef.current) {
			prevLayoutRef.current = layoutKey;
			onLayoutChange?.(layoutChangeData);
		}
	}, [layoutChangeData, onLayoutChange]);

	// 解析语义化 className 和 styles
	const semanticClassNames = useMemo(() => {
		if (typeof classNames === 'function') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return classNames({ props: props as MasonryProps<any> }) ?? {};
		}
		return classNames ?? {};
	}, [classNames, props]);

	const semanticStyles = useMemo(() => {
		if (typeof styles === 'function') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return styles({ props: props as MasonryProps<any> }) ?? {};
		}
		return styles ?? {};
	}, [styles, props]);

	return (
		<div
			ref={rootRef}
			className={['masonry_root', semanticClassNames.root, className].filter(Boolean).join(' ')}
			style={{
				minHeight: containerHeight > 0 ? containerHeight : undefined,
				height: containerHeight > 0 ? containerHeight : undefined,
				...semanticStyles.root,
				...style,
			}}
		>
			{layoutItems.map(({ item, left, top, width, height }) => {
				const content = item.children ?? itemRender?.(item);

				return (
					<div
						key={item.key}
						ref={(node) => {
							if (node) {
								itemRefs.current.set(item.key, node);
							} else {
								itemRefs.current.delete(item.key);
							}
						}}
						className={['masonry_item', semanticClassNames.item].filter(Boolean).join(' ')}
						style={{
							width: containerWidth > 0 ? width : '100%',
							height: height > 0 ? height : undefined,
							transform: containerWidth > 0 ? `translate3d(${left}px, ${top}px, 0)` : undefined,
							opacity: containerWidth > 0 ? 1 : 0,
							...semanticStyles.item,
						}}
						onLoad={measureItems}
					>
						{content}
					</div>
				);
			})}
		</div>
	);
};

export default Masonry;
