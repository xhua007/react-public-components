import DiffTable from '../../../DiffTable';

export default function DiffTableDemo() {
	const baseData = [
		{ id: '1', product: '企业版 SaaS 年费订阅', revenue: 120000, orders: 40 },
		{ id: '2', product: 'GPU 算力专属充值卡', revenue: 85000, orders: 90 },
		{ id: '3', product: '私有化部署技术咨询', revenue: 60000, orders: 15 },
	];

	const currentData = [
		{ id: '1', product: '企业版 SaaS 年费订阅', revenue: 145000, orders: 48 },
		{ id: '2', product: 'GPU 算力专属充值卡', revenue: 72000, orders: 82 },
		{ id: '3', product: '私有化部署技术咨询', revenue: 60000, orders: 15 },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 两期数据差异对比表格（自动计算变动差值与红绿百分比高亮）
				</h3>

				<div style={{ maxWidth: 680 }}>
					<DiffTable
						baseData={baseData}
						currentData={currentData}
						columns={[
							{ key: 'product', title: '产品名称' },
							{ key: 'revenue', title: '营收收入 (¥)', isNumeric: true },
							{ key: 'orders', title: '成交订单数', isNumeric: true },
						]}
					/>
				</div>
			</div>
		</div>
	);
}
