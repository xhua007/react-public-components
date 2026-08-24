import AnnouncementBar from '../../../AnnouncementBar';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function AnnouncementBarDemo() {
	const usageCode = `import { AnnouncementBar } from 'react-public-components';

export default function App() {
  return (
    <AnnouncementBar
      closable
      background="linear-gradient(90deg, #1677ff, #722ed1)"
      onClose={() => console.log('公告已关闭')}
    >
      <span>🚀 <b>全新发布：</b>欢迎体验 60+ 款高质感企业级 React 公共组件！</span>
    </AnnouncementBar>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '横幅内广播展示的文字或节点内容', type: 'ReactNode', required: true },
		{ name: 'closable', desc: '是否在右侧展示关闭按钮', type: 'boolean', default: 'true' },
		{ name: 'background', desc: '自定义横幅背景色或渐变色（CSS background）', type: 'string', default: '-' },
		{ name: 'onClose', desc: '点击右侧关闭按钮时的回调函数', type: '() => void', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 顶部吸顶广播通知横幅（渐变背景 + 可关闭记忆）
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					<AnnouncementBar>
						<span>
							🚀 <b>版本升级：</b> react-public-components 正式突破 100+ 款通用组件大关！
						</span>
					</AnnouncementBar>

					<AnnouncementBar background="linear-gradient(90deg, #fa8c16 0%, #eb2f96 100%)">
						<span>
							⚠️ <b>维护通知：</b> 今晚 24:00 进行核心数据库机房网络链路平滑升级。
						</span>
					</AnnouncementBar>
				</div>
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
