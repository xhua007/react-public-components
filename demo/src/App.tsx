import { useState } from 'react';
import CollapseBox from '../../CollapseBox';
import Splitter from '../../Splitter';
import DisabledBox from '../../DisabledBox';
import Masonry from '../../Masonry';
import BorderBeam, { BorderBeamColorStop } from '../../BorderBeam';
import ColorPicker, { Color } from '../../ColorPicker';
import { DownOutlined } from '../../src/icons';

const gradientPresets: Record<
	string,
	{ name: string; tag: string; description: string; stops: BorderBeamColorStop[] }
> = {
	Ocean: {
		name: 'Ocean',
		tag: 'Dashboard',
		description: 'A calm blue-green accent that works well for data views and cloud tooling.',
		stops: [
			{ color: '#1677ff', percent: 0 },
			{ color: '#36cfc9', percent: 52 },
			{ color: '#95de64', percent: 100 },
		],
	},
	Sunset: {
		name: 'Sunset',
		tag: 'Marketing',
		description: 'A warm crimson-to-gold gradient for prominent hero cards and callouts.',
		stops: [
			{ color: '#ff4d4f', percent: 0 },
			{ color: '#ff7a45', percent: 45 },
			{ color: '#ffc53d', percent: 100 },
		],
	},
	Aurora: {
		name: 'Aurora',
		tag: 'Creative',
		description: 'Vibrant purple-emerald tones for modern dark UI accents and highlights.',
		stops: [
			{ color: '#722ed1', percent: 0 },
			{ color: '#13c2c2', percent: 50 },
			{ color: '#52c41a', percent: 100 },
		],
	},
	Forest: {
		name: 'Forest',
		tag: 'Nature',
		description: 'Refreshing green shades suited for environmental analytics and success states.',
		stops: [
			{ color: '#389e0d', percent: 0 },
			{ color: '#7cb305', percent: 50 },
			{ color: '#d3f261', percent: 100 },
		],
	},
	Ember: {
		name: 'Ember',
		tag: 'Energy',
		description: 'Fiery red-orange glow designed for urgent notifications and alert cards.',
		stops: [
			{ color: '#cf1322', percent: 0 },
			{ color: '#fa541c', percent: 50 },
			{ color: '#fa8c16', percent: 100 },
		],
	},
	Nebula: {
		name: 'Nebula',
		tag: 'Cosmic',
		description: 'Deep magenta-blue gradient providing a futuristic cosmic visual layer.',
		stops: [
			{ color: '#eb2f96', percent: 0 },
			{ color: '#722ed1', percent: 50 },
			{ color: '#2f54eb', percent: 100 },
		],
	},
};

