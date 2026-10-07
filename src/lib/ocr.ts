// On-device label OCR with Tesseract.js (WebAssembly). Photos never leave the device on this path.

import type { Worker } from "tesseract.js";

export interface CropRect {
  /** Normalized 0–1 coordinates relative to the source image. */
  x: number;
  y: number;
  w: number;
  h: number;
}

type Progress = (fraction: number, status: string) => void;

let workerPromise: Promise<Worker> | null = null;
let listener: Progress | null = null;

function getWorker(): Promise<Worker> {
  workerPromise ??= (async () => {
    const { createWorker } = await import("tesseract.js");
    return createWorker("eng", 1, {
      logger: (m) => listener?.(m.progress ?? 0, m.status ?? ""),
    });
  })().catch((err) => {
    workerPromise = null;
    throw err;
  });
  return workerPromise;
}

/** Warm the OCR engine (downloads the WASM core and English model once, then caches it). */
export function preloadOcr() {
  void getWorker().catch(() => undefined);
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image. Try a JPEG or PNG photo."));
    img.src = src;
  });
}

/**
 * Crops, rescales and normalizes contrast so small or dim label text reads reliably.
 * Tesseract works best around 30px x-height, so narrow crops are upscaled.
 */
export function preprocess(img: HTMLImageElement | HTMLCanvasElement, crop: CropRect = { x: 0, y: 0, w: 1, h: 1 }): HTMLCanvasElement {
  const sw = (img instanceof HTMLImageElement ? img.naturalWidth : img.width) || 1;
  const sh = (img instanceof HTMLImageElement ? img.naturalHeight : img.height) || 1;
  const sx = Math.round(crop.x * sw);
  const sy = Math.round(crop.y * sh);
  const cw = Math.max(1, Math.round(crop.w * sw));
  const ch = Math.max(1, Math.round(crop.h * sh));

  const targetW = Math.min(2400, Math.max(1600, cw));
  const scale = targetW / cw;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(cw * scale);
  canvas.height = Math.round(ch * scale);
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sx, sy, cw, ch, 0, 0, canvas.width, canvas.height);

  // Grayscale + percentile contrast stretch.
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const px = data.data;
  const hist = new Uint32Array(256);
  for (let i = 0; i < px.length; i += 4) {
    const g = Math.round(0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]);
    px[i] = g;
    hist[g]++;
  }
  const total = px.length / 4;
  let lo = 0;
  let hi = 255;
  for (let acc = 0; lo < 255 && (acc += hist[lo]) < total * 0.02; lo++);
  for (let acc = 0; hi > 0 && (acc += hist[hi]) < total * 0.02; hi--);
  const range = Math.max(1, hi - lo);
  for (let i = 0; i < px.length; i += 4) {
    const v = Math.max(0, Math.min(255, ((px[i] - lo) * 255) / range));
    px[i] = px[i + 1] = px[i + 2] = v;
  }
  // Light text on a dark label: invert so text is dark on light, which Tesseract expects.
  let sum = 0;
  for (let i = 0; i < px.length; i += 4) sum += px[i];
  if (sum / total < 110) for (let i = 0; i < px.length; i += 4) px[i] = px[i + 1] = px[i + 2] = 255 - px[i];
  ctx.putImageData(data, 0, 0);
  return canvas;
}

/**
 * Bradley–Roth adaptive thresholding: each pixel is compared with the average of its neighborhood,
 * so uneven lighting, shadows and glossy glare on curved packaging don't wipe out text.
 */
export function binarize(gray: HTMLCanvasElement): HTMLCanvasElement {
  const w = gray.width;
  const h = gray.height;
  const src = gray.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, w, h);
  const integral = new Float64Array((w + 1) * (h + 1));
  for (let y = 1; y <= h; y++) {
    let rowSum = 0;
    for (let x = 1; x <= w; x++) {
      rowSum += src.data[((y - 1) * w + (x - 1)) * 4];
      integral[y * (w + 1) + x] = integral[(y - 1) * (w + 1) + x] + rowSum;
    }
  }
  const s = Math.max(16, Math.round(w / 16));
  const half = s >> 1;
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const octx = out.getContext("2d")!;
  const dst = octx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const y1 = Math.max(0, y - half);
    const y2 = Math.min(h - 1, y + half);
    for (let x = 0; x < w; x++) {
      const x1 = Math.max(0, x - half);
      const x2 = Math.min(w - 1, x + half);
      const count = (x2 - x1 + 1) * (y2 - y1 + 1);
      const sum = integral[(y2 + 1) * (w + 1) + (x2 + 1)] - integral[y1 * (w + 1) + (x2 + 1)] - integral[(y2 + 1) * (w + 1) + x1] + integral[y1 * (w + 1) + x1];
      const i = (y * w + x) * 4;
      const v = src.data[i] * count <= sum * 0.85 ? 0 : 255;
      dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = v;
      dst.data[i + 3] = 255;
    }
  }
  octx.putImageData(dst, 0, 0);
  return out;
}

