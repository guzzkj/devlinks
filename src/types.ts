// Tipos usados nos dados e nos componentes

export type Theme = 'light' | 'dark'

export type LinkItem = {
  title: string
  url: string
}

export type SocialName = 'github' | 'instagram' | 'youtube' | 'linkedin'

export type SocialItem = {
  name: SocialName
  label: string
  url: string
}
