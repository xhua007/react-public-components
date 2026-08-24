import TiltCard from '../../../TiltCard';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function TiltCardDemo() {
	const usageCode = `import { TiltCard } from 'react-public-components';

export default function App() {
  return (
    <TiltCard
      maxAngle={15}
      scale={1.02}
      glare
      style={{
        width: 320,
        height: 180,
        borderRadius: 16,
        background: 'linear-gradient(135deg, #1f1f1f, #141414)',
        color: '#fff',
        padding: 24
      }}
    >
      <h3>黑金尊享卡</h3>
      <p>8888 •••• •••• 2026</p>
    </TiltCard>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '卡片内部子元素节点', type: 'ReactNode', required: true },
		{ name: 'maxAngle', desc: '最大倾斜旋转角度（度）', type: 'number', default: '15' },
		{ name: 'scale', desc: '鼠标悬停时的立体缩放比例', type: 'number', default: '1.02' },
		{ name: 'glare', desc: '是否开启表面随光照高光反光效果（Glare）', type: 'boolean', default: 'true' },
		{ name: 'perspective', desc: '透视景深距离（像素）', type: 'number', default: '1000' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 3D 视差物理倾斜卡片（鼠标在卡片上方移动体验 3D 景深与流光高光）
				</h3>

				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					{/* 会员卡片 */}
					<TiltCard
						maxAngle={18}
						style={{
							width: 320,
							height: 190,
							background: 'linear-gradient(135deg, #1f1f1f 0%, #141414 100%)',
							borderRadius: 16,
							border: '1px solid #333333',
							color: '#ffffff',
						}}
					>
						<div
							style={{
								padding: 24,
								height: '100%',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							<div
								style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
							>
								<span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>BLACK CARD</span>
								<span style={{ fontSize: 20 }}>💎</span>
							</div>

							<div style={{ fontSize: 18, fontFamily: 'monospace', letterSpacing: 2 }}>
								8888 •••• •••• 2026
							</div>

							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									fontSize: 12,
									color: '#8c8c8c',
								}}
							>
								<span>ALEX CHEN</span>
								<span>EXP: 12/29</span>
							</div>
						</div>
					</TiltCard>

					{/* 极简亮色卡片 */}
					<TiltCard
						maxAngle={15}
						style={{
							width: 320,
							height: 190,
							background: '#ffffff',
							borderRadius: 16,
							border: '1px solid #e8e8e8',
							boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
						}}
					>
						<div
							style={{
								padding: 24,
								height: '100%',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							<div style={{ fontSize: 24 }}>🚀</div>
							<div>
								<h4 style={{ margin: '0 0 6px 0', fontSize: 16, color: '#1f1f1f' }}>
									企业级效能引擎
								</h4>
								<p style={{ margin: 0, fontSize: 13, color: '#8c8c8c' }}>
									毫秒级自动化构建与发布流水线
								</p>
							</div>
							<div style={{ fontSize: 13, color: '#1677ff', fontWeight: 600 }}>
								查看产品详情 ➔
							</div>
						</div>
					</TiltCard>
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
