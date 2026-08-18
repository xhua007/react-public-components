import JsonDiffViewer from '../../../JsonDiffViewer';

export default function JsonDiffViewerDemo() {
	const beforeJson = {
		serviceName: 'order-api',
		port: 8080,
		replicas: 3,
		enableCache: false,
		databaseUrl: 'mysql://root:123456@db-master:3306/orders',
		deprecatedField: 'old_legacy_val',
	};

	const afterJson = {
		serviceName: 'order-api',
		port: 8080,
		replicas: 6, // 修改
		enableCache: true, // 修改
		databaseUrl: 'mysql://root:123456@db-master:3306/orders',
		autoScaleMax: 12, // 新增
		// deprecatedField 已删除
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. JSON 对象键值差异比对器（新增绿色 + / 删除红色 - / 修改黄色 ~ 前后值）
				</h3>

				<div style={{ maxWidth: 680 }}>
					<JsonDiffViewer before={beforeJson} after={afterJson} />
				</div>
			</div>
		</div>
	);
}