/** Sharpness = variance of the Laplacian on a small grayscale copy; used to pick the best camera frame. */
export function sharpness(source: CanvasImageSource, width: number, height: number): number {
  const w = 320;
  const h = Math.max(1, Math.round((height / width) * w));
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(source, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  const g = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) g[i] = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2];
  let sum = 0;
  let sumSq = 0;
  let n = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const lap = g[i - w] + g[i + w] + g[i - 1] + g[i + 1] - 4 * g[i];
      sum += lap;
      sumSq += lap * lap;
      n++;
    }
  }
  const mean = sum / n;
  return sumSq / n - mean * mean;
}

export interface OcrResult {
  text: string;
  confidence: number;
  /** Words Tesseract was unsure about (confidence below 60), for highlighting in review. */
  uncertain: string[];
}

interface WordLike {
  text: string;
  confidence: number;
}

function collectWords(node: unknown, out: WordLike[]) {
  if (!node || typeof node !== "object") return;
  const n = node as { words?: WordLike[]; paragraphs?: unknown[]; lines?: unknown[] };
  if (Array.isArray(n.words)) out.push(...n.words);
  for (const child of [...(n.paragraphs ?? []), ...(n.lines ?? [])]) collectWords(child, out);
}

async function pass(canvas: HTMLCanvasElement, psm: string): Promise<OcrResult> {
  const worker = await getWorker();
  // Preprocessing upscales text to roughly print resolution, so tell Tesseract instead of letting it guess.
  await worker.setParameters({ tessedit_pageseg_mode: psm as never, preserve_interword_spaces: "1", user_defined_dpi: "300" });
  const { data } = await worker.recognize(canvas, {}, { text: true, blocks: true });
  const words: WordLike[] = [];
  for (const b of data.blocks ?? []) collectWords(b, words);
  return { text: data.text, confidence: data.confidence, uncertain: words.filter((w) => w.confidence < 60 && /[a-z]{3,}/i.test(w.text)).map((w) => w.text) };
}

/**
 * Two-pass recognition: an adaptive-threshold pass treating the crop as one block of text, then, if
 * confidence is low, a grayscale pass with automatic layout. The better-scoring reading wins, judged by
 * Tesseract's confidence and by how many words match known ingredient vocabulary.
 */
export async function recognize(gray: HTMLCanvasElement, onProgress: Progress, vocabularyScore: (text: string) => number = () => 0): Promise<OcrResult> {
  listener = (f, status) => onProgress(f * 0.5, status);
  try {
    onProgress(0, "loading OCR engine");
    const first = await pass(binarize(gray), "6");
    const score = (r: OcrResult) => r.confidence / 100 + vocabularyScore(r.text);
    if (first.confidence >= 82 && vocabularyScore(first.text) >= 0.6) return first;
    listener = (f, status) => onProgress(0.5 + f * 0.5, status ? `${status} (second pass)` : "second pass");
    const second = await pass(gray, "3");
    return score(second) > score(first) ? second : first;
  } finally {
    listener = null;
  }
}

export function canvasToDataUrl(canvas: HTMLCanvasElement, maxSide = 1600): string {
  const scale = Math.min(1, maxSide / Math.max(canvas.width, canvas.height));
  if (scale === 1) return canvas.toDataURL("image/jpeg", 0.88);
  const c = document.createElement("canvas");
  c.width = Math.round(canvas.width * scale);
  c.height = Math.round(canvas.height * scale);
  c.getContext("2d")!.drawImage(canvas, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.88);
}
