import { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ToastProvider } from "./components/Toast";
import { HomePage } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFound";

// Every page but Home is its own chunk, so the first visit downloads less. Once the app is idle the
// chunks are fetched anyway, which lets the service worker cache them for offline lessons.
const pages = {
  scan: () => import("./pages/Scan"),
  product: () => import("./pages/Product"),
  ingredient: () => import("./pages/Ingredient"),
  learn: () => import("./pages/Learn"),
  lesson: () => import("./pages/Lesson"),
  myths: () => import("./pages/MythGame"),
  glossary: () => import("./pages/Glossary"),
  collection: () => import("./pages/Collection"),
  library: () => import("./pages/Library"),
  history: () => import("./pages/History"),
  about: () => import("./pages/About"),
};

const ScanPage = lazy(() => pages.scan().then((m) => ({ default: m.ScanPage })));
const ProductPage = lazy(() => pages.product().then((m) => ({ default: m.ProductPage })));
const IngredientPage = lazy(() => pages.ingredient().then((m) => ({ default: m.IngredientPage })));
const LearnPage = lazy(() => pages.learn().then((m) => ({ default: m.LearnPage })));
const LessonPage = lazy(() => pages.lesson().then((m) => ({ default: m.LessonPage })));
const MythGamePage = lazy(() => pages.myths().then((m) => ({ default: m.MythGamePage })));
const GlossaryPage = lazy(() => pages.glossary().then((m) => ({ default: m.GlossaryPage })));
const CollectionPage = lazy(() => pages.collection().then((m) => ({ default: m.CollectionPage })));
const LibraryPage = lazy(() => pages.library().then((m) => ({ default: m.LibraryPage })));
const HistoryPage = lazy(() => pages.history().then((m) => ({ default: m.HistoryPage })));
const AboutPage = lazy(() => pages.about().then((m) => ({ default: m.AboutPage })));

export function App() {
  useEffect(() => {
    const prefetch = () => Object.values(pages).forEach((load) => void load().catch(() => undefined));
    // Safari has no requestIdleCallback; a short timeout is close enough there.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(prefetch, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="scan" element={<ScanPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="ingredient/:id" element={<IngredientPage />} />
            <Route path="learn" element={<LearnPage />} />
            <Route path="learn/myths" element={<MythGamePage />} />
            <Route path="learn/glossary" element={<GlossaryPage />} />
            <Route path="learn/collection" element={<CollectionPage />} />
            <Route path="learn/:id" element={<LessonPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
