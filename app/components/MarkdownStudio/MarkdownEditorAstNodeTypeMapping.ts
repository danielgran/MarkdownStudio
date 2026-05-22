import { MarkdownAstNodeType } from "@grandaniel/vue-markdown-editor";

export const MarkdownEditorAstNodeTypeMapping: Record<MarkdownAstNodeType, string> = {
  [MarkdownAstNodeType.PARAGRAPH]: "Paragraph",
  [MarkdownAstNodeType.HEADLINE1]: "Headline 1",
  [MarkdownAstNodeType.HEADLINE2]: "Headline 2",
  [MarkdownAstNodeType.HEADLINE3]: "Headline 3",
  [MarkdownAstNodeType.IMAGE]: "Image",
  [MarkdownAstNodeType.LIST]: "List",
};
