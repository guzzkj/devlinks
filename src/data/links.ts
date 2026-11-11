import type { LinkItem, SocialItem } from '../types'

// Dados do perfil. Troque as URLs pelos seus links reais.
export const profile = {
  username: '@guzzkj',
}

export const links: LinkItem[] = [
  { title: 'Inscreva-se no Curso', url: 'https://example.com/curso' },
  { title: 'Baixe meu e-book', url: 'https://example.com/ebook' },
  { title: 'Veja meu portfólio', url: 'https://example.com/portfolio' },
  { title: 'Conheça meu curso', url: 'https://example.com/conheca' },
]

export const socials: SocialItem[] = [
  { name: 'github', label: 'GitHub', url: 'https://github.com/guzzkj' },
  { name: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/gustavo.hbarros' },
  { name: 'youtube', label: 'YouTube', url: 'https://youtube.com' },
  { name: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/gustavohbarros' },
]
