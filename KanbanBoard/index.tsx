import React, { useState, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface KanbanColumn<T> {
	id: string;
	title: string;
	color?: string;
	items: T[];
}

export interface KanbanBoardProps<T> {
	/** 泳道列数据 */
	columns: KanbanColumn<T>[];
	/** 提取卡片唯一 Key */
	keyExtractor: (item: T) => string;
	/** 自定义渲染单个卡片 */
	renderCard: (item: T, columnId: string) => ReactNode;
	/** 卡片拖拽移动完成回调 */
	onCardMove?: (
		cardId: string,
		sourceColId: string,
		targetColId: string,
		newIndex: number,
	) => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

function KanbanBoard<T>({
	columns,
	keyExtractor,
	renderCard,
	onCardMove,
	className = '',
	style,
}: KanbanBoardProps<T>) {
	const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
	const [sourceColumnId, setSourceColumnId] = useState<string | null>(null);
	const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		cardId: string,
		colId: string,
	) => {
		setDraggingCardId(cardId);
		setSourceColumnId(colId);
		e.dataTransfer.setData('text/plain', JSON.stringify({ cardId, colId }));
		e.dataTransfer.effectAllowed = 'move';
	};

	const handleDragEnd = () => {
		setDraggingCardId(null);
		setSourceColumnId(null);
		setDragOverColumnId(null);
	};

	const handleDragOverCol = (e: React.DragEvent<HTMLDivElement>, colId: string) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		if (dragOverColumnId !== colId) {
			setDragOverColumnId(colId);
		}
	};

	const handleDropOnCol = (
		e: React.DragEvent<HTMLDivElement>,
		targetColId: string,
		targetIndex?: number,
	) => {
		e.preventDefault();
		if (!draggingCardId || !sourceColumnId) return;

		const targetColumn = columns.find((c) => c.id === targetColId);
		const newIdx = targetIndex !== undefined ? targetIndex : targetColumn ? targetColumn.items.length : 0;

		onCardMove?.(draggingCardId, sourceColumnId, targetColId, newIdx);
		handleDragEnd();
	};

	return (
		<div className={`rpc_kanban_board ${className}`} style={style}>
			{columns.map((col) => {
				const isOver = dragOverColumnId === col.id;

				return (
					<div
						key={col.id}
						className={`rpc_kanban_board_column ${
							isOver ? 'rpc_kanban_board_column_dragover' : ''
						}`}
						onDragOver={(e) => handleDragOverCol(e, col.id)}
						onDrop={(e) => handleDropOnCol(e, col.id)}
					>
						{/* 列头部 */}
						<div className="rpc_kanban_board_column_header">
							<div className="rpc_kanban_board_column_title_wrap">
								{col.color && (
									<span
										className="rpc_kanban_board_column_dot"
										style={{ backgroundColor: col.color }}
									/>
								)}
								<span>{col.title}</span>
							</div>
							<span className="rpc_kanban_board_column_count">
								{col.items.length}
							</span>
						</div>

						{/* 卡片列表 */}
						<div className="rpc_kanban_board_column_body">
							{col.items.map((item, idx) => {
								const cardId = keyExtractor(item);
								const isDragging = draggingCardId === cardId;

								return (
									<div
										key={cardId}
										draggable
										onDragStart={(e) => handleDragStart(e, cardId, col.id)}
										onDragEnd={handleDragEnd}
										onDragOver={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
										onDrop={(e) => {
											e.stopPropagation();
											handleDropOnCol(e, col.id, idx);
										}}
										className={`rpc_kanban_board_card ${
											isDragging ? 'rpc_kanban_board_card_dragging' : ''
										}`}
									>
										{renderCard(item, col.id)}
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default KanbanBoard;
