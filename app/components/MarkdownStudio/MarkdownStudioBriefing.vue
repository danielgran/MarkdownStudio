<template>
  <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5 shadow-sm">
    <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
      <UIcon
        name="i-lucide-target"
        class="w-4 h-4 text-gray-400"
      />
      Briefing
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
          Target Audience
        </label>
        <UInput
          :model-value="targetAudience"
          placeholder="e.g. Minecraft server admins, beginners..."
          size="sm"
          class="w-full"
          @update:model-value="$emit('update:targetAudience', $event)"
        />
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
          Core Idea
        </label>
        <UInput
          :model-value="coreIdea"
          placeholder="e.g. Guide readers to choose the right server specs..."
          size="sm"
          class="w-full"
          @update:model-value="$emit('update:coreIdea', $event)"
        />
      </div>
    </div>
    <UButton
      label="Analyze"
      icon="i-lucide-sparkles"
      size="sm"
      :loading="isLoading"
      :disabled="!targetAudience || !coreIdea"
      @click="$emit('analyze')"
    />
  </div>
</template>

<script setup lang="ts">
import { UButton, UInput } from "#components";

defineProps<{
  targetAudience: string;
  coreIdea: string;
  isLoading: boolean;
}>();

defineEmits<{
  "update:targetAudience": [value: string];
  "update:coreIdea": [value: string];
  "analyze": [];
}>();
</script>
