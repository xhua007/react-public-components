import React, { useState, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface ActivityItem {
	/** 唯一标识 */
	id: string | number;
	/** 操作人昵称 */
	operator: string;
	/** 操作人头像链接或文字 */
	avatar?: string;
	/** 操作人角色（如 '管理员' / '运维工程师'） */
	role?: string;
	/** 动作类型描述（如 '发布了版本' / '修改了配置'） */
	action: ReactNode;
	/** 操作目标（如 'v2.1.0' / 'RDS-MySQL-Master'） */
	target?: ReactNode;
	/** 发生时间戳或文本（如 '3分钟前' / '2026-08-15 14:20'） */
	time: string;
	/** 变动详情内容（支持折叠展开） */
	detail?: ReactNode;
	/** 是否默认展开详情，默认为 false */
	defaultExpanded?: boolean;
}

export interface ActivityLogProps {
	/** 日志动态列表 */
	items: ActivityItem[];
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const ActivityLogItem: React.FC<{ item: ActivityItem }> = ({ item }) => {
	const [expanded, setExpanded] = useState<boolean>(Boolean(item.defaultExpanded));

	const avatarInitial = item.operator ? item.operator.charAt(0).toUpperCase() : 'U';

	return (
		<div className="rpc_activity_log_item">
			{/* 头像与连接轴线 */}
			<div className="rpc_activity_log_avatar_col">
				<div className="rpc_activity_log_avatar">
					{item.avatar ? (
						<img src={item.avatar} alt={item.operator} />
					) : (
						<span>{avatarInitial}</span>
					)}
				</div>
				<div className="rpc_activity_log_line" />
			</div>

			{/* 内容主体 */}
			<div className="rpc_activity_log_content">
				<div className="rpc_activity_log_header">
					<div className="rpc_activity_log_operator_row">
						<span className="rpc_activity_log_operator">{item.operator}</span>
						{item.role && <span className="rpc_activity_log_role">{item.role}</span>}
						<span className="rpc_activity_log_action">{item.action}</span>
						{item.target && <span className="rpc_activity_log_target">{item.target}</span>}
					</div>

					<span className="rpc_activity_log_time">{item.time}</span>
				</div>

				{item.detail && (
					<>
						<span
							className="rpc_activity_log_toggle_btn"
							onClick={() => setExpanded(!expanded)}
						>
							{expanded ? '收起详情 ▲' : '查看变动详情 ▼'}
						</span>

						{expanded && <div className="rpc_activity_log_detail">{item.detail}</div>}
					</>
				)}
			</div>
		</div>
	);
};

const ActivityLog: React.FC<ActivityLogProps> = ({ items = [], className = '', style }) => {
	return (
		<div className={`rpc_activity_log ${className}`} style={style}>
			{items.map((item) => (
				<ActivityLogItem key={item.id} item={item} />
			))}
		</div>
	);
};

export default ActivityLog;
