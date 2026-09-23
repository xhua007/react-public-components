import { useState } from 'react';
import CronPicker from '../../../CronPicker';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function CronPickerDemo() {
	const [currentCron, setCurrentCron] = useState<string>('0 0 12 * * ?');
	const [cronDesc, setCronDesc] = useState<string>('');

	const usageCode = `import { useState } from 'react';
import { CronPicker } from 'react-public-components';

export default function App() {
  const [cron, setCron] = useState('0 0 12 * * ?');

  return (
    <CronPicker
      defaultValue={cron}
      onChange={(newCron, humanDesc) => {
        setCron(newCron);
        console.log('Cron 中文语义：', humanDesc);
      }}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'value', desc: '当前 Cron 表达式字符串（受控）', type: 'string', default: '-' },
		{ name: 'defaultValue', desc: '默认 Cron 表达式', type: 'string', default: "'0 0 12 * * ?'" },
		{
			name: 'onChange',
			desc: 'Cron 表达式改变时的回调，回传最新表达式与人话中文解释',
			type: '(cron: string, humanReadable: string) => void',
			default: '-',
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. Cron 表达式可视化生成器 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 定时任务 Cron 表达式可视化配置器（自动翻译为人话解释）
				</h3>
				<div style={{ maxWidth: 640 }}>
					<CronPicker
						defaultValue="0 0 12 * * ?"
						onChange={(cron, desc) => {
							setCurrentCron(cron);
							setCronDesc(desc);
						}}
					/>
				</div>
				<div style={{ marginTop: 12, fontSize: 14, color: '#1f1f1f' }}>
					当前选定周期：
					<code style={{ background: '#f5f5f5', padding: '2px 6px' }}>{currentCron}</code>
					<span style={{ marginLeft: 12, color: '#52c41a', fontWeight: 500 }}>({cronDesc})</span>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持按分钟、按小时、每天、每周、每月及自定义表达式配置，右下角支持一键复制。
				</p>
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
