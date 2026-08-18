import React, { useMemo, ReactNode, CSSProperties } from 'react';
import { CheckOutlined, CloseOutlined } from '../src/icons';
import './index.less';

export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4;

export interface PasswordRule {
	key: string;
	label: ReactNode;
	validator: (password: string) => boolean;
}

export interface PasswordStrengthProps {
	/** 当前输入的密码文本 */
	password?: string;
	/** 是否显示密码强度文字（弱/中/强/极强），默认为 true */
	showText?: boolean;
	/** 是否显示密码规则校验清单，默认为 false */
	showRules?: boolean;
	/** 自定义规则列表 */
	rules?: PasswordRule[];
	/** 强度等级改变回调 */
	onLevelChange?: (level: PasswordStrengthLevel) => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const defaultRules: PasswordRule[] = [
	{
		key: 'length',
		label: '长度至少 8 位',
		validator: (pwd) => pwd.length >= 8,
	},
	{
		key: 'lowercase',
		label: '包含小写字母 (a-z)',
		validator: (pwd) => /[a-z]/.test(pwd),
	},
	{
		key: 'uppercase',
		label: '包含大写字母 (A-Z)',
		validator: (pwd) => /[A-Z]/.test(pwd),
	},
	{
		key: 'number',
		label: '包含数字 (0-9)',
		validator: (pwd) => /[0-9]/.test(pwd),
	},
	{
		key: 'special',
		label: '包含特殊符号 (!@#$...)',
		validator: (pwd) => /[^A-Za-z0-9]/.test(pwd),
	},
];

// 计算密码强度得分 (0~4)
export function evaluatePasswordStrength(
	pwd: string = '',
	rules: PasswordRule[] = defaultRules,
): { level: PasswordStrengthLevel; score: number; passedKeys: string[] } {
	if (!pwd) {
		return { level: 0, score: 0, passedKeys: [] };
	}

	const passedKeys = rules.filter((r) => r.validator(pwd)).map((r) => r.key);
	let score = passedKeys.length;

	// 如果长度过短（<6），强制判定为弱
	if (pwd.length < 6) {
		return { level: 1, score: 1, passedKeys };
	}

	let level: PasswordStrengthLevel = 1;
	if (score <= 1) level = 1;
	else if (score <= 3) level = 2;
	else if (score === 4) level = 3;
	else level = 4;

	return { level, score, passedKeys };
}

const levelConfig: Record<
	PasswordStrengthLevel,
	{ text: string; color: string; classSuffix: string }
> = {
	0: { text: '', color: '#d9d9d9', classSuffix: '' },
	1: { text: '强度较弱', color: '#ff4d4f', classSuffix: 'weak' },
	2: { text: '强度中等', color: '#fa8c16', classSuffix: 'medium' },
	3: { text: '强度良好', color: '#1677ff', classSuffix: 'good' },
	4: { text: '强度极高', color: '#52c41a', classSuffix: 'strong' },
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
	password = '',
	showText = true,
	showRules = false,
	rules = defaultRules,
	onLevelChange,
	className = '',
	style,
}) => {
	const { level, passedKeys } = useMemo(() => {
		const res = evaluatePasswordStrength(password, rules);
		onLevelChange?.(res.level);
		return res;
	}, [password, rules, onLevelChange]);

	const currentInfo = levelConfig[level];

	return (
		<div className={`rpc_password_strength ${className}`} style={style}>
			{/* 4 段彩色进度条 */}
			<div className="rpc_password_strength_bars">
				{[1, 2, 3, 4].map((segIndex) => {
					const isActive = level >= segIndex;
					const segmentClass = [
						'rpc_password_strength_bar_segment',
						isActive && currentInfo.classSuffix
							? `rpc_password_strength_bar_segment_active_${currentInfo.classSuffix}`
							: '',
					]
						.filter(Boolean)
						.join(' ');

					return <div key={segIndex} className={segmentClass} />;
				})}
			</div>

			{/* 文本说明 */}
			{showText && (
				<div className="rpc_password_strength_label">
					<span>密码安全性</span>
					<span
						className="rpc_password_strength_level_text"
						style={{ color: currentInfo.color }}
					>
						{password ? currentInfo.text : '未输入密码'}
					</span>
				</div>
			)}

			{/* 规则校验列表 */}
			{showRules && (
				<div className="rpc_password_strength_rules">
					{rules.map((r) => {
						const isPassed = passedKeys.includes(r.key);
						return (
							<div
								key={r.key}
								className={`rpc_password_strength_rule_item ${
									isPassed ? 'rpc_password_strength_rule_item_passed' : ''
								}`}
							>
								{isPassed ? (
									<CheckOutlined style={{ fontSize: 11 }} />
								) : (
									<CloseOutlined style={{ fontSize: 10, opacity: 0.5 }} />
								)}
								<span>{r.label}</span>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default PasswordStrength;
