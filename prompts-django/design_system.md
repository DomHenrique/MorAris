# Design System Master File

> **LOGIC:** Ao criar páginas para a MorARIs, priorize transmitir sensação de lar, sofisticação, acolhimento e design de interiores. Nunca tratar a marca como uma loja de materiais de construção convencional.

---

# Project

**Project:** MorARIs Revestimentos

**Category:** Revestimentos, Acabamentos, Arquitetura e Interiores

**Brand Positioning:** Transformar construções em lares através de revestimentos, acabamentos e inspiração.

**Brand Essence:**

> Após revestir, a construção nasce e se torna um lar.

---

# Global Rules

## Color Palette

| Role       | Hex     | CSS Variable       |
| ---------- | ------- | ------------------ |
| Primary    | #7A4E35 | --color-primary    |
| Secondary  | #99B09F | --color-secondary  |
| Accent     | #C7814A | --color-accent     |
| Dark       | #454442 | --color-dark       |
| Background | #F7F4EF | --color-background |
| Surface    | #FFFFFF | --color-surface    |
| Text       | #2E2A28 | --color-text       |

### Color Notes

* Terracota representa acolhimento e lar
* Verde sálvia transmite equilíbrio e natureza
* Caramelo cria sensação de sofisticação e calor
* Off-white garante leveza visual
* Evitar cores saturadas

---

# Typography

## Heading Font

Playfair Display

Fallback:

Georgia, serif

## Body Font

Inter

Fallback:

system-ui, sans-serif

## Mood

* Sofisticado
* Atemporal
* Elegante
* Humano
* Arquitetônico
* Inspirador

### CSS Import

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
```

---

# Spacing System

| Token       | Value |
| ----------- | ----- |
| --space-xs  | 4px   |
| --space-sm  | 8px   |
| --space-md  | 16px  |
| --space-lg  | 24px  |
| --space-xl  | 32px  |
| --space-2xl | 48px  |
| --space-3xl | 64px  |
| --space-4xl | 96px  |
| --space-5xl | 128px |

---

# Border Radius

| Token       | Value |
| ----------- | ----- |
| --radius-sm | 8px   |
| --radius-md | 12px  |
| --radius-lg | 20px  |
| --radius-xl | 32px  |

---

# Shadow System

| Token       | Value                       |
| ----------- | --------------------------- |
| --shadow-sm | 0 2px 8px rgba(0,0,0,.05)   |
| --shadow-md | 0 8px 24px rgba(0,0,0,.08)  |
| --shadow-lg | 0 16px 40px rgba(0,0,0,.12) |

---

# Visual Direction

## Style

Warm Contemporary Luxury

## Keywords

* Home
* Design
* Comfort
* Architecture
* Interior Design
* Natural Materials
* Organic Textures
* Premium Living
* Warm Minimalism
* Timeless Design

---

# Photography Guidelines

### Prioritize

* Ambientes prontos
* Casas sofisticadas
* Cozinhas modernas
* Living rooms
* Banheiros elegantes
* Luz natural
* Texturas
* Madeira
* Pedra
* Porcelanatos aplicados

### Avoid

* Estoque de materiais
* Pallets
* Depósitos
* Ambientes vazios
* Produtos isolados em fundo branco
* Fotos promocionais genéricas

---

# Buttons

## Primary CTA

```css
.btn-primary{
background:#7A4E35;
color:#fff;
padding:14px 28px;
border-radius:12px;
font-weight:600;
transition:.25s;
cursor:pointer;
}
```

### Hover

```css
background:#6A432E;
transform:translateY(-2px);
```

---

## Secondary CTA

```css
.btn-secondary{
background:transparent;
border:1px solid #7A4E35;
color:#7A4E35;
}
```

---

# Cards

```css
.card{
background:#fff;
padding:32px;
border-radius:20px;
box-shadow:var(--shadow-md);
transition:.25s;
}
```

### Hover

```css
transform:translateY(-4px);
box-shadow:var(--shadow-lg);
```

---

# Inputs

```css
.input{
border:1px solid #DDD;
border-radius:12px;
padding:14px 18px;
background:#FFF;
}
```

Focus:

```css
border-color:#7A4E35;
box-shadow:0 0 0 4px rgba(122,78,53,.15);
```

---

# Content Tone

## Voice

Consultiva

Inspiradora

Elegante

Humana

Especialista

---

## Communication

Fale sobre:

* ambientes
* bem-estar
* arquitetura
* design
* lar
* experiência

Não fale sobre:

* preço baixo
* promoção agressiva
* liquidação
* oportunidade imperdível
* atacado

---

# Brand Messages

## Main Message

Transformamos construções em lares.

---

## Alternative Messages

Seu lar começa nos detalhes.

Inspiração para viver melhor.

Design que acolhe.

Onde os ambientes ganham vida.

Acabamentos que transformam espaços em histórias.

---

# Website Structure

## Home

1. Hero
2. Quem Somos
3. Categorias de Produtos
4. Ambientes Inspiradores
5. Diferenciais
6. Depoimentos
7. CTA
8. Contato

---

## Quem Somos

História

Propósito

Missão

Valores

---

## Produtos

Porcelanatos

Revestimentos

Pisos

Acabamentos

Lançamentos

---

## Inspirações

Galeria

Projetos

Tendências

Ambientes

---

## Contato

Mapa

WhatsApp

Instagram

Formulário

---

# UX Rules

* Muito espaço em branco
* Hierarquia forte
* Tipografia protagonista
* Imagens grandes
* Layout editorial
* Poucos elementos por seção
* Navegação simples

---

# Conversion Strategy

Objetivo principal:

Gerar visitas ao showroom e contatos pelo WhatsApp.

CTA Principal:

Conheça nosso showroom

CTA Secundário:

Falar com especialista

---

# Anti Patterns

❌ Layout estilo loja popular

❌ Banners piscando

❌ Promoções exageradas

❌ Muitos cards pequenos

❌ Carrosséis automáticos

❌ Fotos de baixa qualidade

❌ Estoque e depósito como destaque

❌ Excesso de cores

❌ Fontes decorativas demais

❌ Elementos que lembrem marketplace

---

# Style Formula

30% Arquitetura

30% Design de interiores

20% Lifestyle

20% Revestimentos

Nunca inverter essa proporção.

A MorARIs vende transformação, não produto.
