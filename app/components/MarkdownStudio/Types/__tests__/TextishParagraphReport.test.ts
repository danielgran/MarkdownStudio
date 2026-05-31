import { describe, it, expect } from "vitest";
import TextishParagraphReport from "../TextishParagraphReport";

describe("TextishParagraphReport", () => {
  it("assigns score, recommendation and suggestion from the constructor argument", () => {
    const report = new TextishParagraphReport({
      score: 82,
      recommendation: "Strong topical alignment.",
      suggestion: "Consider tightening the second sentence.",
    });

    expect(report.score).toBe(82);
    expect(report.recommendation).toBe("Strong topical alignment.");
    expect(report.suggestion).toBe("Consider tightening the second sentence.");
  });

  it("is an instance of TextishParagraphReport", () => {
    const report = new TextishParagraphReport({ score: 0, recommendation: "", suggestion: "" });
    expect(report).toBeInstanceOf(TextishParagraphReport);
  });
});
