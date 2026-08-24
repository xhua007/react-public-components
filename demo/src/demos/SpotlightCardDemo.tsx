import SpotlightCard from '../../../SpotlightCard';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function SpotlightCardDemo() {
	const usageCode = `import { SpotlightCard } from 'react-public-components';

export default function App() {
  return (
    <SpotlightCard
      dark
      spotlightColor="rgba(114, 46, 209, 0.35)"
      spotlightSize={400}
    >
      <div style={{ padding: 24 }}>
        <h3>下一代智能组件库</h3>
        <p>鼠标悬停移动体验聚光灯高光效果。</p>
      </div>
    </SpotlightCard>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '卡片子元素内容', type: 'ReactNode', required: true },
		{ name: 'spotlightColor', desc: '鼠标聚光灯跟随光晕的 RGBA 颜色', type: 'string', default: "'rgba(22, 119, 255, 0.15)'" },
		{ name: 'spotlightSize', desc: '聚光灯光晕扩散半径（像素）', type: 'number', default: '320' },
		{ name: 'dark', desc: '是否启用暗色高对比科技感主题', type: 'boolean', default: 'false' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 浅色模式聚光灯卡片 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 鼠标聚光灯追踪卡片（鼠标在卡片上移动查看光晕跟随）
				</h3>
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 680 }}>
					<SpotlightCard spotlightColor="rgba(22, 119, 255, 0.12)">
						<div style={{ padding: 24 }}>
							<div style={{ fontSize: 24, marginBottom: 8 }}>⚡</div>
							<h4 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#1f1f1f' }}>
								高性能流式渲染
							</h4>
							<p style={{ margin: 0, color: '#595959', fontSize: 13, lineHeight: 1.6 }}>
								基于现代前端架构打造，零多余重绘，极速响应海量数据交互。
							</p>
						</div>
					</SpotlightCard>

					<SpotlightCard spotlightColor="rgba(82, 196, 26, 0.14)">
						<div style={{ padding: 24 }}>
							<div style={{ fontSize: 24, marginBottom: 8 }}>🛡️</div>
							<h4 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#1f1f1f' }}>
								企业级安全合规
							</h4>
							<p style={{ margin: 0, color: '#595959', fontSize: 13, lineHeight: 1.6 }}>
								内置多重脱敏、鉴权与防攻击防护机制，确保敏感数据绝不外泄。
							</p>
						</div>
					</SpotlightCard>
				</div>
			</div>

			{/* 2. 暗色科技主题卡片 (Dark Mode) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 暗色极客科技主题 (dark=true)</h3>
				<div style={{ maxWidth: 680 }}>
					<SpotlightCard dark spotlightColor="rgba(114, 46, 209, 0.35)" spotlightSize={400}>
						<div style={{ padding: 28 }}>
							<div style={{ color: '#d3adf7', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
								FUTURE OF UI COMPONENTS
							</div>
							<h3 style={{ margin: '0 0 12px 0', fontSize: 20, color: '#ffffff' }}>
								下一代 AI 增强型设计系统
							</h3>
							<p style={{ margin: 0, color: '#8c8c8c', fontSize: 14, lineHeight: 1.6 }}>
								专为追求极致视觉品质与生产力效率的团队量身打造，开箱即用。
							</p>
						</div>
					</SpotlightCard>
				</div>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 680 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
