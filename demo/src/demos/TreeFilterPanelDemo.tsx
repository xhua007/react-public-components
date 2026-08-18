import { useState } from 'react';
import TreeFilterPanel, { TreeFilterNode } from '../../../TreeFilterPanel';

const filterTree: TreeFilterNode[] = [
	{
		label: '前端架构',
		value: 'frontend',
		children: [
			{
				label: 'React 生态',
				value: 'react',
				children: [
					{ label: 'Next.js 15', value: 'nextjs' },
					{ label: 'Vite 6.0', value: 'vite' },
					{ label: 'Tailwind CSS', value: 'tailwind' },
					{ label: 'Ant Design', value: 'antd' },
				],
			},
			{
				label: '跨端方案',
				value: 'cross-platform',
				children: [
					{ label: 'React Native', value: 'rn' },
					{ label: 'Electron', value: 'electron' },
					{ label: 'Taro 3', value: 'taro' },
				],
			},
		],
	},
	{
		label: '后端与云原生',
		value: 'backend',
		children: [
			{
				label: '微服务框架',
				value: 'microservices',
				children: [
					{ label: 'Node.js / NestJS', value: 'nestjs' },
					{ label: 'Go / Gin', value: 'gin' },
					{ label: 'Rust / Axum', value: 'axum' },
				],
			},
		],
	},
	{
		label: 'AI 智能化',
		value: 'ai',
		children: [
			{
				label: '大模型应用',
				value: 'llm',
				children: [
					{ label: 'LangChain', value: 'langchain' },
					{ label: 'LlamaIndex', value: 'llamaindex' },
					{ label: 'DeepSeek-R1', value: 'deepseek' },
				],
			},
		],
	},
];

export default function TreeFilterPanelDemo() {
	const [selected, setSelected] = useState<(string | number)[]>(['react', 'nextjs']);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 轻量平铺树形多维筛选器（支持多级分类平铺联动与多选勾选）
				</h3>

				<div style={{ maxWidth: 760 }}>
					<TreeFilterPanel
						options={filterTree}
						value={selected}
						onChange={(vals) => setSelected(vals)}
						levelLabels={['核心领域', '技术分支', '底层技术栈']}
					/>
				</div>

				<div style={{ marginTop: 12, fontSize: 13, color: '#595959' }}>
					当前已选筛选键值：<code>{JSON.stringify(selected)}</code>
				</div>
			</div>
		</div>
	);
}
