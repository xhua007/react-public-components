import { useState } from 'react';
import FileDropZone from '../../../FileDropZone';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function FileDropZoneDemo() {
	const [fileNames, setFileNames] = useState<string[]>([]);

	const handleDropFiles = (files: File[]) => {
		setFileNames(files.map((f) => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`));
	};

	const usageCode = `import { FileDropZone } from 'react-public-components';

export default function App() {
  const handleDrop = (files: File[]) => {
    console.log('接收到上传文件：', files);
  };

  return (
    <FileDropZone
      accept="image/*,.pdf"
      multiple
      onDropFiles={handleDrop}
      title="拖拽文件至此处或点击上传"
      hint="支持直接使用 ⌘+V / Ctrl+V 粘贴系统截图"
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{
			name: 'onDropFiles',
			desc: '文件拖入/点击选择/剪贴板粘贴触发的回调函数',
			type: '(files: File[]) => void',
			required: true,
		},
		{
			name: 'accept',
			desc: "允许选择的文件类型扩展名或 MIME（如 'image/*' 或 '.pdf,.png'）",
			type: 'string',
			default: '-',
		},
		{ name: 'multiple', desc: '是否支持多文件选择', type: 'boolean', default: 'true' },
		{
			name: 'title',
			desc: '主要提示文案或节点',
			type: 'ReactNode',
			default: "'点击或将文件拖拽至此处上传'",
		},
		{
			name: 'hint',
			desc: '副标题/粘贴支持提示文案',
			type: 'ReactNode',
			default: "'支持拖拽文件或直接按 Ctrl+V 粘贴截图'",
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 现代极客拖拽上传容器（拖拽悬停发光虚线 + 剪贴板 Ctrl+V 粘贴截图）
				</h3>

				<div style={{ maxWidth: 560 }}>
					<FileDropZone onDropFiles={handleDropFiles} />
				</div>

				{fileNames.length > 0 && (
					<div style={{ marginTop: 14 }}>
						<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>已接收到的文件：</div>
						<ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#1677ff' }}>
							{fileNames.map((n, i) => (
								<li key={i}>{n}</li>
							))}
						</ul>
					</div>
				)}
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
