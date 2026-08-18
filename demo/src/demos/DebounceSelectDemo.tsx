import { useState } from 'react';
import DebounceSelect, { SelectOption } from '../../../DebounceSelect';

// 模拟远程用户数据库
const mockUserDatabase: SelectOption[] = [
	{ label: '张三 (Frontend Engineer - React)', value: 'zhangsan' },
	{ label: '李四 (Backend Architect - Go/K8s)', value: 'lisi' },
	{ label: '王五 (Product Designer - UI/UX)', value: 'wangwu' },
	{ label: '赵六 (DevOps Engineer - AWS/Cloud)', value: 'zhaoliu' },
	{ label: '孙七 (QA Automation Tester)', value: 'sunqi' },
	{ label: '周八 (Data Scientist - PyTorch)', value: 'zhouba' },
	{ label: '吴九 (Fullstack Developer - Next.js)', value: 'wujiu' },
	{ label: '郑十 (Engineering Manager)', value: 'zhengshi' },
];

// 模拟异步请求
const searchUsers = async (search: string): Promise<SelectOption[]> => {
	console.log('正在请求 API 搜索:', search);
	await new Promise((resolve) => setTimeout(resolve, 500));
	if (!search.trim()) {
		return mockUserDatabase.slice(0, 4);
	}
	return mockUserDatabase.filter((item) =>
		String(item.label).toLowerCase().includes(search.toLowerCase()),
	);
};

export default function DebounceSelectDemo() {
	const [singleValue, setSingleValue] = useState<any>('zhangsan');
	const [multiValue, setMultiValue] = useState<any[]>(['zhangsan', 'lisi']);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 单选防抖搜索 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 异步单选搜索 (Single Search)</h3>
				<div style={{ maxWidth: 360 }}>
					<DebounceSelect
						value={singleValue}
						onChange={(val) => setSingleValue(val)}
						fetchOptions={searchUsers}
						placeholder="输入姓名或职位搜索用户..."
						defaultOptions={mockUserDatabase.slice(0, 4)}
					/>
				</div>
				<div style={{ marginTop: 8, fontSize: 13, color: '#595959' }}>
					当前选中值：<code style={{ background: '#f5f5f5', padding: '2px 6px' }}>{JSON.stringify(singleValue)}</code>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					内置 300ms 防抖，自动处理竞态时序请求，并自带清空与 Loading 转圈。
				</p>
			</div>

			{/* 2. 多选模式 (Multiple Tags) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 异步多选 Tags (Multiple Tags)</h3>
				<div style={{ maxWidth: 480 }}>
					<DebounceSelect
						mode="multiple"
						value={multiValue}
						onChange={(val) => setMultiValue(val)}
						fetchOptions={searchUsers}
						placeholder="多选协作者..."
						defaultOptions={mockUserDatabase}
					/>
				</div>
				<div style={{ marginTop: 8, fontSize: 13, color: '#595959' }}>
					当前选中值：<code style={{ background: '#f5f5f5', padding: '2px 6px' }}>{JSON.stringify(multiValue)}</code>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					多选模式下以 Tag 形式展示已选项目，支持单独快速删除和一键清空。
				</p>
			</div>

			{/* 3. 禁用状态与自定义防抖时长 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>3. 禁用状态 (disabled) & 自定义 800ms 防抖</h3>
				<div style={{ display: 'flex', gap: 16, maxWidth: 600 }}>
					<div style={{ flex: 1 }}>
						<DebounceSelect
							fetchOptions={searchUsers}
							debounceTimeout={800}
							placeholder="800ms 防抖间隔..."
						/>
					</div>
					<div style={{ flex: 1 }}>
						<DebounceSelect
							fetchOptions={searchUsers}
							defaultValue="lisi"
							defaultOptions={mockUserDatabase}
							disabled
						/>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持 `debounceTimeout` 自定义防抖等待时长，支持 `disabled` 禁用态。
				</p>
			</div>
		</div>
	);
}
