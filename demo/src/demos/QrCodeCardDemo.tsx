import { useState } from 'react';
import QrCodeCard, { QrCodeStatus } from '../../../QrCodeCard';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function QrCodeCardDemo() {
	const [status, setStatus] = useState<QrCodeStatus>('active');

	const usageCode = `import { useState } from 'react';
import { QrCodeCard } from 'react-public-components';

export default function App() {
  const [status, setStatus] = useState<'active' | 'expired' | 'loading'>('active');

  return (
    <QrCodeCard
      value="https://github.com/xhua007/react-public-components"
      title="扫码安全登录"
      description="请使用微信扫一扫完成身份授权"
      status={status}
      downloadable
      onRefresh={() => setStatus('active')}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'value', desc: '二维码内容字符串或跳转目标 URL', type: 'string', required: true },
		{ name: 'size', desc: '二维码卡片主体尺寸（像素）', type: 'number', default: '160' },
		{
			name: 'status',
			desc: "二维码状态：'active' 正常 / 'expired' 过期 / 'loading' 加载中",
			type: "'active' | 'expired' | 'loading'",
			default: "'active'",
		},
		{ name: 'icon', desc: '中心嵌入的 Logo 图标图片地址', type: 'string', default: '-' },
		{ name: 'title', desc: '卡片主标题说明', type: 'ReactNode', default: '-' },
		{ name: 'description', desc: '卡片副标题或扫码引导文案', type: 'ReactNode', default: '-' },
		{
			name: 'downloadable',
			desc: '是否显示一键下载高清二维码图片按钮',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'onRefresh',
			desc: '点击过期状态蒙层刷新按钮时的回调',
			type: '() => void',
			default: '-',
		},
		{ name: 'className', desc: '自定义卡片类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 扫码登录 / 支付卡片 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 扫码登录 / 支付二维码卡片（支持状态切换、失效蒙层与下载）
				</h3>

				<div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
					<button
						onClick={() => setStatus('active')}
						style={{
							padding: '6px 12px',
							borderRadius: 4,
							border: '1px solid #d9d9d9',
							background: status === 'active' ? '#1677ff' : '#fff',
							color: status === 'active' ? '#fff' : '#595959',
							cursor: 'pointer',
						}}
					>
						正常 (Active)
					</button>

					<button
						onClick={() => setStatus('expired')}
						style={{
							padding: '6px 12px',
							borderRadius: 4,
							border: '1px solid #d9d9d9',
							background: status === 'expired' ? '#1677ff' : '#fff',
							color: status === 'expired' ? '#fff' : '#595959',
							cursor: 'pointer',
						}}
					>
						已过期 (Expired)
					</button>

					<button
						onClick={() => setStatus('loading')}
						style={{
							padding: '6px 12px',
							borderRadius: 4,
							border: '1px solid #d9d9d9',
							background: status === 'loading' ? '#1677ff' : '#fff',
							color: status === 'loading' ? '#fff' : '#595959',
							cursor: 'pointer',
						}}
					>
						加载中 (Loading)
					</button>
				</div>

				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					<QrCodeCard
						value="https://github.com/xhua007/react-public-components"
						title="微信扫码安全登录"
						description="请打开微信扫描上方二维码授权"
						status={status}
						downloadable
						onRefresh={() => setStatus('active')}
					/>
				</div>
			</div>

			{/* 示例代码 */}
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
