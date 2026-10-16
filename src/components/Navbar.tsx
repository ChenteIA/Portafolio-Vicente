import { useState } from "react";
import { Sparkles, Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import type { Navigate, Tab } from "../App";

interface NavbarProps {
  currentTab: Tab;
  onNavigate: Navigate;
}

interface NavItem {
  label: string;
  tab: Tab;
  anchor?: string;
  subItems?: { label: string; tab: Tab }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", tab: "portfolio" },
  { label: "Sobre mí", tab: "portfolio", anchor: "sobremi" },
  { label: "Proyectos", tab: "portfolio", anchor: "proyectos" },
  { label: "Demos", tab: "portfolio", anchor: "demos", subItems: [{ label: "Calculadora", tab: "calculator" }] },
  { label: "Contacto", tab: "portfolio", anchor: "contacto" },
];

export default function Navbar({ currentTab, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const go = (tab: Tab, anchor?: string) => {
    onNavigate(tab, anchor);
    setMobileMenuOpen(false);
  };

  // Solo los items que cambian de vista (sin ancla) se marcan como activos
  const isActive = (item: NavItem) => !item.anchor && currentTab === item.tab;

  const desktopBtn = (active: boolean) =>
    `px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
      active ? "bg-white/10 text-white font-semibold" : "text-brand-muted/80 hover:text-white hover:bg-white/5"
    }`;

  return (
    <nav className="bg-brand-bg/85 backdrop-blur-lg fixed top-0 w-full z-50 border-b border-white/5 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-7xl mx-auto w-full">
        {/* Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-brand-muted hover:text-white p-1 rounded-lg cursor-pointer hover:bg-white/5 active:scale-95 transition-all"
            id="mobile_menu_toggle_btn"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            title="Ir al inicio"
            onClick={() => go("portfolio")}
            className="font-display text-2xl font-bold text-brand-orange tracking-tighter cursor-pointer flex items-center gap-2 hover:scale-102 transition-transform select-none"
            id="nav_logo"
          >
            <Sparkles className="w-6 h-6 text-brand-cyan animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-brand-orange">Chente.</span>
          </button>
        </div>

        {/* Tab Navigation links (Desktop) */}
        <div className="hidden md:flex gap-1 font-sans text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const button = (
              <button
                onClick={() => go(item.tab, item.anchor)}
                className={desktopBtn(isActive(item))}
                id={`nav_btn_${item.anchor ?? item.tab}`}
              >
                {item.label}
                {item.subItems && <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" />}
              </button>
            );

            if (!item.subItems) return <div key={item.label}>{button}</div>;

            return (
              <div key={item.label} className="relative group">
                {button}
                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-brand-panel/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 overflow-hidden translate-y-2 group-hover:translate-y-0">
                  <div className="p-1">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.tab}
                        id={`nav_btn_${sub.tab}`}
                        onClick={() => go(sub.tab)}
                        className="w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg text-brand-muted/80 hover:text-brand-orange hover:bg-brand-orange/10 transition-colors flex justify-between items-center"
                      >
                        {sub.label}
                        <ArrowUpRight className="w-3 h-3 opacity-50" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Dropdown list */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-panel border-b border-white/10 px-4 py-3 space-y-1 animate-fade-in" id="mobile_navbar_dropdown">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="space-y-1">
              <button
                onClick={() => go(item.tab, item.anchor)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  isActive(item)
                    ? "bg-brand-orange/15 text-brand-orange border-l-4 border-brand-orange pl-3"
                    : "text-brand-muted/80 hover:text-white hover:bg-white/5"
                }`}
                id={`mobile_nav_btn_${item.anchor ?? item.tab}`}
              >
                <span>{item.label}</span>
                {isActive(item) && <Sparkles className="w-3.5 h-3.5 text-brand-orange" />}
              </button>

              {item.subItems && (
                <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-white/5 ml-4">
                  {item.subItems.map((sub) => (
                    <button
                      key={sub.tab}
                      onClick={() => go(sub.tab)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        currentTab === sub.tab
                          ? "bg-brand-orange/10 text-brand-orange"
                          : "text-brand-muted/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {sub.label}
                      <ArrowUpRight className="w-3 h-3 opacity-40 text-brand-orange" />
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
