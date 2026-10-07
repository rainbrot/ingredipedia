import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Barcode,
  Camera,
  Check,
  ClipboardPaste,
  Crop,
  ExternalLink,
  Flashlight,
  Image as ImageIcon,
  Leaf,
  ScanLine,
  Sparkles,
  Undo2,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import { extractIngredientSection, parseIngredients } from "../../shared/parse";
import { SECTORS, type BarcodeProduct, type ScanProgress, type Sector } from "../../shared/types";
import { api, ApiError } from "../lib/api";
import { scanImage, scanVideo } from "../lib/barcode";
import { correctText, inLibrary, loadLexicon, type Correction, type Lexicon } from "../lib/correct";
import { canvasToDataUrl, loadImage, preloadOcr, preprocess, recognize, sharpness, type CropRect } from "../lib/ocr";
import { SAMPLE_LABELS, renderSampleLabel } from "../lib/sampleLabels";
import { useAsync } from "../lib/useAsync";
import { useToast } from "../components/Toast";
import { Segmented } from "../components/ui";
import { SECTOR_ICON } from "../components/sectorIcon";

type Step = "capture" | "barcode" | "camera" | "crop" | "reading" | "review" | "analyzing";

interface OcrInfo {
  corrections: Correction[];
  original: string;
  uncertain: string[];
  confidence: number;
}

