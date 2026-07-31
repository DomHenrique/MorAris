## MODIFIED Requirements

### Requirement: Gestão de produtos no Django Admin
O administrador SHALL ter controle sobre a visibilidade de preço de cada produto diretamente na listagem do Django Admin.

#### Scenario: Campo sob_consulta editável na listagem
- **WHEN** o administrador acessa a listagem de produtos no Django Admin
- **THEN** as colunas `price` e `sob_consulta` são exibidas e editáveis diretamente na tabela (`list_editable`)

#### Scenario: Filtro por sob_consulta
- **WHEN** o administrador deseja encontrar produtos sem preço visível
- **THEN** o filtro lateral inclui a opção "Sob Consulta" para filtrar produtos marcados

#### Scenario: Edição rápida de preço
- **WHEN** o administrador altera o preço de um produto diretamente na listagem e clica "Save"
- **THEN** o novo preço é salvo e refletido imediatamente no frontend
