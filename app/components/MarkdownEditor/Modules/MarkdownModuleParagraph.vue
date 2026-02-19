<template>
  <EditorContent
    ref="editorRef"
    :editor="editor"
  />
</template>

<script lang="ts" setup>
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import { ref } from "vue";
import useReflectiveState from "../Composable/useReflectiveState";
import { InlineCodeShortcut, PreventNewline } from "../TipTap/SingleLineExtension";
import type { TextishEmits } from "../Types/TextishEmits";
import type MarkdownModuleTextState from "./MarkdownModuleTextState";

const modelValue = defineModel<MarkdownModuleTextState>({
  required: true,
});

const editorRef = ref<InstanceType<typeof EditorContent>>();

const emit = defineEmits<TextishEmits>();

const state = useReflectiveState({
  modelRef: modelValue,
  emit,
  editorRef,
});

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: false,
      codeBlock: false,
      blockquote: false,
      horizontalRule: false,
      hardBreak: false,
    }),
    PreventNewline,
    InlineCodeShortcut,
  ],
  content: state.editorContent.value,
  onUpdate: ({ editor }) => {
    state.handleInput(editor.getHTML());
  },
});

defineExpose(state.expose);
</script>

<style lang="scss" scoped>
@use "../Styles/Mixins.scss" as *;
@include reset-contenteditable;
</style>
