import PhotoViewer from '../../../PhotoViewer';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function PhotoViewerDemo() {
	const sampleImages = [
		{
			src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231677ff"/><stop offset="100%" stop-color="%232f54eb"/></linearGradient></defs><rect width="800" height="480" fill="url(%23g1)"/><circle cx="200" cy="180" r="100" fill="%23ffffff" opacity="0.15"/><circle cx="620" cy="320" r="140" fill="%23ffffff" opacity="0.1"/><text x="400" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="%23ffffff" font-weight="bold" text-anchor="middle">☁️ 01. 现代化微服务云原生架构图</text></svg>',
			title: '01. 现代化微服务云原生架构图',
		},
		{
			src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23722ed1"/><stop offset="100%" stop-color="%23eb2f96"/></linearGradient></defs><rect width="800" height="480" fill="url(%23g2)"/><polygon points="400,100 520,380 280,380" fill="%23ffffff" opacity="0.12"/><text x="400" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="%23ffffff" font-weight="bold" text-anchor="middle">⚡ 02. AI 大语言模型深度推理链路</text></svg>',
			title: '02. AI 大语言模型深度推理链路',
		},
		{
			src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2313c2c2"/><stop offset="100%" stop-color="%2352c41a"/></linearGradient></defs><rect width="800" height="480" fill="url(%23g3)"/><rect x="150" y="140" width="500" height="200" rx="20" fill="%23ffffff" opacity="0.15"/><text x="400" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="%23ffffff" font-weight="bold" text-anchor="middle">🌿 03. 零碳节能绿色数据中心机房</text></svg>',
			title: '03. 零碳节能绿色数据中心机房',
		},
		{
			src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fa8c16"/><stop offset="100%" stop-color="%23f5222d"/></linearGradient></defs><rect width="800" height="480" fill="url(%23g4)"/><circle cx="400" cy="240" r="120" fill="%23ffffff" opacity="0.18"/><text x="400" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="%23ffffff" font-weight="bold" text-anchor="middle">🔥 04. 实时亿级并发交易风控大盘</text></svg>',
			title: '04. 实时亿级并发交易风控大盘',
		},
	];

	const usageCode = `import { PhotoViewer } from 'react-public-components';

export default function App() {
  const images = [
    { src: '/photo1.jpg', title: '系统拓扑架构图' },
    { src: '/photo2.jpg', title: '数据流转链路' },
  ];

  return (
    <PhotoViewer
      images={images}
      height={420}
      defaultIndex={0}
      onChange={(index) => console.log('当前展示图片序号:', index)}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'images', desc: '相册图片列表，每项含 src, title, alt', type: 'PhotoItem[]', required: true },
		{ name: 'defaultIndex', desc: '初始默认选中的图片下标', type: 'number', default: '0' },
		{ name: 'height', desc: '主预览区高度（像素数字或 CSS 字符串）', type: 'number | string', default: '380' },
		{ name: 'onChange', desc: '切换图片时的回调函数', type: '(index: number) => void', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 全功能相册画廊与多图查看器（毛玻璃暗黑极客质感 + 左右键盘切图 + 缩略图底栏发光联动）
				</h3>

				<div style={{ maxWidth: 760 }}>
					<PhotoViewer images={sampleImages} height={400} />
				</div>

				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 12 }}>
					💡 支持按键盘左右方向键（<code>←</code> / <code>→</code>
					）无缝切图，底部缩略图悬浮平滑响应并带有蓝色发光光晕。
				</p>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 760 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
