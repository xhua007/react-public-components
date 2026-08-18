import SensitiveMask from '../../../SensitiveMask';

export default function SensitiveMaskDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 预设敏感类型脱敏 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 预设场景脱敏（手机号 / 身份证 / 银行卡 / 邮箱）
				</h3>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 14,
						maxWidth: 520,
						background: '#fafafa',
						padding: 20,
						borderRadius: 8,
						border: '1px solid #f0f0f0',
					}}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span style={{ color: '#8c8c8c', fontSize: 13 }}>用户手机号码：</span>
						<SensitiveMask text="13812345678" type="phone" copyable />
					</div>

					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span style={{ color: '#8c8c8c', fontSize: 13 }}>身份证号码：</span>
						<SensitiveMask text="110101199003072345" type="idcard" copyable />
					</div>

					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span style={{ color: '#8c8c8c', fontSize: 13 }}>结算银行卡号：</span>
						<SensitiveMask text="6222021234567890" type="bankcard" copyable />
					</div>

					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span style={{ color: '#8c8c8c', fontSize: 13 }}>企业邮箱地址：</span>
						<SensitiveMask text="alexander.smith@enterprise.com" type="email" copyable />
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					点击小眼睛图标可自由切换明文/密文状态，右侧集成了一键复制明文功能。
				</p>
			</div>

			{/* 2. 自定义字符保留区间与鉴权拦截 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 自定义脱敏区间 & 异步鉴权拦截</h3>
				<div style={{ maxWidth: 520 }}>
					<div style={{ background: '#fafafa', padding: '12px 16px', borderRadius: 6, border: '1px solid #f0f0f0' }}>
						<span style={{ color: '#8c8c8c', marginRight: 12 }}>API 访问密钥 (前4后4)：</span>
						<SensitiveMask
							text="api_key_sample_98374981273948719283471"
							type="custom"
							unmaskedStart={4}
							unmaskedEnd={4}
							onToggle={async (nextMasked) => {
								if (!nextMasked) {
									// 模拟查看明文时的密码或权限二次确认
									const ok = window.confirm('安全提示：您正在尝试查看核心 API Key 明文，是否确认？');
									return ok;
								}
								return true;
							}}
							copyable
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
