import { useState } from 'react';
import KanbanBoard, { KanbanColumn } from '../../../KanbanBoard';

interface Task {
	id: string;
	title: string;
	assignee: string;
	tag: string;
	tagColor: string;
}

export default function KanbanBoardDemo() {
	const [columns, setColumns] = useState<KanbanColumn<Task>[]>([
		{
			id: 'todo',
			title: '待处理 (To Do)',
			color: '#faad14',
			items: [
				{ id: '1', title: '编写 KanbanBoard 单元测试', assignee: 'Alex', tag: '技术', tagColor: '#1677ff' },
				{ id: '2', title: '设计多租户企业级数据大屏', assignee: 'Sarah', tag: 'UI', tagColor: '#722ed1' },
			],
		},
		{
			id: 'inprogress',
			title: '进行中 (In Progress)',
			color: '#1677ff',
			items: [
				{ id: '3', title: '优化 WebGL 3D 渲染帧率', assignee: 'Devin', tag: '性能', tagColor: '#52c41a' },
			],
		},
		{
			id: 'done',
			title: '已完成 (Done)',
			color: '#52c41a',
			items: [
				{ id: '4', title: '发布 react-public-components v1.3.0', assignee: 'Alex', tag: '发版', tagColor: '#eb2f96' },
			],
		},
	]);

	const handleCardMove = (
		cardId: string,
		sourceColId: string,
		targetColId: string,
		newIndex: number,
	) => {
		setColumns((prev) => {
			let movedCard: Task | null = null;

			// 1. 从原列移除
			const updatedCols = prev.map((col) => {
				if (col.id === sourceColId) {
					const remaining = col.items.filter((item) => {
						if (item.id === cardId) {
							movedCard = item;
							return false;
						}
						return true;
					});
					return { ...col, items: remaining };
				}
				return col;
			});

			if (!movedCard) return prev;

			// 2. 插入目标列
			return updatedCols.map((col) => {
				if (col.id === targetColId) {
					const items = [...col.items];
					items.splice(newIndex, 0, movedCard!);
					return { ...col, items };
				}
				return col;
			});
		});
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 轻量任务看板（原生跨列拖拽 + 泳道管理 + 责任人与标签）
				</h3>

				<KanbanBoard
					columns={columns}
					keyExtractor={(task) => task.id}
					onCardMove={handleCardMove}
					renderCard={(task) => (
						<div>
							<div style={{ fontSize: 14, fontWeight: 500, color: '#1f1f1f', marginBottom: 8 }}>
								{task.title}
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<span
									style={{
										fontSize: 11,
										padding: '1px 6px',
										borderRadius: 4,
										background: '#f5f5f5',
										color: task.tagColor,
										border: `1px solid ${task.tagColor}30`,
									}}
								>
									{task.tag}
								</span>
								<span style={{ fontSize: 12, color: '#8c8c8c' }}>👤 {task.assignee}</span>
							</div>
						</div>
					)}
				/>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					按住任意任务卡片拖动至其他泳道列中松开，体验流畅的看板状态流转。
				</p>
			</div>
		</div>
	);
}
