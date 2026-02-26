<template>
  <div
    class="h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 flex items-center px-4 gap-2 shadow-sm"
  >
    <UButton
      label="Save"
      icon="i-lucide-save"
      variant="ghost"
      size="sm"
    />
    <UButton
      label="Load"
      icon="i-lucide-folder-open"
      variant="ghost"
      size="sm"
    />
    <UButton
      label="Export"
      icon="i-lucide-download"
      variant="ghost"
      size="sm"
    />
  </div>
</template>

<script lang="ts" setup>
import { UButton } from "#components";
</script>
