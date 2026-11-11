import './Profile.css'

// Mostra a foto e o @usuário. Recebe os dados por Props.
type ProfileProps = {
  avatar: string
  username: string
}

function Profile({ avatar, username }: ProfileProps) {
  return (
    <header className="profile">
      <div className="profile__ring">
        <img className="profile__avatar" src={avatar} alt={`Foto de perfil de ${username}`} />
      </div>
      <p className="profile__username">{username}</p>
    </header>
  )
}

export default Profile
