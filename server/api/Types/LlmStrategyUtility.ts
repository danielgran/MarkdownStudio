import type LlmStrategy from "./LlmStrategy";
import OpenAiLlmStrategy from "./OpenAiLlmStrategy";

export type LlmProviderName = "openai";

export function createLlmStrategy(provider: LlmProviderName): LlmStrategy {
  switch (provider) {
    case "openai": {
      const apiKey = useRuntimeConfig().openaiApiKey;
      return new OpenAiLlmStrategy(apiKey);
    }
    default:
      throw new Error(`Unknown LLM provider: "${provider}". Supported providers: openai`);
  }
}

