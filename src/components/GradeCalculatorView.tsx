import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { EASE, DUR, SEQ, heroGroup, heroItem, sidebarGroup, sidebarPanel, statTile } from "../motion";
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Sparkles, 
  Info,
  RotateCcw,
  BookOpen,
  AlertTriangle,
  Award,
  TrendingUp,
  FileText,
  ShieldCheck,
  ChevronDown,
  X,
  GraduationCap,
  Lightbulb
} from "lucide-react";

type UniKey = "UNICA" | "UNMSM" | "UNI" | "PUCP" | "UTP" | "AUTONOMA" | "UPSJB";

interface UniComponent {
  id: string;
  label: string;
  weight: number;
}

interface UniInfo {
  id: UniKey;
  name: string;
  short: string;
  colorGrad: string;
  primaryHex: string;
  minApproval: number;
  rounding: "half_up" | "none" | "half_up_int";
  components: UniComponent[];
  formulaDesc: string;
  sustitutorioRule: string;
  logo?: string;
}

const UNIVERSITIES: Record<UniKey, UniInfo> = {
  UNICA: {
    id: "UNICA",
    name: "Universidad Nac. San Luis Gonzaga",
    short: "UNICA",
    colorGrad: "from-[#d4af37] to-[#e6c46a]",
    primaryHex: "#d4af37",
    minApproval: 11,
    rounding: "half_up",
    components: [
      { id: "p1", label: "Primer Parcial", weight: 0.25 },
      { id: "p2", label: "Segundo Parcial", weight: 0.25 },
      { id: "prac", label: "Prácticas", weight: 0.40 },
      { id: "tar", label: "Tareas / Actitudinal", weight: 0.10 },
    ],
    formulaDesc: "PF = 25% P1 + 25% P2 + 40% Prac + 10% Tar",
    sustitutorioRule: "Sustitutorio reemplaza parcial más bajo desaprobado. Aplazado máx. 2 cursos.",
    logo: "https://www.unica.edu.pe/transparencia/img/unica.png"
  },
  UNMSM: {
    id: "UNMSM",
    name: "Universidad Nac. Mayor de San Marcos",
    short: "UNMSM",
    colorGrad: "from-[#8b1d21] to-[#ff4d6d]",
    primaryHex: "#ff4d6d",
    minApproval: 11,
    rounding: "half_up",
    components: [
      { id: "ep", label: "Examen Parcial", weight: 0.30 },
      { id: "ef", label: "Examen Final", weight: 0.30 },
      { id: "prac", label: "Prácticas", weight: 0.30 },
      { id: "tar", label: "Trabajos / Tareas", weight: 0.10 },
    ],
    formulaDesc: "PF = 30% EP + 30% EF + 30% Prac + 10% Trabajos",
    sustitutorioRule: "Sin sustitutorio general; jurado ad hoc cuando faltan ≤ 3 cursos.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/UNMSM_coatofarms_seal.svg"
  },
  UNI: {
    id: "UNI",
    name: "Universidad Nac. de Ingeniería",
    short: "UNI",
    colorGrad: "from-[#cc0000] to-[#ff3333]",
    primaryHex: "#ff3333",
    minApproval: 10,
    rounding: "half_up",
    components: [
      { id: "ep", label: "Examen Parcial", weight: 0.25 },
      { id: "ef", label: "Examen Final", weight: 0.50 },
      { id: "pp", label: "Promedio de Prácticas", weight: 0.25 },
    ],
    formulaDesc: "PF = (EP + 2*EF + PP) / 4",
    sustitutorioRule: "Examen Sustitutorio reemplaza a la nota más baja entre el Examen Parcial o Examen Final.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeOV0RQ-TGtGaHL18Hu0U8g7bMVe2SrD9EQA&s"
  },
  PUCP: {
    id: "PUCP",
    name: "Pontificia Univ. Católica del Perú",
    short: "PUCP",
    colorGrad: "from-[#00477F] to-[#3b82f6]",
    primaryHex: "#3b82f6",
    minApproval: 11,
    rounding: "none",
    components: [
      { id: "ep", label: "Examen Parcial", weight: 0.30 },
      { id: "ef", label: "Examen Final", weight: 0.30 },
      { id: "pp", label: "Promedio de Prácticas", weight: 0.40 },
    ],
    formulaDesc: "PF = 30% EP + 30% EF + 40% PP",
    sustitutorioRule: "Sin redondeo (dos decimales). Se puede eliminar la práctica más baja.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBdfFBPOf_-BniMR5uauvhbRpiNobGiPIOg&s"
  },
  UTP: {
    id: "UTP",
    name: "Universidad Tecnológica del Perú",
    short: "UTP",
    colorGrad: "from-[#E60028] to-[#FF3355]",
    primaryHex: "#ff3355",
    minApproval: 12,
    rounding: "half_up_int",
    components: [
      { id: "pc1", label: "Práctica 1", weight: 0.20 },
      { id: "pc2", label: "Práctica 2", weight: 0.20 },
      { id: "ep", label: "Examen Parcial", weight: 0.20 },
      { id: "ef", label: "Examen Final", weight: 0.40 },
    ],
    formulaDesc: "PF = 20% PC1 + 20% PC2 + 20% EP + 40% EF",
    sustitutorioRule: "Nota mínima 12. Examen de Rezagados puede reemplazar una PC o EP.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/UTP-logo.svg/960px-UTP-logo.svg.png"
  },
  AUTONOMA: {
    id: "AUTONOMA",
    name: "Universidad Autónoma del Perú",
    short: "Autónoma",
    colorGrad: "from-[#f26522] to-[#ff985c]",
    primaryHex: "#f26522",
    minApproval: 11,
    rounding: "half_up",
    components: [
      { id: "ep", label: "Examen Parcial", weight: 0.30 },
      { id: "ef", label: "Examen Final", weight: 0.30 },
      { id: "pp", label: "Promedio de Prácticas", weight: 0.40 },
    ],
    formulaDesc: "PF = 30% EP + 30% EF + 40% PP",
    sustitutorioRule: "Sustitutorio reemplaza nota menor (parcial o final). Máx 2 por periodo.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjmizQpXlcMBUjIVEIoq9D97sRLLzPmEDeRA&s"
  },
  UPSJB: {
    id: "UPSJB",
    name: "Univ. Privada San Juan Bautista",
    short: "UPSJB",
    colorGrad: "from-[#008000] to-[#22c55e]",
    primaryHex: "#22c55e",
    minApproval: 11,
    rounding: "half_up",
    components: [
      { id: "ep", label: "Examen Parcial", weight: 0.30 },
      { id: "ef", label: "Examen Final", weight: 0.30 },
      { id: "pc", label: "Promedio Continuo", weight: 0.40 },
    ],
    formulaDesc: "PF = 30% EP + 30% EF + 40% PC",
    sustitutorioRule: "Sustitutorio evalúa todo el curso y reemplaza la nota más baja del parcial o final.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Universidad_Privada_San_Juan_Bautista.png/250px-Universidad_Privada_San_Juan_Bautista.png"
  }
};

