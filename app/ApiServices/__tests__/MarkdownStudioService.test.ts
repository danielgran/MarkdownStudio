import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useMarkdownStudioService } from "../MarkdownStudioService";
import TextishParagraphReport from "../../components/MarkdownStudio/Types/TextishParagraphReport";

declare global {
  var $fetch: ReturnType<typeof vi.fn>;
}

describe("MarkdownStudioService", () => {
  beforeEach(() => {
    globalThis.$fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("posts the analyze request payload to /api/analyze and wraps the response", async () => {
    globalThis.$fetch.mockResolvedValueOnce({ score: 76, recommendation: "ok", suggestion: "" });
    const service = useMarkdownStudioService();

    const result = await service.analyze({
      targetAudience: "students",
      coreIdea: "coherence matters",
      paragraph: "Some paragraph text.",
      moduleType: "paragraph",
    });

    expect(globalThis.$fetch).toHaveBeenCalledTimes(1);
    const [url, options] = globalThis.$fetch.mock.calls[0];
    expect(url).toBe("/api/analyze");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({
      targetAudience: "students",
      coreIdea: "coherence matters",
      paragraph: "Some paragraph text.",
      moduleType: "paragraph",
    });
    expect(result).toBeInstanceOf(TextishParagraphReport);
    expect(result.score).toBe(76);
  });

  it("posts the stringency request payload to /api/stringency", async () => {
    globalThis.$fetch.mockResolvedValueOnce({ score: 91, recommendation: "tight", suggestion: "" });
    const service = useMarkdownStudioService();

    const result = await service.analyzeStringency({
      targetAudience: "engineers",
      coreIdea: "clarity",
      fullText: "Full document text.",
    });

    const [url] = globalThis.$fetch.mock.calls[0];
    expect(url).toBe("/api/stringency");
    expect(result).toBeInstanceOf(TextishParagraphReport);
    expect(result.score).toBe(91);
  });
});
