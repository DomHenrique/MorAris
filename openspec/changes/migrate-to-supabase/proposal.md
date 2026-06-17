## Why

A aplicação foi inicialmente projetada para utilizar SQLite para persistência de dados e armazenamento local para a mídia (`media/`). No entanto, para suportar implantações conteinerizadas nativas na nuvem (usando Docker e Traefik), o aplicativo precisa se tornar "stateless" (sem estado). Mudar para PostgreSQL via Supabase para o banco de dados e Supabase S3 (Storage) para ativos de mídia garantirá que a aplicação seja escalável e as mídias fiquem seguras, além de usufruírem de uma CDN global.

## What Changes

- Atualizar dependências em `requirements.txt` adicionando `dj-database-url`, `psycopg2-binary`, `boto3` e `django-storages`.
- Atualizar as configurações em `moraris/settings.py` para usar PostgreSQL como banco de dados principal através de `dj-database-url`.
- Atualizar `moraris/settings.py` para injetar configurações do S3 (via Supabase Storage API) para upload e gerenciamento de arquivos usando o bucket `moraris` configurado.
- Definir que toda a mídia respeitará a divisão lógica que já foi arquitetada no modelo (`upload_to="banners/"`, etc.).

## Capabilities

### New Capabilities
Nenhuma (Mudança 100% de Infraestrutura/DevOps).

### Modified Capabilities
Nenhuma.

## Impact

- **Dependências:** Novas bibliotecas Python instaladas.
- **Banco de Dados:** O sistema deixará de tentar ler `db.sqlite3` em ambientes produtivos para buscar os dados remotamente no Supabase.
- **Armazenamento de Arquivos:** Mídia não será mais local no volume quando `USE_SUPABASE_STORAGE` estiver habilitado, mas apontará diretamente para a URL final via CDN.
