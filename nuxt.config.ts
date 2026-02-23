export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],

  imports: {
    autoImport: false,
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY,
    llmProvider: "openai",
  },

  routeRules: {
    "/": { prerender: true },
    "/imprint": { prerender: true },
    "/editor": { ssr: false },
  },

  compatibilityDate: "2025-01-15",

  nitro: {
    imports: {
      autoImport: true,
    },
    rollupConfig: {
      output: {
        hoistTransitiveImports: false,
      },
    },
  },

  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        strictPropertyInitialization: false,
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        commaDangle: "always-multiline",
        semi: true,
        braceStyle: "1tbs",
        quoteProps: "consistent-as-needed",
      },
    },
  },
});
