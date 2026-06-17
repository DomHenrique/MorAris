## ADDED Requirements

### Requirement: Dual Media Fields
The system SHALL provide discrete upload fields for both Desktop and Mobile assets in all visual content models (Product, ProductImage, Banner, Testimonial).

#### Scenario: Saving a banner with dual media
- **WHEN** an admin uploads a landscape image for `image` and a portrait image for `mobile_image`
- **THEN** both assets are securely stored and referenced independently in the database.

### Requirement: HTML Picture Rendering
The system SHALL render media elements using HTML5 `<picture>` to ensure responsive delivery without JavaScript overhead.

#### Scenario: Rendering a responsive product image
- **WHEN** a product is rendered on a screen smaller than 768px and has a `mobile_image`
- **THEN** the `<source media="(max-width: 768px)">` directive forces the browser to download the mobile-specific image asset.
