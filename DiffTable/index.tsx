import React, { CSSProperties } from 'react';
import './index.less';

export interface DiffColumn {
	key: string;
	title: string;
	/** 是否为数值对比列，默认为 false */
	isNumeric?: boolean;
}

export interface DiffTableProps {
	/** 列定义 */
	columns: DiffColumn[];
	/** 基准期数据（如上月/上期） */
	baseData: Record<string, any>[];
	/** 当前期数据（如本月/当期） */
	currentData: Record<string, any>[];
	/** 唯一行主键，默认为 'id' */
	rowKey?: string;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const DiffTable: React.FC<DiffTableProps> = ({
	columns = [],
	baseData = [],
	currentData = [],
	rowKey = 'id',
	className = '',
	style,
}) => {
	// 将基准数据构造成 map 便于按 id 查询
	const baseMap = new Map<string, Record<string, any>>();
	baseData.forEach((row) => {
		baseMap.set(String(row[rowKey]), row);
	});

	return (
		<table className={`rpc_diff_table ${className}`} style={style}>
			<thead>
				<tr>
					{columns.map((col) => (
						<th key={col.key}>{col.title}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{currentData.map((currRow, index) => {
					const id = String(currRow[rowKey] || index);
					const baseRow = baseMap.get(id) || {};

					return (
						<tr key={id}>
							{columns.map((col) => {
								const currVal = currRow[col.key];
								const baseVal = baseRow[col.key];

								if (col.isNumeric && typeof currVal === 'number' && typeof baseVal === 'number') {
									const diff = currVal - baseVal;
									const percent = baseVal !== 0 ? ((diff / baseVal) * 100).toFixed(1) : '0.0';

									return (
										<td key={col.key}>
											<div className="rpc_diff_table_cell">
												<span>{currVal.toLocaleString()}</span>
												{diff !== 0 ? (
													<span
														className={`rpc_diff_table_diff_tag ${
															diff > 0
																? 'rpc_diff_table_diff_tag_up'
																: 'rpc_diff_table_diff_tag_down'
														}`}
													>
														{diff > 0 ? `+${percent}%` : `${percent}%`}
													</span>
												) : (
													<span className="rpc_diff_table_diff_tag rpc_diff_table_diff_tag_same">
														-
													</span>
												)}
											</div>
										</td>
									);
								}

								return <td key={col.key}>{currVal !== undefined ? String(currVal) : '-'}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default DiffTable;
