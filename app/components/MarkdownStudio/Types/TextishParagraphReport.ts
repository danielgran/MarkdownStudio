export default class TextishParagraphReport {
  score: number;
  recommendation: string;
  suggestion: string;

  constructor(value: { score: number; recommendation: string; suggestion: string }) {
    Object.assign(this, value);
  }
}
