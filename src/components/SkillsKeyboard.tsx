import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  siPython, siGooglesheets, siGoogleappsscript, siGoogleforms, siJavascript, siTypescript, siReact,
  siHtml5, siCss, siTailwindcss, siVite, siGit, siGithub, siVercel, siNodedotjs, siJupyter, siPandas,
  siNumpy, siCplusplus, siThreedotjs, siClaude, siNotion, siZapier, siTrello, siObsidian, siLatex, siGooglegemini,
  type SimpleIcon,
} from "simple-icons";
import { Database, FileSpreadsheet, Wrench, ShieldCheck, BarChart3, BrainCircuit } from "lucide-react";

// Teclado isométrico de habilidades: cada tecla es una herramienta que Vicente ha usado de verdad.
// Se presiona con clic/toque o con la letra inicial en el teclado físico.

type Skill = { name: string; used: string; color: string; icon: SimpleIcon | ReactNode };

const SKILLS: Skill[] = [
  { name: "Python", color: "#3776AB", icon: siPython, used: "Tesis de deserción universitaria y cursos de Python y Machine Learning (CTIC-UNI)." },
  { name: "SQL", color: "#336791", icon: <Database />, used: "Revisión y control de bases de datos en el Área de Informática del hospital." },
  { name: "Excel", color: "#217346", icon: <FileSpreadsheet />, used: "Nivel intermedio: listados de repuestos, reportes y cuadres de caja." },
  { name: "Power BI", color: "#E8B90C", icon: <BarChart3 />, used: "Dashboards de KPI en el curso Claude: IA Aplicada." },
  { name: "Google Sheets", color: "#34A853", icon: siGooglesheets, used: "Bases de clientes y registro de ventas con totales automáticos." },
  { name: "Apps Script", color: "#4285F4", icon: siGoogleappsscript, used: "Formulario de ventas con cuadre de caja y control de asistencia con QR." },
  { name: "Google Forms", color: "#7248B9", icon: siGoogleforms, used: "Captura de ventas y asistencia conectada a hojas de cálculo." },
  { name: "Machine Learning", color: "#C2410C", icon: <BrainCircuit />, used: "Modelo Random Forest para predecir el riesgo de deserción (tesis)." },
  { name: "Pandas", color: "#150458", icon: siPandas, used: "Limpieza y análisis de datos de la ENAHO para la tesis." },
  { name: "NumPy", color: "#4DABCF", icon: siNumpy, used: "Cálculo numérico en mis notebooks de análisis de datos." },
  { name: "Jupyter", color: "#F37626", icon: siJupyter, used: "Mi entorno de análisis y práctica de Python." },
  { name: "JavaScript", color: "#F7DF1E", icon: siJavascript, used: "Lógica de mis webs y automatizaciones en Apps Script." },
  { name: "TypeScript", color: "#3178C6", icon: siTypescript, used: "Este portafolio está escrito en TypeScript." },
  { name: "React", color: "#149ECA", icon: siReact, used: "Interfaz de este portafolio y de la calculadora universitaria." },
  { name: "HTML", color: "#E34F26", icon: siHtml5, used: "Base de todas las webs que hago con Chente Solutions." },
  { name: "CSS", color: "#663399", icon: siCss, used: "Diseño y animaciones, como la intro de este portafolio." },
  { name: "Tailwind", color: "#06B6D4", icon: siTailwindcss, used: "Estilos de este portafolio." },
  { name: "Vite", color: "#9135FF", icon: siVite, used: "Compilación rápida de mis proyectos web." },
  { name: "Node.js", color: "#5FA04E", icon: siNodedotjs, used: "Herramientas de desarrollo y paquetes npm." },
  { name: "Three.js", color: "#1d2433", icon: siThreedotjs, used: "Anatomy Explorer: visor web de órganos en 3D." },
  { name: "C++", color: "#00599C", icon: siCplusplus, used: "Fundamentos de programación en la universidad." },
  { name: "Git", color: "#F03C2E", icon: siGit, used: "Control de versiones de todos mis proyectos." },
  { name: "GitHub", color: "#24292F", icon: siGithub, used: "Mis repositorios públicos, como LinkedIn Optimizer." },
  { name: "Vercel", color: "#111111", icon: siVercel, used: "Despliegue de este portafolio y de mis webs." },
  { name: "Claude", color: "#D97757", icon: siClaude, used: "Curso Claude: IA Aplicada aprobado y skills propias publicadas." },
  { name: "Gemini", color: "#8E75B2", icon: siGooglegemini, used: "Generación de imágenes y video para mis proyectos." },
  { name: "Notion", color: "#2a2a2a", icon: siNotion, used: "Organización de mi plan de estudio." },
  { name: "Obsidian", color: "#7C3AED", icon: siObsidian, used: "Bóveda de notas de mi tesis." },
  { name: "LaTeX", color: "#008080", icon: siLatex, used: "Mi CV en LaTeX (moderncv)." },
  { name: "Zapier", color: "#FF4F00", icon: siZapier, used: "Automatizaciones entre Trello, Slack y hojas de cálculo." },
  { name: "Trello", color: "#0052CC", icon: siTrello, used: "Tableros conectados a flujos de Zapier." },
  { name: "ISO 27001", color: "#0F766E", icon: <ShieldCheck />, used: "Fundamentos de seguridad de la información (CTIC-UNI)." },
  { name: "Soporte TI", color: "#475569", icon: <Wrench />, used: "Mantenimiento y revisión de equipos de cómputo en el hospital." },
];

