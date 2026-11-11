import { useEffect, useState } from 'react'
import Profile from './components/Profile'
import ThemeToggle from './components/ThemeToggle'
import LinkButton from './components/LinkButton'
import SocialLinks from './components/SocialLinks'
import Footer from './components/Footer'
import { profile, links, socials } from './data/links'
import type { Theme } from './types'
import avatarDark from './assets/avatars/avatar-dark.jpg'
import avatarLight from './assets/avatars/avatar-light.jpg'
import './App.css'

const THEME_KEY = 'devlinks-theme'

// Lê o tema salvo; se não houver (ou for inválido), usa o escuro
function getInitialTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY)
  return saved === 'light' ? 'light' : 'dark'
}

function App() {
  // useState com função: o React lê o localStorage só na primeira renderização
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Sempre que o tema muda: aplica no <html> (troca as cores) e salva
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="page">
      <main className="page__main">
        <Profile avatar={theme === 'light' ? avatarLight : avatarDark} username={profile.username} />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />

        <ul className="links">
          {links.map((link) => (
            <li key={link.title}>
              <LinkButton title={link.title} url={link.url} />
            </li>
          ))}
        </ul>

        <SocialLinks socials={socials} />
      </main>
      <Footer />
    </div>
  )
}

export default App
