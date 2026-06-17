## MODIFIED Requirements

### Requirement: Frontend displays featured brands
The frontend SHALL render an infinite continuous CSS marquee of brands marked as `em_destaque=True`, ordered by the `ordem` field.

#### Scenario: User views the brands section
- **WHEN** a user scrolls to the 'Marcas em Destaque' section (Section 6)
- **THEN** they see the featured brands moving automatically in an infinite loop

#### Scenario: User hovers over the brands section
- **WHEN** a user hovers their mouse over the moving brands
- **THEN** the animation pauses to allow the user to view the brands clearly
