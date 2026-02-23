<script setup lang="ts">
const navigation = [
  { label: "Home", to: "/", },
  { label: "Editor", to: "/editor", },
];
</script>

<template>
  <div>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
        >
          <AppLogo />
        </NuxtLink>
      </template>

      <template #default>
        <UNavigationMenu :items="navigation" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">© {{ new Date().getFullYear() }} MarkdownStudio</p>
      </template>

      <template #right>
        <NuxtLink
          to="/imprint"
          class="text-sm text-muted hover:text-highlighted"
        >
          Imprint
        </NuxtLink>
      </template>
    </UFooter>
  </div>
</template>
