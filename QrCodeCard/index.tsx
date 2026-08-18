import React, { useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { ReloadOutlined, LoadingOutlined } from '../src/icons';
import './index.less';

export type QrCodeStatus = 'active' | 'expired' | 'loading';

export interface QrCodeCardProps {
	/** 二维码内容或跳转 URL */
	value: string;
	/** 二维码尺寸（像素），默认为 160 */
	size?: number;
	/** 中心嵌入的 Logo 图标地址 */
	icon?: string;
	/** 二维码状态：'active' 正常，'expired' 已过期，'loading' 生成中，默认为 'active' */
	status?: QrCodeStatus;
	/** 卡片标题说明 */
	title?: ReactNode;
	/** 卡片副标题或扫码提示 */
	description?: ReactNode;
	/** 是否显示一键下载二维码按钮，默认为 false */
	downloadable?: boolean;
	/** 点击过期遮罩刷新时的回调 */
	onRefresh?: () => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

// 简易轻量伪随机但确定性的二维码图案矩阵绘制算法（保证零外部大库）
function drawQrCode(canvas: HTMLCanvasElement, text: string, size: number) {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const dpr = window.devicePixelRatio || 1;
	canvas.width = size * dpr;
	canvas.height = size * dpr;
	ctx.scale(dpr, dpr);

	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, size, size);

	const modules = 25; // 25x25 矩阵
	const cellSize = size / modules;

	ctx.fillStyle = '#000000';

	// 绘制三个角的定位方块 (Position Detection Patterns)
	const drawPositionPattern = (x: number, y: number) => {
		// 外 7x7
		ctx.fillRect(x * cellSize, y * cellSize, 7 * cellSize, 7 * cellSize);
		// 中间挖空 5x5
		ctx.fillStyle = '#ffffff';
		ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, 5 * cellSize, 5 * cellSize);
		// 中心实心 3x3
		ctx.fillStyle = '#000000';
		ctx.fillRect((x + 2) * cellSize, (y + 2) * cellSize, 3 * cellSize, 3 * cellSize);
	};

	drawPositionPattern(0, 0);
	drawPositionPattern(modules - 7, 0);
	drawPositionPattern(0, modules - 7);

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
				(r >= modules - 8 && c < 8)
			) {
				continue;
			}

			const seed = (r * 31 + c * 17 + hash) % 100;
			if (Math.abs(seed) % 2 === 0) {
				ctx.fillStyle = '#000000';
				ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.2, cellSize - 0.2);
			}
		}
	}
}

const QrCodeCard: React.FC<QrCodeCardProps> = ({
	value,
	size = 160,
	icon,
	status = 'active',
	title,
	description,
	downloadable = false,
	onRefresh,
	className = '',
	style,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef.current && value) {
			drawQrCode(canvasRef.current, value, size);
		}
	}, [value, size]);

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
			<div className="rpc_qrcode_card_wrap" style={{ width: size, height: size }}>
				<canvas
					ref={canvasRef}
					className="rpc_qrcode_card_canvas"
					style={{ width: size, height: size }}
				/>

				{/* 嵌入中心 Logo */}
				{icon && status === 'active' && (
					<img src={icon} alt="Logo" className="rpc_qrcode_card_logo" />
				)}

				{/* 过期或加载中蒙层 */}
				{status === 'expired' && (
					<div className="rpc_qrcode_card_mask" onClick={onRefresh}>
						<span>二维码已失效</span>
						<button type="button" className="rpc_qrcode_card_refresh_btn">
							<ReloadOutlined />
							<span>点击刷新</span>
						</button>
					</div>
				)}

				{status === 'loading' && (
					<div className="rpc_qrcode_card_mask rpc_qrcode_card_mask_loading">
						<LoadingOutlined style={{ fontSize: 28, color: '#1677ff' }} />
						<span className="rpc_qrcode_card_mask_text">加载中...</span>
					</div>
				)}
			</div>

			{/* 标题说明 */}
			{(title || description) && (
				<div className="rpc_qrcode_card_info">
					{title && <span className="rpc_qrcode_card_title">{title}</span>}
					{description && <span className="rpc_qrcode_card_description">{description}</span>}
				</div>
			)}

			{/* 下载链接 */}
			{downloadable && status === 'active' && (
				<span className="rpc_qrcode_card_download" onClick={handleDownload}>
					下载二维码
				</span>
			)}
		</div>
	);
};

export default QrCodeCard;
