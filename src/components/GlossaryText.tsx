import { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { GLOSSARY, type Term } from "../learn/glossary";
import { LESSON_BY_ID } from "../learn/lessons";

// One regex for every glossary form, longest first so "free radical" wins over "radical".
const FORMS = GLOSSARY.flatMap((t) => (t.match ?? [t.term.toLowerCase()]).map((form) => ({ form, term: t })));
const BY_FORM = new Map(FORMS.map((f) => [f.form.toLowerCase(), f]));
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const PATTERN = new RegExp(
  `(?<![\\p{L}\\p{N}])(${FORMS.map((f) => f.form)
    .sort((a, b) => b.length - a.length)
    .map(escape)
    .join("|")})(?![\\p{L}\\p{N}])`,
  "giu",
);

/**
 * Within a scope, each term is annotated only where it first appears, so a tab full of text
 * doesn't turn into a sea of underlines. Remount the scope (via `key`) to reset it.
 */
const ScopeContext = createContext<Map<string, string> | null>(null);

export function GlossaryScope({ children }: { children: ReactNode }) {
  const owners = useRef(new Map<string, string>());
  return <ScopeContext.Provider value={owners.current}>{children}</ScopeContext.Provider>;
}

/** Plain text with glossary terms turned into tappable definitions. */
export function GlossaryText({ text, limit = 4 }: { text: string; limit?: number }) {
  const scope = useContext(ScopeContext);
  const self = useId();
  const parts: ReactNode[] = [];
  let last = 0;
  let used = 0;
  const seen = new Set<string>();
  for (const m of text.matchAll(PATTERN)) {
    const hit = BY_FORM.get(m[0].toLowerCase());
    if (!hit || used >= limit || seen.has(hit.term.id)) continue;
    // Acronyms and capitalized forms must match exactly ("ROS", not "ros").
    if (hit.form !== hit.form.toLowerCase() && hit.form !== m[0]) continue;
    if (scope) {
      const owner = scope.get(hit.term.id);
      if (owner && owner !== self) continue;
      scope.set(hit.term.id, self);
    }
    seen.add(hit.term.id);
    used++;
    parts.push(text.slice(last, m.index));
    parts.push(<TermButton key={m.index} term={hit.term} label={m[0]} />);
    last = m.index + m[0].length;
  }
  if (!parts.length) return <>{text}</>;
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function TermButton({ term, label }: { term: Term; label: string }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number; above: boolean } | null>(null);
  const id = useId();
  const lesson = term.lesson ? LESSON_BY_ID.get(term.lesson) : undefined;

  useLayoutEffect(() => {
    if (!open || !btn.current) return;
    const r = btn.current.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 32);
    const left = Math.max(16, Math.min(r.left + r.width / 2 - width / 2, window.innerWidth - width - 16));
    const above = r.top > 220;
    setPos({ top: above ? r.top - 8 : r.bottom + 8, left, above });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e.type === "keydown") {
        if ((e as KeyboardEvent).key !== "Escape") return;
        btn.current?.focus();
      } else if (e.type === "pointerdown" && (pop.current?.contains(e.target as Node) || btn.current?.contains(e.target as Node))) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    window.addEventListener("scroll", close, { passive: true, capture: true });
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
      window.removeEventListener("scroll", close, { capture: true });
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <>
      <button ref={btn} type="button" className="term" aria-expanded={open} aria-controls={open ? id : undefined} onClick={() => setOpen((o) => !o)}>
        {label}
      </button>
      {open &&
        pos &&
        createPortal(
          <div
            ref={pop}
            id={id}
            role="region"
            aria-label={`Definition of ${term.term}`}
            className="term-pop"
            data-above={pos.above}
            style={{ top: pos.top, left: pos.left }}
          >
            <strong>{term.term}</strong>
            <p>{term.def}</p>
            {lesson && (
              <Link to={`/learn/${lesson.id}`} onClick={() => setOpen(false)}>
                Lesson: {lesson.title}
              </Link>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
