## ADDED Requirements

### Requirement: Admin can manage featured brands
The system SHALL provide an interface to add, edit, and remove `Marca` (Brand) objects in the Django Admin.

#### Scenario: Admin adds a brand
- **WHEN** an admin creates a new Brand with a name, logo, order, and `em_destaque=True`
- **THEN** the brand is saved to the database

### Requirement: Admin can toggle brand visibility
The system SHALL allow admins to toggle the visibility of brands on the homepage carousel via the `em_destaque` flag.

#### Scenario: Admin hides a brand
- **WHEN** an admin sets `em_destaque=False` on an existing brand
- **THEN** the brand is removed from the homepage carousel but retained in the database

### Requirement: Frontend displays featured brands
The frontend SHALL render a carousel of brands marked as `em_destaque=True`, ordered by the `ordem` field.

#### Scenario: User views the brands section
- **WHEN** a user scrolls to the 'Marcas em Destaque' section (Section 6)
- **THEN** they see only the featured brands sorted by their specified order
