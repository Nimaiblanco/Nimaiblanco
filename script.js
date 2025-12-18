const cursor = document.getElementById('cursor');
const cursorZoom = document.getElementById('cursor-zoom');
const mainWrapper = document.getElementById('main-wrapper');

let mouseX = 0;
let mouseY = 0;

// 1. Clonar contenido para la lupa
window.onload = () => {
    if (mainWrapper && cursorZoom) {
        cursorZoom.innerHTML = mainWrapper.innerHTML;
    }
    initMenuScroll(); // Inicializa el fijador de enlaces
};

// 2. FORZAR REDIRECCIÓN DEL MENÚ
const initMenuScroll = () => {
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el fallo del enlace nativo
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Ajuste para que no tape el título
                    behavior: 'smooth'
                });
            }
        });
    });
};

// 3. MOVIMIENTO DE LUPA (Sin desfase)
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

// 4. INTERACTIVIDAD
document.querySelectorAll('.hover-trigger').forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('active'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

updateLupa();
