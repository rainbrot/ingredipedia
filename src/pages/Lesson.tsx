import { useEffect, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, GraduationCap, Link2, Printer } from "lucide-react";
import { LESSON_BY_ID, LESSONS } from "../learn/lessons";
import { LessonWidget } from "../learn/widgets";
import { completeLesson, useProgress } from "../lib/progress";
import { GlossaryScope, GlossaryText } from "../components/GlossaryText";
import { Quiz } from "../components/Quiz";
import { useToast } from "../components/Toast";
import { EmptyState } from "../components/ui";
import { IngredientRow } from "../components/IngredientRow";
import { api } from "../lib/api";
import { useAsync } from "../lib/useAsync";

export function LessonPage() {
  const { id = "" } = useParams();
  const lesson = LESSON_BY_ID.get(id);
  const [params, setParams] = useSearchParams();
  const progress = useProgress();
  const toast = useToast();
  const top = useRef<HTMLDivElement>(null);
  const total = lesson ? lesson.steps.length + 1 : 0; // steps + quiz
  const step = Math.min(Math.max(Number(params.get("step") ?? 1) || 1, 1), total) - 1;
  const onQuiz = lesson ? step === lesson.steps.length : false;

  const { data: related } = useAsync(
    () => (lesson ? Promise.all(lesson.ingredients.map((i) => api.ingredient(i).catch(() => null))) : Promise.resolve([])),
    [id],
  );

  useEffect(() => {
    top.current?.scrollIntoView({ block: "start" });
  }, [step]);

  if (!lesson) {
    return (
      <EmptyState icon={<GraduationCap />} title="Lesson not found" action={<Link to="/learn" className="btn">All lessons</Link>}>
        The link may be out of date.
      </EmptyState>
    );
  }

  const go = (n: number) => {
    const p = new URLSearchParams(params);
    if (n === 0) p.delete("step");
    else p.set("step", String(n + 1));
    setParams(p, { replace: true });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/learn/${lesson.id}`);
      toast("Lesson link copied. Share it with your class.", "success");
    } catch {
      toast("Couldn't copy the link.", "error");
    }
  };

  const index = LESSONS.indexOf(lesson);
  const nextLesson = LESSONS[index + 1];
  const done = progress.lessons[lesson.id];
  const s = lesson.steps[step];

  return (
    <div className="lesson" ref={top}>
      <div className="screen-only">
        <div className="row">
          <Link to="/learn" className="btn btn-ghost">
            <ArrowLeft aria-hidden="true" /> All lessons
          </Link>
          <div className="grow" />
          <button className="icon-btn" onClick={copyLink} aria-label="Copy assignment link">
            <Link2 aria-hidden="true" />
          </button>
          <button className="icon-btn" onClick={() => window.print()} aria-label="Print worksheet">
            <Printer aria-hidden="true" />
          </button>
        </div>

        <header className="lesson-head">
          <h1>{lesson.title}</h1>
          <p className="lede">{lesson.summary}</p>
          <p className="lesson-meta">
            <span>{lesson.level}</span>
            <span className="sep" aria-hidden="true" />
            <span className="tabular">{lesson.minutes} min</span>
            <span className="sep" aria-hidden="true" />
            <span>{lesson.concepts.join(", ")}</span>
            {done?.completed && (
              <>
                <span className="sep" aria-hidden="true" />
                <span className="ok-text">
                  <Check className="inline-icon" aria-hidden="true" /> Completed
                </span>
              </>
            )}
          </p>
        </header>

        <div className="stepper-row">
          <nav className="stepper-bar" aria-label="Lesson steps">
            {[...lesson.steps.map((x) => x.title), "Quiz"].map((t, i) => (
              <button key={i} type="button" data-state={i < step ? "done" : i === step ? "now" : "next"} aria-current={i === step ? "step" : undefined} onClick={() => go(i)} title={t}>
                <span className="sr-only">
                  Step {i + 1}: {t}
                </span>
              </button>
            ))}
          </nav>
          <span className="stepper-count tabular">{onQuiz ? "Quiz" : `${step + 1} / ${lesson.steps.length}`}</span>
        </div>

        <div className="lesson-stage fade-up" key={step}>
          {!onQuiz ? (
            <GlossaryScope key={step}>
              <h2 className="step-title">{s.title}</h2>
              {s.body.map((para, i) => (
                <p key={i} className="prose">
                  <GlossaryText text={para} />
                </p>
              ))}
              {s.widget && <LessonWidget id={s.widget} />}
            </GlossaryScope>
          ) : (
            <>
              <Quiz
                questions={lesson.quiz}
                seed={lesson.id}
                onComplete={(score, n) => {
                  completeLesson(lesson.id, score, n);
                }}
              />
              {done?.completed && (
                <section className="after-lesson">
                  {related && related.some(Boolean) && (
                    <>
                      <h2 className="section-title">Find it on a label</h2>
                      <p className="muted small">These ingredients came up in this lesson. Open one to see the chemistry in a real product.</p>
                      <div className="card ing-list">
                        {related.filter((x): x is NonNullable<typeof x> => !!x).map((ing) => (
                          <IngredientRow key={ing.id} ing={ing} showOrigin={false} />
                        ))}
                      </div>
                    </>
                  )}
                  {nextLesson && (
                    <Link to={`/learn/${nextLesson.id}`} className="next-lesson">
                      <span className="grow">
                        <span className="subtle small">Next lesson</span>
                        <strong>{nextLesson.title}</strong>
                      </span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  )}
                </section>
              )}
            </>
          )}
        </div>

        <div className="lesson-nav">
          <button className="btn" onClick={() => go(step - 1)} disabled={step === 0}>
            <ArrowLeft aria-hidden="true" /> Back
          </button>
          {!onQuiz && (
            <button className="btn btn-primary" onClick={() => go(step + 1)}>
              {step + 1 === lesson.steps.length ? "Take the quiz" : "Next"} <ArrowRight aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <Worksheet lessonId={lesson.id} />
    </div>
  );
}

/** Print-only version: every step's text plus the quiz with answer blanks. */
function Worksheet({ lessonId }: { lessonId: string }) {
  const lesson = LESSON_BY_ID.get(lessonId)!;
  return (
    <div className="print-only worksheet">
      <p className="ws-brand">Assay · Chemistry of everyday products</p>
      <h1>{lesson.title}</h1>
      <p className="ws-name">Name ______________________________ Date ____________</p>
      {lesson.steps.map((s, i) => (
        <section key={i}>
          <h2>{s.title}</h2>
          {s.body.map((p, k) => (
            <p key={k}>{p}</p>
          ))}
        </section>
      ))}
      <h2>Check your understanding</h2>
      <ol className="ws-quiz">
        {lesson.quiz.map((q, i) => (
          <li key={i}>
            <p>{q.q}</p>
            <ol type="a">
              {[...q.options].sort().map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <p className="ws-foot">Try it live: {window.location.origin}/learn/{lesson.id}</p>
    </div>
  );
}
