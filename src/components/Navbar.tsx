import React, { useState } from "react";
import { Sparkles, Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
}

export default function Navbar({ currentTab, onChangeTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tabId: string, isScroll?: boolean) => {
    if (isScroll) {
      if (currentTab !== "portfolio") {
        onChangeTab("portfolio");
        setTimeout(() => {
          const el = document.getElementById(tabId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
         const el = document.getElementById(tabId);
         if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onChangeTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "portfolio", label: "Inicio", isScroll: false },
    { id: "sobremi", label: "Sobre mí", isScroll: true },
    { id: "proyectos", label: "Proyectos", isScroll: true },
    { 
      id: "demos", 
      label: "Demos", 
      isScroll: true,
      subItems: [
        { id: "calculator", label: "Calculadora" }
      ]
    },
    { id: "contacto", label: "Contacto", isScroll: true }
  ];

  return (
    <nav className="bg-[#0f131d]/85 backdrop-blur-lg fixed top-0 w-full z-50 border-b border-white/5 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-7xl mx-auto w-full">
        {/* Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#e2bfb0] hover:text-white p-1 rounded-lg cursor-pointer hover:bg-white/5 active:scale-95 transition-all"
            id="mobile_menu_toggle_btn"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button 
            type="button"
            aria-label="Ir al inicio"
            onClick={() => handleTabClick("portfolio", false)}
            className="font-display text-2xl font-bold text-[#ff6b00] tracking-tighter cursor-pointer flex items-center gap-2 hover:scale-102 transition-transform select-none"
            id="nav_logo"
          >
            <Sparkles className="w-6 h-6 text-[#14d1ff] animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#ff6b00]">Chente.</span>
          </button>
        </div>

        {/* Tab Navigation links (Desktop) */}
        <div className="hidden md:flex gap-1 font-sans text-sm font-medium">
          {navItems.map((item) => (
            item.subItems ? (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleTabClick(item.id, item.isScroll)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    (currentTab === item.id && !item.isScroll) || (currentTab === "portfolio" && item.id === "portfolio")
                      ? "bg-white/10 text-white font-semibold"
                      : "text-[#e2bfb0]/80 hover:text-white hover:bg-white/5"
                  }`}
                  id={`nav_btn_${item.id}`}
                >
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#121622]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden translate-y-2 group-hover:translate-y-0">
                  <div className="p-1">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        id={`nav_btn_${sub.id}`}
                        onClick={(e) => { e.stopPropagation(); handleTabClick(sub.id, false); }}
                        className="w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg text-[#e2bfb0]/80 hover:text-[#ff6b00] hover:bg-[#ff6b00]/10 transition-colors flex justify-between items-center"
                      >
                        {sub.label}
                        <ArrowUpRight className="w-3 h-3 opacity-50" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id, item.isScroll)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  (currentTab === item.id && !item.isScroll) || (currentTab === "portfolio" && item.id === "portfolio")
                    ? "bg-white/10 text-white font-semibold"
                    : "text-[#e2bfb0]/80 hover:text-white hover:bg-white/5"
                }`}
                id={`nav_btn_${item.id}`}
              >
                {item.label}
                {!item.isScroll && item.id !== "portfolio" && <ArrowUpRight className="w-3 h-3 opacity-50" />}
              </button>
            )
          ))}
        </div>

      </div>

      {/* Mobile Menu Dropdown list */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121622] border-b border-white/10 px-4 py-3 space-y-1 animate-fade-in" id="mobile_navbar_dropdown">
          {navItems.map((item) => (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => handleTabClick(item.id, item.isScroll)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  (currentTab === item.id && !item.isScroll) || (currentTab === "portfolio" && item.id === "portfolio")
                    ? "bg-[#ff6b00]/15 text-[#ff6b00] border-l-4 border-[#ff6b00] pl-3"
                    : "text-[#e2bfb0]/80 hover:text-white hover:bg-white/5"
                }`}
                id={`mobile_nav_btn_${item.id}`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {!item.isScroll && item.id !== "portfolio" && !item.subItems && <ArrowUpRight className="w-3 h-3 opacity-50" />}
                </div>
                {((currentTab === item.id && !item.isScroll) || (currentTab === "portfolio" && item.id === "portfolio")) && <Sparkles className="w-3.5 h-3.5 text-[#ff6b00]" />}
              </button>
              
              {/* Mobile SubItems rendering */}
              {item.subItems && (
                <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-white/5 ml-4">
                  {item.subItems.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleTabClick(sub.id, false)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        currentTab === sub.id
                          ? "bg-[#ff6b00]/10 text-[#ff6b00]"
                          : "text-[#e2bfb0]/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {sub.label}
                      <ArrowUpRight className="w-3 h-3 opacity-40 text-[#ff6b00]" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
