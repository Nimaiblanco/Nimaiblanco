const startApp = () => {
    const contentOriginal = document.getElementById('content-to-copy');
    const lupaContent = document.getElementById('lupa-content');
    const lupaWrapper = document.getElementById('lupa-wrapper');

    // Clonar todo el contenido (incluyendo el menú) dentro de la lupa
    lupaContent.innerHTML = contentOriginal.innerHTML;

    document.addEventListener('mousemove', (e) => {
        // Mover el contenedor de la lupa
        lupaWrapper.style.left = `${e.clientX}px`;
        lupaWrapper.style.top = `${e.clientY}px`;

        const zoom = 1.05;
        // Sincronizar posición del contenido interno de la lupa
        const moveX = -(e.clientX * zoom) + (lupaWrapper.offsetWidth / 2);
        const moveY = -((e.clientY + window.scrollY) * zoom) + (lupaWrapper.offsetHeight / 2);

        lupaContent.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    });

    // Activar expansión de lupa en elementos hover-trigger
    document.querySelectorAll('.hover-trigger').forEach(item => {
        item.addEventListener('mouseenter', () => lupaWrapper.classList.add('active'));
        item.addEventListener('mouseleave', () => lupaWrapper.classList.remove('active'));
    });
};

window.onload = () => {
    setTimeout(startApp, 150);
};

// Partículas Grandes
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 85 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 7, "random": true },
        "line_linked": { "enable": true, "distance": 200, "color": "#38bdf8", "opacity": 0.4, "width": 2.5 },
        "move": { "enable": true, "speed": 1.5 }
    }
});
