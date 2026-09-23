import BadgeRibbon from '../../../BadgeRibbon';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function BadgeRibbonDemo() {
	const usageCode = `import { BadgeRibbon } from 'react-public-components';

export default function App() {
  return (
    <BadgeRibbon text="HOT 爆款" color="#ff4d4f" placement="end">
      <div style={{ width: 240, padding: 20, background: '#fff', borderRadius: 8 }}>
        <h3>专业企业版</h3>
        <p>¥ 199/月</p>
      </div>
    </BadgeRibbon>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'text', desc: '缎带角标上展示的文字或节点', type: 'ReactNode', required: true },
		{ name: 'children', desc: '被包裹的卡片容器子元素', type: 'ReactNode', required: true },
		{ name: 'color', desc: '缎带背景色或渐变色', type: 'string', default: "'#ff4d4f'" },
		{
			name: 'placement',
			desc: "挂载角落位置：'start' 左上角 / 'end' 右上角",
			type: "'start' | 'end'",
			default: "'end'",
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 卡片斜角丝带 / 推荐促销缎带角标</h3>

				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					{/* 右上角 HOT 缎带 */}
					<BadgeRibbon text="HOT 爆款" color="#ff4d4f">
						<div
							style={{
								width: 240,
								padding: 20,
								background: '#ffffff',
								border: '1px solid #f0f0f0',
								borderRadius: 8,
							}}
						>
							<div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>专业企业版 (Pro)</div>
							<div style={{ fontSize: 22, fontWeight: 700, color: '#ff4d4f', marginBottom: 12 }}>
								¥ 199 <span style={{ fontSize: 12, color: '#8c8c8c' }}>/月</span>
							</div>
							<p style={{ fontSize: 12, color: '#595959', margin: 0 }}>
								包含全部 40+ 款高阶组件、无限私有部署与全天候技术支持。
							</p>
						</div>
					</BadgeRibbon>

					{/* 左上角 NEW 渐变缎带 */}
					<BadgeRibbon
						text="公测中"
						placement="start"
						color="linear-gradient(135deg, #1677ff 0%, #722ed1 100%)"
					>
						<div
							style={{
								width: 240,
								padding: 20,
								background: '#ffffff',
								border: '1px solid #f0f0f0',
								borderRadius: 8,
							}}
						>
							<div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
								AI 智能代码生成器
							</div>
							<div style={{ fontSize: 22, fontWeight: 700, color: '#1677ff', marginBottom: 12 }}>
								免费体验
							</div>
							<p style={{ fontSize: 12, color: '#595959', margin: 0 }}>
								输入提示词一键生成现代化 React UI 组件代码。
							</p>
						</div>
					</BadgeRibbon>
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
