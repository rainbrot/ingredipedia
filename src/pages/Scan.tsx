import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Camera, Check, ClipboardPaste, Crop, Image as ImageIcon, Leaf, ScanLine, Upload, WandSparkles, X } from "lucide-react";
import { extractIngredientSection, parseIngredients } from "../../shared/parse";
import { SECTORS, type ScanProgress, type Sector } from "../../shared/types";
import { api, ApiError } from "../lib/api";
import { canvasToDataUrl, loadImage, preloadOcr, preprocess, recognize, type CropRect } from "../lib/ocr";
import { SAMPLE_LABELS, renderSampleLabel } from "../lib/sampleLabels";
import { useAsync } from "../lib/useAsync";
import { useToast } from "../components/Toast";
import { SECTOR_ICON } from "./Home";

type Step = "sector" | "capture" | "crop" | "reading" | "review" | "analyzing";
const STEP_ORDER: Step[] = ["sector", "capture", "crop", "reading", "review", "analyzing"];

export function ScanPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const config = useAsync(() => api.config(), []);

  const initialSector = SECTORS.some((s) => s.id === params.get("sector")) ? (params.get("sector") as Sector) : null;
  const textMode = params.get("mode") === "text";
  const [sector, setSector] = useState<Sector | null>(initialSector);
  const [step, setStep] = useState<Step>(initialSector ? (textMode ? "review" : "capture") : "sector");
  const [pendingText, setPendingText] = useState(textMode);
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState("");
  const [name, setName] = useState("");
  const [ocrProgress, setOcrProgress] = useState({ fraction: 0, status: "" });
  const [useAiOcr, setUseAiOcr] = useState(true);
  const [analysis, setAnalysis] = useState<ScanProgress[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Warm up the OCR engine while the user frames the photo.
    if (step === "capture") preloadOcr();
  }, [step]);

  const chooseSector = (s: Sector) => {
    setSector(s);
    setStep(pendingText ? "review" : "capture");
  };

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
      const img = await loadImage(image);
      const canvas = preprocess(img, crop);
      let recognized = "";
      if (config.data?.aiOcr && useAiOcr) {
        setOcrProgress({ fraction: 0.35, status: "Reading the label with AI" });
        try {
          const ai = await api.aiOcr(canvasToDataUrl(canvas));
          if (ai.legible && ai.ingredientsText.trim()) {
            recognized = `Ingredients: ${ai.ingredientsText}`;
            if (ai.productName && !name) setName(ai.productName);
          }
        } catch {
          toast("Enhanced reading is unavailable right now, so we used on-device OCR.", "info");
        }
      }
      if (!recognized) {
        const result = await recognize(canvas, (fraction, status) =>
          setOcrProgress({ fraction, status: status === "recognizing text" ? "Recognizing text" : status ? `${status[0].toUpperCase()}${status.slice(1)}` : "Working" }),
        );
        recognized = result.text;
      }
      setFullText(recognized);
      const section = extractIngredientSection(recognized).replace(/\s*\n\s*/g, " ").trim();
      setText(section || recognized.trim());
      setStep("review");
      if (!section) toast("We couldn't find an “Ingredients” heading. Check the text below.", "info");
    } catch (err) {
      setError((err as Error).message || "Text recognition failed. Try a sharper, well-lit photo.");
      setStep("crop");
    }
  };

  const analyze = async () => {
    if (!sector) return;
    setStep("analyzing");
    setAnalysis([]);
    setError(null);
    try {
      const scan = await api.analyze({ sector, text, name: name.trim() || undefined }, (p) => setAnalysis((all) => [...all, p]));
      navigate(`/product/${scan.id}`, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Analysis failed. Please try again.");
      setStep("review");
    }
  };

  const back = () => {
    const prev: Record<Step, Step | null> = { sector: null, capture: "sector", crop: "capture", reading: "crop", review: image ? "crop" : "capture", analyzing: null };
    const p = prev[step];
    if (p) setStep(p);
    else navigate(-1);
  };

  const progressIndex = STEP_ORDER.indexOf(step);

  return (
    <div className="fade-up" style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="row" style={{ marginBottom: 12 }}>
        {step !== "analyzing" && (
          <button className="btn btn-ghost" onClick={back}>
            <ArrowLeft aria-hidden="true" /> Back
          </button>
        )}
        <div className="grow" />
        {sector && step !== "sector" && step !== "analyzing" && (
          <button className="chip chip-button" onClick={() => setStep("sector")} aria-label={`Category: ${SECTORS.find((s) => s.id === sector)!.label}. Change category`}>
            {(() => {
              const Icon = SECTOR_ICON[sector];
              return <Icon aria-hidden="true" />;
            })()}
            {SECTORS.find((s) => s.id === sector)!.label}
          </button>
        )}
      </div>

      <div className="stepper" aria-hidden="true">
        {["sector", "capture", "review", "analyzing"].map((s) => (
          <span key={s} data-done={progressIndex >= STEP_ORDER.indexOf(s as Step)} />
        ))}
      </div>

      {error && step !== "reading" && (
        <div className="callout danger" role="alert" style={{ marginBottom: 16 }}>
          <X aria-hidden="true" />
          <div>{error}</div>
        </div>
      )}

      {step === "sector" && <SectorStep value={sector} onChoose={chooseSector} />}
      {step === "capture" && (
        <CaptureStep
          onImage={startWithImage}
          onText={() => {
            setImage(null);
            setPendingText(true);
            setStep("review");
          }}
          onSample={(sampleSector, dataUrl, productName) => {
            setSector(sampleSector);
            setName(productName);
            startWithImage(dataUrl);
          }}
        />
      )}
      {step === "crop" && image && (
        <CropStep image={image} aiAvailable={!!config.data?.aiOcr} useAi={useAiOcr} onToggleAi={setUseAiOcr} onRead={runOcr} onRetake={() => setStep("capture")} />
      )}
      {step === "reading" && <ReadingStep progress={ocrProgress} />}
      {step === "review" && (
        <ReviewStep text={text} setText={setText} fullText={fullText} name={name} setName={setName} onAnalyze={analyze} onRetake={() => setStep("capture")} />
      )}
      {step === "analyzing" && <AnalyzingStep events={analysis} />}
    </div>
  );
}

