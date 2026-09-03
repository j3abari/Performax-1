document.addEventListener('DOMContentLoaded', () => {
    initParallax();
});

// Parallax Effect for Floating Elements (index.html only)
function initParallax() {
    const floatingElements = document.querySelectorAll('.floating-element');
    const hero = document.getElementById('hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            floatingElements.forEach(el => {
                const speed = parseFloat(el.dataset.speed) || 0.05;
                el._scrollY = scrolled * speed;
                el._scrollR = scrolled * speed * 0.5;
                updateTransform(el);
            });
        }
    }, { passive: true });

    // Mouse parallax for floating elements
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            floatingElements.forEach(el => {
                const speed = parseFloat(el.dataset.speed) || 0.05;
                el._mouseX = mouseX * 50 * speed;
                el._mouseY = mouseY * 50 * speed;
                updateTransform(el);
            });
        }, { passive: true });
    }

    function updateTransform(el) {
        const sx = el._mouseX || 0;
        const sy = (el._scrollY || 0) + (el._mouseY || 0);
        const sr = el._scrollR || 0;
        el.style.transform = `translate(${sx}px, ${sy}px) rotate(${sr}deg)`;
    }
}
