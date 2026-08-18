import HoverCard from '../../../HoverCard';

export default function HoverCardDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. Twitter / GitHub 风格悬浮资料卡（防误触延迟触发 + 视口防溢出）
				</h3>

				<div style={{ fontSize: 14, color: '#595959', lineHeight: 2 }}>
					本项目的核心架构设计由{' '}
					<HoverCard
						content={
							<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
								<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
									<div
										style={{
											width: 44,
											height: 44,
											borderRadius: '50%',
											background: '#1677ff',
											color: '#ffffff',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: 20,
										}}
									>
										🚀
									</div>
									<div>
										<div style={{ fontWeight: 600, fontSize: 14, color: '#1f1f1f' }}>
											Alex Johnson
										</div>
										<div style={{ fontSize: 12, color: '#8c8c8c' }}>@alex · 前端技术委员会</div>
									</div>
								</div>

								<div style={{ fontSize: 12, color: '#595959' }}>
									全栈极客架构师，专注于高阶 React 公共组件与 WebGL 可视化体系。
								</div>

								<div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#8c8c8c' }}>
									<span><b>1.2k</b> 关注者</span>
									<span><b>98</b> 开源库</span>
								</div>
							</div>
						}
					>
						<span
							style={{
								color: '#1677ff',
								fontWeight: 600,
								cursor: 'pointer',
								borderBottom: '1px dashed #1677ff',
							}}
						>
							@alex
						</span>
					</HoverCard>{' '}
					主导，并在团队内部全面推广使用。鼠标悬停在用户昵称上可查看资料卡。
				</div>
			</div>
		</div>
	);
}
