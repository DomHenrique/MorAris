## ADDED Requirements

### Requirement: Custom Admin Dashboard Access
The system SHALL provide a secure administrative dashboard located at `/painel/` that requires explicit authorization to access.

#### Scenario: Authorized access
- **WHEN** an authenticated staff user navigates to the admin panel
- **THEN** the system displays the custom Tailwind-based dashboard.

#### Scenario: Unauthorized access
- **WHEN** an unauthenticated user attempts to access the admin panel
- **THEN** the system redirects the user to the admin login page.

### Requirement: Content Management Interface
The system SHALL allow authorized users to manage (CRUD) all dynamic content (Products, Categories, Campaigns, Banners, Testimonials, Brands, and Company Info) through the new custom graphical interface instead of the default Django admin.

#### Scenario: Successful entity creation
- **WHEN** an authorized user submits a valid form (e.g., adding a new Product) via the custom interface
- **THEN** the system persists the data to the database, handles any image uploads, and returns the user to the entity list with a success message.

#### Scenario: Form validation failure
- **WHEN** an authorized user submits an invalid form via the custom interface
- **THEN** the system prevents data persistence and displays appropriate validation error messages within the Tailwind-styled form.
