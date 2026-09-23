import VideoPlayer from '../../../VideoPlayer';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function VideoPlayerDemo() {
	const usageCode = `import { VideoPlayer } from 'react-public-components';

export default function App() {
  return (
    <VideoPlayer
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      width="100%"
      height={360}
      autoPlay={false}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'src', desc: '视频文件播放地址 URL', type: 'string', required: true },
		{ name: 'poster', desc: '视频未播放时的封面图 URL', type: 'string', default: '-' },
		{
			name: 'width',
			desc: '播放器宽度（像素数字或百分比字符串）',
			type: 'number | string',
			default: '640',
		},
		{
			name: 'height',
			desc: '播放器高度（像素数字或百分比字符串）',
			type: 'number | string',
			default: '360',
		},
		{ name: 'autoPlay', desc: '是否在加载完成后自动播放', type: 'boolean', default: 'false' },
		{ name: 'loop', desc: '是否循环播放', type: 'boolean', default: 'false' },
		{ name: 'muted', desc: '是否默认静音', type: 'boolean', default: 'false' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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
