import React, { useState, CSSProperties } from 'react';
import { CloseOutlined, EyeOutlined, EyeInvisibleOutlined } from '../src/icons';
import './index.less';

export interface KeyValItem {
	key: string;
	value: string;
	enabled?: boolean;
	isSecret?: boolean;
}

export interface KeyValEditorProps {
	/** 键值对数组（受控） */
	value?: KeyValItem[];
	/** 默认键值对数组 */
	defaultValue?: KeyValItem[];
	/** 变化回调 */
	onChange?: (items: KeyValItem[]) => void;
	/** Key 输入框占位文案，默认为 'Key 键名' */
	keyPlaceholder?: string;
	/** Value 输入框占位文案，默认为 'Value 键值' */
	valPlaceholder?: string;
	/** 是否允许配置 Secret 密码掩码，默认为 true */
	allowSecret?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const KeyValEditor: React.FC<KeyValEditorProps> = ({
	value: controlledValue,
	defaultValue = [{ key: '', value: '', enabled: true }],
	onChange,
	keyPlaceholder = 'Key 键名',
	valPlaceholder = 'Value 键值',
	allowSecret = true,
	className = '',
	style,
}) => {
	const [internalVal, setInternalVal] = useState<KeyValItem[]>(defaultValue);
	const items = controlledValue !== undefined ? controlledValue : internalVal;

	const [visibleSecrets, setVisibleSecrets] = useState<Record<number, boolean>>({});

	const triggerChange = (newItems: KeyValItem[]) => {
		if (controlledValue === undefined) setInternalVal(newItems);
		onChange?.(newItems);
	};

	const handleItemChange = (index: number, field: keyof KeyValItem, val: any) => {
		const next = items.map((item, i) => (i === index ? { ...item, [field]: val } : item));
		triggerChange(next);
	};

	const handleAdd = () => {
		triggerChange([...items, { key: '', value: '', enabled: true }]);
	};

	const handleDelete = (index: number) => {
		triggerChange(items.filter((_, i) => i !== index));
	};

	const toggleSecretVisibility = (index: number) => {
		setVisibleSecrets((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	return (
		<div className={`rpc_key_val_editor ${className}`} style={style}>
			{items.map((item, index) => {
				const isSecret = item.isSecret && !visibleSecrets[index];

				return (
					<div key={index} className="rpc_key_val_editor_row">
						{/* 启用/禁用勾选 */}
						<input
							type="checkbox"
							checked={item.enabled !== false}
							onChange={(e) => handleItemChange(index, 'enabled', e.target.checked)}
							className="rpc_key_val_editor_checkbox"
							title="启用/禁用此条目"
						/>

						{/* Key 输入 */}
						<input
							type="text"
							placeholder={keyPlaceholder}
							value={item.key}
							disabled={item.enabled === false}
							onChange={(e) => handleItemChange(index, 'key', e.target.value)}
							className="rpc_key_val_editor_input"
						/>

						{/* Value 输入 */}
						<input
							type={isSecret ? 'password' : 'text'}
							placeholder={valPlaceholder}
							value={item.value}
							disabled={item.enabled === false}
							onChange={(e) => handleItemChange(index, 'value', e.target.value)}
							className="rpc_key_val_editor_input"
						/>

						{/* 密码明文切换 */}
						{allowSecret && (
							<button
								type="button"
								className="rpc_key_val_editor_btn_icon"
								onClick={() => {
									if (!item.isSecret) {
										handleItemChange(index, 'isSecret', true);
									} else {
										toggleSecretVisibility(index);
									}
								}}
								title={item.isSecret ? '切换显示/隐藏' : '设为敏感密码'}
							>
								{item.isSecret ? (
									visibleSecrets[index] ? <EyeOutlined /> : <EyeInvisibleOutlined />
								) : (
									<span style={{ fontSize: 11, color: '#8c8c8c' }}>🔒</span>
								)}
							</button>
						)}

						{/* 删除行 */}
						<button
							type="button"
							className="rpc_key_val_editor_btn_icon"
							onClick={() => handleDelete(index)}
							title="删除此行"
						>
							<CloseOutlined />
						</button>
					</div>
				);
			})}

			<div className="rpc_key_val_editor_footer">
				<button type="button" className="rpc_key_val_editor_add_btn" onClick={handleAdd}>
					+ 添加键值对
				</button>
			</div>
		</div>
	);
};

export default KeyValEditor;