export default function App() {
	const [showIconMode, setShowIconMode] = useState<boolean | 'auto'>(true);
	const [selectedPresetKey, setSelectedPresetKey] = useState<string>('Ocean');
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [controlledColor1, setControlledColor1] = useState<Color | string>('#1677ff');
	const [controlledColor2, setControlledColor2] = useState<Color | string>('#1677ff');

	const options = [
		{ label: 'true (常态显示)', value: true },
		{ label: 'false (不显示)', value: false },
		{ label: "'auto' (悬停显示)", value: 'auto' },
	];

	const activePreset = gradientPresets[selectedPresetKey];

	return (
		<div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>
			<h1>组件预览</h1>

			<section>
				<h2>1. CollapseBox · 水平折叠（按钮在右，宽度 50%）</h2>
				<CollapseBox
					direction="horizontal"
					buttonPosition="right"
					defaultWidth="50%"
					defaultHeight={300}
				>
					<p>这里是水平折叠容器的内容。点击右侧按钮可收起/展开。</p>
					<p>支持宽度设置百分比（如 "50%"）或像素数字（如 500）。</p>
				</CollapseBox>
			</section>
			<section>
				<h2>2. CollapseBox · 水平折叠（按钮在左）</h2>
				<CollapseBox
					direction="horizontal"
					buttonPosition="left"
					defaultWidth={500}
					defaultHeight={300}
				>
					<p>这里是水平折叠容器的内容。点击左侧按钮可收起/展开。</p>
					<p>支持任意 ReactNode。</p>
				</CollapseBox>
			</section>

			<section>
				<h2>3. CollapseBox · 垂直折叠（按钮在下）</h2>
				<CollapseBox direction="vertical" buttonPosition="bottom" defaultHeight={240}>
					<p>这里是垂直折叠容器的内容。点击下方按钮可上下折叠。</p>
				</CollapseBox>
			</section>
			<section>
				<h2> 4. CollapseBox · 垂直折叠（按钮在上）</h2>
				<CollapseBox direction="vertical" buttonPosition="top" defaultHeight={240}>
					<p>这里是垂直折叠容器的内容。点击上方按钮可上下折叠。</p>
				</CollapseBox>
			</section>

			<section>
				<h2>5. Splitter · 水平分屏（可折叠）</h2>
				<Splitter style={{ height: 360 }}>
					<Splitter.Panel defaultSize="40%" min="20%">
						<h3>左侧面板</h3>
						<p>可拖动分隔条调整宽度，点击分隔条上的按钮可折叠。</p>
					</Splitter.Panel>
					<Splitter.Panel>
						<h3>右侧面板</h3>
						<p>双击分隔条可重置为初始尺寸。</p>
					</Splitter.Panel>
				</Splitter>
			</section>

			<div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
				<span style={{ fontWeight: 500 }}>ShowCollapsibleIcon: </span>
				{options.map((option) => (
					<label
						key={String(option.value)}
						style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
					>
						<input
							type="radio"
							name="showCollapsibleIcon"
							value={String(option.value)}
							checked={showIconMode === option.value}
							onChange={() => setShowIconMode(option.value)}
						/>
						<span>{option.label}</span>
					</label>
				))}
			</div>
			<section>
				<h2>6. Splitter · 三面板水平分屏（全面板可折叠）</h2>
				<Splitter
					style={{ height: 360 }}
					onCollapse={(collapsed, sizes) => {
						console.log('onCollapse collapsed status:', collapsed, 'sizes:', sizes);
					}}
					onDraggerDoubleClick={(index) => {
						console.log('onDraggerDoubleClick dragger index:', index);
					}}
				>
					<Splitter.Panel
						collapsible={{ start: true, end: true, showCollapsibleIcon: showIconMode }}
					>
						<h3>左侧面板</h3>
						<p>可拖动分隔条调整宽度，点击分隔条上的按钮可折叠。</p>
					</Splitter.Panel>
					<Splitter.Panel
						collapsible={{ start: true, end: true, showCollapsibleIcon: showIconMode }}
					>
						<h3>中侧面板</h3>
						<p>双击分隔条可重置为初始尺寸。</p>
					</Splitter.Panel>
					<Splitter.Panel
						collapsible={{ start: true, end: true, showCollapsibleIcon: showIconMode }}
					>
						<h3>右侧面板</h3>
						<p>双击分隔条可重置为初始尺寸。</p>
					</Splitter.Panel>
				</Splitter>
			</section>

			<section>
				<h2>7. Splitter · 垂直分屏</h2>
				<Splitter orientation="vertical" style={{ height: 400 }}>
					<Splitter.Panel defaultSize="30%" min="10%" collapsible>
						<h3>上方面板</h3>
						<p>可拖动分隔条调整高度。</p>
					</Splitter.Panel>
					<Splitter.Panel collapsible>
						<h3>中间面板</h3>
						<p>可拖动分隔条调整高度。</p>
					</Splitter.Panel>
					<Splitter.Panel collapsible>
						<h3>下方面板</h3>
						<p>双击分隔条可重置为初始尺寸。</p>
					</Splitter.Panel>
				</Splitter>
			</section>

			<section>
				<h2>8. Splitter · 语义化结构样式与类名（styles & classNames）</h2>
				<Splitter
					styles={(info) => ({
						root: { border: '2px dashed #1677ff', borderRadius: 12, height: 250 },
						panel: { background: '#f6ffed' },
						dragger: { background: info.props.vertical ? '#ffd591' : '#bae0ff' },
					})}
				>
					<Splitter.Panel defaultSize="40%" collapsible style={{ color: '#1677ff' }}>
						<h3>左侧面板 (root/panel/dragger 语义化样式)</h3>
						<p>演示通过函数形式动态配置 root、panel、dragger 的 styles。</p>
					</Splitter.Panel>
					<Splitter.Panel collapsible>
						<h3>右侧面板</h3>
						<p>具有自定义背景和分隔条样式。</p>
					</Splitter.Panel>
				</Splitter>
			</section>
			<section>
				<h2>9. DisabledBox</h2>
				<DisabledBox disabled={true}>
					<p style={{ margin: 0, padding: 0 }}>这里是受保护的内容。</p>
				</DisabledBox>
			</section>
			<section>
				<h2>10. Masonry 瀑布流组件 (AntD V6 规范)</h2>
				<p>
					支持响应式 columns ({`{ xs: 1, sm: 2, md: 3, lg: 4 }`})、gutter 水平垂直间距、fresh
					尺寸更新以及 onLayoutChange 回调。
				</p>
				<Masonry
					columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
					gutter={[16, 16]}
					fresh={true}
					onLayoutChange={(layout) => console.log('Masonry 布局排列改变:', layout)}
					styles={{
						root: { background: '#f5f5f5', padding: 16, borderRadius: 12 },
						item: { transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)' },
					}}
					items={[
						{
							key: '1',
							height: 120,
							children: (
								<div
									style={{
										background: '#ffe7ba',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 1 (高度 120px)
								</div>
							),
						},
						{
							key: '2',
							height: 200,
							children: (
								<div
									style={{
										background: '#ffd591',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 2 (高度 200px)
								</div>
							),
						},
						{
							key: '3',
							height: 150,
							children: (
								<div
									style={{
										background: '#ffbb96',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 3 (高度 150px)
								</div>
							),
						},
						{
							key: '4',
							height: 240,
							children: (
								<div
									style={{
										background: '#b7eb8f',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 4 (高度 240px)
								</div>
							),
						},
						{
							key: '5',
							height: 100,
							children: (
								<div
									style={{
										background: '#91caff',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 5 (高度 100px)
								</div>
							),
						},
						{
							key: '6',
							height: 180,
							children: (
								<div
									style={{
										background: '#adc6ff',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 6 (高度 180px)
								</div>
							),
						},
						{
							key: '7',
							height: 130,
							children: (
								<div
									style={{
										background: '#d3ade6',
										padding: 16,
										borderRadius: 8,
										height: '100%',
										boxSizing: 'border-box',
									}}
								>
									卡片 7 (高度 130px)
								</div>
							),
						},
					]}
				/>
			</section>

			<section>
				<h2>11. BorderBeam 边框流光组件</h2>

				{/* 11.1 基础用法 & 鼠标悬浮时显示 */}
				<div style={{ marginBottom: 32 }}>
					<h3>基础用法 & 鼠标悬浮时显示</h3>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16 }}>
						<div>
							<BorderBeam size={100} duration={6}>
								<div
									style={{
										background: '#fff',
										border: '1px solid #f0f0f0',
										borderRadius: 12,
										padding: 24,
										boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
									}}
								>
									<h4 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Workspace overview</h4>
									<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
										Review task status, deployment health, and recent automation activity in one
										panel.
									</p>
								</div>
							</BorderBeam>
							<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
								基础用法。使用 BorderBeam 修饰任意容器即可为边框添加持续流动的装饰性高亮效果。
							</p>
						</div>

						<div>
							<div
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								style={{
									position: 'relative',
									background: '#fff',
									border: '1px solid #f0f0f0',
									borderRadius: 12,
									padding: 24,
									boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
									cursor: 'pointer',
								}}
							>
								<BorderBeam
									size={100}
									duration={6}
									style={{
										opacity: isHovered ? 1 : 0,
										transition: 'opacity 0.3s ease',
									}}
								/>
								<h4 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Hover over the card</h4>
								<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
									The border beam appears when the pointer moves over this card.
								</p>
							</div>
							<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
								鼠标悬浮时显示。默认隐藏边框流光，在鼠标 hover 到容器上时显示。
							</p>
						</div>
					</div>
				</div>

				{/* 11.2 多条流光 & 自定义容器 */}
				<div style={{ marginBottom: 32 }}>
					<h3>多条流光 (count) & 自定义宿主容器</h3>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16 }}>
						<div>
							<BorderBeam count={2} size={100} duration={6}>
								<div
									style={{
										background: '#fff',
										border: '1px solid #f0f0f0',
										borderRadius: 12,
										padding: 24,
										boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
									}}
								>
									<h4 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Multiple beams (count=2)</h4>
									<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
										Set count to distribute multiple beams evenly around the container border.
									</p>
								</div>
							</BorderBeam>
							<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
								多条流光。通过 count 设置流光数量，多条流光会均匀分布在容器边框上。
							</p>
						</div>

						<div>
							<div
								style={{
									position: 'relative',
									background: '#fff',
									border: '1px solid #f0f0f0',
									borderRadius: 12,
									padding: 24,
									boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
								}}
							>
								<BorderBeam size={120} duration={6} color="#1677ff" />
								<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
									Review task status, deployment health, and recent automation activity in one
									custom container.
								</p>
							</div>
							<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
								自定义容器。由于流光层可以通过 position: absolute 贴合容器边缘，宿主元素设置
								position: relative 即可。
							</p>
						</div>
					</div>
				</div>

				{/* 11.3 动画时长 (duration) */}
				<div style={{ marginBottom: 32 }}>
					<h3>动画时长 (duration)</h3>
					<div
						style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 16 }}
					>
						<div>
							<BorderBeam duration={3} size={100}>
								<div
									style={{
										background: '#fff',
										border: '1px solid #f0f0f0',
										borderRadius: 12,
										padding: 24,
										boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginBottom: 12,
										}}
									>
										<h4 style={{ margin: 0, fontSize: 18 }}>Fast</h4>
										<span
											style={{
												background: '#f5f5f5',
												padding: '2px 8px',
												borderRadius: 4,
												fontSize: 12,
												color: '#595959',
											}}
										>
											3s
										</span>
									</div>
									<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
										A quick loop for temporary highlights and active modules.
									</p>
								</div>
							</BorderBeam>
						</div>

						<div>
							<BorderBeam duration={6} size={100}>
								<div
									style={{
										background: '#fff',
										border: '1px solid #f0f0f0',
										borderRadius: 12,
										padding: 24,
										boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginBottom: 12,
										}}
									>
										<h4 style={{ margin: 0, fontSize: 18 }}>Default</h4>
										<span
											style={{
												background: '#f5f5f5',
												padding: '2px 8px',
												borderRadius: 4,
												fontSize: 12,
												color: '#595959',
											}}
										>
											6s
										</span>
									</div>
									<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
										The original pacing for most emphasized containers.
									</p>
								</div>
							</BorderBeam>
						</div>

						<div>
							<BorderBeam duration={12} size={100}>
								<div
									style={{
										background: '#fff',
										border: '1px solid #f0f0f0',
										borderRadius: 12,
										padding: 24,
										boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginBottom: 12,
										}}
									>
										<h4 style={{ margin: 0, fontSize: 18 }}>Slow</h4>
										<span
											style={{
												background: '#f5f5f5',
												padding: '2px 8px',
												borderRadius: 4,
												fontSize: 12,
												color: '#595959',
											}}
										>
											12s
										</span>
									</div>
									<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
										A calmer loop for persistent panels and ambient surfaces.
									</p>
								</div>
							</BorderBeam>
						</div>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						通过 duration 控制流光完成一圈所需时间，单位为秒，默认值为 6 秒。
					</p>
				</div>

				{/* 11.4 尺寸 (size) */}
				<div style={{ marginBottom: 32 }}>
					<h3>尺寸 (size)</h3>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16 }}>
						<div>
							<BorderBeam size={100}>
								<div
									style={{
										background: '#fff',
										border: '1px solid #f0f0f0',
										borderRadius: 12,
										padding: 24,
										boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginBottom: 12,
										}}
									>
										<h4 style={{ margin: 0, fontSize: 18 }}>Default</h4>
										<span
											style={{
												background: '#f5f5f5',
												padding: '2px 8px',
												borderRadius: 4,
												fontSize: 12,
												color: '#595959',
											}}
										>
											100px
										</span>
									</div>
									<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
										Uses the default 100px visible beam segment.
									</p>
								</div>
							</BorderBeam>
						</div>

						<div>
							<BorderBeam size={56}>
								<div
									style={{
										background: '#fff',
										border: '1px solid #f0f0f0',
										borderRadius: 12,
										padding: 24,
										boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginBottom: 12,
										}}
									>
										<h4 style={{ margin: 0, fontSize: 18 }}>Compact</h4>
										<span
											style={{
												background: '#f5f5f5',
												padding: '2px 8px',
												borderRadius: 4,
												fontSize: 12,
												color: '#595959',
											}}
										>
											56px
										</span>
									</div>
									<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
										Keeps the highlight shorter for dense card groups.
									</p>
								</div>
							</BorderBeam>
						</div>
					</div>

					<div style={{ marginTop: 24 }}>
						<BorderBeam size={160}>
							<div
								style={{
									background: '#fff',
									border: '1px solid #f0f0f0',
									borderRadius: 12,
									padding: 24,
									boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginBottom: 12,
									}}
								>
									<h4 style={{ margin: 0, fontSize: 18 }}>Extended</h4>
									<span
										style={{
											background: '#f5f5f5',
											padding: '2px 8px',
											borderRadius: 4,
											fontSize: 12,
											color: '#595959',
										}}
									>
										160px
									</span>
								</div>
								<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
									Creates a longer highlight for wider feature panels.
								</p>
							</div>
						</BorderBeam>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						通过 size 控制流光可见段的尺寸，默认值为 100px，数字类型按像素处理。
					</p>
				</div>

				{/* 11.5 线宽 (lineWidth) */}
				<div style={{ marginBottom: 32 }}>
					<h3>线宽 (lineWidth)</h3>
					<div style={{ marginTop: 16 }}>
						<BorderBeam lineWidth={2} size={140}>
							<div
								style={{
									background: '#fff',
									border: '1px solid #f0f0f0',
									borderRadius: 12,
									padding: 24,
									boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
								}}
							>
								<h4 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Custom line width</h4>
								<p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
									Set lineWidth to match the border width of this container.
								</p>
							</div>
						</BorderBeam>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						通过 lineWidth 调整单个 BorderBeam 的流光线宽，默认值为 1px，数字类型按像素处理。
					</p>
				</div>

				{/* 11.6 渐变色停靠点配置 */}
				<div>
					<h3>渐变色 (color) 预设切换</h3>
					<div
						style={{
							display: 'flex',
							gap: 8,
							marginBottom: 16,
							background: '#f5f5f5',
							padding: 4,
							borderRadius: 8,
							width: 'fit-content',
						}}
					>
						{Object.keys(gradientPresets).map((presetKey) => {
							const active = selectedPresetKey === presetKey;
							return (
								<button
									key={presetKey}
									onClick={() => setSelectedPresetKey(presetKey)}
									style={{
										padding: '6px 16px',
										border: 'none',
										borderRadius: 6,
										background: active ? '#fff' : 'transparent',
										color: active ? '#1677ff' : '#595959',
										fontWeight: active ? 600 : 400,
										boxShadow: active ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
										cursor: 'pointer',
										transition: 'all 0.2s ease',
									}}
								>
									{presetKey}
								</button>
							);
						})}
					</div>

					<BorderBeam color={activePreset.stops} size={150} duration={6}>
						<div
							style={{
								background: '#fff',
								border: '1px solid #f0f0f0',
								borderRadius: 12,
								padding: 24,
								boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: 12,
								}}
							>
								<h4 style={{ margin: 0, fontSize: 18 }}>{activePreset.name}</h4>
								<span
									style={{
										background: '#f5f5f5',
										padding: '2px 8px',
										borderRadius: 4,
										fontSize: 12,
										color: '#595959',
									}}
								>
									{activePreset.tag}
								</span>
							</div>

							<p style={{ margin: '0 0 16px 0', color: '#666', lineHeight: 1.6 }}>
								{activePreset.description}
							</p>

							<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
								{activePreset.stops.map((stop, index) => (
									<span
										key={index}
										style={{
											background: '#f0f5ff',
											border: '1px solid #adc6ff',
											color: '#1d39c4',
											padding: '2px 8px',
											borderRadius: 4,
											fontSize: 13,
											fontFamily: 'monospace',
										}}
									>
										{stop.color} · {stop.percent}%
									</span>
								))}
							</div>

							<p style={{ margin: 0, color: '#8c8c8c', fontSize: 12 }}>
								Stop positions use the public 0-100 input range.
							</p>
						</div>
					</BorderBeam>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						展示 6 组渐变流光配色，可切换查看不同效果。
					</p>
				</div>
			</section>

			<section>
				<h2>12. ColorPicker 颜色选择器</h2>

				{/* 12.1 基础用法 & 尺寸 */}
				<div style={{ marginBottom: 32 }}>
					<h3>基础用法 & 触发器尺寸 (size="small" | "middle" | "large")</h3>
					<div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 16 }}>
						<ColorPicker size="small" defaultValue="#1677ff" showText />
						<ColorPicker size="middle" defaultValue="#52c41a" showText allowClear />
						<ColorPicker size="large" defaultValue="#722ed1" showText />
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						支持设置三种尺寸、显示颜色文本与清除颜色。
					</p>
				</div>

				{/* 12.2 渲染触发器文本 */}
				<div style={{ marginBottom: 32 }}>
					<h3>渲染触发器文本 (showText)</h3>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
						<div>
							<ColorPicker defaultValue="#1677ff" showText />
						</div>
						<div>
							<ColorPicker
								defaultValue="#395c8c"
								showText={(color) =>
									`Custom Text (${Array.isArray(color) ? 'Gradient' : color.toHexString()})`
								}
							/>
						</div>
						<div>
							<ColorPicker
								defaultValue="#1677ff"
								showText={() => <DownOutlined style={{ fontSize: 10, color: '#bfbfbf' }} />}
							/>
						</div>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						渲染触发器的默认文本，showText 为 true 时生效。自定义文本时，可以使用 showText
						为函数的方式，返回自定义的文本。
					</p>
				</div>

				{/* 12.3 禁用透明度 (disabledAlpha) */}
				<div style={{ marginBottom: 32 }}>
					<h3>禁用透明度 (disabledAlpha)</h3>
					<div style={{ marginTop: 16 }}>
						<ColorPicker disabledAlpha defaultValue="#234671" />
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>禁用颜色透明度。</p>
				</div>

				{/* 12.4 自定义触发器 */}
				<div style={{ marginBottom: 32 }}>
					<h3>自定义触发器</h3>
					<div style={{ marginTop: 16 }}>
						<ColorPicker defaultValue="#1677ff">
							{(color) => (
								<button
									style={{
										background: color.toCssString(),
										color: '#fff',
										border: 'none',
										padding: '6px 16px',
										borderRadius: 6,
										fontSize: 14,
										cursor: 'pointer',
										transition: 'background-color 0.2s',
									}}
								>
									open
								</button>
							)}
						</ColorPicker>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						自定义颜色面板的触发器，按钮背景颜色跟随选中的颜色实时变化。
					</p>
				</div>

				{/* 12.5 颜色编码 */}
				<div style={{ marginBottom: 32 }}>
					<h3>颜色编码</h3>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
						<div>
							<ColorPicker
								format="hex"
								defaultValue="#1677ff"
								showText={(color) =>
									`HEX: ${Array.isArray(color) ? 'Gradient' : color.toHexString()}`
								}
							/>
						</div>
						<div>
							<ColorPicker
								format="hsb"
								defaultValue="#1677ff"
								showText={(color) =>
									`HSB: ${Array.isArray(color) ? 'Gradient' : color.toHsbString()}`
								}
							/>
						</div>
						<div>
							<ColorPicker
								format="rgb"
								defaultValue="#1677ff"
								showText={(color) =>
									`RGB: ${Array.isArray(color) ? 'Gradient' : color.toRgbString()}`
								}
							/>
						</div>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						编码格式，支持 HEX、HSB、RGB。
					</p>
				</div>

				{/* 12.3 预设颜色 */}
				<div style={{ marginBottom: 32 }}>
					<h3>预设颜色 (presets)</h3>
					<div style={{ marginTop: 16 }}>
						<ColorPicker
							defaultValue="#1677ff"
							showText
							presets={[
								{
									label: '推荐颜色',
									colors: ['#1677ff', '#52c41a', '#fa8c16', '#f5222d', '#722ed1', '#13c2c2'],
								},
								{
									label: '黑白灰',
									colors: ['#000000', '#262626', '#595959', '#8c8c8c', '#bfbfbf', '#ffffff'],
								},
							]}
						/>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						支持配置预设颜色组，方便用户快速点选。
					</p>
				</div>

				{/* 12.4 渐变色 (mode="gradient" 与 mode={['single', 'gradient']}) */}
				<div style={{ marginBottom: 32 }}>
					<h3>渐变色 (mode="gradient" & mode={['single', 'gradient']})</h3>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
						<div>
							<ColorPicker
								mode="gradient"
								defaultValue="rgb(16,142,233) 0%, rgb(135,208,104) 100%"
								showText
							/>
							<p style={{ color: '#8c8c8c', fontSize: 12, marginTop: 4 }}>
								固定渐变色模式 (mode="gradient")
							</p>
						</div>

						<div>
							<ColorPicker
								mode={['single', 'gradient']}
								defaultValue="rgb(16,142,233) 0%, rgb(135,208,104) 100%"
								showText
							/>
							<p style={{ color: '#8c8c8c', fontSize: 12, marginTop: 4 }}>
								单色/渐变自由切换 (mode={['single', 'gradient']})
							</p>
						</div>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						通过 mode 设置颜色为单一颜色还是渐变色，支持拖拽渐变停靠点与独立设置颜色。
					</p>
				</div>

				{/* 12.6 自定义面板 (panelRender) */}
				<div style={{ marginBottom: 32 }}>
					<h3>自定义面板 (panelRender)</h3>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
							<span style={{ fontSize: 14 }}>Add title:</span>
							<ColorPicker
								defaultValue="#1677ff"
								panelRender={(panel) => (
									<div>
										<div
											style={{
												padding: '4px 0 8px 0',
												fontWeight: 600,
												borderBottom: '1px solid #f0f0f0',
												marginBottom: 8,
												fontSize: 13,
											}}
										>
											Color Picker
										</div>
										{panel}
									</div>
								)}
							/>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
							<span style={{ fontSize: 14 }}>Horizontal layout:</span>
							<ColorPicker
								defaultValue="#2E62AB"
								presets={[
									{
										label: 'primary',
										colors: [
											'#e6f4ff',
											'#bae0ff',
											'#91caff',
											'#69b1ff',
											'#4096ff',
											'#1677ff',
											'#0958d9',
											'#003eb3',
											'#002c8c',
										],
									},
									{
										label: 'red',
										colors: [
											'#fff1f0',
											'#ffccc7',
											'#ffa39e',
											'#ff7875',
											'#ff4d4f',
											'#f5222d',
											'#cf1322',
											'#a8071a',
											'#820014',
										],
									},
									{
										label: 'green',
										colors: [
											'#f6ffed',
											'#d9f7be',
											'#b7eb8f',
											'#95de64',
											'#73d13d',
											'#52c41a',
											'#389e0d',
											'#237804',
											'#135200',
										],
									},
									{
										label: 'cyan',
										colors: [
											'#e6fffb',
											'#b5f5ec',
											'#87e8de',
											'#5cdbd3',
											'#36cfc9',
											'#13c2c2',
											'#08979c',
											'#006d75',
											'#00474f',
										],
									},
								]}
								panelRender={(_, { components: { Picker, Presets } }) => (
									<div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
										<div>{Presets()}</div>
										<div style={{ borderLeft: '1px solid #f0f0f0', paddingLeft: 16 }}>
											{Picker()}
										</div>
									</div>
								)}
							/>
						</div>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						通过 panelRender 自由控制面板的渲染。
					</p>
				</div>

				{/* 12.7 禁用 (disabled) */}
				<div style={{ marginBottom: 32 }}>
					<h3>禁用 (disabled)</h3>
					<div style={{ marginTop: 16 }}>
						<ColorPicker disabled defaultValue="#1677ff" showText />
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>设置为禁用状态。</p>
				</div>

				{/* 12.8 受控模式 (onChange vs onChangeComplete) */}
				<div style={{ marginBottom: 32 }}>
					<h3>受控模式</h3>
					<div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
						<ColorPicker value={controlledColor1} onChange={(c) => setControlledColor1(c)} />
						<ColorPicker
							value={controlledColor2}
							onChangeComplete={(c) => setControlledColor2(c)}
						/>
					</div>
					<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
						受控模式。通过 value 和 onChange 设置组件为受控模式，如果通过 onChangeComplete
						受控则会锁定展示颜色。
					</p>
				</div>
			</section>
		</div>
	);
}
