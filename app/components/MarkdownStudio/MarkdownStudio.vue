<template>
  <div class="flex-1 flex flex-col">
    <MarkdownStudioBriefing
      :target-audience="targetAudience"
      :core-idea="coreIdea"
      :is-loading="isLoading"
      @update:target-audience="targetAudience = $event"
      @update:core-idea="coreIdea = $event"
      @analyze="analyzeAllNodes"
    />
    <MarkdownStudioToolbar />
    <div class="flex-1 flex gap-4">
      <div class="flex-1 flex justify-center py-12 px-4">
        <MarkdownEditor
          :editor="editor"
          class="w-full max-w-3xl border border-default rounded-lg shadow-sm"
        />
      </div>
      <div class="py-6 pr-6">
        <MarkdownStudioSidebar
          :reports="paragraphReports"
          :is-loading="isLoading"
          :error="errorMessage"
          :stringency-report="stringencyReport"
          :is-stringency-loading="isStringencyLoading"
          :stringency-error="stringencyError"
        />
      </div>
    </div>
    <div>
      <div>
        Debug Information
      </div>
      <code>
        {{ JSON.stringify(editor.markdownNodes.value, null, 2) }}
      </code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
import { computed, onBeforeMount, ref } from "vue";
import { useMarkdownStudioService } from "~/ApiServices/MarkdownStudioService";
import useMarkdownStudioStore from "~/Stores/MarkdownStudioStore/MarkdownStudioStore";
import { useMarkdownEditor } from "../MarkdownEditor/Composable/useMarkdownEditor";
import { isTextNodeState } from "../MarkdownEditor/MarkdownComponentRegistry";
import MarkdownEditor from "../MarkdownEditor/MarkdownEditor.vue";
import type { MarkdownAstNode } from "../MarkdownEditor/Types/MarkdownAstNode";
import { MarkdownEditorAstNodeTypeMapping } from "./MarkdownEditorAstNodeTypeMapping";
import MarkdownStudioBriefing from "./MarkdownStudioBriefing.vue";
import MarkdownStudioSidebar from "./MarkdownStudioSidebar.vue";
import MarkdownStudioToolbar from "./MarkdownStudioToolbar.vue";
import TextishParagraphReport from "./Types/TextishParagraphReport";

const template = `
## Warum Serveranforderungen wichtig sind


Minecraft ist stark von der CPU-Leistung abhängig, insbesondere von der Single-Core-Geschwindigkeit. Der Server berechnet ständig World-Ticks, Spieleraktionen und Chunk-Updates. Der RAM-Verbrauch wächst mit der Weltgröße, der Spielerzahl, Redstone-Konstruktionen, Farmen und Plugins. Die Wahl der richtigen Ressourcen sorgt für stabiles Gameplay ohne Lags.


## Grundanforderungen für einen Minecraft-Server (Java Edition)
Ein aktueller Minecraft-Server (Version 1.21.7) benötigt:


- Java 17 oder höher (ältere Versionen benötigten Java 8–16, moderne Server laufen ab Version 17)
- Mindestens 1 GB RAM für den Server
- Zusätzlicher RAM für das Betriebssystem bei lokalem Hosting
- Eine CPU mit starker Single-Core-Leistung
- Speicherplatz für Weltdateien (150–200 MB für eine neue Welt, mehr bei Wachstum)


Minecraft nutzt bis zu drei Kerne für die Kernmechaniken. Zusätzliche Plugins können weitere Kerne verwenden, aber das World-Ticking bleibt größtenteils single-threaded.


## Empfohlene Hardware nach Servertyp


### LAN-Party-Server (kleiner lokaler Server)
Ideal für temporäre Spielsessions oder kleine private Gruppen.


**Minimum (1–4 Spieler)**
- CPU: Intel Core 2 Duo / AMD Athlon 64 X2
- RAM: 1 GB
- Speicher: 150 MB für die Welt


**Empfohlen (5–10 Spieler)**
- CPU: Intel Core 2 Duo / AMD Athlon 64 X2
- RAM: 2 GB
- Speicher: 200 MB


**Optimal (10+ Spieler)**
- CPU: Intel Core i5-4690 / AMD Ryzen 5 1600
- RAM: 4 GB
- Speicher: 200 MB SSD


Größere Welten, Farmen, Redstone-Maschinen und Mob-Grinder erhöhen die RAM- und CPU-Anforderungen erheblich.


## Was das für heartbeat.systems Hosting bedeutet
heartbeat.systems-Server bieten moderne CPUs und flexible RAM-Zuteilung, wodurch sie sich ideal eignen für:


- Vanilla-SMP-Server
- Modded-Server
- Plugin-basierte Server (Paper, Purpur, Spigot usw.)
- Langfristige Weltprojekte mit hoher Spieleraktivität


Mit schnellem SSD-Speicher und starken Single-Core-CPUs ist die Plattform bestens für leistungsintensive Minecraft-Workloads geeignet.


## Fazit
Einen Minecraft-Server zu betreiben muss nicht kompliziert sein. Mit der richtigen CPU, ausreichend RAM und solidem Hosting von heartbeat.systems genießen Ihre Spieler ein flüssiges und zuverlässiges Spielerlebnis. Dieser Leitfaden bietet einen einfachen Einstieg, um die passenden Ressourcen zu wählen und Leistungsprobleme zu vermeiden.`;

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

const isLoading = computed(() => pendingRequests.value > 0);

onBeforeMount(() => { });

const paragraphReports = computed(() => {
  return editor.markdownNodes.value
    .map((node: MarkdownAstNode) => reportsMap.value.get(node.id))
    .filter((r): r is TextishParagraphReport => r !== undefined);
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

    // Remove reports for deleted nodes
    const currentIds = new Set(nodes.map((n: MarkdownAstNode) => n.id));
    for (const id of nodeTextSnapshot.keys()) {
      if (!currentIds.has(id)) {
        nodeTextSnapshot.delete(id);
        const updated = new Map(reportsMap.value);
        updated.delete(id);
        reportsMap.value = updated;
      }
    }

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

    reportsMap.value = new Map(reportsMap.value).set(
      node.id,
      new TextishParagraphReport({
        score: result.score,
        recommendation: result.recommendation,
        suggestion: result.suggestion,
      }),
    );
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

    stringencyReport.value = new TextishParagraphReport({
      score: result.score,
      recommendation: result.recommendation,
      suggestion: result.suggestion,
    });
  } catch (error: unknown) {
    stringencyError.value = error instanceof Error ? error.message : "Stringency analysis failed";
  } finally {
    isStringencyLoading.value = false;
  }
}
</script>
