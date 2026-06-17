## Why

A seção "Marcas em Destaque" atualmente exibe as marcas de forma estática (em um contêiner flex wrap). O usuário aprovou a ideia de transformá-la em um letreiro digital contínuo (marquee) em loop infinito. Isso adicionará dinamismo à home do site, aproveitando o espaço de tela para mostrar mais marcas através de uma animação suave e contínua feita puramente com CSS.

## What Changes

- Transformação do contêiner flex estático em um contêiner "marquee" ocultando o "overflow".
- Criação do CSS para a animação "scroll-left", permitindo translação em -50%.
- Duplicação dos elementos do loop `{% for marca in marcas_destaque %}` no template HTML para garantir que o carrossel reinicie de forma transparente.
- Adição da ação `hover` para pausar a animação (opcional mas melhora usabilidade).

## Capabilities

### New Capabilities
Nenhuma.

### Modified Capabilities
- `marcas`: O requisito do frontend que falava de "horizontal carousel" agora é especificamente "infinite CSS marquee". 

## Impact

- **Templates:** `core/templates/core/home.html` receberá classes css novas e HTML duplicado para o slider contínuo.
- **CSS:** `core/static/css/style.css` receberá o `@keyframes` e as classes responsáveis pelo loop contínuo e ocultação do overflow.
- **Performance:** Nenhuma biblioteca Javascript nova (impacto zero), resolvido via motor CSS.
