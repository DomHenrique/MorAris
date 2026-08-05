## Why

O projeto Moraris atualmente gerencia seu conteúdo através do admin padrão do Django. Precisamos atualizar o projeto para ter uma área administrativa customizada com visual e funcionalidades idênticas à do projeto `kastelo-lite` (baseado em Tailwind CSS), oferecendo uma experiência premium, moderna e mais alinhada à identidade visual da marca.

## What Changes

- Criação de um novo app Django (ex: `painel`) dedicado exclusivamente à nova área administrativa.
- Divisão do HTML estático do `kastelo-lite` em um sistema de templates reutilizáveis do Django (ex: `base_admin.html`, `_sidebar.html`).
- Criação de **Django Views** (SSR) e **ModelForms** para substituir a lógica de comunicação via Javascript/Supabase.
- Implementação de views para gestão de:
  - Produtos e Categorias (Catálogo)
  - Banners e Campanhas (Marketing)
  - Depoimentos e Marcas Parceiras (Marketing)
  - Dados da Empresa e Unidades (Institucional)
- Configuração de autenticação segura usando o sistema nativo do Django (`@login_required`) para restringir o acesso ao painel.

## Capabilities

### New Capabilities
- `painel-administrativo`: Gestão centralizada do conteúdo do site usando uma interface customizada em Tailwind CSS renderizada no backend via Django (SSR).

### Modified Capabilities
- `catalog-management`: A interface de gerenciamento de produtos e categorias migra do Admin padrão para o novo painel customizado.
- `sobre-empresa`: A interface de gerenciamento dos dados da empresa migra do Admin padrão para o novo painel.
- `marcas`: A interface de gerenciamento das marcas parceiras migra do Admin padrão para o novo painel.
- `institutional-content`: A interface de gerenciamento de banners, campanhas e depoimentos migra para o novo painel.

## Impact

- **Código Afetado:** Criação de um novo app Django (`painel`), inclusão de novas URLs globais (`/painel/`) e novos arquivos de template e estáticos (Tailwind CSS do Kastelo).
- **Semântica:** O site público não sofre alterações no funcionamento, apenas as ferramentas internas de gestão mudam.
- **Segurança:** O painel utilizará a proteção de rotas nativa do Django.
