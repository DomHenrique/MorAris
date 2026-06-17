## Context

The current landing page (Home) needs sections 5 and 6 to be fully dynamic, managed via the Django Admin. This prevents hardcoding text, images, and logos directly in HTML, giving the marketing/admin team autonomy to modify the "About Us" and "Brands" sections.

## Goals / Non-Goals

**Goals:**
- Implement the `SobreEmpresa` model using a Singleton pattern to manage the About Us content.
- Implement the `Marca` model to manage partner brands, including a boolean `em_destaque` flag and an `ordem` integer field.
- Register these models in the Jazzmin admin with customized list displays.
- Provide the database objects to the Django Home View to be rendered directly into the HTML templates.

**Non-Goals:**
- Implement separate detail pages for each brand.
- Create multiple instances of `SobreEmpresa` (it will be forced to be a singleton).

## Decisions

**1. Model Placement**
We will place these models in the `empresa` Django app, as it logically fits with the business domain (we already have `Unidade` in `empresa/models.py`). 

**2. Singleton Implementation for `SobreEmpresa`**
To restrict `SobreEmpresa` to a single row, we will override the `save()` method to force the primary key to `pk=1` and configure the Django Admin to hide the "Add" button if an instance already exists.
- *Alternatives considered:* Creating a separate "Config" app, but placing it in `empresa` keeps the business logic centralized.

**3. Media Storage**
Images uploaded to `imagem_loja` (SobreEmpresa) and `logo` (Marca) will utilize the `DEFAULT_FILE_STORAGE` which is already configured to use `storages.backends.s3boto3.S3Boto3Storage` pointing to Supabase. This means zero extra configuration is required for file handling.

**4. Boolean Toggle for Featured Brands**
Brands will have an `em_destaque` (Boolean, default=True). The Home view will filter brands with `Marca.objects.filter(em_destaque=True).order_by('ordem')`. This keeps inactive brands in the DB for future use.

## Risks / Trade-offs

- **Risk**: Deletion of the `SobreEmpresa` singleton instance from the admin.
  - **Mitigation**: We can optionally disable the "Delete" action in the `SobreEmpresaAdmin` class to ensure the row persists, although allowing deletion and recreating it is also acceptable if `pk=1` is enforced.
- **Risk**: Image sizes breaking the carousel or layout.
  - **Mitigation**: Rely on frontend CSS classes (e.g., `object-fit`, max heights) to constrain uploaded logos and images gracefully.
