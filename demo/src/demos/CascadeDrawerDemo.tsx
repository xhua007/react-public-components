import { useState } from 'react';
import CascadeDrawer from '../../../CascadeDrawer';

export default function CascadeDrawerDemo() {
	const [open, setOpen] = useState<boolean>(false);

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
						content: (pushLevel: any) => (
							<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
								<div><b>订单编号：</b>ORD-20260816-9988</div>
								<div><b>下单客户：</b>极客科技有限公司</div>
								<div><b>支付状态：</b>已支付 (¥ 12,800)</div>

								<div style={{ marginTop: 16 }}>
									<button
										type="button"
										onClick={() =>
											pushLevel({
												id: 'logistics_level',
												title: '物流子包裹',
												content: (pushSub: any) => (
													<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
														<div><b>顺丰速运：</b>SF1082736489</div>
														<div><b>当前状态：</b>正在派送中</div>

														<button
															type="button"
															onClick={() =>
																pushSub({
																	id: 'node_detail',
																	title: '派送员轨迹节点',
																	content: <div>派送员：张师傅 (13800000000) 正在前往科技园区北门。</div>,
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
		</div>
	);
}
