import { Suspense, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BrandMark } from "./BrandMark";

const NAV = [
  { to: "/scan", label: "Scan a label" },
  { to: "/library", label: "Library" },
  { to: "/learn", label: "Learn" },
  { to: "/history", label: "History" },
  { to: "/about", label: "About" },
];

export function Layout() {
  const location = useLocation();

  // New page: start at the top unless navigating to an in-page anchor. Query changes (tabs, lesson steps) keep their own scroll.
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="masthead">
        <div className="masthead-inner">
          <Link to="/" className="brand" aria-label="Ingredipedia home">
            <BrandMark size={46} />
            <span className="brand-text">
              <span className="brand-name">Ingredipedia</span>
              <span className="brand-tag">The chemistry of everyday ingredients</span>
            </span>
          </Link>
          <nav className="site-nav" aria-label="Primary">
            {NAV.map(({ to, label }) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="main" tabIndex={-1}>
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="site-foot">
        <div className="site-foot-inner">
          <p>
            <strong>Ingredipedia</strong> is educational information, not medical advice. Chemical data from PubChem, research from PubMed, and product data from
            the FDA, USDA and Open Food Facts, gathered automatically and cited on every entry.
          </p>
          <nav aria-label="Footer">
            <Link to="/learn/glossary">Glossary</Link>
            <Link to="/learn/collection">Molecule collection</Link>
            <Link to="/about">About and sources</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

/** Shown for the moment a page's code is still downloading. */
function PageLoading() {
  return (
    <div className="page-loading" role="status" aria-label="Loading page">
      <span className="spinner" aria-hidden="true" />
    </div>
  );
}
