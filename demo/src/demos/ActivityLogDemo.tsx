import ActivityLog, { ActivityItem } from '../../../ActivityLog';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

const logItems: ActivityItem[] = [
	{
		id: 1,
		operator: '张伟',
		role: '系统管理员',
		action: '发布了线上版本',
		target: 'release-v2.1.0',
		time: '2分钟前',
		defaultExpanded: true,
		detail: (
			<div>
				<div>• 部署集群：production-sg-cluster-01</div>
				<div>• 变更模块：API Gateway, Auth Service, Billing Worker</div>
				<div>• 影响范围：全网 100% 流量热更新</div>
			</div>
		),
	},
	{
		id: 2,
		operator: '李静',
		role: '安全合规专员',
		action: '调整了用户数据导出权限',
		target: 'Finance-Role',
		time: '18分钟前',
		detail: '已将财务部门导出权限从“全部字段”调整为“手机号与银行卡强制脱敏”。',
	},
	{
		id: 3,
		operator: '王强',
		role: 'DevOps 工程师',
		action: '重启了消息队列集群节点',
		target: 'Kafka-Broker-03',
		time: '1小时前',
	},
	{
		id: 4,
		operator: '赵雷',
		role: '研发主管',
		action: '创建了新的自动化测试流水线',
		target: 'E2E-Smoke-Pipeline',
		time: '昨天 16:40',
	},
];

export default function ActivityLogDemo() {
	const usageCode = `import { ActivityLog } from 'react-public-components';

export default function App() {
  const items = [
    {
      id: 1,
      operator: '张伟',
      role: '管理员',
      action: '发布了版本',
      target: 'v2.1.0',
      time: '2分钟前',
      detail: '全量生产集群热更新完成'
    }
  ];

  return <ActivityLog items={items} />;
}`;

	const apiData: ApiPropItem[] = [
		{
			name: 'items',
			desc: '操作活动日志项列表，每项含 id, operator, role, action, target, time, detail, avatar',
			type: 'ActivityItem[]',
			required: true,
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 现代化操作审计动态流（操作人头像/角色 + 目标高亮 + 变动详情可折叠展开）
				</h3>

				<div style={{ maxWidth: 640 }}>
					<ActivityLog items={logItems} />
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
