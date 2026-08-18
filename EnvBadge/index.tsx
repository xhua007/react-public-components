import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import './index.less';

export type EnvType = 'dev' | 'test' | 'uat' | 'staging' | 'prod';
export type EnvPlacement = 'top-right' | 'top-left' | 'bottom-right';

export interface EnvBuildInfo {
	apiHost?: string;
	branch?: string;
	commit?: string;
	buildTime?: string;
	version?: string;
}

export interface EnvSwitchItem {
	label: string;
	url: string;
	env: EnvType;
}

export interface EnvBadgeProps {
	/** 当前运行环境：'dev' | 'test' | 'uat' | 'staging' | 'prod' */
	env: EnvType;
	/** 显示文本（不传则默认大写环境名） */
	label?: ReactNode;
	/** 悬浮挂载位置，默认为 'top-right' */
	placement?: EnvPlacement;
	/** 当前构建与部署版本信息 */
	info?: EnvBuildInfo;
	/** 快捷切换至其他环境列表 */
	switchList?: EnvSwitchItem[];
	/** 是否默认常驻，默认为 true */
	visible?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 自定义样式 */
	style?: CSSProperties;
}

const defaultEnvLabels: Record<EnvType, string> = {
	dev: 'DEV 开发环境',
	test: 'TEST 测试环境',
	uat: 'UAT 预验收',
	staging: 'STAGING 预发',
	prod: '🚨 PROD 生产环境',
};

const EnvBadge: React.FC<EnvBadgeProps> = ({
	env,
	label,
	placement = 'top-right',
	info,
	switchList,
	visible = true,
	className = '',
	style,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const badgeRef = useRef<HTMLDivElement>(null);

	const text = label || defaultEnvLabels[env] || env.toUpperCase();

	// 点击外部自动关闭气泡
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (badgeRef.current && !badgeRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	if (!visible) return null;

	return (
		<div
			ref={badgeRef}
			className={`rpc_env_badge rpc_env_badge_${placement.replace('-', '_')} ${className}`}
			style={style}
		>
			<div
				className={`rpc_env_badge_tag rpc_env_badge_tag_${env}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>●</span>
				<span>{text}</span>
			</div>

			{isOpen && (
				<div className="rpc_env_badge_popover">
					<div className="rpc_env_badge_pop_header">
						<span>系统环境信息</span>
						<span style={{ fontSize: 12, color: '#8c8c8c' }}>{env.toUpperCase()}</span>
					</div>

					{info ? (
						<div>
							{info.version && (
								<div className="rpc_env_badge_pop_row">
									<span>发布版本</span>
									<span>v{info.version}</span>
								</div>
							)}
							{info.branch && (
								<div className="rpc_env_badge_pop_row">
									<span>Git 分支</span>
									<span>{info.branch}</span>
								</div>
							)}
							{info.commit && (
								<div className="rpc_env_badge_pop_row">
									<span>Commit</span>
									<span>{info.commit}</span>
								</div>
							)}
							{info.apiHost && (
								<div className="rpc_env_badge_pop_row">
									<span>API 网关</span>
									<span style={{ fontSize: 11 }}>{info.apiHost}</span>
								</div>
							)}
							{info.buildTime && (
								<div className="rpc_env_badge_pop_row">
									<span>构建时间</span>
									<span>{info.buildTime}</span>
								</div>
							)}
						</div>
					) : (
						<div style={{ color: '#8c8c8c', fontSize: 12, padding: '8px 0' }}>
							暂无详细构建元数据
						</div>
					)}

					{switchList && switchList.length > 0 && (
						<div className="rpc_env_badge_switch_wrap">
							<span style={{ fontSize: 11, color: '#8c8c8c', width: '100%' }}>
								切换环境：
							</span>
							{switchList.map((item, idx) => (
								<a
									key={idx}
									href={item.url}
									className="rpc_env_badge_switch_btn"
								>
									{item.label}
								</a>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default EnvBadge;
