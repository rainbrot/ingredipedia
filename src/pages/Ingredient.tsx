import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CircleCheck,
  ExternalLink,
  FlaskConical,
  Hourglass,
  Lightbulb,
  Microscope,
  Share2,
  Sparkles,
  TriangleAlert,
  WandSparkles,
} from "lucide-react";
import { CONCERN_LABEL, ORIGIN_LABEL, SECTORS, type Citation, type SourcedItem } from "../../shared/types";
import { api, ApiError } from "../lib/api";
import { useServerEvents } from "../lib/events";
import { compactNumber } from "../lib/format";
import { useAsync } from "../lib/useAsync";
import { MoleculeViewer } from "../components/MoleculeViewer";
import { useToast } from "../components/Toast";
import { Disclosure, EmptyState, ErrorState, Formula, GradeLabel, OriginChip, ResearchChip, ScoreRing, Skeleton, StatusChip } from "../components/ui";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "function", label: "Function & mechanisms" },
  { id: "safety", label: "Safety" },
  { id: "synthesis", label: "Synthesis" },
  { id: "history", label: "Fun facts" },
  { id: "sources", label: "Sources" },
];

const PENDING = "Not described in the retrieved sources.";
const has = (s?: string | null) => !!s && s.trim() !== "" && s !== PENDING;

