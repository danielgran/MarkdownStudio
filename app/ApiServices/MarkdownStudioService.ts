import TextishParagraphReport from "../components/MarkdownStudio/Types/TextishParagraphReport";

class MarkdownStudioService {
  async analyze(request: {
    targetAudience: string;
    coreIdea: string;
    paragraph: string;
    moduleType: string;
  }): Promise<TextishParagraphReport> {
    const result = await $fetch<{ score: number; recommendation: string; suggestion: string }>("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    return new TextishParagraphReport(result);
  }

  async analyzeStringency(request: {
    targetAudience: string;
    coreIdea: string;
    fullText: string;
  }): Promise<TextishParagraphReport> {
    const result = await $fetch<{ score: number; recommendation: string; suggestion: string }>("/api/stringency", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    return new TextishParagraphReport(result);
  }
}

export function useMarkdownStudioService() {
  return new MarkdownStudioService();
}
