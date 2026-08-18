import React, { useState, CSSProperties } from 'react';
import './index.less';

export type DateShortcutKey = 'today' | 'yesterday' | '7days' | '30days' | 'thisMonth' | 'lastMonth';

export interface ShortcutItem {
	key: string;
	label: string;
	calc: () => [string, string];
}

export interface QuickDateRangeProps {
	/** 当前选中项的 key（受控） */
	activeKey?: string;
	/** 默认选中的 key，默认为 '7days' */
	defaultKey?: string;
	/** 切换回调 */
	onChange?: (dateRange: [string, string], key: string) => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

function formatDate(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

const defaultShortcuts: ShortcutItem[] = [
	{
		key: 'today',
		label: '今日',
		calc: () => {
			const now = formatDate(new Date());
			return [now, now];
		},
	},
	{
		key: 'yesterday',
		label: '昨日',
		calc: () => {
			const d = new Date();
			d.setDate(d.getDate() - 1);
			const yStr = formatDate(d);
			return [yStr, yStr];
		},
	},
	{
		key: '7days',
		label: '近7天',
		calc: () => {
			const end = new Date();
			const start = new Date();
			start.setDate(start.getDate() - 6);
			return [formatDate(start), formatDate(end)];
		},
	},
	{
		key: '30days',
		label: '近30天',
		calc: () => {
			const end = new Date();
			const start = new Date();
			start.setDate(start.getDate() - 29);
			return [formatDate(start), formatDate(end)];
		},
	},
	{
		key: 'thisMonth',
		label: '本月',
		calc: () => {
			const now = new Date();
			const start = new Date(now.getFullYear(), now.getMonth(), 1);
			return [formatDate(start), formatDate(now)];
		},
	},
	{
		key: 'lastMonth',
		label: '上月',
		calc: () => {
			const now = new Date();
			const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			const end = new Date(now.getFullYear(), now.getMonth(), 0);
			return [formatDate(start), formatDate(end)];
		},
	},
];

const QuickDateRange: React.FC<QuickDateRangeProps> = ({
	activeKey: controlledKey,
	defaultKey = '7days',
	onChange,
	className = '',
	style,
}) => {
	const [internalKey, setInternalKey] = useState<string>(defaultKey);
	const currentKey = controlledKey !== undefined ? controlledKey : internalKey;

	const handleClick = (item: ShortcutItem) => {
		if (controlledKey === undefined) setInternalKey(item.key);
		const range = item.calc();
		onChange?.(range, item.key);
	};

	return (
		<div className={`rpc_quick_date_range ${className}`} style={style}>
			{defaultShortcuts.map((item) => {
				const isActive = currentKey === item.key;

				return (
					<span
						key={item.key}
						className={`rpc_quick_date_range_pill ${
							isActive ? 'rpc_quick_date_range_pill_active' : ''
						}`}
						onClick={() => handleClick(item)}
					>
						{item.label}
					</span>
				);
			})}
		</div>
	);
};

export default QuickDateRange;
