import { useState } from 'react';
import DebounceSelect, { SelectOption } from '../../../DebounceSelect';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

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

	const usageCode = `import { useState } from 'react';
import { DebounceSelect } from 'react-public-components';

export default function App() {
  const [value, setValue] = useState();

  const fetchUsers = async (keyword: string) => {
    const res = await fetch(\`/api/users?q=\${keyword}\`);
    const data = await res.json();
    return data.map(u => ({ label: u.name, value: u.id }));
  };

  return (
    <DebounceSelect
      value={value}
      onChange={(val) => setValue(val)}
      fetchOptions={fetchUsers}
      debounceTimeout={300}
      placeholder="搜索用户姓名..."
      allowClear
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'fetchOptions', desc: '异步根据搜索关键字拉取选项数据的函数', type: '(search: string) => Promise<SelectOption[]>', required: true },
		{ name: 'value', desc: '当前选中的值（受控）', type: 'SelectValue', default: '-' },
		{ name: 'defaultValue', desc: '默认选中的值', type: 'SelectValue', default: '-' },
		{ name: 'onChange', desc: '选中值发生变化时的回调函数', type: '(value, option) => void', default: '-' },
		{ name: 'mode', desc: "选择模式：'single' 单选 / 'multiple' 多选 Tag 标签", type: "'single' | 'multiple'", default: "'single'" },
		{ name: 'debounceTimeout', desc: '防抖等待时间（毫秒）', type: 'number', default: '300' },
		{ name: 'placeholder', desc: '输入框占位符', type: 'string', default: "'请选择...'" },
		{ name: 'allowClear', desc: '是否支持一键清空', type: 'boolean', default: 'true' },
		{ name: 'disabled', desc: '是否禁用选择器', type: 'boolean', default: 'false' },
		{ name: 'defaultOptions', desc: '初始化默认展示的预设选项列表', type: 'SelectOption[]', default: '[]' },
		{ name: 'notFoundContent', desc: '无匹配搜索结果时的展示内容', type: 'ReactNode', default: "'暂无匹配数据'" },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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
					当前选中值：
					<code style={{ background: '#f5f5f5', padding: '2px 6px' }}>
						{JSON.stringify(singleValue)}
					</code>
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
					当前选中值：
					<code style={{ background: '#f5f5f5', padding: '2px 6px' }}>
						{JSON.stringify(multiValue)}
					</code>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					多选模式下以 Tag 形式展示已选项目，支持单独快速删除和一键清空。
				</p>
			</div>

			{/* 3. 禁用状态与自定义防抖时长 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					3. 禁用状态 (disabled) & 自定义 800ms 防抖
				</h3>
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
