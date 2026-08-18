import React, { useId, CSSProperties } from 'react';
import './index.less';

export interface MiniSparklineProps {
	/** 数值序列 */
	data: number[];
	/** 折线与填充主题色，默认为 '#1677ff' */
	color?: string;
	/** 是否展示面积渐变填充，默认为 true */
	fill?: boolean;
	/** 宽度（像素），默认为 80 */
	width?: number;
	/** 高度（像素），默认为 28 */
	height?: number;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const MiniSparkline: React.FC<MiniSparklineProps> = ({
	data = [],
	color = '#1677ff',
	fill = true,
	width = 80,
	height = 28,
	className = '',
	style,
}) => {
	const gradientId = useId();

	if (data.length < 2) return null;

	const min = Math.min(...data);
	const max = Math.max(...data);
	const range = max - min || 1;
	const padding = 2;

	const points = data.map((val, idx) => {
		const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
		const y = height - padding - ((val - min) / range) * (height - padding * 2);
		return { x, y };
	});

	const linePath = points.reduce((acc, pt, idx) => {
		return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
	}, '');

	const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

	return (
		<div className={`rpc_mini_sparkline ${className}`} style={style}>
			<svg width={width} height={height}>
				<defs>
					<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={color} stopOpacity="0.25" />
						<stop offset="100%" stopColor={color} stopOpacity="0.0" />
					</linearGradient>
				</defs>

				{fill && <path d={areaPath} fill={`url(#${gradientId})`} />}
				<path d={linePath} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
			</svg>
		</div>
	);
};

export default MiniSparkline;
