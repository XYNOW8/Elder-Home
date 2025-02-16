// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///mnt/c/Users/zhang/OneDrive/04_GhostWriting/MonashUniversity/FIT5032-InternetWebApplication/%E7%AC%91%E4%B9%8B-1500-2024-Semester2-A3/Elder-Home/node_modules/vite/dist/node/index.js";
import vue from "file:///mnt/c/Users/zhang/OneDrive/04_GhostWriting/MonashUniversity/FIT5032-InternetWebApplication/%E7%AC%91%E4%B9%8B-1500-2024-Semester2-A3/Elder-Home/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///mnt/c/Users/zhang/OneDrive/04_GhostWriting/MonashUniversity/FIT5032-InternetWebApplication/%E7%AC%91%E4%B9%8B-1500-2024-Semester2-A3/Elder-Home/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///mnt/c/Users/zhang/OneDrive/04_GhostWriting/MonashUniversity/FIT5032-InternetWebApplication/%E7%AC%91%E4%B9%8B-1500-2024-Semester2-A3/Elder-Home/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvemhhbmcvT25lRHJpdmUvMDRfR2hvc3RXcml0aW5nL01vbmFzaFVuaXZlcnNpdHkvRklUNTAzMi1JbnRlcm5ldFdlYkFwcGxpY2F0aW9uL1x1N0IxMVx1NEU0Qi0xNTAwLTIwMjQtU2VtZXN0ZXIyLUEzL0VsZGVyLUhvbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvYy9Vc2Vycy96aGFuZy9PbmVEcml2ZS8wNF9HaG9zdFdyaXRpbmcvTW9uYXNoVW5pdmVyc2l0eS9GSVQ1MDMyLUludGVybmV0V2ViQXBwbGljYXRpb24vXHU3QjExXHU0RTRCLTE1MDAtMjAyNC1TZW1lc3RlcjItQTMvRWxkZXItSG9tZS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2MvVXNlcnMvemhhbmcvT25lRHJpdmUvMDRfR2hvc3RXcml0aW5nL01vbmFzaFVuaXZlcnNpdHkvRklUNTAzMi1JbnRlcm5ldFdlYkFwcGxpY2F0aW9uLyVFNyVBQyU5MSVFNCVCOSU4Qi0xNTAwLTIwMjQtU2VtZXN0ZXIyLUEzL0VsZGVyLUhvbWUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVEZXZUb29scygpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFra0IsU0FBUyxlQUFlLFdBQVc7QUFFcm1CLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUpnVixJQUFNLDJDQUEyQztBQU96WixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
