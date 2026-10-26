import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { X } from "lucide-react";

type ToastKind = "success" | "info" | "error";
interface ToastItem {
  id: number;
  kind: ToastKind;
  text: ReactNode;
}

const ToastContext = createContext<(text: ReactNode, kind?: ToastKind) => void>(() => undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const dismiss = useCallback((id: number) => setItems((all) => all.filter((t) => t.id !== id)), []);
  const push = useCallback(
    (text: ReactNode, kind: ToastKind = "info") => {
      const id = Date.now() + Math.random();
      setItems((all) => [...all.slice(-2), { id, kind, text }]);
      setTimeout(() => dismiss(id), 5200);
    },
    [dismiss],
  );
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className="toast" data-kind={t.kind}>
            <div className="grow">{t.text}</div>
            <button onClick={() => dismiss(t.id)} aria-label="Dismiss notification">
              <X width={16} height={16} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