// ---------------------------------------------------------------------------

function SectorStep({ value, onChoose }: { value: Sector | null; onChoose: (s: Sector) => void }) {
  return (
    <section aria-labelledby="sector-title" className="stack">
      <div className="page-head" style={{ margin: 0 }}>
        <h1 id="sector-title" className="page-title">
          What are you scanning?
        </h1>
        <p className="lede">Assay weighs ingredients differently for things you eat, put on your skin, or clean with.</p>
      </div>
      <div className="stack" style={{ gap: 12 }}>
        {SECTORS.map((s) => {
          const Icon = SECTOR_ICON[s.id];
          return (
            <button key={s.id} className="sector-card" aria-pressed={value === s.id} onClick={() => onChoose(s.id)}>
              <span className="sector-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="grow">
                <span className="title">{s.label}</span>
                <br />
                <span className="desc">
                  {s.id === "food" ? "Snacks, drinks, sauces, supplements" : s.id === "beauty" ? "Skincare, hair care, makeup, sunscreen" : "Sprays, detergents, dish soap, bleach"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function CaptureStep({ onImage, onText, onSample }: { onImage: (dataUrl: string) => void; onText: () => void; onSample: (s: Sector, dataUrl: string, name: string) => void }) {
  const toast = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraFileRef = useRef<HTMLInputElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  }, []);

  useEffect(() => stopCamera, [stopCamera]);

  const startCamera = async () => {
    setCameraError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      cameraFileRef.current?.click();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false });
      streamRef.current = stream;
      setCameraOn(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      });
    } catch (err) {
      const denied = (err as DOMException)?.name === "NotAllowedError";
      setCameraError(denied ? "Camera access was blocked. Allow it in your browser settings, or upload a photo instead." : "No camera was found. Upload a photo instead.");
    }
  };

  const capture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")!.drawImage(video, 0, 0);
    stopCamera();
    onImage(canvas.toDataURL("image/jpeg", 0.92));
  };

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
    <section aria-labelledby="capture-title" className="stack">
      <div className="page-head" style={{ margin: 0 }}>
        <h1 id="capture-title" className="page-title">
          Capture the ingredient list
        </h1>
        <p className="lede">Hold the label flat, fill the frame with the ingredient list, and avoid glare.</p>
      </div>

      {cameraOn ? (
        <div className="viewfinder">
          <video ref={videoRef} playsInline muted aria-label="Camera preview" />
          <div className="frame" aria-hidden="true" />
          <p className="frame-hint">Fit the ingredient list inside the frame</p>
          <button className="shutter" onClick={capture} aria-label="Take photo" />
          <button className="icon-btn" onClick={stopCamera} aria-label="Close camera" style={{ position: "absolute", top: 10, right: 10, color: "#fff", background: "rgba(0,0,0,.35)" }}>
            <X aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="capture-options">
          <button className="option-card" onClick={startCamera}>
            <Camera aria-hidden="true" />
            <span className="title">Use camera</span>
            <span className="desc">Snap the label with your device camera</span>
          </button>
          <button className="option-card" onClick={() => fileRef.current?.click()}>
            <Upload aria-hidden="true" />
            <span className="title">Upload a photo</span>
            <span className="desc">Pick an existing picture of a label</span>
          </button>
          <button className="option-card" onClick={onText}>
            <ClipboardPaste aria-hidden="true" />
            <span className="title">Type or paste</span>
            <span className="desc">Enter the ingredient list as text</span>
          </button>
        </div>
      )}
      {cameraError && (
        <p className="error-text" role="alert">
          {cameraError}
        </p>
      )}
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      <input ref={cameraFileRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => onFile(e.target.files?.[0])} />

      <div className="card card-pad stack" style={{ gap: 12 }}>
        <div>
          <h2 className="section-title" style={{ fontSize: "var(--text-lg)" }}>
            No product handy?
          </h2>
          <p className="muted" style={{ fontSize: "var(--text-sm)", marginTop: 4 }}>
            Try a sample label. It runs through the same OCR and analysis pipeline as a real photo.
          </p>
        </div>
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
      </div>
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
        <p className="lede">Drag the box around the ingredient list. Cropping out other text makes recognition faster and more accurate.</p>
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
            <span style={{ fontSize: "var(--text-sm)" }}>More accurate on curved or glossy packaging. Sends the cropped image to our server.</span>
          </span>
          <input type="checkbox" checked={useAi} onChange={(e) => onToggleAi(e.target.checked)} style={{ width: 22, height: 22, accentColor: "var(--primary)" }} />
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
      <p className="muted" style={{ fontSize: "var(--text-sm)" }}>
        {progress.status || "Starting"} · on-device text recognition. The first scan downloads the language model (about 10 MB).
      </p>
    </section>
  );
}

