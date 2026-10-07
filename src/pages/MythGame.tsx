import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Flame, RotateCcw, X } from "lucide-react";
import { FACTS } from "../learn/facts";
import { api } from "../lib/api";
import { recordMyth, useProgress } from "../lib/progress";
import { useAsync } from "../lib/useAsync";
import { seededShuffle } from "../components/Quiz";
import { GlossaryScope, GlossaryText } from "../components/GlossaryText";
import { ErrorState, Skeleton } from "../components/ui";

interface Card {
  claim: string;
  isFact: boolean;
  explain: string;
  ingredientId?: string;
  ingredientName?: string;
}

const ROUND = 10;

/** Myths start with "It …" when written inside a profile; give them their subject back. */
function standalone(claim: string, name: string) {
  return /^(It|They)\b/.test(claim) ? claim.replace(/^(It|They)\b/, name) : claim;
}

export function MythGamePage() {
  const { data, error, loading, reload } = useAsync(() => api.myths(), []);
  const progress = useProgress();
  const [game, setGame] = useState(() => Date.now());
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const deck = useMemo<Card[]>(() => {
    if (!data) return [];
    const myths: Card[] = data.items.map((m) => ({
      claim: standalone(m.claim, m.ingredientName),
      isFact: false,
      explain: m.consensus,
      ingredientId: m.ingredientId,
      ingredientName: m.ingredientName,
    }));
    const facts: Card[] = FACTS.map((f) => ({ ...f, isFact: true }));
    const half = Math.floor(ROUND / 2);
    const pickMyths = seededShuffle(myths, `m${game}`).slice(0, half);
    const pickFacts = seededShuffle(facts, `f${game}`).slice(0, ROUND - pickMyths.length);
    return seededShuffle([...pickMyths, ...pickFacts], `d${game}`);
  }, [data, game]);

  if (loading && !data) {
    return (
      <div className="stack-lg" aria-busy="true">
        <Skeleton h={40} w="50%" />
        <Skeleton h={260} r={24} />
      </div>
    );
  }
  if (error) return <ErrorState message={error.message} onRetry={reload} />;

  const card = deck[i];
  const finished = i >= deck.length;

  const judge = (saysFact: boolean) => {
    if (answer !== null) return;
    const right = saysFact === card.isFact;
    const nextStreak = right ? streak + 1 : 0;
    setAnswer(saysFact);
    setStreak(nextStreak);
    if (right) setScore((s) => s + 1);
    recordMyth(right, nextStreak);
  };

  const next = () => {
    setI(i + 1);
    setAnswer(null);
  };

  const restart = () => {
    setGame(Date.now());
    setI(0);
    setAnswer(null);
    setScore(0);
    setStreak(0);
  };

  return (
    <div className="myth-game">
      <div className="row">
        <Link to="/learn" className="btn btn-ghost">
          <ArrowLeft aria-hidden="true" /> Learn
        </Link>
        <div className="grow" />
        <span className="streak tabular" aria-label={`Current streak ${streak}, best ${progress.myths.bestStreak}`}>
          <Flame aria-hidden="true" /> {streak}
          <span className="subtle"> · best {progress.myths.bestStreak}</span>
        </span>
      </div>

      <header className="page-head">
        <h1 className="page-title">Myth or Fact</h1>
        <p className="lede">Every claim here is something people say about everyday ingredients. Decide, then see what the evidence shows.</p>
      </header>

      {finished ? (
        <section className="mg-card mg-done" aria-live="polite">
          <h2>
            {score >= 9 ? "Evidence expert." : score >= 7 ? "Sharp thinking." : score >= 5 ? "Good start." : "Tricky round."}
          </h2>
          <p className="quiz-score tabular">
            {score} <span>of {deck.length} correct</span>
          </p>
          <p className="muted">
            {score >= 7
              ? "You're judging claims by evidence, not by how they sound. Try a lesson to go deeper."
              : "Many myths sound scientific. The lesson on judging evidence covers the questions that catch them."}
          </p>
          <div className="row" style={{ justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={restart}>
              <RotateCcw aria-hidden="true" /> Play again
            </button>
            <Link to="/learn/evidence" className="btn">
              How scientists judge evidence
            </Link>
          </div>
        </section>
      ) : (
        <section className="mg-card" aria-labelledby="mg-claim" data-result={answer === null ? undefined : answer === card.isFact ? "right" : "wrong"}>
          <div className="mg-top">
            <div className="mg-progress" aria-hidden="true">
              {deck.map((_, k) => (
                <span key={k} data-state={k < i ? "done" : k === i ? "now" : "next"} />
              ))}
            </div>
            <span className="mg-count tabular">
              {i + 1} / {deck.length}
            </span>
          </div>
          <blockquote id="mg-claim" className="mg-claim">
            {card.claim}
          </blockquote>

          {answer === null ? (
            <div className="mg-actions">
              <button className="btn btn-lg mg-btn" onClick={() => judge(false)}>
                <X aria-hidden="true" /> Myth
              </button>
              <button className="btn btn-lg mg-btn" onClick={() => judge(true)}>
                <Check aria-hidden="true" /> Fact
              </button>
            </div>
          ) : (
            <div className="mg-reveal" role="status">
              <p className="mg-verdict">
                {answer === card.isFact ? "Correct" : "Not quite"}: it's a <strong>{card.isFact ? "fact" : "myth"}</strong>.
              </p>
              <GlossaryScope key={i}>
                <p className="prose">
                  <GlossaryText text={card.explain} />
                </p>
              </GlossaryScope>
              <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                {card.ingredientId ? (
                  <Link to={`/ingredient/${card.ingredientId}`} className="inline-link">
                    Explore {card.ingredientName ?? "the ingredient"}
                  </Link>
                ) : (
                  <span />
                )}
                <button className="btn btn-primary" onClick={next} autoFocus>
                  {i + 1 < deck.length ? "Next claim" : "See results"} <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
