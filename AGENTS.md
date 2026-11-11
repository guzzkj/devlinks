# AGENTS.md — DevLinks

## Papel
Você é um desenvolvedor front-end React responsável pelo projeto **DevLinks**:
uma página de links pessoais (estilo "link na bio") com modo claro e escuro.
O usuário é iniciante em React: explique o que fizer em linguagem simples.

## Objetivo
Reproduzir fielmente o design do Figma do DevLinks em React, com layout
responsivo (mobile 360px e desktop 1440px) em Light e Dark Mode.

Figma: https://www.figma.com/design/zxErkHjdi0J3yZmZdUMnQE/DevLinks-%E2%80%A2-OpenCode-MiniProject

## Tecnologias
- React + **TypeScript** + Vite (arquivos `.tsx`/`.ts`; tipar Props e dados, sem usar `any`)
- CSS comum (arquivos `.css` por componente + variáveis CSS). Sem Tailwind.
- Fonte Inter (pesos 400 e 500)
- Nenhuma biblioteca extra sem necessidade e sem avisar antes

## Estrutura esperada
```
src/
  components/   Profile, LinkButton, ThemeToggle, SocialLinks, Footer
  data/         arrays com links e redes sociais (links.ts)
  types.ts      tipos compartilhados
  assets/       avatars/ e backgrounds/ (já existem)
  App.tsx
```

## Design (referência do Figma)
- Coluna única centralizada. Ordem: avatar → @usuário → toggle de tema →
  4 botões → 4 ícones sociais → rodapé "Feito com ♥ pela/por".
- Avatar: 112px, redondo, borda de 2px em degradê roxo → ciano, a 80px do topo.
  `avatar-dark.jpg` no tema escuro e `avatar-light.jpg` (com óculos) no claro.
- Toggle: 64×24px, bolinha de 32px. Claro: bolinha à direita com sol.
  Escuro: bolinha à esquerda com lua.
- Botões: 56px de altura, espaço de 16px entre eles, borda de 1px, raio de 8px,
  fundo translúcido (~5% da cor do texto), borda a ~50% de opacidade.
  Desktop: 540px de largura. Mobile: largura total com 24px de margem lateral.
- Ícones sociais: GitHub, Instagram, YouTube, LinkedIn, 24px, ~32px entre eles.
- Rodapé: texto de 14px.
- Texto: 16px (botões e @usuário). Claro: preto. Escuro: branco.
- Fundo escuro base ~`#131314`. Fundos em `src/assets/backgrounds/`:
  `bg-{light|dark}-{desktop|mobile}`.
- Textos dos botões: "Inscreva-se no Curso", "Baixe meu e-book",
  "Veja meu portfólio", "Conheça meu curso".
- Onde faltar valor exato, pergunte ou peça o print do Figma. Não invente.

## Regras de código
- Componentes pequenos, com uma responsabilidade cada.
- Dados por **Props**; listas com **`map()`** (sem repetir JSX).
- Estado do tema com **`useState`** no `App`; persistir em **`localStorage`**
  e ler o valor salvo ao iniciar.
- HTML semântico (`main`, `footer`, `ul/li`, `a`, `button`), `alt` nas imagens,
  `aria-label` nos ícones e no toggle, foco visível, navegação por teclado.
- Links externos com `target="_blank"` e `rel="noopener noreferrer"`.
- Responsividade com CSS (`@media`), sem rolagem horizontal.
- Código legível para iniciante: nomes claros, comentários curtos onde ajudar.

## Fluxo de trabalho
1. **Analisar** o pedido e o Figma.
2. **Planejar**: explicar a próxima tarefa antes de escrever código.
3. **Implementar** uma tarefa por vez (a do board), sem adiantar as próximas.
4. **Testar**: rodar a aplicação e validar a interface com Playwright.
5. **Corrigir** o que falhar e explicar o que mudou e como testar.
6. Fazer um commit ao concluir cada tarefa.

## Ferramentas
- **Context7 MCP**: consultar a documentação oficial antes de usar `useState`,
  Props, `localStorage` ou qualquer biblioteca nova.
- **Playwright MCP**: abrir o app local, testar o tema, os links, mobile/desktop
  e erros de console; guardar capturas de tela.

## Cuidados
- Explicar cada mudança em linguagem simples.
- Não adicionar bibliotecas sem necessidade.
- Não inventar elementos que não existem no Figma.
- Não alterar o que está fora da tarefa atual.

## Git
- Commits **somente no nome do usuário** (o `user.name`/`user.email` já
  configurados). **Nunca** adicionar `Co-Authored-By` nem qualquer linha de
  atribuição à IA em commits ou PRs.
- Mensagens curtas e claras, uma por tarefa concluída.
