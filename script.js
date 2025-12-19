/**
 * Blanco Nimai Portfolio - Script Otimizado (Performance & X-Ray)
 */

const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (LERP - Suavizado)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.2; // Aumentado levemente para reduzir a sensação de atraso

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice && cursor) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = "1";
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = "0";
    });

    function updateCursor() {
        // Interpolação Linear para suavidade absoluta
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        // Uso de translate3d para aceleração por GPU
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
} else if (cursor) {
    cursor.style.display = 'none';
}

// 2. EFEITOS DE HOVER (Delegado e Baseado em Classes)
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.add('active');
            
            // Efeito Raio-X específico para a foto
            if (target.classList.contains('sobre-foto')) {
                cursor.classList.add('x-ray');
            }
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.remove('active');
            cursor.classList.remove('x-ray');
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

// 4. INICIALIZAÇÃO E PARTÍCULAS (VISIBILIDADE MÁXIMA)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#38bdf8" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 2, "random": true },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#38bdf8", 
                    "opacity": 0.3, // Linhas bem visíveis
                    "width": 1 
                },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "out_mode": "out" }
            },
            "interactivity": { 
                "detect_on": "canvas",
                "events": { 
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } }
                }
            },
            "retina_detect": true
        });
    }
});

// 5. SCROLL SUAVE (Fix para Offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    });
});
