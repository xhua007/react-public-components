import React, { useState, useRef, ReactNode, CSSProperties } from 'react';
import './index.less';

export interface TiltCardProps {
	/** 卡片子内容 */
	children: ReactNode;
	/** 最大倾斜旋转角度（度），默认为 15 */
	maxAngle?: number;
	/** 鼠标悬停时的缩放比例，默认为 1.02 */
	scale?: number;
	/** 是否开启表面跟随高光（Glare），默认为 true */
	glare?: boolean;
	/** 透视景深（像素），默认为 1000 */
	perspective?: number;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const TiltCard: React.FC<TiltCardProps> = ({
	children,
	maxAngle = 15,
	scale = 1.02,
	glare = true,
	perspective = 1000,
	className = '',
	style,
}) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [transformStyle, setTransformStyle] = useState<string>('');
	const [glareStyle, setGlareStyle] = useState<CSSProperties>({ opacity: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const percentX = (x / rect.width) * 2 - 1; // -1 ~ 1
		const percentY = (y / rect.height) * 2 - 1; // -1 ~ 1

		const rotateX = -percentY * maxAngle;
		const rotateY = percentX * maxAngle;

		setTransformStyle(
			`perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
		);

		if (glare) {
			const angle = Math.atan2(percentY, percentX) * (180 / Math.PI) - 90;
			setGlareStyle({
				opacity: 0.25,
				background: `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 80%)`,
			});
		}
	};

	const handleMouseLeave = () => {
		setTransformStyle(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
		setGlareStyle({ opacity: 0 });
	};

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={`rpc_tilt_card ${className}`}
			style={{
				transform: transformStyle,
				...style,
			}}
		>
			<div className="rpc_tilt_card_content">{children}</div>
			{glare && <div className="rpc_tilt_card_glare" style={glareStyle} />}
		</div>
	);
};

export default TiltCard;
