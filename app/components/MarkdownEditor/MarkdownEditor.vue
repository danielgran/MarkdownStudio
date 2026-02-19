<template>
  <div
    class="markdown-editor"
    @click="handleClickBlankArea"
  >
    <MarkdownEditorModule
      v-for="(node, index) in markdownNodes"
      :key="node.id"
      :node="node"
      :focused="focusedNode === node"
      @click.stop
      @delete="deleteNode(index)"
      @add="addBlankNode(index)"
      @keydown="handleKeyDownOnNode(node, $event)"
      @focus="focusedNode = node"
      @update:cursor-position="(pos) => handleUpdateCursorPosition(node, pos)"
      @change-type="handleChangeType"
    />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
import useMarkdownProcessor from "./Composable/useMarkdownProcessor";
import { isTextNodeState as isTextishNode } from "./MarkdownComponentRegistry";
import MarkdownEditorModule from "./MarkdownEditorModule.vue";
import type { MarkdownAstNode } from "./Types/MarkdownAstNode";
import type MarkdownNodeType from "./Types/MarkdownAstNodeType";

const modelValue = defineModel<string>();
const { markdownNodes, deleteNode, addBlankNode, replaceNodeType } = useMarkdownProcessor(modelValue);
const focusedNode = ref<MarkdownAstNode | null>(null);

function handleUpdateCursorPosition(node: MarkdownAstNode, position: number) {
  node.editingState.cursorPosition = position;
}

function handleChangeType(node: MarkdownAstNode, newType: number) {
  const result = replaceNodeType(node, newType as MarkdownNodeType);

  if (result) {
    focusedNode.value = result.newNode;
    nextTick(() => focusNodeByIndex(result.index));
  }
}

function handleKeyDownOnNode(node: MarkdownAstNode, event: KeyboardEvent) {
  const nodeIndex = markdownNodes.value.indexOf(node);

  if (event.key === "Enter") {
    handleEnter(nodeIndex, event);
  } else if (event.key === "Backspace") {
    handleBackspace(nodeIndex);
  } else if (event.key === "ArrowUp") {
    moveFocusOneUp();
    event.preventDefault();
  } else if (event.key === "ArrowDown") {
    moveFocusOneDown();
    event.preventDefault();
  } else if (event.key === "Delete") {
    handleDelete(nodeIndex);
  }
}

function handleEnter(nodeIndex: number, event: KeyboardEvent) {
  addBlankNode(nodeIndex);
  moveFocusOneDown();
  event.preventDefault();
}

function handleBackspace(index: number) {
  const node = getNodeByIndex(index);

  if (!isTextishNode(node)) return;
  if (node.componentState.text !== "") return;

  deleteNode(index);

  nextTick(() => {
    const newIndex = index > 0 ? index - 1 : 0;
    focusNodeByIndex(newIndex);
  });
}

function handleDelete(index: number) {
  const node = getNodeByIndex(index);

  if (!isTextishNode(node)) return;
  if (node.componentState.text !== "") return;

  deleteNode(index);
  focusNodeByIndex(index);
}

function handleClickBlankArea() {
  const lastNode = getNodeByIndex(markdownNodes.value.length - 1);

  if (isTextishNode(lastNode) && lastNode.componentState.text === "") {
    focusedNode.value = lastNode;
    return;
  }

  const newIndex = markdownNodes.value.length > 0 ? markdownNodes.value.length - 1 : 0;

  addBlankNode(newIndex);
  focusNodeByIndex(newIndex);
}

function focusNodeByIndex(index: number) {
  const node = markdownNodes.value[index];
  if (!node) return;
  nextTick(() => {
    focusedNode.value = node;
  });
}

function getNodeByIndex(index: number): MarkdownAstNode {
  const node = markdownNodes.value[index];
  if (!node) throw new Error("Node not found at index " + index);
  return node;
}

function moveFocusOneUp() {
  if (!focusedNode.value) return;

  nextTick(() => {
    const currentNode = focusedNode.value;
    if (!currentNode) return;

    const index = markdownNodes.value.indexOf(currentNode);
    if (index > 0) {
      focusedNode.value = getNodeByIndex(index - 1);
    }
  });
}

function moveFocusOneDown() {
  if (!focusedNode.value) return;

  nextTick(() => {
    const currentNode = focusedNode.value;
    if (!currentNode) return;
    const index = markdownNodes.value.indexOf(currentNode);
    if (index < markdownNodes.value.length - 1) {
      focusedNode.value = getNodeByIndex(index + 1);
    }
  });
}
</script>

<style>
/* Basic global style  */
p {
  margin: 0.5rem 0;
}

strong,
b {
  font-weight: bold;
}

em,
i {
  font-style: italic;
}

code {
  font-family: monospace;
  background: rgba(127, 127, 127, 0.15);
  padding: 0.1em 0.3em;
  border-radius: 3px;
  font-size: 0.9em;
  color: green;
}

h1 {
  font-size: 2em;
  margin: 0;
}

h2 {
  font-size: 1.5em;
  margin: 0;
}

h3 {
  font-size: 1.17em;
  margin: 0;
}

</style>

<style lang="scss" scoped>
</style>
