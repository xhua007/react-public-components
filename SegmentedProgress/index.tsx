import React, { useMemo, CSSProperties } from 'react';
import './index.less';

export interface ProgressSegment {
	label: string;
	value: number;
	color: string;
	suffix?: string;
}

export interface SegmentedProgressProps {
	/** 分段数据列表 */
	segments: ProgressSegment[];
	/** 总量基准（不传则自动对各分段 value 求和） */
	total?: number;
	/** 进度条高度（像素），默认为 10 */
	height?: number;
	/** 是否显示底部图例 Legend，默认为 true */
	showLegend?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const SegmentedProgress: React.FC<SegmentedProgressProps> = ({
	segments = [],
	total: customTotal,
	height = 10,
	showLegend = true,
	className = '',
	style,
}) => {
	const sumValue = useMemo(() => {
		return segments.reduce((acc, cur) => acc + (cur.value || 0), 0);
	}, [segments]);

	const baseTotal = customTotal !== undefined ? customTotal : (sumValue || 1);

	return (
		<div className={`rpc_seg_progress ${className}`} style={style}>
			{/* 分段进度条主体 */}
			<div className="rpc_seg_progress_bar" style={{ height }}>
				{segments.map((seg, idx) => {
					const pct = ((seg.value / baseTotal) * 100).toFixed(1);

					return (
						<div
							key={idx}
							className="rpc_seg_progress_segment"
							style={{
								width: `${pct}%`,
								backgroundColor: seg.color,
							}}
							title={`${seg.label}: ${seg.value}${seg.suffix || ''} (${pct}%)`}
						/>
					);
				})}
			</div>

			{/* 底部图例 */}
			{showLegend && (
				<div className="rpc_seg_progress_legend">
					{segments.map((seg, idx) => {
						const pct = ((seg.value / baseTotal) * 100).toFixed(1);

						return (
							<div key={idx} className="rpc_seg_progress_legend_item">
								<span className="rpc_seg_progress_dot" style={{ backgroundColor: seg.color }} />
								<span>{seg.label}</span>
								<b style={{ color: '#262626' }}>
									{seg.value}{seg.suffix || ''} ({pct}%)
								</b>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SegmentedProgress;
