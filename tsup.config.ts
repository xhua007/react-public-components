import { defineConfig } from 'tsup';
import { lessLoader } from 'esbuild-plugin-less';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	dts: true,
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
