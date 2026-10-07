import { Link } from "react-router-dom";
import { ArrowRight, BookA, Check, Gem, Link2, Printer, Scale, ScanLine } from "lucide-react";
import { LESSONS } from "../learn/lessons";
import { useProgress } from "../lib/progress";
import { api } from "../lib/api";
import { useAsync } from "../lib/useAsync";
import { useToast } from "../components/Toast";

export function LearnPage() {
  const progress = useProgress();
  const toast = useToast();
  const { data: stats } = useAsync(() => api.stats(), []);
  const done = LESSONS.filter((l) => progress.lessons[l.id]?.completed).length;
  const next = LESSONS.find((l) => !progress.lessons[l.id]?.completed);
  const libraryTotal = stats ? stats.curated : null;

  const copyLink = async (id: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/learn/${id}`);
      toast("Lesson link copied. Share it with your class.", "success");
    } catch {
      toast("Couldn't copy the link. Copy it from the lesson's address bar instead.", "error");
    }
  };

  return (
    <div className="fade-up learn">
      <header className="page-head">
        <h1 className="page-title">Learn</h1>
        <p className="lede">Ten short lessons that turn the labels in your kitchen and bathroom into chemistry you can see, test and explain.</p>
      </header>

      <section className="learn-progress" aria-label="Your progress">
        <div className="lp-bar" role="img" aria-label={`${done} of ${LESSONS.length} lessons complete`}>
          {LESSONS.map((l) => (
            <span key={l.id} data-on={!!progress.lessons[l.id]?.completed} />
          ))}
        </div>
        <p>
          <strong className="tabular">
            {done} of {LESSONS.length}
          </strong>{" "}
          lessons complete · <span className="tabular">{progress.discovered.length}</span> {progress.discovered.length === 1 ? "molecule" : "molecules"} discovered
          {progress.myths.bestStreak > 0 && (
            <>
              {" "}
              · best myth streak <span className="tabular">{progress.myths.bestStreak}</span>
            </>
          )}
        </p>
        {next && (
          <Link to={`/learn/${next.id}`} className="btn btn-primary">
            {done === 0 ? "Start with" : "Continue:"} {next.title} <ArrowRight aria-hidden="true" />
          </Link>
        )}
      </section>

      <section aria-labelledby="h-lessons">
        <h2 id="h-lessons" className="section-title">
          Lessons
        </h2>
        <ul className="lesson-list">
          {LESSONS.map((l) => {
            const p = progress.lessons[l.id];
            return (
              <li key={l.id} data-done={!!p?.completed}>
                <Link to={`/learn/${l.id}`} className="lesson-item">
                  <span className="lesson-check" aria-hidden="true">
                    {p?.completed && <Check />}
                  </span>
                  <span className="grow">
                    <span className="lesson-name">{l.title}</span>
                    <span className="lesson-sum">{l.summary}</span>
                    <span className="lesson-meta">
                      <span>{l.level}</span>
                      <span className="sep" aria-hidden="true" />
                      <span className="tabular">{l.minutes} min</span>
                      {p?.completed && (
                        <>
                          <span className="sep" aria-hidden="true" />
                          <span className="tabular">
                            Quiz {p.score}/{p.total}
                          </span>
                        </>
                      )}
                    </span>
                  </span>
                  <ArrowRight className="chev" aria-hidden="true" />
                </Link>
                <button className="icon-btn lesson-share" onClick={() => copyLink(l.id)} aria-label={`Copy link to “${l.title}”`}>
                  <Link2 aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="h-practice" className="practice">
        <h2 id="h-practice" className="section-title">
          Practice
        </h2>
        <Link to="/learn/myths" className="practice-feature">
          <Scale aria-hidden="true" className="pf-icon" />
          <span className="grow">
            <span className="pf-name">Myth or Fact</span>
            <span className="pf-sum">Ten claims about ingredients you've seen online. Judge each one, then see what the evidence says.</span>
          </span>
          <span className="btn btn-primary btn-sm" aria-hidden="true">
            Play
          </span>
        </Link>
        <div className="practice-row">
          <Link to="/learn/collection" className="practice-link">
            <Gem aria-hidden="true" />
            <span className="grow">
              <strong>Molecule collection</strong>
              <span>
                <span className="tabular">{progress.discovered.length}</span>
                {libraryTotal != null && (
                  <>
                    {" "}
                    of <span className="tabular">{libraryTotal}</span>
                  </>
                )}{" "}
                discovered. Open profiles or scan labels to find more.
              </span>
            </span>
          </Link>
          <Link to="/learn/glossary" className="practice-link">
            <BookA aria-hidden="true" />
            <span className="grow">
              <strong>Glossary</strong>
              <span>Every term from the lessons and profiles, in plain language.</span>
            </span>
          </Link>
          <Link to="/scan" className="practice-link">
            <ScanLine aria-hidden="true" />
            <span className="grow">
              <strong>Scan something real</strong>
              <span>Point your camera at a label and test what you've learned.</span>
            </span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="h-teachers" className="teachers">
        <h2 id="h-teachers" className="section-title">
          For teachers
        </h2>
        <p className="prose">
          Every lesson works without an account. Send students a lesson link from the list above, or open a lesson and choose{" "}
          <span className="kbd-ish">
            <Printer aria-hidden="true" /> Print worksheet
          </span>{" "}
          for a paper version with the quiz questions. Progress stays on each student's device, so there's nothing to set up and no student data to manage.
        </p>
      </section>
    </div>
  );
}
