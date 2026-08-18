import CodeSnippet from '../../../CodeSnippet';

export default function CodeSnippetDemo() {
	const bashCode = `npm install react-public-components\n# 引入组件库核心样式与组件\nimport { CommandPalette, JsonTree, MacDock } from 'react-public-components';`;

	const tsCode = `import React from 'react';\nimport { PhotoViewer } from 'react-public-components';\n\nexport const Gallery: React.FC = () => {\n  return <PhotoViewer images={[{ src: '/demo.jpg', title: '架构图' }]} />;\n};`;

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 极客风格代码块卡片（Mac 终端圆点 + 语言标签 + 一键复制）
				</h3>

				<div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 16 }}>
					<CodeSnippet code={bashCode} language="bash" />
					<CodeSnippet code={tsCode} language="typescript" />
				</div>
			</div>
		</div>
	);
}
