import JsonDiffViewer from '../../../JsonDiffViewer';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function JsonDiffViewerDemo() {
	const beforeJson = {
		serviceName: 'order-api',
		port: 8080,
		replicas: 3,
		enableCache: false,
		databaseUrl: 'mysql://root:123456@db-master:3306/orders',
		deprecatedField: 'old_legacy_val',
	};

	const afterJson = {
		serviceName: 'order-api',
		port: 8080,
		replicas: 6,
		enableCache: true,
		databaseUrl: 'mysql://root:123456@db-master:3306/orders',
		autoScaleMax: 12,
	};

	const usageCode = `import { JsonDiffViewer } from 'react-public-components';

export default function App() {
  const before = { port: 8080, debug: true };
  const after = { port: 9000, debug: false, env: 'prod' };

  return (
    <JsonDiffViewer before={before} after={after} />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'before', desc: '变更前原始 JSON 对象', type: 'Record<string, any>', required: true },
		{ name: 'after', desc: '变更后最新 JSON 对象', type: 'Record<string, any>', required: true },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. JSON 对象键值差异比对器（新增绿色 + / 删除红色 - / 修改黄色 ~ 前后值）
				</h3>

				<div style={{ maxWidth: 680 }}>
					<JsonDiffViewer before={beforeJson} after={afterJson} />
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
