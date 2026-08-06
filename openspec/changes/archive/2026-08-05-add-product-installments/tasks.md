## 1. Banco de Dados e Modelagem

- [x] 1.1 Adicionar os campos `max_installments` e `price_display_mode` no modelo `Product` em `core/models.py`.
- [x] 1.2 Implementar a propriedade `@property` `installment_value` no modelo `Product` para realizar o cálculo matemático da divisão.
- [x] 1.3 Gerar o arquivo de migração do Django (`python manage.py makemigrations`) e aplicar no banco (`python manage.py migrate`).

## 2. Painel Administrativo

- [x] 2.1 Adicionar `max_installments` e `price_display_mode` na lista de `fields` e `widgets` do `ProductForm` em `painel/forms.py`.
- [x] 2.2 Atualizar o template `painel/templates/painel/produtos/form.html` para exibir esses campos visualmente de forma agradável, próximos aos inputs de Preço.

## 3. Vitrine / Frontend

- [x] 3.1 Mapear os locais no template público onde os preços dos produtos são exibidos (provavelmente `_product_card.html` ou na listagem da categoria/home).
- [x] 3.2 Inserir a lógica de Jinja para checar o `price_display_mode` e renderizar o preço de acordo com a opção escolhida ('total', 'installment', 'both').
- [x] 3.3 Replicar essa lógica de exibição de preço para a página de Detalhes do Produto, se for um template separado.
