## Context

O modelo `Product` já possui `price` (DecimalField, nullable) e `promotional_price` (DecimalField, nullable), além das properties `display_price` e `has_discount`. Porém nenhum template do site renderiza esses valores. O projeto lp-kastello já implementa esse padrão com sucesso usando um campo `sob_consulta` BooleanField + lógica condicional no template.

## Goals / Non-Goals

**Goals:**
- Permitir ao administrador controlar se um produto exibe preço ou "Sob Consulta" via checkbox no admin
- Exibir preço (com suporte a promoção/riscado) nos cards de produto em todas as superfícies: home, categoria e detalhe
- Manter edição rápida de preço e sob_consulta diretamente na listagem do admin (`list_editable`)

**Non-Goals:**
- Não implementar carrinho de compras ou e-commerce
- Não adicionar filtros por faixa de preço no frontend
- Não alterar a lógica de campanhas ou destaques existente

## Decisions

### 1. Campo `sob_consulta` explícito vs. inferir de `price=null`

**Decisão**: Adicionar `sob_consulta = BooleanField(default=False)` no modelo.

**Alternativa descartada**: Usar `price is None` como indicador automático.

**Razão**: Um produto pode ter preço de referência internamente (para controle de estoque/margem) mas ser exibido como "Sob Consulta" no site. O checkbox dá controle explícito ao administrador. Padrão já validado no lp-kastello.

### 2. Lógica de renderização no template (3 cenários)

**Decisão**: Usar lógica condicional idêntica ao lp-kastello:
```
{% if product.sob_consulta or not product.price %}
    → "Sob Consulta"
{% elif product.promotional_price %}
    → preço original riscado + preço promocional em destaque
{% else %}
    → preço normal + unidade de medida
{% endif %}
```

### 3. Estilos CSS no `style.css` existente vs. novo arquivo

**Decisão**: Adicionar classes de preço no `static/css/style.css` existente, junto às regras de `.product-card`.

**Razão**: Manter coesão — os estilos de card já estão nesse arquivo. Não justifica um arquivo separado.

## Risks / Trade-offs

- **Formatação de preço**: `DecimalField` exibe `85.00` por padrão. Será necessário usar o filtro `floatformat:2` do Django e formatar como `R$ XX,XX` via template filter ou `intcomma` do `django.contrib.humanize`. **Mitigação**: Usar `localize` ou template tag customizada para formato brasileiro.
- **Migration em produção**: Adicionar um `BooleanField(default=False)` é seguro — não exige downtime e todos os produtos existentes ficarão com `sob_consulta=False` (comportamento retrocompatível).
