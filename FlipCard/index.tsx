import React, { useState, ReactNode, CSSProperties } from 'react';
import './index.less';

export type FlipTrigger = 'hover' | 'click';
export type FlipDirection = 'horizontal' | 'vertical';

export interface FlipCardProps {
	/** 卡片正面内容 */
	front: ReactNode;
	/** 卡片背面内容 */
	back: ReactNode;
	/** 触发翻转方式：'hover' 悬停，'click' 点击，默认为 'hover' */
	trigger?: FlipTrigger;
	/** 翻转方向：'horizontal' 水平，'vertical' 垂直，默认为 'horizontal' */
	direction?: FlipDirection;
	/** 当前是否翻转到背面（受控） */
	flipped?: boolean;
	/** 翻转状态改变回调 */
	onFlip?: (isFlipped: boolean) => void;
	/** 宽度，默认为 300 */
	width?: number | string;
	/** 高度，默认为 200 */
	height?: number | string;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const FlipCard: React.FC<FlipCardProps> = ({
	front,
	back,
	trigger = 'hover',
	direction = 'horizontal',
	flipped: controlledFlipped,
	onFlip,
	width = 300,
	height = 200,
	className = '',
	style,
}) => {
	const [internalFlipped, setInternalFlipped] = useState<boolean>(false);
	const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;

	const handleMouseEnter = () => {
		if (trigger === 'hover') {
			if (controlledFlipped === undefined) setInternalFlipped(true);
			onFlip?.(true);
		}
	};

	const handleMouseLeave = () => {
		if (trigger === 'hover') {
			if (controlledFlipped === undefined) setInternalFlipped(false);
			onFlip?.(false);
		}
	};

	const handleClick = () => {
		if (trigger === 'click') {
			const next = !isFlipped;
			if (controlledFlipped === undefined) setInternalFlipped(next);
			onFlip?.(next);
		}
	};

	return (
		<div
			className={`rpc_flip_card ${className}`}
			style={{ width, height, ...style }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
		>
			<div
				className={`rpc_flip_card_inner ${
					isFlipped
						? direction === 'vertical'
							? 'rpc_flip_card_flipped_vertical'
							: 'rpc_flip_card_flipped_horizontal'
						: ''
				}`}
			>
				<div className="rpc_flip_card_front">{front}</div>
				<div
					className={`rpc_flip_card_back ${
						direction === 'vertical'
							? 'rpc_flip_card_back_vertical'
							: 'rpc_flip_card_back_horizontal'
					}`}
				>
					{back}
				</div>
			</div>
		</div>
	);
};

export default FlipCard;
