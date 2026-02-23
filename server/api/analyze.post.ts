import { createLlmStrategy, type LlmProviderName } from "./Types/LlmStrategyUtility";

interface AnalysisRequest {
  targetAudience: string;
  coreIdea: string;
  paragraph: string;
}

interface ParagraphReport {
  score: number;
  recommendation: string;
  suggestion: string;
}

interface AnalysisResponse {
  report: ParagraphReport;
}

const SYSTEM_PROMPT = `
You are a professional writing assistant that evaluates a single article paragraph.
You will receive a target audience, the core idea of the article, and one paragraph to evaluate.

Evaluate the paragraph against these criteria very critically:
- Relevance: How well does it serve the core idea?
- Clarity: Is it clearly written and easy to understand for the target audience?
- Engagement: Does it capture and hold the target audience's attention?
- Speech: Is the tone and style appropriate for the target audience?
- Tonality: Does the paragraph adopt the emotional register, formality level, and voice that naturally resonates with the target audience? (e.g. casual and humorous for a young consumer audience vs. precise and authoritative for domain experts)

Scoring rules (strictly enforced):
- The score is determined PRIMARILY by how well the paragraph aligns with the core idea and resonates with the target audience.
- A paragraph that drifts from the core idea or misjudges the target audience MUST score below 50, regardless of its prose quality.
- A paragraph that partially serves the core idea or partially fits the target audience scores between 50 and 74.
- Only a paragraph that clearly advances the core idea AND is well-suited for the target audience may score 75 or above.
- Tonality mismatches (wrong formality, emotional register, or voice for the target audience) are treated as a target audience misalignment and follow the same penalty rules above.
- Writing quality (clarity, grammar, style) may adjust the score by at most ±10 points within the appropriate band, but cannot compensate for poor alignment with core idea or target audience.

Return a JSON object with a single key "report" containing:
- "score": an integer from 0 to 100 (100 = excellent).
- "recommendation": a short, actionable suggestion for improvement (1-2 sentences) to reach 100. If the paragraph is strong, acknowledge that with one word.
- "suggestion": a specific rewrite of the paragraph that addresses the recommendation. If the paragraph is strong, repeat the original paragraph.

Return ONLY valid JSON. No markdown, no extra text.
`;

function buildUserPrompt(request: AnalysisRequest): string {
  return `Target Audience: ${request.targetAudience}

Core Idea: ${request.coreIdea}

Paragraph to evaluate:
${request.paragraph}`;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<AnalysisRequest>(event);

  if (!body.targetAudience || !body.coreIdea || !body.paragraph?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: targetAudience, coreIdea, and paragraph",
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
    const parsed: AnalysisResponse = JSON.parse(rawResponse);

    if (!parsed.report || typeof parsed.report !== "object") {
      throw new Error("LLM response does not contain a valid 'report' object");
    }

    const report = parsed.report;
    return {
      score: typeof report.score === "number" ? report.score : 0,
      recommendation: typeof report.recommendation === "string" ? report.recommendation : "No recommendation provided.",
      suggestion: typeof report.suggestion === "string" ? report.suggestion : "No suggestion provided.",
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({
      statusCode: 502,
      statusMessage: `LLM processing failed: ${message}`,
    });
  }
});
