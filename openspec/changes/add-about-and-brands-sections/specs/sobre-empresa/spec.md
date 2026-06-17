## ADDED Requirements

### Requirement: Admin can update 'About Us' section
The system SHALL provide a singleton management interface for the company's 'About Us' section in the Django Admin.

#### Scenario: Admin updates text and image
- **WHEN** an admin updates the title, rich text, or image in the `SobreEmpresa` model
- **THEN** the changes are immediately reflected on the frontend homepage's Section 5

### Requirement: Frontend displays 'About Us'
The frontend SHALL fetch the `SobreEmpresa` data and render it.

#### Scenario: User visits the homepage
- **WHEN** a user visits the landing page
- **THEN** the 'About Us' section displays the dynamic text and image from the database
