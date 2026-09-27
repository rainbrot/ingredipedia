import { describe, expect, it } from "vitest";
import { formulaParts, formulaUnicode } from "../shared/formula";

describe("formula rendering", () => {
  it("subscripts atom counts", () => {
    expect(formulaUnicode("C6H8O7")).toBe("C₆H₈O₇");
    expect(formulaUnicode("Ca3(C6H5O7)2")).toBe("Ca₃(C₆H₅O₇)₂");
  });

  it("keeps stoichiometric coefficients full size", () => {
    expect(formulaUnicode("C6H8O7 + 3 NaHCO3 → Na3C6H5O7 + 3 H2O + 3 CO2")).toBe("C₆H₈O₇ + 3 NaHCO₃ → Na₃C₆H₅O₇ + 3 H₂O + 3 CO₂");
    expect(formulaUnicode("2Na2CO3·3H2O2")).toBe("2Na₂CO₃·3H₂O₂");
  });

  it("superscripts ionic charges", () => {
    expect(formulaUnicode("Ca2+")).toBe("Ca²⁺");
    expect(formulaUnicode("OH-")).toBe("OH⁻");
    const parts = formulaParts("Fe3+ + e- → Fe2+");
    expect(parts.filter((p) => p.v === "sup").map((p) => p.t)).toEqual(["3+", "2+"]);
  });

  it("leaves prose untouched", () => {
    expect(formulaUnicode("heat and light")).toBe("heat and light");
  });
});
