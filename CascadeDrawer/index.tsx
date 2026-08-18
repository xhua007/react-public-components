import React, { useState, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface CascadeLevel {
	id: string;
	title: string;
	content: ReactNode;
}

export interface CascadeDrawerProps {
	/** 是否打开抽屉 */
	open: boolean;
	/** 关闭抽屉回调 */
	onClose: () => void;
	/** 初始根层级 */
	rootLevel: CascadeLevel;
	/** 抽屉宽度，默认为 440 */
	width?: number | string;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const CascadeDrawer: React.FC<CascadeDrawerProps> = ({
	open,
	onClose,
	rootLevel,
	width = 440,
	className = '',
	style,
}) => {
	const [stack, setStack] = useState<CascadeLevel[]>([rootLevel]);

	if (!open) return null;

	const currentLevel = stack[stack.length - 1] || rootLevel;

	const pushLevel = (level: CascadeLevel) => {
		setStack((prev) => [...prev, level]);
	};

	const popTo = (index: number) => {
		setStack((prev) => prev.slice(0, index + 1));
	};

	return (
		<div className={`rpc_cascade_drawer ${className}`} style={style}>
			<div className="rpc_cascade_drawer_mask" onClick={onClose} />

			<div className="rpc_cascade_drawer_content" style={{ width }}>
				{/* 顶部面包屑导航 */}
				<div className="rpc_cascade_drawer_header">
					<div className="rpc_cascade_drawer_breadcrumbs">
						{stack.map((item, idx) => {
							const isLast = idx === stack.length - 1;
							return (
								<React.Fragment key={item.id}>
									{idx > 0 && <span style={{ color: '#bfbfbf' }}>/</span>}
									{isLast ? (
										<span>{item.title}</span>
									) : (
										<button
											type="button"
											className="rpc_cascade_drawer_crumb_btn"
											onClick={() => popTo(idx)}
										>
											{item.title}
										</button>
									)}
								</React.Fragment>
							);
						})}
					</div>

					<button type="button" className="rpc_cascade_drawer_close_btn" onClick={onClose}>
						✕
					</button>
				</div>

				{/* 当前层级内容 */}
				<div className="rpc_cascade_drawer_body">
					{typeof currentLevel.content === 'function'
						? (currentLevel.content as any)(pushLevel)
						: currentLevel.content}
				</div>
			</div>
		</div>
	);
};

export default CascadeDrawer;
