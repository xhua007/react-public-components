import React, { useMemo, CSSProperties } from 'react';
import './index.less';

export interface JsonDiffViewerProps {
	/** 变更前原始 JSON 对象 */
	before: Record<string, any>;
	/** 变更后最新 JSON 对象 */
	after: Record<string, any>;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

type DiffType = 'added' | 'removed' | 'modified' | 'unchanged';

interface DiffRow {
	key: string;
	type: DiffType;
	oldVal?: any;
	newVal?: any;
}

const JsonDiffViewer: React.FC<JsonDiffViewerProps> = ({
	before = {},
	after = {},
	className = '',
	style,
}) => {
	const diffRows = useMemo(() => {
		const rows: DiffRow[] = [];
		const allKeys = Array.from(new Set([...Object.keys(before), ...Object.keys(after)]));

		allKeys.forEach((key) => {
			const hasBefore = key in before;
			const hasAfter = key in after;

			if (!hasBefore && hasAfter) {
				rows.push({ key, type: 'added', newVal: after[key] });
			} else if (hasBefore && !hasAfter) {
				rows.push({ key, type: 'removed', oldVal: before[key] });
			} else {
				const bVal = JSON.stringify(before[key]);
				const aVal = JSON.stringify(after[key]);
				if (bVal !== aVal) {
					rows.push({ key, type: 'modified', oldVal: before[key], newVal: after[key] });
				} else {
					rows.push({ key, type: 'unchanged', newVal: after[key] });
				}
			}
		});

		return rows;
	}, [before, after]);

	const formatVal = (v: any) => {
		if (typeof v === 'object') return JSON.stringify(v);
		if (typeof v === 'string') return `"${v}"`;
		return String(v);
	};

	return (
		<div className={`rpc_json_diff ${className}`} style={style}>
			<div style={{ color: '#858585', marginBottom: 6 }}>&#123;</div>

			{diffRows.map((row) => {
				const sign =
					row.type === 'added'
						? '+'
						: row.type === 'removed'
						? '-'
						: row.type === 'modified'
						? '~'
						: ' ';

				return (
					<div key={row.key} className={`rpc_json_diff_row rpc_json_diff_row_${row.type}`}>
						<span className="rpc_json_diff_sign">{sign}</span>
						<span className="rpc_json_diff_key">"{row.key}"</span>:
						{row.type === 'modified' ? (
							<span>
								<span style={{ textDecoration: 'line-through', opacity: 0.7 }}>
									{formatVal(row.oldVal)}
								</span>
								<span className="rpc_json_diff_arrow">➔</span>
								<span>{formatVal(row.newVal)}</span>
							</span>
						) : row.type === 'removed' ? (
							<span>{formatVal(row.oldVal)}</span>
						) : (
							<span>{formatVal(row.newVal)}</span>
						)}
					</div>
				);
			})}

			<div style={{ color: '#858585', marginTop: 6 }}>&#125;</div>
		</div>
	);
};

export default JsonDiffViewer;
