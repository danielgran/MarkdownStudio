import { piniaPluginPersistedstate } from "#imports";
import { defineStore } from "pinia";
import type MarkdownStudioStoreState from "./MarkdownStudioStoreState";

export default function useMarkdownStudioStore() {
  return defineStore("MarkdownStudioStore", {
    state: () =>
      ({
        markdownContent: "",
        coreIdea: "",
        targetAudience: "",
      }) satisfies MarkdownStudioStoreState,
    actions: {
      updateMarkdown(content: string) {
        this.markdownContent = content;
      },
      updateCoreIdea(value: string) {
        this.coreIdea = value;
      },
      updateTargetAudience(value: string) {
        this.targetAudience = value;
      },
    },
    persist: {
      storage: piniaPluginPersistedstate.cookies(),
    },
  });
}

