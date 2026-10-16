import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Award, Terminal, ChevronRight, Mail, Download, Calendar, MapPin, ExternalLink, Instagram, MessageCircle, Database } from "lucide-react";

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedText(text);
      return;
    }

    let typingInterval: ReturnType<typeof setInterval> | undefined;
    let charIndex = 0;

    const timeout = setTimeout(() => {
      setIsTyping(true);
      typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(typingInterval);
    };
  }, [text, delay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{displayedText}</span>
      <motion.span 
        aria-hidden="true"
        animate={{ opacity: [1, 0, 1] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className={`inline-block w-[0.4em] h-[1em] bg-current align-middle ml-1 ${isTyping ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  );
};

interface PortfolioViewProps {
  onNavigate?: (tab: string) => void;
}

export default function PortfolioView({ onNavigate }: PortfolioViewProps) {
  // Floating tags dataset corresponding to the premium modern model logos
  const floatingTags = [
    { name: "NotebookLM", icon: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 1.14 174.56 127.99" width="20" height="20" fill="currentColor"><g><g id="Layer_1"><g><path d="M87.27,1.14C39.07,1.14,0,39.88,0,87.69v41.44h16.09v-4.13c0-19.39,15.84-35.11,35.39-35.11s35.39,15.72,35.39,35.11v4.13h16.09v-4.13c0-28.2-23.05-51.05-51.48-51.05-11.07,0-21.32,3.46-29.72,9.37,8.79-17.32,26.88-29.21,47.77-29.21,29.51,0,53.44,23.74,53.44,53v22.02h16.09v-22.02c0-38.08-31.13-68.96-69.53-68.96-17.27,0-33.06,6.24-45.22,16.58,11.94-22.39,35.65-37.64,62.97-37.64,39.32,0,71.19,31.61,71.19,70.6v41.44h16.09v-41.44C174.55,39.88,135.48,1.14,87.27,1.14Z"/></g></g></g></svg> },
    { name: "Python", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><defs><linearGradient id="a" x1="-133.268" y1="-202.91" x2="-133.198" y2="-202.84" gradientTransform="translate(25243.061 38519.17) scale(189.38 189.81)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#387eb8"/><stop offset="1" stopColor="#366994"/></linearGradient><linearGradient id="b" x1="-133.575" y1="-203.203" x2="-133.495" y2="-203.133" gradientTransform="translate(25309.061 38583.42) scale(189.38 189.81)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffe052"/><stop offset="1" stopColor="#ffc331"/></linearGradient></defs><title>file_type_python</title><path d="M15.885,2.1c-7.1,0-6.651,3.07-6.651,3.07V8.36h6.752v1H6.545S2,8.8,2,16.005s4.013,6.912,4.013,6.912H8.33V19.556s-.13-4.013,3.9-4.013h6.762s3.772.06,3.772-3.652V5.8s.572-3.712-6.842-3.712h0ZM12.153,4.237a1.214,1.214,0,1,1-1.183,1.244v-.02a1.214,1.214,0,0,1,1.214-1.214h0Z" style={{fill:"url(#a)"}}/><path d="M16.085,29.91c7.1,0,6.651-3.08,6.651-3.08V23.65H15.985v-1h9.47S30,23.158,30,15.995s-4.013-6.912-4.013-6.912H23.64V12.4s.13,4.013-3.9,4.013H12.975S9.2,16.356,9.2,20.068V26.2s-.572,3.712,6.842,3.712h.04Zm3.732-2.147A1.214,1.214,0,1,1,21,26.519v.03a1.214,1.214,0,0,1-1.214,1.214h.03Z" style={{fill:"url(#b)"}}/></svg> },
    { name: "Claude", icon: <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 512 512" width="20" height="20"><path d="m100.5 340.4 100.7-56.5 1.7-4.9-1.7-2.7h-4.9l-16.9-1-57.6-1.6-49.8-2.1-48.4-2.6-12.2-2.6-11.4-15 1.2-7.5 10.2-6.8 14.6 1.3 32.4 2.2L107 244l35.2 2.1 52.2 5.4h8.3l1.2-3.3-2.9-2.1-2.2-2.1-50.3-34-54.4-36-28.5-20.7-15.4-10.5-7.8-9.9-3.4-21.5L53 96l18.8 1.3 4.8 1.3 19.1 14.6 40.7 31.5 53.1 39.1 7.8 6.5 3.1-2.2.4-1.6-3.5-5.8-28.9-52.2-30.8-53.1-13.7-22-3.6-13.4c-1.4-5.1-2.1-10.3-2.2-15.6l16-21.6 8.8-2.9 21.2 2.9 9 7.8 13.2 30.2 21.4 47.6 33.2 64.6 9.7 19.2 5.2 17.7 1.9 5.4h3.4v-3.1l2.7-36.4 5.1-44.7 4.9-57.5 1.7-16.2 8-19.4 15.9-10.5 12.5 6 10.2 14.6-1.4 9.5-6.1 39.5-11.9 61.9-7.8 41.4h4.5l5.2-5.2 21-27.9 35.2-44 15.6-17.5 18.1-19.3 11.7-9.2h22l16.2 24.1-7.3 24.9-22.7 28.7-18.8 24.4-27 36.3-16.9 29 1.6 2.3 4-.4 60.9-12.9 32.9-6 39.3-6.7 17.8 8.3 1.9 8.4-7 17.2-42 10.4-49.3 9.9-73.4 17.3-.9.6 1 1.3 33 3.1 14.1.8h34.6l64.4 4.8 16.9 11.1 10.1 13.6-1.7 10.3-25.9 13.2-35-8.3-81.7-19.4-28-7h-3.9v2.3l23.3 22.8 42.8 38.6L455 410l2.7 12.3-6.9 9.7-7.3-1-47-35.3-18.2-15.9-41.1-34.6h-2.7v3.6l9.5 13.8 50 75.1 2.6 23-3.6 7.5-13 4.5-14.3-2.6-28.7-40.7-30.2-46.2-24.4-41.5-3 1.7L265 498.2l-6.7 7.9-15.6 6-12.9-9.8-6.9-15.9 6.9-31.5 8.3-41 6.7-32.6 6.1-40.5 3.6-13.5-.3-.9-3 .4-30.6 42-46.5 62.8-36.8 39.4-8.8 3.5-15.3-7.9 1.4-14.1 8.6-12.6 50.9-64.8 30.7-40.1 19.8-23.2-.1-3.4h-1.2L88.1 395.9 64 399.1l-10.4-9.7 1.3-15.9 4.9-5.2 40.7-28c.1-.1 0 .1 0 .1" style={{fill:"#d97757"}}/></svg> },
    { name: "SQL", icon: <Database size={20} className="text-[#366994]" /> },
    { name: "Qwen", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="27.55 17.52 147.28 145.51" width="20" height="20"><path d="M174.82 108.75L155.38 75L165.64 57.75C166.46 56.31 166.46 54.53 165.64 53.09L155.38 35.84C154.86 34.91 153.87 34.33 152.78 34.33H114.88L106.14 19.03C105.62 18.1 104.63 17.52 103.54 17.52H83.3C82.21 17.52 81.22 18.1 80.7 19.03L61.26 52.77H41.02C39.93 52.77 38.94 53.35 38.42 54.28L28.16 71.53C27.34 72.97 27.34 74.75 28.16 76.19L45.52 107.5L36.78 122.8C35.96 124.24 35.96 126.02 36.78 127.46L47.04 144.71C47.56 145.64 48.55 146.22 49.64 146.22H87.54L96.28 161.52C96.8 162.45 97.79 163.03 98.88 163.03H119.12C120.21 163.03 121.2 162.45 121.72 161.52L141.16 127.78H158.52C159.61 127.78 160.6 127.2 161.12 126.27L171.38 109.02C172.2 107.58 172.2 105.8 171.38 104.36L174.82 108.75Z" fill="url(#paint0_radial)"/><path d="M119.12 163.03H98.88L87.54 144.71H49.64L61.26 126.39H80.7L38.42 55.29H61.26L83.3 19.03L93.56 37.35L83.3 55.29H161.58L151.32 72.54L170.76 106.28H151.32L141.16 88.34L101.18 163.03H119.12Z" fill="white"/><path d="M127.86 79.83H76.14L101.18 122.11L127.86 79.83Z" fill="url(#paint1_radial)"/><defs><radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(100)"><stop stopColor="#665CEE"/><stop offset="1" stopColor="#332E91"/></radialGradient><radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(100)"><stop stopColor="#665CEE"/><stop offset="1" stopColor="#332E91"/></radialGradient></defs></svg> },
    { name: "Power BI", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 630 630" version="1.1"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1"><stop stopColor="#EBBB14" offset="0%"/><stop stopColor="#B25400" offset="100%"/></linearGradient><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2"><stop stopColor="#F9E583" offset="0%"/><stop stopColor="#DE9800" offset="100%"/></linearGradient><path d="M346,604 L346,630 L320,630 L153,630 C138.640597,630 127,618.359403 127,604 L127,183 C127,168.640597 138.640597,157 153,157 L320,157 C334.359403,157 346,168.640597 346,183 L346,604 Z" id="path-3"/><filter x="-9.1%" y="-6.3%" width="136.5%" height="116.9%" filterUnits="objectBoundingBox" id="filter-4"><feOffset dx="20" dy="10" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0530211976 0" type="matrix" in="shadowBlurOuter1"/></filter><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5"><stop stopColor="#F9E68B" offset="0%"/><stop stopColor="#F3CD32" offset="100%"/></linearGradient></defs><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(77.500000, 0.000000)"><rect fill="url(#linearGradient-1)" x="256" y="0" width="219" height="630" rx="26"/><g><use fill="black" fillOpacity="1" filter="url(#filter-4)" href="#path-3"/><use fill="url(#linearGradient-2)" fillRule="evenodd" href="#path-3"/></g><path d="M219,604 L219,630 L193,630 L26,630 C11.6405965,630 1.75851975e-15,618.359403 0,604 L0,341 C-1.75851975e-15,326.640597 11.6405965,315 26,315 L193,315 C207.359403,315 219,326.640597 219,341 L219,604 Z" fill="url(#linearGradient-5)"/></g></g></svg> }
  ];

  return (
    <div className="w-full animate-fade-in relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-28 pb-32">
        
        {/* 1. HERO SECTION */}
        <header className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0 md:gap-x-12 items-center">
          
          <div className="col-span-1 md:col-span-7 flex flex-col items-start gap-4">
            <span className="font-mono text-[#ff6b00] font-semibold uppercase tracking-[0.2em] text-xs">
              Portafolio Profesional
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-[#dee2f0] tracking-tight leading-tight md:leading-tight mb-2 min-h-[120px] md:min-h-[100px]">
              <TypewriterText text="Vicente Celis Arias" delay={200} />
            </h1>
            <div className="font-mono text-xl md:text-2xl text-[#14d1ff] font-semibold min-h-[4rem] md:min-h-[3rem]">
              <TypewriterText text="> Matemático e Informático" delay={1300} />
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="text-lg md:text-xl max-w-2xl text-[#e2bfb0]/90 leading-relaxed mt-4"
            >
              Profesional egresado de la Universidad Nacional San Luis Gonzaga, enfocado en resolver problemas complejos mediante la lógica de programación y el análisis de datos. Apasionado por el diseño digital, la automatización de procesos y la enseñanza matemática y algorítmica.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="flex items-center gap-4 mt-6"
            >
              <a 
                href="#contacto"
                className="bg-[#ff6b00] hover:bg-[#e66000] text-white font-mono font-bold py-3 px-8 rounded-xl transition-all uppercase text-sm tracking-widest shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_25px_rgba(255,107,0,0.5)] transform hover:-translate-y-0.5"
              >
                Hablemos
              </a>
              <a 
                href="https://github.com/ChenteIA" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/5 border border-white/10 hover:border-white/30 text-white font-mono font-bold py-3 px-8 rounded-xl transition-all uppercase text-sm tracking-widest backdrop-blur-sm"
              >
                GitHub
              </a>
            </motion.div>
          </div>

          <div className="col-span-1 md:col-span-5 relative flex justify-center items-center h-[400px]">
            {/* Subtle neon glow circle behind the character avatar */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6b00]/15 to-[#14d1ff]/5 rounded-full blur-[80px] z-0" />

            {/* Orbital Ring System */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] z-0 pointer-events-none select-none text-white">
              <div className="absolute inset-0 rounded-full border border-white/10 border-dashed opacity-60 shadow-[0_0_30px_rgba(255,255,255,0.02)_inset]" />

              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                {floatingTags.map((tag, i) => {
                  const angle = (i / floatingTags.length) * 360;
                  return (
                    <div
                      key={tag.name}
                      className="absolute inset-0 flex items-center"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div className="absolute right-0 translate-x-1/2 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        >
                          <div
                            className="glass-panel border border-[#ff6b00]/40 px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-2 md:gap-2.5 text-white font-display text-[10px] md:text-sm font-semibold shadow-[0_0_15px_rgba(255,107,0,0.2)] whitespace-nowrap bg-slate-950/40 backdrop-blur-md"
                            style={{ transform: `rotate(-${angle}deg)` }}
                          >
                            {tag.icon}
                            <span>{tag.name}</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Avatar */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              alt="Avatar de Vicente Celis Arias" 
              src="/avatar.png"
              width={285}
              height={512} 
              className="object-contain h-[90%] md:h-full z-10 relative drop-shadow-[0_0_35px_rgba(255,107,0,0.35)] hover:scale-103 transition-transform duration-500"
            />
          </div>
        </header>

        {/* 2. SOBRE MÍ */}
        <section id="sobremi" className="mb-24 scroll-mt-28">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[#ff6b00] font-bold text-xl md:text-2xl">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#dee2f0]">Sobre mí & Trayectoria</h2>
            <div className="h-px bg-white/10 flex-1 ml-4 block" />
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content: Timeline equivalent */}
            <div className="flex-1 space-y-10">
              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute w-3 h-3 bg-[#ff6b00] rounded-full -left-[6.5px] top-1 shadow-[0_0_10px_#ff6b00]" />
                <h3 className="text-xl font-bold text-[#dee2f0]">Fiscalización Electoral en Campo</h3>
                <p className="text-xs font-mono text-[#ffda54] uppercase tracking-wider mt-1 mb-3 font-bold">Abril 2026</p>
                <p className="text-[#e2bfb0]/80 text-base leading-relaxed">
                  Operaciones de campo para el aseguramiento y auditoría de procesos electorales, garantizando el cumplimiento normativo mediante metodologías estructuradas de verificación técnica y operativa in situ.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute w-3 h-3 bg-[#14d1ff] rounded-full -left-[6.5px] top-1 shadow-[0_0_10px_#14d1ff]" />
                <h3 className="text-xl font-bold text-[#dee2f0]">Liderazgo Académico: Ciclo Introductorio</h3>
                <p className="text-xs font-mono text-[#ffda54] uppercase tracking-wider mt-1 mb-3 font-bold">Marzo 2026</p>
                <p className="text-[#e2bfb0]/80 text-base leading-relaxed">
                  Planificación, estructuración y dictado del ciclo para estudiantes cachimbos. Colaboración directa con la plana docente universitaria en la elaboración de materiales didácticos, fusionando pedagogía con ciencias exactas.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/10">
                 <div className="absolute w-3 h-3 bg-[#1b2029] border border-white/30 rounded-full -left-[6.5px] top-1" />
                <h3 className="text-xl font-bold text-[#dee2f0]">Prácticas Preprofesionales</h3>
                <p className="text-xs font-mono text-white/50 uppercase tracking-wider mt-1 mb-3 font-bold">Mayo — Agosto 2025</p>
                <p className="text-[#e2bfb0]/80 text-base leading-relaxed">
                  Desarrollo técnico e implementación de soluciones informáticas y aplicación de matemáticas aplicadas en entornos organizacionales para la mejora continua de procesos.
                </p>
              </div>
            </div>

            {/* Sidebar: Formación Continua */}
            <aside className="lg:w-80 shrink-0 bg-[#1b2029] border border-white/10 rounded-2xl p-8 h-fit shadow-2xl backdrop-blur-sm lg:sticky lg:top-32">
              <h4 className="text-lg font-bold text-[#dee2f0] mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                 <Award className="w-5 h-5 text-[#ff6b00]" /> Certificaciones
              </h4>
              <ul className="space-y-4 font-mono text-sm text-[#dee2f0]/90 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#14d1ff] shrink-0">→</span>
                  <span>Congreso de Ingeniería INGEICA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#14d1ff] shrink-0">→</span>
                  <span>Certificaciones en IA Aplicada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#14d1ff] shrink-0">→</span>
                  <span>Talleres de Matemática Computacional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#14d1ff] shrink-0">→</span>
                  <span>Análisis en Centros de Datos</span>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                 <h4 className="text-sm font-bold text-white/50 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Stack Técnico
                </h4>
                 <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="bg-white/5 text-[#dee2f0] px-2 py-1 rounded border border-white/10 hover:border-[#14d1ff]/50 transition-colors">Python</span>
                    <span className="bg-white/5 text-[#dee2f0] px-2 py-1 rounded border border-white/10 hover:border-[#14d1ff]/50 transition-colors">SQL</span>
                    <span className="bg-white/5 text-[#dee2f0] px-2 py-1 rounded border border-white/10 hover:border-[#14d1ff]/50 transition-colors">TypeScript</span>
                    <span className="bg-white/5 text-[#dee2f0] px-2 py-1 rounded border border-white/10 hover:border-[#14d1ff]/50 transition-colors">C++</span>
                    <span className="bg-white/5 text-[#dee2f0] px-2 py-1 rounded border border-white/10 hover:border-[#14d1ff]/50 transition-colors">Google Apps Script</span>
                    <span className="bg-white/5 text-[#dee2f0] px-2 py-1 rounded border border-white/10 hover:border-[#14d1ff]/50 transition-colors">Excel</span>
                 </div>
              </div>
            </aside>
          </div>
        </section>

        {/* SKILLS CAROUSEL */}
        <div className="w-full overflow-hidden flex items-center bg-[#1b2029]/30 border-y border-white/5 py-8 mb-24 backdrop-blur-sm relative">
          <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#0f131d] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#0f131d] to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-marquee whitespace-nowrap w-max">
            <div className="flex items-center text-3xl md:text-5xl font-display font-black text-white/10 uppercase tracking-widest gap-8 px-4 md:px-8 shrink-0">
              <span className="hover:text-white/30 transition-colors">Python</span>
              <span className="text-[#ff6b00]/20">•</span>
              <span className="hover:text-white/30 transition-colors">SQL</span>
              <span className="text-[#14d1ff]/20">•</span>
              <span className="hover:text-white/30 transition-colors">TypeScript</span>
              <span className="text-[#ffda54]/20">•</span>
              <span className="hover:text-white/30 transition-colors">C++</span>
              <span className="text-[#e2bfb0]/20">•</span>
              <span className="hover:text-white/30 transition-colors">Google Apps Script</span>
              <span className="text-[#21a366]/20">•</span>
              <span className="hover:text-white/30 transition-colors">Excel</span>
              <span className="text-white/10">•</span>
            </div>
            <div className="flex items-center text-3xl md:text-5xl font-display font-black text-white/10 uppercase tracking-widest gap-8 px-4 md:px-8 shrink-0">
              <span className="hover:text-white/30 transition-colors">Python</span>
              <span className="text-[#ff6b00]/20">•</span>
              <span className="hover:text-white/30 transition-colors">SQL</span>
              <span className="text-[#14d1ff]/20">•</span>
              <span className="hover:text-white/30 transition-colors">TypeScript</span>
              <span className="text-[#ffda54]/20">•</span>
              <span className="hover:text-white/30 transition-colors">C++</span>
              <span className="text-[#e2bfb0]/20">•</span>
              <span className="hover:text-white/30 transition-colors">Google Apps Script</span>
              <span className="text-[#21a366]/20">•</span>
              <span className="hover:text-white/30 transition-colors">Excel</span>
              <span className="text-white/10">•</span>
            </div>
          </div>
        </div>

        {/* 3. PROYECTOS */}
        <section id="proyectos" className="mb-24 scroll-mt-28">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[#ff6b00] font-bold text-xl md:text-2xl">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#dee2f0]">Proyectos Destacados</h2>
            <div className="h-px bg-white/10 flex-1 ml-4 block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <article className="bg-[#1b2029] border border-white/10 p-8 flex flex-col rounded-2xl shadow-xl hover:border-[#ff6b00]/50 transition-colors group cursor-default relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff6b00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="inline-block bg-white/5 px-3 py-1 text-[10px] font-mono text-[#14d1ff] uppercase tracking-widest mb-4 w-fit font-bold border border-white/10 rounded">Análisis de Datos</div>
              <h3 className="text-2xl font-bold text-[#dee2f0] mb-4 group-hover:text-[#ff6b00] transition-colors">Conceptos Financieros</h3>
              <p className="text-[#e2bfb0]/80 flex-1 mb-6 text-sm">
                <span className="text-white/60 block mb-1">El Problema:</span> Falta de visibilidad sobre los indicadores financieros organizacionales.<br/><br/>
                <span className="text-white/60 block mb-1">La Solución:</span> Extracción, limpieza y modelado de datos usando pipelines robustos.<br/><br/>
                <span className="text-white/60 block mb-1">El Resultado:</span> Modelos predictivos y dashboards claros que facilitan la toma de decisiones.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-white/50 pt-4 border-t border-white/5">
                <span className="text-[#dee2f0]">Python</span> <span>|</span> <span className="text-[#dee2f0]">SQL</span> <span>|</span> <span className="text-[#dee2f0]">Pandas</span>
              </div>
            </article>

            {/* Card 2 */}
            <article className="bg-[#1b2029] border border-white/10 p-8 flex flex-col rounded-2xl shadow-xl hover:border-[#ff6b00]/50 transition-colors group cursor-default relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#14d1ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="inline-block bg-white/5 px-3 py-1 text-[10px] font-mono text-[#14d1ff] uppercase tracking-widest mb-4 w-fit font-bold border border-white/10 rounded">Ingeniería de Software</div>
              <h3 className="text-2xl font-bold text-[#dee2f0] mb-4 group-hover:text-[#14d1ff] transition-colors">Lógica de Programación</h3>
              <p className="text-[#e2bfb0]/80 flex-1 mb-6 text-sm">
                <span className="text-white/60 block mb-1">El Problema:</span> Necesidad de repositorios formales de algoritmos avanzados en la academia.<br/><br/>
                <span className="text-white/60 block mb-1">La Solución:</span> Estructuración de colecciones de algoritmos de alta complejidad.<br/><br/>
                <span className="text-white/60 block mb-1">El Resultado:</span> Bases de conocimiento colaborativas que demuestran dominio profundo.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-white/50 pt-4 border-t border-white/5">
                <span className="text-[#dee2f0]">Git</span> <span>|</span> <span className="text-[#dee2f0]">TypeScript</span> <span>|</span> <span className="text-[#dee2f0]">C++</span>
              </div>
            </article>

            {/* Card 3 */}
             <article className="bg-[#1b2029] border border-white/10 p-8 flex flex-col rounded-2xl shadow-xl hover:border-[#ff6b00]/50 transition-colors group cursor-default relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ffda54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="inline-block bg-white/5 px-3 py-1 text-[10px] font-mono text-[#14d1ff] uppercase tracking-widest mb-4 w-fit font-bold border border-white/10 rounded">Automatización</div>
              <h3 className="text-2xl font-bold text-[#dee2f0] mb-4 group-hover:text-[#ffda54] transition-colors">Control de Asistencia QR</h3>
              <p className="text-[#e2bfb0]/80 flex-1 mb-6 text-sm">
                <span className="text-white/60 block mb-1">El Problema:</span> Procesos manuales lentos en el registro de asistencia estudiantil.<br/><br/>
                <span className="text-white/60 block mb-1">La Solución:</span> Digitalización y agilización mediante identificadores dinámicos.<br/><br/>
                <span className="text-white/60 block mb-1">El Resultado:</span> Sistema autónomo de escaneo rápido y registro en tiempo real en la nube.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-white/50 pt-4 border-t border-white/5">
                <span className="text-[#dee2f0]">Códigos QR</span> <span>|</span> <span className="text-[#dee2f0]">Apps Script</span>
              </div>
            </article>

            {/* Card 4 */}
             <article className="bg-[#1b2029] border border-white/10 p-8 flex flex-col rounded-2xl shadow-xl hover:border-[#ff6b00]/50 transition-colors group cursor-default relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff6b00] to-[transparent] opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="inline-block bg-white/5 px-3 py-1 text-[10px] font-mono text-[#14d1ff] uppercase tracking-widest mb-4 w-fit font-bold border border-white/10 rounded">Productividad Ops</div>
              <h3 className="text-2xl font-bold text-[#dee2f0] mb-4 group-hover:text-[#ff6b00] transition-colors">Infraestructura en Zaps</h3>
              <p className="text-[#e2bfb0]/80 flex-1 mb-6 text-sm">
                <span className="text-white/60 block mb-1">El Problema:</span> Desconexión organizativa entre áreas multidisciplinarias.<br/><br/>
                <span className="text-white/60 block mb-1">La Solución:</span> Integración de APIs de terceros y flujos de trabajo sin código.<br/><br/>
                <span className="text-white/60 block mb-1">El Resultado:</span> Flujo 100% automatizado, donde registros activan notificaciones, tarjetas y alertas.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono font-bold text-white/50 pt-4 border-t border-white/5">
                <span className="text-[#dee2f0]">Zapier</span> <span>|</span> <span className="text-[#dee2f0]">Trello</span> <span>|</span> <span className="text-[#dee2f0]">Slack</span> <span>|</span> <span className="text-[#dee2f0]">Sheets</span>
              </div>
            </article>
          </div>
        </section>

        {/* 4. DEMOS EN VIVO */}
        <section id="demos" className="mb-24 scroll-mt-28">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[#ff6b00] font-bold text-xl md:text-2xl">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#dee2f0]">Demos en vivo</h2>
            <div className="h-px bg-white/10 flex-1 ml-4 block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Demo 1 (Active) */}
            <button 
              onClick={() => {
                if (onNavigate) {
                  onNavigate("calculator");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }} 
              className="text-left bg-[#1b2029]/80 border border-white/10 p-6 rounded-2xl hover:border-[#ff6b00]/50 transition-all group shadow-xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#ff6b00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl mb-4 group-hover:-translate-y-1 transition-transform relative z-10">🎓</div>
              <h3 className="text-xl font-bold text-[#dee2f0] mb-2 group-hover:text-[#ff6b00] transition-colors relative z-10">Calculadora Universitaria</h3>
              <p className="text-[#e2bfb0]/70 text-sm leading-relaxed mb-8 relative z-10">
                Calcula tu promedio final según la fórmula de 7 universidades del Perú y te dice cuánto necesitas para aprobar.
              </p>
              <div className="font-mono text-xs font-bold text-[#14d1ff] flex items-center gap-2 relative z-10">
                Abrir demo <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Demo 2 (Disabled) */}
            <div className="bg-[#1b2029]/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden">
               <div className="text-3xl mb-4 opacity-40 grayscale">🤖</div>
              <h3 className="text-xl font-bold text-white/50 mb-2">Asistente IA (WIP)</h3>
              <p className="text-white/30 text-sm leading-relaxed mb-8">
                Integración con modelos fundacionales para tutoría en educación superior.
              </p>
              <div className="font-mono text-xs text-white/20 uppercase tracking-widest font-bold">
                Próximamente...
              </div>
            </div>

            {/* Demo 3 (Disabled) */}
            <div className="bg-[#1b2029]/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden">
               <div className="text-3xl mb-4 opacity-40 grayscale">📊</div>
              <h3 className="text-xl font-bold text-white/50 mb-2">Visor Financiero</h3>
              <p className="text-white/30 text-sm leading-relaxed mb-8">
                Herramienta de análisis exploratorio montada en la web con datasets públicos.
              </p>
              <div className="font-mono text-xs text-white/20 uppercase tracking-widest font-bold">
                Próximamente...
              </div>
            </div>
          </div>
        </section>

        {/* 5. CONTACTO Y DESPEDIDA */}
        <section id="contacto" className="py-16 text-center flex flex-col items-center">
          <span className="font-mono text-[#ff6b00] font-bold text-xl mb-4">04.</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#dee2f0] mb-6 tracking-tight">Impulsemos tu <br className="hidden md:block"/> próximo proyecto</h2>
          <p className="text-lg text-[#e2bfb0]/80 mb-12 max-w-2xl">
            Ya sea optimizando datos complejos, generando automatizaciones eficientes o creando una identidad visual y programática profunda. Trabajemos juntos para materializar tu visión.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-20">
            <a 
              href="mailto:jesuscelisarias@gmail.com" 
              className="bg-[#ff6b00] hover:bg-[#e66000] text-white font-mono font-bold py-4 px-10 rounded-xl transition-all tracking-widest uppercase text-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] transform hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
              <span>Correo</span>
            </a>
            
            <a 
              href="https://wa.me/51971114393" 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold py-4 px-10 rounded-xl transition-all tracking-widest uppercase text-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.99 22.01h-.01c-1.63 0-3.23-.42-4.66-1.22l-5.32 1.39 1.42-5.18a9.96 9.96 0 0 1-1.44-5.01C1.98 6.51 6.47 2 12 2s10.02 4.51 10.02 10.01-4.49 10-10.03 10m-4.65-4.14a8.03 8.03 0 0 0 4.65 1.45c4.43 0 8.04-3.61 8.04-8.04A8.05 8.05 0 0 0 12 3.25c-4.43 0-8.04 3.61-8.04 8.04 0 1.54.44 3.01 1.25 4.3l-.91 3.32 3.41-.89zM16.5 14.5c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.48-.4-.41-.54-.42l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.45.57.21 1.02.33 1.37.42.57.18 1.09.15 1.5.09.46-.07 1.43-.58 1.63-1.15.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/></svg>
              <span>WhatsApp</span>
            </a>

            <a 
              href="https://www.instagram.com/chenteia" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white/5 border border-white/10 hover:border-white/30 text-white font-mono font-bold py-4 px-10 rounded-xl transition-all uppercase text-sm tracking-widest backdrop-blur-sm flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#E1306C]"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.836-7.836a1.2 1.2 0 1 0-2.4 0 1.2 1.2 0 0 0 2.4 0z"/></svg>
              <span>Instagram</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
