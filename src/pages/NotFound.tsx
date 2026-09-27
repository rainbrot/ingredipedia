import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { EmptyState } from "../components/ui";

export function NotFoundPage() {
  return (
    <EmptyState icon={<Compass />} title="Page not found" action={<Link to="/" className="btn btn-primary">Go home</Link>}>
      The page you're looking for doesn't exist or has moved.
    </EmptyState>
  );
}
