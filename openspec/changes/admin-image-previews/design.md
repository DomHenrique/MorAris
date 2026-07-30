## Context

O Django Admin do projeto MorARIs exibe thumbnails de 50px para banners e não exibe a pré-visualização das fotos na galeria de produtos (`ProductImageInline`).

## Goals / Non-Goals

**Goals:**
- Exibir pré-visualizações das imagens Desktop e Mobile dos banners na listagem (`BannerAdmin`).
- Exibir miniatura da imagem (80x80px) em cada linha da galeria de produtos (`ProductImageInline`).
- Implementar efeito zoom no hover (lupa) via CSS no Admin.
- Padronizar miniaturas das listagens em 64x64px com bordas suaves.

**Non-Goals:**
- Não alterar schemas ou tabelas do banco de dados.

## Decisions

1. **Métodos Auxiliares em `BannerAdmin`**:
   - Criar `desktop_preview` e `mobile_preview` utilizando `format_html`.
2. **Coluna de Thumbnail no Inline `ProductImageInline`**:
   - Adicionar `readonly_fields = ('image_thumbnail',)` e incluir no `fields`.
3. **Estilização CSS Magnifier no Admin**:
   - Criar classe `.admin-thumb-hover` com transição `:hover { transform: scale(3.2); z-index: 999; }`.

## Risks / Trade-offs

- [Desempenho da página no Admin com muitas imagens] → Utilizar miniaturas com `object-fit: cover` e manter proporções leves.
