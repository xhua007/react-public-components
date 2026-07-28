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

export type SplitterPanelProps = {
	children?: ReactNode;
	collapsible?: boolean;
	defaultSize?: SplitterSize;
	max?: SplitterSize;
	min?: SplitterSize;
	resizable?: boolean;
	size?: SplitterSize;
	style?: CSSProperties;
};

export type SplitterProps = {
	children: ReactNode;
	className?: string;
	lazy?: boolean;
	onResize?: (sizes: number[]) => void;
	onResizeEnd?: (sizes: number[]) => void;
	onResizeStart?: (sizes: number[]) => void;
	orientation?: SplitterOrientation;
	style?: CSSProperties;
	vertical?: boolean;
};

type SplitterComponent = React.FC<SplitterProps> & {
	Panel: React.FC<SplitterPanelProps>;
};

const DRAGGER_SIZE = 8;
const MIN_PANEL_SIZE = 0;

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

const CustomSplitter: SplitterComponent = ({
	children,
	className,
	lazy = false,
	onResize,
	onResizeEnd,
	onResizeStart,
	orientation,
	style,
	vertical = false,
}) => {
	const resolvedOrientation = orientation ?? (vertical ? 'vertical' : 'horizontal');
	const rootRef = useRef<HTMLDivElement>(null);
	const sizesRef = useRef<number[]>([]);
	const lastNonZeroSizesRef = useRef<number[]>([]);
	const [containerSize, setContainerSize] = useState(0);
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [sizes, setSizes] = useState<number[]>([]);

	const panels = useMemo(
		() =>
			React.Children.toArray(children).filter(
				React.isValidElement,
			) as ReactElement<SplitterPanelProps>[],
		[children],
	);

	const trackSize = Math.max(0, containerSize - Math.max(0, panels.length - 1) * DRAGGER_SIZE);

	const getPanelMin = useCallback(
		(index: number) => parseSize(panels[index]?.props.min, trackSize, MIN_PANEL_SIZE),
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
			normalized.forEach((size, index) => {
				if (size > 1) {
					lastNonZeroSizesRef.current[index] = size;
				}
			});
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
			const rect = node.getBoundingClientRect();
			setContainerSize(resolvedOrientation === 'horizontal' ? rect.width : rect.height);
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
			lastNonZeroSizesRef.current = nextSizes.map((size) =>
				Math.max(size, trackSize / Math.max(panels.length, 1)),
			);
			return nextSizes;
		});
	}, [buildInitialSizes, panels.length, trackSize]);

	const getResizedPair = useCallback(
		(sourceSizes: number[], index: number, delta: number) => {
			const nextSizes = [...sourceSizes];
			const leftSize = nextSizes[index];
			const rightSize = nextSizes[index + 1];
			const leftMin = getPanelMin(index);
			const rightMin = getPanelMin(index + 1);
			const leftMax = getPanelMax(index);
			const rightMax = getPanelMax(index + 1);
			const minDelta = Math.max(leftMin - leftSize, rightSize - rightMax);
			const maxDelta = Math.min(leftMax - leftSize, rightSize - rightMin);
			const safeDelta = clamp(delta, minDelta, maxDelta);

			nextSizes[index] = leftSize + safeDelta;
			nextSizes[index + 1] = rightSize - safeDelta;
			return normalizeToTrack(nextSizes);
		},
		[getPanelMax, getPanelMin, normalizeToTrack],
	);

	const resizePair = useCallback(
		(index: number, delta: number, notify = true) => {
			updateSizes(getResizedPair(sizesRef.current, index, delta), notify);
		},
		[getResizedPair, updateSizes],
	);

	const startResize = (index: number, event: ReactPointerEvent<HTMLDivElement>) => {
		if (panels[index].props.resizable === false || panels[index + 1].props.resizable === false) {
			return;
		}

		event.preventDefault();
		const startPosition = getPointerPosition(event, resolvedOrientation);
		const startSizes = [...sizesRef.current];
		let latestSizes = startSizes;

		setDraggingIndex(index);
		onResizeStart?.(roundSizes(startSizes));

		const handlePointerMove = (moveEvent: PointerEvent) => {
			const delta = getPointerPosition(moveEvent, resolvedOrientation) - startPosition;
			latestSizes = getResizedPair(startSizes, index, delta);
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
			onResizeEnd?.(roundSizes(sizesRef.current));
		};

		document.addEventListener('pointermove', handlePointerMove);
		document.addEventListener('pointerup', handlePointerUp);
	};

	const toggleCollapse = (index: number, neighborIndex: number) => {
		const nextSizes = [...sizesRef.current];

		if (nextSizes[index] > 1) {
			lastNonZeroSizesRef.current[index] = nextSizes[index];
			nextSizes[neighborIndex] += nextSizes[index];
			nextSizes[index] = 0;
		} else {
			const restoredSize =
				lastNonZeroSizesRef.current[index] ||
				parseSize(panels[index].props.defaultSize, trackSize, trackSize / panels.length);
			nextSizes[index] = clamp(restoredSize, getPanelMin(index), getPanelMax(index));
			nextSizes[neighborIndex] = Math.max(0, nextSizes[neighborIndex] - nextSizes[index]);
		}

		updateSizes(nextSizes);
		onResizeEnd?.(roundSizes(sizesRef.current));
	};

	const resetSizes = () => {
		const nextSizes = buildInitialSizes();
		updateSizes(nextSizes);
		onResizeEnd?.(roundSizes(nextSizes));
	};

	const rootStyle: CSSProperties = {
		border: '1px solid #f0f0f0',
		borderRadius: 8,
		display: 'flex',
		flexDirection: resolvedOrientation === 'horizontal' ? 'row' : 'column',
		height: 360,
		minHeight: 0,
		overflow: 'hidden',
		position: 'relative',
		width: '100%',
		...style,
	};

	const renderCollapseButton = (
		draggerIndex: number,
		panelIndex: number,
		direction: 'start' | 'end',
	) => {
		const panel = panels[panelIndex];
		if (!panel?.props.collapsible) {
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

		return (
			<button
				aria-label="折叠面板"
				title="折叠面板"
				onClick={(event) => {
					event.stopPropagation();
					toggleCollapse(panelIndex, neighborIndex);
				}}
				style={{
					alignItems: 'center',
					background: '#fff',
					border: '1px solid #d9d9d9',
					borderRadius: 4,
					color: '#595959',
					cursor: 'pointer',
					display: 'flex',
					height: 20,
					justifyContent: 'center',
					padding: 0,
					width: 20,
					fontSize: 12,
					boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
				}}
				type="button"
			>
				<Icon />
			</button>
		);
	};

	// 渲染处于折叠状态下的“展开”触发手柄（挂载在根容器内侧 8px 处，100% 常显、绝对不被裁剪）
	const renderCollapsedExpandHandle = (panelIndex: number) => {
		const panel = panels[panelIndex];
		if (!panel?.props.collapsible) {
			return null;
		}

		const isCollapsed = sizes.length > 0 && (sizes[panelIndex] ?? 0) <= 1;
		if (!isCollapsed) {
			return null;
		}

		const isFirstPanel = panelIndex === 0;
		const neighborIndex = isFirstPanel ? panelIndex + 1 : panelIndex - 1;

		const Icon =
			resolvedOrientation === 'horizontal'
				? isFirstPanel
					? RightOutlined // 左面板折叠后，图标指向右 > (展开左面板)
					: LeftOutlined // 右面板折叠后，图标指向左 < (展开右面板)
				: isFirstPanel
					? DownOutlined
					: UpOutlined;

		const label =
			resolvedOrientation === 'horizontal'
				? isFirstPanel
					? '展开左侧面板'
					: '展开右侧面板'
				: isFirstPanel
					? '展开上方面板'
					: '展开下方面板';

		const positionStyle: CSSProperties =
			resolvedOrientation === 'horizontal'
				? isFirstPanel
					? { left: 8, top: '50%', transform: 'translateY(-50%)' }
					: { right: 8, top: '50%', transform: 'translateY(-50%)' }
				: isFirstPanel
					? { top: 8, left: '50%', transform: 'translateX(-50%)' }
					: { bottom: 8, left: '50%', transform: 'translateX(-50%)' };

		return (
			<button
				aria-label={label}
				key={`collapsed-handle-${panelIndex}`}
				title={label}
				onClick={(event) => {
					event.stopPropagation();
					toggleCollapse(panelIndex, neighborIndex);
				}}
				style={{
					position: 'absolute',
					alignItems: 'center',
					background: '#fff',
					border: '1px solid #1677ff',
					borderRadius: 4,
					color: '#1677ff',
					cursor: 'pointer',
					display: 'flex',
					height: 24,
					justifyContent: 'center',
					padding: 0,
					width: 24,
					fontSize: 12,
					boxShadow: '0 2px 8px rgba(22, 119, 255, 0.35)',
					zIndex: 20,
					...positionStyle,
				}}
				type="button"
			>
				<Icon />
			</button>
		);
	};

	return (
		<div className={className} ref={rootRef} style={rootStyle}>
			{panels.map((panel, index) => {
				const isHidden = sizes[index] <= 1;

				return (
					<React.Fragment key={index}>
						<div
							style={{
								background: index % 2 ? '#fff' : '#fafafa',
								flex: `0 0 ${sizes[index] ?? 0}px`,
								minHeight: 0,
								minWidth: 0,
								overflow: 'auto',
								padding: isHidden ? 0 : 16,
								transition: draggingIndex === null ? 'flex-basis 0.2s ease' : undefined,
								...panel.props.style,
							}}
						>
							{!isHidden && panel.props.children}
						</div>

						{index < panels.length - 1 && (
							<div
								aria-orientation={resolvedOrientation}
								onDoubleClick={resetSizes}
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
								style={{
									alignItems: 'center',
									background:
										hoveredIndex === index || draggingIndex === index ? '#e6f4ff' : '#f5f5f5',
									cursor: resolvedOrientation === 'horizontal' ? 'col-resize' : 'row-resize',
									display: 'flex',
									flex: `0 0 ${DRAGGER_SIZE}px`,
									justifyContent: 'center',
									outline: 'none',
									position: 'relative',
									userSelect: 'none',
									zIndex: 1,
								}}
								tabIndex={0}
							>
								<div
									style={{
										background:
											hoveredIndex === index || draggingIndex === index ? '#1677ff' : '#d9d9d9',
										borderRadius: 2,
										height: resolvedOrientation === 'horizontal' ? 48 : 2,
										width: resolvedOrientation === 'horizontal' ? 2 : 48,
									}}
								/>

								{/* 未折叠状态下呈现折叠按钮 */}
								<div
									style={{
										position: 'absolute',
										display: 'flex',
										flexDirection: resolvedOrientation === 'horizontal' ? 'column' : 'row',
										gap: 4,
										opacity: hoveredIndex === index ? 1 : 0.85,
										transition: 'opacity 0.15s ease',
										pointerEvents: 'auto',
										zIndex: 5,
									}}
								>
									{renderCollapseButton(index, index, 'start')}
									{renderCollapseButton(index, index + 1, 'end')}
								</div>
							</div>
						)}
					</React.Fragment>
				);
			})}

			{/* 当有面板处于折叠状态时，在根容器内部边缘常显渲染展开手柄 */}
			{panels.map((_, index) => renderCollapsedExpandHandle(index))}
		</div>
	);
};

CustomSplitter.Panel = SplitterPanel;

export default CustomSplitter;
