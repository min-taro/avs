import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true,
		port: 3000,
		fs: {
			allow: ['..'] // プロジェクトのルートディレクトリを許可
		},
		proxy: {
			'/dify': {
				target: 'http://host.docker.internal',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/dify/, ''),
			},
			'/backend': {
				target: 'http://backend:8000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/backend/, ''),
			}
		}
	}
});
