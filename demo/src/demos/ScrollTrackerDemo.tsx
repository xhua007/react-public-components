import { useState, useRef } from 'react';
import { ScrollTracker, StickyHeader } from '../../../ScrollTracker';

export default function ScrollTrackerDemo() {
	const [customPercent, setCustomPercent] = useState<number>(0);
	const [stickyState, setStickyState] = useState<boolean>(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 局部滚动容器进度追踪 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 局部容器阅读进度条 (ScrollTracker)
				</h3>
				<div style={{ maxWidth: 640 }}>
					<div
						style={{
							position: 'relative',
							border: '1px solid #e8e8e8',
							borderRadius: 8,
							overflow: 'hidden',
						}}
					>
						{/* 绑定到局部容器顶部的渐变进度条 */}
						<ScrollTracker
							target={() => scrollContainerRef.current}
							color={['#1677ff', '#52c41a', '#faad14']}
							height={4}
							showPercentage
							onChange={(p) => setCustomPercent(p)}
							style={{ position: 'absolute' }}
						/>

						<div
							ref={scrollContainerRef}
							style={{
								height: 220,
								overflowY: 'auto',
								padding: '24px 20px',
								background: '#ffffff',
								lineHeight: 1.8,
								fontSize: 14,
								color: '#595959',
							}}
						>
							<h4 style={{ margin: '0 0 12px 0', color: '#1f1f1f' }}>
								关于 React Public Components 组件库
							</h4>
							<p>
								这是一个专为中后台及现代 Web 开发打造的 React 公共组件库。它致力于补充主流 UI
								库（如 Ant Design 等）所未提供的高频实用组件，提供开箱即用、零第三方 UI
								库依赖的轻量级解决方案。
							</p>
							<p>
								组件库内置了诸如折叠容器（CollapseBox）、分屏面板（Splitter）、边框流光（BorderBeam）、颜色选择器（ColorPicker）、瀑布流布局（Masonry）、禁用遮罩（DisabledBox）、一键复制（CopyButton）、智能文本截断（TextEllipsis）、防抖异步选择框（DebounceSelect）、平滑数字滚动（CountUp）、右键菜单（ContextMenu）、全屏容器（Fullscreen）、图片裁剪（ImageCropper）、滚动指示器与吸顶组件（ScrollTracker/StickyHeader）、多格式文件预览（FilePreviewer）以及底部悬浮操作栏（FloatingActionBar）等。
							</p>
							<p>
								所有组件均拥有精心调校的设计美感，提供顺畅的微交互动效与严苛的 TypeScript 类型定义，助您轻松构建现代化 Web 应用。
							</p>
						</div>
					</div>
					<div style={{ marginTop: 8, fontSize: 13, color: '#1677ff' }}>
						当前容器阅读进度：{customPercent}%
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					通过 `target` 属性可绑定任意局部溢出滚动容器，支持多段色彩渐变与数字角标展示。
				</p>
			</div>

			{/* 2. 智能吸顶头部 (StickyHeader) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					2. 智能吸顶头部 (StickyHeader，滚动时响应 stuck 状态)
				</h3>
				<div
					style={{
						height: 280,
						overflowY: 'auto',
						border: '1px solid #e8e8e8',
						borderRadius: 8,
						background: '#fafafa',
						position: 'relative',
						maxWidth: 640,
					}}
				>
					<div style={{ height: 60, padding: 16, color: '#8c8c8c', fontSize: 13 }}>
						向下滚动此区域体验吸顶 Header 效果...
					</div>

					<StickyHeader
						offsetTop={0}
						onStickyChange={(stuck) => setStickyState(stuck)}
						style={{
							padding: '12px 20px',
							background: '#ffffff',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						{(isSticky) => (
							<>
								<div style={{ fontWeight: 600, color: isSticky ? '#1677ff' : '#1f1f1f' }}>
									{isSticky ? '📌 导航栏已进入吸顶锁定状态' : '🏷️ 页面标题工具栏'}
								</div>
								<span
									style={{
										fontSize: 12,
										padding: '2px 8px',
										borderRadius: 4,
										background: isSticky ? '#e6f4ff' : '#f5f5f5',
										color: isSticky ? '#1677ff' : '#8c8c8c',
									}}
								>
									{isSticky ? 'Stuck (毛玻璃/阴影)' : 'Normal'}
								</span>
							</>
						)}
					</StickyHeader>

					<div style={{ padding: 20, minHeight: 400, color: '#666', lineHeight: 1.8 }}>
						<p>这里是页面的长内容区域 1...</p>
						<p>这里是页面的长内容区域 2...</p>
						<p>这里是页面的长内容区域 3...</p>
						<p>这里是页面的长内容区域 4...</p>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					当组件到达 `offsetTop` 设定阈值时，自动触发 `isSticky` 状态并平滑附加上毛玻璃滤镜与阴影。
				</p>
			</div>
		</div>
	);
}
