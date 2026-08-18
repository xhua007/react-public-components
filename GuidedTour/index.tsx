import React, { useState, useEffect, ReactNode, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { CloseOutlined } from '../src/icons';
import './index.less';

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TourStep {
	/** 目标 DOM 节点选择器、DOM 对象或获取函数 */
	target: string | HTMLElement | (() => HTMLElement | null) | null;
	/** 引导步骤标题 */
	title: ReactNode;
	/** 引导步骤详细说明 */
	description: ReactNode;
	/** 气泡对齐方向，默认为 'bottom' */
	placement?: TourPlacement;
}

export interface GuidedTourProps {
	/** 引导步骤列表 */
	steps: TourStep[];
	/** 是否开启引导 */
	open: boolean;
	/** 当前步数（受控，可选） */
	current?: number;
	/** 步数改变回调 */
	onChange?: (current: number) => void;
	/** 关闭/跳过引导回调 */
	onClose?: () => void;
	/** 全部引导完成回调 */
	onFinish?: () => void;
	/** LocalStorage 存储已完成状态的 Key（若提供则完成或跳过后自动持久化记录） */
	storageKey?: string;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const GuidedTour: React.FC<GuidedTourProps> = ({
	steps = [],
	open,
	current: controlledCurrent,
	onChange,
	onClose,
	onFinish,
	storageKey,
	className = '',
	style,
}) => {
	const [internalCurrent, setInternalCurrent] = useState<number>(0);
	const currentStepIndex = controlledCurrent !== undefined ? controlledCurrent : internalCurrent;

	const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

	// 获取当前步骤的目标 DOM
	const getTargetElement = (step: TourStep): HTMLElement | null => {
		if (!step || !step.target) return null;
		if (typeof step.target === 'function') {
			return step.target();
		}
		if (typeof step.target === 'string') {
			return document.querySelector(step.target);
		}
		return step.target;
	};

	// 计算目标节点坐标
	useEffect(() => {
		if (!open || steps.length === 0) return;

		const currentStep = steps[currentStepIndex];
		if (!currentStep) return;

		const el = getTargetElement(currentStep);
		if (el) {
			const rect = el.getBoundingClientRect();
			setTargetRect(rect);
			// 自动平滑滚动到可见区域
			el.scrollIntoView({ behavior: 'smooth', block: 'center' });
		} else {
			setTargetRect(null);
		}
	}, [open, steps, currentStepIndex]);

	if (!open || steps.length === 0) return null;

	const currentStep = steps[currentStepIndex];
	if (!currentStep) return null;

	const handleNext = () => {
		if (currentStepIndex < steps.length - 1) {
			const next = currentStepIndex + 1;
			if (controlledCurrent === undefined) setInternalCurrent(next);
			onChange?.(next);
		} else {
			if (storageKey) localStorage.setItem(storageKey, 'true');
			onFinish?.();
			onClose?.();
		}
	};

	const handlePrev = () => {
		if (currentStepIndex > 0) {
			const prev = currentStepIndex - 1;
			if (controlledCurrent === undefined) setInternalCurrent(prev);
			onChange?.(prev);
		}
	};

	const handleSkip = () => {
		if (storageKey) localStorage.setItem(storageKey, 'true');
		onClose?.();
	};

	// 气泡卡片定位计算
	let popoverTop = 100;
	let popoverLeft = 100;

	if (targetRect) {
		const placement = currentStep.placement || 'bottom';
		const padding = 12;

		if (placement === 'bottom') {
			popoverTop = targetRect.bottom + padding;
			popoverLeft = targetRect.left;
		} else if (placement === 'top') {
			popoverTop = targetRect.top - 180 - padding;
			popoverLeft = targetRect.left;
		} else if (placement === 'left') {
			popoverTop = targetRect.top;
			popoverLeft = targetRect.left - 320 - padding;
		} else if (placement === 'right') {
			popoverTop = targetRect.top;
			popoverLeft = targetRect.right + padding;
		}

		// 视口防溢出修正
		popoverLeft = Math.max(16, Math.min(window.innerWidth - 340, popoverLeft));
		popoverTop = Math.max(16, Math.min(window.innerHeight - 200, popoverTop));
	}

	return ReactDOM.createPortal(
		<div className={`rpc_guided_tour ${className}`} style={style}>
			{/* 镂空高亮遮罩层 */}
			{targetRect && (
				<div
					className="rpc_guided_tour_highlight_box"
					style={{
						left: `${targetRect.left - 4}px`,
						top: `${targetRect.top - 4}px`,
						width: `${targetRect.width + 8}px`,
						height: `${targetRect.height + 8}px`,
					}}
				/>
			)}

			{/* 引导卡片 */}
			<div
				className="rpc_guided_tour_popover"
				style={{
					left: `${popoverLeft}px`,
					top: `${popoverTop}px`,
				}}
			>
				<div className="rpc_guided_tour_header">
					<span className="rpc_guided_tour_title">{currentStep.title}</span>
					<CloseOutlined
						style={{ cursor: 'pointer', color: '#8c8c8c' }}
						onClick={handleSkip}
					/>
				</div>

				<div className="rpc_guided_tour_description">{currentStep.description}</div>

				<div className="rpc_guided_tour_footer">
					<span className="rpc_guided_tour_progress">
						{currentStepIndex + 1} / {steps.length}
					</span>

					<div className="rpc_guided_tour_actions">
						{currentStepIndex > 0 && (
							<button type="button" className="rpc_guided_tour_btn" onClick={handlePrev}>
								上一步
							</button>
						)}
						<button
							type="button"
							className="rpc_guided_tour_btn rpc_guided_tour_btn_primary"
							onClick={handleNext}
						>
							{currentStepIndex === steps.length - 1 ? '完成' : '下一步'}
						</button>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	);
};

export default GuidedTour;
