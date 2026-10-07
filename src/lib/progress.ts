// Learning progress, stored on this device (no accounts). Components subscribe to changes.

import { useSyncExternalStore } from "react";

export interface Progress {
  lessons: Record<string, { completed: boolean; score: number; total: number; at: string }>;
  discovered: string[];
  myths: { answered: number; correct: number; bestStreak: number };
}

const KEY = "assay.progress";
const EMPTY: Progress = { lessons: {}, discovered: [], myths: { answered: 0, correct: 0, bestStreak: 0 } };

let state: Progress = load();
const listeners = new Set<() => void>();

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { ...EMPTY, ...parsed, myths: { ...EMPTY.myths, ...parsed.myths } };
  } catch {
    return EMPTY;
  }
}

function save(next: Progress) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: progress lasts for this session */
  }
  listeners.forEach((l) => l());
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
}

/** Returns true the first time an ingredient is discovered. */
export function discover(id: string): boolean {
  if (state.discovered.includes(id)) return false;
  save({ ...state, discovered: [...state.discovered, id] });
  return true;
}

export function completeLesson(id: string, score: number, total: number) {
  const prev = state.lessons[id];
  const best = prev && prev.score > score ? prev.score : score;
  save({ ...state, lessons: { ...state.lessons, [id]: { completed: true, score: best, total, at: new Date().toISOString() } } });
}

export function recordMyth(correct: boolean, streak: number) {
  const m = state.myths;
  save({ ...state, myths: { answered: m.answered + 1, correct: m.correct + (correct ? 1 : 0), bestStreak: Math.max(m.bestStreak, streak) } });
}

export function resetProgress() {
  save(EMPTY);
}
