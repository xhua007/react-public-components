import JsonTree from '../../../JsonTree';

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
		</div>
	);
}
