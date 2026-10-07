import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { GLOSSARY } from "../learn/glossary";
import { LESSON_BY_ID } from "../learn/lessons";

export function GlossaryPage() {
  const [q, setQ] = useState("");
  const terms = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GLOSSARY.filter((t) => !needle || t.term.toLowerCase().includes(needle) || t.def.toLowerCase().includes(needle)).sort((a, b) =>
      a.term.localeCompare(b.term, "en", { sensitivity: "base" }),
    );
  }, [q]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof terms>();
    for (const t of terms) {
      const letter = t.term[0].toUpperCase().replace(/[^A-Z]/, "#");
      map.set(letter, [...(map.get(letter) ?? []), t]);
    }
    return [...map.entries()];
  }, [terms]);

  return (
    <div className="fade-up glossary">
      <Link to="/learn" className="btn btn-ghost">
        <ArrowLeft aria-hidden="true" /> Learn
      </Link>
      <header className="page-head">
        <h1 className="page-title">Glossary</h1>
        <p className="lede">The chemistry and biology terms used across Assay. Underlined words in any profile or lesson open these definitions in place.</p>
      </header>

      <label className="search" style={{ maxWidth: 420 }}>
        <Search aria-hidden="true" />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search terms" aria-label="Search the glossary" />
      </label>

      {groups.length === 0 ? (
        <p className="muted" style={{ marginTop: 24 }}>
          No terms match “{q}”.
        </p>
      ) : (
        <div className="gl-groups">
          {groups.map(([letter, list]) => (
            <section key={letter} aria-label={letter}>
              <h2 className="gl-letter">{letter}</h2>
              <dl className="gl-list">
                {list.map((t) => {
                  const lesson = t.lesson ? LESSON_BY_ID.get(t.lesson) : undefined;
                  return (
                    <div key={t.id} id={t.id}>
                      <dt>{t.term}</dt>
                      <dd>
                        {t.def}
                        {lesson && (
                          <>
                            {" "}
                            <Link to={`/learn/${lesson.id}`} className="gl-lesson">
                              Lesson: {lesson.title}
                            </Link>
                          </>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
