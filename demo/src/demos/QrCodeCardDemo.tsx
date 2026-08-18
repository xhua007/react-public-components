import { useState } from 'react';
import QrCodeCard, { QrCodeStatus } from '../../../QrCodeCard';

export default function QrCodeCardDemo() {
	const [status, setStatus] = useState<QrCodeStatus>('active');

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
		</div>
	);
}
