<template>
  <div class="grid grid-cols-12 gap-6 mx-auto max-w-7xl px-6 py-8">
    <MarkdownStudioToolbar class="col-span-full" />

    <MarkdownStudioBriefing
      class="col-span-full"
      :target-audience="targetAudience"
      :core-idea="coreIdea"
      :is-loading="isLoading"
      @update:target-audience="targetAudience = $event"
      @update:core-idea="coreIdea = $event"
      @analyze="analyzeAllNodes"
    />
    <MarkdownStudioStringencyReport
      v-model:stringency-report="stringencyReport"
      :is-stringency-loading="isStringencyLoading"
      :stringency-error="stringencyError"
      class="col-span-full"
    />

    <MarkdownEditor
      v-model:focused-node="focusedNode"
      :editor="editor"
      class="col-span-8 min-w-2xl max-w-2xl mx-auto"
    />

    <MarkdownStudioSidebar class="col-span-4">
      <MarkdownStudioParagraphReport
        v-model="selectedReports"
        :is-loading="isLoading"
        :error="errorMessage"
      />
    </MarkdownStudioSidebar>
  </div>

  <details class="mx-auto max-w-7xl px-6 pb-8">
    <summary class="cursor-pointer text-xs font-medium text-gray-400 dark:text-gray-500 select-none hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
      Debug Information
    </summary>
    <div class="mt-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 text-xs font-mono text-gray-500 dark:text-gray-400 overflow-auto max-h-64">
      <p class="mb-2"><span class="font-semibold">focusedNode:</span> {{ focusedNode }}</p>
      <pre>{{ JSON.stringify(editor.markdownNodes.value, null, 2) }}</pre>
    </div>
  </details>
</template>

<script setup lang="ts">
import type { MarkdownAstNode } from "@grandaniel/vue-markdown-editor";
import { MarkdownEditor, isTextNodeState, useMarkdownEditor } from "@grandaniel/vue-markdown-editor";
import { watchDebounced } from "@vueuse/core";
import { computed, ref } from "vue";
import { useMarkdownStudioService } from "~/ApiServices/MarkdownStudioService";
import useMarkdownStudioStore from "~/Stores/MarkdownStudioStore/MarkdownStudioStore";
import { MarkdownEditorAstNodeTypeMapping } from "./MarkdownEditorAstNodeTypeMapping";
import MarkdownStudioBriefing from "./MarkdownStudioBriefing.vue";
import MarkdownStudioSidebar from "./MarkdownStudioSidebar.vue";
import MarkdownStudioToolbar from "./MarkdownStudioToolbar.vue";
import type TextishParagraphReport from "./Types/TextishParagraphReport";
import templateContent from "./template.txt?raw";

const template = templateContent;

const studioStore = useMarkdownStudioStore()();
const markdownStudioService = useMarkdownStudioService();
const editor = useMarkdownEditor(template);

const targetAudience = computed({
  get: () => studioStore.targetAudience,
  set: (value: string) => {
    studioStore.targetAudience = value;
  },
});
const coreIdea = computed({
  get: () => studioStore.coreIdea,
  set: (value: string) => {
    studioStore.coreIdea = value;
  },
});
const reportsMap = ref<Map<symbol, TextishParagraphReport>>(new Map());
const pendingRequests = ref(0);
const errorMessage = ref("");
const stringencyReport = ref<TextishParagraphReport | null>(null);
const isStringencyLoading = ref(false);
const stringencyError = ref("");
const focusedNode = ref<MarkdownAstNode | null>(null);
const isLoading = computed(() => pendingRequests.value > 0);

const selectedParagraphReport = computed(() => {
  const selectedNode = focusedNode.value;
  if (!selectedNode) return null;
  return reportsMap.value.get(selectedNode.id) ?? null;
});

const selectedReports = computed(() => {
  const report = selectedParagraphReport.value;
  return report ? [report] : [];
});

// Snapshot for detecting which node text changed between debounce ticks
const nodeTextSnapshot = new Map<symbol, string>();

function getNodeText(node: MarkdownAstNode): string | null {
  return isTextNodeState(node) ? node.componentState.text : null;
}

watchDebounced(
  editor.markdownNodes,
  (nodes: MarkdownAstNode[]) => {
    const changedNodes: MarkdownAstNode[] = [];

    for (const node of nodes) {
      const text = getNodeText(node);
      if (text === null) continue;

      const previousText = nodeTextSnapshot.get(node.id);
      if (previousText !== text) {
        changedNodes.push(node);
      }
      nodeTextSnapshot.set(node.id, text);
    }

    // Remove reports and snapshot entries for deleted nodes
    const currentIds = new Set(nodes.map((n: MarkdownAstNode) => n.id));
    for (const id of nodeTextSnapshot.keys()) {
      if (!currentIds.has(id)) {
        nodeTextSnapshot.delete(id);
        const updated = new Map(reportsMap.value);
        updated.delete(id);
        reportsMap.value = updated;
      }
    }

    if (changedNodes) analyzeStringency();

    for (const node of changedNodes) {
      analyzeNode(node);
    }
  },
  { debounce: 1000, deep: true },
);

async function analyzeNode(node: MarkdownAstNode) {
  if (!targetAudience.value || !coreIdea.value) return;
  if (!isTextNodeState(node)) return;

  const text = node.componentState.text.trim();
  if (!text) return;

  pendingRequests.value++;
  errorMessage.value = "";

  try {
    const result = await markdownStudioService.analyze({
      targetAudience: targetAudience.value,
      coreIdea: coreIdea.value,
      paragraph: text,
      moduleType: MarkdownEditorAstNodeTypeMapping[node.type],
    });

    reportsMap.value = new Map(reportsMap.value).set(node.id, result);
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : "Analysis failed";
  } finally {
    pendingRequests.value--;
  }
}

async function analyzeAllNodes() {
  const nodes: MarkdownAstNode[] = editor.markdownNodes.value;
  for (const node of nodes) {
    analyzeNode(node);
  }
  analyzeStringency();
}

async function analyzeStringency() {
  if (!targetAudience.value || !coreIdea.value) return;

  const nodes: MarkdownAstNode[] = editor.markdownNodes.value;
  const fullText = nodes
    .map((node) => (isTextNodeState(node) ? node.componentState.text.trim() : ""))
    .filter((t) => t.length > 0)
    .join("\n\n");

  if (!fullText) return;

  isStringencyLoading.value = true;
  stringencyError.value = "";

  try {
    const result = await markdownStudioService.analyzeStringency({
      targetAudience: targetAudience.value,
      coreIdea: coreIdea.value,
      fullText,
    });

    stringencyReport.value = result;
  } catch (error: unknown) {
    stringencyError.value = error instanceof Error ? error.message : "Stringency analysis failed";
  } finally {
    isStringencyLoading.value = false;
  }
}
</script>
