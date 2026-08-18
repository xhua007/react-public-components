import React, { useState, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface DragSortListProps<T> {
	/** 数据列表 */
	items: T[];
	/** 拖拽排序完成后的新列表回调 */
	onReorder: (newItems: T[]) => void;
	/** 提取唯一 Key */
	keyExtractor: (item: T, index: number) => string | number;
	/** 自定义渲染单个列表项内容 */
	renderItem: (item: T, index: number, isDragging: boolean) => ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

function DragSortList<T>({
	items,
	onReorder,
	keyExtractor,
	renderItem,
	className = '',
	style,
}: DragSortListProps<T>) {
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

	const handleDragStart = (index: number) => {
		setDraggingIndex(index);
	};

	const handleDragOver = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		if (dragOverIndex !== index) {
			setDragOverIndex(index);
		}
	};

	const handleDrop = (index: number) => {
		if (draggingIndex === null || draggingIndex === index) {
			setDraggingIndex(null);
			setDragOverIndex(null);
			return;
		}

		const newItems = [...items];
		const [draggedItem] = newItems.splice(draggingIndex, 1);
		newItems.splice(index, 0, draggedItem);

		setDraggingIndex(null);
		setDragOverIndex(null);
		onReorder(newItems);
	};

	const handleDragEnd = () => {
		setDraggingIndex(null);
		setDragOverIndex(null);
	};

	return (
		<div className={`rpc_drag_sort_list ${className}`} style={style}>
			{items.map((item, idx) => {
				const key = keyExtractor(item, idx);
				const isDragging = draggingIndex === idx;
				const isOver = dragOverIndex === idx && draggingIndex !== idx;

				return (
					<div
						key={key}
						draggable
						onDragStart={() => handleDragStart(idx)}
						onDragOver={(e) => handleDragOver(e, idx)}
						onDrop={() => handleDrop(idx)}
						onDragEnd={handleDragEnd}
						className={`rpc_drag_sort_list_item ${
							isDragging ? 'rpc_drag_sort_list_item_dragging' : ''
						} ${isOver ? 'rpc_drag_sort_list_item_over' : ''}`}
					>
						<span className="rpc_drag_sort_list_handle">⋮⋮</span>
						<div style={{ flex: 1 }}>{renderItem(item, idx, isDragging)}</div>
					</div>
				);
			})}
		</div>
	);
}

export default DragSortList;
