import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '../src/icons';
import type {
	CSSProperties,
	ReactElement,
	ReactNode,
	PointerEvent as ReactPointerEvent,
} from 'react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type SplitterSize = number | `${number}%`;
export type SplitterOrientation = 'horizontal' | 'vertical';

export type SplitterCollapsible =
	| boolean
	| {
			start?: boolean;
			end?: boolean;
			showCollapsibleIcon?: boolean | 'auto';
	  };

/**
 * Splitter.Panel 子面板组件属性
 */
export type SplitterPanelProps = {
	/** 面板内容节点 */
	children?: ReactNode;
	/** 面板自定义类名 */
	className?: string;
	/**
	 * 折叠配置：
	 * - `boolean`: 是否允许两端折叠
	 * - `Object`: `{ start?: boolean; end?: boolean; showCollapsibleIcon?: boolean | 'auto' }`
	 */
	collapsible?: SplitterCollapsible;
	/** 面板初始默认尺寸（支持数字 px 或百分比字符串如 '40%'） */
	defaultSize?: SplitterSize;
	/** 折叠/隐藏时是否销毁面板内容节点（可覆盖 Splitter 根容器上的 destroyOnHidden 属性） */
	destroyOnHidden?: boolean;
	/** 面板最大允许尺寸限制 */
	max?: SplitterSize;
	/** 面板最小允许尺寸限制 */
	min?: SplitterSize;
	/** 是否允许通过分隔条拖拽调整大小（默认 true） */
	resizable?: boolean;
	/** 面板受控尺寸 */
	size?: SplitterSize;
	/** 面板自定义 CSS 样式 */
	style?: CSSProperties;
};

export type SplitterSemanticDOM = 'root' | 'panel' | 'dragger';
/** 语义化 DOM 结构标识 */
export type SemanticDOM = SplitterSemanticDOM;

export type SplitterStyles =
	| Partial<Record<SplitterSemanticDOM, CSSProperties>>
	| ((info: { props: SplitterProps }) => Partial<Record<SplitterSemanticDOM, CSSProperties>>);

export type SplitterClassNames =
	| Partial<Record<SplitterSemanticDOM, string>>
	| ((info: { props: SplitterProps }) => Partial<Record<SplitterSemanticDOM, string>>);

/**
 * Splitter 根容器组件属性
 */
export type SplitterProps = {
	/** 面板集合（建议传入 Splitter.Panel） */
	children?: ReactNode;
	/** 容器根节点自定义类名 */
	className?: string;
	/** 用于自定义组件内部各语义化结构（root、panel、dragger）的 class，支持对象或函数 */
	classNames?: SplitterClassNames;
	/** 折叠/隐藏时是否销毁面板内容节点（默认 false，保留组件状态） */
	destroyOnHidden?: boolean;
	/** 拖拽分隔条的宽度/高度（单位 px，默认 4） */
	draggerSize?: number;
	/** 是否在拖拽结束时才更新视图（默认 false） */
	lazy?: boolean;
	/** 面板展开或折叠状态改变时的回调 */
	onCollapse?: (collapsed: boolean[], sizes: number[]) => void;
	/** 拖拽过程中的实时尺寸变化回调 */
	onResize?: (sizes: number[]) => void;
	/** 拖拽结束、重置尺寸或折叠完成时的回调 */
	onResizeEnd?: (sizes: number[]) => void;
	/** 开始拖拽分隔条时的回调 */
	onResizeStart?: (sizes: number[]) => void;
	/** 双击拖拽条回调 */
	onDraggerDoubleClick?: (index: number) => void;
	/** 分屏方向：'horizontal'（水平分屏）| 'vertical'（垂直分屏），默认 'horizontal' */
	orientation?: SplitterOrientation;
	/** 容器根节点自定义 CSS 样式 */
	style?: CSSProperties;
	/** 容器根节点及各语义化结构（root、panel、dragger）自定义 CSS 样式，支持对象或函数 */
	styles?: SplitterStyles;
	/** 是否垂直分屏（orientation="vertical" 的简写形式） 排列方向，与 orientation 同时存在，以 orientation 优先 */
	vertical?: boolean;
	/** 自定义拖拽手柄图标/节点 */
	draggerIcon?: ReactNode;
};

