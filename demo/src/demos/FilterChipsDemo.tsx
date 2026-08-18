import { useState } from 'react';
import FilterChips, { FilterChipItem } from '../../../FilterChips';

export default function FilterChipsDemo() {
	const [chips, setChips] = useState<FilterChipItem[]>([
		{ id: '1', label: '发布状态', value: '进行中' },
		{ id: '2', label: '所属部门', value: '技术研发中心' },
		{ id: '3', label: '优先级', value: 'P0 紧急' },
		{ id: '4', label: '版本范围', value: 'v1.3.0 ~ v1.4.0' },
	]);

	const handleRemove = (id: string) => {
		setChips((prev) => prev.filter((c) => c.id !== id));
	};

	const handleClearAll = () => {
		setChips([]);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 可折叠多维已选筛选项胶囊栏（表格条件汇总 + 一键清空）
				</h3>

				<div style={{ maxWidth: 620, padding: '16px', background: '#fafafa', borderRadius: 8 }}>
					{chips.length === 0 ? (
						<div style={{ fontSize: 13, color: '#8c8c8c' }}>
							暂无筛选条件，点击
							<button
								type="button"
								style={{ marginLeft: 6 }}
								onClick={() =>
									setChips([
										{ id: '1', label: '发布状态', value: '进行中' },
										{ id: '2', label: '所属部门', value: '技术研发中心' },
									])
								}
							>
								恢复默认条件
							</button>
						</div>
					) : (
						<FilterChips
							chips={chips}
							onRemove={handleRemove}
							onClearAll={handleClearAll}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
