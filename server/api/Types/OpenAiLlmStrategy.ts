import OpenAI from "openai";
import type LlmStrategy from "./LlmStrategy";

/**
 * Models: https://developers.openai.com/api/docs/models
 */
export default class OpenAiLlmStrategy implements LlmStrategy {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string = "gpt-4.1-nano") {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  async complete(systemPrompt: string, userPrompt: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("OpenAI returned an empty response");
    }

    return content;
  }
}
