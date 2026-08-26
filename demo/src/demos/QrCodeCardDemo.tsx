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
      title="微信扫码安全登录"
      description="请打开微信扫描上方二维码授权"
      status={status}
      downloadable
      onRefresh={() => setStatus('active')}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'value', desc: '二维码内容字符串或跳转目标 URL', type: 'string', required: true },
		{ name: 'size', desc: '二维码卡片主体尺寸（像素）', type: 'number', default: '160' },
		{ name: 'color', desc: '二维码点阵颜色', type: 'string', default: "'#1f1f1f'" },
		{ name: 'backgroundColor', desc: '二维码背景颜色', type: 'string', default: "'#ffffff'" },
		{ name: 'icon', desc: '中心嵌入的 Logo 图标图片地址', type: 'string', default: '-' },
		{ name: 'iconSize', desc: '中心 Logo 尺寸（像素），默认自适应约 22%', type: 'number', default: '-' },
		{
			name: 'status',
			desc: "二维码状态：'active' 正常 / 'expired' 已过期 / 'loading' 加载中",
			type: "'active' | 'expired' | 'loading'",
			default: "'active'",
		},
		{ name: 'title', desc: '卡片主标题说明', type: 'ReactNode', default: '-' },
		{ name: 'description', desc: '卡片副标题或扫码引导文案', type: 'ReactNode', default: '-' },
		{
			name: 'downloadable',
			desc: '是否显示一键下载高清二维码图片按钮',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'bordered',
			desc: '二维码区域是否展示虚线边框',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'onRefresh',
			desc: '点击过期状态蒙层刷新按钮时的回调函数',
			type: '() => void',
			default: '-',
		},
		{ name: 'className', desc: '自定义卡片类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	const statusOptions: { label: string; value: QrCodeStatus }[] = [
		{ label: '正常 (Active)', value: 'active' },
		{ label: '已过期 (Expired)', value: 'expired' },
		{ label: '加载中 (Loading)', value: 'loading' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 扫码登录 / 支付卡片 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 扫码登录 / 支付二维码卡片（支持状态切换、失效蒙层与下载）
				</h3>
				<p style={{ color: '#595959', fontSize: 14, marginBottom: 16 }}>
					提供清晰规范的 QR Code 矩阵渲染、高斯模糊失效毛玻璃蒙层、渐变悬浮刷新胶囊按钮与加载中状态。
				</p>

				{/* 现代分段胶囊控制器 */}
				<div
					style={{
						display: 'inline-flex',
						background: '#f0f2f5',
						padding: 4,
						borderRadius: 8,
						marginBottom: 20,
						gap: 4,
					}}
				>
					{statusOptions.map((opt) => (
						<button
							key={opt.value}
							onClick={() => setStatus(opt.value)}
							style={{
								padding: '6px 16px',
								borderRadius: 6,
								border: 'none',
								background: status === opt.value ? '#ffffff' : 'transparent',
								color: status === opt.value ? '#1677ff' : '#595959',
								fontWeight: status === opt.value ? 600 : 400,
								boxShadow: status === opt.value ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none',
								cursor: 'pointer',
								fontSize: 13,
								transition: 'all 0.2s ease',
							}}
						>
							{opt.label}
						</button>
					))}
				</div>

				<div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start' }}>
					{/* 基础扫码登录 */}
					<QrCodeCard
						value="https://github.com/xhua007/react-public-components"
						title="微信扫码安全登录"
						description="请打开微信扫描上方二维码授权"
						status={status}
						downloadable
						onRefresh={() => setStatus('active')}
					/>

					{/* 品牌支付卡片（带主题色与中心 Logo） */}
					<QrCodeCard
						value="https://alipay.com"
						title="云闪付 / 支付宝快捷收款"
						description="支持银联各行手机 App 扫码"
						color="#0958d9"
						size={160}
						status={status}
						downloadable
						onRefresh={() => setStatus('active')}
					/>
				</div>
			</div>

			{/* 示例代码 */}
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
