import { useState } from 'react';
import TextEllipsis from '../../../TextEllipsis';

export default function TextEllipsisDemo() {
	const [expandState, setExpandState] = useState<boolean>(false);

	const longText =
		'React Public Components 是一套专注于解决中后台与复杂 Web 业务场景的高品质 React 组件库。它致力于补充主流 UI 库所缺失的实用组件，提供开箱即用、零第三方 UI 库依赖的轻量级解决方案。所有的组件均严格遵循现代设计美学与无障碍规范。';

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 单行与多行智能截断 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 单行与多行截断 (lines) & 自动 Tooltip</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 460 }}>
					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 4 }}>单行截断（lines=1，鼠标悬停查看完整内容）:</div>
						<div style={{ background: '#f9f9f9', padding: '10px 14px', borderRadius: 6, border: '1px solid #f0f0f0' }}>
							<TextEllipsis>{longText}</TextEllipsis>
						</div>
					</div>

					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 4 }}>两行截断（lines=2）:</div>
						<div style={{ background: '#f9f9f9', padding: '10px 14px', borderRadius: 6, border: '1px solid #f0f0f0' }}>
							<TextEllipsis lines={2}>{longText}</TextEllipsis>
						</div>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					默认开启智能 Tooltip，仅在文本确实被截断超出边界时才会在 hover 时展示气泡提示。
				</p>
			</div>

			{/* 2. 展开与收起切换 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 可展开/收起操作 (expandable)</h3>
				<div style={{ maxWidth: 460, background: '#f9f9f9', padding: '12px 16px', borderRadius: 8, border: '1px solid #f0f0f0' }}>
					<TextEllipsis
						lines={2}
						expandable={{
							collapsedText: '查看更多 ▼',
							expandedText: '收起内容 ▲',
							onExpandChange: (exp) => setExpandState(exp),
						}}
					>
						{longText}
					</TextEllipsis>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					当前展开状态：{expandState ? '已展开' : '已折叠'}。支持自定义展开/收起按钮文案和状态回调。
				</p>
			</div>

			{/* 3. 前缀、后缀与一键复制功能 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>3. 前缀、后缀与一键复制 (copyable)</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500 }}>
					<div style={{ background: '#f9f9f9', padding: '8px 12px', borderRadius: 6, border: '1px solid #f0f0f0' }}>
						<TextEllipsis
							prefix={<span style={{ color: '#1677ff', fontWeight: 600 }}>[公告]</span>}
							suffix={<span style={{ color: '#8c8c8c', fontSize: 12 }}>2026-08-15</span>}
							copyable
						>
							新版本 v1.2.0 已正式发布，包含 5 个全新的高频业务组件与性能优化！
						</TextEllipsis>
					</div>

					<div style={{ background: '#f9f9f9', padding: '8px 12px', borderRadius: 6, border: '1px solid #f0f0f0' }}>
						<TextEllipsis
							prefix={<span style={{ color: '#52c41a' }}>● 签名哈希:</span>}
							copyable
						>
							0x9f8c47b59102c8928374829104fae89123891023849102938491029384910293
						</TextEllipsis>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					提供 `prefix`、`suffix` 前后置插槽，并支持一键 `copyable` 集成复制功能。
				</p>
			</div>
		</div>
	);
}
