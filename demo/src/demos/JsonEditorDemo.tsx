import { useState } from 'react';
import JsonEditor from '../../../JsonEditor';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

const initialConfig = {
	project: 'react-public-components',
	version: '1.2.0',
	author: 'xhua007',
	isOpenSource: true,
	stars: 1280,
	features: [
		'ImageCropper',
		'ScrollTracker',
		'FilePreviewer',
		'TagInput',
		'PasswordStrength',
		'JsonEditor',
		'InfiniteScrollList',
	],
	settings: {
		theme: 'dark',
		allowAnonymous: false,
		timeoutMs: 3000,
	},
};

export default function JsonEditorDemo() {
	const [jsonText, setJsonText] = useState<string>('');
	const [parsedData, setParsedData] = useState<any>(initialConfig);

	const usageCode = `import { useState } from 'react';
import { JsonEditor } from 'react-public-components';

export default function App() {
  const [data, setData] = useState({ name: 'Rpc', version: '1.2.0' });

  return (
    <JsonEditor
      defaultValue={data}
      height={300}
      showLineNumbers
      onChange={(raw, parsed) => {
        if (parsed) setData(parsed);
      }}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'value', desc: '受控 JSON 数据内容（可传字符串或对象）', type: 'string | object', default: '-' },
		{ name: 'defaultValue', desc: '默认 JSON 数据内容', type: 'string | object', default: '-' },
		{ name: 'onChange', desc: '内容修改回调函数，回传原始字符串与解析后的 Object 对象', type: '(rawJson: string, parsedObject?: any) => void', default: '-' },
		{ name: 'readOnly', desc: '是否为只读模式', type: 'boolean', default: 'false' },
		{ name: 'height', desc: '编辑器高度（像素数字或 CSS 字符串）', type: 'number | string', default: '280' },
		{ name: 'indent', desc: '格式化缩进空格数', type: 'number', default: '2' },
		{ name: 'showLineNumbers', desc: '是否展示代码行号', type: 'boolean', default: 'true' },
		{ name: 'showToolbar', desc: '是否展示顶部工具栏（含一键美化、压缩与复制按钮）', type: 'boolean', default: 'true' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 可编辑 JSON 模式 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 轻量 JSON 编辑器（支持格式化美化、单行压缩、语法报错、行号与复制）
				</h3>
				<div style={{ maxWidth: 640 }}>
					<JsonEditor
						defaultValue={initialConfig}
						height={320}
						onChange={(raw, parsed) => {
							setJsonText(raw);
							if (parsed) setParsedData(parsed);
						}}
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持输入语法校验、Tab 键缩进、右上角一键美化 / 压缩 / 复制。
				</p>
			</div>

			{/* 2. 只读视图模式 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 只读模式 (readOnly)</h3>
				<div style={{ maxWidth: 640 }}>
					<JsonEditor
						value={{ status: 'success', code: 200, message: '操作成功' }}
						readOnly
						height={160}
					/>
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
