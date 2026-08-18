import { useState } from 'react';
import TreeTransfer, { TreeTransferNode } from '../../../TreeTransfer';

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
		</div>
	);
}
