import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      insertTypesEntry: true
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    port: 15173,
    host: "0.0.0.0"
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "LeeUI",
      fileName: "index"
    },
    rollupOptions: {
      // 把不想打包进你的包的包排除掉
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        }
      }
    }
  }
})
