import { useState } from 'react';
import ContextMenu, { ContextMenuItem } from '../../../ContextMenu';
import {
	CopyOutlined,
	EditOutlined,
	DeleteOutlined,
	ShareAltOutlined,
} from '../../../src/icons';

export default function ContextMenuDemo() {
	const [lastAction, setLastAction] = useState<string>('暂无操作');

	// 基础菜单项配置
	const menuItems: ContextMenuItem[] = [
		{
			key: 'edit',
			label: '编辑项目',
			icon: <EditOutlined />,
			shortcut: '⌘ E',
			onClick: () => setLastAction('点击了【编辑项目】'),
		},
		{
			key: 'copy',
			label: '复制内容',
			icon: <CopyOutlined />,
			shortcut: '⌘ C',
			onClick: () => setLastAction('点击了【复制内容】'),
		},
		{
			key: 'share',
			label: '分享至...',
			icon: <ShareAltOutlined />,
			children: [
				{
					key: 'wechat',
					label: '微信好友 / 朋友圈',
					onClick: () => setLastAction('点击了【分享 -> 微信】'),
				},
				{
					key: 'dingtalk',
					label: '钉钉群组',
					onClick: () => setLastAction('点击了【分享 -> 钉钉】'),
				},
				{
					key: 'email',
					label: '邮件发送',
					shortcut: '⌘ M',
					onClick: () => setLastAction('点击了【分享 -> 邮件】'),
				},
			],
		},
		{
			key: 'div-1',
			type: 'divider',
		},
		{
			key: 'lock',
			label: '锁定图层 (已禁用)',
			disabled: true,
		},
		{
			key: 'delete',
			label: '删除此资源',
			icon: <DeleteOutlined />,
			danger: true,
			shortcut: '⌫',
			onClick: () => setLastAction('点击了【删除此资源】⚠️'),
		},
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			{/* 1. 基础右键菜单 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>1. 基础右键区域（包含图标、快捷键与二级子菜单）</h3>
				<div style={{ maxWidth: 600 }}>
					<ContextMenu items={menuItems}>
						<div
							style={{
								height: 180,
								background: 'linear-gradient(135deg, #f0f5ff 0%, #e6f4ff 100%)',
								border: '2px dashed #91caff',
								borderRadius: 12,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 8,
								cursor: 'context-menu',
							}}
						>
							<div style={{ fontSize: 16, fontWeight: 600, color: '#0958d9' }}>
								在此卡片区域内点击鼠标右键 (Right Click)
							</div>
							<div style={{ fontSize: 13, color: '#595959' }}>
								支持视口防溢出自动对齐、ESC 退出、二级子菜单展开
							</div>
						</div>
					</ContextMenu>
				</div>
				<div style={{ marginTop: 12, fontSize: 14, color: '#1f1f1f' }}>
					最近执行的右键操作：
					<span
						style={{
							marginLeft: 8,
							padding: '2px 10px',
							background: '#f6ffed',
							border: '1px solid #b7eb8f',
							borderRadius: 4,
							color: '#389e0d',
							fontWeight: 500,
						}}
					>
						{lastAction}
					</span>
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					支持菜单项图标、快捷键提示、分割线（divider）、二级子菜单（children）与危险操作（danger）。
				</p>
			</div>

			{/* 2. 表格/列表行右键 */}
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>2. 表格与文件列表行右键菜单</h3>
				<div
					style={{
						border: '1px solid #f0f0f0',
						borderRadius: 8,
						overflow: 'hidden',
						maxWidth: 600,
					}}
				>
					{[
						{ id: 1, name: '项目设计文档_v2.0.pdf', size: '2.4 MB', date: '2026-08-15' },
						{ id: 2, name: '架构图切图包.zip', size: '18.9 MB', date: '2026-08-14' },
						{ id: 3, name: '年度预算明细表.xlsx', size: '540 KB', date: '2026-08-12' },
					].map((file) => (
						<ContextMenu
							key={file.id}
							items={[
								{
									key: 'download',
									label: `下载 ${file.name}`,
									onClick: () => setLastAction(`下载文件: ${file.name}`),
								},
								{
									key: 'rename',
									label: '重命名',
									onClick: () => setLastAction(`重命名文件: ${file.name}`),
								},
								{ key: 'd1', type: 'divider' },
								{
									key: 'del',
									label: '移至回收站',
									danger: true,
									onClick: () => setLastAction(`删除文件: ${file.name}`),
								},
							]}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									padding: '12px 16px',
									borderBottom: '1px solid #f5f5f5',
									background: '#ffffff',
									cursor: 'context-menu',
									transition: 'background 0.2s',
								}}
								onMouseEnter={(e) => (e.currentTarget.style.background = '#fafafa')}
								onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
							>
								<span style={{ fontWeight: 500 }}>📄 {file.name}</span>
								<span style={{ color: '#8c8c8c', fontSize: 13 }}>
									{file.size} · {file.date}
								</span>
							</div>
						</ContextMenu>
					))}
				</div>
				<p style={{ color: '#8c8c8c', fontSize: 13, marginTop: 8 }}>
					可在列表或表格行中无缝包裹使用，精准传递当前行的数据上下文。
				</p>
			</div>
		</div>
	);
}
