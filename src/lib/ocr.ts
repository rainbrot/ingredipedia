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
  ctx.putImageData(data, 0, 0);
  return canvas;
}

export async function recognize(canvas: HTMLCanvasElement, onProgress: Progress): Promise<{ text: string; confidence: number }> {
  listener = onProgress;
  try {
    onProgress(0, "loading OCR engine");
    const worker = await getWorker();
    const { data } = await worker.recognize(canvas);
    return { text: data.text, confidence: data.confidence };
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
