// Live updates from the server (Server-Sent Events): finished research reaches every open client instantly.

import { useEffect, useRef } from "react";
import type { ServerEvent } from "../../shared/types";

type Handler = (e: ServerEvent) => void;
const handlers = new Set<Handler>();
let source: EventSource | null = null;

function connect() {
  if (source || typeof EventSource === "undefined") return;
  source = new EventSource("/api/events");
  for (const type of ["ingredient.researched", "ingredient.updated"] as const) {
    source.addEventListener(type, (msg) => {
      try {
        const data = JSON.parse((msg as MessageEvent).data) as ServerEvent;
        handlers.forEach((h) => h(data));
      } catch {
        /* ignore malformed events */
      }
    });
  }
}

export function useServerEvents(handler: Handler) {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    connect();
    const h: Handler = (e) => ref.current(e);
    handlers.add(h);
    return () => {
      handlers.delete(h);
    };
  }, []);
}
