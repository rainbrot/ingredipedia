import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { BadgeCheck, ChevronDown, CircleHelp, FlaskConical, Hourglass, Leaf, Mountain, TriangleAlert, WandSparkles, X } from "lucide-react";
import { formulaParts } from "../../shared/formula";
import { gradeFor, ORIGIN_LABEL, type Grade, type IngredientSummary, type Origin } from "../../shared/types";

export type Tone = "excellent" | "good" | "fair" | "poor" | "bad" | "none";

export function toneFor(score: number | null | undefined): Tone {
  if (score == null) return "none";
  const g: Grade = gradeFor(score);
  return g.toLowerCase() as Tone;
}

export function ScorePill({ score, size, label }: { score: number | null; size?: "sm"; label?: string }) {
  const tone = toneFor(score);
  return (
    <span className={`score-pill tone-${tone} ${size ?? ""}`} aria-label={label ?? (score == null ? "No score" : `Health score ${score} out of 100, ${gradeFor(score)}`)} role="img">
      {score ?? "–"}
    </span>
  );
}

/** Animated circular score gauge. */
export function ScoreRing({ score, size = 176, stroke = 14, caption = "out of 100" }: { score: number; size?: number; stroke?: number; caption?: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(score));
    return () => cancelAnimationFrame(id);
  }, [score]);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const tone = toneFor(score);
  return (
    <div className={`score-ring tone-${tone}`} style={{ width: size, height: size }} role="img" aria-label={`Health score ${score} out of 100, ${gradeFor(score)}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="track" cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} />
        <circle
          className="value"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown / 100)}
        />
      </svg>
      <div className="center" aria-hidden="true">
        <span className="num" style={{ fontSize: size * 0.34 }}>
          {score}
        </span>
        <span className="of">{caption}</span>
      </div>
    </div>
  );
}

export function GradeLabel({ score }: { score: number }) {
  return <span className={`grade tone-${toneFor(score)}`}>{gradeFor(score)}</span>;
}

export function StatusChip({ ing }: { ing: Pick<IngredientSummary, "status" | "researchState"> }) {
  if (ing.status === "verified") {
    return (
      <span className="chip verified">
        <BadgeCheck aria-hidden="true" /> Verified
      </span>
    );
  }
  return (
    <span className="chip draft" title="Generated automatically and shown only to you until a scientist verifies it">
      <WandSparkles aria-hidden="true" /> Basic AI Draft
    </span>
  );
}

export function ResearchChip({ state }: { state: IngredientSummary["researchState"] }) {
  if (!state || state === "complete") return null;
  const label = state === "failed" ? "Research retrying" : state === "running" ? "Researching…" : "Research queued";
  return (
    <span className="chip">
      <Hourglass aria-hidden="true" /> {label}
    </span>
  );
}

export function OriginChip({ origin, organic }: { origin: Origin; organic?: boolean }) {
  if (organic) {
    return (
      <span className="chip organic">
        <Leaf aria-hidden="true" /> Certified organic
      </span>
    );
  }
  if (origin === "natural") {
    return (
      <span className="chip organic">
        <Leaf aria-hidden="true" /> {ORIGIN_LABEL[origin]}
      </span>
    );
  }
  if (origin === "mineral") {
    return (
      <span className="chip organic">
        <Mountain aria-hidden="true" /> Mineral
      </span>
    );
  }
  return (
    <span className="chip">
      <FlaskConical aria-hidden="true" /> {ORIGIN_LABEL[origin]}
    </span>
  );
}

/** Chemical formula / equation with real subscripts and charges. */
export function Formula({ value, className }: { value: string; className?: string }) {
  return (
    <span className={`formula ${className ?? ""}`}>
      {formulaParts(value).map((p, i) =>
        p.v === "sub" ? <sub key={i}>{p.t}</sub> : p.v === "sup" ? <sup key={i}>{p.t}</sup> : <span key={i}>{p.t}</span>,
      )}
    </span>
  );
}

export function Skeleton({ h = 16, w = "100%", r }: { h?: number; w?: number | string; r?: number }) {
  return <div className="skeleton" style={{ height: h, width: w, borderRadius: r }} aria-hidden="true" />;
}

export function RowSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="ing-row" style={{ borderTop: i ? "1px solid var(--line)" : 0 }}>
          <Skeleton h={36} w={44} r={10} />
          <div className="grow stack" style={{ gap: 8 }}>
            <Skeleton h={14} w="46%" />
            <Skeleton h={12} w="70%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, children, action }: { icon: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty">
      <div className="empty-icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      {children && <p style={{ maxWidth: "42ch" }}>{children}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="callout danger" role="alert">
      <TriangleAlert aria-hidden="true" />
      <div className="grow">
        <strong>Something went wrong.</strong> {message}
      </div>
      {onRetry && (
        <button className="btn btn-sm" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Disclosure({ summary, children, defaultOpen }: { summary: ReactNode; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="disclosure" open={defaultOpen}>
      <summary>
        <span>{summary}</span>
        <ChevronDown aria-hidden="true" />
      </summary>
      <div className="content">{children}</div>
    </details>
  );
}

/** Accessible confirmation dialog with focus management and Escape to close. */
export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  danger,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  body: ReactNode;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const titleId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className="dialog-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="row between" style={{ alignItems: "flex-start" }}>
          <h2 id={titleId}>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close" style={{ marginTop: -10, marginRight: -10 }}>
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="muted">{body}</div>
        <div className="actions">
          <button ref={cancelRef} className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn ${danger ? "btn-danger" : "btn-primary"}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function HelpTip({ text }: { text: string }) {
  return (
    <span title={text} aria-label={text} role="img" style={{ display: "inline-flex", color: "var(--ink-3)" }}>
      <CircleHelp width={16} height={16} aria-hidden="true" />
    </span>
  );
}
