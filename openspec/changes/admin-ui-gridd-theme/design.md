## Context

A interface administrativa do Django (Jazzmin) atualmente utiliza o tema padrão `darkly` sem padronização com os elementos de marca da GRIDD MKT 360 (que gerencia e opera a infraestrutura). O cliente deseja alinhar a área administrativa com o design system da GRIDD MKT 360, focando no refinamento estético de botões, ícones, tabelas e tipografia, utilizando a biblioteca Remix Icon.

## Goals / Non-Goals

**Goals:**
- Implementar o tema visual GRIDD MKT 360 na interface administrativa do MorARIs.
- Integrar a biblioteca **Remix Icon** (`ri-*`) nos botões, navegação lateral e ações da interface.
- Reformular a barra lateral (Sidebar) com ícones empilhados em formato vertical minimalista (Ícone em destaque + texto em caixa alta abaixo).
- Estilizar tabelas, filtros, formulários, botões primários/secundários e badges de status com efeito *glassmorphism* e tom Azul Noturno + Laranja Gridd.
- Manter total compatibilidade com o recurso de visualização de imagem em HD por hover (`static/admin/js/image_popover.js`).

**Non-Goals:**
- Não criar dashboards, gráficos ou widgets interativos complexos de analytics.
- Não alterar a lógica de backend, models ou permissões do Django Admin.

## Decisions

1. **Uso do Remix Icon via CDN**:
   - *Decisão*: Importar o Remix Icon v4.2.0 via CDN (`https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css`) no arquivo `custom_admin.css` e atualizar a configuração `JAZZMIN_SETTINGS["icons"]` em `settings.py`.
   - *Alternativa considerada*: Baixar os arquivos de fonte localmente. *Motivo*: O CDN via jsDelivr é rápido, confiável e evita commit de binários pesados no repositório.

2. **Estilização da Sidebar Vertical Empilhada**:
   - *Decisão*: Ajustar o CSS e estrutura dos itens de menu `.nav-sidebar .nav-item` no `custom_admin.css` para dispor os elementos em `flex-direction: column` com ícone centralizado acima da legenda de texto.
   - *Alternativa considerada*: Sobrescrever completamente os templates HTML da sidebar do Jazzmin. *Motivo*: O CSS com Flexbox em `.nav-link` atinge o resultado com muito menos acoplamento e manutenção.

3. **Color Palette & Glassmorphism Tokens**:
   - *Fundo Noturno*: `#0A0A32` (Azul escuro noturno)
   - *Cards/Tabelas*: `rgba(20, 20, 90, 0.45)` com `backdrop-filter: blur(12px)` e borda `1px solid rgba(255, 255, 255, 0.08)`
   - *Ação Principal / Glow*: Gradiente Laranja `linear-gradient(135deg, #FF7A1A 0%, #FF512F 100%)`
   - *Textos*: Branco `#FFFFFF` em títulos e `#A0A5B5` em legendas e rótulos auxiliares.

## Risks / Trade-offs

- **[Risco]** Conflito de especificidade entre estilos nativos do Bootstrap/Jazzmin e o `custom_admin.css`.
  - *Mitigação*: Utilizar seletores CSS específicos com prioridade direcionada (ex: `.jazzmin-theme .main-sidebar`, `.table.dataTable`) e carregar `custom_admin.css` após as folhas do Jazzmin.
