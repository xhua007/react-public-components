import React, { ReactNode, CSSProperties } from 'react';
import CountUp from '../CountUp';
import './index.less';

export interface MetricCardProps {
	/** 卡片标题 */
	title: ReactNode;
	/** 指标数值（若是数字则自动平滑滚动） */
	value: number | string;
	/** 数值前缀（如 '¥'） */
	prefix?: ReactNode;
	/** 数值后缀（如 '元' / '%'） */
	suffix?: ReactNode;
	/** 趋势方向：'up' 上升（绿色），'down' 下降（红色） */
	trend?: 'up' | 'down';
	/** 趋势数值说明（如 '+18.5%' 或 '-3.2%'） */
	trendValue?: ReactNode;
	/** 趋势比较文本说明（如 '较上月'） */
	trendLabel?: ReactNode;
	/** 迷你折线图数据数组（如 [12, 18, 15, 26, 32, 40]） */
	chartData?: number[];
	/** 折线图颜色，默认为 '#1677ff' */
	chartColor?: string;
	/** 底部说明节点 */
	footer?: ReactNode;
	/** 右上角额外操作节点 */
	extra?: ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

// 自动生成 SVG Sparkline 迷你平滑路径
function generateSparklinePath(data: number[], width: number = 200, height: number = 36) {
	if (!data || data.length < 2) return { linePath: '', fillPath: '' };

	const min = Math.min(...data);
	const max = Math.max(...data);
	const range = max - min || 1;

	const padding = 2;
	const usableHeight = height - padding * 2;

	const points = data.map((val, idx) => {
		const x = (idx / (data.length - 1)) * width;
		const y = height - padding - ((val - min) / range) * usableHeight;
		return `${x.toFixed(1)},${y.toFixed(1)}`;
	});

	const linePath = `M ${points.join(' L ')}`;
	const fillPath = `M ${points[0]} L ${points.join(' L ')} L ${width},${height} L 0,${height} Z`;

	return { linePath, fillPath };
}

const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	prefix,
	suffix,
	trend,
	trendValue,
	trendLabel,
	chartData,
	chartColor = '#1677ff',
	footer,
	extra,
	className = '',
	style,
}) => {
	const isNumeric = typeof value === 'number';
	const { linePath, fillPath } = chartData ? generateSparklinePath(chartData) : { linePath: '', fillPath: '' };

	return (
		<div className={`rpc_metric_card ${className}`} style={style}>
			{/* 头部标题与操作 */}
			<div className="rpc_metric_card_header">
				<span className="rpc_metric_card_title">{title}</span>
				{extra && <div>{extra}</div>}
			</div>

			{/* 主体数值与趋势 */}
			<div className="rpc_metric_card_body">
				<div className="rpc_metric_card_value_wrap">
					{prefix && <span className="rpc_metric_card_prefix">{prefix}</span>}
					<span className="rpc_metric_card_value">
						{isNumeric ? <CountUp end={value as number} duration={1.2} /> : value}
					</span>
					{suffix && <span className="rpc_metric_card_suffix">{suffix}</span>}
				</div>

				{trend && (
					<div className={`rpc_metric_card_trend rpc_metric_card_trend_${trend}`}>
						<span>{trend === 'up' ? '▲' : '▼'}</span>
						<span>{trendValue}</span>
						{trendLabel && <span style={{ color: '#8c8c8c', fontWeight: 400, marginLeft: 2 }}>{trendLabel}</span>}
					</div>
				)}
			</div>

			{/* 微折线 Sparkline 图 */}
			{chartData && chartData.length > 1 && (
				<div className="rpc_metric_card_sparkline">
					<svg width="100%" height="100%" viewBox="0 0 200 36" preserveAspectRatio="none">
						<defs>
							<linearGradient id={`grad-${chartColor}`} x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor={chartColor} stopOpacity="0.25" />
								<stop offset="100%" stopColor={chartColor} stopOpacity="0" />
							</linearGradient>
						</defs>
						<path d={fillPath} fill={`url(#grad-${chartColor})`} />
						<path d={linePath} fill="none" stroke={chartColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			)}

			{/* 底部备注 */}
			{footer && <div className="rpc_metric_card_footer">{footer}</div>}
		</div>
	);
};

export default MetricCard;
