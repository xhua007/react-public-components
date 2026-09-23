import Marquee from '../../../Marquee';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

const clientLogos = [
	{ name: 'Google Cloud', emoji: '☁️' },
	{ name: 'Vercel Platform', emoji: '▲' },
	{ name: 'Next.js 15', emoji: '⚡' },
	{ name: 'TypeScript', emoji: '🔷' },
	{ name: 'Tailwind CSS', emoji: '🎨' },
	{ name: 'Ant Design', emoji: '🐜' },
	{ name: 'GitHub Copilot', emoji: '🤖' },
];

export default function MarqueeDemo() {
	const usageCode = `import { Marquee } from 'react-public-components';

export default function App() {
  return (
    <Marquee speed={40} pauseOnHover gradient gradientColor="#ffffff">
      <div style={{ display: 'flex', gap: 24 }}>
        <span>🚀 极速部署</span>
        <span>🛡️ 安全防篡改</span>
        <span>🎨 精美设计</span>
      </div>
    </Marquee>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '滚动的子元素内容', type: 'ReactNode', required: true },
		{
			name: 'direction',
			desc: "滚动方向：'left' | 'right' | 'up' | 'down'",
			type: 'string',
			default: "'left'",
		},
		{ name: 'speed', desc: '滚动速度（像素/秒）', type: 'number', default: '50' },
		{ name: 'pauseOnHover', desc: '鼠标悬停时是否自动暂停动画', type: 'boolean', default: 'true' },
		{
			name: 'gradient',
			desc: '是否开启两侧/上下边缘羽化渐变遮罩',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'gradientColor',
			desc: '边缘羽化渐变的遮罩颜色（需与背景色一致）',
			type: 'string',
			default: "'#ffffff'",
		},
		{ name: 'gap', desc: '子项循环间距（像素）', type: 'number', default: '24' },
		{ name: 'play', desc: '是否保持滚动播放', type: 'boolean', default: 'true' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 客户 Logo 墙无缝平滑横向滚动 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 合作伙伴 Logo 墙（硬件加速无缝横向流动 + 悬停暂停 + 边缘渐变羽化）
				</h3>
				<div
					style={{
						background: '#fafafa',
						border: '1px solid #f0f0f0',
						borderRadius: 12,
						padding: '24px 0',
						maxWidth: 680,
					}}
				>
					<Marquee speed={45} gradient gradientColor="#fafafa" pauseOnHover>
						{clientLogos.map((item, idx) => (
							<div
								key={idx}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 8,
									padding: '8px 18px',
									background: '#ffffff',
									border: '1px solid #e8e8e8',
									borderRadius: 8,
									boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
									fontSize: 14,
									fontWeight: 500,
									color: '#262626',
								}}
							>
								<span style={{ fontSize: 18 }}>{item.emoji}</span>
								<span>{item.name}</span>
							</div>
						))}
					</Marquee>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					鼠标移入上方 Logo 墙可自动暂停；左右两侧自带自然平滑的边缘淡化渐变遮罩。
				</p>
			</div>

			{/* 2. 反向滚动与广播条 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					2. 广播通知条（反向流动 direction="right"）
				</h3>
				<div
					style={{
						background: '#fffbe6',
						border: '1px solid #ffe58f',
						borderRadius: 6,
						padding: '8px 0',
						maxWidth: 680,
						color: '#d46b08',
						fontSize: 13,
					}}
				>
					<Marquee direction="right" speed={35} gap={40}>
						<span>🔥 [重要公告] 系统将于本周日凌晨 02:00 进行核心数据库升级</span>
						<span>🚀 欢迎体验全新上线的 10+ 款现代化业务高阶公共组件</span>
						<span>💡 支持零第三方大型 UI 依赖快速集成</span>
					</Marquee>
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
