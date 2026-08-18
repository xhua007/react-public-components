import React, { useRef, useEffect, useCallback, ReactNode, CSSProperties } from 'react';
import { LoadingOutlined } from '../src/icons';
import './index.less';

export interface InfiniteScrollListProps {
	/** 列表项子内容 */
	children: ReactNode;
	/** 是否还有更多数据可供加载 */
	hasMore: boolean;
	/** 当前是否正在加载下一页 */
	loading: boolean;
	/** 触底加载下一页回调 */
	onLoadMore: () => void | Promise<void>;
	/** 触发加载的触底距离阈值（像素），默认为 40 */
	threshold?: number;
	/** 没有更多数据时的底部提示内容，默认为 '已经到底啦 ~' */
	endMessage?: ReactNode;
	/** 加载中指示器组件，默认为 Spin 图标与 '正在加载更多...' */
	loadingIndicator?: ReactNode;
	/** 容器固定高度（传值时为局部滚动容器，不传时监听 window 全局滚动） */
	height?: number | string;
	/** 滚动容器 ref 或自定义对象 */
	scrollableTarget?: HTMLElement | (() => HTMLElement | null) | null;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const InfiniteScrollList: React.FC<InfiniteScrollListProps> = ({
	children,
	hasMore,
	loading,
	onLoadMore,
	threshold = 40,
	endMessage = '已经到底啦 ~',
	loadingIndicator,
	height,
	scrollableTarget,
	className = '',
	style,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const handleLoadMore = useCallback(() => {
		if (!loading && hasMore) {
			onLoadMore();
		}
	}, [loading, hasMore, onLoadMore]);

	// 使用 IntersectionObserver 监听底部哨兵元素
	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		const targetEl =
			typeof scrollableTarget === 'function'
				? scrollableTarget()
				: scrollableTarget || (height ? containerRef.current : null);

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					handleLoadMore();
				}
			},
			{
				root: targetEl || null,
				rootMargin: `0px 0px ${threshold}px 0px`,
				threshold: 0,
			},
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [height, scrollableTarget, threshold, handleLoadMore]);

	const defaultLoadingIndicator = (
		<div className="rpc_infinite_scroll_list_footer">
			<LoadingOutlined style={{ fontSize: 16, color: '#1677ff' }} />
			<span>正在加载更多数据...</span>
		</div>
	);

	const isLocalScroll = Boolean(height);

	return (
		<div
			ref={containerRef}
			className={`rpc_infinite_scroll_list ${
				isLocalScroll ? 'rpc_infinite_scroll_list_container' : ''
			} ${className}`}
			style={{
				height: height,
				...style,
			}}
		>
			{children}

			{/* 底部哨兵元素 */}
			<div ref={sentinelRef} style={{ height: 1, margin: 0, padding: 0 }} />

			{/* 底部状态提示 */}
			{loading && (loadingIndicator || defaultLoadingIndicator)}
			{!hasMore && endMessage && (
				<div className="rpc_infinite_scroll_list_footer rpc_infinite_scroll_list_end">
					{endMessage}
				</div>
			)}
		</div>
	);
};

export default InfiniteScrollList;
