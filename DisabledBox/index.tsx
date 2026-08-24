import React, { ReactNode, CSSProperties } from 'react';
import { LockOutlined } from '../src/icons';
import './index.less';

export interface DisabledBoxProps {
	/** 内容节点（优先于 title） */
	children?: ReactNode;
	/** 标题文案（当无 children 时作为内容） */
	title?: ReactNode;
	/** 是否禁用，禁用时显示锁图标 + 文字置灰 + 拦截点击事件 */
	disabled?: boolean;
	/** 锁图标对齐方向：'left' 左侧，'right' 右侧，默认为 'left' */
	iconAlign?: 'left' | 'right';
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const DisabledBox: React.FC<DisabledBoxProps> = ({
	title,
	children,
	disabled = false,
	iconAlign = 'left',
	className = '',
	style,
}) => {
	const content = children ?? title;

	// 未禁用时原样渲染
	if (!disabled) {
		if (className || style) {
			return (
				<div className={className} style={style}>
					{content}
				</div>
			);
		}
		return <>{content}</>;
	}

	// disabled 时在捕获阶段阻止 click 事件传播
	const handleClickCapture = (e: React.MouseEvent) => {
		if (disabled) {
			e.stopPropagation();
			e.preventDefault();
		}
	};

	return (
		<div
			className={`disabled_box_container disabled_box_disabled ${className}`}
			style={style}
			onClickCapture={handleClickCapture}
		>
			{iconAlign === 'left' && <LockOutlined className="disabled_box_icon" />}
			<span className="disabled_box_title">{content}</span>
			{iconAlign === 'right' && <LockOutlined className="disabled_box_icon" />}
		</div>
	);
};

export default DisabledBox;
