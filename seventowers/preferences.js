/* Enhance the CSS-only title toggle with a preference shared by all pages. */
(() => {
    const checkbox = document.getElementById('readable-titles');
    if (!checkbox) return;
    const key = 'seventowers.readableTitles';
    function restore() {
        try {
            checkbox.checked = localStorage.getItem(key) === 'true';
        } catch {
            // Storage may be disabled; the native checkbox still works.
        }
    }
    restore();
    window.addEventListener('pageshow', restore);
    checkbox.addEventListener('change', () => {
        try {
            localStorage.setItem(key, String(checkbox.checked));
        } catch {
            // Keep this page's selection even when it cannot be saved.
        }
    });
})();
