import { useState } from 'react';
import TagInput from '../../../TagInput';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function TagInputDemo() {
	const [basicTags, setBasicTags] = useState<string[]>(['React', 'TypeScript', 'Vite']);
	const [emailTags, setEmailTags] = useState<string[]>(['dev@company.com', 'admin@google.com']);
	const [limitedTags, setLimitedTags] = useState<string[]>(['Frontend']);

	const usageCode = `import { useState } from 'react';
import { TagInput } from 'react-public-components';

export default function App() {
  const [tags, setTags] = useState(['React', 'TypeScript']);

  return (
    <TagInput
      value={tags}
      onChange={(newTags) => setTags(newTags)}
      placeholder="输入标签后按回车..."
      maxCount={5}
      validate={(val) => val.length >= 2 ? true : '标签至少2个字符'}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'value', desc: '当前标签字符串数组（受控）', type: 'string[]', default: '-' },
		{ name: 'defaultValue', desc: '默认标签数组', type: 'string[]', default: '[]' },
		{ name: 'onChange', desc: '标签数组改变时的回调函数', type: '(tags: string[]) => void', default: '-' },
		{ name: 'maxCount', desc: '允许添加的最大标签数量上限', type: 'number', default: '-' },
		{ name: 'maxLength', desc: '单个标签的最大字符长度限制', type: 'number', default: '-' },
		{ name: 'allowDuplicates', desc: '是否允许添加重复名称的标签', type: 'boolean', default: 'false' },
		{ name: 'separators', desc: "触发转为标签的按键/字符", type: 'string[]', default: "['Enter', ',', '，']" },
		{ name: 'validate', desc: '自定义校验函数（返回 true 通过，返回 false 或 string 报错）', type: '(tag: string) => boolean | string', default: '-' },
		{ name: 'placeholder', desc: '输入框占位文案', type: 'string', default: "'输入标签后按回车...'" },
		{ name: 'disabled', desc: '是否禁用输入与编辑', type: 'boolean', default: 'false' },
		{ name: 'renderTag', desc: '自定义单个 Tag 的渲染函数', type: '(tag, index, onClose) => ReactNode', default: '-' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 基础用法 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 基础标签输入（支持回车/逗号、退格删除、双击编辑）
				</h3>
				<div style={{ maxWidth: 480 }}>
					<TagInput
						value={basicTags}
						onChange={(tags) => setBasicTags(tags)}
						placeholder="输入技能标签后按回车..."
					/>
				</div>
				<div style={{ marginTop: 8, fontSize: 13, color: '#595959' }}>
					当前标签数组：<code>{JSON.stringify(basicTags)}</code>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					输入文字后按 Enter 或输入逗号即自动转为 Tag；双击已有 Tag 可快速重新编辑。
				</p>
			</div>

			{/* 2. 正则校验模式（如邮箱校验） */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 自定义正则校验（邮箱格式校验）</h3>
				<div style={{ maxWidth: 480 }}>
					<TagInput
						value={emailTags}
						onChange={(tags) => setEmailTags(tags)}
						validate={(val) => {
							const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
							return emailRegex.test(val) ? true : '请输入合法的邮箱地址';
						}}
						placeholder="输入邮箱后回车添加..."
					/>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					通过 `validate` 属性设置校验规则，不合法时自动高亮红色并提示错误原因。
				</p>
			</div>

			{/* 3. 数量限制与禁用态 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>3. 限制最大数量 (maxCount=3) & 禁用状态</h3>
				<div style={{ display: 'flex', gap: 16, maxWidth: 640 }}>
					<div style={{ flex: 1 }}>
						<TagInput
							value={limitedTags}
							onChange={(tags) => setLimitedTags(tags)}
							maxCount={3}
							placeholder="最多添加 3 个标签..."
						/>
					</div>
					<div style={{ flex: 1 }}>
						<TagInput defaultValue={['只读标签 1', '只读标签 2']} disabled />
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
