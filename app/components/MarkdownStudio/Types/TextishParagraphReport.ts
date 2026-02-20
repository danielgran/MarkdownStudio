export default class TextishParagraphReport {
  score: number;
  recommendation: string;

  constructor(value: TextishParagraphReport) {
    Object.assign(this, value);
  }
}
