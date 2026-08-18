import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import {
	PlayCircleOutlined,
	PauseCircleOutlined,
	FullscreenOutlined,
	FullscreenExitOutlined,
	SoundOutlined,
} from '../src/icons';
import './index.less';

export interface VideoPlayerProps {
	/** 视频播放地址 */
	src: string;
	/** 视频封面图 */
	poster?: string;
	/** 是否自动播放，默认为 false */
	autoPlay?: boolean;
	/** 是否循环播放，默认为 false */
	loop?: boolean;
	/** 是否默认静音，默认为 false */
	muted?: boolean;
	/** 宽度，默认为 640 */
	width?: number | string;
	/** 高度，默认为 360 */
	height?: number | string;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

function formatVideoTime(seconds: number): string {
	if (isNaN(seconds) || seconds < 0) return '00:00';
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const speedList = [0.75, 1.0, 1.25, 1.5, 2.0];

const VideoPlayer: React.FC<VideoPlayerProps> = ({
	src,
	poster,
	autoPlay = false,
	loop = false,
	muted = false,
	width = 640,
	height = 360,
	className = '',
	style,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);

	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [speedIndex, setSpeedIndex] = useState<number>(1); // 1.0x
	const [isControlsVisible, setIsControlsVisible] = useState<boolean>(true);
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

	const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const currentSpeed = speedList[speedIndex] || 1.0;

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video) return;
		if (isPlaying) {
			video.pause();
			setIsPlaying(false);
		} else {
			video.play();
			setIsPlaying(true);
		}
	};

	const seekBy = (seconds: number) => {
		const video = videoRef.current;
		if (!video) return;
		video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
	};

	const handleTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
	};

	const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!progressRef.current || !videoRef.current || !duration) return;
		const rect = progressRef.current.getBoundingClientRect();
		const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
		const target = percent * duration;
		videoRef.current.currentTime = target;
		setCurrentTime(target);
	};

	const handleSpeedChange = () => {
		const next = (speedIndex + 1) % speedList.length;
		setSpeedIndex(next);
		if (videoRef.current) {
			videoRef.current.playbackRate = speedList[next];
		}
	};

	const toggleFullscreen = () => {
		const container = containerRef.current;
		if (!container) return;

		if (!document.fullscreenElement) {
			container.requestFullscreen?.();
			setIsFullscreen(true);
		} else {
			document.exitFullscreen?.();
			setIsFullscreen(false);
		}
	};

	const togglePiP = async () => {
		const video = videoRef.current;
		if (!video) return;
		if (document.pictureInPictureElement) {
			await document.exitPictureInPicture();
		} else if (document.pictureInPictureEnabled) {
			await video.requestPictureInPicture();
		}
	};

	const showControls = () => {
		setIsControlsVisible(true);
		if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
		hideTimerRef.current = setTimeout(() => {
			if (isPlaying) {
				setIsControlsVisible(false);
			}
		}, 3000);
	};

	const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

	return (
		<div
			ref={containerRef}
			onMouseMove={showControls}
			onMouseEnter={showControls}
			onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
			className={`rpc_video_player ${className}`}
			style={{ width, height, ...style }}
		>
			<video
				ref={videoRef}
				src={src}
				poster={poster}
				autoPlay={autoPlay}
				loop={loop}
				muted={muted}
				onClick={togglePlay}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={() => setIsPlaying(false)}
				className="rpc_video_player_video"
			/>

			{/* 中央大播放按钮（暂停时展示） */}
			{!isPlaying && (
				<div className="rpc_video_player_big_play_btn" onClick={togglePlay}>
					▶
				</div>
			)}

			{/* 底部控制条 */}
			<div
				className={`rpc_video_player_controls ${
					!isControlsVisible && isPlaying ? 'rpc_video_player_controls_hidden' : ''
				}`}
			>
				{/* 进度条 */}
				<div
					ref={progressRef}
					className="rpc_video_player_progress_wrap"
					onClick={handleProgressClick}
				>
					<div
						className="rpc_video_player_progress_fill"
						style={{ width: `${progressPercent}%` }}
					/>
				</div>

				<div className="rpc_video_player_bar_row">
					<div className="rpc_video_player_left_btns">
						<button type="button" className="rpc_video_player_btn" onClick={togglePlay}>
							{isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
						</button>

						<button
							type="button"
							className="rpc_video_player_btn"
							onClick={() => seekBy(-10)}
							title="快退 10 秒"
						>
							⏪ 10s
						</button>
						<button
							type="button"
							className="rpc_video_player_btn"
							onClick={() => seekBy(10)}
							title="快进 10 秒"
						>
							10s ⏩
						</button>

						<span className="rpc_video_player_time">
							{formatVideoTime(currentTime)} / {formatVideoTime(duration)}
						</span>
					</div>

					<div className="rpc_video_player_right_btns">
						<button
							type="button"
							className="rpc_video_player_btn rpc_video_player_speed_btn"
							onClick={handleSpeedChange}
							title="播放倍速"
						>
							{currentSpeed}x
						</button>

						<button
							type="button"
							className="rpc_video_player_btn"
							onClick={togglePiP}
							title="画中画模式"
						>
							🪟
						</button>

						<button
							type="button"
							className="rpc_video_player_btn"
							onClick={toggleFullscreen}
							title="全屏切换"
						>
							{isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;
