import { useState } from 'react';
import Splitter from '../../../Splitter';

export default function SplitterDemo() {
	const [showIconMode, setShowIconMode] = useState<boolean | 'auto'>(true);

	const options = [
		{ label: 'true (常态显示)', value: true },
		{ label: 'false (不显示)', value: false },
		{ label: "'auto' (悬停显示)", value: 'auto' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					5. Splitter · 水平分屏（可折叠）
				</h3>
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
			</div>

			<div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
					<span style={{ fontWeight: 500 }}>ShowCollapsibleIcon: </span>
					{options.map((option) => (
						<label
							key={String(option.value)}
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 6,
								cursor: 'pointer',
							}}
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
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					6. Splitter · 三面板水平分屏（全面板可折叠）
				</h3>
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
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>7. Splitter · 垂直分屏</h3>
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
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					8. Splitter · 语义化结构样式与类名（styles & classNames）
				</h3>
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
			</div>
		</div>
	);
}
