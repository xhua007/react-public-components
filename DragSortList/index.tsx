import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { HolderOutlined } from '../src/icons';
import './index.less';

export interface DragSortListProps<T> {
	/** 数据列表 */
	items: T[];
	/** 拖拽排序完成后的新列表回调 */
	onReorder: (newItems: T[], fromIndex: number, toIndex: number) => void;
	/** 提取唯一 Key */
	keyExtractor: (item: T, index: number) => string | number;
	/** 自定义渲染单个列表项内容 */
	renderItem: (item: T, index: number, isDragging: boolean) => ReactNode;
	/** 是否仅允许通过左侧把手图标拖动，默认为 false */
	handleOnly?: boolean;
	/** 是否展示左侧拖拽把手图标，默认为 true */
	showHandle?: boolean;
	/** 是否禁用拖拽排序，默认为 false */
	disabled?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

function arrayMove<T>(array: T[], from: number, to: number): T[] {
	const next = [...array];
	const [item] = next.splice(from, 1);
	next.splice(to, 0, item);
	return next;
}

function DragSortList<T>({
	items,
	onReorder,
	keyExtractor,
	renderItem,
	handleOnly = false,
	showHandle = true,
	disabled = false,
	className = '',
	style,
}: DragSortListProps<T>) {
	const containerRef = useRef<HTMLDivElement>(null);

	// 拖拽核心状态
	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const [pointerCoord, setPointerCoord] = useState<{ x: number; y: number } | null>(null);
	const [grabOffset, setGrabOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [dragItemRect, setDragItemRect] = useState<{ width: number; height: number } | null>(null);

	const dragIndexRef = useRef<number | null>(null);
	const hoverIndexRef = useRef<number | null>(null);
	const itemsRef = useRef<T[]>(items);

	dragIndexRef.current = dragIndex;
	hoverIndexRef.current = hoverIndex;
	itemsRef.current = items;

	// 处理鼠标按下发起拖拽
	const handlePointerDown = (
		e: React.PointerEvent<HTMLElement>,
		index: number,
		fromHandle: boolean,
	) => {
		if (disabled || e.button !== 0) return;
		if (handleOnly && !fromHandle) return;

		const targetItemEl = e.currentTarget.closest('.rpc_drag_sort_list_item') as HTMLElement;
		if (!targetItemEl) return;

		const rect = targetItemEl.getBoundingClientRect();
		const offsetX = e.clientX - rect.left;
		const offsetY = e.clientY - rect.top;

		setGrabOffset({ x: offsetX, y: offsetY });
		setDragItemRect({ width: rect.width, height: rect.height });
		setPointerCoord({ x: e.clientX, y: e.clientY });
		setDragIndex(index);
		setHoverIndex(index);

		const handlePointerMove = (moveEvent: PointerEvent) => {
			setPointerCoord({ x: moveEvent.clientX, y: moveEvent.clientY });

			if (!containerRef.current) return;
			const itemElements = Array.from(
				containerRef.current.querySelectorAll('.rpc_drag_sort_list_item'),
			) as HTMLElement[];

			if (itemElements.length === 0) return;

			const pointerY = moveEvent.clientY;
			let newHoverIndex = dragIndexRef.current ?? 0;

			// 精确检测鼠标当前所处的列表项插槽
			for (let i = 0; i < itemElements.length; i++) {
				const elRect = itemElements[i].getBoundingClientRect();
				if (pointerY >= elRect.top && pointerY <= elRect.bottom) {
					newHoverIndex = i;
					break;
				} else if (pointerY < itemElements[0].getBoundingClientRect().top) {
					newHoverIndex = 0;
					break;
				} else if (
					pointerY > itemElements[itemElements.length - 1].getBoundingClientRect().bottom
				) {
					newHoverIndex = itemElements.length - 1;
					break;
				}
			}

			if (newHoverIndex !== hoverIndexRef.current) {
				setHoverIndex(newHoverIndex);
			}
		};

		const handlePointerUp = () => {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);

			const from = dragIndexRef.current;
			const to = hoverIndexRef.current;
			const currentList = itemsRef.current;

			if (
				from !== null &&
				to !== null &&
				from !== to &&
				from >= 0 &&
				to >= 0 &&
				from < currentList.length &&
				to < currentList.length
			) {
				const reorderedList = arrayMove(currentList, from, to);
				onReorder(reorderedList, from, to);
			}

			setDragIndex(null);
			setHoverIndex(null);
			setPointerCoord(null);
			setDragItemRect(null);
		};

		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
	};

	// 动态计算实时预览重排后的列表
	const displayItems =
		dragIndex !== null && hoverIndex !== null && dragIndex !== hoverIndex
			? arrayMove(items, dragIndex, hoverIndex)
			: items;

	const draggedItemData = dragIndex !== null ? items[dragIndex] : null;

	return (
		<>
			<div
				ref={containerRef}
				className={`rpc_drag_sort_list ${disabled ? 'rpc_drag_sort_list_disabled' : ''} ${className}`}
				style={style}
			>
				{displayItems.map((item, idx) => {
					const key = keyExtractor(item, idx);
					const isCurrentPlaceholder = dragIndex !== null && hoverIndex === idx;

					return (
						<div
							key={key}
							onPointerDown={(e) => handlePointerDown(e, idx, false)}
							className={`rpc_drag_sort_list_item ${
								isCurrentPlaceholder ? 'rpc_drag_sort_list_item_placeholder' : ''
							}`}
							style={{
								height: isCurrentPlaceholder && dragItemRect ? dragItemRect.height : undefined,
							}}
						>
							{/* 当作为占位槽展示时，显示虚线卡槽 */}
							{isCurrentPlaceholder ? (
								<div className="rpc_drag_sort_list_placeholder_inner">
									<div className="rpc_drag_sort_list_placeholder_line" />
								</div>
							) : (
								<>
									{showHandle && (
										<span
											className="rpc_drag_sort_list_handle"
											onPointerDown={(e) => {
												if (handleOnly) {
													e.stopPropagation();
													handlePointerDown(e, idx, true);
												}
											}}
											title={disabled ? undefined : '按住拖动以重排序'}
										>
											<HolderOutlined />
										</span>
									)}

									<div className="rpc_drag_sort_list_content">{renderItem(item, idx, false)}</div>
								</>
							)}
						</div>
					);
				})}
			</div>

			{/* 浮动随动幽灵卡片（全局悬浮脱离文档流，100% 顺畅跟手，绝对 0 跳动） */}
			{dragIndex !== null &&
				pointerCoord &&
				dragItemRect &&
				draggedItemData &&
				typeof document !== 'undefined' &&
				ReactDOM.createPortal(
					<div
						className="rpc_drag_sort_list_floating_ghost"
						style={{
							left: pointerCoord.x - grabOffset.x,
							top: pointerCoord.y - grabOffset.y,
							width: dragItemRect.width,
							height: dragItemRect.height,
						}}
					>
						{showHandle && (
							<span
								className="rpc_drag_sort_list_handle"
								style={{ cursor: 'grabbing', color: '#1677ff' }}
							>
								<HolderOutlined />
							</span>
						)}
						<div className="rpc_drag_sort_list_content" style={{ flex: 1 }}>
							{renderItem(draggedItemData, dragIndex, true)}
						</div>
					</div>,
					document.body,
				)}
		</>
	);
}

export default DragSortList;
