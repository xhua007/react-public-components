import { useState, useRef } from 'react';
import Fullscreen, { FullscreenRef } from '../../../Fullscreen';
import { FullscreenOutlined, FullscreenExitOutlined } from '../../../src/icons';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

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
						{({ isFullscreen }) => (
							<div
								style={{
									background: '#ffffff',
									border: isFullscreen ? 'none' : '1px solid #e8e8e8',
									borderRadius: isFullscreen ? 0 : 12,
									padding: isFullscreen ? '40px 48px' : 24,
									boxShadow: isFullscreen ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
									minHeight: isFullscreen ? '100vh' : 'auto',
									boxSizing: 'border-box',
								}}
							>
								<h4
									style={{
										margin: '0 0 12px 0',
										fontSize: isFullscreen ? 22 : 18,
										color: '#1677ff',
									}}
								>
									📊 销售业绩看板 (Analytics Dashboard)
								</h4>
								<p style={{ color: '#595959', lineHeight: 1.6, margin: '0 0 16px 0' }}>
									点击右上角全屏图标可使当前卡片进入全屏沉浸式演示。按 ESC 键或再次点击即可退出。
								</p>

								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(3, 1fr)',
										gap: isFullscreen ? 20 : 12,
										marginTop: 20,
										maxWidth: isFullscreen ? 900 : '100%',
									}}
								>
									<div
										style={{
											background: '#f5f5f5',
											padding: isFullscreen ? 20 : 12,
											borderRadius: 8,
											textAlign: 'center',
										}}
									>
										<div style={{ color: '#8c8c8c', fontSize: isFullscreen ? 14 : 12 }}>
											今日访问量
										</div>
										<div
											style={{ fontSize: isFullscreen ? 26 : 20, fontWeight: 700, marginTop: 6 }}
										>
											12,840
										</div>
									</div>
									<div
										style={{
											background: '#f5f5f5',
											padding: isFullscreen ? 20 : 12,
											borderRadius: 8,
											textAlign: 'center',
										}}
									>
										<div style={{ color: '#8c8c8c', fontSize: isFullscreen ? 14 : 12 }}>转化率</div>
										<div
											style={{
												fontSize: isFullscreen ? 26 : 20,
												fontWeight: 700,
												color: '#52c41a',
												marginTop: 6,
											}}
										>
											4.68%
										</div>
									</div>
									<div
										style={{
											background: '#f5f5f5',
											padding: isFullscreen ? 20 : 12,
											borderRadius: 8,
											textAlign: 'center',
										}}
									>
										<div style={{ color: '#8c8c8c', fontSize: isFullscreen ? 14 : 12 }}>客单价</div>
										<div
											style={{
												fontSize: isFullscreen ? 26 : 20,
												fontWeight: 700,
												color: '#1677ff',
												marginTop: 6,
											}}
										>
											¥ 389.0
										</div>
									</div>
								</div>
							</div>
						)}
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
					<Fullscreen mode="web" fullscreen={webFsActive} onChange={(val) => setWebFsActive(val)}>
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
								<span style={{ color: '#6a9955' }}>
									// 网页内全屏不会黑屏遮挡，直接在当前页面置顶铺满
								</span>
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
					`mode="web"` 在当前浏览器页面内通过 fixed 置顶占满屏幕，非常适合嵌入
					iframe、内部富文本或编辑器。
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
									<div
										style={{
											fontSize: 13,
											color: isFullscreen ? '#8c8c8c' : '#595959',
											marginTop: 4,
										}}
									>
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

			{/* 示例代码 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 640 }}>
					<CodeSnippet
						language="typescript"
						code={`import { Fullscreen } from 'react-public-components';

export default function App() {
  return (
    <Fullscreen mode="web">
      {({ isFullscreen, toggle }) => (
        <div style={{ height: 320, padding: 24, background: '#f5f5f5', borderRadius: 8 }}>
          <h3>数据可视化看板</h3>
          <button onClick={toggle}>
            {isFullscreen ? '退出网页最大化' : '网页全屏最大化'}
          </button>
        </div>
      )}
    </Fullscreen>
  );
}`}
					/>
				</div>
			</div>

			<ApiTable
				data={[
					{
						name: 'mode',
						desc: "全屏模式：'browser' 浏览器原生全屏 / 'web' 网页内最大化置顶",
						type: "'browser' | 'web'",
						default: "'browser'",
					},
					{
						name: 'showButton',
						desc: '是否在容器角落显示快捷悬浮全屏切换按钮',
						type: 'boolean',
						default: 'false',
					},
					{
						name: 'buttonPosition',
						desc: "悬浮按钮位置：'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
						type: 'string',
						default: "'top-right'",
					},
					{
						name: 'target',
						desc: '自定义目标全屏元素（若不传默认全屏当前容器）',
						type: 'HTMLElement | (() => HTMLElement | null)',
						default: '-',
					},
					{ name: 'fullscreen', desc: '受控全屏状态', type: 'boolean', default: '-' },
					{
						name: 'onChange',
						desc: '全屏状态发生改变时的回调',
						type: '(isFullscreen: boolean) => void',
						default: '-',
					},
					{
						name: 'children',
						desc: '子元素或 Render Props 函数，接收 isFullscreen, enter, exit, toggle',
						type: 'ReactNode | ((props) => ReactNode)',
						default: '-',
					},
				]}
			/>
		</div>
	);
}
