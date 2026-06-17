## Context

A página principal atual possui destaques de produtos e depoimentos, mas carece de uma seção institucional declarando a essência da marca. Foi decidido incluir uma seção de "Diferenciais" (A Essência MorARIs) baseada no Design System ("Warm Contemporary Luxury") com 4 pilares: Curadoria Exclusiva, Consultoria Especializada, Logística Cuidadosa e Design Atemporal.

## Goals / Non-Goals

**Goals:**
- Implementar visualmente a nova seção de diferenciais em `core/templates/core/home.html`.
- Seguir fielmente o design system para espaçamentos, tipografia e iconografia minimalista.

**Non-Goals:**
- Tornar esses diferenciais dinâmicos/gerenciáveis via Admin (Jazzmin). O conteúdo é a essência fixa da marca, portanto será "hardcoded" no template para evitar consultas extras ao banco de dados e simplificar a arquitetura.

## Decisions

- **Armazenamento:** O conteúdo será fixo no HTML (template).
  - *Rationale:* Reduz carga do DB. Como os pilares são os valores centrais (core values) da marca, a frequência de mudança é raríssima.
- **Visual:** Utilização de Bootstrap Grid (ou flexbox customizado no nosso `style.css`) para dispor os 4 itens. O fundo deverá usar uma das cores base, como o `--color-background` (`#F7F4EF`) ou branco puro com padding amplo (`section-pad`).
- **Ícones:** Utilizaremos SVGs inline minimalistas, coloridos com a variável `--color-primary` (`#7A4E35`).

## Risks / Trade-offs

- **Risk:** Necessidade de alteração no código para editar texto dos diferenciais.
  - *Mitigation:* Como são valores da marca (Missão/Visão traduzidos), não mudam com a frequência de campanhas ou banners. Qualquer edição textual pontual pode ser feita no repositório.
