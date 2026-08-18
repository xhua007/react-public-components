import { useState } from 'react';
import FloatingActionBar from '../../../FloatingActionBar';
import { DownloadOutlined, DeleteOutlined, ShareAltOutlined } from '../../../src/icons';

interface TableRow {
	id: string;
	title: string;
	status: string;
	author: string;
}

const mockRows: TableRow[] = [
	{ id: '1', title: '电商大促营销活动策划案', status: '进行中', author: '张三' },
	{ id: '2', title: 'Q3 核心系统稳定性架构评审', status: '已完成', author: '李四' },
	{ id: '3', title: '用户中心微服务重构技术规范', status: '待审核', author: '王五' },
	{ id: '4', title: '2026 年度安全合规自查报告', status: '进行中', author: '赵六' },
	{ id: '5', title: '前端组件库发布与规范沉淀', status: '已完成', author: '孙七' },
];

export default function FloatingActionBarDemo() {
	const [selectedIds, setSelectedIds] = useState<string[]>(['1', '2']);
	const [tipMessage, setTipMessage] = useState<string>('');

	const toggleSelect = (id: string) => {
		if (selectedIds.includes(id)) {
			setSelectedIds(selectedIds.filter((item) => item !== id));
		} else {
			setSelectedIds([...selectedIds, id]);
		}
	};

	const toggleSelectAll = () => {
		if (selectedIds.length === mockRows.length) {
			setSelectedIds([]);
		} else {
			setSelectedIds(mockRows.map((r) => r.id));
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 模拟表格多选与悬浮条联动 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 列表多选与底部悬浮批量操作栏联动
				</h3>
				<div
					style={{
						border: '1px solid #f0f0f0',
						borderRadius: 8,
						overflow: 'hidden',
						maxWidth: 680,
						background: '#ffffff',
					}}
				>
					{/* 表头 */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '12px 16px',
							background: '#fafafa',
							borderBottom: '1px solid #f0f0f0',
							fontWeight: 600,
							fontSize: 13,
							color: '#595959',
						}}
					>
						<input
							type="checkbox"
							checked={selectedIds.length === mockRows.length}
							onChange={toggleSelectAll}
							style={{ marginRight: 12, cursor: 'pointer' }}
						/>
						<span style={{ flex: 1 }}>文档标题</span>
						<span style={{ width: 100 }}>状态</span>
						<span style={{ width: 100 }}>负责人</span>
					</div>

					{/* 表格行 */}
					{mockRows.map((row) => {
						const isSelected = selectedIds.includes(row.id);
						return (
							<div
								key={row.id}
								onClick={() => toggleSelect(row.id)}
								style={{
									display: 'flex',
									alignItems: 'center',
									padding: '12px 16px',
									borderBottom: '1px solid #f5f5f5',
									background: isSelected ? '#f0f7ff' : '#ffffff',
									cursor: 'pointer',
									transition: 'background 0.15s',
									fontSize: 14,
								}}
							>
								<input
									type="checkbox"
									checked={isSelected}
									onChange={() => toggleSelect(row.id)}
									style={{ marginRight: 12, cursor: 'pointer' }}
									onClick={(e) => e.stopPropagation()}
								/>
								<span style={{ flex: 1, color: isSelected ? '#1677ff' : '#262626' }}>
									{row.title}
								</span>
								<span style={{ width: 100, color: '#8c8c8c', fontSize: 13 }}>{row.status}</span>
								<span style={{ width: 100, color: '#595959', fontSize: 13 }}>{row.author}</span>
							</div>
						);
					})}
				</div>

				{tipMessage && (
					<div
						style={{
							marginTop: 12,
							padding: '6px 12px',
							background: '#e6f4ff',
							color: '#0958d9',
							borderRadius: 4,
							fontSize: 13,
							width: 'fit-content',
						}}
					>
						{tipMessage}
					</div>
				)}

				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					勾选上方列表项。当选中数量大于 0 时，底部将自动浮现毛玻璃材质的批量操作栏；取消全部选择时自动平滑隐藏。
				</p>
			</div>

			{/* 底部悬浮操作栏组件 */}
			<FloatingActionBar
				selectedCount={selectedIds.length}
				totalCount={mockRows.length}
				onClear={() => setSelectedIds([])}
				actions={[
					{
						key: 'export',
						label: '批量导出',
						type: 'primary',
						icon: <DownloadOutlined />,
						onClick: () => setTipMessage(`成功批量导出选中的 ${selectedIds.length} 个文档！`),
					},
					{
						key: 'share',
						label: '批量共享',
						icon: <ShareAltOutlined />,
						onClick: () => setTipMessage(`已为选中的 ${selectedIds.length} 个文档开启共享权限！`),
					},
					{
						key: 'delete',
						label: '批量删除',
						type: 'danger',
						icon: <DeleteOutlined />,
						onClick: () => {
							setTipMessage(`已将选中的 ${selectedIds.length} 个文档移至回收站 🗑️`);
							setSelectedIds([]);
						},
					},
				]}
			/>
		</div>
	);
}
