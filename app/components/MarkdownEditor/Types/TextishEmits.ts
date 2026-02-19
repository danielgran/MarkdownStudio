import type MarkdownModuleTextState from "../Modules/MarkdownModuleTextState";
import type MarkdownAstNodeType from "./MarkdownAstNodeType";

export interface TextishEmits {
  "update:model-value": [componentState: MarkdownModuleTextState];
  "change-type": [newType: MarkdownAstNodeType];
}

export interface TextishEmitFunction {
  (event: "update:model-value", value: MarkdownModuleTextState): void;
  (event: "change-type", value: MarkdownAstNodeType): void;
}
