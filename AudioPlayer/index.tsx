import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { PlayCircleOutlined, PauseCircleOutlined, DownloadOutlined } from '../src/icons';
import './index.less';

export interface AudioPlayerProps {
	/** 音频资源地址 */
	src: string;
	/** 音频标题或文件名 */
	title?: ReactNode;
	/** 默认倍速，默认为 1 */
	defaultPlaybackRate?: number;
	/** 是否显示下载按钮，默认为 true */
	showDownload?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

function formatTime(seconds: number): string {
	if (isNaN(seconds) || seconds < 0) return '00:00';
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const speedOptions = [1.0, 1.25, 1.5, 2.0];

const AudioPlayer: React.FC<AudioPlayerProps> = ({
	src,
	title,
	defaultPlaybackRate = 1.0,
	showDownload = true,
	className = '',
	style,
}) => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);

	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [speedIndex, setSpeedIndex] = useState<number>(
		Math.max(0, speedOptions.indexOf(defaultPlaybackRate)),
	);

	const currentSpeed = speedOptions[speedIndex] || 1.0;

	// 播放 / 暂停切换
	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
		} else {
			audio.play();
			setIsPlaying(true);
		}
	};

	// 监听时间更新
	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	// 监听时长加载
	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	};

	// 切换倍速
	const handleSpeedCycle = () => {
		const nextIndex = (speedIndex + 1) % speedOptions.length;
		setSpeedIndex(nextIndex);
		if (audioRef.current) {
			audioRef.current.playbackRate = speedOptions[nextIndex];
		}
	};

	// 拖拽进度条 Seek
	const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!progressRef.current || !audioRef.current || !duration) return;
		const rect = progressRef.current.getBoundingClientRect();
		const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
		const targetTime = percent * duration;
		audioRef.current.currentTime = targetTime;
		setCurrentTime(targetTime);
	};

	const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

	return (
		<div className={`rpc_audio_player ${className}`} style={style}>
			<audio
				ref={audioRef}
				src={src}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={() => setIsPlaying(false)}
			/>

			{/* 播放 / 暂停按钮 */}
			<div className="rpc_audio_player_play_btn" onClick={togglePlay}>
				{isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
			</div>

			{/* 信息与进度条 */}
			<div className="rpc_audio_player_info">
				<div className="rpc_audio_player_title_row">
					<span className="rpc_audio_player_title">{title || '音频播放'}</span>
					<span className="rpc_audio_player_time">
						{formatTime(currentTime)} / {formatTime(duration)}
					</span>
				</div>

				<div ref={progressRef} className="rpc_audio_player_progress_bar" onClick={handleSeek}>
					<div
						className="rpc_audio_player_progress_fill"
						style={{ width: `${progressPercent}%` }}
					/>
				</div>
			</div>

			{/* 倍速与下载 */}
			<div className="rpc_audio_player_extra">
				<button
					type="button"
					className="rpc_audio_player_speed_btn"
					onClick={handleSpeedCycle}
					title="点击切换播放倍速"
				>
					{currentSpeed}x
				</button>

				{showDownload && (
					<a
						href={src}
						download
						className="rpc_audio_player_download_btn"
						title="下载音频文件"
						onClick={(e) => e.stopPropagation()}
					>
						<DownloadOutlined />
					</a>
				)}
			</div>
		</div>
	);
};

export default AudioPlayer;
