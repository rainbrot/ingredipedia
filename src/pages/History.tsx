import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { History as HistoryIcon, ScanLine, Search, Trash2 } from "lucide-react";
import { api } from "../lib/api";
import { relativeDate } from "../lib/format";
import { useAsync } from "../lib/useAsync";
import { useToast } from "../components/Toast";
import { ConfirmDialog, EmptyState, ErrorState, GradeLabel, RowSkeleton, ScorePill } from "../components/ui";
import { SECTOR_ICON } from "./Home";

export function HistoryPage() {
  const toast = useToast();
  const { data, error, loading, reload, setData } = useAsync(() => api.scans(), []);
  const [filter, setFilter] = useState("");
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(null);

  const items = useMemo(() => {
    const all = data?.items ?? [];
    const f = filter.trim().toLowerCase();
    return f ? all.filter((s) => s.name.toLowerCase().includes(f)) : all;
  }, [data, filter]);

  const remove = async (id: string) => {
    try {
      await api.deleteScan(id);
      setData({ items: (data?.items ?? []).filter((s) => s.id !== id) });
      toast("Scan deleted", "info");
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  return (
    <div className="fade-up">
      <div className="page-head">
        <h1 className="page-title">Scan history</h1>
        <p className="lede">Products you've scanned on this device. Scores update automatically as new ingredient profiles are verified.</p>
      </div>

      {(data?.items.length ?? 0) > 4 && (
        <div className="search" style={{ marginBottom: 16 }}>
          <Search aria-hidden="true" />
          <label htmlFor="hist-search" className="sr-only">
            Filter scans
          </label>
          <input id="hist-search" className="input" type="search" placeholder="Filter by product name" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
      )}

      {error && <ErrorState message={error.message} onRetry={() => reload()} />}

      <div className="card">
        {loading && !data ? (
          <RowSkeleton rows={4} />
        ) : items.length === 0 ? (
          <EmptyState
            icon={<HistoryIcon />}
            title={filter ? "No matching scans" : "No scans yet"}
            action={
              !filter && (
                <Link to="/scan" className="btn btn-primary">
                  <ScanLine aria-hidden="true" /> Scan your first label
                </Link>
              )
            }
          >
            {filter ? "Try a different name." : "Scan a food, beauty or cleaning product to see its health rating here."}
          </EmptyState>
        ) : (
          <ul className="ing-list">
            {items.map((s, index) => {
              const Icon = SECTOR_ICON[s.sector];
              return (
                <li key={s.id} className="row" style={{ gap: 0, borderTop: index ? "1px solid var(--line)" : 0 }}>
                  <Link to={`/product/${s.id}`} className="ing-row grow" style={{ borderTop: 0 }}>
                    <ScorePill score={s.score} />
                    <div className="grow">
                      <div className="name">{s.name}</div>
                      <div className="meta">
                        <Icon width={14} height={14} aria-hidden="true" />
                        <span>{s.itemCount} ingredients</span>
                        <span className="sep" aria-hidden="true" />
                        <span>{relativeDate(s.createdAt)}</span>
                        <span className="sep" aria-hidden="true" />
                        <GradeLabel score={s.score} />
                      </div>
                    </div>
                  </Link>
                  <button className="icon-btn" style={{ marginRight: 8 }} onClick={() => setPendingDelete({ id: s.id, name: s.name })} aria-label={`Delete ${s.name}`}>
                    <Trash2 aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this scan?"
        body={`“${pendingDelete?.name}” will be removed from your history.`}
        confirmLabel="Delete"
        danger
        onConfirm={() => pendingDelete && remove(pendingDelete.id)}
        onClose={() => setPendingDelete(null)}
      />
    </div>
  );
}
