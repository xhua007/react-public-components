import { useState } from 'react';
import TreeTransfer, { TreeTransferNode } from '../../../TreeTransfer';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

const orgTree: TreeTransferNode[] = [
	{
		key: 'dept_tech',
		title: '技术研发中心',
		children: [
			{ key: 'u_alex', title: 'Alex (前端架构师)' },
			{ key: 'u_bob', title: 'Bob (后端工程师)' },
			{ key: 'u_cindy', title: 'Cindy (测试负责人)' },
		],
	},
	{
		key: 'dept_design',
		title: '体验设计部',
		children: [
			{ key: 'u_david', title: 'David (UI 设计师)' },
			{ key: 'u_eva', title: 'Eva (动效专家)' },
		],
	},
];

export default function TreeTransferDemo() {
	const [targetKeys, setTargetKeys] = useState<string[]>(['u_alex', 'u_david']);

	const usageCode = `import { useState } from 'react';
import { TreeTransfer } from 'react-public-components';

export default function App() {
  const [targetKeys, setTargetKeys] = useState(['u_alex']);

  const treeData = [
    {
      key: 'dept_tech',
      title: '技术研发中心',
      children: [
        { key: 'u_alex', title: 'Alex (架构师)' },
        { key: 'u_bob', title: 'Bob (工程师)' },
      ]
    }
  ];

  return (
    <TreeTransfer
      treeData={treeData}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
      sourceTitle="待选人员库"
      targetTitle="已选人员"
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'treeData', desc: '左侧树形数据源数组，每项包含 key, title, children', type: 'TreeTransferNode[]', required: true },
		{ name: 'targetKeys', desc: '右侧已选节点 keys 列表（受控）', type: 'string[]', default: '-' },
		{ name: 'defaultTargetKeys', desc: '默认已选节点 keys 列表', type: 'string[]', default: '[]' },
		{ name: 'onChange', desc: '已选项增减改变时的回调函数', type: '(targetKeys: string[]) => void', default: '-' },
		{ name: 'sourceTitle', desc: '左侧树面板标题', type: 'string', default: "'待选项目录'" },
		{ name: 'targetTitle', desc: '右侧已选列表面板标题', type: 'string', default: "'已选项目'" },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 树形层级穿梭框（左侧目录树级联勾选 + 右侧平铺已选）
				</h3>

				<TreeTransfer
					treeData={orgTree}
					targetKeys={targetKeys}
					onChange={(keys) => setTargetKeys(keys)}
					sourceTitle="组织架构成员库"
					targetTitle="已分配人员"
				/>

				<div style={{ marginTop: 14, fontSize: 13, color: '#595959' }}>
					当前已选 key：<code>{JSON.stringify(targetKeys)}</code>
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
