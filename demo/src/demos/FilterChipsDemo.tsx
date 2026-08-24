import { useState } from 'react';
import FilterChips, { FilterChipItem } from '../../../FilterChips';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

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

	const usageCode = `import { useState } from 'react';
import { FilterChips } from 'react-public-components';

export default function App() {
  const [chips, setChips] = useState([
    { id: 'status', label: '状态', value: '已上架' },
    { id: 'category', label: '品类', value: '数码配件' },
  ]);

  return (
    <FilterChips
      chips={chips}
      onRemove={(id) => setChips(chips.filter(c => c.id !== id))}
      onClearAll={() => setChips([])}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'chips', desc: '筛选胶囊列表，每项包含 id, label, value', type: 'FilterChipItem[]', required: true },
		{ name: 'onRemove', desc: '点击单个筛选项右侧关闭按钮的回调', type: '(id: string) => void', default: '-' },
		{ name: 'onClearAll', desc: '点击末尾一键清空按钮的回调', type: '() => void', default: '-' },
		{ name: 'clearText', desc: '清空按钮的文案', type: 'string', default: "'清空筛选'" },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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
						<FilterChips chips={chips} onRemove={handleRemove} onClearAll={handleClearAll} />
					)}
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
