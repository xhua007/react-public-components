import { useState, useRef } from 'react';
import CountUp, { CountUpRef } from '../../../CountUp';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function CountUpDemo() {
	const [targetValue, setTargetValue] = useState<number>(9824.5);
	const countUpRef = useRef<CountUpRef>(null);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 基础数字递增与看板样式 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 基础数字动效与数据看板</h3>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: 16,
					}}
				>
					<div
						style={{
							background: '#ffffff',
							border: '1px solid #f0f0f0',
							borderRadius: 10,
							padding: 20,
							boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
						}}
					>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 8 }}>总销售额 (GMV)</div>
						<div style={{ fontSize: 28, fontWeight: 700, color: '#1677ff' }}>
							<CountUp end={1284560.85} prefix="¥" decimals={2} duration={2.5} />
						</div>
					</div>

					<div
						style={{
							background: '#ffffff',
							border: '1px solid #f0f0f0',
							borderRadius: 10,
							padding: 20,
							boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
						}}
					>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 8 }}>系统可用率 (SLA)</div>
						<div style={{ fontSize: 28, fontWeight: 700, color: '#52c41a' }}>
							<CountUp end={99.99} suffix="%" decimals={2} duration={2} />
						</div>
					</div>

					<div
						style={{
							background: '#ffffff',
							border: '1px solid #f0f0f0',
							borderRadius: 10,
							padding: 20,
							boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
						}}
					>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 8 }}>活跃用户数</div>
						<div style={{ fontSize: 28, fontWeight: 700, color: '#722ed1' }}>
							<CountUp end={85200} suffix=" 人" duration={2} />
						</div>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					内置高质量缓动曲线（EaseOutExpo），支持千分位格式化、小数精度控制及前缀/后缀。
				</p>
			</div>

			{/* 2. 命令式 Ref 控制 & 动态更新 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					2. 命令式 Ref 控制（重放 / 重置 / 动态更新）
				</h3>
				<div
					style={{
						background: '#fafafa',
						border: '1px solid #f0f0f0',
						borderRadius: 8,
						padding: 24,
						maxWidth: 500,
					}}
				>
					<div style={{ fontSize: 32, fontWeight: 700, color: '#fa8c16', marginBottom: 20 }}>
						<CountUp
							ref={countUpRef}
							start={0}
							end={targetValue}
							decimals={1}
							prefix="$ "
							duration={2}
						/>
					</div>

					<div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
						<button
							onClick={() => countUpRef.current?.start()}
							style={{
								padding: '6px 14px',
								background: '#1677ff',
								color: '#fff',
								border: 'none',
								borderRadius: 6,
								cursor: 'pointer',
							}}
						>
							重新播放
						</button>

						<button
							onClick={() => countUpRef.current?.reset()}
							style={{
								padding: '6px 14px',
								background: '#ffffff',
								border: '1px solid #d9d9d9',
								borderRadius: 6,
								cursor: 'pointer',
							}}
						>
							重置为0
						</button>

						<button
							onClick={() => {
								const nextVal = Math.floor(Math.random() * 20000) + 1000;
								setTargetValue(nextVal);
								countUpRef.current?.update(nextVal);
							}}
							style={{
								padding: '6px 14px',
								background: '#ffffff',
								border: '1px solid #d9d9d9',
								borderRadius: 6,
								cursor: 'pointer',
							}}
						>
							平滑更新为随机值
						</button>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					通过 `ref` 可以调用 `start()`、`reset()`、`update(newEnd)` 动态控制动画。
				</p>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 640 }}>
					<CodeSnippet
						language="typescript"
						code={`import { CountUp } from 'react-public-components';

export default function App() {
  return (
    <CountUp
      start={0}
      end={1284560.85}
      prefix="¥"
      decimals={2}
      duration={2.5}
      separator=","
    />
  );
}`}
					/>
				</div>
			</div>

			<ApiTable
				data={[
					{ name: 'end', desc: '目标终点数值', type: 'number', required: true },
					{ name: 'start', desc: '起始数值', type: 'number', default: '0' },
					{ name: 'duration', desc: '数字滚动动画持续时间（秒）', type: 'number', default: '2' },
					{ name: 'decimals', desc: '保留小数位数', type: 'number', default: '0' },
					{ name: 'prefix', desc: '数字前缀字符或节点（如 ¥、$）', type: 'ReactNode', default: '-' },
					{ name: 'suffix', desc: '数字后缀字符或节点（如 %、人）', type: 'ReactNode', default: '-' },
					{ name: 'decimal', desc: '小数点符号字符', type: 'string', default: "'.'" },
					{ name: 'separator', desc: '千分位分隔符（传空字符串禁用）', type: 'string', default: "','" },
					{ name: 'useEasing', desc: '是否使用平滑缓动曲线', type: 'boolean', default: 'true' },
					{ name: 'autoStart', desc: '是否在挂载完成后自动开始滚动动画', type: 'boolean', default: 'true' },
					{ name: 'onEnd', desc: '滚动动画完成时的回调函数', type: '() => void', default: '-' },
					{ name: 'ref', desc: '支持通过 ref 获得实例调用 start(), reset(), update(val)', type: 'RefObject<CountUpRef>', default: '-' },
					{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
					{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
				]}
			/>
		</div>
	);
}
