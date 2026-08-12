import type { ReactNode } from 'react';
import { LockOutlined } from '../src/icons';
import './index.less';

export interface DisabledBoxProps {
	title?: ReactNode;
	children?: ReactNode;
	// 是否禁用，禁用时显示锁图标 + 文字灰色 + 不可点击
	disabled?: boolean;
	// 锁图标对齐方向
	iconAlign?: 'left' | 'right';
}

const DisabledBox = (props: DisabledBoxProps) => {
	const { title, children, disabled = false, iconAlign = 'left' } = props;
	const content = children ?? title;

	// 未禁用时原样渲染，不加锁
	if (!disabled) {
		return <>{content}</>;
	}

	// disabled 时用div渲染，样式模拟disabled效果
	// 在捕获阶段阻止click事件传播，既防止内部点击事件触发，也阻止冒泡到父组件
	// 不阻止mouseenter/mouseleave等hover事件，保证Tooltip正常显示
	const handleClickCapture = (e: React.MouseEvent) => {
		if (disabled) {
			e.stopPropagation();
			e.preventDefault();
		}
	};

	return (
		<div
			className="disabled_box_container disabled_box_disabled"
			onClickCapture={handleClickCapture}
		>
			{iconAlign === 'left' && <LockOutlined className="disabled_box_icon" />}
			<span className="disabled_box_title">{content}</span>
			{iconAlign === 'right' && <LockOutlined className="disabled_box_icon" />}
		</div>
	);
};

export default DisabledBox;
