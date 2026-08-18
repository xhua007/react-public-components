import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { RightOutlined } from '../src/icons';
import './index.less';

export interface ContextMenuItem {
	/** 菜单项唯一标识 */
	key: string;
	/** 菜单项展示文本或节点 */
	label?: ReactNode;
	/** 菜单项前置图标 */
	icon?: ReactNode;
	/** 是否为分割线 */
	type?: 'divider';
	/** 是否禁用 */
	disabled?: boolean;
	/** 是否为警示/危险操作（红色显示） */
	danger?: boolean;
	/** 快捷键提示（如 '⌘ C' / 'Ctrl+C'） */
	shortcut?: string;
	/** 二级子菜单项列表 */
	children?: ContextMenuItem[];
	/** 点击菜单项回调 */
	onClick?: (item: ContextMenuItem, e: React.MouseEvent) => void;
}

export interface ContextMenuProps {
	/** 菜单项列表配置 */
	items: ContextMenuItem[];
	/** 被右键激活的目标子组件/容器 */
	children: ReactNode;
	/** 是否禁用右键上下文菜单 */
	disabled?: boolean;
	/** 菜单显隐状态改变回调 */
	onOpenChange?: (open: boolean) => void;
	/** 自定义菜单类名 */
	menuClassName?: string;
	/** 自定义菜单样式 */
	menuStyle?: CSSProperties;
	/** 自定义外层包裹类名 */
	className?: string;
	/** 自定义外层包裹样式 */
	style?: CSSProperties;
}

interface Position {
	x: number;
	y: number;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
	items,
	children,
	disabled = false,
	onOpenChange,
	menuClassName = '',
	menuStyle,
	className = '',
	style,
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const menuRef = useRef<HTMLDivElement>(null);

	const handleContextMenu = (e: React.MouseEvent) => {
		if (disabled) return;
		e.preventDefault();
		e.stopPropagation();

		const mouseX = e.clientX;
		const mouseY = e.clientY;

		// 初始设置位置
		setPosition({ x: mouseX, y: mouseY });
		setVisible(true);
		onOpenChange?.(true);
	};

	// 菜单渲染后自适应调整边界，防止溢出视口
	useEffect(() => {
		if (!visible || !menuRef.current) return;
		const menuEl = menuRef.current;
		const rect = menuEl.getBoundingClientRect();

		let adjustedX = position.x;
		let adjustedY = position.y;

		// 水平防溢出
		if (position.x + rect.width > window.innerWidth) {
			adjustedX = window.innerWidth - rect.width - 8;
		}

		// 垂直防溢出
		if (position.y + rect.height > window.innerHeight) {
			adjustedY = window.innerHeight - rect.height - 8;
		}

		if (adjustedX !== position.x || adjustedY !== position.y) {
			setPosition({ x: Math.max(8, adjustedX), y: Math.max(8, adjustedY) });
		}
	}, [visible]);

	// 点击外部、按 ESC、页面滚动时关闭菜单
	useEffect(() => {
		if (!visible) return;

		const handleClose = (e: MouseEvent | KeyboardEvent) => {
			if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
			setVisible(false);
			onOpenChange?.(false);
		};

		const handleScroll = () => {
			setVisible(false);
			onOpenChange?.(false);
		};

		document.addEventListener('mousedown', handleClose);
		document.addEventListener('keydown', handleClose);
		window.addEventListener('scroll', handleScroll, true);

		return () => {
			document.removeEventListener('mousedown', handleClose);
			document.removeEventListener('keydown', handleClose);
			window.removeEventListener('scroll', handleScroll, true);
		};
	}, [visible, onOpenChange]);

	// 渲染菜单项（递归支持二级子菜单）
	const renderMenuItem = (item: ContextMenuItem) => {
		if (item.type === 'divider') {
			return <div key={item.key} className="rpc_context_menu_divider" />;
		}

		const hasSub = item.children && item.children.length > 0;

		const handleItemClick = (e: React.MouseEvent) => {
			if (item.disabled || hasSub) return;
			e.stopPropagation();
			item.onClick?.(item, e);
			setVisible(false);
			onOpenChange?.(false);
		};

		const itemClassNames = [
			'rpc_context_menu_item',
			item.danger ? 'rpc_context_menu_item_danger' : '',
			item.disabled ? 'rpc_context_menu_item_disabled' : '',
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div key={item.key} className={itemClassNames} onClick={handleItemClick}>
				{item.icon && <span className="rpc_context_menu_item_icon">{item.icon}</span>}
				<span className="rpc_context_menu_item_label">{item.label}</span>
				{item.shortcut && <span className="rpc_context_menu_item_shortcut">{item.shortcut}</span>}
				{hasSub && <RightOutlined className="rpc_context_menu_item_arrow" />}

				{/* 二级子菜单 */}
				{hasSub && (
					<div className="rpc_context_menu_submenu">
						{item.children!.map((sub) => renderMenuItem(sub))}
					</div>
				)}
			</div>
		);
	};

	const menuContent = visible && typeof document !== 'undefined' ? (
		ReactDOM.createPortal(
			<div
				ref={menuRef}
				className={`rpc_context_menu_panel ${menuClassName}`}
				style={{
					left: `${position.x}px`,
					top: `${position.y}px`,
					...menuStyle,
				}}
				onContextMenu={(e) => e.preventDefault()}
			>
				{items.map((item) => renderMenuItem(item))}
			</div>,
			document.body,
		)
	) : null;

	return (
		<div
			className={`rpc_context_menu ${className}`}
			style={style}
			onContextMenu={handleContextMenu}
		>
			{children}
			{menuContent}
		</div>
	);
};

export default ContextMenu;
