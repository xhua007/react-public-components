import React, { useState, CSSProperties } from 'react';
import './index.less';

export interface JsonTreeProps {
	/** JSON 数据源 */
	data: any;
	/** 默认展开层级深度，默认为 2 */
	defaultExpandedLevel?: number;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

interface TreeNodeProps {
	keyName?: string;
	value: any;
	depth: number;
	maxDepth: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ keyName, value, depth, maxDepth }) => {
	const [collapsed, setCollapsed] = useState<boolean>(depth >= maxDepth);

	const isObject = value !== null && typeof value === 'object';
	const isArray = Array.isArray(value);

	if (!isObject) {
		let valClass = 'rpc_json_tree_string';
		let valStr = `"${value}"`;

		if (typeof value === 'number') {
			valClass = 'rpc_json_tree_number';
			valStr = String(value);
		} else if (typeof value === 'boolean') {
			valClass = 'rpc_json_tree_boolean';
			valStr = String(value);
		} else if (value === null) {
			valClass = 'rpc_json_tree_null';
			valStr = 'null';
		}

		return (
			<div>
				{keyName !== undefined && (
					<>
						<span className="rpc_json_tree_key">"{keyName}"</span>
						<span className="rpc_json_tree_colon">:</span>
					</>
				)}
				<span className={valClass}>{valStr}</span>
			</div>
		);
	}

	const keys = Object.keys(value);
	const openBracket = isArray ? '[' : '{';
	const closeBracket = isArray ? ']' : '}';

	return (
		<div>
			<span
				className={`rpc_json_tree_toggle ${collapsed ? 'rpc_json_tree_toggle_collapsed' : ''}`}
				onClick={() => setCollapsed(!collapsed)}
			>
				▼
			</span>

			{keyName !== undefined && (
				<>
					<span className="rpc_json_tree_key">"{keyName}"</span>
					<span className="rpc_json_tree_colon">:</span>
				</>
			)}

			<span className="rpc_json_tree_bracket">{openBracket}</span>

			{collapsed ? (
				<>
					<span
						className="rpc_json_tree_count"
						style={{ cursor: 'pointer' }}
						onClick={() => setCollapsed(false)}
					>
						{keys.length} items...
					</span>
					<span className="rpc_json_tree_bracket">{closeBracket}</span>
				</>
			) : (
				<>
					<div className="rpc_json_tree_node">
						{keys.map((k) => (
							<TreeNode
								key={k}
								keyName={isArray ? undefined : k}
								value={value[k]}
								depth={depth + 1}
								maxDepth={maxDepth}
							/>
						))}
					</div>
					<span className="rpc_json_tree_bracket">{closeBracket}</span>
				</>
			)}
		</div>
	);
};

const JsonTree: React.FC<JsonTreeProps> = ({
	data,
	defaultExpandedLevel = 2,
	className = '',
	style,
}) => {
	return (
		<div className={`rpc_json_tree ${className}`} style={style}>
			<TreeNode value={data} depth={0} maxDepth={defaultExpandedLevel} />
		</div>
	);
};

export default JsonTree;
