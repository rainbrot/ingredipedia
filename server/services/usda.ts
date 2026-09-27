// USDA FoodData Central: how many branded US foods list an ingredient. Shown on food-additive
// profiles as a prevalence signal. Works with the public DEMO_KEY (low rate limit) or USDA_API_KEY.

import { RateLimiter, getJson } from "./http";

const limiter = new RateLimiter(1200);

export async function brandedFoodCount(name: string): Promise<number | null> {
  const key = process.env.USDA_API_KEY || "DEMO_KEY";
  const params = new URLSearchParams({
    api_key: key,
    query: `ingredients:"${name.replace(/"/g, "")}"`,
    dataType: "Branded",
    pageSize: "1",
  });
  try {
    const data = await getJson<{ totalHits?: number }>(`https://api.nal.usda.gov/fdc/v1/foods/search?${params}`, {
      limiter,
      retries: 0,
      timeoutMs: 12_000,
    });
    return typeof data?.totalHits === "number" ? data.totalHits : null;
  } catch {
    return null; // Rate-limited or offline: prevalence is optional.
  }
}
