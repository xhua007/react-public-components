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
