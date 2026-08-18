import React, { ReactNode, CSSProperties } from 'react';
import { CloseOutlined } from '../src/icons';
import './index.less';

export interface FloatingActionItem {
	key: string;
	label: ReactNode;
	icon?: ReactNode;
	type?: 'default' | 'primary' | 'danger';
	disabled?: boolean;
	onClick?: (e: React.MouseEvent) => void;
}

export interface FloatingActionBarProps {
	/** 是否显示悬浮操作栏（如传 selectedCount 时，默认 selectedCount > 0 自动显示） */
	open?: boolean;
	/** 当前选中的项目数 */
	selectedCount?: number;
	/** 总项目数（可选，如传则展示 '已选 X / 共 Y 项'） */
	totalCount?: number;
	/** 清空/取消全部选择的回调 */
	onClear?: () => void;
	/** 取消选择按钮文案，默认为 '取消选择' */
	clearText?: ReactNode;
	/** 批量操作按钮列表 */
	actions?: FloatingActionItem[];
	/** 自定义操作区内容插槽 */
	children?: ReactNode;
	/** 距离屏幕底部的偏移量（像素），默认为 28 */
	offsetBottom?: number;
	/** 是否支持右上角关闭按钮 */
	closable?: boolean;
	/** 关闭回调 */
	onClose?: () => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
	open,
	selectedCount,
	totalCount,
	onClear,
	clearText = '取消选择',
	actions = [],
	children,
	offsetBottom = 28,
	closable = false,
	onClose,
	className = '',
	style,
}) => {
	// 如果显式传了 open 则使用 open，否则根据 selectedCount > 0 自动判断
	const isVisible = open !== undefined ? open : selectedCount !== undefined ? selectedCount > 0 : true;

	const countText =
		totalCount !== undefined
			? `已选 ${selectedCount ?? 0} / 共 ${totalCount} 项`
			: `已选择 ${selectedCount ?? 0} 项`;

	return (
		<div
			className={`rpc_floating_action_bar ${isVisible ? 'rpc_floating_action_bar_visible' : ''} ${className}`}
			style={{
				bottom: `${offsetBottom}px`,
				...style,
			}}
		>
			{/* 选中统计与一键清空 */}
			{selectedCount !== undefined && (
				<div className="rpc_floating_action_bar_count_badge">
					<span>
						已选 <span className="rpc_floating_action_bar_count_number">{selectedCount}</span>
						{totalCount !== undefined ? ` / ${totalCount}` : ''} 项
					</span>
					{onClear && (
						<span className="rpc_floating_action_bar_clear_btn" onClick={onClear}>
							{clearText}
						</span>
					)}
				</div>
			)}

			{selectedCount !== undefined && (actions.length > 0 || children) && (
				<div className="rpc_floating_action_bar_divider" />
			)}

			{/* 批量操作按钮列表 */}
			<div className="rpc_floating_action_bar_actions">
				{actions.map((action) => {
					const btnClass = [
						'rpc_floating_action_bar_btn',
						action.type === 'primary' ? 'rpc_floating_action_bar_btn_primary' : '',
						action.type === 'danger' ? 'rpc_floating_action_bar_btn_danger' : '',
					]
						.filter(Boolean)
						.join(' ');

					return (
						<button
							key={action.key}
							type="button"
							className={btnClass}
							disabled={action.disabled}
							onClick={action.onClick}
						>
							{action.icon}
							<span>{action.label}</span>
						</button>
					);
				})}
				{children}
			</div>

			{/* 可选关闭按钮 */}
			{closable && (
				<CloseOutlined
					style={{ cursor: 'pointer', color: '#8c8c8c', fontSize: 13 }}
					onClick={onClose}
				/>
			)}
		</div>
	);
};

export default FloatingActionBar;
