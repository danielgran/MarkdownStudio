import { defineVitestProject } from "@nuxt/test-utils/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [vue()],
        resolve: {
          alias: {
            "~": fileURLToPath(new URL("./src", import.meta.url)),
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "#imports": fileURLToPath(new URL("./.nuxt/nuxt.d.ts", import.meta.url)),
            "#app": fileURLToPath(new URL("./.nuxt", import.meta.url)),
          },
        },
        test: {
          name: "vue",
          include: ["**/*.test.ts"],
          environment: "happy-dom",
        },
      },
    ],
  },
});
