import MarkdownNodeType from "../Types/MarkdownAstNodeType";

export interface HeadlineTypeEntry {
  prefix: string;
  type: MarkdownNodeType;
  depth: number;
}

export const HEADLINE_TYPE_MAP: HeadlineTypeEntry[] = [
  {
    prefix: "### ",
    type: MarkdownNodeType.HEADLINE3,
    depth: 3,
  },
  {
    prefix: "## ",
    type: MarkdownNodeType.HEADLINE2,
    depth: 2,
  },
  {
    prefix: "# ",
    type: MarkdownNodeType.HEADLINE1,
    depth: 1,
  },
];

export function detectHeadlineTypeFromContent(content: string): MarkdownNodeType | null {
  for (const entry of HEADLINE_TYPE_MAP) {
    if (content.startsWith(entry.prefix)) {
      return entry.type;
    }
  }
  return null;
}

export default HEADLINE_TYPE_MAP;
