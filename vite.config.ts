import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	root: 'demo',
	plugins: [react()],
	server: {
		port: 5173,
		open: true,
	},
	resolve: {
		alias: {
			'@': new URL('./', import.meta.url).pathname,
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
});
