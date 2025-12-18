window.onload = () => {
    const contentOriginal = document.getElementById('content-to-copy');
    const lupaContent = document.getElementById('lupa-content');
    const lupaWrapper = document.getElementById('lupa-wrapper');

    // Sincronizar contenido para el efecto espejo
    lupaContent.innerHTML = contentOriginal.innerHTML;

    // Movimiento de la lupa
    document.addEventListener('mousemove', (e) => {
        lupaWrapper.style.left = `${e.clientX}px`;
        lupaWrapper.style.top = `${e.clientY}px`;

        const zoom = 1.05;
        const moveX = -(e.clientX * zoom) + (lupaWrapper.offsetWidth / 2);
        const moveY = -((e.clientY + window.scrollY) * zoom) + (lupaWrapper.offsetHeight / 2);

        lupaContent.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    });

    // Expandir lupa al pasar por textos interactivos
    document.querySelectorAll('.hover-trigger').forEach(item => {
        item.addEventListener('mouseenter', () => lupaWrapper.classList.add('active'));
        item.addEventListener('mouseleave', () => lupaWrapper.classList.remove('active'));
    });
};

/* CONFIGURACIÓN DE PARTÍCULAS GRANDES */
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#38bdf8" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { 
            "value": 7, /* Puntos grandes */
            "random": true 
        },
        "line_linked": { 
            "enable": true, 
            "distance": 200, 
            "color": "#38bdf8", 
            "opacity": 0.4, 
            "width": 2.5 /* Líneas gruesas */
        },
        "move": { "enable": true, "speed": 1.5 }
    }
});
