import React, { useState, useEffect, CSSProperties } from 'react';
import CopyButton from '../CopyButton';
import './index.less';

export type CronPeriodType = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'custom';

export interface CronPickerProps {
	/** 当前 Cron 表达式（受控） */
	value?: string;
	/** 默认 Cron 表达式，默认为 '0 0 12 * * ?' */
	defaultValue?: string;
	/** 表达式改变回调 */
	onChange?: (cron: string, humanReadable: string) => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const CronPicker: React.FC<CronPickerProps> = ({
	value: controlledValue,
	defaultValue = '0 0 12 * * ?',
	onChange,
	className = '',
	style,
}) => {
	const [period, setPeriod] = useState<CronPeriodType>('day');

	// 状态字段
	const [minuteInterval, setMinuteInterval] = useState<number>(5);
	const [hourMinute, setHourMinute] = useState<number>(0);
	const [dayHour, setDayHour] = useState<number>(12);
	const [dayMinute, setDayMinute] = useState<number>(0);
	const [weekDay, setWeekDay] = useState<number>(1); // 1 = 周一
	const [weekHour, setWeekHour] = useState<number>(9);
	const [weekMinute, setWeekMinute] = useState<number>(0);
	const [monthDay, setMonthDay] = useState<number>(1);
	const [monthHour, setMonthHour] = useState<number>(0);
	const [monthMinute, setMonthMinute] = useState<number>(0);
	const [customCron, setCustomCron] = useState<string>(defaultValue);

	// 计算当前周期对应的 Cron 表达式与中文描述
	const { cron, desc } = React.useMemo(() => {
		if (controlledValue && period === 'custom') {
			return { cron: controlledValue, desc: '自定义 Cron 调度' };
		}

		switch (period) {
			case 'minute':
				return {
					cron: `0 0/${minuteInterval} * * * ?`,
					desc: `每隔 ${minuteInterval} 分钟执行一次`,
				};
			case 'hour':
				return {
					cron: `0 ${hourMinute} * * * ?`,
					desc: `每小时的第 ${hourMinute} 分钟执行一次`,
				};
			case 'day':
				return {
					cron: `0 ${dayMinute} ${dayHour} * * ?`,
					desc: `每天 ${String(dayHour).padStart(2, '0')}:${String(dayMinute).padStart(2, '0')} 执行一次`,
				};
			case 'week': {
				const weekMap: Record<number, string> = {
					1: '周一',
					2: '周二',
					3: '周三',
					4: '周四',
					5: '周五',
					6: '周六',
					7: '周日',
				};
				// Cron 中 1 为周日/周一根据规范不同，这里按常规映射
				return {
					cron: `0 ${weekMinute} ${weekHour} ? * ${weekDay}`,
					desc: `每${weekMap[weekDay]} ${String(weekHour).padStart(2, '0')}:${String(weekMinute).padStart(2, '0')} 执行一次`,
				};
			}
			case 'month':
				return {
					cron: `0 ${monthMinute} ${monthHour} ${monthDay} * ?`,
					desc: `每月 ${monthDay} 号 ${String(monthHour).padStart(2, '0')}:${String(monthMinute).padStart(2, '0')} 执行一次`,
				};
			case 'custom':
				return {
					cron: customCron,
					desc: '自定义 Cron 表达式',
				};
			default:
				return { cron: defaultValue, desc: '定时执行' };
		}
	}, [
		period,
		controlledValue,
		minuteInterval,
		hourMinute,
		dayHour,
		dayMinute,
		weekDay,
		weekHour,
		weekMinute,
		monthDay,
		monthHour,
		monthMinute,
		customCron,
		defaultValue,
	]);

	useEffect(() => {
		onChange?.(cron, desc);
	}, [cron, desc, onChange]);

	return (
		<div className={`rpc_cron_picker ${className}`} style={style}>
			{/* 周期切换 Tab */}
			<div className="rpc_cron_picker_tabs">
				{[
					{ key: 'minute', label: '每隔分钟' },
					{ key: 'hour', label: '每小时' },
					{ key: 'day', label: '每天' },
					{ key: 'week', label: '每周' },
					{ key: 'month', label: '每月' },
					{ key: 'custom', label: '自定义 Cron' },
				].map((tab) => (
					<button
						key={tab.key}
						type="button"
						className={`rpc_cron_picker_tab_btn ${
							period === tab.key ? 'rpc_cron_picker_tab_btn_active' : ''
						}`}
						onClick={() => setPeriod(tab.key as CronPeriodType)}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* 参数配置区域 */}
			<div className="rpc_cron_picker_panel">
				{period === 'minute' && (
					<div className="rpc_cron_picker_field_row">
						<span>每隔</span>
						<select
							className="rpc_cron_picker_select"
							value={minuteInterval}
							onChange={(e) => setMinuteInterval(Number(e.target.value))}
						>
							{[1, 2, 3, 5, 10, 15, 20, 30].map((m) => (
								<option key={m} value={m}>
									{m}
								</option>
							))}
						</select>
						<span>分钟执行一次</span>
					</div>
				)}

				{period === 'hour' && (
					<div className="rpc_cron_picker_field_row">
						<span>每小时的第</span>
						<input
							type="number"
							min={0}
							max={59}
							value={hourMinute}
							onChange={(e) => setHourMinute(Number(e.target.value))}
							className="rpc_cron_picker_input"
							style={{ width: 60 }}
						/>
						<span>分执行一次</span>
					</div>
				)}

				{period === 'day' && (
					<div className="rpc_cron_picker_field_row">
						<span>每天在</span>
						<input
							type="number"
							min={0}
							max={23}
							value={dayHour}
							onChange={(e) => setDayHour(Number(e.target.value))}
							className="rpc_cron_picker_input"
							style={{ width: 60 }}
						/>
						<span>时</span>
						<input
							type="number"
							min={0}
							max={59}
							value={dayMinute}
							onChange={(e) => setDayMinute(Number(e.target.value))}
							className="rpc_cron_picker_input"
							style={{ width: 60 }}
						/>
						<span>分执行一次</span>
					</div>
				)}

				{period === 'week' && (
					<div className="rpc_cron_picker_field_row">
						<span>每周</span>
						<select
							className="rpc_cron_picker_select"
							value={weekDay}
							onChange={(e) => setWeekDay(Number(e.target.value))}
						>
							<option value={1}>周一</option>
							<option value={2}>周二</option>
							<option value={3}>周三</option>
							<option value={4}>周四</option>
							<option value={5}>周五</option>
							<option value={6}>周六</option>
							<option value={7}>周日</option>
						</select>
						<span>的</span>
						<input
							type="number"
							min={0}
							max={23}
							value={weekHour}
							onChange={(e) => setWeekHour(Number(e.target.value))}
							className="rpc_cron_picker_input"
							style={{ width: 60 }}
						/>
						<span>时</span>
						<input
							type="number"
							min={0}
							max={59}
							value={weekMinute}
							onChange={(e) => setWeekMinute(Number(e.target.value))}
							className="rpc_cron_picker_input"
							style={{ width: 60 }}
						/>
						<span>分执行</span>
					</div>
				)}

				{period === 'month' && (
					<div className="rpc_cron_picker_field_row">
						<span>每月第</span>
						<input
							type="number"
							min={1}
							max={31}
							value={monthDay}
							onChange={(e) => setMonthDay(Number(e.target.value))}
							className="rpc_cron_picker_input"
							style={{ width: 60 }}
						/>
						<span>天的</span>
						<input
							type="number"
							min={0}
							max={23}
							value={monthHour}
							onChange={(e) => setMonthHour(Number(e.target.value))}
							className="rpc_cron_picker_input"
							style={{ width: 60 }}
						/>
						<span>时</span>
						<input
							type="number"
							min={0}
							max={59}
							value={monthMinute}
							onChange={(e) => setMonthMinute(Number(e.target.value))}
							className="rpc_cron_picker_input"
							style={{ width: 60 }}
						/>
						<span>分执行</span>
					</div>
				)}

				{period === 'custom' && (
					<div className="rpc_cron_picker_field_row">
						<input
							type="text"
							value={customCron}
							onChange={(e) => setCustomCron(e.target.value)}
							className="rpc_cron_picker_input"
							style={{ width: '100%', fontFamily: 'monospace' }}
							placeholder="例如: 0 0/15 * * * ?"
						/>
					</div>
				)}
			</div>

			{/* 底部生成结果与人话翻译 */}
			<div className="rpc_cron_picker_footer">
				<div className="rpc_cron_picker_cron_badge">
					<span>生成的 Cron:</span>
					<span className="rpc_cron_picker_cron_code">{cron}</span>
					<CopyButton mode="icon" text={cron} tooltip="复制 Cron 表达式" />
				</div>
				<div className="rpc_cron_picker_human_desc">
					<span>💡 周期人话解释：</span>
					<span>{desc}</span>
				</div>
			</div>
		</div>
	);
};

export default CronPicker;
