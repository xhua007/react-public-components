import { useState } from 'react';
import KeyValEditor, { KeyValItem } from '../../../KeyValEditor';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function KeyValEditorDemo() {
	const [items, setItems] = useState<KeyValItem[]>([
		{
			key: 'Authorization',
			value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
			enabled: true,
			isSecret: true,
		},
		{ key: 'Content-Type', value: 'application/json', enabled: true },
		{ key: 'X-Request-Trace-Id', value: 'trace-8848-abcd', enabled: false },
	]);

	const usageCode = `import { useState } from 'react';
import { KeyValEditor } from 'react-public-components';

export default function App() {
  const [headers, setHeaders] = useState([
    { key: 'Authorization', value: 'secret-token-xxx', isSecret: true, enabled: true },
    { key: 'Content-Type', value: 'application/json', enabled: true }
  ]);

  return (
    <KeyValEditor
      value={headers}
      onChange={(newHeaders) => setHeaders(newHeaders)}
      allowSecret
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{
			name: 'value',
			desc: '键值对数组（受控），每项含 key, value, enabled, isSecret',
			type: 'KeyValItem[]',
			default: '-',
		},
		{
			name: 'defaultValue',
			desc: '默认键值对数组',
			type: 'KeyValItem[]',
			default: "[{ key: '', value: '', enabled: true }]",
		},
		{
			name: 'onChange',
			desc: '列表数据增删改变化时的回调函数',
			type: '(items: KeyValItem[]) => void',
			default: '-',
		},
		{
			name: 'allowSecret',
			desc: '是否允许配置密码/Token 掩码隐藏显示',
			type: 'boolean',
			default: 'true',
		},
		{ name: 'keyPlaceholder', desc: 'Key 输入框占位文案', type: 'string', default: "'Key 键名'" },
		{
			name: 'valPlaceholder',
			desc: 'Value 输入框占位文案',
			type: 'string',
			default: "'Value 键值'",
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 键值对动态增删配置编辑器（API Headers / 环境变量 / 密码掩码）
				</h3>

				<div style={{ maxWidth: 640 }}>
					<KeyValEditor value={items} onChange={(val) => setItems(val)} />
				</div>

				<div
					style={{
						marginTop: 16,
						background: '#fafafa',
						padding: 12,
						borderRadius: 6,
						fontSize: 12,
					}}
				>
					<b>实时输出数据：</b>
					<pre style={{ margin: '6px 0 0 0' }}>{JSON.stringify(items, null, 2)}</pre>
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
