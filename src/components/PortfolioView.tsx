import { useState, useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Award, Terminal, ChevronRight, Mail, Database, FileSpreadsheet, Wrench, Download, ArrowUpRight } from "lucide-react";
import type { Navigate } from "../App";
import { PythonIcon, ClaudeIcon, PowerBIIcon, WhatsAppIcon, InstagramIcon } from "./icons";

const WHATSAPP_URL = "https://wa.me/51971114393";

// Tags flotando en la órbita alrededor del avatar: perfil completo (datos, soporte, ofimática, IA)
const FLOATING_TAGS: { name: string; icon: ReactNode }[] = [
  { name: "Python", icon: <PythonIcon /> },
  { name: "SQL", icon: <Database size={20} className="text-[#366994]" /> },
  { name: "Excel", icon: <FileSpreadsheet size={20} className="text-[#21a366]" /> },
  { name: "Power BI", icon: <PowerBIIcon /> },
  { name: "Soporte TI", icon: <Wrench size={20} className="text-brand-cyan" /> },
  { name: "Claude", icon: <ClaudeIcon /> },
];

// Una sola lista alimenta el "Stack Técnico" y el carrusel
const SKILLS = [
  { name: "Python", dot: "text-brand-orange/20" },
  { name: "SQL", dot: "text-brand-cyan/20" },
  { name: "Excel", dot: "text-[#21a366]/20" },
  { name: "Power BI", dot: "text-brand-yellow/20" },
  { name: "Soporte técnico", dot: "text-brand-cyan/20" },
  { name: "ISO 27001", dot: "text-brand-orange/20" },
  { name: "TypeScript", dot: "text-brand-yellow/20" },
  { name: "Google Apps Script", dot: "text-[#21a366]/20" },
  { name: "C++", dot: "text-brand-muted/20" },
  { name: "Git", dot: "text-white/10" },
];

const TIMELINE = [
  {
    title: "Fiscalizador de Local de Votación – Responsable · JNE",
    date: "Octubre 2026 · JEE Cañete",
    dot: "bg-brand-orange shadow-[0_0_10px_var(--color-brand-orange)]",
    dateClass: "text-brand-yellow",
    text: "Fiscalización de la jornada de las Elecciones Regionales y Municipales 2026 en el distrito de Calango, en dupla con otro fiscalizador, y redacción del informe de fiscalización para el Jurado Electoral Especial.",
  },
  {
    title: "Fiscalizador de Local de Votación Urbano · JNE",
    date: "Abril — Junio 2026 · JEE Ica",
    dot: "bg-brand-orange shadow-[0_0_10px_var(--color-brand-orange)]",
    dateClass: "text-brand-yellow",
    text: "Fiscalización de locales de votación en Ica durante las Elecciones Generales 2026 y la Segunda Elección Presidencial, siguiendo los protocolos del JNE. Servicio acreditado con constancia del JEE de Ica.",
  },
  {
    title: "Liderazgo Académico: Ciclo Introductorio",
    date: "Marzo 2026",
    dot: "bg-brand-cyan shadow-[0_0_10px_var(--color-brand-cyan)]",
    dateClass: "text-brand-yellow",
    text: "Planifiqué y dicté el ciclo introductorio para estudiantes de primer año, y elaboré materiales didácticos junto con los docentes de la universidad.",
  },
  {
    title: "Prácticas Preprofesionales · Área de Informática",
    date: "Mayo — Agosto 2025 · Hospital Augusto Hernández Mendoza, Ica",
    dot: "bg-brand-surface border border-white/30",
    dateClass: "text-white/50",
    text: "Revisión y control de las bases de datos del hospital, y mantenimiento y revisión de los equipos de cómputo de sus áreas.",
  },
  {
    title: "Egresado de Ciencias de la Informática y Matemática",
    date: "2025 · UNICA",
    dot: "bg-brand-surface border border-white/30",
    dateClass: "text-white/50",
    text: "Escuela de Matemática e Informática de la Universidad Nacional San Luis Gonzaga de Ica, con orientación en análisis de datos. Tesis en curso sobre predicción de deserción universitaria con Machine Learning.",
  },
];

