<script setup lang="ts">
import { definePageMeta } from '#imports'
definePageMeta({
  layout: 'editor'
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <MarkdownStudio />
  </div>
</template>
