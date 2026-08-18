import StatusTimeline from '../../../StatusTimeline';

export default function StatusTimelineDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 高级审批流与动态耗时时间轴（多状态节点 + 经办人 + 流转耗时统计）
				</h3>

				<div style={{ maxWidth: 520, background: '#ffffff', padding: 20, border: '1px solid #f0f0f0', borderRadius: 8 }}>
					<StatusTimeline
						items={[
							{
								title: '提交采购申请单 #REQ-2026-0815',
								time: '2026-08-15 09:30',
								status: 'finish',
								operator: { name: '张三 (申请人)' },
								duration: '5分钟',
								description: '申请采购 10 台高性能 GPU 开发工作站用于大模型推理。',
							},
							{
								title: '直属技术总监审批通过',
								time: '2026-08-15 11:20',
								status: 'finish',
								operator: { name: '李四 (CTO)' },
								duration: '1小时45分',
								description: '审批意见：同意，符合 Q3 季度研发算力预算规划。',
							},
							{
								title: '财务部预算合规复核',
								time: '2026-08-15 14:00',
								status: 'process',
								operator: { name: '王五 (财务主管)' },
								duration: '正在处理中 (已等待 2小时)',
								description: '正在核对发票抬头的增值税抵扣信息与供应商报价单。',
							},
							{
								title: '总经理终审放款',
								status: 'wait',
								operator: { name: '赵六 (CEO)' },
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
}
