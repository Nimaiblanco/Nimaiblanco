const cursor = document.getElementById('cursor');

// Movimiento del cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Activar lupa en elementos con clase .hover-trigger
document.querySelectorAll('.hover-trigger').forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// Partículas de fondo
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 60 },
        "color": { "value": "#38bdf8" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.3 },
        "size": { "value": 3 },
        "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.2, "width": 1 },
        "move": { "enable": true, "speed": 1 }
    }
});