export function IngredientPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: ing, error, loading, reload, setData } = useAsync(() => api.ingredient(id), [id]);
  const active = useScrollSpy(ing ? SECTIONS.map((s) => s.id) : []);
  const location = useLocation();

  // Deep links like /ingredient/x#safety: scroll once the profile has rendered.
  useEffect(() => {
    if (ing && location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ing?.id, location.hash]);

  useServerEvents((e) => {
    if ((e.type === "ingredient.verified" || e.type === "ingredient.updated") && e.id === id) {
      void api.ingredient(id).then((next) => {
        setData(next);
        if (e.type === "ingredient.verified") toast(<><strong>{next.name}</strong> is now verified by our scientists.</>, "success");
      });
    }
  });

  if (loading && !ing) return <ProfileSkeleton />;
  if (error || !ing) {
    const status = error instanceof ApiError ? error.status : 0;
    if (status === 403) {
      return (
        <EmptyState icon={<Hourglass />} title="Under scientific review" action={<Link to="/library" className="btn">Browse verified ingredients</Link>}>
          {((error as ApiError).body as { name?: string })?.name ?? "This ingredient"} is new to Assay. Its profile will be published for everyone once a scientist verifies it.
        </EmptyState>
      );
    }
    if (status === 404) {
      return (
        <EmptyState icon={<FlaskConical />} title="Ingredient not found" action={<Link to="/library" className="btn">Open the library</Link>}>
          It may have been merged into another profile.
        </EmptyState>
      );
    }
    return <ErrorState message={error?.message ?? "Could not load this ingredient."} onRetry={() => reload()} />;
  }

  const p = ing.profile;
  const isDraft = ing.status !== "verified";
  const unsupported = new Set(ing.draft?.unsupportedFields ?? []);
  const cited = new Map(ing.citations.map((c, i) => [`PMID:${c.pmid}`, i + 1]));

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: `${ing.name} · Assay`, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        toast("Link copied to clipboard", "success");
      }
    } catch {
      /* cancelled */
    }
  };

  return (
    <div className="fade-up">
      <div className="row">
        <button className="btn btn-ghost" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/library"))}>
          <ArrowLeft aria-hidden="true" /> Back
        </button>
        <div className="grow" />
        <button className="icon-btn" onClick={share} aria-label="Share this ingredient">
          <Share2 aria-hidden="true" />
        </button>
      </div>

      <header className="profile-head">
        <div className="chip-row">
          <StatusChip ing={ing} />
          <ResearchChip state={isDraft ? ing.researchState : null} />
          <OriginChip origin={ing.origin} />
          {ing.sectors.map((s) => (
            <span key={s} className="chip">
              {SECTORS.find((x) => x.id === s)?.label}
            </span>
          ))}
        </div>
        <h1>{ing.name}</h1>
        <p className="lede">
          {ing.primaryRole} · {ing.primaryCategory}
        </p>
      </header>

      {isDraft && (
        <div className="callout draft" style={{ marginBottom: 24 }}>
          <WandSparkles aria-hidden="true" />
          <div>
            <strong>Basic AI Draft.</strong> This ingredient is new to Assay, so this profile was generated automatically from PubChem
            {ing.citations.length > 0 ? " and PubMed abstracts" : ""} and is visible only to you. A scientist will fact-check it before it's published to everyone.
            {ing.researchState !== "complete" && " Deeper research is running in the background, and this page will update when it finishes."}
          </div>
        </div>
      )}

      <div className="kpis">
        <div className="kpi" style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <ScoreRing score={ing.healthScore} size={72} stroke={8} caption="/100" />
          <div>
            <div className="k">Health score</div>
            <GradeLabel score={ing.healthScore} />
          </div>
        </div>
        <div className="kpi">
          <span className="k">Research</span>
          <span className="v">{ing.researchCount == null ? "—" : compactNumber(ing.researchCount)}</span>
          <span className="s">{ing.researchCount == null ? "PubMed count pending" : "PubMed publications"}</span>
        </div>
        <div className="kpi">
          <span className="k">Origin</span>
          <span className="v" style={{ fontSize: "var(--text-lg)" }}>
            {ORIGIN_LABEL[ing.origin]}
          </span>
          <span className="s">{ing.kind === "compound" ? "Single compound" : ing.kind === "polymer" ? "Polymer" : "Mixture"}</span>
        </div>
        <div className="kpi">
          {ing.usdaCount != null ? (
            <>
              <span className="k">In U.S. foods</span>
              <span className="v">{compactNumber(ing.usdaCount)}</span>
              <span className="s">branded products (USDA)</span>
            </>
          ) : (
            <>
              <span className="k">Concerns</span>
              <span className="v">{ing.concerns.length || "None"}</span>
              <span className="s">{ing.concerns.length ? "flagged below" : "at typical use levels"}</span>
            </>
          )}
        </div>
      </div>

      <div className="stack" style={{ marginTop: 24 }}>
        <p className="summary-text">{ing.summary}</p>
        {ing.concerns.length > 0 && (
          <div className="chip-row" aria-label="Concerns">
            {ing.concerns.map((c) => (
              <span key={c} className="chip warn">
                <TriangleAlert aria-hidden="true" /> {CONCERN_LABEL[c] ?? c}
              </span>
            ))}
          </div>
        )}
        <div className="card">
          <Disclosure summary="Why this score?">
            <p className="prose small">{ing.scoreRationale}</p>
          </Disclosure>
        </div>
      </div>

      <nav className="section-nav" aria-label="Profile sections">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
            {s.label}
          </a>
        ))}
      </nav>

      {/* Section 1 */}
      <section id="overview" className="pf-section" aria-labelledby="h-overview">
        <header>
          <span className="num">01</span>
          <h2 id="h-overview">Overview &amp; molecular identity</h2>
        </header>
        <div className="pf-grid two">
          <div className="card card-pad">
            <p className="sub-title">Identity</p>
            <dl className="facts">
              <Fact k="Common name" v={ing.name} />
              {ing.identity.iupac && <Fact k="IUPAC name" v={<span className="mono" style={{ fontSize: "0.875rem" }}>{ing.identity.iupac}</span>} />}
              {ing.identity.inci && <Fact k="INCI name" v={ing.identity.inci} />}
              {ing.identity.eNumber && <Fact k="E-number" v={ing.identity.eNumber} />}
              {ing.identity.cas && <Fact k="CAS number" v={<span className="mono">{ing.identity.cas}</span>} />}
              {ing.identity.formula && <Fact k="Molecular formula" v={<Formula value={ing.identity.formula} />} />}
              {ing.identity.weight && <Fact k="Molar mass" v={<span className="tabular">{ing.identity.weight.toFixed(2)} g/mol</span>} />}
              <Fact k="Primary category" v={ing.primaryCategory} />
              <Fact k="Primary role" v={ing.primaryRole} />
              {ing.pubchemCid && (
                <Fact
                  k="PubChem"
                  v={
                    <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${ing.pubchemCid}`} target="_blank" rel="noreferrer">
                      CID {ing.pubchemCid} <ExternalLink width={14} height={14} style={{ display: "inline", verticalAlign: "-2px" }} aria-hidden="true" />
                    </a>
                  }
                />
              )}
            </dl>
          </div>
          <div className="card card-pad">
            <p className="sub-title">Physical properties</p>
            <dl className="facts">
              <Fact k="Physical state" v={ing.identity.physical?.state || "—"} />
              <Fact k="Solubility" v={ing.identity.physical?.solubility || "—"} />
              <Fact k="pH stability" v={ing.identity.physical?.phStability || "—"} />
              <Fact k="Melting point" v={ing.identity.physical?.meltingPoint || "—"} />
            </dl>
            {ing.identity.functionalGroups && ing.identity.functionalGroups.length > 0 && (
              <>
                <p className="sub-title" style={{ marginTop: 20 }}>
                  Functional groups
                </p>
                <div className="chip-row">
                  {ing.identity.functionalGroups.map((g) => (
                    <span key={g} className="chip">
                      {g}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <p className="sub-title" style={{ marginTop: 28 }}>
          Molecular structure
        </p>
        {ing.pubchemCid ? (
          <div className="structure-grid">
            <div className="plate">
              <div className="plate-head">
                <span>2D skeletal formula</span>
              </div>
              <div className="plate-body paper">
                <img src={`/api/ingredients/${ing.id}/structure.png`} alt={`2D skeletal structure of ${ing.name} showing its bonds and functional groups`} loading="lazy" />
              </div>
              <div className="plate-foot">
                <span>Source: PubChem CID {ing.pubchemCid}</span>
              </div>
            </div>
            <MoleculeViewer src={`/api/ingredients/${ing.id}/sdf`} label={ing.name} />
          </div>
        ) : (
          <div className="callout">
            <Microscope aria-hidden="true" />
            <div>
              <strong>{ing.kind === "compound" ? "No structure on file yet." : `${ing.name} is a ${ing.kind}, not a single molecule.`}</strong>{" "}
              {ing.identity.composition ?? "Its composition varies by source and processing, so there's no single structure to display."}
            </div>
          </div>
        )}
        {ing.identity.composition && ing.pubchemCid && (
          <p className="prose small" style={{ marginTop: 12 }}>
            <strong>Composition:</strong> {ing.identity.composition}
          </p>
        )}
      </section>

      {/* Section 2 */}
      <section id="function" className="pf-section" aria-labelledby="h-function">
        <header>
          <span className="num">02</span>
          <h2 id="h-function">Functional role &amp; scientific mechanisms</h2>
        </header>
        {!p ? (
          <PendingBlock />
        ) : (
          <div className="stack-lg" style={{ gap: 28 }}>
            <div>
              <p className="sub-title">Why formulators use it</p>
              <p className="prose">{p.function}</p>
            </div>
            <ItemList title="Chemical reactions & dynamics" items={p.reactions} cited={cited} flagged={unsupported.has("reactions")} empty="No specific reactions were described in the sources reviewed so far." />
            <ItemList title="Biological mechanisms of action" items={p.mechanisms} cited={cited} flagged={unsupported.has("mechanisms")} empty="No mechanisms were described in the sources reviewed so far." />
          </div>
        )}
      </section>

      {/* Section 3 */}
      <section id="safety" className="pf-section" aria-labelledby="h-safety">
        <header>
          <span className="num">03</span>
          <h2 id="h-safety">Safety, toxicology &amp; misconceptions</h2>
        </header>
        {!p ? (
          <PendingBlock />
        ) : (
          <div className="stack-lg" style={{ gap: 28 }}>
            <div>
              <p className="sub-title">Regulatory profile</p>
              {p.regulatory.length ? (
                <div className="card" style={{ overflow: "hidden" }}>
                  <table className="reg-table">
                    <thead>
                      <tr>
                        <th scope="col">Authority</th>
                        <th scope="col">Evaluation</th>
                        <th scope="col">Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.regulatory.map((r, i) => (
                        <tr key={i}>
                          <td>{r.body}</td>
                          <td>{r.status}</td>
                          <td className="muted">{r.limit ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="muted">No regulatory evaluations recorded yet.</p>
              )}
            </div>
            <div className="pf-grid two">
              <div className="item-card">
                <h3>Toxicological mechanism &amp; hazard context</h3>
                <p>{has(p.toxicology.mechanism) ? p.toxicology.mechanism : "No toxicity mechanism has been documented yet."}</p>
              </div>
              <div className="item-card" style={{ background: "var(--primary-soft)", borderColor: "transparent" }}>
                <h3>Dosage &amp; route context</h3>
                <p style={{ color: "var(--ink)" }}>{has(p.toxicology.dosage) ? p.toxicology.dosage : "Concentration context has not been documented yet."}</p>
              </div>
            </div>
            <div className="item-card">
              <h3>Sensitization &amp; allergen risk</h3>
              <p>{has(p.sensitization) ? p.sensitization : "No sensitization data has been documented yet."}</p>
            </div>
            <div>
              <p className="sub-title">Common misconceptions</p>
              {p.myths.length ? (
                <div className="stack" style={{ gap: 12 }}>
                  {p.myths.map((m, i) => (
                    <div key={i} className="myth">
                      <div className="claim">
                        <span className="tag">
                          <TriangleAlert aria-hidden="true" /> The claim
                        </span>
                        <p>{m.claim}</p>
                      </div>
                      <div className="science">
                        <span className="tag">
                          <CircleCheck aria-hidden="true" /> The science
                        </span>
                        <p>{m.consensus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="muted">No common misconceptions recorded yet.</p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Section 4 */}
      <section id="synthesis" className="pf-section" aria-labelledby="h-synthesis">
        <header>
          <span className="num">04</span>
          <h2 id="h-synthesis">Synthesis &amp; manufacturing</h2>
        </header>
        {!p ? (
          <PendingBlock />
        ) : (
          <div className="stack-lg" style={{ gap: 28 }}>
            <div>
              <p className="sub-title">Production method</p>
              <p className="prose">{has(p.synthesis.method) ? p.synthesis.method : "Manufacturing route not yet documented."}</p>
            </div>
            {(p.synthesis.steps.length > 0 || (p.synthesis.equations?.length ?? 0) > 0) && (
              <div className="pf-grid two">
                {p.synthesis.steps.length > 0 && (
                  <div>
                    <p className="sub-title">Process steps</p>
                    <ol className="ordered-steps">
                      {p.synthesis.steps.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {(p.synthesis.equations?.length ?? 0) > 0 && (
                  <div>
                    <p className="sub-title">Key reactions</p>
                    {p.synthesis.equations!.map((eq, i) => (
                      <code key={i} className="equation">
                        <Formula value={eq} />
                      </code>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div>
              <p className="sub-title">Environmental &amp; green chemistry profile</p>
              <div className="env-grid">
                <div className="item-card">
                  <h3>Persistence</h3>
                  <p>{has(p.environment.persistence) ? p.environment.persistence : "Not yet documented."}</p>
                </div>
                <div className="item-card">
                  <h3>Biodegradability</h3>
                  <p>{has(p.environment.biodegradability) ? p.environment.biodegradability : "Not yet documented."}</p>
                </div>
                <div className="item-card">
                  <h3>Aquatic toxicity</h3>
                  <p>{has(p.environment.aquaticToxicity) ? p.environment.aquaticToxicity : "Not yet documented."}</p>
                </div>
              </div>
              {p.environment.notes && <p className="prose small" style={{ marginTop: 12 }}>{p.environment.notes}</p>}
            </div>
          </div>
        )}
      </section>

      {/* Section 5 */}
      <section id="history" className="pf-section" aria-labelledby="h-history">
        <header>
          <span className="num">05</span>
          <h2 id="h-history">Fun facts &amp; historical context</h2>
        </header>
        {!p ? (
          <PendingBlock />
        ) : (
          <div className="fun-grid">
            <div className="item-card">
              <h3 className="row" style={{ gap: 8 }}>
                <BookOpen width={18} height={18} aria-hidden="true" style={{ color: "var(--primary)" }} /> History &amp; discovery
              </h3>
              <p>{has(p.fun.history) ? p.fun.history : "Its history hasn't been written up yet."}</p>
            </div>
            <div className="stack">
              <div className="item-card">
                <h3 className="row" style={{ gap: 8 }}>
                  <Lightbulb width={18} height={18} aria-hidden="true" style={{ color: "var(--primary)" }} /> Surprising everyday uses
                </h3>
                {p.fun.uses.length ? (
                  <ul className="use-list">
                    {p.fun.uses.map((u, i) => (
                      <li key={i}>
                        <Sparkles aria-hidden="true" />
                        {u}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No other uses recorded yet.</p>
                )}
              </div>
              <div className="item-card">
                <h3>Natural occurrence</h3>
                <p>{has(p.fun.occurrence) ? p.fun.occurrence : "Not yet documented."}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sources */}
      <section id="sources" className="pf-section" aria-labelledby="h-sources">
        <header>
          <span className="num">06</span>
          <h2 id="h-sources">Peer-reviewed citations</h2>
        </header>
        {ing.citations.length ? (
          <div className="card card-pad">
            <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {ing.citations.map((c, i) => (
                <CitationItem key={c.pmid ?? i} c={c} n={i + 1} />
              ))}
            </ol>
          </div>
        ) : (
          <div className="callout">
            <Hourglass aria-hidden="true" />
            <div>
              Citations are gathered from PubMed automatically. None are attached yet; they'll appear here as soon as the literature search completes.
            </div>
          </div>
        )}
        <p className="subtle" style={{ fontSize: "var(--text-xs)", marginTop: 16 }}>
          Chemical data from PubChem (NIH). Literature from PubMed via NCBI E-utilities. {ing.usdaCount != null && "Prevalence from USDA FoodData Central. "}
          {ing.verifiedAt ? `Verified ${new Date(ing.verifiedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.` : ""} Educational information, not medical advice.
        </p>
      </section>
    </div>
  );
}

function Fact({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}

function ItemList({ title, items, cited, flagged, empty }: { title: string; items: SourcedItem[]; cited: Map<string, number>; flagged: boolean; empty: string }) {
  return (
    <div>
      <p className="sub-title row" style={{ gap: 8 }}>
        {title}
        {flagged && <span className="chip draft">General knowledge, pending review</span>}
      </p>
      {items.length === 0 ? (
        <p className="muted">{empty}</p>
      ) : (
        <div className="pf-grid two">
          {items.map((it, i) => (
            <div key={i} className="item-card">
              <h3>{it.title}</h3>
              <p>{it.description}</p>
              {it.equation && (
                <code className="equation">
                  <Formula value={it.equation} />
                </code>
              )}
              {it.sources && it.sources.length > 0 && (
                <div className="source-links">
                  {it.sources.map((s) =>
                    cited.has(s) ? (
                      <a key={s} className="source-link" href={`#cite-${cited.get(s)}`}>
                        [{cited.get(s)}] {s}
                      </a>
                    ) : (
                      <span key={s} className="source-link">
                        {s}
                      </span>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CitationItem({ c, n }: { c: Citation; n: number }) {
  return (
    <li className="citation" id={`cite-${n}`}>
      <div className="row" style={{ alignItems: "flex-start", gap: 12 }}>
        <span className="mono subtle" style={{ fontSize: "var(--text-sm)", paddingTop: 1 }}>
          [{n}]
        </span>
        <div className="grow">
          <div className="title">{c.title}</div>
          <div className="meta">
            {[c.authors, c.journal, c.year].filter(Boolean).join(" · ")}
          </div>
          <div className="links">
            {c.pmid && (
              <a href={c.url} target="_blank" rel="noreferrer">
                PubMed {c.pmid} <ExternalLink width={13} height={13} style={{ display: "inline", verticalAlign: "-2px" }} aria-hidden="true" />
              </a>
            )}
            {c.doi && (
              <a href={`https://doi.org/${c.doi}`} target="_blank" rel="noreferrer">
                DOI <ExternalLink width={13} height={13} style={{ display: "inline", verticalAlign: "-2px" }} aria-hidden="true" />
              </a>
            )}
          </div>
          {c.abstract && (
            <details>
              <summary>Read abstract</summary>
              <p>{c.abstract}</p>
            </details>
          )}
        </div>
      </div>
    </li>
  );
}

function PendingBlock() {
  return (
    <div className="callout">
      <Hourglass aria-hidden="true" />
      <div>This section is still being researched.</div>
    </div>
  );
}

/** Highlights the section-nav link for the section currently in view. */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const key = ids.join(",");
  useEffect(() => {
    if (!ids.length) return;
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

function ProfileSkeleton() {
  return (
    <div className="stack-lg" aria-busy="true" aria-label="Loading ingredient">
      <Skeleton h={22} w={220} />
      <Skeleton h={56} w="60%" />
      <div className="kpis">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} h={96} r={18} />
        ))}
      </div>
      <Skeleton h={18} />
      <Skeleton h={18} w="80%" />
      <Skeleton h={320} r={18} />
    </div>
  );
}
