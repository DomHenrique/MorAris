## ADDED Requirements

### Requirement: Rotating Banners
The system SHALL manage and display a rotating carousel of hero banners on the homepage.

#### Scenario: Displaying default banners
- **WHEN** there is no active Campaign
- **THEN** the homepage carousel displays all Banners marked as "active" that do not belong to a specific Campaign.

### Requirement: Customer Testimonials
The system SHALL maintain a collection of customer/architect testimonials with rating scores.

#### Scenario: Displaying testimonials
- **WHEN** rendering the testimonials section
- **THEN** the system displays active testimonials sorted by rating (descending) and creation date.

### Requirement: Showroom Locations
The system SHALL store and display physical showroom information including address, maps, and WhatsApp contact links.

#### Scenario: Rendering footer contacts
- **WHEN** the global template footer is rendered
- **THEN** the system lists all active "Unidade" records with their corresponding contact and address data.
