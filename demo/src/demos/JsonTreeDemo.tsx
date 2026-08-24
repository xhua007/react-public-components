import JsonTree from '../../../JsonTree';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function JsonTreeDemo() {
	const sampleData = {
		service: 'ai-cluster-orchestrator',
		version: '2.4.0',
		healthy: true,
		port: 8080,
		clusterNodes: [
			{ id: 'node-us-east-1', role: 'primary', load: 0.42, active: true },
			{ id: 'node-ap-east-1', role: 'replica', load: 0.18, active: true },
			{ id: 'node-eu-west-1', role: 'replica', load: null, active: false },
		],
		runtimeMeta: {
			memoryLimitMB: 4096,
			driver: 'v8-isolate',
			tags: ['cloud-native', 'high-concurrency'],
		},
	};

	const usageCode = `import { JsonTree } from 'react-public-components';

export default function App() {
  const data = {
    name: 'Apollo',
    nested: { env: 'production', count: 42 }
  };

  return (
    <JsonTree data={data} defaultExpandedLevel={2} />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'data', desc: '待展示与探查的 JSON 数据源对象或数组', type: 'any', required: true },
		{ name: 'defaultExpandedLevel', desc: '默认初始展开的层级深度', type: 'number', default: '2' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 树状可折叠 JSON 节点探查器（多层级无限折叠 + 数据类型语法高亮）
				</h3>

				<div style={{ maxWidth: 680 }}>
					<JsonTree data={sampleData} defaultExpandedLevel={2} />
				</div>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 680 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
