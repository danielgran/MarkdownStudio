import type { AnalyzeRequest } from "./Types/AnalyzeRequest";
import type { AnalyzeResponse } from "./Types/AnalyzeResponse";
import { createLlmStrategy, type LlmProviderName } from "./Types/LlmStrategyUtility";

interface LlmReport {
  score: number;
  recommendation: string;
  suggestion: string;
}

interface LlmAnalysisResponse {
  report: LlmReport;
}

const SYSTEM_PROMPT = `
You are a professional writing assistant that evaluates a single module of an article.
You will receive a target audience, the core idea of the article, the module type, and the module content to evaluate.

Module type considerations:
- Headlines (h1, h2, h3): Are allowed to be concise and carry less information by design. Evaluate them on focus, tone fit, and their ability to signal the topic — not on information density.
- Paragraphs: Are expected to carry substance and should be evaluated for depth, clarity, and engagement. Length matters: a paragraph that is too short (under ~40 words) likely lacks development, while one that is too long (over ~120 words) risks losing focus and reader attention. Penalize both extremes unless the length is clearly justified by the content.
- Lists: Should be clear, parallel in structure, and directly relevant to the core idea.

Evaluate the module against these criteria, adjusted for its type:
- Relevance: How well does it serve the core idea?
- Clarity: Is it clearly written and easy to understand for the target audience?
- Engagement: Does it capture and hold the target audience's attention?
- Tonality: Does it adopt the emotional register, formality level, and voice that naturally resonates with the target audience? (e.g. casual and humorous for a young consumer audience vs. precise and authoritative for domain experts)

Scoring rules (strictly enforced):
- The score is determined PRIMARILY by how well the module aligns with the core idea and resonates with the target audience.
- A module that drifts from the core idea or misjudges the target audience MUST score below 50, regardless of its prose quality.
- A module that partially serves the core idea or partially fits the target audience scores between 50 and 74.
- Only a module that clearly advances the core idea AND is well-suited for the target audience may score 75 or above.
- Tonality mismatches are treated as a target audience misalignment and follow the same penalty rules above.
- Writing quality (clarity, grammar, style) may adjust the score by at most ±10 points within the appropriate band, but cannot compensate for poor alignment with core idea or target audience.

Return a JSON object with a single key "report" containing:
- "score": an integer from 0 to 100 (100 = excellent).
- "recommendation": a short, actionable suggestion for improvement (1-2 sentences) to reach 100. If the module is strong, acknowledge that with one word.
- "suggestion": A specific rewrite of the original text which would score 100. Don't return if the original text is already strong.

Return ONLY valid JSON. No markdown, no extra text.
`;

function buildUserPrompt(request: AnalyzeRequest): string {
  return `Target Audience: ${request.targetAudience}

Core Idea: ${request.coreIdea}

Module Type: ${request.moduleType}

Paragraph to evaluate:
${request.paragraph}`;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<AnalyzeRequest>(event);

  if (!body.targetAudience || !body.coreIdea || !body.paragraph?.trim() || !body.moduleType) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: targetAudience, coreIdea, paragraph, and moduleType",
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
    const response: AnalyzeResponse = {
      score: typeof report.score === "number" ? report.score : 0,
      recommendation: typeof report.recommendation === "string" ? report.recommendation : "No recommendation provided.",
      suggestion: typeof report.suggestion === "string" ? report.suggestion : "No suggestion provided.",
    };
    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({
      statusCode: 502,
      statusMessage: `LLM processing failed: ${message}`,
    });
  }
});
