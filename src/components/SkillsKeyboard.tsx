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
  { name: "Python", color: "#2f6fde", icon: siPython, used: "Tesis de deserción universitaria y cursos de Python y Machine Learning (CTIC-UNI)." },
  { name: "SQL", color: "#38bdf8", icon: <Database />, used: "Revisión y control de bases de datos en el Área de Informática del hospital." },
  { name: "Excel", color: "#22a565", icon: <FileSpreadsheet />, used: "Nivel intermedio: listados de repuestos, reportes y cuadres de caja." },
  { name: "Power BI", color: "#f5c518", icon: <BarChart3 />, used: "Dashboards de KPI en el curso Claude: IA Aplicada." },
  { name: "Google Sheets", color: "#22a565", icon: siGooglesheets, used: "Bases de clientes y registro de ventas con totales automáticos." },
  { name: "Apps Script", color: "#2f6fde", icon: siGoogleappsscript, used: "Formulario de ventas con cuadre de caja y control de asistencia con QR." },
  { name: "Google Forms", color: "#8b5cf6", icon: siGoogleforms, used: "Captura de ventas y asistencia conectada a hojas de cálculo." },
  { name: "Machine Learning", color: "#ff7a1a", icon: <BrainCircuit />, used: "Modelo Random Forest para predecir el riesgo de deserción (tesis)." },
  { name: "Pandas", color: "#8b5cf6", icon: siPandas, used: "Limpieza y análisis de datos de la ENAHO para la tesis." },
  { name: "NumPy", color: "#38bdf8", icon: siNumpy, used: "Cálculo numérico en mis notebooks de análisis de datos." },
  { name: "Jupyter", color: "#ff7a1a", icon: siJupyter, used: "Mi entorno de análisis y práctica de Python." },
  { name: "JavaScript", color: "#f5c518", icon: siJavascript, used: "Lógica de mis webs y automatizaciones en Apps Script." },
  { name: "TypeScript", color: "#2f6fde", icon: siTypescript, used: "Este portafolio está escrito en TypeScript." },
  { name: "React", color: "#38bdf8", icon: siReact, used: "Interfaz de este portafolio y de la calculadora universitaria." },
  { name: "HTML", color: "#e5484d", icon: siHtml5, used: "Base de todas las webs que hago con Chente Solutions." },
  { name: "CSS", color: "#8b5cf6", icon: siCss, used: "Diseño y animaciones, como la intro de este portafolio." },
  { name: "Tailwind", color: "#14b8a6", icon: siTailwindcss, used: "Estilos de este portafolio." },
  { name: "Vite", color: "#8b5cf6", icon: siVite, used: "Compilación rápida de mis proyectos web." },
  { name: "Node.js", color: "#22a565", icon: siNodedotjs, used: "Herramientas de desarrollo y paquetes npm." },
  { name: "Three.js", color: "#1f2128", icon: siThreedotjs, used: "Anatomy Explorer: visor web de órganos en 3D." },
  { name: "C++", color: "#2f6fde", icon: siCplusplus, used: "Fundamentos de programación en la universidad." },
  { name: "Git", color: "#e5484d", icon: siGit, used: "Control de versiones de todos mis proyectos." },
  { name: "GitHub", color: "#1f2128", icon: siGithub, used: "Mis repositorios públicos, como LinkedIn Optimizer." },
  { name: "Vercel", color: "#1f2128", icon: siVercel, used: "Despliegue de este portafolio y de mis webs." },
  { name: "Claude", color: "#ff7a1a", icon: siClaude, used: "Curso Claude: IA Aplicada aprobado y skills propias publicadas." },
  { name: "Gemini", color: "#8b5cf6", icon: siGooglegemini, used: "Generación de imágenes y video para mis proyectos." },
  { name: "Notion", color: "#1f2128", icon: siNotion, used: "Organización de mi plan de estudio." },
  { name: "Obsidian", color: "#8b5cf6", icon: siObsidian, used: "Bóveda de notas de mi tesis." },
  { name: "LaTeX", color: "#14b8a6", icon: siLatex, used: "Mi CV en LaTeX (moderncv)." },
  { name: "Zapier", color: "#ff7a1a", icon: siZapier, used: "Automatizaciones entre Trello, Slack y hojas de cálculo." },
  { name: "Trello", color: "#2f6fde", icon: siTrello, used: "Tableros conectados a flujos de Zapier." },
  { name: "ISO 27001", color: "#14b8a6", icon: <ShieldCheck />, used: "Fundamentos de seguridad de la información (CTIC-UNI)." },
  { name: "Soporte TI", color: "#38bdf8", icon: <Wrench />, used: "Mantenimiento y revisión de equipos de cómputo en el hospital." },
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

      {/* Teclado 3D real (X, Y, Z): keycaps con caras laterales inclinadas sobre una bandeja negra con grosor */}
      <div className="relative w-full flex justify-center py-10 sm:py-14 overflow-x-clip">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.07),transparent_60%)]" />
        <div className="translate-x-3 sm:translate-x-0 [--k:31px] sm:[--k:54px]">
          <div
            role="group"
            aria-label="Teclado de habilidades"
            className="kb3d-base relative rounded-[20px] p-3 sm:p-4 -my-12 sm:-my-16"
          >
            {/* grosor de la base: cara frontal y lateral */}
            <span aria-hidden="true" className="kb3d-edge-front" />
            <span aria-hidden="true" className="kb3d-edge-side" />
            {/* bandeja hundida con borde */}
            <div className="kb3d-tray rounded-[14px] p-2.5 sm:p-3.5 flex flex-col gap-2 sm:gap-3">
              {Array.from({ length: Math.ceil(SKILLS.length / 6) }, (_, row) => (
                <div key={row} className="kb3d-row flex gap-2 sm:gap-3" style={{ marginLeft: `calc(var(--k) * ${[0, 0.18, 0.36, 0.1, 0.28, 0.46][row % 6]})` }}>
                  {SKILLS.slice(row * 6, row * 6 + 6).map((k, j) => {
                    const i = row * 6 + j;
                    const down = pressed === i;
                    const light = isLight(k.color);
                    return (
                      <button
                        key={k.name}
                        type="button"
                        onClick={() => press(i)}
                        onFocus={() => setActive(i)}
                        aria-label={k.name}
                        aria-pressed={active === i}
                        className="kb3d-key focus-visible:outline-none group"
                        style={{
                          transform: down ? "translateZ(calc(var(--k) * -0.16))" : active === i ? "translateZ(calc(var(--k) * -0.05))" : "translateZ(1px)",
                        }}
                      >
                        {/* 4 caras laterales inclinadas, cada una con su luz */}
                        {[0, 1, 2, 3].map((side) => (
                          <span key={side} aria-hidden="true" className="kb3d-rot" style={{ transform: `rotateZ(${side * 90}deg)` }}>
                            <span
                              className="kb3d-side"
                              style={{ background: `linear-gradient(to bottom, ${shade(k.color, [-0.18, -0.34, 0.06, -0.08][side])}, ${shade(k.color, [-0.38, -0.52, -0.12, -0.28][side])})` }}
                            />
                          </span>
                        ))}
                        {/* cara superior cóncava, elevada en Z */}
                        <span
                          className="kb3d-top grid place-items-center overflow-hidden group-focus-visible:ring-2 group-focus-visible:ring-white"
                          style={{
                            background: `radial-gradient(ellipse 75% 65% at 50% 55%, ${shade(k.color, -0.08)} 0%, ${k.color} 60%, ${shade(k.color, 0.2)} 100%)`,
                            color: light ? "#141414" : "#fff",
                          }}
                        >
                          <span aria-hidden="true" className="absolute -top-1/2 -left-1/4 w-[120%] h-full rotate-[-20deg] bg-gradient-to-b from-white/30 to-transparent" />
                          <span className="relative w-full h-full grid place-items-center">
                            <Icon icon={k.icon} />
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
