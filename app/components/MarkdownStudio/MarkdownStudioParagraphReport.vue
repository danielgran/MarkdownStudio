<template>
  <div>
    <section>
      <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <UIcon
          name="i-lucide-file-text"
          class="w-4 h-4 text-gray-400"
        />
        Paragraph Analysis
        <UIcon
          v-if="isLoading"
          name="i-lucide-loader"
          class="w-3.5 h-3.5 text-blue-400 animate-spin ml-auto"
        />
      </h2>

      <!-- Error state -->
      <div
        v-if="error"
        class="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 mb-3"
      >
        <div class="flex items-start gap-2">
          <UIcon
            name="i-lucide-alert-circle"
            class="w-4 h-4 text-red-500 mt-0.5 shrink-0"
          />
          <p class="text-sm text-red-700 dark:text-red-300">
            {{ error }}
          </p>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="!isLoading && reports.length === 0"
        class="flex flex-col items-center justify-center py-8 gap-2 text-center"
      >
        <UIcon
          name="i-lucide-sparkles"
          class="w-8 h-8 text-gray-300 dark:text-gray-600"
        />
        <p class="text-sm text-gray-400 dark:text-gray-500">
          Set a target audience and core idea, then click
          <strong>Analyze</strong>
          to get paragraph feedback.
        </p>
      </div>

      <!-- Reports -->
      <div
        v-else
        class="space-y-3"
      >
        <div
          v-for="(report, index) in reports"
          :key="index"
          class="rounded-lg border border-gray-200 dark:border-gray-700 p-3"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">Paragraph {{ index + 1 }}</span>
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
              :class="scoreColorClass(report.score)"
            >
              {{ report.score }}/100
            </span>
          </div>
          <!-- Score bar -->
          <div class="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
            <div
              class="h-1.5 rounded-full transition-all duration-300"
              :class="scoreBarClass(report.score)"
              :style="{ width: `${report.score}%` }"
            />
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ report.recommendation }}
          </p>
          <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ report.suggestion }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import useReportColors from "./Composables/useReportColors";
import type TextishParagraphReport from "./Types/TextishParagraphReport";

defineProps<{
  isLoading: boolean;
  error: string | null;
}>();

const reports = defineModel<TextishParagraphReport[]>({ default: [] });

const { scoreColorClass, scoreBarClass } = useReportColors();
</script>

<style>

</style>
