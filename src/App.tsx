import { useState } from "react";
import Navbar from "./components/Navbar";
import PortfolioView from "./components/PortfolioView";
import GradeCalculatorView from "./components/GradeCalculatorView";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("portfolio");

  return (
    <>
      <div className="min-h-screen bg-[#0f131d]/90 text-[#dee2f0] antialiased selection:bg-[#ff6b00] selection:text-white relative flex flex-col">
      {/* Handcrafted tech grid background overlay */}
      <div className="fixed inset-0 tech-grid pointer-events-none opacity-[0.35] z-0" />

      {/* Top Navbar */}
      <Navbar 
        currentTab={currentTab} 
        onChangeTab={(tab) => setCurrentTab(tab)} 
      />

      {/* Primary tab workspace view routing */}
      <div className="relative z-10 flex-1">
        {currentTab === "portfolio" && <PortfolioView onNavigate={setCurrentTab} />}
        {currentTab === "calculator" && <GradeCalculatorView />}
      </div>

      {/* Custom footer */}
      <footer className="relative border-t border-white/5 bg-[#0f131d]/90 py-8 z-10 text-center select-none text-xs text-[#e2bfb0]/45 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <p>© 2026 Vicente Celis Arias. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => {
              setCurrentTab("portfolio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} className="hover:text-[#ff6b00] transition-colors">Volver arriba</button>
            <span>•</span>
            <button onClick={() => {
              setCurrentTab("calculator");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} className="hover:text-[#ff6b00] transition-colors">Calculadora</button>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

