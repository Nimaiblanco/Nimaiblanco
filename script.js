const cursor = document.getElementById('cursor');

// Movimiento del cursor suave
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Expandir cursor en elementos interactivos
const setupHover = () => {
    document.querySelectorAll('.hover-trigger').forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('active'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
};

window.onload = () => {
    setupHover();
};

// Configuración de Partículas
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 6, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.4, "width": 2 },
        "move": { "enable": true, "speed": 1 }
    }
});
