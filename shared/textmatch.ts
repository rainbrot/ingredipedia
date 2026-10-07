// OCR-aware string distance, shared by the server matcher and the client's label-text corrector.

// Character pairs OCR engines commonly confuse; substituting within a pair costs less than a real edit.
const CONFUSABLE = ["il", "i1", "l1", "o0", "s5", "b8", "ec", "ce", "uv", "nm", "rn", "gq", "z2"];

function subCost(x: string, y: string): number {
  if (x === y) return 0;
  return CONFUSABLE.includes(x + y) || CONFUSABLE.includes(y + x) ? 0.4 : 1;
}

/** Weighted optimal string alignment distance tuned for OCR errors. */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 3) return Math.max(m, n);
  const d: number[][] = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + subCost(a[i - 1], b[j - 1]));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[m][n];
}
