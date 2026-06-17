## Context

A exibição estática atual de marcas pode poluir a interface se o número de logos for alto. Transformá-la em um letreiro animado ("marquee") melhora o visual.

## Goals / Non-Goals

**Goals:**
- Implementar um carrossel em loop infinito usando puro CSS.
- Não introduzir novas dependências de biblioteca Javascript.
- Pausar o loop no "hover" do mouse.

**Non-Goals:**
- Fazer a rolagem ser interativa (ex: arrastar e puxar) para mobile (isso exigiria bibliotecas pesadas).

## Decisions

**1. CSS Keyframe Animation**
Utilizaremos CSS Puro em vez de Javascript (ex: Slick, Swiper). 
- *Rationale*: Mais leve, carrega instantaneamente.

**2. O Truque da Duplicação no DOM**
Renderizaremos o mesmo grupo de marcas duas vezes na tela, uma atrás da outra. A animação irá transladar (translateX) o grupo de 0 a -50%.
- *Rationale*: Quando a animação atinge -50%, a segunda cópia idêntica está na exata posição inicial. Ao reiniciar a animação para 0% o usuário não percebe o pulo, resultando em um loop imperceptível.

## Risks / Trade-offs

- **Risk**: Desempenho no celular se as imagens forem pesadas.
- **Mitigation**: Certificar-se que os logos tenham altura fixa restrita e largura redimensionável. Não faremos upload de banners pesados nesse local.
