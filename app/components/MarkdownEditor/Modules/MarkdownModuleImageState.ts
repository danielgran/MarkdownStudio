export default class MarkdownModuleImageState {
  [key: string]: unknown;
  src: string;
  alt: string;
  caption: string;

  constructor(object: MarkdownModuleImageState) {
    Object.assign(this, object);
  }
}
