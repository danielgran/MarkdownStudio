export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
  ],

  imports: {
    autoImport: false,
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
    "/imprint": { prerender: true },
    "/editor": { ssr: false },
  },

  compatibilityDate: "2025-01-15",

  typescript: {
    strict: true,
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
