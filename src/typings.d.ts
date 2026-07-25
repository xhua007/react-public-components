// 图片模块类型声明，避免 TS 报 "找不到模块" 错误
declare module '*.png' {
	const src: string;
	export default src;
}

declare module '*.jpg' {
	const src: string;
	export default src;
}

declare module '*.jpeg' {
	const src: string;
	export default src;
}

declare module '*.svg' {
	const src: string;
	export default src;
}

declare module '*.less';
declare module '*.css';
