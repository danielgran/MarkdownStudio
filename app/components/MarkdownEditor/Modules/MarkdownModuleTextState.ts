export default class MarkdownModuleTextState {
  [key: string]: unknown;
  text: string;

  constructor(object: MarkdownModuleTextState) {
    Object.assign(this, object);
  }
}
