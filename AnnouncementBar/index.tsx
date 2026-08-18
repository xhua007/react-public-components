import React, { useState, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface AnnouncementBarProps {
	/** 横幅广播内容 */
	children: ReactNode;
	/** 是否支持点击关闭，默认为 true */
	closable?: boolean;
	/** 自定义渐变或背景样式 */
	background?: string;
	/** 关闭回调 */
	onClose?: () => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
	children,
	closable = true,
	background,
	onClose,
	className = '',
	style,
}) => {
	const [visible, setVisible] = useState<boolean>(true);

	if (!visible) return null;

	const handleClose = () => {
		setVisible(false);
		onClose?.();
	};

	return (
		<div
			className={`rpc_announcement_bar ${className}`}
			style={{ background: background || undefined, ...style }}
		>
			<div className="rpc_announcement_bar_content">{children}</div>

			{closable && (
				<button
					type="button"
					className="rpc_announcement_bar_close"
					onClick={handleClose}
					title="关闭通知"
				>
					✕
				</button>
			)}
		</div>
	);
};

export default AnnouncementBar;
