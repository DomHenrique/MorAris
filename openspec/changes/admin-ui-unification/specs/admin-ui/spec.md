## ADDED Requirements

### Requirement: Admin Dashboard App List Styling
The system MUST render the app lists (modules) on the dashboard using a customized dark theme card that matches the "Gridd" aesthetic (dark background, subtle border, rounded corners) instead of standard Bootstrap cards.

#### Scenario: User views the admin dashboard
- **WHEN** the user navigates to the admin root page
- **THEN** they see the list of models inside cards styled identically to the top metric cards.

### Requirement: Modern Action Buttons
The system MUST replace the standard Django/Jazzmin "Add" and "Change" block buttons in the app list with modern, subtle icon buttons (or pill shapes) that do not clutter the UI.

#### Scenario: User manages a model
- **WHEN** the user looks at a model row in the app list (e.g., "Produtos")
- **THEN** the actions to add or change entries are presented as clear, subtle icons (`+` and `pencil`).

### Requirement: Clean Timeline Sidebar
The system MUST present the "Recent actions" sidebar with a cleaned-up, minimalist timeline layout that removes stark borders and aligns with the dark theme colors.

#### Scenario: User views recent actions
- **WHEN** the user checks the right sidebar on the dashboard
- **THEN** the timeline entries appear seamlessly integrated into the background without heavy bounding boxes.
