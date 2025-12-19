/**
 * Blanco Nimai Portfolio - Script Refinado Completo
 */

const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (LERP)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15;

// Desativar cursor em dispositivos touch para evitar bugs
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursor) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        // Suaviza o movimento
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        // Centraliza o cursor usando as variáveis ballX e ballY
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
} else if (cursor) {
    cursor.style.display = 'none'; // Esconde se for touch
}

// 2. EFEITOS DE HOVER (Otimizado)
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.add('active');
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
}

// 3. SCROLL REVEAL (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

// 4. INICIALIZAÇÃO E PARTICULAS
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
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
                "events": { "onhover": { "enable": !isTouchDevice, "mode": "grab" } },
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
            
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    });
});