export function ScanPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const config = useAsync(() => api.config(), []);

  const initialSector = SECTORS.some((s) => s.id === params.get("sector")) ? (params.get("sector") as Sector) : "food";
  const mode = params.get("mode");
  const [sector, setSector] = useState<Sector>(initialSector);
  const [step, setStep] = useState<Step>(mode === "text" ? "review" : mode === "barcode" ? "barcode" : "capture");
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [product, setProduct] = useState<BarcodeProduct | null>(null);
  const [ocr, setOcr] = useState<OcrInfo | null>(null);
  const [ocrProgress, setOcrProgress] = useState({ fraction: 0, status: "" });
  const [useAiOcr, setUseAiOcr] = useState(true);
  const [analysis, setAnalysis] = useState<ScanProgress[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lexicon, setLexicon] = useState<Lexicon | null>(null);

  useEffect(() => {
    void loadLexicon().then(setLexicon);
  }, []);

  useEffect(() => {
    // Warm up the OCR engine while the user frames the photo.
    if (step === "camera" || step === "crop") preloadOcr();
  }, [step]);

  const startWithImage = (dataUrl: string) => {
    setImage(dataUrl);
    setError(null);
    setStep("crop");
  };

  const runOcr = async (crop: CropRect) => {
    if (!image) return;
    setStep("reading");
    setError(null);
    setOcrProgress({ fraction: 0, status: "Preparing image" });
    try {
      const lex = lexicon ?? (await loadLexicon());
      const img = await loadImage(image);
      const canvas = preprocess(img, crop);
      let recognized = "";
      let info: Omit<OcrInfo, "corrections" | "original"> = { uncertain: [], confidence: 100 };
      if (config.data?.aiOcr && useAiOcr) {
        setOcrProgress({ fraction: 0.35, status: "Reading the label with AI" });
        try {
          const ai = await api.aiOcr(canvasToDataUrl(canvas));
          if (ai.legible && ai.ingredientsText.trim()) {
            recognized = `Ingredients: ${ai.ingredientsText}`;
            if (ai.productName && !name) setName(ai.productName);
          }
        } catch {
          toast("Enhanced reading is unavailable right now, so Assay used on-device OCR.", "info");
        }
      }
      if (!recognized) {
        const vocab = (t: string) => {
          const words = t.toLowerCase().match(/[a-z]{3,}/g) ?? [];
          return words.length ? words.filter((w) => lex.words.has(w)).length / words.length : 0;
        };
        const result = await recognize(
          canvas,
          (fraction, status) => setOcrProgress({ fraction, status: status ? `${status[0].toUpperCase()}${status.slice(1)}` : "Working" }),
          vocab,
        );
        recognized = result.text;
        info = { uncertain: result.uncertain, confidence: result.confidence };
      }
      const section = extractIngredientSection(recognized).replace(/\s*\n\s*/g, " ").trim() || recognized.replace(/\s*\n\s*/g, " ").trim();
      const fixed = correctText(section, lex);
      setText(fixed.text);
      setOcr({ ...info, corrections: fixed.corrections, original: section });
      setProduct(null);
      setStep("review");
      if (!section) toast("No text was found. Try a closer, well-lit photo, or type the list instead.", "info");
    } catch (err) {
      setError((err as Error).message || "Text recognition failed. Try a sharper, well-lit photo.");
      setStep("crop");
    }
  };

  const onProduct = (p: BarcodeProduct) => {
    setProduct(p);
    setSector(p.sector);
    const brandInName = p.brand && p.name.toLowerCase().includes(p.brand.toLowerCase());
    setName((brandInName || !p.brand ? p.name : `${p.brand} ${p.name}`).slice(0, 80));
    setText(p.ingredientsText);
    setOcr(null);
    setImage(null);
    setStep("review");
  };

  const analyze = async () => {
    setStep("analyzing");
    setAnalysis([]);
    setError(null);
    try {
      const scan = await api.analyze(
        { sector, text, name: name.trim() || undefined, barcode: product?.barcode, imageUrl: product?.imageUrl ?? undefined },
        (p) => setAnalysis((all) => [...all, p]),
      );
      navigate(`/product/${scan.id}`, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Analysis failed. Please try again.");
      setStep("review");
    }
  };

  const back = () => {
    const prev: Record<Step, Step | null> = {
      capture: null,
      barcode: "capture",
      camera: "capture",
      crop: "capture",
      reading: "crop",
      review: image ? "crop" : "capture",
      analyzing: null,
    };
    const p = prev[step];
    if (p) setStep(p);
    else navigate(-1);
  };

  return (
    <div className="fade-up scan" style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="row" style={{ marginBottom: 12 }}>
        {step !== "analyzing" && (
          <button className="btn btn-ghost" onClick={back}>
            <ArrowLeft aria-hidden="true" /> Back
          </button>
        )}
      </div>

      {error && step !== "reading" && (
        <div className="callout danger" role="alert" style={{ marginBottom: 16 }}>
          <X aria-hidden="true" />
          <div>{error}</div>
        </div>
      )}

      {step === "capture" && (
        <CaptureStep
          sector={sector}
          setSector={setSector}
          onBarcode={() => setStep("barcode")}
          onCamera={() => setStep("camera")}
          onImage={startWithImage}
          onText={() => {
            setImage(null);
            setProduct(null);
            setOcr(null);
            setStep("review");
          }}
          onSample={(sampleSector, dataUrl, productName) => {
            setSector(sampleSector);
            setName(productName);
            startWithImage(dataUrl);
          }}
        />
      )}
      {step === "barcode" && <BarcodeStep sector={sector} onProduct={onProduct} onPhoto={() => setStep("camera")} />}
      {step === "camera" && <CameraStep onImage={startWithImage} onCancel={() => setStep("capture")} />}
      {step === "crop" && image && (
        <CropStep image={image} aiAvailable={!!config.data?.aiOcr} useAi={useAiOcr} onToggleAi={setUseAiOcr} onRead={runOcr} onRetake={() => setStep("capture")} />
      )}
      {step === "reading" && <ReadingStep progress={ocrProgress} />}
      {step === "review" && (
        <ReviewStep
          text={text}
          setText={setText}
          name={name}
          setName={setName}
          sector={sector}
          setSector={setSector}
          product={product}
          ocr={ocr}
          lexicon={lexicon}
          onUndoCorrections={() => {
            if (!ocr) return;
            setText(ocr.original);
            setOcr({ ...ocr, corrections: [] });
          }}
          onAnalyze={analyze}
          onRetake={() => setStep("capture")}
        />
      )}
      {step === "analyzing" && <AnalyzingStep events={analysis} />}
    </div>
  );
}

// ---------------------------------------------------------------------------

function SectorPicker({ value, onChange }: { value: Sector; onChange: (s: Sector) => void }) {
  return <Segmented label="Product type" options={SECTORS.map((s) => ({ value: s.id, label: s.short }))} value={value} onChange={onChange} />;
}

