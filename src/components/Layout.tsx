import { Suspense, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { FlaskConical, GraduationCap, History, House, Info, ScanLine } from "lucide-react";
import { BrandMark } from "./BrandMark";

const NAV = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/learn", label: "Learn", icon: GraduationCap },
  { to: "/library", label: "Library", icon: FlaskConical },
  { to: "/history", label: "History", icon: History },
];

export function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // New page: start at the top unless navigating to an in-page anchor. Query changes (tabs, lesson steps) keep their own scroll.
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <aside className="sidebar" aria-label="Primary">
        <Link to="/" className="brand" aria-label="Assay home">
          <BrandMark />
          Assay
        </Link>
        <Link to="/scan" className="btn btn-primary btn-lg btn-block">
          <ScanLine aria-hidden="true" /> Scan a product
        </Link>
        <nav>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className="side-link">
              <Icon aria-hidden="true" />
              {label}
            </NavLink>
          ))}
          <NavLink to="/about" className="side-link">
            <Info aria-hidden="true" />
            About
          </NavLink>
        </nav>
        <p className="sidebar-foot">
          Educational information, not medical advice. Data from PubChem, PubMed, FDA, USDA and Open Food Facts, researched automatically and cited on every profile.
        </p>
      </aside>

      <div>
        <header className="topbar" data-scrolled={scrolled}>
          <Link to="/" className="brand" aria-label="Assay home">
            <BrandMark size={28} />
            Assay
          </Link>
          <div className="spacer" />
          <NavLink to="/about" className="icon-btn" aria-label="About Assay">
            <Info aria-hidden="true" />
          </NavLink>
        </header>
        <main id="main" className="main" tabIndex={-1}>
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      <nav className="tabbar" aria-label="Primary">
        {NAV.slice(0, 2).map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="tab">
            <Icon aria-hidden="true" />
            {label}
          </NavLink>
        ))}
        <NavLink to="/scan" className="tab-scan" aria-label="Scan a product">
          <ScanLine aria-hidden="true" />
        </NavLink>
        {NAV.slice(2).map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className="tab">
            <Icon aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
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
