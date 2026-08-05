## ADDED Requirements

### Requirement: Configuração de parcelamento no painel
O administrador DEVE poder definir o número máximo de parcelas permitidas para um produto e escolher a estratégia visual de exibição do preço.

#### Scenario: Edição de Produto via Painel
- **WHEN** o administrador edita um Produto no painel
- **THEN** ele pode preencher o campo "Máx. Parcelas" com um número inteiro
- **THEN** ele pode escolher o "Modo de Exibição de Preço" entre: "Apenas Total", "Apenas Parcela" ou "Total e Parcela".

### Requirement: Cálculo de Parcela sem Juros
O sistema DEVE calcular o valor da parcela usando uma divisão simples do valor final do produto (sem juros) sempre que o número de parcelas for maior que 1. Se o produto possuir `promotional_price`, este valor DEVE ser priorizado sobre o `price` base no cálculo.

#### Scenario: Produto apenas com Preço Base
- **WHEN** um produto tem preço de R$ 1.000,00 e "Máx. Parcelas" configurado para 10
- **THEN** o valor da parcela calculado DEVE ser R$ 100,00.

#### Scenario: Produto com Preço Promocional
- **WHEN** um produto tem preço base R$ 1.000,00, preço promocional R$ 800,00 e "Máx. Parcelas" configurado para 10
- **THEN** o valor da parcela calculado DEVE ser R$ 80,00.

### Requirement: Renderização baseada no Modo de Exibição
O catálogo e a página do produto DEVEM renderizar o preço de acordo com a opção escolhida no `price_display_mode`, contanto que a flag `sob_consulta` seja falsa.

#### Scenario: Exibição Apenas Total
- **WHEN** o modo configurado é "total"
- **THEN** a interface exibe o valor final integralmente e oculta o valor parcelado.

#### Scenario: Exibição Apenas Parcela
- **WHEN** o modo configurado é "installment"
- **THEN** a interface exibe apenas "10x de R$ X,XX" e oculta o valor total.

#### Scenario: Exibição Combinada (Total e Parcela)
- **WHEN** o modo configurado é "both"
- **THEN** a interface exibe tanto o valor total quanto o valor parcelado ("R$ Y,YY ou 10x de R$ X,XX").
