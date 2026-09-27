import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Segmented } from "./ui";

type Style = "ballstick" | "sphere" | "stick";

const STYLE_SPECS: Record<Style, Record<string, unknown>> = {
  ballstick: { stick: { radius: 0.16, colorscheme: "Jmol" }, sphere: { scale: 0.28, colorscheme: "Jmol" } },
  sphere: { sphere: { colorscheme: "Jmol" } },
  stick: { stick: { radius: 0.2, colorscheme: "Jmol" } },
};

/**
 * Interactive WebGL molecule (3Dmol.js). Loads the SDF cached by the server from PubChem
 * (or an admin-uploaded file). The 3Dmol bundle is loaded lazily, only when a profile opens.
 */
export function MoleculeViewer({ src, sdf, label }: { src?: string; sdf?: string; label: string }) {
  const host = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [style, setStyle] = useState<Style>("ballstick");
  const [spin, setSpin] = useState(!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const [state, setState] = useState<"loading" | "ready" | "missing" | "error">("loading");
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    (async () => {
      try {
        let data = sdf;
        let source = "";
        if (!data && src) {
          const res = await fetch(src, { headers: { "X-Assay-Device": localStorage.getItem("assay.device") ?? "" } });
          if (res.status === 404) {
            if (!cancelled) setState("missing");
            return;
          }
          if (!res.ok) throw new Error(String(res.status));
          data = await res.text();
          source = res.headers.get("X-Structure-Source") ?? "";
        }
        if (!data) {
          if (!cancelled) setState("missing");
          return;
        }
        const $3Dmol = await import("3dmol");
        if (cancelled || !host.current) return;
        host.current.innerHTML = "";
        const viewer = $3Dmol.createViewer(host.current, { backgroundAlpha: 0, antialias: true } as any);
        viewer.addModel(data, "sdf");
        viewer.setStyle({}, STYLE_SPECS[style] as any);
        viewer.zoomTo();
        viewer.zoom(0.92);
        viewer.render();
        viewerRef.current = viewer;
        setFlat(source === "pubchem-2d");
        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
      viewerRef.current?.clear?.();
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, sdf]);

  useEffect(() => {
    const v = viewerRef.current;
    if (!v) return;
    v.setStyle({}, STYLE_SPECS[style] as any);
    v.render();
  }, [style, state]);

  useEffect(() => {
    const v = viewerRef.current;
    if (!v) return;
    v.spin(spin ? "y" : false, 0.6);
  }, [spin, state]);

  // Don't hijack page scrolling: the wheel only zooms after the user clicks into the model,
  // or with a pinch / Ctrl/⌘ + scroll gesture.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let engaged = false;
    const onWheel = (e: WheelEvent) => {
      if (!engaged && !e.ctrlKey && !e.metaKey) e.stopPropagation();
    };
    const engage = () => (engaged = true);
    const release = () => (engaged = false);
    el.addEventListener("wheel", onWheel, { capture: true });
    el.addEventListener("pointerdown", engage);
    el.addEventListener("pointerleave", release);
    return () => {
      el.removeEventListener("wheel", onWheel, { capture: true });
      el.removeEventListener("pointerdown", engage);
      el.removeEventListener("pointerleave", release);
    };
  }, []);

  useEffect(() => {
    const onResize = () => viewerRef.current?.resize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="plate">
      <div className="plate-head">
        <span>3D model</span>
        <div className="row" style={{ gap: 4 }}>
          <button className="icon-btn" onClick={() => setSpin((s) => !s)} aria-label={spin ? "Pause rotation" : "Rotate automatically"} aria-pressed={spin} disabled={state !== "ready"}>
            {spin ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>
          <button
            className="icon-btn"
            onClick={() => {
              viewerRef.current?.zoomTo();
              viewerRef.current?.zoom(0.92);
              viewerRef.current?.render();
            }}
            aria-label="Reset view"
            disabled={state !== "ready"}
          >
            <RotateCcw aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="plate-body" style={{ background: "radial-gradient(circle at 50% 40%, var(--surface-2), var(--surface))" }}>
        <div ref={host} className="viewer3d" role="img" aria-label={`Rotatable 3D model of ${label}. Drag to rotate; click then scroll, or pinch, to zoom.`} />
        {state !== "ready" && (
          <div className="viewer-overlay">
            {state === "loading" && <span className="spinner" aria-label="Loading 3D model" />}
            {state === "missing" && <span>No 3D structure is available for this ingredient.</span>}
            {state === "error" && <span>The 3D viewer couldn't load. Your browser may not support WebGL.</span>}
          </div>
        )}
      </div>
      <div className="plate-foot">
        <Segmented
          label="Model style"
          value={style}
          onChange={setStyle}
          options={[
            { value: "ballstick", label: "Ball & stick" },
            { value: "sphere", label: "Space-filling" },
            { value: "stick", label: "Stick" },
          ]}
        />
        <span>{flat ? "PubChem has no 3D conformer; showing the 2D layout" : "Drag to rotate · click, then scroll to zoom"}</span>
      </div>
    </div>
  );
}