interface Course {
  id: string;
  name: string;
  attendance: number;
  grades: Record<string, number | "">;
}

export default function GradeCalculatorView() {
  const [selectedUni, setSelectedUni] = useState<UniKey>("UNICA");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const uniConf = UNIVERSITIES[selectedUni];
  const reduceMotion = useReducedMotion();

  // La coreografía de entrada solo aplica al cargar la vista; después,
  // agregar un curso o cambiar de universidad anima sin retrasos.
  const introRef = useRef(true);
  useEffect(() => {
    const t = setTimeout(() => { introRef.current = false; }, 900);
    return () => clearTimeout(t);
  }, []);
  const cardDelay = (i: number) =>
    introRef.current ? SEQ.cards + Math.min(i, SEQ.maxStaggered) * SEQ.cardStagger : 0;

  // Map courses per university
  const [coursesByUni, setCoursesByUni] = useState<Record<UniKey, Course[]>>({} as any);

  // Initialize or load
  useEffect(() => {
    try {
      const saved = localStorage.getItem("multi_uni_courses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) {
          setCoursesByUni(parsed);
          return;
        }
      }
    } catch (e) {
      // ignore security or parse errors
    }
  }, []);

  const saveToStorage = (updates: Record<UniKey, Course[]>) => {
    setCoursesByUni(updates);
    try {
      localStorage.setItem("multi_uni_courses", JSON.stringify(updates));
    } catch (e) {
      // ignore quota or security errors
    }
  };

  const getActiveCourses = (): Course[] => {
    if (coursesByUni[selectedUni]) return coursesByUni[selectedUni];
    
    // Create defaults based on uni components requirements
    const activeGrades: Record<string, number | ""> = {};
    uniConf.components.forEach(c => activeGrades[c.id] = "");
    
    return [
      { id: "1", name: "Asignatura 1", attendance: 100, grades: { ...activeGrades } }
    ];
  };

  const courses = getActiveCourses();

  const handleAddCourse = () => {
    const activeGrades: Record<string, number | ""> = {};
    uniConf.components.forEach(c => activeGrades[c.id] = "");
    
    const newCourse: Course = {
      id: Date.now().toString(),
      name: `Nueva Asignatura ${courses.length + 1}`,
      attendance: 100,
      grades: activeGrades
    };
    saveToStorage({ ...coursesByUni, [selectedUni]: [...courses, newCourse] });
  };

  const handleDeleteCourse = (id: string) => {
    if (courses.length <= 1) return;
    saveToStorage({ ...coursesByUni, [selectedUni]: courses.filter(c => c.id !== id) });
  };

  const handleReset = () => {
    const fresh: Course[] = [];
    const activeGrades: Record<string, number | ""> = {};
    uniConf.components.forEach(c => activeGrades[c.id] = "");
    fresh.push({ id: "1", name: "Asignatura 1", attendance: 100, grades: { ...activeGrades } });
    
    saveToStorage({ ...coursesByUni, [selectedUni]: fresh });
  };

  const handleUpdateName = (id: string, name: string) => {
    const updated = courses.map(c => c.id === id ? { ...c, name } : c);
    saveToStorage({ ...coursesByUni, [selectedUni]: updated });
  };

  const handleUpdateAttendance = (id: string, val: number) => {
    const updated = courses.map(c => c.id === id ? { ...c, attendance: Math.max(0, Math.min(100, val)) } : c);
    saveToStorage({ ...coursesByUni, [selectedUni]: updated });
  };

  const handleUpdateGrade = (courseId: string, compId: string, val: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const parsed = val === "" ? "" : Math.max(0, Math.min(20, Number(val)));
        return { ...c, grades: { ...c.grades, [compId]: parsed } };
      }
      return c;
    });
    saveToStorage({ ...coursesByUni, [selectedUni]: updated });
  };

  // Math core
  const computeCourseMetrics = (c: Course) => {
    let rawPF = 0;
    let isComplete = true;
    let missingWeight = 0;

    for (const comp of uniConf.components) {
      const g = c.grades[comp.id];
      if (g === "" || g === undefined || isNaN(g as number)) {
        isComplete = false;
        missingWeight += comp.weight;
      } else {
        rawPF += (g as number) * comp.weight;
      }
    }

    let roundedPF = rawPF;
    if (uniConf.rounding === "none") {
      roundedPF = Math.round(rawPF * 100) / 100;
    } else {
      // both half_up and half_up_int do >= 0.5 rules basically
      roundedPF = Math.round(rawPF); 
    }

    let status: "APROBADO" | "DESAPROBADO" | "RECUPERABLE" | "DPI" | "INCOMPLETO" = "INCOMPLETO";
    if (c.attendance < 70) {
      status = "DPI";
    } else if (!isComplete) {
      status = "INCOMPLETO";
    } else if (roundedPF >= uniConf.minApproval) {
      status = "APROBADO";
    } else if (roundedPF >= (uniConf.minApproval - 4)) {
      status = "RECUPERABLE";
    } else {
      status = "DESAPROBADO";
    }

    let requiredGrade: number | null = null;
    if (status === "INCOMPLETO" && missingWeight > 0) {
      const target = uniConf.rounding === "none" ? uniConf.minApproval : uniConf.minApproval - 0.5;
      const neededPF = target - rawPF;
      if (neededPF <= 0) {
        requiredGrade = 0;
      } else {
        const req = neededPF / missingWeight;
        if (req <= 20) {
          requiredGrade = Math.ceil(req * 10) / 10;
        }
      }
    }

    return { rawPF, roundedPF, isComplete, status, requiredGrade };
  };

  const calculatedCourses = courses.map(c => ({
    course: c,
    metrics: computeCourseMetrics(c)
  }));

  const completeCourses = calculatedCourses.filter(cc => cc.metrics.isComplete || cc.metrics.status === "DPI");
  const passedCoursesCount = completeCourses.filter(cc => cc.metrics.status === "APROBADO").length;
  const failedCourses = completeCourses.filter(cc => ["DESAPROBADO", "RECUPERABLE", "DPI"].includes(cc.metrics.status));
  const dpiCount = completeCourses.filter(cc => cc.metrics.status === "DPI").length;

  const averageGPA = completeCourses.length > 0 
    ? completeCourses.reduce((sum, item) => sum + item.metrics.roundedPF, 0) / completeCourses.length
    : 0;

  return (
    <div className="relative min-h-[95vh] pt-28 pb-16 px-4 md:px-10 max-w-7xl mx-auto w-full select-none" id="multi_grade_calculator">
      
      {/* Dynamic Background Glow based on University Color */}
      <div 
        className="absolute inset-x-0 top-0 h-[500px] blur-3xl pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundImage: `linear-gradient(to bottom, ${uniConf.primaryHex}, transparent)` }} 
      />

      <motion.div
        variants={heroGroup}
        initial="hidden"
        animate="show"
        className="mb-10 flex flex-col xl:flex-row xl:items-start justify-between gap-6 border-b border-white/5 pb-8 relative z-50"
      >
        <div>
          <motion.div variants={heroItem} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-3 transition-colors duration-500" style={{ color: uniConf.primaryHex }}>
            <Calculator className="w-4 h-4 animate-pulse" />
            <span>Sistema Multi-Universidad del Perú</span>
          </motion.div>
          <motion.h1 variants={heroItem} className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight flex flex-col sm:flex-row sm:items-center gap-3">
             Calculadora de Notas
          </motion.h1>
          <motion.p variants={heroItem} className="text-sm text-[#e2bfb0]/70 max-w-3xl mt-2 leading-relaxed">
            Selecciona tu universidad para aplicar automáticamente los umbrales de aprobación, fórmulas de ponderación y reglas de redondeo vigentes según los últimos reglamentos y sílabos institucionales.
          </motion.p>
        </div>

        <motion.div variants={heroItem} className="flex flex-col gap-3 shrink-0">
          <div className="relative min-w-[280px]">
            {/* Custom Select Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#121622] hover:bg-[#1a2030] transition-colors border border-white/10 rounded-xl p-1 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:border-transparent select-none cursor-pointer"
              style={{ "--tw-ring-color": uniConf.primaryHex } as React.CSSProperties}
            >
              <div className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-white">
                {uniConf.logo ? (
                  <img src={uniConf.logo} alt={uniConf.short} className="w-6 h-6 object-contain rounded-sm bg-white p-0.5" />
                ) : (
                  <div 
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 transition-colors duration-500"
                    style={{ backgroundColor: `${uniConf.primaryHex}20`, color: uniConf.primaryHex }}
                  >
                    {uniConf.short.substring(0, 1)}
                  </div>
                )}
                <span className="truncate">{uniConf.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/50 transition-transform mr-3 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Custom Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="fixed inset-0 z-40 cursor-default" 
                onClick={() => setIsDropdownOpen(false)} 
              />
            )}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#121622] border border-white/10 rounded-xl shadow-2xl overflow-y-auto z-50 flex flex-col py-1 max-h-[300px]"
                >
                  {Object.values(UNIVERSITIES).map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setSelectedUni(u.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`text-left flex items-center gap-3 px-4 py-3 hover:bg-[#1a2030] transition-colors cursor-pointer w-full border-b border-white/5 last:border-0 ${selectedUni === u.id ? 'bg-[#1a2030]' : ''}`}
                    >
                      {u.logo ? (
                         <img src={u.logo} alt={u.short} className="w-6 h-6 object-contain rounded-sm bg-white p-0.5" />
                      ) : (
                        <div 
                          className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 transition-colors duration-500"
                          style={{ backgroundColor: selectedUni === u.id ? `${u.primaryHex}40` : `${u.primaryHex}15`, color: u.primaryHex }}
                        >
                          {u.short.substring(0, 1)}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white leading-tight">{u.name}</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">{u.short}</span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 min-w-[120px]">
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-xs text-white font-semibold px-4 py-3 rounded-xl transition-all duration-500 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 transition-colors duration-500" style={{ color: uniConf.primaryHex }} />
              <span>Limpiar</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* COURSES LIST */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence>
            {calculatedCourses.map(({ course, metrics }, i) => (
              <motion.div
                key={`${selectedUni}-${course.id}`} // Force re-render animation when swapping
                initial={{ opacity: 0, y: 16, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: DUR.standard, ease: EASE.standard, delay: cardDelay(i) } }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: DUR.quick, ease: [0.3, 0, 1, 1] } }}
                className={`course-glass-panel rounded-3xl p-6 relative overflow-hidden transition-all ${
                  metrics.status === "DPI"
                    ? "border-rose-500/30 bg-rose-500/5"
                    : metrics.status === "APROBADO"
                      ? "border-emerald-500/20 hover:border-emerald-500/30"
                      : "hover:border-white/10"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <BookOpen className="w-5 h-5 shrink-0 transition-colors duration-500" style={{ color: uniConf.primaryHex }} />
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => handleUpdateName(course.id, e.target.value)}
                      className="bg-transparent text-white font-display font-extrabold text-base md:text-lg focus:outline-none border-b border-transparent pb-0.5 w-full select-text transition-colors duration-500"
                      style={{ borderBottomColor: uniConf.primaryHex }}
                      placeholder="Nombre del curso"
                    />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full border ${
                      metrics.status === "APROBADO" ? "bg-emerald-500/15 text-emerald-400 border-emerald-400/20" :
                      metrics.status === "DPI" ? "bg-rose-500/15 text-rose-400 border-rose-400/20" :
                      metrics.status === "RECUPERABLE" ? "bg-amber-500/15 text-amber-400 border-amber-400/20" :
                      metrics.status === "DESAPROBADO" ? "bg-[#2c1a1f] text-rose-400 border-rose-500/10" :
                      "bg-white/5 text-[#dee2f0]/60 border-white/5"
                    }`}>
                      {metrics.status}
                    </span>
                    <button onClick={() => handleDeleteCourse(course.id)} className="text-[#e2bfb0]/40 hover:text-rose-500 p-2 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  
                  {/* DYNAMIC GRADES PANEL */}
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {uniConf.components.map(comp => (
                      <div key={comp.id} className="bg-white/3 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider block mb-1 transition-colors duration-500" style={{ color: uniConf.primaryHex }}>{(comp.weight * 100).toFixed(0)}%</span>
                          <span className="text-[10px] font-bold text-white uppercase break-words leading-tight block mb-3 line-clamp-2">{comp.label}</span>
                        </div>
                        <input
                          type="number"
                          value={course.grades[comp.id] ?? ""}
                          onChange={(e) => handleUpdateGrade(course.id, comp.id, e.target.value)}
                          className="w-full bg-[#0a0f18] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white text-center font-mono font-bold"
                          placeholder="Nota"
                          step={0.1} min={0} max={20}
                        />
                      </div>
                    ))}
                  </div>

                  {/* ATTENDANCE & RESULTS */}
                  <div className="md:col-span-4 space-y-3.5 bg-white/3 border border-white/5 rounded-2xl p-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Asistencia</span>
                        <span className={`text-[10px] font-mono font-bold ${course.attendance < 70 ? 'text-rose-400' : 'text-emerald-400'}`}>{course.attendance}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={course.attendance} onChange={(e) => handleUpdateAttendance(course.id, Number(e.target.value))} className="w-full h-1 bg-[#0a0f18] rounded-lg cursor-pointer transition-all duration-500" style={{ accentColor: uniConf.primaryHex }} />
                    </div>

                    <div className="border-t border-white/5 pt-3.5 text-center">
                      <span className="text-[10px] uppercase font-bold text-[#e2bfb0]/55 tracking-wider block mb-1">Promedio Final</span>
                      {metrics.isComplete && metrics.status !== "DPI" ? (
                        <div className="text-3xl font-display font-black text-white tracking-widest">{metrics.roundedPF}{uniConf.rounding === "none" && <span className="text-sm opacity-50">.xx</span>}</div>
                      ) : metrics.status === "DPI" ? (
                        <div className="text-xl font-display font-black text-rose-400">DPI</div>
                      ) : metrics.status === "INCOMPLETO" && metrics.requiredGrade !== null ? (
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-2xl font-display font-black text-emerald-400 tracking-widest">
                            {metrics.requiredGrade === 0 ? "Ya pasaste" : `${metrics.requiredGrade}`}
                          </div>
                          {metrics.requiredGrade > 0 && <span className="text-[9px] text-[#e2bfb0]/55 font-bold uppercase tracking-wider block mt-1">Necesitas en notas faltantes</span>}
                        </div>
                      ) : metrics.status === "INCOMPLETO" && metrics.requiredGrade === null ? (
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-xl font-display font-black text-rose-400">Ya fue</div>
                          <span className="text-[9px] text-rose-400/70 font-bold uppercase tracking-wider block mt-1">Matemáticamente imposible</span>
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-white/30 py-2">--</div>
                      )}
                      {metrics.isComplete && <div className="text-[9px] text-white/40 font-mono mt-1">Raw: {metrics.rawPF.toFixed(2)}</div>}
                    </div>
                  </div>

                </div>

                {/* AI / GUIDE SECTION */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${uniConf.primaryHex}20` }}
                    >
                      <Lightbulb className="w-3.5 h-3.5" style={{ color: uniConf.primaryHex }} />
                    </div>
                    <div className="text-xs text-white/60 leading-relaxed flex-1">
                      {metrics.status === "APROBADO" && "¡Felicidades! Has aprobado el curso. Mantén este buen desempeño para tus próximos retos."}
                      {metrics.status === "DESAPROBADO" && `No lograste la nota mínima. ${uniConf.sustitutorioRule}`}
                      {metrics.status === "DPI" && "Has sido Desaprobado por Inasistencia. Te recomendamos conversar con tu docente o coordinador."}
                      {metrics.status === "RECUPERABLE" && `Estás en rango de recuperación. ${uniConf.sustitutorioRule}`}
                      {metrics.status === "INCOMPLETO" && metrics.requiredGrade === 0 && "¡Excelente! Matemáticamente ya aprobaste el curso. Sigue así para mejorar tu promedio."}
                      {metrics.status === "INCOMPLETO" && metrics.requiredGrade !== null && metrics.requiredGrade > 0 && <span><strong>Plan de Acción:</strong> Necesitas un promedio mínimo de <strong>{metrics.requiredGrade}</strong> en las evaluaciones faltantes para aprobar. Te sugerimos estructurar un plan de estudio priorizando los temas con mayor peso.</span>}
                      {metrics.status === "INCOMPLETO" && metrics.requiredGrade === null && "Aviso: Matemáticamente ya no alcanzas la nota mínima. Revisa si hay opciones de examen sustitutorio o rezagados según el reglamento."}
                      
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        <a 
                          href={`https://wa.me/51971114393?text=${encodeURIComponent(`Hola Chente, necesito ayuda para generar un plan de estudio para mi curso de ${course.name || 'la universidad'}.`)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20 font-medium text-xs hover:scale-105 active:scale-95 duration-200"
                        >
                          Generar Plan de Estudio
                        </a>
                        <a 
                          href={`https://wa.me/51971114393?text=${encodeURIComponent(`Hola Chente, necesito ayuda con unas tareas del curso de ${course.name || 'la universidad'}.`)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20 font-medium text-xs hover:scale-105 active:scale-95 duration-200"
                        >
                          Ayuda con Tareas
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: DUR.standard, ease: EASE.standard, delay: cardDelay(calculatedCourses.length) } }}
            onClick={handleAddCourse}
            className="w-full relative overflow-hidden group course-glass-panel border-dashed rounded-3xl p-6 flex flex-col items-center justify-center gap-3 transition-all hover:bg-white/[0.04] cursor-pointer min-h-[140px]"
          >
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500"
              style={{ backgroundColor: `${uniConf.primaryHex}20`, color: uniConf.primaryHex }}
            >
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-bold text-white/70 group-hover:text-white transition-colors">Agregar otro curso</span>
          </motion.button>
        </div>

        {/* STATS PANEL */}
        <motion.div variants={sidebarGroup} initial="hidden" animate="show" className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
          <motion.div variants={sidebarPanel} className="glass-panel bg-[#161a23]/60 p-6 rounded-3xl space-y-6 relative overflow-hidden border-t-[3px] transition-colors duration-500" style={{ borderTopColor: uniConf.primaryHex }}>
            {/* Capa ambiental: el color de la universidad "respira" despacio bajo el borde */}
            {!reduceMotion && (
              <motion.div
                aria-hidden
                className="absolute inset-x-0 top-0 h-24 pointer-events-none"
                style={{ backgroundImage: `linear-gradient(to bottom, ${uniConf.primaryHex}22, transparent)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ delay: 1, duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 transition-colors duration-500" style={{ color: uniConf.primaryHex }} />
              <span className="text-xs font-extrabold text-white uppercase tracking-wider">General: {uniConf.short}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={statTile} className="bg-[#0a0f18] border border-white/5 rounded-2xl p-4 text-center">
                <span className="text-[9px] text-[#e2bfb0]/55 font-bold uppercase block">Ponderado General</span>
                <span className="text-3xl font-display font-black text-white tracking-widest block mt-1.5">{averageGPA > 0 ? averageGPA.toFixed(2) : "—"}</span>
              </motion.div>
              <motion.div variants={statTile} className="bg-[#0a0f18] border border-white/5 rounded-2xl p-4 text-center">
                 <span className="text-[9px] text-[#e2bfb0]/55 font-bold uppercase block">Aprobados (Mín {uniConf.minApproval})</span>
                 <span className="text-3xl font-display font-black tracking-widest block mt-1.5 transition-colors duration-500" style={{ color: passedCoursesCount > 0 ? uniConf.primaryHex : "white" }}>{passedCoursesCount}/{courses.length}</span>
              </motion.div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 text-[11px] text-[#dee2f0]/80 leading-relaxed border border-white/5">
               <strong className="text-white">Diagnóstico Universitario:</strong>
               {failedCourses.length === 0 && completeCourses.length > 0 ? (
                 <span className="text-emerald-400 block mt-1">¡Excelente semestre! Ningún curso en riesgo hasta el momento.</span>
               ) : failedCourses.length > 0 ? (
                 <span className="text-amber-400 block mt-1">Tienes {failedCourses.length} curso(s) en riesgo. Revisa las políticas de recuperación de la {uniConf.short}.</span>
               ) : (
                 <span className="block mt-1">Ingresa calificaciones validas para calcular.</span>
               )}
            </div>
          </motion.div>

          <motion.div variants={sidebarPanel} className="glass-panel border-white/5 p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 transition-colors duration-500" style={{ color: uniConf.primaryHex }} />
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Reglamento: {uniConf.short}</h3>
            </div>
            <div className="space-y-3.5 text-xs text-[#e2bfb0]/80">
              <div className="space-y-1">
                <span className="font-bold text-white block">Fórmula Típica</span>
                <p className="text-[11px] leading-relaxed font-mono transition-colors duration-500" style={{ color: uniConf.primaryHex }}>{uniConf.formulaDesc}</p>
              </div>
              <div className="space-y-1 pt-2 border-t border-white/5">
                <span className="font-bold text-white block">Redondeo y Aprobación</span>
                <p className="text-[11px] leading-relaxed">
                  Nota mínima teórica es <strong className="text-white bg-white/10 px-1 rounded">{uniConf.minApproval}</strong>. 
                  Regla de ajuste: {uniConf.rounding === "none" ? "No se redondea (mantiene decimales)." : "Fracción ≥ 0.5 redondea a entero superior."}
                </p>
              </div>
              <div className="space-y-1 pt-2 border-t border-white/5">
                <span className="font-bold text-white block">Sustitutorios y Recuperación</span>
                <p className="text-[11px] leading-relaxed">{uniConf.sustitutorioRule}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
