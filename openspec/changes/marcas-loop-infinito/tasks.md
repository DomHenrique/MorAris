## 1. CSS Updates

- [x] 1.1 Add `.marquee-container` and `.marquee-track` CSS classes to `core/static/css/style.css` (or `base.html` `<style>` tag if `style.css` is not actively used for this component) handling overflow and flex gaps.
- [x] 1.2 Add the `@keyframes scroll-left` animation to the CSS moving from `0` to `-50%`.
- [x] 1.3 Add a hover pause state: `.marquee-container:hover .marquee-track { animation-play-state: paused; }`.

## 2. Template Updates

- [x] 2.1 Edit `core/templates/core/home.html` to wrap the "Marcas em Destaque" content in `<div class="marquee-container">` and `<div class="marquee-track">`.
- [x] 2.2 Duplicate the `{% for marca in marcas_destaque %}` loop exactly twice inside the `.marquee-track` div so the continuous loop has a seamless transition.

## 3. Review & Deploy

- [x] 3.1 Verify locally (if possible) or visually confirm the duplicated loops and CSS syntax.
- [x] 3.2 Commit the changes, push to GitHub, and trigger the stack update in Portainer to see it live in production.
