import type { AnalyzeResponse, } from "../../server/api/Types/AnalyzeResponse";

class MarkdownStudioService {
  async analyze(request: {
    targetAudience: string;
    coreIdea: string;
    paragraph: string;
    moduleType: string;
  },): Promise<AnalyzeResponse> {
    return await $fetch<AnalyzeResponse>("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(request,),
    },);
  }

  async analyzeStringency(request: {
    targetAudience: string;
    coreIdea: string;
    fullText: string;
  },): Promise<AnalyzeResponse> {
    return await $fetch<AnalyzeResponse>("/api/analyze-stringency", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(request,),
    },);
  }
}

export function useMarkdownStudioService() {
  return new MarkdownStudioService();
}
