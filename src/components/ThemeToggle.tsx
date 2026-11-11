import type { Theme } from '../types'
import './ThemeToggle.css'

// Ícones simples (sol e lua) desenhados em SVG
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

// Botão de alternar tema. theme = "light" ou "dark"; onToggle é chamado no clique.
type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isLight = theme === 'light'
  return (
    <button
      type="button"
      className={`theme-toggle ${isLight ? 'theme-toggle--light' : ''}`}
      onClick={onToggle}
      role="switch"
      aria-checked={isLight}
      aria-label="Alternar entre modo claro e escuro"
    >
      <span className="theme-toggle__knob">{isLight ? <SunIcon /> : <MoonIcon />}</span>
    </button>
  )
}

export default ThemeToggle
