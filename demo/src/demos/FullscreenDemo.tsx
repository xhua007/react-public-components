import { useState, useRef } from 'react';
import Fullscreen, { FullscreenRef } from '../../../Fullscreen';
import { FullscreenOutlined, FullscreenExitOutlined } from '../../../src/icons';

export default function FullscreenDemo() {
	const [webFsActive, setWebFsActive] = useState<boolean>(false);
	const fsRef = useRef<FullscreenRef>(null);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 局部容器全屏（带快捷悬浮按钮） */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 局部元素/容器全屏（原生浏览器模式）</h3>
				<div style={{ maxWidth: 640 }}>
					<Fullscreen showButton buttonPosition="top-right">
						<div
							style={{
								background: '#ffffff',
								border: '1px solid #e8e8e8',
								borderRadius: 12,
								padding: 24,
								boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
							}}
						>
							<h4 style={{ margin: '0 0 12px 0', fontSize: 18, color: '#1677ff' }}>
								📊 销售业绩看板 (Analytics Dashboard)
							</h4>
							<p style={{ color: '#595959', lineHeight: 1.6, margin: '0 0 16px 0' }}>
								点击右上角全屏图标可使当前卡片进入全屏沉浸式演示。按 ESC 键或再次点击即可退出。
							</p>

							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(3, 1fr)',
									gap: 12,
									marginTop: 16,
								}}
							>
								<div style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, textAlign: 'center' }}>
									<div style={{ color: '#8c8c8c', fontSize: 12 }}>今日访问量</div>
									<div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>12,840</div>
								</div>
								<div style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, textAlign: 'center' }}>
									<div style={{ color: '#8c8c8c', fontSize: 12 }}>转化率</div>
									<div style={{ fontSize: 20, fontWeight: 700, color: '#52c41a', marginTop: 4 }}>
										4.68%
									</div>
								</div>
								<div style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, textAlign: 'center' }}>
									<div style={{ color: '#8c8c8c', fontSize: 12 }}>客单价</div>
									<div style={{ fontSize: 20, fontWeight: 700, color: '#1677ff', marginTop: 4 }}>
										¥ 389.0
									</div>
								</div>
							</div>
						</div>
					</Fullscreen>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					通过 `showButton` 可在右上角自动生成磨砂玻璃质感的全屏切换按钮。
				</p>
			</div>

			{/* 2. 网页内最大化模式 (Web Fullscreen) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 网页内全屏/最大化模式 (mode="web")</h3>
				<div style={{ maxWidth: 640 }}>
					<Fullscreen
						mode="web"
						fullscreen={webFsActive}
						onChange={(val) => setWebFsActive(val)}
					>
						<div
							style={{
								background: webFsActive ? '#ffffff' : '#fafafa',
								border: '1px solid #e8e8e8',
								borderRadius: webFsActive ? 0 : 12,
								padding: 24,
								height: webFsActive ? '100%' : 'auto',
								boxSizing: 'border-box',
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: 16,
								}}
							>
								<h4 style={{ margin: 0, fontSize: 18 }}>💻 代码与配置编辑器 (Web Maximize)</h4>
								<button
									onClick={() => setWebFsActive(!webFsActive)}
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: 6,
										padding: '6px 14px',
										background: '#1677ff',
										color: '#fff',
										border: 'none',
										borderRadius: 6,
										cursor: 'pointer',
									}}
								>
									{webFsActive ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
									{webFsActive ? '退出页面最大化 (ESC)' : '页面内最大化'}
								</button>
							</div>

							<div
								style={{
									background: '#1e1e1e',
									color: '#d4d4d4',
									padding: 16,
									borderRadius: 8,
									fontFamily: 'monospace',
									fontSize: 13,
									lineHeight: 1.6,
								}}
							>
								<span style={{ color: '#6a9955' }}>// 网页内全屏不会黑屏遮挡，直接在当前页面置顶铺满</span>
								<br />
								<span style={{ color: '#569cd6' }}>const</span> app = express();
								<br />
								app.use(cors());
								<br />
								app.listen(8080);
							</div>
						</div>
					</Fullscreen>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					`mode="web"` 在当前浏览器页面内通过 fixed 置顶占满屏幕，非常适合嵌入 iframe、内部富文本或编辑器。
				</p>
			</div>

			{/* 3. 命令式 Ref 与 Render Props 控制 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>3. Render Props 自由定制全屏触发器</h3>
				<div style={{ maxWidth: 640 }}>
					<Fullscreen ref={fsRef}>
						{({ isFullscreen, toggle }) => (
							<div
								style={{
									background: isFullscreen ? '#141414' : '#ffffff',
									color: isFullscreen ? '#ffffff' : '#262626',
									border: '1px solid #f0f0f0',
									borderRadius: 12,
									padding: 24,
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<div>
									<div style={{ fontSize: 16, fontWeight: 600 }}>
										状态：{isFullscreen ? '沉浸全屏模式中 🌙' : '普通窗口模式 ☀️'}
									</div>
									<div style={{ fontSize: 13, color: isFullscreen ? '#8c8c8c' : '#595959', marginTop: 4 }}>
										通过 children 接收 isFullscreen 状态与 toggle 方法
									</div>
								</div>

								<button
									onClick={toggle}
									style={{
										padding: '8px 16px',
										background: isFullscreen ? '#52c41a' : '#1677ff',
										color: '#fff',
										border: 'none',
										borderRadius: 6,
										cursor: 'pointer',
										fontWeight: 500,
									}}
								>
									{isFullscreen ? '退出全屏' : '进入全屏'}
								</button>
							</div>
						)}
					</Fullscreen>
				</div>
			</div>
		</div>
	);
}
