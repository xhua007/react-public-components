import { useState } from 'react';
import AnnouncementBar, { AnnouncementType } from '../../../AnnouncementBar';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function AnnouncementBarDemo() {
	const [resetKey, setResetKey] = useState<number>(0);

	const usageCode = `import { AnnouncementBar } from 'react-public-components';

export default function App() {
  return (
    <AnnouncementBar
      sticky
      type="warning"
      storageKey="promo_2026"
      closable
      onClose={() => console.log('公告已关闭')}
    >
      <span>⚠️ <b>维护通知：</b> 今晚 24:00 进行核心数据库机房网络链路平滑升级。</span>
    </AnnouncementBar>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '横幅内广播展示的文字或节点内容', type: 'ReactNode', required: true },
		{
			name: 'sticky',
			desc: '是否开启智能吸顶 (position: sticky)',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'fixed',
			desc: '是否开启全屏固定吸顶 (position: fixed)',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'type',
			desc: "预设主题色系：'primary' | 'warning' | 'success' | 'danger' | 'purple'",
			type: 'AnnouncementType',
			default: "'primary'",
		},
		{
			name: 'background',
			desc: '自定义横幅背景色或渐变色（传值时覆盖 type）',
			type: 'string',
			default: '-',
		},
		{ name: 'color', desc: '自定义文字颜色', type: 'string', default: "'#ffffff'" },
		{
			name: 'top',
			desc: '吸顶时距离顶部的距离偏移（像素或 CSS 字符串）',
			type: 'number | string',
			default: '0',
		},
		{ name: 'zIndex', desc: '图层层级 z-index', type: 'number', default: '1000' },
		{ name: 'closable', desc: '是否在右侧展示关闭按钮', type: 'boolean', default: 'true' },
		{ name: 'closeIcon', desc: '自定义关闭图标节点', type: 'ReactNode', default: '-' },
		{
			name: 'storageKey',
			desc: 'LocalStorage 记忆 Key（若传入则关闭后自动持久化记忆，不再重复弹出）',
			type: 'string',
			default: '-',
		},
		{
			name: 'marquee',
			desc: '内容过长时是否开启跑马灯无缝平滑横向滚动',
			type: 'boolean',
			default: 'false',
		},
		{ name: 'onClose', desc: '点击右侧关闭按钮时的回调函数', type: '() => void', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }} key={resetKey}>
			{/* 1. 局部滚动容器中的智能吸顶演示 */}
			<div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 12,
					}}
				>
					<h3 style={{ fontSize: 16, margin: 0 }}>
						1. 智能吸顶横幅演练 (Sticky Header + 滚动长内容)
					</h3>
					<button
						onClick={() => {
							try {
								localStorage.removeItem('rpc_announcement_demo_notice');
							} catch {}
							setResetKey((k) => k + 1);
						}}
						style={{
							fontSize: 12,
							padding: '4px 12px',
							borderRadius: 4,
							border: '1px solid #d9d9d9',
							background: '#fff',
							cursor: 'pointer',
						}}
					>
						重置所有横幅显示
					</button>
				</div>
				<p style={{ color: '#595959', fontSize: 14, marginBottom: 16 }}>
					向下滚动下方卡片内部的长列表，横幅会自动<strong>牢牢吸附锁定在容器最顶部</strong>
					（支持平滑关闭与 storageKey 状态记忆）。
				</p>

				<div
					style={{
						height: 280,
						overflowY: 'auto',
						border: '1px solid #e8e8e8',
						borderRadius: 8,
						background: '#fafafa',
						position: 'relative',
						maxWidth: 720,
					}}
				>
					{/* 真正开启 sticky 吸顶的横幅 */}
					<AnnouncementBar sticky type="warning" storageKey="demo_notice">
						<span>
							⚠️ <b>维护通知：</b> 今晚 24:00 进行核心数据库机房网络链路平滑升级。
						</span>
					</AnnouncementBar>

					<div style={{ padding: '20px 24px', lineHeight: 2, color: '#595959' }}>
						<p style={{ fontWeight: 600, color: '#1f1f1f' }}>👇 向下滚动此区域体验吸顶锁定效果：</p>
						<p>1. 广播通知横幅组件适用于全站大促公告、系统停机维护通知、新版本发布引导等。</p>
						<p>
							2. 支持传入 <code>sticky</code> 属性实现智能吸顶锁定，传入 <code>storageKey</code>{' '}
							实现用户点击关闭后持久化隐藏。
						</p>
						<p>3. 列表长内容第 1 段：企业级现代组件库，零第三方 UI 库依赖，轻量开箱即用...</p>
						<p>4. 列表长内容第 2 段：支持 TypeScript 严格类型推导，提供丰富的 API 属性定制...</p>
						<p>5. 列表长内容第 3 段：滚动时横幅始终锁定在最上方，不会随内容移出视野！</p>
					</div>
				</div>
			</div>

			{/* 2. 多种预设主题风格与跑马灯 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 多种预设渐变主题与跑马灯滚动</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}>
					{/* Primary 蓝紫渐变 */}
					<AnnouncementBar type="primary">
						<span>
							🚀 <b>版本升级：</b> react-public-components 现已包含 60+ 款通用核心组件！
						</span>
					</AnnouncementBar>

					{/* Purple 紫粉渐变 */}
					<AnnouncementBar type="purple">
						<span>
							🎉 <b>限时福利：</b> 欢迎 Star 支持我们的 GitHub 开源项目！
						</span>
					</AnnouncementBar>

					{/* Success 绿蓝渐变 */}
					<AnnouncementBar type="success">
						<span>
							✅ <b>健康状态：</b> 全球 12 个机房节点已全部恢复正常通信。
						</span>
					</AnnouncementBar>

					{/* 跑马灯滚动模式 */}
					<AnnouncementBar type="primary" marquee>
						<span>
							📢 <b>滚动快讯：</b> 今日全线系统运行稳定，欢迎大家提出宝贵的使用反馈与组件需求！
						</span>
					</AnnouncementBar>
				</div>
			</div>

			{/* 3. 示例代码 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 720 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
