import { useState } from 'react';
import EnvBadge, { EnvType } from '../../../EnvBadge';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function EnvBadgeDemo() {
	const [env, setEnv] = useState<EnvType>('uat');

	const usageCode = `import { EnvBadge } from 'react-public-components';

export default function App() {
  return (
    <EnvBadge
      env="uat"
      placement="top-right"
      info={{
        version: 'v2.4.0',
        branch: 'release/20260815',
        commit: '7fa89cd',
        buildTime: '2026-08-15 14:20'
      }}
      switchList={[
        { label: '开发环境 (DEV)', url: 'https://dev.example.com', env: 'dev' },
        { label: '预发环境 (STAGING)', url: 'https://staging.example.com', env: 'staging' }
      ]}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{
			name: 'env',
			desc: "当前运行环境：'dev' | 'test' | 'uat' | 'staging' | 'prod'",
			type: 'EnvType',
			required: true,
		},
		{
			name: 'placement',
			desc: "悬浮挂载位置：'top-right' | 'top-left' | 'bottom-right'",
			type: 'EnvPlacement',
			default: "'top-right'",
		},
		{
			name: 'label',
			desc: '自定义显示的标签文字（不传时展示大写的环境名称）',
			type: 'ReactNode',
			default: '-',
		},
		{
			name: 'info',
			desc: '构建与部署版本元数据，包含 version, branch, commit, buildTime, apiHost',
			type: 'EnvBuildInfo',
			default: '-',
		},
		{
			name: 'switchList',
			desc: '快捷切换至其他环境的跳转链接列表',
			type: 'EnvSwitchItem[]',
			default: '-',
		},
		{ name: 'visible', desc: '是否显示环境角标', type: 'boolean', default: 'true' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 环境标识防误操作角标（点击右上角胶囊查看构建版本与多环境跳转）
				</h3>

				<div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
					<button type="button" onClick={() => setEnv('dev')}>
						切换至 DEV (开发)
					</button>
					<button type="button" onClick={() => setEnv('uat')}>
						切换至 UAT (验收)
					</button>
					<button type="button" onClick={() => setEnv('staging')}>
						切换至 STAGING (预发)
					</button>
					<button type="button" onClick={() => setEnv('prod')}>
						切换至 PROD (生产报警)
					</button>
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
						👉 查看当前模拟容器右上角的动态悬浮标签，点击可展开 Git
						Commit、构建时间、版本号及多环境一键切换。
					</p>

					<EnvBadge
						env={env}
						info={{
							version: 'v2.4.0-build.1092',
							branch: 'feature/rpc-v1.3',
							commit: '7fa89cd9a',
							buildTime: '2026-08-15 14:20:00 CST',
							apiHost: 'https://api-uat.company.internal',
						}}
						switchList={[
							{ label: '开发环境 (DEV)', url: '#dev', env: 'dev' },
							{ label: '测试验收 (UAT)', url: '#uat', env: 'uat' },
							{ label: '预发布环境 (STAGING)', url: '#staging', env: 'staging' },
						]}
					/>
				</div>
			</div>

			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 640 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
