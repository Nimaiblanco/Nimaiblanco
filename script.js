const cursor = document.getElementById('cursor');
const cursorZoom = document.getElementById('cursor-zoom');
const mainWrapper = document.getElementById('main-wrapper');

let mouseX = 0;
let mouseY = 0;

// 1. Sincronizar contenido para la lupa
window.onload = () => {
    if (mainWrapper && cursorZoom) {
        cursorZoom.innerHTML = mainWrapper.innerHTML;
    }
    fixMenuLinks(); // Forzar funcionamiento del menú
};

// 2. FUNCIÓN PARA QUE EL MENÚ FUNCIONE SÍ O SÍ
function fixMenuLinks() {
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 3. Movimiento de Lupa (1.4x de aumento)
const updateLupa = () => {
    const scrollY = window.scrollY;
    const zoom = 1.4;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    const moveX = -mouseX * zoom + (cursor.offsetWidth / 2);
    const moveY = -(mouseY + scrollY) * zoom + (cursor.offsetHeight / 2);

    if (cursorZoom) {
        cursorZoom.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    }
    requestAnimationFrame(updateLupa);
};

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 4. Efectos de Hover
document.querySelectorAll('.hover-trigger').forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('active'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

updateLupa();

// Partículas
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 70 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 4 },
        "line_linked": { "enable": true, "opacity": 0.2 },
        "move": { "enable": true, "speed": 1 }
    }
});
