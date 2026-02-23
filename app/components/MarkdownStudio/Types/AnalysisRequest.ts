export default class AnalysisRequest {
  targetAudience: string;
  coreIdea: string;
  paragraph: string;

  constructor(value: AnalysisRequest) {
    Object.assign(this, value);
  }
}
