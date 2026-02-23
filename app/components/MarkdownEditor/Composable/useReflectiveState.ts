import type { EditorContent, } from "@tiptap/vue-3";
import { marked, } from "marked";
import TurndownService from "turndown";
import { ref, type ModelRef, type Ref, } from "vue";
import type MarkdownModuleTextState from "../Modules/MarkdownModuleTextState";
import type { TextishEmitFunction, } from "../Types/TextishEmits";
import { detectHeadlineTypeFromContent, } from "./HeadlineTypeMap";

const turndownService = new TurndownService();
// Override the default escape function to prevent escaping of special characters,
turndownService.escape = (text: string,) => text;

function markdownToHtml(markdown: string,): string {
  return marked.parseInline(markdown,) as string;
}

function htmlToMarkdown(html: string,): string {
  return turndownService.turndown(html,);
}

function useReflectiveState<T extends MarkdownModuleTextState,>(options: {
  modelRef: ModelRef<T>;
  emit: TextishEmitFunction;
  editorRef?: Ref<InstanceType<typeof EditorContent> | undefined>;
  containingHtmlElementRef?: Ref<HTMLElement | undefined>;
},) {
  const editorContent = ref(markdownToHtml(options.modelRef.value.text,),);

  console.log("Initialized editor content:", editorContent.value,);

  function emit(html: string,) {
    const markdown = htmlToMarkdown(html,);
    options.modelRef.value.text = markdown;
    options.emit("update:model-value", { text: markdown, },);
    return;
  }

  function detectInlineTypeChange(markdown: string,) {
    const detectedType = detectHeadlineTypeFromContent(markdown,);
    if (!detectedType) return;

    console.log(`Detected type change to ${detectedType}`,);
    options.emit("change-type", detectedType,);
  }

  function handleInput(html: string,) {
    const markdown = htmlToMarkdown(html,);
    emit(html,);
    detectInlineTypeChange(markdown,);
  }

  function handleKeyDown(event: KeyboardEvent,) {
    if (event.key === "Enter") {
      event.preventDefault();
      return;
    }
  }

  function handleMouseUpOrKeyUp() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      options.emit("update:cursor-position" as never, sel.getRangeAt(0,).startOffset as never,);
    }
  }

  function focus() {
    if (options.editorRef?.value?.editor) {
      options.editorRef.value.editor.commands.focus();
      return;
    }
    options.containingHtmlElementRef?.value?.focus();
  }

  return { handleInput, handleKeyDown, handleMouseUpOrKeyUp, editorContent, expose: { focus, }, };
}

export { markdownToHtml, };
export default useReflectiveState;
