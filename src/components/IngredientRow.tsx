import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
          #{position}
        </span>
      )}
      <ScorePill score={ing.healthScore} />
      <div className="grow">
        <div className="name">
          {ing.name}
          {renamed && <span className="subtle" style={{ fontWeight: 400 }}> · “{rawName}”</span>}
        </div>
        <div className="meta">
          <span>{ing.primaryRole}</span>
          {ing.researchCount != null && (
            <>
              <span className="sep" aria-hidden="true" />
              <span className="tabular">{papersLabel(ing.researchCount)}</span>
            </>
          )}
        </div>
        <div className="chip-row row-chips">
          {showOrigin && <OriginChip origin={ing.origin} organic={labeledOrganic} />}
          <StatusChip ing={ing} />
          <ResearchChip state={ing.status === "verified" ? null : ing.researchState} />
        </div>
      </div>
      <ChevronRight className="chev" aria-hidden="true" />
    </Link>
  );
}
