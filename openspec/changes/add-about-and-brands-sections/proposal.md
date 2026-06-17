## Why

The homepage currently has static sections for "Sobre Nós" (Section 5) and "Marcas em Destaque" (Section 6) as defined by the design wireframes. We need dynamic control over these sections directly from the Django Administrative area (Jazzmin). This provides non-technical users the autonomy to update the company history, swap out the main store image, and manage featured partner brands without requiring codebase changes or re-deployments.

## What Changes

- Add a dynamic Singleton-like model `SobreEmpresa` to manage the "Sobre Nós" section (Title, Text, and Image).
- Add a dynamic model `Marca` to manage partner brands (Name, Logo, Ordering, and an `em_destaque` boolean toggle).
- Register both models in the Django Admin interface with user-friendly form fields.
- Update the frontend Home template/views to fetch the `SobreEmpresa` instance and a filtered, ordered list of `Marca` (where `em_destaque=True`) and render them natively.

## Capabilities

### New Capabilities
- `sobre-empresa`: Management of company 'About' information (dynamic text and image) via the CMS.
- `marcas`: Management of brand partners and dynamic curation of featured brands for the homepage carousel.

### Modified Capabilities
- None

## Impact

- **Models**: New models will be added to the `empresa` or `core` Django application.
- **Admin**: The Django admin panel will have two new sections for content management.
- **Frontend**: The landing page templates will depend on the database state for sections 5 and 6, replacing static HTML.
- **Storage**: Images uploaded for brands and the store will be routed directly to the Supabase S3 bucket.
