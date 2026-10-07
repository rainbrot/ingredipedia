import { describe, expect, it } from "vitest";
import { editDistance } from "../shared/textmatch";
import { roleOverview } from "../server/services/roles";
import { LESSONS } from "../src/learn/lessons";
import { GLOSSARY } from "../src/learn/glossary";

describe("OCR-aware edit distance", () => {
  it("treats common OCR confusions as cheap substitutions", () => {
    expect(editDistance("sodlum", "sodium")).toBeLessThan(1);
    expect(editDistance("g1ycerin", "glycerin")).toBeLessThan(1);
    expect(editDistance("water", "sugar")).toBeGreaterThanOrEqual(2);
  });
});

describe("automatic role overviews", () => {
  it("explains the chemistry of the ingredient's role", () => {
    const [first, second] = roleOverview(
      { name: "Carbomer", kind: "polymer", origin: "synthetic", primaryRole: "Thickener", primaryCategory: "Cosmetics & Skincare" },
      753,
    );
    expect(first).toMatch(/^Carbomer is a synthetic polymer/);
    expect(first).toMatch(/network/);
    expect(second).toMatch(/753 publications/);
  });

  it("uses the right article for vowel-initial roles", () => {
    const [first] = roleOverview({ name: "X", kind: "compound", origin: "synthetic", primaryRole: "Emulsifier", primaryCategory: "Food" }, null);
    expect(first).toContain("used as an emulsifier");
  });
});

describe("lesson content", () => {
  it("has a quiz with four distinct options per question", () => {
    for (const l of LESSONS) {
      expect(l.quiz.length).toBeGreaterThanOrEqual(3);
      for (const q of l.quiz) expect(new Set(q.options).size).toBe(q.options.length);
    }
  });

  it("links glossary terms only to lessons that exist", () => {
    const ids = new Set(LESSONS.map((l) => l.id));
    for (const t of GLOSSARY) if (t.lesson) expect(ids.has(t.lesson)).toBe(true);
  });
});

describe("sentence splitting for automatic research", () => {
  it("doesn't break on decimals, genus initials or abbreviations", async () => {
    const { splitSentences } = await import("../server/services/pubchem");
    expect(
      splitSentences("EHG increased killing of E. coli (> 5 log reduction), e.g. by membrane damage. Milk powder (8.7%) is listed. Smith et al. agreed. Done."),
    ).toEqual(["EHG increased killing of E. coli (> 5 log reduction), e.g. by membrane damage.", "Milk powder (8.7%) is listed.", "Smith et al. agreed.", "Done."]);
  });
});
