const cursor = document.getElementById('cursor');

// Seguimiento del mouse
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Detectar hover para cambiar el estilo del círculo (color/bordes)
document.querySelectorAll('.hover-trigger').forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('active'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Partículas de fondo
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 3 },
        "line_linked": { "enable": true, "opacity": 0.2 },
        "move": { "enable": true, "speed": 1 }
    }
});
