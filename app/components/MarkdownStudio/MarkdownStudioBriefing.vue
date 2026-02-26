<template>
  <div class="p-6">
    <div>
      <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
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
      <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
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
