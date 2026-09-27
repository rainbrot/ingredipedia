// Renders chemical formulas and reaction equations with proper subscripts and charges,
// e.g. "C6H8O7 + 3 NaHCO3 → Na3C6H5O7 + 3 H2O + 3 CO2" or "Ca2+ + EDTA4-".

export interface FormulaPart {
  t: string;
  v?: "sub" | "sup";
}

const LOOKS_CHEMICAL = /^[\d]*[([]?[A-Z][a-z]?/;

function formatSpecies(token: string): FormulaPart[] {
  const parts: FormulaPart[] = [];
  const push = (t: string, v?: "sub" | "sup") => {
    const last = parts[parts.length - 1];
    if (last && last.v === v) last.t += t;
    else parts.push(v ? { t, v } : { t });
  };

  // Trailing charge: Ca2+, OH-, SO4^2-, Na+
  let body = token;
  let charge = "";
  const chargeMatch = body.match(/(\^?\d?[+\-−])$/);
  if (chargeMatch && /[A-Za-z)\]\d]/.test(body.slice(0, -chargeMatch[0].length).slice(-1))) {
    // Only treat "2+" as a charge when the digit follows an element symbol already carrying its count,
    // otherwise "H2-" style tokens are rare enough to accept the same reading.
    charge = chargeMatch[0].replace("^", "").replace("-", "−");
    body = body.slice(0, -chargeMatch[0].length);
  }

  let i = 0;
  // Leading stoichiometric coefficient stays full size.
  const coef = body.match(/^\d+(?:\/\d+)?/);
  if (coef && /[A-Z([]/.test(body[coef[0].length] ?? "")) {
    push(coef[0]);
    i = coef[0].length;
  }
  for (; i < body.length; i++) {
    const ch = body[i];
    const prev = body[i - 1] ?? "";
    if (/\d/.test(ch) && /[A-Za-z)\]\d]/.test(prev) && !/^\((?:aq|s|l|g)\)/.test(body.slice(i))) {
      // digits after an element, bracket or another subscript digit are counts
      const prevIsSub = parts[parts.length - 1]?.v === "sub";
      if (/[A-Za-z)\]]/.test(prev) || prevIsSub) {
        push(ch, "sub");
        continue;
      }
    }
    push(ch);
  }
  if (charge) push(charge, "sup");
  return parts;
}

export function formulaParts(input: string): FormulaPart[] {
  const out: FormulaPart[] = [];
  for (const piece of input.split(/(\s+)/)) {
    if (!piece) continue;
    if (/^\s+$/.test(piece) || !LOOKS_CHEMICAL.test(piece)) {
      out.push({ t: piece });
      continue;
    }
    // Hydrates: CuSO4·5H2O
    const hydrate = piece.split(/([·•])/);
    for (const h of hydrate) {
      if (h === "·" || h === "•") out.push({ t: "·" });
      else if (h) out.push(...formatSpecies(h));
    }
  }
  // Merge adjacent plain segments for tidy rendering.
  return out.reduce<FormulaPart[]>((acc, p) => {
    const last = acc[acc.length - 1];
    if (last && last.v === p.v) last.t += p.t;
    else acc.push({ ...p });
    return acc;
  }, []);
}

/** Plain-text rendering with Unicode subscripts, for places where markup is unavailable (e.g. <title>). */
export function formulaUnicode(input: string): string {
  const SUB: Record<string, string> = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
  const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "+": "⁺", "−": "⁻", "-": "⁻" };
  return formulaParts(input)
    .map((p) => (p.v === "sub" ? [...p.t].map((c) => SUB[c] ?? c).join("") : p.v === "sup" ? [...p.t].map((c) => SUP[c] ?? c).join("") : p.t))
    .join("");
}
