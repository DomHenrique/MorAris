## 1. Setup & Configuração Inicial

- [x] 1.1 Criar o novo app Django chamado `painel`
- [x] 1.2 Registrar o app `painel` no `settings.py` do projeto
- [x] 1.3 Configurar as URLs base do app em `moraris/urls.py` e `painel/urls.py`
- [x] 1.4 Configurar restrição de acesso global para as rotas do painel (`@login_required`)

## 2. Assets e Templates Base

- [x] 2.1 Copiar os arquivos estáticos (Tailwind CSS, JS) do `kastelo-lite` para o `static` do app `painel`
- [x] 2.2 Criar `base_admin.html` utilizando o layout principal do `kastelo-lite`
- [x] 2.3 Criar sub-templates (includes) para `_sidebar.html` e `_topbar.html`
- [x] 2.4 Criar a tela de login customizada (`login.html`) integrada com o Auth do Django

## 3. Gestão de Catálogo (Views e Forms)

- [x] 3.1 Criar as views e forms para CRUD de Categorias (Listar, Adicionar, Editar, Excluir)
- [x] 3.2 Criar o template de Categorias adaptando o HTML do `kastelo-lite`
- [x] 3.3 Criar as views e forms para CRUD de Produtos (Listar, Adicionar, Editar, Excluir)
- [x] 3.4 Configurar o form de upload de múltiplas imagens do Produto
- [x] 3.5 Criar o template de Produtos adaptando o HTML do `kastelo-lite`

## 4. Gestão de Marketing (Views e Forms)

- [x] 4.1 Criar views, forms e template para CRUD de Banners/Campanhas
- [x] 4.2 Criar views, forms e template para CRUD de Depoimentos
- [x] 4.3 Criar views, forms e template para CRUD de Marcas Parceiras

## 5. Gestão Institucional (Views e Forms)

- [x] 5.1 Criar views, forms e template para editar os "Dados da Empresa" (`SobreEmpresa`)
- [x] 5.2 Criar views, forms e template para CRUD de Unidades/Showrooms

## 6. Revisão e Testes

- [x] 6.1 Ajustar navegação e rotas (Sidebar, links de voltar)
- [x] 6.2 Validar permissões e restrições de acesso (Staff Required)
- [x] 6.3 Realizar testes funcionais de CRUD nas novas views
- [x] 6.4 Validar se todos os formulários incluem `csrf_token`
- [x] 6.5 Testar uploads de imagens (se estão indo para os caminhos corretos de media)
- [x] 6.6 Testar navegação, responsividade e bloqueio de rotas para usuários anônimos
