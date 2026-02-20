<template>
  <aside class="w-64 h-fit bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 overflow-hidden">
    <div class="mb-6">
      <h2 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        Document Outline
      </h2>
      <nav class="space-y-0.5">
        <a href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          Introduction
        </a>
        <a href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          Getting Started
        </a>
        <a href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          Features
        </a>
        <a href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          Examples
        </a>
      </nav>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-700 pt-5 mb-6">
      <h2 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        Recent Documents
      </h2>
      <ul class="space-y-0.5">
        <li class="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
          <span class="text-base">📄</span>
          <span>Welcome.md</span>
        </li>
        <li class="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
          <span class="text-base">📄</span>
          <span>Tutorial.md</span>
        </li>
        <li class="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
          <span class="text-base">📄</span>
          <span>Notes.md</span>
        </li>
      </ul>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-700 pt-5">
      <h2 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        Templates
      </h2>
      <ul class="space-y-0.5">
        <li class="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
          <span class="text-base">📝</span>
          <span>Blog Post</span>
        </li>
        <li class="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
          <span class="text-base">📝</span>
          <span>Meeting Notes</span>
        </li>
        <li class="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
          <span class="text-base">📝</span>
          <span>README</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
