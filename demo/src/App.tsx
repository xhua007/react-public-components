import { useState, useMemo, ComponentType } from 'react';
import {
	CollapseBoxDemo,
	SplitterDemo,
	DisabledBoxDemo,
	MasonryDemo,
	BorderBeamDemo,
	ColorPickerDemo,
	CopyButtonDemo,
	TextEllipsisDemo,
	DebounceSelectDemo,
	CountUpDemo,
	ContextMenuDemo,
	FullscreenDemo,
	ImageCropperDemo,
	ScrollTrackerDemo,
	FilePreviewerDemo,
	FloatingActionBarDemo,
	TagInputDemo,
	PasswordStrengthDemo,
	JsonEditorDemo,
	InfiniteScrollListDemo,
	MarqueeDemo,
	SpotlightCardDemo,
	SensitiveMaskDemo,
	DiffViewerDemo,
	CronPickerDemo,
	GuidedTourDemo,
	NumericRangeInputDemo,
	MetricCardDemo,
	AudioPlayerDemo,
	QrCodeCardDemo,
	ActivityLogDemo,
	DragSortListDemo,
	TiltCardDemo,
	VirtualListDemo,
	WatermarkDemo,
	VideoPlayerDemo,
	PdfViewerDemo,
	BadgeRibbonDemo,
	ShimmerSkeletonDemo,
	FlipCardDemo,
	KanbanBoardDemo,
	TreeFilterPanelDemo,
	EnvBadgeDemo,
	StatusTimelineDemo,
	GradientTextDemo,
	KeyValEditorDemo,
	QuickDateRangeDemo,
	DiffTableDemo,
	PhotoViewerDemo,
	TrendIndicatorDemo,
	CountdownButtonDemo,
	SegmentedProgressDemo,
	HoverCardDemo,
	TreeTransferDemo,
	NumberStepperDemo,
	JsonTreeDemo,
	CodeSnippetDemo,
	MiniSparklineDemo,
	FileDropZoneDemo,
	CascadeDrawerDemo,
	DualRangeSliderDemo,
	FilterChipsDemo,
	AnnouncementBarDemo,
	JsonDiffViewerDemo,
} from './demos';

// 组件导航菜单配置
interface ComponentMenuItem {
	key: string;
	name: string;
	title: string;
	tag?: string;
	description: string;
}

interface ComponentCategory {
	category: string;
	items: ComponentMenuItem[];
}