// Ilumina u oscurece un color hex (amt negativo = más oscuro)
const shade = (hex: string, amt: number) => {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + (amt < 0 ? c * amt : (255 - c) * amt))));
  return `rgb(${f(n >> 16)}, ${f((n >> 8) & 255)}, ${f(n & 255)})`;
};
const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 > 0.62;
};

const Icon = ({ icon }: { icon: Skill["icon"] }) =>
  icon && typeof icon === "object" && "path" in (icon as SimpleIcon) ? (
    <svg viewBox="0 0 24 24" className="w-[55%] h-[55%]" fill="currentColor" aria-hidden="true">
      <path d={(icon as SimpleIcon).path} />
    </svg>
  ) : (
    <span className="w-[55%] h-[55%] [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">{icon as ReactNode}</span>
  );

export default function SkillsKeyboard() {
  const [active, setActive] = useState(0);
  const [pressed, setPressed] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const press = (i: number) => {
    setActive(i);
    setPressed(i);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPressed(null), 180);
  };

  // Teclado físico: una letra presiona la siguiente tecla que empieza con ella (solo con la sección visible)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.closest("input, textarea")) return;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const k = e.key.toLowerCase();
      if (k.length !== 1) return;
      const order = SKILLS.map((_, i) => (active + 1 + i) % SKILLS.length);
      const hit = order.find((i) => SKILLS[i].name.toLowerCase().startsWith(k));
      if (hit !== undefined) press(hit);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const s = SKILLS[active];

  return (
    <div ref={sectionRef} className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
      {/* Panel de la tecla elegida */}
      <div className="w-full lg:w-72 shrink-0 order-1 lg:order-none" aria-live="polite">
        <p className="text-brand-muted/70 text-sm mb-4">
          Toca una tecla, o presiona su letra inicial en tu teclado.
        </p>
        <div
          className="rounded-2xl border border-white/10 p-5 bg-gradient-to-b from-brand-surface to-brand-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_48px_-24px_rgba(0,0,0,0.8)]"
          style={{ borderColor: `${s.color}66` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-10 h-10 rounded-lg grid place-items-center shrink-0"
              style={{ background: s.color, color: isLight(s.color) ? "#111" : "#fff" }}
            >
              <Icon icon={s.icon} />
            </span>
            <h3 className="font-display text-xl font-bold text-brand-text">{s.name}</h3>
          </div>
          <p className="text-brand-muted/85 text-sm leading-relaxed">{s.used}</p>
        </div>
      </div>

      {/* Teclado isométrico */}
      <div className="relative w-full flex justify-center py-4 sm:py-6 overflow-x-clip">
        <div
          role="group"
          aria-label="Teclado de habilidades"
          className="grid grid-cols-6 gap-1.5 sm:gap-3 [transform:rotateX(52deg)_rotateZ(-38deg)] [transform-style:preserve-3d] p-3 sm:p-4 rounded-2xl bg-[#0b0e14] shadow-[10px_14px_0_#05070b,0_50px_80px_-20px_rgba(0,0,0,0.9)] -my-10 sm:-my-14"
        >
          {SKILLS.map((k, i) => {
            const down = pressed === i;
            const depth = down ? 2 : 7;
            const side = shade(k.color, -0.45);
            const shadow = Array.from({ length: depth }, (_, d) => `${d + 1}px ${d + 1}px 0 ${side}`).join(", ");
            return (
              <button
                key={k.name}
                type="button"
                onClick={() => press(i)}
                onFocus={() => setActive(i)}
                aria-label={k.name}
                aria-pressed={active === i}
                className="relative w-9 h-9 sm:w-14 sm:h-14 rounded-[9px] sm:rounded-[10px] grid place-items-center transition-[transform,box-shadow] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{
                  background: `linear-gradient(145deg, ${shade(k.color, 0.18)}, ${k.color} 55%, ${shade(k.color, -0.12)})`,
                  color: isLight(k.color) ? "#111" : "#fff",
                  boxShadow: `${shadow}, inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 3px rgba(0,0,0,0.25)`,
                  transform: down ? "translate(5px, 5px)" : active === i ? "translate(2px, 2px)" : "none",
                }}
              >
                <Icon icon={k.icon} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
