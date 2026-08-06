document.addEventListener("DOMContentLoaded", function() {
    const MAX_FILE_SIZE_MB = 5;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    // Listen for file selections in the admin
    document.body.addEventListener('change', function(e) {
        if (e.target && e.target.type === 'file') {
            const file = e.target.files[0];
            
            if (file) {
                // Check if it's an image
                if (!ALLOWED_TYPES.includes(file.type)) {
                    alert('Formato de arquivo inválido. Por favor, selecione uma imagem (JPEG, PNG, WEBP).');
                    e.target.value = ''; // Clear the input
                    return;
                }

                // Check size
                if (file.size > MAX_FILE_SIZE_BYTES) {
                    alert(`A imagem é muito grande (${(file.size / 1024 / 1024).toFixed(2)} MB). O limite máximo é ${MAX_FILE_SIZE_MB} MB.`);
                    e.target.value = ''; // Clear the input
                    return;
                }

                // If valid, and it's inside our custom gallery, we could potentially update the thumbnail preview here,
                // but Django admin's built-in behavior might already do it or wait for save.
                // We leave it to native behavior after validation.
            }
        }
    });
});
