import DiffViewer from '../../../DiffViewer';

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
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 代码差异对比 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 代码与文本 Diff 差异对比（支持分栏 Split 与行内 Unified 切换）
				</h3>
				<div style={{ maxWidth: 720 }}>
					<DiffViewer
						oldValue={oldConfigCode}
						newValue={newConfigCode}
						title="server.config.ts"
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					纯原生轻量行级 LCS Diff 算法，零任何外部重型库依赖，清晰展示增删改行。
				</p>
			</div>
		</div>
	);
}
