## Why

A MorARIs Revestimentos necessita de uma plataforma digital institucional sofisticada para exibir suas coleções de porcelanatos e acabamentos. O sistema deve transmitir a estética "Warm Contemporary Luxury", oferecendo um catálogo focado em inspirar o design de interiores, sem características agressivas de varejo comum. A solução precisa ser de fácil administração para os donos, com suporte completo e otimizado a imagens separadas para Desktop e Mobile.

## What Changes

- Criação de um projeto Django modular (apps `core` e `empresa`).
- Definição dos modelos de banco de dados (`Campaign`, `Banner`, `Testimonial`, `Category`, `Product`, `ProductImage`, `Unidade`).
- Adição dos campos `mobile_image` e `mobile_photo` a todos os modelos que carregam mídia, garantindo uso apropriado no Front-end via elemento `<picture>`.
- Integração do painel administrativo Django com a biblioteca `django-jazzmin` (tema `darkly`), contendo as regras de exibição e SEO.
- Definição de uma stack simples e focada em facilidade de manutenção, usando exclusivamente o banco de dados SQLite nativo do Django (sem PostgreSQL, Docker ou serviços complexos).
- Implementação dos templates Front-end base e Home aplicando a paleta "Warm Contemporary Luxury" do Design System da MorARIs, usando Bootstrap 5.3.

## Capabilities

### New Capabilities
- `catalog-management`: Gerenciamento de Produtos, Categorias e Galerias de Imagem, voltado à exposição de revestimentos.
- `institutional-content`: Gerenciamento de Banners rotativos, Depoimentos, Campanhas temporárias e Cadastro de Showrooms/Unidades.
- `responsive-media`: Suporte nativo à exibição de imagens em resoluções independentes (Desktop e Mobile) com fallback para `<picture>`.

### Modified Capabilities
- (Nenhuma alteração de comportamento em features preexistentes, trata-se de um projeto novo)

## Impact

Este projeto será a base arquitetural (Back-end e Infra) e de Design de Interface para a marca MorARIs. Afetará o roteamento de URL, uso de banco de dados (focado inteiramente em SQLite para garantir simplicidade e ausência de dependências externas), e a entrega estática (templates DTL + arquivos media estáticos).
