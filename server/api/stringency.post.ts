import { createLlmStrategy, type LlmProviderName } from "./Types/LlmStrategyUtility";
import { StringencyReport } from "./Types/StringencyReport";

export interface AnalyzeStringencyRequest {
  targetAudience: string;
  coreIdea: string;
  fullText: string;
}

interface LlmReport {
  score: number;
  recommendation: string;
  suggestion: string;
}

interface LlmAnalysisResponse {
  report: LlmReport;
}

const SYSTEM_PROMPT = `
You are a professional writing assistant that evaluates the overall stringency and coherence of an article.
You will receive a target audience, the core idea, and the full article text.

Evaluate the article as a whole against these criteria:
- Stringency: Does the article maintain a consistent, logical thread from start to finish? Are there contradictions, tangents, or abrupt topic shifts?
- Core idea adherence: Does every section clearly serve and advance the stated core idea? Are there sections that drift away or feel disconnected?
- Structural coherence: Do the sections build on each other logically? Is the reading flow natural and progressive?
- Audience alignment: Is the overall tone, depth, and vocabulary consistently appropriate for the target audience throughout?

Scoring rules (strictly enforced):
- An article with major tangents, contradictions, or sections unrelated to the core idea MUST score below 40.
- An article with minor drift or inconsistent tone scores between 40 and 64.
- An article that mostly stays on track but has small coherence gaps scores between 65 and 79.
- Only an article that is fully stringent, consistently on-topic, and perfectly suited for the target audience may score 80 or above.

Return a JSON object with a single key "report" containing:
- "score": an integer from 0 to 100 (100 = perfectly stringent and coherent).
- "recommendation": a short, actionable summary of how to improve overall stringency and core idea adherence (2-3 sentences). If the article is strong, acknowledge that briefly.
- "suggestion": a concrete description of which sections to restructure, remove, or strengthen. If the article is strong, state that no changes are needed.

Return ONLY valid JSON. No markdown, no extra text.
`;

function buildUserPrompt(request: AnalyzeStringencyRequest): string {
  return `Target Audience: ${request.targetAudience}

Core Idea: ${request.coreIdea}

Full article text:
${request.fullText}`;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<AnalyzeStringencyRequest>(event);

  if (!body.targetAudience || !body.coreIdea || !body.fullText?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: targetAudience, coreIdea, and fullText",
    });
  }

  const apiKey = config.openaiApiKey;
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "OpenAI API key is not configured. Set NUXT_OPENAI_API_KEY in your environment.",
    });
  }

  const provider = config.llmProvider as LlmProviderName;
  const strategy = createLlmStrategy(provider);

  const userPrompt = buildUserPrompt(body);

  try {
    const rawResponse = await strategy.complete(SYSTEM_PROMPT, userPrompt);
    const parsed: LlmAnalysisResponse = JSON.parse(rawResponse);

    if (!parsed.report || typeof parsed.report !== "object") {
      throw new Error("LLM response does not contain a valid 'report' object");
    }

    const report = parsed.report;
    return new StringencyReport({
      score: typeof report.score === "number" ? report.score : 0,
      recommendation: typeof report.recommendation === "string" ? report.recommendation : "No recommendation provided.",
      suggestion: typeof report.suggestion === "string" ? report.suggestion : "No suggestion provided.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({
      statusCode: 502,
      statusMessage: `LLM processing failed: ${message}`,
    });
  }
});
