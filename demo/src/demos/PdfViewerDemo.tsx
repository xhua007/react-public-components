import PdfViewer from '../../../PdfViewer';

export default function PdfViewerDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 轻量 Web PDF 文档阅读器（支持缩放 Zoom、90° 旋转与一键下载）
				</h3>
				<div style={{ maxWidth: 720 }}>
					<PdfViewer
						src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
						title="2026年度业务合作框架协议 (草案).pdf"
						height={420}
					/>
				</div>
			</div>
		</div>
	);
}
