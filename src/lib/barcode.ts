// Barcode scanning: the browser's native BarcodeDetector where available (Chrome/Android/macOS),
// otherwise the ZXing library, loaded only when needed.

const FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e"];

interface NativeDetector {
  detect(source: CanvasImageSource): Promise<{ rawValue: string }[]>;
}

async function nativeDetector(): Promise<NativeDetector | null> {
  const BD = (window as unknown as { BarcodeDetector?: { new (o: { formats: string[] }): NativeDetector; getSupportedFormats(): Promise<string[]> } }).BarcodeDetector;
  if (!BD) return null;
  try {
    const supported = await BD.getSupportedFormats();
    if (!FORMATS.some((f) => supported.includes(f))) return null;
    return new BD({ formats: FORMATS.filter((f) => supported.includes(f)) });
  } catch {
    return null;
  }
}

async function zxingReader() {
  const [{ BrowserMultiFormatReader }, { BarcodeFormat, DecodeHintType }] = await Promise.all([import("@zxing/browser"), import("@zxing/library")]);
  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E]);
  hints.set(DecodeHintType.TRY_HARDER, true);
  return new BrowserMultiFormatReader(hints);
}

/** Continuously scans a playing <video> until a barcode is found or stop() is called. */
export async function scanVideo(video: HTMLVideoElement, onCode: (code: string) => void): Promise<{ stop: () => void }> {
  let stopped = false;
  const native = await nativeDetector();
  if (native) {
    const tick = async () => {
      if (stopped) return;
      try {
        const found = await native.detect(video);
        if (found[0]?.rawValue) {
          stopped = true;
          onCode(found[0].rawValue);
          return;
        }
      } catch {
        /* frame not ready */
      }
      setTimeout(tick, 180);
    };
    void tick();
    return { stop: () => (stopped = true) };
  }
  const reader = await zxingReader();
  const controls = await reader.decodeFromVideoElement(video, (result) => {
    if (result && !stopped) {
      stopped = true;
      controls.stop();
      onCode(result.getText());
    }
  });
  return {
    stop: () => {
      stopped = true;
      controls.stop();
    },
  };
}

/** Decodes a barcode from a still photo. */
export async function scanImage(dataUrl: string): Promise<string | null> {
  const native = await nativeDetector();
  if (native) {
    const img = new Image();
    img.src = dataUrl;
    await img.decode();
    const found = await native.detect(img).catch(() => []);
    if (found[0]?.rawValue) return found[0].rawValue;
  }
  try {
    const reader = await zxingReader();
    return (await reader.decodeFromImageUrl(dataUrl)).getText();
  } catch {
    return null;
  }
}