const navCategories: ComponentCategory[] = [
	{
		category: '通用 General',
		items: [
			{
				key: 'CodeSnippet',
				name: 'CodeSnippet',
				title: '极客代码块',
				tag: '1.4.0',
				description: 'Mac 终端风格代码块卡片，带红黄绿圆点、语言标签与一键平滑复制。',
			},
			{
				key: 'Watermark',
				name: 'Watermark',
				title: '防篡改水印',
				tag: '1.2.0',
				description: '动态防截屏安全水印，内置 MutationObserver 强力防 F12 审查元素删除或隐藏。',
			},
			{
				key: 'QrCodeCard',
				name: 'QrCodeCard',
				title: '二维码卡片',
				tag: '1.2.0',
				description: '多功能扫码登录/支付二维码卡片，支持 Logo 嵌入、失效过期刷新遮罩与图片下载。',
			},
			{
				key: 'GuidedTour',
				name: 'GuidedTour',
				title: '漫游引导',
				tag: '1.2.0',
				description: '新手引导步进器，带智能镂空高亮遮罩、步骤弹窗与状态持久化。',
			},
			{
				key: 'FilePreviewer',
				name: 'FilePreviewer',
				title: '文件预览',
				tag: '1.2.0',
				description: '多格式文件与媒体统一弹窗预览器，支持图片、音视频、PDF、代码与一键下载。',
			},
			{
				key: 'FloatingActionBar',
				name: 'FloatingActionBar',
				title: '悬浮操作栏',
				tag: '1.2.0',
				description: '表格与列表多选时从屏幕底部浮出的毛玻璃操作栏，内置统计与批量动作。',
			},
			{
				key: 'Fullscreen',
				name: 'Fullscreen',
				title: '全屏容器',
				tag: '1.2.0',
				description: '支持局部元素原生全屏与网页内最大化置顶切换，支持快捷悬浮按钮与 Render Props。',
			},
			{
				key: 'CopyButton',
				name: 'CopyButton',
				title: '复制按钮',
				tag: '1.2.0',
				description: '提供点击复制到剪贴板功能，支持纯图标、带文字按钮与内联文本，内置 Tooltip 动效。',
			},
			{
				key: 'ContextMenu',
				name: 'ContextMenu',
				title: '右键菜单',
				tag: '1.2.0',
				description: '为任意区域或列表行提供右键上下文菜单，支持视口防溢出翻转、二级子菜单与快捷键。',
			},
		],
	},
	{
		category: '布局与导航 Layout & Nav',
		items: [
			{
				key: 'CascadeDrawer',
				name: 'CascadeDrawer',
				title: '级联下钻抽屉',
				tag: '1.4.0',
				description: '多层级无限下钻抽屉容器，带顶部面包屑返回导航与平滑推拉动效。',
			},
			{
				key: 'KanbanBoard',
				name: 'KanbanBoard',
				title: '任务看板',
				tag: '1.3.0',
				description: '轻量任务看板与泳道管理，基于原生 HTML5 Drag & Drop 跨列平滑拖拽。',
			},
			{
				key: 'DragSortList',
				name: 'DragSortList',
				title: '拖拽排序列表',
				tag: '1.2.0',
				description: '纯原生轻量拖拽重排序列表，支持平滑占位与阴影反馈。',
			},
			{
				key: 'Marquee',
				name: 'Marquee',
				title: '无缝跑马灯',
				tag: '1.2.0',
				description: '基于硬件加速的无缝平滑滚动 Logo 墙与广播通知条，支持悬停暂停与边缘渐变。',
			},
			{
				key: 'ScrollTracker',
				name: 'ScrollTracker',
				title: '滚动与吸顶',
				tag: '1.2.0',
				description: '阅读进度条（ScrollTracker）与智能吸顶容器（StickyHeader，带毛玻璃与阴影）。',
			},
			{
				key: 'InfiniteScrollList',
				name: 'InfiniteScrollList',
				title: '无限滚动列表',
				tag: '1.2.0',
				description: '触底自动触发异步加载的无限滚动列表容器，内置加载骨架与到底提示。',
			},
			{
				key: 'CollapseBox',
				name: 'CollapseBox',
				title: '折叠容器',
				tag: '1.0.0',
				description: '支持水平与垂直方向折叠的弹性容器组件，支持自定义按钮位置与默认尺寸。',
			},
			{
				key: 'Splitter',
				name: 'Splitter',
				title: '分隔面板',
				tag: '1.0.0',
				description: '支持多面板拖拽调整尺寸、折叠与双击重置的可定制分隔面板组件。',
			},
			{
				key: 'Masonry',
				name: 'Masonry',
				title: '瀑布流',
				tag: '1.0.0',
				description: '基于列优先的高性能响应式瀑布流布局组件，遵循 AntD 规范。',
			},
		],
	},
	{
		category: '数据录入 Data Entry',
		items: [
			{
				key: 'DualRangeSlider',
				name: 'DualRangeSlider',
				title: '双滑块区间选择器',
				tag: '1.4.0',
				description: '双向双滑块区间选择器，支持数值/价格跨度筛选与防交叉穿透。',
			},
			{
				key: 'FilterChips',
				name: 'FilterChips',
				title: '已选筛选胶囊栏',
				tag: '1.4.0',
				description: '多维已选筛选项胶囊汇总栏，支持单项删除与一键清空全部。',
			},
			{
				key: 'FileDropZone',
				name: 'FileDropZone',
				title: '拖拽上传容器',
				tag: '1.4.0',
				description: '现代极客拖拽上传虚线容器，支持流光呼吸高亮与剪贴板截图粘贴。',
			},
			{
				key: 'TreeTransfer',
				name: 'TreeTransfer',
				title: '树形穿梭框',
				tag: '1.3.0',
				description: '树形层级穿梭框，左侧目录树级联勾选与右侧平铺已选列表。',
			},
			{
				key: 'NumberStepper',
				name: 'NumberStepper',
				title: '平滑数字步进器',
				tag: '1.3.0',
				description: '长按连续加减数字步进器，支持步长控制与上下限保护。',
			},
			{
				key: 'CountdownButton',
				name: 'CountdownButton',
				title: '验证码倒计时按钮',
				tag: '1.3.0',
				description: '短信验证码 60s 倒计时按钮，支持异步前置检查与防刷锁定。',
			},
			{
				key: 'KeyValEditor',
				name: 'KeyValEditor',
				title: '键值对编辑器',
				tag: '1.3.0',
				description: '动态增删 API Headers 与环境变量配置项，支持密码掩码与单行禁用。',
			},
			{
				key: 'QuickDateRange',
				name: 'QuickDateRange',
				title: '快捷日期筛选',
				tag: '1.3.0',
				description: '今日/近7天/本月等预设日期胶囊标签与自定义日期范围双向联动。',
			},
			{
				key: 'TreeFilterPanel',
				name: 'TreeFilterPanel',
				title: '树形平铺筛选',
				tag: '1.3.0',
				description: '多级分类平铺联动筛选器，支持多选、快捷全部、分类汇总与一键清空。',
			},
			{
				key: 'NumericRangeInput',
				name: 'NumericRangeInput',
				title: '数值区间输入',
				tag: '1.2.0',
				description: '价格与数值区间范围输入框，自带双向联动校验与快捷区间预设标签。',
			},
			{
				key: 'CronPicker',
				name: 'CronPicker',
				title: 'Cron 选择器',
				tag: '1.2.0',
				description: '定时任务 Cron 表达式可视化生成器，支持按天/周/月多周期配置与中文人话翻译。',
			},
			{
				key: 'TagInput',
				name: 'TagInput',
				title: '标签输入器',
				tag: '1.2.0',
				description: '自由标签输入组件，支持回车/逗号打标签、退格删除、双击编辑与正则校验。',
			},
			{
				key: 'PasswordStrength',
				name: 'PasswordStrength',
				title: '密码强度检测',
				tag: '1.2.0',
				description: '多维度密码复杂度实时评分与 4 段彩色进度条可视化指示器。',
			},
			{
				key: 'ImageCropper',
				name: 'ImageCropper',
				title: '图片裁剪',
				tag: '1.2.0',
				description: '轻量原生 Canvas 图片裁剪器，支持拖拽、滚轮缩放、90° 旋转、圆形头像裁剪与 Modal 弹窗。',
			},
			{
				key: 'DebounceSelect',
				name: 'DebounceSelect',
				title: '防抖下拉框',
				tag: '1.2.0',
				description: '防抖异步搜索选择器，内置时序竞态保护、单选/多选 Tags 模式与加载态。',
			},
			{
				key: 'ColorPicker',
				name: 'ColorPicker',
				title: '颜色选择器',
				tag: '1.0.0',
				description: '支持 HEX、HSB、RGB 及渐变色模式的高级颜色选择与调色板组件。',
			},
		],
	},
	{
		category: '数据展示 Display',
		items: [
			{
				key: 'JsonDiffViewer',
				name: 'JsonDiffViewer',
				title: 'JSON 差异比对器',
				tag: '1.4.0',
				description: 'JSON 结构体增删改差异彩色高亮探查，支持新旧值对照。',
			},
			{
				key: 'JsonTree',
				name: 'JsonTree',
				title: 'JSON 树状探查器',
				tag: '1.4.0',
				description: '树状无限折叠展开的 JSON 探查器，支持数据类型高亮与路径探查。',
			},
			{
				key: 'MiniSparkline',
				name: 'MiniSparkline',
				title: '单行微趋势折线图',
				tag: '1.4.0',
				description: '指标卡与表格专用的极简微折线走势图，纯 SVG 贝塞尔曲线平滑绘制。',
			},
			{
				key: 'SegmentedProgress',
				name: 'SegmentedProgress',
				title: '分段多色进度条',
				tag: '1.3.0',
				description: '单条轨道并列展示多色分段比例，支持存储空间占比与图例。',
			},
			{
				key: 'TrendIndicator',
				name: 'TrendIndicator',
				title: 'KPI 趋势升降胶囊',
				tag: '1.3.0',
				description: '微型 KPI 指标变动升降胶囊，自动根据正负值判断涨跌并支持红绿反转。',
			},
			{
				key: 'PhotoViewer',
				name: 'PhotoViewer',
				title: '相册画廊查看器',
				tag: '1.3.0',
				description: '全功能多图画廊查看器，支持左右键盘按键切图与缩略图底栏联动。',
			},
			{
				key: 'DiffTable',
				name: 'DiffTable',
				title: '两期差异对比表格',
				tag: '1.3.0',
				description: '两期数据差异对比表格，自动计算增减差值与百分比红绿高亮。',
			},
			{
				key: 'StatusTimeline',
				name: 'StatusTimeline',
				title: '审批流时间轴',
				tag: '1.3.0',
				description: '高级审批流与动态耗时时间轴，包含节点状态徽标、经办人与流转耗时。',
			},
			{
				key: 'GradientText',
				name: 'GradientText',
				title: '流光渐变文字',
				tag: '1.3.0',
				description: '现代 SaaS 霓虹横向流光渐变文字，支持背景平滑滚动动画。',
			},
			{
				key: 'VideoPlayer',
				name: 'VideoPlayer',
				title: '视频播放器',
				tag: '1.3.0',
				description: '轻量现代化视频播放器，暗黑毛玻璃控制条、快进快退 10s、0.75x~2.0x 倍速与画中画。',
			},
			{
				key: 'PdfViewer',
				name: 'PdfViewer',
				title: 'PDF 在线阅读器',
				tag: '1.3.0',
				description: '轻量 Web PDF 阅读器，支持缩放 Zoom、90° 顺时针旋转与一键下载。',
			},
			{
				key: 'BadgeRibbon',
				name: 'BadgeRibbon',
				title: '斜角丝带角标',
				tag: '1.3.0',
				description: '卡片左上/右上 45° 倾斜缎带徽章，支持 HOT/PRO 推荐与渐变色。',
			},
			{
				key: 'ShimmerSkeleton',
				name: 'ShimmerSkeleton',
				title: '流光骨架屏',
				tag: '1.3.0',
				description: '高质感渐变流光掠过骨架屏，支持卡片、列表、头像与多行文本。',
			},
			{
				key: 'FlipCard',
				name: 'FlipCard',
				title: '3D 翻转卡片',
				tag: '1.3.0',
				description: '3D 正反面翻转卡片，鼠标悬停或点击触发 180° 平滑翻转展示详情。',
			},
			{
				key: 'VirtualList',
				name: 'VirtualList',
				title: '虚拟列表',
				tag: '1.2.0',
				description: '零依赖轻量虚拟滚动列表，万级海量数据 60FPS 极速渲染不卡顿。',
			},
			{
				key: 'MetricCard',
				name: 'MetricCard',
				title: 'KPI 指标卡',
				tag: '1.2.0',
				description: 'Dashboard 看板指标卡片，集成 CountUp 数字跳动、环比升降趋势与微折线 Sparkline。',
			},
			{
				key: 'ActivityLog',
				name: 'ActivityLog',
				title: '操作审计日志',
				tag: '1.2.0',
				description: '中后台业务操作与审批流动态时间轴，支持操作人头像、相对时间与变动详情折叠。',
			},
			{
				key: 'AudioPlayer',
				name: 'AudioPlayer',
				title: '音频播放条',
				tag: '1.2.0',
				description: '轻量客服录音与语音回放条，支持 Seek 拖拽、倍速切换与一键下载。',
			},
			{
				key: 'TiltCard',
				name: 'TiltCard',
				title: '3D 倾斜卡片',
				tag: '1.2.0',
				description: '鼠标悬停 3D 景深物理倾斜与流光高光跟随卡片。',
			},
			{
				key: 'SpotlightCard',
				name: 'SpotlightCard',
				title: '聚光灯卡片',
				tag: '1.2.0',
				description: '鼠标光晕聚光灯实时追踪跟随卡片，具备前沿极客科技感与暗色模式。',
			},
			{
				key: 'SensitiveMask',
				name: 'SensitiveMask',
				title: '敏感脱敏',
				tag: '1.2.0',
				description: '手机号/身份证/银行卡/邮箱等敏感数据脱敏展示，支持点击眼睛解密与复制。',
			},
			{
				key: 'DiffViewer',
				name: 'DiffViewer',
				title: '差异比对',
				tag: '1.2.0',
				description: '轻量文本与代码行级差异比对器，支持分栏 Split 与行内 Unified模式。',
			},
			{
				key: 'JsonEditor',
				name: 'JsonEditor',
				title: 'JSON 查看与编辑',
				tag: '1.2.0',
				description: '轻量免外部依赖的 JSON 语法高亮查看与编辑器，支持格式化、单行压缩与错误定位。',
			},
			{
				key: 'CountUp',
				name: 'CountUp',
				title: '数字滚动',
				tag: '1.2.0',
				description: '基于高质量缓动算法的平滑数字跳动动画组件，支持前缀后缀与命令式 Ref 控制。',
			},
			{
				key: 'TextEllipsis',
				name: 'TextEllipsis',
				title: '文本省略',
				tag: '1.2.0',
				description: '支持单行/多行文本截断、展开/收起切换、溢出智能 Tooltip 与一键复制。',
			},
			{
				key: 'BorderBeam',
				name: 'BorderBeam',
				title: '边框流光',
				tag: '1.0.0',
				description: '为卡片或容器边框添加流动高亮与自定义渐变动画的特效组件。',
			},
			{
				key: 'DisabledBox',
				name: 'DisabledBox',
				title: '禁用遮罩',
				tag: '1.0.0',
				description: '为子级元素或复杂区域提供统一的禁用态透明遮罩与防交互保护。',
			},
		],
	},
	{
		category: '反馈 Feedback',
		items: [
			{
				key: 'AnnouncementBar',
				name: 'AnnouncementBar',
				title: '广播通知横幅',
				tag: '1.4.0',
				description: '页面顶部吸顶渐变广播横幅，支持可配置关闭与持久化记忆。',
			},
			{
				key: 'HoverCard',
				name: 'HoverCard',
				title: '悬浮资料卡',
				tag: '1.3.0',
				description: 'Twitter / GitHub 风格悬浮信息卡片，防误触延迟与视口防溢出。',
			},
			{
				key: 'EnvBadge',
				name: 'EnvBadge',
				title: '环境防误触角标',
				tag: '1.3.0',
				description: '醒目的环境状态标识胶囊，点击查看构建版本详情并支持多环境跳转。',
			},
		],
	},
];

