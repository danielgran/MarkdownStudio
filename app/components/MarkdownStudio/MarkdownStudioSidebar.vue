<template>
  <aside class="w-72 h-fit bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 overflow-hidden space-y-6">
    <!-- Stringency Section -->
    <section>
      <h2 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Stringency</h2>

      <div
        v-if="isStringencyLoading"
        class="flex flex-col items-center justify-center py-6 gap-3"
      >
        <UIcon
          name="i-lucide-loader"
          class="w-6 h-6 text-blue-500 animate-spin"
        />
        <p class="text-sm text-gray-500 dark:text-gray-400">Analyzing stringency...</p>
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
          <p class="text-sm text-red-700 dark:text-red-300">{{ stringencyError }}</p>
        </div>
      </div>

      <div
        v-else-if="!stringencyReport"
        class="flex flex-col items-center justify-center py-6 gap-2 text-center"
      >
        <UIcon
          name="i-lucide-link"
          class="w-8 h-8 text-gray-300 dark:text-gray-600"
        />
        <p class="text-sm text-gray-400 dark:text-gray-500">
          Click
          <strong>Analyze</strong>
          to evaluate overall stringency and core idea adherence.
        </p>
      </div>

      <div
        v-else
        class="rounded-lg border border-gray-200 dark:border-gray-700 p-3"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">Overall</span>
          <span
            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
            :class="scoreColorClass(stringencyReport.score)"
          >
            {{ stringencyReport.score }}/100
          </span>
        </div>
        <div class="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
          <div
            class="h-1.5 rounded-full transition-all duration-300"
            :class="scoreBarClass(stringencyReport.score)"
            :style="{ width: `${stringencyReport.score}%` }"
          />
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ stringencyReport.recommendation }}
        </p>
        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ stringencyReport.suggestion }}
        </p>
      </div>
    </section>

    <!-- Paragraph Analysis Section -->
    <section>
      <h2 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        Paragraph Analysis
      </h2>

      <!-- Loading state -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-8 gap-3"
      >
        <UIcon
          name="i-lucide-loader"
          class="w-6 h-6 text-blue-500 animate-spin"
        />
        <p class="text-sm text-gray-500 dark:text-gray-400">Analyzing paragraphs...</p>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
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
        v-else-if="reports.length === 0"
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
  </aside>
</template>

<script setup lang="ts">
import { UIcon, } from "#components";
import type TextishParagraphReport from "./Types/TextishParagraphReport";

defineProps<{
  reports: TextishParagraphReport[];
  isLoading: boolean;
  error: string;
  stringencyReport: TextishParagraphReport | null;
  isStringencyLoading: boolean;
  stringencyError: string;
}>();

function scoreColorClass(score: number,): string {
  if (score >= 75) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  if (score >= 50) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
}

function scoreBarClass(score: number,): string {
  if (score >= 75) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
}
</script>
