import AnnouncementBar from '../../../AnnouncementBar';

export default function AnnouncementBarDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 顶部吸顶广播通知横幅（渐变背景 + 可关闭记忆）
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					<AnnouncementBar>
						<span>🚀 <b>版本升级：</b> react-public-components 正式突破 100+ 款通用组件大关！</span>
					</AnnouncementBar>

					<AnnouncementBar background="linear-gradient(90deg, #fa8c16 0%, #eb2f96 100%)">
						<span>⚠️ <b>维护通知：</b> 今晚 24:00 进行核心数据库机房网络链路平滑升级。</span>
					</AnnouncementBar>
				</div>
			</div>
		</div>
	);
}
