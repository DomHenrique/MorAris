## Context

The `admin/index.html` template overrides the default Jazzmin dashboard. While the top half features custom Gridd-themed blocks, the bottom half (the model app list and the recent actions timeline) still utilizes the default Jazzmin/Bootstrap 4 card styling. This causes visual inconsistency and a disjointed user experience.

## Goals / Non-Goals

**Goals:**
- Apply the `.gridd-dashboard-card` visual language to the Jazzmin app list.
- Transform the default "Add/Change" buttons into subtle, modern icons.
- Declutter the recent actions timeline sidebar by softening borders and backgrounds.
- Improve typography by applying the 'Inter' font and adjusting padding.

**Non-Goals:**
- Rewrite the underlying Django Admin logic or custom template tags.
- Modify form pages (`change_form`) or list pages (`change_list`). This change is strictly scoped to the dashboard index (`admin/index.html`).

## Decisions

- **Decision 1: Template Modification vs CSS Hacks**
  We will modify the HTML inside `admin/index.html` directly to replace the standard Bootstrap `.btn` classes with our custom icon buttons, and wrap the tables in our custom card classes.
  - *Rationale*: Since the template loop `{% for app in dashboard_list %}` is explicitly present in our custom `admin/index.html`, we can change the HTML markup directly. This is much cleaner and more robust than trying to hack the existing classes with CSS `::before` pseudo-elements.

- **Decision 2: Scoped CSS**
  New CSS rules will be added to the `<style>` block at the top of `admin/index.html` (or in `custom_admin.css`) specifically targeting `.dashboard .card` and `.timeline` elements to ensure we don't accidentally style elements outside the dashboard.

## Risks / Trade-offs

- **Risk: Jazzmin Layout Breakage** -> By overriding `.card` and `.table`, we might accidentally affect other elements if we aren't specific. 
  - *Mitigation*: We will add a wrapper class like `.gridd-app-list` around the loop to strictly scope our CSS rules.
