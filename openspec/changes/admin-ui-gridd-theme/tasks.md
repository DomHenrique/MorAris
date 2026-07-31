## 1. Configuração de Ícones e Marca em Settings

- [x] 1.1 Atualizar `JAZZMIN_SETTINGS` em `moraris/settings.py` associando os ícones da biblioteca Remix Icon (`ri-stack-line`, `ri-folders-line`, `ri-building-4-line`, `ri-user-settings-line`, etc.) aos models do projeto.
- [x] 1.2 Importar o CDN do Remix Icon v4.2.0 (`https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css`) no arquivo `static/admin/css/custom_admin.css`.

## 2. Refatoração Visual da Sidebar e Navegação

- [x] 2.1 Estilizar o layout vertical empilhado da barra lateral em `custom_admin.css` (ícone centralizado acima do rótulo do menu).
- [x] 2.2 Implementar os estados hover e ativo com o botão em pill com gradiente Laranja Gridd (`#FF7A1A` -> `#FF512F`) e efeito de brilho (*glow*).

## 3. Estilização Geral da Interface Administrativa

- [x] 3.1 Aplicar o fundo Noturno Dark (`#0A0A32` / `#00000A`) e containers glassmorphism (`backdrop-filter: blur(12px)`) com bordas translúcidas nas tabelas e cards.
- [x] 3.2 Estilizar botões de ação (`.btn-primary`, botões de salvar/excluir), badges de status e campos de formulário (com foco neon laranja).
- [x] 3.3 Garantir que o popover de imagem HD (`image_popover.js`) continue funcionando perfeitamente sobre as novas tabelas e listas.

## 4. Validação

- [x] 4.1 Testar visualmente a navegação e formulários do Django Admin no ambiente local e verificar a coerência visual com o Design System GRIDD MKT 360.
