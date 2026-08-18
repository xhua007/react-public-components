import React, { ReactNode, CSSProperties } from 'react';
import './index.less';

export type SkeletonType = 'text' | 'card' | 'list' | 'avatar';

export interface ShimmerSkeletonProps {
	/** 骨架类型：'text' 文本，'card' 卡片，'list' 列表，'avatar' 头像，默认为 'card' */
	type?: SkeletonType;
	/** 文本骨架行数，默认为 3 */
	rows?: number;
	/** 是否处于加载中状态，为 false 时渲染 children，默认为 true */
	loading?: boolean;
	/** 加载完成后的子元素内容 */
	children?: ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const ShimmerSkeleton: React.FC<ShimmerSkeletonProps> = ({
	type = 'card',
	rows = 3,
	loading = true,
	children,
	className = '',
	style,
}) => {
	if (!loading && children) {
		return <>{children}</>;
	}

	return (
		<div className={`rpc_shimmer_skeleton ${className}`} style={style}>
			{type === 'avatar' && <div className="rpc_shimmer_skeleton_avatar" />}

			{type === 'text' && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
					{Array.from({ length: rows }).map((_, i) => (
						<div
							key={i}
							className="rpc_shimmer_skeleton_bar"
							style={{
								height: 16,
								width: i === rows - 1 ? '60%' : '100%',
							}}
						/>
					))}
				</div>
			)}

			{type === 'card' && (
				<div className="rpc_shimmer_skeleton_card">
					<div className="rpc_shimmer_skeleton_bar" style={{ height: 160, width: '100%' }} />
					<div className="rpc_shimmer_skeleton_bar" style={{ height: 20, width: '70%' }} />
					<div className="rpc_shimmer_skeleton_bar" style={{ height: 14, width: '90%' }} />
					<div className="rpc_shimmer_skeleton_bar" style={{ height: 14, width: '40%' }} />
				</div>
			)}

			{type === 'list' && (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{Array.from({ length: rows }).map((_, i) => (
						<div key={i} className="rpc_shimmer_skeleton_list_item">
							<div className="rpc_shimmer_skeleton_avatar" style={{ width: 40, height: 40 }} />
							<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
								<div className="rpc_shimmer_skeleton_bar" style={{ height: 16, width: '50%' }} />
								<div className="rpc_shimmer_skeleton_bar" style={{ height: 12, width: '80%' }} />
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ShimmerSkeleton;
