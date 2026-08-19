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
import { FullscreenOutlined, FullscreenExitOutlined } from '../src/icons';
import './index.less';

export interface FullscreenRef {
	/** 进入全屏 */
	enter: () => Promise<void>;
	/** 退出全屏 */
	exit: () => Promise<void>;
	/** 切换全屏状态 */
	toggle: () => Promise<void>;
	/** 当前是否处于全屏状态 */
	isFullscreen: boolean;
	/** 当前目标容器 DOM 元素 */
	getElement: () => HTMLElement | null;
}

export type FullscreenMode = 'browser' | 'web';
export type FullscreenButtonPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface FullscreenRenderProps {
	isFullscreen: boolean;
	enter: () => Promise<void>;
	exit: () => Promise<void>;
	toggle: () => Promise<void>;
}

export interface FullscreenProps {
	/** 子元素或 Render Props 函数 */
	children?: ReactNode | ((props: FullscreenRenderProps) => ReactNode);
	/** 全屏模式：'browser' 原生浏览器全屏，'web' 网页内最大化置顶 */
	mode?: FullscreenMode;
	/** 自定义目标全屏元素（不传时默认为当前包裹的容器元素，传 document.documentElement 时为整页全屏） */
	target?: HTMLElement | (() => HTMLElement | null) | null;
	/** 受控全屏状态 */
	fullscreen?: boolean;
	/** 默认全屏状态 */
	defaultFullscreen?: boolean;
	/** 全屏状态变化回调 */
	onChange?: (isFullscreen: boolean) => void;
	/** 是否在容器角落展示快速全屏切换悬浮按钮，默认 false */
	showButton?: boolean;
	/** 悬浮按钮对齐位置，默认 'top-right' */
	buttonPosition?: FullscreenButtonPosition;
	/** 悬浮按钮的自定义 Tooltip 提示或图标 */
	enterIcon?: ReactNode;
	exitIcon?: ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const Fullscreen = forwardRef<FullscreenRef, FullscreenProps>(
	(
		{
			children,
			mode = 'browser',
			target,
			fullscreen: controlledFullscreen,
			defaultFullscreen = false,
			onChange,
			showButton = false,
			buttonPosition = 'top-right',
			enterIcon,
			exitIcon,
			className = '',
			style,
		},
		ref,
	) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const [internalFullscreen, setInternalFullscreen] = useState<boolean>(defaultFullscreen);
		const isControlled = controlledFullscreen !== undefined;
		const isFullscreen = isControlled ? controlledFullscreen : internalFullscreen;

		const getTargetElement = useCallback((): HTMLElement | null => {
			if (typeof target === 'function') {
				return target();
			}
			if (target) {
				return target;
			}
			return containerRef.current;
		}, [target]);

		// 进入全屏
		const enter = useCallback(async () => {
			const el = getTargetElement();
			if (!el) return;

			if (mode === 'browser') {
				if (el.requestFullscreen) {
					await el.requestFullscreen();
				} else if ((el as any).webkitRequestFullscreen) {
					await (el as any).webkitRequestFullscreen();
				} else if ((el as any).msRequestFullscreen) {
					await (el as any).msRequestFullscreen();
				}
			} else {
				if (!isControlled) {
					setInternalFullscreen(true);
				}
				onChange?.(true);
			}
		}, [mode, getTargetElement, isControlled, onChange]);

		// 退出全屏
		const exit = useCallback(async () => {
			if (mode === 'browser') {
				if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
					if (document.exitFullscreen) {
						await document.exitFullscreen();
					} else if ((document as any).webkitExitFullscreen) {
						await (document as any).webkitExitFullscreen();
					}
				}
			} else {
				if (!isControlled) {
					setInternalFullscreen(false);
				}
				onChange?.(false);
			}
		}, [mode, isControlled, onChange]);

		// 切换全屏
		const toggle = useCallback(async () => {
			if (isFullscreen) {
				await exit();
			} else {
				await enter();
			}
		}, [isFullscreen, enter, exit]);

		// 暴露 Imperative Ref
		useImperativeHandle(
			ref,
			() => ({
				enter,
				exit,
				toggle,
				isFullscreen,
				getElement: getTargetElement,
			}),
			[enter, exit, toggle, isFullscreen, getTargetElement],
		);

		// 监听浏览器原生全屏事件
		useEffect(() => {
			if (mode !== 'browser') return;

			const handleFullscreenChange = () => {
				const currentFsEl =
					document.fullscreenElement ||
					(document as any).webkitFullscreenElement ||
					(document as any).mozFullScreenElement ||
					(document as any).msFullscreenElement;

				const targetEl = getTargetElement();
				const isActive = currentFsEl !== null && (currentFsEl === targetEl || targetEl === document.documentElement);

				if (!isControlled) {
					setInternalFullscreen(isActive);
				}
				onChange?.(isActive);
			};

			document.addEventListener('fullscreenchange', handleFullscreenChange);
			document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
			document.addEventListener('mozfullscreenchange', handleFullscreenChange);
			document.addEventListener('MSFullscreenChange', handleFullscreenChange);

			return () => {
				document.removeEventListener('fullscreenchange', handleFullscreenChange);
				document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
				document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
				document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
			};
		}, [mode, getTargetElement, isControlled, onChange]);

		// Web 模拟全屏模式下的 ESC 监听
		useEffect(() => {
			if (mode !== 'web' || !isFullscreen) return;

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					exit();
				}
			};

			window.addEventListener('keydown', handleKeyDown);
			return () => {
				window.removeEventListener('keydown', handleKeyDown);
			};
		}, [mode, isFullscreen, exit]);

		const positionClass = `rpc_fullscreen_container_action_btn_${buttonPosition.replace('-', '_')}`;
		const isWebFsActive = mode === 'web' && isFullscreen;

		const currentEnterIcon = enterIcon ?? <FullscreenOutlined />;
		const currentExitIcon = exitIcon ?? <FullscreenExitOutlined />;

		return (
			<div
				ref={containerRef}
				className={`rpc_fullscreen_container ${
					isFullscreen ? 'rpc_fullscreen_container_fullscreen' : ''
				} ${isWebFsActive ? 'rpc_fullscreen_container_web_fullscreen' : ''} ${className}`}
				style={{
					...(isFullscreen ? { backgroundColor: '#ffffff' } : {}),
					...style,
				}}
			>
				{/* 右上角/指定角落的快捷切换按钮 */}
				{showButton && (
					<button
						type="button"
						className={`rpc_fullscreen_container_action_btn ${positionClass}`}
						onClick={toggle}
						title={isFullscreen ? '退出全屏 (ESC)' : '全屏显示'}
					>
						{isFullscreen ? currentExitIcon : currentEnterIcon}
					</button>
				)}

				{typeof children === 'function'
					? children({
							isFullscreen,
							enter,
							exit,
							toggle,
						})
					: children}
			</div>
		);
	},
);

Fullscreen.displayName = 'Fullscreen';

export default Fullscreen;
