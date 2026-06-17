## Context

O ambiente de produção e homologação estará em uma VPS gerenciada via Traefik. O container da aplicação (Django) será volátil. O volume contendo SQLite e imagens locais é um ponto fraco (se corromper ou em deploy, perde-se tudo). O Supabase fornece um pacote completo em sua cota free para contornar isso com PostgreSQL robusto e S3 Storage.

## Goals / Non-Goals

**Goals:**
- Configurar Postgres como o DB backend usando `dj-database-url` buscando a variável `DATABASE_URL`.
- Configurar S3 para mídia quando `USE_SUPABASE_STORAGE=True` usando as variáveis do `docker-compose.yaml` (Ex: `AWS_ACCESS_KEY_ID`, `AWS_STORAGE_BUCKET_NAME=moraris`).
- Manter o fallback para desenvolvimento local com SQLite e pasta `media/` caso a flag `DATABASE_URL` não seja provida e `USE_SUPABASE_STORAGE` seja `False`.

**Non-Goals:**
- Não iremos refatorar modelos. Os diretórios criados pelos parâmetros `upload_to` (ex: `banners/`, `products/`) gerarão automaticamente pastas lógicas dentro do bucket `moraris` no Supabase, preservando toda a arquitetura de informação já desenhada de forma limpa.

## Decisions

- **S3 Boto3 API via django-storages:** 
  - *Rationale:* O Supabase Storage fornece compatibilidade nativa com a API do S3 da Amazon. Usar o pacote padrão de indústria `django-storages` e `boto3` garante suporte e confiabilidade.
  - *Fallback:* Em dev local (`DEBUG=True`), continuaremos com `FileSystemStorage`.
- **db.sqlite3 vs PostgreSQL:** 
  - *Rationale:* `dj-database-url` permite que uma string injetada `postgres://...` modifique perfeitamente a engine no Django, ou realize fallback para `sqlite:////...` se necessário.

## Risks / Trade-offs

- **Risk:** Latência de conexão do servidor web com o banco remoto (Supabase) vs banco local (SQLite).
  - *Mitigation:* A infraestrutura de Postgres costuma lidar com latências razoáveis de forma eficiente, e em nossa carga (institucional) isso é imperceptível, com os benefícios de segurança superando de longe a perda de milissegundos.
