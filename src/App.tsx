import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PortfolioView from "./components/PortfolioView";

// La calculadora es una pestaña secundaria: se descarga solo cuando se abre
const GradeCalculatorView = lazy(() => import("./components/GradeCalculatorView"));

export type Tab = "portfolio" | "calculator";
export type Navigate = (tab: Tab, anchor?: string) => void;

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>("portfolio");
  // Nuevo objeto en cada navegación para que el efecto se dispare aunque el destino se repita
  const [scrollTarget, setScrollTarget] = useState<{ anchor?: string } | null>(null);

  const navigate: Navigate = (tab, anchor) => {
    setCurrentTab(tab);
    setScrollTarget({ anchor });
  };

  // Se ejecuta después de que la vista nueva está montada, así la sección destino ya existe
  useEffect(() => {
    if (!scrollTarget) return;
    if (scrollTarget.anchor) document.getElementById(scrollTarget.anchor)?.scrollIntoView();
    else window.scrollTo({ top: 0 });
  }, [scrollTarget]);

  return (
    <div className="min-h-screen bg-brand-bg/90 text-brand-text antialiased selection:bg-brand-orange selection:text-white relative flex flex-col">
      {/* Handcrafted tech grid background overlay */}
      <div className="fixed inset-0 tech-grid pointer-events-none opacity-[0.35] z-0" />

      <Navbar currentTab={currentTab} onNavigate={navigate} />

      {/* Primary tab workspace view routing */}
      <main className="relative z-10 flex-1">
        {currentTab === "portfolio" && <PortfolioView onNavigate={navigate} />}
        {currentTab === "calculator" && (
          <Suspense fallback={<div className="min-h-[95vh]" />}>
            <GradeCalculatorView />
          </Suspense>
        )}
      </main>

      {/* Custom footer */}
      <footer className="relative border-t border-white/5 bg-brand-bg/90 py-8 z-10 text-center select-none text-xs text-brand-muted/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Vicente Celis Arias. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate("portfolio")} className="hover:text-brand-orange transition-colors">Volver arriba</button>
            <span aria-hidden="true">•</span>
            <button onClick={() => navigate("calculator")} className="hover:text-brand-orange transition-colors">Calculadora</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
