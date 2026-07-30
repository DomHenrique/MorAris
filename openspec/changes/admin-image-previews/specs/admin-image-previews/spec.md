## ADDED Requirements

### Requirement: Exibição de Pré-visualização Dupla de Banners
O painel administrativo do Django SHALL exibir miniaturas da imagem Desktop e da imagem Mobile na listagem de banners (`BannerAdmin`).

#### Scenario: Visualização de banners na listagem
- **WHEN** o administrador acessa a listagem de Banners no Django Admin
- **THEN** a tabela exibe uma coluna para a imagem Desktop e outra para a imagem Mobile com previews legíveis

### Requirement: Pré-visualização de Fotos na Galeria de Produtos
O formulário de edição de produto SHALL exibir uma miniatura (thumbnail) de cada imagem já cadastrada na galeria inline (`ProductImageInline`).

#### Scenario: Edição de galeria de fotos do produto
- **WHEN** o administrador abre o formulário de edição de um Produto
- **THEN** cada linha do formulário inline de fotos exibe a miniatura correspondente da imagem cadastrada

### Requirement: Zoom Instantâneo no Hover de Miniaturas
O sistema SHALL ampliar a miniatura ao passar o cursor do mouse (hover) sobre qualquer foto no painel administrativo.

#### Scenario: Hover em miniaturas no painel administrativo
- **WHEN** o usuário passa o cursor sobre a miniatura de uma imagem na listagem ou formulário do Admin
- **THEN** a miniatura é ampliada com efeito de transição suave e sombra destacada
