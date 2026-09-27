import { Link } from "react-router-dom";
import { Apple, ArrowRight, ClipboardPaste, ScanLine, Sparkles, SprayCan } from "lucide-react";
import { SECTORS, type Sector } from "../../shared/types";
import { api } from "../lib/api";
import { compactNumber, relativeDate } from "../lib/format";
import { useAsync } from "../lib/useAsync";
import { IngredientRow } from "../components/IngredientRow";
import { RowSkeleton, ScorePill } from "../components/ui";

export const SECTOR_ICON: Record<Sector, typeof Apple> = { food: Apple, beauty: Sparkles, cleaning: SprayCan };
const SECTOR_DESC: Record<Sector, string> = {
  food: "Snacks, drinks, sauces",
  beauty: "Skincare, hair, makeup",
  cleaning: "Sprays, detergents, soaps",
};

export function HomePage() {
  const stats = useAsync(() => api.stats(), []);
  const scans = useAsync(() => api.scans(), []);
  const featured = useAsync(() => api.ingredients({ sort: "research_desc", limit: 5 }), []);
  const recent = scans.data?.items.slice(0, 4) ?? [];

  return (
    <div className="stack-lg fade-up">
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">Ingredient intelligence</p>
          <h1 id="hero-title" style={{ marginTop: 12 }}>
            What’s <em>really</em> in it?
          </h1>
          <p className="lede">
            Scan any food, beauty or cleaning label. Assay rates the product out of 100, separates organic ingredients from artificial ones, and explains the
            peer-reviewed science behind every molecule.
          </p>
          <div className="hero-actions">
            <Link to="/scan" className="btn btn-primary btn-lg">
              <ScanLine aria-hidden="true" /> Scan a label
            </Link>
            <Link to="/scan?mode=text" className="btn btn-lg">
              <ClipboardPaste aria-hidden="true" /> Paste ingredients
            </Link>
          </div>
          <div className="stat-strip" aria-live="polite">
            <div className="stat">
              <div className="n">{stats.data ? compactNumber(stats.data.verified) : "—"}</div>
              <div className="l">verified ingredient profiles</div>
            </div>
            <div className="stat">
              <div className="n">{stats.data ? compactNumber(stats.data.pending) : "—"}</div>
              <div className="l">new profiles under review</div>
            </div>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="label-specimen">
            <span className="scanline" />
            <p className="eyebrow" style={{ marginBottom: 8 }}>
              Ingredients
            </p>
            <p>
              <mark className="tone-excellent">Water</mark>, <mark className="tone-excellent">Glycerin</mark>, <mark className="tone-good">Cetearyl Alcohol</mark>,{" "}
              <mark className="tone-excellent">Niacinamide</mark>, <mark className="tone-excellent">Shea Butter*</mark>, <mark className="tone-good">Phenoxyethanol</mark>,{" "}
              <mark className="tone-poor">Fragrance</mark>, <mark className="tone-bad">Methylisothiazolinone</mark>.
            </p>
            <div className="row" style={{ marginTop: 20, gap: 14 }}>
              <ScorePill score={71} />
              <div>
                <div style={{ fontWeight: 600, color: "var(--ink)" }}>Good · 71/100</div>
                <div className="subtle" style={{ fontSize: "var(--text-sm)" }}>
                  2 watch-outs · 1 certified organic
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="sectors-title">
        <div className="section-head">
          <h2 id="sectors-title" className="section-title">
            What are you scanning?
          </h2>
        </div>
        <div className="sector-grid">
          {SECTORS.map((s) => {
            const Icon = SECTOR_ICON[s.id];
            return (
              <Link key={s.id} to={`/scan?sector=${s.id}`} className="sector-card">
                <span className="sector-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span>
                  <span className="title">{s.label}</span>
                  <br />
                  <span className="desc">{SECTOR_DESC[s.id]}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {recent.length > 0 && (
        <section aria-labelledby="recent-title">
          <div className="section-head">
            <h2 id="recent-title" className="section-title">
              Recent scans
            </h2>
            <Link to="/history" className="btn btn-ghost btn-sm">
              All history <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="scan-grid">
            {recent.map((s) => {
              const Icon = SECTOR_ICON[s.sector];
              return (
                <Link key={s.id} to={`/product/${s.id}`} className="scan-card">
                  <ScorePill score={s.score} />
                  <div className="grow">
                    <div className="title">{s.name}</div>
                    <div className="subtle row" style={{ fontSize: "var(--text-sm)", gap: 6 }}>
                      <Icon width={14} height={14} aria-hidden="true" /> {s.itemCount} ingredients · {relativeDate(s.createdAt)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section aria-labelledby="how-title">
        <div className="section-head">
          <h2 id="how-title" className="section-title">
            How Assay works
          </h2>
        </div>
        <ol className="steps">
          <li>
            <h3>Scan</h3>
            <p>On-device text recognition reads the ingredient list from your photo. Nothing is uploaded unless you turn on enhanced AI reading.</p>
          </li>
          <li>
            <h3>Match</h3>
            <p>Every ingredient is matched against our verified database, even through typos, synonyms, E-numbers and INCI names.</p>
          </li>
          <li>
            <h3>Research</h3>
            <p>New ingredients get an instant draft from PubChem, then a background search of PubMed abstracts for mechanisms and safety data.</p>
          </li>
          <li>
            <h3>Verify</h3>
            <p>A reviewer fact-checks each draft against its sources and approves it, and the verified profile reaches every user instantly.</p>
          </li>
        </ol>
      </section>

      <section aria-labelledby="library-title">
        <div className="section-head">
          <h2 id="library-title" className="section-title">
            Most-researched ingredients
          </h2>
          <Link to="/library" className="btn btn-ghost btn-sm">
            Browse library <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="card">
          {featured.loading && !featured.data ? (
            <RowSkeleton rows={5} />
          ) : (
            <ul className="ing-list">
              {featured.data?.items.map((ing) => (
                <li key={ing.id}>
                  <IngredientRow ing={ing} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
