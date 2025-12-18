window.onload = () => {
    const contentOriginal = document.getElementById('content-to-copy');
    const lupaContent = document.getElementById('lupa-content');
    const lupaWrapper = document.getElementById('lupa-wrapper');

    if (contentOriginal && lupaContent) {
        lupaContent.innerHTML = contentOriginal.innerHTML;
    }

    // Movimiento sincronizado
    document.addEventListener('mousemove', (e) => {
        lupaWrapper.style.left = e.clientX + 'px';
        lupaWrapper.style.top = e.clientY + 'px';

        const zoom = 1.05;
        const scrollY = window.scrollY;
        
        const moveX = -(e.clientX * zoom) + (lupaWrapper.offsetWidth / 2);
        const moveY = -((e.clientY + scrollY) * zoom) + (lupaWrapper.offsetHeight / 2);

        lupaContent.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    });

    // Hover triggers
    document.querySelectorAll('.hover-trigger').forEach(item => {
        item.addEventListener('mouseenter', () => lupaWrapper.classList.add('active'));
        item.addEventListener('mouseleave', () => lupaWrapper.classList.remove('active'));
    });
};

// PARTICULAS GRANDES Y LÍNEAS GRUESAS
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#38bdf8" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { 
            "value": 7, /* PUNTOS GRANDES */
            "random": true 
        },
        "line_linked": { 
            "enable": true, 
            "distance": 200, 
            "color": "#38bdf8", 
            "opacity": 0.4, 
            "width": 2.5 /* LÍNEAS GRUESAS */
        },
        "move": { "enable": true, "speed": 1.5 }
    },
    "interactivity": {
        "events": { "onclick": { "enable": true, "mode": "push" } }
    }
});
