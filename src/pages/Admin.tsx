import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  Activity,
  BadgeCheck,
  CircleDollarSign,
  Database,
  Eye,
  EyeOff,
  FileText,
  GitMerge,
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  TriangleAlert,
  Undo2,
  Upload,
  Users,
  WandSparkles,
} from "lucide-react";
import { CONCERN_LABEL, ORIGIN_LABEL, type AdminIngredient, type IngredientSummary, type Origin, type Profile } from "../../shared/types";
import { adminApi, ApiError, type AdminOverview, type PubChemCandidate } from "../lib/api";
import { useServerEvents } from "../lib/events";
import { compactNumber, shortTime, usd } from "../lib/format";
import { MoleculeViewer } from "../components/MoleculeViewer";
import { useToast } from "../components/Toast";
import { ConfirmDialog, EmptyState, ErrorState, Formula, ScorePill, Segmented, StatusChip } from "../components/ui";

const TOKEN_KEY = "assay.admin";

function loadToken(): string | null {
  try {
    const raw = sessionStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const { token, expiresAt } = JSON.parse(raw) as { token: string; expiresAt: number };
    return expiresAt > Date.now() ? token : null;
  } catch {
    return null;
  }
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(loadToken);
  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
    setToken(null);
  }, []);
  if (!token) return <AdminLogin onToken={setToken} />;
  return <AdminDashboard token={token} onLogout={logout} />;
}

// ---------------------------------------------------------------------------

function AdminLogin({ onToken }: { onToken: (t: string) => void }) {
  const [passcode, setPasscode] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await adminApi.login(passcode);
      try {
        sessionStorage.setItem(TOKEN_KEY, JSON.stringify(res));
      } catch {
        /* ignore */
      }
      onToken(res.token);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card card-pad auth-card fade-up">
      <form className="stack" onSubmit={submit} noValidate>
        <div className="row">
          <ShieldCheck width={24} height={24} style={{ color: "var(--primary)" }} aria-hidden="true" />
          <h1 className="section-title">Reviewer dashboard</h1>
        </div>
        <p className="muted" style={{ fontSize: "var(--text-sm)" }}>
          Fact-check AI drafts, confirm 3D structures and publish verified ingredient profiles.
        </p>
        <div className="field">
          <label className="label" htmlFor="passcode">
            Admin passcode
          </label>
          <div className="row" style={{ gap: 8 }}>
            <input
              id="passcode"
              className="input"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "passcode-error" : "passcode-hint"}
              required
            />
            <button type="button" className="icon-btn" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide passcode" : "Show passcode"} aria-pressed={show}>
              {show ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            </button>
          </div>
          {error ? (
            <span id="passcode-error" className="error-text" role="alert">
              <TriangleAlert width={16} height={16} aria-hidden="true" /> {error}
            </span>
          ) : (
            <span id="passcode-hint" className="hint">
              Set with ADMIN_PASSCODE in the server's .env file.
            </span>
          )}
        </div>
        <button className="btn btn-primary btn-lg" disabled={busy || !passcode}>
          {busy && <span className="spinner" aria-hidden="true" />} Sign in
        </button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------

type Tab = "queue" | "library" | "costs";

function AdminDashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const toast = useToast();
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("queue");
  const [selected, setSelected] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const load = useCallback(async () => {
    try {
      const o = await adminApi.overview(token);
      setOverview(o);
      setError(null);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) onLogout();
      else setError((err as Error).message);
    }
  }, [token, onLogout]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (tab === "queue" && !selected && overview?.queue[0]) setSelected(overview.queue[0].id);
  }, [overview, tab, selected]);

  useServerEvents((e) => {
    void load();
    if (e.type === "ingredient.updated" && e.id === selected) setRefreshKey((k) => k + 1);
    if (e.type === "queue.updated" && tab === "queue") toast(`Review queue updated · ${e.pending} pending`, "info");
  });

  const onChanged = (next?: { removed?: boolean; nextId?: string | null }) => {
    void load();
    if (next?.removed) setSelected(next.nextId ?? null);
  };

  return (
    <div className="stack-lg fade-up">
      <div className="row-wrap between">
        <div className="page-head" style={{ margin: 0 }}>
          <span className="eyebrow">Admin</span>
          <h1 className="page-title">Review dashboard</h1>
        </div>
        <div className="row">
          <Segmented
            label="Dashboard view"
            value={tab}
            onChange={(t) => {
              setTab(t);
              setSelected(null);
            }}
            options={[
              { value: "queue", label: `Review queue${overview ? ` (${overview.counts.needs_verification})` : ""}` },
              { value: "library", label: "All ingredients" },
              { value: "costs", label: "Pipeline & costs" },
            ]}
          />
          <button className="btn btn-ghost" onClick={onLogout}>
            <LogOut aria-hidden="true" /> Sign out
          </button>
        </div>
      </div>

      {error && <ErrorState message={error} onRetry={load} />}

      {overview && (
        <div className="admin-stats">
          <Stat icon={<BadgeCheck />} k="Verified profiles" v={compactNumber(overview.counts.verified)} s="published globally" />
          <Stat icon={<WandSparkles />} k="Awaiting review" v={compactNumber(overview.counts.needs_verification)} s="status: needs_verification" />
          <Stat
            icon={<Activity />}
            k="Research jobs"
            v={`${overview.jobs.running ?? 0} running`}
            s={`${overview.jobs.queued ?? 0} queued · ${overview.jobs.failed ?? 0} failed`}
          />
          <Stat icon={<CircleDollarSign />} k="AI spend this month" v={usd(overview.ai.month.costUsd, overview.ai.month.costUsd < 1 ? 4 : 2)} s={overview.ai.enabled ? overview.ai.model : "AI off (extractive mode)"} />
          <Stat icon={<Users />} k="Scans" v={compactNumber(overview.totalScans)} s={`${overview.activeDevices30d} active devices (30 d) · ${overview.liveClients} live`} />
        </div>
      )}

      {tab === "queue" && overview && (
        <div className="admin-grid">
          <QueueList items={overview.queue} selected={selected} onSelect={setSelected} />
          {selected ? (
            <ReviewPanel key={`${selected}-${refreshKey}`} token={token} id={selected} queue={overview.queue} onChanged={onChanged} />
          ) : (
            <div className="card">
              <EmptyState icon={<BadgeCheck />} title="Queue is clear">
                Every scanned ingredient has been verified. New drafts appear here automatically.
              </EmptyState>
            </div>
          )}
        </div>
      )}

      {tab === "library" && (
        <div className="admin-grid">
          <LibraryList token={token} selected={selected} onSelect={setSelected} />
          {selected ? (
            <ReviewPanel key={`${selected}-${refreshKey}`} token={token} id={selected} queue={[]} onChanged={onChanged} />
          ) : (
            <div className="card">
              <EmptyState icon={<Database />} title="Select an ingredient">
                Edit any profile, fix its structure, or send it back to the review queue.
              </EmptyState>
            </div>
          )}
        </div>
      )}

      {tab === "costs" && overview && <CostsPanel overview={overview} />}
    </div>
  );
}

