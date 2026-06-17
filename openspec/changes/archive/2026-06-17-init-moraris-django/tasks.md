## 1. Setup Infraestrutura & Projeto

- [x] 1.1 Criar `requirements.txt` com as dependências do projeto.
- [x] 1.2 Inicializar o projeto e arquivos focando exclusivamente em SQLite e ferramentas básicas do Django, sem arquiteturas com Docker.
- [x] 1.3 Criar `.env.example` padrão da aplicação (para chaves de API e secret key).
- [x] 1.4 Inicializar projeto Django (`moraris`) e criar os apps `core` e `empresa`.

## 2. Implementação dos Modelos (Banco de Dados)

- [x] 2.1 Codificar os modelos no `core/models.py` (Campaign, Banner, Testimonial, Category, Product, ProductImage) com os campos `mobile_image`.
- [x] 2.2 Codificar os modelos institucionais no `empresa/models.py` (Unidade).
- [x] 2.3 Executar `makemigrations` e `migrate` para estruturar o banco localmente.

## 3. Configurações Globais & Painel Administrativo

- [x] 3.1 Configurar o `settings.py` adicionando apps, estáticos, banco de dados (reforçando o uso exclusivo do nativo `db.sqlite3`) e o tema `darkly` no Jazzmin.
- [x] 3.2 Implementar classes de configuração visual no `core/admin.py` e `empresa/admin.py`.

## 4. Lógica de Views e Roteamento

- [x] 4.1 Criar as Class-Based Views (CBV) no `core/views.py` (HomeView, ProductListView, CategoryDetailView, ProductDetailView).
- [x] 4.2 Criar os arquivos `urls.py` do projeto raiz e do app `core`.

## 5. Front-end (Design System & Templates)

- [x] 5.1 Criar `static/css/style.css` refletindo as cores base do "Warm Contemporary Luxury".
- [x] 5.2 Criar template global `base.html` com Navbar e Footer imponente.
- [x] 5.3 Criar template da home (`home.html`) utilizando a tag HTML `<picture>` para injetar banners e imagens de produtos responsivas.
- [x] 5.4 Criar templates de listagem e detalhes de produtos e coleções.
