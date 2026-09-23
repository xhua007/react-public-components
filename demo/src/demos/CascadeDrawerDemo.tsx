import { useState } from 'react';
import CascadeDrawer, { CascadeLevel } from '../../../CascadeDrawer';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function CascadeDrawerDemo() {
	const [open, setOpen] = useState<boolean>(false);

	const usageCode = `import { useState } from 'react';
import { CascadeDrawer } from 'react-public-components';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>打开级联抽屉</button>
      <CascadeDrawer
        open={open}
        onClose={() => setOpen(false)}
        width={480}
        rootLevel={{
          id: 'root',
          title: '订单列表 #ORD-001',
          content: (pushLevel) => (
            <div>
              <p>订单基本信息...</p>
              <button onClick={() => pushLevel({
                id: 'detail',
                title: '物流详情',
                content: <div>正在派送中...</div>
              })}>
                下钻查看物流 ➔
              </button>
            </div>
          )
        }}
      />
    </>
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'open', desc: '是否打开抽屉', type: 'boolean', required: true },
		{ name: 'onClose', desc: '点击遮罩或关闭按钮时的回调', type: '() => void', required: true },
		{
			name: 'rootLevel',
			desc: '初始根层级配置，包含 id, title, content (支持 pushLevel 函数)',
			type: 'CascadeLevel',
			required: true,
		},
		{
			name: 'width',
			desc: '抽屉宽度（像素数字或百分比字符串）',
			type: 'number | string',
			default: '440',
		},
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 多层级下钻级联抽屉容器（面包屑返回导航 + 无限层级推拉）
				</h3>

				<div>
					<button type="button" onClick={() => setOpen(true)}>
						📂 打开订单下钻详情抽屉 (Cascade Drawer)
					</button>
				</div>

				<CascadeDrawer
					open={open}
					onClose={() => setOpen(false)}
					rootLevel={{
						id: 'order_root',
						title: '订单列表 #ORD-20260816',
						content: (pushLevel: (level: CascadeLevel) => void) => (
							<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
								<div>
									<b>订单编号：</b>ORD-20260816-9988
								</div>
								<div>
									<b>下单客户：</b>极客科技有限公司
								</div>
								<div>
									<b>支付状态：</b>已支付 (¥ 12,800)
								</div>

								<div style={{ marginTop: 16 }}>
									<button
										type="button"
										onClick={() =>
											pushLevel({
												id: 'logistics_level',
												title: '物流子包裹',
												content: (pushSub: (level: CascadeLevel) => void) => (
													<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
														<div>
															<b>顺丰速运：</b>SF1082736489
														</div>
														<div>
															<b>当前状态：</b>正在派送中
														</div>

														<button
															type="button"
															onClick={() =>
																pushSub({
																	id: 'node_detail',
																	title: '派送员轨迹节点',
																	content: (
																		<div>派送员：张师傅 (13800000000) 正在前往科技园区北门。</div>
																	),
																})
															}
														>
															查看派送员实时节点 ➔
														</button>
													</div>
												),
											})
										}
									>
										下钻查看物流子包裹 ➔
									</button>
								</div>
							</div>
						),
					}}
				/>
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
