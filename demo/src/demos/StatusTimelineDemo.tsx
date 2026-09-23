import StatusTimeline from '../../../StatusTimeline';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function StatusTimelineDemo() {
	const usageCode = `import { StatusTimeline } from 'react-public-components';

export default function App() {
  const items = [
    {
      title: '提交采购申请单',
      time: '09:30',
      status: 'finish' as const,
      operator: { name: '张三' },
      duration: '5分钟',
      description: '申请 10 台 GPU 服务器'
    },
    {
      title: '部门主管审批',
      time: '11:20',
      status: 'process' as const,
      operator: { name: '李四' },
      duration: '处理中'
    }
  ];

  return <StatusTimeline items={items} />;
}`;

	const apiData: ApiPropItem[] = [
		{
			name: 'items',
			desc: '时间轴节点列表，每项含 title, description, time, duration, status, operator',
			type: 'StatusTimelineItem[]',
			required: true,
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 高级审批流与动态耗时时间轴（多状态节点 + 经办人 + 流转耗时统计）
				</h3>

				<div
					style={{
						maxWidth: 520,
						background: '#ffffff',
						padding: 20,
						border: '1px solid #f0f0f0',
						borderRadius: 8,
					}}
				>
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
								title: '采购执行与资产入库',
								status: 'wait',
								operator: { name: '行政后勤组' },
								description: '待财务审批完成后自动触发采购流程。',
							},
						]}
					/>
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
