## Context

A exibição de preços de produtos no catálogo online precisa suportar informações de parcelamento sem juros. O painel administrativo foi recentemente reconstruído utilizando uma abordagem SSR com Django e TailwindCSS. O modelo `Product` atual no app `core` suporta preço base (`price`), preço promocional (`promotional_price`) e modo de exibição genérico (`sob_consulta`).

## Goals / Non-Goals

**Goals:**
- Adicionar ao modelo `Product` a definição de quantas parcelas são permitidas (ex: 12x).
- Controlar a estratégia de exibição via banco de dados (`price_display_mode`), permitindo que a equipe de marketing dite como cada produto apresenta seu valor no catálogo.
- Adaptar o painel (`/painel/produtos/`) para a gerência desses novos campos.

**Non-Goals:**
- **Juros e Taxas**: O cálculo não englobará juros compostos ou simples. Adotaremos apenas a divisão exata: `(Preço / Número de Parcelas)`.
- Parcelamento de Carrinho/Checkout: Esta alteração diz respeito apenas à exibição (vitrine) e apresentação comercial do produto individualmente, não afetando lógicas de checkout, já que a plataforma atual atua como um catálogo/orçamento via WhatsApp.

## Decisions

1. **Schema no Banco de Dados (`Product`)**:
   - `max_installments` (IntegerField): default 1 (sem parcelamento visível).
   - `price_display_mode` (CharField): choices `[('total', 'Mostrar apenas Total'), ('installment', 'Mostrar apenas Parcela'), ('both', 'Mostrar Total e Parcela')]`, default `'total'`.

2. **Lógica de Cálculo (Backend/Templates)**:
   - Será adicionado um `@property` no modelo `Product` chamado `installment_value`, que calculará de forma segura: `(promotional_price or price) / max_installments` quando `max_installments > 0`.
   - Isso evita cálculos repetidos no Jinja2 do Frontend, simplificando a lógica de exibição nos cards.

## Risks / Trade-offs

- **Risk: Conflito com flag "Sob Consulta"** → Mitigation: Na renderização do template, a verificação `if product.sob_consulta:` continuará sendo a prioridade zero. Se for verdadeiro, as configurações de parcelamento são ignoradas.
- **Risk: Divisão por Zero** → Mitigation: O getter da property de cálculo deve retornar None se `max_installments` for igual ou menor que zero.
