<template>
  <div class="bg-white dark:bg-gray-800 border-b border-default px-6 py-4">
    <div class="flex items-start gap-4 max-w-5xl mx-auto">
      <div class="flex-1 flex gap-4">
        <div class="flex-1">
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
        <div class="flex-1">
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
      </div>
      <div class="pt-4">
        <UButton
          label="Analyze"
          icon="i-lucide-sparkles"
          size="sm"
          :loading="isLoading"
          :disabled="!targetAudience || !coreIdea"
          @click="$emit('analyze')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UButton, UInput, } from "#components";

defineProps<{
  targetAudience: string;
  coreIdea: string;
  isLoading: boolean;
}>();

defineEmits<{
  "update:targetAudience": [value: string,];
  "update:coreIdea": [value: string,];
  "analyze": [];
}>();
</script>
