import SegmentedProgress from '../../../SegmentedProgress';
import CodeSnippet from '../../../CodeSnippet';
import { ApiTable, ApiPropItem } from '../components/ApiTable';

export default function SegmentedProgressDemo() {
	const usageCode = `import { SegmentedProgress } from 'react-public-components';

export default function App() {
  return (
    <SegmentedProgress
      total={512}
      height={12}
      segments={[
        { label: '系统与镜像', value: 48, color: '#1677ff', suffix: 'GB' },
        { label: '模型数据', value: 240, color: '#722ed1', suffix: 'GB' },
        { label: '日志文件', value: 96, color: '#fa8c16', suffix: 'GB' },
        { label: '剩余空间', value: 128, color: '#52c41a', suffix: 'GB' },
      ]}
    />
  );
}`;

	const apiData: ApiPropItem[] = [
		{ name: 'segments', desc: '分段数据列表，每项含 label, value, color, suffix', type: 'ProgressSegment[]', required: true },
		{ name: 'total', desc: '总量基准数值（不传时自动对所有分段 value 求和）', type: 'number', default: '各分段求和' },
		{ name: 'height', desc: '进度条高度（像素）', type: 'number', default: '10' },
		{ name: 'showLegend', desc: '是否在进度条下方展示图例 Legend', type: 'boolean', default: 'true' },
		{ name: 'className', desc: '自定义类名', type: 'string', default: '-' },
		{ name: 'style', desc: '自定义行内样式', type: 'CSSProperties', default: '-' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<h3 style={{ fontSize: 16, marginBottom: 12 }}>
					1. 分段式多色比例进度条（存储空间占用 / 任务工时分布 / 悬停详情）
				</h3>

				<div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 24 }}>
					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 8 }}>
							云服务器 NVMe 固态硬盘使用分布 (总计 512 GB)
						</div>
						<SegmentedProgress
							total={512}
							height={12}
							segments={[
								{ label: '系统与内核镜像', value: 48, color: '#1677ff', suffix: 'GB' },
								{ label: 'AI 模型权重权重库', value: 240, color: '#722ed1', suffix: 'GB' },
								{ label: '数据库与日志归档', value: 96, color: '#fa8c16', suffix: 'GB' },
								{ label: '剩余可用空间', value: 128, color: '#52c41a', suffix: 'GB' },
							]}
						/>
					</div>

					<div>
						<div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 8 }}>
							Q3 敏捷迭代工时占比
						</div>
						<SegmentedProgress
							height={10}
							segments={[
								{ label: '前端研发', value: 45, color: '#13c2c2', suffix: '人天' },
								{ label: '后端架构', value: 55, color: '#eb2f96', suffix: '人天' },
								{ label: '测试与验收', value: 20, color: '#faad14', suffix: '人天' },
							]}
						/>
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
