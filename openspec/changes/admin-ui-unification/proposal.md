## Why

The current Jazzmin admin dashboard has two distinct visual styles: the custom top area (dark `#1e1e2d`, rounded corners, modern styling) and the standard bottom area (Jazzmin/Bootstrap default cards, strong borders, generic buttons). Unifying these areas creates a more cohesive, premium, and modern experience for administrative users, reinforcing the Gridd Marketing 360 design identity.

## What Changes

- Apply the custom `gridd-dashboard-card` aesthetic to the standard App List cards (Core, Empresa, Autenticação, etc.).
- Modernize the Action buttons (Add, Change) inside the App List to use minimalist icons or softer pill shapes, rather than standard Bootstrap blocks.
- Clean up the "Recent actions" timeline by removing rigid borders, softening colors, and reducing visual clutter.
- Adjust typography (using the 'Inter' font) and padding to improve readability and visual breathing room.

## Capabilities

### New Capabilities
- `admin-ui`: Guidelines and requirements for the customized Django Admin dashboard, establishing the "Gridd Theme" for app lists, buttons, and sidebars.

### Modified Capabilities
- None

## Impact

- Modifies the overriding `core/templates/admin/index.html` file by updating its internal CSS and HTML structure.
- Modifies `core/static/admin/css/custom_admin.css` if global styling is preferred.
- Strictly a visual front-end change; no backend logic or database models are affected.
- Impacts the visual presentation of all registered apps on the main dashboard screen.
