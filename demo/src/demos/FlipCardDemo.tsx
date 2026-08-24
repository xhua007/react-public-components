import FlipCard from '../../../FlipCard';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function FlipCardDemo() {
	const usageCode = `import { FlipCard } from 'react-public-components';

export default function App() {
  return (
    <FlipCard
      width={280}
      height={180}
      trigger="hover"
      front={
        <div style={{ padding: 20, background: '#1677ff', color: '#fff', borderRadius: 12, height: '100%' }}>
          <h3>服务节点 A (正面)</h3>
          <p>悬停查看详细状态</p>
        </div>
      }
      back={
        <div style={{ padding: 20, background: '#141414', color: '#fff', borderRadius: 12, height: '100%' }}>
          <h3>集群详情 (背面)</h3>
          <p>CPU 负载: 24%</p>
        </div>
      }
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'front', desc: '卡片正面展示内容', type: 'ReactNode', required: true },
		{ name: 'back', desc: '卡片背面展示内容', type: 'ReactNode', required: true },
		{ name: 'trigger', desc: "翻转触发方式：'hover' 鼠标悬停 / 'click' 点击", type: "'hover' | 'click'", default: "'hover'" },
		{ name: 'direction', desc: "翻转旋转轴方向：'horizontal' 水平翻转 / 'vertical' 垂直翻转", type: "'horizontal' | 'vertical'", default: "'horizontal'" },
		{ name: 'flipped', desc: '当前是否翻转到背面（受控）', type: 'boolean', default: '-' },
		{ name: 'onFlip', desc: '翻转状态切换时的回调函数', type: '(isFlipped: boolean) => void', default: '-' },
		{ name: 'width', desc: '卡片宽度（像素数字或 CSS 字符串）', type: 'number | string', default: '300' },
		{ name: 'height', desc: '卡片高度（像素数字或 CSS 字符串）', type: 'number | string', default: '200' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 3D 正反面翻转卡片（鼠标悬停或点击触发 180° 平滑翻转）
				</h3>

				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					{/* 悬停水平翻转 */}
					<FlipCard
						width={280}
						height={180}
						trigger="hover"
						front={
							<div
								style={{
									width: '100%',
									height: '100%',
									boxSizing: 'border-box',
									background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
									color: '#ffffff',
									padding: 20,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									borderRadius: 12,
								}}
							>
								<div>
									<div style={{ fontSize: 12, opacity: 0.8 }}>FRONT CARD (正面)</div>
									<div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>
										企业服务集群 Node-01
									</div>
								</div>
								<div style={{ fontSize: 12 }}>👉 鼠标悬停查看背面详细指标</div>
							</div>
						}
						back={
							<div
								style={{
									width: '100%',
									height: '100%',
									boxSizing: 'border-box',
									background: 'linear-gradient(135deg, #141414 0%, #1f1f1f 100%)',
									color: '#ffffff',
									padding: 20,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									borderRadius: 12,
									border: '1px solid #333333',
								}}
							>
								<div>
									<div style={{ fontSize: 12, color: '#52c41a' }}>● RUNNING (运行正常)</div>
									<div style={{ fontSize: 13, marginTop: 8, color: '#d9d9d9', lineHeight: 1.6 }}>
										<div>CPU 负载：24.5%</div>
										<div>内存占用：4.2 GB / 16 GB</div>
									</div>
								</div>
								<div style={{ fontSize: 12, color: '#8c8c8c' }}>IP: 192.168.10.42</div>
							</div>
						}
					/>

					{/* 点击垂直翻转 */}
					<FlipCard
						width={280}
						height={180}
						trigger="click"
						direction="vertical"
						front={
							<div
								style={{
									width: '100%',
									height: '100%',
									boxSizing: 'border-box',
									background: '#ffffff',
									border: '1px solid #e8e8e8',
									borderRadius: 12,
									padding: 20,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
								}}
							>
								<div>
									<span style={{ fontSize: 24 }}>🔒</span>
									<h4 style={{ margin: '8px 0 0 0', fontSize: 16 }}>机密密钥卡片</h4>
								</div>
								<div style={{ fontSize: 12, color: '#1677ff' }}>👆 点击卡片翻转查看明文</div>
							</div>
						}
						back={
							<div
								style={{
									width: '100%',
									height: '100%',
									boxSizing: 'border-box',
									background: '#fffbe6',
									border: '1px solid #ffe58f',
									borderRadius: 12,
									padding: 20,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<div style={{ fontSize: 12, color: '#d46b08', fontWeight: 600 }}>
										SECRET KEY (机密)
									</div>
									<div style={{ fontSize: 13, fontFamily: 'monospace', marginTop: 8 }}>
										sk-live-8848992019482
									</div>
								</div>
								<div style={{ fontSize: 12, color: '#8c8c8c' }}>再次点击翻回正面</div>
							</div>
						}
					/>
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
