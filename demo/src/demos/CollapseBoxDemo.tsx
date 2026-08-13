import CollapseBox from '../../../CollapseBox';

export default function CollapseBoxDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. CollapseBox · 水平折叠（按钮在右，宽度 50%）
				</h3>
				<CollapseBox
					direction="horizontal"
					buttonPosition="right"
					defaultWidth="50%"
					defaultHeight={300}
				>
					<p>这里是水平折叠容器的内容。点击右侧按钮可收起/展开。</p>
					<p>支持宽度设置百分比（如 "50%"）或像素数字（如 500）。</p>
				</CollapseBox>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					2. CollapseBox · 水平折叠（按钮在左）
				</h3>
				<CollapseBox
					direction="horizontal"
					buttonPosition="left"
					defaultWidth={500}
					defaultHeight={300}
				>
					<p>这里是水平折叠容器的内容。点击左侧按钮可收起/展开。</p>
					<p>支持任意 ReactNode。</p>
				</CollapseBox>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					3. CollapseBox · 垂直折叠（按钮在下）
				</h3>
				<CollapseBox direction="vertical" buttonPosition="bottom" defaultHeight={240}>
					<p>这里是垂直折叠容器的内容。点击下方按钮可上下折叠。</p>
				</CollapseBox>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					4. CollapseBox · 垂直折叠（按钮在上）
				</h3>
				<CollapseBox direction="vertical" buttonPosition="top" defaultHeight={240}>
					<p>这里是垂直折叠容器的内容。点击上方按钮可上下折叠。</p>
				</CollapseBox>
			</div>
		</div>
	);
}
