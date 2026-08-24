import { useState } from 'react';
import DragSortList from '../../../DragSortList';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

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

	const usageCode = `import { useState } from 'react';
import { DragSortList } from 'react-public-components';

export default function App() {
  const [list, setList] = useState([
    { id: '1', name: '项目阶段 A' },
    { id: '2', name: '项目阶段 B' },
    { id: '3', name: '项目阶段 C' },
  ]);

  return (
    <DragSortList
      items={list}
      keyExtractor={(item) => item.id}
      onReorder={(newList) => setList(newList)}
      renderItem={(item, index, isDragging) => (
        <div>{index + 1}. {item.name}</div>
      )}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'items', desc: '列表数据数组', type: 'T[]', required: true },
		{ name: 'onReorder', desc: '拖拽重新排序完成后的最新数据数组回调', type: '(newItems: T[]) => void', required: true },
		{ name: 'keyExtractor', desc: '获取每项唯一标识 Key 的函数', type: '(item: T, index: number) => string | number', required: true },
		{ name: 'renderItem', desc: '自定义渲染单个列表项内容，接收 item, index, isDragging', type: '(item, index, isDragging) => ReactNode', required: true },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 640 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
