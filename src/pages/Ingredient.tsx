import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Atom, ExternalLink, FlagTriangleRight, FlaskConical, GraduationCap, Hourglass, Microscope, Share2, TriangleAlert } from "lucide-react";
import { CONCERN_LABEL, ORIGIN_LABEL, SECTORS, type Citation, type Ingredient, type Mechanism, type Reaction, type Hazard, type SynthesisRoute } from "../../shared/types";
import { api, ApiError } from "../lib/api";
import { useServerEvents } from "../lib/events";
import { compactNumber, papersLabel } from "../lib/format";
import { discover } from "../lib/progress";
import { useAsync } from "../lib/useAsync";
import { LESSONS } from "../learn/lessons";
import { MoleculeViewer } from "../components/MoleculeViewer";
import { GlossaryScope, GlossaryText } from "../components/GlossaryText";
import { Tabs, TabPanel, useTabsId, type TabDef } from "../components/Tabs";
import { useToast } from "../components/Toast";
import { Disclosure, EmptyState, ErrorState, EvidenceBadge, Formula, GradeLabel, OriginChip, ResearchChip, ScoreRing, Skeleton, StatusChip } from "../components/ui";

type TabId = "overview" | "mechanisms" | "reactions" | "safety" | "synthesis" | "sources";
const TAB_IDS: TabId[] = ["overview", "mechanisms", "reactions", "safety", "synthesis", "sources"];

const PENDING = "Not described in the retrieved sources.";
const has = (s?: string | null) => !!s && s.trim() !== "" && s !== PENDING;