export interface ResolvedCollapsible {
	start: boolean;
	end: boolean;
	showCollapsibleIcon: boolean | 'auto';
}

const getCollapsibleConfig = (collapsible?: SplitterCollapsible): ResolvedCollapsible => {
	if (!collapsible) {
		return { start: false, end: false, showCollapsibleIcon: 'auto' };
	}
	if (typeof collapsible === 'boolean') {
		return {
			start: collapsible,
			end: collapsible,
			showCollapsibleIcon: collapsible ? true : 'auto',
		};
	}
	return {
		start: collapsible.start ?? false,
		end: collapsible.end ?? false,
		showCollapsibleIcon: collapsible.showCollapsibleIcon ?? true,
	};
};

type SplitterComponent = React.FC<SplitterProps> & {
	Panel: React.FC<SplitterPanelProps>;
};

const DEFAULT_DRAGGER_SIZE = 4;
const MIN_DRAG_SIZE = 40; // 手动拖拽调整大小时的默认最小限制 (px)

const SplitterPanel: React.FC<SplitterPanelProps> = ({ children }) => <>{children}</>;

const isPercentSize = (value: SplitterSize): value is `${number}%` =>
	typeof value === 'string' && value.endsWith('%');

const parseSize = (value: SplitterSize | undefined, total: number, fallback: number) => {
	if (value === undefined) {
		return fallback;
	}

	if (isPercentSize(value)) {
		return (Number.parseFloat(value) / 100) * total;
	}

	return Number(value);
};

const roundSizes = (sizes: number[]) => sizes.map((size) => Math.round(size));

const getPointerPosition = (
	event: PointerEvent | ReactPointerEvent,
	orientation: SplitterOrientation,
) => (orientation === 'horizontal' ? event.clientX : event.clientY);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const resolveSemanticStyles = (
	styles: SplitterStyles | undefined,
	infoProps: SplitterProps,
): Partial<Record<SplitterSemanticDOM, CSSProperties>> => {
	if (!styles) {
		return {};
	}

	const resolved = typeof styles === 'function' ? styles({ props: infoProps }) : styles;
	return resolved || {};
};

const resolveSemanticClassNames = (
	classNames: SplitterClassNames | undefined,
	infoProps: SplitterProps,
): Partial<Record<SplitterSemanticDOM, string>> => {
	if (!classNames) {
		return {};
	}

	const resolved = typeof classNames === 'function' ? classNames({ props: infoProps }) : classNames;
	return resolved || {};
};

