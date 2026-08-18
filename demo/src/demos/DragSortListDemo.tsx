import { useState } from 'react';
import DragSortList from '../../../DragSortList';

interface TaskItem {
	id: string;
	title: string;
	priority: '高' | '中' | '低';
	tag: string;
}

export default function DragSortListDemo() {
	const [tasks, setTasks] = useState<TaskItem[]>([
		{ id: '1', title: '完成客户满意度问卷调研', priority: '高', tag: '运营' },
		{ id: '2', title: '修复支付网关超时偶发异常', priority: '高', tag: '技术' },
		{ id: '3', title: '更新 2026 Q3 季度产品路线图', priority: '中', tag: '产品' },
		{ id: '4', title: '全员组织架构与绩效宣讲', priority: '低', tag: '人事' },
	]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 原生轻量拖拽重排序列表（按住左侧把手或列表项拖动）
				</h3>
				<div style={{ maxWidth: 520 }}>
					<DragSortList
						items={tasks}
						keyExtractor={(item) => item.id}
						onReorder={(newItems) => setTasks(newItems)}
						renderItem={(item) => (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									fontSize: 14,
								}}
							>
								<span style={{ fontWeight: 500 }}>{item.title}</span>
								<div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
									<span
										style={{
											padding: '2px 8px',
											borderRadius: 4,
											background: item.priority === '高' ? '#fff1f0' : '#f6ffed',
											color: item.priority === '高' ? '#cf1322' : '#389e0d',
										}}
									>
										{item.priority}优先级
									</span>
									<span style={{ color: '#8c8c8c' }}>[{item.tag}]</span>
								</div>
							</div>
						)}
					/>
				</div>
				<div style={{ marginTop: 12, fontSize: 13, color: '#595959' }}>
					当前排序 ID：<code>{tasks.map((t) => t.id).join(' -> ')}</code>
				</div>
			</div>
		</div>
	);
}