const CERTIFICATIONS = [
  "Fundamentos de ISO 27001 · CTIC-UNI",
  "Machine Learning con Python · CTIC-UNI",
  "Python Básico e Intermedio · CTIC-UNI",
  "Claude: IA Aplicada · WE Educación Ejecutiva (30 h)",
  "Congreso de Ingeniería INGEICA",
  "Talleres de Matemática Computacional",
  "Análisis en Centros de Datos",
];

const PROJECTS = [
  {
    tag: "Machine Learning · Tesis",
    title: "Predicción de Deserción Universitaria",
    accent: { bar: "from-brand-orange", title: "group-hover:text-brand-orange" },
    problem: "Identificar a tiempo a los estudiantes en riesgo de abandonar la universidad en la región Ica.",
    solution: "Modelo Random Forest entrenado con datos socioeconómicos de la Encuesta Nacional de Hogares (ENAHO).",
    result: "Proyecto de tesis aprobado en la evaluación de originalidad de la Facultad de Ciencias (UNICA).",
    stack: ["Python", "Pandas", "Random Forest"],
  },
  {
    tag: "Automatización",
    title: "Registro de Ventas y Cuadre de Caja",
    accent: { bar: "from-brand-cyan", title: "group-hover:text-brand-cyan" },
    problem: "Cuadre de caja manual y lento al cierre de cada turno.",
    solution: "Formulario propio que guarda cada venta en una hoja de cálculo con su forma de pago.",
    result: "Totales por efectivo, Yape y crédito listos al instante para cerrar caja.",
    stack: ["Google Forms", "Apps Script", "Sheets"],
  },
  {
    tag: "Desarrollo Web",
    title: "Webs para Negocios · Chente Solutions",
    accent: { bar: "from-brand-yellow", title: "group-hover:text-brand-yellow" },
    problem: "Pequeños negocios de Mala y Cañete sin presencia digital.",
    solution: "Diseño, desarrollo y despliegue de sitios web rápidos y adaptados a celular.",
    result: "Este portafolio y una calculadora universitaria publicados y en uso.",
    stack: ["React", "TypeScript", "Vercel"],
  },
  {
    tag: "Automatización",
    title: "Control de Asistencia QR",
    accent: { bar: "from-brand-orange", title: "group-hover:text-brand-orange" },
    problem: "Procesos manuales lentos en el registro de asistencia estudiantil.",
    solution: "Digitalización y agilización mediante identificadores dinámicos.",
    result: "Sistema autónomo de escaneo rápido y registro en tiempo real en la nube.",
    stack: ["Códigos QR", "Apps Script"],
  },
  {
    tag: "Documentación Técnica",
    title: "Mantenimiento de Triciclos · Club Playa Bonita",
    accent: { bar: "from-brand-cyan", title: "group-hover:text-brand-cyan" },
    problem: "La asociación necesitaba sustentar el mantenimiento de su flota de triciclos.",
    solution: "Informe técnico en Word y listado de repuestos en Excel, con versiones PDF.",
    result: "Documentación formal entregada en nombre del negocio familiar de bicicletas.",
    stack: ["Word", "Excel", "PDF"],
  },
  {
    tag: "Productividad Ops",
    title: "Infraestructura en Zaps",
    accent: { bar: "from-brand-yellow", title: "group-hover:text-brand-yellow" },
    problem: "Desconexión organizativa entre áreas multidisciplinarias.",
    solution: "Integración de APIs de terceros y flujos de trabajo sin código.",
    result: "Flujo 100% automatizado, donde registros activan notificaciones, tarjetas y alertas.",
    stack: ["Zapier", "Trello", "Slack", "Sheets"],
  },
];

