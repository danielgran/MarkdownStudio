<script setup lang="ts">
definePageMeta({
  layout: 'editor'
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <EditorToolbar />
    <EditorContent />
  </div>
</template>
