import React, { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import { LoadingOutlined } from '../src/icons';
import './index.less';

export interface CountdownButtonProps {
	/** 初始按钮文案，默认为 '获取验证码' */
	text?: ReactNode;
	/** 倒计时时长（秒），默认为 60 */
	seconds?: number;
	/** 倒计时中文案生成函数，默认为 (sec) => `${sec}s 后重试` */
	countdownText?: (secondsLeft: number) => ReactNode;
	/** 重置后的再次获取文案，默认使用 text */
	resetText?: ReactNode;
	/** 点击触发异步前置检查，返回 true 启动倒计时，返回 false 阻止，若抛错也自动恢复 */
	onBeforeStart?: () => Promise<boolean> | boolean;
	/** 倒计时结束回调 */
	onEnd?: () => void;
	/** 是否外部强行禁用 */
	disabled?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const CountdownButton: React.FC<CountdownButtonProps> = ({
	text = '获取验证码',
	seconds = 60,
	countdownText = (s) => `${s}s 后重新获取`,
	resetText,
	onBeforeStart,
	onEnd,
	disabled: controlledDisabled = false,
	className = '',
	style,
}) => {
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const isCounting = timeLeft > 0;

	useEffect(() => {
		if (isCounting) {
			timerRef.current = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						if (timerRef.current) clearInterval(timerRef.current);
						onEnd?.();
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isCounting, onEnd]);

	const handleClick = async () => {
		if (isCounting || loading || controlledDisabled) return;

		if (onBeforeStart) {
			try {
				setLoading(true);
				const ok = await onBeforeStart();
				setLoading(false);
				if (ok !== false) {
					setTimeLeft(seconds);
				}
			} catch (e) {
				setLoading(false);
			}
		} else {
			setTimeLeft(seconds);
		}
	};

	let btnContent: ReactNode = text;
	if (loading) {
		btnContent = (
			<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
				<LoadingOutlined />
				<span>发送中...</span>
			</span>
		);
	} else if (isCounting) {
		btnContent = countdownText(timeLeft);
	} else if (resetText && timeLeft === 0) {
		btnContent = resetText;
	}

	return (
		<button
			type="button"
			disabled={controlledDisabled || isCounting || loading}
			className={`rpc_countdown_btn ${loading ? 'rpc_countdown_btn_loading' : ''} ${className}`}
			style={style}
			onClick={handleClick}
		>
			{btnContent}
		</button>
	);
};

export default CountdownButton;
