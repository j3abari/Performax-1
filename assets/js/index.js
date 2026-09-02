document.addEventListener('DOMContentLoaded', () => {
    initParallax();
});

// Parallax Effect for Floating Elements
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
                const yPos = scrolled * speed;
                const rotation = scrolled * speed * 0.5;
                el.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
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
                const x = mouseX * 50 * speed;
                const y = mouseY * 50 * speed;
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        }, { passive: true });
    }
}
