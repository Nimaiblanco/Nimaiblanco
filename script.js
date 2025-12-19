/**
 * Blanco Nimai Portfolio - Script Refinado
 */

const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (LERP)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15; 

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (cursor) {
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        // Usamos translate3d para forzar aceleración por hardware (más fluido)
        cursor.style.transform = `translate3d(calc(${ballX}px - 50%), calc(${ballY}px - 50%), 0)`;
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 2. EFEITOS DE HOVER (Delegación optimizada)
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelectors);
    
    if (target) {
        cursor.classList.add('active');
        
        // Efecto Raio-X ampliado específicamente para la foto
        if (target.classList.contains('sobre-foto')) {
            cursor.style.width = '120px';
            cursor.style.height = '120px';
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelectors);
    if (target) {
        cursor.classList.remove('active');
        cursor.style.width = ''; 
        cursor.style.height = '';
    }
});

// 3. SCROLL REVEAL (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

// 4. INICIALIZAÇÃO SEGURA
// Usamos DOMContentLoaded para que el JS corra lo antes posible sin esperar imágenes
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Revelaciones
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    // Partículas
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#38bdf8" },
                "opacity": { "value": 0.3 },
                "size": { "value": 2 },
                "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 1.2 }
            },
            "interactivity": { 
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.4 } } }
            },
            "retina_detect": true
        });
    }
});

// 5. SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
