import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function CodeSnippetDemo() {
	const bashCode = `npm install react-public-components\n# 引入组件库核心样式与组件\nimport { CommandPalette, JsonTree, MacDock } from 'react-public-components';`;

	const tsCode = `import React from 'react';\nimport { PhotoViewer } from 'react-public-components';\n\nexport const Gallery: React.FC = () => {\n  return <PhotoViewer images={[{ src: '/demo.jpg', title: '架构图' }]} />;\n};`;

	const usageCode = `import { CodeSnippet } from 'react-public-components';

export default function App() {
  return (
    <CodeSnippet
      language="typescript"
      code={\`const greeting: string = "Hello, react-public-components!";\\nconsole.log(greeting);\`}
      showLineNumbers
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'code', desc: '代码块字符串内容', type: 'string', required: true },
		{
			name: 'language',
			desc: '代码语言标识（如 typescript, bash, json 等）',
			type: 'string',
			default: "'typescript'",
		},
		{ name: 'theme', desc: '代码块主题色', type: "'dark' | 'light'", default: "'dark'" },
		{ name: 'title', desc: '顶部自定义标题/说明标签', type: 'ReactNode', default: 'language 名称' },
		{ name: 'showLineNumbers', desc: '是否展示代码行号', type: 'boolean', default: 'false' },
		{ name: 'copyable', desc: '是否显示右上角一键复制按钮', type: 'boolean', default: 'true' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 极客风格代码块卡片（Mac 终端圆点 + 语言标签 + 一键复制）
				</h3>

				<div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 16 }}>
					<CodeSnippet code={bashCode} language="bash" theme="dark" />
					<CodeSnippet code={tsCode} language="typescript" theme="light" />
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
