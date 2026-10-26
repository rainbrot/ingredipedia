import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, CircleAlert, CircleCheck, FlaskConical, GraduationCap, Info, Leaf, Pencil, ScanLine, Share2, Trash2, TriangleAlert, X } from "lucide-react";
import { SECTORS, type ArtificialSort, type Highlight, type ScanItem, type ScanResult } from "../../shared/types";
import { api } from "../lib/api";
import { useServerEvents } from "../lib/events";
import { relativeDate } from "../lib/format";
import { useAsync } from "../lib/useAsync";
import { LESSONS, type QuizQuestion } from "../learn/lessons";
import { Quiz } from "../components/Quiz";
import { IngredientRow } from "../components/IngredientRow";
import { useToast } from "../components/Toast";
import { ConfirmDialog, Disclosure, EmptyState, ErrorState, GradeLabel, ScoreRing, Segmented, Skeleton } from "../components/ui";
import { SECTOR_ICON } from "../components/sectorIcon";

const SORTS: { value: ArtificialSort; label: string }[] = [
  { value: "unhealthy", label: "Most unhealthy" },
  { value: "healthy", label: "Most healthy" },
  { value: "most_researched", label: "Most researched" },
  { value: "least_researched", label: "Least researched" },
];

function sortArtificial(items: ScanItem[], sort: ArtificialSort): ScanItem[] {
  const score = (i: ScanItem) => i.ingredient?.healthScore ?? 50;
  // Unknown publication counts sort last in both research orders.
  const research = (i: ScanItem, dir: 1 | -1) => (i.ingredient?.researchCount == null ? Number.POSITIVE_INFINITY : dir * i.ingredient.researchCount);
  const sorted = [...items];
  switch (sort) {
    case "unhealthy":
      return sorted.sort((a, b) => score(a) - score(b) || a.position - b.position);
    case "healthy":
      return sorted.sort((a, b) => score(b) - score(a) || a.position - b.position);
    case "most_researched":
      return sorted.sort((a, b) => research(a, -1) - research(b, -1) || a.position - b.position);
    case "least_researched":
      return sorted.sort((a, b) => research(a, 1) - research(b, 1) || a.position - b.position);
    default:
      return sorted.sort((a, b) => a.position - b.position);
  }
}

const HIGHLIGHT_ICON = { bad: CircleAlert, warn: TriangleAlert, good: CircleCheck, info: Info };

function HighlightChip({ h }: { h: Highlight }) {
  const Icon = HIGHLIGHT_ICON[h.tone];
  const inner = (
    <>
      <Icon aria-hidden="true" /> {h.text}
    </>
  );
  return h.ingredientId ? (
    <Link to={`/ingredient/${h.ingredientId}`} className={`highlight ${h.tone}`}>
      {inner}
    </Link>
  ) : (
    <span className={`highlight ${h.tone}`}>{inner}</span>
  );
}