function CaptureStep({
  sector,
  setSector,
  onBarcode,
  onCamera,
  onImage,
  onText,
  onSample,
}: {
  sector: Sector;
  setSector: (s: Sector) => void;
  onBarcode: () => void;
  onCamera: () => void;
  onImage: (dataUrl: string) => void;
  onText: () => void;
  onSample: (s: Sector, dataUrl: string, name: string) => void;
}) {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("Please choose an image file (JPEG, PNG, HEIC or WebP).", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onImage(String(reader.result));
    reader.onerror = () => toast("Couldn't read that file.", "error");
    reader.readAsDataURL(file);
  };

  return (
    <section aria-labelledby="capture-title" className="stack-lg">
      <div className="page-head" style={{ margin: 0 }}>
        <h1 id="capture-title" className="page-title">
          Scan a product
        </h1>
        <p className="lede">Assay reads the ingredients, explains the chemistry of each one, and scores the product for the way you use it.</p>
      </div>

      <div className="field">
        <span className="label" id="sector-label">
          What kind of product is it?
        </span>
        <SectorPicker value={sector} onChange={setSector} />
      </div>

      <button className="scan-primary" onClick={onBarcode}>
        <span className="sp-art" aria-hidden="true">
          <Barcode />
        </span>
        <span className="grow">
          <span className="sp-title">Scan the barcode</span>
          <span className="sp-desc">Fastest. Looks up the full ingredient list in the open Food, Beauty and Products Facts databases.</span>
        </span>
      </button>

      <div className="scan-secondary">
        <button className="btn btn-lg" onClick={onCamera}>
          <Camera aria-hidden="true" /> Photograph the label
        </button>
        <button className="btn btn-lg" onClick={() => fileRef.current?.click()}>
          <Upload aria-hidden="true" /> Upload a photo
        </button>
        <button className="btn btn-lg" onClick={onText}>
          <ClipboardPaste aria-hidden="true" /> Type or paste
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />

      <section className="samples" aria-labelledby="samples-title">
        <h2 id="samples-title" className="section-title" style={{ fontSize: "var(--text-lg)" }}>
          No product handy?
        </h2>
        <p className="muted small">Try a sample label. It runs through the same text recognition and analysis as a real photo.</p>
        <div className="chip-row">
          {SAMPLE_LABELS.map((s) => {
            const Icon = SECTOR_ICON[s.sector];
            return (
              <button key={s.id} className="chip chip-button" onClick={() => onSample(s.sector, renderSampleLabel(s), s.product)}>
                <Icon aria-hidden="true" /> {s.product}
              </button>
            );
          })}
        </div>
      </section>
    </section>
  );
}

// ---------------------------------------------------------------------------

function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<"idle" | "starting" | "on" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [torch, setTorch] = useState<boolean | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const start = useCallback(async (cancelled: () => boolean) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setState("error");
      setMessage("This browser can't open the camera. Upload a photo instead.");
      return;
    }
    setState("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1440 } },
        audio: false,
      });
      // The step may have closed while the permission prompt was open.
      if (cancelled()) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;
      const track = stream.getVideoTracks()[0];
      const caps = (track.getCapabilities?.() ?? {}) as { torch?: boolean; focusMode?: string[] };
      setTorch(caps.torch ? false : null);
      if (caps.focusMode?.includes("continuous")) void track.applyConstraints({ advanced: [{ focusMode: "continuous" } as MediaTrackConstraintSet] }).catch(() => undefined);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
      setState("on");
    } catch (err) {
      if (cancelled()) return;
      const denied = (err as DOMException)?.name === "NotAllowedError";
      setState("error");
      setMessage(denied ? "Camera access was blocked. Allow it in your browser settings, or upload a photo instead." : "No camera was found. Upload a photo instead.");
    }
  }, []);

  const toggleTorch = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track || torch === null) return;
    try {
      await track.applyConstraints({ advanced: [{ torch: !torch } as MediaTrackConstraintSet] });
      setTorch(!torch);
    } catch {
      setTorch(null);
    }
  };

  useEffect(() => {
    let cancelled = false;
    void start(() => cancelled);
    return () => {
      cancelled = true;
      stop();
    };
  }, [start, stop]);

  return { videoRef, state, message, torch, toggleTorch, stop };
}

