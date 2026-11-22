import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";

// Terminal interactiva: el visitante escribe comandos y la web responde con datos reales del perfil.

type Line = { kind: "in" | "out"; content: ReactNode };

const PROMPT = "visitante@vicente:~$";

const link = (href: string, text: string, download = false) => (
  <a
    href={href}
    target={download ? undefined : "_blank"}
    rel="noreferrer"
    download={download || undefined}
    className="text-brand-cyan underline decoration-brand-cyan/40 underline-offset-2 hover:decoration-brand-cyan"
  >
    {text}
  </a>
);

const COMMANDS: Record<string, { help: string; run: () => ReactNode }> = {
  help: {
    help: "lista los comandos",
    run: () => (
      <div className="grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-0.5">
        {Object.entries(COMMANDS).map(([name, c]) => (
          <div key={name} className="contents">
            <span className="text-brand-orange">{name}</span>
            <span className="text-brand-muted/80">{c.help}</span>
          </div>
        ))}
        <span className="text-brand-orange">clear</span>
        <span className="text-brand-muted/80">limpia la pantalla</span>
      </div>
    ),
  },
  whoami: {
    help: "quién soy",
    run: () => (
      <p>
        Vicente Celis Arias. Egresado de Ciencias de la Informática y Matemática (UNICA, 2025), de Mala, Cañete.
        Trabajo con datos, bases de datos y soporte informático; automatizo procesos y hago webs.
      </p>
    ),
  },
  skills: {
    help: "herramientas que uso",
    run: () => (
      <div className="space-y-0.5">
        <p><span className="text-brand-yellow">datos     </span> Python (pandas, NumPy), SQL, Power BI, Machine Learning</p>
        <p><span className="text-brand-yellow">ofimática </span> Excel intermedio, Google Sheets, Forms, Apps Script</p>
        <p><span className="text-brand-yellow">soporte   </span> mantenimiento de equipos, ISO 27001 (fundamentos)</p>
        <p><span className="text-brand-yellow">web       </span> React, TypeScript, Vercel, Git</p>
      </div>
    ),
  },
  experiencia: {
    help: "dónde he trabajado",
    run: () => (
      <div className="space-y-0.5">
        <p><span className="text-brand-muted/60">2026-10</span>  Fiscalizador de Local de Votación – Responsable · JEE Cañete (JNE)</p>
        <p><span className="text-brand-muted/60">2026-04</span>  Fiscalizador de Local de Votación · JEE Ica (JNE), dos procesos</p>
        <p><span className="text-brand-muted/60">2026-03</span>  Ciclo introductorio para estudiantes de primer año · UNICA</p>
        <p><span className="text-brand-muted/60">2025-05</span>  Prácticas en el Área de Informática · Hospital Augusto Hernández Mendoza</p>
      </div>
    ),
  },
  proyectos: {
    help: "lo que he construido",
    run: () => (
      <div className="space-y-0.5">
        <p>• Predicción de deserción universitaria con Random Forest (tesis)</p>
        <p>• Registro de ventas y cuadre de caja con Google Forms y Apps Script</p>
        <p>• Webs para negocios con Chente Solutions</p>
        <p>• Control de asistencia con códigos QR</p>
        <p>• LinkedIn Optimizer: {link("https://github.com/ChenteIA/linkedin-optimizer-skill", "github.com/ChenteIA/linkedin-optimizer-skill")}</p>
      </div>
    ),
  },
  contacto: {
    help: "cómo escribirme",
    run: () => (
      <div className="space-y-0.5">
        <p>correo    {link("mailto:jesuscelisarias@gmail.com", "jesuscelisarias@gmail.com")}</p>
        <p>whatsapp  {link("https://wa.me/51971114393", "+51 971 114 393")}</p>
        <p>github    {link("https://github.com/ChenteIA", "github.com/ChenteIA")}</p>
        <p>linkedin  {link("https://www.linkedin.com/in/vicente-celis-datascience", "linkedin.com/in/vicente-celis-datascience")}</p>
      </div>
    ),
  },
  cv: {
    help: "descarga mi CV en PDF",
    run: () => <p>Descargando… si no empieza, {link("/CV_Vicente_Celis_Arias.pdf", "abre el CV aquí", true)}.</p>,
  },
};

const SUGGESTED = ["whoami", "skills", "experiencia", "proyectos", "contacto", "cv"];

const WELCOME: Line[] = [
  { kind: "out", content: <p>Bienvenido. Escribe <span className="text-brand-orange">help</span> o toca un comando de abajo.</p> },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setCursor(-1);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    let out: ReactNode;
    if (COMMANDS[cmd]) {
      out = COMMANDS[cmd].run();
      if (cmd === "cv") {
        const a = document.createElement("a");
        a.href = "/CV_Vicente_Celis_Arias.pdf";
        a.download = "CV_Vicente_Celis_Arias.pdf";
        a.click();
      }
    } else if (cmd.startsWith("sudo")) {
      out = <p>Permiso denegado. Para tener acceso de administrador, contrátame: escribe <span className="text-brand-orange">contacto</span>.</p>;
    } else {
      out = <p>No conozco «{cmd}». Escribe <span className="text-brand-orange">help</span> para ver los comandos.</p>;
    }
    setLines((l) => [...l, { kind: "in", content: cmd }, { kind: "out", content: out }]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown" && cursor >= 0) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      const match = [...Object.keys(COMMANDS), "clear"].find((c) => value && c.startsWith(value.trim().toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0d14]/95 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,107,0,0.06),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
      {/* Barra de ventana */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-brand-muted/60 truncate">vicente@chentesolutions: ~</span>
      </div>

      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="h-80 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-brand-text/90 cursor-text"
        aria-live="polite"
      >
        {lines.map((line, i) =>
          line.kind === "in" ? (
            <p key={i} className="mt-3 first:mt-0">
              <span className="text-[#28c840]">{PROMPT}</span> {line.content}
            </p>
          ) : (
            <div key={i} className="mt-1 whitespace-pre-wrap">{line.content}</div>
          ),
        )}
        <label className="mt-3 flex items-center gap-2">
          <span className="text-[#28c840] shrink-0">{PROMPT}</span>
          <span className="sr-only">Escribe un comando</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent outline-none text-brand-text caret-brand-orange"
          />
        </label>
      </div>

      {/* Comandos tocables (útiles en celular) */}
      <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-white/10 bg-white/[0.02]">
        {SUGGESTED.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="font-mono text-xs px-2.5 py-1 rounded-md border border-white/10 text-brand-muted/90 hover:text-brand-orange hover:border-brand-orange/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange transition-colors"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
