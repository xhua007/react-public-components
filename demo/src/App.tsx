import { useState, useMemo, ComponentType } from 'react';
import {
	CollapseBoxDemo,
	SplitterDemo,
	DisabledBoxDemo,
	MasonryDemo,
	BorderBeamDemo,
	ColorPickerDemo,
} from './demos';

// 组件导航菜单配置
interface ComponentMenuItem {
	key: string;
	name: string;
	title: string;
	tag?: string;
	description: string;
}

interface ComponentCategory {
	category: string;
	items: ComponentMenuItem[];
}

const navCategories: ComponentCategory[] = [
	{
		category: '布局 Layout',
		items: [
			{
				key: 'CollapseBox',
				name: 'CollapseBox',
				title: '折叠容器',
				tag: '1.0.0',
				description: '支持水平与垂直方向折叠的弹性容器组件，支持自定义按钮位置与默认尺寸。',
			},
			{
				key: 'Splitter',
				name: 'Splitter',
				title: '分隔面板',
				tag: '1.0.0',
				description: '支持多面板拖拽调整尺寸、折叠与双击重置的可定制分隔面板组件。',
			},
			{
				key: 'Masonry',
				name: 'Masonry',
				title: '瀑布流',
				tag: '1.0.0',
				description: '基于列优先的高性能响应式瀑布流布局组件，遵循 AntD 规范。',
			},
		],
	},
	{
		category: '数据录入 Data Entry',
		items: [
			{
				key: 'ColorPicker',
				name: 'ColorPicker',
				title: '颜色选择器',
				tag: '1.0.0',
				description: '支持 HEX、HSB、RGB 及渐变色模式的高级颜色选择与调色板组件。',
			},
		],
	},
	{
		category: '数据展示 Display',
		items: [
			{
				key: 'BorderBeam',
				name: 'BorderBeam',
				title: '边框流光',
				tag: '1.0.0',
				description: '为卡片或容器边框添加流动高亮与自定义渐变动画的特效组件。',
			},
		],
	},
	{
		category: '反馈 Feedback',
		items: [
			{
				key: 'DisabledBox',
				name: 'DisabledBox',
				title: '禁用遮罩',
				tag: '1.0.0',
				description: '为子级元素或复杂区域提供统一的禁用态透明遮罩与防交互保护。',
			},
		],
	},
];

// 组件与对应的 Demo 组件映射表
const demoComponentsMap: Record<
	string,
	{ name: string; title: string; component: ComponentType }
> = {
	CollapseBox: { name: 'CollapseBox', title: '折叠容器', component: CollapseBoxDemo },
	Splitter: { name: 'Splitter', title: '分隔面板', component: SplitterDemo },
	Masonry: { name: 'Masonry', title: '瀑布流', component: MasonryDemo },
	ColorPicker: { name: 'ColorPicker', title: '颜色选择器', component: ColorPickerDemo },
	BorderBeam: { name: 'BorderBeam', title: '边框流光', component: BorderBeamDemo },
	DisabledBox: { name: 'DisabledBox', title: '禁用遮罩', component: DisabledBoxDemo },
};

