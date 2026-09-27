import { describe, expect, it } from "vitest";
import { positionWeight, scoreProduct, topConcern } from "../shared/scoring";
import type { IngredientSummary, ScanItem } from "../shared/types";

function item(position: number, score: number, opts: Partial<IngredientSummary> & { organic?: boolean; group?: ScanItem["group"] } = {}): ScanItem {
  const ing: IngredientSummary = {
    id: `i${position}`,
    name: opts.name ?? `Ingredient ${position}`,
    kind: "compound",
    primaryRole: opts.primaryRole ?? "Thing",
    primaryCategory: "Test",
    origin: opts.origin ?? "synthetic",
    healthScore: score,
    concerns: opts.concerns ?? [],
    researchCount: opts.researchCount ?? 100,
    status: opts.status ?? "verified",
    researchState: "complete",
    sectors: ["food"],
    pubchemCid: null,
  };
  return { position, raw: ing.name, name: ing.name, labeledOrganic: !!opts.organic, group: opts.group ?? (opts.organic ? "organic" : "artificial"), match: "exact", ingredient: ing };
}

describe("scoreProduct", () => {
  it("weights earlier label positions more heavily", () => {
    expect(positionWeight(1)).toBe(1);
    expect(positionWeight(5)).toBeLessThan(positionWeight(2));
    const goodFirst = scoreProduct([item(1, 95), item(2, 50)], "food");
    const badFirst = scoreProduct([item(1, 50), item(2, 95)], "food");
    expect(goodFirst.score).toBeGreaterThan(badFirst.score);
  });

  it("penalizes concerning ingredients even late in the list", () => {
    const clean = scoreProduct([item(1, 95), item(2, 90), item(3, 90), item(4, 90), item(5, 90), item(6, 90)], "beauty");
    const withSensitizer = scoreProduct(
      [item(1, 95), item(2, 90), item(3, 90), item(4, 90), item(5, 90), item(6, 26, { name: "Methylisothiazolinone", concerns: ["sensitizer"] })],
      "beauty",
    );
    expect(clean.score - withSensitizer.score).toBeGreaterThanOrEqual(10);
    expect(withSensitizer.summary).toContain("Methylisothiazolinone (skin sensitizer)");
  });

  it("gives a small bonus for certified-organic ingredients", () => {
    const plain = scoreProduct([item(1, 80), item(2, 80)], "food");
    const organic = scoreProduct([item(1, 80, { organic: true }), item(2, 80, { organic: true })], "food");
    expect(organic.score).toBeGreaterThan(plain.score);
    expect(organic.highlights.some((h) => h.tone === "good" && h.text.includes("certified-organic"))).toBe(true);
  });

  it("reports confidence from the share of verified profiles", () => {
    expect(scoreProduct([item(1, 80), item(2, 80)], "food").confidence).toBe("high");
    expect(scoreProduct([item(1, 80, { status: "needs_verification" }), item(2, 80, { status: "needs_verification" })], "food").confidence).toBe("low");
  });

  it("names the best- and least-researched ingredients", () => {
    const s = scoreProduct([item(1, 80, { name: "Water", researchCount: 90000 }), item(2, 80, { name: "Carbomer", researchCount: 40 })], "beauty");
    expect(s.summary).toMatch(/Water is the best-studied ingredient \(90k papers\), while Carbomer has the thinnest evidence base \(40\)/);
  });

  it("returns a neutral placeholder when nothing matched", () => {
    const s = scoreProduct([{ position: 1, raw: "xq", name: "Xq", labeledOrganic: false, group: "unknown", match: "unrecognized", ingredient: null }], "food");
    expect(s).toMatchObject({ score: 50, confidence: "low" });
  });

  it("keeps scores within 1–100", () => {
    const awful = scoreProduct(Array.from({ length: 20 }, (_, i) => item(i + 1, 5)), "cleaning");
    expect(awful.score).toBeGreaterThanOrEqual(1);
    const perfect = scoreProduct([item(1, 100, { organic: true })], "food");
    expect(perfect.score).toBeLessThanOrEqual(100);
  });
});

describe("topConcern", () => {
  it("orders concerns by severity", () => {
    expect(topConcern(["irritant", "sensitizer"])).toBe("sensitizer");
    expect(topConcern(["preservative", "carcinogen_flag"])).toBe("carcinogen_flag");
    expect(topConcern([])).toBeUndefined();
  });
});
