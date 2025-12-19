/**
 * Blanco Nimai Portfolio - Script Raio-X Único
 */

const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.2; // Velocidad de seguimiento (0.2 es ideal para evitar lag)

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice && cursor) {
    // 1. Seguimiento del Mouse con LERP (Suavizado)
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = "1";
    });

    function updateCursor() {
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        // Uso de translate3d para aceleración por hardware
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // 2. Lógica del Efecto Raio-X
    // Aquí defines qué elementos activan la lente grande
    const hoverSelectors = 'a, .skill-card, .project-card, .sobre-foto, .btn-contato';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelectors)) {
            cursor.classList.add('active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverSelectors)) {
            cursor.classList.remove('active');
        }
    });

} else if (cursor) {
    cursor.style.display = 'none';
}

// Manten aquí tus funciones de Scroll Reveal y ParticlesJS que ya tenías
