// Sample product labels rendered to an image in the browser, so the full camera → OCR → analysis
// pipeline can be tried without a physical product (useful on laptops and for demos).

import type { Sector } from "../../shared/types";

export interface SampleLabel {
  id: string;
  sector: Sector;
  product: string;
  brandLine: string;
  blocks: { heading?: string; text: string; bold?: boolean }[];
}

export const SAMPLE_LABELS: SampleLabel[] = [
  {
    id: "fruit-snacks",
    sector: "food",
    product: "Berry Blast Fruit Snacks",
    brandLine: "Net Wt 8 oz (226 g) · 10 pouches",
    blocks: [
      { text: "Nutrition Facts  Serving size 1 pouch (23g)  Calories 80  Total Sugars 11g  Includes 11g Added Sugars" },
      {
        heading: "INGREDIENTS:",
        text: "CORN SYRUP, SUGAR, MODIFIED CORN STARCH, APPLE PUREE CONCENTRATE, CONTAINS 2% OR LESS OF: CITRIC ACID, LACTIC ACID, ASCORBIC ACID (VITAMIN C), NATURAL AND ARTIFICIAL FLAVORS, SODIUM CITRATE, CARNAUBA WAX, RED 40, YELLOW 5, BLUE 1.",
        bold: true,
      },
      { text: "CONTAINS: NO MAJOR ALLERGENS. Distributed by Example Foods Co., Springfield, USA." },
    ],
  },
  {
    id: "lotion",
    sector: "beauty",
    product: "Daily Hydrating Lotion",
    brandLine: "Fragrance-light · 8 fl oz (236 mL)",
    blocks: [
      { text: "Directions: Apply liberally to clean skin as often as needed." },
      {
        heading: "INGREDIENTS:",
        text: "WATER (AQUA), GLYCERIN, CETEARYL ALCOHOL, CAPRYLIC/CAPRIC TRIGLYCERIDE, DIMETHICONE, NIACINAMIDE, BUTYROSPERMUM PARKII (SHEA) BUTTER*, SODIUM HYALURONATE, PANTHENOL, TOCOPHEROL, CARBOMER, PHENOXYETHANOL, ETHYLHEXYLGLYCERIN, FRAGRANCE (PARFUM), LIMONENE. *CERTIFIED ORGANIC",
        bold: true,
      },
      { text: "Warning: For external use only. Avoid contact with eyes." },
    ],
  },
  {
    id: "cleaner",
    sector: "cleaning",
    product: "Citrus Multi-Surface Cleaner",
    brandLine: "Cuts grease · 32 fl oz (946 mL)",
    blocks: [
      { text: "Directions: Spray surface, wipe with a clean cloth. Rinse food-contact surfaces with water." },
      {
        heading: "INGREDIENTS:",
        text: "WATER, SODIUM DODECYLBENZENESULFONATE, SODIUM CARBONATE, ALCOHOL DENAT., LAURAMINE OXIDE, D-LIMONENE, FRAGRANCE, BENZISOTHIAZOLINONE, METHYLISOTHIAZOLINONE, COLORANT.",
        bold: true,
      },
      { text: "CAUTION: Eye irritant. Keep out of reach of children. Do not mix with bleach." },
    ],
  },
];

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Draws the label like the back panel of a package and returns it as a PNG data URL. */
export function renderSampleLabel(sample: SampleLabel): string {
  const W = 1400;
  const pad = 80;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const bodyFont = "30px Helvetica, Arial, sans-serif";
  const boldFont = "600 31px Helvetica, Arial, sans-serif";

  // Measure height first.
  ctx.font = bodyFont;
  let height = pad + 70 + 44 + 40;
  const layout = sample.blocks.map((b) => {
    ctx.font = b.bold ? boldFont : bodyFont;
    const lines = wrap(ctx, `${b.heading ? `${b.heading} ` : ""}${b.text}`, W - pad * 2);
    height += lines.length * 44 + 36;
    return { ...b, lines };
  });
  height += pad;
  canvas.width = W;
  canvas.height = height;

  ctx.fillStyle = "#fbfaf5";
  ctx.fillRect(0, 0, W, height);
  ctx.strokeStyle = "#1b1b1b";
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, W - 48, height - 48);

  ctx.fillStyle = "#111";
  ctx.font = "700 54px Georgia, serif";
  ctx.fillText(sample.product, pad, pad + 50);
  ctx.font = "28px Helvetica, Arial, sans-serif";
  ctx.fillStyle = "#444";
  ctx.fillText(sample.brandLine, pad, pad + 98);

  let y = pad + 170;
  ctx.fillStyle = "#111";
  for (const b of layout) {
    ctx.font = b.bold ? boldFont : bodyFont;
    for (const line of b.lines) {
      ctx.fillText(line, pad, y);
      y += 44;
    }
    y += 36;
  }
  return canvas.toDataURL("image/png");
}
