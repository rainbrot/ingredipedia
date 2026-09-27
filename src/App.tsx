import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ToastProvider } from "./components/Toast";
import { HomePage } from "./pages/Home";
import { ScanPage } from "./pages/Scan";
import { ProductPage } from "./pages/Product";
import { IngredientPage } from "./pages/Ingredient";
import { LibraryPage } from "./pages/Library";
import { HistoryPage } from "./pages/History";
import { AboutPage } from "./pages/About";
import { NotFoundPage } from "./pages/NotFound";

// The review dashboard is only needed by admins, so it's split into its own bundle.
const AdminPage = lazy(() => import("./pages/Admin"));

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="scan" element={<ScanPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="ingredient/:id" element={<IngredientPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route
              path="admin"
              element={
                <Suspense fallback={<div className="empty"><span className="spinner" aria-label="Loading" /></div>}>
                  <AdminPage />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
