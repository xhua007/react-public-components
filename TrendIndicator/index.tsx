import React, { CSSProperties } from 'react';
import './index.less';

export interface TrendIndicatorProps {
	/** 变动数值（如 14.2 代表 +14.2%，-5.8 代表 -5.8%） */
	value: number;
	/** 数值后缀，默认为 '%' */
	suffix?: string;
	/** 数值前缀 */
	prefix?: string;
	/** 保留小数位数，默认为 1 */
	precision?: number;
	/** 展示模式：'filled' 填充色块 | 'outlined' 线框 | 'text' 纯文字，默认为 'filled' */
	type?: 'filled' | 'outlined' | 'text';
	/** 是否反转红绿色彩规则（如成本/延时降低为绿色），默认为 false */
	reverse?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({
	value,
	suffix = '%',
	prefix = '',
	precision = 1,
	type = 'filled',
	reverse = false,
	className = '',
	style,
}) => {
	const isZero = Math.abs(value) < 0.0001;
	const isPositive = value > 0;

	// 判断颜色状态
	let statusClass = 'flat';
	if (!isZero) {
		const isGood = reverse ? !isPositive : isPositive;
		statusClass = isGood ? 'up' : 'down';
	}

	const formattedVal = Math.abs(value).toFixed(precision);
	const sign = isPositive ? '+' : value < 0 ? '-' : '';

	return (
		<span
			className={`rpc_trend_indicator rpc_trend_indicator_${type} rpc_trend_indicator_${statusClass} ${className}`}
			style={style}
		>
			<span className="rpc_trend_indicator_arrow">
				{isZero ? '—' : isPositive ? '▲' : '▼'}
			</span>
			<span>
				{prefix}
				{sign}
				{formattedVal}
				{suffix}
			</span>
		</span>
	);
};

export default TrendIndicator;
