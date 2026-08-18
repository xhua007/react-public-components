import React, { useState, useMemo, CSSProperties } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '../src/icons';
import CopyButton from '../CopyButton';
import './index.less';

export type SensitiveType = 'phone' | 'idcard' | 'email' | 'bankcard' | 'custom';

export interface SensitiveMaskProps {
	/** 原始敏感文本 */
	text: string;
	/** 脱敏类型：'phone' | 'idcard' | 'email' | 'bankcard' | 'custom'，默认为 'phone' */
	type?: SensitiveType;
	/** 默认是否脱敏遮蔽，默认为 true */
	defaultMasked?: boolean;
	/** 遮罩字符，默认为 '*' */
	maskSymbol?: string;
	/** 自定义保留头部明文字符数（仅 type='custom' 有效） */
	unmaskedStart?: number;
	/** 自定义保留尾部明文字符数（仅 type='custom' 有效） */
	unmaskedEnd?: number;
	/** 是否支持切换明文/密文查看，默认为 true */
	toggleable?: boolean;
	/** 是否支持一键复制，默认为 false */
	copyable?: boolean;
	/** 切换明文时的拦截回调（返回 false 可阻止切换，支持异步鉴权） */
	onToggle?: (nextMasked: boolean) => boolean | Promise<boolean>;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

// 格式化脱敏文本
export function maskSensitiveText(
	raw: string,
	type: SensitiveType = 'phone',
	maskSymbol: string = '*',
	startCount?: number,
	endCount?: number,
): string {
	if (!raw) return '';

	switch (type) {
		case 'phone':
			if (raw.length <= 7) return raw;
			return raw.slice(0, 3) + maskSymbol.repeat(4) + raw.slice(-4);
		case 'idcard':
			if (raw.length <= 10) return raw;
			return raw.slice(0, 6) + maskSymbol.repeat(Math.max(1, raw.length - 10)) + raw.slice(-4);
		case 'bankcard':
			if (raw.length <= 8) return raw;
			return raw.slice(0, 4) + ' ' + maskSymbol.repeat(4) + ' ' + maskSymbol.repeat(4) + ' ' + raw.slice(-4);
		case 'email': {
			const atIndex = raw.indexOf('@');
			if (atIndex <= 1) return raw;
			const name = raw.slice(0, atIndex);
			const domain = raw.slice(atIndex);
			const maskedName = name[0] + maskSymbol.repeat(Math.max(1, name.length - 2)) + (name.length > 2 ? name.slice(-1) : '');
			return maskedName + domain;
		}
		case 'custom': {
			const start = startCount !== undefined ? startCount : 2;
			const end = endCount !== undefined ? endCount : 2;
			if (raw.length <= start + end) return raw;
			return raw.slice(0, start) + maskSymbol.repeat(Math.max(1, raw.length - start - end)) + raw.slice(-end);
		}
		default:
			return raw;
	}
}

const SensitiveMask: React.FC<SensitiveMaskProps> = ({
	text = '',
	type = 'phone',
	defaultMasked = true,
	maskSymbol = '*',
	unmaskedStart,
	unmaskedEnd,
	toggleable = true,
	copyable = false,
	onToggle,
	className = '',
	style,
}) => {
	const [masked, setMasked] = useState<boolean>(defaultMasked);

	const maskedText = useMemo(() => {
		return maskSensitiveText(text, type, maskSymbol, unmaskedStart, unmaskedEnd);
	}, [text, type, maskSymbol, unmaskedStart, unmaskedEnd]);

	const displayText = masked ? maskedText : text;

	const handleToggle = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const nextState = !masked;
		if (onToggle) {
			const allowed = await onToggle(nextState);
			if (allowed === false) return;
		}
		setMasked(nextState);
	};

	return (
		<span className={`rpc_sensitive_mask ${className}`} style={style}>
			<span className="rpc_sensitive_mask_text">{displayText}</span>

			{toggleable && (
				<span className="rpc_sensitive_mask_action_btn" onClick={handleToggle} title={masked ? '点击查看明文' : '点击隐藏'}>
					{masked ? <EyeOutlined /> : <EyeInvisibleOutlined />}
				</span>
			)}

			{copyable && <CopyButton mode="icon" text={text} tooltip="复制明文" />}
		</span>
	);
};

export default SensitiveMask;
