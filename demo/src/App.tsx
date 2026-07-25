import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import CollapseBox from '../../CollapseBox';
import Splitter from '../../Splitter';

export default function App() {
	return (
		<ConfigProvider locale={zhCN}>
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

				<section>
					<h2>6. Splitter · 垂直分屏</h2>
					<Splitter orientation="vertical" style={{ height: 360 }}>
						<Splitter.Panel defaultSize="30%" min="10%" collapsible>
							<h3>上方面板</h3>
							<p>可拖动分隔条调整高度。</p>
						</Splitter.Panel>
						<Splitter.Panel collapsible>
							<h3>下方面板</h3>
						</Splitter.Panel>
					</Splitter>
				</section>
			</div>
		</ConfigProvider>
	);
}
