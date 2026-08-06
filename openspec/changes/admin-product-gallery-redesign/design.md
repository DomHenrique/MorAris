## Context

The current `Product` administration uses a stacked form layout, which mixes general product attributes with the inline image gallery. The default TabularInline for the gallery provides tiny thumbnails and includes a `mobile_image` field that adds unnecessary friction for catalog items. To improve usability, we want to segment the form into horizontal tabs, introduce a grid-based gallery view with a list/grid toggle, and add client-side file validation before uploading.

## Goals / Non-Goals

**Goals:**
- Implement a tabbed interface for `ProductAdmin`.
- Remove the `mobile_image` field from `ProductImage`.
- Replace the default TabularInline layout for product images with a custom gallery that offers Grid and List views.
- Add client-side validation to prevent selecting non-image files or excessively large files.

**Non-Goals:**
- Modifying the admin layouts of Banners, Categories, or other models.
- Changing the frontend display of products (this is strictly a backend admin enhancement).
- Implementing a completely detached media library system (we will stick to the native Django inline behavior, just restyled).

## Decisions

- **Tabs Implementation**: We will enable Jazzmin's `horizontal_tabs` for `changeform_format`. We will organize the fields in `ProductAdmin` into `fieldsets` (e.g., "Geral", "Preço e Status"), which Jazzmin will automatically render as separate tabs alongside the `ProductImageInline`.
- **Gallery Restyling**: We will specify `template = "admin/core/productimage/inline_gallery.html"` in the `ProductImageInline` class. This template will extend or replicate Django's `admin/edit_inline/tabular.html`, but wrapped with custom classes and a toggle button. CSS Grid will be used for the grid layout.
- **Client-Side Validation**: A new JavaScript file (`admin/js/gallery_validation.js`) will be injected via `AdminMediaMixin`. It will listen for `change` events on `.vForeignKeyRawIdAdminField` or the native file inputs inside the inline, checking `file.type` and `file.size` before rendering the thumbnail preview.

## Risks / Trade-offs

- **Risk**: Data loss of `mobile_image` fields for existing products.
  - **Mitigation**: This is an accepted trade-off since product images should ideally be responsive across all devices without requiring distinct uploads.
- **Risk**: Breaking the dynamic "Add another" functionality of Django inlines when applying Grid CSS.
  - **Mitigation**: We will carefully structure the CSS Grid to apply to the row wrappers without interfering with Django's inline javascript logic (`django.jQuery`), keeping the DOM structure mostly intact but changing flex/grid properties.
