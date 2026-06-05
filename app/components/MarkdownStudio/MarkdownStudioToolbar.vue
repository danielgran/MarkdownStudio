<template>
  <div
    class="h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 flex items-center px-4 gap-2 shadow-sm"
  >
    <UButton
      label="Export"
      icon="i-lucide-download"
      variant="ghost"
      size="sm"
      @click="isExportModalOpen = true"
    />

    <UModal
      v-model:open="isExportModalOpen"
      title="Export Markdown"
    >
      <template #body>
        <textarea
          :value="studioStore.markdownContent"
          readonly
          rows="20"
          class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm text-gray-700 dark:text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-(--color-primary-500)"
        />
      </template>
      <template #footer>
        <UButton
          label="Close"
          @click="isExportModalOpen = false"
        />
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { UButton, UModal } from "#components";
import { ref } from "vue";
import useMarkdownStudioStore from "~/Stores/MarkdownStudioStore/MarkdownStudioStore";

const studioStore = useMarkdownStudioStore()();

const isExportModalOpen = ref(false);
</script>
