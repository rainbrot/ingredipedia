// Server-Sent Events hub: pushes "ingredient researched" to every connected client the moment
// automatic research finishes (the plan's "Global Sync").

import type { Response } from "express";
import type { ServerEvent } from "../../shared/types";

const clients = new Set<Response>();

export function subscribe(res: Response) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  res.write("retry: 4000\n\n");
  clients.add(res);
  const heartbeat = setInterval(() => res.write(": ping\n\n"), 25_000);
  res.on("close", () => {
    clearInterval(heartbeat);
    clients.delete(res);
  });
}

export function broadcast(event: ServerEvent) {
  const payload = `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
  for (const res of clients) res.write(payload);
}

export function connectedClients(): number {
  return clients.size;
}
