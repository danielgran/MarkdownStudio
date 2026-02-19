import type MarkdownModuleTextState from "../Modules/MarkdownModuleTextState";
import type MarkdownAstNodeType from "./MarkdownAstNodeType";

export interface TextishEmits {
  "update:model-value": [componentState: MarkdownModuleTextState];
  "change-type": [newType: MarkdownAstNodeType];
}
export type TextishEmitFunction = (event: keyof TextishEmits, value: TextishEmits[keyof TextishEmits][0]) => void;
