import PdfViewer from '../../../PdfViewer';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function PdfViewerDemo() {
	const usageCode = `import { PdfViewer } from 'react-public-components';

export default function App() {
  return (
    <PdfViewer
      src="https://example.com/demo.pdf"
      title="业务框架协议.pdf"
      height={480}
      showDownload
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'src', desc: 'PDF 文件 URL 地址或 Blob URL', type: 'string', required: true },
		{ name: 'title', desc: '顶部展示的 PDF 文档标题', type: 'ReactNode', default: "'PDF Document Preview'" },
		{ name: 'height', desc: '阅读器高度（像素数字或 CSS 字符串）', type: 'number | string', default: '500' },
		{ name: 'width', desc: '阅读器宽度', type: 'number | string', default: "'100%'" },
		{ name: 'showDownload', desc: '是否在工具栏展示一键下载按钮', type: 'boolean', default: 'true' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 720 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