// 组件与对应的 Demo 组件映射表
const demoComponentsMap: Record<
	string,
	{ name: string; title: string; component: ComponentType }
> = {
	JsonDiffViewer: { name: 'JsonDiffViewer', title: 'JSON 差异比对器', component: JsonDiffViewerDemo },
	CascadeDrawer: { name: 'CascadeDrawer', title: '级联下钻抽屉', component: CascadeDrawerDemo },
	DualRangeSlider: { name: 'DualRangeSlider', title: '双滑块区间选择器', component: DualRangeSliderDemo },
	FilterChips: { name: 'FilterChips', title: '已选筛选胶囊栏', component: FilterChipsDemo },
	AnnouncementBar: { name: 'AnnouncementBar', title: '广播通知横幅', component: AnnouncementBarDemo },
	JsonTree: { name: 'JsonTree', title: 'JSON 树状探查器', component: JsonTreeDemo },
	CodeSnippet: { name: 'CodeSnippet', title: '极客代码块', component: CodeSnippetDemo },
	MiniSparkline: { name: 'MiniSparkline', title: '单行微趋势折线图', component: MiniSparklineDemo },
	FileDropZone: { name: 'FileDropZone', title: '拖拽上传容器', component: FileDropZoneDemo },
	SegmentedProgress: { name: 'SegmentedProgress', title: '分段多色进度条', component: SegmentedProgressDemo },
	HoverCard: { name: 'HoverCard', title: '悬浮资料卡', component: HoverCardDemo },
	TreeTransfer: { name: 'TreeTransfer', title: '树形穿梭框', component: TreeTransferDemo },
	NumberStepper: { name: 'NumberStepper', title: '平滑数字步进器', component: NumberStepperDemo },
	TrendIndicator: { name: 'TrendIndicator', title: 'KPI 趋势升降胶囊', component: TrendIndicatorDemo },
	CountdownButton: { name: 'CountdownButton', title: '验证码倒计时按钮', component: CountdownButtonDemo },
	KeyValEditor: { name: 'KeyValEditor', title: '键值对编辑器', component: KeyValEditorDemo },
	QuickDateRange: { name: 'QuickDateRange', title: '快捷日期筛选', component: QuickDateRangeDemo },
	DiffTable: { name: 'DiffTable', title: '两期差异对比表格', component: DiffTableDemo },
	PhotoViewer: { name: 'PhotoViewer', title: '相册画廊查看器', component: PhotoViewerDemo },
	StatusTimeline: { name: 'StatusTimeline', title: '审批流时间轴', component: StatusTimelineDemo },
	GradientText: { name: 'GradientText', title: '流光渐变文字', component: GradientTextDemo },
	KanbanBoard: { name: 'KanbanBoard', title: '任务看板', component: KanbanBoardDemo },
	TreeFilterPanel: { name: 'TreeFilterPanel', title: '树形平铺筛选', component: TreeFilterPanelDemo },
	EnvBadge: { name: 'EnvBadge', title: '环境防误触角标', component: EnvBadgeDemo },
	VideoPlayer: { name: 'VideoPlayer', title: '视频播放器', component: VideoPlayerDemo },
	PdfViewer: { name: 'PdfViewer', title: 'PDF 在线阅读器', component: PdfViewerDemo },
	BadgeRibbon: { name: 'BadgeRibbon', title: '斜角丝带角标', component: BadgeRibbonDemo },
	ShimmerSkeleton: { name: 'ShimmerSkeleton', title: '流光骨架屏', component: ShimmerSkeletonDemo },
	FlipCard: { name: 'FlipCard', title: '3D 翻转卡片', component: FlipCardDemo },
	VirtualList: { name: 'VirtualList', title: '虚拟列表', component: VirtualListDemo },
	Watermark: { name: 'Watermark', title: '防篡改水印', component: WatermarkDemo },
	NumericRangeInput: { name: 'NumericRangeInput', title: '数值区间输入', component: NumericRangeInputDemo },
	MetricCard: { name: 'MetricCard', title: 'KPI 指标卡', component: MetricCardDemo },
	AudioPlayer: { name: 'AudioPlayer', title: '音频播放条', component: AudioPlayerDemo },
	QrCodeCard: { name: 'QrCodeCard', title: '二维码卡片', component: QrCodeCardDemo },
	ActivityLog: { name: 'ActivityLog', title: '操作审计日志', component: ActivityLogDemo },
	DragSortList: { name: 'DragSortList', title: '拖拽排序列表', component: DragSortListDemo },
	TiltCard: { name: 'TiltCard', title: '3D 倾斜卡片', component: TiltCardDemo },
	GuidedTour: { name: 'GuidedTour', title: '漫游引导', component: GuidedTourDemo },
	Marquee: { name: 'Marquee', title: '无缝跑马灯', component: MarqueeDemo },
	SpotlightCard: { name: 'SpotlightCard', title: '聚光灯卡片', component: SpotlightCardDemo },
	SensitiveMask: { name: 'SensitiveMask', title: '敏感脱敏', component: SensitiveMaskDemo },
	DiffViewer: { name: 'DiffViewer', title: '差异比对', component: DiffViewerDemo },
	CronPicker: { name: 'CronPicker', title: 'Cron 选择器', component: CronPickerDemo },
	FilePreviewer: { name: 'FilePreviewer', title: '文件预览', component: FilePreviewerDemo },
	FloatingActionBar: { name: 'FloatingActionBar', title: '悬浮操作栏', component: FloatingActionBarDemo },
	Fullscreen: { name: 'Fullscreen', title: '全屏容器', component: FullscreenDemo },
	ImageCropper: { name: 'ImageCropper', title: '图片裁剪', component: ImageCropperDemo },
	ScrollTracker: { name: 'ScrollTracker', title: '滚动与吸顶', component: ScrollTrackerDemo },
	TagInput: { name: 'TagInput', title: '标签输入器', component: TagInputDemo },
	PasswordStrength: { name: 'PasswordStrength', title: '密码强度检测', component: PasswordStrengthDemo },
	JsonEditor: { name: 'JsonEditor', title: 'JSON 查看与编辑', component: JsonEditorDemo },
	InfiniteScrollList: { name: 'InfiniteScrollList', title: '无限滚动列表', component: InfiniteScrollListDemo },
	CopyButton: { name: 'CopyButton', title: '复制按钮', component: CopyButtonDemo },
	ContextMenu: { name: 'ContextMenu', title: '右键菜单', component: ContextMenuDemo },
	CollapseBox: { name: 'CollapseBox', title: '折叠容器', component: CollapseBoxDemo },
	Splitter: { name: 'Splitter', title: '分隔面板', component: SplitterDemo },
	Masonry: { name: 'Masonry', title: '瀑布流', component: MasonryDemo },
	DebounceSelect: { name: 'DebounceSelect', title: '防抖下拉框', component: DebounceSelectDemo },
	ColorPicker: { name: 'ColorPicker', title: '颜色选择器', component: ColorPickerDemo },
	CountUp: { name: 'CountUp', title: '数字滚动', component: CountUpDemo },
	TextEllipsis: { name: 'TextEllipsis', title: '文本省略', component: TextEllipsisDemo },
	BorderBeam: { name: 'BorderBeam', title: '边框流光', component: BorderBeamDemo },
	DisabledBox: { name: 'DisabledBox', title: '禁用遮罩', component: DisabledBoxDemo },
};

