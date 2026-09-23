import { useRef, useState } from 'react';
import CeilingBox from '../../../CeilingBox';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function CeilingBoxDemo() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [statusLog, setStatusLog] = useState<string>('正常状态（未吸顶）');

	const usageCode = `import { CeilingBox } from 'react-public-components';

export default function App() {
  return (
    <div>
      {/* 1. 基础吸顶容器（距离顶部 16px 吸顶，自动开启毛玻璃） */}
      <CeilingBox offsetTop={16} onChange={(affixed) => console.log('吸顶状态:', affixed)}>
        <div style={{ padding: '12px 20px', background: '#fff', borderRadius: 8 }}>
          🚀 这是一个吸顶操作栏
        </div>
      </CeilingBox>

      {/* 2. 状态感知 Render Props 模式 */}
      <CeilingBox offsetTop={0}>
        {(isAffixed) => (
          <div style={{
            padding: '14px 24px',
            background: isAffixed ? 'rgba(255,255,255,0.85)' : '#f0f5ff',
            color: isAffixed ? '#1677ff' : '#262626',
            boxShadow: isAffixed ? '0 4px 16px rgba(0,0,0,0.08)' : 'none'
          }}>
            {isAffixed ? '📌 已牢牢吸附在视口顶部' : '📄 页面正常流状态'}
          </div>
        )}
      </CeilingBox>
    </div>
  );
}`;

	const apiData: ApiPropItem[] = [
		{
			name: 'children',
			desc: '子元素内容，支持 ReactNode 或 Render Props 函数 (isAffixed: boolean) => ReactNode',
			type: 'ReactNode | ((isAffixed: boolean) => ReactNode)',
			required: true,
		},
		{
			name: 'offsetTop',
			desc: '距离视口/滚动容器顶部的吸顶偏移距离（像素）',
			type: 'number',
			default: '0',
		},
		{
			name: 'offsetBottom',
			desc: '距离视口/滚动容器底部的吸底偏移距离（像素，传值时开启吸底模式）',
			type: 'number',
			default: '-',
		},
		{
			name: 'target',
			desc: '监听滚动的目标 DOM 容器，不传时默认监听 window 全局滚动',
			type: '() => HTMLElement | Window | null',
			default: '() => window',
		},
		{
			name: 'blur',
			desc: '吸顶状态下是否自动启用现代毛玻璃磨砂（backdrop-filter）与立体阴影',
			type: 'boolean',
			default: 'true',
		},
		{
			name: 'zIndex',
			desc: '吸顶/吸底激活时的图层层级 z-index',
			type: 'number',
			default: '1000',
		},
		{
			name: 'onChange',
			desc: '吸顶/吸底状态改变时的回调通知',
			type: '(isAffixed: boolean) => void',
			default: '-',
		},
		{
			name: 'className',
			desc: '自定义类名',
			type: 'string',
			default: '-',
		},
		{
			name: 'style',
			desc: '自定义行内样式',
			type: 'CSSProperties',
			default: '-',
		},
		{
			name: 'affixedClassName',
			desc: '吸顶激活状态下追加的自定义类名',
			type: 'string',
			default: '-',
		},
		{
			name: 'affixedStyle',
			desc: '吸顶激活状态下追加的自定义行内样式',
			type: 'CSSProperties',
			default: '-',
		},
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 局部滚动容器吸顶演练 */}
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
						1. 局部容器内智能吸顶 (Sticky Container + 状态感知)
					</h3>
					<span
						style={{
							fontSize: 12,
							padding: '3px 10px',
							borderRadius: 12,
							background: statusLog.includes('已吸顶') ? '#e6f4ff' : '#f5f5f5',
							color: statusLog.includes('已吸顶') ? '#1677ff' : '#8c8c8c',
							fontWeight: 500,
						}}
					>
						当前状态：{statusLog}
					</span>
				</div>
				<p style={{ color: '#595959', fontSize: 14, marginBottom: 16 }}>
					向下滚动下方长列表，当滚动至操作栏时，操作栏将<strong>自动锁定吸顶</strong>
					，并自动保留原位占位高度，防止页面发生闪跳。
				</p>

				<div
					ref={scrollContainerRef}
					style={{
						height: 320,
						overflowY: 'auto',
						border: '1px solid #e8e8e8',
						borderRadius: 8,
						background: '#fafafa',
						padding: '0 20px',
						position: 'relative',
						maxWidth: 720,
					}}
				>
					<div style={{ padding: '24px 0', color: '#595959', lineHeight: 1.8 }}>
						<h4 style={{ margin: '0 0 8px 0', color: '#1f1f1f' }}>📋 顶部前置导言区域</h4>
						<p style={{ margin: 0 }}>
							向下滚动即可看到吸顶组件 <code>CeilingBox</code>
							。它支持自动占位维持布局稳定，无需开发者手动计算高度。
						</p>
					</div>

					{/* 吸顶组件 */}
					<CeilingBox
						offsetTop={10}
						target={() => scrollContainerRef.current}
						onChange={(affixed) => {
							setStatusLog(affixed ? '📌 已吸顶锁定 (Top: 10px)' : '正常状态（未吸顶）');
						}}
					>
						{(isAffixed) => (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: '12px 18px',
									borderRadius: 8,
									border: isAffixed ? '1px solid #91caff' : '1px solid #e8e8e8',
									background: isAffixed ? 'rgba(255, 255, 255, 0.9)' : '#ffffff',
									transition: 'all 0.2s ease',
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<span style={{ fontSize: 16 }}>{isAffixed ? '📌' : '📄'}</span>
									<span style={{ fontWeight: 600, color: isAffixed ? '#1677ff' : '#1f1f1f' }}>
										{isAffixed ? 'CeilingBox 正在吸顶锁定中' : '普通文档流操作工具栏'}
									</span>
								</div>
								<div style={{ display: 'flex', gap: 8 }}>
									<button
										style={{
											padding: '4px 12px',
											borderRadius: 4,
											border: '1px solid #1677ff',
											background: '#1677ff',
											color: '#fff',
											fontSize: 12,
											cursor: 'pointer',
										}}
									>
										主要操作
									</button>
									<button
										style={{
											padding: '4px 12px',
											borderRadius: 4,
											border: '1px solid #d9d9d9',
											background: '#fff',
											fontSize: 12,
											cursor: 'pointer',
										}}
									>
										导出数据
									</button>
								</div>
							</div>
						)}
					</CeilingBox>

					{/* 长列表内容 */}
					<div style={{ padding: '24px 0 160px 0', lineHeight: 2, color: '#595959' }}>
						<p>🔹 列表项 1：企业级全功能通用吸顶容器组件</p>
						<p>🔹 列表项 2：内置占位层（Placeholder），脱离文档流时原位自动保持高度</p>
						<p>🔹 列表项 3：支持毛玻璃磨砂（backdrop-filter: blur(12px)）与柔和立体投影</p>
						<p>🔹 列表项 4：支持同时兼容全局 window 滚动与局部 div 滚动监听</p>
						<p>🔹 列表项 5：支持 Render Props 模式，子元素可随时根据 isAffixed 动态切换样式</p>
						<p>🔹 列表项 6：支持 offsetTop 顶部偏移与 offsetBottom 吸底模式</p>
						<p>🔹 列表项 7：继续向上滚动回顶部，组件自动平滑恢复到原文档流位置...</p>
					</div>
				</div>
			</div>

			{/* 2. 示例代码 */}
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
