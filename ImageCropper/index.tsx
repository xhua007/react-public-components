import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useImperativeHandle,
	forwardRef,
	ReactNode,
	CSSProperties,
} from 'react';
import ReactDOM from 'react-dom';
import {
	RotateRightOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
	CloseOutlined,
	CheckOutlined,
} from '../src/icons';
import './index.less';

export type CropShape = 'rect' | 'round';

export interface CropResult {
	dataURL: string;
	blob: Blob | null;
	width: number;
	height: number;
}

export interface ImageCropperRef {
	/** 获取当前裁剪结果（DataURL 与 Blob） */
	getCroppedResult: (type?: string, quality?: number) => Promise<CropResult>;
	/** 顺时针旋转 90 度 */
	rotate: (degree?: number) => void;
	/** 缩放图片 */
	zoom: (delta: number) => void;
	/** 重置所有变换参数 */
	reset: () => void;
}

export interface ImageCropperProps {
	/** 图片源地址或 Base64 字符串 */
	src: string;
	/** 裁剪框宽高比（如 1 代表 1:1 正方形，16/9 代表宽屏，0 代表自由矩形），默认为 1 */
	aspectRatio?: number;
	/** 裁剪框形状：'rect' 矩形，'round' 圆形（适合头像），默认为 'rect' */
	shape?: CropShape;
	/** 是否以 Modal 模态弹窗形式展示，默认为 false */
	modal?: boolean;
	/** Modal 模式下的标题，默认为 '图片裁剪' */
	title?: ReactNode;
	/** Modal 模式下的显隐受控状态 */
	open?: boolean;
	/** 确认裁剪回调 */
	onOk?: (result: CropResult) => void;
	/** 取消/关闭回调 */
	onCancel?: () => void;
	/** 容器高度（内联模式有效），默认为 360 */
	height?: number;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const ImageCropper = forwardRef<ImageCropperRef, ImageCropperProps>(
	(
		{
			src,
			aspectRatio = 1,
			shape = 'rect',
			modal = false,
			title = '图片裁剪',
			open = true,
			onOk,
			onCancel,
			height = 360,
			className = '',
			style,
		},
		ref,
	) => {
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const containerRef = useRef<HTMLDivElement>(null);
		const imgRef = useRef<HTMLImageElement | null>(null);

		// 图片变换参数
		const [scale, setScale] = useState<number>(1);
		const [rotateDeg, setRotateDeg] = useState<number>(0);
		const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
		const isDraggingRef = useRef<boolean>(false);
		const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

		// 加载图片
		useEffect(() => {
			if (!src) return;
			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.src = src;
			img.onload = () => {
				imgRef.current = img;
				// 初始计算合适缩放比例
				setScale(1);
				setRotateDeg(0);
				setOffset({ x: 0, y: 0 });
				renderCanvas(1, 0, { x: 0, y: 0 });
			};
		}, [src]);

		// 重新渲染 Canvas
		const renderCanvas = useCallback(
			(curScale: number, curDeg: number, curOffset: { x: number; y: number }) => {
				const canvas = canvasRef.current;
				const img = imgRef.current;
				if (!canvas || !img) return;

				const ctx = canvas.getContext('2d');
				if (!ctx) return;

				const dpr = window.devicePixelRatio || 1;
				const width = canvas.clientWidth || 400;
				const canvasHeight = canvas.clientHeight || height;

				canvas.width = width * dpr;
				canvas.height = canvasHeight * dpr;
				ctx.scale(dpr, dpr);

				ctx.clearRect(0, 0, width, canvasHeight);
				ctx.save();

				// 移动到中心点进行旋转、缩放与平移
				const centerX = width / 2 + curOffset.x;
				const centerY = canvasHeight / 2 + curOffset.y;

				ctx.translate(centerX, centerY);
				ctx.rotate((curDeg * Math.PI) / 180);
				ctx.scale(curScale, curScale);

				// 居中绘制原始图像
				const imgWidth = img.naturalWidth || img.width;
				const imgHeight = img.naturalHeight || img.height;

				// 保持图像按比例自适应居中
				const baseRatio = Math.min((width * 0.8) / imgWidth, (canvasHeight * 0.8) / imgHeight, 1);
				const renderW = imgWidth * baseRatio;
				const renderH = imgHeight * baseRatio;

				ctx.drawImage(img, -renderW / 2, -renderH / 2, renderW, renderH);
				ctx.restore();
			},
			[height],
		);

		useEffect(() => {
			renderCanvas(scale, rotateDeg, offset);
		}, [scale, rotateDeg, offset, renderCanvas]);

		// 鼠标拖拽平移
		const handleMouseDown = (e: React.MouseEvent) => {
			isDraggingRef.current = true;
			dragStartRef.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
		};

		const handleMouseMove = (e: React.MouseEvent) => {
			if (!isDraggingRef.current) return;
			const nextOffset = {
				x: e.clientX - dragStartRef.current.x,
				y: e.clientY - dragStartRef.current.y,
			};
			setOffset(nextOffset);
		};

		const handleMouseUp = () => {
			isDraggingRef.current = false;
		};

		// 滚轮缩放
		const handleWheel = (e: React.WheelEvent) => {
			e.preventDefault();
			const zoomStep = e.deltaY < 0 ? 0.1 : -0.1;
			setScale((prev) => Math.min(Math.max(0.2, prev + zoomStep), 5));
		};

		// 顺时针旋转
		const handleRotate = (deg = 90) => {
			setRotateDeg((prev) => (prev + deg) % 360);
		};

		const handleZoom = (delta: number) => {
			setScale((prev) => Math.min(Math.max(0.2, prev + delta), 5));
		};

		const handleReset = () => {
			setScale(1);
			setRotateDeg(0);
			setOffset({ x: 0, y: 0 });
		};

		// 计算裁剪框尺寸与位置
		const getCropBoxRect = () => {
			const container = containerRef.current;
			const containerW = container?.clientWidth || 400;
			const containerH = height;

			let boxW = Math.min(containerW * 0.7, 240);
			let boxH = aspectRatio ? boxW / aspectRatio : boxW;

			if (boxH > containerH * 0.8) {
				boxH = containerH * 0.8;
				boxW = aspectRatio ? boxH * aspectRatio : boxH;
			}

			const boxLeft = (containerW - boxW) / 2;
			const boxTop = (containerH - boxH) / 2;

			return { left: boxLeft, top: boxTop, width: boxW, height: boxH };
		};

		// 提取裁剪区域生成图片
		const getCroppedResult = useCallback(
			async (type = 'image/png', quality = 0.92): Promise<CropResult> => {
				const canvas = canvasRef.current;
				if (!canvas) throw new Error('Canvas not found');

				const cropBox = getCropBoxRect();
				const dpr = window.devicePixelRatio || 1;

				const cropCanvas = document.createElement('canvas');
				cropCanvas.width = cropBox.width * dpr;
				cropCanvas.height = cropBox.height * dpr;
				const cropCtx = cropCanvas.getContext('2d');

				if (!cropCtx) throw new Error('Failed to create canvas context');

				if (shape === 'round') {
					cropCtx.beginPath();
					cropCtx.arc(
						(cropBox.width * dpr) / 2,
						(cropBox.height * dpr) / 2,
						(cropBox.width * dpr) / 2,
						0,
						Math.PI * 2,
					);
					cropCtx.closePath();
					cropCtx.clip();
				}

				cropCtx.drawImage(
					canvas,
					cropBox.left * dpr,
					cropBox.top * dpr,
					cropBox.width * dpr,
					cropBox.height * dpr,
					0,
					0,
					cropBox.width * dpr,
					cropBox.height * dpr,
				);

				const dataURL = cropCanvas.toDataURL(type, quality);
				const blob: Blob | null = await new Promise((resolve) => {
					cropCanvas.toBlob((b) => resolve(b), type, quality);
				});

				return {
					dataURL,
					blob,
					width: Math.round(cropBox.width),
					height: Math.round(cropBox.height),
				};
			},
			[shape, aspectRatio, height],
		);

		useImperativeHandle(
			ref,
			() => ({
				getCroppedResult,
				rotate: handleRotate,
				zoom: handleZoom,
				reset: handleReset,
			}),
			[getCroppedResult],
		);

		const handleConfirm = async () => {
			const res = await getCroppedResult();
			onOk?.(res);
		};

		const cropBox = getCropBoxRect();

		const coreContent = (
			<div
				className={`rpc_image_cropper ${className}`}
				style={{ ...style }}
			>
				<div
					ref={containerRef}
					className="rpc_image_cropper_canvas_wrap"
					style={{ height }}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
					onWheel={handleWheel}
				>
					<canvas
						ref={canvasRef}
						className="rpc_image_cropper_canvas"
						style={{ width: '100%', height }}
					/>

					{/* 裁剪框与遮罩 */}
					<div
						className={`rpc_image_cropper_crop_box ${
							shape === 'round' ? 'rpc_image_cropper_crop_box_round' : ''
						}`}
						style={{
							left: `${cropBox.left}px`,
							top: `${cropBox.top}px`,
							width: `${cropBox.width}px`,
							height: `${cropBox.height}px`,
						}}
					>
						{shape === 'rect' && <div className="rpc_image_cropper_crop_box_grid" />}
					</div>
				</div>

				{/* 底部工具栏 */}
				<div className="rpc_image_cropper_toolbar">
					<button
						type="button"
						className="rpc_image_cropper_btn"
						onClick={() => handleZoom(0.1)}
						title="放大"
					>
						<ZoomInOutlined /> 放大
					</button>
					<button
						type="button"
						className="rpc_image_cropper_btn"
						onClick={() => handleZoom(-0.1)}
						title="缩小"
					>
						<ZoomOutOutlined /> 缩小
					</button>
					<button
						type="button"
						className="rpc_image_cropper_btn"
						onClick={() => handleRotate(90)}
						title="顺时针旋转90°"
					>
						<RotateRightOutlined /> 旋转
					</button>
					<button
						type="button"
						className="rpc_image_cropper_btn"
						onClick={handleReset}
						title="重置"
					>
						重置
					</button>
				</div>
			</div>
		);

		if (modal) {
			if (!open) return null;
			return ReactDOM.createPortal(
				<div className="rpc_cropper_modal" onClick={onCancel}>
					<div className="rpc_cropper_modal_card" onClick={(e) => e.stopPropagation()}>
						<div className="rpc_cropper_modal_header">
							<span>{title}</span>
							<CloseOutlined className="rpc_cropper_modal_close" onClick={onCancel} />
						</div>
						<div style={{ padding: 16, background: '#141414' }}>{coreContent}</div>
						<div className="rpc_cropper_modal_footer">
							<button
								type="button"
								className="rpc_image_cropper_btn"
								style={{ background: '#ffffff', color: '#262626', borderColor: '#d9d9d9' }}
								onClick={onCancel}
							>
								取消
							</button>
							<button
								type="button"
								className="rpc_image_cropper_btn rpc_image_cropper_btn_primary"
								onClick={handleConfirm}
							>
								<CheckOutlined /> 确定裁剪
							</button>
						</div>
					</div>
				</div>,
				document.body,
			);
		}

		return coreContent;
	},
);

ImageCropper.displayName = 'ImageCropper';

export default ImageCropper;