export default function App() {
	const [activeKey, setActiveKey] = useState<string>('CollapseBox');
	const [searchKeyword, setSearchKeyword] = useState<string>('');

	// 查找当前选中的组件元数据
	const currentComponentInfo = useMemo(() => {
		for (const cat of navCategories) {
			const found = cat.items.find((item) => item.key === activeKey);
			if (found) return found;
		}
		return null;
	}, [activeKey]);

	// 根据搜索关键词过滤侧边栏菜单
	const filteredCategories = useMemo(() => {
		if (!searchKeyword.trim()) return navCategories;
		const kw = searchKeyword.toLowerCase();
		return navCategories
			.map((cat) => ({
				...cat,
				items: cat.items.filter(
					(item) =>
						item.name.toLowerCase().includes(kw) ||
						item.title.toLowerCase().includes(kw) ||
						item.key.toLowerCase().includes(kw),
				),
			}))
			.filter((cat) => cat.items.length > 0);
	}, [searchKeyword]);

	return (
		<div
			style={{
				display: 'flex',
				height: '100vh',
				width: '100vw',
				overflow: 'hidden',
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
				color: '#262626',
				background: '#f8f9fa',
			}}
		>
			{/* 左侧侧边栏 Navigation Sidebar */}
			<aside
				style={{
					width: 280,
					minWidth: 280,
					height: '100%',
					background: '#ffffff',
					borderRight: '1px solid #f0f0f0',
					display: 'flex',
					flexDirection: 'column',
					boxSizing: 'border-box',
				}}
			>
				{/* 侧边栏 Header & Search */}
				<div style={{ padding: '20px 20px 16px 20px', borderBottom: '1px solid #f5f5f5' }}>
					<div
						style={{
							fontSize: 18,
							fontWeight: 600,
							color: '#1f1f1f',
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							marginBottom: 14,
						}}
					>
						<span
							style={{
								width: 10,
								height: 10,
								borderRadius: '50%',
								background: '#1677ff',
								display: 'inline-block',
							}}
						/>
						组件预览库
					</div>
					<input
						type="text"
						placeholder="搜索组件..."
						value={searchKeyword}
						onChange={(e) => setSearchKeyword(e.target.value)}
						style={{
							width: '100%',
							padding: '7px 12px',
							borderRadius: 6,
							border: '1px solid #d9d9d9',
							fontSize: 13,
							outline: 'none',
							boxSizing: 'border-box',
							transition: 'all 0.2s',
						}}
					/>
				</div>

				{/* 组件分类与菜单列表 */}
				<nav
					style={{
						flex: 1,
						overflowY: 'auto',
						padding: '16px 12px 24px 12px',
					}}
				>
					{/* 查看全部选项 */}
					<div
						onClick={() => setActiveKey('ALL')}
						style={{
							padding: '9px 12px',
							borderRadius: 6,
							fontSize: 14,
							cursor: 'pointer',
							marginBottom: 16,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							background: activeKey === 'ALL' ? '#e6f4ff' : 'transparent',
							color: activeKey === 'ALL' ? '#1677ff' : '#595959',
							fontWeight: activeKey === 'ALL' ? 600 : 400,
							transition: 'all 0.15s ease',
						}}
					>
						<span>全部组件概览</span>
						<span
							style={{
								fontSize: 11,
								padding: '2px 6px',
								borderRadius: 4,
								background: activeKey === 'ALL' ? '#bae0ff' : '#f5f5f5',
								color: activeKey === 'ALL' ? '#0958d9' : '#8c8c8c',
							}}
						>
							ALL
						</span>
					</div>

					{filteredCategories.map((group) => (
						<div key={group.category} style={{ marginBottom: 20 }}>
							<div
								style={{
									fontSize: 12,
									fontWeight: 500,
									color: '#8c8c8c',
									padding: '0 12px 6px 12px',
									borderBottom: '1px solid #f0f0f0',
									marginBottom: 8,
									letterSpacing: 0.5,
								}}
							>
								{group.category}
							</div>

							{group.items.map((item) => {
								const isActive = activeKey === item.key;
								return (
									<div
										key={item.key}
										onClick={() => setActiveKey(item.key)}
										style={{
											padding: '9px 12px',
											borderRadius: 6,
											fontSize: 14,
											cursor: 'pointer',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginBottom: 2,
											background: isActive ? '#e6f4ff' : 'transparent',
											color: isActive ? '#1677ff' : '#262626',
											fontWeight: isActive ? 600 : 400,
											transition: 'all 0.15s ease-in-out',
										}}
									>
										<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
											<span>{item.name}</span>
											<span style={{ fontSize: 13, color: isActive ? '#1677ff' : '#8c8c8c' }}>
												{item.title}
											</span>
										</div>

										{item.tag && (
											<span
												style={{
													fontSize: 11,
													padding: '1px 6px',
													borderRadius: 4,
													background: isActive ? '#bae0ff' : '#f6ffed',
													border: `1px solid ${isActive ? '#91caff' : '#b7eb8f'}`,
													color: isActive ? '#0958d9' : '#389e0d',
													fontFamily: 'monospace',
												}}
											>
												{item.tag}
											</span>
										)}
									</div>
								);
							})}
						</div>
					))}
				</nav>
			</aside>

			{/* 右侧主内容展示区域 Content Container */}
			<main
				style={{
					flex: 1,
					height: '100%',
					overflowY: 'auto',
					padding: '32px 48px',
					boxSizing: 'border-box',
					background: '#ffffff',
				}}
			>
				{/* 顶部 Header 说明 */}
				<header
					style={{
						marginBottom: 32,
						paddingBottom: 20,
						borderBottom: '1px solid #f0f0f0',
					}}
				>
					{activeKey === 'ALL' ? (
						<div>
							<h1 style={{ margin: '0 0 8px 0', fontSize: 26, color: '#1f1f1f' }}>
								全部组件演示 Overview
							</h1>
							<p style={{ margin: 0, color: '#666', fontSize: 14 }}>
								包含组件库中所有的 React 公共组件。点击左侧菜单可精准查看单组件 Demo。
							</p>
						</div>
					) : (
						currentComponentInfo && (
							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
									<h1 style={{ margin: 0, fontSize: 26, color: '#1f1f1f' }}>
										{currentComponentInfo.name}{' '}
										<span style={{ fontSize: 20, fontWeight: 400, color: '#595959' }}>
											{currentComponentInfo.title}
										</span>
									</h1>
									{currentComponentInfo.tag && (
										<span
											style={{
												fontSize: 12,
												padding: '2px 8px',
												borderRadius: 4,
												background: '#e6f4ff',
												color: '#1677ff',
												fontWeight: 500,
											}}
										>
											{currentComponentInfo.tag}
										</span>
									)}
								</div>
								<p style={{ margin: 0, color: '#666', fontSize: 14 }}>
									{currentComponentInfo.description}
								</p>
							</div>
						)
					)}
				</header>

				{/* 动态渲染选中组件的 Demo */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
					{activeKey === 'ALL' ? (
						Object.entries(demoComponentsMap).map(([key, info]) => {
							const TargetDemo = info.component;
							return (
								<section
									key={key}
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 24,
										padding: 24,
										borderRadius: 12,
										border: '1px solid #f0f0f0',
									}}
								>
									<h2
										style={{
											margin: 0,
											fontSize: 20,
											borderBottom: '1px solid #f0f0f0',
											paddingBottom: 12,
										}}
									>
										{info.name} {info.title}
									</h2>
									<TargetDemo />
								</section>
							);
						})
					) : (
						demoComponentsMap[activeKey] && (
							<section>
								{(() => {
									const TargetDemo = demoComponentsMap[activeKey].component;
									return <TargetDemo />;
								})()}
							</section>
						)
					)}
				</div>
			</main>
		</div>
	);
}
