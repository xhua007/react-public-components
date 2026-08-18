import { useState } from 'react';
import GuidedTour, { TourStep } from '../../../GuidedTour';

export default function GuidedTourDemo() {
	const [tourOpen, setTourOpen] = useState<boolean>(false);

	const steps: TourStep[] = [
		{
			target: '#tour-step-1',
			title: '第一步：新建项目工程',
			description: '点击此按钮可以快速创建属于您的第一个前端业务工程，支持多种模板预设。',
			placement: 'bottom',
		},
		{
			target: '#tour-step-2',
			title: '第二步：配置自动化流水线',
			description: '在这里可以绑定 Git 仓库并配置持续集成与自动化测试脚本。',
			placement: 'bottom',
		},
		{
			target: '#tour-step-3',
			title: '第三步：监控部署与服务状态',
			description: '实时查看生产集群的 CPU、内存负载与网络健康状态。',
			placement: 'top',
		},
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 引导演示操作台 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 新手引导步进器 (GuidedTour)
				</h3>

				<div style={{ marginBottom: 20 }}>
					<button
						type="button"
						onClick={() => setTourOpen(true)}
						style={{
							padding: '8px 20px',
							background: '#1677ff',
							color: '#fff',
							border: 'none',
							borderRadius: 6,
							cursor: 'pointer',
							fontWeight: 500,
							fontSize: 14,
						}}
					>
						🚀 开始新手交互漫游引导
					</button>
				</div>

				{/* 模拟页面区域 */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: 16,
						maxWidth: 720,
					}}
				>
					<div
						id="tour-step-1"
						style={{
							background: '#ffffff',
							border: '1px solid #e8e8e8',
							borderRadius: 8,
							padding: 20,
							boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
						}}
					>
						<div style={{ fontSize: 24, marginBottom: 8 }}>📁</div>
						<h4 style={{ margin: '0 0 6px 0', fontSize: 16 }}>新建工程项目</h4>
						<p style={{ margin: 0, color: '#8c8c8c', fontSize: 13 }}>Step 1 目标区域</p>
					</div>

					<div
						id="tour-step-2"
						style={{
							background: '#ffffff',
							border: '1px solid #e8e8e8',
							borderRadius: 8,
							padding: 20,
							boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
						}}
					>
						<div style={{ fontSize: 24, marginBottom: 8 }}>⚙️</div>
						<h4 style={{ margin: '0 0 6px 0', fontSize: 16 }}>CI/CD 自动化流水线</h4>
						<p style={{ margin: 0, color: '#8c8c8c', fontSize: 13 }}>Step 2 目标区域</p>
					</div>

					<div
						id="tour-step-3"
						style={{
							background: '#ffffff',
							border: '1px solid #e8e8e8',
							borderRadius: 8,
							padding: 20,
							boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
						}}
					>
						<div style={{ fontSize: 24, marginBottom: 8 }}>📈</div>
						<h4 style={{ margin: '0 0 6px 0', fontSize: 16 }}>实时健康监控</h4>
						<p style={{ margin: 0, color: '#8c8c8c', fontSize: 13 }}>Step 3 目标区域</p>
					</div>
				</div>

				{/* 引导组件 */}
				<GuidedTour
					open={tourOpen}
					steps={steps}
					onClose={() => setTourOpen(false)}
					onFinish={() => {
						setTourOpen(false);
						alert('恭喜完成全部引导流程！🎉');
					}}
				/>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持动态定位任意 DOM 选择器，高亮镂空并附带上一步/下一步控制。
				</p>
			</div>
		</div>
	);
}
