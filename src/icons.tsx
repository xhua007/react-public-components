import type { CSSProperties } from 'react';

interface IconProps {
	style?: CSSProperties;
	className?: string;
}

const baseStyle: CSSProperties = {
	display: 'inline-block',
	width: '1em',
	height: '1em',
	verticalAlign: '-0.125em',
};

export const LeftOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="left"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
	</svg>
);

export const RightOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="right"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
	</svg>
);

export const UpOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="up"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M890.5 755.3L537.4 268a31.96 31.96 0 00-50.8 0L133.5 755.3a7.95 7.95 0 006.3 12.7h75.5c4.9 0 9.6-2.3 12.6-6.1l281-360 281 360c3 3.8 7.7 6.1 12.6 6.1h75.5c6.7 0 10.4-7.6 6.1-12.7z" />
	</svg>
);

export const DownOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="down"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 37 17.6 49.8 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
	</svg>
);

export const LockOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="lock"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M928 224H704v-64c0-88.4-71.6-160-160-160s-160 71.6-160 160v64H160c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h768c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32zM456 160c0-44.2 35.8-80 80-80s80 35.8 80 80v64H456v-64zm408 696H224V296h640v560zM496 448c-30.9 0-56 25.1-56 56 0 24.7 16.1 45.6 38.4 52.7V680c0 9.7 7.8 17.5 17.6 17.5h32c9.7 0 17.6-7.8 17.6-17.5V556.7c22.3-7.1 38.4-28 38.4-52.7 0-30.9-25.1-56-56-56z" />
	</svg>
);

export const CloseCircleFilled = ({
	style,
	className,
	onClick,
}: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="close-circle"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-66L512 516.8l-99.4 99.4-66-66L446 450.8 346.6 351.4l66-66L512 384.8l99.4-99.4 66 66L578 450.8l99.4 99.4z" />
	</svg>
);

export const CopyOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="copy"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v496c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V128c0-35.3-28.7-64-64-64zM704 192H192c-35.3 0-64 28.7-64 64v640c0 35.3 28.7 64 64 64h512c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64zm-8 648H200c-4.4 0-8-3.6-8-8V264c0-4.4 3.6-8 8-8h496c4.4 0 8 3.6 8 8v568c0 4.4-3.6 8-8 8z" />
	</svg>
);

export const CheckOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="check"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
	</svg>
);

