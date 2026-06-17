## 1. Models

- [x] 1.1 Add `SobreEmpresa` model to `empresa/models.py` with fields: `titulo_secao` (CharField), `texto` (TextField), `imagem_loja` (ImageField with upload_to='empresa/sobre/'). Implement singleton pattern by overriding `save()` to force `pk=1`.
- [x] 1.2 Add `Marca` model to `empresa/models.py` with fields: `nome` (CharField), `logo` (ImageField with upload_to='empresa/marcas/'), `em_destaque` (BooleanField default=True), `ordem` (IntegerField default=0), `is_active` (BooleanField default=True).

## 2. Admin Registration

- [x] 2.1 Register `SobreEmpresa` in `empresa/admin.py` with singleton protection (hide Add button if instance exists, disable Delete action).
- [x] 2.2 Register `Marca` in `empresa/admin.py` with `list_display` (nome, logo preview, em_destaque, ordem), `list_editable` (em_destaque, ordem), and `list_filter` (em_destaque).

## 3. Migrations

- [x] 3.1 Run `python manage.py makemigrations empresa` to generate migration files for the new models.
- [x] 3.2 Run `python manage.py migrate` to apply migrations to the Supabase PostgreSQL database.

## 4. Views

- [x] 4.1 Update `HomeView.get_context_data()` in `core/views.py` to fetch the `SobreEmpresa` singleton instance and pass it as `sobre_empresa` in context.
- [x] 4.2 Update `HomeView.get_context_data()` in `core/views.py` to fetch `Marca.objects.filter(em_destaque=True).order_by('ordem')` and pass it as `marcas_destaque` in context.

## 5. Frontend Templates

- [x] 5.1 Add "Sobre Nós" section (Section 5) to `core/templates/core/home.html` rendering `sobre_empresa.imagem_loja`, `sobre_empresa.titulo_secao`, and `sobre_empresa.texto` with the two-column layout from the wireframe.
- [x] 5.2 Add "Marcas em Destaque" section (Section 6) to `core/templates/core/home.html` rendering the `marcas_destaque` queryset as a horizontal carousel of logos.

## 6. Deploy

- [x] 6.1 Commit changes, push to GitHub, and restart the Portainer stack to verify models and sections render correctly on production.
