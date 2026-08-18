import { useState } from 'react';
import FileDropZone from '../../../FileDropZone';

export default function FileDropZoneDemo() {
	const [fileNames, setFileNames] = useState<string[]>([]);

	const handleDropFiles = (files: File[]) => {
		setFileNames(files.map((f) => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`));
	};

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
		</div>
	);
}