export const LoadingOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="loading"
		width="1em"
		height="1em"
		fill="none"
		aria-hidden="true"
		style={{
			...baseStyle,
			animation: 'rpc-spin 0.85s infinite linear',
			...style,
		}}
		className={`rpc_loading_icon ${className || ''}`}
	>
		<style>
			{`@keyframes rpc-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
		</style>
		<circle
			cx="512"
			cy="512"
			r="380"
			stroke="currentColor"
			strokeWidth="96"
			strokeOpacity="0.2"
		/>
		<path
			d="M512 132c209.9 0 380 170.1 380 380"
			stroke="currentColor"
			strokeWidth="96"
			strokeLinecap="round"
		/>
	</svg>
);

export const SearchOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="search"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M909.6 854.5L649.9 594.8C690.2 537.8 712 469 712 396c0-174.5-141.5-316-316-316S80 221.5 80 396s141.5 316 316 316c73 0 141.8-21.8 198.8-62.1l259.7 259.7c4.7 4.7 12.3 4.7 17 0l38.1-38.1c4.7-4.7 4.7-12.3 0-17zM396 644c-137 0-248-111-248-248S259 148 396 148s248 111 248 248-111 248-248 248z" />
	</svg>
);

export const CloseOutlined = ({
	style,
	className,
	onClick,
}: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="close"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		strokeWidth="84"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M260 260l504 504M764 260L260 764" />
	</svg>
);

export const EditOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="edit"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-148.6L687.8 240.7l48.1 48.1-362.7 362.7-65.6 11.5 17.5-69.6zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
	</svg>
);

export const DeleteOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="delete"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M864 256H704V144c0-26.5-21.5-48-48-48H368c-26.5 0-48 21.5-48 48v112H160c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h60.5l52.6 578.6C251.2 922.3 273 944 298.8 944h426.4c25.8 0 47.6-21.7 49.7-47.4L827.5 320H888c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM384 168h256v88H384v-88zm377.9 713.8a8.04 8.04 0 01-8 7.2H298.8c-4.2 0-7.7-3.2-8-7.2L240.2 320h543.5l-51.8 561.8z" />
	</svg>
);

export const ShareAltOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="share-alt"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M752 664c-28.5 0-54.8 10-75.6 26.8L414.5 522.6c1.5-7.3 2.5-14.9 2.5-22.6s-1-15.3-2.5-22.6L676.4 309.2C697.2 326 723.5 336 752 336c66.3 0 120-53.7 120-120s-53.7-120-120-120-120 53.7-120 120c0 7.7 1 15.3 2.5 22.6L372.6 406.8C351.8 390 325.5 380 296 380c-66.3 0-120 53.7-120 120s53.7 120 120 120c29.5 0 55.8-10 76.6-26.8l261.9 168.2c-1.5 7.3-2.5 14.9-2.5 22.6 0 66.3 53.7 120 120 120s120-53.7 120-120-53.7-120-120-120z" />
	</svg>
);

export const FullscreenOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="fullscreen"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		strokeWidth="88"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		{/* 左上角 ↖ */}
		<path d="M380 180H180v200" />
		<path d="M180 180l240 240" />
		{/* 右上角 ↗ */}
		<path d="M644 180h200v200" />
		<path d="M844 180L604 420" />
		{/* 左下角 ↙ */}
		<path d="M180 644v200h200" />
		<path d="M180 844l240-240" />
		{/* 右下角 ↘ */}
		<path d="M844 644v200H644" />
		<path d="M844 844L604 604" />
	</svg>
);

export const FullscreenExitOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="fullscreen-exit"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		strokeWidth="88"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		{/* 左上角内聚 ↘ */}
		<path d="M180 420h240V180" />
		<path d="M420 420L180 180" />
		{/* 右上角内聚 ↙ */}
		<path d="M844 420H604V180" />
		<path d="M604 420l240-240" />
		{/* 左下角内聚 ↗ */}
		<path d="M180 604h240v240" />
		<path d="M420 604L180 844" />
		{/* 右下角内聚 ↖ */}
		<path d="M844 604H604v240" />
		<path d="M604 604l240 240" />
	</svg>
);

export const RotateRightOutlined = ({
	style,
	className,
	onClick,
}: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="rotate-right"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		strokeWidth="80"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		{/* 顺时针旋转主体圆弧 */}
		<path d="M896 512a384 384 0 1 1-112.5-271.5L896 341" />
		{/* 顺时针旋转折线箭头 */}
		<path d="M896 128v213h-213" />
	</svg>
);

export const ZoomInOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="zoom-in"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		strokeWidth="76"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		{/* 放大镜圆镜框 */}
		<circle cx="440" cy="440" r="280" />
		{/* 放大镜手柄 */}
		<path d="M640 640l220 220" strokeWidth="88" />
		{/* 放大镜内部清晰加号 */}
		<path d="M440 320v240M320 440h240" strokeWidth="80" />
	</svg>
);

export const ZoomOutOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="zoom-out"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		strokeWidth="76"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		{/* 放大镜圆镜框 */}
		<circle cx="440" cy="440" r="280" />
		{/* 放大镜手柄 */}
		<path d="M640 640l220 220" strokeWidth="88" />
		{/* 放大镜内部清晰减号 */}
		<path d="M320 440h240" strokeWidth="80" />
	</svg>
);

export const DownloadOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="0 0 1024 1024"
		focusable="false"
		data-icon="download"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		strokeWidth="76"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		{/* 下载向下箭头 */}
		<path d="M512 160v460M330 450l182 182 182-182" />
		{/* 底部托盘 */}
		<path d="M200 680v160h624V680" />
	</svg>
);

export const FileOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="file"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zM224 896V128h314v230c0 17.7 14.3 32 32 32h230v506H224z" />
	</svg>
);

export const FilePdfOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="file-pdf"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M532 531.3c-7.9-25.1-17.9-57.9-29.2-94.8 17.4-44.5 28.5-84.5 32.8-118.6 6.8-54.6-1.5-87.1-23.7-92.3-15.6-3.7-33 11-40.4 46.1-5.1 24.3-3.6 56.4 4.3 93.3-8.8 33-21.9 76.5-38.3 125.7-18.7 56.2-41.2 108.6-66.2 153.8-37.1 20.3-69 41.5-92.9 63.8-38.2 35.6-46.7 67.2-24.1 89.8 12.8 12.8 31.6 15.3 54.1 7.2 28.8-10.4 62.9-38.9 98.7-83.3 43.1-13.8 91.5-26.3 143.1-37.2 32.8 23.3 64.9 39.8 94.6 48.7 32 9.6 57 8.3 69.8-3.9 15.6-14.8 11.6-42.3-11.4-78.7-17.7-27.9-43.9-51.5-76.3-69.6-1.4-.8-2.8-1.5-4.2-2.3zm-180.2 277c-7.8-7.8-7.8-21.1 0-38.2 11.3-24.8 29.5-48.4 52.8-68.5-25.3 47.9-43.2 86.8-52.8 106.7zm134.7-474c1.6-18.1 4.5-28.7 8.3-30.8 2.2-1.2 5-.8 8.1 1.2 5.1 3.3 7 14.5 5.5 32.5-1.9 22.8-8.2 49.3-18.4 78.4-3.2-30.1-4.7-57.2-3.5-81.3zm-27.1 257.6c17.5-47.5 31.8-90.8 42.1-127.3 9.4 29.6 17.5 56.4 24 79.2-21.6 4.9-43.9 10.3-66.1 16.1v32zm251.4 69.7c15.1 18.8 18.4 32.1 9.4 39.5-3.3 2.7-8.9 3.2-16.4.7-12.7-4.2-27.7-13.5-43.9-27.1 22.8 3.8 41.5-1.1 50.9-13.1zM854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zM224 896V128h314v230c0 17.7 14.3 32 32 32h230v506H224z" />
	</svg>
);

export const FileImageOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="file-image"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zM224 896V128h314v230c0 17.7 14.3 32 32 32h230v506H224zm136-280a48 48 0 1096 0 48 48 0 10-96 0zm336 96L552 544l-96 112-48-56-112 112h400z" />
	</svg>
);

export const FileTextOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="file-text"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zM224 896V128h314v230c0 17.7 14.3 32 32 32h230v506H224zm120-480h160c4.4 0 8-3.6 8-8v-32c0-4.4-3.6-8-8-8H344c-4.4 0-8 3.6-8 8v32c0 4.4 3.6 8 8 8zm0 120h336c4.4 0 8-3.6 8-8v-32c0-4.4-3.6-8-8-8H344c-4.4 0-8 3.6-8 8v32c0 4.4 3.6 8 8 8zm0 120h336c4.4 0 8-3.6 8-8v-32c0-4.4-3.6-8-8-8H344c-4.4 0-8 3.6-8 8v32c0 4.4 3.6 8 8 8z" />
	</svg>
);

export const EyeOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="eye"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.2a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.4 684.2 673.3 766 512 766zm-1-438c-101.6 0-184 82.4-184 184s82.4 184 184 184 184-82.4 184-184-82.4-184-184-184zm0 296c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
	</svg>
);

export const EyeInvisibleOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="eye-invisible"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M942.2 486.2Q889.47 375.11 804.85 296.83l57.75-57.75a8.03 8.03 0 000-11.32l-39.6-39.6a8.03 8.03 0 00-11.31 0L117.82 882.03a8.03 8.03 0 000 11.32l39.6 39.6a8.03 8.03 0 0011.31 0l79.47-79.47C333.62 882.35 421.36 900 512 900c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 828c-161.3 0-279.4-81.8-362.7-254 38.67-80.44 94.67-142.75 163.66-184.22l81.65 81.65a184.07 184.07 0 00231.42 231.42l77.72 77.72C637.38 812.59 576.84 828 512 828zm-399.7-331.4C108.6 489.1 106 480 106 470c0-10 2.6-19.1 6.3-26.6 94.8-199.7 238-300.2 430.2-300.2 73.1 0 141.7 14.5 204.6 41.5l-63.5 63.5A384.85 384.85 0 00512 210c-161.3 0-279.4 81.8-362.7 254 18.23 37.93 40.54 70.83 66.27 98.42l-51.3 51.3a549.9 549.9 0 01-51.97-117.12z" />
	</svg>
);

export const PlayCircleOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="play-circle"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm-88-532.7v325.4c0 10.7 11.9 17.1 20.9 11.3l244-162.7a13.6 13.6 0 000-22.6l-244-162.7c-9-5.8-20.9.6-20.9 11.3z" />
	</svg>
);

export const PauseCircleOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="pause-circle"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm-128-524c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360zm160 0c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360z" />
	</svg>
);

export const UndoOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="undo"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M758 416H428.8l93.7-93.7c3.1-3.1 3.1-8.2 0-11.3l-22.6-22.6a8.03 8.03 0 00-11.3 0L303.3 473.7a8.03 8.03 0 000 11.3l185.3 185.3c3.1 3.1 8.2 3.1 11.3 0l22.6-22.6c3.1-3.1 3.1-8.2 0-11.3L428.8 544H758c56.3 0 102 45.7 102 102s-45.7 102-102 102H260c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h498c120.4 0 218-97.6 218-218s-97.6-218-218-218z" />
	</svg>
);

export const RedoOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="redo"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M758.2 338.3L572.9 153c-3.1-3.1-8.2-3.1-11.3 0l-22.6 22.6a8.03 8.03 0 000 11.3l93.7 93.7H266c-120.4 0-218 97.6-218 218s97.6 218 218 218h498c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H266c-56.3 0-102-45.7-102-102s45.7-102 102-102h366.7l-93.7 93.7c-3.1 3.1-3.1 8.2 0 11.3l22.6 22.6c3.1 3.1 8.2 3.1 11.3 0l185.3-185.3a8.03 8.03 0 000-11.3z" />
	</svg>
);

export const ReloadOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="reload"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 96 512 96 282.2 96 96 282.2 96 512s186.2 416 416 416c196.4 0 361.3-136.2 404.7-319.4 1.2-5.1-1.9-10.2-7.1-11.4l-62.4-14.7c-5.1-1.2-10.2 1.9-11.4 7.1C800.7 724.8 667.6 832 512 832c-176.7 0-320-143.3-320-320s143.3-320 320-320c112.5 0 211.3 58 268.4 146.4l-75.1 58.7c-5.3 4.1-3.4 12.6 3.1 14.1l197.8 45.4c4.6 1.1 9.1-2.4 9.1-7.1l-1.9-202.9c0-6.6-8.2-9.7-12.7-4.9z" />
	</svg>
);

export const SoundOutlined = ({ style, className }: IconProps) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="sound"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
	>
		<path d="M625.9 115c-5.9 0-11.9 1.6-17.2 4.9L354.8 280H192c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h162.8l253.9 160.1c5.3 3.3 11.3 4.9 17.2 4.9 18.2 0 33.1-14.9 33.1-33.1V148.1c0-18.2-14.9-33.1-33.1-33.1zm-32.9 663.2L367.6 634.6a8 8 0 00-4.3-1.2H232V390.6h131.3a8 8 0 004.3-1.2L593 245.8v532.4zM704 398.7a32 32 0 00-32 32v162.6a32 32 0 0064 0V430.7a32 32 0 00-32-32zm96-99.3a32 32 0 00-32 32v361.3a32 32 0 0064 0V331.4a32 32 0 00-32-32z" />
	</svg>
);

export const SendOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="send"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.8 15.8 0 00-11.8 17.9L173 496H512v32H173L72.1 927.8c-1.8 7.3 1.9 14.9 8.8 17.7 2.3.9 4.7 1.2 7.1.7 3.7-.7 7.1-2.9 9.1-6L931.4 525.1c6.1-4.7 7.4-13.5 2.7-19.6-.8-1-1.7-1.8-2.7-2.6z" />
	</svg>
);

export const LikeOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="like"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-85-65.6-104.2l-21.8-10.3 8.5-22.6c8.6-22.8 13-46.9 13-71.9 0-94.8-77-172-171.8-172-35.4 0-69.2 10.9-97.7 31.5L462.6 193c-2.4 1.7-4.6 3.6-6.6 5.6L348 306.6c-4.4 4.4-6.9 10.4-6.9 16.6V768c0 13.3 10.7 24 24 24h356c32.1 0 61.5-16.7 77.8-44.1l21.2-35.7 38.6-6.4c35.4-5.9 64.3-30.8 74.9-64.6l6.8-21.6 22 4.4c2.8.6 5.6.8 8.4.8 28.3 0 54.8-12.8 72.1-35.3 16.8-22.2 21.6-50.6 13.1-77.9l-6.8-21.6 22 4.4c2.8.6 5.6.8 8.4.8 28.3 0 54.8-12.8 72.1-35.3 16.8-22.2 21.6-50.6 13.1-77.9l-8.9-28.7zM792 720H406V336l96-96c21.2-21.2 46.3-37.4 73.9-47.5 12.8-4.7 26.3-7.1 40.1-7.1 55.1 0 100 44.9 100 100 0 18.2-4.1 36.1-11.9 52.3l-19.1 39.5H846c24.6 0 45.4 17.5 49.3 41.8 1.9 12-1 24.1-8.1 33.4L870.3 475l16.9 5.6c11.9 3.9 21.3 12.8 25.8 24.4s3 24.4-4.2 33.9L892 560l16.9 5.6c11.9 3.9 21.3 12.8 25.8 24.4s3 24.4-4.2 33.9L913.6 645l-12.1 38.6c-5.8 18.5-21.7 32.1-41.1 35.3L792 720zm-536 72h-80c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v456c0 4.4-3.6 8-8 8z" />
	</svg>
);

export const DislikeOutlined = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="dislike"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M885.9 490.3l8.9-28.7c8.5-27.3 3.7-55.7-13.1-77.9-17.3-22.5-43.8-35.3-72.1-35.3-2.8 0-5.6.3-8.4.8l-22 4.4 6.8-21.6c8.5-27.3 3.7-55.7-13.1-77.9-17.3-22.5-43.8-35.3-72.1-35.3-2.8 0-5.6.3-8.4.8l-22 4.4-6.8-21.6c-10.6-33.8-39.5-58.7-74.9-64.6l-38.6-6.4-21.2-35.7C620.5 106.7 591.1 90 559 90H203c-13.3 0-24 10.7-24 24v444.8c0 6.2 2.5 12.2 6.9 16.6l108 108c2 2 4.2 3.9 6.6 5.6l113.8 81.3c28.5 20.6 62.3 31.5 97.7 31.5 94.8 0 171.8-77.2 171.8-172 0-25-4.4-49.1-13-71.9l-8.5-22.6 21.8-10.3c40.5-19.2 65.6-59.3 65.6-104.2.1-28.3-9.2-55.5-26-77.7zM792 304l68.4-1.1c19.4 3.2 35.3 16.8 41.1 35.3l12.1 38.6 16.9 21.2c7.2 9.5 8.7 22.3 4.2 33.9s-13.9 20.5-25.8 24.4L892 462l16.9 21.2c7.2 9.5 8.7 22.3 4.2 33.9s-13.9 20.5-25.8 24.4l-16.9 5.6 14.8 17.9c7.1 9.3 10 21.4 8.1 33.4-3.9 24.3-24.7 41.8-49.3 41.8H741l19.1 39.5c7.8 16.2 11.9 34.1 11.9 52.3 0 55.1-44.9 100-100 100-13.8 0-27.3-2.4-40.1-7.1-27.6-10.1-52.7-26.3-73.9-47.5l-96-96V232h386zM256 232h-80c-4.4 0-8 3.6-8 8v456c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V240c0-4.4-3.6-8-8-8z" />
	</svg>
);

export const StarFilled = ({ style, className, onClick }: IconProps & { onClick?: (e: React.MouseEvent) => void }) => (
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="star"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={{ ...baseStyle, ...style }}
		className={className}
		onClick={onClick}
	>
		<path d="M908.1 353.1l-253.9-36.9L540.7 86.6c-9.7-19.7-37.7-19.7-47.4 0L379.8 316.2l-253.9 36.9c-21.9 3.2-30.6 30-14.7 45.5l183.7 179-43.4 252.9c-3.7 21.8 19.1 38.4 38.8 28.1L512 740l221.7 116.6c19.7 10.4 42.5-6.3 38.8-28.1l-43.4-252.9 183.7-179c15.9-15.5 7.2-42.3-14.7-45.5z" />
	</svg>
);








