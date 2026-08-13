import { useState } from 'react';
import ColorPicker, { Color } from '../../../ColorPicker';
import { DownOutlined } from '../../../src/icons';

export default function ColorPickerDemo() {
	const [controlledColor1, setControlledColor1] = useState<Color | string>('#1677ff');
	const [controlledColor2, setControlledColor2] = useState<Color | string>('#1677ff');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 12.1 基础用法 & 尺寸 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					12.1 基础用法 & 触发器尺寸 (size="small" | "middle" | "large")
				</h3>
				<div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 16 }}>
					<ColorPicker size="small" defaultValue="#1677ff" showText />
					<ColorPicker size="middle" defaultValue="#52c41a" showText />
					<ColorPicker size="large" defaultValue="#722ed1" showText />
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持设置三种尺寸与显示颜色文本。
				</p>
			</div>

			{/* 12.2 清除颜色 (allowClear) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>12.2 清除颜色 (allowClear)</h3>
				<div style={{ marginTop: 16 }}>
					<ColorPicker defaultValue="#1677ff" showText allowClear />
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					设置 allowClear 允许清除选择的颜色。打开调色面板后，点击面板右上角的斜线图标即可清除颜色。
				</p>
			</div>

			{/* 12.3 渲染触发器文本 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>12.3 渲染触发器文本 (showText)</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
					<div>
						<ColorPicker defaultValue="#1677ff" showText />
					</div>
					<div>
						<ColorPicker
							defaultValue="#395c8c"
							showText={(color) =>
								`Custom Text (${Array.isArray(color) ? 'Gradient' : color.toHexString()})`
							}
						/>
					</div>
					<div>
						<ColorPicker
							defaultValue="#1677ff"
							showText={() => <DownOutlined style={{ fontSize: 10, color: '#bfbfbf' }} />}
						/>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					渲染触发器的默认文本，showText 为 true 时生效。自定义文本时，可以使用 showText
					为函数的方式，返回自定义的文本。
				</p>
			</div>

			{/* 12.4 禁用透明度 (disabledAlpha) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>12.4 禁用透明度 (disabledAlpha)</h3>
				<div style={{ marginTop: 16 }}>
					<ColorPicker disabledAlpha defaultValue="#234671" />
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>禁用颜色透明度。</p>
			</div>

			{/* 12.5 自定义触发器 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>12.5 自定义触发器</h3>
				<div style={{ marginTop: 16 }}>
					<ColorPicker defaultValue="#1677ff">
						{(color) => (
							<button
								style={{
									background: color.toCssString(),
									color: '#fff',
									border: 'none',
									padding: '6px 16px',
									borderRadius: 6,
									fontSize: 14,
									cursor: 'pointer',
									transition: 'background-color 0.2s',
								}}
							>
								open
							</button>
						)}
					</ColorPicker>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					自定义颜色面板的触发器，按钮背景颜色跟随选中的颜色实时变化。
				</p>
			</div>

			{/* 12.6 颜色编码 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>12.6 颜色编码</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
					<div>
						<ColorPicker
							format="hex"
							defaultValue="#1677ff"
							showText={(color) =>
								`HEX: ${Array.isArray(color) ? 'Gradient' : color.toHexString()}`
							}
						/>
					</div>
					<div>
						<ColorPicker
							format="hsb"
							defaultValue="#1677ff"
							showText={(color) =>
								`HSB: ${Array.isArray(color) ? 'Gradient' : color.toHsbString()}`
							}
						/>
					</div>
					<div>
						<ColorPicker
							format="rgb"
							defaultValue="#1677ff"
							showText={(color) =>
								`RGB: ${Array.isArray(color) ? 'Gradient' : color.toRgbString()}`
							}
						/>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					编码格式，支持 HEX、HSB、RGB。
				</p>
			</div>

			{/* 12.7 预设颜色 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>12.7 预设颜色 (presets)</h3>
				<div style={{ marginTop: 16 }}>
					<ColorPicker
						defaultValue="#1677ff"
						showText
						presets={[
							{
								label: '推荐颜色',
								colors: ['#1677ff', '#52c41a', '#fa8c16', '#f5222d', '#722ed1', '#13c2c2'],
							},
							{
								label: '黑白灰',
								colors: ['#000000', '#262626', '#595959', '#8c8c8c', '#bfbfbf', '#ffffff'],
							},
						]}
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持配置预设颜色组，方便用户快速点选。
				</p>
			</div>

			{/* 12.8 渐变色 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					12.8 渐变色 (mode="gradient" & mode={['single', 'gradient']})
				</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
					<div>
						<ColorPicker
							mode="gradient"
							defaultValue="rgb(16,142,233) 0%, rgb(135,208,104) 100%"
							showText
						/>
						<p style={{ color: '#8c8c8c', fontSize: 12, marginTop: 4 }}>
							固定渐变色模式 (mode="gradient")
						</p>
					</div>

					<div>
						<ColorPicker
							mode={['single', 'gradient']}
							defaultValue="rgb(16,142,233) 0%, rgb(135,208,104) 100%"
							showText
						/>
						<p style={{ color: '#8c8c8c', fontSize: 12, marginTop: 4 }}>
							单色/渐变自由切换 (mode={['single', 'gradient']})
						</p>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					通过 mode 设置颜色为单一颜色还是渐变色，支持拖拽渐变停靠点与独立设置颜色。
				</p>
			</div>

			{/* 12.9 自定义面板 (panelRender) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>12.9 自定义面板 (panelRender)</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<span style={{ fontSize: 14 }}>Add title:</span>
						<ColorPicker
							defaultValue="#1677ff"
							panelRender={(panel) => (
								<div>
									<div
										style={{
											padding: '4px 0 8px 0',
											fontWeight: 600,
											borderBottom: '1px solid #f0f0f0',
											marginBottom: 8,
											fontSize: 13,
										}}
									>
										Color Picker
									</div>
									{panel}
								</div>
							)}
						/>
					</div>

					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<span style={{ fontSize: 14 }}>Horizontal layout:</span>
						<ColorPicker
							defaultValue="#2E62AB"
							presets={[
								{
									label: 'primary',
									colors: [
										'#e6f4ff',
										'#bae0ff',
										'#91caff',
										'#69b1ff',
										'#4096ff',
										'#1677ff',
										'#0958d9',
										'#003eb3',
										'#002c8c',
									],
								},
								{
									label: 'red',
									colors: [
										'#fff1f0',
										'#ffccc7',
										'#ffa39e',
										'#ff7875',
										'#ff4d4f',
										'#f5222d',
										'#cf1322',
										'#a8071a',
										'#820014',
									],
								},
								{
									label: 'green',
									colors: [
										'#f6ffed',
										'#d9f7be',
										'#b7eb8f',
										'#95de64',
										'#73d13d',
										'#52c41a',
										'#389e0d',
										'#237804',
										'#135200',
									],
								},
								{
									label: 'cyan',
									colors: [
										'#e6fffb',
										'#b5f5ec',
										'#87e8de',
										'#5cdbd3',
										'#36cfc9',
										'#13c2c2',
										'#08979c',
										'#006d75',
										'#00474f',
									],
								},
							]}
							panelRender={(_, { components: { Picker, Presets } }) => (
								<div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
									<div>{Presets()}</div>
									<div style={{ borderLeft: '1px solid #f0f0f0', paddingLeft: 16 }}>
										{Picker()}
									</div>
								</div>
							)}
						/>
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					通过 panelRender 自由控制面板的渲染。
				</p>
			</div>

			{/* 12.10 禁用 (disabled) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>12.10 禁用 (disabled)</h3>
				<div style={{ marginTop: 16 }}>
					<ColorPicker disabled defaultValue="#1677ff" showText />
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>设置为禁用状态。</p>
			</div>

			{/* 12.11 受控模式 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>12.11 受控模式</h3>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
					<ColorPicker value={controlledColor1} onChange={(c) => setControlledColor1(c)} />
					<ColorPicker
						value={controlledColor2}
						onChangeComplete={(c) => setControlledColor2(c)}
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					受控模式。通过 value 和 onChange 设置组件为受控模式，如果通过 onChangeComplete
					受控则会锁定展示颜色。
				</p>
			</div>
		</div>
	);
}