const CustomSplitter: SplitterComponent = (props) => {
	const {
		children,
		className,
		classNames,
		destroyOnHidden = false,
		draggerIcon,
		draggerSize = DEFAULT_DRAGGER_SIZE,
		lazy = false,
		onResize,
		onResizeEnd,
		onResizeStart,
		onCollapse,
		onDraggerDoubleClick,
		orientation,
		style,
		styles,
		vertical = false,
	} = props;
	const resolvedOrientation = orientation ?? (vertical ? 'vertical' : 'horizontal');
	const rootRef = useRef<HTMLDivElement>(null);
	const sizesRef = useRef<number[]>([]);
	const [containerSize, setContainerSize] = useState(0);
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [hoveredCollapsePanelIndex, setHoveredCollapsePanelIndex] = useState<number | null>(null);
	const [sizes, setSizes] = useState<number[]>([]);

	const semanticStyles = useMemo(() => resolveSemanticStyles(styles, props), [styles, props]);
	const semanticClassNames = useMemo(
		() => resolveSemanticClassNames(classNames, props),
		[classNames, props],
	);

	const panels = useMemo(
		() =>
			React.Children.toArray(children).filter(
				React.isValidElement,
			) as ReactElement<SplitterPanelProps>[],
		[children],
	);

	const trackSize = Math.max(0, containerSize - Math.max(0, panels.length - 1) * draggerSize);

	const getPanelMin = useCallback(
		(index: number) => parseSize(panels[index]?.props.min, trackSize, 0),
		[panels, trackSize],
	);

	const getPanelMax = useCallback(
		(index: number) => parseSize(panels[index]?.props.max, trackSize, trackSize),
		[panels, trackSize],
	);

	const normalizeToTrack = useCallback(
		(nextSizes: number[]) => {
			if (!trackSize || !nextSizes.length) {
				return nextSizes;
			}

			const normalized = [...nextSizes];
			const diff = trackSize - normalized.reduce((sum, size) => sum + size, 0);
			const flexibleIndex = normalized.findIndex((size) => size > 0);
			if (flexibleIndex !== -1) {
				normalized[flexibleIndex] += diff;
			}

			return normalized.map((size, index) => {
				// 折叠状态（size <= 1）保持为 0，不受 min 限制干扰
				if (size <= 1) {
					return 0;
				}
				// 拖拽过程从 0 拖出时，允许在 0 到 min 之间平滑过渡，不被强行跳变到 min
				if (size < getPanelMin(index)) {
					return size;
				}
				return clamp(size, getPanelMin(index), getPanelMax(index));
			});
		},
		[getPanelMax, getPanelMin, trackSize],
	);

	const buildInitialSizes = useCallback(
		(previous?: number[]) => {
			if (!trackSize || !panels.length) {
				return [];
			}

			if (previous?.length === panels.length) {
				const previousTotal = previous.reduce((sum, size) => sum + size, 0);
				if (previousTotal > 0) {
					return normalizeToTrack(previous.map((size) => (size / previousTotal) * trackSize));
				}
			}

			const explicitSizes = panels.map((panel) =>
				parseSize(panel.props.size ?? panel.props.defaultSize, trackSize, -1),
			);
			const usedSize = explicitSizes
				.filter((size) => size >= 0)
				.reduce((sum, size) => sum + size, 0);
			const unsetCount = explicitSizes.filter((size) => size < 0).length;
			const fallbackSize = unsetCount ? Math.max(0, (trackSize - usedSize) / unsetCount) : 0;

			return normalizeToTrack(
				explicitSizes.map((size, index) =>
					clamp(size >= 0 ? size : fallbackSize, getPanelMin(index), getPanelMax(index)),
				),
			);
		},
		[getPanelMax, getPanelMin, normalizeToTrack, panels, trackSize],
	);

	const updateSizes = useCallback(
		(nextSizes: number[], notify = true) => {
			const normalized = normalizeToTrack(nextSizes);
			setSizes(normalized);
			sizesRef.current = normalized;
			if (notify) {
				onResize?.(roundSizes(normalized));
			}
		},
		[normalizeToTrack, onResize],
	);

	useEffect(() => {
		const node = rootRef.current;
		if (!node) {
			return undefined;
		}

		const syncSize = () => {
			setContainerSize(resolvedOrientation === 'horizontal' ? node.clientWidth : node.clientHeight);
		};
		syncSize();

		const observer = new ResizeObserver(syncSize);
		observer.observe(node);
		return () => observer.disconnect();
	}, [resolvedOrientation]);

	useEffect(() => {
		setSizes((previous) => {
			const nextSizes = buildInitialSizes(previous);
			sizesRef.current = nextSizes;
			return nextSizes;
		});
	}, [buildInitialSizes]);

	const getResizedPair = useCallback(
		(sourceSizes: number[], index: number, delta: number) => {
			const nextSizes = [...sourceSizes];
			const isLeftCollapsed = sourceSizes[index] <= 1;
			const isRightCollapsed = sourceSizes[index + 1] <= 1;

			const leftMin = isLeftCollapsed ? 0 : getPanelMin(index);
			const rightMin = isRightCollapsed ? 0 : getPanelMin(index + 1);
			const leftMax = getPanelMax(index);
			const rightMax = getPanelMax(index + 1);

			const minDelta = Math.max(leftMin - sourceSizes[index], sourceSizes[index + 1] - rightMax);
			const maxDelta = Math.min(leftMax - sourceSizes[index], sourceSizes[index + 1] - rightMin);
			const safeDelta = clamp(delta, minDelta, maxDelta);

			nextSizes[index] = sourceSizes[index] + safeDelta;
			nextSizes[index + 1] = sourceSizes[index + 1] - safeDelta;
			return normalizeToTrack(nextSizes);
		},
		[getPanelMax, getPanelMin, normalizeToTrack],
	);

	const getInitialLockedIndex = useCallback(
		(sourceSizes: number[], startIndex: number, delta: number) => {
			if (sourceSizes[startIndex] <= 1 && delta < 0 && startIndex > 0) {
				return startIndex - 1;
			}
			if (sourceSizes[startIndex + 1] <= 1 && delta > 0 && startIndex < sourceSizes.length - 2) {
				return startIndex + 1;
			}
			return startIndex;
		},
		[],
	);

	const resizePair = useCallback(
		(index: number, delta: number, notify = true) => {
			const targetIndex = getInitialLockedIndex(sizesRef.current, index, delta);
			updateSizes(getResizedPair(sizesRef.current, targetIndex, delta), notify);
		},
		[getInitialLockedIndex, getResizedPair, updateSizes],
	);

	const startResize = (index: number, event: ReactPointerEvent<HTMLDivElement>) => {
		if (panels[index].props.resizable === false || panels[index + 1].props.resizable === false) {
			return;
		}

		event.preventDefault();
		const startPosition = getPointerPosition(event, resolvedOrientation);
		const startSizes = [...sizesRef.current];
		let latestSizes = startSizes;
		let lockedIndex: number | null = null;

		setDraggingIndex(index);
		onResizeStart?.(roundSizes(startSizes));

		const handlePointerMove = (moveEvent: PointerEvent) => {
			const delta = getPointerPosition(moveEvent, resolvedOrientation) - startPosition;
			if (delta === 0) {
				return;
			}

			if (lockedIndex === null) {
				lockedIndex = getInitialLockedIndex(startSizes, index, delta);
			}

			latestSizes = getResizedPair(startSizes, lockedIndex, delta);
			if (!lazy) {
				updateSizes(latestSizes, true);
			}
		};

		const handlePointerUp = () => {
			document.removeEventListener('pointermove', handlePointerMove);
			document.removeEventListener('pointerup', handlePointerUp);
			setDraggingIndex(null);
			if (lazy) {
				updateSizes(latestSizes, true);
			}
			const currentSizes = roundSizes(sizesRef.current);
			const currentCollapsed = sizesRef.current.map((size) => size <= 1);
			const startCollapsed = startSizes.map((size) => size <= 1);
			if (currentCollapsed.some((c, i) => c !== startCollapsed[i])) {
				onCollapse?.(currentCollapsed, currentSizes);
			}
			onResizeEnd?.(currentSizes);
		};

		document.addEventListener('pointermove', handlePointerMove);
		document.addEventListener('pointerup', handlePointerUp);
	};

	const toggleCollapse = (index: number, neighborIndex: number) => {
		const nextSizes = [...sizesRef.current];

		if (nextSizes[index] > 1) {
			nextSizes[neighborIndex] += nextSizes[index];
			nextSizes[index] = 0;
		} else {
			const initialSizes = buildInitialSizes();
			const initialSize =
				initialSizes[index] ??
				parseSize(panels[index].props.defaultSize, trackSize, trackSize / panels.length);
			const restoredSize = clamp(initialSize, getPanelMin(index), getPanelMax(index));
			nextSizes[index] = restoredSize;
			nextSizes[neighborIndex] = Math.max(0, nextSizes[neighborIndex] - nextSizes[index]);
		}

		updateSizes(nextSizes);
		const currentSizes = roundSizes(sizesRef.current);
		const currentCollapsed = sizesRef.current.map((size) => size <= 1);
		onCollapse?.(currentCollapsed, currentSizes);
		onResizeEnd?.(currentSizes);
	};

	const resetSizes = () => {
		const previousCollapsed = sizesRef.current.map((size) => size <= 1);
		const nextSizes = buildInitialSizes();
		updateSizes(nextSizes);
		const currentSizes = roundSizes(sizesRef.current);
		const currentCollapsed = sizesRef.current.map((size) => size <= 1);
		if (currentCollapsed.some((c, i) => c !== previousCollapsed[i])) {
			onCollapse?.(currentCollapsed, currentSizes);
		}
		onResizeEnd?.(currentSizes);
	};

	const rootStyle: CSSProperties = {
		border: '1px solid #f0f0f0',
		borderRadius: 8,
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: resolvedOrientation === 'horizontal' ? 'row' : 'column',
		height: '100%',
		minHeight: 0,
		overflow: 'hidden',
		position: 'relative',
		width: '100%',
		...semanticStyles.root,
		...style,
	};

	const renderCollapseButton = (
		draggerIndex: number,
		panelIndex: number,
		direction: 'start' | 'end',
	) => {
		const panel = panels[panelIndex];
		const config = getCollapsibleConfig(panel?.props.collapsible);
		const isAllowed = direction === 'start' ? config.start : config.end;

		if (!isAllowed || config.showCollapsibleIcon === false) {
			return null;
		}

		const neighborIndex = direction === 'start' ? panelIndex + 1 : panelIndex - 1;
		const isCollapsed = (sizes[panelIndex] ?? 0) <= 1;
		const isNeighborCollapsed = (sizes[neighborIndex] ?? 0) <= 1;

		// 自己折叠后隐藏；对侧面板折叠后也隐藏（避免与展开按钮重复/语义冲突）
		if (isCollapsed || isNeighborCollapsed) {
			return null;
		}

		// 展开时箭头指向面板将被折叠到的方向
		const Icon =
			resolvedOrientation === 'horizontal'
				? direction === 'start'
					? LeftOutlined
					: RightOutlined
				: direction === 'start'
					? UpOutlined
					: DownOutlined;

		const isHorizontal = resolvedOrientation === 'horizontal';
		const isAlwaysShow = config.showCollapsibleIcon === true;
		const isHoveredOrDragging = hoveredIndex === draggerIndex || draggingIndex === draggerIndex;
		const opacity = isAlwaysShow || isHoveredOrDragging ? 1 : 0;
		const pointerEvents = isAlwaysShow || isHoveredOrDragging ? 'auto' : 'none';

		const buttonTitle =
			resolvedOrientation === 'horizontal'
				? direction === 'start'
					? '折叠左侧面板'
					: '折叠右侧面板'
				: direction === 'start'
					? '折叠上方面板'
					: '折叠下方面板';

		return (
			<button
				aria-label={buttonTitle}
				title={buttonTitle}
				onClick={(event) => {
					event.stopPropagation();
					toggleCollapse(panelIndex, neighborIndex);
				}}
				onDoubleClick={(event) => {
					event.stopPropagation();
				}}
				style={{
					alignItems: 'center',
					background: '#fff',
					border: '1px solid #d9d9d9',
					borderRadius: 3,
					color: '#595959',
					cursor: 'pointer',
					display: 'flex',
					height: isHorizontal ? 40 : 14,
					width: isHorizontal ? 14 : 40,
					justifyContent: 'center',
					padding: 0,
					fontSize: 10,
					boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
					transition: 'all 0.2s ease',
					opacity,
					pointerEvents,
				}}
				type="button"
				onMouseEnter={(e) => {
					e.currentTarget.style.background = '#e5e7eb';
					e.currentTarget.style.color = '#1f2937';
					setHoveredCollapsePanelIndex(panelIndex);
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.background = '#fff';
					e.currentTarget.style.color = '#595959';
					setHoveredCollapsePanelIndex(null);
				}}
			>
				<Icon />
			</button>
		);
	};

	const rootClassName = [className, semanticClassNames.root].filter(Boolean).join(' ') || undefined;

	return (
		<div className={rootClassName} ref={rootRef} style={rootStyle}>
			{panels.map((panel, index) => {
				const isHidden = sizes[index] <= 1;
				const isLeftOrTopCollapsed = (sizes[index] ?? 0) <= 1;
				const isRightOrBottomCollapsed = (sizes[index + 1] ?? 0) <= 1;
				const isAnyCollapsed = isLeftOrTopCollapsed || isRightOrBottomCollapsed;
				const panelDestroyOnHidden = panel.props.destroyOnHidden ?? destroyOnHidden;
				const shouldRenderContent = !isHidden || !panelDestroyOnHidden;

				return (
					<React.Fragment key={index}>
						<div
							className={
								[semanticClassNames.panel, panel.props.className].filter(Boolean).join(' ') ||
								undefined
							}
							style={{
								background: index % 2 ? '#fff' : '#fafafa',
								boxSizing: 'border-box',
								flex: `0 0 ${sizes[index] ?? 0}px`,
								minHeight: 0,
								minWidth: 0,
								overflow: 'hidden',
								position: 'relative',
								boxShadow:
									hoveredCollapsePanelIndex === index ? 'inset 0 0 0 2px #1677ff' : undefined,
								transition:
									draggingIndex === null ? 'box-shadow 0.2s ease, flex-basis 0.2s ease' : undefined,
								...semanticStyles.panel,
								...panel.props.style,
							}}
						>
							{shouldRenderContent && (
								<div
									style={{
										boxSizing: 'border-box',
										display: isHidden ? 'none' : 'block',
										height: '100%',
										overflow: 'auto',
										padding: (sizes[index] ?? 0) < 32 ? 0 : 16,
										width: '100%',
									}}
								>
									{panel.props.children}
								</div>
							)}
						</div>

						{index < panels.length - 1 && (
							<div
								aria-orientation={resolvedOrientation}
								className={semanticClassNames.dragger}
								onDoubleClick={() => {
									onDraggerDoubleClick?.(index);
									resetSizes();
								}}
								onKeyDown={(event) => {
									const step = event.shiftKey ? 40 : 10;
									const directionMap =
										resolvedOrientation === 'horizontal'
											? { ArrowLeft: -step, ArrowRight: step }
											: { ArrowUp: -step, ArrowDown: step };
									const delta = directionMap[event.key as keyof typeof directionMap];
									if (delta !== undefined) {
										event.preventDefault();
										resizePair(index, delta);
									}
								}}
								onPointerDown={(event) => startResize(index, event)}
								onPointerEnter={() => setHoveredIndex(index)}
								onPointerLeave={() => setHoveredIndex(null)}
								role="separator"
								title="拖动调整大小，双击重置"
								style={{
									alignItems: 'center',
									background:
										hoveredIndex === index || draggingIndex === index ? '#e6f4ff' : '#f5f5f5',
									boxSizing: 'border-box',
									cursor: resolvedOrientation === 'horizontal' ? 'col-resize' : 'row-resize',
									display: 'flex',
									flex: `0 0 ${draggerSize}px`,
									justifyContent: 'center',
									marginLeft:
										index > 0 && (sizes[index] ?? 0) <= 1 && resolvedOrientation === 'horizontal'
											? -draggerSize
											: undefined,
									marginTop:
										index > 0 && (sizes[index] ?? 0) <= 1 && resolvedOrientation === 'vertical'
											? -draggerSize
											: undefined,
									outline: 'none',
									position: 'relative',
									userSelect: 'none',
									zIndex: isAnyCollapsed ? 2 : 1,
									...semanticStyles.dragger,
								}}
								tabIndex={0}
							>
								{/* 呈现拖拽指示线/图标 */}
								{draggerIcon ? (
									<div
										style={{
											alignItems: 'center',
											color:
												hoveredIndex === index || draggingIndex === index ? '#1677ff' : '#8c8c8c',
											display: 'flex',
											fontSize: 12,
											justifyContent: 'center',
											pointerEvents: 'none',
											transition: 'color 0.2s ease',
											userSelect: 'none',
										}}
									>
										{draggerIcon}
									</div>
								) : (
									<div
										style={{
											background:
												hoveredIndex === index || draggingIndex === index ? '#1677ff' : '#d9d9d9',
											borderRadius: 2,
											height: resolvedOrientation === 'horizontal' ? 40 : 2,
											transition: 'background 0.2s ease',
											width: resolvedOrientation === 'horizontal' ? 2 : 40,
										}}
									/>
								)}

								{/* 未折叠状态下呈现折叠按钮 */}
								{!isAnyCollapsed && (
									<div
										style={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											transform: 'translate(-50%, -50%)',
											display: 'flex',
											flexDirection: resolvedOrientation === 'horizontal' ? 'row' : 'column',
											alignItems: 'center',
											justifyContent: 'center',
											gap: 2,
											zIndex: 5,
										}}
									>
										<div
											style={{
												alignItems: 'center',
												display: 'flex',
												justifyContent: 'flex-end',
												minHeight: resolvedOrientation === 'horizontal' ? undefined : 14,
												minWidth: resolvedOrientation === 'horizontal' ? 14 : undefined,
											}}
										>
											{renderCollapseButton(index, index, 'start')}
										</div>
										<div
											style={{
												alignItems: 'center',
												display: 'flex',
												justifyContent: 'flex-start',
												minHeight: resolvedOrientation === 'horizontal' ? undefined : 14,
												minWidth: resolvedOrientation === 'horizontal' ? 14 : undefined,
											}}
										>
											{renderCollapseButton(index, index + 1, 'end')}
										</div>
									</div>
								)}

								{/* 折叠状态下呈现展开按钮（必须包含 collapsible 允许方可渲染） */}
								{isAnyCollapsed && (
									<div
										style={{
											position: 'absolute',
											top:
												resolvedOrientation === 'horizontal'
													? '50%'
													: isLeftOrTopCollapsed
														? 0
														: undefined,
											bottom:
												resolvedOrientation === 'horizontal'
													? undefined
													: isRightOrBottomCollapsed
														? 0
														: undefined,
											left:
												resolvedOrientation === 'horizontal'
													? isLeftOrTopCollapsed
														? 0
														: undefined
													: '50%',
											right:
												resolvedOrientation === 'horizontal'
													? isRightOrBottomCollapsed
														? 0
														: undefined
													: undefined,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											opacity: 1,
											pointerEvents: 'auto',
											zIndex: 5,
											transform:
												resolvedOrientation === 'horizontal'
													? `translate(${isLeftOrTopCollapsed ? '4px' : '-4px'}, -50%)`
													: `translate(-50%, ${isLeftOrTopCollapsed ? '4px' : '-4px'})`,
										}}
									>
										{(() => {
											const isStart = isLeftOrTopCollapsed;
											const targetIndex = isStart ? index : index + 1;
											const targetPanel = panels[targetIndex];
											const config = getCollapsibleConfig(targetPanel?.props.collapsible);
											const isAllowed = isStart ? config.start : config.end;

											if (!isAllowed || config.showCollapsibleIcon === false) {
												return null;
											}

											const ExpandIcon =
												resolvedOrientation === 'horizontal'
													? isLeftOrTopCollapsed
														? RightOutlined
														: LeftOutlined
													: isLeftOrTopCollapsed
														? DownOutlined
														: UpOutlined;

											const neighborIndex = isLeftOrTopCollapsed ? index + 1 : index;
											const isHorizontal = resolvedOrientation === 'horizontal';

											const expandTitle =
												resolvedOrientation === 'horizontal'
													? isLeftOrTopCollapsed
														? '展开左侧面板'
														: '展开右侧面板'
													: isLeftOrTopCollapsed
														? '展开上方面板'
														: '展开下方面板';

											return (
												<button
													aria-label={expandTitle}
													title={expandTitle}
													onClick={(event) => {
														event.stopPropagation();
														toggleCollapse(targetIndex, neighborIndex);
													}}
													onDoubleClick={(event) => {
														event.stopPropagation();
													}}
													style={{
														alignItems: 'center',
														background: '#f3f4f6',
														border: '1px solid #e5e7eb',
														borderRadius: 3,
														color: '#595959',
														cursor: 'pointer',
														display: 'flex',
														height: isHorizontal ? 40 : 14,
														width: isHorizontal ? 14 : 40,
														justifyContent: 'center',
														padding: 0,
														fontSize: 10,
														boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
														transition: 'all 0.2s ease',
													}}
													type="button"
													onMouseEnter={(e) => {
														e.currentTarget.style.background = '#e5e7eb';
														e.currentTarget.style.color = '#1f2937';
														setHoveredCollapsePanelIndex(targetIndex);
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.background = '#f3f4f6';
														e.currentTarget.style.color = '#595959';
														setHoveredCollapsePanelIndex(null);
													}}
												>
													<ExpandIcon />
												</button>
											);
										})()}
									</div>
								)}
							</div>
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
};

CustomSplitter.Panel = SplitterPanel;

export default CustomSplitter;
