import DisabledBox from '../../../DisabledBox';

export default function DisabledBoxDemo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>9. DisabledBox 禁用遮罩</h3>
				<DisabledBox disabled={true}>
					<p style={{ margin: 0, padding: 16, background: '#fafafa', borderRadius: 8 }}>
						这里是受保护的内容。呈现透明禁用状态，点击无法触发内部交互。
					</p>
				</DisabledBox>
			</div>
		</div>
	);
}
