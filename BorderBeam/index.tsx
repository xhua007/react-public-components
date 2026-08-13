import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './index.less';

export type BorderBeamColorStop = {
	color: string;
	percent: number;
};

export interface BorderBeamProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
	/** 装饰内容 */
	children?: ReactNode;
	/** 流光颜色配置，支持单色字符串或渐变停靠点数组 */
	color?: string | BorderBeamColorStop[];
	/** 流光数量，默认为 1 */
	count?: number;
	/** 流光完成一圈动画的时间，单位秒，默认为 6 */
	duration?: number;
	/** 流光线宽，数字类型按像素处理，默认为 1px */
	lineWidth?: number | string;
	/** 流光层相对容器边缘的外扩距离，遇到裁剪容器时可设为 0 */
	outset?: number | string;
	/** 流光可见段的尺寸，数字类型按像素处理，默认为 100 */
	size?: number | string;
}

const formatSizeUnit = (value: number | string | undefined, defaultValue: string): string => {
	if (value === undefined || value === null) {
		return defaultValue;
	}
	if (typeof value === 'number') {
		return `${value}px`;
	}
	return value;
};

const buildGradientString = (color?: string | BorderBeamColorStop[]): string => {
	if (!color) {
		return 'linear-gradient(to left, #1677ff 0%, transparent 100%)';
	}
	if (typeof color === 'string') {
		return `linear-gradient(to left, ${color} 0%, transparent 100%)`;
	}
	if (Array.isArray(color)) {
		if (color.length === 0) {
			return 'linear-gradient(to left, #1677ff 0%, transparent 100%)';
		}
		const sorted = [...color].sort((a, b) => a.percent - b.percent);
		const mappedStops = sorted.map((stop) => {
			const mappedPercent = Math.min(Math.max((stop.percent / 100) * 80, 0), 80);
			return `${stop.color} ${mappedPercent.toFixed(2)}%`;
		});
		return `linear-gradient(to left, ${mappedStops.join(', ')}, transparent 100%)`;
	}
	return 'linear-gradient(to left, #1677ff 0%, transparent 100%)';
};

const BorderBeam = (props: BorderBeamProps) => {
	const {
		children,
		color,
		count = 1,
		duration = 6,
		lineWidth = '1px',
		outset = '0px',
		size = 100,
		className,
		style,
		...restProps
	} = props;

	const formattedLineWidth = formatSizeUnit(lineWidth, '1px');
	const formattedOutset = formatSizeUnit(outset, '0px');
	const formattedSize = formatSizeUnit(size, '100px');
	const gradientCss = buildGradientString(color);

	const maskStyle: CSSProperties = {
		'--border-beam-line-width': formattedLineWidth,
		'--border-beam-outset': formattedOutset,
		'--border-beam-size': formattedSize,
		'--border-beam-duration': `${duration}s`,
		'--border-beam-gradient': gradientCss,
	} as CSSProperties;

	const beamCount = Math.max(1, count);
	const beams = Array.from({ length: beamCount }).map((_, index) => {
		const delaySeconds = -((duration * index) / beamCount);
		return (
			<div
				key={index}
				className="react-public-border-beam-item"
				style={{
					animationDelay: `${delaySeconds}s`,
				}}
			/>
		);
	});

	if (children !== undefined) {
		return (
			<div
				className={`react-public-border-beam-container ${className || ''}`.trim()}
				style={style}
				{...restProps}
			>
				{children}
				<div className="react-public-border-beam-mask" style={maskStyle}>
					{beams}
				</div>
			</div>
		);
	}

	return (
		<div
			className={`react-public-border-beam-mask ${className || ''}`.trim()}
			style={{
				...maskStyle,
				...style,
			}}
			{...restProps}
		>
			{beams}
		</div>
	);
};

export default BorderBeam;
