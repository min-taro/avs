import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

// Viteプラグインを作成してカスタムミドルウェアを追加
function customMiddleware() {
	return {
		name: 'custom-timeout-middleware',
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				// リクエストパスが /api/test の場合、test.json の内容を返す
				if (req.url === '/api/test' && req.method === 'POST') {
					const filePath = path.resolve(__dirname, 'test.json');
					const data = fs.readFileSync(filePath, 'utf8');
					res.setHeader('Content-Type', 'application/json');
					res.end(data);
				} else {
					next();
				}
			});
		}
	};
}

export default defineConfig({
	plugins: [sveltekit(), customMiddleware()],
	server: {
		host: true,
		port: 3000,
		fs: {
			allow: ['..'] // プロジェクトのルートディレクトリを許可
		},
		proxy: {
			'/dify': {
				target: 'http://localhost',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/dify/, '')
			},
			'/backend': {
				target: 'http://backend:8000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/backend/, '')
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
