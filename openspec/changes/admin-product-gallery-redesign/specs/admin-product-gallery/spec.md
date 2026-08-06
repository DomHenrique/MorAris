## ADDED Requirements

### Requirement: Tabbed interface for Product Admin
The system SHALL display the Product form fields separated into horizontal tabs when edited in the Django admin.

#### Scenario: Admin opens product edit page
- **WHEN** the admin navigates to a product's change form
- **THEN** they see tabs such as "Geral", "Preço e Status", and "Imagens da Galeria" instead of a long continuous page.

### Requirement: Custom Gallery Grid/List Toggle
The system SHALL provide a custom user interface for the product gallery that allows toggling between a Grid view and a List view.

#### Scenario: Admin toggles gallery view
- **WHEN** the admin clicks the "Grade" button on the gallery inline
- **THEN** the product images are displayed as large thumbnails in a CSS grid layout.
- **WHEN** the admin clicks the "Lista" button
- **THEN** the images are displayed in standard rows for easier ordering or deletion.

### Requirement: Single image per gallery item
The system SHALL enforce that a product gallery item only contains a single image field (and an order field), eliminating platform-specific fields.

#### Scenario: Admin adds an image
- **WHEN** the admin adds a new row to the product gallery
- **THEN** there is no option to upload a specific "mobile" image, only the main image.

### Requirement: Client-side validation for image files
The system SHALL validate the selected image file on the client-side for format and size constraints before upload.

#### Scenario: Admin selects an invalid file format
- **WHEN** the admin chooses a non-image file (e.g., PDF) or an image exceeding 5MB
- **THEN** the system immediately displays an alert message
- **THEN** the system clears the file input field, preventing the invalid file from being submitted.
