const cursor = document.getElementById('cursor');
const cursorZoom = document.getElementById('cursor-zoom');
const mainWrapper = document.getElementById('main-wrapper');

window.onload = () => {
    if (mainWrapper && cursorZoom) {
        cursorZoom.innerHTML = mainWrapper.innerHTML;
    }
};

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const scrollY = window.scrollY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    // Aumento de Zoom a 1.4x para que se note más
    const zoom = 1.4;
    const moveX = -x * zoom + (cursor.offsetWidth / 2);
    const moveY = -(y + scrollY) * zoom + (cursor.offsetHeight / 2);

    if (cursorZoom) {
        cursorZoom.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    }
});

document.querySelectorAll('.hover-trigger').forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('active'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Partículas
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 4 },
        "line_linked": { "enable": true, "opacity": 0.3 },
        "move": { "enable": true, "speed": 1 }
    }
});
