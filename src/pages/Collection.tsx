import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FlaskConical, ScanLine } from "lucide-react";
import type { IngredientSummary, Sector } from "../../shared/types";
import { SECTORS } from "../../shared/types";
import { api } from "../lib/api";
import { useProgress } from "../lib/progress";
import { useAsync } from "../lib/useAsync";
import { ErrorState, Segmented, Skeleton } from "../components/ui";

export function CollectionPage() {
  const progress = useProgress();
  const [sector, setSector] = useState<Sector | "all">("all");
  const { data, error, loading, reload } = useAsync(async () => {
    const [curated, researched, preliminary] = await Promise.all([
      api.ingredients({ status: "curated", sort: "name", limit: 100 }),
      api.ingredients({ status: "researched", sort: "name", limit: 100 }),
      api.ingredients({ status: "preliminary", sort: "name", limit: 100 }),
    ]);
    return { curated: curated.items, extra: [...researched.items, ...preliminary.items] };
  }, []);

  const found = useMemo(() => new Set(progress.discovered), [progress.discovered]);
  const filter = (list: IngredientSummary[]) => (sector === "all" ? list : list.filter((i) => i.sectors.includes(sector)));

  if (error) return <ErrorState message={error.message} onRetry={reload} />;

  const core = data ? filter(data.curated) : [];
  const extra = data ? filter(data.extra.filter((i) => found.has(i.id))) : [];
  const coreFound = data ? data.curated.filter((i) => found.has(i.id)).length : 0;

  return (
    <div className="fade-up collection">
      <Link to="/learn" className="btn btn-ghost">
        <ArrowLeft aria-hidden="true" /> Learn
      </Link>
      <header className="page-head">
        <h1 className="page-title">Molecule collection</h1>
        <p className="lede">
          Every ingredient profile you open joins your collection. {data && <span className="tabular">{coreFound} of {data.curated.length}</span>} library
          molecules found so far.
        </p>
      </header>

      {data && (
        <div className="col-bar" role="img" aria-label={`${coreFound} of ${data.curated.length} discovered`}>
          <span style={{ transform: `scaleX(${data.curated.length ? coreFound / data.curated.length : 0})` }} />
        </div>
      )}

      <div className="row-wrap" style={{ margin: "20px 0" }}>
        <Segmented
          label="Filter by product type"
          options={[{ value: "all" as const, label: "All" }, ...SECTORS.map((s) => ({ value: s.id, label: s.short }))]}
          value={sector}
          onChange={setSector}
        />
      </div>

      {loading && !data ? (
        <div className="col-grid">
          {Array.from({ length: 12 }, (_, i) => (
            <Skeleton key={i} h={150} r={14} />
          ))}
        </div>
      ) : (
        <>
          <ul className="col-grid">
            {core.map((ing) => (
              <Tile key={ing.id} ing={ing} found={found.has(ing.id)} />
            ))}
          </ul>
          {extra.length > 0 && (
            <section style={{ marginTop: 40 }}>
              <h2 className="section-title">Found on your scans</h2>
              <p className="muted small" style={{ marginBottom: 16 }}>
                Ingredients you discovered that Assay researched automatically.
              </p>
              <ul className="col-grid">
                {extra.map((ing) => (
                  <Tile key={ing.id} ing={ing} found />
                ))}
              </ul>
            </section>
          )}
          {coreFound === 0 && (
            <div className="callout" style={{ marginTop: 24 }}>
              <ScanLine aria-hidden="true" />
              <div>
                Your collection is empty. <Link to="/scan">Scan a label</Link> or open any profile in the <Link to="/library">library</Link> to discover your first
                molecule.
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Tile({ ing, found }: { ing: IngredientSummary; found: boolean }) {
  if (!found) {
    return (
      <li className="col-tile locked">
        <Link to={`/ingredient/${ing.id}`} aria-label={`Undiscovered ${ing.primaryCategory.toLowerCase()}. Open to discover it.`}>
          <span className="col-art">
            {ing.pubchemCid ? <img src={`/api/ingredients/${ing.id}/structure.png`} alt="" loading="lazy" /> : <FlaskConical aria-hidden="true" />}
          </span>
          <span className="col-name">???</span>
          <span className="col-hint">{ing.primaryCategory}</span>
        </Link>
      </li>
    );
  }
  return (
    <li className="col-tile">
      <Link to={`/ingredient/${ing.id}`}>
        <span className="col-art">
          {ing.pubchemCid ? <img src={`/api/ingredients/${ing.id}/structure.png`} alt="" loading="lazy" /> : <FlaskConical aria-hidden="true" />}
        </span>
        <span className="col-name">{ing.name}</span>
        <span className="col-hint">{ing.primaryRole}</span>
      </Link>
    </li>
  );
}