export function ProductPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: scan, error, loading, reload, setData } = useAsync(() => api.scan(id), [id]);
  const [sort, setSort] = useState<ArtificialSort>("unhealthy");
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  // When background research finishes for an ingredient in this product, refresh the score live.
  useServerEvents((e) => {
    if (!scan || !scan.items.some((i) => i.ingredient?.id === e.id)) return;
    const before = scan.score;
    void api.scan(id).then((next) => {
      setData(next);
      if (e.type === "ingredient.researched") {
        toast(
          <>
            Research finished for <strong>{e.name}</strong>.{next.score !== before ? ` Score updated to ${next.score}.` : ""}
          </>,
          "success",
        );
      }
    });
  });

  const groups = useMemo(() => {
    const items = scan?.items ?? [];
    return {
      organic: items.filter((i) => i.group === "organic").sort((a, b) => a.position - b.position),
      artificial: sortArtificial(
        items.filter((i) => i.group === "artificial"),
        sort,
      ),
      unknown: items.filter((i) => i.group === "unknown"),
    };
  }, [scan, sort]);

  if (loading && !scan) return <ProductSkeleton />;
  if (error || !scan) {
    return error && "status" in error && (error as { status: number }).status === 404 ? (
      <EmptyState icon={<ScanLine />} title="Scan not found" action={<Link to="/scan" className="btn btn-primary">Scan a label</Link>}>
        It may have been deleted from this device's history.
      </EmptyState>
    ) : (
      <ErrorState message={error?.message ?? "Could not load this product."} onRetry={() => reload()} />
    );
  }

  const sector = SECTORS.find((s) => s.id === scan.sector)!;
  const SectorIcon = SECTOR_ICON[scan.sector];
  const total = scan.stats.total || 1;

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: `${scan.name} · Ingredipedia ${scan.score}/100`, url });
      else {
        await navigator.clipboard.writeText(url);
        toast("Link copied to clipboard", "success");
      }
    } catch {
      /* user cancelled */
    }
  };

  const saveName = async () => {
    const name = draftName.trim();
    if (!name) return;
    try {
      await api.renameScan(scan.id, name);
      setData({ ...scan, name });
      setEditing(false);
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  const remove = async () => {
    try {
      await api.deleteScan(scan.id);
      toast("Scan deleted", "info");
      navigate("/history", { replace: true });
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  return (
    <div className="stack-lg fade-up">
      <div>
        <div className="row" style={{ marginBottom: 8 }}>
          <button className="btn btn-ghost" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
            <ArrowLeft aria-hidden="true" /> Back
          </button>
          <div className="grow" />
          <button className="icon-btn" onClick={share} aria-label="Share this result">
            <Share2 aria-hidden="true" />
          </button>
          {scan.owned && (
            <button className="icon-btn" onClick={() => setConfirmDelete(true)} aria-label="Delete this scan">
              <Trash2 aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="page-head product-title" style={{ marginBottom: 0 }}>
          {scan.imageUrl && <img className="product-photo" src={scan.imageUrl} alt="" />}
          <div className="grow">
          {editing ? (
            <form
              className="inline-edit"
              onSubmit={(e) => {
                e.preventDefault();
                void saveName();
              }}
            >
              <label htmlFor="rename" className="sr-only">
                Product name
              </label>
              <input id="rename" className="input" style={{ maxWidth: 420 }} value={draftName} onChange={(e) => setDraftName(e.target.value)} maxLength={80} autoFocus />
              <button className="icon-btn" type="submit" aria-label="Save name">
                <Check aria-hidden="true" />
              </button>
              <button className="icon-btn" type="button" onClick={() => setEditing(false)} aria-label="Cancel renaming">
                <X aria-hidden="true" />
              </button>
            </form>
          ) : (
            <div className="row" style={{ alignItems: "flex-start" }}>
              <h1 className="page-title">{scan.name}</h1>
              {scan.owned && (
                <button
                  className="icon-btn"
                  onClick={() => {
                    setDraftName(scan.name);
                    setEditing(true);
                  }}
                  aria-label="Rename product"
                >
                  <Pencil aria-hidden="true" />
                </button>
              )}
            </div>
          )}
          <p className="product-meta">
            <SectorIcon aria-hidden="true" /> {sector.label}
            <span className="sep" aria-hidden="true" />
            Scanned {relativeDate(scan.createdAt)}
            {scan.barcode && (
              <>
                <span className="sep" aria-hidden="true" />
                <span className="mono">{scan.barcode}</span>
              </>
            )}
          </p>
          </div>
        </div>
      </div>

      <section className="card card-pad product-hero" aria-labelledby="rating-title">
        <div className="ring-wrap">
          <ScoreRing score={scan.score} />
        </div>
        <div className="stack">
          <div className="row-wrap">
            <h2 id="rating-title" className="sr-only">
              Health rating
            </h2>
            <GradeLabel score={scan.score} />
            <span className={`chip ${scan.confidence === "high" ? "status-curated" : scan.confidence === "medium" ? "" : "status-preliminary"}`}>
              <BadgeCheck aria-hidden="true" /> {scan.confidence === "high" ? "High" : scan.confidence === "medium" ? "Medium" : "Provisional"} confidence ·{" "}
              {scan.stats.curated + scan.stats.researched}/{scan.stats.total} fully researched
            </span>
          </div>
          <p className="summary-text">{scan.summary}</p>
          {scan.highlights.length > 0 && (
            <ul className="highlights" aria-label="Key findings">
              {scan.highlights.map((h, i) => (
                <li key={i}>
                  <HighlightChip h={h} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="stack" style={{ gap: 10 }} aria-labelledby="composition-title">
        <h2 id="composition-title" className="mini-h">
          Composition
        </h2>
        <div className="composition" role="img" aria-label={`${scan.stats.organic} organic or natural, ${scan.stats.artificial} artificial or processed, ${scan.stats.unknown} unidentified`}>
          <span className="c-organic" style={{ width: `${(scan.stats.organic / total) * 100}%` }} />
          <span className="c-artificial" style={{ width: `${(scan.stats.artificial / total) * 100}%` }} />
          <span className="c-unknown" style={{ width: `${(scan.stats.unknown / total) * 100}%` }} />
        </div>
        <div className="legend">
          <span>
            <i style={{ background: "var(--organic)" }} /> {scan.stats.organic} organic &amp; natural
          </span>
          <span>
            <i style={{ background: "var(--s-poor)" }} /> {scan.stats.artificial} artificial &amp; processed
          </span>
          {scan.stats.unknown > 0 && (
            <span>
              <i style={{ background: "var(--line-strong)" }} /> {scan.stats.unknown} unidentified
            </span>
          )}
        </div>
      </section>

      <section className="card group-card" aria-labelledby="organic-title">
        <div className="group-head">
          <h2 id="organic-title">
            <span className="group-icon organic" aria-hidden="true">
              <Leaf />
            </span>
            Organic &amp; natural <span className="count">{groups.organic.length}</span>
          </h2>
          <span className="subtle" style={{ fontSize: "var(--text-sm)" }}>
            Isolated: certified organic or natural origin
          </span>
        </div>
        {groups.organic.length === 0 ? (
          <p className="muted" style={{ padding: "var(--sp-5)" }}>
            No organic or naturally derived ingredients were identified on this label.
          </p>
        ) : (
          <ul className="ing-list">
            {groups.organic.map((i) => (
              <li key={i.position}>
                <IngredientRow ing={i.ingredient!} position={i.position} labeledOrganic={i.labeledOrganic} rawName={i.name} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card group-card" aria-labelledby="artificial-title">
        <div className="group-head">
          <h2 id="artificial-title">
            <span className="group-icon artificial" aria-hidden="true">
              <FlaskConical />
            </span>
            Artificial &amp; processed <span className="count">{groups.artificial.length}</span>
          </h2>
          {groups.artificial.length > 1 && <Segmented label="Sort artificial ingredients" options={SORTS} value={sort} onChange={setSort} />}
        </div>
        {groups.artificial.length === 0 ? (
          <p className="muted" style={{ padding: "var(--sp-5)" }}>
            No synthetic or processed ingredients. Everything on this label is organic or natural.
          </p>
        ) : (
          <ul className="ing-list" aria-live="polite">
            {groups.artificial.map((i) => (
              <li key={i.position}>
                <IngredientRow ing={i.ingredient!} position={i.position} rawName={i.name} showOrigin />
              </li>
            ))}
          </ul>
        )}
      </section>

      <LearnFromProduct scan={scan} />

      <section className="card" aria-label="Label details">
        {groups.unknown.length > 0 && (
          <Disclosure summary={`${groups.unknown.length} item${groups.unknown.length === 1 ? "" : "s"} we couldn't identify`}>
            <p className="muted" style={{ fontSize: "var(--text-sm)", marginBottom: 12 }}>
              These look like OCR misreads or non-ingredient text, so they aren't included in the score.
            </p>
            <div className="token-preview">
              {groups.unknown.map((i) => (
                <span key={i.position} className="token">
                  {i.name}
                </span>
              ))}
            </div>
          </Disclosure>
        )}
        <Disclosure summary="Original label text">
          <pre className="raw-text">{scan.rawText}</pre>
        </Disclosure>
        <Disclosure summary="How this rating works">
          <div className="prose small stack" style={{ gap: 10 }}>
            <p>
              Each ingredient has a 0–100 health score for typical use in consumer products. The product rating averages them, weighting ingredients near the top of
              the label more because ingredients are listed by amount.
            </p>
            <p>
              Ingredients of notable concern lower the score even when they appear late in the list. Certified-organic ingredients add a small bonus, and long lists
              of synthetic additives subtract a little.
            </p>
            <p>
              Confidence reflects how many ingredients have fully researched profiles. New ingredients start with a preliminary profile, and the score updates by
              itself when automatic research finishes.
            </p>
          </div>
        </Disclosure>
      </section>

      <p className="subtle" style={{ fontSize: "var(--text-xs)", textAlign: "center" }}>
        Educational information based on published research and regulatory data. Not medical advice.
      </p>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this scan?"
        body="It will be removed from your history on this device. Ingredient profiles are not affected."
        confirmLabel="Delete scan"
        danger
        onConfirm={remove}
        onClose={() => setConfirmDelete(false)}
      />
    </div>
  );
}

/** Turns a scanned product into a short lesson: related lessons plus a quiz built from its own label. */
function LearnFromProduct({ scan }: { scan: ScanResult }) {
  const ids = new Set(scan.items.map((i) => i.ingredient?.id).filter(Boolean) as string[]);
  const lessons = LESSONS.map((l) => ({ l, hits: l.ingredients.filter((i) => ids.has(i)).length }))
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 3);
  const quiz = useMemo(() => productQuiz(scan), [scan]);
  if (!lessons.length && quiz.length < 2) return null;
  return (
    <section className="learn-product" aria-labelledby="learn-product-title">
      <h2 id="learn-product-title" className="section-title">
        Learn from this product
      </h2>
      {lessons.length > 0 && (
        <ul className="lesson-links">
          {lessons.map(({ l }) => (
            <li key={l.id}>
              <Link to={`/learn/${l.id}`}>
                <GraduationCap aria-hidden="true" />
                <span className="grow">
                  <strong>{l.title}</strong>
                  <span>{l.summary}</span>
                </span>
                <ArrowRight aria-hidden="true" className="chev" />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {quiz.length >= 2 && <Quiz questions={quiz} title="Quiz yourself on this label" seed={scan.id} />}
    </section>
  );
}

function productQuiz(scan: ScanResult): QuizQuestion[] {
  const known = scan.items.filter((i) => i.ingredient).sort((a, b) => a.position - b.position);
  const out: QuizQuestion[] = [];
  const name = (i: ScanItem) => i.ingredient!.name;
  const unique = (list: string[]) => [...new Set(list)];

  if (known.length >= 4) {
    const later = known.slice(2);
    const options = unique([name(known[0]), ...later.slice(-3).map(name)]);
    if (options.length === 4) {
      out.push({
        q: `Which ingredient makes up the largest share of ${scan.name}?`,
        options,
        explain: `${name(known[0])} is listed first, and ingredients are listed in descending order by amount.`,
      });
    }
  }

  const byRole = new Map<string, ScanItem>();
  for (const i of known) if (!byRole.has(i.ingredient!.primaryRole)) byRole.set(i.ingredient!.primaryRole, i);
  if (byRole.size >= 4) {
    const roles = [...byRole.entries()];
    const target = roles.find(([, i]) => i.group === "artificial") ?? roles[0];
    const others = roles.filter(([r]) => r !== target[0]).slice(0, 3).map(([r]) => r);
    out.push({
      q: `What job does ${name(target[1])} do in this product?`,
      options: [target[0], ...others],
      explain: `${name(target[1])} is used as a ${target[0].toLowerCase()}. Open its profile to see the mechanism behind that role.`,
    });
  }

  const researched = known.filter((i) => i.ingredient!.researchCount != null);
  if (researched.length >= 4) {
    const sorted = [...researched].sort((a, b) => b.ingredient!.researchCount! - a.ingredient!.researchCount!);
    const top = sorted[0];
    const rest = sorted.slice(-3);
    if (top.ingredient!.researchCount! > rest[rest.length - 1].ingredient!.researchCount! * 2) {
      out.push({
        q: "Which of these ingredients has been studied the most by scientists?",
        options: unique([name(top), ...rest.map(name)]),
        explain: `${name(top)} appears in about ${top.ingredient!.researchCount!.toLocaleString()} PubMed publications, far more than the others.`,
      });
    }
  }
  return out.filter((q) => q.options.length === 4).slice(0, 3);
}

function ProductSkeleton() {
  return (
    <div className="stack-lg" aria-busy="true" aria-label="Loading product">
      <Skeleton h={40} w="55%" />
      <div className="card card-pad product-hero">
        <Skeleton h={176} w={176} r={88} />
        <div className="stack">
          <Skeleton h={20} w="30%" />
          <Skeleton h={16} />
          <Skeleton h={16} w="90%" />
          <Skeleton h={16} w="75%" />
        </div>
      </div>
      <Skeleton h={220} r={18} />
    </div>
  );
}
