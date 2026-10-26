import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { relativeDate } from "../lib/format";
import { useProgress } from "../lib/progress";
import { useAsync } from "../lib/useAsync";
import { LESSONS } from "../learn/lessons";
import { Formula, ScorePill, Skeleton } from "../components/ui";
import { SECTORS } from "../../shared/types";

/** Same molecule for everyone on a given day. */
function dayIndex(n: number) {
  const now = new Date();
  const start = Date.UTC(now.getFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - start) / 86_400_000);
  return (day * 7 + now.getFullYear()) % n;
}

export function HomePage() {
  const progress = useProgress();
  const scans = useAsync(() => api.scans(), []);
  const molecule = useAsync(async () => {
    const list = await api.ingredients({ status: "curated", sort: "name", limit: 100 });
    const withStructure = list.items.filter((i) => i.pubchemCid);
    if (!withStructure.length) return null;
    return api.ingredient(withStructure[dayIndex(withStructure.length)].id);
  }, []);
  const recent = scans.data?.items.slice(0, 4) ?? [];
  const done = LESSONS.filter((l) => progress.lessons[l.id]?.completed).length;
  const next = LESSONS.find((l) => !progress.lessons[l.id]?.completed) ?? LESSONS[0];
  const mol = molecule.data;

  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <h1 id="hero-title">
            The encyclopedia of what's <em>in</em> your food, skincare and cleaning products.
          </h1>
          <p className="lede">
            Scan a label and Ingredipedia looks up every ingredient: what the molecule is, why it was added, how it works in the product and in your body, and
            what published research says about it. Each entry is written so that someone who has never taken chemistry can follow it, and every claim is cited.
          </p>
          <div className="hero-actions">
            <Link to="/scan" className="btn btn-primary btn-lg">
              Scan a label
            </Link>
            <Link to="/library" className="inline-link">
              Browse all ingredients →
            </Link>
            <Link to="/learn" className="inline-link">
              Start a lesson →
            </Link>
          </div>
        </div>
        <figure className="hero-art" aria-label="Example: an annotated moisturizer label" style={{ margin: 0 }}>
          <div className="label-specimen">
            <p>
              <strong>Ingredients:</strong> <mark className="tone-excellent">Water</mark>, <mark className="tone-excellent">Glycerin</mark>,{" "}
              <mark className="tone-good">Cetearyl Alcohol</mark>, <mark className="tone-excellent">Niacinamide</mark>, <mark className="tone-excellent">Shea Butter*</mark>,{" "}
              <mark className="tone-good">Phenoxyethanol</mark>, <mark className="tone-poor">Fragrance</mark>, <mark className="tone-bad">Methylisothiazolinone</mark>.
            </p>
            <div className="specimen-callout">
              <span className="sc-name">Methylisothiazolinone</span>
              <span className="sc-text">A preservative that reacts with sulfur atoms in skin proteins, which is how it can trigger allergies.</span>
            </div>
            <p className="specimen-caption">Fig. 1. A moisturizer label as Ingredipedia reads it. Rated 71 out of 100: two ingredients to watch, one certified organic.</p>
          </div>
        </figure>
      </section>

      <div className="home-duo">
        <section className="motd" aria-labelledby="motd-title">
          <h2 id="motd-title" className="section-title">
            Today's molecule
          </h2>
          {molecule.loading && !mol ? (
            <Skeleton h={160} />
          ) : mol ? (
            <Link to={`/ingredient/${mol.id}`} className="motd-card">
              <span className="motd-art">
                <img src={`/api/ingredients/${mol.id}/structure.png`} alt={`Skeletal structure of ${mol.name}`} />
              </span>
              <span className="motd-body">
                <strong>{mol.name}</strong>
                {mol.identity.formula && (
                  <span className="motd-formula">
                    <Formula value={mol.identity.formula} /> · {mol.primaryRole}
                  </span>
                )}
                <span className="motd-text">{mol.profile?.overview?.[0] ?? mol.summary}</span>
                <span className="inline-link">
                  {progress.discovered.includes(mol.id) ? "Read again" : "Read the full entry"} →
                </span>
              </span>
            </Link>
          ) : null}
        </section>

        <section className="continue" aria-labelledby="continue-title">
          <h2 id="continue-title" className="section-title">
            {done === 0 ? "Start learning" : done === LESSONS.length ? "All lessons complete" : "Continue learning"}
          </h2>
          <Link to={`/learn/${next.id}`} className="continue-card">
            <span className="grow">
              <strong>{next.title}</strong>
              <span>{next.summary}</span>
              <span className="lesson-meta">
                <span>{next.level}</span>
                <span className="tabular">{next.minutes} min</span>
                <span className="tabular">
                  {done} of {LESSONS.length} lessons done
                </span>
              </span>
            </span>
          </Link>
          <Link to="/learn/myths" className="inline-link">
            Or test yourself with Myth or Fact →
          </Link>
        </section>
      </div>

      {recent.length > 0 && (
        <section aria-labelledby="recent-title">
          <div className="section-head">
            <h2 id="recent-title" className="section-title">
              Your recent scans
            </h2>
            <Link to="/history" className="inline-link">
              All history →
            </Link>
          </div>
          <div className="scan-grid">
            {recent.map((s) => (
              <Link key={s.id} to={`/product/${s.id}`} className="scan-card">
                {s.imageUrl && <img className="scan-thumb" src={s.imageUrl} alt="" loading="lazy" />}
                <div className="grow">
                  <div className="title">{s.name}</div>
                  <div className="subtle small" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)" }}>
                    {SECTORS.find((x) => x.id === s.sector)?.label} · {s.itemCount} ingredients · {relativeDate(s.createdAt)}
                  </div>
                </div>
                <ScorePill score={s.score} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="how-title">
        <div className="section-head">
          <h2 id="how-title" className="section-title">
            How Ingredipedia works
          </h2>
        </div>
        <ol className="steps">
          <li>
            <h3>Scan</h3>
            <p>Scan a barcode or photograph the label. Text recognition runs on your device and corrects misread words against a list of known ingredients.</p>
          </li>
          <li>
            <h3>Identify</h3>
            <p>Each ingredient is matched to the library through typos, synonyms, E-numbers and INCI names, then sorted into natural and artificial groups.</p>
          </li>
          <li>
            <h3>Research</h3>
            <p>New ingredients get a first draft at once. Ingredipedia then searches PubChem and PubMed automatically and publishes what it finds, with citations.</p>
          </li>
          <li>
            <h3>Learn</h3>
            <p>Every entry explains the chemistry and the biology in plain language, links to lessons, and adds the molecule to your collection.</p>
          </li>
        </ol>
      </section>
    </div>
  );
}
