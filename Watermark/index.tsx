import React, { useRef, useEffect, useCallback, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface WatermarkProps {
	/** 水印文本内容或多行文本数组 */
	content: string | string[];
	/** 子元素内容 */
	children?: ReactNode;
	/** 水印旋转角度，默认为 -22 */
	rotate?: number;
	/** 字体大小（像素），默认为 14 */
	fontSize?: number;
	/** 水印颜色，默认为 'rgba(0, 0, 0, 0.12)' */
	color?: string;
	/** 单个水印单元宽度，默认为 240 */
	width?: number;
	/** 单个水印单元高度，默认为 160 */
	height?: number;
	/** 水印层级 zIndex，默认为 9999 */
	zIndex?: number;
	/** 是否开启 MutationObserver 与心跳巡检防审查元素篡改，默认为 true */
	antiTamper?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

/** 生成 Canvas 水印平铺 Base64 图片 */
function generateWatermarkBase64(
	content: string | string[],
	width: number,
	height: number,
	rotate: number,
	fontSize: number,
	color: string,
): string {
	if (typeof document === 'undefined') return '';
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext('2d');
	if (!ctx) return '';

	ctx.translate(width / 2, height / 2);
	ctx.rotate((rotate * Math.PI) / 180);
	ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
	ctx.fillStyle = color;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	const lines = Array.isArray(content) ? content : [content];
	const lineHeight = fontSize * 1.5;
	const startY = -((lines.length - 1) * lineHeight) / 2;

	lines.forEach((line, idx) => {
		ctx.fillText(line, 0, startY + idx * lineHeight);
	});

	return canvas.toDataURL('image/png');
}

/** 获取完整的水印行内样式 CSS 文本 */
function getWatermarkCssText(url: string, zIndex: number): string {
	return `
		position: absolute !important;
		top: 0px !important;
		left: 0px !important;
		right: 0px !important;
		bottom: 0px !important;
		width: 100% !important;
		height: 100% !important;
		pointer-events: none !important;
		background-repeat: repeat !important;
		background-image: url("${url}") !important;
		z-index: ${zIndex} !important;
		display: block !important;
		visibility: visible !important;
		opacity: 1 !important;
		transform: none !important;
		filter: none !important;
		clip-path: none !important;
	`.replace(/\s+/g, ' ').trim();
}

/** 创建全新的原生水印 DOM 节点（脱离 React 虚拟 DOM 控制，防止 DevTools 删除节点时引发 React Crash） */
function createWatermarkElement(url: string, zIndex: number): HTMLDivElement {
	const el = document.createElement('div');
	el.className = 'rpc_watermark_layer';
	el.style.cssText = getWatermarkCssText(url, zIndex);
	return el;
}

/** 深度检查水印元素在当前真实 DOM 树中的有效性与样式完整性 */
function checkWatermarkIntegrity(
	watermarkEl: HTMLElement | null,
	wrapperEl: HTMLElement | null,
	expectedUrl: string,
): boolean {
	if (!watermarkEl || !wrapperEl) return false;
	if (!wrapperEl.contains(watermarkEl)) return false;

	// 检查内联样式
	const styleAttr = watermarkEl.getAttribute('style') || '';
	if (!styleAttr.includes(expectedUrl)) return false;

	// 检查真实的最终计算样式 ComputedStyle（防止在 DevTools Styles 面板取消勾选属性）
	try {
		const computed = window.getComputedStyle(watermarkEl);
		if (
			computed.display === 'none' ||
			computed.visibility === 'hidden' ||
			Number(computed.opacity) < 0.1 ||
			computed.backgroundImage === 'none' ||
			!computed.backgroundImage.includes('data:image') ||
			watermarkEl.offsetWidth === 0 ||
			watermarkEl.offsetHeight === 0
		) {
			return false;
		}
	} catch {
		return false;
	}

	return true;
}

const Watermark: React.FC<WatermarkProps> = ({
	content,
	children,
	rotate = -22,
	fontSize = 14,
	color = 'rgba(0, 0, 0, 0.12)',
	width = 240,
	height = 160,
	zIndex = 9999,
	antiTamper = true,
	className = '',
	style,
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	// 使用原生 DOM 引用，脱离 React Virtual DOM 的 Diff 追踪
	const watermarkNodeRef = useRef<HTMLDivElement | null>(null);
	const watermarkUrlRef = useRef<string>('');

	// 重新生成水印 Base64
	const watermarkUrl = generateWatermarkBase64(content, width, height, rotate, fontSize, color);
	watermarkUrlRef.current = watermarkUrl;

	// 原生挂载或重建水印
	const mountOrRestoreWatermark = useCallback(() => {
		const wrapper = wrapperRef.current;
		const currentUrl = watermarkUrlRef.current;
		if (!wrapper || !currentUrl) return;

		// 检查当前节点是否存在且完整
		if (watermarkNodeRef.current && wrapper.contains(watermarkNodeRef.current)) {
			// 如果仅样式被篡改，直接重设行内 style
			watermarkNodeRef.current.style.cssText = getWatermarkCssText(currentUrl, zIndex);
			// 再次检查计算样式，如果依然有效则无需重新创建节点
			if (checkWatermarkIntegrity(watermarkNodeRef.current, wrapper, currentUrl)) {
				return;
			}
			// 否则移除旧的异常节点
			try {
				wrapper.removeChild(watermarkNodeRef.current);
			} catch {
				// ignore
			}
		}

		// 创建并追加全新原生水印节点
		const newWatermarkEl = createWatermarkElement(currentUrl, zIndex);
		wrapper.appendChild(newWatermarkEl);
		watermarkNodeRef.current = newWatermarkEl;
	}, [zIndex]);

	// 组件挂载或参数更新时初始化水印
	useEffect(() => {
		mountOrRestoreWatermark();
		return () => {
			if (watermarkNodeRef.current && wrapperRef.current) {
				try {
					if (wrapperRef.current.contains(watermarkNodeRef.current)) {
						wrapperRef.current.removeChild(watermarkNodeRef.current);
					}
				} catch {
					// ignore
				}
				watermarkNodeRef.current = null;
			}
		};
	}, [mountOrRestoreWatermark]);

	// 核心防篡改守护引擎：MutationObserver 毫秒级监听 + 定时心跳自愈
	useEffect(() => {
		if (!antiTamper || !wrapperRef.current) return;

		const wrapper = wrapperRef.current;

		const verifyAndSelfHeal = () => {
			const currentUrl = watermarkUrlRef.current;
			if (!currentUrl) return;

			const isValid = checkWatermarkIntegrity(watermarkNodeRef.current, wrapper, currentUrl);
			if (!isValid) {
				mountOrRestoreWatermark();
			}
		};

		// 1. MutationObserver 监听任何 DOM 节点移除、替换或属性变动
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				// 子节点被删除（包括 F12 Elements 面板按 Delete 直接删除水印 DOM）
				if (mutation.type === 'childList') {
					const isRemoved = Array.from(mutation.removedNodes).some(
						(node) => node === watermarkNodeRef.current,
					);
					if (isRemoved || !wrapper.contains(watermarkNodeRef.current)) {
						mountOrRestoreWatermark();
						return;
					}
				}

				// 属性被修改（包括 F12 Styles 面板取消勾选属性、修改 class 或 style）
				if (mutation.type === 'attributes') {
					verifyAndSelfHeal();
					return;
				}
			}
		});

		observer.observe(wrapper, {
			attributes: true,
			childList: true,
			subtree: true,
			attributeFilter: ['style', 'class', 'hidden', 'id', 'dir', 'aria-hidden'],
		});

		// 2. 心跳自检（防止断点或特殊篡改）
		const timer = setInterval(() => {
			verifyAndSelfHeal();
		}, 400);

		return () => {
			observer.disconnect();
			clearInterval(timer);
		};
	}, [antiTamper, mountOrRestoreWatermark]);

	return (
		<div
			ref={wrapperRef}
			className={`rpc_watermark_wrapper ${className}`}
			style={{ position: 'relative', ...style }}
		>
			{children}
		</div>
	);
};

export default Watermark;
