# Dia de Ouro 2027 · 60 anos do Cordão de Ouro

Landing page do evento de 60 anos do Grupo de Capoeira Cordão de Ouro (22 a 24 de janeiro de 2027, São Paulo).

Feita com **Next.js 16** (App Router, página estática), **Tailwind CSS 4**, **shadcn/ui** (sobre Base UI) e testes com **Vitest**.

## Rodar o projeto

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # testes
npm run lint       # padrões de código
npm run build      # gera a versão de produção
npm start          # serve a versão de produção
```

## Publicação (Netlify)

O site é publicado no **Netlify** a partir do GitHub: cada push na branch principal gera um deploy novo. O `netlify.toml` roda os testes antes do build; se algum falhar, nada é publicado.

O endereço do site (link canônico, sitemap, `robots.txt`, imagem de compartilhamento e dados do Google) vem sozinho da variável `URL` do Netlify. Ao conectar um domínio próprio no painel do Netlify, faça um novo deploy (**Deploys → Trigger deploy**) para esses links passarem a usar o domínio. Se precisar forçar outro endereço, configure `NEXT_PUBLIC_SITE_URL`.

## Como editar o site

| O que mudar | Onde |
|---|---|
| Textos da página | `src/lib/content.ts` |
| Preços, datas dos lotes, link do formulário, endereço, hotéis, WhatsApp | `src/lib/event-data.ts` |
| Cores | `tailwind.config.ts` (paleta) |
| Imagens | `src/assets/img/` + `src/assets/images.ts` |

### Fechar um lote antes do prazo

Em `src/lib/event-data.ts`, troque `fechado: false` por `fechado: true` no lote. O card mostra "Esgotado", o aviso do topo some (se for o 1º lote) e o próximo lote abre na hora.

### Publicar a programação

Em `src/lib/content.ts`, revise os dias em `program.days` e troque `pronta: false` por `pronta: true`. Enquanto estiver `false`, os cards aparecem apagados com "Em breve".

### Cores

Use sempre as classes da paleta (`bg-gold`, `text-navy-500`, `border-gold-600`…), nunca cor solta (`#hex`). A paleta fica em `tailwind.config.ts` e vira também variáveis CSS (`var(--color-gold-400)`).

## Organização do código

```
src/
  app/                 página, layout, metadados, sitemap, robots e imagem de compartilhamento
  components/
    sections/          uma seção da página por arquivo (Hero, History, About, Program…)
    layout/section.tsx blocos repetidos das seções (Section, H2, Lead, Eyebrow, Rope, Price)
    ui/                componentes do shadcn com as variantes do evento (Button, Badge, Card, IconBox…)
    *.tsx              partes interativas (menu, contagem regressiva, lotes, linha do tempo, mapa de hotéis)
  hooks/               relógio compartilhado e seção ativa do menu
  lib/                 dados, textos e regras (status dos lotes, aviso do topo, SEO, tradução) + testes
  assets/              imagens
```

As regras com lógica ficam em funções puras em `src/lib/` e têm testes ao lado (`*.test.ts`): status dos lotes por data, fechar lote à mão, contagem de dias do aviso, contagem regressiva, idioma do tradutor, seção ativa do menu, dados do evento para o Google e geração da paleta.

## Tradução

O seletor de idioma usa o **Google Tradutor**. O script do Google só é baixado quando precisa: quando a pessoa abre o menu de idiomas, já escolheu outro idioma antes ou está com o navegador em outro idioma (PT, EN, ES, IT, RU, HE, JA).

## Segurança e SEO

- Cabeçalhos de segurança e Content Security Policy em `next.config.ts`
- Dados estruturados do evento (schema.org/Event) com data, local e preço de cada lote
- `sitemap.xml`, `robots.txt`, link canônico e imagem de compartilhamento gerada no build
- O número do WhatsApp só aparece dentro do link do botão, não escrito na página
