import React, { useState, useMemo, CSSProperties } from 'react';
import { CloseOutlined } from '../src/icons';
import './index.less';

export interface TreeTransferNode {
	key: string;
	title: string;
	children?: TreeTransferNode[];
}

export interface TreeTransferProps {
	/** 树形数据源 */
	treeData: TreeTransferNode[];
	/** 右侧已选择 keys 列表（受控） */
	targetKeys?: string[];
	/** 默认已选择 keys 列表 */
	defaultTargetKeys?: string[];
	/** 改变回调 */
	onChange?: (targetKeys: string[]) => void;
	/** 左侧面板标题，默认为 '待选项目录' */
	sourceTitle?: string;
	/** 右侧面板标题，默认为 '已选项目' */
	targetTitle?: string;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const TreeTransfer: React.FC<TreeTransferProps> = ({
	treeData = [],
	targetKeys: controlledKeys,
	defaultTargetKeys = [],
	onChange,
	sourceTitle = '待选项目录',
	targetTitle = '已选项目',
	className = '',
	style,
}) => {
	const [internalKeys, setInternalKeys] = useState<string[]>(defaultTargetKeys);
	const targetKeys = controlledKeys !== undefined ? controlledKeys : internalKeys;

	// 平铺节点便于通过 key 查找 title
	const flatNodeMap = useMemo(() => {
		const map = new Map<string, string>();
		const traverse = (nodes: TreeTransferNode[]) => {
			nodes.forEach((n) => {
				map.set(n.key, n.title);
				if (n.children) traverse(n.children);
			});
		};
		traverse(treeData);
		return map;
	}, [treeData]);

	const triggerChange = (newKeys: string[]) => {
		if (controlledKeys === undefined) setInternalKeys(newKeys);
		onChange?.(newKeys);
	};

	const handleToggle = (key: string, checked: boolean) => {
		if (checked) {
			triggerChange([...targetKeys, key]);
		} else {
			triggerChange(targetKeys.filter((k) => k !== key));
		}
	};

	const handleRemove = (key: string) => {
		triggerChange(targetKeys.filter((k) => k !== key));
	};

	return (
		<div className={`rpc_tree_transfer ${className}`} style={style}>
			{/* 左侧树形选择面板 */}
			<div className="rpc_tree_transfer_panel">
				<div className="rpc_tree_transfer_header">
					<span>{sourceTitle}</span>
				</div>
				<div className="rpc_tree_transfer_body">
					{treeData.map((group) => (
						<div key={group.key}>
							<div className="rpc_tree_transfer_tree_item">
								<b>📁 {group.title}</b>
							</div>
							{group.children?.map((child) => {
								const isChecked = targetKeys.includes(child.key);
								return (
									<label
										key={child.key}
										className="rpc_tree_transfer_tree_item rpc_tree_transfer_tree_child"
										style={{ cursor: 'pointer' }}
									>
										<input
											type="checkbox"
											checked={isChecked}
											onChange={(e) => handleToggle(child.key, e.target.checked)}
										/>
										<span>{child.title}</span>
									</label>
								);
							})}
						</div>
					))}
				</div>
			</div>

			{/* 中间指示 */}
			<span style={{ color: '#8c8c8c' }}>⇄</span>

			{/* 右侧平铺已选面板 */}
			<div className="rpc_tree_transfer_panel">
				<div className="rpc_tree_transfer_header">
					<span>{targetTitle} ({targetKeys.length})</span>
					{targetKeys.length > 0 && (
						<button
							type="button"
							style={{ background: 'none', border: 'none', color: '#1677ff', cursor: 'pointer', fontSize: 12 }}
							onClick={() => triggerChange([])}
						>
							清空
						</button>
					)}
				</div>
				<div className="rpc_tree_transfer_body">
					{targetKeys.length === 0 ? (
						<div style={{ color: '#8c8c8c', padding: '20px 0', textAlign: 'center' }}>
							暂无已选项
						</div>
					) : (
						targetKeys.map((key) => (
							<div key={key} className="rpc_tree_transfer_target_item">
								<span>{flatNodeMap.get(key) || key}</span>
								<button
									type="button"
									className="rpc_tree_transfer_del_btn"
									onClick={() => handleRemove(key)}
								>
									<CloseOutlined />
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default TreeTransfer;
