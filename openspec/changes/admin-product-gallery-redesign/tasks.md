## 1. Setup and Settings

- [x] 1.1 Enable horizontal tabs in `JAZZMIN_SETTINGS` inside `moraris/settings.py`.
- [x] 1.2 Update `ProductAdmin` in `core/admin.py` to define `fieldsets` for "Geral" and "Preço e Status".

## 2. Database Schema

- [x] 2.1 Remove the `mobile_image` field from `core.models.ProductImage` in `core/models.py`.
- [x] 2.2 Update `ProductImageInline` fields to remove `mobile_image`.
- [x] 2.3 Generate and apply the database migration.

## 3. Gallery UI Template

- [x] 3.1 Configure `template = "admin/core/productimage/inline_gallery.html"` in `ProductImageInline`.
- [x] 3.2 Create `core/templates/admin/core/productimage/inline_gallery.html` based on Django's `tabular.html`.
- [x] 3.3 Implement CSS and HTML structure for Grid and List views.
- [x] 3.4 Implement Javascript toggle functionality for Grid/List modes.

## 4. Client-side Validation

- [x] 4.1 Create a new script `core/static/admin/js/gallery_validation.js` to validate file types and sizes.
- [x] 4.2 Include `gallery_validation.js` in the `AdminMediaMixin` `Media` class in `core/admin.py`.
