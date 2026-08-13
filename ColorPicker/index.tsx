import {
	useState,
	useRef,
	useEffect,
	useCallback,
	type ReactNode,
	type HTMLAttributes,
	type FC,
	type Key,
	type MouseEvent as ReactMouseEvent,
} from 'react';
import {
	Color,
	generateColor,
	type ColorInput,
	type HsbColor,
	type RgbColor,
	type ColorGradientStop,
	parseGradientStops,
	formatGradientCss,
	formatGradientText,
} from './Color';
import { CloseCircleFilled, DownOutlined } from '../src/icons';
import './index.less';

export { Color, generateColor };
export type { HsbColor, RgbColor, ColorInput, ColorGradientStop };

export type ColorFormat = 'hex' | 'rgb' | 'hsb';
export type ColorMode = 'single' | 'gradient';

export interface ColorPresetItem {
	label: ReactNode;
	colors: (string | Color)[];
	defaultOpen?: boolean;
	key?: Key;
}

export interface ColorPickerProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onChange' | 'value' | 'defaultValue' | 'children'
> {
	allowClear?: boolean;
	arrow?: boolean | { pointAtCenter?: boolean };
	children?: ReactNode | ((color: Color) => ReactNode);
	defaultValue?: ColorInput;
	defaultFormat?: ColorFormat;
	disabled?: boolean;
	disabledAlpha?: boolean;
	disabledFormat?: boolean;
	destroyOnHidden?: boolean;
	format?: ColorFormat;
	mode?: ColorMode | ColorMode[];
	open?: boolean;
	presets?: ColorPresetItem[];
	placement?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
	panelRender?: (panel: ReactNode, extra: { components: { Picker: FC; Presets: FC } }) => ReactNode;
	showText?: boolean | ((color: Color | ColorGradientStop[]) => ReactNode);
	size?: 'large' | 'middle' | 'small';
	trigger?: 'hover' | 'click';
	value?: ColorInput;
	onChange?: (value: Color, css: string) => void;
	onChangeComplete?: (value: Color) => void;
	onFormatChange?: (format: ColorFormat) => void;
	onOpenChange?: (open: boolean) => void;
	onClear?: () => void;
}

