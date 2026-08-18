import React, { useState, useEffect, ReactNode, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import {
	CloseOutlined,
	RotateRightOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
	DownloadOutlined,
	FilePdfOutlined,
	FileImageOutlined,
	FileTextOutlined,
	FileOutlined,
} from '../src/icons';
import './index.less';

export type FileType = 'image' | 'video' | 'audio' | 'pdf' | 'text' | 'unknown';

export interface FileItem {
	/** 文件访问 URL 或 Base64 */
	url: string;
	/** 文件名称 */
	name?: string;
	/** 文件类型（如不传则根据文件名后缀或 URL 自动推断） */
	fileType?: FileType;
	/** 文件大小描述（如 '2.4 MB'） */
	size?: string;
	/** 纯文本内容（针对直接传入 text 字符串预览） */
	textContent?: string;
}

export interface FilePreviewerProps {
	/** 是否打开预览弹窗 */
	open: boolean;
	/** 当前预览的文件对象或 URL 字符串 */
	file?: FileItem | string | null;
	/** 关闭弹窗回调 */
	onCancel?: () => void;
	/** 自定义下载行为（不传时使用默认浏览器下载） */
	onDownload?: (file: FileItem) => void;
	/** 自定义标题栏右侧额外操作按钮 */
	extraActions?: ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

// 根据文件名或 URL 后缀推断文件类型
export function inferFileType(urlOrName: string): FileType {
	if (!urlOrName) return 'unknown';
	const clean = urlOrName.split('?')[0].split('#')[0].toLowerCase();
	const ext = clean.substring(clean.lastIndexOf('.') + 1);

	if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'].includes(ext)) {
		return 'image';
	}
	if (['mp4', 'webm', 'ogg', 'mov', 'mkv'].includes(ext)) {
		return 'video';
	}
	if (['mp3', 'wav', 'aac', 'flac', 'm4a'].includes(ext)) {
		return 'audio';
	}
	if (['pdf'].includes(ext)) {
		return 'pdf';
	}
	if (['txt', 'json', 'js', 'ts', 'jsx', 'tsx', 'html', 'css', 'less', 'md', 'log', 'xml'].includes(ext)) {
		return 'text';
	}
	return 'unknown';
}

const FilePreviewer: React.FC<FilePreviewerProps> & {
	preview: (options: FileItem) => { close: () => void };
} = ({
	open,
	file,
	onCancel,
	onDownload,
	extraActions,
	className = '',
	style,
}) => {
	// 图片控制状态
	const [imageScale, setImageScale] = useState<number>(1);
	const [imageRotate, setImageRotate] = useState<number>(0);

	useEffect(() => {
		if (open) {
			setImageScale(1);
			setImageRotate(0);
		}
	}, [open, file]);

	if (!open || !file) return null;

	const currentFile: FileItem =
		typeof file === 'string'
			? { url: file, name: file.substring(file.lastIndexOf('/') + 1) }
			: file;

	const type: FileType = currentFile.fileType || inferFileType(currentFile.name || currentFile.url);

	// 默认下载处理
	const handleDefaultDownload = () => {
		if (onDownload) {
			onDownload(currentFile);
			return;
		}
		const a = document.createElement('a');
		a.href = currentFile.url;
		a.download = currentFile.name || 'download';
		a.target = '_blank';
		document.body.appendChild(a);
		a.click();
		a.remove();
	};

	// 渲染文件图标
	const renderFileIcon = () => {
		switch (type) {
			case 'image':
				return <FileImageOutlined style={{ color: '#1677ff' }} />;
			case 'pdf':
				return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
			case 'text':
				return <FileTextOutlined style={{ color: '#52c41a' }} />;
			default:
				return <FileOutlined style={{ color: '#8c8c8c' }} />;
		}
	};

	// 渲染主体内容
	const renderBodyContent = () => {
		switch (type) {
			case 'image':
				return (
					<img
						src={currentFile.url}
						alt={currentFile.name || 'Preview'}
						className="rpc_file_previewer_modal_image"
						style={{
							transform: `scale(${imageScale}) rotate(${imageRotate}deg)`,
						}}
					/>
				);
			case 'video':
				return (
					<video
						src={currentFile.url}
						controls
						autoPlay
						className="rpc_file_previewer_modal_media"
					/>
				);
			case 'audio':
				return (
					<div className="rpc_file_previewer_modal_audio_wrap">
						<div style={{ fontSize: 48 }}>🎵</div>
						<div style={{ fontSize: 16, fontWeight: 600 }}>{currentFile.name || '音频播放'}</div>
						<audio src={currentFile.url} controls autoPlay style={{ width: 320 }} />
					</div>
				);
			case 'pdf':
				return (
					<iframe
						src={currentFile.url}
						title={currentFile.name || 'PDF Preview'}
						className="rpc_file_previewer_modal_iframe"
					/>
				);
			case 'text':
				return (
					<div className="rpc_file_previewer_modal_text_wrap">
						{currentFile.textContent || '正在加载文件内容...'}
					</div>
				);
			default:
				return (
					<div className="rpc_file_previewer_modal_fallback_card">
						<div style={{ fontSize: 48, color: '#8c8c8c' }}>📦</div>
						<div>
							<h4 style={{ margin: '0 0 6px 0', fontSize: 16, color: '#1f1f1f' }}>
								{currentFile.name || '未知文件'}
							</h4>
							<p style={{ margin: 0, color: '#8c8c8c', fontSize: 13 }}>
								该格式暂不支持直接在线预览，请下载后在本地查看。{currentFile.size ? `(${currentFile.size})` : ''}
							</p>
						</div>
						<button
							type="button"
							onClick={handleDefaultDownload}
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 6,
								padding: '8px 20px',
								background: '#1677ff',
								color: '#fff',
								border: 'none',
								borderRadius: 6,
								cursor: 'pointer',
								fontSize: 14,
							}}
						>
							<DownloadOutlined /> 立即下载
						</button>
					</div>
				);
		}
	};

	return ReactDOM.createPortal(
		<div className={`rpc_file_previewer_modal ${className}`} onClick={onCancel} style={style}>
			<div className="rpc_file_previewer_modal_card" onClick={(e) => e.stopPropagation()}>
				{/* 顶部标题栏与工具栏 */}
				<div className="rpc_file_previewer_modal_header">
					<div className="rpc_file_previewer_modal_title">
						{renderFileIcon()}
						<span>{currentFile.name || '文件预览'}</span>
					</div>

					<div className="rpc_file_previewer_modal_actions">
						{type === 'image' && (
							<>
								<button
									type="button"
									className="rpc_file_previewer_modal_action_btn"
									onClick={() => setImageScale((s) => Math.min(s + 0.2, 3))}
									title="放大"
								>
									<ZoomInOutlined />
								</button>
								<button
									type="button"
									className="rpc_file_previewer_modal_action_btn"
									onClick={() => setImageScale((s) => Math.max(s - 0.2, 0.4))}
									title="缩小"
								>
									<ZoomOutOutlined />
								</button>
								<button
									type="button"
									className="rpc_file_previewer_modal_action_btn"
									onClick={() => setImageRotate((r) => (r + 90) % 360)}
									title="顺时针旋转90°"
								>
									<RotateRightOutlined />
								</button>
							</>
						)}

						<button
							type="button"
							className="rpc_file_previewer_modal_action_btn"
							onClick={handleDefaultDownload}
							title="下载文件"
						>
							<DownloadOutlined />
						</button>

						{extraActions}

						<button
							type="button"
							className="rpc_file_previewer_modal_action_btn"
							onClick={onCancel}
							title="关闭预览 (ESC)"
						>
							<CloseOutlined />
						</button>
					</div>
				</div>

				{/* 预览主体内容区域 */}
				<div className="rpc_file_previewer_modal_body">{renderBodyContent()}</div>
			</div>
		</div>,
		document.body,
	);
};

// 命令式调用方法
FilePreviewer.preview = (options: FileItem) => {
	const div = document.createElement('div');
	document.body.appendChild(div);

	const close = () => {
		ReactDOM.render(<></>, div);
		div.remove();
	};

	ReactDOM.render(
		<FilePreviewer open={true} file={options} onCancel={close} />,
		div,
	);

	return { close };
};

export default FilePreviewer;
