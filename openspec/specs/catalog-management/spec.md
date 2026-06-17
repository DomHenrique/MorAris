# Catalog Management

## Purpose
Gerenciamento de Produtos, Categorias e Galerias de Imagem, voltado à exposição de revestimentos.

## Requirements

### Requirement: Catalog Structure
The system SHALL organize products into hierarchical categories and provide detailed product views with image galleries.

#### Scenario: Display product details
- **WHEN** user navigates to a product detail URL
- **THEN** system displays the product information including name, description, unit, primary images, and gallery.

### Requirement: Promotional Banners
The system SHALL support marking products as "featured" and group them into active promotional campaigns overriding standard sections.

#### Scenario: Active campaign override
- **WHEN** a Campaign is marked as "active"
- **THEN** the Home page featured products section uses the Campaign's selected products instead of default featured products.
