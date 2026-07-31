/* Floating HD Image Popover for Django Admin */
document.addEventListener('DOMContentLoaded', function () {
    // Create global popover element appended to body
    let popover = document.getElementById('admin-image-popover');
    if (!popover) {
        popover = document.createElement('div');
        popover.id = 'admin-image-popover';
        popover.innerHTML = `
            <img id="admin-popover-img" src="" alt="HD Preview" />
            <div id="admin-popover-caption"></div>
        `;
        document.body.appendChild(popover);
    }

    const popoverImg = document.getElementById('admin-popover-img');
    const popoverCaption = document.getElementById('admin-popover-caption');

    function positionPopover(e) {
        const offset = 18;
        const popW = popover.offsetWidth || 340;
        const popH = popover.offsetHeight || 260;
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        let left = e.clientX + offset;
        let top = e.clientY + offset;

        // Keep inside horizontal viewport
        if (left + popW > winW - 15) {
            left = e.clientX - popW - offset;
        }
        if (left < 15) left = 15;

        // Keep inside vertical viewport
        if (top + popH > winH - 15) {
            top = e.clientY - popH - offset;
        }
        if (top < 15) top = 15;

        popover.style.left = left + 'px';
        popover.style.top = top + 'px';
    }

    // Event Delegation for all thumbnail images in Admin tables & forms
    document.body.addEventListener('mouseover', function (e) {
        const target = e.target.closest('.admin-thumb-hover, .admin-inline-thumb, .admin-popover-target, td.field-image_preview img, td.field-desktop_preview img, td.field-mobile_preview img, td.field-image_thumbnail img');
        if (!target || target.tagName !== 'IMG') return;

        const src = target.getAttribute('data-full-src') || target.src;
        if (!src) return;

        const caption = target.getAttribute('title') || target.getAttribute('alt') || 'Pré-visualização HD';

        popoverImg.src = src;
        if (caption && caption !== 'Thumbnail' && caption !== 'Capa') {
            popoverCaption.textContent = caption;
            popoverCaption.style.display = 'block';
        } else {
            popoverCaption.style.display = 'none';
        }

        positionPopover(e);
        popover.classList.add('active');
    });

    document.body.addEventListener('mousemove', function (e) {
        if (popover.classList.contains('active')) {
            positionPopover(e);
        }
    });

    document.body.addEventListener('mouseout', function (e) {
        const target = e.target.closest('.admin-thumb-hover, .admin-inline-thumb, .admin-popover-target, td.field-image_preview img, td.field-desktop_preview img, td.field-mobile_preview img, td.field-image_thumbnail img');
        if (target) {
            popover.classList.remove('active');
        }
    });
});
