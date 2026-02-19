<template>
  <div
    ref="divRef"
    class="proto-markdown-module-image text-center"
  >
    <img
      :src="modelValue.src"
      :alt="modelValue.alt"
    />
    <span v-if="modelValue.alt">{{ modelValue.alt }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type MarkdownModuleImageState from "./MarkdownModuleImageState";

const divRef = ref<HTMLDivElement>();

const modelValue = defineModel<MarkdownModuleImageState>({
  required: true,
});

function focus() {
  if (divRef.value) {
    divRef.value.focus();
  }
}

defineExpose({ focus });
</script>

<style lang="scss" scoped>
.proto-markdown-module-image {
  img {
    max-width: 100%;
    height: auto;
  }

  span {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #6b7280;
  }
}
</style>

<style lang="scss" scoped>
@use "../Styles/Mixins.scss" as *;
@include reset-contenteditable;
</style>
