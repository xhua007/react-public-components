import { useState, useRef } from 'react';
import ImageCropper, { ImageCropperRef, CropResult } from '../../../ImageCropper';

// 内置高清测试风景图片（基于 SVG DataURL，确保开箱即用无需依赖外链）
const demoLandscapeSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%231677ff"/><stop offset="60%" stop-color="%2391caff"/><stop offset="100%" stop-color="%23ffffff"/></linearGradient><linearGradient id="sun" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ff7a45"/><stop offset="100%" stop-color="%23ffc53d"/></linearGradient><linearGradient id="mountain" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%2352c41a"/><stop offset="100%" stop-color="%23237804"/></linearGradient></defs><rect width="800" height="600" fill="url(%23sky)"/><circle cx="620" cy="180" r="70" fill="url(%23sun)"/><polygon points="120,600 380,240 640,600" fill="url(%23mountain)" opacity="0.9"/><polygon points="340,600 580,310 820,600" fill="url(%23mountain)" opacity="0.8"/><text x="400" y="520" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23ffffff" text-anchor="middle">React Public Components</text></svg>`;

export default function ImageCropperDemo() {
	const [croppedResult, setCroppedResult] = useState<CropResult | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [avatarResult, setAvatarResult] = useState<string>('');
	const cropperRef = useRef<ImageCropperRef>(null);

	const handleCrop = async () => {
		if (cropperRef.current) {
			const res = await cropperRef.current.getCroppedResult();
			setCroppedResult(res);
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 内联裁剪器与实时预览 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 内嵌图片裁剪器 (4:3 比例 / 滚轮缩放 / 拖拽)</h3>
				<div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, alignItems: 'start' }}>
					<div>
						<ImageCropper
							ref={cropperRef}
							src={demoLandscapeSvg}
							aspectRatio={4 / 3}
							height={340}
						/>
						<div style={{ marginTop: 12 }}>
							<button
								onClick={handleCrop}
								style={{
									padding: '7px 20px',
									background: '#1677ff',
									color: '#fff',
									border: 'none',
									borderRadius: 6,
									cursor: 'pointer',
									fontWeight: 500,
								}}
							>
								获取当前裁剪图像
							</button>
						</div>
					</div>

					<div
						style={{
							background: '#fafafa',
							border: '1px solid #f0f0f0',
							borderRadius: 8,
							padding: 16,
							minHeight: 340,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 12 }}>实时裁剪生成结果：</div>
						{croppedResult ? (
							<div style={{ textAlign: 'center' }}>
								<img
									src={croppedResult.dataURL}
									alt="Cropped Preview"
									style={{
										maxWidth: '100%',
										maxHeight: 220,
										borderRadius: 6,
										border: '1px solid #e8e8e8',
										boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
									}}
								/>
								<div style={{ fontSize: 12, color: '#595959', marginTop: 8 }}>
									尺寸: {croppedResult.width} × {croppedResult.height} px
								</div>
							</div>
						) : (
							<span style={{ color: '#bfbfbf', fontSize: 13 }}>点击左下方按钮生成裁剪预览</span>
						)}
					</div>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					可在画布内直接鼠标按住拖拽平移、鼠标滚轮平滑缩放，或使用底部工具栏旋转。
				</p>
			</div>

			{/* 2. Modal 弹窗头像裁剪模式 (1:1 圆形裁剪) */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. Modal 头像圆形裁剪弹窗 (shape="round")</h3>
				<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<button
						onClick={() => setModalOpen(true)}
						style={{
							padding: '8px 18px',
							background: '#ffffff',
							border: '1px solid #d9d9d9',
							borderRadius: 6,
							cursor: 'pointer',
							fontSize: 14,
						}}
					>
						打开头像裁剪弹窗
					</button>

					{avatarResult && (
						<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
							<img
								src={avatarResult}
								alt="Avatar"
								style={{
									width: 64,
									height: 64,
									borderRadius: '50%',
									border: '2px solid #1677ff',
									boxShadow: '0 2px 8px rgba(22, 119, 255, 0.2)',
								}}
							/>
							<span style={{ fontSize: 13, color: '#52c41a' }}>头像已成功裁剪！</span>
						</div>
					)}
				</div>

				<ImageCropper
					modal
					open={modalOpen}
					src={demoLandscapeSvg}
					shape="round"
					aspectRatio={1}
					title="裁剪用户个人头像"
					onOk={(res) => {
						setAvatarResult(res.dataURL);
						setModalOpen(false);
					}}
					onCancel={() => setModalOpen(false)}
				/>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					设置 `shape="round"` 和 `modal={true}` 即可直接作为高颜值用户头像上传裁剪器。
				</p>
			</div>
		</div>
	);
}
