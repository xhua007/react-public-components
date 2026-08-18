import React, { useState, useMemo, ReactNode, CSSProperties } from 'react';
import './index.less';

export type DiffViewMode = 'split' | 'unified';

export interface DiffViewerProps {
	/** 修改前的旧文本 */
	oldValue: string;
	/** 修改后的新文本 */
	newValue: string;
	/** 视图模式：'split' 左右分栏，'unified' 单列行内，默认为 'split' */
	viewMode?: DiffViewMode;
	/** 是否允许用户自由切换视图模式，默认为 true */
	allowModeChange?: boolean;
	/** 文件标题或说明 */
	title?: ReactNode;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

interface DiffLine {
	type: 'unchanged' | 'added' | 'removed';
	text: string;
	oldLineNumber?: number;
	newLineNumber?: number;
}

// 简单高效的 LCS 行级差异比较算法
function computeLineDiff(oldStr: string, newStr: string): DiffLine[] {
	const oldLines = oldStr.split('\n');
	const newLines = newStr.split('\n');

	const n = oldLines.length;
	const m = newLines.length;

	// 动态规划构建 LCS 矩阵
	const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			if (oldLines[i] === newLines[j]) {
				dp[i + 1][j + 1] = dp[i][j] + 1;
			} else {
				dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
			}
		}
	}

	// 回溯生成差异序列
	const result: DiffLine[] = [];
	let i = n;
	let j = m;

	while (i > 0 || j > 0) {
		if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
			result.unshift({
				type: 'unchanged',
				text: oldLines[i - 1],
				oldLineNumber: i,
				newLineNumber: j,
			});
			i--;
			j--;
		} else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
			result.unshift({
				type: 'added',
				text: newLines[j - 1],
				newLineNumber: j,
			});
			j--;
		} else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
			result.unshift({
				type: 'removed',
				text: oldLines[i - 1],
				oldLineNumber: i,
			});
			i--;
		}
	}

	return result;
}

const DiffViewer: React.FC<DiffViewerProps> = ({
	oldValue = '',
	newValue = '',
	viewMode: initialMode = 'split',
	allowModeChange = true,
	title,
	className = '',
	style,
}) => {
	const [mode, setMode] = useState<DiffViewMode>(initialMode);

	const diffLines = useMemo(() => {
		return computeLineDiff(oldValue, newValue);
	}, [oldValue, newValue]);

	// 统计变动行数
	const stats = useMemo(() => {
		let added = 0;
		let removed = 0;
		diffLines.forEach((l) => {
			if (l.type === 'added') added++;
			if (l.type === 'removed') removed++;
		});
		return { added, removed };
	}, [diffLines]);

	return (
		<div className={`rpc_diff_viewer ${className}`} style={style}>
			{/* 头部标题与模式切换 */}
			<div className="rpc_diff_viewer_header">
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<span className="rpc_diff_viewer_title">{title || 'Diff Comparison'}</span>
					<span style={{ fontSize: 12, color: '#52c41a' }}>+{stats.added}</span>
					<span style={{ fontSize: 12, color: '#ff4d4f' }}>-{stats.removed}</span>
				</div>

				{allowModeChange && (
					<div className="rpc_diff_viewer_mode_toggle">
						<button
							type="button"
							className={`rpc_diff_viewer_mode_btn ${
								mode === 'split' ? 'rpc_diff_viewer_mode_btn_active' : ''
							}`}
							onClick={() => setMode('split')}
						>
							分栏 (Split)
						</button>
						<button
							type="button"
							className={`rpc_diff_viewer_mode_btn ${
								mode === 'unified' ? 'rpc_diff_viewer_mode_btn_active' : ''
							}`}
							onClick={() => setMode('unified')}
						>
							行内 (Unified)
						</button>
					</div>
				)}
			</div>

			{/* 差异展示主体 */}
			<div style={{ overflowX: 'auto', maxHeight: 420, overflowY: 'auto' }}>
				{mode === 'unified' ? (
					<table className="rpc_diff_viewer_table">
						<tbody>
							{diffLines.map((line, idx) => {
								const rowClass =
									line.type === 'added'
										? 'rpc_diff_viewer_row_added'
										: line.type === 'removed'
											? 'rpc_diff_viewer_row_removed'
											: '';

								const marker = line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' ';

								return (
									<tr key={idx} className={`rpc_diff_viewer_row ${rowClass}`}>
										<td className="rpc_diff_viewer_gutter">{line.oldLineNumber || ''}</td>
										<td className="rpc_diff_viewer_gutter">{line.newLineNumber || ''}</td>
										<td className="rpc_diff_viewer_marker">{marker}</td>
										<td className="rpc_diff_viewer_code">{line.text || ' '}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					/* 分栏 Split 模式 */
					<table className="rpc_diff_viewer_table">
						<tbody>
							{diffLines.map((line, idx) => {
								const isAdd = line.type === 'added';
								const isDel = line.type === 'removed';

								return (
									<tr key={idx} className="rpc_diff_viewer_row">
										{/* 左侧旧版 */}
										<td
											className={`rpc_diff_viewer_gutter ${
												isDel ? 'rpc_diff_viewer_row_removed' : isAdd ? 'rpc_diff_viewer_row_empty' : ''
											}`}
										>
											{line.oldLineNumber || ''}
										</td>
										<td
											className={`rpc_diff_viewer_code ${
												isDel ? 'rpc_diff_viewer_row_removed' : isAdd ? 'rpc_diff_viewer_row_empty' : ''
											}`}
										>
											{isDel || line.type === 'unchanged' ? line.text || ' ' : ''}
										</td>

										{/* 右侧新版 */}
										<td
											className={`rpc_diff_viewer_gutter ${
												isAdd ? 'rpc_diff_viewer_row_added' : isDel ? 'rpc_diff_viewer_row_empty' : ''
											}`}
										>
											{line.newLineNumber || ''}
										</td>
										<td
											className={`rpc_diff_viewer_code ${
												isAdd ? 'rpc_diff_viewer_row_added' : isDel ? 'rpc_diff_viewer_row_empty' : ''
											}`}
										>
											{isAdd || line.type === 'unchanged' ? line.text || ' ' : ''}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default DiffViewer;
