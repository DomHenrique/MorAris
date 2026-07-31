## Why

A área administrativa atual do MorARIs possui um visual genérico do Django/Jazzmin. Para elevar a percepção de valor e alinhar a experiência do usuário à identidade visual premium da marca GRIDD MKT 360, precisamos reformular a interface gráfica do Admin (botões, ícones, cores, tabelas e tipografia), sem alterar o escopo funcional ou adicionar widgets de dashboard complexos.

## What Changes

- **Identidade Visual GRIDD MKT 360**: Aplicação da paleta de cores oficial (Azul Noturno Escuro `#0A0A32` como fundo, Laranja Vibrante `#FF7A1A` / `#FF512F` em gradientes para botões e destaques, e cartões de vidro *glassmorphism*).
- **Iconografia Remix Icon**: Substituição dos ícones padrão por ícones da biblioteca **Remix Icon** (`ri-*`).
- **Sidebar Vertical com Botões Empilhados**: Reestruturação da barra lateral com ícones empilhados acima dos rótulos em caixa alta (`VISÃO GERAL`, `PRODUTOS`, `CATEGORIAS`, `EMPRESAS`, `USUÁRIOS`), com estado ativo em pill laranja com brilho (*glow*).
- **Estilização de Tabelas e Formulários**: Tabelas em formato dark com bordas translúcidas, hover destacado em linhas, badges de status estilizados (*pill*) e formulários com foco neon nas caixas de texto.
- **Header e Barra Superior**: Header com fundo azul noturno fosco (`backdrop-filter`), indicador de status online e perfil do usuário refinado.

## Capabilities

### New Capabilities
- `admin-ui-gridd-theme`: Estilização visual completa do Django Admin utilizando a marca GRIDD MKT 360 e Remix Icon.

### Modified Capabilities
*(Nenhuma especificação funcional existente de produto ou empresa foi alterada.)*

## Impact

- **Front-end Admin**: Sobrescrita de estilos em `static/admin/css/custom_admin.css` e importação do CDN Remix Icon.
- **Configurações Django Admin**: Atualização de `moraris/settings.py` (`JAZZMIN_SETTINGS` e `JAZZMIN_UI_TWEAKS`).
- **Templates**: Possível sobrescrita local de templates do Jazzmin/Admin se necessário para o layout da sidebar.
