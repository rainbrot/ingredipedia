import { useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "../learn/lessons";

/** Stable shuffle seeded by a string, so options don't jump around between renders. */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    const j = ((h ^= h >>> 16) >>> 0) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * One question at a time with immediate feedback and an explanation. The first option in each
 * question is the correct one; options are shuffled for display.
 */
export function Quiz({
  questions,
  onComplete,
  title = "Check your understanding",
  seed = "",
}: {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  title?: string;
  seed?: string;
}) {
  const [round, setRound] = useState(0);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const shuffled = useMemo(
    () => questions.map((q) => ({ ...q, correct: q.options[0], shown: seededShuffle(q.options, `${seed}${round}${q.q}`) })),
    [questions, round, seed],
  );
  const q = shuffled[index];

  const pick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 < shuffled.length) {
      setIndex(index + 1);
      setPicked(null);
    } else {
      setDone(true);
      onComplete?.(score, shuffled.length);
    }
  };

  const restart = () => {
    setRound((r) => r + 1);
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const perfect = score === shuffled.length;
    return (
      <section className="quiz quiz-done" aria-live="polite">
        <h3>{perfect ? "Perfect score." : score >= shuffled.length / 2 ? "Nice work." : "Worth another look."}</h3>
        <p className="quiz-score tabular">
          {score} <span>of {shuffled.length} correct</span>
        </p>
        <p className="muted">
          {perfect
            ? "You've got the core ideas. Try spotting them on a real label next time you scan."
            : "Review the steps above, then try again. The questions reshuffle each time."}
        </p>
        <button className="btn" onClick={restart}>
          <RotateCcw aria-hidden="true" /> Try again
        </button>
      </section>
    );
  }

  const correct = picked === q.correct;
  return (
    <section className="quiz" aria-labelledby="quiz-q">
      <div className="quiz-head">
        <span className="quiz-title">{title}</span>
        <span className="quiz-count tabular" aria-label={`Question ${index + 1} of ${shuffled.length}`}>
          {index + 1} / {shuffled.length}
        </span>
      </div>
      <div className="quiz-bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${(index + (picked ? 1 : 0)) / shuffled.length})` }} />
      </div>
      <h3 id="quiz-q">{q.q}</h3>
      <div className="quiz-options" role="group" aria-label="Answers">
        {q.shown.map((opt) => {
          const state = !picked ? "" : opt === q.correct ? "right" : opt === picked ? "wrong" : "dim";
          return (
            <button key={opt} type="button" className="quiz-option" data-state={state} disabled={!!picked && state !== "right" && state !== "wrong"} onClick={() => pick(opt)}>
              <span className="mark" aria-hidden="true">
                {state === "right" ? <Check /> : state === "wrong" ? <X /> : null}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {picked && (
        <div className={`quiz-feedback ${correct ? "right" : "wrong"}`} role="status">
          <strong>{correct ? "Correct." : "Not quite."}</strong> {q.explain}
        </div>
      )}
      {picked && (
        <div className="row" style={{ justifyContent: "flex-end" }}>
          <button className="btn btn-primary" onClick={next} autoFocus>
            {index + 1 < shuffled.length ? "Next question" : "See results"} <ArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
