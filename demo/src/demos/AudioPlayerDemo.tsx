import AudioPlayer from '../../../AudioPlayer';

export default function AudioPlayerDemo() {
	// 公共测试音频 URL
	const sampleAudio = 'https://www.w3schools.com/html/horse.mp3';

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 客服录音回放 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 客服质检录音 / AI 对话播放条（支持 Seek 拖拽、倍速切换与一键下载）
				</h3>
				<div style={{ maxWidth: 460 }}>
					<AudioPlayer
						src={sampleAudio}
						title="质检录音-20260815-订单售后.mp3"
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					点击左侧播放/暂停，点击右侧倍速按钮可循环切换 1.0x / 1.25x / 1.5x / 2.0x 播放倍速。
				</p>
			</div>
		</div>
	);
}
