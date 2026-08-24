import { useState } from 'react';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function CodeSnippetDemo() {
	const [lastAction, setLastAction] = useState<string>('');

	// 纯原生 react-public-components 演示代码 (TypeScript)
	const tsDemoCode = `import React, { useState } from 'react';
import {
  MetricCard,
  TrendIndicator,
  SensitiveMask,
  CopyButton
} from 'react-public-components';

export const DashboardCard: React.FC = () => {
  const [apiKey] = useState('sk-live-98234871923847192837');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
      {/* 1. 核心业务 KPI 指标卡片 */}
      <MetricCard
        title="本月累计总营收 (GMV)"
        value={1289600}
        prefix="¥"
        trend="up"
        trendValue="+24.8%"
        trendLabel="较上月"
        chartData={[30, 45, 40, 65, 58, 80, 92]}
        chartColor="#1677ff"
        footer="日均结算金额：¥42,980"
      />

      {/* 2. 敏感密钥数据脱敏与一键复制 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: '#fff', borderRadius: 8, border: '1px solid #f0f0f0' }}>
        <span style={{ fontSize: 13, color: '#8c8c8c' }}>生产环境 API Key:</span>
        <SensitiveMask text={apiKey} type="custom" unmaskedStart={4} unmaskedEnd={4} copyable />
        <TrendIndicator value={99.98} suffix="%" prefix="可用率 " />
      </div>
    </div>
  );
};

export default DashboardCard;`;

	// 纯原生 react-public-components 演示代码 (JavaScript)
	const jsDemoCode = `import React, { useState } from 'react';
import {
  MetricCard,
  TrendIndicator,
  SensitiveMask,
  CopyButton
} from 'react-public-components';

export const DashboardCard = () => {
  const [apiKey] = useState('sk-live-98234871923847192837');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
      {/* 1. 核心业务 KPI 指标卡片 */}
      <MetricCard
        title="本月累计总营收 (GMV)"
        value={1289600}
        prefix="¥"
        trend="up"
        trendValue="+24.8%"
        trendLabel="较上月"
        chartData={[30, 45, 40, 65, 58, 80, 92]}
        chartColor="#1677ff"
        footer="日均结算金额：¥42,980"
      />

      {/* 2. 敏感密钥数据脱敏与一键复制 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: '#fff', borderRadius: 8, border: '1px solid #f0f0f0' }}>
        <span style={{ fontSize: 13, color: '#8c8c8c' }}>生产环境 API Key:</span>
        <SensitiveMask text={apiKey} type="custom" unmaskedStart={4} unmaskedEnd={4} copyable />
        <TrendIndicator value={99.98} suffix="%" prefix="可用率 " />
      </div>
    </div>
  );
};

export default DashboardCard;`;

	const bashCode = `npm install react-public-components\n# 引入组件库核心样式与组件\nimport { CodeSnippet, Watermark, SensitiveMask } from 'react-public-components';`;

	const usageCode = `import { CodeSnippet } from 'react-public-components';

export default function App() {
  return (
    <CodeSnippet
      theme="light"
      showActions
      collapsible
      showCollapseFooter
      tabs={[
        {
          key: 'ts',
          label: 'TypeScript',
          code: 'import { MetricCard } from "react-public-components";',
          language: 'tsx'
        },
        {
          key: 'js',
          label: 'JavaScript',
          code: 'import { MetricCard } from "react-public-components";',
          language: 'jsx'
        }
      ]}
      onAction={(action) => console.log('触发操作:', action)}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'code', desc: '代码文本内容（单代码模式）', type: 'string', default: '-' },
		{ name: 'language', desc: '编程语言标识（如 tsx, ts, jsx, bash, json 等）', type: 'string', default: "'tsx'" },
		{ name: 'theme', desc: "代码块主题风格：'dark' 暗色（默认） / 'light' 亮色", type: "'dark' | 'light'", default: "'dark'" },
		{ name: 'showActions', desc: '是否在代码块顶部展示经典操作工具栏（CodeSandbox、CodePen、StackBlitz、外部打开、复制、代码展开折叠）', type: 'boolean', default: 'false' },
		{ name: 'actions', desc: '自定义操作工具栏按钮列表，可自定义图标顺序或插入自定义节点', type: "(BuiltinAction | ReactNode)[]", default: "['codesandbox', 'codepen', 'stackblitz', 'external', 'copy', 'collapse']" },
		{ name: 'onAction', desc: '点击操作工具栏按钮时的回调函数（回传 codesandbox / codepen / stackblitz / external / copy / collapse）', type: '(actionKey: string) => void', default: '-' },
		{ name: 'sandboxConfig', desc: '自定义沙箱项目配置（支持 title, description, dependencies 等）', type: 'SandboxConfig', default: '-' },
		{ name: 'externalUrl', desc: '自定义外部全屏运行页面的独立 URL（不传时自动动态生成纯净预览）', type: 'string', default: '-' },
		{ name: 'tabs', desc: '多语言/多版本 Tabs 切换列表，每项含 key, label, code, language', type: 'CodeTabItem[]', default: '-' },
		{ name: 'activeTabKey', desc: '当前激活的 Tab key（受控）', type: 'string', default: '-' },
		{ name: 'defaultActiveTabKey', desc: '默认激活的 Tab key', type: 'string', default: '-' },
		{ name: 'onTabChange', desc: 'Tab 切换时的回调函数', type: '(key: string) => void', default: '-' },
		{ name: 'collapsible', desc: '是否开启折叠收起代码功能', type: 'boolean', default: 'false' },
		{ name: 'defaultCollapsed', desc: '默认是否处于折叠收起状态', type: 'boolean', default: 'false' },
		{ name: 'collapsed', desc: '当前是否处于折叠收起状态（受控）', type: 'boolean', default: '-' },
		{ name: 'onCollapseChange', desc: '折叠/展开状态改变时的回调函数', type: '(collapsed: boolean) => void', default: '-' },
		{ name: 'showCollapseFooter', desc: '是否在底部展示“^ 收起代码 / v 展开代码”控制栏', type: 'boolean', default: 'false' },
		{ name: 'showLineNumbers', desc: '是否展示代码行号', type: 'boolean', default: 'false' },
		{ name: 'copyable', desc: '是否展示一键复制按钮', type: 'boolean', default: 'true' },
		{ name: 'title', desc: '顶部自定义标题/说明标签（无 showActions 时生效）', type: 'ReactNode', default: 'language 名称' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 文档演示卡片完整交互工具栏（图1红色框选功能） */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 文档演示组件操作栏 (Actions Bar + TS/JS Tabs + 底部折叠收起)
				</h3>
				<p style={{ color: '#595959', fontSize: 14, marginBottom: 16 }}>
					支持上方 CodeSandbox、CodePen、StackBlitz、在新标签页打开、复制代码、展开/收起完整工具按钮组，支持 TypeScript / JavaScript 语言切换以及底部收起条。
				</p>

				<div style={{ maxWidth: 720 }}>
					<CodeSnippet
						theme="light"
						showActions
						collapsible
						showCollapseFooter
						tabs={[
							{ key: 'ts', label: 'TypeScript', code: tsDemoCode, language: 'tsx' },
							{ key: 'js', label: 'JavaScript', code: jsDemoCode, language: 'jsx' },
						]}
						onAction={(act) => {
							setLastAction(`已触发在线沙箱操作: ${act}`);
							console.log('Action Clicked:', act);
						}}
					/>
				</div>

				{lastAction && (
					<div style={{ marginTop: 10, fontSize: 13, color: '#1677ff', fontWeight: 500 }}>
						💡 {lastAction}
					</div>
				)}
			</div>

			{/* 2. 暗色极客终端风格 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					2. Mac 终端风格（暗色主题 + 行号 + 一键复制）
				</h3>
				<div style={{ maxWidth: 720 }}>
					<CodeSnippet code={bashCode} language="bash" theme="dark" showLineNumbers />
				</div>
			</div>

			{/* 3. 示例代码 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>💻 示例代码 / Usage</h3>
				<div style={{ maxWidth: 720 }}>
					<CodeSnippet code={usageCode} language="typescript" />
				</div>
			</div>

			<ApiTable data={apiData} />
		</div>
	);
}
