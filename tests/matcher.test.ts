import { describe, expect, it } from "vitest";
import { editDistance, isPlausibleIngredient } from "../server/services/matcher";
import { nameVariants } from "../server/services/pipeline";

describe("OCR-aware matching", () => {
  it("treats OCR-confusable characters as cheap substitutions", () => {
    expect(editDistance("sodlum benzoate", "sodium benzoate")).toBeLessThan(1);
    expect(editDistance("phenoxyethano1", "phenoxyethanol")).toBeLessThan(1);
  });

  it("does not confuse genuinely different chemicals", () => {
    expect(editDistance("retinol", "retinal")).toBeGreaterThanOrEqual(1);
    expect(editDistance("methylparaben", "ethylparaben")).toBeGreaterThanOrEqual(1);
  });

  it("rejects OCR noise and sentences before researching them", () => {
    expect(isPlausibleIngredient("Sodium Benzoate")).toBe(true);
    expect(isPlausibleIngredient("Xkcd Trqz")).toBe(false);
    expect(isPlausibleIngredient("Keep out of reach of children and pets at all times")).toBe(false);
    expect(isPlausibleIngredient("12/34 %%")).toBe(false);
  });

  it("maps label dye names to PubChem's FD&C names", () => {
    expect(nameVariants("Blue 1")).toContain("FD&C Blue No. 1");
    expect(nameVariants("Red No. 40 Lake")).toContain("FD&C Red No. 40");
    expect(nameVariants("Purified Water")).toContain("Water");
  });
});
