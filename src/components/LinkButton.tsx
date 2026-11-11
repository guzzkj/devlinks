import './LinkButton.css'

// Um botão de link. Recebe o título e a URL por Props.
type LinkButtonProps = {
  title: string
  url: string
}

function LinkButton({ title, url }: LinkButtonProps) {
  return (
    <a className="link-button" href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  )
}

export default LinkButton
