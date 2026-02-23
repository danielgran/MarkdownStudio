export default class TextishParagraphReport {
  score: number;
  recommendation: string;

  suggestion: string;

  constructor(value: TextishParagraphReport,) {
    Object.assign(this, value,);
  }
}
