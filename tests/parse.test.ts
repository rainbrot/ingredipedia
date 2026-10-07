import { describe, expect, it } from "vitest";
import { extractIngredientSection, normalizeKey, parseIngredients } from "../shared/parse";

const names = (text: string) => parseIngredients(text).map((p) => p.name);

describe("extractIngredientSection", () => {
  it("cuts the list out of full-label OCR text", () => {
    const text = `Berry Snacks\nNutrition Facts Calories 80\nINGREDIENTS: SUGAR, CITRIC ACID.\nCONTAINS: MILK. Distributed by Example Co.`;
    expect(extractIngredientSection(text).trim()).toBe("SUGAR, CITRIC ACID.");
  });

  it("prefers a real heading over marketing copy that mentions ingredients", () => {
    const text = "Made with simple ingredients you love! Ingredients: Water, Salt. Keep out of reach of children.";
    expect(extractIngredientSection(text).trim()).toBe("Water, Salt.");
  });

  it("joins active and inactive sections of drug-facts panels", () => {
    const text = "Active ingredients: Zinc Oxide 20% Purpose Sunscreen. Inactive ingredients: Water, Glycerin";
    expect(names(text)).toEqual(["Zinc Oxide", "Water", "Glycerin"]);
  });

  it("uses the whole text when there is no heading", () => {
    expect(names("water, glycerin, citric acid")).toEqual(["Water", "Glycerin", "Citric Acid"]);
  });
});

describe("parseIngredients", () => {
  it("title-cases ALL-CAPS labels and keeps acronyms", () => {
    expect(names("INGREDIENTS: SODIUM BENZOATE, BHT, FD&C RED NO. 40")).toEqual(["Sodium Benzoate", "BHT", "FD&C Red No. 40"]);
  });

  it("flattens sub-ingredient lists", () => {
    expect(names("Ingredients: Enriched Flour (Wheat Flour, Niacin, Reduced Iron), Sugar")).toEqual(["Wheat Flour", "Niacin", "Reduced Iron", "Sugar"]);
  });

  it("treats a single parenthetical as a synonym, not a sub-list", () => {
    const [aqua, shea] = parseIngredients("Ingredients: Aqua (Water), Butyrospermum Parkii (Shea) Butter");
    expect(aqua.name).toBe("Aqua");
    expect(aqua.alt).toContain("water");
    expect(shea.name).toBe("Butyrospermum Parkii Butter");
    expect(shea.alt).toContain("shea butter");
  });

  it("drops purpose notes and percentages", () => {
    expect(names("Ingredients: Water (70%), Sodium Benzoate (Preservative), Citric Acid to preserve freshness")).toEqual(["Water", "Sodium Benzoate", "Citric Acid"]);
  });

  it("handles 'contains 2% or less of' and trailing 'and'", () => {
    expect(names("Ingredients: Sugar, Contains 2% or less of: Salt, and Natural Flavors.")).toEqual(["Sugar", "Salt", "Natural Flavors"]);
  });

  it("detects organic ingredients by prefix and by footnote marker", () => {
    const prefix = parseIngredients("Ingredients: Organic Cane Sugar, Salt");
    expect(prefix[0]).toMatchObject({ name: "Cane Sugar", labeledOrganic: true });
    expect(prefix[1].labeledOrganic).toBe(false);

    const footnote = parseIngredients("Ingredients: Oats*, Honey*, Salt. *Certified Organic");
    expect(footnote.map((p) => [p.name, p.labeledOrganic])).toEqual([
      ["Oats", true],
      ["Honey", true],
      ["Salt", false],
    ]);
  });

  it("expands 'Vitamins (A, D)' shorthand", () => {
    expect(names("Ingredients: Milk, Vitamins (A, D3)")).toEqual(["Milk", "Vitamin A", "Vitamin D3"]);
  });

  it("de-duplicates and numbers positions in label order", () => {
    const parsed = parseIngredients("Water, Salt, water, Sugar");
    expect(parsed.map((p) => [p.position, p.name])).toEqual([
      [1, "Water"],
      [2, "Salt"],
      [3, "Sugar"],
    ]);
  });

  it("joins words hyphenated across OCR line breaks", () => {
    expect(names("Ingredients: Sodium Ben-\nzoate, Water")).toEqual(["Sodium Benzoate", "Water"]);
  });
});

describe("normalizeKey", () => {
  it("canonicalizes E-numbers and punctuation", () => {
    expect(normalizeKey("E 330")).toBe("e330");
    expect(normalizeKey("INS-330")).toBe("e330");
    expect(normalizeKey("FD&C Red No. 40")).toBe("fd and c red no 40");
    expect(normalizeKey("Crème Fraîche")).toBe("creme fraiche");
  });
});

describe("EU functional class prefixes", () => {
  it("strips class labels like 'emulsifier:' from the ingredient name", () => {
    const parsed = parseIngredients("Sugar, emulsifier: lecithins (soya), acidity regulator: citric acid, colour: E150d");
    expect(parsed.map((p) => p.name)).toEqual(["Sugar", "Lecithins", "Citric Acid", "E150d"]);
    expect(parsed[1].alt).toContain("soya");
  });
});

describe("E-numbers", () => {
  it("keeps standalone E-numbers as ingredients", () => {
    expect(names("Water, E330, E 202, Sugar")).toEqual(["Water", "E330", "E 202", "Sugar"]);
  });
});

describe("British spellings", () => {
  it("share lookup keys with American ones", () => {
    expect(normalizeKey("Natural Flavouring")).toBe(normalizeKey("Natural Flavoring"));
    expect(normalizeKey("Caramel Colour")).toBe("caramel color");
    expect(normalizeKey("Sodium Lauryl Sulphate")).toBe("sodium lauryl sulfate");
  });
});
