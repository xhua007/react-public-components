import { defineConfig } from 'tsup';
import { lessLoader } from 'esbuild-plugin-less';
import fs from 'node:fs';
import path from 'node:path';

// 获取所有独立的组件目录入口
const ignoredDirs = new Set([
	'demo',
	'node_modules',
	'dist',
	'src',
	'images',
	'.agents',
	'.vscode',
	'.git',
]);

const componentDirs = fs
	.readdirSync(__dirname, { withFileTypes: true })
	.filter((dirent) => {
		if (!dirent.isDirectory() || ignoredDirs.has(dirent.name) || dirent.name.startsWith('.')) {
			return false;
		}
		return (
			fs.existsSync(path.join(__dirname, dirent.name, 'index.tsx')) ||
			fs.existsSync(path.join(__dirname, dirent.name, 'index.ts'))
		);
	})
	.map((dirent) => dirent.name);

const entry: Record<string, string> = {
	index: 'src/index.ts',
};

componentDirs.forEach((name) => {
	const entryPath = fs.existsSync(path.join(__dirname, name, 'index.tsx'))
		? `${name}/index.tsx`
		: `${name}/index.ts`;
	entry[`${name}/index`] = entryPath;
});

export default defineConfig({
	entry,
	format: ['esm', 'cjs'],
	dts: false,
	splitting: true,
	treeshake: true,
	sourcemap: true,
	clean: true,
	external: ['react', 'react-dom'],
	esbuildPlugins: [lessLoader()],
	esbuildOptions(opts) {
		opts.loader = {
			...opts.loader,
			'.png': 'dataurl',
			'.jpg': 'dataurl',
			'.jpeg': 'dataurl',
			'.svg': 'dataurl',
		};
	},
});
