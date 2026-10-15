// Identidad de movimiento de Chente IA (personalidad "Corporate").
// Una curva firma para casi todo, una paleta de 3 duraciones y un patrón de entrada:
// los elementos suben desde abajo y se desvanecen hacia su lugar.
import type { Variants } from "motion/react";

export const EASE = {
  // Curva firma: decisiva, sin rebote. Para el 80% de las animaciones.
  standard: [0.2, 0, 0, 1],
  // Para el elemento héroe: arranque rápido y aterrizaje muy suave.
  emphasized: [0.05, 0.7, 0.1, 1],
} as const;

export const DUR = { quick: 0.18, standard: 0.3, slow: 0.45 } as const;

// Coreografía de entrada del dashboard (segundos desde que se monta la vista).
// Héroe → tarjetas → panel lateral, con solapamiento ~25% (ritmo "brisk").
export const SEQ = {
  hero: 0,
  cards: 0.2,
  cardStagger: 0.06,
  maxStaggered: 4, // a partir del 5.º curso todos entran juntos para no alargar la espera
  sidebar: 0.4,
} as const;

// Profundidad por desplazamiento: el héroe viaja más, lo secundario menos.
export const heroGroup: Variants = {
  hidden: {},
  show: { transition: { delayChildren: SEQ.hero, staggerChildren: 0.07 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.emphasized } },
};

export const sidebarGroup: Variants = {
  hidden: {},
  show: { transition: { delayChildren: SEQ.sidebar, staggerChildren: 0.08 } },
};

export const sidebarPanel: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.standard, ease: EASE.standard, delayChildren: 0.1, staggerChildren: 0.05 },
  },
};

// Capa secundaria: las cifras "se asientan" cuando su panel ya llegó.
export const statTile: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.quick, ease: EASE.standard } },
};
