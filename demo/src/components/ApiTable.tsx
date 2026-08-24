import React from 'react';

export interface ApiPropItem {
	name: string;
	desc: string;
	type: string;
	default?: string;
	required?: boolean;
}

export interface ApiTableProps {
	title?: string;
	data: ApiPropItem[];
}

export const ApiTable: React.FC<ApiTableProps> = ({ title = 'API 参数说明 (Props)', data }) => {
	return (
		<div style={{ marginTop: 8 }}>
			<h3 style={{ fontSize: 16, marginBottom: 12 }}>📖 {title}</h3>
			<div
				style={{
					border: '1px solid #f0f0f0',
					borderRadius: 8,
					overflowX: 'auto',
					background: '#fff',
					maxWidth: 860,
				}}
			>
				<table
					style={{
						width: '100%',
						borderCollapse: 'collapse',
						textAlign: 'left',
						fontSize: 13,
					}}
				>
					<thead>
						<tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
							<th style={{ padding: '10px 16px', fontWeight: 600, color: '#262626', width: '22%' }}>
								参数
							</th>
							<th style={{ padding: '10px 16px', fontWeight: 600, color: '#262626', width: '38%' }}>
								说明
							</th>
							<th style={{ padding: '10px 16px', fontWeight: 600, color: '#262626', width: '26%' }}>
								类型
							</th>
							<th style={{ padding: '10px 16px', fontWeight: 600, color: '#262626', width: '14%' }}>
								默认值
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item) => (
							<tr
								key={item.name}
								style={{ borderBottom: '1px solid #f5f5f5', transition: 'background 0.2s' }}
							>
								<td
									style={{
										padding: '10px 16px',
										fontFamily: 'monospace',
										color: '#0958d9',
										fontWeight: 500,
									}}
								>
									{item.name}
									{item.required && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>*</span>}
								</td>
								<td style={{ padding: '10px 16px', color: '#595959', lineHeight: 1.5 }}>
									{item.desc}
								</td>
								<td
									style={{
										padding: '10px 16px',
										fontFamily: 'monospace',
										color: '#c41d7f',
										fontSize: 12,
									}}
								>
									{item.type}
								</td>
								<td
									style={{
										padding: '10px 16px',
										fontFamily: 'monospace',
										color: '#8c8c8c',
										fontSize: 12,
									}}
								>
									{item.default || '-'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
