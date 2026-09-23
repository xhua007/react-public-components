import AudioPlayer from '../../../AudioPlayer';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function AudioPlayerDemo() {
	const sampleAudio = 'https://www.w3schools.com/html/horse.mp3';

	const usageCode = `import { AudioPlayer } from 'react-public-components';

export default function App() {
  return (
    <AudioPlayer
      src="https://www.w3schools.com/html/horse.mp3"
      title="客服质检录音.mp3"
      defaultPlaybackRate={1.0}
      showDownload
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'src', desc: '音频播放地址 URL 或 Blob URL', type: 'string', required: true },
		{ name: 'title', desc: '音频标题或文件名说明', type: 'ReactNode', default: '-' },
		{
			name: 'defaultPlaybackRate',
			desc: '默认播放倍速（如 1.0, 1.25, 1.5, 2.0）',
			type: 'number',
			default: '1.0',
		},
		{ name: 'showDownload', desc: '是否展示一键下载音频按钮', type: 'boolean', default: 'true' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 客服录音回放 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 客服质检录音 / AI 对话播放条（支持 Seek 拖拽、倍速切换与一键下载）
				</h3>
				<div style={{ maxWidth: 460 }}>
					<AudioPlayer src={sampleAudio} title="质检录音-20260815-订单售后.mp3" />
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					点击左侧播放/暂停，点击右侧倍速按钮可循环切换 1.0x / 1.25x / 1.5x / 2.0x 播放倍速。
				</p>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 640 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
