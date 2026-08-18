import { useState } from 'react';
import CronPicker from '../../../CronPicker';

export default function CronPickerDemo() {
	const [currentCron, setCurrentCron] = useState<string>('0 0 12 * * ?');
	const [cronDesc, setCronDesc] = useState<string>('');

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
					当前选定周期：<code style={{ background: '#f5f5f5', padding: '2px 6px' }}>{currentCron}</code>
					<span style={{ marginLeft: 12, color: '#52c41a', fontWeight: 500 }}>
						({cronDesc})
					</span>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持按分钟、按小时、每天、每周、每月及自定义表达式配置，右下角支持一键复制。
				</p>
			</div>
		</div>
	);
}
