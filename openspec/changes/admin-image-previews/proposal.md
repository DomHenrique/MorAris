## Why

Atualmente o painel administrativo do Django (`/admin`) exibe thumbnails muito pequenos (50px) para Banners e não exibe a pré-visualização das fotos na galeria de produtos (`ProductImageInline`). Isso dificulta a conferência dos criativos (Desktop e Mobile) pelos administradores antes de salvar ou publicar.

## What Changes

- **Previews Duplos para Banners (`BannerAdmin`)**: Exibição simultânea das miniaturas das imagens versão Desktop e versão Mobile na tabela de listagem do Admin.
- **Preview de Imagens da Galeria de Produtos (`ProductImageInline`)**: Adição de coluna de pré-visualização (thumbnail de 80x80px) diretamente no formulário inline de fotos adicionais dos produtos.
- **Efeito Zoom (Hover Magnifier) Global no Admin**: Inclusão de estilos CSS no Admin para que passar o cursor sobre qualquer miniatura de imagem amplie o criativo instantaneamente (efeito lupa suave).
- **Aumento do Tamanho Padrão das Miniaturas**: Aumento de 50px para 64px com cantos arredondados e sombra sutil para melhor visibilidade na listagem de produtos.

## Capabilities

### New Capabilities
- `admin-image-previews`: Visualização aprimorada de criativos, banners e miniaturas de produtos no Django Admin com zoom no hover.

### Modified Capabilities

## Impact

- Afeta `core/admin.py` (configuração das classes `BannerAdmin`, `ProductAdmin`, `ProductImageInline`).
- Injeta arquivos/estilos estáticos no Django Admin (`admin/css/custom_admin.css`).
- Nenhuma alteração de esquema de banco de dados necessária.
