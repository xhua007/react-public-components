import { useState } from 'react';
import CollapseBox from '../../CollapseBox';
import Splitter from '../../Splitter';

export default function App() {
	const [showIconMode, setShowIconMode] = useState<boolean | 'auto'>(true);
	const options = [
		{ label: 'true (常态显示)', value: true },
		{ label: 'false (不显示)', value: false },
		{ label: "'auto' (悬停显示)", value: 'auto' },
	];
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
					<Splitter.Panel defaultSize="40%" min="20%" collapsible>
						<h3>左侧面板</h3>
						<p>可拖动分隔条调整宽度，点击分隔条上的按钮可折叠。</p>
					</Splitter.Panel>
					<Splitter.Panel collapsible>
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
				<Splitter orientation="vertical" style={{ height: 360 }}>
					<Splitter.Panel defaultSize="30%" min="10%" collapsible>
						<h3>上方面板</h3>
						<p>可拖动分隔条调整高度。</p>
					</Splitter.Panel>
					<Splitter.Panel collapsible>
						<h3>下方面板</h3>
						<p>双击分隔条可重置为初始尺寸。</p>
					</Splitter.Panel>
				</Splitter>
			</section>

			<section>
				<h2>8. Splitter · 语义化结构样式（Semantic DOM style）</h2>
				<Splitter
					style={(info) => ({
						root: { border: '2px dashed #1677ff', borderRadius: 12 },
						panel: { background: '#f6ffed' },
						dragger: { background: info.props.vertical ? '#ffd591' : '#bae0ff' },
					})}
				>
					<Splitter.Panel defaultSize="40%" collapsible>
						<h3>左侧面板 (root/panel/dragger 语义化样式)</h3>
						<p>演示通过函数形式动态配置 root、panel、dragger 的行内 style。</p>
					</Splitter.Panel>
					<Splitter.Panel collapsible>
						<h3>右侧面板</h3>
						<p>具有自定义背景和分隔条样式。</p>
					</Splitter.Panel>
				</Splitter>
			</section>
		</div>
	);
}
