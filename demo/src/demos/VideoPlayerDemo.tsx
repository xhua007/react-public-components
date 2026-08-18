import VideoPlayer from '../../../VideoPlayer';

export default function VideoPlayerDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 轻量现代化视频播放器（暗黑毛玻璃控制条 + 快进快退 10s + 0.75x~2.0x 倍速 + 画中画）
				</h3>
				<div style={{ maxWidth: 640 }}>
					<VideoPlayer
						src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
						width="100%"
						height={360}
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					鼠标移动到视频上激活悬浮控制条，支持键盘与按钮快捷拖拽 Seek。
				</p>
			</div>
		</div>
	);
}
