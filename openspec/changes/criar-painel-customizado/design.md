## Context

O projeto Moraris possui as entidades necessárias para o site (Produtos, Categorias, Banners, Depoimentos, Marcas, Dados da Empresa) e atualmente usa o Django Admin padrão para a gestão de dados. O objetivo é substituir a interface administrativa para ficar visualmente idêntica à do projeto "kastelo-lite", que possui um painel em HTML/Tailwind altamente polido e premium.

## Goals / Non-Goals

**Goals:**
- Prover uma interface administrativa de altíssima qualidade (Tailwind CSS) idêntica ao Kastelo Lite.
- Manter a segurança e robustez do Django (Server-Side Rendering, formulários, validação, CSRF).
- Reutilizar os modelos e o banco de dados (SQLite) já existentes no projeto Moraris.

**Non-Goals:**
- Mudar o frontend voltado para o cliente (site público).
- Criar uma API RESTful completa (não vamos criar uma SPA real em React/Vue, usaremos Django Templates + Tailwind para simular a SPA do Kastelo).

## Decisions

**1. Abordagem Híbrida (SSR com Django Templates + Tailwind CSS)**
- *Rationale*: O Kastelo Lite usa uma abordagem puramente client-side (Javascript chamando Supabase). No Moraris, para manter as vantagens do ecossistema Django, usaremos os arquivos estáticos (HTML/CSS) do Kastelo Lite mas os transformaremos em templates do Django (`.html`).
- *Alternativas*: Criar uma API DRF (Django REST Framework) e usar os scripts JS originais do Kastelo. Rejeitado pois adiciona complexidade desnecessária (Autenticação JWT, serializers) para um projeto monolítico, e o Django Admin forms lida muito melhor com uploads de imagem de forma nativa.

**2. Novo App: `painel`**
- *Rationale*: Criar um app Django isolado (ex: `python manage.py startapp painel`) para agrupar todas as URLs, views e forms relacionados à nova área administrativa, mantendo o `core` focado no site público.

**3. Autenticação**
- *Rationale*: Usaremos o `django.contrib.auth` com o decorator `@login_required` (e possivelmente `@user_passes_test(lambda u: u.is_staff)`) para proteger as rotas do `/painel/`. O formulário de login será customizado usando a tela de login do Kastelo Lite.

## Risks / Trade-offs

- **[Risco] Upload de Múltiplas Imagens via Formulário Clássico** → *Mitigação*: Para os Produtos que têm múltiplas imagens (`ProductImage`), o Kastelo Lite pode ter um upload assíncrono. Adaptaremos para usar `inlineformset_factory` do Django, ou requisições AJAX (`fetch`) se a experiência precisar ser 100% idêntica, mas priorizando forms do Django.
- **[Risco] Atualizações nos modelos do `core`** → *Mitigação*: Como as views do painel dependerão diretamente dos formulários, qualquer mudança futura no `core.models` precisará ser refletida nos templates HTML do `painel`.