function ReviewStep({
  text,
  setText,
  fullText,
  name,
  setName,
  onAnalyze,
  onRetake,
}: {
  text: string;
  setText: (v: string) => void;
  fullText: string;
  name: string;
  setName: (v: string) => void;
  onAnalyze: () => void;
  onRetake: () => void;
}) {
  const parsed = useMemo(() => parseIngredients(text), [text]);
  const organic = parsed.filter((p) => p.labeledOrganic).length;
  return (
    <section aria-labelledby="review-title" className="stack">
      <div className="page-head" style={{ margin: 0 }}>
        <h1 id="review-title" className="page-title">
          Check the ingredients
        </h1>
        <p className="lede">{fullText ? "Here's what we read from the label. Fix any misread words before analyzing." : "Paste or type the ingredient list exactly as it appears on the package."}</p>
      </div>

      <div className="field">
        <label className="label" htmlFor="product-name">
          Product name <span className="subtle">(optional)</span>
        </label>
        <input id="product-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Berry Fruit Snacks" maxLength={80} autoComplete="off" />
      </div>

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

      {parsed.length > 0 && (
        <div className="card card-pad stack" style={{ gap: 12 }}>
          <div className="row between">
            <strong>
              {parsed.length} ingredient{parsed.length === 1 ? "" : "s"} detected
            </strong>
            {organic > 0 && (
              <span className="chip organic">
                <Leaf aria-hidden="true" /> {organic} labeled organic
              </span>
            )}
          </div>
          <div className="token-preview">
            {parsed.map((p) => (
              <span key={p.position} className={`token ${p.labeledOrganic ? "organic" : ""}`}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="row-wrap">
        <button className="btn btn-primary btn-lg" disabled={parsed.length === 0} onClick={onAnalyze}>
          <Check aria-hidden="true" /> Analyze {parsed.length || ""} ingredient{parsed.length === 1 ? "" : "s"}
        </button>
        <button className="btn btn-ghost btn-lg" onClick={onRetake}>
          <Camera aria-hidden="true" /> Scan instead
        </button>
      </div>
    </section>
  );
}

const STAGES: { id: "parse" | "match" | "draft" | "score"; label: string }[] = [
  { id: "parse", label: "Parsing the ingredient list" },
  { id: "match", label: "Checking the Assay database" },
  { id: "draft", label: "Drafting profiles for new ingredients (PubChem + AI)" },
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
          const state = i < activeIndex || (reached.has(s.id) && i < activeIndex) ? "done" : i === activeIndex ? "active" : "pending";
          const skipped = s.id === "draft" && !reached.has("draft") && activeIndex > i;
          return (
            <li key={s.id} data-state={state}>
              <span className="dot" aria-hidden="true">
                {state === "done" && <Check />}
              </span>
              <span className="grow">
                {s.label}
                {skipped && <span className="subtle"> · nothing new to draft</span>}
              </span>
            </li>
          );
        })}
      </ol>
      {last && <p className="muted" style={{ fontSize: "var(--text-sm)" }}>{last.message}</p>}
      {last?.stage === "draft" && last.total > 0 && (
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={last.total} aria-valuenow={last.done} aria-label="New ingredient drafts">
          <span style={{ transform: `scaleX(${Math.max(0.06, last.done / last.total)})` }} />
        </div>
      )}
    </section>
  );
}
