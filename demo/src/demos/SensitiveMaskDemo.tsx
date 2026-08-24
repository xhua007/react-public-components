import SensitiveMask from '../../../SensitiveMask';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function SensitiveMaskDemo() {
	const usageCode = `import { SensitiveMask } from 'react-public-components';

export default function App() {
  return (
    <div>
      {/* 手机号脱敏 */}
      <SensitiveMask text="13812345678" type="phone" copyable />

      {/* 身份证脱敏 */}
      <SensitiveMask text="110101199003072345" type="idcard" copyable />

      {/* 自定义首尾保留位数与鉴权拦截 */}
      <SensitiveMask
        text="sk-live-98374981273948719283471"
        type="custom"
        unmaskedStart={4}
        unmaskedEnd={4}
        onToggle={async (nextMasked) => {
          if (!nextMasked) {
            return window.confirm('确认查看机密密钥明文？');
          }
          return true;
        }}
        copyable
      />
    </div>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'text', desc: '原始敏感文本字符串', type: 'string', required: true },
		{ name: 'type', desc: "脱敏规则类型：'phone' | 'idcard' | 'email' | 'bankcard' | 'custom'", type: 'SensitiveType', default: "'phone'" },
		{ name: 'defaultMasked', desc: '初始默认是否为密文遮罩状态', type: 'boolean', default: 'true' },
		{ name: 'maskSymbol', desc: '密文占位替换符号', type: 'string', default: "'*'" },
		{ name: 'unmaskedStart', desc: '自定义保留头部明文字符数（仅 type="custom" 时生效）', type: 'number', default: '2' },
		{ name: 'unmaskedEnd', desc: '自定义保留尾部明文字符数（仅 type="custom" 时生效）', type: 'number', default: '2' },
		{ name: 'toggleable', desc: '是否展示小眼睛图标支持明文/密文切换', type: 'boolean', default: 'true' },
		{ name: 'copyable', desc: '是否展示一键复制明文按钮', type: 'boolean', default: 'false' },
		{ name: 'onToggle', desc: '切换明文/密文时的拦截回调（返回 false 可阻止切换，支持异步鉴权 Promise）', type: '(nextMasked: boolean) => boolean | Promise<boolean>', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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
					<div
						style={{
							background: '#fafafa',
							padding: '12px 16px',
							borderRadius: 6,
							border: '1px solid #f0f0f0',
						}}
					>
						<span style={{ color: '#8c8c8c', marginRight: 12 }}>API 访问密钥 (前4后4)：</span>
						<SensitiveMask
							text="api_key_sample_98374981273948719283471"
							type="custom"
							unmaskedStart={4}
							unmaskedEnd={4}
							onToggle={async (nextMasked) => {
								if (!nextMasked) {
									// 模拟查看明文时的密码或权限二次确认
									const ok = window.confirm(
										'安全提示：您正在尝试查看核心 API Key 明文，是否确认？',
									);
									return ok;
								}
								return true;
							}}
							copyable
						/>
					</div>
				</div>
			</div>

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
