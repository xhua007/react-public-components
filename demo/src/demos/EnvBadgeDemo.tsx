import { useState } from 'react';
import EnvBadge, { EnvType } from '../../../EnvBadge';

export default function EnvBadgeDemo() {
	const [env, setEnv] = useState<EnvType>('uat');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 环境标识防误操作角标（点击右上角胶囊查看构建版本与多环境跳转）
				</h3>

				<div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
					<button type="button" onClick={() => setEnv('dev')}>切换至 DEV (开发)</button>
					<button type="button" onClick={() => setEnv('uat')}>切换至 UAT (验收)</button>
					<button type="button" onClick={() => setEnv('staging')}>切换至 STAGING (预发)</button>
					<button type="button" onClick={() => setEnv('prod')}>切换至 PROD (生产报警)</button>
				</div>

				<div
					style={{
						position: 'relative',
						height: 240,
						background: '#fafafa',
						border: '1px dashed #d9d9d9',
						borderRadius: 8,
						padding: 24,
						overflow: 'hidden',
					}}
				>
					<p style={{ color: '#595959', fontSize: 14 }}>
						👉 查看当前模拟容器右上角的动态悬浮标签，点击可展开 Git Commit、构建时间、版本号及多环境一键切换。
					</p>

					<EnvBadge
						env={env}
						placement="top-right"
						style={{ position: 'absolute' }}
						info={{
							version: '1.3.0',
							branch: 'release/2026-q3',
							commit: '7fa82cd',
							apiHost: 'https://api-uat.company.internal',
							buildTime: '2026-08-15 22:40',
						}}
						switchList={[
							{ label: '开发 DEV', url: '#', env: 'dev' },
							{ label: '预发 STG', url: '#', env: 'staging' },
							{ label: '生产 PROD', url: '#', env: 'prod' },
						]}
					/>
				</div>
			</div>
		</div>
	);
}
