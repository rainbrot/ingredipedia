import { useCallback, useEffect, useRef, useState } from "react";

/** Minimal data-fetching hook with loading/error state and a reload function. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const seq = useRef(0);

  const run = useCallback(
    async (opts: { silent?: boolean } = {}) => {
      const id = ++seq.current;
      if (!opts.silent) setLoading(true);
      setError(null);
      try {
        const result = await fn();
        if (id === seq.current) setData(result);
      } catch (err) {
        if (id === seq.current) setError(err as Error);
      } finally {
        if (id === seq.current) setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );

  useEffect(() => {
    void run();
  }, [run]);

  return { data, error, loading, reload: run, setData };
}
