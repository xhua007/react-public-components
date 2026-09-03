import { useState, useEffect, useRef } from 'react';
import LazyLoadBox, { LazyLoadBoxRef } from '../../../LazyLoadBox';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

// 模拟的重型数据模块组件（挂载时会调用数据接口）
function HeavyModuleCard({
	id,
	title,
	color,
	onApiCall,
}: {
	id: number;
	title: string;
	color: string;
	onApiCall: (msg: string) => void;
}) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<number[]>([]);

	useEffect(() => {
		const timestamp = new Date().toLocaleTimeString();
		onApiCall(`[${timestamp}] 🚀 模块 #${id} (${title}) 首次进入视口预加载范围，已触发调用接口 /api/v1/module/${id}`);

		// 模拟异步接口耗时 500ms
		const timer = setTimeout(() => {
			setData([
				Math.floor(Math.random() * 80 + 20),
				Math.floor(Math.random() * 80 + 20),
				Math.floor(Math.random() * 80 + 20),
				Math.floor(Math.random() * 80 + 20),
				Math.floor(Math.random() * 80 + 20),
			]);
			setLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [id, title, onApiCall]);

	return (
		<div
			style={{
				padding: '16px 20px',
				borderRadius: 8,
				border: '1px solid #e8e8e8',
				background: '#ffffff',
				boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 12,
				}}
			>
				<span style={{ fontWeight: 600, fontSize: 15, color: '#262626' }}>
					📊 模块 {id}: {title}
				</span>
				<span
					style={{
						fontSize: 12,
						padding: '2px 8px',
						borderRadius: 4,
						background: loading ? '#fff7e6' : '#f6ffed',
						color: loading ? '#d46b08' : '#389e0d',
						border: `1px solid ${loading ? '#ffd591' : '#b7eb8f'}`,
					}}
				>
					{loading ? '⏳ 数据请求中...' : '✅ 数据加载完成'}
				</span>
			</div>

			{loading ? (
				<div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8c8c8c' }}>
					正在拉取并解析后端数据流...
				</div>
			) : (
				<div>
					<div style={{ fontSize: 13, color: '#595959', marginBottom: 8 }}>
						业务指标趋势分析（模拟接口回传数据）：
					</div>
					<div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 60, paddingTop: 6 }}>
						{data.map((val, idx) => (
							<div key={idx} style={{ flex: 1, textAlign: 'center' }}>
								<div
									style={{
										height: `${val}%`,
										background: color,
										borderRadius: '4px 4px 0 0',
										transition: 'height 0.4s ease',
									}}
								/>
								<div style={{ fontSize: 11, color: '#8c8c8c', marginTop: 4 }}>
									D{idx + 1} ({val})
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default function LazyLoadBoxDemo() {
	const [offset, setOffset] = useState<number>(150);
	const [logs, setLogs] = useState<string[]>([]);
	const [refreshKey, setRefreshKey] = useState<number>(0);
	const [forceAll, setForceAll] = useState<boolean>(false);
	const boxRef = useRef<LazyLoadBoxRef>(null);

	const handleLog = (msg: string) => {
		setLogs((prev) => [msg, ...prev]);
	};

	const modules = [
		{ id: 1, title: '核心 KPI 实时大盘', color: '#1677ff' },
		{ id: 2, title: '用户行为与留存漏斗', color: '#52c41a' },
		{ id: 3, title: '全站交易与流水监控', color: '#fa8c16' },
		{ id: 4, title: '分布式服务器负载与健康度', color: '#722ed1' },
		{ id: 5, title: '全国各省市销售热力分布', color: '#eb2f96' },
		{ id: 6, title: '商品转化与供应链告警', color: '#13c2c2' },
	];

	const usageCode = `import { useState } from 'react';
import { LazyLoadBox } from 'react-public-components';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 模块 1：距离视口还有 200px 时提前加载，彻底避免无脑并发请求 */}
      <LazyLoadBox offset={200} height={180}>
        <RealtimeChartModule />
      </LazyLoadBox>

      {/* 模块 2：支持数组格式 offset={[top, bottom]} 与自定义占位 */}
      <LazyLoadBox
        offset={[100, 200]}
        height={220}
        placeholder={<div className="custom-skeleton">正在准备数据...</div>}
        onVisible={() => console.log('模块2即将展现')}
      >
        <UserRetentionFunnelModule />
      </LazyLoadBox>

      {/* 模块 3：Render Props 模式 */}
      <LazyLoadBox offset={150} height={160}>
        {({ isInView, hasLoaded, load }) => (
          <ServerMetricsModule active={isInView} onReload={load} />
        )}
      </LazyLoadBox>
    </div>
  );
}`;

	const apiData: ApiPropItem[] = [
		{
			name: 'children',
			desc: '子组件内容，或 Render Props 函数 ({ isInView, hasLoaded, load }) => ReactNode。未进入预加载视口时不挂载，彻底阻止内部接口请求与开销',
			type: 'ReactNode | ((props) => ReactNode)',
			required: true,
		},
		{
			name: 'offset',
			desc: '距离视口还有多少像素时提前触发加载（支持数字 200、数组 [100, 200] 或标准 CSS 4 方向边距字符串）',
			type: 'number | string | [v, h] | [t, r, b, l]',
			default: '150',
		},
		{
			name: 'height',
			desc: '未加载前的预估高度/最小高度，防止页面未渲染时高度坍塌导致滚动条剧烈跳动（CLS 保护）',
			type: 'number | string',
			default: '180',
		},
		{
			name: 'width',
			desc: '预估宽度/最小宽度（可选）',
			type: 'number | string',
			default: "'100%'",
		},
		{
			name: 'placeholder',
			desc: '未加载时展示的自定义占位内容',
			type: 'ReactNode',
			default: '内置流光呼吸骨架屏',
		},
		{
			name: 'skeleton',
			desc: '当未指定 placeholder 时，是否显示默认骨架屏',
			type: 'boolean',
			default: 'true',
		},
		{
			name: 'bordered',
			desc: '骨架屏占位是否显示微虚线边框',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'once',
			desc: '是否只加载一次（默认 true：进入视口后永久保持挂载，移出视口不重复销毁与重复请求）',
			type: 'boolean',
			default: 'true',
		},
		{
			name: 'forceRender',
			desc: '是否强制立即渲染（忽略视口距离，常用于一键全部加载、批量导出或页面打印）',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'scrollContainer',
			desc: '指定局部滚动容器（支持 DOM 节点、RefObject、选择器或 getter 函数），默认监听 window 视口',
			type: 'HTMLElement | RefObject | string | fn',
			default: 'null (window)',
		},
		{
			name: 'threshold',
			desc: '交叉比例阈值（0 ~ 1），默认 0',
			type: 'number | number[]',
			default: '0',
		},
		{
			name: 'animate',
			desc: '进入视口并渲染后是否启用平滑淡入动画效果',
			type: 'boolean',
			default: 'true',
		},
		{
			name: 'ssr',
			desc: '服务端渲染环境（SSR）下是否直接输出子组件',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'onVisible',
			desc: '首次进入预加载视口并触发加载时的回调函数',
			type: '() => void',
			default: '-',
		},
		{
			name: 'onInViewChange',
			desc: '可见性发生变化时的实时回调函数',
			type: '(inView: boolean) => void',
			default: '-',
		},
		{
			name: 'ref',
			desc: '组件 Ref 实例，提供 { load: () => void, reset: () => void, getInView: () => boolean, getHasLoaded: () => boolean, getDOMNode: () => HTMLDivElement }',
			type: 'LazyLoadBoxRef',
			default: '-',
		},
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 核心需求模拟：滚动视口按需加载与接口调用拦截 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 8 }}>
					1. 视口距离感知与接口请求拦截模拟器（滚动查看效果）
				</h3>
				<p style={{ fontSize: 13, color: '#666', margin: '0 0 16px 0' }}>
					每个模块挂载时都会调用自身的数据接口。使用 <code>LazyLoadBox</code> 后，未在视口的模块完全不会发起接口请求。当滚动到距离视口下方设定像素（如 {offset}px）时，才会精准提前触发加载。
				</p>

				{/* 交互控制台 */}
				<div
					style={{
						padding: '14px 18px',
						borderRadius: 8,
						background: '#fafafa',
						border: '1px solid #e8e8e8',
						display: 'flex',
						flexWrap: 'wrap',
						gap: 16,
						alignItems: 'center',
						marginBottom: 16,
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<span style={{ fontSize: 13, fontWeight: 500 }}>提前预加载距离 (offset):</span>
						{[50, 150, 300].map((val) => (
							<button
								key={val}
								type="button"
								style={{
									padding: '4px 10px',
									fontSize: 12,
									borderRadius: 4,
									cursor: 'pointer',
									border: `1px solid ${offset === val ? '#1677ff' : '#d9d9d9'}`,
									background: offset === val ? '#e6f4ff' : '#fff',
									color: offset === val ? '#1677ff' : '#333',
								}}
								onClick={() => {
									setOffset(val);
									setRefreshKey((k) => k + 1);
									setLogs([]);
								}}
							>
								{val}px {val === 150 ? '(推荐)' : ''}
							</button>
						))}
					</div>

					<div style={{ display: 'flex', gap: 8 }}>
						<button
							type="button"
							style={{
								padding: '4px 12px',
								fontSize: 12,
								borderRadius: 4,
								cursor: 'pointer',
								border: '1px solid #d9d9d9',
								background: '#fff',
							}}
							onClick={() => {
								setLogs([]);
								setForceAll(false);
								setRefreshKey((k) => k + 1);
							}}
						>
							🔄 重置并清空请求日志
						</button>
						<button
							type="button"
							style={{
								padding: '4px 12px',
								fontSize: 12,
								borderRadius: 4,
								cursor: 'pointer',
								border: '1px solid #1677ff',
								background: '#1677ff',
								color: '#fff',
							}}
							onClick={() => setForceAll(true)}
						>
							⚡ 强制一键加载全部模块
						</button>
					</div>
				</div>

				{/* 接口调用实时监控面板 */}
				<div
					style={{
						padding: '12px 16px',
						background: '#1e1e1e',
						borderRadius: 6,
						color: '#4ec9b0',
						fontFamily: 'monospace',
						fontSize: 12,
						maxHeight: 120,
						overflowY: 'auto',
						marginBottom: 20,
					}}
				>
					<div style={{ color: '#858585', marginBottom: 4 }}>
						🌐 [实时网络请求日志监控]（未进入视口的模块不会发起请求）：
					</div>
					{logs.length === 0 ? (
						<div style={{ color: '#6a9955' }}>
							等待滚动触发... 当前未进入视口的模块保持静默，无任何接口被唤醒。
						</div>
					) : (
						logs.map((log, i) => <div key={i} style={{ lineHeight: 1.6 }}>{log}</div>)
					)}
				</div>

				{/* 局部滚动容器内的多个按需加载模块 */}
				<div
					id="demo-scroll-box"
					style={{
						height: 420,
						overflowY: 'auto',
						border: '2px solid #1677ff',
						borderRadius: 8,
						padding: 16,
						background: '#f5f7fa',
						display: 'flex',
						flexDirection: 'column',
						gap: 20,
						position: 'relative',
					}}
				>
					<div
						style={{
							position: 'sticky',
							top: 0,
							zIndex: 10,
							background: 'rgba(22, 119, 255, 0.9)',
							color: '#fff',
							padding: '6px 12px',
							borderRadius: 4,
							fontSize: 12,
							backdropFilter: 'blur(4px)',
						}}
					>
						⬇️ 请在此容器内向下滚动，观察下方模块在距离视口 {offset}px 时才被挂载与发起网络请求
					</div>

					{modules.map((m) => (
						<LazyLoadBox
							key={`${refreshKey}-${m.id}`}
							offset={offset}
							height={150}
							scrollContainer="#demo-scroll-box"
							forceRender={forceAll}
						>
							<HeavyModuleCard
								id={m.id}
								title={m.title}
								color={m.color}
								onApiCall={handleLog}
							/>
						</LazyLoadBox>
					))}
				</div>
			</div>

			{/* 2. 命令式 Ref 与 Render Props 演示 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					2. 命令式 Ref 操作与 Render Props 状态感知
				</h3>
				<div style={{ padding: 16, background: '#fafafa', borderRadius: 8, maxWidth: 640 }}>
					<div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
						<button
							type="button"
							style={{
								padding: '4px 12px',
								fontSize: 12,
								cursor: 'pointer',
								borderRadius: 4,
								border: '1px solid #1677ff',
								background: '#e6f4ff',
								color: '#1677ff',
							}}
							onClick={() => boxRef.current?.load()}
						>
							通过 Ref 立即加载此模块
						</button>
						<button
							type="button"
							style={{
								padding: '4px 12px',
								fontSize: 12,
								cursor: 'pointer',
								borderRadius: 4,
								border: '1px solid #d9d9d9',
								background: '#fff',
							}}
							onClick={() => {
								alert(`当前元素在视口内: ${boxRef.current?.getInView()}，是否已完成加载: ${boxRef.current?.getHasLoaded()}`);
							}}
						>
							查看 Ref 状态
						</button>
					</div>

					<LazyLoadBox ref={boxRef} height={100} offset={0} once={false}>
						{({ isInView, hasLoaded }) => (
							<div
								style={{
									padding: 16,
									background: '#fff',
									borderRadius: 6,
									border: '1px solid #d9d9d9',
								}}
							>
								<div style={{ fontWeight: 600, color: '#1677ff' }}>
									🎉 Render Props 内容已渲染！
								</div>
								<div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
									状态探查：isInView = {String(isInView)}, hasLoaded = {String(hasLoaded)}
								</div>
							</div>
						)}
					</LazyLoadBox>
				</div>
			</div>

			{/* 3. 示例代码 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 720 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			{/* 4. API 表格 */}
			<ApiTable data={apiData} />
		</div>
	);
}
