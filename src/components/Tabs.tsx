import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";

export interface TabDef<T extends string> {
  id: T;
  label: string;
  /** Optional count shown after the label (e.g. number of mechanisms). */
  count?: number;
}

/**
 * WAI-ARIA tabs with roving focus: arrow keys move between tabs, Home/End jump to the ends,
 * and selection follows focus. Panels are rendered by the caller with <TabPanel>.
 */
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
  idBase,
}: {
  tabs: TabDef<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  idBase: string;
}) {
  const refs = useRef(new Map<T, HTMLButtonElement>());

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.id === value);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    const id = tabs[next].id;
    onChange(id);
    const el = refs.current.get(id);
    el?.focus();
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <div className="tabs" role="tablist" aria-label={label} onKeyDown={onKey}>
      {tabs.map((t) => {
        const selected = t.id === value;
        return (
          <button
            key={t.id}
            ref={(el) => {
              if (el) refs.current.set(t.id, el);
              else refs.current.delete(t.id);
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${t.id}`}
            aria-controls={`${idBase}-panel-${t.id}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(t.id)}
          >
            {t.label}
            {t.count != null && t.count > 0 && <span className="tab-count">{t.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ idBase, id, children }: { idBase: string; id: string; children: ReactNode }) {
  return (
    <div className="tab-panel" role="tabpanel" id={`${idBase}-panel-${id}`} aria-labelledby={`${idBase}-tab-${id}`} tabIndex={0}>
      {children}
    </div>
  );
}

export function useTabsId() {
  return useId().replace(/:/g, "");
}
