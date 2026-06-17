## Context

A MorARIs Revestimentos requer uma plataforma institucional para expor seu catálogo de maneira sofisticada. O histórico da loja de madeiras serviu como base funcional, mas o branding "Warm Contemporary Luxury" e a necessidade premente de renderização perfeita em desktop e mobile exigem ajustes estruturais focados em imagens híbridas e um stack moderno de banco de dados e UI (Bootstrap 5.3 com custom properties CSS). O site deve ser flexível o suficiente para que administradores gerenciem coleções sem código, usando um painel moderno (Jazzmin).

## Goals / Non-Goals

**Goals:**
- Implementar a arquitetura Back-end Django separada em apps `core` e `empresa`.
- Suportar nativamente upload e fallback de imagens para Desktop e Mobile em todos os recursos de mídia visual através da tag HTML `<picture>`.
- Manter a infraestrutura intencionalmente enxuta e fácil de gerenciar, usando estritamente o banco de dados nativo SQLite do Django.
- Aplicar o tema "Warm Contemporary" do Design System usando as variáveis customizadas sobre o Bootstrap 5.3.

**Non-Goals:**
- Não construir um e-commerce / carrinho de compras (foco institucional/leads).
- Não criar APIs Rest headless ou usar Single Page Applications complexas (SPA) para a interface do cliente final (uso de DTL é suficiente).
- Não aplicar a temática Dark padrão exigida em outros projetos, priorizando o Light/Warm do Design System específico da marca.

## Decisions

- **Arquitetura DTL + CBV**: Utilizar templates renderizados no lado servidor do Django (Class-Based Views) com Bootstrap 5.3 para priorizar SEO nativo e tempo de desenvolvimento ágil.
- **Armazenamento de Imagens Híbrido**: Em vez de depender exclusivamente de object-fit CSS que corta elementos cruciais da imagem no mobile, utilizaremos dois campos de imagem no modelo (ex: `image` e `mobile_image`). A responsabilidade do crop fica com o painel de admin, e a responsabilidade de entrega otimizada fica com o HTML `<picture>`.
- **Banco de Dados Exclusivamente SQLite**: Para manter a manutenção simples e seguir o princípio de "sem serviços externos desnecessários", usaremos exclusivamente o `db.sqlite3` em todo o ciclo de vida do projeto, garantindo máxima portabilidade e mínima complexidade.

## Risks / Trade-offs

- [Risk] O painel admin obriga o usuário a fazer upload de duas imagens (desktop e mobile), podendo gerar atrito para o cliente.
  → Mitigação: O campo `mobile_image` é configurado com `blank=True, null=True`. Os templates usarão lógica if/else para fazer fallback suave à imagem desktop caso a mobile não seja preenchida.
- [Risk] O uso exclusivo de SQLite pode ser limitante se o site tiver picos gigantescos de tráfego concorrente em write.
  → Mitigação: O projeto é institucional e de catálogo, com leitura pesada e pouca gravação (majoritariamente atualizações de conteúdo pelo painel admin por poucas pessoas). O SQLite lida perfeitamente com esse volume na arquitetura Django moderna.
