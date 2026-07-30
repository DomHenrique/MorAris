## 1. Estilização CSS do Admin (Zoom no Hover)

- [x] 1.1 Criar ou atualizar arquivo de estilos do admin em `static/admin/css/custom_admin.css` com a classe `.admin-thumb-hover`
- [x] 1.2 Injetar o arquivo CSS customizado no `ModelAdmin` via classe `Media` ou `format_html`

## 2. Configuração do BannerAdmin

- [x] 2.1 Implementar métodos `desktop_preview` e `mobile_preview` em `BannerAdmin` no arquivo `core/admin.py`
- [x] 2.2 Atualizar `list_display` de `BannerAdmin` para exibir ambas as miniaturas com a classe `.admin-thumb-hover`

## 3. Configuração do ProductAdmin e ProductImageInline

- [x] 3.1 Adicionar método `image_thumbnail` em `ProductImageInline` no `core/admin.py`
- [x] 3.2 Incluir `image_thumbnail` em `readonly_fields` e `fields` do `ProductImageInline`
- [x] 3.3 Aumentar o tamanho do `image_preview` no `ProductAdmin` para 64x64px com borda arredondada

## 4. Validação e Teste

- [x] 4.1 Rodar `collectstatic` e testar a exibição no Django Admin
- [x] 4.2 Commit e push das alterações para o repositório
