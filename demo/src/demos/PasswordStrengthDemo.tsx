import { useState } from 'react';
import PasswordStrength from '../../../PasswordStrength';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function PasswordStrengthDemo() {
	const [password, setPassword] = useState<string>('React@2026');

	const usageCode = `import { useState } from 'react';
import { PasswordStrength } from 'react-public-components';

export default function App() {
  const [password, setPassword] = useState('');

  return (
    <div style={{ maxWidth: 360 }}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="请输入密码..."
      />
      <PasswordStrength
        password={password}
        showText
        showRules
        onLevelChange={(level) => console.log('密码强度等级 0~4:', level)}
      />
    </div>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'password', desc: '当前输入的密码文本字符串', type: 'string', default: '-' },
		{ name: 'showText', desc: '是否在进度条右侧显示强度文字说明（弱/中/强/极强）', type: 'boolean', default: 'true' },
		{ name: 'showRules', desc: '是否在底部展开密码合规性校验规则 Checklist 清单', type: 'boolean', default: 'false' },
		{ name: 'rules', desc: '自定义密码校验规则列表', type: 'PasswordRule[]', default: '长度、大小写、数字、特殊符号' },
		{ name: 'onLevelChange', desc: '密码强度等级改变时的回调 (0 ~ 4)', type: '(level: 0 | 1 | 2 | 3 | 4) => void', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

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
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					2. 带有密码规则实时 Checklist (showRules)
				</h3>
				<div style={{ maxWidth: 400 }}>
					<PasswordStrength password={password} showText showRules />
				</div>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 640 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