function CameraStep({ onImage, onCancel }: { onImage: (dataUrl: string) => void; onCancel: () => void }) {
  const cam = useCamera();
  const [busy, setBusy] = useState(false);

  /** Grabs several frames and keeps the sharpest, so a slight hand shake doesn't ruin the read. */
  const capture = async () => {
    const video = cam.videoRef.current;
    if (!video || !video.videoWidth || busy) return;
    setBusy(true);
    let best: { canvas: HTMLCanvasElement; score: number } | null = null;
    for (let i = 0; i < 6; i++) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")!.drawImage(video, 0, 0);
      const score = sharpness(canvas, canvas.width, canvas.height);
      if (!best || score > best.score) best = { canvas, score };
      await new Promise((r) => setTimeout(r, 90));
    }
    cam.stop();
    onImage(best!.canvas.toDataURL("image/jpeg", 0.92));
  };

  return (
    <section aria-labelledby="camera-title" className="stack">
      <div className="page-head" style={{ margin: 0 }}>
        <h1 id="camera-title" className="page-title">
          Photograph the label
        </h1>
        <p className="lede">Hold the package flat, fill the frame with the ingredient list, and tilt it to avoid glare.</p>
      </div>
      {cam.state === "error" ? (
        <div className="callout danger" role="alert">
          <X aria-hidden="true" />
          <div className="grow">{cam.message}</div>
          <button className="btn btn-sm" onClick={onCancel}>
            Other options
          </button>
        </div>
      ) : (
        <div className="viewfinder" data-busy={busy}>
          <video ref={cam.videoRef} playsInline muted aria-label="Camera preview" />
          <div className="frame" aria-hidden="true" />
          <p className="frame-hint" aria-live="polite">
            {busy ? "Hold steady…" : cam.state === "on" ? "Fit the ingredient list inside the frame" : "Starting camera…"}
          </p>
          <button className="shutter" onClick={capture} aria-label="Take photo" disabled={cam.state !== "on" || busy} />
          {cam.torch !== null && (
            <button className="icon-btn vf-btn vf-left" onClick={cam.toggleTorch} aria-pressed={cam.torch} aria-label="Flashlight">
              <Flashlight aria-hidden="true" />
            </button>
          )}
          <button className="icon-btn vf-btn vf-right" onClick={onCancel} aria-label="Close camera">
            <X aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------

function BarcodeStep({ sector, onProduct, onPhoto }: { sector: Sector; onProduct: (p: BarcodeProduct) => void; onPhoto: () => void }) {
  const cam = useCamera();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [manual, setManual] = useState("");
  const [lookup, setLookup] = useState<{ state: "idle" | "looking" | "missing"; code?: string; message?: string }>({ state: "idle" });

  const stopCamera = cam.stop;
  const find = async (code: string) => {
    const digits = code.replace(/\D/g, "");
    setLookup({ state: "looking", code: digits });
    try {
      const p = await api.barcode(digits, sector);
      stopCamera();
      onProduct(p);
    } catch (err) {
      setLookup({ state: "missing", code: digits, message: err instanceof ApiError ? err.message : "Lookup failed. Check your connection." });
    }
  };
  const findRef = useRef(find);
  findRef.current = find;

  // Start decoding as soon as the camera is live; pause while a lookup is showing.
  useEffect(() => {
    const video = cam.videoRef.current;
    if (cam.state !== "on" || !video || lookup.state !== "idle") return;
    let cancelled = false;
    let scanner: { stop: () => void } | null = null;
    void scanVideo(video, (code) => {
      if (cancelled) return;
      navigator.vibrate?.(40);
      void findRef.current(code);
    }).then((s) => {
      if (cancelled) s.stop();
      else scanner = s;
    });
    return () => {
      cancelled = true;
      scanner?.stop();
    };
  }, [cam.state, cam.videoRef, lookup.state]);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const code = await scanImage(String(reader.result));
      if (code) void find(code);
      else toast("No barcode found in that photo. Try a closer, straight-on shot, or type the digits.", "error");
    };
    reader.readAsDataURL(file);
  };

  return (
    <section aria-labelledby="barcode-title" className="stack">
      <div className="page-head" style={{ margin: 0 }}>
        <h1 id="barcode-title" className="page-title">
          Scan the barcode
        </h1>
        <p className="lede">Line up the barcode inside the frame. Assay detects it automatically.</p>
      </div>

      {cam.state === "error" ? (
        <div className="callout" role="status">
          <Barcode aria-hidden="true" />
          <div>{cam.message} You can also type the digits printed under the barcode.</div>
        </div>
      ) : (
        <div className="viewfinder barcode" data-state={lookup.state}>
          <video ref={cam.videoRef} playsInline muted aria-label="Camera preview" />
          <div className="frame wide" aria-hidden="true">
            <span className="laser" />
          </div>
          <p className="frame-hint" aria-live="polite">
            {lookup.state === "looking" ? `Found ${lookup.code}. Looking it up…` : cam.state === "on" ? "Searching for a barcode…" : "Starting camera…"}
          </p>
          {cam.torch !== null && (
            <button className="icon-btn vf-btn vf-left" onClick={cam.toggleTorch} aria-pressed={cam.torch} aria-label="Flashlight">
              <Flashlight aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {lookup.state === "missing" && (
        <div className="callout warn" role="alert">
          <Barcode aria-hidden="true" />
          <div className="grow">
            <strong>{lookup.code}</strong>: {lookup.message}
          </div>
          <div className="row-wrap">
            <button className="btn btn-sm btn-primary" onClick={onPhoto}>
              <Camera aria-hidden="true" /> Photograph the label
            </button>
            <button className="btn btn-sm" onClick={() => setLookup({ state: "idle" })}>
              Scan again
            </button>
          </div>
        </div>
      )}

      <form
        className="barcode-manual"
        onSubmit={(e) => {
          e.preventDefault();
          if (manual.replace(/\D/g, "").length >= 8) void find(manual);
        }}
      >
        <div className="field grow">
          <label className="label" htmlFor="barcode-digits">
            Or type the barcode number
          </label>
          <input
            id="barcode-digits"
            className="input mono"
            inputMode="numeric"
            pattern="[0-9 ]*"
            maxLength={18}
            value={manual}
            onChange={(e) => setManual(e.target.value.replace(/[^\d ]/g, ""))}
            placeholder="e.g. 3017620422003"
            aria-describedby="barcode-hint"
          />
          <span className="hint" id="barcode-hint">
            8 to 14 digits, printed under the bars.
          </span>
        </div>
        <button type="submit" className="btn btn-primary" disabled={manual.replace(/\D/g, "").length < 8 || lookup.state === "looking"}>
          Look up
        </button>
      </form>
      <button className="btn btn-ghost" style={{ alignSelf: "flex-start" }} onClick={() => fileRef.current?.click()}>
        <ImageIcon aria-hidden="true" /> Read a barcode from a photo
      </button>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => void onFile(e.target.files?.[0])} />
    </section>
  );
}

// ---------------------------------------------------------------------------

function CropStep({
  image,
  aiAvailable,
  useAi,
  onToggleAi,
  onRead,
  onRetake,
}: {
  image: string;
  aiAvailable: boolean;
  useAi: boolean;
  onToggleAi: (v: boolean) => void;
  onRead: (crop: CropRect) => void;
  onRetake: () => void;
}) {
  const [rect, setRect] = useState<CropRect>({ x: 0.04, y: 0.04, w: 0.92, h: 0.92 });
  const stage = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ mode: string; startX: number; startY: number; start: CropRect } | null>(null);
  const [box, setBox] = useState({ left: 0, top: 0, width: 0, height: 0 });

  const measure = useCallback(() => {
    const img = imgRef.current;
    const st = stage.current;
    if (!img || !st) return;
    const ir = img.getBoundingClientRect();
    const sr = st.getBoundingClientRect();
    setBox({ left: ir.left - sr.left, top: ir.top - sr.top, width: ir.width, height: ir.height });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const clamp = (r: CropRect): CropRect => {
    const w = Math.min(1, Math.max(0.08, r.w));
    const h = Math.min(1, Math.max(0.06, r.h));
    return { x: Math.min(1 - w, Math.max(0, r.x)), y: Math.min(1 - h, Math.max(0, r.y)), w, h };
  };

  const onPointerDown = (mode: string) => (e: ReactPointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    drag.current = { mode, startX: e.clientX, startY: e.clientY, start: rect };
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    const d = drag.current;
    if (!d || !box.width) return;
    const dx = (e.clientX - d.startX) / box.width;
    const dy = (e.clientY - d.startY) / box.height;
    const s = d.start;
    let next: CropRect = s;
    if (d.mode === "move") next = { ...s, x: s.x + dx, y: s.y + dy };
    if (d.mode === "nw") next = { x: s.x + dx, y: s.y + dy, w: s.w - dx, h: s.h - dy };
    if (d.mode === "ne") next = { x: s.x, y: s.y + dy, w: s.w + dx, h: s.h - dy };
    if (d.mode === "sw") next = { x: s.x + dx, y: s.y, w: s.w - dx, h: s.h + dy };
    if (d.mode === "se") next = { x: s.x, y: s.y, w: s.w + dx, h: s.h + dy };
    setRect(clamp(next));
  };

  const onKey = (e: ReactKeyboardEvent) => {
    const step = 0.02;
    const map: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const delta = map[e.key];
    if (!delta) return;
    e.preventDefault();
    setRect((r) => clamp(e.shiftKey ? { ...r, w: r.w + delta[0], h: r.h + delta[1] } : { ...r, x: r.x + delta[0], y: r.y + delta[1] }));
  };

  return (
    <section aria-labelledby="crop-title" className="stack">
      <div className="page-head" style={{ margin: 0 }}>
        <h1 id="crop-title" className="page-title">
          Frame the ingredients
        </h1>
        <p className="lede">Drag the box around just the ingredient list. Cropping out other text makes recognition faster and more accurate.</p>
      </div>
      <div ref={stage} className="crop-stage" onPointerMove={onPointerMove} onPointerUp={() => (drag.current = null)} onPointerCancel={() => (drag.current = null)}>
        <img ref={imgRef} src={image} alt="Captured label" onLoad={measure} draggable={false} />
        {box.width > 0 && (
          <div
            className="crop-box"
            role="slider"
            tabIndex={0}
            aria-label="Crop area. Use arrow keys to move, Shift plus arrow keys to resize."
            aria-valuetext={`${Math.round(rect.w * 100)}% by ${Math.round(rect.h * 100)}% of the image`}
            onKeyDown={onKey}
            onPointerDown={onPointerDown("move")}
            style={{ left: box.left + rect.x * box.width, top: box.top + rect.y * box.height, width: rect.w * box.width, height: rect.h * box.height }}
          >
            {(["nw", "ne", "sw", "se"] as const).map((h) => (
              <span key={h} className="crop-handle" data-h={h} onPointerDown={onPointerDown(h)} aria-hidden="true" />
            ))}
          </div>
        )}
      </div>

      {aiAvailable && (
        <label className="callout info" style={{ cursor: "pointer", alignItems: "center" }}>
          <WandSparkles aria-hidden="true" />
          <span className="grow">
            <strong>Enhanced AI reading</strong>
            <br />
            <span className="small">More accurate on curved or glossy packaging. Sends the cropped image to the Assay server.</span>
          </span>
          <input type="checkbox" checked={useAi} onChange={(e) => onToggleAi(e.target.checked)} className="check-lg" />
        </label>
      )}

      <div className="row-wrap">
        <button className="btn btn-primary btn-lg" onClick={() => onRead(rect)}>
          <ScanLine aria-hidden="true" /> Read ingredients
        </button>
        <button className="btn btn-lg" onClick={() => onRead({ x: 0, y: 0, w: 1, h: 1 })}>
          <Crop aria-hidden="true" /> Use whole image
        </button>
        <button className="btn btn-ghost btn-lg" onClick={onRetake}>
          <ImageIcon aria-hidden="true" /> Retake
        </button>
      </div>
    </section>
  );
}

function ReadingStep({ progress }: { progress: { fraction: number; status: string } }) {
  const pct = Math.round(progress.fraction * 100);
  return (
    <section className="card card-pad stack" aria-live="polite" aria-busy="true">
      <div className="row">
        <span className="spinner" style={{ color: "var(--primary)" }} aria-hidden="true" />
        <h1 className="section-title">Reading the label…</h1>
      </div>
      <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Text recognition progress">
        <span style={{ transform: `scaleX(${Math.max(4, pct) / 100})` }} />
      </div>
      <p className="muted small">
        {progress.status || "Starting"}. Text recognition runs on your device; the photo never leaves it. The first scan downloads the language model (about 10 MB).
      </p>
    </section>
  );
}

function ReviewStep({
  text,
  setText,
  name,
  setName,
  sector,
  setSector,
  product,
  ocr,
  lexicon,
  onUndoCorrections,
  onAnalyze,
  onRetake,
}: {
  text: string;
  setText: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  sector: Sector;
  setSector: (s: Sector) => void;
  product: BarcodeProduct | null;
  ocr: OcrInfo | null;
  lexicon: Lexicon | null;
  onUndoCorrections: () => void;
  onAnalyze: () => void;
  onRetake: () => void;
}) {
  const parsed = useMemo(() => parseIngredients(text), [text]);
  const organic = parsed.filter((p) => p.labeledOrganic).length;
  const known = lexicon ? parsed.filter((p) => inLibrary([p.key, ...p.alt], lexicon)).length : null;
  const uncertain = useMemo(() => {
    if (!ocr) return [];
    const inText = text.toLowerCase();
    return [...new Set(ocr.uncertain.map((w) => w.replace(/[^\p{L}\p{N}-]/gu, "")).filter((w) => w.length >= 3 && inText.includes(w.toLowerCase())))].slice(0, 12);
  }, [ocr, text]);

  return (
    <section aria-labelledby="review-title" className="stack">
      <div className="page-head" style={{ margin: 0 }}>
        <h1 id="review-title" className="page-title">
          Check the ingredients
        </h1>
        <p className="lede">
          {product
            ? "Here's the ingredient list on file for this product. Compare it with your package; recipes sometimes change."
            : ocr
              ? "Here's what Assay read from the label. Fix any misread words before analyzing."
              : "Paste or type the ingredient list exactly as it appears on the package."}
        </p>
      </div>

      {product && (
        <div className="found-product">
          {product.imageUrl ? <img src={product.imageUrl} alt="" /> : <span className="fp-blank" aria-hidden="true"><Barcode /></span>}
          <div className="grow">
            <strong>{product.name}</strong>
            <span>{[product.brand, product.barcode].filter(Boolean).join(" · ")}</span>
            <a href={product.sourceUrl} target="_blank" rel="noreferrer" className="small">
              Data from {product.source} <ExternalLink className="inline-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}

      {ocr && ocr.corrections.length > 0 && (
        <div className="callout info">
          <Sparkles aria-hidden="true" />
          <div className="grow">
            <strong>
              Fixed {ocr.corrections.length} likely misread word{ocr.corrections.length === 1 ? "" : "s"}:
            </strong>{" "}
            {ocr.corrections.slice(0, 6).map((c, i) => (
              <span key={i} className="fix">
                <s>{c.from}</s> → {c.to}
                {i < Math.min(ocr.corrections.length, 6) - 1 ? ", " : ""}
              </span>
            ))}
            {ocr.corrections.length > 6 && ` and ${ocr.corrections.length - 6} more`}
          </div>
          <button className="btn btn-sm btn-ghost" onClick={onUndoCorrections}>
            <Undo2 aria-hidden="true" /> Undo
          </button>
        </div>
      )}

      {uncertain.length > 0 && (
        <p className="uncertain small">
          <span className="muted">Double-check these words; the text was faint:</span>{" "}
          {uncertain.map((w) => (
            <mark key={w}>{w}</mark>
          ))}
        </p>
      )}

      <div className="field">
        <label className="label" htmlFor="ingredient-text">
          Ingredient list
        </label>
        <textarea
          id="ingredient-text"
          className="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ingredients: Water, Glycerin, Citric Acid…"
          aria-describedby="ingredient-hint"
          spellCheck={false}
        />
        <span id="ingredient-hint" className="hint">
          Separate ingredients with commas. Mark organic ingredients with “organic” or an asterisk footnote (e.g. “Sugar*, *Organic”).
        </span>
      </div>

      <div className="review-meta">
        <div className="field grow">
          <label className="label" htmlFor="product-name">
            Product name <span className="subtle">(optional)</span>
          </label>
          <input id="product-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Berry Fruit Snacks" maxLength={80} autoComplete="off" />
        </div>
        <div className="field">
          <span className="label">Product type</span>
          <SectorPicker value={sector} onChange={setSector} />
        </div>
      </div>

      {parsed.length > 0 && (
        <div className="card card-pad stack" style={{ gap: 12 }}>
          <div className="row between" style={{ flexWrap: "wrap" }}>
            <strong>
              {parsed.length} ingredient{parsed.length === 1 ? "" : "s"} found
            </strong>
            <div className="chip-row">
              {known != null && (
                <span className="chip">
                  <Check aria-hidden="true" /> {known} in the library
                </span>
              )}
              {organic > 0 && (
                <span className="chip organic">
                  <Leaf aria-hidden="true" /> {organic} labeled organic
                </span>
              )}
            </div>
          </div>
          <div className="token-preview">
            {parsed.map((p) => {
              const isKnown = lexicon ? inLibrary([p.key, ...p.alt], lexicon) : true;
              return (
                <span key={p.position} className={`token ${p.labeledOrganic ? "organic" : ""} ${isKnown ? "" : "new"}`} title={isKnown ? "Has a profile in the library" : "New: Assay will research it automatically"}>
                  {p.name}
                </span>
              );
            })}
          </div>
          {known != null && known < parsed.length && (
            <p className="hint">Dashed ingredients are new to Assay. They'll get an instant preliminary profile, then automatic research from PubChem and PubMed.</p>
          )}
        </div>
      )}

      <div className="row-wrap">
        <button className="btn btn-primary btn-lg" disabled={parsed.length === 0} onClick={onAnalyze}>
          <Check aria-hidden="true" /> Analyze {parsed.length || ""} ingredient{parsed.length === 1 ? "" : "s"}
        </button>
        <button className="btn btn-ghost btn-lg" onClick={onRetake}>
          <Camera aria-hidden="true" /> Scan something else
        </button>
      </div>
    </section>
  );
}

const STAGES: { id: "parse" | "match" | "draft" | "score"; label: string }[] = [
  { id: "parse", label: "Parsing the ingredient list" },
  { id: "match", label: "Matching ingredients to the library" },
  { id: "draft", label: "Building profiles for new ingredients" },
  { id: "score", label: "Scoring the product" },
];

function AnalyzingStep({ events }: { events: ScanProgress[] }) {
  const progress = events.filter((e): e is Extract<ScanProgress, { type: "progress" }> => e.type === "progress");
  const last = progress[progress.length - 1];
  const reached = new Set(progress.map((p) => p.stage));
  const activeIndex = last ? STAGES.findIndex((s) => s.id === last.stage) : 0;
  return (
    <section className="card card-pad stack" aria-live="polite" aria-busy="true">
      <h1 className="section-title">Analyzing your product</h1>
      <ol className="pipeline">
        {STAGES.map((s, i) => {
          const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "pending";
          const skipped = s.id === "draft" && !reached.has("draft") && activeIndex > i;
          return (
            <li key={s.id} data-state={state}>
              <span className="dot" aria-hidden="true">
                {state === "done" && <Check />}
              </span>
              <span className="grow">
                {s.label}
                {skipped && <span className="subtle"> · every ingredient was already known</span>}
              </span>
            </li>
          );
        })}
      </ol>
      {last && <p className="muted small">{last.message}</p>}
      {last?.stage === "draft" && last.total > 0 && (
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={last.total} aria-valuenow={last.done} aria-label="New ingredient profiles">
          <span style={{ transform: `scaleX(${Math.max(0.06, last.done / last.total)})` }} />
        </div>
      )}
    </section>
  );
}
