import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BookOpen, History, House, Info, ScanLine } from "lucide-react";
import { BrandMark } from "./BrandMark";

const NAV = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/library", label: "Library", icon: BookOpen },
  { to: "/history", label: "History", icon: History },
  { to: "/about", label: "About", icon: Info },
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

  // New page: start at the top unless navigating to an in-page anchor.
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
          <ScanLine aria-hidden="true" /> Scan a label
        </Link>
        <nav>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className="side-link">
              <Icon aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <p className="sidebar-foot">
          Educational information, not medical advice. Data from PubChem, PubMed, FDA and USDA, reviewed by the Assay science team.
        </p>
      </aside>

      <div>
        <header className="topbar" data-scrolled={scrolled}>
          <Link to="/" className="brand" aria-label="Assay home">
            <BrandMark size={28} />
            Assay
          </Link>
          <div className="spacer" />
        </header>
        <main id="main" className={location.pathname.startsWith("/admin") ? "main wide" : "main"} tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <nav className="tabbar" aria-label="Primary">
        {NAV.slice(0, 2).map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="tab">
            <Icon aria-hidden="true" />
            {label}
          </NavLink>
        ))}
        <NavLink to="/scan" className="tab-scan" aria-label="Scan a label">
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
