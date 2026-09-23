import React, { useState, useEffect, ReactNode, CSSProperties } from 'react';
import { CloseOutlined } from '../src/icons';
import './index.less';

export type AnnouncementType = 'primary' | 'warning' | 'success' | 'danger' | 'purple';

export interface AnnouncementBarProps {
	/** 横幅广播内容 */
	children: ReactNode;
	/** 预设主题色系：'primary' | 'warning' | 'success' | 'danger' | 'purple' */
	type?: AnnouncementType;
	/** 自定义渐变或背景样式（传值时覆盖 type 预设） */
	background?: string;
	/** 自定义文字颜色 */
	color?: string;
	/** 是否开启智能吸顶 (position: sticky)，默认为 false */
	sticky?: boolean;
	/** 是否开启固定吸顶 (position: fixed)，默认为 false */
	fixed?: boolean;
	/** 吸顶时距离顶部的距离偏移（像素或 CSS 字符串），默认为 0 */
	top?: number | string;
	/** 图层层级 z-index，默认为 1000 */
	zIndex?: number;
	/** 是否支持点击关闭，默认为 true */
	closable?: boolean;
	/** 自定义关闭图标 */
	closeIcon?: ReactNode;
	/** LocalStorage 记忆 Key（若传入则关闭后自动持久化记忆，不再重复弹出） */
	storageKey?: string;
	/** 内容过长时是否开启跑马灯无缝水平滚动，默认为 false */
	marquee?: boolean;
	/** 关闭时的回调函数 */
	onClose?: () => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
	children,
	type = 'primary',
	background,
	color,
	sticky = false,
	fixed = false,
	top = 0,
	zIndex = 1000,
	closable = true,
	closeIcon,
	storageKey,
	marquee = false,
	onClose,
	className = '',
	style,
}) => {
	const [visible, setVisible] = useState<boolean>(() => {
		if (typeof window !== 'undefined' && storageKey) {
			try {
				return localStorage.getItem(`rpc_announcement_${storageKey}`) !== 'closed';
			} catch {
				return true;
			}
		}
		return true;
	});

	const [isClosing, setIsClosing] = useState<boolean>(false);

	if (!visible) return null;

	const handleClose = () => {
		setIsClosing(true);

		if (storageKey && typeof window !== 'undefined') {
			try {
				localStorage.setItem(`rpc_announcement_${storageKey}`, 'closed');
			} catch {
				// ignore
			}
		}

		setTimeout(() => {
			setVisible(false);
			onClose?.();
		}, 250);
	};

	const positionStyle: CSSProperties = {};
	if (fixed) {
		positionStyle.position = 'fixed';
		positionStyle.top = top;
		positionStyle.left = 0;
		positionStyle.right = 0;
		positionStyle.zIndex = zIndex;
	} else if (sticky) {
		positionStyle.position = 'sticky';
		positionStyle.top = top;
		positionStyle.zIndex = zIndex;
	}

	return (
		<div
			className={`rpc_announcement_bar rpc_announcement_bar_${type} ${
				sticky ? 'rpc_announcement_bar_sticky' : ''
			} ${fixed ? 'rpc_announcement_bar_fixed' : ''} ${
				isClosing ? 'rpc_announcement_bar_closing' : ''
			} ${className}`}
			style={{
				background: background || undefined,
				color: color || undefined,
				...positionStyle,
				...style,
			}}
		>
			<div className="rpc_announcement_bar_body">
				<div
					className={`rpc_announcement_bar_content ${marquee ? 'rpc_announcement_bar_marquee' : ''}`}
				>
					{children}
				</div>
			</div>

			{closable && (
				<button
					type="button"
					className="rpc_announcement_bar_close"
					onClick={handleClose}
					title="关闭通知"
				>
					{closeIcon || <CloseOutlined style={{ fontSize: 13 }} />}
				</button>
			)}
		</div>
	);
};

export default AnnouncementBar;
