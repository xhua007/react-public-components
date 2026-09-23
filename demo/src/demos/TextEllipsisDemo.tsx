import { useState } from 'react';
import TextEllipsis from '../../../TextEllipsis';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

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
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 4 }}>
							单行截断（lines=1，鼠标悬停查看完整内容）:
						</div>
						<div
							style={{
								background: '#f9f9f9',
								padding: '10px 14px',
								borderRadius: 6,
								border: '1px solid #f0f0f0',
							}}
						>
							<TextEllipsis>{longText}</TextEllipsis>
						</div>
					</div>

					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 4 }}>
							两行截断（lines=2）:
						</div>
						<div
							style={{
								background: '#f9f9f9',
								padding: '10px 14px',
								borderRadius: 6,
								border: '1px solid #f0f0f0',
							}}
						>
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
				<div
					style={{
						maxWidth: 460,
						background: '#f9f9f9',
						padding: '12px 16px',
						borderRadius: 8,
						border: '1px solid #f0f0f0',
					}}
				>
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
					<div
						style={{
							background: '#f9f9f9',
							padding: '8px 12px',
							borderRadius: 6,
							border: '1px solid #f0f0f0',
						}}
					>
						<TextEllipsis
							prefix={<span style={{ color: '#1677ff', fontWeight: 600 }}>[公告]</span>}
							suffix={<span style={{ color: '#8c8c8c', fontSize: 12 }}>2026-08-15</span>}
							copyable
						>
							新版本 v1.2.0 已正式发布，包含 5 个全新的高频业务组件与性能优化！
						</TextEllipsis>
					</div>

					<div
						style={{
							background: '#f9f9f9',
							padding: '8px 12px',
							borderRadius: 6,
							border: '1px solid #f0f0f0',
						}}
					>
						<TextEllipsis prefix={<span style={{ color: '#52c41a' }}>● 签名哈希:</span>} copyable>
							0x9f8c47b59102c8928374829104fae89123891023849102938491029384910293
						</TextEllipsis>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					提供 `prefix`、`suffix` 前后置插槽，并支持一键 `copyable` 集成复制功能。
				</p>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 640 }}>
					<CodeSnippet
						language="typescript"
						code={`import { TextEllipsis } from 'react-public-components';

export default function App() {
  return (
    <TextEllipsis
      lines={2}
      expandable
      copyable
      tooltip="auto"
      prefix="[重要通知] "
    >
      这是一段非常长的工作汇报正文，多余的文字将会自动展示省略号，并且支持点击展开与一键复制...
    </TextEllipsis>
  );
}`}
					/>
				</div>
			</div>

			<ApiTable
				data={[
					{
						name: 'children',
						desc: '需要文本截断的文字内容或节点',
						type: 'ReactNode',
						required: true,
					},
					{
						name: 'lines',
						desc: '最大展示行数（超过自动展示省略号）',
						type: 'number',
						default: '1',
					},
					{
						name: 'expandable',
						desc: '是否支持展开/收起按钮（支持布尔值或配置对象 { collapsedText, expandedText }）',
						type: 'boolean | TextEllipsisExpandConfig',
						default: 'false',
					},
					{
						name: 'tooltip',
						desc: "悬停 Tooltip 提示：'auto' 仅溢出截断时展示 / true 始终展示 / false 禁用",
						type: "'auto' | boolean | ReactNode",
						default: "'auto'",
					},
					{
						name: 'copyable',
						desc: '是否在右侧展示一键复制完整文本按钮',
						type: 'boolean',
						default: 'false',
					},
					{ name: 'prefix', desc: '前缀装饰节点', type: 'ReactNode', default: '-' },
					{ name: 'suffix', desc: '后缀说明节点', type: 'ReactNode', default: '-' },
					{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
					{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
				]}
			/>
		</div>
	);
}
