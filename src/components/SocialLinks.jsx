import Icon from './Icons'
import './SocialLinks.css'

// Lista de ícones das redes sociais. Recebe o array "socials" por Props.
function SocialLinks({ socials }) {
  return (
    <ul className="social-links">
      {socials.map((social) => (
        <li key={social.name}>
          <a
            className="social-links__link"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            <Icon name={social.name} />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
