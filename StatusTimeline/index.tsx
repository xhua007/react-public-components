import React, { ReactNode, CSSProperties } from 'react';
import './index.less';

export type TimelineStatus = 'finish' | 'process' | 'error' | 'wait';

export interface TimelineOperator {
	name: string;
	avatar?: ReactNode;
}

export interface StatusTimelineItem {
	title: ReactNode;
	description?: ReactNode;
	time?: string;
	duration?: string;
	status?: TimelineStatus;
	operator?: TimelineOperator;
}

export interface StatusTimelineProps {
	/** 时间轴节点列表 */
	items: StatusTimelineItem[];
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const statusIcons: Record<TimelineStatus, string> = {
	finish: '✓',
	process: '●',
	error: '✕',
	wait: '○',
};

const StatusTimeline: React.FC<StatusTimelineProps> = ({
	items = [],
	className = '',
	style,
}) => {
	return (
		<div className={`rpc_status_timeline ${className}`} style={style}>
			{items.map((item, idx) => {
				const status = item.status || 'finish';

				return (
					<div key={idx} className="rpc_status_timeline_item">
						{/* 轴线与节点 */}
						<div className="rpc_status_timeline_axis">
							<div className={`rpc_status_timeline_dot rpc_status_timeline_dot_${status}`}>
								{statusIcons[status]}
							</div>
							<div className="rpc_status_timeline_line" />
						</div>

						{/* 节点内容 */}
						<div className="rpc_status_timeline_content">
							<div className="rpc_status_timeline_header">
								<span className="rpc_status_timeline_title">{item.title}</span>
								{item.time && <span className="rpc_status_timeline_time">{item.time}</span>}
							</div>

							{item.operator && (
								<div className="rpc_status_timeline_operator">
									{item.operator.avatar && <span>{item.operator.avatar}</span>}
									<span>经办人：{item.operator.name}</span>
								</div>
							)}

							{item.duration && (
								<div>
									<span className="rpc_status_timeline_duration">耗时：{item.duration}</span>
								</div>
							)}

							{item.description && (
								<div className="rpc_status_timeline_desc">{item.description}</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default StatusTimeline;
