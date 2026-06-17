## 1. Atualização de Dependências
- [x] 1.1 Editar `requirements.txt` adicionando: `psycopg2-binary`, `dj-database-url`, `django-storages`, `boto3`.

## 2. Configuração do Settings.py
- [x] 2.1 Adicionar a leitura e configuração de `DATABASES` usando `dj-database-url`.
- [x] 2.2 Configurar o bloco de Storage. Adicionar lógica: se `USE_SUPABASE_STORAGE == 'True'`, setar `DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'` e definir as constantes (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_STORAGE_BUCKET_NAME`, `AWS_S3_ENDPOINT_URL`, etc).

## 3. Env e Validações
- [x] 3.1 Atualizar o `.env.example` para incluir exemplos reais da connection string do Postgres do Supabase e as chaves de acesso do S3 API do Supabase (Bucket: `moraris`).
