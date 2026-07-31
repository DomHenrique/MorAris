## 1. Modelo e Migration

- [x] 1.1 Adicionar campo `sob_consulta = BooleanField("Sob Consulta", default=False)` ao modelo `Product` em `core/models.py`
- [x] 1.2 Gerar e aplicar migration (`makemigrations` + `migrate`)

## 2. Django Admin

- [x] 2.1 Adicionar `price` e `sob_consulta` ao `list_display` do `ProductAdmin`
- [x] 2.2 Adicionar `price` e `sob_consulta` ao `list_editable` do `ProductAdmin`
- [x] 2.3 Adicionar `sob_consulta` ao `list_filter` do `ProductAdmin`

## 3. Templates — Bloco de Preço

- [x] 3.1 Adicionar bloco de preço condicional nos cards de destaque em `home.html`
- [x] 3.2 Adicionar bloco de preço condicional nos cards de `category_detail.html`
- [x] 3.3 Adicionar bloco de preço na página de `product_detail.html`

## 4. CSS — Estilos de Preço

- [x] 4.1 Adicionar classes `.product-price-old` (riscado), `.product-price-current` (destaque) e `.product-price-consult` (badge "Sob Consulta") em `style.css`

## 5. Verificação e Deploy

- [x] 5.1 Executar `manage.py check` e `collectstatic`
- [x] 5.2 Commit e push para `origin/main`
