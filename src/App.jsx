import Profile from './components/Profile'
import ThemeToggle from './components/ThemeToggle'
import LinkButton from './components/LinkButton'
import SocialLinks from './components/SocialLinks'
import Footer from './components/Footer'
import { profile, links, socials } from './data/links'
import avatarDark from './assets/avatars/avatar-dark.jpg'
import avatarLight from './assets/avatars/avatar-light.jpg'
import './App.css'

function App() {
  // Por enquanto o tema é fixo (escuro). A tarefa 07 troca isso por useState.
  const theme = 'dark'

  return (
    <div className="page">
      <main className="page__main">
        <Profile avatar={theme === 'light' ? avatarLight : avatarDark} username={profile.username} />
        <ThemeToggle theme={theme} onToggle={() => {}} />

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
