const cursor = document.getElementById('cursor');

// Movimiento del cursor suave
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Detectar hover
document.querySelectorAll('.hover-trigger').forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('active'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Partículas con el color --accent (#38bdf8)
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 3 },
        "line_linked": { "enable": true, "opacity": 0.2, "color": "#38bdf8" },
        "move": { "enable": true, "speed": 1.5 }
    }
});
