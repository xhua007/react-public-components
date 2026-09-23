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

	const [handleOnly, setHandleOnly] = useState<boolean>(false);

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
      onReorder={(newList, fromIndex, toIndex) => setList(newList)}
      renderItem={(item, index, isDragging) => (
        <div>{index + 1}. {item.name}</div>
      )}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'items', desc: '列表数据数组', type: 'T[]', required: true },
		{
			name: 'onReorder',
			desc: '拖拽重新排序完成后的最新数据数组回调 (newItems, fromIndex, toIndex)',
			type: '(newItems: T[], fromIndex: number, toIndex: number) => void',
			required: true,
		},
		{
			name: 'keyExtractor',
			desc: '获取每项唯一标识 Key 的函数',
			type: '(item: T, index: number) => string | number',
			required: true,
		},
		{
			name: 'renderItem',
			desc: '自定义渲染单个列表项内容，接收 item, index, isDragging',
			type: '(item: T, index: number, isDragging: boolean) => ReactNode',
			required: true,
		},
		{
			name: 'handleOnly',
			desc: '是否仅允许通过左侧把手图标进行拖拽重排',
			type: 'boolean',
			default: 'false',
		},
		{ name: 'showHandle', desc: '是否展示左侧拖拽把手图标', type: 'boolean', default: 'true' },
		{ name: 'disabled', desc: '是否禁用拖拽排序', type: 'boolean', default: 'false' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 原生轻量拖拽重排序列表（按住左侧把手或列表项拖动）
				</h3>
				<p style={{ color: '#595959', fontSize: 14, marginBottom: 16 }}>
					基于标准原生 Drag & Drop 事件与精准 Drop Indicator 插入指示线，跨浏览器丝滑响应。
				</p>

				<div style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
					<label
						style={{
							fontSize: 13,
							display: 'inline-flex',
							alignItems: 'center',
							gap: 6,
							cursor: 'pointer',
						}}
					>
						<input
							type="checkbox"
							checked={handleOnly}
							onChange={(e) => setHandleOnly(e.target.checked)}
						/>
						<span>仅允许通过左侧把手图标拖动 (handleOnly)</span>
					</label>
				</div>

				<div style={{ maxWidth: 560 }}>
					<DragSortList
						items={tasks}
						handleOnly={handleOnly}
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
								<span style={{ fontWeight: 500, color: '#1f1f1f' }}>{item.title}</span>
								<div style={{ display: 'flex', gap: 8, fontSize: 12, alignItems: 'center' }}>
									<span
										style={{
											padding: '2px 8px',
											borderRadius: 4,
											background:
												item.priority === '高'
													? '#fff1f0'
													: item.priority === '中'
														? '#f6ffed'
														: '#f5f5f5',
											color:
												item.priority === '高'
													? '#cf1322'
													: item.priority === '中'
														? '#389e0d'
														: '#8c8c8c',
											fontWeight: 500,
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

				<div
					style={{
						marginTop: 14,
						fontSize: 13,
						color: '#595959',
						background: '#fafafa',
						padding: '8px 12px',
						borderRadius: 6,
						maxWidth: 560,
						border: '1px solid #f0f0f0',
					}}
				>
					💡 当前排序 ID 序列：<code>{tasks.map((t) => t.id).join(' -> ')}</code>
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
