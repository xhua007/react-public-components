import { useState } from 'react';
import JsonEditor from '../../../JsonEditor';

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
		'FloatingActionBar',
		'TagInput',
		'PasswordStrength',
		'JsonEditor',
		'StatusDot',
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
		</div>
	);
}
