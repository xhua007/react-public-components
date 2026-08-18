import { useState } from 'react';
import Watermark from '../../../Watermark';

export default function WatermarkDemo() {
	const [tamperCount, setTamperCount] = useState(0);

	// 模拟 F12 Styles 面板取消勾选 background-image
	const simulateRemoveBgImage = () => {
		const el = document.querySelector('.rpc_watermark_layer') as HTMLElement;
		if (el) {
			el.style.backgroundImage = 'none';
			setTamperCount((c) => c + 1);
		}
	};

	// 模拟 F12 控制台清空水印样式
	const simulateClearStyle = () => {
		const el = document.querySelector('.rpc_watermark_layer') as HTMLElement;
		if (el) {
			el.removeAttribute('style');
			setTamperCount((c) => c + 1);
		}
	};

	// 模拟 F12 控制台修改样式为 display: none
	const simulateHideDisplay = () => {
		const el = document.querySelector('.rpc_watermark_layer') as HTMLElement;
		if (el) {
			el.style.display = 'none';
			setTamperCount((c) => c + 1);
		}
	};

	// 模拟 F12 控制台直接删除水印 DOM
	const simulateDeleteNode = () => {
		const el = document.querySelector('.rpc_watermark_layer');
		if (el && el.parentNode) {
			el.parentNode.removeChild(el);
			setTamperCount((c) => c + 1);
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 动态安全防截屏水印（内置 MutationObserver + ComputedStyle 强力防 F12 审查元素删除/隐藏）
				</h3>

				<div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
					<button
						onClick={simulateRemoveBgImage}
						style={{
							padding: '6px 14px',
							borderRadius: 6,
							border: '1px solid #1890ff',
							background: '#e6f7ff',
							color: '#096dd9',
							cursor: 'pointer',
							fontSize: 13,
							fontWeight: 500,
						}}
					>
						🖼️ 模拟 F12 取消勾选 background-image
					</button>

					<button
						onClick={simulateClearStyle}
						style={{
							padding: '6px 14px',
							borderRadius: 6,
							border: '1px solid #ff4d4f',
							background: '#fff1f0',
							color: '#cf1322',
							cursor: 'pointer',
							fontSize: 13,
							fontWeight: 500,
						}}
					>
						💥 模拟 F12 删除/清空水印样式
					</button>

					<button
						onClick={simulateHideDisplay}
						style={{
							padding: '6px 14px',
							borderRadius: 6,
							border: '1px solid #fa8c16',
							background: '#fff7e6',
							color: '#d46b08',
							cursor: 'pointer',
							fontSize: 13,
							fontWeight: 500,
						}}
					>
						🚫 模拟 F12 设置 display: none
					</button>

					<button
						onClick={simulateDeleteNode}
						style={{
							padding: '6px 14px',
							borderRadius: 6,
							border: '1px solid #722ed1',
							background: '#f9f0ff',
							color: '#531dab',
							cursor: 'pointer',
							fontSize: 13,
							fontWeight: 500,
						}}
					>
						🗑️ 模拟 F12 Delete Node 删除水印节点
					</button>
				</div>

				<div
					style={{
						maxWidth: 640,
						height: 260,
						border: '1px solid #d9d9d9',
						borderRadius: 8,
						overflow: 'hidden',
						position: 'relative',
					}}
				>
					<Watermark
						content={['内部机密 严禁外传', '张三 (alex.chen) 2026-08-15']}
						color="rgba(0, 0, 0, 0.12)"
						antiTamper
					>
						<div style={{ padding: 24 }}>
							<h4 style={{ margin: '0 0 12px 0' }}>2026 年度核心财务报表摘要 (机密数据)</h4>
							<p style={{ color: '#595959', fontSize: 13, lineHeight: 1.6 }}>
								本区域包含核心经营敏感信息。即便用户尝试打开 F12 控制台在 Styles 面板取消勾选 background-image、删除水印节点、清空内联样式或设置
								display: none 隐藏水印，系统也会在毫秒内瞬间重新注入并重建水印 DOM，防止非法截屏泄密。
							</p>
							{tamperCount > 0 && (
								<div
									style={{
										marginTop: 16,
										padding: '8px 12px',
										background: '#e6f7ff',
										border: '1px solid #91d5ff',
										borderRadius: 6,
										color: '#096dd9',
										fontSize: 12,
									}}
								>
									🛡️ 成功触发了 {tamperCount} 次篡改拦截测试，水印已毫秒级自动还原！
								</div>
							)}
						</div>
					</Watermark>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					💡 支持真实打开浏览器 F12 审查元素，在 Styles 面板无论取消勾选哪个属性（比如 background-image、display、opacity 等），或者在 Elements 面板删除节点，水印都会在毫秒内瞬间原地复活自愈，且绝不会导致页面白屏崩溃。
				</p>
			</div>
		</div>
	);
}
