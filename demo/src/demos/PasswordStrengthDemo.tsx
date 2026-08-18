import { useState } from 'react';
import PasswordStrength from '../../../PasswordStrength';

export default function PasswordStrengthDemo() {
	const [password, setPassword] = useState<string>('React@2026');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 基础密码输入与强度进度条 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 实时密码强度评分与 4 段彩色进度条</h3>
				<div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
					<input
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="请输入密码测试强度..."
						style={{
							width: '100%',
							padding: '8px 12px',
							border: '1px solid #d9d9d9',
							borderRadius: 6,
							fontSize: 14,
							outline: 'none',
							boxSizing: 'border-box',
						}}
					/>

					<PasswordStrength password={password} showText />
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					实时评估密码长度、大小写字母、数字及特殊符号，分段平滑显示强弱等级（弱/中/强/极强）。
				</p>
			</div>

			{/* 2. 包含规则清单列表 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 带有密码规则实时 Checklist (showRules)</h3>
				<div style={{ maxWidth: 400 }}>
					<PasswordStrength password={password} showText showRules />
				</div>
			</div>
		</div>
	);
}
