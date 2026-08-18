import React, { useState, useRef, useMemo, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface VirtualListProps<T> {
	/** 数据源数组 */
	items: T[];
	/** 单个列表项固定高度（像素），默认为 48 */
	itemHeight?: number;
	/** 滚动容器可视高度（像素），默认为 360 */
	height?: number;
	/** 自定义渲染单个列表项 */
	renderItem: (item: T, index: number) => ReactNode;
	/** 提取唯一 Key */
	keyExtractor?: (item: T, index: number) => string | number;
	/** 上下视口外额外渲染的缓冲项数量，默认为 5 */
	buffer?: number;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

function VirtualList<T>({
	items = [],
	itemHeight = 48,
	height = 360,
	renderItem,
	keyExtractor,
	buffer = 5,
	className = '',
	style,
}: VirtualListProps<T>) {
	const [scrollTop, setScrollTop] = useState<number>(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const totalCount = items.length;
	const totalHeight = totalCount * itemHeight;

	// 计算当前可视区域的起止索引
	const { startIndex, endIndex, offsetY } = useMemo(() => {
		const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
		const visibleCount = Math.ceil(height / itemHeight);
		const end = Math.min(totalCount, start + visibleCount + buffer * 2);
		const offset = start * itemHeight;

		return { startIndex: start, endIndex: end, offsetY: offset };
	}, [scrollTop, itemHeight, height, buffer, totalCount]);

	const visibleItems = items.slice(startIndex, endIndex);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		setScrollTop(e.currentTarget.scrollTop);
	};

	return (
		<div
			ref={containerRef}
			onScroll={handleScroll}
			className={`rpc_virtual_list ${className}`}
			style={{ height, ...style }}
		>
			<div
				className="rpc_virtual_list_content"
				style={{
					height: totalHeight,
					paddingTop: offsetY,
				}}
			>
				{visibleItems.map((item, idx) => {
					const actualIndex = startIndex + idx;
					const key = keyExtractor ? keyExtractor(item, actualIndex) : actualIndex;

					return (
						<div
							key={key}
							className="rpc_virtual_list_item"
							style={{ height: itemHeight }}
						>
							{renderItem(item, actualIndex)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default VirtualList;
