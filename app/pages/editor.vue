<template>
  <main class="flex flex-col min-h-screen">
    <MarkdownStudio />
  </main>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  layout: "editor",
});
</script>
