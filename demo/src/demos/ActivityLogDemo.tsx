import ActivityLog, { ActivityItem } from '../../../ActivityLog';

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
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 中后台操作审计日志 / 业务动态流（操作人头像 + 角色标签 + 时间线 + 详情折叠）
				</h3>
				<div style={{ maxWidth: 640, background: '#ffffff', border: '1px solid #f0f0f0', borderRadius: 8, padding: 20 }}>
					<ActivityLog items={logItems} />
				</div>
			</div>
		</div>
	);
}