const EXTRA_DEMOS = [
  {
    emoji: "🔍",
    title: "LinkedIn Optimizer",
    text: "Skill de código abierto que audita un perfil de LinkedIn con tres revisores (headhunter, copywriter y estratega) y propone mejoras concretas.",
    href: "https://github.com/ChenteIA/linkedin-optimizer-skill",
    cta: "Ver en GitHub",
  },
];

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplayedText(text);
      setIsTyping(false);
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
  }, [text, delay, reduceMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayedText}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[0.4em] h-[1em] bg-current align-middle ml-1"
          />
        )}
        {/* El resto del texto, invisible, reserva el espacio final y evita saltos de layout */}
        <span className="invisible">{text.slice(displayedText.length)}</span>
      </span>
    </span>
  );
};

const SectionHeader = ({ n, title }: { n: string; title: string }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="font-mono text-brand-orange font-bold text-xl md:text-2xl">{n}.</span>
    <h2 className="text-3xl md:text-4xl font-bold text-brand-text">{title}</h2>
    <div className="h-px bg-white/10 flex-1 ml-4 block" />
  </div>
);

interface PortfolioViewProps {
  onNavigate: Navigate;
}

export default function PortfolioView({ onNavigate }: PortfolioViewProps) {
  return (
    <div className="w-full animate-fade-in relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-28 pb-32">

        {/* 1. HERO SECTION */}
        <header className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0 md:gap-x-12 items-center">

          <div className="col-span-1 md:col-span-7 flex flex-col items-start gap-4">
            <span className="font-mono text-brand-orange font-semibold uppercase tracking-[0.2em] text-xs">
              Portafolio Profesional
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-brand-text tracking-tight leading-tight md:leading-tight mb-2">
              <TypewriterText text="Vicente Celis Arias" delay={200} />
            </h1>
            <div className="font-mono text-xl md:text-2xl text-brand-cyan font-semibold">
              <TypewriterText text="> Matemático e Informático" delay={1300} />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="text-lg md:text-xl max-w-2xl text-brand-muted/90 leading-relaxed mt-4"
            >
              Egresado de la Universidad Nacional San Luis Gonzaga de Ica. Trabajo con datos, bases de datos y soporte informático, automatizo procesos y desarrollo páginas web. Tengo experiencia en el Área de Informática de un hospital público y en el sector público como fiscalizador del JNE.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="flex flex-wrap items-center gap-3 mt-6"
            >
              <a
                href="#contacto"
                className="bg-brand-orange hover:bg-[#ff8a33] text-brand-bg font-mono font-bold py-3 px-5 sm:px-8 rounded-xl transition-all uppercase text-sm tracking-widest shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_25px_rgba(255,107,0,0.5)] transform hover:-translate-y-0.5"
              >
                Hablemos
              </a>
              <a
                href="/CV_Vicente_Celis_Arias.pdf"
                download
                className="bg-white/5 border border-white/10 hover:border-brand-cyan/50 text-white font-mono font-bold py-3 px-4 sm:px-6 rounded-xl transition-all uppercase text-sm tracking-widest backdrop-blur-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" aria-hidden="true" /> CV
              </a>
              <a
                href="https://github.com/ChenteIA"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 border border-white/10 hover:border-white/30 text-white font-mono font-bold py-3 px-4 sm:px-6 rounded-xl transition-all uppercase text-sm tracking-widest backdrop-blur-sm"
              >
                GitHub
              </a>
            </motion.div>
          </div>

          <div className="col-span-1 md:col-span-5 relative flex justify-center items-center h-[400px]">
            {/* Subtle neon glow circle behind the character avatar */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/15 to-brand-cyan/5 rounded-full blur-[80px] z-0" />

            {/* Orbital Ring System: rotación en CSS (compositor), sin JS por frame */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] z-0 pointer-events-none select-none text-white">
              <div className="absolute inset-0 rounded-full border border-white/10 border-dashed opacity-60 shadow-[0_0_30px_rgba(255,255,255,0.02)_inset]" />

              <div className="absolute inset-0 animate-orbit">
                {FLOATING_TAGS.map((tag, i) => {
                  const angle = (i / FLOATING_TAGS.length) * 360;
                  return (
                    <div
                      key={tag.name}
                      className="absolute inset-0 flex items-center"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div className="absolute right-0 translate-x-1/2 flex items-center justify-center">
                        <div className="animate-orbit-reverse">
                          <div
                            className="border border-brand-orange/40 px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-2 md:gap-2.5 text-white font-display text-[10px] md:text-sm font-semibold shadow-[0_0_15px_rgba(255,107,0,0.2)] whitespace-nowrap bg-slate-950/80"
                            style={{ transform: `rotate(-${angle}deg)` }}
                          >
                            {tag.icon}
                            <span>{tag.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Avatar (elemento LCP: prioridad alta y visible desde el primer frame) */}
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              alt="Avatar de Vicente Celis Arias"
              src="/avatar.webp"
              width={285}
              height={512}
              fetchPriority="high"
              decoding="async"
              className="object-contain w-auto h-[90%] md:h-full z-10 relative drop-shadow-[0_0_35px_rgba(255,107,0,0.35)] hover:scale-103 transition-transform duration-500"
            />
          </div>
        </header>

        {/* 2. SOBRE MÍ */}
        <section id="sobremi" className="mb-24 scroll-mt-28">
          <SectionHeader n="01" title="Sobre mí & Trayectoria" />

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content: Timeline equivalent */}
            <div className="flex-1 space-y-10">
              {TIMELINE.map((item) => (
                <div key={item.title} className="relative pl-6 border-l border-white/10">
                  <div className={`absolute w-3 h-3 rounded-full -left-[6.5px] top-1 ${item.dot}`} />
                  <h3 className="text-xl font-bold text-brand-text">{item.title}</h3>
                  <p className={`text-xs font-mono uppercase tracking-wider mt-1 mb-3 font-bold ${item.dateClass}`}>{item.date}</p>
                  <p className="text-brand-muted/80 text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Sidebar: Formación Continua */}
            <aside className="lg:w-80 shrink-0 bg-brand-surface border border-white/10 rounded-2xl p-8 h-fit shadow-2xl backdrop-blur-sm lg:sticky lg:top-32">
              <h4 className="text-lg font-bold text-brand-text mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                 <Award className="w-5 h-5 text-brand-orange" /> Certificaciones
              </h4>
              <ul className="space-y-4 font-mono text-sm text-brand-text/90 leading-relaxed">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert} className="flex items-start gap-2">
                    <span className="text-brand-cyan shrink-0" aria-hidden="true">→</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-white/50 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Stack Técnico
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {SKILLS.map((skill) => (
                    <span key={skill.name} className="bg-white/5 text-brand-text px-2 py-1 rounded border border-white/10 hover:border-brand-cyan/50 transition-colors">{skill.name}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* SKILLS CAROUSEL (decorativo: repite el Stack Técnico) */}
        <div aria-hidden="true" className="w-full overflow-hidden flex items-center bg-brand-surface/30 border-y border-white/5 py-8 mb-24 backdrop-blur-sm relative">
          <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee whitespace-nowrap w-max">
            {/* Dos copias idénticas para que el loop sea continuo */}
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center text-3xl md:text-5xl font-display font-black text-white/10 uppercase tracking-widest gap-8 px-4 md:px-8 shrink-0">
                {SKILLS.map((skill) => (
                  <span key={skill.name} className="contents">
                    <span className="hover:text-white/30 transition-colors">{skill.name}</span>
                    <span className={skill.dot}>•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 3. PROYECTOS */}
        <section id="proyectos" className="mb-24 scroll-mt-28">
          <SectionHeader n="02" title="Proyectos Destacados" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <article key={project.title} className="bg-brand-surface border border-white/10 p-8 flex flex-col rounded-2xl shadow-xl hover:border-brand-orange/50 transition-colors group cursor-default relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${project.accent.bar} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="inline-block bg-white/5 px-3 py-1 text-[10px] font-mono text-brand-cyan uppercase tracking-widest mb-4 w-fit font-bold border border-white/10 rounded">{project.tag}</div>
                <h3 className={`text-2xl font-bold text-brand-text mb-4 transition-colors ${project.accent.title}`}>{project.title}</h3>
                <dl className="text-brand-muted/80 flex-1 mb-6 text-sm space-y-4">
                  {([["El Problema", project.problem], ["La Solución", project.solution], ["El Resultado", project.result]] as const).map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-white/60 mb-1">{label}:</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-white/50 pt-4 border-t border-white/5">
                  {project.stack.map((tech, i) => (
                    <span key={tech} className="contents">
                      {i > 0 && <span aria-hidden="true">|</span>}
                      <span className="text-brand-text">{tech}</span>
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. DEMOS EN VIVO */}
        <section id="demos" className="mb-24 scroll-mt-28">
          <SectionHeader n="03" title="Demos en vivo" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onNavigate("calculator")}
              className="text-left bg-brand-surface/80 border border-white/10 p-6 rounded-2xl hover:border-brand-orange/50 transition-all group shadow-xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl mb-4 group-hover:-translate-y-1 transition-transform relative z-10" aria-hidden="true">🎓</div>
              <h3 className="text-xl font-bold text-brand-text mb-2 group-hover:text-brand-orange transition-colors relative z-10">Calculadora Universitaria</h3>
              <p className="text-brand-muted/70 text-sm leading-relaxed mb-8 relative z-10">
                Calcula tu promedio final según la fórmula de 7 universidades del Perú y te dice cuánto necesitas para aprobar.
              </p>
              <div className="font-mono text-xs font-bold text-brand-cyan flex items-center gap-2 relative z-10">
                Abrir demo <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {EXTRA_DEMOS.map((demo) => (
              <a
                key={demo.title}
                href={demo.href}
                target="_blank"
                rel="noreferrer"
                className="text-left bg-brand-surface/80 border border-white/10 p-6 rounded-2xl hover:border-brand-cyan/50 transition-all group shadow-xl backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl mb-4 group-hover:-translate-y-1 transition-transform relative z-10" aria-hidden="true">{demo.emoji}</div>
                <h3 className="text-xl font-bold text-brand-text mb-2 group-hover:text-brand-cyan transition-colors relative z-10">{demo.title}</h3>
                <p className="text-brand-muted/70 text-sm leading-relaxed mb-8 relative z-10">{demo.text}</p>
                <div className="font-mono text-xs font-bold text-brand-cyan flex items-center gap-2 relative z-10">
                  {demo.cta} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 5. CONTACTO Y DESPEDIDA */}
        <section id="contacto" className="py-16 text-center flex flex-col items-center scroll-mt-28">
          <span className="font-mono text-brand-orange font-bold text-xl mb-4">04.</span>
          <h2 className="text-4xl md:text-6xl font-bold text-brand-text mb-6 tracking-tight">¿Trabajamos <br className="hidden md:block"/> juntos?</h2>
          <p className="text-lg text-brand-muted/80 mb-12 max-w-2xl">
            Si buscas a alguien para tu equipo o necesitas ordenar datos, soporte informático, automatizar tareas o una web para tu negocio, escríbeme. Respondo por correo o WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-20">
            <a
              href="mailto:jesuscelisarias@gmail.com"
              className="bg-brand-orange hover:bg-[#ff8a33] text-brand-bg font-mono font-bold py-4 px-10 rounded-xl transition-all tracking-widest uppercase text-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] transform hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
              <span>Correo</span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#3ee07d] text-brand-bg font-mono font-bold py-4 px-10 rounded-xl transition-all tracking-widest uppercase text-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.instagram.com/chenteia"
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 border border-white/10 hover:border-white/30 text-white font-mono font-bold py-4 px-10 rounded-xl transition-all uppercase text-sm tracking-widest backdrop-blur-sm flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
            >
              <InstagramIcon />
              <span>Instagram</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
