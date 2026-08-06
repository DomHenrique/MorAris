## Why

Os clientes precisam da opção de visualizar produtos com preços parcelados para melhorar a experiência no catálogo online e incentivar conversões. Além disso, os administradores da plataforma precisam de controle sobre como esse preço será exibido (apenas o valor total, apenas o valor da parcela, ou ambos) para alinhar a exibição do produto com suas estratégias de marketing.

## What Changes

- Adição do campo `max_installments` (Máx. Parcelas) no modelo `Product` no app `core`. O cálculo de parcelas será feito via divisão simples (sem juros).
- Adição do campo `price_display_mode` (Modo de Exibição de Preço) no modelo `Product` com as opções: 'total', 'installment', e 'both'.
- Atualização do painel administrativo (template `produtos/form.html` e `painel/forms.py`) para permitir o preenchimento destes novos campos.
- Atualização da camada de visualização no Frontend para calcular o valor da parcela e exibi-lo corretamente conforme o modo de exibição configurado no produto.

## Capabilities

### New Capabilities
- `product-installments`: Define as regras de negócio para salvar e apresentar opções de parcelamento de produtos.

### Modified Capabilities
- N/A

## Impact

- **Banco de Dados (Models):** Adição de dois novos campos no `core.models.Product` (requer migrações de banco de dados).
- **Painel Admin:** Interface de cadastro de Produtos atualizada.
- **Site (Frontend):** Templates que listam preços dos produtos (ex. Home, Detalhes de Produto) terão sua lógica expandida para incluir os novos cenários de precificação.
