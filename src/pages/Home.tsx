import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Scale, ScanLine } from "lucide-react";
import { api } from "../lib/api";
import { relativeDate } from "../lib/format";
import { useProgress } from "../lib/progress";
import { useAsync } from "../lib/useAsync";
import { LESSONS } from "../learn/lessons";
import { Formula, ScorePill, Skeleton } from "../components/ui";
import { SECTOR_ICON } from "../components/sectorIcon";

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
    <div className="home fade-up">
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <h1 id="hero-title">
            Every label is a <em>chemistry lesson.</em>
          </h1>
          <p className="lede">
            Scan the food, skincare and cleaning products you already own. Assay identifies every ingredient, shows you the molecule, explains what it does in the
            product and in your body, and backs it all with published research.
          </p>
          <div className="hero-actions">
            <Link to="/scan" className="btn btn-primary btn-lg">
              <ScanLine aria-hidden="true" /> Scan a product
            </Link>
            <Link to="/learn" className="btn btn-lg">
              <GraduationCap aria-hidden="true" /> Start learning
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="label-specimen">
            <span className="scanline" />
            <p>
              <strong>Ingredients:</strong> <mark className="tone-excellent">Water</mark>, <mark className="tone-excellent">Glycerin</mark>,{" "}
              <mark className="tone-good">Cetearyl Alcohol</mark>, <mark className="tone-excellent">Niacinamide</mark>, <mark className="tone-excellent">Shea Butter*</mark>,{" "}
              <mark className="tone-good">Phenoxyethanol</mark>, <mark className="tone-poor">Fragrance</mark>, <mark className="tone-bad">Methylisothiazolinone</mark>.
            </p>
            <div className="specimen-callout">
              <span className="sc-name">Methylisothiazolinone</span>
              <span className="sc-text">Reacts with sulfur atoms in skin proteins, which is how it triggers allergies.</span>
            </div>
            <div className="row" style={{ marginTop: 18, gap: 14 }}>
              <ScorePill score={71} />
              <div>
                <div style={{ fontWeight: 600, color: "var(--ink)" }}>Good · 71/100</div>
                <div className="subtle small">2 watch-outs · 1 certified organic</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="home-duo">
        <section className="continue" aria-labelledby="continue-title">
          <h2 id="continue-title" className="section-title">
            {done === 0 ? "Start learning" : done === LESSONS.length ? "All lessons complete" : "Continue learning"}
          </h2>
          <div className="lp-bar" role="img" aria-label={`${done} of ${LESSONS.length} lessons complete`}>
            {LESSONS.map((l) => (
              <span key={l.id} data-on={!!progress.lessons[l.id]?.completed} />
            ))}
          </div>
          <Link to={`/learn/${next.id}`} className="continue-card">
            <span className="grow">
              <strong>{next.title}</strong>
              <span>{next.summary}</span>
              <span className="lesson-meta">
                <span>{next.level}</span>
                <span className="sep" aria-hidden="true" />
                <span className="tabular">{next.minutes} min</span>
              </span>
            </span>
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/learn/myths" className="inline-link">
            <Scale aria-hidden="true" /> Play Myth or Fact
          </Link>
        </section>

        <section className="motd" aria-labelledby="motd-title">
          <h2 id="motd-title" className="section-title">
            Molecule of the day
          </h2>
          {molecule.loading && !mol ? (
            <Skeleton h={220} r={18} />
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
                  {progress.discovered.includes(mol.id) ? "Revisit" : "Discover"} {mol.name} <ArrowRight aria-hidden="true" />
                </span>
              </span>
            </Link>
          ) : null}
        </section>
      </div>

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
                  {s.imageUrl ? <img className="scan-thumb" src={s.imageUrl} alt="" loading="lazy" /> : <ScorePill score={s.score} />}
                  <div className="grow">
                    <div className="title">{s.name}</div>
                    <div className="subtle row small" style={{ gap: 6 }}>
                      <Icon width={14} height={14} aria-hidden="true" /> {s.itemCount} ingredients · {relativeDate(s.createdAt)}
                    </div>
                  </div>
                  {s.imageUrl && <ScorePill score={s.score} size="sm" />}
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
            <p>Scan a barcode or photograph the label. Text recognition runs on your device and corrects misreads against a vocabulary of known ingredients.</p>
          </li>
          <li>
            <h3>Identify</h3>
            <p>Each ingredient is matched to the library through typos, synonyms, E-numbers and INCI names, then sorted into natural and artificial groups.</p>
          </li>
          <li>
            <h3>Research</h3>
            <p>New ingredients get an instant profile, then Assay automatically searches PubChem and PubMed and publishes what it finds, with citations.</p>
          </li>
          <li>
            <h3>Learn</h3>
            <p>Every profile explains mechanisms at the chemical and biological scale, links to lessons, and adds the molecule to your collection.</p>
          </li>
        </ol>
      </section>
    </div>
  );
}
