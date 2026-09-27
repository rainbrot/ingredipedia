// Claude integration for the three AI steps in the plan:
//   1. the instant "Basic AI Draft" shown only to the scanning user,
//   2. context-grounded (RAG) extraction from retrieved PubMed/PubChem text,
//   3. optional label OCR from a photo.
// Every call is metered into the AI cost ledger shown on the admin dashboard.

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { recordAiUsage } from "../repo";
import type { SourceDoc } from "../../shared/types";

// The plan calls for "a small, low-cost AI model": Claude Haiku 4.5 by default.
export const AI_MODEL = process.env.AI_MODEL || "claude-haiku-4-5";

// USD per million tokens (input, output).
const PRICING: Record<string, [number, number]> = {
  "claude-haiku-4-5": [1, 5],
  "claude-sonnet-5": [2, 10],
  "claude-sonnet-4-6": [3, 15],
  "claude-opus-5": [5, 25],
  "claude-opus-5-5": [4, 20],
};

export function aiEnabled(): boolean {
  return !!(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

let client: Anthropic | null = null;
function getClient(): Anthropic {
  client ??= new Anthropic({ maxRetries: 2, timeout: 60_000 });
  return client;
}

function meter(response: { usage: { input_tokens: number; output_tokens: number } }, purpose: string, ingredientId: string | null) {
  const [inRate, outRate] = PRICING[AI_MODEL] ?? PRICING["claude-haiku-4-5"];
  const { input_tokens, output_tokens } = response.usage;
  const costUsd = (input_tokens * inRate + output_tokens * outRate) / 1_000_000;
  recordAiUsage({ ingredientId, purpose, model: AI_MODEL, inputTokens: input_tokens, outputTokens: output_tokens, costUsd });
}

export class AiUnavailableError extends Error {}

function describeError(err: unknown): string {
  if (err instanceof Anthropic.AuthenticationError) return "Anthropic API key was rejected";
  if (err instanceof Anthropic.RateLimitError) return "Anthropic rate limit reached";
  if (err instanceof Anthropic.BadRequestError) return `Anthropic rejected the request: ${err.message}`;
  if (err instanceof Anthropic.APIConnectionError) return "Could not reach the Anthropic API";
  if (err instanceof Anthropic.APIError) return `Anthropic API error ${err.status}`;
  return err instanceof Error ? err.message : String(err);
}

// ---------------------------------------------------------------------------
// 1. Basic AI Draft

const CONCERN_KEYS = [
  "allergen",
  "sensitizer",
  "irritant",
  "corrosive",
  "endocrine",
  "carcinogen_flag",
  "added_sugar",
  "sodium",
  "artificial_color",
  "artificial_sweetener",
  "preservative",
  "environmental",
  "respiratory",
  "ultra_processed",
  "undisclosed",
  "stimulant",
  "gut",
  "flammable",
] as const;

export const BasicDraftSchema = z.object({
  isIngredient: z.boolean().describe("false if the text is OCR noise or not a real ingredient name"),
  commonName: z.string().describe("Primary consumer-facing name, e.g. 'Citric Acid'"),
  kind: z.enum(["compound", "mixture", "polymer"]),
  primaryCategory: z.string().describe("Product sector, e.g. 'Food Additive', 'Cosmetics & Skincare', 'Household Cleaner'"),
  primaryRole: z.string().describe("Main functional class, e.g. 'Preservative', 'Surfactant', 'Humectant'"),
  origin: z.enum(["natural", "mineral", "fermented", "semi_synthetic", "synthetic"]),
  sectors: z.array(z.enum(["food", "beauty", "cleaning"])),
  healthScore: z.number().int().describe("0-100 consumer health score at typical product use levels"),
  concerns: z.array(z.enum(CONCERN_KEYS)),
  scoreRationale: z.string().describe("One or two sentences justifying the score"),
  summary: z.string().describe("Two or three plain-language sentences for consumers"),
  productFunction: z.string().describe("Why formulators include it"),
  sensitization: z.string().describe("Irritation or allergy potential at consumer concentrations"),
});
export type BasicDraft = z.infer<typeof BasicDraftSchema>;

const SCORE_GUIDE = `Health score scale (typical consumer exposure, not the pure chemical):
90-100 essentially benign (water, glycerin); 75-89 well tolerated, minor caveats; 55-74 generally safe but with dose, sensitivity or dietary caveats;
35-54 meaningful concerns or active scientific debate; 15-34 notable hazards (strong sensitizers, corrosives, regulatory restrictions); below 15 serious hazards.
Be calibrated and evidence-based. Do not inflate risks from internet claims, and do not dismiss real regulatory concerns.`;

export async function basicDraft(input: { name: string; sector: string; facts: string; ingredientId: string | null }): Promise<BasicDraft> {
  if (!aiEnabled()) throw new AiUnavailableError("AI disabled");
  try {
    const response = await getClient().messages.parse({
      model: AI_MODEL,
      max_tokens: 1500,
      system: `You are a formulation chemist and toxicologist writing a short provisional profile of a consumer-product ingredient.
The profile is shown to one user immediately and later fact-checked by a human reviewer.
${SCORE_GUIDE}
Use the PubChem facts provided when they exist. If the label text is not a real ingredient (OCR noise, marketing words, a sentence), set isIngredient to false.`,
      messages: [
        {
          role: "user",
          content: `Label text: "${input.name}"\nProduct category being scanned: ${input.sector}\n\nPubChem facts:\n${input.facts || "(no PubChem record found)"}`,
        },
      ],
      output_config: { format: zodOutputFormat(BasicDraftSchema) },
    });
    meter(response, "basic_draft", input.ingredientId);
    if (response.stop_reason === "refusal" || !response.parsed_output) throw new Error("No draft returned");
    return response.parsed_output;
  } catch (err) {
    throw new Error(describeError(err));
  }
}

// ---------------------------------------------------------------------------
// 2. Context-grounded extraction (RAG)

const SourcedItem = z.object({
  title: z.string(),
  description: z.string(),
  equation: z.string().nullable().describe("Balanced equation using plain formulas, e.g. 'C6H8O7 + 3 NaHCO3 → Na3C6H5O7 + 3 H2O + 3 CO2'"),
  sources: z.array(z.string()).describe("Document ids that support this item"),
});

export const ExtractionSchema = z.object({
  summary: z.string().describe("Two or three plain-language sentences for consumers"),
  function: z.string(),
  reactions: z.array(SourcedItem),
  mechanisms: z.array(SourcedItem),
  regulatory: z.array(z.object({ body: z.string(), status: z.string(), limit: z.string().nullable() })),
  toxicology: z.object({ mechanism: z.string(), dosage: z.string() }),
  sensitization: z.string(),
  myths: z.array(z.object({ claim: z.string(), consensus: z.string() })),
  synthesis: z.object({ method: z.string(), steps: z.array(z.string()), equations: z.array(z.string()) }),
  environment: z.object({ persistence: z.string(), biodegradability: z.string(), aquaticToxicity: z.string() }),
  fun: z.object({ history: z.string(), uses: z.array(z.string()), occurrence: z.string() }),
  physical: z.object({ state: z.string(), solubility: z.string(), phStability: z.string(), meltingPoint: z.string() }),
  functionalGroups: z.array(z.string()),
  unsupportedFields: z
    .array(z.string())
    .describe("Dot paths of fields written from general knowledge rather than the documents, e.g. 'fun.history'"),
});
export type Extraction = z.infer<typeof ExtractionSchema>;

export async function groundedExtraction(input: { name: string; identity: string; docs: SourceDoc[]; ingredientId: string }): Promise<Extraction> {
  if (!aiEnabled()) throw new AiUnavailableError("AI disabled");
  const documents = input.docs
    .map((d) => `<document id="${d.id}" title="${d.title.replace(/"/g, "'")}">\n${d.text}\n</document>`)
    .join("\n");
  try {
    const response = await getClient().messages.parse({
      model: AI_MODEL,
      max_tokens: 6000,
      system: `You extract a scientific ingredient profile from the documents provided, for a consumer app that a human scientist reviews before publication.

Strict grounding rule: extract and summarize the specific chemical reactions, biological mechanisms, toxicology and concentration context directly from the documents.
- reactions, mechanisms, toxicology.mechanism and toxicology.dosage must come only from the documents. Cite the supporting document ids in each item's sources.
  If the documents do not describe something, return an empty list or the sentence "Not described in the retrieved sources."
- regulatory entries may use regulatory statements found in the documents (FDA, CIR, ECHA, EFSA, EPA Safer Choice).
- Other fields (history, surprising uses, natural occurrence, synthesis, environmental profile, myths, physical properties) may draw on well-established chemistry knowledge
  when the documents are silent, but list every such field path in unsupportedFields so the reviewer checks it.
- Clearly distinguish safe consumer-use concentrations from high-dose or occupational exposures in toxicology.dosage.
- For myths, contrast a common online claim with the current scientific consensus. Be accurate and calm.
- Write for curious non-experts: precise, concise, no hype.`,
      messages: [
        {
          role: "user",
          content: `Ingredient: ${input.name}\nKnown identity: ${input.identity}\n\n<documents>\n${documents}\n</documents>`,
        },
      ],
      output_config: { format: zodOutputFormat(ExtractionSchema) },
    });
    meter(response, "grounded_extraction", input.ingredientId);
    if (response.stop_reason === "refusal" || !response.parsed_output) throw new Error("No extraction returned");
    return response.parsed_output;
  } catch (err) {
    throw new Error(describeError(err));
  }
}

// ---------------------------------------------------------------------------
// 3. Label OCR from a photo (optional; the browser falls back to on-device Tesseract)

export const OcrSchema = z.object({
  ingredientsText: z.string().describe("The ingredient statement exactly as printed, comma-separated, without the 'Ingredients:' heading"),
  productName: z.string().nullable(),
  sector: z.enum(["food", "beauty", "cleaning"]).nullable(),
  legible: z.boolean(),
});
export type OcrResult = z.infer<typeof OcrSchema>;

export async function ocrLabel(imageBase64: string, mediaType: "image/jpeg" | "image/png" | "image/webp"): Promise<OcrResult> {
  if (!aiEnabled()) throw new AiUnavailableError("AI disabled");
  try {
    const response = await getClient().messages.parse({
      model: AI_MODEL,
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
            {
              type: "text",
              text: "Transcribe the ingredient list on this product label exactly as printed, preserving order, parentheses and asterisks. Ignore nutrition facts, directions and warnings. If no ingredient list is legible, set legible to false.",
            },
          ],
        },
      ],
      output_config: { format: zodOutputFormat(OcrSchema) },
    });
    meter(response, "label_ocr", null);
    if (response.stop_reason === "refusal" || !response.parsed_output) throw new Error("No transcription returned");
    return response.parsed_output;
  } catch (err) {
    throw new Error(describeError(err));
  }
}
