import GradientText from '../../../GradientText';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function GradientTextDemo() {
	const usageCode = `import { GradientText } from 'react-public-components';

export default function App() {
  return (
    <h1 style={{ fontSize: 32 }}>
      <GradientText
        gradient="linear-gradient(90deg, #1677ff, #722ed1, #eb2f96)"
        animate
        speed={4}
      >
        打造下一代企业级 Web 公共组件库
      </GradientText>
    </h1>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'children', desc: '渐变展示的文本或内联节点', type: 'ReactNode', required: true },
		{ name: 'gradient', desc: 'CSS 渐变背景定义字符串', type: 'string', default: '蓝紫粉三色渐变' },
		{ name: 'animate', desc: '是否开启流光左右来回滚动动效', type: 'boolean', default: 'true' },
		{ name: 'speed', desc: '流光滚动动画周期耗时（秒）', type: 'number', default: '4' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 现代 SaaS 霓虹横向流光渐变文字（支持平滑滚动动画）
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
					<div style={{ fontSize: 32 }}>
						<GradientText>打造下一代企业级 Web 公共组件库</GradientText>
					</div>

					<div style={{ fontSize: 24 }}>
						<GradientText
							gradient="linear-gradient(90deg, #52c41a 0%, #13c2c2 50%, #1677ff 100%)"
							speed={3}
						>
							极速丝滑 · 零第三方臃肿依赖 · 69+ 款通用组件
						</GradientText>
					</div>

					<div style={{ fontSize: 20 }}>
						<GradientText
							gradient="linear-gradient(90deg, #fa8c16 0%, #eb2f96 100%)"
							animate={false}
						>
							静态渐变色展示效果（Gradient Highlight）
						</GradientText>
					</div>
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
