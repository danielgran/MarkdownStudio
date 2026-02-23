export default interface LlmStrategy {
  complete(systemPrompt: string, userPrompt: string): Promise<string>;
}
