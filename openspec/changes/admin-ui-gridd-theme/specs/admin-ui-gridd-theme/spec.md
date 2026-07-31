## ADDED Requirements

### Requirement: Visual Redesign com Identidade GRIDD MKT 360
O painel administrativo do MorARIs DEVE utilizar a paleta de cores e o estilo da marca GRIDD MKT 360, apresentando fundo azul noturno (`#0A0A32`), destaques e botões em gradiente laranja vibrante (`#FF7A1A` / `#FF512F`) e cartões em formato glassmorphism.

#### Scenario: Visualização do Painel Administrativo
- **WHEN** o administrador acessa qualquer página do Django Admin
- **THEN** a página exibe o tema escuro noturno com detalhes em laranja e azul da GRIDD MKT 360

### Requirement: Iconografia Remix Icon
O painel DEVE carregar e utilizar os ícones da biblioteca Remix Icon (`ri-*`) na navegação lateral, botões de ação e listas.

#### Scenario: Exibição de ícones Remix Icon na barra lateral
- **WHEN** o administrador visualiza o menu de navegação lateral
- **THEN** cada item exibe um ícone da biblioteca Remix Icon alinhado ao tema

### Requirement: Layout da Sidebar com Ícones Empilhados
Os botões do menu lateral DEVEM ser apresentados com o ícone posicionado acima do rótulo de texto em caixa alta.

#### Scenario: Seleção de item na barra lateral
- **WHEN** o administrador passa o mouse ou clica em um item da barra lateral
- **THEN** o item exibe um efeito de foco em formato de pílula laranja com brilho (*glow*) e fundo destacado
