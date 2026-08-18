import { useState } from 'react';
import TagInput from '../../../TagInput';

export default function TagInputDemo() {
	const [basicTags, setBasicTags] = useState<string[]>(['React', 'TypeScript', 'Vite']);
	const [emailTags, setEmailTags] = useState<string[]>(['dev@company.com', 'admin@google.com']);
	const [limitedTags, setLimitedTags] = useState<string[]>(['Frontend']);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 基础用法 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 基础标签输入（支持回车/逗号、退格删除、双击编辑）</h3>
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
		</div>
	);
}
