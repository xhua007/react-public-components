import React, { useState, useEffect, CSSProperties } from 'react';
import './index.less';

export interface PhotoItem {
	src: string;
	alt?: string;
	title?: string;
}

export interface PhotoViewerProps {
	/** 相册图片列表 */
	images: PhotoItem[];
	/** 默认展示图片下标，默认为 0 */
	defaultIndex?: number;
	/** 图片高度，默认为 380 */
	height?: number | string;
	/** 图片切换回调 */
	onChange?: (index: number) => void;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({
	images = [],
	defaultIndex = 0,
	height = 380,
	onChange,
	className = '',
	style,
}) => {
	const [currentIndex, setCurrentIndex] = useState<number>(defaultIndex);

	const handleSelect = (index: number) => {
		setCurrentIndex(index);
		onChange?.(index);
	};

	const handlePrev = () => {
		const next = (currentIndex - 1 + images.length) % images.length;
		handleSelect(next);
	};

	const handleNext = () => {
		const next = (currentIndex + 1) % images.length;
		handleSelect(next);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') handlePrev();
			if (e.key === 'ArrowRight') handleNext();
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [currentIndex, images.length]);

	if (images.length === 0) return null;
	const currentImg = images[currentIndex] || images[0];

	return (
		<div className={`rpc_photo_viewer ${className}`} style={style}>
			{/* 顶部标题与张数计数 */}
			<div className="rpc_photo_viewer_top_bar">
				<span className="rpc_photo_viewer_top_title">
					{currentImg.title || currentImg.alt || `Photo ${currentIndex + 1}`}
				</span>
				<span className="rpc_photo_viewer_counter">
					{currentIndex + 1} / {images.length}
				</span>
			</div>

			{/* 主图预览 */}
			<div className="rpc_photo_viewer_main_wrap" style={{ height }}>
				<img
					src={currentImg.src}
					alt={currentImg.alt || `Photo ${currentIndex + 1}`}
					className="rpc_photo_viewer_main_img"
				/>

				{images.length > 1 && (
					<>
						<button
							type="button"
							className="rpc_photo_viewer_nav_btn rpc_photo_viewer_nav_btn_prev"
							onClick={handlePrev}
							title="上一张 (← 键盘左键)"
						>
							‹
						</button>
						<button
							type="button"
							className="rpc_photo_viewer_nav_btn rpc_photo_viewer_nav_btn_next"
							onClick={handleNext}
							title="下一张 (→ 键盘右键)"
						>
							›
						</button>
					</>
				)}
			</div>

			{/* 底部缩略图联动 */}
			{images.length > 1 && (
				<div className="rpc_photo_viewer_thumbs_wrap">
					{images.map((img, idx) => (
						<div
							key={idx}
							className={`rpc_photo_viewer_thumb ${
								currentIndex === idx ? 'rpc_photo_viewer_thumb_active' : ''
							}`}
							onClick={() => handleSelect(idx)}
						>
							<img src={img.src} alt={img.alt || ''} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PhotoViewer;
