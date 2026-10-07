import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";
import { SECTORS, STATUS_LABEL, type IngredientSummary, type Sector, type Status } from "../../shared/types";
import { api } from "../lib/api";
import { IngredientRow } from "../components/IngredientRow";
import { EmptyState, ErrorState, RowSkeleton } from "../components/ui";

const SORT_OPTIONS = [
  { value: "name", label: "A–Z" },
  { value: "research_desc", label: "Most researched" },
  { value: "research_asc", label: "Least researched" },
  { value: "score_desc", label: "Healthiest" },
  { value: "score_asc", label: "Most concerning" },
  { value: "recent", label: "Recently updated" },
];

const PAGE = 30;

export function LibraryPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const sector = (params.get("sector") as Sector | null) ?? undefined;
  const sort = params.get("sort") ?? "name";
  const statusParam = params.get("status");
  const status = statusParam && statusParam in STATUS_LABEL ? (statusParam as Status) : undefined;
  const [query, setQuery] = useState(q);
  const [items, setItems] = useState<IngredientSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const update = (next: Record<string, string | undefined>) => {
    const p = new URLSearchParams(params);
    for (const [k, v] of Object.entries(next)) {
      if (v) p.set(k, v);
      else p.delete(k);
    }
    setParams(p, { replace: true });
  };

  // Debounce typing into the URL (which drives the fetch).
  useEffect(() => {
    const t = setTimeout(() => query !== q && update({ q: query || undefined }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const load = async (offset: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.ingredients({ q: q || undefined, sector, sort, status, limit: PAGE, offset });
      setItems((prev) => (offset === 0 ? res.items : [...prev, ...res.items]));
      setTotal(res.total);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, sector, sort, status]);

  return (
    <div className="fade-up">
      <div className="page-head">
        <h1 className="page-title">Ingredient library</h1>
        <p className="lede">Every ingredient profile in Assay, curated or researched automatically. Search by common name, INCI or chemical name, or E-number.</p>
      </div>

      <div className="stack" style={{ gap: 12, marginBottom: 20 }}>
        <div className="search">
          <Search aria-hidden="true" />
          <label htmlFor="lib-search" className="sr-only">
            Search ingredients
          </label>
          <input
            id="lib-search"
            className="input"
            type="search"
            placeholder="Search ingredients, e.g. “E330” or “parabens”"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="row-wrap between">
          <div className="chip-row" role="group" aria-label="Filter by category">
            <button className="chip chip-button" aria-pressed={!sector} onClick={() => update({ sector: undefined })}>
              All
            </button>
            {SECTORS.map((s) => (
              <button key={s.id} className="chip chip-button" aria-pressed={sector === s.id} onClick={() => update({ sector: s.id })}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="row-wrap" style={{ gap: 8 }}>
            <label htmlFor="lib-status" className="sr-only">
              Profile type
            </label>
            <select id="lib-status" className="select" style={{ width: "auto", minHeight: 40 }} value={status ?? ""} onChange={(e) => update({ status: e.target.value || undefined })}>
              <option value="">All profiles</option>
              {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
            <label htmlFor="lib-sort" className="subtle small">
              Sort
            </label>
            <select id="lib-sort" className="select" style={{ width: "auto", minHeight: 40 }} value={sort} onChange={(e) => update({ sort: e.target.value })}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} onRetry={() => load(0)} />}

      <p className="subtle" style={{ fontSize: "var(--text-sm)", marginBottom: 8 }} aria-live="polite">
        {loading && items.length === 0 ? "Loading…" : `${total} ingredient${total === 1 ? "" : "s"}`}
      </p>
      <div className="card">
        {loading && items.length === 0 ? (
          <RowSkeleton rows={6} />
        ) : items.length === 0 ? (
          <EmptyState icon={<BookOpen />} title="No matches">
            Try a different spelling, or scan a product. New ingredients are researched and added automatically.
          </EmptyState>
        ) : (
          <ul className="ing-list">
            {items.map((ing) => (
              <li key={ing.id}>
                <IngredientRow ing={ing} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {items.length < total && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <button className="btn" onClick={() => load(items.length)} disabled={loading}>
            {loading ? <span className="spinner" aria-hidden="true" /> : null} Load more
          </button>
        </div>
      )}
    </div>
  );
}
