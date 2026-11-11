import './LinkButton.css'

// Um botão de link. Recebe o título e a URL por Props.
function LinkButton({ title, url }) {
  return (
    <a className="link-button" href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  )
}

export default LinkButton
