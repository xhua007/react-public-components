import { useState } from 'react';
import FilePreviewer, { FileItem } from '../../../FilePreviewer';

export default function FilePreviewerDemo() {
	const [activeFile, setActiveFile] = useState<FileItem | null>(null);

	const demoFiles: FileItem[] = [
		{
			url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%231677ff"/><circle cx="300" cy="200" r="80" fill="%23ffffff"/><text x="300" y="210" font-family="sans-serif" font-size="20" font-weight="bold" fill="%231677ff" text-anchor="middle">Image Preview</text></svg>`,
			name: '系统架构设计图.png',
			fileType: 'image',
			size: '1.2 MB',
		},
		{
			url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
			name: '产品功能演示视频.mp4',
			fileType: 'video',
			size: '4.8 MB',
		},
		{
			url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
			name: '系统提示音效.mp3',
			fileType: 'audio',
			size: '256 KB',
		},
		{
			url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
			name: '用户隐私协议_2026.pdf',
			fileType: 'pdf',
			size: '890 KB',
		},
		{
			url: 'config.json',
			name: 'app.config.json',
			fileType: 'text',
			textContent: `{\n  "appName": "react-public-components",\n  "version": "1.2.0",\n  "features": [\n    "ImageCropper",\n    "ScrollTracker",\n    "FilePreviewer",\n    "FloatingActionBar"\n  ],\n  "author": "xhua007"\n}`,
			size: '12 KB',
		},
		{
			url: 'https://example.com/archive.zip',
			name: '历史归档数据包.zip',
			size: '42.5 MB',
		},
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 声明式多格式文件列表预览 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 多格式文件统一弹窗预览 (FilePreviewer)</h3>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
						gap: 16,
						maxWidth: 720,
					}}
				>
					{demoFiles.map((file, idx) => (
						<div
							key={idx}
							onClick={() => setActiveFile(file)}
							style={{
								background: '#ffffff',
								border: '1px solid #f0f0f0',
								borderRadius: 8,
								padding: 16,
								cursor: 'pointer',
								boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
								transition: 'all 0.2s',
								display: 'flex',
								flexDirection: 'column',
								gap: 8,
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.borderColor = '#1677ff';
								e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 119, 255, 0.12)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.borderColor = '#f0f0f0';
								e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
							}}
						>
							<div style={{ fontSize: 32 }}>
								{file.fileType === 'image'
									? '🖼️'
									: file.fileType === 'video'
										? '🎬'
										: file.fileType === 'audio'
											? '🎵'
											: file.fileType === 'pdf'
												? '📄'
												: file.fileType === 'text'
													? '📝'
													: '📦'}
							</div>
							<div style={{ fontWeight: 500, fontSize: 14, color: '#1f1f1f' }}>{file.name}</div>
							<div style={{ fontSize: 12, color: '#8c8c8c' }}>{file.size || '未知大小'}</div>
						</div>
					))}
				</div>

				<FilePreviewer
					open={activeFile !== null}
					file={activeFile}
					onCancel={() => setActiveFile(null)}
				/>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					点击任意卡片即可弹出对应格式的专用预览器（图片缩放/旋转、音视频播放、PDF 渲染、文本排版或通用兜底）。
				</p>
			</div>

			{/* 2. 命令式调用方法 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 命令式单行调用 FilePreviewer.preview(...)</h3>
				<button
					onClick={() => {
						FilePreviewer.preview({
							url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="%2352c41a"/><text x="200" y="160" font-size="24" fill="%23fff" text-anchor="middle">Imperative Modal</text></svg>`,
							name: '命令式调用演示.png',
							fileType: 'image',
						});
					}}
					style={{
						padding: '7px 18px',
						background: '#1677ff',
						color: '#fff',
						border: 'none',
						borderRadius: 6,
						cursor: 'pointer',
						fontSize: 14,
					}}
				>
					通过 JavaScript 函数直接唤起预览
				</button>
			</div>
		</div>
	);
}
