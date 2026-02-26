export class StringencyReport {
  score: number;
  recommendation: string;
  suggestion: string;

  constructor(data: { score: number; recommendation: string; suggestion: string }) {
    this.score = data.score;
    this.recommendation = data.recommendation;
    this.suggestion = data.suggestion;
  }
}
