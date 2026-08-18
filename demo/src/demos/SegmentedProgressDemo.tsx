import SegmentedProgress from '../../../SegmentedProgress';

export default function SegmentedProgressDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 分段式多色比例进度条（存储空间占用 / 任务工时分布 / 悬停详情）
				</h3>

				<div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 24 }}>
					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 8 }}>
							云服务器 NVMe 固态硬盘使用分布 (总计 512 GB)
						</div>
						<SegmentedProgress
							total={512}
							height={12}
							segments={[
								{ label: '系统与内核镜像', value: 48, color: '#1677ff', suffix: 'GB' },
								{ label: 'AI 模型权重权重库', value: 240, color: '#722ed1', suffix: 'GB' },
								{ label: '数据库与日志归档', value: 96, color: '#fa8c16', suffix: 'GB' },
								{ label: '剩余可用空间', value: 128, color: '#52c41a', suffix: 'GB' },
							]}
						/>
					</div>

					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 8 }}>
							Q3 敏捷迭代工时占比
						</div>
						<SegmentedProgress
							height={10}
							segments={[
								{ label: '前端研发', value: 45, color: '#13c2c2', suffix: '人天' },
								{ label: '后端架构', value: 55, color: '#eb2f96', suffix: '人天' },
								{ label: '测试与验收', value: 20, color: '#faad14', suffix: '人天' },
							]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
