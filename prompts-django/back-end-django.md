Atue como o Agente 2: Desenvolvedor Backend Django.

O projeto é um site institucional desenvolvido em Django, com foco em simplicidade, facilidade de manutenção e implantação rápida.

Utilize exclusivamente o banco de dados SQLite nativo do Django. Não utilize PostgreSQL, MySQL, Docker, dj_database_url ou qualquer configuração avançada de banco de dados.

Com base nos models gerados pelo Agente 1, gere os seguintes arquivos:

## 1. views.py

Crie as views utilizando Class-Based Views (CBVs):

* TemplateView para páginas institucionais
* ListView para listagens
* DetailView para páginas de detalhes

Priorize código limpo, organizado e fácil de manter.

---

## 2. admin.py

Registre TODOS os models no Django Admin.

Configure adequadamente:

* list_display
* list_filter
* search_fields
* ordering
* prepopulated_fields (quando existir campo slug)

Para os models Banner e Testimonial, crie classes ModelAdmin completas e otimizadas para facilitar a gestão de conteúdo pelo cliente.

O painel administrativo deve ser amigável para usuários sem conhecimento técnico.

---

## 3. urls.py

Crie todas as rotas necessárias utilizando nomes (name=).

Utilize boas práticas de organização e nomenclatura.

---

## 4. settings.py

Configure apenas o necessário para um projeto institucional simples.

### Aplicações instaladas

Inclua:

* jazzmin
* django.contrib.admin
* django.contrib.auth
* django.contrib.contenttypes
* django.contrib.sessions
* django.contrib.messages
* django.contrib.staticfiles

e os aplicativos locais do projeto.

### Banco de Dados

Utilize exclusivamente SQLite:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```

### Arquivos Estáticos

Configure:

```python
STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"
```

### Arquivos de Mídia

Configure:

```python
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"
```

### Jazzmin

Configure um painel administrativo elegante utilizando Jazzmin com:

* Nome da empresa
* Logo (quando existir)
* Menu lateral organizado
* Ícones apropriados para cada model

Não implemente configurações corporativas avançadas, cache, filas, Redis, Docker ou serviços externos.

---

## Requisitos Gerais

* Código compatível com Django 5+
* Código completo e pronto para uso
* Seguir PEP8
* Utilizar comentários apenas quando realmente necessários
* Priorizar simplicidade e manutenção futura
* Evitar dependências desnecessárias
* Pensar em um pequeno negócio que precisará apenas atualizar conteúdos pelo painel administrativo

Entregue os arquivos completos:

* views.py
* urls.py
* admin.py
* settings.py

Prontos para copiar e colar no projeto.