const ColorPicker = (props: ColorPickerProps) => {
	const {
		allowClear = false,
		arrow = true,
		children,
		defaultValue = '#1677ff',
		defaultFormat = 'hex',
		disabled = false,
		disabledAlpha = false,
		disabledFormat = false,
		destroyOnHidden = false,
		format,
		mode = 'single',
		open,
		presets,
		placement = 'bottomLeft',
		panelRender,
		showText,
		size = 'middle',
		trigger = 'click',
		value,
		onChange,
		onChangeComplete,
		onFormatChange,
		onOpenChange,
		onClear,
		className = '',
		style,
		...restProps
	} = props;

	// Mode 管理 (single / gradient)
	const modeOptions: ColorMode[] = Array.isArray(mode)
		? mode
		: mode === 'gradient'
			? ['gradient']
			: ['single'];
	const [activeMode, setActiveMode] = useState<ColorMode>(modeOptions[0] ?? 'single');

	// 受控 / 非受控 Open
	const [internalOpen, setInternalOpen] = useState<boolean>(false);
	const isOpen = open !== undefined ? open : internalOpen;

	// 渐变 Stops 状态
	const [gradientStops, setGradientStops] = useState<ColorGradientStop[]>(() => {
		if (typeof defaultValue === 'string' && defaultValue.includes('%')) {
			return parseGradientStops(defaultValue);
		}
		return [
			{ color: generateColor('rgb(16, 142, 233)'), percent: 0 },
			{ color: generateColor('rgb(135, 208, 104)'), percent: 100 },
		];
	});
	const [activeStopIndex, setActiveStopIndex] = useState<number>(0);

	// 受控 / 非受控 Value
	const [internalColor, setInternalColor] = useState<Color>(() => generateColor(defaultValue));
	const currentColor =
		activeMode === 'gradient'
			? (gradientStops[activeStopIndex]?.color ?? internalColor)
			: value !== undefined
				? generateColor(value)
				: internalColor;

	// 受控 / 非受控 Format
	const [internalFormat, setInternalFormat] = useState<ColorFormat>(defaultFormat);
	const currentFormat = format !== undefined ? format : internalFormat;

	const containerRef = useRef<HTMLDivElement>(null);
	const paletteRef = useRef<HTMLDivElement>(null);
	const hueSliderRef = useRef<HTMLDivElement>(null);
	const alphaSliderRef = useRef<HTMLDivElement>(null);
	const gradientRailRef = useRef<HTMLDivElement>(null);

	const isDraggingRef = useRef<boolean>(false);

	const handleOpenChange = useCallback(
		(nextOpen: boolean) => {
			if (disabled) return;
			if (open === undefined) {
				setInternalOpen(nextOpen);
			}
			onOpenChange?.(nextOpen);
		},
		[disabled, open, onOpenChange],
	);

	const updateColor = useCallback(
		(nextColor: Color, isComplete = false) => {
			if (activeMode === 'gradient') {
				const nextStops = [...gradientStops];
				nextStops[activeStopIndex] = {
					...nextStops[activeStopIndex],
					color: nextColor,
				};
				setGradientStops(nextStops);
				const cssStr = formatGradientCss(nextStops);
				onChange?.(nextColor, cssStr);
				if (isComplete) {
					onChangeComplete?.(nextColor);
				}
				return;
			}

			if (value === undefined) {
				setInternalColor(nextColor);
			}
			onChange?.(nextColor, nextColor.toCssString());
			if (isComplete) {
				onChangeComplete?.(nextColor);
			}
		},
		[activeMode, gradientStops, activeStopIndex, value, onChange, onChangeComplete],
	);

	// 点击外部关闭
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				handleOpenChange(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleOpenChange]);

	// SV 画板拖拽逻辑
	const handlePaletteDrag = useCallback(
		(e: MouseEvent | ReactMouseEvent) => {
			if (!paletteRef.current) return;
			const rect = paletteRef.current.getBoundingClientRect();
			const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
			const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

			const s = Math.round((x / rect.width) * 100);
			const b = Math.round((1 - y / rect.height) * 100);

			const newColor = new Color({
				h: currentColor.h,
				s,
				b,
				a: currentColor.a,
			});
			updateColor(newColor);
		},
		[currentColor, updateColor],
	);

	const handlePaletteMouseDown = (e: ReactMouseEvent) => {
		e.preventDefault();
		isDraggingRef.current = true;
		handlePaletteDrag(e);

		const handleMouseMove = (moveEvent: MouseEvent) => {
			if (isDraggingRef.current) {
				handlePaletteDrag(moveEvent);
			}
		};

		const handleMouseUp = () => {
			if (isDraggingRef.current) {
				isDraggingRef.current = false;
				onChangeComplete?.(currentColor);
			}
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	// Hue 拖拽逻辑
	const handleHueDrag = useCallback(
		(e: MouseEvent | ReactMouseEvent) => {
			if (!hueSliderRef.current) return;
			const rect = hueSliderRef.current.getBoundingClientRect();
			const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
			const h = Math.round((x / rect.width) * 360);

			const newColor = new Color({
				h: h === 360 ? 0 : h,
				s: currentColor.s,
				b: currentColor.b,
				a: currentColor.a,
			});
			updateColor(newColor);
		},
		[currentColor, updateColor],
	);

	const handleHueMouseDown = (e: ReactMouseEvent) => {
		e.preventDefault();
		handleHueDrag(e);

		const handleMouseMove = (moveEvent: MouseEvent) => {
			handleHueDrag(moveEvent);
		};

		const handleMouseUp = () => {
			onChangeComplete?.(currentColor);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	// Alpha 拖拽逻辑
	const handleAlphaDrag = useCallback(
		(e: MouseEvent | ReactMouseEvent) => {
			if (!alphaSliderRef.current) return;
			const rect = alphaSliderRef.current.getBoundingClientRect();
			const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
			const a = Number((x / rect.width).toFixed(2));

			const newColor = new Color({
				h: currentColor.h,
				s: currentColor.s,
				b: currentColor.b,
				a,
			});
			updateColor(newColor);
		},
		[currentColor, updateColor],
	);

	const handleAlphaMouseDown = (e: ReactMouseEvent) => {
		e.preventDefault();
		handleAlphaDrag(e);

		const handleMouseMove = (moveEvent: MouseEvent) => {
			handleAlphaDrag(moveEvent);
		};

		const handleMouseUp = () => {
			onChangeComplete?.(currentColor);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	// 渐变 Stop 拖拽逻辑
	const handleGradientStopDrag = useCallback(
		(index: number, e: MouseEvent | ReactMouseEvent) => {
			if (!gradientRailRef.current) return;
			const rect = gradientRailRef.current.getBoundingClientRect();
			const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
			const percent = Math.round((x / rect.width) * 100);

			const nextStops = [...gradientStops];
			nextStops[index] = {
				...nextStops[index],
				percent,
			};
			setGradientStops(nextStops);
			onChange?.(nextStops[index].color, formatGradientCss(nextStops));
		},
		[gradientStops, onChange],
	);

	const handleGradientStopMouseDown = (index: number, e: ReactMouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		setActiveStopIndex(index);

		const handleMouseMove = (moveEvent: MouseEvent) => {
			handleGradientStopDrag(index, moveEvent);
		};

		const handleMouseUp = () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	// 渐变轨空白处点击新增 Stop
	const handleGradientRailClick = (e: ReactMouseEvent) => {
		if (!gradientRailRef.current) return;
		const rect = gradientRailRef.current.getBoundingClientRect();
		const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
		const percent = Math.round((x / rect.width) * 100);

		const newStopColor = generateColor('#1677ff');
		const nextStops = [...gradientStops, { color: newStopColor, percent }];
		setGradientStops(nextStops);
		setActiveStopIndex(nextStops.length - 1);
		onChange?.(newStopColor, formatGradientCss(nextStops));
	};

	// Format 变化
	const handleFormatSelectChange = (newFormat: ColorFormat) => {
		if (format === undefined) {
			setInternalFormat(newFormat);
		}
		onFormatChange?.(newFormat);
	};

	// 清除颜色
	const handleClearClick = (e: ReactMouseEvent) => {
		e.stopPropagation();
		const cleared = new Color({ h: 0, s: 0, b: 100, a: 0 });
		updateColor(cleared, true);
		onClear?.();
	};

	// 纯 Picker 内容
	const renderPickerContent = () => {
		const hueColor = new Color({ h: currentColor.h, s: 100, b: 100, a: 1 }).toHexString();

		return (
			<div className="react-public-color-picker-panel-body">
				{/* Mode Segmented 选项卡 */}
				{modeOptions.length > 1 && (
					<div className="react-public-color-picker-mode-segmented">
						<div
							className={`react-public-color-picker-mode-option ${
								activeMode === 'single' ? 'active' : ''
							}`}
							onClick={() => setActiveMode('single')}
						>
							单色
						</div>
						<div
							className={`react-public-color-picker-mode-option ${
								activeMode === 'gradient' ? 'active' : ''
							}`}
							onClick={() => setActiveMode('gradient')}
						>
							渐变
						</div>
					</div>
				)}

				{/* 渐变 Slider Rail */}
				{activeMode === 'gradient' && (
					<div
						ref={gradientRailRef}
						className="react-public-color-picker-gradient-slider"
						onClick={handleGradientRailClick}
					>
						<div
							className="react-public-color-picker-gradient-bg"
							style={{ background: formatGradientCss(gradientStops) }}
						/>
						{gradientStops.map((stop, idx) => (
							<div
								key={idx}
								className={`react-public-color-picker-gradient-stop-handle ${
									activeStopIndex === idx ? 'active' : ''
								}`}
								style={{
									left: `${stop.percent}%`,
									backgroundColor: stop.color.toCssString(),
								}}
								onMouseDown={(e) => handleGradientStopMouseDown(idx, e)}
							/>
						))}
					</div>
				)}

				{/* SV 调色画布 */}
				<div
					ref={paletteRef}
					className="react-public-color-picker-palette"
					style={{ backgroundColor: hueColor }}
					onMouseDown={handlePaletteMouseDown}
				>
					<div className="react-public-color-picker-saturation-bg" />
					<div className="react-public-color-picker-brightness-bg" />
					<div
						className="react-public-color-picker-handler"
						style={{
							left: `${currentColor.s}%`,
							top: `${100 - currentColor.b}%`,
							backgroundColor: currentColor.toCssString(),
						}}
					/>
				</div>

				{/* Hue & Alpha 滑块与右侧色块 */}
				<div className="react-public-color-picker-slider-container">
					<div className="react-public-color-picker-slider-group">
						<div
							ref={hueSliderRef}
							className="react-public-color-picker-slider react-public-color-picker-hue-slider"
							onMouseDown={handleHueMouseDown}
						>
							<div
								className="react-public-color-picker-slider-handler"
								style={{
									left: `${(currentColor.h / 360) * 100}%`,
									backgroundColor: hueColor,
								}}
							/>
						</div>

						{!disabledAlpha && (
							<div
								ref={alphaSliderRef}
								className="react-public-color-picker-slider react-public-color-picker-alpha-slider"
								onMouseDown={handleAlphaMouseDown}
							>
								<div
									className="react-public-color-picker-alpha-bg"
									style={{
										background: `linear-gradient(to right, transparent, ${new Color({
											h: currentColor.h,
											s: currentColor.s,
											b: currentColor.b,
											a: 1,
										}).toHexString()})`,
									}}
								/>
								<div
									className="react-public-color-picker-slider-handler"
									style={{
										left: `${currentColor.a * 100}%`,
										backgroundColor: currentColor.toCssString(),
									}}
								/>
							</div>
						)}
					</div>

					{/* 右侧边栏预览色块 */}
					<div className="react-public-color-picker-side-block">
						<div
							className="react-public-color-picker-color-inner"
							style={
								activeMode === 'gradient'
									? { background: formatGradientCss(gradientStops) }
									: { backgroundColor: currentColor.toCssString() }
							}
						/>
					</div>
				</div>

				{/* Format 格式输入行 */}
				{!disabledFormat && (
					<div className="react-public-color-picker-inputs">
						<select
							className="react-public-color-picker-format-select"
							value={currentFormat}
							onChange={(e) => handleFormatSelectChange(e.target.value as ColorFormat)}
						>
							<option value="hex">HEX</option>
							<option value="rgb">RGB</option>
							<option value="hsb">HSB</option>
						</select>

						{currentFormat === 'hex' && (
							<input
								className="react-public-color-picker-input-field"
								value={currentColor.toHex()}
								onChange={(e) => {
									const val = e.target.value;
									const newC = new Color(`#${val}`);
									newC.a = currentColor.a;
									updateColor(newC, true);
								}}
							/>
						)}

						{currentFormat === 'rgb' && (
							<input
								className="react-public-color-picker-input-field"
								value={`${currentColor.toRgb().r}, ${currentColor.toRgb().g}, ${currentColor.toRgb().b}`}
								onChange={(e) => {
									const parts = e.target.value.split(',').map((v) => parseInt(v.trim(), 10));
									if (parts.length >= 3 && !parts.some((n) => isNaN(n))) {
										const newC = new Color({
											r: parts[0],
											g: parts[1],
											b: parts[2],
											a: currentColor.a,
										});
										updateColor(newC, true);
									}
								}}
							/>
						)}

						{currentFormat === 'hsb' && (
							<input
								className="react-public-color-picker-input-field"
								value={`${currentColor.h}°, ${currentColor.s}%, ${currentColor.b}%`}
								onChange={(e) => {
									const parts = e.target.value
										.replace(/[%°]/g, '')
										.split(',')
										.map((v) => parseInt(v.trim(), 10));
									if (parts.length >= 3 && !parts.some((n) => isNaN(n))) {
										const newC = new Color({
											h: parts[0],
											s: parts[1],
											b: parts[2],
											a: currentColor.a,
										});
										updateColor(newC, true);
									}
								}}
							/>
						)}

						{!disabledAlpha && (
							<input
								className="react-public-color-picker-alpha-input"
								value={`${Math.round(currentColor.a * 100)}%`}
								onChange={(e) => {
									const val = parseInt(e.target.value.replace('%', ''), 10);
									if (!isNaN(val)) {
										const newA = Math.max(0, Math.min(1, val / 100));
										const newC = new Color({
											h: currentColor.h,
											s: currentColor.s,
											b: currentColor.b,
											a: newA,
										});
										updateColor(newC, true);
									}
								}}
							/>
						)}
					</div>
				)}
			</div>
		);
	};

	// Presets 折叠状态
	const [collapsedPresets, setCollapsedPresets] = useState<Record<number, boolean>>({});

	const togglePresetCollapse = (idx: number) => {
		setCollapsedPresets((prev) => ({
			...prev,
			[idx]: !prev[idx],
		}));
	};

	// 纯 Presets 内容
	const renderPresetsContent = (isStandalone = false) => {
		if (!presets || presets.length === 0) return null;
		return (
			<div
				className={`react-public-color-picker-presets ${
					isStandalone ? 'react-public-color-picker-presets-standalone' : ''
				}`}
			>
				{presets.map((preset, idx) => {
					const isCollapsed = collapsedPresets[idx] ?? preset.defaultOpen === false;
					return (
						<div key={preset.key ?? idx} style={{ marginBottom: 8 }}>
							{preset.label && (
								<div
									className="react-public-color-picker-preset-title"
									onClick={() => togglePresetCollapse(idx)}
								>
									<DownOutlined
										style={{
											fontSize: 10,
											color: '#8c8c8c',
											transition: 'transform 0.2s ease',
											transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
										}}
									/>
									{preset.label}
								</div>
							)}
							{!isCollapsed && (
								<div className="react-public-color-picker-preset-colors">
									{preset.colors.map((c, colorIdx) => {
										const presetColor = generateColor(c);
										return (
											<div
												key={colorIdx}
												className="react-public-color-picker-preset-item"
												onClick={() => updateColor(presetColor, true)}
												title={presetColor.toCssString()}
											>
												<div
													className="react-public-color-picker-preset-item-inner"
													style={{ backgroundColor: presetColor.toCssString() }}
												/>
											</div>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
			</div>
		);
	};

	// 完整的 Popover Panel
	const defaultPanel = (
		<div>
			{renderPickerContent()}
			{renderPresetsContent(true)}
		</div>
	);

	const finalPanel = panelRender
		? panelRender(defaultPanel, {
				components: {
					Picker: renderPickerContent,
					Presets: () => renderPresetsContent(false),
				},
			})
		: defaultPanel;

	// 触发器背景与文本计算
	const triggerBgStyle =
		activeMode === 'gradient'
			? { background: formatGradientCss(gradientStops) }
			: { backgroundColor: currentColor.toCssString() };

	const renderText = () => {
		if (!showText) return null;
		if (typeof showText === 'function') {
			return showText(activeMode === 'gradient' ? gradientStops : currentColor);
		}
		const textContent =
			activeMode === 'gradient' ? formatGradientText(gradientStops) : currentColor.toCssString();
		return <span style={{ fontSize: 13, color: '#595959' }}>{textContent}</span>;
	};

	const renderCustomTrigger = () => {
		if (!children) return null;
		if (typeof children === 'function') {
			return children(currentColor);
		}
		return children;
	};

	// 事件监听 (hover / click)
	const triggerProps = {
		onClick: () => {
			if (trigger === 'click') {
				handleOpenChange(!isOpen);
			}
		},
		onMouseEnter: () => {
			if (trigger === 'hover') {
				handleOpenChange(true);
			}
		},
		onMouseLeave: () => {
			if (trigger === 'hover') {
				handleOpenChange(false);
			}
		},
	};

	const showArrow = typeof arrow === 'boolean' ? arrow : (arrow?.pointAtCenter ?? true);

	if (destroyOnHidden && !isOpen) {
		return (
			<div
				ref={containerRef}
				className={`react-public-color-picker-trigger react-public-color-picker-size-${size} ${
					disabled ? 'react-public-color-picker-disabled' : ''
				} ${className}`.trim()}
				style={style}
				{...triggerProps}
				{...restProps}
			>
				{children ? (
					renderCustomTrigger()
				) : (
					<>
						<div className="react-public-color-picker-color-block">
							<div className="react-public-color-picker-color-inner" style={triggerBgStyle} />
						</div>
						{renderText()}
					</>
				)}
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			style={{ position: 'relative', display: 'inline-block' }}
			{...triggerProps}
		>
			{/* 触发器 */}
			<div
				className={`react-public-color-picker-trigger react-public-color-picker-size-${size} ${
					disabled ? 'react-public-color-picker-disabled' : ''
				} ${className}`.trim()}
				style={style}
				{...restProps}
			>
				{children ? (
					renderCustomTrigger()
				) : (
					<>
						<div className="react-public-color-picker-color-block">
							<div className="react-public-color-picker-color-inner" style={triggerBgStyle} />
						</div>
						{renderText()}
					</>
				)}
				{allowClear && !disabled && (
					<CloseCircleFilled
						className="react-public-color-picker-clear-icon"
						onClick={handleClearClick}
					/>
				)}
			</div>

			{/* 弹出面板 */}
			{isOpen && (
				<div
					className={`react-public-color-picker-popover react-public-color-picker-popover-${placement}`}
					style={{
						top: placement.startsWith('bottom') ? 'calc(100% + 8px)' : undefined,
						bottom: placement.startsWith('top') ? 'calc(100% + 8px)' : undefined,
						left: placement.endsWith('Left') || placement === 'bottom' ? 0 : undefined,
						right: placement.endsWith('Right') ? 0 : undefined,
					}}
					onClick={(e) => e.stopPropagation()}
				>
					{showArrow && <div className="react-public-color-picker-arrow" />}
					{finalPanel}
				</div>
			)}
		</div>
	);
};

export default ColorPicker;
