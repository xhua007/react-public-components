import HoverCard from '../../../HoverCard';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function HoverCardDemo() {
	const usageCode = `import { HoverCard } from 'react-public-components';

export default function App() {
  return (
    <p>
      欢迎咨询我们的核心架构师{' '}
      <HoverCard
        openDelay={200}
        content={
          <div style={{ padding: 8 }}>
            <h4>Alex Johnson</h4>
            <p>前端技术委员会负责人</p>
          </div>
        }
      >
        <span style={{ color: '#1677ff', textDecoration: 'underline', cursor: 'pointer' }}>
          @Alex
        </span>
      </HoverCard>
    </p>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '触发悬浮卡片的宿主子元素节点', type: 'ReactNode', required: true },
		{ name: 'content', desc: '鼠标悬浮时弹出的卡片详细内容', type: 'ReactNode', required: true },
		{
			name: 'openDelay',
			desc: '鼠标移入展开前的防误触延迟时间（毫秒）',
			type: 'number',
			default: '200',
		},
		{
			name: 'closeDelay',
			desc: '鼠标移出关闭前的平滑缓冲延迟时间（毫秒）',
			type: 'number',
			default: '200',
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. Twitter / GitHub 风格悬浮资料卡（防误触延迟触发 + 视口防溢出）
				</h3>

				<div style={{ fontSize: 14, color: '#595959', lineHeight: 2 }}>
					本项目的核心架构设计由{' '}
					<HoverCard
						content={
							<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
								<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
									<div
										style={{
											width: 44,
											height: 44,
											borderRadius: '50%',
											background: '#1677ff',
											color: '#ffffff',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: 20,
										}}
									>
										🚀
									</div>
									<div>
										<div style={{ fontWeight: 600, fontSize: 14, color: '#1f1f1f' }}>
											Alex Johnson
										</div>
										<div style={{ fontSize: 12, color: '#8c8c8c' }}>@alex · 前端技术委员会</div>
									</div>
								</div>

								<div style={{ fontSize: 12, color: '#595959' }}>
									全栈极客架构师，专注于高阶 React 公共组件与 WebGL 可视化体系。
								</div>

								<div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#8c8c8c' }}>
									<span>
										关注者 <b style={{ color: '#1f1f1f' }}>1,420</b>
									</span>
									<span>
										开源项目 <b style={{ color: '#1f1f1f' }}>38</b>
									</span>
								</div>
							</div>
						}
					>
						<span
							style={{
								color: '#1677ff',
								fontWeight: 600,
								textDecoration: 'underline',
								cursor: 'pointer',
							}}
						>
							@Alex Johnson
						</span>
					</HoverCard>{' '}
					牵头负责，旨在建立企业级轻量通用组件设计标准。
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
