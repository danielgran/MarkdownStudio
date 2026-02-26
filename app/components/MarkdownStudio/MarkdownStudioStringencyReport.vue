<template>
  <section class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5 shadow-sm">
    <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
      <UIcon
        name="i-lucide-shield-check"
        class="w-4 h-4 text-gray-400"
      />
      Stringency
    </h2>

    <div
      v-if="isStringencyLoading"
      class="flex items-center gap-2 py-3"
    >
      <UIcon
        name="i-lucide-loader"
        class="w-4 h-4 text-gray-400 animate-spin"
      />
      <span class="text-sm text-gray-500 dark:text-gray-400">Analyzing stringency...</span>
    </div>

    <div
      v-else-if="stringencyError"
      class="rounded-lg bg-red-50 dark:bg-red-900/20 p-3"
    >
      <div class="flex items-start gap-2">
        <UIcon
          name="i-lucide-alert-circle"
          class="w-4 h-4 text-red-500 mt-0.5 shrink-0"
        />
        <p class="text-sm text-red-700 dark:text-red-300">
          {{ stringencyError }}
        </p>
      </div>
    </div>

    <p
      v-else-if="!stringencyReport"
      class="text-sm text-gray-400 dark:text-gray-500 py-2"
    >
      Click <strong class="text-gray-500 dark:text-gray-400">Analyze</strong> to evaluate overall stringency and core idea adherence.
    </p>

    <div v-else>
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">Overall Score</span>
        <span
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
          :class="scoreColorClass(stringencyReport.score)"
        >
          {{ stringencyReport.score }}/100
        </span>
      </div>
      <div class="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
        <div
          class="h-1.5 rounded-full transition-all duration-300"
          :class="scoreBarClass(stringencyReport.score)"
          :style="{ width: `${stringencyReport.score}%` }"
        />
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-1">
        {{ stringencyReport.recommendation }}
      </p>
      <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
        {{ stringencyReport.suggestion }}
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import useReportColors from "./Composables/useReportColors";
import type TextishParagraphReport from "./Types/TextishParagraphReport";

defineProps<{
  isStringencyLoading: boolean;
  stringencyError: string | null;
}>();

const stringencyReport = defineModel<TextishParagraphReport | null>("stringencyReport", { default: null });

const { scoreColorClass, scoreBarClass } = useReportColors();
</script>
