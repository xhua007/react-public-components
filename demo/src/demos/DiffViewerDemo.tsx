import DiffViewer from '../../../DiffViewer';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

const oldConfigCode = `// 初始版本 v1.0.0
function setupServer() {
  const port = 3000;
  const timeout = 5000;
  const enableCache = false;
  
  console.log('Server started on port', port);
  return { port, timeout };
}`;

const newConfigCode = `// 升级版本 v2.0.0
function setupServer() {
  const port = 8080;
  const timeout = 3000;
  const enableCache = true;
  const maxRetries = 3;
  
  console.log('Production server started on port', port);
  return { port, timeout, maxRetries };
}`;

export default function DiffViewerDemo() {
	const usageCode = `import { DiffViewer } from 'react-public-components';

export default function App() {
  return (
    <DiffViewer
      oldValue="const a = 1;"
      newValue="const a = 2;\nconst b = 3;"
      title="index.ts"
      viewMode="split"
      allowModeChange
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'oldValue', desc: '修改前的旧文本字符串', type: 'string', required: true },
		{ name: 'newValue', desc: '修改后的新文本字符串', type: 'string', required: true },
		{ name: 'viewMode', desc: "视图模式：'split' 左右双栏分屏 / 'unified' 单列行内", type: "'split' | 'unified'", default: "'split'" },
		{ name: 'allowModeChange', desc: '是否在右上角提供分栏/行内切换按钮', type: 'boolean', default: 'true' },
		{ name: 'title', desc: '对比文件名或标题标签', type: 'ReactNode', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 代码差异对比 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 代码与文本 Diff 差异对比（支持分栏 Split 与行内 Unified 切换）
				</h3>
				<div style={{ maxWidth: 720 }}>
					<DiffViewer oldValue={oldConfigCode} newValue={newConfigCode} title="server.config.ts" />
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					纯原生轻量行级 LCS Diff 算法，零任何外部重型库依赖，清晰展示增删改行。
				</p>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 720 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