function Stat({ icon, k, v, s }: { icon: ReactNode; k: string; v: string; s: string }) {
  return (
    <div className="kpi">
      <span className="k row" style={{ gap: 6 }}>
        <span aria-hidden="true" style={{ display: "inline-flex", width: 16, height: 16 }}>
          {icon}
        </span>
        {k}
      </span>
      <span className="v">{v}</span>
      <span className="s">{s}</span>
    </div>
  );
}

const STATE_LABEL: Record<string, string> = { complete: "Ready for review", running: "Researching…", queued: "Research queued", failed: "Research failed" };

function QueueList({ items, selected, onSelect }: { items: AdminOverview["queue"]; selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div className="group-head" style={{ padding: "var(--sp-4)" }}>
        <h2 style={{ fontSize: "var(--text-md)" }}>Flagged entries</h2>
        <span className="count">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="muted" style={{ padding: "var(--sp-4)" }}>
          Nothing to review.
        </p>
      ) : (
        <ul className="queue">
          {items.map((q) => (
            <li key={q.id}>
              <button aria-current={q.id === selected} onClick={() => onSelect(q.id)}>
                <span className="state-dot" data-state={q.researchState ?? "queued"} aria-hidden="true" />
                <span className="grow">
                  <span style={{ fontWeight: 600, display: "block" }}>{q.name}</span>
                  <span className="subtle" style={{ fontSize: "var(--text-sm)" }}>
                    {STATE_LABEL[q.researchState ?? "queued"]} · {q.scanCount} scan{q.scanCount === 1 ? "" : "s"} · {shortTime(q.createdAt)}
                  </span>
                </span>
                <ScorePill score={q.healthScore} size="sm" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LibraryList({ token, selected, onSelect }: { token: string; selected: string | null; onSelect: (id: string) => void }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"" | "verified" | "needs_verification">("");
  const [items, setItems] = useState<IngredientSummary[]>([]);
  useEffect(() => {
    const t = setTimeout(() => {
      void adminApi
        .list(token, { q, status })
        .then((r) => setItems(r.items))
        .catch(() => setItems([]));
    }, 200);
    return () => clearTimeout(t);
  }, [token, q, status]);
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div className="stack" style={{ padding: "var(--sp-4)", gap: 10 }}>
        <div className="search">
          <Search aria-hidden="true" />
          <label htmlFor="admin-search" className="sr-only">
            Search ingredients
          </label>
          <input id="admin-search" className="input" type="search" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Segmented
          label="Status filter"
          value={status}
          onChange={setStatus}
          options={[
            { value: "", label: "All" },
            { value: "verified", label: "Verified" },
            { value: "needs_verification", label: "Drafts" },
          ]}
        />
      </div>
      <ul className="queue">
        {items.map((i) => (
          <li key={i.id}>
            <button aria-current={i.id === selected} onClick={() => onSelect(i.id)}>
              <span className="grow">
                <span style={{ fontWeight: 600, display: "block" }}>{i.name}</span>
                <span className="subtle" style={{ fontSize: "var(--text-sm)" }}>
                  {i.primaryRole} · {i.status === "verified" ? "Verified" : "Draft"}
                </span>
              </span>
              <ScorePill score={i.healthScore} size="sm" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------

function ReviewPanel({
  token,
  id,
  queue,
  onChanged,
}: {
  token: string;
  id: string;
  queue: AdminOverview["queue"];
  onChanged: (n?: { removed?: boolean; nextId?: string | null }) => void;
}) {
  const toast = useToast();
  const [ing, setIng] = useState<AdminIngredient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<"reject" | "merge" | null>(null);
  const [mergeTarget, setMergeTarget] = useState<IngredientSummary | null>(null);

  const load = useCallback(async () => {
    try {
      setIng(await adminApi.get(token, id));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [token, id]);

  useEffect(() => {
    void load();
  }, [load]);

  const nextInQueue = () => {
    const idx = queue.findIndex((q) => q.id === id);
    return queue[idx + 1]?.id ?? queue[idx - 1]?.id ?? null;
  };

  const act = async (label: string, fn: () => Promise<unknown>, success: string, after?: { removed?: boolean }) => {
    setBusy(label);
    try {
      await fn();
      toast(success, "success");
      if (after?.removed) onChanged({ removed: true, nextId: nextInQueue() });
      else {
        await load();
        onChanged();
      }
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setBusy(null);
    }
  };

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!ing) {
    return (
      <div className="card card-pad" aria-busy="true">
        <span className="spinner" aria-label="Loading" />
      </div>
    );
  }

  const isDraft = ing.status !== "verified";
  const citedIds = new Set([...(ing.profile?.reactions ?? []), ...(ing.profile?.mechanisms ?? [])].flatMap((i) => i.sources ?? []));

  return (
    <div className="stack">
      <div className="card card-pad stack">
        <div className="row-wrap between" style={{ alignItems: "flex-start" }}>
          <div className="stack" style={{ gap: 6 }}>
            <div className="chip-row">
              <StatusChip ing={ing} />
              {isDraft && <span className="chip">{STATE_LABEL[ing.researchState ?? "queued"]}</span>}
              {ing.draft && <span className="chip mono">{ing.draft.model}</span>}
              {ing.aiUsage && (
                <span className="chip mono">
                  {usd(ing.aiUsage.costUsd, 4)} · {compactNumber(ing.aiUsage.inputTokens + ing.aiUsage.outputTokens)} tokens
                </span>
              )}
            </div>
            <h2 className="page-title" style={{ fontSize: "var(--text-2xl)" }}>
              {ing.name}
            </h2>
            <p className="subtle" style={{ fontSize: "var(--text-sm)" }}>
              {ing.primaryRole} · {ing.primaryCategory} · seen in {ing.scanCount} scan{ing.scanCount === 1 ? "" : "s"} ·{" "}
              {ing.status === "verified" ? (
                <Link to={`/ingredient/${ing.id}`}>View public profile</Link>
              ) : (
                "private draft"
              )}
            </p>
          </div>
          <div className="row-wrap">
            {isDraft ? (
              <button className="btn btn-primary" disabled={!!busy || !ing.profile} onClick={() => act("approve", () => adminApi.approve(token, ing.id), `${ing.name} verified and published to all users`, { removed: true })}>
                {busy === "approve" ? <span className="spinner" aria-hidden="true" /> : <BadgeCheck aria-hidden="true" />} Approve &amp; Verify
              </button>
            ) : (
              <button className="btn" disabled={!!busy} onClick={() => act("unverify", () => adminApi.unverify(token, ing.id), `${ing.name} returned to the review queue`)}>
                <Undo2 aria-hidden="true" /> Return to queue
              </button>
            )}
            <button className="btn" disabled={!!busy} onClick={() => act("rerun", () => adminApi.rerun(token, ing.id), "Research re-queued")}>
              <RefreshCw aria-hidden="true" /> Re-run research
            </button>
            <button className="btn" disabled={!!busy} onClick={() => setConfirm("merge")}>
              <GitMerge aria-hidden="true" /> Merge
            </button>
            <button className="btn btn-danger" disabled={!!busy} onClick={() => setConfirm("reject")}>
              <Trash2 aria-hidden="true" /> Reject
            </button>
          </div>
        </div>
        {ing.researchError && (
          <div className="callout warn">
            <TriangleAlert aria-hidden="true" />
            <div>Last research attempt failed: {ing.researchError}</div>
          </div>
        )}
      </div>

      {/* Step 1: fact-check */}
      <section className="card card-pad stack" aria-labelledby="step1">
        <div className="review-step">
          <span className="n">1</span>
          <div>
            <h3 id="step1" className="section-title" style={{ fontSize: "var(--text-lg)" }}>
              Fact-check the draft against its sources
            </h3>
            <p className="subtle" style={{ fontSize: "var(--text-sm)" }}>
              Highlighted sources are cited by the extraction. Fields written from general knowledge are flagged.
            </p>
          </div>
        </div>
        <div className="review-cols">
          <div className="stack" style={{ gap: 14 }}>
            <div className="row">
              <ScorePill score={ing.healthScore} />
              <p style={{ fontSize: "var(--text-sm)" }} className="muted">
                {ing.scoreRationale}
              </p>
            </div>
            <DraftField label="Consumer summary" text={ing.summary} />
            {ing.profile && (
              <>
                <DraftField label="Product function" text={ing.profile.function} flagged={ing.draft?.unsupportedFields?.includes("function")} />
                <DraftList label="Chemical reactions" items={ing.profile.reactions} />
                <DraftList label="Biological mechanisms" items={ing.profile.mechanisms} />
                <DraftField label="Toxicology" text={ing.profile.toxicology.mechanism} />
                <DraftField label="Dosage & route context" text={ing.profile.toxicology.dosage} />
                <DraftField label="Sensitization" text={ing.profile.sensitization} />
              </>
            )}
            {(ing.draft?.unsupportedFields?.length ?? 0) > 0 && (
              <div className="callout warn">
                <TriangleAlert aria-hidden="true" />
                <div>
                  <strong>Written from general knowledge:</strong> {ing.draft!.unsupportedFields!.join(", ")}. Verify these carefully.
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="sub-title">Attached sources ({ing.sources.length})</p>
            {ing.sources.length === 0 ? (
              <p className="muted" style={{ fontSize: "var(--text-sm)" }}>
                No sources attached yet. {ing.researchState !== "complete" ? "Background research is still running." : "Try re-running research."}
              </p>
            ) : (
              <div className="scroll-panel">
                {ing.sources.map((d) => (
                  <div key={d.id} className="source-doc" data-cited={citedIds.has(d.id)}>
                    <div className="row between">
                      <span className="id">{d.id}</span>
                      <a href={d.url} target="_blank" rel="noreferrer" style={{ fontSize: "var(--text-xs)" }}>
                        Open
                      </a>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginTop: 4 }}>{d.title}</div>
                    <p>{d.text.length > 900 ? `${d.text.slice(0, 900)}…` : d.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Step 2: 3D model */}
      <ModelStep token={token} ing={ing} onUpdated={(next) => setIng(next)} />

      {/* Step 3: edit & approve */}
      <EditStep token={token} ing={ing} onSaved={(next) => setIng(next)} />

      {isDraft && (
        <div className="card card-pad row-wrap between">
          <div className="review-step">
            <span className="n">3</span>
            <div>
              <strong>Approve &amp; Verify</strong>
              <p className="subtle" style={{ fontSize: "var(--text-sm)" }}>
                Sets status to verified, caches the profile permanently, and pushes it to every user instantly.
              </p>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" disabled={!!busy || !ing.profile} onClick={() => act("approve", () => adminApi.approve(token, ing.id), `${ing.name} verified and published to all users`, { removed: true })}>
            <BadgeCheck aria-hidden="true" /> Approve &amp; Verify
          </button>
        </div>
      )}

      <ConfirmDialog
        open={confirm === "reject"}
        title={`Reject “${ing.name}”?`}
        body="The draft is deleted. Scans that contained it will show it as an unidentified item."
        confirmLabel="Reject draft"
        danger
        onConfirm={() => act("reject", () => adminApi.reject(token, ing.id), `${ing.name} rejected`, { removed: true })}
        onClose={() => setConfirm(null)}
      />
      {confirm === "merge" && (
        <MergeDialog
          token={token}
          from={ing}
          target={mergeTarget}
          setTarget={setMergeTarget}
          onClose={() => setConfirm(null)}
          onMerge={(into) => act("merge", () => adminApi.merge(token, ing.id, into.id), `Merged into ${into.name}`, { removed: true })}
        />
      )}
    </div>
  );
}

function DraftField({ label, text, flagged }: { label: string; text: string; flagged?: boolean }) {
  return (
    <div>
      <p className="sub-title row" style={{ gap: 6 }}>
        {label} {flagged && <span className="chip draft">general knowledge</span>}
      </p>
      <p style={{ fontSize: "var(--text-sm)" }}>{text || <span className="subtle">Empty</span>}</p>
    </div>
  );
}

function DraftList({ label, items }: { label: string; items: Profile["reactions"] }) {
  return (
    <div>
      <p className="sub-title">{label}</p>
      {items.length === 0 ? (
        <p className="subtle" style={{ fontSize: "var(--text-sm)" }}>
          None extracted.
        </p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, fontSize: "var(--text-sm)" }}>
          {items.map((it, i) => (
            <li key={i}>
              <strong>{it.title}.</strong> {it.description}
              {it.equation && (
                <>
                  {" "}
                  <Formula value={it.equation} />
                </>
              )}
              {it.sources?.length ? <span className="subtle mono"> [{it.sources.join(", ")}]</span> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ModelStep({ token, ing, onUpdated }: { token: string; ing: AdminIngredient; onUpdated: (i: AdminIngredient) => void }) {
  const toast = useToast();
  const [sdf, setSdf] = useState<{ sdf: string; source: string } | null>(null);
  const [q, setQ] = useState(ing.name);
  const [results, setResults] = useState<PubChemCandidate[] | null>(null);
  const [cid, setCid] = useState(ing.pubchemCid ? String(ing.pubchemCid) : "");
  const [busy, setBusy] = useState(false);

  const loadSdf = useCallback(async () => {
    setSdf(await adminApi.sdf(token, ing.id).catch(() => null));
  }, [token, ing.id]);

  useEffect(() => {
    void loadSdf();
  }, [loadSdf, ing.pubchemCid, ing.hasCustomSdf]);

  const search = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      setResults((await adminApi.searchPubChem(token, q)).items);
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setBusy(false);
    }
  };

  const useCid = async (value: number) => {
    setBusy(true);
    try {
      const res = await adminApi.setModel(token, ing.id, value);
      onUpdated(res.ingredient);
      setCid(String(value));
      toast(res.structure ? `Structure set from PubChem CID ${value}` : `CID ${value} saved (PubChem has no 3D conformer)`, "success");
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setBusy(false);
    }
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    try {
      const res = await adminApi.uploadSdf(token, ing.id, text);
      onUpdated(res.ingredient);
      toast("Custom SDF uploaded", "success");
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  return (
    <section className="card card-pad stack" aria-labelledby="step2">
      <div className="review-step">
        <span className="n">2</span>
        <div>
          <h3 id="step2" className="section-title" style={{ fontSize: "var(--text-lg)" }}>
            Confirm the 3D model
          </h3>
          <p className="subtle" style={{ fontSize: "var(--text-sm)" }}>
            Search or confirm the exact PubChem CID, or upload an .SDF file, so the viewer shows the correct molecule.
          </p>
        </div>
      </div>
      <div className="structure-grid">
        {sdf ? (
          <MoleculeViewer sdf={sdf.sdf} label={ing.name} />
        ) : (
          <div className="plate">
            <div className="plate-head">3D model</div>
            <div className="plate-body">
              <div className="viewer-overlay">{ing.pubchemCid ? "Loading structure…" : "No structure yet. Choose a CID or upload an SDF."}</div>
            </div>
          </div>
        )}
        <div className="stack">
          <dl className="facts">
            <div>
              <dt>Current CID</dt>
              <dd className="mono">{ing.pubchemCid ?? "—"}</dd>
            </div>
            <div>
              <dt>Structure source</dt>
              <dd>{sdf ? (sdf.source === "upload" ? "Uploaded SDF" : sdf.source === "pubchem-3d" ? "PubChem 3D conformer" : "PubChem 2D record") : "—"}</dd>
            </div>
            {ing.identity.formula && (
              <div>
                <dt>Formula</dt>
                <dd>
                  <Formula value={ing.identity.formula} />
                </dd>
              </div>
            )}
          </dl>
          <form className="row" onSubmit={search}>
            <label htmlFor="pc-search" className="sr-only">
              Search PubChem
            </label>
            <input id="pc-search" className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search PubChem by name or CID" />
            <button className="btn" disabled={busy || !q.trim()}>
              <Search aria-hidden="true" /> Search
            </button>
          </form>
          {results && (
            <ul className="queue card" style={{ maxHeight: 240 }}>
              {results.length === 0 && <li className="muted" style={{ padding: 12 }}>No PubChem matches.</li>}
              {results.map((r) => (
                <li key={r.cid}>
                  <button onClick={() => useCid(r.cid)} disabled={busy}>
                    <span className="grow">
                      <span style={{ fontWeight: 600, display: "block" }}>{r.title}</span>
                      <span className="subtle mono" style={{ fontSize: "var(--text-xs)" }}>
                        CID {r.cid} · {r.formula} · {r.weight?.toFixed(2)} g/mol
                      </span>
                    </span>
                    <span className="chip">Use</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <form
            className="row"
            onSubmit={(e) => {
              e.preventDefault();
              if (/^\d+$/.test(cid)) void useCid(Number(cid));
            }}
          >
            <label htmlFor="cid-input" className="sr-only">
              PubChem CID
            </label>
            <input id="cid-input" className="input mono" inputMode="numeric" value={cid} onChange={(e) => setCid(e.target.value.replace(/\D/g, ""))} placeholder="Enter CID" />
            <button className="btn" disabled={busy || !cid}>
              Set CID
            </button>
          </form>
          <label className="btn" style={{ alignSelf: "flex-start" }}>
            <Upload aria-hidden="true" /> Upload .SDF file
            <input type="file" accept=".sdf,.mol,chemical/x-mdl-sdfile" hidden onChange={(e) => upload(e.target.files?.[0])} />
          </label>
        </div>
      </div>
    </section>
  );
}

function EditStep({ token, ing, onSaved }: { token: string; ing: AdminIngredient; onSaved: (i: AdminIngredient) => void }) {
  const toast = useToast();
  const [form, setForm] = useState(() => ({
    name: ing.name,
    primaryRole: ing.primaryRole,
    primaryCategory: ing.primaryCategory,
    origin: ing.origin,
    kind: ing.kind,
    healthScore: ing.healthScore,
    concerns: ing.concerns.join(", "),
    aliases: ing.aliases.join(", "),
    summary: ing.summary,
    scoreRationale: ing.scoreRationale,
  }));
  const [json, setJson] = useState(() => JSON.stringify({ identity: ing.identity, profile: ing.profile }, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const knownConcerns = useMemo(() => Object.keys(CONCERN_LABEL).join(", "), []);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const next = await adminApi.update(token, ing.id, {
        ...form,
        healthScore: Math.round(Number(form.healthScore)),
        concerns: form.concerns.split(",").map((s) => s.trim()).filter(Boolean),
        aliases: form.aliases.split(",").map((s) => s.trim()).filter(Boolean),
      } as never);
      onSaved(next);
      toast("Changes saved", "success");
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  };

  const saveJson = async () => {
    let parsed: { identity?: unknown; profile?: unknown };
    try {
      parsed = JSON.parse(json);
      setJsonError(null);
    } catch (err) {
      setJsonError(`Invalid JSON: ${(err as Error).message}`);
      return;
    }
    setSaving(true);
    try {
      const next = await adminApi.update(token, ing.id, parsed as never);
      onSaved(next);
      toast("Profile saved", "success");
    } catch (err) {
      const issues = err instanceof ApiError ? (err.body as { issues?: { path: string[]; message: string }[] })?.issues : undefined;
      setJsonError(issues?.length ? issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") : (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="card card-pad stack" aria-labelledby="step-edit">
      <div className="review-step">
        <span className="n">
          <FileText width={14} height={14} aria-hidden="true" />
        </span>
        <div>
          <h3 id="step-edit" className="section-title" style={{ fontSize: "var(--text-lg)" }}>
            Correct the profile
          </h3>
          <p className="subtle" style={{ fontSize: "var(--text-sm)" }}>
            Fix anything the fact-check turned up before approving.
          </p>
        </div>
      </div>
      <form className="stack" onSubmit={save}>
        <div className="pf-grid two">
          <div className="field">
            <label className="label" htmlFor="f-name">
              Common name
            </label>
            <input id="f-name" className="input" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </div>
          <div className="field">
            <label className="label" htmlFor="f-role">
              Primary role
            </label>
            <input id="f-role" className="input" value={form.primaryRole} onChange={(e) => set("primaryRole", e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="f-cat">
              Primary category
            </label>
            <input id="f-cat" className="input" value={form.primaryCategory} onChange={(e) => set("primaryCategory", e.target.value)} />
          </div>
          <div className="pf-grid two" style={{ gap: 12 }}>
            <div className="field">
              <label className="label" htmlFor="f-origin">
                Origin
              </label>
              <select id="f-origin" className="select" value={form.origin} onChange={(e) => set("origin", e.target.value as Origin)}>
                {Object.entries(ORIGIN_LABEL).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="f-kind">
                Kind
              </label>
              <select id="f-kind" className="select" value={form.kind} onChange={(e) => set("kind", e.target.value as typeof form.kind)}>
                <option value="compound">Compound</option>
                <option value="mixture">Mixture</option>
                <option value="polymer">Polymer</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="f-score">
            Health score: <span className="mono">{form.healthScore}</span>
          </label>
          <div className="row">
            <input id="f-score" className="range" type="range" min={0} max={100} value={form.healthScore} onChange={(e) => set("healthScore", Number(e.target.value))} />
            <ScorePill score={form.healthScore} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="f-rationale">
            Score rationale
          </label>
          <textarea id="f-rationale" className="textarea" style={{ minHeight: 80 }} value={form.scoreRationale} onChange={(e) => set("scoreRationale", e.target.value)} />
        </div>
        <div className="field">
          <label className="label" htmlFor="f-summary">
            Consumer summary
          </label>
          <textarea id="f-summary" className="textarea" style={{ minHeight: 90 }} value={form.summary} onChange={(e) => set("summary", e.target.value)} />
        </div>
        <div className="pf-grid two">
          <div className="field">
            <label className="label" htmlFor="f-concerns">
              Concerns
            </label>
            <input id="f-concerns" className="input" value={form.concerns} onChange={(e) => set("concerns", e.target.value)} aria-describedby="f-concerns-hint" />
            <span id="f-concerns-hint" className="hint">
              Comma-separated keys: {knownConcerns}
            </span>
          </div>
          <div className="field">
            <label className="label" htmlFor="f-aliases">
              Aliases (label spellings, INCI, E-numbers)
            </label>
            <input id="f-aliases" className="input" value={form.aliases} onChange={(e) => set("aliases", e.target.value)} />
          </div>
        </div>
        <div>
          <button className="btn btn-primary" disabled={saving}>
            {saving && <span className="spinner" aria-hidden="true" />} Save changes
          </button>
        </div>
      </form>
      <details className="disclosure" style={{ margin: "0 calc(var(--sp-5) * -1)" }}>
        <summary>Advanced: edit identity &amp; full profile (JSON)</summary>
        <div className="content stack">
          <label htmlFor="f-json" className="sr-only">
            Profile JSON
          </label>
          <textarea id="f-json" className="textarea json-editor" value={json} onChange={(e) => setJson(e.target.value)} spellCheck={false} aria-invalid={!!jsonError} />
          {jsonError && (
            <span className="error-text" role="alert">
              <TriangleAlert width={16} height={16} aria-hidden="true" /> {jsonError}
            </span>
          )}
          <div>
            <button className="btn" type="button" onClick={saveJson} disabled={saving}>
              Save JSON
            </button>
          </div>
        </div>
      </details>
    </section>
  );
}

function MergeDialog({
  token,
  from,
  target,
  setTarget,
  onClose,
  onMerge,
}: {
  token: string;
  from: AdminIngredient;
  target: IngredientSummary | null;
  setTarget: (t: IngredientSummary | null) => void;
  onClose: () => void;
  onMerge: (into: IngredientSummary) => void;
}) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<IngredientSummary[]>([]);
  useEffect(() => {
    const t = setTimeout(() => {
      void adminApi.list(token, { q, status: "verified" }).then((r) => setItems(r.items.filter((i) => i.id !== from.id).slice(0, 8)));
    }, 200);
    return () => clearTimeout(t);
  }, [token, q, from.id]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return createPortal(
    <div className="dialog-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog stack" role="dialog" aria-modal="true" aria-labelledby="merge-title" style={{ width: "min(100%, 520px)" }}>
        <h2 id="merge-title">Merge “{from.name}” into…</h2>
        <p className="muted" style={{ fontSize: "var(--text-sm)" }}>
          Use this when OCR created a duplicate (e.g. a misspelling). Its label spelling becomes an alias and saved scans are repointed.
        </p>
        <div className="search">
          <Search aria-hidden="true" />
          <label htmlFor="merge-q" className="sr-only">
            Search verified ingredients
          </label>
          <input id="merge-q" className="input" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search verified ingredients" />
        </div>
        <ul className="queue card" style={{ maxHeight: 280 }}>
          {items.map((i) => (
            <li key={i.id}>
              <button aria-current={target?.id === i.id} onClick={() => setTarget(i)}>
                <span className="grow" style={{ fontWeight: 600 }}>
                  {i.name}
                </span>
                <ScorePill score={i.healthScore} size="sm" />
              </button>
            </li>
          ))}
        </ul>
        <div className="actions">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!target}
            onClick={() => {
              if (target) onMerge(target);
              onClose();
            }}
          >
            <GitMerge aria-hidden="true" /> Merge
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function CostsPanel({ overview }: { overview: AdminOverview }) {
  const { ai } = overview;
  const perIngredient = ai.costPerIngredient;
  return (
    <div className="pf-grid two">
      <section className="card card-pad stack" aria-labelledby="cost-title">
        <h2 id="cost-title" className="section-title">
          Operating costs
        </h2>
        <p className="muted" style={{ fontSize: "var(--text-sm)" }}>
          Plan estimates alongside live AI spend. Because verified profiles are cached permanently, AI runs once per new ingredient, never per scan.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="cost-table">
            <thead>
              <tr>
                <th scope="col">Expense</th>
                <th scope="col">0–1k users</th>
                <th scope="col">10k users</th>
                <th scope="col">This month</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free data APIs (PubChem, PubMed)</td>
                <td>$0.00</td>
                <td>$0.00</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>AI pipeline (OCR + text)</td>
                <td>~$1–5</td>
                <td>~$15–40</td>
                <td>{usd(ai.month.costUsd, 4)}</td>
              </tr>
              <tr>
                <td>Cloud database &amp; hosting</td>
                <td>$0 (free tier)</td>
                <td>~$25</td>
                <td>$0.00 (self-hosted)</td>
              </tr>
              <tr>
                <td>Developer accounts (Apple &amp; Google)</td>
                <td>~$10.75</td>
                <td>~$10.75</td>
                <td>n/a (web app)</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Estimated total</td>
                <td>~$12–16</td>
                <td>~$50–75</td>
                <td>{usd(ai.month.costUsd, 2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      <section className="card card-pad stack" aria-labelledby="ai-title">
        <h2 id="ai-title" className="section-title">
          AI usage
        </h2>
        <dl className="facts">
          <div>
            <dt>Status</dt>
            <dd>{ai.enabled ? `On · ${ai.model}` : "Off · extractive summarizer (set ANTHROPIC_API_KEY to enable)"}</dd>
          </div>
          <div>
            <dt>Calls this month</dt>
            <dd className="tabular">{compactNumber(ai.month.calls)}</dd>
          </div>
          <div>
            <dt>Tokens this month</dt>
            <dd className="tabular">
              {compactNumber(ai.month.inputTokens)} in · {compactNumber(ai.month.outputTokens)} out
            </dd>
          </div>
          <div>
            <dt>All-time spend</dt>
            <dd className="tabular">{usd(ai.allTime.costUsd, 4)}</dd>
          </div>
          <div>
            <dt>Cost per new ingredient</dt>
            <dd className="tabular">{perIngredient == null ? "—" : `${usd(perIngredient, 4)} (${(perIngredient * 100).toFixed(2)}¢)`}</dd>
          </div>
        </dl>
        <h3 className="sub-title" style={{ marginTop: 12 }}>
          Recent activity
        </h3>
        <ul className="audit">
          {overview.audit.map((a) => (
            <li key={a.id}>
              <time dateTime={a.createdAt}>{shortTime(a.createdAt)}</time>
              <span>
                <strong>{a.action.replace(/_/g, " ")}</strong>
                {a.name ? ` · ${a.name}` : ""}
                {a.detail ? <span className="subtle"> · {a.detail}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
