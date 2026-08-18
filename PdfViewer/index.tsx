import React, { useState, ReactNode, CSSProperties } from 'react';
import { ZoomInOutlined, ZoomOutOutlined, RotateRightOutlined, DownloadOutlined } from '../src/icons';
import './index.less';

export interface PdfViewerProps {
	/** PDF 文件 URL 地址 */
	src: string;
	/** 文档标题 */
	title?: ReactNode;
	/** 宽度，默认为 '100%' */
	width?: number | string;
	/** 高度，默认为 500 */
	height?: number | string;
	/** 是否显示下载按钮，默认为 true */
	showDownload?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
	src,
	title = 'PDF Document Preview',
	width = '100%',
	height = 500,
	showDownload = true,
	className = '',
	style,
}) => {
	const [zoom, setZoom] = useState<number>(100);
	const [rotation, setRotation] = useState<number>(0);

	const handleZoomIn = () => {
		setZoom((prev) => Math.min(200, prev + 15));
	};

	const handleZoomOut = () => {
		setZoom((prev) => Math.max(50, prev - 15));
	};

	const handleRotate = () => {
		setRotation((prev) => (prev + 90) % 360);
	};

	return (
		<div className={`rpc_pdf_viewer ${className}`} style={{ width, height, ...style }}>
			{/* 顶部工具栏 */}
			<div className="rpc_pdf_viewer_toolbar">
				<span className="rpc_pdf_viewer_title">{title}</span>

				<div className="rpc_pdf_viewer_actions">
					<button type="button" className="rpc_pdf_viewer_btn" onClick={handleZoomOut} title="缩小">
						<ZoomOutOutlined />
					</button>

					<span style={{ fontSize: 12, minWidth: 40, textAlign: 'center' }}>{zoom}%</span>

					<button type="button" className="rpc_pdf_viewer_btn" onClick={handleZoomIn} title="放大">
						<ZoomInOutlined />
					</button>

					<button type="button" className="rpc_pdf_viewer_btn" onClick={handleRotate} title="顺时针旋转 90°">
						<RotateRightOutlined />
					</button>

					{showDownload && (
						<a href={src} download className="rpc_pdf_viewer_btn" title="下载 PDF">
							<DownloadOutlined />
							<span>下载</span>
						</a>
					)}
				</div>
			</div>

			{/* PDF 内容嵌入容器 */}
			<div className="rpc_pdf_viewer_body">
				<iframe
					src={`${src}#toolbar=0&navpanes=0`}
					title="PDF Preview Frame"
					className="rpc_pdf_viewer_frame"
					style={{
						transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
					}}
				/>
			</div>
		</div>
	);
};

export default PdfViewer;
