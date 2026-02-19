enum MarkdownNodeType {
  PARAGRAPH,
  HEADLINE1,
  HEADLINE2,
  HEADLINE3,
  IMAGE,
}

export type TextishNodeType =
  | MarkdownNodeType.PARAGRAPH
  | MarkdownNodeType.HEADLINE1
  | MarkdownNodeType.HEADLINE2
  | MarkdownNodeType.HEADLINE3;

export function isTextNodeType(type: MarkdownNodeType): boolean {
  return (
    type === MarkdownNodeType.PARAGRAPH ||
    type === MarkdownNodeType.HEADLINE1 ||
    type === MarkdownNodeType.HEADLINE2 ||
    type === MarkdownNodeType.HEADLINE3
  );
}

export default MarkdownNodeType;
