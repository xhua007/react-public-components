import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useImperativeHandle,
	forwardRef,
	ReactNode,
	CSSProperties,
} from 'react';
import './index.less';

export interface CountUpProps {
	/** 起始数值，默认为 0 */
	start?: number;
	/** 目标数值 */
	end: number;
	/** 动画持续时间（秒），默认为 2 */
	duration?: number;
	/** 保留小数位数，默认为 0 */
	decimals?: number;
	/** 小数点符号，默认为 '.' */
	decimal?: string;
	/** 千分位分隔符，默认为 ','，若不显示可传空字符串 */
	separator?: string;
	/** 前缀字符或节点（如 '¥'、'$'） */
	prefix?: ReactNode;
	/** 后缀字符或节点（如 '%'、'件'） */
	suffix?: ReactNode;
	/** 是否启用缓动过渡，默认为 true */
	useEasing?: boolean;
	/** 是否自动开始动画，默认为 true */
	autoStart?: boolean;
	/** 动画完成回调 */
	onEnd?: () => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

export interface CountUpRef {
	/** 开始/重新播放动画 */
	start: () => void;
	/** 重置回起始值 */
	reset: () => void;
	/** 更新目标值并平滑过渡 */
	update: (newEnd: number) => void;
}

// 默认 EaseOutExpo 缓动函数
function easeOutExpo(t: number, b: number, c: number, d: number): number {
	return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024 / 1023 + b;
}

// 格式化数字字符串
function formatNumber(
	num: number,
	decimals: number,
	decimal: string,
	separator: string,
): string {
	const fixed = Math.abs(num).toFixed(decimals);
	const [intPart, decPart] = fixed.split('.');

	const formattedInt = separator
		? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
		: intPart;

	const sign = num < 0 ? '-' : '';
	return decPart !== undefined ? `${sign}${formattedInt}${decimal}${decPart}` : `${sign}${formattedInt}`;
}

const CountUp = forwardRef<CountUpRef, CountUpProps>(
	(
		{
			start = 0,
			end,
			duration = 2,
			decimals = 0,
			decimal = '.',
			separator = ',',
			prefix,
			suffix,
			useEasing = true,
			autoStart = true,
			onEnd,
			className = '',
			style,
		},
		ref,
	) => {
		const [displayValue, setDisplayValue] = useState<number>(start);
		const startValRef = useRef<number>(start);
		const endValRef = useRef<number>(end);
		const startTimeRef = useRef<number | null>(null);
		const rafIdRef = useRef<number | null>(null);

		const stopAnimation = () => {
			if (rafIdRef.current) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
		};

		const animate = useCallback(
			(timestamp: number) => {
				if (!startTimeRef.current) startTimeRef.current = timestamp;
				const progress = timestamp - startTimeRef.current;
				const totalDuration = Math.max(duration * 1000, 1);

				let currentVal: number;
				if (progress >= totalDuration) {
					currentVal = endValRef.current;
					setDisplayValue(currentVal);
					stopAnimation();
					onEnd?.();
					return;
				}

				if (useEasing) {
					currentVal = easeOutExpo(
						progress,
						startValRef.current,
						endValRef.current - startValRef.current,
						totalDuration,
					);
				} else {
					currentVal =
						startValRef.current +
						(endValRef.current - startValRef.current) * (progress / totalDuration);
				}

				setDisplayValue(currentVal);
				rafIdRef.current = requestAnimationFrame(animate);
			},
			[duration, useEasing, onEnd],
		);

		const triggerStart = useCallback(() => {
			stopAnimation();
			startTimeRef.current = null;
			rafIdRef.current = requestAnimationFrame(animate);
		}, [animate]);

		const reset = useCallback(() => {
			stopAnimation();
			setDisplayValue(start);
		}, [start]);

		const update = useCallback(
			(newEnd: number) => {
				stopAnimation();
				startValRef.current = displayValue;
				endValRef.current = newEnd;
				startTimeRef.current = null;
				rafIdRef.current = requestAnimationFrame(animate);
			},
			[displayValue, animate],
		);

		useImperativeHandle(
			ref,
			() => ({
				start: triggerStart,
				reset,
				update,
			}),
			[triggerStart, reset, update],
		);

		useEffect(() => {
			startValRef.current = start;
			endValRef.current = end;
			if (autoStart) {
				triggerStart();
			}
			return () => stopAnimation();
		}, [start, end, autoStart, triggerStart]);

		const formattedStr = formatNumber(displayValue, decimals, decimal, separator);

		return (
			<span className={`rpc_count_up ${className}`} style={style}>
				{prefix && <span className="rpc_count_up_prefix">{prefix}</span>}
				<span className="rpc_count_up_value">{formattedStr}</span>
				{suffix && <span className="rpc_count_up_suffix">{suffix}</span>}
			</span>
		);
	},
);

CountUp.displayName = 'CountUp';

export default CountUp;
