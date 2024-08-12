// vite.config.js
import { sveltekit } from "file:///app/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import fs from "fs";
import path from "path";
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/app";
function customMiddleware() {
  return {
    name: "custom-timeout-middleware",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/test" && req.method === "POST") {
          const filePath = path.resolve(__vite_injected_original_dirname, "test.json");
          const data = fs.readFileSync(filePath, "utf8");
          res.setHeader("Content-Type", "application/json");
          res.end(data);
        } else {
          next();
        }
      });
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [sveltekit(), customMiddleware()],
  server: {
    host: true,
    port: 3e3,
    fs: {
      allow: [".."]
      // プロジェクトのルートディレクトリを許可
    },
    proxy: {
      "/dify": {
        target: "http://localhost",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/dify/, "")
      },
      "/backend": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/backend/, "")
      }
    }
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcblxyXG4vLyBWaXRlXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHU0RjVDXHU2MjEwXHUzMDU3XHUzMDY2XHUzMEFCXHUzMEI5XHUzMEJGXHUzMEUwXHUzMERGXHUzMEM5XHUzMEVCXHUzMEE2XHUzMEE3XHUzMEEyXHUzMDkyXHU4RkZEXHU1MkEwXHJcbmZ1bmN0aW9uIGN1c3RvbU1pZGRsZXdhcmUoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdG5hbWU6ICdjdXN0b20tdGltZW91dC1taWRkbGV3YXJlJyxcclxuXHRcdGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcclxuXHRcdFx0c2VydmVyLm1pZGRsZXdhcmVzLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcclxuXHRcdFx0XHQvLyBcdTMwRUFcdTMwQUZcdTMwQThcdTMwQjlcdTMwQzhcdTMwRDFcdTMwQjlcdTMwNEMgL2FwaS90ZXN0IFx1MzA2RVx1NTgzNFx1NTQwOFx1MzAwMXRlc3QuanNvbiBcdTMwNkVcdTUxODVcdTVCQjlcdTMwOTJcdThGRDRcdTMwNTlcclxuXHRcdFx0XHRpZiAocmVxLnVybCA9PT0gJy9hcGkvdGVzdCcgJiYgcmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XHJcblx0XHRcdFx0XHRjb25zdCBmaWxlUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICd0ZXN0Lmpzb24nKTtcclxuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XHJcblx0XHRcdFx0XHRyZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdFx0XHRcdFx0cmVzLmVuZChkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bmV4dCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRwbHVnaW5zOiBbc3ZlbHRla2l0KCksIGN1c3RvbU1pZGRsZXdhcmUoKV0sXHJcblx0c2VydmVyOiB7XHJcblx0XHRob3N0OiB0cnVlLFxyXG5cdFx0cG9ydDogMzAwMCxcclxuXHRcdGZzOiB7XHJcblx0XHRcdGFsbG93OiBbJy4uJ10gLy8gXHUzMEQ3XHUzMEVEXHUzMEI4XHUzMEE3XHUzMEFGXHUzMEM4XHUzMDZFXHUzMEVCXHUzMEZDXHUzMEM4XHUzMEM3XHUzMEEzXHUzMEVDXHUzMEFGXHUzMEM4XHUzMEVBXHUzMDkyXHU4QTMxXHU1M0VGXHJcblx0XHR9LFxyXG5cdFx0cHJveHk6IHtcclxuXHRcdFx0Jy9kaWZ5Jzoge1xyXG5cdFx0XHRcdHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3QnLFxyXG5cdFx0XHRcdGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuXHRcdFx0XHRyZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvZGlmeS8sICcnKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQnL2JhY2tlbmQnOiB7XHJcblx0XHRcdFx0dGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcclxuXHRcdFx0XHRjaGFuZ2VPcmlnaW46IHRydWUsXHJcblx0XHRcdFx0cmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2JhY2tlbmQvLCAnJylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0dGVzdDoge1xyXG5cdFx0aW5jbHVkZTogWydzcmMvKiovKi57dGVzdCxzcGVjfS57anMsdHN9J11cclxuXHR9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThMLFNBQVMsaUJBQWlCO0FBQ3hOLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUg3QixJQUFNLG1DQUFtQztBQU16QyxTQUFTLG1CQUFtQjtBQUMzQixTQUFPO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixnQkFBZ0IsUUFBUTtBQUN2QixhQUFPLFlBQVksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTO0FBRTFDLFlBQUksSUFBSSxRQUFRLGVBQWUsSUFBSSxXQUFXLFFBQVE7QUFDckQsZ0JBQU0sV0FBVyxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUNwRCxnQkFBTSxPQUFPLEdBQUcsYUFBYSxVQUFVLE1BQU07QUFDN0MsY0FBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsY0FBSSxJQUFJLElBQUk7QUFBQSxRQUNiLE9BQU87QUFDTixlQUFLO0FBQUEsUUFDTjtBQUFBLE1BQ0QsQ0FBQztBQUFBLElBQ0Y7QUFBQSxFQUNEO0FBQ0Q7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0gsT0FBTyxDQUFDLElBQUk7QUFBQTtBQUFBLElBQ2I7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFdBQVcsRUFBRTtBQUFBLE1BQzlDO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDWCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxjQUFjLEVBQUU7QUFBQSxNQUNqRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDTCxTQUFTLENBQUMsOEJBQThCO0FBQUEsRUFDekM7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
