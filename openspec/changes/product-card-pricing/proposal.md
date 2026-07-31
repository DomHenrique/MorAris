## Why

Os cards de produto da MorARIs atualmente não exibem preço em nenhum local do site (home, categorias, detalhe). O modelo `Product` já possui os campos `price` e `promotional_price`, mas eles não são renderizados nos templates. Além disso, não existe uma forma de o administrador marcar um produto como "Sob Consulta" para ocultar o preço explicitamente no frontend — padrão já validado e em produção no projeto lp-kastello.

## What Changes

- **Novo campo `sob_consulta`**: Adicionar um `BooleanField` no modelo `Product` que, quando marcado, exibe "Sob Consulta" no lugar do preço no site.
- **Exibição de preço nos cards**: Renderizar preço nos cards de produto em `home.html`, `category_detail.html` e `product_detail.html` com 3 cenários:
  - `sob_consulta=True` ou `price=null` → exibe "Sob Consulta"
  - `promotional_price` preenchido → exibe preço original riscado + preço promocional em destaque
  - Apenas `price` preenchido → exibe preço normal com unidade de medida (`/m²`)
- **Admin editável**: Adicionar `price` e `sob_consulta` como colunas editáveis diretamente na listagem de produtos do Django Admin (`list_editable`), seguindo o padrão do lp-kastello.

## Capabilities

### New Capabilities
- `product-card-pricing`: Exibição condicional de preço nos cards de produto com suporte a "Sob Consulta", preço promocional com riscado, e preço regular com unidade de medida.

### Modified Capabilities
- `catalog-management`: O modelo `Product` recebe o novo campo `sob_consulta` e o admin ganha edição inline de preço/consulta na listagem.

## Impact

- **Model**: `core/models.py` — novo campo `sob_consulta` no `Product` + nova migration.
- **Admin**: `core/admin.py` — `list_display` e `list_editable` atualizados no `ProductAdmin`.
- **Templates**: `core/templates/core/home.html`, `category_detail.html`, `product_detail.html` — adição de bloco de preço nos cards.
- **CSS**: `static/css/style.css` — estilos para preço riscado, preço destaque e badge "Sob Consulta".
