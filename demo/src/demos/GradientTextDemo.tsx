import GradientText from '../../../GradientText';

export default function GradientTextDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 现代 SaaS 霓虹横向流光渐变文字（支持平滑滚动动画）
				</h3>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
					<div style={{ fontSize: 32 }}>
						<GradientText>
							打造下一代企业级 Web 公共组件库
						</GradientText>
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
		</div>
	);
}