export default function App() {
	const [activeKey, setActiveKey] = useState<string>('CollapseBox');
	const [searchKeyword, setSearchKeyword] = useState<string>('');

	// 查找当前选中的组件元数据
	const currentComponentInfo = useMemo(() => {
		for (const cat of navCategories) {
			const found = cat.items.find((item) => item.key === activeKey);
			if (found) return found;
		}
		return null;
	}, [activeKey]);

	// 根据搜索关键词过滤侧边栏菜单
	const filteredCategories = useMemo(() => {
		if (!searchKeyword.trim()) return navCategories;
		const kw = searchKeyword.toLowerCase();
		return navCategories
			.map((cat) => ({
				...cat,
				items: cat.items.filter(
					(item) =>
						item.name.toLowerCase().includes(kw) ||
						item.title.toLowerCase().includes(kw) ||
						item.key.toLowerCase().includes(kw),
				),
			}))
			.filter((cat) => cat.items.length > 0);
	}, [searchKeyword]);

	return (
		<div
			style={{
				display: 'flex',
				height: '100vh',
				width: '100vw',
				overflow: 'hidden',
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
				color: '#262626',
				background: '#f8f9fa',
			}}
		>
			{/* 左侧侧边栏 Navigation Sidebar */}
			<aside
				style={{
					width: 280,
					minWidth: 280,
					height: '100%',
					background: '#ffffff',
					borderRight: '1px solid #f0f0f0',
					display: 'flex',
					flexDirection: 'column',
					boxSizing: 'border-box',
				}}
			>
				{/* 侧边栏 Header & Search */}
				<div style={{ padding: '20px 20px 16px 20px', borderBottom: '1px solid #f5f5f5' }}>
					<div
						style={{
							fontSize: 18,
							fontWeight: 600,
							color: '#1f1f1f',
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							marginBottom: 14,
						}}
					>
						<span
							style={{
								width: 10,
								height: 10,
								borderRadius: '50%',
								background: '#1677ff',
								display: 'inline-block',
							}}
						/>
						组件预览库
					</div>
					<input
						type="text"
						placeholder="搜索组件..."
						value={searchKeyword}
						onChange={(e) => setSearchKeyword(e.target.value)}
						style={{
							width: '100%',
							padding: '7px 12px',
							borderRadius: 6,
							border: '1px solid #d9d9d9',
							fontSize: 13,
							outline: 'none',
							boxSizing: 'border-box',
							transition: 'all 0.2s',
						}}
					/>
				</div>

				{/* 组件分类与菜单列表 */}
				<nav
					style={{
						flex: 1,
						overflowY: 'auto',
						padding: '16px 12px 24px 12px',
					}}
				>
					{/* 查看全部选项 */}
					<div
						onClick={() => setActiveKey('ALL')}
						style={{
							padding: '9px 12px',
							borderRadius: 6,
							fontSize: 14,
							cursor: 'pointer',
							marginBottom: 16,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							background: activeKey === 'ALL' ? '#e6f4ff' : 'transparent',
							color: activeKey === 'ALL' ? '#1677ff' : '#595959',
							fontWeight: activeKey === 'ALL' ? 600 : 400,
							transition: 'all 0.15s ease',
						}}
					>
						<span>全部组件概览</span>
						<span
							style={{
								fontSize: 11,
								padding: '2px 6px',
								borderRadius: 4,
								background: activeKey === 'ALL' ? '#bae0ff' : '#f5f5f5',
								color: activeKey === 'ALL' ? '#0958d9' : '#8c8c8c',
							}}
						>
							ALL
						</span>
					</div>

					{filteredCategories.map((group) => (
						<div key={group.category} style={{ marginBottom: 20 }}>
							<div
								style={{
									fontSize: 12,
									fontWeight: 500,
									color: '#8c8c8c',
									padding: '0 12px 6px 12px',
									borderBottom: '1px solid #f0f0f0',
									marginBottom: 8,
									letterSpacing: 0.5,
								}}
							>
								{group.category}
							</div>

							{group.items.map((item) => {
								const isActive = activeKey === item.key;
								return (
									<div
										key={item.key}
										onClick={() => setActiveKey(item.key)}
										style={{
											padding: '9px 12px',
											borderRadius: 6,
											fontSize: 14,
											cursor: 'pointer',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginBottom: 2,
											background: isActive ? '#e6f4ff' : 'transparent',
											color: isActive ? '#1677ff' : '#262626',
											fontWeight: isActive ? 600 : 400,
											transition: 'all 0.15s ease-in-out',
										}}
									>
										<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
											<span>{item.name}</span>
											<span style={{ fontSize: 13, color: isActive ? '#1677ff' : '#8c8c8c' }}>
												{item.title}
											</span>
										</div>

										{item.tag && (
											<span
												style={{
													fontSize: 11,
													padding: '1px 6px',
													borderRadius: 4,
													background: isActive ? '#bae0ff' : '#f6ffed',
													border: `1px solid ${isActive ? '#91caff' : '#b7eb8f'}`,
													color: isActive ? '#0958d9' : '#389e0d',
													fontFamily: 'monospace',
												}}
											>
												{item.tag}
											</span>
										)}
									</div>
								);
							})}
						</div>
					))}
				</nav>
			</aside>

			{/* 右侧主内容展示区域 Content Container */}
			<main
				style={{
					flex: 1,
					height: '100%',
					overflowY: 'auto',
					padding: '32px 48px',
					boxSizing: 'border-box',
					background: '#ffffff',
				}}
			>
				{/* 顶部 Header 说明 */}
				<header
					style={{
						marginBottom: 32,
						paddingBottom: 20,
						borderBottom: '1px solid #f0f0f0',
					}}
				>
					{activeKey === 'ALL' ? (
						<div>
							<h1 style={{ margin: '0 0 8px 0', fontSize: 26, color: '#1f1f1f' }}>
								全部组件演示 Overview
							</h1>
							<p style={{ margin: 0, color: '#666', fontSize: 14 }}>
								包含组件库中所有的 React 公共组件。点击左侧菜单可精准查看单组件 Demo。
							</p>
						</div>
					) : (
						currentComponentInfo && (
							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
									<h1 style={{ margin: 0, fontSize: 26, color: '#1f1f1f' }}>
										{currentComponentInfo.name}{' '}
										<span style={{ fontSize: 20, fontWeight: 400, color: '#595959' }}>
											{currentComponentInfo.title}
										</span>
									</h1>
									{currentComponentInfo.tag && (
										<span
											style={{
												fontSize: 12,
												padding: '2px 8px',
												borderRadius: 4,
												background: '#e6f4ff',
												color: '#1677ff',
												fontWeight: 500,
											}}
										>
											{currentComponentInfo.tag}
										</span>
									)}
								</div>
								<p style={{ margin: 0, color: '#666', fontSize: 14 }}>
									{currentComponentInfo.description}
								</p>
							</div>
						)
					)}
				</header>

				{/* 动态渲染选中组件的 Demo */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
					{activeKey === 'ALL' ? (
						Object.entries(demoComponentsMap).map(([key, info]) => {
							const TargetDemo = info.component;
							return (
								<section
									key={key}
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 24,
										padding: 24,
										borderRadius: 12,
										border: '1px solid #f0f0f0',
									}}
								>
									<h2
										style={{
											margin: 0,
											fontSize: 20,
											borderBottom: '1px solid #f0f0f0',
											paddingBottom: 12,
										}}
									>
										{info.name} {info.title}
									</h2>
									<TargetDemo />
								</section>
							);
						})
					) : (
						demoComponentsMap[activeKey] && (
							<section>
								{(() => {
									const TargetDemo = demoComponentsMap[activeKey].component;
									return <TargetDemo />;
								})()}
							</section>
						)
					)}
				</div>
			</main>
		</div>
	);
}
