import { Link } from "react-router-dom";
import type { IngredientSummary } from "../../shared/types";
import { papersLabel } from "../lib/format";
import { OriginChip, ResearchChip, ScorePill, StatusChip } from "./ui";

export function IngredientRow({
  ing,
  position,
  labeledOrganic,
  rawName,
  showOrigin = true,
}: {
  ing: IngredientSummary;
  position?: number;
  labeledOrganic?: boolean;
  rawName?: string;
  showOrigin?: boolean;
}) {
  const renamed = rawName && rawName.toLowerCase() !== ing.name.toLowerCase();
  return (
    <Link to={`/ingredient/${ing.id}`} className="ing-row">
      {position != null && (
        <span className="pos" aria-label={`Label position ${position}`}>
          {position}.
        </span>
      )}
      <div className="grow">
        <div className="name">
          {ing.name}
          {renamed && <span className="subtle" style={{ fontWeight: 400 }}> (listed as “{rawName}”)</span>}
        </div>
        <div className="meta">
          <span>{ing.primaryRole}</span>
          {ing.researchCount != null && <span className="tabular">{papersLabel(ing.researchCount)}</span>}
          {showOrigin && <OriginChip origin={ing.origin} organic={labeledOrganic} />}
          {ing.status !== "curated" && <StatusChip ing={ing} />}
          <ResearchChip state={ing.status === "curated" ? null : ing.researchState} />
        </div>
      </div>
      <ScorePill score={ing.healthScore} />
    </Link>
  );
}
