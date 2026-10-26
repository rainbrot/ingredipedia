import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CircleHelp, X } from "lucide-react";
import { formulaParts } from "../../shared/formula";
import { EVIDENCE_LABEL, gradeFor, ORIGIN_LABEL, STATUS_LABEL, type EvidenceLevel, type Grade, type IngredientSummary, type Origin, type Status } from "../../shared/types";

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

/** The score set as a figure: a large numeral over its scale, no gauge. */
export function ScoreRing({ score, size = 176, caption = "out of 100" }: { score: number; size?: number; stroke?: number; caption?: string }) {
  const tone = toneFor(score);
  return (
    <div className={`score-figure tone-${tone}`} role="img" aria-label={`Health score ${score} out of 100, ${gradeFor(score)}`}>
      <span className="num" style={{ fontSize: Math.round(size * 0.42) }} aria-hidden="true">
        {score}
      </span>
      <span className="of" aria-hidden="true">
        {caption}
      </span>
    </div>
  );
}

export function GradeLabel({ score }: { score: number }) {
  return <span className={`grade tone-${toneFor(score)}`}>{gradeFor(score)}</span>;
}

const STATUS_HINT: Record<Status, string> = {
  curated: "Written by the Ingredipedia content team, with sources",
  researched: "Built automatically from PubChem and PubMed",
  preliminary: "A first draft; automatic research is still filling it in",
};

export function StatusChip({ ing }: { ing: Pick<IngredientSummary, "status" | "researchState"> }) {
  return (
    <span className={`chip status-${ing.status}`} title={STATUS_HINT[ing.status]}>
      {STATUS_LABEL[ing.status]}
    </span>
  );
}

/** How strong the evidence behind a claim is, stated in words. */
export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  return (
    <span className={`evidence ev-${level}`}>
      Evidence: <em>{EVIDENCE_LABEL[level].toLowerCase()}</em>
    </span>
  );
}

export function ResearchChip({ state }: { state: IngredientSummary["researchState"] }) {
  if (!state || state === "complete") return null;
  const label = state === "failed" ? "Research retrying" : state === "running" ? "Researching…" : "Research queued";
  return <span className="chip">{label}</span>;
}

export function OriginChip({ origin, organic }: { origin: Origin; organic?: boolean }) {
  if (organic) return <span className="chip organic">Certified organic</span>;
  if (origin === "natural") return <span className="chip organic">{ORIGIN_LABEL[origin]}</span>;
  if (origin === "mineral") return <span className="chip organic">Mineral</span>;
  return <span className="chip">{ORIGIN_LABEL[origin]}</span>;
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

export function Skeleton({ h = 16, w = "100%" }: { h?: number; w?: number | string; r?: number }) {
  return <div className="skeleton" style={{ height: h, width: w }} aria-hidden="true" />;
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

export function EmptyState({ title, children, action }: { icon?: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      {children && <p style={{ maxWidth: "42ch" }}>{children}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="callout danger" role="alert">
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
