## ADDED Requirements

### Requirement: Exibição condicional de preço no card de produto
O sistema SHALL exibir informações de preço nos cards de produto com lógica condicional baseada nos campos `sob_consulta`, `price` e `promotional_price`.

#### Scenario: Produto marcado como Sob Consulta
- **WHEN** o campo `sob_consulta` do produto é `True`
- **THEN** o card exibe o texto "Sob Consulta" no lugar do preço, sem exibir valor monetário

#### Scenario: Produto sem preço definido
- **WHEN** o campo `price` do produto é `null` e `sob_consulta` é `False`
- **THEN** o card exibe o texto "Sob Consulta" no lugar do preço

#### Scenario: Produto com preço promocional
- **WHEN** o produto possui `price` e `promotional_price` preenchidos e `sob_consulta` é `False`
- **THEN** o card exibe o preço original riscado e o preço promocional em destaque, ambos com a unidade de medida do produto

#### Scenario: Produto com preço regular
- **WHEN** o produto possui apenas `price` preenchido (sem `promotional_price`) e `sob_consulta` é `False`
- **THEN** o card exibe o preço no formato "R$ XX,XX" seguido da unidade de medida (ex: "/m²")

### Requirement: Preço visível em todas as superfícies de listagem
O sistema SHALL renderizar o bloco de preço de forma consistente em todas as páginas que exibem cards de produto.

#### Scenario: Cards na home (destaques)
- **WHEN** a home exibe os produtos em destaque no carrossel
- **THEN** cada card inclui o bloco de preço abaixo do nome do produto

#### Scenario: Cards na listagem por categoria
- **WHEN** o usuário navega para uma página de categoria
- **THEN** cada card de produto na grade inclui o bloco de preço

#### Scenario: Página de detalhe do produto
- **WHEN** o usuário acessa a página de detalhe de um produto
- **THEN** a seção de informações exibe o bloco de preço acima do botão "Falar com Especialista"
