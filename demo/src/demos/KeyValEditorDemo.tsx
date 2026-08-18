import { useState } from 'react';
import KeyValEditor, { KeyValItem } from '../../../KeyValEditor';

export default function KeyValEditorDemo() {
	const [items, setItems] = useState<KeyValItem[]>([
		{ key: 'Authorization', value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', enabled: true, isSecret: true },
		{ key: 'Content-Type', value: 'application/json', enabled: true },
		{ key: 'X-Request-Trace-Id', value: 'trace-8848-abcd', enabled: false },
	]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 键值对动态增删配置编辑器（API Headers / 环境变量 / 密码掩码）
				</h3>

				<div style={{ maxWidth: 640 }}>
					<KeyValEditor
						value={items}
						onChange={(val) => setItems(val)}
					/>
				</div>

				<div style={{ marginTop: 16, background: '#fafafa', padding: 12, borderRadius: 6, fontSize: 12 }}>
					<b>实时输出数据：</b>
					<pre style={{ margin: '6px 0 0 0' }}>{JSON.stringify(items, null, 2)}</pre>
				</div>
			</div>
		</div>
	);
}
