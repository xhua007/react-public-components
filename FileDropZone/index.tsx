import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface FileDropZoneProps {
	/** 文件选择/拖拽/粘贴回调 */
	onDropFiles: (files: File[]) => void;
	/** 允许的文件类型，例如 'image/*' 或 '.pdf,.png' */
	accept?: string;
	/** 是否支持多选，默认为 true */
	multiple?: boolean;
	/** 提示标题，默认为 '点击或将文件拖拽至此处上传' */
	title?: ReactNode;
	/** 提示副标题，默认为 '支持拖拽文件或直接按 Ctrl+V 粘贴截图' */
	hint?: ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
	onDropFiles,
	accept,
	multiple = true,
	title = '点击或将文件拖拽至此处上传',
	hint = '支持拖拽文件或直接按 Ctrl+V / Cmd+V 粘贴截图',
	className = '',
	style,
}) => {
	const [isDragOver, setIsDragOver] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleFiles = (fileList: FileList | null) => {
		if (!fileList || fileList.length === 0) return;
		const files = Array.from(fileList);
		onDropFiles(files);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = () => {
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
		handleFiles(e.dataTransfer.files);
	};

	// 监听剪贴板粘贴事件
	useEffect(() => {
		const handlePaste = (e: ClipboardEvent) => {
			if (e.clipboardData && e.clipboardData.files.length > 0) {
				handleFiles(e.clipboardData.files);
			}
		};
		window.addEventListener('paste', handlePaste);
		return () => window.removeEventListener('paste', handlePaste);
	}, []);

	return (
		<div
			ref={containerRef}
			className={`rpc_file_dropzone ${isDragOver ? 'rpc_file_dropzone_active' : ''} ${className}`}
			style={style}
			onClick={() => inputRef.current?.click()}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<input
				ref={inputRef}
				type="file"
				accept={accept}
				multiple={multiple}
				style={{ display: 'none' }}
				onChange={(e) => handleFiles(e.target.files)}
			/>

			<div className="rpc_file_dropzone_icon">📥</div>
			<div className="rpc_file_dropzone_title">{title}</div>
			<div className="rpc_file_dropzone_hint">{hint}</div>
		</div>
	);
};

export default FileDropZone;
