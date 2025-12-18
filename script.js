const cursor = document.getElementById('cursor');
const cursorZoom = document.getElementById('cursor-zoom');
const mainWrapper = document.getElementById('main-wrapper');

let mouseX = 0;
let mouseY = 0;

// Sincronizar clon
const syncContent = () => {
    if (mainWrapper && cursorZoom) {
        cursorZoom.innerHTML = mainWrapper.innerHTML;
    }
};

window.onload = () => {
    syncContent();
    updateLupa();
};

// Movimiento y Zoom
const updateLupa = () => {
    const scrollY = window.scrollY;
    const zoom = 1.3; // Aumento sutil

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    const moveX = (cursor.offsetWidth / 2) - (mouseX * zoom);
    const moveY = (cursor.offsetHeight / 2) - ((mouseY + scrollY) * zoom);

    if (cursorZoom) {
        cursorZoom.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    }
    requestAnimationFrame(updateLupa);
};

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Hovers
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
        "line_linked": { "enable": true, "opacity": 0.2 },
        "move": { "enable": true, "speed": 1 }
    }
});
