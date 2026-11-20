// Logo "ventana de terminal" (>vc_). Usa los colores de la marca, así cambia solo si cambia la paleta.
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="var(--color-brand-panel)" />
      <path d="M0 14A14 14 0 0 1 14 0H50A14 14 0 0 1 64 14V18H0Z" fill="var(--color-brand-surface-high)" />
      <circle cx="10" cy="9.5" r="2.6" fill="#ff5f57" />
      <circle cx="18" cy="9.5" r="2.6" fill="#febc2e" />
      <circle cx="26" cy="9.5" r="2.6" fill="#28c840" />
      <g fill="none" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 29L17 36L10 43" stroke="var(--color-brand-orange)" />
        <path d="M21 31L26 42L31 31" stroke="var(--color-brand-text)" />
        <path d="M45.1 32A5.8 5.8 0 1 0 45.1 41" stroke="var(--color-brand-text)" />
        <path d="M48 45H55" stroke="var(--color-brand-orange)" />
      </g>
    </svg>
  );
}
