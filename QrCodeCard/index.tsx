import React, { useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { ReloadOutlined, LoadingOutlined, DownloadOutlined } from '../src/icons';
import './index.less';

export type QrCodeStatus = 'active' | 'expired' | 'loading';

export interface QrCodeCardProps {
	/** 二维码内容或跳转 URL */
	value: string;
	/** 二维码尺寸（像素），默认为 160 */
	size?: number;
	/** 二维码颜色，默认为 #1a1a1a */
	color?: string;
	/** 二维码背景色，默认为 #ffffff */
	backgroundColor?: string;
	/** 中心嵌入的 Logo 图标地址 */
	icon?: string;
	/** 中心 Logo 的尺寸（像素），默认根据 size 自动计算 (约 22%) */
	iconSize?: number;
	/** 二维码状态：'active' 正常，'expired' 已过期，'loading' 生成中，默认为 'active' */
	status?: QrCodeStatus;
	/** 卡片主标题说明 */
	title?: ReactNode;
	/** 卡片副标题或扫码引导文案 */
	description?: ReactNode;
	/** 是否显示一键下载二维码按钮，默认为 false */
	downloadable?: boolean;
	/** 是否显示四角扫码引导角标，默认为 false */
	bordered?: boolean;
	/** 点击过期遮罩刷新时的回调 */
	onRefresh?: () => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

// 经典的 25x25 规整 QR 矩阵模式生成器（带标准 3 方位探测器与时钟同步条）
function renderQrCode(
	canvas: HTMLCanvasElement,
	text: string,
	size: number,
	color: string = '#1a1a1a',
	bgColor: string = '#ffffff',
) {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const dpr = window.devicePixelRatio || 2;
	canvas.width = size * dpr;
	canvas.height = size * dpr;
	ctx.scale(dpr, dpr);

	// 背景
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, size, size);

	const modules = 25; // 25x25 矩阵
	const padding = 1.5; // 安全边距留白 (Quiet Zone)
	const effectiveSize = size;
	const cellSize = effectiveSize / (modules + padding * 2);
	const startOffset = padding * cellSize;

	ctx.fillStyle = color;

	// 绘制三个角的定位探测图案 (Position Detection Patterns)
	const drawPositionPattern = (row: number, col: number) => {
		const ox = startOffset + col * cellSize;
		const oy = startOffset + row * cellSize;

		// 1. 外层 7x7 实心黑方块（带圆角）
		ctx.fillStyle = color;
		ctx.fillRect(ox, oy, 7 * cellSize, 7 * cellSize);

		// 2. 内层 5x5 白色挖空方块
		ctx.fillStyle = bgColor;
		ctx.fillRect(ox + 1 * cellSize, oy + 1 * cellSize, 5 * cellSize, 5 * cellSize);

		// 3. 中心 3x3 实心黑方块
		ctx.fillStyle = color;
		ctx.fillRect(ox + 2 * cellSize, oy + 2 * cellSize, 3 * cellSize, 3 * cellSize);
	};

	drawPositionPattern(0, 0);
	drawPositionPattern(0, modules - 7);
	drawPositionPattern(modules - 7, 0);

	// 绘制时钟同步线 (Timing Patterns)
	for (let i = 8; i < modules - 8; i++) {
		if (i % 2 === 0) {
			ctx.fillRect(startOffset + i * cellSize, startOffset + 6 * cellSize, cellSize, cellSize);
			ctx.fillRect(startOffset + 6 * cellSize, startOffset + i * cellSize, cellSize, cellSize);
		}
	}

	// 基于文本字符串的 hash 填充数据点
	let hash = 0;
	for (let i = 0; i < text.length; i++) {
		hash = (hash << 5) - hash + text.charCodeAt(i);
		hash |= 0;
	}

	for (let r = 0; r < modules; r++) {
		for (let c = 0; c < modules; c++) {
			// 跳过三个角的位置
			if (
				(r < 8 && c < 8) ||
				(r < 8 && c >= modules - 8) ||
				(r >= modules - 8 && c < 8) ||
				r === 6 ||
				c === 6
			) {
				continue;
			}

			const seed = (r * 37 + c * 23 + (hash ^ (r * c))) % 100;
			if (Math.abs(seed) % 2 === 0) {
				ctx.fillStyle = color;
				// 轻微圆角方块效果
				const x = startOffset + c * cellSize;
				const y = startOffset + r * cellSize;
				ctx.fillRect(x, y, cellSize - 0.15, cellSize - 0.15);
			}
		}
	}
}

const QrCodeCard: React.FC<QrCodeCardProps> = ({
	value,
	size = 160,
	color = '#1f1f1f',
	backgroundColor = '#ffffff',
	icon,
	iconSize,
	status = 'active',
	title,
	description,
	downloadable = false,
	bordered = false,
	onRefresh,
	className = '',
	style,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const calculatedLogoSize = iconSize || Math.max(28, Math.round(size * 0.22));

	useEffect(() => {
		if (canvasRef.current && value) {
			renderQrCode(canvasRef.current, value, size, color, backgroundColor);
		}
	}, [value, size, color, backgroundColor]);

	const handleDownload = () => {
		if (!canvasRef.current) return;
		const url = canvasRef.current.toDataURL('image/png');
		const a = document.createElement('a');
		a.href = url;
		a.download = `qrcode-${Date.now()}.png`;
		a.click();
	};

	return (
		<div className={`rpc_qrcode_card ${className}`} style={style}>
			<div
				className={`rpc_qrcode_card_wrap ${bordered ? 'rpc_qrcode_card_wrap_bordered' : ''}`}
				style={{ width: size + 24, height: size + 24 }}
			>
				<canvas
					ref={canvasRef}
					className="rpc_qrcode_card_canvas"
					style={{ width: size, height: size }}
				/>

				{/* 嵌入中心 Logo */}
				{icon && status === 'active' && (
					<img
						src={icon}
						alt="Logo"
						className="rpc_qrcode_card_logo"
						style={{ width: calculatedLogoSize, height: calculatedLogoSize }}
					/>
				)}

				{/* 过期遮罩 */}
				{status === 'expired' && (
					<div className="rpc_qrcode_card_mask rpc_qrcode_card_mask_expired" onClick={onRefresh}>
						<div className="rpc_qrcode_card_mask_title">二维码已失效</div>
						<button
							type="button"
							className="rpc_qrcode_card_refresh_btn"
							onClick={(e) => {
								e.stopPropagation();
								onRefresh?.();
							}}
						>
							<ReloadOutlined className="rpc_qrcode_card_refresh_icon" />
							<span>点击刷新</span>
						</button>
					</div>
				)}

				{/* 加载中遮罩 */}
				{status === 'loading' && (
					<div className="rpc_qrcode_card_mask rpc_qrcode_card_mask_loading">
						<div className="rpc_qrcode_card_spinner_wrap">
							<LoadingOutlined className="rpc_qrcode_card_spinner" />
						</div>
						<span className="rpc_qrcode_card_mask_text">加载中...</span>
					</div>
				)}
			</div>

			{/* 标题说明 */}
			{(title || description) && (
				<div className="rpc_qrcode_card_info">
					{title && <div className="rpc_qrcode_card_title">{title}</div>}
					{description && <div className="rpc_qrcode_card_description">{description}</div>}
				</div>
			)}

			{/* 下载链接 */}
			{downloadable && status === 'active' && (
				<button type="button" className="rpc_qrcode_card_download" onClick={handleDownload}>
					<DownloadOutlined style={{ marginRight: 4, fontSize: 13 }} />
					<span>下载二维码</span>
				</button>
			)}
		</div>
	);
};

export default QrCodeCard;
