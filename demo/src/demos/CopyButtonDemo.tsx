import { useState } from 'react';
import CopyButton from '../../../CopyButton';

export default function CopyButtonDemo() {
	const [copyCount, setCopyCount] = useState<number>(0);
	const [customText, setCustomText] = useState<string>('npm install react-public-components');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 基础形态 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 基础形态（按钮 / 图标 / 行内文本）</h3>
				<div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
					<CopyButton text="https://github.com/xhua007/react-public-components" mode="button">
						复制链接
					</CopyButton>

					<CopyButton
						text="https://github.com/xhua007/react-public-components"
						mode="button"
						type="primary"
					>
						主按钮复制
					</CopyButton>

					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 8,
							padding: '6px 12px',
							background: '#f5f5f5',
							borderRadius: 6,
						}}
					>
						<span style={{ fontSize: 13, color: '#595959' }}>Token: token_sample_88392104928</span>
						<CopyButton text="token_sample_88392104928" mode="icon" />
					</div>

					<div style={{ fontSize: 14 }}>
						订单编号：
						<CopyButton text="ORDER_20260815_0099" mode="inline">
							ORDER_20260815_0099
						</CopyButton>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持 `button`（常规与主色按钮）、`icon`（纯图标按钮）以及 `inline`（内联文字高亮）三种形态。
				</p>
			</div>

			{/* 2. 动态内容 & 异步获取 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 动态输入 & 异步复制</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500 }}>
					<div style={{ display: 'flex', gap: 8 }}>
						<input
							type="text"
							value={customText}
							onChange={(e) => setCustomText(e.target.value)}
							style={{
								flex: 1,
								padding: '6px 12px',
								border: '1px solid #d9d9d9',
								borderRadius: 6,
								fontSize: 14,
								outline: 'none',
							}}
						/>
						<CopyButton text={customText}>复制输入内容</CopyButton>
					</div>

					<div>
						<CopyButton
							getText={async () => {
								// 模拟异步请求获取一次性敏感密钥
								await new Promise((res) => setTimeout(res, 600));
								return `TEMP_SEC_TOKEN_${Date.now()}`;
							}}
							onCopy={(val) => {
								setCopyCount((c) => c + 1);
								console.log('已复制内容:', val);
							}}
						>
							异步生成并复制临时凭证
						</CopyButton>
						<span style={{ marginLeft: 12, fontSize: 13, color: '#52c41a' }}>
							已触发复制回调次数：{copyCount}
						</span>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持传入 `getText` 函数以支持异步获取或动态拼接剪贴板内容，并支持 `onCopy` 回调。
				</p>
			</div>

			{/* 3. 自定义 Tooltip 与持续时长 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>3. 自定义反馈文案与持续时间 (duration)</h3>
				<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
					<CopyButton
						text="自定义提示成功文案"
						tooltip="🎉 恭喜！已成功复制到剪贴板"
						copiedText="复制完毕 ✨"
						duration={3000}
					>
						自定义反馈 (3秒)
					</CopyButton>

					<CopyButton text="无 Tooltip" tooltip={false}>
						禁用悬浮 Tooltip
					</CopyButton>

					<CopyButton text="禁用状态" disabled>
						禁用态
					</CopyButton>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					可通过 `tooltip` 自定义气泡文字或禁用气泡，通过 `duration` 调整成功反馈高亮时长。
				</p>
			</div>
		</div>
	);
}
