<script setup lang="ts">
const actions = {
  left: [
    { label: 'Back', icon: 'i-lucide-arrow-left', to: '/' }
  ],
  right: [
    { label: 'Save', icon: 'i-lucide-save', tooltip: 'Save document' },
    { label: 'Load', icon: 'i-lucide-folder-open', tooltip: 'Load document' },
    { label: 'Export', icon: 'i-lucide-download', tooltip: 'Export document' }
  ]
}
</script>

<template>
  <header class="flex items-center justify-between border-b border-default px-4 h-14 shrink-0">
    <div class="flex items-center gap-2">
      <UButton
        v-for="action in actions.left"
        :key="action.label"
        :to="action.to"
        :icon="action.icon"
        :aria-label="action.label"
        color="neutral"
        variant="ghost"
        size="sm"
      />
    </div>

    <span class="text-sm font-medium text-muted">
      Untitled Document
    </span>

    <div class="flex items-center gap-1">
      <UTooltip
        v-for="action in actions.right"
        :key="action.label"
        :text="action.tooltip"
      >
        <UButton
          :icon="action.icon"
          :aria-label="action.label"
          color="neutral"
          variant="ghost"
          size="sm"
        />
      </UTooltip>

      <UColorModeButton />
    </div>
  </header>
</template>
