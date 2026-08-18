import { useState } from 'react';
import CountdownButton from '../../../CountdownButton';

export default function CountdownButtonDemo() {
	const [phone, setPhone] = useState<string>('13800138000');
	const [log, setLog] = useState<string>('暂未触发');

	const handleSendCode = async () => {
		if (!phone || phone.length !== 11) {
			alert('请输入合法的 11 位手机号码！');
			return false;
		}

		// 模拟网络请求
		await new Promise((resolve) => setTimeout(resolve, 800));
		setLog(`✅ 验证码已成功发送至 ${phone}`);
		return true;
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 短信验证码 60s 倒计时按钮（支持异步前置校验 + 防重刷锁定）
				</h3>

				<div style={{ display: 'flex', gap: 10, alignItems: 'center', maxWidth: 420 }}>
					<input
						type="text"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="请输入手机号"
						style={{
							flex: 1,
							padding: '6px 10px',
							border: '1px solid #d9d9d9',
							borderRadius: 6,
							outline: 'none',
							fontSize: 13,
						}}
					/>

					<CountdownButton
						seconds={60}
						onBeforeStart={handleSendCode}
					/>
				</div>

				<div style={{ marginTop: 12, fontSize: 13, color: '#595959' }}>
					操作日志：<b style={{ color: '#1677ff' }}>{log}</b>
				</div>
			</div>
		</div>
	);
}
