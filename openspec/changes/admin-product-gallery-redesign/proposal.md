## Why

The current product registration page in the Django admin uses standard stacked fieldsets and a default TabularInline for the gallery. This makes the interface cluttered and the gallery management unreliable, with small, hard-to-see thumbnails and unnecessary fields like `mobile_image` for products. By introducing a tabbed layout, instant image validation, and a custom grid/list gallery view, we significantly improve the usability and reliability of the catalog management experience for the end user.

## What Changes

- Enable tabbed interface in the Product admin page ("Geral", "Preço e Status", "Imagens da Galeria") using Jazzmin's `horizontal_tabs` format.
- Remove the `mobile_image` field from `core.models.ProductImage` and migrate the database. **BREAKING**: Existing mobile images will be dropped, which is acceptable since they aren't necessary for product layouts.
- Override the default Django TabularInline template for `ProductImageInline` with a custom gallery template (`inline_gallery.html`).
- Introduce a visual toggle to switch between a Grid view (for visualizing large photos) and a List view (for managing order and desktop/mobile overrides if any remained).
- Implement client-side JavaScript validation on file selection to immediately alert the user if a file exceeds a set size limit (e.g., 5MB) or is not a valid image format (JPEG/PNG/WEBP), clearing the input to prevent failed form submissions.

## Capabilities

### New Capabilities
- `admin-product-gallery`: The custom gallery inline interface with Grid/List view toggles, large thumbnails, and instant client-side validation.

### Modified Capabilities
- (None)

## Impact

- **Database**: Migration required for `core.models.ProductImage` to drop `mobile_image`.
- **Admin UI**: Updates `core/admin.py` to organize fieldsets and customizes the `ProductImageInline` template.
- **Settings**: Modifies `moraris/settings.py` (`JAZZMIN_SETTINGS`) to enable tabs.
- **Frontend Assets**: New custom CSS and JS will be added/injected into the admin interface to support the gallery toggle and client-side validation.
