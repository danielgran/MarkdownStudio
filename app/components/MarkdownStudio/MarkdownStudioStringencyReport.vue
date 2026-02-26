<template>
  <section>
    <h2>Stringency</h2>

    <p v-if="isStringencyLoading">Analyzing stringency...</p>

    <p
      v-else-if="stringencyError"
      class="text-red-500"
    >
      {{ stringencyError }}
    </p>

    <p v-else-if="!stringencyReport">
      Click <strong>Analyze</strong> to evaluate overall stringency and core idea adherence.
    </p>

    <div
      v-else
      class="border p-3 rounded"
    >
      <div class="flex justify-between">
        <span>Overall</span>
        <span :class="scoreColorClass(stringencyReport.score)">{{ stringencyReport.score }}/100</span>
      </div>
      <div class="w-full h-1.5 bg-gray-200 rounded my-2">
        <div
          class="h-1.5 rounded"
          :class="scoreBarClass(stringencyReport.score)"
          :style="{ width: `${stringencyReport.score}%` }"
        />
      </div>
      <p>{{ stringencyReport.recommendation }}</p>
      <p>{{ stringencyReport.suggestion }}</p>
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