export function IngredientPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const { data: ing, error, loading, reload, setData } = useAsync(() => api.ingredient(id), [id]);
  const idBase = useTabsId();
  const tabParam = params.get("tab") as TabId | null;
  const tab: TabId = tabParam && TAB_IDS.includes(tabParam) ? tabParam : "overview";
  const [anchor, setAnchor] = useState<string | null>(null);

  const setTab = (next: TabId, hash?: string) => {
    const p = new URLSearchParams(params);
    if (next === "overview") p.delete("tab");
    else p.set("tab", next);
    setParams(p, { replace: true });
    setAnchor(hash ?? null);
  };

  // Jump to a citation after switching to the Sources tab.
  useEffect(() => {
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("flash");
      window.setTimeout(() => el.classList.remove("flash"), 1600);
    }
    setAnchor(null);
  }, [anchor, tab]);

  // Opening a profile adds the molecule to the student's collection.
  useEffect(() => {
    if (ing && discover(ing.id)) {
      toast(
        <>
          <strong>{ing.name}</strong> added to your molecule collection. <Link to="/learn/collection">View collection</Link>
        </>,
        "success",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ing?.id]);

  useServerEvents((e) => {
    if ((e.type === "ingredient.researched" || e.type === "ingredient.updated") && e.id === id) {
      void api.ingredient(id).then((next) => {
        setData(next);
        if (e.type === "ingredient.researched") toast(<>Research finished. <strong>{next.name}</strong> has been updated with new sources.</>, "success");
      });
    }
  });

  if (loading && !ing) return <ProfileSkeleton />;
  if (error || !ing) {
    const status = error instanceof ApiError ? error.status : 0;
    if (status === 404) {
      return (
        <EmptyState icon={<FlaskConical />} title="Ingredient not found" action={<Link to="/library" className="btn">Open the library</Link>}>
          It may have been merged into another profile, or the link is mistyped.
        </EmptyState>
      );
    }
    return <ErrorState message={error?.message ?? "Couldn't load this ingredient."} onRetry={() => reload()} />;
  }

  const p = ing.profile;
  const cited = new Map(ing.citations.map((c, i) => [c.pmid ? `PMID:${c.pmid}` : c.url, i + 1]));
  const unsupported = new Set(ing.draft?.unsupportedFields ?? []);
  const lessons = LESSONS.filter((l) => l.ingredients.includes(ing.id));

  const tabs: TabDef<TabId>[] = [
    { id: "overview", label: "Overview" },
    { id: "mechanisms", label: "Mechanisms", count: p?.mechanisms.length },
    { id: "reactions", label: "Reactions", count: p?.reactions.length },
    { id: "safety", label: "Safety", count: p?.hazards.length },
    { id: "synthesis", label: "Synthesis", count: p?.synthesis.length },
    { id: "sources", label: "Sources", count: ing.citations.length },
  ];

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: `${ing.name} · Assay`, url });
      else {
        await navigator.clipboard.writeText(url);
        toast("Link copied. Paste it into a message or assignment.", "success");
      }
    } catch {
      /* cancelled */
    }
  };

  const sourceProps = { cited, onCite: (n: number) => setTab("sources", `cite-${n}`) };
  const nextTab = tabs[TAB_IDS.indexOf(tab) + 1];

  /** Switch tabs from the bottom of a panel and bring the tab bar back into view. */
  const goTo = (next: TabId) => {
    setTab(next);
    const bar = document.querySelector(".tabs-sticky");
    if (bar) window.scrollTo({ top: bar.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
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
        <h1>{ing.name}</h1>
        <p className="lede">
          {ing.primaryRole} · {ing.primaryCategory}
          {ing.identity.formula && (
            <>
              {" "}
              · <Formula value={ing.identity.formula} />
            </>
          )}
        </p>
        <div className="chip-row">
          <StatusChip ing={ing} />
          <ResearchChip state={ing.status === "curated" ? null : ing.researchState} />
          <OriginChip origin={ing.origin} />
          {ing.sectors.map((s) => (
            <span key={s} className="chip">
              {SECTORS.find((x) => x.id === s)?.label}
            </span>
          ))}
        </div>
      </header>

      {ing.status === "preliminary" && (
        <div className="callout draft">
          <Hourglass aria-hidden="true" />
          <div>
            <strong>Preliminary profile.</strong> {ing.name} is new to Assay, so this first draft was built instantly from chemistry rules
            {ing.pubchemCid ? " and PubChem" : ""}.{" "}
            {ing.researchState === "complete" || ing.researchState === "failed"
              ? "The automatic literature search found little to add yet, so treat these details as a starting point."
              : "Assay is searching PubChem and PubMed right now, and this page will update by itself when it's done."}
          </div>
        </div>
      )}

      <section className="glance" aria-label="At a glance">
        <div className="glance-score">
          <ScoreRing score={ing.healthScore} size={88} stroke={9} caption="/100" />
          <div>
            <span className="glance-k">Health score</span>
            <GradeLabel score={ing.healthScore} />
          </div>
        </div>
        <div className="glance-body">
          <p className="summary-text">{ing.summary}</p>
          {ing.concerns.length > 0 && (
            <div className="chip-row" aria-label="Flags">
              {ing.concerns.map((c) => (
                <span key={c} className="chip warn">
                  <TriangleAlert aria-hidden="true" /> {CONCERN_LABEL[c] ?? c}
                </span>
              ))}
            </div>
          )}
          <dl className="glance-facts">
            <div>
              <dt>Research</dt>
              <dd className="tabular">{ing.researchCount == null ? "Counting…" : papersLabel(ing.researchCount)}</dd>
            </div>
            <div>
              <dt>Origin</dt>
              <dd>{ORIGIN_LABEL[ing.origin]}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{ing.kind === "compound" ? "Single compound" : ing.kind === "polymer" ? "Polymer" : "Mixture"}</dd>
            </div>
            {ing.usdaCount != null && (
              <div>
                <dt>In U.S. foods</dt>
                <dd className="tabular">{compactNumber(ing.usdaCount)} products</dd>
              </div>
            )}
          </dl>
          <Disclosure summary="How was this score calculated?">
            <p className="prose small">{ing.scoreRationale}</p>
          </Disclosure>
        </div>
      </section>

      <div className="tabs-sticky">
        <Tabs tabs={tabs} value={tab} onChange={(t) => setTab(t)} label={`${ing.name} profile sections`} idBase={idBase} />
      </div>

      <TabPanel idBase={idBase} id={tab}>
        <GlossaryScope key={tab}>
          {tab === "overview" && <OverviewTab ing={ing} lessons={lessons} />}
          {tab === "mechanisms" &&
            (p ? <MechanismsTab items={p.mechanisms} flagged={unsupported.has("mechanisms")} {...sourceProps} /> : <Pending />)}
          {tab === "reactions" && (p ? <ReactionsTab items={p.reactions} flagged={unsupported.has("reactions")} {...sourceProps} /> : <Pending />)}
          {tab === "safety" && (p ? <SafetyTab ing={ing} /> : <Pending />)}
          {tab === "synthesis" && (p ? <SynthesisTab routes={p.synthesis} /> : <Pending />)}
          {tab === "sources" && <SourcesTab ing={ing} />}
        </GlossaryScope>
      </TabPanel>

      {nextTab && (
        <nav className="tab-pager" aria-label="Next section">
          <button className="btn btn-ghost" onClick={() => goTo(nextTab.id)}>
            Next: {nextTab.label} <ArrowRight aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tabs

function OverviewTab({ ing, lessons }: { ing: Ingredient; lessons: typeof LESSONS }) {
  const p = ing.profile;
  const overview = p?.overview?.length ? p.overview : [ing.summary];
  return (
    <div className="panel-stack">
      <div className="prose-block">
        {overview.map((para, i) => (
          <p key={i} className={i === 0 ? "prose lead-para" : "prose"}>
            <GlossaryText text={para} />
          </p>
        ))}
      </div>

      {p && has(p.function) && (
        <section>
          <h2 className="panel-h">Why it's in your products</h2>
          <p className="prose">
            <GlossaryText text={p.function} />
          </p>
        </section>
      )}

      <section>
        <h2 className="panel-h">Molecular structure</h2>
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
                <span>PubChem CID {ing.pubchemCid}</span>
              </div>
            </div>
            <MoleculeViewer src={`/api/ingredients/${ing.id}/sdf`} label={ing.name} />
          </div>
        ) : (
          <div className="callout">
            <Microscope aria-hidden="true" />
            <div>
              <strong>{ing.kind === "compound" ? "No structure on file yet." : `${ing.name} is a ${ing.kind}, not a single molecule.`}</strong>{" "}
              {ing.identity.composition ?? "Its composition varies by source and processing, so there's no single structure to show."}
            </div>
          </div>
        )}
        {ing.identity.composition && ing.pubchemCid && (
          <p className="prose small" style={{ marginTop: 12 }}>
            <strong>Composition:</strong> {ing.identity.composition}
          </p>
        )}
      </section>

      <section className="id-grid">
        <div>
          <h2 className="panel-h">Identity</h2>
          <dl className="facts">
            {ing.identity.iupac && <Fact k="IUPAC name" v={<span className="mono" style={{ fontSize: "0.875rem" }}>{ing.identity.iupac}</span>} />}
            {ing.identity.inci && <Fact k="INCI name" v={ing.identity.inci} />}
            {ing.identity.eNumber && <Fact k="E-number" v={ing.identity.eNumber} />}
            {ing.identity.cas && <Fact k="CAS number" v={<span className="mono">{ing.identity.cas}</span>} />}
            {ing.identity.formula && <Fact k="Molecular formula" v={<Formula value={ing.identity.formula} />} />}
            {ing.identity.weight && <Fact k="Molar mass" v={<span className="tabular">{ing.identity.weight.toFixed(2)} g/mol</span>} />}
            {ing.aliases.length > 0 && <Fact k="Also listed as" v={ing.aliases.slice(0, 6).join(", ")} />}
            {ing.pubchemCid && (
              <Fact
                k="PubChem"
                v={
                  <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${ing.pubchemCid}`} target="_blank" rel="noreferrer">
                    CID {ing.pubchemCid} <ExternalLink className="inline-icon" aria-hidden="true" />
                  </a>
                }
              />
            )}
          </dl>
        </div>
        <div>
          <h2 className="panel-h">Physical properties</h2>
          <dl className="facts">
            <Fact k="State at room temperature" v={ing.identity.physical?.state || "—"} />
            <Fact k="Solubility" v={ing.identity.physical?.solubility || "—"} />
            <Fact k="pH behavior" v={ing.identity.physical?.phStability || "—"} />
            <Fact k="Melting point" v={ing.identity.physical?.meltingPoint || "—"} />
          </dl>
          {ing.identity.functionalGroups && ing.identity.functionalGroups.length > 0 && (
            <>
              <h3 className="mini-h">Functional groups</h3>
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
      </section>

      {lessons.length > 0 && (
        <section>
          <h2 className="panel-h">Learn the chemistry behind it</h2>
          <ul className="lesson-links">
            {lessons.map((l) => (
              <li key={l.id}>
                <Link to={`/learn/${l.id}`}>
                  <GraduationCap aria-hidden="true" />
                  <span className="grow">
                    <strong>{l.title}</strong>
                    <span>{l.summary}</span>
                  </span>
                  <span className="subtle tabular">{l.minutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

interface SourceProps {
  cited: Map<string, number>;
  onCite: (n: number) => void;
}

function SourceLinks({ sources, cited, onCite }: { sources?: string[] } & SourceProps) {
  if (!sources?.length) return null;
  const known = sources.filter((s) => cited.has(s));
  if (!known.length) return null;
  return (
    <div className="source-links">
      {known.map((s) => (
        <button key={s} type="button" className="source-link" onClick={() => onCite(cited.get(s)!)}>
          [{cited.get(s)}] {s.replace("PMID:", "PubMed ")}
        </button>
      ))}
    </div>
  );
}

/** One scale of an explanation; automatic profiles sometimes only find evidence for one side. */
function ScaleText({ text }: { text: string }) {
  if (!has(text)) return <p className="scale-missing">The sources found so far don't cover this side.</p>;
  return (
    <p>
      <GlossaryText text={text} />
    </p>
  );
}

function FlagNote({ show }: { show: boolean }) {
  if (!show) return null;
  return <p className="flag-note">Written from general chemistry knowledge; the retrieved sources didn't cover this directly.</p>;
}

function MechanismsTab({ items, flagged, ...src }: { items: Mechanism[]; flagged: boolean } & SourceProps) {
  if (!items.length) return <None text="No biological mechanisms have been described in the sources reviewed so far." />;
  return (
    <div className="panel-stack">
      <p className="panel-intro">
        Each mechanism is explained at two scales: what happens to the molecules, and what your body experiences as a result. The evidence meter shows how well
        each one is supported.
      </p>
      <FlagNote show={flagged} />
      {items.map((m, i) => (
        <article key={i} className="mech">
          <header>
            <h3>{m.title}</h3>
            <EvidenceBadge level={m.evidence} />
          </header>
          <div className="scales">
            <div className="scale">
              <span className="scale-k">
                <Atom aria-hidden="true" /> Chemical scale
              </span>
              <ScaleText text={m.chemical} />
            </div>
            <div className="scale">
              <span className="scale-k">
                <Microscope aria-hidden="true" /> Biological scale
              </span>
              <ScaleText text={m.biological} />
            </div>
          </div>
          <SourceLinks sources={m.sources} {...src} />
        </article>
      ))}
    </div>
  );
}

function ReactionsTab({ items, flagged, ...src }: { items: Reaction[]; flagged: boolean } & SourceProps) {
  if (!items.length) return <None text="No characteristic reactions have been described in the sources reviewed so far." />;
  return (
    <div className="panel-stack">
      <p className="panel-intro">How this molecule reacts with air, light, water and other chemicals, broken into the steps chemists use to describe it.</p>
      <FlagNote show={flagged} />
      {items.map((r, i) => (
        <article key={i} className="rxn">
          <h3>{r.title}</h3>
          <p className="prose">
            <GlossaryText text={r.summary} />
          </p>
          {r.equation && (
            <code className="equation">
              <Formula value={r.equation} />
            </code>
          )}
          {r.steps.length > 0 && (
            <ol className="rxn-steps">
              {r.steps.map((s, k) => (
                <li key={k}>
                  <span className="rxn-step-name">{s.name}</span>
                  <p>
                    <GlossaryText text={s.text} />
                  </p>
                </li>
              ))}
            </ol>
          )}
          {has(r.result) && (
            <div className="result">
              <span className="result-k">The result</span>
              <p>
                <GlossaryText text={r.result} />
              </p>
            </div>
          )}
          <SourceLinks sources={r.sources} {...src} />
        </article>
      ))}
    </div>
  );
}

function SafetyTab({ ing }: { ing: Ingredient }) {
  const p = ing.profile!;
  return (
    <div className="panel-stack">
      <section>
        <h2 className="panel-h">Regulatory status</h2>
        {p.regulatory.length ? (
          <div className="table-wrap">
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
      </section>

      <section>
        <h2 className="panel-h">Hazards and how they happen</h2>
        {p.hazards.length ? (
          <div className="stack" style={{ gap: 16 }}>
            {p.hazards.map((h, i) => (
              <HazardItem key={i} h={h} />
            ))}
          </div>
        ) : (
          <p className="muted">No specific hazards are documented at consumer use levels.</p>
        )}
      </section>

      <section className="dose-note">
        <h2 className="panel-h">Dose and exposure</h2>
        <p className="prose">
          <GlossaryText text={has(p.dosage) ? p.dosage : "Concentration context hasn't been documented yet."} />
        </p>
        <Link to="/learn/dose" className="inline-link">
          Why the dose makes the poison <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section>
        <h2 className="panel-h">Myths vs. the evidence</h2>
        {p.myths.length ? (
          <div className="stack" style={{ gap: 12 }}>
            {p.myths.map((m, i) => (
              <div key={i} className="myth">
                <div className="claim">
                  <span className="tag">Claim</span>
                  <p>{m.claim}</p>
                </div>
                <div className="science">
                  <span className="tag">Evidence</span>
                  <p>
                    <GlossaryText text={m.consensus} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">No common misconceptions recorded yet.</p>
        )}
      </section>

      <section>
        <h2 className="panel-h">Environmental profile</h2>
        <dl className="env-list">
          <div>
            <dt>Persistence</dt>
            <dd>
              <GlossaryText text={has(p.environment.persistence) ? p.environment.persistence : "Not yet documented."} />
            </dd>
          </div>
          <div>
            <dt>Biodegradability</dt>
            <dd>
              <GlossaryText text={has(p.environment.biodegradability) ? p.environment.biodegradability : "Not yet documented."} />
            </dd>
          </div>
          <div>
            <dt>Aquatic toxicity</dt>
            <dd>
              <GlossaryText text={has(p.environment.aquaticToxicity) ? p.environment.aquaticToxicity : "Not yet documented."} />
            </dd>
          </div>
        </dl>
        {p.environment.notes && <p className="prose small" style={{ marginTop: 12 }}>{p.environment.notes}</p>}
      </section>
    </div>
  );
}

function HazardItem({ h }: { h: Hazard }) {
  return (
    <article className="hazard">
      <h3>
        <TriangleAlert aria-hidden="true" /> {h.title}
      </h3>
      <p className="prose">
        <GlossaryText text={h.summary} />
      </p>
      <div className="scales">
        <div className="scale">
          <span className="scale-k">
            <Atom aria-hidden="true" /> Chemical mechanism
          </span>
          <ScaleText text={h.chemical} />
        </div>
        <div className="scale">
          <span className="scale-k">
            <Microscope aria-hidden="true" /> Biological mechanism
          </span>
          <ScaleText text={h.biological} />
        </div>
      </div>
    </article>
  );
}

function SynthesisTab({ routes }: { routes: SynthesisRoute[] }) {
  if (!routes.length) return <None text="How this ingredient is made hasn't been documented yet." />;
  return (
    <div className="panel-stack">
      <p className="panel-intro">How this ingredient is made, in living things, in the lab and at industrial scale.</p>
      {routes.map((r, i) => (
        <article key={i} className="route">
          <h3>{r.title}</h3>
          <p className="prose">
            <GlossaryText text={r.summary} />
          </p>
          {has(r.mechanism) && (
            <div className="route-mech">
              <span className="scale-k">Mechanism</span>
              <p>
                <GlossaryText text={r.mechanism} />
              </p>
            </div>
          )}
          {r.equation && (
            <code className="equation">
              <Formula value={r.equation} />
            </code>
          )}
          {r.steps && r.steps.length > 0 && (
            <ol className="ordered-steps">
              {r.steps.map((s, k) => (
                <li key={k}>
                  <GlossaryText text={s} />
                </li>
              ))}
            </ol>
          )}
          {r.significance && <p className="route-sig">{r.significance}</p>}
        </article>
      ))}
    </div>
  );
}

function SourcesTab({ ing }: { ing: Ingredient }) {
  return (
    <div className="panel-stack">
      <section>
        <h2 className="panel-h">Peer-reviewed literature</h2>
        {ing.citations.length ? (
          <ol className="cite-list">
            {ing.citations.map((c, i) => (
              <CitationItem key={c.pmid ?? i} c={c} n={i + 1} />
            ))}
          </ol>
        ) : (
          <div className="callout">
            <Hourglass aria-hidden="true" />
            <div>Citations are gathered from PubMed automatically. None are attached yet; they'll appear here when the literature search finishes.</div>
          </div>
        )}
      </section>

      {ing.sources.length > 0 && (
        <section>
          <h2 className="panel-h">Source documents</h2>
          <p className="muted small" style={{ marginBottom: 12 }}>
            The PubChem records and abstracts this profile was built from, so you can check any statement against the original.
          </p>
          <div className="card">
            {ing.sources.map((d) => (
              <Disclosure
                key={d.id}
                summary={
                  <span className="source-doc-sum">
                    <span className="chip">{d.source === "pubmed" ? "PubMed" : "PubChem"}</span> {d.title}
                  </span>
                }
              >
                <p className="prose small">{d.text}</p>
                <a href={d.url} target="_blank" rel="noreferrer" className="small">
                  Open original <ExternalLink className="inline-icon" aria-hidden="true" />
                </a>
              </Disclosure>
            ))}
          </div>
        </section>
      )}

      <ReportForm ing={ing} />

      <p className="subtle small">
        Chemical data from PubChem (NIH). Literature from PubMed via NCBI E-utilities. {ing.usdaCount != null && "Prevalence from USDA FoodData Central. "}
        Last updated {new Date(ing.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. Educational information, not medical
        advice.
      </p>
    </div>
  );
}

function ReportForm({ ing }: { ing: Ingredient }) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<null | boolean>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim().length < 3) return;
    setBusy(true);
    try {
      const r = await api.report(ing.id, reason.trim());
      setSent(r.requeued);
      toast(r.requeued ? "Thanks. Assay is re-researching this profile now." : "Thanks. This profile was refreshed recently, so your note was saved for the next update.", "success");
      setReason("");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Couldn't send your report.", "error");
    } finally {
      setBusy(false);
    }
  };

  if (sent !== null) {
    return (
      <div className="callout success" role="status">
        <FlagTriangleRight aria-hidden="true" />
        <div>{sent ? "Report received. Fresh research is running, and this page will update automatically." : "Report received and saved for the next refresh."}</div>
      </div>
    );
  }

  return (
    <section className="report">
      {!open ? (
        <button className="btn btn-ghost" onClick={() => setOpen(true)}>
          <FlagTriangleRight aria-hidden="true" /> Report a problem with this profile
        </button>
      ) : (
        <form onSubmit={submit} className="stack" style={{ gap: 12 }}>
          <div className="field">
            <label className="label" htmlFor="report-reason">
              What looks wrong or missing?
            </label>
            <textarea
              id="report-reason"
              className="textarea"
              rows={3}
              maxLength={500}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="For example: the melting point doesn't match PubChem."
              autoFocus
            />
            <span className="hint">Reports trigger a fresh automatic research pass. Please don't include personal information.</span>
          </div>
          <div className="row">
            <button type="submit" className="btn btn-primary" disabled={busy || reason.trim().length < 3}>
              {busy ? "Sending…" : "Send report"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------

function Fact({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}

function CitationItem({ c, n }: { c: Citation; n: number }) {
  return (
    <li className="citation" id={`cite-${n}`}>
      <span className="mono subtle cite-n">[{n}]</span>
      <div className="grow">
        <div className="title">{c.title}</div>
        <div className="meta">{[c.authors, c.journal, c.year].filter(Boolean).join(" · ")}</div>
        <div className="links">
          {c.pmid && (
            <a href={c.url} target="_blank" rel="noreferrer">
              PubMed {c.pmid} <ExternalLink className="inline-icon" aria-hidden="true" />
            </a>
          )}
          {c.doi && (
            <a href={`https://doi.org/${c.doi}`} target="_blank" rel="noreferrer">
              DOI <ExternalLink className="inline-icon" aria-hidden="true" />
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
    </li>
  );
}

function None({ text }: { text: string }) {
  return <p className="muted panel-empty">{text}</p>;
}

function Pending() {
  return (
    <div className="callout">
      <Hourglass aria-hidden="true" />
      <div>This section is still being researched automatically. It will fill in on its own.</div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="stack-lg" aria-busy="true" aria-label="Loading ingredient">
      <Skeleton h={22} w={220} />
      <Skeleton h={56} w="60%" />
      <Skeleton h={140} r={18} />
      <Skeleton h={44} r={12} />
      <Skeleton h={18} />
      <Skeleton h={18} w="80%" />
      <Skeleton h={320} r={18} />
    </div>
  );
}
